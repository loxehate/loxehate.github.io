---
title: Mysql-用户权限管理
tags: [Mysql]
categories: [数据库]
date: 2025-05-08
---
## 一、MySQL远程连接

相关库：mysql

相关表：user

相关字段：select host,user from user;

### 1、创建用户、授权

创建用户格式：`create user 用户名@ip地址 identified by '密码';`

授权：`grant all on *.* To 用户名@'ip地址';`

grant select,create on 数据库名.表名 To 用户名@ip地址；

```
# 创建用户
create user root@'192.168.11.%' identified  by '123456';
# 这样root@192.168.11.% 这个网段的用户可以登录

create user hans@'192.168.11.161' identified by '123456';
# 这样只允许hans用户登录

create user li@'%' identified by '123456';
# 所有li用户都可登录


# 删除用户
drop user root@'192.168.11.%';
```

```
# 授权
grant all on *.* To hans@'192.168.11.161';
grant select,create on oldboy_test.* To hans@'192.168.11.161';

# 查看授权
show grants for hans@'192.168.11.161';
# 刷新权限表
flush privileges;
```

## 二、MySQL添加用户、删除用户、授权及撤销权限

**创建用户：**

```
mysql> insert into mysql.user(Host,User,Password) values("localhost","test",password("1234"));

#这样就创建了一个名为：test 密码为：1234 的用户。
```

注意：此处的"localhost"，是指该用户只能在本地登录，不能在另外一台机器上远程登录。如果想远程登录的话，将"localhost"改为"%"，表示在任何一台电脑上都可以登录。也可以指定某台机器（例如192.168.1.10），或某个网段（例如192.168.1.%）可以远程登录。

**用户授权：**

授权格式：grant 权限 on 数据库.* to 用户名@登录主机 identified by "密码";　

```
1 首先为用户创建一个数据库(testDB)：

mysql>create database testDB;

2 授权test用户拥有testDB数据库的所有权限（某个数据库的所有权限）：

 mysql>grant all privileges on testDB.* to test@localhost identified by '1234';

mysql>flush privileges;//刷新系统权限表，即时生效

3 如果想指定某库的部分权限给某用户本地操作，可以这样来写:

mysql>grant select,update on testDB.* to test@localhost identified by '1234';

mysql>flush privileges; 

#常用的权限有select,insert,update,delete,alter,create,drop等。可以查看mysql可授予用户的执行权限了解更多内容。

4  授权test用户拥有所有数据库的某些权限的远程操作： 　 

mysql>grant select,delete,update,create,drop on *.* to test@"%" identified by "1234";

 #test用户对所有数据库都有select,delete,update,create,drop 权限。

5 查看用户所授予的权限：

mysql> show grants for test@localhost;
```

**删除用户：**

```
mysql>Delete FROM user Where User='test' and Host='localhost';

mysql>flush privileges;

删除账户及权限：>drop user 用户名@'%';

　　　　　　　　>drop user 用户名@ localhost; 
```

**修改指定用户密码：**

```
mysql>update mysql.user set password=password('新密码') where User="test" and Host="localhost";

mysql>flush privileges;
```

**撤销已经赋予用户的权限：**

```
revoke 跟 grant 的语法差不多，只需要把关键字 “to” 换成 “from” 即可：

mysql>grant all on *.* to dba@localhost;

mysql>revoke all on *.* from dba@localhost;
```

**MySQL grant、revoke 用户权限注意事项：**

```
 grant, revoke 用户权限后，该用户只有重新连接 MySQL 数据库，权限才能生效。

如果想让授权的用户，也可以将这些权限 grant 给其他用户，需要选项 "grant option"

mysql>grant select on testdb.* to dba@localhost with grant option;

mysql>grant select on testdb.* to dba@localhost with grant option;

这个特性一般用不到。实际中，数据库权限最好由 DBA 来统一管理。
```

**补充：**

mysql授权表共有5个表：user、db、host、tables_priv和columns_priv。

授权表的内容有如下用途：

