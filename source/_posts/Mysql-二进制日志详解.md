---
title: Mysql-二进制日志详解
tags: [Mysql]
categories: [数据库]
date: 2025-05-08
---
### 一、MySQL二进制日志概念及应用

```
MySQL的二进制日志binlog即binary log，二进制日志文件，也叫作变更日志（update log）。它记录了数据库所有执行的DDL和DML等数据库更新事件的语句，但是不包含没有修改任何数据的语句（如数据查询语句select、show等）。
```

**Binary log主要应用场景：**

```
一是用于数据恢复，如果MySQL数据库意外停止，可以通过二进制日志文件来查看用户执行了哪些操作，对数据库服务器文件做了哪些修改，然后根据二进制日志文件中的记录来恢复数据库服务器。

二是用于数据复制，由于日志的延续性和时效性，master把它的二进制日志传递给slaves来达到master-slave数据一致的目的。
```

### 二、关于MySQL二进制日志的配置

查看记录二进制日志是否开启：在MySQL8中默认情况下，二进制文件是开启的。

```
mysql>  show variables like '%log_bin%';
+---------------------------------+-----------------------------+
| Variable_name                   | Value                       |
+---------------------------------+-----------------------------+
| log_bin                         | ON                          |  //开关
| log_bin_basename                | /data/logs/3306/binlog       | // 存放路径
| log_bin_index                   | /data/logs/3306/binlog.index |
| log_bin_trust_function_creators | ON                          |//  函数创建 
| log_bin_use_v1_row_events       | OFF                         |
| sql_log_bin                     | ON                          |//变更sql记录下来
+---------------------------------+-----------------------------+
6 rows in set (0.01 sec)
```

log_bin:如果返回值为ON，则表示二进制日志功能已经开启；如果返回值为OFF，则需要手动配置并重新启动MySQL服务来开启该功能。
log_bin_basename:是binlog日志的基本文件名，后面会追加标识来表示每一个文件
log_bin_index:是binlog文件的素引文件，这个文件管理了所有的binlog文件的目录
log_bin_trust_function_creators:限制存储过程，前面我们已经讲过了，这是因为二进制日志的一个重要功能是用于主从复制，而存储函数有可能导致主从的数据不一致。所以当开启二进制日志后，需要限制存储函数的创建、修改、调用
log_bin_use_v1_row_events此只读系统变量已弃用。ON表示使用版本1二进制日志行，OFF表示使用版本2二进制日志行（MySQL5.6的默认值为2)。

#### 1、过期时间

指定二进制日志过期天数（`expire_logs_days`）:该参数为全局动态调整参数，默认值为`0`，即关闭，取值范围`0－99`；

```
mysql> SHOW VARIABLES LIKE 'expire_logs_days';
+------------------+-------+
| Variable_name    | Value |
+------------------+-------+
| expire_logs_days | 3     |
+------------------+-------+
1 row in set (0.00 sec)
```

注意：在双机复制环境下，应确保过期天数不应小于从库追赶主库binlog日志的时间。
可以在从库执行`show slave status\G`命令查看主从延迟时间，存在大事务时延时会增加

触发过期删除的条件:

```
重启MYSQL；

BINLOG文件大小达到参数max_binlog_size限制；max_binlog_size 定义了单个文件的大小限制，如果二进制日志写入的内容大小超出给定值，日志就会发生滚动（关闭当前文件，重新打开一个新的日志文件）。不能将该变量设置为大于 1GB 或小于 4096B（字节），其默认值是 1GB。

手动执行命令：重置binlog（reset master）
```

手动清理二进制日志：

```
删除指定日期之前的所有binlog
PURGE BINARY LOGS BEFORE '2023-09-01 00:00:00';

删除指定binlog文件之前的所有binlog
PURGE BINARY LOGS TO 'mysql-bin.000100';
```

#### 2、binlog缓存**

