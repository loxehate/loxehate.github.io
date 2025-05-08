---
title: Mariadb-安装部署
tags: [Mariadb]
categories: [数据库]
date: 2025-05-08
---
官方文档

```
mysql的官方网站：www.mysql.com
中文官网：https://www.mysql.com/cn/
安装包下载地址：https://archive.mariadb.org/
```

### 一、yum安装方式

#### 1、在线安装

##### **1.1、下载mysql的yum源**

```
[root@mysql-server ~]# wget https://dev.mysql.com/get/mysql80-community-release-el7-7.noarch.rpm
//或者下载到本地再上传到服务器
```

##### 1.2、安装mysql的yum仓库

```
[root@mysql-server ~]# yum -y install mysql80-community-release-el7-7.noarch.rpm
[root@mysql-server ~]# yum -y install yum-utils    //安装yum工具包
```

##### 1.3、配置yum源

```
[root@mysql-server ~]# vim /etc/yum.repos.d/mysql-community.repo   
//修改如下
[mysql57-community]
name=MySQL 5.7 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/7/$basearch
enabled=1	#主要是把这里修改成1
...

[mysql80-community]
name=MySQL 8.0 Community Server
baseurl=http://repo.mysql.com/yum/mysql-8.0-community/el/7/$basearch
enabled=0	#主要是把这里修改成0
...

//1表示开启，0表示关闭

或者
[root@mysql-server ~]# yum-config-manager --enable mysql57-community	//将禁用的yum源库启用
[root@mysql-server ~]# yum-config-manager --disable mysql80-community	//将启用的yum源库禁用
//这种方式可以用在安装mysql脚本中，非常方便！！
```

##### 1.4、安装数据库

```
[root@mysql-server ~]# yum install -y mysql-community-server
//默认是安装最新版本的
[root@mysql-server ~]# mysql -V
mysql  Ver 14.14 Distrib 5.7.43, for Linux (x86_64) using  EditLine wrapper
//启动服务
[root@mysql-server ~]# systemctl start mysqld
[root@mysql-server ~]# netstat -ntlp|grep mysql
tcp6       0      0 :::3306                 :::*                    LISTEN      9948/mysqld
//设置开机启动
[root@mysql-server ~]# systemctl enable mysqld
```

##### 1.5、查找密码

```
//密码保存在日志文件中
[root@mysql-server ~]# grep password /var/log/mysqld.log
2023-10-10T11:32:08.314934Z 1 [Note] A temporary password is generated for root@localhost: _!2g*Hb/:R.D
```

##### 1.6、修改密码

两种方式：
第一种：登录数据库后操作

```
[root@mysql-server ~]# mysql -uroot -p'_!2g*Hb/:R.D'   //登录
...
mysql> alter user 'root'@'localhost' identified by 'Jlting@123';
​Query OK, 0 rows affected (0.00 sec)
mysql> exit
Bye

[root@mysql-server ~]# mysql -uroot -p'Jlting@123'
...
mysql>
```

第二种：免入库修改密码，直接在命令行中修改
mysqladmin -u root -p’旧密码’ password ‘新密码’
注：修改密码必须要有大小写、数字和特殊符号，因为mysql默认有密码策略。
如果忘记密码了，可以在配置文件中加上一行配置，跳过密码验证

```
[root@localhost ~]# vim /etc/my.cnf
[mysqld]    //在mysqld标签下
skip-grant-tables   //添加这一行，跳过密码验证
//意思就是跳过授权表，即可以跳过密码验证直接进入数据库
​
//修改完配置文件需要重启服务才能生效
[root@localhost ~]# systemctl restart mysqld
[root@localhost ~]# mysql -uroot -p
Enter password:	//直接回车
...
mysql>
```

#### 2、离线安装

##### 2.1、下载安装包

```
下载地址：https://downloads.mysql.com/archives/community/
下载全量包如：(mysql-8.1.0-1.el7.x86_64.rpm-bundle.tar)

解压：tar -xzvf mysql-8.1.0-1.el7.x86_64.rpm-bundle.tar
```

##### 2.2、安装MySQL

