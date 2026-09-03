---
title: Linux rsyslog日志服务
slug: Linux rsyslog日志服务
published: 2025-08-28
description: 我们如何知道 Linux 中的 rsyslogd 服务是否启动了呢？如何查询 rsyslogd 服务的自 启动状态呢？命令如下：
image: '/images/posts/rsyslog-1.png'
tags:
  - rsyslog
category: Linux
draft: false
lang: zh-CN
pinned: false
comment: true
---
一、rsyslog简介
------------------------------------------------------------------------------

*   Rsyslog的全称是 rocket-fast system for log ,可用于接受来自各种来源的输入，转换 它们，并将结果输出到不同的目的地。
    
*   它提供了高性能、强大的安全功能和模块化设计。虽然rsyslog最初是一个常规的系 统日志，但它已经发展成为一种瑞士军刀式的日志记录，当应用有限处理时， RSYSLOG每秒可以向本地目的地发送超过一百万条消息。即使使用远程目的地和更 精细的处理，性能通常被认为是“惊人的”。
    
*   rsyslog是一个开源工具，被广泛用于Linux系统以通过TCP/UDP协议转发或接收日 志消息。rsyslog守护进程可以被配置成两种环境，一种是配置成日志收集服务器， rsyslog进程可以从网络中收集其它主机上的日志数据，这些主机会将日志配置为发 送到另外的远程服务器。rsyslog的另外一个用法，就是可以配置为客户端，用来过 滤和发送内部日志消息到本地文件夹（如/var/log）或一台可以路由到的远程rsyslog 服务器上。
    
*   官网地址：https://www.rsyslog.com/
    
*   在 CentOS 6.x 中，日志服务已经由 rsyslogd 取代了原先的 syslogd。Red Hat 公司 认为 syslogd 已经不能满足工作中的需求，rsyslogd 相比 syslogd 具有一些新的特 点：
    
    ```
    基于TCP网络协议传输日志信息。
    更安全的网络传输方式。
    有日志信息的即时分析框架。
    后台数据库。
    在配置文件中可以写简单的逻辑判断。
    与syslog配置文件相兼容。
    ```
    
*   rsyslogd 日志服务更加先进，功能更多。但是，不论是该服务的使用，还是日志文 件的格式，其实都是和 syslogd 服务相兼容的，所以学习起来基本和 syslogd 服务一 致。
    

我们如何知道 Linux 中的 rsyslogd 服务是否启动了呢？如何查询 rsyslogd 服务的自 启动状态呢？命令如下：

```cpp
ps aux | grep "rsyslog" | grep -v "grep"
```

![](/images/posts/rsyslog-1.png)

#有rsyslogd服务的进程，所以这个服务已经启动了

```cpp
#centos6.x查看服务有无开机自启 
[root@localhost ~]# chkconfig --list | grep rsyslog
rsyslog 0：关闭 1：关闭 2：启用 3：启用 4：启用 5：启用 6：关闭
#rsyslog服务在2、3、4、5运行级别上是开机自启动的  
#centos7.x查看服务有无开机自启[root@NAT1 ~]# systemctl  list-unit-files rsyslog.service
 UNIT FILE       STATE
 rsyslog.service enabled 
 1 unit files listed.
```

![](/images/posts/rsyslog-2.png)

*   系统中的绝大多数日志文件是由 rsyslogd 服务来统一管理的，只要各个进程将信息 给予这个服务，它就会自动地把日志按照特定的格式记录到不同的日志文件中。也就 是说，采用 rsyslogd 服务管理的日志文件，它们的格式应该是统一的。
    
*   在 Linux 系统中有一部分日志不是由 rsyslogd 服务来管理的，比如 apache 服务， 它的日志是由 Apache 软件自己产生并记录的，并没有调用 rsyslogd 服务。但是为 了便于读取，apache 日志文件的格式和系统默认日志的格式是一致的。
    

二、常见日志格式及文件
-----------

