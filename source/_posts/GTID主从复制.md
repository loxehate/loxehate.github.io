---
title: GTID主从复制
tags: [Mysql]
categories: [数据库]
date: 2025-05-08
---
### 一、GTID介绍

#### 1、GTID是什么

GTID(Global Transaction ID)是对于一个已提交事务的编号，并且是一个全局唯一的编号。GTID实际上是由UUID+TID组成的。其中UUID是一个MySQL实例的唯一标识，保存在mysql数据目录下的auto.cnf文件里。TID代表了该实例上已经提交的事务数量，并且随着事务提交单调递增。下面是一个GTID的具体形式：3E11FA47-71CA-11E1-9E33-C80AA9429562:23。

    全称为: Global Transaction ID ,可简化MySQL(5.6版本之后)的主从切换以及Failover。
    GTID是一个字符串类似 `3E11FA47-71CA-11E1-9E33-C80AA9429562:23` 
    由UUID+TID组成，UUID代表MySQL实例，TID代表这个实例提交的事务数量。

#### 2、GTID Replication介绍

从MySQL5.6开始增加了强大的GTID（Global Transaction ID，全局事务ID）这个特性，用来强化数据库的主备一致性， 故障恢复， 以及容错能力。用于取代过去传统的主从复制（即：基于binlog和position的异步复制）。借助GTID，在发生主备切换的情况下，MySQL的其他slave可以自动在新主上找到正确的复制位置，这大大简化了复杂复制拓扑下集群的维护，也减少了人为设置复制position发生误操作的风险。另外，基于GTID的复制可以忽略已经执行过的事务，减少了数据发生不一致的风险。

#### 3、GTID的组成

GTID是由server_uuid和事务id组成的，即GTID=server_uuid:transaction_id。

```
server_uuid，是在MySQL第一次启动时自动生成并持久化到auto.cnf文件（存放在数据目录下，每台机器的server_uuid都不一样。
transaction_id，是一个从1开始的自增计数，表示在这个主库上执行的第n个事务。MySQL会保证事务与GTID之间的1:1映射，
如：6ba9a76d-606b-11ea-b3ce-000c29cb3421:1
表示在以6ba9a76d-606b-11ea-b3ce-000c29cb3421为唯一标识的MySQL实例上执行的第1个数据库事务。
一组连续的事务可以用 “-” 连接的事务序号范围表示。例如：6ba9a76d-606b-11ea-b3ce-000c29cb3421:1-15
```

#### 4、GTID的作用

```
根据GTID可以知道事务最初是在哪个实例上提交的
GTID的存在方便了Replication的Failover
```

#### 5、为什么要用GTID

```
在主从复制中，尤其是半同步复制中， 由于Master 的dump进程一边要发送binlog给Slave，一边要等待Slave的ACK消息，这个过程是串行的，即前一个事物的ACK没有收到消息，那么后一个事物只能排队候着； 这样将会极大地影响性能；有了GTID后，SLAVE就直接可以通过数据流获得GTID信息，而且可以同步

主从故障切换中，如果一台MASTER down，需要提取拥有最新日志的SLAVE做MASTER，这个是很好判断，而有了GTID，就只要以GTID为准即可方便判断；而有了GTID后，SLAVE就不需要一直保存这bin-log 的文件名和Position了；只要启用MASTER_AUTO_POSITION 即可

当MASTER crash的时候，GTID有助于保证数据一致性，因为每个事物都对应唯一GTID，如果在恢复的时候某事物被重复提交，SLAVE会直接忽略
```

#### 6、GTID比传统复制的优势

```
更简单的实现failover，不用以前那样在需要找log_file和log_Pos
更简单的搭建主从复制
比传统复制更加安全
GTID是连续没有空洞的，因此主从库出现数据冲突时，可以用添加空事物的方式进行跳过
```

#### 7、GTID复制实现的工作原理

```
主节点更新数据时，会在事务前产生GTID，一起记录到binlog日志中
从节点的I/O线程将变更的bin log，写入到本地的relay log中
SQL线程从relay log中获取GTID，然后对比本地binlog是否有记录（所以MySQL从节点必须要开启binary log）
如果有记录，说明该GTID的事务已经执行，从节点会忽略
如果没有记录，从节点就会从relay log中执行该GTID的事务，并记录到bin log
在解析过程中会判断是否有主键，如果没有就用二级索引，如果有就用全部扫描
```

