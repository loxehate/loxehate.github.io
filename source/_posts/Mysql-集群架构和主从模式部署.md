---
title: Mysql-集群架构和主从模式部署
tags: [Mysql]
categories: [数据库]
date: 2025-06-11
---
### 一、集群架构设计

#### 1、架构设计理念

在集群架构设计时，主要遵从下面三个维度：

```
可用性
扩展性
一致性
```

#### 2、可用性设计

```
站点高可用，冗余站点
服务高可用，冗余服务
数据高可用，冗余数据
```

**保证高可用的方法是冗余。** 但是数据冗余带来的问题是数据一致性问题。

实现高可用的方案有以下几种架构模式：

```
主从模式
简单灵活，能满足多种需求。比较主流的用法，但是写操作高可用需要自行处理。

双主模式
互为主从，有双主双写、双主单写两种方式，建议使用双主单写

如何扩展以提高写性能
分库分表
```

#### 3、一致性设计

一致性主要考虑集群中各数据库数据同步以及同步延迟问题。可以采用的方案如下：

```
不使用从库
扩展读性能问题需要单独考虑，否则容易出现系统瓶颈。

增加访问路由层
可以先得到主从同步最长时间t，在数据发生修改后的t时间内，先访问主库。
```

### 二、主从模式

#### 1、适用场景

```
MySQL主从模式是指数据可以从一个MySQL数据库服务器主节点复制到一个或多个从节点。MySQL 默认采用异步复制方式，这样从节点不用一直访问主服务器来更新自己的数据，从节点可以复制主数据库中的所有数据库，或者特定的数据库，或者特定的表。
```

![1](D:\学习\mysql\图片\主从模式.png)

mysql主从复制用途：

```
实时灾备，用于故障切换（高可用）

读写分离，提供查询服务（读扩展）

数据备份，避免影响业务（高可用）
```

主从部署必要条件：

```
从库服务器能连通主库

主库开启binlog日志（设置log-bin参数）

主从server-id不同
```

#### 2、实现原理

**主从复制**

下图是主从复制的原理图。

![](D:\学习\mysql\图片\主从复制.png)

主从复制整体分为以下三个步骤：

```
🚩 阶段 1：主库写入 binlog
应用向主库执行写操作（INSERT/UPDATE/DELETE）

主库先将事务写入 binlog（Binary Log）中，按顺序记录为 event（事件）

写入后提交事务

🚩 阶段 2：从库 IO 线程 拉取 binlog
从库启动后会开启一个 IO 线程，主动连接主库

向主库发送 SHOW BINLOG DUMP 请求，从某个位置或 GTID 开始订阅 binlog

主库由 binlog dump 线程 推送 binlog event 给从库

从库接收这些 binlog event，写入本地的 relay log（中继日志）

🚩 阶段 3：从库 SQL 线程 执行 relay log
从库的 SQL 线程 读取 relay log

将其中的 binlog event 重新解析并执行（复刻主库操作）

执行完事务后会将当前位置更新到 relay_log.info（传统）或 mysql.slave_relay_log_info（基于表的复制元数据）


SHOW VARIABLES LIKE 'relay_log_info_repository';
```

在上述三个过程中，涉及了Master的BinlogDump Thread和Slave的I/O Thread、SQL Thread，它们的作用如下：

```
Master服务器对数据库更改操作记录在Binlog中，BinlogDump Thread接到写入请求后，读取Binlog信息推送给Slave的I/O Thread。

Slave的I/O Thread将读取到的Binlog信息写入到本地Relay Log中。

Slave的SQL Thread检测到Relay Log的变更请求，解析relay log中内容在从库上执行。
```

上述过程都是异步操作，俗称异步复制，存在数据延迟现象。

下图是异步复制的时序图。

![](D:\学习\mysql\图片\异步复制.png)

mysql主从复制存在的问题：

```
主库宕机后，数据可能丢失

从库只有一个SQL Thread，主库写压力大，复制很可能延时
```

解决方法：

```
半同步复制—解决数据丢失的问题

并行复制----解决从库复制延迟的问题
```

#### **3、半同步复制**