```
user表
user表列出可以连接服务器的用户及其口令，并且它指定他们有哪种全局（超级用户）权限。在user表启用的任何权限均是全局权限，并适用于所有数据库。例如，如果你启用了DELETE权限，在这里列出的用户可以从任何表中删除记录，所以在你这样做之前要认真考虑。

db表
db表列出数据库，而用户有权限访问它们。在这里指定的权限适用于一个数据库中的所有表。

host表
host表与db表结合使用在一个较好层次上控制特定主机对数据库的访问权限，这可能比单独使用db好些。这个表不受GRANT和REVOKE语句的影响，所以，你可能发觉你根本不是用它。

tables_priv表
tables_priv表指定表级权限，在这里指定的一个权限适用于一个表的所有列。

columns_priv表
columns_priv表指定列级权限。这里指定的权限适用于一个表的特定列
```

## 三、MySQL可授予用户的执行权限

（以下操作都是以root身份登陆进行grant授权，以root@localhost身份登陆执行各种命令。）

```
mysql> show privileges;
+-------------------------+---------------------------------------+-------------------------------------------------------+
| Privilege               | Context                               | Comment                                               |
+-------------------------+---------------------------------------+-------------------------------------------------------+
| Alter                   | Tables                                | To alter the table                                    |
| Alter routine           | Functions,Procedures                  | To alter or drop stored functions/procedures          |
| Create                  | Databases,Tables,Indexes              | To create new databases and tables                    |
| Create routine          | Databases                             | To use CREATE FUNCTION/PROCEDURE                      |
| Create temporary tables | Databases                             | To use CREATE TEMPORARY TABLE                         |
| Create view             | Tables                                | To create new views                                   |
| Create user             | Server Admin                          | To create new users                                   |
| Delete                  | Tables                                | To delete existing rows                               |
| Drop                    | Databases,Tables                      | To drop databases, tables, and views                  |
| Event                   | Server Admin                          | To create, alter, drop and execute events             |
| Execute                 | Functions,Procedures                  | To execute stored routines                            |
| File                    | File access on server                 | To read and write files on the server                 |
| Grant option            | Databases,Tables,Functions,Procedures | To give to other users those privileges you possess   |
| Index                   | Tables                                | To create or drop indexes                             |
| Insert                  | Tables                                | To insert data into tables                            |
| Lock tables             | Databases                             | To use LOCK TABLES (together with SELECT privilege)   |
| Process                 | Server Admin                          | To view the plain text of currently executing queries |
| Proxy                   | Server Admin                          | To make proxy user possible                           |
| References              | Databases,Tables                      | To have references on tables                          |
| Reload                  | Server Admin                          | To reload or refresh tables, logs and privileges      |
| Replication client      | Server Admin                          | To ask where the slave or master servers are          |
| Replication slave       | Server Admin                          | To read binary log events from the master             |
| Select                  | Tables                                | To retrieve rows from table                           |
| Show databases          | Server Admin                          | To see all databases with SHOW DATABASES              |
| Show view               | Tables                                | To see views with SHOW CREATE VIEW                    |
| Shutdown                | Server Admin                          | To shut down the server                               |
| Super                   | Server Admin                          | To use KILL thread, SET GLOBAL, CHANGE MASTER, etc.   |
| Trigger                 | Tables                                | To use triggers                                       |
| Create tablespace       | Server Admin                          | To create/alter/drop tablespaces                      |
| Update                  | Tables                                | To update existing rows                               |
| Usage                   | Server Admin                          | No privileges - allow connect only                    |
+-------------------------+---------------------------------------+-------------------------------------------------------+
31 rows in set (0.00 sec)
```