### 二、主从复制

#### 1、一主一从

| 数据库 | IP             |
| :----- | -------------- |
| master | 192.268.25.140 |
| slave  | 192.168.25.142 |

##### 1.1 部署数据库可查看 <MYSQL主从>

##### 1.2 授权一个用户，用于主从复制

```
mysql> show  variables like '%gtid%';
+----------------------------------+-----------+
| Variable_name                    | Value     |
+----------------------------------+-----------+
| binlog_gtid_simple_recovery      | ON        |
| enforce_gtid_consistency         | OFF       |
| gtid_executed_compression_period | 1000      |
| gtid_mode                        | OFF       |
| gtid_next                        | AUTOMATIC |
| gtid_owned                       |           |
| gtid_purged                      |           |
| session_track_gtids              | OFF       |
+----------------------------------+-----------+
8 rows in set (0.01 sec)

mysql> create user 'zj'@'192.168.25.142' identified by "1";
Query OK, 0 rows affected (0.01 sec)

mysql> grant  replication slave on *.* to  'zj'@'192.168.25.142'  ;
Query OK, 0 rows affected (0.00 sec)

mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)
```

##### 1.3 修改master主配文件

```
[root@localhost ~]# vim /etc/my.cnf
[mysqld]
basedir = /usr/local/mysql
datadir = /opt/data
socket = /tmp/mysql.sock
port = 3306
pid-file = /opt/data/mysql.pid
skip-name-resolve

log-bin = mysql-bin #开启二进制日志 
server-id = 1
gtid-mode = on #开启gtid模式
enforce-gtid-consistency = on #强制gtid一致性，开启后对特定的create table不被支持
binlog-format = row  #默认为mixed混合模式，更改成row复制，为了数据一致性
log-slave-updates = 1  #从库binlog才会记录主库同步的操作日志
skip-slave-start = 1   #跳过slave复制线程

// 重启数据库服务
[root@localhost ~]# service mysqld restart
Shutting down MySQL.. SUCCESS! 
Starting MySQL. SUCCESS! 

// 查看master数据库状态
mysql> show master status;
+------------------+----------+--------------+------------------+------------------------------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set                        |
+------------------+----------+--------------+------------------+------------------------------------------+
| mysql-bin.000014 |     1951 |              |                  | b736875b-097e-11ec-b557-000c29810dc2:1-9 |
+------------------+----------+--------------+------------------+------------------------------------------+
1 row in set (0.00 sec)
```

##### 1.4 slave主配文件

```
[root@localhost ~]# vim /etc/my.cnf
[mysqld]
basedir = /usr/local/mysql
datadir = /opt/data
socket = /tmp/mysql.sock
port = 3306  
pid-file = /opt/data/mysql.pid
skip-name-resolve 
            
server-id = 2    
log-bin = mysql-bin 
binlog-format = row 
skip-slave-start = 1
log-slave-updates = 1
gtid-mode = on 
enforce-gtid-consistency = on  

[root@localhost ~]# service mysqld restart
Shutting down MySQL.. SUCCESS! 
Starting MySQL. SUCCESS! 
```

##### 1.5 配置slave主机，授权从数据库

```
// 检查gtid模式状态
mysql> show  variables like '%gtid%';
+----------------------------------+-----------+
| Variable_name                    | Value     |
+----------------------------------+-----------+
| binlog_gtid_simple_recovery      | ON        |
| enforce_gtid_consistency         | ON        |
| gtid_executed_compression_period | 1000      |
| gtid_mode                        | ON        |
| gtid_next                        | AUTOMATIC |
| gtid_owned                       |           |
| gtid_purged                      |           |
| session_track_gtids              | OFF       |
+----------------------------------+-----------+


mysql> reset slave;
Query OK, 0 rows affected (0.01 sec)

mysql> change master to
    -> master_host='192.168.25.140' ,
    -> master_user='zj' ,
    -> master_password='1' ,
    -> master_auto_position=1;
Query OK, 0 rows affected, 2 warnings (0.01 sec)


mysql> start slave ;
Query OK, 0 rows affected (0.00 sec)

mysql> show slave status\G
*************************** 1. row ***************************
               Slave_IO_State: Waiting for master to send event
                  Master_Host: 192.168.25.140
                  Master_User: zj
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: mysql-bin.000014
          Read_Master_Log_Pos: 154
               Relay_Log_File: localhost-relay-bin.000003
                Relay_Log_Pos: 367
        Relay_Master_Log_File: mysql-bin.000014
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
```