参数binlog_cache_size控制单个线程内 binlog cache 所占内存的大小。
binlog cache记录着所有未提交的事务在运行期间产生的binlog数据，binlog cache 是在每个线程内空间独立的。如果启用了bin log日志，MySQL 会为每个客户端分配一个二进制日志缓存。如果经常使用大型事务，则可以增加此缓存大小以获得更好的性能，可通过 binlog_cache_size 配置其大小，默认 32768 bytes。

    mysql> show variables like 'binlog_cache%';
    +-------------------+---------+
    | Variable_name     | Value   |
    +-------------------+---------+
    | binlog_cache_size | 2097152 |
    +-------------------+---------+
    1 row in set (0.00 sec)

如果binlog cache空间足够，在事务提交的时候，cache中的内容会被清空，同时这些数据会被写入到日志文件中。
因为bin log内容无论多大在事务提交时都需要一次性写入，所以当 bin log cache放不下的时候，就需要暂存到磁盘（生成一个binlog cache 临时文件，同时清空binlog cache，由参数max_binlog_cache_size控制该文件大小），然后提交被写入到日志文件中。
binlog临时文件会被存放到 tmpdir 的目录下，并以"ML"作为文件名开头。但该文件无法用ls命令看到（但可以使用 lsof|grep delete 来观察到这种文件），因为使用了LINUX创建临时API（mkstemp），以避免其他进程破坏文件内容。也就是说，这个文件是mysqld进程内部专用的。

    mysql> show variables like '%max_binlog_cache_size%';
    +-----------------------+----------------------+
    | Variable_name         | Value                |
    +-----------------------+----------------------+
    | max_binlog_cache_size | 18446744073709547520 |
    +-----------------------+----------------------+
    1 row in set (0.00 sec)

#### **3、binlog格式**

```
mysql> show variables like 'binlog_format';#查看量binlog_format的值
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| binlog_format | ROW   | //行格式
+---------------+-------+
1 rows in set (0.00 sec)
```

除此之外，binlog还有 2 种格式，分别是Statemen和Mixed

```
Statement：每一条会修改数据的sql都会记录在binlog中。 优点：不需要记录每一行的变化，减少了binlog日志量，节约了IO，提高性能。缺点：在某些情况下会导致master-slave中的数据不一致(如sleep()函数， last_insert_id()，以及user-defined functions(udf)等会出现问题。

Row：5.1.5版本的MySQL才开始支持row level 的复制，它不记录sql语句上下文相关信息，仅保存哪条记录被修改。 优点：row level 的日志内容会非常清楚的记录下每一行数据修改的细节。而且不会出现某些特定情况下的存储过程，或function，以及trigger的调用和触发无法被正确复制的问题。缺点是会产生大量的日志，尤其是alter table的时候会让日志暴涨。
例如：update a < 10 的数据，statement模式会记录这一条sql,而row模式的话，会记录a=1,a=2到a=9所有的记录的更改

Mixed：从5.1.8版本开始，MySQL提供了Mixed格式，实际上就是Statement与Row的结合。一般的复制使用STATEMENT模式保存binlog，对于STATEMENT模式无法复制的操作使用ROW模式保存binlog，MySQL会根据执行的SQL语句选择日志保存方式
```

### 三、binlog写入流程

binlog 的写入逻辑：①事务执行过程中把日志写到 binlog cache；②事务提交时把 binlog cache 写到 binlog 文件中。
步骤②的写入binlog 文件其实分为两部分：

```
write：首先会写入页缓存中的 binlog files 中，这个过程不占用磁盘IO
fsync：操作系统执行 fsync 时 bin log 才会从 page cache 中真正持久化到磁盘。（占用磁盘IOPS）
```

关于write和fsync 的时机，是通过参数 `sync_binlog` 控制：

```
sync_binlog=0：表示每次提交事务只是 write，不执行 fsync，也就是binlog不做持久化。（不建议）
sync_binlog=1：表示每次提交事务都要发生 fsync。
sync_binlog=N：表示每次事务都会write，但是N次事务提交会执行fsync进行持久化。
```

