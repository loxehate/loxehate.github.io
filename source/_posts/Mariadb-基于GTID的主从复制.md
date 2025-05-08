---
title: Mariadb-基于GTID的主从复制
tags: [Mariadb]
categories: [数据库]
date: 2025-05-08
---
### 一、GTID 概述

在MariaDB中，只要开启了binlog，所有的DML和DDL都会形成事件并且写入其中，并且每一件事务都会生成全局唯一的事务ID：Global transaction ID（全局事务ID），简称GTID。
 GTID是属于全局唯一，所以无需过多配置，从机可通过GTID同步主机binlog文件，从而形成主从架构，在实际生产环境中能够提高数据库容错率；

    注：
    1.MariaDB的GTID和MySQL不兼容，并且在MariaDB 10.0.2之前配置非常麻烦
    2.从Mariadb10.5起，Master和Slave术语逐渐被primary和replica替换
    3.GTID是默认开启的，无需在my.cnf里配置gtid_mode=on

GTID由3个整数构成，用“-”进行分割，例如：

```
0-1-10
第一位：0，domain ID，架构是1主多从，默认为0；如果有多主N从，domain ID为多个；
第二位：1，Server ID,在my.cnf中定义；
第三位：10，binlog中的事务ID
```

#### **1、查看、使用GTID**

- 在primary中查看GTID

```
# 查看primary binlog记录点
mysql> SHOW MASTER STATUS;
+--------------------+------------+----------------+--------------------+
| File               |   Position | Binlog_Do_DB   | Binlog_Ignore_DB   |
|--------------------+------------+----------------+--------------------|
| master1-bin.000003 |      22438 | test        |                    |
+--------------------+------------+----------------+--------------------+
1 row in set
```

```
# 通过记录点查询GTID
mysql> SELECT BINLOG_GTID_POS('master1-bin.000003', 22438);
+------------------------------------------------+
| BINLOG_GTID_POS('master1-bin.000003', 22438)   |
|------------------------------------------------|
| 0-1-1925                                       |
+------------------------------------------------+
1 row in set
```

或者

```
mysql> SELECT @@global.gtid_binlog_pos;
+----------------------------+
| @@global.gtid_binlog_pos   |
|----------------------------|
| 0-1-1925                   |
+----------------------------+
1 row in set
```

- 在replica查看使用

```
SELECT @@GLOBAL.gtid_slave_pos
```

### 二、配置主从同步my.cnf配置文件

#### 1、配置primary my.cnf

编辑my.cnf，增加如下内容：

```
# 开启binlog
log-bin

# 配置MasterID，数字唯一，不可重复
server-id = 1

# 更改binlog记录方式为ROW
binlog_format=ROW

# 清理超过30天的binlog日志
expire_logs_days = 30

# 统一主从复制LOG名称,包含如下：log-bin, log-bin-index, relay-log, relay-log-index, general-log-file,
# log-slow-query-log-file, log-error-file, and pid-file.
log-basename = master1

# 开启binlog的数据库，多个用,分割
binlog-do-db = test

#########################
# 以下为GTID主从复制选项#
#########################

# 开启半同步
plugin-load = "rpl_semi_sync_master=semisync_master.so;rpl_semi_sync_slave=semisync_slave.so"
rpl-semi-sync-master-enabled = 1
rpl-semi-sync-slave-enabled = 1

# 配置Master,ServerID,不能和Slave重复
server-id = 1

# 开启Master记录Slave binlog日志，前提Slave需要开启binlog
log-slave-updates=1

# 开启GTID严格模式
gtid_strict_mode=1

# 开启Slave并行复制
slave_parallel_threads=4

# 开启Slave从Master读取binlog时进行完整校验
master-verify-checksum=1
```

#### 2、配置Slave my.cnf