##### 1.6 验证主从复制

```
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| JJ         |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)


mysql> show master status;
+------------------+----------+--------------+------------------+-------------------------------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set                         |
+------------------+----------+--------------+------------------+-------------------------------------------+
| mysql_bin.000006 |     1389 |              |                  | b736875b-097e-11ec-b557-000c29810dc2:1-10 |
+------------------+----------+--------------+------------------+-------------------------------------------+
1 row in set (0.00 sec)
```

#### 2、一主多从

| 数据库 | IP             |
| ------ | -------------- |
| master | 192.168.25.140 |
| slave  | 192.168.25.142 |
| slave  | 192.268.25.144 |

##### 2.1 第二台从数据库slave主配文件

```
[root@localhost ~]# vim /etc/my.cnf
[mysqld]
basedir = /usr/local/mysql
datadir = /opt/data
socket = /tmp/mysql.sock
port = 3306  
pid-file = /opt/data/mysql.pid
skip-name-resolve 
            
server-id = 3  //第三台从服务器id 不能与前面使用过的一样  
log-bin = mysql-bin 
binlog-format = row 
skip-slave-start = 1
log-slave-updates = 1
gtid-mode = on 
enforce-gtid-consistency = on  

[root@localhost ~]# service mysqld restart
Shutting down MySQL.. SUCCESS! 
Starting MySQL. SUCCESS
```

##### 2.2 配置第二台slave主机

```
mysql> show  variables like '%gtid%';
+----------------------------------+-----------+
| Variable_name                    | Value     |
+----------------------------------+-----------+
| binlog_gtid_simple_recovery      | ON        |
| enforce_gtid_consistency         | ON        |
| gtid_executed_compression_period | 1000      |
| gtid_mode                        | ON        |
| gtid_next                        | AUTOMATIC |
| gtid_owned                       |           |
| gtid_purged                      |           |
| session_track_gtids              | OFF       |
+----------------------------------+-----------+


mysql> reset slave;
Query OK, 0 rows affected (0.01 sec)

mysql> change master to
    -> master_host='192.168.25.140' ,
    -> master_user='zj' ,
    -> master_password='1' ,
    -> master_auto_position=1;
Query OK, 0 rows affected, 2 warnings (0.01 sec)


mysql> start slave ;
Query OK, 0 rows affected (0.00 sec)

mysql> show slave status\G
*************************** 1. row ***************************
               Slave_IO_State: Waiting for master to send event
                  Master_Host: 192.168.25.140
                  Master_User: zj
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: mysql-bin.000014
          Read_Master_Log_Pos: 1776
               Relay_Log_File: localhost-relay-bin.000004
                Relay_Log_Pos: 454
        Relay_Master_Log_File: mysql-bin.000014
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| JJ                 |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)


mysql> show master status;
+------------------+----------+--------------+------------------+---------------------------------------------------------------------------------------------------------------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set                                                                                                         |
+------------------+----------+--------------+------------------+---------------------------------------------------------------------------------------------------------------------------+
| mysql_bin.000008 |      750 |              |                  | b736875b-097e-11ec-b557-000c29810dc2:1-10,
ba11a7ff-097f-11ec-9272-000c29959565:1,
ddd6f885-0a26-11ec-81cc-000c29f2278e:1 |
+------------------+----------+--------------+------------------+---------------------------------------------------------------------------------------------------------------------------+
```

#### 3、多主一从

| 数据库 | IP             |
| ------ | -------------- |
| master | 192.168.25.140 |
| master | 192.168.25.142 |
| slave  | 192.168.25.144 |