通常来说，为了提高IOPS，会将这个参数设为100-1000。缺点是如果还没有执行fsync就宕机，最多会丢失最近N个事务的binlog日志。如果为了保证数据安全，就设为1。

### 四、二进制日志的常用查询

以下是关于MySQL二进制日志的相关查询及其输出结果示例：
①查看当前二进制日志文件

```
mysql> show master status;
+------------------+----------+--------------+------------------+---------------------------------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set                           |
+------------------+----------+--------------+------------------+---------------------------------------------+
| mysql-bin.000004 |  2515705 |              |                  | 3245ffb8-718e-11ee-9e35-fa163ee23a59:1-5216 |
+------------------+----------+--------------+------------------+---------------------------------------------+
1 row in set (0.00 sec)
```

②查看当前数据库实例的二进制日志文件列表及大小：

```
mysql> show master logs;
+------------------+-----------+-----------+
| Log_name         | File_size | Encrypted |
+------------------+-----------+-----------+
| mysql-bin.000001 |       179 | No        |
| mysql-bin.000002 |       179 | No        |
| mysql-bin.000003 |     65643 | No        |
| mysql-bin.000004 |   2515705 | No        |
+------------------+-----------+-----------+
4 rows in set (0.00 sec)

mysql> show binary logs;
+------------------+-----------+-----------+
| Log_name         | File_size | Encrypted |
+------------------+-----------+-----------+
| mysql-bin.000001 |       179 | No        |
| mysql-bin.000002 |       179 | No        |
| mysql-bin.000003 |     65643 | No        |
| mysql-bin.000004 |   2515705 | No        |
+------------------+-----------+-----------+
4 rows in set (0.00 sec)
```

③查询第一个最早的binlog日志:

```
mysql> show binlog events\G ;
+-----------------+-------+-----------------+--------------+--------------+----------------------------------------------+
| Log_name        | Pos   | Event_type      | Server_id    | End_log_pos  | Info                                         |
+-----------------+-------+-----------------+--------------+--------------+----------------------------------------------+
| mysql-bin.000007|   4   | Format_desc     | 212543308    |        125   | Server ver: 8.0.20, Binlog ver: 4            |
+-----------------+-------+-----------------+--------------+--------------+----------------------------------------------+
| mysql-bin.000007| 125   | Previous_gtids  | 212543308    |        196   | 7a7f2a1b-21f8-11ee-9fdd-00163e202091:1-77438 |     
+-----------------+-------+-----------------+--------------+--------------+----------------------------------------------+      
| mysql-bin.000007| 196   | Rotate          | 212543308    |        196   | mysql-bin.000008;pos=4                       |        
 +-----------------+-------+-----------------+--------------+--------------+----------------------------------------------+      
 3 rows in set (0.00 sec)        
```

④指定查询mysql-bin.000014这个文件：

```
mysql> show binlog events in 'mysql-bin.000014';
```

⑤指定查询mysql-bin.000004这个文件，查询5条（即5条语句):