为了提升数据安全，MySQL让Master在某一个时间点等待Slave节点的 ACK（Acknowledgecharacter）消息，接收到ACK消息后才进行事务提交，这也是半同步复制的基础，MySQL从5.5版本开始引入了半同步复制机制来降低数据丢失的概率。

介绍半同步复制之前先快速过一下 MySQL 事务写入碰到主从复制时的完整过程，主库事务写入分为 4个步骤：

```
InnoDB Redo File Write (Prepare Write)

Binlog File Flush & Sync to Binlog File

InnoDB Redo File Commit（Commit Write）

Send Binlog to Slave
```

当Master不需要关注Slave是否接受到Binlog Event时，即为传统的主从复制。

当Master需要在第三步等待Slave返回ACK时，即为 after-commit，半同步复制（MySQL 5.5引入）。

当Master需要在第二步等待 Slave 返回 ACK 时，即为 after-sync，增强半同步（MySQL 5.7引入）。

下图是 MySQL 官方对于半同步复制的时序图，主库等待从库写入 relay log 并返回 ACK 后才进行Engine Commit

![](D:\学习\mysql\图片\半同步复制.png)

#### 4、并行复制

MySQL的主从复制延迟一直是受开发者最为关注的问题之一，MySQL从5.6版本开始追加了并行复制功能，目的就是为了改善复制延迟问题，并行复制称为enhanced multi-threaded slave（简称MTS）。

在从库中有两个线程IO Thread和SQL Thread，都是单线程模式工作，因此有了延迟问题，我们可以采用多线程机制来加强，减少从库复制延迟。（IO Thread多线程意义不大，主要指的是SQL Thread多线程）

在MySQL的5.6、5.7、8.0版本上，都是基于上述SQL Thread多线程思想，不断优化，减少复制延迟。

**MySQL 5.6并行复制原理**

MySQL 5.6版本也支持所谓的并行复制，但是其并行只是基于库的。如果用户的MySQL数据库中是多个库，对于从库复制的速度的确可以有比较大的帮助。

![](D:\学习\mysql\图片\MySQL 5.6并行复制原理.png)

基于库的并行复制，实现相对简单，使用也相对简单些。基于库的并行复制遇到单库多表使用场景就发挥不出优势了，另外对事务并行处理的执行顺序也是个大问题。

**MySQL 5.7并行复制原理**

MySQL 5.7是基于组提交的并行复制，MySQL 5.7才可称为真正的并行复制，这其中最为主要的原因就是slave服务器的回放与master服务器是一致的，即master服务器上是怎么并行执行的slave上就怎样进行并行回放。不再有库的并行复制限制。

**MySQL 5.7中组提交的并行复制究竟是如何实现的？**

MySQL 5.7是通过对事务进行分组，当事务提交时，它们将在单个操作中写入到二进制日志中。如果多个事务能同时提交成功，那么它们意味着没有冲突，因此可以在Slave上并行执行，所以通过在主库上的二进制日志中添加组提交信息。

MySQL 5.7的并行复制基于一个前提，即所有已经处于prepare阶段的事务，都是可以并行提交的。这些当然也可以在从库中并行提交，因为处理这个阶段的事务都是没有冲突的，反过来说，如果有冲突，则后来的会等已经获取资源的事务完成之后才能继续，故而不会进入prepare阶段。在一个组里提交的事务，一定不会修改同一行。这是一种新的并行复制思路，完全摆脱了原来一直致力于为了防止冲突而做的分发算法，等待策略等复杂的而又效率低下的工作。

InnoDB事务提交采用的是两阶段提交模式。一个阶段是prepare，另一个是commit。

为了兼容MySQL 5.6基于库的并行复制，5.7引入了新的变量slave-parallel-type，其可以配置的值有：

    DATABASE（默认值，基于库的并行复制方式）
    
    LOGICAL_CLOCK（基于组提交的并行复制方式）

**那么如何知道事务是否在同一组中，生成的Binlog内容如何告诉Slave哪些事务是可以并行复制的？**

