---
title: Mysql-慢查询日志slow log
tags: [Mysql]
categories: [数据库]
date: 2025-05-08
---
### 一、慢查询日志（slow log）

慢查询日志，就是查询超过一定的时间没有返回结果的时候，MySQL会将执行的SQL记录到日志中，这个日志，就称为慢查询日志。通过分析慢查询日志，可以快速找出执行慢的[SQL语句](https://so.csdn.net/so/search?q=SQL语句&spm=1001.2101.3001.7020)，然后进行优化。

慢查询主要的参数如下，后面会具体说明这几个参数：

```cpp
+---------------------------------------+----------------------------------+---------------------------------------------
| Variable_name                         | Value                            | Content                                     
+---------------------------------------+----------------------------------+---------------------------------------------
| slow_query_log                        | OFF                              |开启慢查询                                   
| long_query_time                       | 10.000000                        |慢查询时间阈值，执行时间超过阈值的SQL才会记录
| log_output                            | FILE                             |慢查询日志存储形式：FILE、TABLE              
| slow_query_log_file                   | /var/lib/mysql/hostname-slow.log |慢日志存放位置                               
| log_queries_not_using_indexes         | OFF                              |记录任何不使用索引的sql                      
| log_throttle_queries_not_using_indexes| 0                                |每分钟允许记录到slow log的且未使用索引的SQL语句次数
+---------------------------------------+----------------------------------+---------------------------------------------
```

### 二、慢查询日志相关参数

#### 1、是否启用慢查询日志（slow_query_log）

默认情况下，MySQL并不开启慢查询日志，需要手动开启

```
show variables like 'slow_query_log';
```

```
mysql> show variables like 'slow_query_log';
+----------------+-------+
| Variable_name  | Value |
+----------------+-------+
| slow_query_log | OFF    |
+----------------+-------+
1 row in set (0.02 sec)
```

通过修改MySQL配置文件开启慢查询日志 

#### 2、记录慢查询SQL时间（long_query_time）

慢查询日志还有一个重要参数 long_query_time，MySQL默认慢查询日志时间为10秒，通过修改long_query_time这个阈值来修改默认大小。 设置long_query_time的值后，MySQL数据库会记录执行时间超过该值的所有SQL语句，执行时间正好等于long_query_time的SQL语句并不会被记录下来。

    mysql> show variables like 'long_query_time';
    +-----------------+-----------+
    | Variable_name   | Value     |
    +-----------------+-----------+
    | long_query_time | 10.000000 |
    +-----------------+-----------+
    1 row in set (0.00 sec)

```
slow_query_log=on            --开启慢查询日志
slow_query_log_file=slow-log --指定保存路径及文件名，默认为数据文件目录，hostname-slow.log
long_query_time=1            --指定多少秒返回查询的结果为慢查询
```

重启MySQL，再次查询：

```
mysql> show variables like 'slow_query_log';
+----------------+-------+
| Variable_name  | Value |
+----------------+-------+
| slow_query_log | ON    |
+----------------+-------+
1 row in set (0.02 sec)
 
mysql> show variables like 'long_query_time';
+-----------------+----------+
| Variable_name   | Value    |
+-----------------+----------+
| long_query_time | 1.000000 |
+-----------------+----------+
1 row in set (0.00 sec)
```

此时，MySQL的数据目录会生成慢查询日志文件：

```
-rw-r----- 1 mysql mysql       180 Sep 11 16:33 slow-log
```

我们执行一条耗时比较长的SQL，然后查看慢查询日志文件

```
[root@jeespring mysql]# mysqldumpslow slow-log 
 
Reading mysql slow query log from slow-log
Count: 1  Time=25.13s (25s)  Lock=0.00s (0s)  Rows=1.0 (1), root[root]@[223.70.230.100]
  SELECT * FROM `t_user1` where email='S'
```

#### 3、是否记录没有使用索引的SQL（log_queries_not_using_indexes）

另一个和慢查询日志有关的参数是log_queries_not_using_indexes，如果运行的SQL语句没有使用索引，则MySQL数据库同样会将这条SQL语句记录到慢查询日志文件。

```
mysql> show variables like 'log_queries_not_using_indexes';
+-------------------------------+-------+
| Variable_name                 | Value |
+-------------------------------+-------+
| log_queries_not_using_indexes | OFF   |
+-------------------------------+-------+
1 row in set (0.00 sec)
```

开启没有使用索引记录慢查询日志的阈值 

```
mysql> set global log_queries_not_using_indexes=1;
Query OK, 0 rows affected (0.00 sec)
 
mysql> show variables like 'log_queries_not_using_indexes';
+-------------------------------+-------+
| Variable_name                 | Value |
+-------------------------------+-------+
| log_queries_not_using_indexes | ON    |
+-------------------------------+-------+
1 row in set (0.00 sec)
```

执行一条简单的没有使用到索引的SQL，执行完后，查看慢查询日志，这条SQL便被记录下下来。

```
mysql> SELECT * FROM `account` account where name ='user1';
+----+-------+-------+---------------+-------+
| id | name  | money | account       | level |
+----+-------+-------+---------------+-------+
|  1 | user1 |   500 | user1@163.com | 1     |
+----+-------+-------+---------------+-------+
```

```
[root@jeespring mysql]# mysqldumpslow slow-log 
 
Reading mysql slow query log from slow-log
Count: 1  Time=25.13s (25s)  Lock=0.00s (0s)  Rows=1.0 (1), root[root]@[223.70.230.166]
  SELECT * FROM `t_user1` where email='S'
 
Count: 3  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=1.0 (3), root[root]@localhost
  SELECT * FROM `account` account where name ='S'
```

#### 4、log_throttle_queries_not_using_indexes

MySQL 5.6.5版本开始新增了一个参数log_throttle_queries_not_using_indexes，用来表示每分钟允许记录到slow log的且未使用索引的SQL语句次数。该值默认为0，表示没有限制。在生产环境下，若没有使用索引，此类SQL语句会频繁地被记录到slow log，从而导致slow log文件的大小不断增加。

    mysql> show variables like 'log_throttle_queries_not_using_indexes';
    +----------------------------------------+-------+
    | Variable_name                          | Value |
    +----------------------------------------+-------+
    | log_throttle_queries_not_using_indexes | 0     |
    +----------------------------------------+-------+
    1 row in set (0.00 sec)

生产上的一般采用的配置如下： 

![](图片/log_throttle_queries_not_using_indexes.png)

#### 5、log_output（不推荐修改）

慢查询的日志记录另外一种存储形式就是表。慢查询表默认在mysql数据库，表名为slow_log，其表结构定义如下： 

```bash
mysql> show create table slow_log\G
*************************** 1. row ***************************
       Table: slow_log
Create Table: CREATE TABLE `slow_log` (
  `start_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_host` mediumtext NOT NULL,
  `query_time` time(6) NOT NULL,
  `lock_time` time(6) NOT NULL,
  `rows_sent` int(11) NOT NULL,
  `rows_examined` int(11) NOT NULL,
  `db` varchar(512) NOT NULL,
  `last_insert_id` int(11) NOT NULL,
  `insert_id` int(11) NOT NULL,
  `server_id` int(10) unsigned NOT NULL,
  `sql_text` mediumblob NOT NULL,
  `thread_id` bigint(21) unsigned NOT NULL
) ENGINE=CSV DEFAULT CHARSET=utf8 COMMENT='Slow log'
1 row in set (0.00 sec)
```

log_output参数指定了慢查询输出的格式，默认为FILE，可以将它设为TABLE，慢查询的SQL将被存储到mysql数据库中的slow_log表里面。

```
mysql> show variables like 'log_output';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| log_output    | FILE  |
+---------------+-------+
1 row in set (0.00 sec)
 
mysql> set global log_output='TABLE';
Query OK, 0 rows affected (0.00 sec)
 
mysql> show variables like 'log_output';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| log_output    | TABLE |
+---------------+-------+
1 row in set (0.00 sec)
```

### 三、mysqldumpslow的使用

```cpp
[root@jeespring mysql]# mysqldumpslow -help;
Usage: mysqldumpslow [ OPTS... ] [ LOGS... ]
 
Parse and summarize the MySQL slow query log. Options are
 
  --verbose    verbose
  --debug      debug
  --help       write this text to standard output
 
  -v           verbose
  -d           debug
  -s ORDER     what to sort by (al, at, ar, c, l, r, t), 'at' is default
                al: average lock time
                ar: average rows sent
                at: average query time
                 c: count
                 l: lock time
                 r: rows sent
                 t: query time  
  -r           reverse the sort order (largest last instead of first)
  -t NUM       just show the top n queries
  -a           don't abstract all numbers to N and strings to 'S'
  -n NUM       abstract numbers with at least n digits within names
  -g PATTERN   grep: only consider stmts that include this string
  -h HOSTNAME  hostname of db server for *-slow.log filename (can be wildcard),
               default is '*', i.e. match all
  -i NAME      name of server instance (if using mysql.server startup script)
  -l           don't subtract lock time from total time
```

#### 1、查询执行时间最长的10条SQL语句

```
mysqldumpslow -s al -n 10 slow-log 
```

#### 2、访问次数最多的10条SQL

```
mysqldumpslow -s c -t 10 slow-log 
```