```
mysql> show binlog events in 'mysql-bin.000004' limit 5\G;
*************************** 1. row ***************************
   Log_name: mysql-bin.000004
        Pos: 4
 Event_type: Format_desc
  Server_id: 122263306
End_log_pos: 125
       Info: Server ver: 8.0.27, Binlog ver: 4
*************************** 2. row ***************************
   Log_name: mysql-bin.000004
        Pos: 125
 Event_type: Previous_gtids
  Server_id: 122263306
End_log_pos: 196
       Info: 3245ffb8-718e-11ee-9e35-fa163ee23a59:1-48
*************************** 3. row ***************************
   Log_name: mysql-bin.000004
        Pos: 196
 Event_type: Gtid
  Server_id: 122263306
End_log_pos: 275
       Info: SET @@SESSION.GTID_NEXT= '3245ffb8-718e-11ee-9e35-fa163ee23a59:49'
*************************** 4. row ***************************
   Log_name: mysql-bin.000004
        Pos: 275
 Event_type: Query
  Server_id: 122263306
End_log_pos: 516
       Info: CREATE USER 'code'@'localhost' IDENTIFIED WITH 'caching_sha2_password' AS '$A$005$<*:BYbtI:hw nrF9AjdTrCLq0sIBFSlZFDWoqdD.nrpVVwf3arbBTk8Ss8' /* xid=100 */
*************************** 5. row ***************************
   Log_name: mysql-bin.000004
        Pos: 516
 Event_type: Gtid
  Server_id: 122263306
End_log_pos: 593
       Info: SET @@SESSION.GTID_NEXT= '3245ffb8-718e-11ee-9e35-fa163ee23a59:50'
5 rows in set (0.00 sec)
```

⑥指定查询mysql-bin.000004这个文件，从pos点:1391开始查起，查询5条（即5条语句)

```
show binlog events in 'mysql-bin.000004' from 1391 limit 5\G
```

⑥指定查询mysql-bin.000004这个文件，从pos点:391开始查起，偏移2行〈即中间跳过2个）查询5条（即5条语句)。

```
show binlog events in 'mysql-bin.000004' from 391 limit 2,5\G;
```

⑦清空现有的二进制日志文件：该方法可以删除列于索引文件中的所有二进制日志，把二进制日志索引文件重新设置为空，并创建一个以.000001为后缀新的二进制日制文件，并删除过去生成的全部二进制日志

```
RESET MASTER;
```

```
注意：执行此语句会删除所有之前创建的二进制日志文件，且无法恢复。因此，在执行此操作之前应确保没有必要的数据未被包含在任何二进制日志文件中。
```

⑧删除列于指定日志之前的所有日志，但不包括指定的日志：

```
mysql> purge binary logs to 'mysql-bin.000002';
Query OK, 0 rows affected (0.10 sec)
```

⑨删除2023－12－22 00:00:00时间点之前的日志：

```
 purge binary logs before '2023-12-22 00:00:00';
Query OK, 0 rows affected (0.16 sec)
```

```
注意事项：
在删除binlog日志同时，也会清理MySQL-bin.index的文件记录，清理完后命令中指定的日志文件成为第一个。

主从架构下，如果复制正在进行中，执行该命令是安全的，例如slave正在读取要删除的log，该语句将什么也不会做，并返回一个错误；如果复制是停止的，我们删除了一个slave还未读取的日志，则复制重新建立连接时将会失败。
```

### 五、使用mysqlbinlog工具解析和恢复日志

默认情况下binlog日志是二进制格式，无法直接查看，除了使用上述命令查看二进制日志中的事务，还可以通过mysqlbinlog工具。
mysqlbinlog是mysql官方提供的一个binlog查看工具，也可使用 –read-from-remote-server 从远程服务器读取二进制日志，还可使用 –start-position –stop-position、–start-time –stop-time等选项精确解析binlog日志。

    选项：
    -h, --host=：连接MySQL服务器的主机名。
    
    -P, --port=<port_num>：连接MySQL服务器的端口号。
    
    -u, --user=：连接MySQL服务器的用户名。
    
    -p, --password=：连接MySQL服务器的密码。
    
    –ssl-ca=<ca_file>：使用指定的CA证书文件进行SSL连接。
    
    –ssl-cert=<cert_file>：使用指定的SSL证书文件进行SSL连接。
    
    –ssl-key=<key_file>：使用指定的SSL密钥文件进行SSL连接。
    
    -R, --read-from-remote-server：从远程MySQL服务器读取二进制日志。
    
    -r, --result-file=<file_name>：将解析后的日志输出到指定的文件。
    
    –base64-output[=value]：将blob字段以Base64编码的形式输出。
    
    -v, --verbose：详细输出解析后的日志内容。
    
    -d, --database=<database_name>：仅输出指定数据库的日志内容。
    
    -t, --to-last-log：从当前日志文件开始读取，直到最新的日志文件结束。
    
    -s, --start-datetime=：从指定的日期和时间开始读取日志。
    
    -e, --stop-datetime=：在指定的日期和时间停止读取日志。
    
    –start-position=：从指定的位置开始读取日志。
    
    –stop-position=：在指定的位置停止读取日志。
    
    –skip-gtids[=value]：跳过指定的GTID（全局事务标识符）。
    
    –include-gtids[=value]：仅包括指定的GTID。
    
    –hexdump：以十六进制格式输出日志内容。
    
    –no-defaults：不读取默认的配置文件。