在MySQL 5.7版本中，其设计方式是将组提交的信息存放在GTID中。为了避免用户没有开启GTID功能（gtid_mode=OFF），MySQL 5.7又引入了称之为Anonymous_Gtid的二进制日志event类型ANONYMOUS_GTID_LOG_EVENT。

通过mysqlbinlog工具分析binlog日志，就可以发现组提交的内部信息。

可以发现MySQL 5.7二进制日志较之原来的二进制日志内容多了last_committed和sequence_number，last_committed表示事务提交的时候，上次事务提交的编号，如果事务具有相同的last_committed，表示这些事务都在一组内，可以进行并行的回放。
**MySQL8.0 并行复制**

```
 MySQL8.0 是基于write-set的并行复制。MySQL会有一个集合变量来存储事务修改的记录信息（主键哈希值），所有已经提交的事务所修改的主键值经过hash后都会与那个变量的集合进行对比，来判断改行是否与其冲突，并以此来确定依赖关系，没有冲突即可并行。这样的粒度，就到了 row级别了，此时并行的粒度更加精细，并行的速度会更快。
```

**并行复制配置与调优**

```
binlog_transaction_dependency_history_size
用于控制集合变量的大小。

binlog_transaction_depandency_tracking
用于控制binlog文件中事务之间的依赖关系，即last_committed值。
COMMIT_ORDERE: 基于组提交机制
WRITESET: 基于写集合机制
WRITESET_SESSION: 基于写集合，比writeset多了一个约束，同一个session中的事务 last_committed按先后顺序递增

transaction_write_set_extraction
用于控制事务的检测算法，参数值为：OFF、 XXHASH64、MURMUR32

master_info_repository
开启MTS功能后，务必将参数master_info_repository设置为TABLE，这样性能可以有50%~80%的提升。这是因为并行复制开启后对于元master.info这个文件的更新将会大幅提升，资源的竞争也会变大。

slave_parallel_workers
若将slave_parallel_workers设置为0，则MySQL 5.7退化为原单线程复制，但将slave_parallel_workers设置为1，则SQL线程功能转化为coordinator线程，但是只有1个worker线程进行回放，也是单线程复制。然而，这两种性能却又有一些的区别，因为多了一次coordinator线程的转发，因此slave_parallel_workers=1的性能反而比0还要差。

slave_preserve_commit_order
MySQL 5.7后的MTS可以实现更小粒度的并行复制，但需要将slave_parallel_type设置为LOGICAL_CLOCK，但仅仅设置为LOGICAL_CLOCK也会存在问题，因为此时在slave上应用事务的顺序是无序的，和relay log中记录的事务顺序不一样，这样数据一致性是无法保证的，为了保证事务是按照relay log中记录的顺序来回放，就需要开启参数slave_preserve_commit_order。
```

要开启enhanced multi-threaded slave其实很简单，只需根据如下设置：

```
slave-parallel-type=LOGICAL_CLOCK
slave-parallel-workers=16
slave_pending_jobs_size_max = 2147483648
slave_preserve_commit_order=1
master_info_repository=TABLE
relay_log_info_repository=TABLE
relay_log_recovery=ON
```

**并行复制监控**

在使用了MTS后，复制的监控依旧可以通过SHOW SLAVE STATUS\G，但是MySQL 5.7在performance_schema库中提供了很多元数据表，可以更详细的监控并行复制过程。

```
mysql> show tables like 'replication%';
+---------------------------------------------+
| Tables_in_performance_schema (replication%) |
+---------------------------------------------+
| replication_applier_configuration |
| replication_applier_status |
| replication_applier_status_by_coordinator |
| replication_applier_status_by_worker |
| replication_connection_configuration |
| replication_connection_status |
| replication_group_member_stats |
| replication_group_members |
+---------------------------------------------+
```

### 三、主从模式部署安装

#### 1、安装mysql

这里有两种安装方式