##### 3.1 两台主数据库配置和上述主数据库相同，从数据库配置也相同

##### 3.2 查看主库信息

```
//主库1
mysql> show master status;
+------------------+----------+--------------+------------------+-------------------------------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set                         |
+------------------+----------+--------------+------------------+-------------------------------------------+
| mysql-bin.000014 |     2128 |              |                  | b736875b-097e-11ec-b557-000c29810dc2:1-10 |
+------------------+----------+--------------+------------------+-------------------------------------------+
1 row in set (0.00 sec)


主库2
mysql> show master status;
+------------------+----------+--------------+------------------+-------------------------------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set                         |
+------------------+----------+--------------+------------------+-------------------------------------------+
| mysql-bin.000002 |      154 |              |                  | b736875b-097e-11ec-b557-000c29810dc2:1-10 |
+------------------+----------+--------------+------------------+-------------------------------------------+
1 row in set (0.00 sec)
```

##### 3.3 配置slave主机

```
//检查gtid模式状态

mysql> show  variables like '%gtid%';
+----------------------------------+-----------+
| Variable_name                    | Value     |
+----------------------------------+-----------+
| binlog_gtid_simple_recovery      | ON        |
| enforce_gtid_consistency         | ON        |
| gtid_executed_compression_period | 1000      |
| gtid_mode                        | ON        |
| gtid_next                        | AUTOMATIC |
| gtid_owned                       |           |
| gtid_purged                      |           |
| session_track_gtids              | OFF       |
+----------------------------------+-----------+


mysql> reset slave;
Query OK, 0 rows affected (0.01 sec)
```

##### 3.4 在从库上配置主库信息