#### 1、STATEMENT格式

对于STATEMENT格式的二进制日志文件，使用mysqlbinlog后，就可以看到执行的逻辑SQL语句。

```
# 查看二进制日志,可以选择重定向到.sql文件（可以利用.sql文件做即时点还原）;
/usr/local/mysql/bin/mysqlbinlog  mysql-bin.00001 > tt.sql
 
# 提取指定binlog日志事件的时间;
/usr/local/mysql/bin/mysqlbinlog --start-datetime='2023-11-24 15:23:45' --stop-datetime='2023-11-24 17:22:22' mysql-bin.00001
 
# 提取指定binlog日志事件的位置;
/usr/local/mysql/bin/mysqlbinlog --start-position=177 --stop-position=358 mysql-bin.00001
 
# 提取指定数据库binlog并转换字符集到UTF8;
/usr/local/mysql/bin/mysqlbinlog --database=test --set-charset=utf8 /mysql-bin.00001
 
# 远程提取日志;
/usr/local/mysql/bin/mysqlbinlog -utest -p -h10.4.109.116 -P3306 --stop-datetime="2023-12-15 20:30:23" --read-from-remote-server /mysql-bin.00001
```

基于STATEMENT的二进制文件格式

```
# at 421
#151015 11:54:05 server id 1  end_log_pos 945          Query       thread_id=6     exec_time=0    error_code=0
SET TIMESTAMP=1444881245/*!*/;
insert into bb(id) value(200)
/*!*/;
# at 945
```

第一行at指明了该事件在binlog文件中的位置。
第二行描述了事件：事件发生的日期和时间、服务器ID、事务的结束位置、事件的位置、原服务器生成此事件时的线程ID、语句的时间戳和写入二进制日志文件的时间差、错误代码。
第三行给出了该事件锁执行的SQL语句。
第四行描述了事件的结束位置，相当于下一事件的开始位置。

#### 2、ROW格式的日志

如果使用ROW格式的记录方式，则会发现mysqlbinlog的结果变得不可读了，看不到指定的SQL语句，反而是一大串看不懂的字符。其实只要加上参数-v或-vv（显示数据类型等信息），就能清楚地看到执行的具体信息了，mysqlbinlog会解释了具体做的事情，比如更新一条语句会记录整个行更改的信息。使用方法如下：

/usr/local/mysql/bin/mysqlbinlog -v mysql-bin.00001

    # at 447
    #170330 14:19:25 server id 10  end_log_pos 607 CRC32 0x321d4518 	Update_rows: table id 133 flags: STMT_END_F
    ### UPDATE `sbtest`.`sbtest`
    ### WHERE
    ###   @1=1
    ###   @2=0
    ###   @3=''
    ###   @4='qqqqqqqqqqwwwwwwwwwweeeeeeeeeerrrrrrrrrrtttttttttt'
    ### SET
    ###   @1=1
    ###   @2=1
    ###   @3=''
    ###   @4='qqqqqqqqqqwwwwwwwwwweeeeeeeeeerrrrrrrrrrtttttttttt'