- 用过yum 进行安装 参考这篇文章 [centos7.3安装mysql5.7](https://www.cnblogs.com/black-fact/p/10840332.html)
- 通过rpm包的安装参考这篇文章[CentOS7使用rpm安装mysql5.7](https://www.cnblogs.com/diantong/p/10962705.html)

#### 2、主从模式的搭建

**配置主库**

修改master端my.cnf配置文件

先执行`systemctl stop mysqld`关闭mysql服务，然后修改/etc/my.cnf配置文件添加下面的内容

```
server-id = 1    #服务器 id，随意，但要唯一
log_bin = /var/log/mysql/mysql-bin.log    #二进制文件存放路径
read-only = 0    #[可选] 0（默认）表示读写（主机），1表示只读（从机）
binlog_expire_logs_seconds = 2592000    #设置日志文件保留的时长，单位是秒
max_binlog_size = 100M    #控制单个二进制日志大小。此参数的最大和默认值是1GB
binlog_do_db = test    #待同步的数据库日志
binlog_ignore_db = mysql,sys    #不同步的数据库日志
```

修改授权配置

创建专门用于主从复制用户账号。因此使用root账户登录mysql，并执行如下指令

执行`systemctl start mysqld`启动mysql，然后使用客户端登录，执行下面这些命令进行远程登录的授权

```
#登录
mysql -u root -p
#创建用户 我这里用户名为copyuser，注意这里的ip是从库服务器的ip
CREATE USER 'copyuser'@'192.168.1.20' IDENTIFIED WITH mysql_native_password BY '123456';
#给主从复制账号授权
grant replication slave on *.* to 'copyuser'@'192.168.1.20';
```

执行`show master status;`就能看到当前master的状态信息

![](D:\学习\mysql\图片\主库配置.png)

**配置从库**

关闭mysql服务之后修改/etc/my.cnf配置文件

```
server-id = 2    #服务器 id，随意，但要唯一
log_bin = /var/log/mysql/mysql-bin.log    #二进制文件存放路径
read-only = 1    #[可选] 0（默认）表示读写（主机），1表示只读（从机）
binlog_expire_logs_seconds = 2592000    #设置日志文件保留的时长，单位是秒
max_binlog_size = 100M    #控制单个二进制日志大小。此参数的最大和默认值是1GB
replicate_do_db = test    #待同步的数据库日志
replicate_ignore_db = mysql,sys    #不同步的数据库日志
```

重新启动mysql服务，使用客户端进行登录
执行`show slave status;`如果是首次搭建的从库会返回空

配置连接主库的相关信息

```
change master to master_host='192.168.137.145', master_port=3306, master_user='root', master_password='123456', master_log_file='mysql-bin.000001', master_log_pos=869;
```

![](D:\学习\mysql\图片\配置连接主库.png)

执行 `start slave`启动slave端
再次执行`show salve status \G`

![](D:\学习\mysql\图片\配置从库.png)

**测试**

主库插入数据

![](D:\学习\mysql\图片\主库插入数据.png)

从库查询

![](D:\学习\mysql\图片\从库查询.png)

#### 3、半同步模式搭建

**主库配置**

查询当前数据库是否支持动态安装插件

```
select @@have_dynamic_loading;
```

![](D:\学习\mysql\图片\动态安装插件.png)

查看当前已经安装的插件

```
show plugins;
```

主库安装semi插件

```
install plugin rpl_semi_sync_master soname 'semisync_master.so';
```

安装完成后查看插件`show variables like '%semi%';`

主库配置semi的相关参数

```
set global rpl_semi_sync_master_enabled=1;
set global rpl_semi_sync_master_timeout=1000; # 设置超时时间 单位毫秒
```

**从库配置**

安装semi插件 注意这里装的是slave

```
install plugin rpl_semi_sync_slave soname 'semisync_slave.so';
```

设置参数

```
set global rpl_semi_sync_slave_enabled=1;
```

重启slave

```
stop slave;
start svale;
```

**测试**

主库再次插入数据

从库查看

查看master端的日志就能看到semi相关的日志

```
vim /var/log/mysqld.log
```

![](D:\学习\mysql\图片\半同步模式.png)

#### **4、并行复制配置**

查看主库参数

```
mysql> show variables like '%binlog_group%';
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    9
Current database: study

+-----------------------------------------+-------+
| Variable_name                           | Value |
+-----------------------------------------+-------+
| binlog_group_commit_sync_delay          | 0     |  #commit提交的延迟单位毫秒
| binlog_group_commit_sync_no_delay_count | 0     |  #每组内的最大事务数
+-----------------------------------------+-------+
2 rows in set (0.06 sec)
```

设置主库参数

```
set global binlog_group_commit_sync_delay = 1000;
set global binlog_group_commit_sync_no_delay_count=100;
```

查看从库参数

```
show variables like '%slave%';
show variables like '%relay_log%';
```

设置从库参数

修改/etc/my.cnf配置文件

```
slave_parallel_type=LOGICAL_CLOCK
slave_parallel_workers=8
master_info_repository=TABLE
relay_log_info_repository=TABLE
relay_log_recovery=1
```

重启从库服务查看参数

**并行复制监控**

在使用了MTS后，复制的监控依旧可以通过SHOW SLAVE STATUS\G，但是MySQL 5.7在performance_schema库中提供了很多元数据表，可以更详细的监控并行复制过程。

切换到 performance_schema库后可以查看

```
use performance_schema;

mysql> show tables like 'replication%';
+---------------------------------------------+
| Tables_in_performance_schema (replication%) |
+---------------------------------------------+
| replication_applier_configuration           |
| replication_applier_status                  |
| replication_applier_status_by_coordinator   |
| replication_applier_status_by_worker        |
| replication_connection_configuration        |
| replication_connection_status               |
| replication_group_member_stats              |
| replication_group_members                   |
+---------------------------------------------+
8 rows in set (0.01 sec)
```

通过`replication_applier_status_by_worker`可以看到worker进程的工作情况：

```
mysql> select * from replication_applier_status_by_worker;
+--------------+-----------+-----------+---------------+-----------------------+-------------------+--------------------+----------------------+
| CHANNEL_NAME | WORKER_ID | THREAD_ID | SERVICE_STATE | LAST_SEEN_TRANSACTION | LAST_ERROR_NUMBER | LAST_ERROR_MESSAGE | LAST_ERROR_TIMESTAMP |
+--------------+-----------+-----------+---------------+-----------------------+-------------------+--------------------+----------------------+
|              |         1 |        28 | ON            |                       |                 0 |                    | 0000-00-00 00:00:00  |
|              |         2 |        30 | ON            |                       |                 0 |                    | 0000-00-00 00:00:00  |
|              |         3 |        31 | ON            |                       |                 0 |                    | 0000-00-00 00:00:00  |
|              |         4 |        32 | ON            |                       |                 0 |                    | 0000-00-00 00:00:00  |
|              |         5 |        33 | ON            |                       |                 0 |                    | 0000-00-00 00:00:00  |
|              |         6 |        34 | ON            |                       |                 0 |                    | 0000-00-00 00:00:00  |
|              |         7 |        35 | ON            |                       |                 0 |                    | 0000-00-00 00:00:00  |
|              |         8 |        36 | ON            |                       |                 0 |                    | 0000-00-00 00:00:00  |
+--------------+-----------+-----------+---------------+-----------------------+-------------------+--------------------+----------------------+

```

### 四、常见问题

#### 1、从库服务器异常重启

从库启动成功后，主从复制主键冲突，报错如下:

```
Could not execute Write_rows event on table test.logs; Duplicate entry '10790784' for key 'logs.PRIMARY', Error_code: 1062; handler error HA_ERR_FOUND_DUPP_KEY; the event's master log mysql-bin.005293, end_log_pos 284661112
```

通过与主库数据对比，发现从库多余了30条数据，且log表data字段都是mysql重启后时间，判断

```
在 MySQL 复制中，从库写入了 relay log，并执行这些 SQL

正常情况下，执行完事务后会将当前位置更新到 relay_log.info（传统）或 mysql.slave_relay_log_info（基于表的复制元数据）。

但如果 crash 来得很突然，MySQL 还没来得及更新位点文件，从而造成“事务已经执行，但位点没有更新”的假象。
```

会重新进行复制，导致复制主键冲突。

手动数据对比主键，重复数据，跳过冲突数据，主从同步恢复正常

```
stop slave;
set global sql_slave_skip_counter=1;
start slave;
```