日志文件是重要的系统信息文件，其中记录了许多重要的系统事件，包括用户的登录 信息、系统的启动信息、系统的安全信息、邮件相关信息、各种服务相关信息等。这 些信息有些非常敏感，所以在 Linux 中这些日志文件只有 root 用户可以读取。 那么，系统日志文件保存在什么地方呢？还记得 /var/ 目录吗？它是用来保存系统动 态数据的目录，那么 /var/log/ 目录就是系统日志文件的保存位置。我们通过表 1 来 说明一下系统中的重要日志文件。

![](/images/posts/rsyslog-3.png)

除系统默认的日志之外，采用 RPM 包方式安装的系统服务也会默认把日志记录在 /var/log/ 目录中（源码包安装的服务日志存放在源码包指定的目录中）。不过这些 日志不是由 rsyslogd 服务来记录和管理的，而是各个服务使用自己的日志管理文档 来记录自身的日志。以下介绍的日志目录在你的 Linux 上不一定存在，只有安装了相应的服务，日志才会出现。服务日志如表 2 所示：

![](/images/posts/rsyslog-4.png)

三、Linux日志文件的格式分析
----------------

只要是由日志服务 rsyslogd 记录的日志文件，它们的格式就都是一样的。所以我们只要了解了日志文件的格式，就可以很轻松地看懂日志文件。

日志文件的格式包含以下 4 列：

*   事件产生的时间。
    
*   产生事件的服务器的主机名。
    
*   产生事件的服务名或程序名。
    
*   事件的具体信息。
    

我们查看一下 /var/log/secure 日志，这个日志中主要记录的是用户验证和授权方面的信息，更加容易理解。命令如下：

```cpp
[root@localhost ~]# vi /var/log/secure
```

```csharp
Jun 5 03：20：46 localhost sshd[1630]：Accepted password for root
from 192.168.0.104 port 4229 ssh2
# 6月5日 03：20：46 本地主机 sshd服务产生消息：接收从192.168.0.104主机的
4229端口发起的ssh连接的密码
Jun 5 03：20：46 localhost sshd[1630]：pam_unix(sshd：session)：
session opened for user root by (uid=0)
#时间 本地主机 sshd服务中pam_unix模块产生消息：打开用户root的会话（UID为0）
Jun 5 03：25：04 localhost useradd[1661]：new group：name=bb，
GID=501
#时间 本地主机 useradd命令产生消息：新建立bb组，GID为501
Jun 5 03：25：04 localhost useradd[1661]：new user：name=bb，
UID=501， GID=501， home=/home/bb， shell=/bin/bash
Jun 5 03：25：09 localhost passwd：pam_unix(passwd：chauthtok)：
password changed for bb
```

我截取了一段日志的内容，注释了其中的三句日志，剩余的两句日志大家可以看懂了吗？其实分析日志既是重要的系统维护工作，也是一项非常枯燥和烦琐的工作。如果我们的服务器出现了一些问题，比如系统不正常重启或关机、用户非正常登录、服务无法正常使用等，则都应该先查询日志。实际上，只要感觉到服务器不是很正常就应该查看日志，甚至在服务器没有什么问题时也要养成定时查看系统日志的习惯

Linux系统日志

日期时间 主机进程\[pid\]：事件内容

![](/images/posts/rsyslog-5.png)

* * *

四、配置文件格式及其内容详解
--------------

rsyslogd 服务是依赖其配置文件 /etc/rsyslog.conf 来确定哪个服务的什么等级的日志信息会被记录在哪个位置的。也就是说，日志服务的配置文件中主要定义了服务的名称、日志等级和日志记录位置。

### 1、/etc/rsyslog.conf配置文件的格式

该配置文件的基本格式如下所示：

```csharp
authpriv.* /var/log/secure
#服务名称[连接符号]日志等级 日志记录位置
 
#认证相关服务.所有日志等级 记录在/var/log/secure日志中
```

### 2、服务名称

我们首先需要确定 rsyslogd 服务可以识别哪些服务的日志，也可以理解为以下这些 服务委托 rsyslogd 服务来代为管理日志。这些服务如表 1 所示。

![](/images/posts/rsyslog-6.png)