```
//配置主库1

//下面两条命令不执行，后续会报错
mysql> set global master_info_repository='table';
Query OK, 0 rows affected (0.00 sec)

mysql> set global relay_log_info_repository='table';
Query OK, 0 rows affected (0.00 sec)


mysql> change master to
    -> master_host='192.168.25.140' ,  //这里是主库IP
    -> master_user='zj' ,
    -> master_password='1' ,
    -> master_log_file='mysql-bin.000014'
    -> master_log_pos=2128
    -> for channel 'master-1';  //创建隧道
    

配置主库2

mysql> change master to
    -> master_host='192.168.25.142' ,
    -> master_user='zj' ,
    -> master_password='1' ,
    -> master_log_file='mysql-bin.000002'
    -> master_log_pos=154
    -> for channel 'master-2';  //创建隧道
    
mysql> START SLAVE;
Query OK, 0 rows affected (0.00 sec)


//查看发现都已经开启
mysql> SHOW SLAVE STATUS\G
*************************** 1. row ***************************
               Slave_IO_State: Waiting for master to send event
                  Master_Host: 192.168.25.140
                  Master_User: zj
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: mysql-bin.000014
          Read_Master_Log_Pos: 2128
               Relay_Log_File: localhost-relay-bin-master@002d1.000002
                Relay_Log_Pos: 320
        Relay_Master_Log_File: mysql-bin.000014
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
              Replicate_Do_DB: 
          Replicate_Ignore_DB: 
           Replicate_Do_Table: 
       Replicate_Ignore_Table: 
      Replicate_Wild_Do_Table: 
  Replicate_Wild_Ignore_Table: 
                   Last_Errno: 0
                   Last_Error: 
                 Skip_Counter: 0
          Exec_Master_Log_Pos: 2128
              Relay_Log_Space: 544
              Until_Condition: None
               Until_Log_File: 
                Until_Log_Pos: 0
           Master_SSL_Allowed: No
           Master_SSL_CA_File: 
           Master_SSL_CA_Path: 
              Master_SSL_Cert: 
            Master_SSL_Cipher: 
               Master_SSL_Key: 
        Seconds_Behind_Master: 0
Master_SSL_Verify_Server_Cert: No
                Last_IO_Errno: 0
                Last_IO_Error: 
               Last_SQL_Errno: 0
               Last_SQL_Error: 
  Replicate_Ignore_Server_Ids: 
             Master_Server_Id: 1
                  Master_UUID: b736875b-097e-11ec-b557-000c29810dc2
             Master_Info_File: mysql.slave_master_info
                    SQL_Delay: 0
          SQL_Remaining_Delay: NULL
      Slave_SQL_Running_State: Slave has read all relay log; waiting for more updates
           Master_Retry_Count: 86400
                  Master_Bind: 
      Last_IO_Error_Timestamp: 
     Last_SQL_Error_Timestamp: 
               Master_SSL_Crl: 
           Master_SSL_Crlpath: 
           Retrieved_Gtid_Set: 
            Executed_Gtid_Set: baf6e1ae-0a32-11ec-bf3d-000c29f2278e:1
                Auto_Position: 0
         Replicate_Rewrite_DB: 
                 Channel_Name: master-1
           Master_TLS_Version: 
*************************** 2. row ***************************
               Slave_IO_State: Waiting for master to send event
                  Master_Host: 192.168.25.142
                  Master_User: zj
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: mysql-bin.000002
          Read_Master_Log_Pos: 154
               Relay_Log_File: localhost-relay-bin-master@002d2.000002
                Relay_Log_Pos: 320
        Relay_Master_Log_File: mysql-bin.000002
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
              Replicate_Do_DB: 
          Replicate_Ignore_DB: 
           Replicate_Do_Table: 
       Replicate_Ignore_Table: 
      Replicate_Wild_Do_Table: 
  Replicate_Wild_Ignore_Table: 
                   Last_Errno: 0
                   Last_Error: 
                 Skip_Counter: 0
          Exec_Master_Log_Pos: 154
              Relay_Log_Space: 544
              Until_Condition: None
               Until_Log_File: 
                Until_Log_Pos: 0
           Master_SSL_Allowed: No
           Master_SSL_CA_File: 
           Master_SSL_CA_Path: 
              Master_SSL_Cert: 
            Master_SSL_Cipher: 
               Master_SSL_Key: 
        Seconds_Behind_Master: 0
Master_SSL_Verify_Server_Cert: No
                Last_IO_Errno: 0
                Last_IO_Error: 
               Last_SQL_Errno: 0
               Last_SQL_Error: 
  Replicate_Ignore_Server_Ids: 
             Master_Server_Id: 2
                  Master_UUID: ba11a7ff-097f-11ec-9272-000c29959565
             Master_Info_File: mysql.slave_master_info
                    SQL_Delay: 0
          SQL_Remaining_Delay: NULL
      Slave_SQL_Running_State: Slave has read all relay log; waiting for more updates
           Master_Retry_Count: 86400
                  Master_Bind: 
      Last_IO_Error_Timestamp: 
     Last_SQL_Error_Timestamp: 
               Master_SSL_Crl: 
           Master_SSL_Crlpath: 
           Retrieved_Gtid_Set: 
            Executed_Gtid_Set: baf6e1ae-0a32-11ec-bf3d-000c29f2278e:1
                Auto_Position: 0
         Replicate_Rewrite_DB: 
                 Channel_Name: master-2
           Master_TLS_Version: 
2 rows in set (0.00 sec)
```

##### 3.5 验证测试

```
主库1上创建数据库ll
mysql> create database ll;
Query OK, 1 row affected (0.00 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| ll                 |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)


主库2上创建数据库mm
mysql> create database mm;
Query OK, 1 row affected (0.00 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| mm                 |
+--------------------+
5 rows in set (0.00 sec)



// 从库上开启从服务后查看
mysql> start slave;
Query OK, 0 rows affected (0.00 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| ll                 |
| mysql              |
| performance_schema |
| sys                |
| mm                 |
+--------------------+
6 rows in set (0.00 sec)
```

### 三、新增从复制节点(基于GTID)

#### 1、Mariadb

##### 1.1 备份数据库并准备数据库

```
mariabackup --backup \
   --target-dir=/var/mariadb/backup/ \
   --user=mariabackup --password=mypassword
```