需要将上述需要的包全部安装，依次安装如下：

    rpm -ivh mysql-community-common-8.1.0-1.el7.x86_64.rpm
    rpm -ivh mysql-community-libs-8.1.0-1.el7.x86_64.rpm
    rpm -ivh mysql-community-client-8.1.0-1.el7.x86_64.rpm
    rpm -ivh mysql-community-server-8.1.0-1.el7.x86_64.rpm

如果安装过程中遇到依赖检测错误，可以在上述命令后加上--nodeps --force然后重新安装，表示忽略依赖关系。
如：rpm -ivh mysql-community-common-8.1.0-1.el7.x86_64.rpm --nodeps --force

如果要删除之前的安装，可执行命令：yum remove mysql-libs

##### 2.3、检测安装结果

上述命令安装完成后，执行命令`rpm -qa|grep -i mysql`检查安装结果。
检查MySQL的安装版本：`MySQL --version`
初始化MySQL服务：`mysqld --initialize --user=mysql`

查看MySQL密码：
执行`grep password /var/log/mysqld.log`或`cat /var/log/mysqld.log`，在打开的文件中找到：[Server] A temporary password is generated for root@localhost: >Ckizw/nQ0jc就是MySQL的密码。

##### 2.4、服务启停

```
systemctl start mysqld # 启动MySQL
systemctl stop mysqld # 关闭MySQL
systemctl restart mysqld # 重启MySQL
systemctl status mysqld # 查看MySQL状态
```

查看服务状态：`ps -ef |grep -i mysql`
查看是否开机自动启动：`systemctl list-unit-files|grep mysqld.service`
开机自启动设置

```
systemctl disable mysqld.service
systemctl enable mysqld.service
```

##### 2.5、MySQL用户设置

登录MySQL：mysql -uroot -p回车后输入上面查到的密码登录。
登录成功后需要重置密码，否则不能进行其他操作。
修改密码：alter user 'root'@'localhost' IDENTIFIED BY '123456Aa.';密码自行指定，需要注意的是MySQL有默认的密码限定规则，如果不进行修改的话，默认不能设置过于简单的密码。
修改root用户信息：update user set host='%' where user='root';
设置可远程访问权限：
MySQL 5.7版本：grant all privileges on *.* to 'root'@'%' IDENTIFIED BY '123456Aa.';
MySQL 8.0版本：grant all on *.* to 'root'@'%';
执行命令刷新权限：flush privileges;

### 二、编译安装方式

编译安装也叫源码安装

与二进制(RPM)发行版本相比，如果我们选择了通过源代码进行安装，那么在安装过程中我们能够对MySQL所做的调整将会更多更灵活一些。因为通过源代码编译我们可以：

```
a、针对自己的硬件平台选用合适的编译器来优化编译后的二进制代码；
b、根据不同的软件平台环境调整相关的编译参数；
c、针对我们特定应用场景选择需要什么组件不需要什么组件；
d、根据我们的所需要存储的数据内容选择只安装我们需要的字符集(utf-8)；
e、同一台主机上面可以安装多个MySQL；
```

在源码安装给我们带来更大灵活性的同时，同样也给我们带来了可能引入的隐患：

```
a、对编译参数的不够了解造成编译参数使用不当可能使编译出来的二进制代码不够稳定；
b、对自己的应用环境把握失误而使用的优化参数可能反而使系统性能更差；
c、还有一个并不能称之为隐患的小问题就是源码编译安装将使安装部署过程更为复杂，所花费的时间更长；
```

#### 1、清理安装环境

```
[root@mysql-server ~]# yum erase -y mariadb mariadb-server mariadb-libs mariadb-devel
[root@mysql-server ~]# userdel -r mysql
[root@mysql-server ~]# rm -rf /etc/my*
[root@mysql-server ~]# rm -rf /var/lib/mysql
```

#### **2、创建mysql用户**

```
[root@mysql-server ~]# useradd -r mysql -M -s /bin/false
```

参数解释
-r 参数表示创建系统用户。系统用户不需要登录shell。并且会分配高的UID号 mysql 指定要创建的用户账号名。
-M 参数表示不创建用户主目录。
-s 参数指定用户的登录shell，/bin/false 表示不允许登录。