*   这些日志服务名称是rsyslogd服务自己定义的，并不是实际的Linux的服务。当有服 务需要由rsyslogd服务来帮助管理日志时，只需要调用这些服务名称就可以实现日志 的委托管理。
    
*   这些日志服务名称大家可以使用命令 "man 3 syslo" 来查看。虽然我们的日志管理服 务已经更新到rsyslogd，但是很多配置依然沿用了syslogd服务，在帮助文档中仍然 查看syslog服务的帮助信息。
    

![](/images/posts/rsyslog-7.png)

* * *

### 3、连接符号

日志服务连接日志等级的格式如下：

```plaintext
日志服务[连接符号]日志等级 日志记录位置
```

在这里，连接符号可以被识别为以下三种。

1.  “.”代表只要比后面的等级高的（包含该等级）日志都记录。比如，“cron.info”代 表cron服务产生的日志，只要日志等级大于等于info级别，就记录。
    
2.  “.=”代表只记录所需等级的日志，其他等级的日志都不记录。比如，“\*.=emerg” 代表人和日志服务产生的日志，只要等级是emerg等级，就记录。这种用法极少 见，了解就好。
    
3.  “.！”代表不等于，也就是除该等级的日志外，其他等级的日志都记录。
    

* * *

### 4、日志等级

*   每个日志的重要性都是有差别的，比如，有些日志只是系统的一个日常提醒，看不看根本不会对系统的运行产生影响；但是有些日志就是系统和服务的警告甚至报错信息，这些日志如果不处理，就会威胁系统的稳定或安全。如果把这些日志全部写入一个文件，那么很有可能因为管理员的大意而忽略重要信息。
    
*   邮件的等级信息也可以使用“man 3 syslog”命令来查看。日志等级如表 2 所示，我们按照严重等级从低到高排列.
    

![](/images/posts/rsyslog-8.png)

其中，panic、error、warn均为旧的标识符，不再建议使用。

在定义level级别的时候，需要注意两点：

1.  优先级是由应用程序在编程的时候已经决定的，除非修改源码再编译，否则不能 改变消息的优先级；
    
2.  低的优先级包含高优先级，例如，为某个应用程序定义info的日志导向，则涵盖 notice、warning、err、crit、alert、emerg等消息。（除非使用=号定义）
    

![](/images/posts/rsyslog-9.png)

### 5、日志记录位置

日志记录位置就是当前日志输出到哪个日志文件中保存，当然也可以把日志输出到打 印机打印，或者输出到远程日志服务器上（当然，远程日志服务器要允许接收才 行）。日志的记录位置也是固定的：

*   日志文件的绝对路径。这是最常见的日志保存方法，如“/var/log/secure”就是用 来保存系统验证和授权信息日志的。
    
*   系统设备文件。如“/dev/lp0”代表第一台打印机，如果日志保存位置是打印机设 备，当有日志时就会在打印机上打印。
    
*   转发给远程主机。因为可以选择使用 TCP 和 UDP 协议传输日志信息，所以有两 种发送格式：如果使用“@192.168.0.210：514”，就会把日志内容使用 UDP 协 议发送到192.168.0.210 的 UDP 514 端口上；如果使用“@@192.168.0.210： 514”，就会把日志内容使用 TCP 协议发送到 192.168.0.210 的 TCP 514 端口 上，其中 514 是日志服务默认端口。当然，只要 192.168.0.210 同意接收此日 志，就可以把日志内容保存在日志服务器上。
    
*   用户名。如果是“root”，就会把日志发送给 root 用户，当然 root 要在线，否则 就收不到日志信息了。发送日志给用户时，可以使用“\*”代表发送给所有在线用 户，如“mail.\*\*”就会把 mail 服务产生的所有级别的日志发送给所有在线用户。 如果需要把日志发送给多个在线用户，则用户名之间用“，”分隔。
    
*   忽略或丢弃日志。如果接收日志的对象是“~”，则代表这个日志不会被记录，而 被直接丢弃。如“local3.\* ~”代表忽略 local3 服务类型所有的日志都不记录。
    

### 6、/etc/rsyslog.conf配置文件的内容