如果源数据库服务器是所需主数据库的[副本](https://kb-gcp.mariadb.com/kb/en/high-availability-performance-tuning-mariadb-replication/)，那么我们应该添加 [--slave-info](https://kb-gcp.mariadb.com/kb/en/mariabackup-options/#-slave-info) 选项，可能还有 [--safe-slave-backup](https://kb-gcp.mariadb.com/kb/en/mariabackup-options/#-safe-slave-backup) 选项

```
mariabackup --backup \
   --slave-info --safe-slave-backup \
   --target-dir=/var/mariadb/backup/ \
   --user=mariabackup --password=mypassword
```

准备备份

```
mariabackup --prepare \
   --target-dir=/var/mariadb/backup/
```

##### 1.2 将备份复制到新副本

备份完成并准备好后，我们可以将其复制到新的副本

```
rsync -avP /var/mariadb/backup dbserver2:/var/mariadb/backup
```

##### 1.3 在新副本上还原备份在新副本上还原备份

```
 mariabackup --copy-back \
   --target-dir=/var/mariadb/backup/
```

必要时调整文件权限

```
 chown -R mysql:mysql /var/lib/mysql/
```

##### 1.4 在主服务器上创建复制用户

在新副本开始从主副本开始复制之前，我们需要在主副本上[创建一个用户帐户](https://kb-gcp.mariadb.com/kb/en/create-user/)，副本可以使用该帐户进行连接，并且我们需要[授予](https://kb-gcp.mariadb.com/kb/en/grant/)用户帐户 [REPLICATION SLAVE](https://kb-gcp.mariadb.com/kb/en/grant/#global-privileges) 权限。例如：

```
CREATE USER 'repl'@'dbserver2' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.*  TO 'repl'@'dbserver2';
```

##### 1.5 在新副本上启动复制

从原始备份目录中获取主节点的复制坐标: [GTID](https://kb-gcp.mariadb.com/kb/en/gtid/) 坐标和[二进制日志](https://kb-gcp.mariadb.com/kb/en/binary-log/)文件和位置坐标

如果我们在主服务器上进行了备份，那么坐标将位于[xtrabackup_binlog_info](https://kb-gcp.mariadb.com/kb/en/files-created-by-mariabackup/#xtrabackup_binlog_info)文件中。如果我们在另一个副本上进行了备份，并且我们提供了 [--slave-info](https://kb-gcp.mariadb.com/kb/en/mariabackup-options/#-slave-info) 选项，那么坐标将在文件[xtrabackup_slave_info](https://kb-gcp.mariadb.com/kb/en/files-created-by-mariabackup/#xtrabackup_slave_info)文件中。

例如：

```
mariadb-bin.000096 568 0-1-2
```

##### 1.6 全球直流识别仪(建议采用)

如果我们想使用 GTID，那么我们必须首先将 [gtid_slave_pos](https://kb-gcp.mariadb.com/kb/en/gtid/#gtid_slave_pos) 设置为从备份目录中的 [xtrabackup_binlog_info](https://kb-gcp.mariadb.com/kb/en/files-created-by-mariabackup/#xtrabackup_binlog_info) 文件或 [xtrabackup_slave_info](https://kb-gcp.mariadb.com/kb/en/files-created-by-mariabackup/#xtrabackup_slave_info) 文件中提取的 [GTID](https://kb-gcp.mariadb.com/kb/en/gtid/) 坐标。例如：

```
$ cat xtrabackup_binlog_info
mariadb-bin.000096 568 0-1-2
```

然后，我们将设置 [CHANGE MASTER TO](https://kb-gcp.mariadb.com/kb/en/change-master-to/) 命令。例如：`MASTER_USE_GTID=slave_pos`

```
SET GLOBAL gtid_slave_pos = "0-1-2";
CHANGE MASTER TO 
   MASTER_HOST="dbserver1", 
   MASTER_PORT=3306, 
   MASTER_USER="repl",  
   MASTER_PASSWORD="password", 
   MASTER_USE_GTID=slave_pos;
START SLAVE;
```

##### 1.7 文件和位置

如果我们想使用[二进制日志](https://kb-gcp.mariadb.com/kb/en/binary-log/)文件和位置坐标，那么我们将在 [CHANGE MASTER TO](https://kb-gcp.mariadb.com/kb/en/change-master-to/) 命令中将 and 设置为我们拉取的文件和位置坐标;备份目录中的[xtrabackup_binlog_info](https://kb-gcp.mariadb.com/kb/en/files-created-by-mariabackup/#xtrabackup_binlog_info)文件或[xtrabackup_slave_info](https://kb-gcp.mariadb.com/kb/en/files-created-by-mariabackup/#xtrabackup_slave_info)文件，具体取决于备份是从主数据库还是从主数据库的副本获取备份。例如：`MASTER_LOG_FILE``MASTER_LOG_POS`

```
CHANGE MASTER TO 
   MASTER_HOST="dbserver1", 
   MASTER_PORT=3306, 
   MASTER_USER="repl",  
   MASTER_PASSWORD="password", 
   MASTER_LOG_FILE='mariadb-bin.000096',
   MASTER_LOG_POS=568;
START SLAVE;
```

##### 1.8 检查新副本的状态

我们现在应该已经完成了副本的设置，因此我们应该使用 [SHOW SLAVE STATUS](https://kb-gcp.mariadb.com/kb/en/show-slave-status/) 检查其状态。例如：

```
SHOW SLAVE STATUS\G
```

##### 1.9 设置副本只读模式

```
SET @@GLOBAL.read_only = ON;
```

#### 2、Mysql

##### 2.1 主库开启gtid模式

```
log-bin = mysql-bin #开启二进制日志 
server-id = 1
gtid-mode = on #开启gtid模式
enforce-gtid-consistency = on #强制gtid一致性，开启后对特定的create table不被支持
```

##### 2.2 查看master数据库状态

```
show  master status;
```

##### 2.3 备份数据库并准备数据库

```
xtrabackup --backup \
   --target-dir=/var/mariadb/backup/ \
   --user=mariabackup --password=mypassword
```

##### 2.4 将备份复制到新副本

备份完成并准备好后，我们可以将其复制到新的副本

```
rsync -avP /var/mariadb/backup dbserver2:/var/mariadb/backup
```

##### 2.5 在新副本上还原备份在新副本上还原备份

```
xtrabackup --copy-back \ --target-dir=/var/mariadb/backup/
```

必要时调整文件权限

```
 chown -R mysql:mysql /var/lib/mysql/
```

##### 2.6 在主服务器上创建复制用户

在新副本开始从主副本开始复制之前，我们需要在主副本上[创建一个用户帐户](https://kb-gcp.mariadb.com/kb/en/create-user/)，副本可以使用该帐户进行连接，并且我们需要[授予](https://kb-gcp.mariadb.com/kb/en/grant/)用户帐户 [REPLICATION SLAVE](https://kb-gcp.mariadb.com/kb/en/grant/#global-privileges) 权限。例如：

```
CREATE USER 'repl'@'dbserver2' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.*  TO 'repl'@'dbserver2';
```

##### 2.7 在新副本上开启gtid模式

```
log-bin = mysql-bin #开启二进制日志 
server-id = 2 #与主库一定要不一致
gtid-mode = on #开启gtid模式
enforce-gtid-consistency = on #强制gtid一致性，开启后对特定的create table不被支持
```

##### 2.8 在新副本上启动复制

从原始备份目录中获取主节点的复制坐标: [GTID](https://kb-gcp.mariadb.com/kb/en/gtid/) 坐标和[二进制日志](https://kb-gcp.mariadb.com/kb/en/binary-log/)文件和位置坐标

如果我们在主服务器上进行了备份，那么坐标将位于[xtrabackup_binlog_info](https://kb-gcp.mariadb.com/kb/en/files-created-by-mariabackup/#xtrabackup_binlog_info)文件中。如果我们在另一个副本上进行了备份，并且我们提供了 [--slave-info](https://kb-gcp.mariadb.com/kb/en/mariabackup-options/#-slave-info) 选项，那么坐标将在文件[xtrabackup_slave_info](https://kb-gcp.mariadb.com/kb/en/files-created-by-mariabackup/#xtrabackup_slave_info)文件中。

例如：

```
mariadb-bin.000096 568 0-1-2
```

##### 2.9 全球直流识别仪(建议采用)

如果我们想使用 GTID，那么我们必须首先将 GTID_PURGED 设置为从备份目录中的 [xtrabackup_binlog_info](https://kb-gcp.mariadb.com/kb/en/files-created-by-mariabackup/#xtrabackup_binlog_info) 文件或 [xtrabackup_slave_info](https://kb-gcp.mariadb.com/kb/en/files-created-by-mariabackup/#xtrabackup_slave_info) 文件中提取的 [GTID](https://kb-gcp.mariadb.com/kb/en/gtid/) 坐标。例如：

```
$ cat xtrabackup_binlog_info
mysqldb-bin.000096 568 0-1-2
```

然后，我们将设置 [CHANGE MASTER TO](https://kb-gcp.mariadb.com/kb/en/change-master-to/) 命令。例如：`MASTER_USE_GTID=slave_pos`

```
SET @@GLOBAL.GTID_PURGED='73c029dc-2034-11e8-90a5-005056a365b6:1-594908;
CHANGE MASTER TO 
   MASTER_HOST="dbserver1", 
   MASTER_PORT=3306, 
   MASTER_USER="repl",  
   MASTER_PASSWORD="password", 
   MASTER_AUTO_POSITION = 1;
START SLAVE;
```

##### 2.10 检查新副本的状态

我们现在应该已经完成了副本的设置，因此我们应该使用 [SHOW SLAVE STATUS](https://kb-gcp.mariadb.com/kb/en/show-slave-status/) 检查其状态。例如：

```
SHOW SLAVE STATUS\G
```

##### 2.11 设置副本只读模式

```
SET @@GLOBAL.read_only = ON;
```

### 四、主从同步错误总结

#### 1、错误跳过

```
# my.cnf,跳过指定error no类型的错误
# slave-skip-errors=1062,1053,1146
replica-skip-errors=1032,1062,1053,1146
```

或

```
set global sql_slave_skip_counter=1;
```

#### 2、mysql：定位错误 1062

select * from performance_schema.replication_applier_status_by_worker\G

```
*************************** 1. row ***************************
...

                                      LAST_ERROR_NUMBER: 1062
                                     LAST_ERROR_MESSAGE: Worker 1 failed executing transaction 'be41e172-f145-11ec-9b3c-00155d5aa636:247' at source log binlog.000002, end_log_pos 50007; Could not execute Write_rows event on table lyd-test.zt_debuglog; Duplicate entry '18666' for key 'zt_debuglog.PRIMARY', Error_code: 1062; handler error HA_ERR_FOUND_DUPP_KEY; the event's source log binlog.000002, end_log_pos 50007
                                   LAST_ERROR_TIMESTAMP: 2023-07-27 08:43:30.727645
...
```

重点 ：
Duplicate entry ‘18666’ for key ‘zt_debuglog.PRIMARY’,

key 重复了？

在从服务器上已经有该key，现在又插入了同一条记录，冲突了！

**尝试解决 1062**

```
#空事务跳过，也可以直接忽略
mysql> STOP REPLICA;
Query OK, 0 rows affected (0.06 sec)

mysql> SET @@SESSION.GTID_NEXT='be41e172-f145-11ec-9b3c-00155d5aa636:247';
Query OK, 0 rows affected (0.00 sec)

mysql> BEGIN; COMMIT;
Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.06 sec)

mysql> SET SESSION GTID_NEXT=AUTOMATIC;
Query OK, 0 rows affected (0.01 sec)

mysql> START REPLICA;
Query OK, 0 rows affected (0.19 sec)
```

####  3、清理从库

```
stop slave;
reset slave all;
```

#### 4、从库表报不存在

```
mariadb ibd和frm文件存在，但却查不到该表


1813 - Tablespace for table 'database_name.table_name' exists. Please DISCARD the tablespace before IMPORT.

1932 - Table 'database_name.table_name' doesn't exist in engine
```

```
#停止同步
stop slave;

#跳过 GTID 检查(会话级别)
SET SESSION sql_log_bin=0;

#丢弃表空间
ALTER TABLE database_name.table_name DISCARD TABLESPACE;

#导入表空间
ALTER TABLE database_name.table_name IMPORT TABLESPACE;

#启用 GTID 检查
SET SESSION sql_log_bin=1;

#启动同步
start slave;

#查看同步状态
SHOW SLAVE STATUS\G;
```