#### **3、从官网下载tar包**

```
[root@mysql-server ~]# wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-boost-5.7.27.tar.gz
或：
[root@mysql-server ~]# wget  https://downloads.mysql.com/archives/get/p/23/file/mysql-boost-5.7.34.tar.gz
```

#### **4、安装编译工具**

```
[root@mysql-server ~]# yum -y install ncurses ncurses-devel openssl-devel bison gcc gcc-c++ make cmake
```

#### **5、创建mysql目录**

```
[root@mysql-server ~]# mkdir -p /usr/local/mysql
```

#### **6、解压**

```
[root@mysql-server ~]# tar xzvf mysql-boost-5.7.27.tar.gz -C /usr/local/
```

#### **7、编译安装**

```
//cd 解压的mysql目录开始编译安装
[root@mysql-server ~]# cd /usr/local/mysql-5.7.27/
[root@mysql-server mysql-5.7.27]# cmake . \
-DWITH_BOOST=boost/boost_1_59_0/ \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \
-DSYSCONFDIR=/etc \
-DMYSQL_DATADIR=/usr/local/mysql/data \
-DINSTALL_MANDIR=/usr/share/man \
-DMYSQL_TCP_PORT=3306 \
-DMYSQL_UNIX_ADDR=/tmp/mysql.sock \
-DDEFAULT_CHARSET=utf8 \
-DEXTRA_CHARSETS=all \
-DDEFAULT_COLLATION=utf8_general_ci \
-DWITH_READLINE=1 \
-DWITH_SSL=system \
-DWITH_EMBEDDED_SERVER=1 \
-DENABLED_LOCAL_INFILE=1 \
-DWITH_INNOBASE_STORAGE_ENGINE=1
​
//提示：boost也可以使用如下指令自动下载，如果不下载boost压缩包，把下面的这一条添加到配置中第二行
-DDOWNLOAD_BOOST=1/

​
参数详解：
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \       //安装目录
-DSYSCONFDIR=/etc \     //配置文件存放 （默认可以不安装配置文件）
-DMYSQL_DATADIR=/usr/local/mysql/data \   //数据目录，错误日志文件也会在这个目录
-DINSTALL_MANDIR=/usr/share/man \     //帮助文档 
-DMYSQL_TCP_PORT=3306 \     //默认端口
-DMYSQL_UNIX_ADDR=/tmp/mysql.sock \  //sock文件位置，用来做网络通信的，客户端连接服务器的时候用
-DDEFAULT_CHARSET=utf8 \    //默认字符集。字符集的支持，可以调
-DEXTRA_CHARSETS=all \      //扩展的字符集支持所有的
-DDEFAULT_COLLATION=utf8_general_ci \  //默认字符集为utf8；默认校对规则为utf8_general_ci
-DWITH_READLINE=1 \         //上下翻历史命令
-DWITH_SSL=system \         //使用私钥和证书登陆（公钥）  可以加密。 适用与长连接。坏处：速度慢
-DWITH_EMBEDDED_SERVER=1 \   //编译并启用嵌入式MySQL服务器
-DENABLED_LOCAL_INFILE=1 \    //从本地倒入数据，不是备份和恢复。
-DWITH_INNOBASE_STORAGE_ENGINE=1  //编译并启用InnoDB存储引擎，支持外键


[root@mysql-server mysql-5.7.27]# make && make install
如果安装出错，想重新安装：不用重新解压，只需要删除安装目录中的缓存文件CMakeCache.txt

需要很长的时间！大约半小时！！
```

#### **8、初始化：初始化只需要初始化一次！**