我们知道了/etc/rsyslog.conf 配置文件中日志的格式，接下来就看看这个配置文件的 具体内容。

由三部分组成：严格按照配置段位置添加配置 ;

*   MODULES：定义了模块的选修,这个部分主要用来配置模板，模板的作用是指定 你希望在日志文件中保存的日志格式。
    
*   GLOBAL DIRECTIVES：定义了全局的环境
    
*   RULES：定义了记录日志的设施以及等级等信息
    

![](/images/posts/rsyslog-10.png)

* * *

```plaintext
[root@localhost ~]# vi /etc/rsyslog.conf
```

```csharp
#查看配置文件的内容
#rsyslog v5 configuration file
# For more information see /usr/share/doc/rsyslog-
*/rsyslog_conf.html
# If you experience problems, see
http://www.rsyslog.com/doc/troubleshoot.html
*### MODULES ###
 
 
#加载模块
$ModLoad imuxsock # provides support for local system logging
(e.g. via logger command)
#加载imixsock模块，为本地系统登录提供支持
$ModLoad imklog # provides kernel logging support (previously
done by rklogd)
#加载imklog模块，为内核登录提供支持
#$ModLoad immark # provides --MARK-- message capability
#加载immark模块，提供标记信息的能力
# Provides UDP syslog reception
#$ModLoad imudp
#SUDPServerRun 514
#加载UPD模块，允许使用UDP的514端口接收采用UDP协议转发的日志
# Provides TCP syslog reception
#$ModLoad imtcp
#$InputTCPServerRun 514
#加栽TCP摸块,允许使用TCP的514编口接收采用TCP协议转发的日志
 
 
#### GLOBAL DIRECTIVES ####
#定义全局设置
#Use default timestamp format
#ActionFileDefaultTemplate RSYSLOG_TraditionalFileFormat #定义曰志
的时间使用默认的时间戳格式
#File syncing capability is disabled by default. This feature is
usually not required,
#not useful and an extreme performance hit
#$ActionFileEnableSync on
#文件同步功能。默认没有开启,是注释的
#Include all config files in /etc/rsyslog.d/
$IncludeConfig /etc/rsyslog.d/*.conf
#包含/etx/tsyslog.d/目录中所有的".conf"子配置文件。也就是说，这个目录中的所
有子配置文件也同时生效
#### RULES ####
#日志文件保存规则
#Log all kernel messages to the console.
#Logging much else clutters up the screen.
#kern.* /dev/console
#kern服务.所有曰志级别 保存在/dev/console
#这个日志默认没有开启,如果需要，则取消注释
#Log anything (except mail) of level info or higher.
#Don't log private authentication messages!
*.info;mail.none;authpriv.none;cron.none /var/log/messages
#所有服务.info以上级到的日志保存在/var/log/messages日志文件中
#mail, authpriv^ cron的B志不记录在/var/log/messages曰志文件中，因为它们
部有自己的曰志文件
#所以/var/log/messages日志是最重要的系统日志文件，需要经常查看
#The authpriv file has restricted access.
authpriv.* /var/log/secure
#用户认证服务所有级别的日志保存在/vai/1og/secure日志文件中
#Log all the mail messages in one place.
mail.* -/var/log/maillog
#mail服务的所有级别的日志保存在/var/log/maillog 日志文件中
#"-"的含义是日志先在内存中保存.当曰志足够多之后.再向文件中保存
# Log cron stuff
cron.* /var/log/cron
#计対任务的所有日志保存在/var/log/cron日志文件中
# Everybody gets emergency messages
#所有日志服务的疼痛等级日志对所有在线用户广播
#Save news errors of level crit and higher in a special file.
uucp,news.crit /var/log/spooler
#uucp和news曰志服务的crit以上级别的日志保存在/var/log/sppoler曰志文件中
#Save boot messages also to boot.log
local7.* /var/log/boot.log
#loacl7 日志服务的所有日志写入/var/log/boot.log 日志文件中 #会把开机时的检
测信息在显示到屏幕的同时写入/var/log/boot.log 日志文件中
# ### begin forwarding rule ###
#定义转发规到
#The statement between the begin ... end define a SINGLE
forwarding
#rule. They belong together, do NOT split them. If you create
multiple
# forwarding rules, duplicate the whole block!
# Remote Logging (we use TCP for reliable delivery)
#
# An on-disk queue is created for this action. If the remote host
is
# down, messages are spooled to disk and sent when it is up
again. #SWorkDirectory /var/lib/rsyslog # where to place spool
files #$ActionQueueFileName fwdRulel # unique name prefix for
spool files
#$ActionQueueMaxDiskSpace 1g # 1gb space limit (use as much as
possible)
#$ActionQueueSaveOnShutdown on # save messages to disk on
shutdown
#$ActionQueueType LinkedList t run asynchronously
#$ActionResumeRetryCount -1 # infinite retries if host is down
# remote host is: name/ip:port, e.g. 192.168.0.1:514, port
optional #*•* @6remote-host:514
# ### end of the forwarding rule ##
```

