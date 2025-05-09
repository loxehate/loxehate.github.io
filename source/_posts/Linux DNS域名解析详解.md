---
title: Linux DNS域名解析详解
tags: [域名解析]
categories: [Linux]
date: 2025-05-09
---
### 一、什么是DNS协议？

- IP地址：一长串能够唯一标记网络上的计算机的数字。IP便于机器直接读取，但是不方便记忆，且不能显示出组织的名称和性质。
- 域名：由一串用点分隔的名字组成的Internet上某一台计算机或计算机组的名称，用于在数据传输时对计算机的定位标识。域名便于记忆。

域名解析协议（DNS，Domain Name System）来将域名和IP地址相互映射。

```
✨域名与网址，www.gitee.com/veal98是一个网址，而www.gitee.com是一个域名
✨DNS协议可以使用UDP或TCP传输，使用的端口号都为53.但大多数情况下DNS都是用UDP。
```

### 二、域名的结构

域名具有一定的层次结构，从上到下依次为：根域名、顶级域名（top level domain,[TLD](https://so.csdn.net/so/search?q=TLD&spm=1001.2101.3001.7020)）、二级域名、（三级域名）

![](图片\域名的结构.png)

#### 1、顶级域名

顶级域名是域名的最后一个部分，例如`www.baidu.com`的顶级域名就是`.com`。顶级域名可以分为两类：

```
通用顶级域名，比如.com、.net、.edu、.org、.xxx等等
国家顶级域名，代表不同的国家和地区，比如.cn(中国)、.io（英属印度洋领地）、.cc（科科斯群岛）等。
```

每个顶级域名有一个托管商，托管商负责管理该顶级域名的所有事项。

#### 2、二级域名

二级域名在通用顶级域名和国家顶级域名下具有不同的意义：

```
通用顶级域名下的二级域名：一般指域名注册人选择使用的网上名称，如yahoo.com、baidu.com。
国家顶级域名下的二级域名：一般指类似于通用顶级域名的表示注册人类别和功能的标识。例如.com.cn域名中，.com是置于国家顶级域名.cn下的二级域名，表示中国的商业性组织。
```

```
三级域名是形如www.baidu.com的域名，可以当作是二级域名的子域名，特征为域名包含两个.。对于域名所有者/使用者而言，三级域名都是二级域名的附属物而无需单独费用。三级域名甚至不能称为域名，一般称之为域名下的“二级目录”。
```

#### 3、根域名

有时，`www.xxx.com`被写成`www.xxx.com.`，即最后还会多出一个点，这个点就是根域名。

![](图片\根域名.png)

### 三、域名服务器 

![](图片\域名服务器.png)

#### 1、根域名服务器

根域名服务器保存所有顶级域名服务器的地址。

#### 2、顶级域名服务器

顶级域名服务器用来管理注册在该顶级域名下的所有二级域名，记录这些二级域名的IP地址。

#### 3、权限域名服务器

按照上面的逻辑，权限域名服务器应该是管理注册在二级域名下的所有三/四级域名，但其实不是这样，如果一个三/四级域名对应一个域名服务器，则域名服务器数量会很多，我们需要使用划分区来解决这个问题。那么权限域名服务器就是负责管理一个“区”的域名服务器。

区和域是不同的，区可以由多种不同的划分方法。以百度为例，假设有fanyi.baidu.com、ai.baidu.com、tieba.baidu.com这三个域名。可以这样分区，fanyi.baidu.com和tieba.baidu.com放在baidu.com权限域名服务器，ai.baidu.com放在ai.baidu.com权限域名服务器中。并且baidu.com权限域名服务器和ai.baidu.com权限域名服务器是同等地位的，具体怎么分区由百度公司自己规定

![](图片\权限域名服务器.png)

#### 4、本地域名服务器

除了上面三种服务器，还有一种不在DNS层次结构中的，但是很重要的服务器，就是`本地域名服务器`。本地域名服务器是电脑解析时的默认域名服务器，即电脑选中的首选DNS服务器和备选DNS服务器。常见的由电信、联通、谷歌等本地DNS服务器。

### 四、DNS的查询方式

DNS查询方式有两种：

- 递归查询。
- 迭代查询

一般来说域名服务器之间的查询使用迭代查询方式，以免根域名服务器的压力过大。主机与本地域名服务器的查询方式使用递归查询

#### 1、递归查询

![](图片\递归查询.png)

#### 2、迭代查询

![](图片\迭代查询.png)

### 五、域名缓存

为了减轻域名服务器的压力。主机会使用缓存保存域名和IP地址的映射。计算机中DNS记录在本地有两种缓存方式：浏览器缓存和操作系统缓存

```
浏览器缓存：浏览器在获取网站域名的实际IP地址后会对其进行缓存，减少网络请求的损耗。
操作系统缓存：操作系统的缓存是用户自己配置的hosts文件
```

### 六、完整域名解析系统

```
1、首先搜索浏览器中的DNS缓存，缓存中维护一张域名与IP地址的对应表

2、若没有命中，则继续搜索操作系统的DNS缓存。

3、若仍然没有命中，则操作系统将域名发送至本地域名服务器，本地域名服务器查询自己的DNS缓存，查找成功则返回结果。（主机和本地域名服务器之间的查询方式是递归查询）

4、若本地域名服务器的DNS缓存没有命中，则本地域名服务器向上级域名服务器进行查询，通过以下方式迭代查询（防止根域名服务器压力过大）
   首先本地域名服务器向根域名服务器发起请求，根域名服务器是最高层次的，它并不会直接指明这个域名对应的IP地址，而是返回顶级域名服务器的地址。
   本地域名服务器拿到这个顶级域名服务器的地址后，就向其发起请求，获取权限域名服务器的地址。
   本地域名服务器拿到这个权限域名服务器的地址后，就向其发起请求，最终得到该域名对应的IP地址。

5、本地域名服务器将得到的IP地址返回给操作系统，同时自己将IP地址缓存起来

6、操作系统将IP地址返回给浏览器，同时自己也将IP地址缓存起来

7、至此，浏览器就得到了域名对应的IP地址，并将IP地址缓存起来。
```

![](图片\完整域名解析系统.png)

### 七、DNS系统的分布式数据结构

#### 1、DNS

```
DNS域名系统( Domain Name System缩 写DNS，Domain Name被译为域名)是因特网的一项核心服务，它作为可以将域名和IP地址相互映射的一个分布式数据库，能够使人更方便的访问:互联网，而不用去记住能够被机器直接读取的IP数串。
```

#### 2、正向解析

```
根据域名查找对应的IP地址
```

#### 3、反向解析

  根据IP地址查找对应的域名(域名的反向解析不是很常用，只在一些特殊场合才会用到，比如可用于反垃圾邮件的验证)

![](图片\反向解析.png)

### 八、BIND的安装配置

DNS服务，程序包名bind，程序名named。

#### 1、程序包

只需要安装bind、bind-libs和bind-utils即可

```
bind：主包

bind-libs：依赖的库文件，包括 32 位和 64 位

bind-utils：提供客户端工具，例如dig、host、nslookup和nsupdate

bind-chroot：建立不要安装，很容易被入侵

bind-chroot包的作用是提高安全性，将 DNS 服务的配置文件/etc/named.conf  等，创建一个硬链接转到/var/named/chroot/etc/  文件夹下面，而且使用服务帐号登录，不使用root用户登录

注意，修改配置文件要修改/etc/下面的，这样会自动同步到chroot下面的链接文件中
```

bind-sdb
bind-dyndb-ldap

以上这两种方式，是将解析库文件放在不同的数据库中进行存储

#### 2、BIND配置文件

配置文件

- 服务启动脚本在CentOS6下/etc/rc.d/init.d/named
- 主配置文件/etc/named.conf、/etc/rndc.key、为rndc的秘钥共享文件，提供认证用的
- rndc是什么？远程名称控制器、默认与bind安装在同一主机，且只能通过本地回环地址127.0.0.1来连接named进程、提供辅助性的管理功能，如查看解析状态等、默认工作在 953/tcp 端口上、/etc/named.rfc1912.zones、请求注解文档
- 解析库文件/var/named/ZONE_NAME.ZONE、在/var/named/目录下存在多个解析库文件/var/named/named.ca、指向根DNS该文件不需要管理员更改，而是系统自带/var/named/named.local、本地子域解析，将localhost反向解析为127.0.0.1
- 注意

(1) 一台物理服务器可同时为多个区域提供解析
(2) 必须要有根区域文件，在named.ca中包含13根节点地址，由dig命令生成而来的
(3) 应该有两个(如果包括ipv6的，应该更多)实现localhost和本地回环地址的解析库

```
#  在CentOS6下
[root@localhost ~]# rpm -ql bind | less
/etc/NetworkManager/dispatcher.d/13-named
/etc/logrotate.d/named
/etc/named
/etc/named.conf
/etc/named.iscdlv.key
/etc/named.rfc1912.zones
/etc/named.root.key
/etc/portreserve/named
/etc/rc.d/init.d/named
/etc/rndc.conf
/etc/rndc.key
/etc/sysconfig/named
/usr/lib64/bind
/usr/sbin/arpaname
......
```

```
# @表示当前区域的区域名称，在主配置文件/etc/named.conf中定义的
# TTL的值没写，因为定义了宏$TTL 1D，直接继承
# rname.invalid.表示管理员的邮箱地址
# 后面的如NS、A等缺省，因为继承前者的
 
[root@localhost named]# cat /var/named/named.localhost
$TTL 1D
@IN SOA@ rname.invalid. (
0; serial
1D; refresh
1H; retry
1W; expire
3H ); minimum
NS@
A127.0.0.1
AAAA::1
 
[root@localhost named]# cat /var/named/named.loopback
$TTL 1D
@IN SOA@ rname.invalid. (
0; serial
1D; refresh
1H; retry
1W; expire
3H ); minimum
NS@
A127.0.0.1
AAAA::1
PTRlocalhost.
```

```
cd /var/ named/
cp -p named. localhost benet . com. zone         保留源文件的权限和属主的属性复制
vim /var/ named/ benet . com. zone
$TTL ID                                           有效解析记录的生存周期
in SOA benet .com. admin . benet.com. {          “@"符 号表示当前的DNS区域名

                              0        ; s erial              更新序列号，可以是10位以内的整数
                             ID       ; refresh                刷新时间，重新下载地址数据的间隔
                             IH       ;retry                    重试延时，下载失败后的重试间隔
                             IW      ;expire              失效时间，超过该时间仍无法下载则放弃#
                             3H)     ;minimum              无效解析x记录的生存周期,
     NS            benet . com.                             记录当前区域的DNS服务器的名称
      A          192.168.80.10                              记录主机IP地址
IN  MX 10    mail. benet .com.                     MX为邮件交换记录，数字越大优先级越低
www  IN A   网络地址                                 记录正向解析www.benet.com对应的IP
mail IN A     网络地址                               MX为邮件交换记录，数字越大优先级低
ftp   IN CNAME www                                  CNAME使用别名，ftp 是www的别名
*      IN A      网络地址                            泛域名解析，“*"代表任意主机名
```

主配置文件

- 全局配置：options {}
- 日志子系统配置：logging {}
- 区域定义：本机能够为哪些zone进行解析，就要定义哪些zone如zone "ZONE_NAME" IN {}
- 注意：任何服务程序如果期望其能够通过网络被其它主机访问，至少应该监听在一个能与外部主机通信的IP地址上

```
[root@localhost ~]# cat /etc/named.conf
options {
listen-on port 53 { 127.0.0.1; };
listen-on-v6 port 53 { ::1; };
directory"/var/named";
dump-file"/var/named/data/cache_dump.db";
        statistics-file "/var/named/data/named_stats.txt";
        memstatistics-file "/var/named/data/named_mem_stats.txt";
allow-query     { localhost; };
recursion yes;
 
dnssec-enable yes;
dnssec-validation yes;
dnssec-lookaside auto;
 
/* Path to ISC DLV key */
bindkeys-file "/etc/named.iscdlv.key";
 
managed-keys-directory "/var/named/dynamic";
};
 
logging {
        channel default_debug {
                file "data/named.run";
                severity dynamic;
        };
};
 
zone "." IN {
type hint;
file "named.ca";
};
 
include "/etc/named.rfc1912.zones";
include "/etc/named.root.key";
```

```
# localhost.localdomain就是区域名称，也就是@
[root@localhost ~]# cat /etc/named.rfc1912.zones
zone "localhost.localdomain" IN {
type master;
file "named.localhost";
allow-update { none; };
};
 
zone "localhost" IN {
type master;
file "named.localhost";
allow-update { none; };
};
 
zone "1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa" IN {
type master;
file "named.loopback";
allow-update { none; };
};
 
zone "1.0.0.127.in-addr.arpa" IN {
type master;
file "named.loopback";
allow-update { none; };
};
 
zone "0.in-addr.arpa" IN {
type master;
file "named.empty";
allow-update { none; };
};
```

#### 3、缓存名称服务器配置

安装上安装上bind之后，其实就算的上是一个缓存名称服务器，只需要进行少许的配置即可完成

- 修改listen-on port 53
- 修改allow-query
- 修改recursion

（1）安装

```
[root@localhost ~]#yum install bind
```

（2）启动

```cobol
[root@localhost ~]# service named start
Generating /etc/rndc.key:                                  [  OK  ]
Starting named:                                            [  OK  ]
```

（3）查看

```
# 为了安全，安装上bind之后，默认只会监听本地，不对外提供服务
# 任何服务程序如果期望其能够通过网络被其它主机访问，至少应该监听在一个能与外部主机通信的`IP`地址上
# 编辑主配置文件即可
 
[root@localhost ~]# ss -tunlp | grep :53
udp    UNCONN     0      0              127.0.0.1:53                    *:*      users:(("named",39822,512))
udp    UNCONN     0      0                    ::1:53                   :::*      users:(("named",39822,513))
tcp    LISTEN     0      3                    ::1:53                   :::*      users:(("named",39822,21))
tcp    LISTEN     0      3              127.0.0.1:53                    *:*      users:(("named",39822,20))
```

（4）修改

```
# 修改之前先备份一下
# 逗号之前没有内容，默认为前一个的名称，后面为复制的内容
 
[root@localhost ~]# cp /etc/named.conf{,.bak}
[root@localhost ~]# ll /etc/named*
-rw-r-----. 1 root named  984 11月 20 2015 /etc/named.conf
-rw-r-----. 1 root root   984 6月  20 21:53 /etc/named.conf.bak
```

```
# //表示单行注释，注释ipv6
# /**/表示多行注释
# 修改的时候必须以;结尾且{}的两端必须有空格，否则为语法错误
# directory用来定义区域解析库文件存放位置
 
# 建议关闭dnssec功能
# 将dnssec-enable和dnssec-validation改为no，并注释key文件即可
 
# 把能够以外网进行通信的地址写在listen-on port 53之后，如果有多个可以多个添加，不能省略
# 如果将listen-on port 53进行注释或者删除，默认是监听在所有
# 将allow-query注释或改为allow-query { any; };
# 是否允许递归recursion，必须为yes
 
[root@localhost ~]# vim /etc/named.conf
options {
        listen-on port 53 { 172.16.242.178; 127.0.0.1; };
        listen-on-v6 port 53 { ::1; };
        directory       "/var/named";
        dump-file       "/var/named/data/cache_dump.db";
        statistics-file "/var/named/data/named_stats.txt";
        memstatistics-file "/var/named/data/named_mem_stats.txt";
//      allow-query     { localhost; };
        recursion yes;
        dnssec-enable no;
        dnssec-validation no;
        /* Path to ISC DLV key */
//      bindkeys-file "/etc/named.iscdlv.key";
//      managed-keys-directory "/var/named/dynamic";
};
```

（5）重启生效

```
# 重启之后才能生效配置
[root@localhost ~]# service named restart
Stopping named: .                                          [  OK  ]
Starting named:                                            [  OK  ]
 
[root@localhost ~]# ss -tunlp | grep :53
udp    UNCONN     0      0         172.16.242.178:53                    *:*      users:(("named",40086,513))
udp    UNCONN     0      0              127.0.0.1:53                    *:*      users:(("named",40086,512))
udp    UNCONN     0      0                    ::1:53                   :::*      users:(("named",40086,514))
tcp    LISTEN     0      3                    ::1:53                   :::*      users:(("named",40086,22))
tcp    LISTEN     0      3         172.16.242.178:53                    *:*      users:(("named",40086,21))
tcp    LISTEN     0      3              127.0.0.1:53                    *:*      users:(("named",40086,20))
```

#### 4、主 DNS 名称服务器配置

主 DNS 名称服务器配置就是在缓存DNS服务器的基础之上增加zone配置文件就可以了

- 在/etc/named.rfc1912.zones添加zone记录
- 在/var/named/增加zone文件

(1) 在主配置文件中定义区域

格式

```
# master表示主DNS
# slave表示从DNS
# hint表示根
# forward做转发
# file使用的是主配置文件directory定义的路径
zone "ZONE_NAME" IN {
type {master|slave|hint|forward};
file "ZONE_NAME.zone";
};
```

修改配置

```
# 在/etc/named.rfc1912.zones文件内定义域名
# named-checkconf用来检查语法错误
[root@localhost ~]# vim /etc/named.rfc1912.zones
zone "wsescape.com" IN {
        type master;
        file "wsescape.com.zone";
};
 
[root@localhost ~]# named-checkconf
```

(2) 定义区域解析库文件

格式

```
出现的内容：
宏定义；
资源记录；
```

修改配置

```
# 这里$TTL用于定义TTL的值，86400为秒，可以使用1D来代替
# $ORIGIN用于指定域名词尾，如ns以及mx都为缺省了
# named-checkzone
# 两个www，在访问的时候会进行轮询操作的
# 泛域名解析这里的*，表示无论用户输入什么都不报错
# 或者写成*  IN  A  172.16.100.11，因为CNAME不能输入ip地址
 
[root@localhost ~]# cd /var/named/
[root@localhost named]# vim wsescape.com.zone
$TTL 86400
$ORIGIN wsescape.com.
@    IN    SOA    ns1.wsescape.com.    admin.wsescape.com (
2016042201
1H
5M
7D
1D )
 IN    NS        ns1
 IN    NS        ns2
 IN    MX 10     mx1
 IN    MX 20     mx2
ns1  IN    A172.16.100.11
ns2 IN    A172.16.100.12
mx1 IN    A172.16.100.13
mx2 IN    A172.16.100.14
www IN    A172.16.100.11
www IN    A172.16.100.12
ftp INCNAMEwww
*    IN CNAME   www
 
[root@localhost named]# named-checkzone "wsescape.com" /var/named/wsescape.com.zone
zone wsescape.com/IN: loaded serial 2016042201
OK
```

更改权限

```
# 可以查出进程是以named运行的
# 其中/etc/named.conf文件的属主为root，属组为named
# 为了安全起见，对自己创建的文件进行权限修改
 
[root@localhost named]# ps -aux | grep named
named     40086  0.0  1.1 160072 11736 ?        Ssl  22:07   0:00 /usr/sbin/named -u named
root      40785  0.0  0.0 103324   864 pts/0    S+   23:19   0:00 grep named
 
[root@localhost named]# ll /etc/named.conf
-rw-r-----. 1 root named 1004 6月  20 22:23 /etc/named.conf
 
[root@localhost named]# id named
uid=25(named) gid=25(named) 组=25(named)
 
[root@localhost named]# ll
总用量 32
drwxrwx---. 2 named named 4096 6月  20 21:45 data
drwxrwx---. 2 named named 4096 6月  20 21:45 dynamic
-rw-r-----. 1 root  named 3171 1月  11 22:12 named.ca
-rw-r-----. 1 root  named  152 12月 15 2009 named.empty
-rw-r-----. 1 root  named  152 6月  21 2007 named.localhost
-rw-r-----. 1 root  named  168 12月 15 2009 named.loopback
drwxrwx---. 2 named named 4096 5月  11 07:07 slaves
-rw-r--r--. 1 root  root   408 6月  20 22:53 wsescape.com.zone
 
[root@localhost named]# chmod 640 wsescape.com.zone
[root@localhost named]# chown :named wsescape.com.zone
 
[root@localhost named]# ll
总用量 32
drwxrwx---. 2 named named 4096 6月  20 21:45 data
drwxrwx---. 2 named named 4096 6月  20 21:45 dynamic
-rw-r-----. 1 root  named 3171 1月  11 22:12 named.ca
-rw-r-----. 1 root  named  152 12月 15 2009 named.empty
-rw-r-----. 1 root  named  152 6月  21 2007 named.localhost
-rw-r-----. 1 root  named  168 12月 15 2009 named.loopback
drwxrwx---. 2 named named 4096 5月  11 07:07 slaves
-rw-r-----. 1 root  named  408 6月  20 22:53 wsescape.com.zone
```

重启生效

```
[root@localhost ~]# service named restart
Stopping named: .                                          [  OK  ]
Starting named:                                            [  OK  ]
 
# 使用dig命令来帮助我们验证信息
# 因为之前的配置，这里会进行轮询操作
[root@localhost ~]# dig -t A wsescape.com @172.16.242.178
```

#### 5、反向区域

反向解析和正向解析各为独立的系统，所以可以部署在不同的或者是相同的机器之上，都是可以

- 一个区域只能有一个主服务器，无论是正向还是反向
- 一个主服务器可以有多个从服务器

根据配置文件中定义的主机地址，来确定网络地址

- 如果都为172.16.100内的主机，那么网络地址就是172.16.100.
- 存在多种地址，如172.16.100.12、172.16.200.121等，那么网络地址就是172.16.
- 以此类推

什么是反向区域

- 不变的部分用来当做区域名称，变化的部分用来当做实现解析时候的name

格式

- 区域名称：网络地址反写.in-addr.arpa.
- 如172.16.100. ==> 100.16.172.in-addr.arpa.

如何定义反向区域

(1) 定义区域

```
# file同样是一个相对路径，/var/named/
# 如果有多个正向域对应同一个网络的话，多个区域就重名了，所以这里的网络地址其实自己可以随意定义，如"网络地址1.zone"、"网络地址2.zone"等
# 如果只有一个反向区域的话，就只需要书写一个反向解析库，就可以"网络地址.zone"这样命名了
zone "ZONE_NAME" IN {
type {master|slave|forward}；
file "网络地址.zone"；
};
 
# 因为172.16.242.178和我们的其他服务器(172.16.100.12/172.16.100.11),所以只能写成"16.172.in-addr.arpa"和"172.16.zone"
# 最后添加如下内容
[root@localhost ~]# vim /etc/named.rfc1912.zones
zone "16.172.in-addr.arpa" IN {
type master；
file "172.16.zone"；
};
```

(2) 区域解析库文件

- 以PTR记录为主
- 不需要MX和A以及AAAA记录

```
# $TTL表示宏定义的TTL值
# $ORIGIN这里表示反向区域的名称
# 反向的主机名称不能省略
# 这里的11和12会自动补充上16.172.in-addr.arpa.
# 别名记录不用反解，所以ftp没有书写反向解析
# 这里可以使用vim -o wsescape.com.zone 16.172.zone来同时编辑两个文件的
 
[root@localhost ~]# cd /var/named/
[root@localhost named]# vim 100.16.zone
$TTL 86400
$ORIGIN 16.172.in-addr.arpa.
@IN  SOAns1.wsescape.com. admin.wsescape.com. (
  2016042201
  1H
  5M
  7D
  1D )
IN  NSns1.wsescape.com.
IN    NSns2.wsescape.com.
11.100IN  PTRns1.wsescape.com.
11.100IN  PTRwww.wsescape.com.
12.100IN  PTRmx1.wsescape.com.
12.100IN  PTRwww.wsescape.com.
13.100IN  PTRmx2.wsescape.com.
```

```
# 反向解析如果没有$ORIGIN的情况下，也可以这样写
[root@localhost named]# vim 100.16.zone
$TTL 86400
@IN  SOAns1.wsescape.com. admin.wsescape.com. (
  2016042201
  1H
  5M
  7D
  1D )
16.172.in-addr.arpa.IN  NSns1.wsescape.com.
IN    NSns2.wsescape.com.
11.100IN  PTRns1.wsescape.com.
11.100IN  PTRwww.wsescape.com.
12.100IN  PTRmx1.wsescape.com.
12.100IN  PTRwww.wsescape.com.
13.100IN  PTRmx2.wsescape.com.
```

(3) 修改权限并重启

```
[root@localhost named]# chmod 640 16.172.zone
[root@localhost named]# chmod :named 16.172.zone
 
# 语法
[root@localhost named]# named-checkconf
[root@localhost named]# named-checkzone "16.172.inaddr-addr" 16.172.zone
ok
[root@localhost named]# service named reload
 
# 检测
[root@localhost named]# host -t PRT 172.16.100.12 172.16.242.178
[root@localhost named]# dig -x 172.16.100.12 @172.16.242.178
```

#### 6、从 DNS 名称服务器配置

定义从 DNS 服务器就是在缓存服务器的基础上，进行修改配置

- 在/etc/named.rfc1912.zones添加zone记录

主从复制

```
（1）应该为一台独立的名称服务器
（2）主服务器的区域解析库文件中必须有一条 NS 记录是指向从服务器
（3）从服务器只需要定义区域，而无须提供解析库文件；解析库文件应该放置于/var/named/slaves/目录中
（4）主服务器得允许从服务器作区域传送
（5）主从服务器时间应该同步，可通过ntp进行
（6）bind程序的版本应该保持一致；否则，应该从高主低
```

定义从区域的方法

正向从服务器格式

```
# 从服务器同步主服务器的解析文件会放在/var/named/slaves/中
zone "ZONE_NAME" IN {
type slave;
masters { MASTER_IP; };
file "slaves/ZONE_NAME.zone";
};
```

反向从服务器格式

```
# 从服务器同步主服务器的解析文件会放在/var/named/slaves/中
zone "Reverse_Net_Addr.in-addr.arpa" IN {
type master;
file "SOMEFILE.zone";
};
```

（1）正向从服务器的实例

```
# 注意这里的从DNS服务器，需要在主DNS服务器中定义上NS记录
# 这样才能在主DNS的解析库发生改变的时候通知从DNS服务器进行同步，否则不会同步的
 
[root@localhost ~]# vim /etc/named.rfc1912.zones
zone "wsescape.com" IN {
type slave;
masters { 172.16.242.178; };
file "slaves/wsescape.com.zone";
};
 
# 重起服务即可成效
[root@localhost ~]# rndc reload
 
# 可以通过log进行查看
[root@localhost ~]# tail /var/log/messages
```

（2）反向从服务器的实例

```csharp
# 注意这里的从DNS服务器，需要在主DNS服务器中定义上NS记录
# 这样才能在主DNS的解析库发生改变的时候通知从DNS服务器进行同步，否则不会同步的
 
[root@localhost ~]# vim /etc/named.rfc1912.zones
zone "16.172.in-addr.arpa" IN {
type slave;
masters { 172.16.242.178; };
file "slaves/172.16.zone";
};
 
# 重起服务即可成效
[root@localhost ~]# rndc reload
 
# 可以通过log进行查看
[root@localhost ~]# tail /var/log/messages
```

### 九、高级功能之编译安装BIND

```
# 最小化安装机器
[root@localhost ~]# yum  groupinstall "Development Tools" "Server Platform Development"
```

```
# 去官网isc.org下载安装包，bind-9.10.1-P1.tar.gz
# bind9和bind10的区别很大，而且bind10还在测试阶段
# 创建named用户和组
# 安装在同一目录下/usr/local/bind9，系统文件放在/etc/named/
# 禁用IPv6功能，禁用chroot功能，启动线程多核工作
 
# 自己手动编译安装bind可能会出现的问题
# （1）在/etc/named/没有配置文件或者为空，需要自己创建
# （2）没有任何区域解析库文件，即/var/named，所以也没有13个根节点，需要自己创建
# （3）没有rndc的配置文件，需要自己创建
# （4）没有启动脚本，没有/etc/init.d/named文件
# 这里由于自定义安装到了/usr/local/bind9中，所以像dig、host等工具不能直接调用，需要完整路径
```

```
[root@localhost ~]# tar xf bind-9.10.1-P1.tar.gz
[root@localhost ~]# cd bind-9.10.1-P1
[root@localhost ~]# groupadd -r -g 53 named
[root@localhost ~]# useradd -r -u 53 -g 53 named
[root@localhost ~]# ./configure --prefix=/usr/local/bind9 --sysconfdir=/etc/named/ --disable-ipv6 --disable-chroot --enable-threads
[root@localhost ~]# make
[root@localhost ~]# make install
```

```
# 添加环境变量，就可以调用相关命令
[root@localhost ~]# vim /etc/profile.d/named.sh
export PATH=/usr/local/bind9/bin:/usr/local/bind9/sbin:$PATH
[root@localhost ~]# . /etc/profile.d/named.sh
 
# 导出库文件
[root@localhost ~]# vim /etc/ld.so.conf.d/named.conf
/usr/loacl/bind9/lib
 
# 重新载入库文件
[root@localhost ~]# ldconfig -v
 
# 如果有头文件，导出头文件
[root@localhost ~]# ln -sv /usr/local/bind9/include /usr/include/named
 
# 之后就可以使用/usr/include/named来访问/usr/local/bind9/中的头文件了
[root@localhost ~]# ls /usr/include/named
 
# 在/usr/local/bind9/下有share的帮助文件，添加MANPATH将其放入man中
[root@localhost ~]# vim /etc/man.conf
MANPATH /usr/local/bind9/share/man
```

```
# 添加主配置文件，这里只添加directory就可以了
[root@localhost ~]# vim /etc/named/named.conf
option  {
directory "/var/named"
};
 
zone  "."  IN  {
type hint;
file "named.ca";
};
 
zone  "localhost"  IN  {
type master;
file "localhost.zone";
allow-update { none; };
};
 
zone  "0.0.127.in-addr.arpa"  IN  {
type master;
file "named.local";
allow-update { none; };
};
 
[root@localhost ~]# mkdir /var/named/{named.ca, localhost.zone, named.local}
```

```
# 使用dig命令来生成13个根节点，172.16.0.1为网关地址，可以帮助我们连接外网的地址，获取13个根节点
[root@localhost ~]# dig -t NS . @172.16.0.1 > /var/named/named.ca
[root@localhost ~]# vim /var/named/localhost.zone
$TTL 1D
@    IN    SOA    localhost.    admin.localhost. (
  2016042201
  1H
  5M
  7D
  1D )
   IN    NS   localhost.
localhost.    IN    A    172.0.0.1
 
[root@localhost ~]# vim /var/named/named.local
$TTL 1D
@    IN    SOA    localhost.    admin.localhost. (
  2016042201
  1H
  5M
  7D
  1D )
   IN    NS   localhost.
1    IN    PRT    localhost.
 
[root@localhost ~]# cd /var/named/
[root@localhost named]# chmod 640 ./*
[root@localhost named]# chown :named *
[root@localhost named]# chmod 640 /etc/named/named.conf
```

```
# 查看帮助文档
[root@localhost ~]# man named
 
# 启动named服务，调试
[root@localhost ~]# named -u named -f -g -d 3
 
# 启动named服务，不调试
[root@localhost ~]# named -u named
 
# 查看是否启动
[root@localhost ~]# ss -tunl named | grep :53
 
# 关闭named服务
[root@localhost ~]# killall named
```

```
# 添加解析区域
[root@localhost ~]# vim /etc/named/named.conf
zone  "wsescape.com"  IN  {
type master;
file "wsescape.com.zone";
allow-update { none; };
};
 
[root@localhost ~]# vim /var/named/wsescape.com.zone
$TTL 1D
$ORIGIN wsescape.com.
@    IN    SOA    ns.wsescape.com.    admin.wsescape.com. (
  2016042201
  1H
  5M
  7D
  1D )
   IN    NS   ns
ns     IN    A    172.16.100.11
www    IN    A    172.16.100.11
 
[root@localhost named]# chmod 640 wsescape.com.zone
[root@localhost named]# chown :named wsescape.com.zone
 
# 启动
[root@localhost named]# named -u named
 
# 解析正常
[root@localhost named]# dig -t A www.wsescape.com @172.16.100.11
```

```
# 当我们使用rndc reload等的时候，会提示我们没有配置文件
# 想让rndc可用，使用rndc-confgen来生成配置文件
# 如果使用rndc-confgen发生堵塞，可以使用rndc-confgen -r /dev/urandom来生成随机数
# 用rndc-confgen生成的文件，将#Start和#End之间的配置文件放到/etc/named/rndc.conf中，之后根据提示将后续的内容放到/etc/named/named.conf中
```

```
[root@localhost ~]# rndc-confgen
# Start of rndc.conf
key "rndc-key" {
algorithm hmac-md5;
secret "ZeE7NXZTprjARrGN/KRANQ==";
};
 
options {
default-key "rndc-key";
default-server 127.0.0.1;
default-port 953;
};
# End of rndc.conf
 
# Use with the following in named.conf, adjusting the allow list as needed:
# key "rndc-key" {
#algorithm hmac-md5;
#secret "ZeE7NXZTprjARrGN/KRANQ==";
# };
#
# controls {
#inet 127.0.0.1 port 953
#allow { 127.0.0.1; } keys { "rndc-key"; };
# };
# End of named.conf
 
# 现在rndc reload可以使用了
[root@localhost ~]# rndc reload
# 之后就只需要给提供一个脚本来像service一样，启动和关闭服务，不难的
```

```
# 编译安装，在bind-9.10.1-P1源码目录下，有一个contrib目录
# 其中包含的是第三方贡献的补充增强bind的功能
# 其中有一个目录为scripts包含一些脚本，我们可以参考
 
# 还有一个目录为queryperf来评估查询性能的，做压测的，需要编译安装才能使用
# 编译安装queryperf，只需要在其目录下执行./configure和make即可完成
# 就会生成一个queryperf的可执行文件，执行下列操作就可以直接使用了
[root@localhost queryperf]# cp queryperf /usr/local/bind9/bin/
 
# 在测试的时候，需要指定一个测试的文件，如test
[root@localhost ~]# vim test
www.wsescape.com A
wsescape.com NS
 
[root@localhost ~]# queryperf -d test -s 172.16.100.11
```

### 十、常用命令

#### 1、dig命令

**dig**用于测试dns系统，因此不会查询hosts文件进行解析

- 用于询问  DNS  域名服务器的灵活的工具
- 除非被告知请求特定域名服务器，dig将尝试  /etc/resolv.conf中列举的任何服务器
- 当未指定任何命令行参数或选项时，dig将对.（根）执行NS查询

**格式**

```
dig [-t type] name [@SERVER] [query options]
```

**语法**

类型查询

```
dig -t NS wsescape.com @172.16.242.178
dig -t MX wsescape.com @172.16.242.178
dig -t A www.baidu.com
```

查询选项：

```
+[no]trace：跟踪解析过程
+[no]recurse：进行递归解析
测试反向解析：
dig -x IP @SERVER
dig -x 172.16.100.11 @172.16.242.178
```

模拟区域传送：

```
dig -t axfr ZONE_NAME @SERVER
dig -t axfr wsescape.com @172.16.242.178
```

#### 2、host命令

**host**命令用于查询DNS的工具

- 它通过常转换指定主机名称的主机名称为 IP 地址
- 当不指定参数时，它显示host命令的帮助信息

**格式**

```
host [-t type] name [SERVER]
```

**语法**

-a 等同于-v -t
-C 在需要认证的域名服务器上查找 SOA 记录
-l 列出一个域内所有的主机
-i 反向查找
-r 不使用递归处理
-v 运行时显示详细的处理信息
-4 用于 IPv4 的查询
-6 用于 IPv6 的查询
-t <类型> 指定类型，包括a、all、mx、ns等

实例展示

```cobol
[root@localhost ~]# host -t A www.wsescape.com 172.16.242.178
Using domain server:
Name: 172.16.242.178
Address: 172.16.242.178#53
Aliases:
www.wsescape.com has address 172.16.100.11
www.wsescape.com has address 172.16.100.12
 
[root@localhost ~]# host -t A www.wsescape.com 172.16.242.178
Using domain server:
Name: 172.16.242.178
Address: 172.16.242.178#53
Aliases:
www.wsescape.com has address 172.16.100.12
www.wsescape.com has address 172.16.100.11
 
[root@localhost ~]# host -t A www.wsescape.com 172.16.242.178
Using domain server:
Name: 172.16.242.178
Address: 172.16.242.178#53
Aliases:
www.wsescape.com has address 172.16.100.11
www.wsescape.com has address 172.16.100.12
 
[root@localhost ~]# host -t A www.wsescape.com 172.16.242.178
Using domain server:
Name: 172.16.242.178
Address: 172.16.242.178#53
Aliases:
www.wsescape.com has address 172.16.100.12
www.wsescape.com has address 172.16.100.11
```

#### 3、nslookup命令

nslookup  命令用于查找域名服务器的程序，有两种模式为互交和非互交

**格式**

```less
nslookup [-option] [name | -] [server]
```

**语法**

- 非交互模式
- 直接查询即可
- 交互式模式

```cobol
nslookup>
server IP: 指明使用哪个DNS server进行查询；
set q=RR_TYPE: 指明查询的资源记录类型；
NAME: 要查询的名称；
```

实例展示

```
[root@localhost ~]# nslookup
> server 172.16.242.178
Default server: 172.16.242.178
Address: 172.16.242.178#53
> set q=A
> www.wsescape.com
Server:172.16.242.178
Address:172.16.242.178#53
 
Name:www.wsescape.com
Address: 172.16.100.11
Name:www.wsescape.com
Address: 172.16.100.12
> set q=NS
> wsescape.com
Server:172.16.242.178
Address:172.16.242.178#53
 
wsescape.comnameserver = ns2.wsescape.com.
wsescape.comnameserver = ns1.wsescape.com.
 
# 非交互模式查询
[root@rudder ~]# nslookup baidu.com
Server:         8.8.8.8
Address:        8.8.8.8#53
 
Non-authoritative answer:
Name:   baidu.com
Address: 123.125.114.144
Name:   baidu.com
Address: 220.181.111.85
Name:   baidu.com
Address: 220.181.111.86
 
# 非交互模式查询
[root@rudder ~]# nslookup
> www.baidu.com
Server:172.17.0.254
Address:172.17.0.254#53
 
Non-authoritative answer:     #非权威答案，表明是在缓存中读取的
www.baidu.comcanonical name = www.a.shifen.com.
Name:www.a.shifen.com
Address: 61.135.169.105       #返回第一个IP地址
Name:www.a.shifen.com
Address: 61.135.169.125       #返回第二个IP地址
> server 8.8.8.8              #设置域名服务器为 8.8.8.8
Default server: 8.8.8.8
Address: 8.8.8.8#53
> www.baidu.com               #再次请求百度的IP地址
Server:8.8.8.8
Address:8.8.8.8#53
 
Non-authoritative answer:
www.baidu.comcanonical name = www.a.shifen.com.
Name:www.a.shifen.com
Address: 220.181.111.147      #不同的DNS获取的IP地址是不同的。
```

#### 4、rndc命令

**rndc**客户端是通过建立套接字连接服务端，监听在TCP的953端口，来对服务端的named进行修改操作，但由于安全考虑，所以rndc的客户端和服务端安装在同一台主机之上。

语法 1

```
-b：source-address  使用  source-address  作为连接服务器的源地址允许多个实例设置  IPv4  和  IPv6  源地址

-c config-file：使用config-file  作为缺省的配置文件/etc/rndc.conf  的替代

-k key-file：使用  key-file  作为缺省的密钥文件/etc/rndc.key  的替代、如果config-file  不存在，/etc/rndc.key  中的密钥将用于认证发向服务器的命令

-s server server：是与rndc的配置文件中server语句匹配的服务器的名字或地址、如果命令行没有提供服务器，会使用rndc配置文件中options语句中的default-server子句所命名的主机

-p port：发送命令到TCP端口port，以取代BIND 9的缺省控制通道端口  953

-V：打开冗余日志

-y key_id：使用配置文件中的密钥key_id
```

语法 2

```
reload：重载主配置文件和区域解析库文件

reload zone：重重载区域解析库文件

refresh zone：安排区域的立即维护

retransfer zone：手动启动区域传送过程，而不管序列号是否增加

notify zone：重新对区域传送发通知

reconfig：重载主配置文件

status：将服务器统计信息写入统计文件中

querylog：开启或关闭查询日志、建议调试的时候开启，否则日志消耗太多性能

dumpdb：将高速缓存转储到转储文件 (named_dump.db)

stop：将暂挂更新保存到主文件并停止服务器

halt：停止服务器，但不保存暂挂更新

trace：将调试级别增加一级、建议调试的时候开启，否则日志消耗太多性能

trace level：更改调试级别

notrace：将调试级别设置为0

flush：刷新服务器的所有高速缓存

status：显示服务器的状态

restart：重新启动服务器
```

实例展示

```
# rndc工具能够帮助我们输出系统信息
[root@localhost ~]# rndc status
version: 9.8.2rc1-RedHat-9.8.2-0.47.rc1.el6
CPUs found: 1
worker threads: 1
number of zones: 20
debug level: 0
xfers running: 0
xfers deferred: 0
soa queries in progress: 0
query logging is OFF
recursive clients: 0/0/1000
tcp clients: 0/100
server is up and running
 
# rndc不重启加载区域文件
[root@localhost ~]# rndc reload
```

### 十一、DNS记录类型

#### 1、A记录

A = Address
一条A记录，是指一个域名指向IP的记录，比如：

```bash
example.com	123.45.67.89
```

#### 2、CNAME记录

一条CNAME记录，是指一个域名指向另一个域名，比如：

```
example2.com example1.com
```

- 为什么需要CNAME记录？
- 一个很简单的例子：
  我有一个腾讯云的云存储地址：xx.cos.tencent.com
  我的网站是：icc9527.com
  我不想暴露 xx.cos.tencent.com 这个内部细节
  所以，我可以用 xx.icc9527.com 来间接指向 xx.cos.tencent.com

#### 3、NS记录

NS = Name Server
NS记录是指域名服务器记录，用来指定该域名由哪个[DNS服务器](https://so.csdn.net/so/search?q=DNS服务器&spm=1001.2101.3001.7020)来进行解析

```
ns1.domain.com
```

- 如果需要把子域名交给其他DNS服务商解析，就需要添加NS记录。
- NS记录是域名服务器记录，用来指定该域名由哪个DNS服务器来进行解析。
- NS记录中的IP即为该DNS服务器的IP地址。
- 大多数域名注册商默认用自己的NS服务器来解析用户的DNS记录。
- DNS服务器NS记录地址一般以以下的形式出现：ns1.domain.com、ns2.domain.com 等。

#### 4、SOA记录

SOA = Startof Authority
SOA记录是指起始授权机构记录，说明了在众多NS记录里哪一台才是主要的服务器。

```
在任何DNS记录文件中，都是以SOA ( Startof Authority ) 记录开始。
SOA资源记录表明此DNS名称服务器是该DNS域中数据信息的最佳来源。

SOA记录与NS记录的区别：
NS记录表示域名服务器记录，用来指定该域名由哪个DNS服务器来进行解析；
SOA记录设置一些数据版本和更新以及过期时间等信息。
```

#### 5、AAAA记录

AAAA记录(AAAA record)是用来将域名解析到IPv6地址的DNS记录。

```
用户可以将一个域名解析到IPv6地址上，也可以将子域名解析到IPv6地址上。
国内大多数IDC不支持AAAA记录的解析，因此如果想进行AAAA记录解析，则需对域名NS记录设置一些专业的域名解析服务商，由他们提供AAAA记录的设置。
中科三方云解析支持IPv6环境下的AAAA记录解析。
```

#### 6、TXT记录

TXT记录，一般指某个主机名或域名的标识和说明。

```
如：
admin IN TXT “管理员, 电话：XXXXXXXXXXX”
mail IN TXT “邮件主机，存放在xxx , 管理人：AAA”
Jim IN TXT “contact: abc@mailserver.com”
也就是说，通过设置TXT记录内容可以使别人更方便地联系到你。
TXT 记录常用的方式还有做 SPF 记录（反垃圾邮件）和SSL证书的DNS验证等。
```

#### 7、MX记录

MX = Mail Exchanger
MX记录，是指邮件交换记录

```
主要用于邮箱解析，在邮件系统发送邮件时根据收信人的地址后缀进行邮件服务器的定位。
MX记录允许设置一个优先级，当多个邮件服务器可用时，会根据该值决定投递邮件的服务器。
MX记录的权重对 Mail 服务非常重要，当发送邮件时，Mail 服务器先对域名进行解析，查找 MX记录。先找权重数最小的服务器（比如说是 10），如果能连通，那么就将服务器发送过去；如果无法连通 MX 记录为 10 的服务器，才将邮件发送到权重更高的 mail 服务器上。
```

#### 8、PTR记录

PTR = Pointer
PTR记录指反向DNS记录，可看成是A记录的反向，即通过IP访问域名。

#### 9、SRV记录

即服务定位（SRV）资源记录，
用于定义提供特定服务的服务器的位置，如主机（hostname），端口（port number）等。

#### 10、URL转发

```
是指通过服务器的特殊设置，将当前访问的域名指向另一个指定的网络地址。

根据目标地址的隐藏与否，URL转发可以分为显性URL和隐性URL两种：
显性URL：将域名指向一个http(s)协议地址，访问域名时，自动跳转至目标地址，地址栏显示为目标网站地址。
隐性URL：与显性URL类似，但隐性转发会隐藏真实的目标地址，地址栏中显示为仍为此前输入的地址。
```