```
[root@mysql-server mysql-5.7.27]# cd /usr/local/mysql
[root@mysql-server mysql]# chown -R mysql.mysql .
[root@mysql-server mysql]# ./bin/mysqld --initialize --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data   
//--user=mysql：指定mysqld服务器运行的用户为mysql 
//--basedir=/usr/local/mysql：指定MySQL的安装目录  
//--datadir=/usr/local/mysql/data：指定MySQL数据文件存放的目录
初始化完成之后，一定要记住提示最后的密码用于登陆或者修改密码！！！

编辑mysql配置文件
[root@mysql-server ~]# vim /etc/my.cnf
//将文件中所有内容注释掉在添加如下内容
[client]
port = 3306
socket = /tmp/mysql.sock
default-character-set = utf8
​
[mysqld]
port = 3306
user = mysql
basedir = /usr/local/mysql  //指定安装目录
datadir = /usr/local/mysql/data  //指定数据存放目录
socket = /tmp/mysql.sock
character_set_server = utf8
​
​
//参数详解：
[client]
#客户端默认连接端口
port = 3306
#用于本地连接的socket套接字
socket = /tmp/mysql.sock
#编码
default-character-set = utf8
​
[mysqld]
#服务端口号，默认3306
port = 3306
#mysql启动用户
user = mysql
#mysql安装根目录
basedir = /usr/local/mysql
#mysql数据文件所在位置
datadir = /usr/local/mysql/data
#为MySQL客户端程序和服务器之间的本地通讯指定一个套接字文件
socket = /tmp/mysql.sock
#数据库默认字符集,主流字符集支持一些特殊表情符号(特殊表情符占用4个字节)
character_set_server = utf8
```

#### **9、启动mysql**

```
[root@mysql-server ~]# cd /usr/local/mysql
[root@mysql-server mysql]# ./bin/mysqld_safe --user=mysql &
​
//mysqld_safe脚本的作用是：
    先检查一些参数
    然后使用--user指定的用户来启动mysqld服务
    并监控mysqld服务，一旦mysqld宕机就会自动重新启动
​
//查看端口
[root@mysql-server mysql]# netstat -ntlp|grep 3306
tcp6       0      0 :::3306                 :::*                    LISTEN      22226/mysqld
```

#### **10、登录mysql**

```
[root@mysql-server mysql]# /usr/local/mysql/bin/mysql -uroot -p'zSRB*h)z+58o'       
//一定要有引号，单引和双引都可以！！！因为有一些特殊字符需要被定义为一个整体的字符串
​
//不加引号的结果：
[root@mysql-server mysql]# /usr/local/mysql/bin/mysql -uroot -pzSRB*h)z+58o
-bash: 未预期的符号 `)' 附近有语法错误
​
//登录后的界面
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.27  #数据库版本号
​
Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.
​
Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.
​
Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
​
mysql> exit
```

#### **11、修改密码**

```
[root@mysql-server mysql]# /usr/local/mysql/bin/mysqladmin -u root -p'zSRB*h)z+58o'  password 'JLTing@22897'
mysqladmin: [Warning] Using a password on the command line interface can be insecure.
Warning: Since password will be sent to server in plain text, use ssl connection to ensure password safety.
//并不是报错，而是警告，告诉你密码在命令行中明文显示有风险
```

#### **12、添加环境变量**

```
[root@mysql-server mysql]# vim /etc/profile    ---添加如下
PATH=$PATH:$HOME/bin:/usr/local/mysql/bin
//参数解释：$PATH :表示使用当前已经设置的PATH值。PATH值是系统找可执行程序(binaries)和脚本(scripts)的路径(路径列表)；执行这条命令就可以保留当前已经设置的PATH路径(例如：/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin)
​
[root@mysql-server bin]# echo $PATH //可以用这个命令查看当前设置路径值
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
// $HOME/bin ： 用户的 bin目录，通常包含用户自己安装的命令。
// /usr/local/mysql/bin ：MySQL可执行文件的路径。
​
[root@mysql-server mysql]# source /etc/profile
//之后就可以在任何地方使用mysql命令登陆Mysql服务器
[root@mysql-server bin]# mysql
mysql                       mysql_config_editor         mysqlimport                 mysql_ssl_rsa_setup
​
[root@mysql-server mysql]# mysql -uroot -p'JLTing@22897'
...
mysql> show databases;  //注意是复数形式
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)
​
mysql>exit  //或使用\q也能退出
```

#### **13、配置mysqld服务的管理工具**

```
[root@mysql-server mysql]# cd /usr/local/mysql/support-files/
[root@mysql-server support-files]# cp mysql.server /etc/init.d/mysqld
//mysql.server：MySQL服务器初始化及启动、停止脚本
​
//设置开机自启
[root@mysql-server support-files]# chkconfig --add mysqld
//--add 参数表示添加一个服务到 chkconfig管理中
[root@mysql-server support-files]# chkconfig mysqld on
​
//可以使用以下命令查看开机自启是否设置成功
[root@mysql-server support-files]# sysemctl is-enabled mysqld.service
mysqld.service is not a native service, redirecting to /sbin/chkconfig.
Executing /sbin/chkconfig mysqld --level=5
enabled
​
//或者使用以下命令也可以：
[root@mysql-server support-files]# chkconfig --list mysqld