其实系统已经非常完善地定义了这个配置文件的内容，系统中重要的日志也已经记录 得非常完备。如果是外来的服务，如 apache、Samba 等服务，那么这些服务的配 置文件中也详细定义了日志的记录格式和记录方法。所以，日志的配置文件基本上不 需要我们修改，我们要做的仅仅是查看和分析系统记录好的日志而已。

* * *

五、Linux日志服务器设置
--------------

*   我们知道，使用“@IP：端口”或“@@IP：端口”的格式可以把日志发送到远程主机上， 那么这么做有什么意义吗？
    
*   假设我需要管理几十台服务器，那么我每天的重要工作就是查看这些服务器的日志， 可是每台服务器单独登录，并且查看日志非常烦琐，我可以把几十台服务器的日志集 中到一台日志服务器上吗？这样我每天只要登录这台日志服务器，就可以查看所有服 务器的日志，要方便得多。
    
*   如何实现日志服务器的功能呢？其实并不难，不过我们首先需要分清服务器端和客户 端。
    

### 1、rsyslog守护进程可以被配置成两种环境:

1.  一种是配置成日志收集服务器，rsyslog进程可以从网络中收集其它主机上的日志数 据，这些主机会将日志配置为发送到另外的远程服务器。
    
2.  另外一种是就是可以配置为客户端，用来过滤和发送内部日志消息到本地文件夹 （如/var/log）或一台可以路由到的远程rsyslog服务器上。
    

![](/images/posts/rsyslog-11.png)

项目主机规划

rsyslog SERVER ：(接受端) IP：192.168.198.140

rsyslog Client：（发送端） IP：192.168.198.138

* * *

### 2、rsyslog 接收日志（服务端）

在 GLOBAL DIRECTIVES 之前追加如下配置：

![](/images/posts/rsyslog-12.png)

说明：