如果Slave只需要读，在后面增加read only=1即可，如果有多个从机，需要创建多个文件，更改server-id 和log-[basename](https://so.csdn.net/so/search?q=basename&spm=1001.2101.3001.7020)即可

```
# 开启binlog
log-bin

# 配置SlaveID
server-id = 2

# binlog名称
log-basename = Slave2

# 开启副本记录binlog日志
log-slave-updates = ON

# binlog记录方式为行
binlog_format=ROW

# 30天内清理binlog日志
expire_logs_days = 30

# 开启半同步
plugin-load = "rpl_semi_sync_master=semisync_master.so;rpl_semi_sync_slave=semisync_slave.so"
rpl-semi-sync-master-enabled = 1
rpl-semi-sync-slave-enabled = 1

# 开启Slave并行复制
slave_parallel_threads=4

# 开启Slave从Master读取binlog时进行完整校验
master-verify-checksum=1

# 只允许读，不允许写
# read only=1
```

#### 3、创建同步账户、授权

在Master执行

```
# 创建同步账户
CREATE USER 'replication_user'@'%' IDENTIFIED BY 'test123456';
#授权
GRANT REPLICATION SLAVE ON *.* TO 'replication_user'@'%';
```

#### 4、制作Master备份文件

导出Master库可以使用mysqldump逻辑备份，缺点是恢复到从库时间过长，并且恢复从库恢复期间的时候是要锁定主库的，导致主库无法写入，只能读。
假如是生产环境推荐晚上业务量少的时候进行。或者是使用MariaDB-backup进行物理备份和恢复，这个速度非常快，几分钟之内就会恢复完成；
强烈推荐使用此方式
**进行物理备份及恢复**

首先需要安装`MariaDB-backup`，添加生产数据库对应的[YUM源](https://so.csdn.net/so/search?q=YUM源&spm=1001.2101.3001.7020)，后面的`mariadb-10.3`为对应的版本，可以根据实际情况选择。目前支持：10.2 10.3 10.4 10.5 10.6

**在Master执行**

```
curl -LsS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash -s -- --mariadb-server-version="mariadb-10.3"
```

YUM安装**mariabackup**；

```
yum install MariaDB-backup
```

**获取bin-log位置点**

Slave同步时需要有binlog点和pos_id，需要提前记住

```
MariaDB [(none)]> SHOW MASTER STATUS;
+--------------------+-----------+--------------+------------------+
| File               | Position  | Binlog_Do_DB | Binlog_Ignore_DB |
+--------------------+-----------+--------------+------------------+
| master1-bin.000002 | 561866201 | test      |                  |
+--------------------+-----------+--------------+------------------+
```

**查询GTID**

```
MariaDB [(none)]> SELECT BINLOG_GTID_POS('master1-bin.000002', 561866201);
+----------------------------------------------------+
| BINLOG_GTID_POS('master1-bin.000002', 561884824)   |
|----------------------------------------------------|
| 0-1-1910                                           |
+----------------------------------------------------+
1 row in set
```

**开始创建物理备份**

```
mariabackup --backup \ # 创建指定动作为备份
--slave-info --safe-slave-backup \ # 创建从机备份
--target-dir=/backup/ \ # 指定备份目录
--user=root --password=test123456 # 指定用户名和密码
```

**创建SLave恢复文件**

```
mariabackup --prepare --target-dir=/backup/
```

通过scp复制恢复文件至2台Slave

```
scp -r backup/ root@192.168.1.171:/home/user
scp -r backup/ root@192.168.1.172:/home/user
```

**恢复备份至Slave**

恢复时需要停掉2台Slave mariadb服务，并且清空mariadb数据目录
在Slave执行

```
# 停止服务
systemctl stop mariadb

# 清空目录
 rm -rf /home/mysql/*
```

**锁住Master库避免有事务发生，更改GTID**
在Master执行

```
FLUSH TABLES WITH READ LOCK
```

**开始恢复**

```
mariabackup --copy-back --target-dir=/home/user/
```

**授权**

```
chown -R mysql:mysql /home/mysql/
```

**启动服务**

```
systemctl start mariadb
```

**待2台Slave恢复完成后，解锁Master**
在Master执行

```
UNLOCK TABLES;
```

**进行逻辑恢复备份及恢复**

在Master执行备份

```
mysqldump --master-data=2 --single-transaction --routines --all-databases -uroot -p -v >> all.sql
```

**锁库**
执行如下语句锁库
在Master执行

```
FLUSH TABLES WITH READ LOCK;
```

**恢复Slave备份**
在2个Slave恢复备份

```
mysql -u root -p -v -f < all.sql
```

**恢复完成解锁**
在Master执行

```
UNLOCK TABLES;
```

#### 5、启动Slave

开始配置同步信息

```
CHANGE MASTER TO
  MASTER_HOST='192.168.1.154',
  MASTER_USER='replication_user',
  MASTER_PASSWORD='password',
  MASTER_PORT=3306,
  MASTER_LOG_FILE='master1-bin.000002',
  MASTER_LOG_POS=561866201,
  MASTER_USE_GTID=slave_pos,
  MASTER_CONNECT_RETRY=10;
```

启动从机
在2台Slave执行

```
START SLAVE;
```

**查看从机工作状态**

```
SHOW SLAVE STATUS \G
```

查看从机工作状态，出现如下两个选项说明启动成功:

```
Slave_IO_Running: Yes
Slave_SQL_Running: Yes
```

```
***************************[ 1. row ]***************************
Slave_IO_State                | Waiting for master to send event
Master_Host                   | 192.168.1.170
Master_User                   | replication_user
Master_Port                   | 3306
Connect_Retry                 | 10
Master_Log_File               | master1-bin.000003
Read_Master_Log_Pos           | 812
Relay_Log_File                | Slave1-relay-bin.000002
Relay_Log_Pos                 | 645
Relay_Master_Log_File         | master1-bin.000003
Slave_IO_Running              | Yes
Slave_SQL_Running             | No            #这里出现未运行
Replicate_Do_DB               | 
Replicate_Ignore_DB           | 
Replicate_Do_Table            | 
Replicate_Ignore_Table        | 
Replicate_Wild_Do_Table       | 
Replicate_Wild_Ignore_Table   | 
Last_Errno                    | 1062
Last_Error                    | Could not execute Write_rows_v1 event on table vipshop.family_info; Duplicate entry '1' for key 'PRIMARY', Error_code: 1062; handler error HA_ERR_FOUND_DUPP_KEY; the event's master log master1-bin.000003, end_log_pos 781
Skip_Counter                  | 0
Exec_Master_Log_Pos           | 344
Relay_Log_Space               | 1423
Until_Condition               | None
Until_Log_File                | 
Until_Log_Pos                 | 0
Master_SSL_Allowed            | No
Master_SSL_CA_File            | 
Master_SSL_CA_Path            | 
Master_SSL_Cert               | 
Master_SSL_Cipher             | 
Master_SSL_Key                | 
Seconds_Behind_Master         | None
Master_SSL_Verify_Server_Cert | No
Last_IO_Errno                 | 0
Last_IO_Error                 | 
Last_SQL_Errno                | 1062
Last_SQL_Error                | Could not execute Write_rows_v1 event on table vipshop.family_info; Duplicate entry '1' for key 'PRIMARY', 
Error_code: 1062; handler error HA_ERR_FOUND_DUPP_KEY; 
the event's master log master1-bin.000003, end_log_pos 781
Replicate_Ignore_Server_Ids   | 
Master_Server_Id              | 1
Master_SSL_Crl                | 
Master_SSL_Crlpath            | 
Using_Gtid                    | Slave_Pos
Gtid_IO_Pos                   | 0-1-1914
Replicate_Do_Domain_Ids       | 
Replicate_Ignore_Domain_Ids   | 
Parallel_Mode                 | conservative
SQL_Delay                     | 0
SQL_Remaining_Delay           | None
Slave_SQL_Running_State       | 
```

出现报错：

could not execute Write_rows_v1 event on table vipshop.family_info; Duplicate entry '1' for key 'PRIMARY', Error_code: 1062; handler error HA_ERR_FOUND_DUPP_KEY;

修改SQL_SLAVE_SKIP_COUNTER值
SQL_SLAVE_SKIP_COUNTER设置从主节点跳过接下来的N个事件。这对于从库导致的复制停止中恢复非常有用
停止从机

```
SLAVE STOP
```

修改值为1

```
SET GLOBAL sql_slave_skip_counter = 1;
```

启动从机

```
SLAVE START
```

查询

```
SHOW SLAVE STATUS \G
```

**在出现如下工作正常**

```
Slave_IO_Running              | Yes
Slave_SQL_Running             | Yes
```

#### 6、测试

创建一个表插入几行数据

```
create table family_info (
  family_ID int(10) UNSIGNED not null auto_increment comment '主键，不能为空',
  family_name varchar(20) not null comment '姓名，不允许为空',
  sex char(1) not null comment '性别，不允许为空',
  birthday date comment '出生日期',
  occupation varchar(15) comment '职业',
  adress varchar(100) comment '地址',
  Tel varchar(20) comment '联系电话',
  create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP comment '创建时间',
  update_time timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE     CURRENT_TIMESTAMP COMMENT '更新时间',
  primary key (family_ID)
 ) comment = '家庭信息表' ENGINE = InnoDB DEFAULT CHARSET = utf8 AUTO_INCREMENT = 1;

```

### 三、主从配置参数详解

#### 1、配置参数

**启用master节点**

```
[mariadb]
log-bin
relay-log
server_id=1
log-basename=master
binlog-format=row
expire_logs_days = 30
log-slave-updates=1
```

**启用slave节点**

```
[mariadb]
log-bin
relay-log
server_id=2
log-basename=slave
binlog-format=row
log-slave-updates=1
```

#### 2、gtid变量详解

```
#gtid是以集合的方式存储

#数据库最后一个事务的gtid,gtid_slave_pos和gtid_binglog_pos的并集
#新的事务写入二进制日志,复制线程复制了新的事务
gtid_current_pos

#副本线程记录复制最后一个事务的GTID
gtid_slave_pos 

#二进制日志最后一个事务的gtid（read-only）
gtid_binlog_pos

#保存记录到二进制日志的gtid。,确定一个给定的gtid是否被记录到二进制日志中，即使二进制日志被清除
gtid_binlog_state

#尝试复制序列号低于该复制域的二进制日志中已有的序列号的 GTID，则 SQL 线程将停止并显示错误
#任何额外的、未在 GTID 集中记录的事务都可能导致复制的不一致（例如，通过直接修改二进制日志）
gtid_strict_mode

#区分不同的复制集群,默认为0
gtid-domain-id

#保存分配给最后一个事务或记录到二进制日志的语句的 GTID 
#范围：session
last_gtid

#mariadb-binlog 使用它来保存 GTID 事件的服务器 ID。
server_id

#通常与 @@gtid_domain_id 和 @@server_id ,用于设置正在解码到输出的事务的 GTID 值。
#范围：session
gtid_seq_no

#默认为OFF，多源复制,复制过程不会忽略重复的 GTID 事件，而是会对每一个事件组进行处理和执行
#允许副本连接到主库上不存在的 GTID 位置。一旦主库中存在更高序列号的 GTID（在该域内），副本将开始接收事件
#on:在多源复制中,当从库重复接收到某些事物时，启用可以忽略这些重复事务导致复制错误
gtid_ignore_duplicates=OFF

#Percona XtraDB Cluster (PXC) 或者 Galera Cluster集群
wsrep_gtid_domain_id
wsrep_gtid_mode
wsrep_gtid_seq_no

#mysql.gtid_slave_pos 表来存储 GTID 位置,为了确保崩溃安全，此表必须使用事务性存储引擎（默认InnoDB）
#mariadb 10.5中
gtid_pos_auto_engines

#MySQL的gtid_slave_pos表中积累了多少旧行之后，将运行一个后台任务来删除这些旧行
#mariadb 10.4.1中
gtid_cleanup_batch_size
```

#### 3、semisync变量详解

```
#Mariadb10.3.3版本及之后，半同步复制功能内置。之前手动安装插件
#无需重启服务器
INSTALL SONAME 'semisync_master';
INSTALL SONAME 'semisync_slave';
#服务器在启动时加载插件
#--plugin_loadchon_add不会重置插件列表,--plugin_load重置插件列表
plugin_load_add = semisync_master
plugin_load_add = semisync_slave

#是否启用半同步复制
rpl_semi_sync_master_enabled=on
rpl_semi_sync_slave_enabled=on
#在已运行副本 IO 线程的副本上在半同步复制和异步复制之间切换时，需要重新启动副本 I/O 线程
STOP SLAVE IO_THREAD;
START SLAVE IO_THREAD;

#副本在经过一定时间之前未确认事务，则会发生超时，并且主副本将切换到异步复制.（多久恢复半同步复制？）
#等待超时时间（以毫秒为单位）
#默认10s
rpl_semi_sync_master_timeout
#检查半同步复制关闭的次数（Mariadb10.3.3版本）
#Rpl_semi_sync_master_no_times

#主副本是否等待超时期限，默认为on等待
rpl_semi_sync_master_wait_no_slave


#个潜在的点，主副本可以在这两个点上等待副本确认收到事务的事件
rpl_semi_sync_master_wait_point
#after_sync:
1、主从数据一致性
2、无损故障转移
3、主服务器崩溃，存在由存储引擎准备并写入二进制日志但未提交至存储引擎的事务事件，主服务器在进行自动崩溃恢复（automatic crash recovery）重新启动服务器时恢复这些准备好的事务，旧的主服务器与已经被重新配置为新主服务器的从服务器之间的不一致。旧的主服务器只能作为半同步从服务器重新引入到复制。（等待副本确认之前崩溃数据不一致,确认之后崩溃数据可能保持一致）
主服务器崩溃，存在由存储引擎准备并写入二进制日志但未提交至存储引擎的事务事件，主服务器并未进行自动崩溃恢复,手动恢复。（等待副本确认之前崩溃可能保持一致,确认之后崩溃数据可能数据不一致）

在存储引擎中准备事务。
将事务同步到二进制日志。
等待副本的确认。
将事务提交到存储引擎。
向客户端返回确认

#AFTER_COMMIT
1、其他客户端可能会在提交客户端之前看到已提交的事务。
2、如果主服务器崩溃，则故障转移可能会丢失一些数据，因为主服务器可能已提交副本尚未确认的事务

在存储引擎中准备事务。
将事务同步到二进制日志。
将事务提交到存储引擎。
等待副本的确认。
向客户端返回确认

#跟踪日志级别:连接和断开连接,事务提交,网络等待，函数调用
rpl_semi_sync_master_trace_level
rpl_semi_sync_slave_trace_level
1: 一般级别，包含例如时间函数失败等信息。
16: 更详细级别，提供更加详细和详尽的信息。
32: 网络等待级别，包含更多关于网络等待的详细信息。
64: 函数级别，包含函数的进入和退出信息。事务同步信息

#MariaDB 10.3.3
#rpl_semi_sync_slave_delay_master 从库在确认接收到来自主库的事务之后，延迟一定时间才将确认消息发送回主库
测试和调优,模拟网络延迟,控制复制速度
#rpl_semi_sync_slave_kill_conn_timeout 从库将确认消息发生给主库等待响应，从库等待主库响应超时（超过配置的时间），从库将终止当前的复制连接。连接被终止，从库会尝试重新连接主库并继续复制
```

#### 4、parallel-replication变量详解

```
# 开启Slave并行复制
#工作线程池中创建多少个线程
slave_parallel_threads=2

#副本并行模式
#optimistic:有序并行复制的乐观模式,尝试并行应用大多数事务性 DML，并通过回滚和重试处理任何冲突
#conservative:有序并行复制的保守模式,限制并行性以避免任何冲突（默认）
#aggressive:试图最大化并行性，可能以增加冲突率为代价
#minimal：仅并行化事务的提交步骤
#none完全禁用并行应用
slave_parallel_mode=conservative

#限制每个线程的队列事件数，提高worker线程处理能力，限制它将为此使用的内存量。
#总分配实际上等效slave_parallel_max_queued * slave_parallel_threads，设置得足够低，以便并行副本队列的总分配不会导致服务器内存不足。
slave_parallel_max_queued=131072

#当设置为非零值时，一个主连接中的每个复制域在任何时候最多可以保留该多个工作线程，而其余（最多 slave_parallel_threads 值）可供其他主连接使用 或并行使用的复制域
#复制工作线程池在所有多源主线程之间共享连接，以及可以并行复制的所有复制域使用乱序（默认0）
slave_domain_parallel_threads=0

#是否禁用并行复制，默认为OFF
skip_parallel_replication


#SET @@GLOBAL.read_only = ON;
```

#### 5、tc_log启发式恢复

**崩溃恢复模式**

```
自动崩溃恢复。
手动启发式恢复时--tc-heuristic-recover设置为除OFF以外的某个值。
```

**自动崩溃恢复**

当 MariaDB 需要从崩溃中恢复并--tc-heuristic-recover设置为OFF时，自动崩溃恢复将在启动期间发生，这是默认值。

使用基于二进制日志的事务协调器日志自动崩溃恢复

如果MariaDB需要执行自动崩溃恢复，并且启用了[二进制日志](https://mariadb.com/kb/en/binary-log/)，则[错误日志](https://mariadb.com/kb/en/error-log/)将包含如下消息：

```
[Note] Recovering after a crash using cmdb-mariadb-0-bin
[Note] InnoDB: Buffer pool(s) load completed at 190313 11:24:29
[Note] Starting crash recovery...
[Note] Crash recovery finished.
```

使用基于内存映射文件的事务协调器日志自动崩溃恢复

如果MariaDB需要执行自动崩溃恢复，并且**未**启用[二进制日志](https://mariadb.com/kb/en/binary-log/)，则[错误日志](https://mariadb.com/kb/en/error-log/)将包含如下消息：

```
[Note] Recovering after a crash using tc.log
[Note] InnoDB: Buffer pool(s) load completed at 190313 11:26:32
[Note] Starting crash recovery...
[Note] Crash recovery finished.
```

**手动启发式恢复**

当设置为--tc-heuristic-recover除 OFF以外的某个值时，将发生手动启发式恢复。如果服务器在崩溃恢复期间发现事务协调器日志中未准备好的事务，则可能需要这样做。例如，[错误日志](https://mariadb.com/kb/en/error-log/)可能包含如下错误：

```
[ERROR] Found 1 prepared transactions! It means that mysqld was not shut down properly last time and critical recovery information (last binlog or tc.log file) was manually deleted after a crash. You have to start mysqld with --tc-heuristic-recover switch to commit or rollback pending transactions.
```

启动手动启发式恢复时，MariaDB 将在恢复过程中忽略事务协调器日志中有关事务的信息。MariaDB 将不会使用事务协调器日志中的信息来指导崩溃恢复。相反，它会根据管理员指定的策略来处理已经在二进制日志中记录但尚未提交或回滚的事务。在恢复过程中遇到的已准备好的事务将回滚或提交，具体取决于--tc-heuristic-recover 的值。

启动手动启发式恢复时，[错误日志](https://mariadb.com/kb/en/error-log/)将包含如下消息：

```
[Note] Heuristic crash recovery mode
```

```
#所有已准备的事务将在恢复过程中被提交
mysqld --tc-heuristic-recover=COMMIT
#所有已准备的事务将在恢复过程中被回滚
mysqld --tc-heuristic-recover=ROLLBACK
```

#### 6、Mariadb配置my.cnf

```
# 开启binlog
log-bin = mysql-bin
# 开启relaylog
relay_log=relay-log

# 配置Master,ServerID,不能和Slave重复
server-id = 1

# 更改binlog记录方式为ROW
#statement 记录sql语句,简单的SQL语句级别的复制
#ROW 记录发生更改的行的内容
#MIXED 复杂的SQL语句和特殊情况
binlog_format=ROW

#任何通过复制接收到并执行的更新都会被写入该从服务器的二进制日志中
#增加从服务器的磁盘I/O负载，因为它需要额外地记录复制事件到二进制日志
log-slave-updates=1

# 清理超过30天的binlog日志
expire_logs_days = 30

#########################
# GTID主从复制选项#
#########################
#区分不同的复制集群,默认为0
gtid_domain_id=0

# GTID严格模式
#--gtid-strict-mode[={0|1}]（默认关闭，0关系，1开启）
#尝试复制序列号低于该复制域的二进制日志中已有的序列号的 GTID，则 SQL 线程将停止并显示错误
#任何额外的、未在 GTID 集中记录的事务都可能导致复制的不一致（例如，通过直接修改二进制日志）
gtid_strict_mode=0

#默认为OFF，当从库重复接收到某些事物时，启用可以防止这些事务导致复制错误
#on:出现网络分区或其他故障时，可能会导致GTID重复,忽略重复的GTID,可能导致数据不一致
gtid_ignore_duplicates=OFF

#主库在写入二进制日志时是否验证数据的校验和完整性,，可能会影响性能
#默认为0，关闭
#master-verify-checksum=1
#从服务器（slave）复制主服务器（master）的数据时，从服务器会对接收到的数据进行校验和检查,，可能会影响性能
#默认为1开启
slave-verify-checksum=1

#主库连接信息及相关复制状态数据存储在一个特定的数据库表
#mysql.slave_master_info 
master_info_repository=table
#中继日志（Relay Log）的信息存储 mysql.slave_relay_log_info
#提升复制状态数据的可靠性和管理便利性
relay_log_info_repository=table

#########################
# 半同步主从复制选项#
#########################
# 开启半同步
plugin_load_add = semisync_master
plugin_load_add = semisync_slave

rpl-semi-sync-master-enabled = 1
rpl-semi-sync-slave-enabled = 1

#on:副本计数（由 Rpl_semi_sync_master_clients记录-半同步从节点数量）可能会降至零，并且主副本仍将等待超时期限(默认)
#off:一旦副本计数降至零，主副本将恢复为异步复制
rpl_semi_sync_master_wait_no_slave = on

#配置主超时（默认10000毫秒），副本在经过一定时间之前未确认事务，则会发生超时，并且主副本将切换到异步复制
#Rpl_semi_sync_master_status状态变量将切换到OFF
rpl_semi_sync_master_timeout=10000

#配置主等待点:AFTER_SYNC,AFTER_COMMIT(默认).
#AFTER_SYNC:等待从库写入relay-log确认信息后，将事务写到存储引擎里并把相应结果反馈给客户端(主库与从库数据一致)
#主库未commit,从库commit。实验
#AFTER_COMMIT:将事务写到存储引擎里，等待从库写入relay-log确认信息后,把相应结果反馈给客户端(在主库写入数据后和得到从库确认信息之前,主库出现错误崩溃，会导致主库写入数据丢失)
rpl_semi_sync_master_wait_point='AFTER_COMMIT';

#半同步复制的跟踪级别（什么时候开始打印）
#1：一般级别，例如时间函数故障。16：更详细的级别，更详细的信息。32：净等待级别，包括有关网络等待的更多信息。64：功能级别，包括有关功能入口和出口的信息。
#默认32
rpl_semi_sync_master_trace_level=32
rpl_semi_sync_slave_trace_level=32

#MariaDB 10.3.3
#rpl_semi_sync_slave_delay_master 仅在需要确认时写入主信息文件
#rpl_semi_sync_slave_kill_conn_timeout 用于终止主节点上副本io_thread连接的 mysql 连接超时。此超时在执行停止从属时起作用


#########################
# 并行复制选项#
#########################
# 开启Slave并行复制
#工作线程池中创建多少个线程
slave_parallel_threads=2

#副本并行模式
#optimistic:有序并行复制的乐观模式,尝试并行应用大多数事务性 DML，并通过回滚和重试处理任何冲突
#conservative:有序并行复制的保守模式,限制并行性以避免任何冲突（默认）
#aggressive:试图最大化并行性，可能以增加冲突率为代价
#minimal：仅并行化事务的提交步骤
#none完全禁用并行应用
slave_parallel_mode=conservative

#限制每个线程的队列事件数，提高worker线程处理能力，限制它将为此使用的内存量。
#总分配实际上等效slave_parallel_max_queued * slave_parallel_threads，设置得足够低，以便并行副本队列的总分配不会导致服务器内存不足。
slave_parallel_max_queued=131072

#当设置为非零值时，一个主连接中的每个复制域在任何时候最多可以保留该多个工作线程，而其余（最多 slave_parallel_threads 值）可供其他主连接使用 或并行使用的复制域
#复制工作线程池在所有多源主线程之间共享连接，以及可以并行复制的所有复制域使用乱序（默认0）
slave_domain_parallel_threads=0

#是否禁用并行复制，默认为OFF
skip_parallel_replication


#SET @@GLOBAL.read_only = ON;
```

#### 7、Mysql配置my.cnf（区别）

```
#开启gtid模式
gtid-mode=ON
#确保全局事务一致性
enforce-gtid-consistency=true

#gtid文件
gtid_binlog_pos
gtid_current_pos
gtid_slave_pos
last_gtid
```

### 四、percona-toolkit工具集

**检测主从数据一致性**

```
#检测之前一定要备份数据库
pt-table-checksum [OPTIONS] [DSN]
```

**检测主从库全部表一致性**

```
#--no-check-binlog-format：忽略二进制日志格式检查
# ROW 格式下运行 pt-table-checksum，这可能会导致一些潜在的复制问题，可能会导致复制中断和数据一致性
pt-table-checksum --user=root --password=your_password --host=master_host --chunk-size=1000 --max-lag=5 --no-check-binlog-format
```

**检测具体的库或表**

```
pt-table-checksum --user=root --password=your_password --host=master_host --databases=db_name --tables=table_name --chunk-size=1000 --max-lag=5
```

`pt-table-checksum` 将结果记录在库的 `percona.checksums` 表中。你可以使用以下查询来查看校验和结果：

```
#主库
SELECT * FROM percona.checksums;
```

**只展示与从库不一致的结果检测结果**

```
#show slave hosts确保从库信息完整 或 show processlist确保从库信息完整
#若不完整，从库配置文件中配置ip和端口
#report_host = 192.168.0.20
#report_port = 3306

pt-table-checksum --replicate-check-only --user=root --password=your_password --host=master_host --recursion-method=processlist
```

**修复不一致**

如果发现不一致的数据，可以使用 `pt-table-sync` 工具来修复。以下是一个示例命令：

```
#--replicate指定表存储校验和结果
pt-table-sync --execute --replicate=percona.checksums --user=root --password=your_password --host=master_host --chunk-size=1000 --max-lag=5 --no-check-binlog-format 
```

检查 `mydb` 数据库中的不一致的表，每次处理 1000 行数据块，并在从库的复制延迟超过 5 秒时暂停