```

```
注：该输出结果只显示 SysV 服务，并不包含 原生 systemd 服务。SysV 配置数据 可能被原生 systemd 配置覆盖。
要列出 systemd 服务，请执行 ‘systemctl list-unit-files’。查看在具体 target 启用的服务请执行’systemctl list-dependencies [target]'。
mysqld 0:关 1:关 2:开 3:开 4:开 5:开 6:关
表示MySQL已经设为在运行级别2、3、4、5自动启动
```

```
//先将原来的进程杀掉
[root@mysql-server support-files]# pkill mysqld
//或者
[root@mysql-server support-files]# ps -ef|grep mysql
//再kill对应的pid
​
//启动mysqld
[root@mysql-server support-files]# /etc/init.d/mysqld start 
Starting MySQL. SUCCESS! 
​
[root@mysql-server support-files]# netstat -ntlp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp6       0      0 :::3306                 :::*                    LISTEN      22656/mysqld 
​
//停止mysqld
[root@mysql-server support-files]# /etc/init.d/mysqld stop
Shutting down MySQL.. SUCCESS!
```

#### **14、托管到systemd服务管理工具中启动服务**

```
[root@mysql-server ~]# vim /lib/systemd/system/mysqld.service
​
[Unit]
Description=MySQL Server
Documentation=man:mysqld(8)
Documentation=http://dev.mysql.com/doc/refman/en/using-systemd.html
After=network.target
After=syslog.target
​
[Install]
WantedBy=multi-user.target
​
[Service]
User=mysql
Group=mysql
ExecStart=/usr/local/mysql/bin/mysqld --defaults-file=/etc/my.cnf
LimitNOFILE = 5000  //设置操作系统默认允许mysql进程最大打开文件的数量
```

### 三、二进制安装方式

#### **1、下载二进制包**

```
#根据系统glibc版本下载二进制包
rpm -qa | grep glibc

wget https://cdn.mysql.com/archives/mysql-5.7/mysql-5.7.41-linux-glibc2.12-x86_64.tar.gz
```

#### **2、添加用户**

```
[root@mysql-server ~]# groupadd -g 27 mysql && useradd -g 27 -u 27 -M -s /sbin/nologin mysql
[root@mysql-server ~]# id mysql
uid=27(mysql) gid=27(mysql) 组=27(mysql)
[root@mysql-server ~]# tar xzvf mysql-5.7.41-linux-glibc2.12-x86_64.tar.gz -C /usr/local
[root@mysql-server ~]# mv  /usr/local/mysql-5.7.41-linux-glibc2.12-x86_64  /usr/local/mysql
​
//授权属主和属组
[root@mysql-server ~]# chown -R mysql:mysql /usr/local/mysql
//创建日志文件并授权
[root@mysql-server ~]# touch /var/log/mysql.log && chown mysql:mysql /var/log/mysql.log
```

#### **3、编辑配置文件**

```
[root@mysql-server ~]# vim /etc/my.cnf
[mysqld]
basedir=/usr/local/mysql
datadir=/usr/local/mysql/data
socket=/usr/local/mysql/data/mysql.sock
port=3306
default-storage-engine = innodb
innodb_large_prefix=on
innodb_file_per_table = on
max_connections = 10000
collation-server = utf8_general_ci
character_set_server=utf8
user=mysq
[client]　　　　　　　　　　
port = 3306
socket = /usr/local/mysql/data/mysql.sock
default-character-set = utf8
[mysqld_safe]
log-error=/var/log/mysql.log
```

#### **4、添加环境变量**

```
[root@mysql-server ~]# cat >>/etc/profile<<EOF
export PATH=\${PATH}:/usr/local/mysql/bin
EOF
[root@mysql-server ~]# source /etc/profile
​
//或者
[root@mysql-server ~]# echo 'export PATH=${PATH}:/usr/local/mysql/bin'>>/etc/profile
[root@mysql-server ~]# source /etc/profile
​
//或者
[root@mysql-server ~]# ln -s /usr/local/mysql/bin/mysql /usr/sbin/mysql