1.  $template IpTemplate(“IpTemplate” 可自定义）指令使 rsyslog 后台进程将日 志消息写到 /var/log 下的单独的本地日志文件中，其中日志文件的名称是基于远 程日志发送机器的主机名以及生成该日志的应用程序名进行定义的。
    
2.  \*.\* ?IpTemplate 将 IpTemplate 模板应用到所有接收到的日志上 。
    

rsyslog 接收远程日志且去掉日志头配置如图所示：

具体文件配置内容如下：

![](/images/posts/rsyslog-13.png)

![](/images/posts/rsyslog-14.png)

修改配置后需要重启服务：systemctl restart rsyslog

### 3、syslog 发送日志（客户端）

发送日志的配置很简单，只需要配置要发送的地址就 ok，如果出于某种原因，你需要更为可靠的协议，如TCP，而rsyslog服务器也被配置为监听TCP连接，你必须在远程主机的IP地址前添加一个额外的@字符

```csharp
*.* @@192.168.42.209:514 # tcp 协议local7.info @192.168.42.209:514 # udp 协议，只发送用户的 info级别日志 
```

修改配置后需要重启服务：systemctl restart rsyslog

* * *

### 4、测试

**logger的使用**

logger 是一个shell 命令接口，可以通过该接口使用Syslog的系统日志模块，还可以 从命令行直接向系统日志文件写入一行信息。

*   \-i 在每行都记录进程ID
    
*   \-t 日志中的每一行都加一个error标签
    
*   \-p 指定自定义的日志设备，和配置文件的
    
*   local5.\*对应，配置文件里没有.info。
    

![](/images/posts/rsyslog-15.png)

使用示例：

```
logger -it error -p local5.info "hello world"
```

客户端触发

![](/images/posts/rsyslog-16.png)

服务端响应

![](/images/posts/rsyslog-17.png)

![](/images/posts/rsyslog-18.png)

服务端可以查看到含有IP的日志名，并可以查看到我们之前触发的日志，这里测试完毕。

* * *

六、Linux日志轮替（日志转储）
-----------------

*   日志是重要的系统文件，记录和保存了系统中所有的重要事件。但是日志文件也需要 进行定期的维护，因为日志文件是不断增长的，如果完全不进行日志维护，而任由其 随意递增，那么用不了多久，我们的硬盘就会被写满。
    
*   日志维护的最主要的工作就是把旧的日志文件删除，从而腾出空间保存新的日志文 件。这项工作如果靠管理员手工来完成，那其实是非常烦琐的，而且也容易忘记。那 么 Linux 系统是否可以自动完成日志的轮替工作呢？
    
*   logrotate 就是用来进行日志轮替（也叫日志转储）的，也就是把旧的日志文件移动 并改名，同时创建一个新的空日志文件用来记录新日志，当旧日志文件超出保存的范 围时就删除。【比如今天（20230213）生成了一个日志文件叫boot.log，明天查看时，它就会改名叫boot-20230213.log，后面跟了一个时间戳，而这天会新产生一个日志文件boot.log，依此类推】
    
*   logrotate是一个日志文件管理工具。用来把旧文件轮转、压缩、删除，并且创建新 的日志文件。我们可以根据日志文件的大小、天数等来转储，便于对日志文件管理， 一般都是通过cron计划任务来完成的 。
    

![](/images/posts/rsyslog-0.png)

* * *

### 1、日志文件的命名规则

*   日志轮替最主要的作用就是把旧的日志文件移动并改名，同时建立新的空日志文件， 当旧日志文件超出保存的范围时就删除。那么，旧的日志文件改名之后，如何命名 呢？主要依靠 /etc/logrotate.conf 配置文件中的“dateext”参数。
    
*   如果配置文件中有“dateext”参数，那么日志会用日期来作为日志文件的后缀，如 “secure-20130605”。这样日志文件名不会重叠，也就不需要对日志文件进行改名， 只需要保存指定的日志个数，删除多余的日志文件即可。
    
*   如果配置文件中没有“dateext”参数，那么日志文件就需要进行改名了。当第一次进 行日志轮替时，当前的“secure”日志会自动改名为“secure.1”，然后新建“secure”日 志，用来保存新的日志；当第二次进行日志轮替时，“secure.1”会自动改名为 “secure.2”，当前的“secure”日志会自动改名为“secure.1”，然后也会新建“secure”日 志，用来保存新的日志；以此类推。
    

### 2、logrotate配置文件

![](/images/posts/rsyslog-19.png)

我们来查看一下 logrotate 的配置文件 /etc/logrotate.conf 的默认内容

![](/images/posts/rsyslog-20.png)

```csharp
[root@localhost ~]# vi /etc/logrotate.conf
```

```cpp
#see "man logrotate" for details
#rotate log files weekly
weekly
#每周对日志文件进行一次轮替
#keep 4 weeks worth of backlogs rotate 4
#保存4个日志文件,也就是说,如果进行了5次日志轮替，就会删除第一个备份曰志
rotate 4
#create new (empty) log files after rotating old ones create
#在日志轮替时,自动创建新的日志文件
create
#use date as a suffix of the rotated file dateext
#使用日期作为日志轮替文件的后缀
dateext
#uncomment this if you want your log files compressed #compress
#日志文件是否压缩。如果取消注释,则日志会在转储的同时进行压缩
#以上日志配置为默认配置,如果需要轮替的日志没有设定独立的参数,那么都会遵循以上参数
#如果轮替曰志配置了独立参数,那么独立参数的优先级更高
#RPM packages drop log rotation information into this directory
include /etc/logrotate.d
#包含/etc/logrotate.d/目录中所有的子配置文件。也就是说,会把这个目录中所有的子
配置文件读取进来，进行日志轮替
#no packages own wtmp and btmp -- we'11 rotate them here
#以下两个轮替曰志有自己的独立参数，如果和默认的参数冲突，则独立参数生效
/var/log/wtmp {
#以下参数仅对此目录有效
monthly
#每月对日志文件进行一次轮替
create 0664 root utmp
#建立的新日志文件,权限是0664,所有者是root,所属组是utmp组
minsize 1M
#日志文件最小轮替大小是1MB。也就是日志一定要超过1MB才会轮替，否则就算时间达到一
个月，也不进行曰志轮替
rotate 1
#仅保留一个曰志备份。也就是只保留wtmp和wtmp.1曰志)
/var/log/btmp {
#以下参数只对/var/log/btmp生效
missingok
#如果日志不存在,则忽略该日志的警告信患
monthly
create 0600 root utmp
rotate 1
}
# system-specific logs may be also be configured here.
```

在这个配置文件中，主要分为三部分：

1.  第一部分是默认设置，如果需要转储的日志文件没有特殊配置，则遵循默认设置 的参数；
    
2.  第二部分是读取 /etc/logrotate.d/ 目录中的日志轮替的子配置文件，也就是说， 在 /etc/logrotate.d/ 目录中的所有符合语法规则的子配置文件也会进行日志轮 替；
    
3.  第三部分是对 wtmp 和 btmp 日志文件的轮替进行设定，如果此设定和默认参 数冲突，则当前设定生效（如 wtmp 的当前参数设定的轮替时间是每月，而默 认参数的轮替时间是每周，则对 wtmp 这个日志文件来说，轮替时间是每月， 当前的设定参数生效）。
    

* * *

logrotate 配置文件的主要参数如表 1 所示。

![](/images/posts/rsyslog-21.png)

这些参数中较为难理解的应该是 prerotate/endscript 和 postrotate/endscript，我 们利用“man logrotate”中的例子来解释一下这两个参数。例如：

```csharp
"/var/log/httpd/access.log" /var/log/httpd/error.log {
#日志轮替的是/var/log/httpd/中RPM包默认安装的apache正确访问日志和错误日志
    rotate 5
    #轮替5次
    mail www@my.org
    #把信息发送到指定邮箱
    size 100k
    #日志大于100KB时才进行日志轮替,不再按照时间轮替
    sharedscripts
    #以下脚本只执行一次
        postrotate
        #在日志轮替结束之后,执行以下脚本
            /usr/bin/killall -HUP httpd
            #重启apache 服务
        endscript
        #脚本结束
}
```

这个子配置文件，没有指定的参数都会以默认方式轮转

![](/images/posts/rsyslog-22.png)

> 注意：-HUP 平滑重启 sharedscript（共享下列脚本） postrotate（日志轮转 完后执行以下共享脚本）kill -HUP 重读某个配置文件（重新加载）

* * *

### 3、自己的日志加入日志轮替

如果有些日志默认没有加入日志轮替（比如源码包安装的服务的日志，或者自己添加 的日志），那么这些日志默认是不会进行日志轮替的，这样当然不符合我们对日志的 管理要求。如果需要把这些日志也加入日志轮替，那该如何操作呢？

这里有两种方法：

*   第一种方法是直接在 /etc/logrotate.conf 配置文件中写入该日志的轮替策略，从 而把日志加入轮替；
    
*   第二种方法是在 /etc/logrotate.d/ 目录中新建立该日志的轮替文件，在该轮替文 件中写入正确的轮替策略，因为该目录中的文件都会被包含到主配置文件中，所 以也可以把日志加入轮替。
    

我们推荐第二种方法，因为系统中需要轮替的日志非常多，如果全部直接写入 /etc/logrotate.conf 配置文件，那么这个文件的可管理性就会非常差，不利于此文件 的维护。

#### 3.1、设置YUM日志轮转

**具体步骤如下：**

```csharp
[root@localhost ~]# chattr +a /var/log/alert.log  #先给日志文件赋予chattr的a属性，保证日志的安全
```

①编写yum的日志轮转

```csharp
[root@localhost ~]#vim /etc/logrotate.d/yum
 
/var/log/yum.log{
missingok //丢失了不执行
#notifempty //空文件轮转关闭
#size 30k //到达30k轮转关闭
#yearly//一年轮转一次关闭
daily//一日轮转一次
rotate 4 //轮转保留4次
create 0777 root root //创建文件权限是777 主人是root 组也是root组
}
```

![](/images/posts/rsyslog-23.png)

![](/images/posts/rsyslog-24.png)

②先看看原本log目录下有哪些yum日志

![](/images/posts/rsyslog-25.png)

③给yum日志里追加内容，使它满足最小存储大小为3k的条件；

![](/images/posts/rsyslog-26.png)

④执行ll -h命令发现大小为45k，满足条件

![](/images/posts/rsyslog-27.png)

⑤执行下面的命令。使它重新加载；

![](/images/posts/rsyslog-28.png)

⑥这时我们进行查看，发现有一个日志yum.log.2；日志转储成功。

![](/images/posts/rsyslog-29.png)

⑦这时候你持续追加内容，一直生成了四个转储日志，这时你的yum.log日志也满足最小转储大小为3k的转储条件

![](/images/posts/rsyslog-30.png)

执行重新加载命令

![](/images/posts/rsyslog-31.png)

![](/images/posts/rsyslog-32.png)

发现它没有新生成转储日志，因为在编写yum的日志轮转时，设置了会保留4个转储日志，想要生成新的就得删除旧的转储日志；

但你仔细观察就会发现，虽然它没有生成新的转储日志，但是它替换了原来的转储日志。
### 4、logrotate管理

#### 4.1、**手动启动**

直接运行命令：

```bash
logrotate -f /etc/logrotate.conf   # 强制轮转
logrotate /etc/logrotate.conf      # 正常轮转
```

常见参数：

- `-d`：调试模式，不实际轮转
- `-v`：显示详细信息
- `-f`：强制轮转，即使未到时间

------

#### 4.2、**通过 cron 启动（RHEL7/Ubuntu18 及更早）**

- 在基于 **cronie** 的系统（RHEL7、CentOS7、Ubuntu18 等）里：
   `/etc/cron.daily/logrotate` 会每天运行一次 `logrotate`：

  ```bash
  cat /etc/cron.daily/logrotate
  /usr/sbin/logrotate /etc/logrotate.conf
  ```

- cron 会每天调用一次 → logrotate 检查各日志文件的配置（如 daily/weekly/size 等），决定是否轮转。

------

#### 4.3、**通过 systemd timer 启动（RHEL8+/Ubuntu20+）**

- 新系统大多数不再依赖 cron，而是使用 `systemd timer`：

  ```bash
  systemctl list-timers | grep logrotate
  ```

  你会看到：

  ```
  logrotate.timer  logrotate.service
  ```

- 触发逻辑：

  - `logrotate.timer` 定义运行周期（通常是每天）

  - 到期后触发 `logrotate.service`

  - `logrotate.service` 里实际执行：

    ```ini
    ExecStart=/usr/sbin/logrotate /etc/logrotate.conf
    ```

------

#### 4.4、**状态检查**

- 查看是否启用（systemd 新式系统）：

  ```bash
  systemctl status logrotate.timer
  ```

- 查看 cron 是否配置（旧系统）：

  ```bash
  ls -l /etc/cron.daily/logrotate
  ```

------

✅ 总结：

- **logrotate 不常驻**，由 **cron 或 systemd timer** 定时调用
- 配置在 `/etc/logrotate.conf` 和 `/etc/logrotate.d/`
- 可以手动运行来强制轮转