可以看出跟STATEMENT类型差异很大，ROW记录的是真正的数据信息，改变之前和改变之后的数据。如果想显示具体执行的语句，可以在配置文件添加binlog-rows-query-log-events=on参数，这样就会显示具体的逻辑执行语句了，但是有注释。具体显示结果如下。

```
# update sbtest set k=1 where id=1
```

不管是STATEMENT格式还是ROW格式，对于mysqlbinlog的输出是“可执行”的，一般可输出为.sql文件。将mysqlbinlog的输出作为mysql命令的输入，就能重放binlog中记录的修改，这对于MySQL的即时点数据恢复时很有价值的。


```
mysqlbinlog --base64-output=DECODE-ROWS \
            --verbose \
            /var/lib/mysql/mysql-bin.000001
```


#### 3、十六进制转换格式

mysqlbinlog可以把生成的二进制日志内容转换成十六进制：

```
$ mysqlbinlog --hexdump master-bin.000001
```

十六进制输出由注释行（#）开始，因此对于上面的命令，输出可能如下所示：

```
/*!40019 SET @@session.max_insert_delayed_threads=0*/;
/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;
# at 4
#051024 17:24:13 server id 1  end_log_pos 98
# Position  Timestamp   Type   Master ID        Size      Master Pos    Flags
# 00000004 9d fc 5c 43   0f   01 00 00 00   5e 00 00 00   62 00 00 00   00 00
# 00000017 04 00 35 2e 30 2e 31 35  2d 64 65 62 75 67 2d 6c |..5.0.15.debug.l|
# 00000027 6f 67 00 00 00 00 00 00  00 00 00 00 00 00 00 00 |og..............|
# 00000037 00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00 |................|
# 00000047 00 00 00 00 9d fc 5c 43  13 38 0d 00 08 00 12 00 |.......C.8......|
# 00000057 04 04 04 04 12 00 00 4b  00 04 1a                |.......K...|
#       Start: binlog v 4, server v 5.0.15-debug-log created 051024 17:24:13
#       at startup
ROLLBACK;
```

十六进制输出当前包含以下列表中的元素。

```
Position：日志文件中的字节位置。 Timestamp：事件时间戳，在示出的例子中，’43 5c fc 9d’的十进制是1130167453，等同于’051024 17:24:13’。
Type：事件类型代码，在所示的例子中，’0f’的十进制为15，表示事件为FORMAT_DESCRIPTION_EVENT。 Master
ID：创建事件的主服务器的server-id。 Size：事件的字节大小。 Master
Pos：原始主日志文件中下一个事件的位置，‘62’的十进制为98。
Flags：16个标志，目前只使用了几个，其他人留将来使用。比如LOG_EVENT_BINLOG_IN_USE_F（01
00）表示日志文件正常关闭。

--base64-output=name：确定输出语句何时应为 base64-encoded 的 BINLOG
语句：”从不”禁用它，并且仅适用于没有基于行的事件的 binlog;如果还给出了 –verbose
选项，则”decode-rows”将行事件解码为注释的伪 SQL 语句;”auto”仅在必要时打印
base64（即，对于基于行的事件和格式描述事件）。 如果未提供 –base64-output[=name] 选项，则默认值为”auto”。
```

使用日志恢复数据
mysqlbinlog恢复数据的语法如下：

```
mysqlbinlog [option] filename|mysql –uuser -ppass;
```

这个命令可以这样理解：使用mysqlbinlog命令来读取filename（日志名）中的内容，然后使用mysql命令将这些内容恢复到数据库中。

```
注意：使用mysqlbinlog命令进行恢复操作时，必须是编号小的先恢复，例如atguigu-bin.000001必须在atguigu-bin.000002之前恢复。
flush logs;可以生成新的binLog 文件，不然这个文件边恢复边变大是不行的。
```

```
/usr/local/mysql/bin/mysqlbinlog --no-defaults  --start-position=236  --stop-position=1071 --database=my_db1 mysql-bin.000002 | /usr/bin/mysql -root -p123456 -v my_db1
```