[root@mysql-server ~]# whereis mysql
mysql: /usr/lib64/mysql /usr/local/mysql /usr/share/mysql /usr/local/mysql/bin/mysql
[root@mysql-server ~]# which  mysql
/usr/local/mysql/bin/mysql
```

#### **5、初始化数据库，产生随机初始登录密码，在最后一行**

```
[root@mysql-server ~]# mysqld --initialize --basedir=/usr/local/mysql/ --datadir=/usr/local/mysql/data --user=mysql
2023-10-10T12:28:00.554234Z 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).
2023-10-10T12:28:00.706131Z 0 [Warning] InnoDB: New log files created, LSN=45790
2023-10-10T12:28:00.742466Z 0 [Warning] InnoDB: Creating foreign key constraint system tables.
2023-10-10T12:28:00.805015Z 0 [Warning] No existing UUID has been found, so we assume that this is the first time that this server has been started. Generating a new UUID: 738e9da6-6768-11ee-b446-000c295e8b83.
2023-10-10T12:28:00.805493Z 0 [Warning] Gtid table is not ready to be used. Table 'mysql.gtid_executed' cannot be opened.
2023-10-10T12:28:01.103679Z 0 [Warning] A deprecated TLS version TLSv1 is enabled. Please use TLSv1.2 or higher.
2023-10-10T12:28:01.103693Z 0 [Warning] A deprecated TLS version TLSv1.1 is enabled. Please use TLSv1.2 or higher.
2023-10-10T12:28:01.104128Z 0 [Warning] CA certificate ca.pem is self signed.
2023-10-10T12:28:01.195887Z 1 [Note] A temporary password is generated for root@localhost: )E7Pb?a!odyr
```

#### **6、添加启动脚本**

```
[root@mysql-server ~]# vim /usr/lib/systemd/system/mysql.service
[Unit]
Description=MySQL Server
Documentation=man:mysqld(8)
Documentation=http://dev.mysql.com/doc/refman/en/using-systemd.html
After=network.target
After=syslog.target
[Install]
WantedBy=multi-user.target
[Service]
User=mysql
Group=mysql
ExecStart=/usr/local/mysql/bin/mysqld --defaults-file=/etc/my.cnf
LimitNOFILE = 5000  
#设置操作系统默认允许mysql进程最大打开文件的数量
```

#### **7、更新自启动服务，查看工作端口**

```
#重新加载systemd管理器的unit配置文件
[root@mysql-server ~]# systemctl daemon-reload
[root@mysql-server ~]# systemctl enable --now mysql.service
[root@mysql-server ~]# systemctl  restart mysql
[root@mysql-server ~]# systemctl enable mysql
[root@mysql-server ~]# netstat -ntpl | grep "3306"
```

#### **8、登录**

```
[root@mysql-server ~]# mysql -u root -p')E7Pb?a!odyr'
```

#### **9、修改登录密码**

```
mysql> alter user 'root'@'localhost' identified by '123456';
Query OK, 0 rows affected (0.00 sec)

mysql> update mysql.user set password_expired='N';    //设置mysql库中的user表中的password_expired为No，意思就是设置密码不过期
Query OK, 0 rows affected (0.00 sec)
Rows matched: 3  Changed: 0  Warnings: 0

​mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)
```

```
[root@mysql-server ~]# mysql -u root -p123456
```

