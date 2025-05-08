---
title: Mysql-读写分离和双主模式
tags: [Mysql]
categories: [数据库]
date: 2025-05-08
---
### 一、读写分离

#### 1、读写分离引入时机

 大多数互联网业务中，往往读多写少，这时候数据库的读会首先成为数据库的瓶颈。如果我们已经优化了SQL，但是读依旧还是瓶颈时，这时就可以选择“读写分离”架构了。

  读写分离首先需要将数据库分为主从库，一个主库用于写数据，多个从库完成读数据的操作，主从库之间通过主从复制机制进行数据的同步，如图所示。

![](D:\学习\mysql\图片/读写分离.png)

**在应用中可以在从库追加多个索引来优化查询，主库这些索引可以不加，用于提升写效率。**

读写分离架构也能够消除[读写锁](https://so.csdn.net/so/search?q=读写锁&spm=1001.2101.3001.7020)冲突从而提升数据库的读写性能。使用读写分离架构需要注意：**主从同步延迟和读写分配机制**问题

#### 2、主从同步延迟

使用读写分离架构时，数据库主从同步具有延迟性，数据一致性会有影响，对于一些实时性要求比较高的操作，可以采用以下解决方案。

写后立刻读

```
在写入数据库后，某个时间段内读操作就去主库，之后读操作访问从库。
```

二次查询

```
先去从库读取数据，找不到时就去主库进行数据读取。该操作容易将读压力返还给主库，为了避免恶意攻击，建议对数据库访问API操作进行封装，有利于安全和低耦合。
```

根据业务特殊处理

```
根据业务特点和重要程度进行调整，比如重要的，实时性要求高的业务数据读写可以放在主库。对于次要的业务，实时性要求不高可以进行读写分离，查询时去从库查询。
```

#### 3、读写分离落地

读写路由分配机制是实现读写分离架构最关键的一个环节，就是控制何时去主库写，何时去从库读。目前较为常见的实现方案分为以下两种：

基于编程和配置实现（应用端）

```
程序员在代码中封装数据库的操作，代码中可以根据操作类型进行路由分配，增删改时操作主库，查询时操作从库。这类方法也是目前生产环境下应用最广泛的。优点是实现简单，因为程序在代码中实现，不需要增加额外的硬件开支，缺点是需要开发人员来实现，运维人员无从下手，如果其中一个数据库宕机了，就需要修改配置重启项目。
```

基于服务器端代理实现（服务器端）

![](D:\学习\mysql\图片/基于服务器端代理实现.png)

中间件代理一般介于应用服务器和数据库服务器之间，从图中可以看到，应用服务器并不直接进入到master数据库或者slave数据库，而是进入MySQL proxy代理服务器。代理服务器接收到应用服务器的请求后，先进行判断然后转发到后端master和slave数据库。

目前有很多性能不错的数据库中间件，常用的有MySQL Proxy、MyCat以及Shardingsphere等等。

```
MySQL Proxy：是官方提供的MySQL中间件产品可以实现负载平衡、读写分离等，里面很多是通过lua脚本进行的执行。

MyCat：MyCat是一款基于阿里开源产品Cobar而研发的，基于 Java 语言编写的开源数据库中间件。

ShardingSphere：ShardingSphere是一套开源的分布式数据库中间件解决方案，它由Sharding-

JDBC、Sharding-Proxy和Sharding-Sidecar（计划中）这3款相互独立的产品组成。已经在2020年4月16日从Apache孵化器毕业，成为Apache顶级项目。

Atlas：Atlas是由 Qihoo 360公司Web平台部基础架构团队开发维护的一个数据库中间件。

Amoeba：变形虫，该开源框架于2008年开始发布一款 Amoeba for MySQL软件。
```

#### 4、读写分离配置

使用MySQL Proxy进行读写分离的实验配置，基于上一篇虚拟机环境进行配置，之前是两台虚拟机，分别是一主一从，现在要增加一台虚拟机，作为代理服务器使用。

**下载MySQL Proxy**

到官网找到指定版本的包
https://downloads.mysql.com/archives/proxy/
我这里使用的是linux通用64位版本

放入到虚拟机中，然后解压

执行`tar -xzf mysql-proxy-0.8.5-linux-glibc2.3-x86-64bit.tar.gz`解压文件，自己新建一个目录存放里面的文件

```
tar -xzf mysql-proxy-0.8.5-linux-glibc2.3-x86-64bit.tar.gz
mkdir mysql-proxy
mv -n mysql-proxy-0.8.5-linux-glibc2.3-x86-64bit/* mysql-proxy/
```

创建proxy的配置文件

```
vim mysql-proxy.conf

# 下面是文件内需要添加的内容
[mysql-proxy]
user=root #运行mysql-proxy用户
admin-username=root  #主从mysql共有的用户
admin-password=123456 #用户的密码
proxy-address=192.168.137.145:4040 #mysql-proxy运行ip和端口，不加端口，默认4040
proxy-backend-addresses=192.168.137.144:3306  #指定后端主master写入数据
proxy-read-only-backend-addresses=192.168.137.146:3306 #指定后端从slave读取数据
proxy-lua-script=/root/mysql/mysql-proxy/share/doc/mysql-proxy/rw-splitting.lua #指定读写分离配置文件位置
amin-lua-script=/root/mysql/mysql-proxy/share/doc/mysql-proxy/admin-sql.lua #指定管理脚本
log-file=/var/log/mysql-proxy.log #日志位置
log-level=debug #定义log日志级别，由高到低分别有(error|warning|info|message|debug)
daemon=true #以守护进程方式运行
keepalive=true #mysql-proxy崩溃时，尝试重启

# 上面为配置文件里面的内容，保存退出后修改文件的权限
chmod 660 mysql-proxy.conf 
```

修改读写分离配置文件 `share/doc/mysql-proxy/rw-splitting.lua`

```
--- config
--
-- connection pool
if not proxy.global.config.rwsplit then
        proxy.global.config.rwsplit = {
                min_idle_connections = 1, #默认超过4个连接数时，才开始读写分离，改为1
                max_idle_connections = 8,

                is_debug = false
        }
end
```

启动mysql-proxy

进入bin目录执行下面的命令

```
./mysql-proxy --defaults-file=/root/mysql/mysql-proxy/mysql-proxy.conf
```

netstat -anlp | grep 4040 查看端口的监听状态

```
netstat -anlp | grep 4040
tcp        0      0 192.168.137.145:4040    0.0.0.0:*               LISTEN      10577/mysql-proxy
```

### 二、双主模式

#### 1、适用场景

很多企业刚开始都是使用MySQL主从模式，一主多从、读写分离等。但是单主如果发生单点故障，从库切换成主库还需要作改动。因此，如果是双主或者多主，就会增加MySQL入口，提升了主库的可用性。因此随着业务的发展，数据库架构可以由主从模式演变为双主模式。双主模式是指两台服务器互为主从，任何一台服务器数据变更，都会通过复制应用到另外一方的数据库中。
![](D:\学习\mysql\图片/双主模式.png)

**使用双主双写还是双主单写？**

建议使用双主单写，因为双主双写存在以下问题：

```
ID冲突
在A主库写入，当A数据未同步到B主库时，对B主库写入，如果采用自动递增容易发生ID主键的冲突。
可以采用MySQL自身的自动增长步长来解决，例如A的主键为1,3,5,7…，B的主键为2,4,6,8… ，但是对数据库运维、扩展都不友好。

更新丢失
同一条记录在两个主库中进行更新，会发生前面覆盖后面的更新丢失。
```

高可用架构如下图所示，其中一个Master提供线上服务，另一个Master作为备胎供高可用切换，Master下游挂载Slave承担读请求。

**这里的VIP指的是虚拟IP**

![](D:\学习\mysql\图片/mysql高可用架构.png)

随着业务发展，架构会从主从模式演变为双主模式，建议用双主单写，再引入高可用组件，例如Keepalived和MMM等工具，实现主库故障自动切换。

#### 2、MMM架构

 MMM（Master-Master Replication Manager for MySQL）是一套用来管理和监控双主复制，支持双主故障切换 的第三方软件。MMM 使用Perl语言开发，虽然是双主架构，但是业务上同一时间只允许一个节点进行写入操作。下图是基于MMM实现的双主高可用架构。
![](D:\学习\mysql\图片/MMM架构.png)

MMM故障处理机制

MMM 包含writer和reader两类角色，分别对应写节点和读节点。

```
当 writer节点出现故障，程序会自动移除该节点上的VIP

写操作切换到 Master2，并将Master2设置为writer

将所有Slave节点会指向Master2
除了管理双主节点，MMM 也会管理 Slave 节点，在出现宕机、复制延迟或复制错误，MMM 会移除该节点的 VIP，直到节点恢复正常。
```

MMM监控机制

MMM 包含monitor和agent两类程序，功能如下：

```
monitor：监控集群内数据库的状态，在出现异常时发布切换命令，一般和数据库分开部署。

agent：运行在每个 MySQL 服务器上的代理进程，monitor 命令的执行者，完成监控的探针
工作和具体服务设置，例如设置 VIP（虚拟IP）、指向新同步节点。
```

#### 3、MHA架构

MHA（Master High Availability）是一套比较成熟的 MySQL 高可用方案，也是一款优秀的故障切换和主从提升的高可用软件。在MySQL故障切换过程中，MHA能做到在30秒之内自动完成数据库的故障切换操作，并且在进行故障切换的过程中，MHA能在最大程度上保证数据的一致性，以达到真正意义上的高可用。MHA还支持在线快速将Master切换到其他主机，通常只需0.5－2秒。
目前MHA主要支持一主多从的架构，要搭建MHA，要求一个复制集群中必须最少有三台数据库服务器。

![](D:\学习\mysql\图片/MHA架构.png)

MHA由两部分组成：MHA Manager（管理节点）和MHA Node（数据节点）。

```
MHA Manager可以单独部署在一台独立的机器上管理多个master-slave集群，也可以部署在一台slave节点上。负责检测master是否宕机、控制故障转移、检查MySQL复制状况等。

MHA Node运行在每台MySQL服务器上，不管是Master角色，还是Slave角色，都称为Node，是被监控管理的对象节点，负责保存和复制
```

 master的二进制日志、识别差异的中继日志事件并将其差异的事件应用于其他的slave、清除中继日志。MHA Manager会定时探测集群中的master节点，当master出现故障时，它可以自动将最新数据的slave提升为新的master，然后将所有其他的slave重新指向新的master，整个故障转移过程对应用程序完全透明。

MHA故障处理机制：

```
把宕机master的binlog保存下来

根据binlog位置点找到最新的slave

用最新slave的relay log修复其它slave

将保存下来的binlog在最新的slave上恢复

将最新的slave提升为master

将其它slave重新指向新提升的master，并开启主从复制
```

MHA优点：

```
自动故障转移快

主库崩溃不存在数据一致性问题

性能优秀，支持半同步复制和异步复制

一个Manager监控节点可以监控多个集群
```

#### 4、主备切换

主备切换是指将备库变为主库，主库变为备库，有可靠性优先和可用性优先两种策略。

**主备延迟问题**

主备延迟是由主从数据同步延迟导致的，与数据同步有关的时间点主要包括以下三个：

```
主库 A 执行完成一个事务，写入 binlog，我们把这个时刻记为 T1;

之后将binlog传给备库 B，我们把备库 B 接收完 binlog 的时刻记为 T2;

备库 B 执行完成这个binlog复制，我们把这个时刻记为 T3。
```

所谓主备延迟，就是同一个事务，在备库执行完成的时间和主库执行完成的时间之间的差值，也就是 T3-T1。

在备库上执行show slave status命令，它可以返回结果信息，seconds_behind_master表示当前备库延迟了多少秒。

同步延迟主要原因如下：

```
备库机器性能问题
机器性能差，甚至一台机器充当多个主库的备库。

分工问题
备库提供了读操作，或者执行一些后台分析处理的操作，消耗大量的CPU资源。

大事务操作
大事务耗费的时间比较长，导致主备复制时间长。比如一些大量数据的delete或大表DDL操作都可能会引发大事务。
```

**可靠性优先**

主备切换过程一般由专门的HA高可用组件完成，但是切换过程中会存在短时间不可用，因为在切换过程中某一时刻主库A和从库B都处于只读状态。如下图所示：

![](D:\学习\mysql\图片/HA高可用组件.png)

主库由A切换到B，切换的具体流程如下：

```
判断从库B的Seconds_Behind_Master值，当小于某个值才继续下一步

把主库A改为只读状态（readonly=true）

等待从库B的Seconds_Behind_Master值降为 0

把从库B改为可读写状态（readonly=false）

把业务请求切换至从库B
```

**可用性优先**

不等主从同步完成， 直接把业务请求切换至从库B ，并且让 从库B可读写 ，这样几乎不存在不可用时间，但可能会数据不一致。

![](D:\学习\mysql\图片/可用性优先.png)

如上图所示，在A切换到B过程中，执行两个INSERT操作，过程如下：

```
主库A执行完 INSERT c=4 ，得到 (4,4) ，然后开始执行 主从切换

主从之间有5S的同步延迟，从库B会先执行 INSERT c=5 ，得到 (4,5)

从库B执行主库A传过来的binlog日志 INSERT c=4 ，得到 (5,4)

主库A执行从库B传过来的binlog日志 INSERT c=5 ，得到 (5,5)

此时主库A和从库B会有 两行 不一致的数据
```

通过上面介绍了解到，主备切换采用可用性优先策略，由于可能会导致数据不一致，所以大多数情况下，优先选择可靠性优先策略。在满足数据可靠性的前提下，MySQL的可用性依赖于同步延时的大小，同步延时越小，可用性就越高。

#### 5、配置双主模式

基于上面读写分离的环境，将原来作为mysql_proxy的服务器用作，备份的主库服务器

修改主库的mysql的配置，配置文件在`/etc/my.cnf` 目录下，原有基础上添加下面的内容

```
relay-log=mysql-rela-bin
log_slave_updates=1
#1,3,5,7...
auto_increment_offset=1
auto_increment_increment=2
#
```

修改备份主库mysql的配置，配置文件在`/etc/my.cnf` 目录下，添加下面的内容

```
server-id=3
sync-binlog=1
binlog-ignore-db=information_schema
binlog-ignore-db=performation_schema
binlog-ignore-db=sys
relay-log=mysql-relay-bin
log_slave_updates=1
#2,4,6,8,....
auto_increment_offset=2  #设置自动增长的起始偏移
auto_increment_increment=2 # 设置自动增长的步长
#
```

重启两台服务器的mysql服务，进入客户端设置master的相关参数
先配置备份主库的；

```
# 先设置密码的安全规则，本地测试使用按简单的来
set global validate_password_policy=0;
set global validate_password_length=1;

# 设置远程访问的权限
grant replication slave on *.* to 'root'@'%' identified by '123456';
grant all privileges on *.* to 'root'@'%' identified by '123456';

stop slave;
# master_log_file='mysql-bin.000004',master_log_pos=154; 这两个参数需要在主库通过show master status;查看
change master to master_host='192.168.137.144', master_port=3306, master_user='root',master_password='123456',master_log_file='mysql-bin.000004',master_log_pos=154;
start slave;
```

配置主库的

```
change master to master_host='192.168.137.145', master_port=3306, master_user='root',master_password='123456',master_log_file='mysql-bin.000001',master_log_pos=727;
start slave;
```

查看两个主库的状态

```
show slave status;
```

#### 6、MHA搭建

**MHA需要基于之前的半同步复制模式**

##### 服务器环境搭建

我这里选择的是本地虚拟机环境，使用了三台虚拟机，已经是8G内存的上限，其中包括一台主库，两台从库，MHA和其中一台从库搭建在同一台服务器上面

三台机器ssh互通

在三台服务器上分别执行下面命令，生成公钥和私钥（注意：连续按换行回车采用默认值）

```
ssh-keygen -t rsa
```

在三台MySQL服务器分别执行下面命令，密码输入系统密码，将公钥拷到MHA Manager服务器上

```
ssh-copy-id 192.168.31.126
```

之后可以在MHA Manager服务器上检查下，看看.ssh/authorized_keys文件是否包含3个公钥

```
cat /root/.ssh/authorized_keys
```

执行下面命令，将MHA Manager的公钥添加到authorized_keys文件中（此时应该包含4个公钥），如果MHA服务器分开部署这里会有4个公钥，如果是跟我一样部署在同一台服务器，那么第三个和第四个公钥是同一个

```
scp /root/.ssh/authorized_keys root@192.168.137.144:/root/.ssh/authorized_keys
scp /root/.ssh/authorized_keys root@192.168.137.145:/root/.ssh/authorized_keys
scp /root/.ssh/authorized_keys root@192.168.137.146:/root/.ssh/authorized_keys
```

可以MHA Manager执行下面命令，检测下与三台MySQL是否实现ssh互通。

```
ssh 192.168.137.144
exit
ssh 192.168.137.145
exit
ssh 192.168.137.146
exit
```

##### MHA下载安装