[MySQL](http://lib.csdn.net/base/mysql)包含哪些权限，共29个。

| 权限                    | 说明                                                         | 举例                                                         |
| ----------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| usage                   | 连接（登陆）权限，建立一个用户，就会自动授予其usage权限（默认授予）。   该权限只能用于数据库登陆，不能执行任何操作；且usage权限不能被回收，也即REVOKE用户并不能删除用户。 | mysql>  grant usage on *. * to 'root′@'localhost' identified by '123'; |
| file                    | 拥有file权限才可以执行  select ..into outfile和load data infile…操作，但是不要把file, process,  super权限授予管理员以外的账号，这样存在严重的安全隐患。 | mysql>  grant file on *. * to root@localhost;   mysql> load data infile '/home/mysql/pet.txt' into table pet; |
| super                   | 这个权限允许用户终止任何查询；修改全局变量的SET语句；使用CHANGE  MASTER，PURGE MASTER LOGS。 | mysql>  grant super on *.* to root@localhost;   mysql> purge master logs before 'mysql-bin.000006′; |
| select                  | 必须有select的权限，才可以使用select  table                  | mysql>  grant select on pyt.* to 'root′@'localhost';   mysql> select * from shop; |
| insert                  | 必须有insert的权限，才可以使用insert  into ….. values….      | mysql>  grant insert on pyt.* to 'root′@'localhost';   mysql> insert into shop(name) values('aa'); |
| update                  | 必须有update的权限，才可以使用update  table                  | mysql>  update shop set price=3.5 where article=0001 and dealer='A'; |
| delete                  | 必须有delete的权限，才可以使用delete  from ….where….(删除表中的记录) | mysql>  grant delete on pyt.* to 'root′@'localhost';   mysql> delete from table where id=1; |
| alter                   | 必须有alter的权限，才可以使用alter  table                    | mysql>  alter table shop modify dealer char(15);             |
| alter routine           | 必须具有alter  routine的权限，才可以使用{alter \|drop} {procedure\|function} | mysql>grant  alter routine on pyt.* to 'root′@' localhost ‘;   mysql> drop procedure pro_shop;   Query OK, 0 rows affected (0.00 sec) |
| create                  | 必须有create的权限，才可以使用create  table                  | mysql>  grant create on pyt.* to 'root′@'localhost';         |
| drop                    | 必须有drop的权限，才可以删除库、表、索引、视图等             | mysql>  drop database db_name;    mysql> drop table tab_name;   mysql> drop view vi_name;    mysql> drop index in_name; |
| create routine          | 必须具有create  routine的权限，才可以使用{create \|alter\|drop} {procedure\|function} | mysql>  grant create routine on pyt.* to 'root′@'localhost';   当授予create routine时，自动授予EXECUTE, ALTER ROUTINE权限给它的创建者： |
| create temporary tables | (注意这里是tables，不是table)                                | 必须有create  temporary tables的权限，才可以使用create temporary tables.   mysql> grant create temporary tables on pyt.* to  'root′@'localhost';   [mysql@mydev ~]$ mysql -h localhost -u root -p pyt   mysql> create temporary table tt1(id int); |
| create view             | 必须有create  view的权限，才可以使用create view              | mysql>  grant create view on pyt.* to 'root′@'localhost';   mysql> create view v_shop as select price from shop; |
| create user             | 要使用CREATE  USER，必须拥有mysql数据库的全局CREATE USER权限，或拥有INSERT权限。 | mysql>  grant create user on *.* to 'root′@'localhost';   或：mysql> grant insert on *.* to root@localhost; |
| show database           | 通过show  database只能看到你拥有的某些权限的数据库，除非你拥有全局SHOW DATABASES权限。   对于root@localhost用户来说，没有对mysql数据库的权限，所以以此身份登陆查询时，无法看到mysql数据库： | mysql>  show databases;                                      |
| show view               | 必须拥有show  view权限，才能执行show create view             | mysql>  show create view name;                               |
| index                   | 必须拥有index权限，才能执行[create  \|drop] index            | mysql>  grant index on pyt.* to root@localhost;   mysql> create index ix_shop on shop(article);   mysql> drop index ix_shop on shop; |
| excute                  | 执行存在的Functions,Procedures                               | mysql>  call pro_shoroot(0001,@a)；                          |
| event                   | event的使用频率较低建议使用root用户进行创建和维护。   要使event起作用，MySQL的常量GLOBAL event_scheduler必须为on或者是1 | mysql>  show global variables like 'event_scheduler';        |
| lock tables             | 必须拥有lock  tables权限，才可以使用lock tables              | mysql>  grant lock tables on pyt.* to root@localhost;   mysql> lock tables a1 read;   mysql> unlock tables; |
| references              | 有了REFERENCES权限，用户就可以将其它表的一个字段作为某一个表的外键约束。 |                                                              |
| reload                  | 必须拥有reload权限，才可以执行flush  [tables \| logs \| privileges] | mysql>  grant reload on pyt.* to root@localhost;   ERROR 1221 (HY000): Incorrect usage of DB GRANT and GLOBAL PRIVILEGES   mysql> grant reload on *.* to 'root′@'localhost';   Query OK, 0 rows affected (0.00 sec)   mysql> flush tables; |
| replication client      | 拥有此权限可以查询master  server、slave server状态。         | mysql>  grant Replication client on *.* to root@localhost;   或：mysql> grant super on *.* to root@localhost;   mysql> show master status; |
| replication slave       | 拥有此权限可以查看从服务器，从主服务器读取二进制日志。       | mysql>  grant replication slave on *.* to root@localhost;   mysql> show slave hosts;   Empty set (0.00 sec)   mysql>show binlog events; |
| Shutdown                | 关闭mysql权限                                                | [mysql@mydev  ~]$ mysqladmin shutdown                        |
| grant option            | 拥有grant  option，就可以将自己拥有的权限授予其他用户（仅限于自己已经拥有的权限） | mysql>  grant Grant option on pyt.* to root@localhost;   mysql> grant select on pyt.* to p2@localhost; |
| process                 | 通过这个权限，用户可以执行SHOW  PROCESSLIST和KILL命令。默认情况下，每个用户都可以执行SHOW PROCESSLIST命令，但是只能查询本用户的进程。 | mysql>  show processlist;                                    |
| all privileges          | 所有权限。with  grant option 可以连带授权                    | mysql>  grant all privileges on pyt.* to root@localhost with grant option; |

```
管理权限（如 super， process， file等）不能够指定某个数据库，on后面必须跟 *.*

有人会问truncate权限呢，其实truncate权限就是create+drop，这点需要注意
```

## 四、用户赋予 information_schema 数据库对象权限失败

### 1、问题描述

#### 1.1 问题发现

在对用户赋予 information_schema 权限的时候发如下错误：

```
[root@127.0.0.1][test_chen]> grant select on information_schema.innodb_sys_tables to 'test_user'@'%';
ERROR 1044 (42000): Access denied for user 'root'@'127.0.0.1' to database 'information_schema'
[root@127.0.0.1][test_chen]> grant select on information_schema.* to 'test_user'@'%';
ERROR 1044 (42000): Access denied for user 'root'@'127.0.0.1' to database 'information_schema'
[root@127.0.0.1][test_chen]> 
[root@127.0.0.1][test_chen]> show grants;
+---------------------------------------------------------------------+
| Grants for root@127.0.0.1                                           |
+---------------------------------------------------------------------+
| GRANT ALL PRIVILEGES ON *.* TO 'root'@'127.0.0.1' WITH GRANT OPTION |
+---------------------------------------------------------------------+
1 row in set (0.00 sec)
 
[root@127.0.0.1][test_chen]> select current_user();
+----------------+
| current_user() |
+----------------+
| root@127.0.0.1 |
+----------------+
1 row in set (0.00 sec)
##这个报错有一定的误导性
```

#### **1.2 问题分析**

https://dev.mysql.com/doc/refman/8.0/en/information-schema-introduction.html

https://bugs.mysql.com/bug.php?id=45430

查看官方文档及bug，发现是这样的。任何用户都有information_schema 下的表或者视图的访问权限(当然有些视图或者表需要一些特殊的权限，比如说 innodb_ 前缀开头的表需要用户具有 process权限才能访问)。虽然任何用户都能访问 information_schema 下面的对象，但是能查看到哪些内容就跟这个用户的权限有关了。下面我们以访问 information_schema 下面的 tables 表来举例:

```
[test_user@127.0.0.1][information_schema]> show grants;
+-----------------------------------------------------------+
| Grants for test_user@%                                    |
+-----------------------------------------------------------+
| GRANT PROCESS ON *.* TO 'test_user'@'%'                   |
| GRANT EXECUTE ON `test_chen`.* TO 'test_user'@'%'         |
| GRANT SELECT ON `test_shao`.`test_xxx` TO 'test_user'@'%' |
+-----------------------------------------------------------+
3 rows in set (0.00 sec)
 
[test_user@127.0.0.1][information_schema]> select * from tables\G;
......
......
*************************** 61. row ***************************
  TABLE_CATALOG: def
   TABLE_SCHEMA: information_schema
     TABLE_NAME: INNODB_SYS_TABLESTATS
     TABLE_TYPE: SYSTEM VIEW
         ENGINE: MEMORY
        VERSION: 10
     ROW_FORMAT: Fixed
     TABLE_ROWS: NULL
 AVG_ROW_LENGTH: 1215
    DATA_LENGTH: 0
MAX_DATA_LENGTH: 16763355
   INDEX_LENGTH: 0
      DATA_FREE: 0
 AUTO_INCREMENT: NULL
    CREATE_TIME: 2020-11-27 15:54:28
    UPDATE_TIME: NULL
     CHECK_TIME: NULL
TABLE_COLLATION: utf8_general_ci
       CHECKSUM: NULL
 CREATE_OPTIONS: max_rows=13808
  TABLE_COMMENT: 
61 rows in set (0.01 sec)
 
[test_user@127.0.0.1][information_schema]> select TABLE_SCHEMA,count(*) from information_schema.tables group by TABLE_SCHEMA;
+--------------------+----------+
| TABLE_SCHEMA       | count(*) |
+--------------------+----------+
| information_schema |       61 |
+--------------------+----------+
 
##用户test_user@% 在 information_schema.tables 中能查询到的记录分为两部分，第一部分就是所有information_schema下面的表或者视图(这里因为test_user@%用户只有 test_shao.test_xxx 表的读权限，且该表实际不存在，所以访问tables表只输出information_schema库下的61个表或者视图对象)
第二部能访问到的记录为，该用户具有对象权限的相关对象(这里可能有点绕，什么叫对象权限，可以在对象级别授予的都叫对象权限)，看下面的列子：
 
我给test_user@%用户授予 test_chen.test_chen_1 表的 create权限(这里授予任何一种对象权限都行)
grant create on  test_chen.test_chen_1 to 'test_user'@'%';
然后再次访问information_schem.tables
 
[test_user@127.0.0.1][information_schema]> select * from tables\G;
......
......
*************************** 61. row ***************************
  TABLE_CATALOG: def
   TABLE_SCHEMA: information_schema
     TABLE_NAME: INNODB_SYS_TABLESTATS
     TABLE_TYPE: SYSTEM VIEW
         ENGINE: MEMORY
        VERSION: 10
     ROW_FORMAT: Fixed
     TABLE_ROWS: NULL
 AVG_ROW_LENGTH: 1215
    DATA_LENGTH: 0
MAX_DATA_LENGTH: 16763355
   INDEX_LENGTH: 0
      DATA_FREE: 0
 AUTO_INCREMENT: NULL
    CREATE_TIME: 2020-11-27 16:05:17
    UPDATE_TIME: NULL
     CHECK_TIME: NULL
TABLE_COLLATION: utf8_general_ci
       CHECKSUM: NULL
 CREATE_OPTIONS: max_rows=13808
  TABLE_COMMENT: 
*************************** 62. row ***************************
  TABLE_CATALOG: def
   TABLE_SCHEMA: test_chen
     TABLE_NAME: test_chen_1
     TABLE_TYPE: BASE TABLE
         ENGINE: InnoDB
        VERSION: 10
     ROW_FORMAT: Dynamic
     TABLE_ROWS: 0
 AVG_ROW_LENGTH: 0
    DATA_LENGTH: 16384
MAX_DATA_LENGTH: 0
   INDEX_LENGTH: 0
      DATA_FREE: 0
 AUTO_INCREMENT: NULL
    CREATE_TIME: 2020-11-27 14:48:30
    UPDATE_TIME: NULL
     CHECK_TIME: NULL
TABLE_COLLATION: utf8mb4_general_ci
       CHECKSUM: NULL
 CREATE_OPTIONS: 
  TABLE_COMMENT: 
62 rows in set (0.00 sec)
 
ERROR: 
No query specified
 
[test_user@127.0.0.1][information_schema]> select TABLE_SCHEMA,count(*) from information_schema.tables group by TABLE_SCHEMA;
+--------------------+----------+
| TABLE_SCHEMA       | count(*) |
+--------------------+----------+
| information_schema |       61 |
| test_chen          |        1 |
+--------------------+----------+
```

#### 1.3 问题处理

任何用户都有 information_schema 下的表或者视图的访问权限(当然有些视图或者表需要一些特殊的权限，比如说 innodb_ 前缀开头的表需要用户具有 process权限才能访问 grant process on *.* to 'test_user'@'%';)。
