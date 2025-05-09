---
title: Linux iptables详解
tags: [iptables]
categories: [Linux]
date: 2025-05-09
---
## 前言

保障数据的安全性是继保障数据的可用性之后最为重要的一项工作。防火墙作为公网与内网之间的保护屏障，在保障数据的安全性方面起着至关重要的作用。

| iptables                                                     | centos 5/6 系统默认防火墙 |
| ------------------------------------------------------------ | ------------------------- |
| firewalld                                                    | centos 7/8 系统默认防火墙 |
| iptables用的较多，在7和8上也是有的，现在流行的k8s就是基于iptables |                           |

centos 7.6与centos 7.9 默认没有安装iptables-services，但是有iptables客户端，可以使用iptables命令设置规则以及不影响firewalld的调用。但是无法使用systemctl管理也无法使用/etc/sysconfig/iptables防火墙规则配置文件。

## 一、[iptables](https://so.csdn.net/so/search?q=iptables&spm=1001.2101.3001.7020)防火墙基础

- 硬件防火墙：性能好，用图形化 管理，一般公司用硬件（华为E9000）
- 软件防火墙：做辅助，做在服务器上，用命令管理

```
Linux系统的防火墙：IP信息包过滤系统，它实际上由两个组件netfilter和iptables组成

主要工作在网络层，针对IP数据包，体现在对包内的IP地址、端口、协议等信息的处理上
```

### 1.1 netfilter和iptables关系

Linux中称为包过滤防火墙，iptables和firewalld都有两个组件netfilter和iptables，这两种称呼都可以表示Linux防火墙

注意：与netfilter相提并论的iptables是iptables防火墙的组件，可以认为是iptables防火墙的分支，但是名字一样

- netfilter

```
位于Linux内核中的包过滤功能体系
称为Linux防火墙的“内核态”（又称内核空间）
是内核的一部分，由一些数据包过滤表组成，这些表包含内核用来控制数据包过滤处理的规则集。
```

- iptables

```
位于/sbin/iptables，用来管理防火墙规则的工具
称为Linux防火墙的“用户态”（又称用户空间）
它使插入、修改和删除数据包过滤表中的规则变得容易
```

```
netfilter/iptables后期简称为iptables, iptables是基于内核的防火墙,其中内置了raw、mangle、nat和filter四个规则表。

表中所有规则配置后,立即生效,不需要重启服务。
```

![](图片\iptables.png)

### 1.2 iptables的四表五链

iptables由五个表table和五个链chain以及一些规则组成：

![](图片\iptables规则表，链结构.png)

数据包到达防火墙时，规则表之间的优先顺序: raw > mangle > nat > filter

| 规则表的作用 | 容纳各种规则链       |
| ------------ | -------------------- |
| 规则链的作用 | 容纳各种防火墙规则   |
| 总结         | 表中有链，链中有规则 |

#### 1.2.1 四表

| **表**   | 含义                                                     | 包含的规则链                                   |
| -------- | -------------------------------------------------------- | ---------------------------------------------- |
| raw表    | 确定是否对该数据包进行状态跟踪                           | OUTPUT、PREROUTING                             |
| mangle表 | 修改数据包内容，用来做流量整形的，给数据包设置标记       | INPUT、OUTPUT、FORWARD、PREROUTING、POSTROUING |
| nat表    | 负责网络地址转换，用来修改数据包中的源、目标IP地址或端口 | OUTPUT、PREROUTING、POSTROUING                 |
| filter表 | 负责过滤数据包，确定是否放行该数据包（过滤）             | INPUT、FORWARD、OUTPUT                         |

```
在iptables的四个规则表中， mangle表和raw表的应用相对较少

filter表是防火墙的默认表
```

![](图片\iptables表顺序.png)



#### 1.2.2 五链 

| **链**       | 作用                                                         |
| ------------ | ------------------------------------------------------------ |
| INPUT链      | 处理入站数据包,匹配目标IP为本机的数据包                      |
| OUTPUT链     | 处理出站数据包,一般不在此链上做配置                          |
| FORWARD链    | 处理转发数据包,匹配流经本机的数据包                          |
| PREROUTING链 | 在进行路由选择前处理数据包,用来修改目的地址,用来做DNAT。相当于把内网服务器的IP和端口映射到路由器的外网IP和端口上 |
| POSTROUING链 | 在进行路由选择后处理数据包,用来修改源地址,用来做SNAT。相当于内网通过路由器NAT转换功能实现内网主机通过一个公网IP地址上网 |

#### 1.2.3 四表五链总结

规则链之间的匹配顺序:

```
主机型防火墙:
入站数据(来自外界的数据包,且目标地址是防火墙本机):PREROUTING --> INPUT -->本机的应用程序
出站数据(从防火墙本机向外部地址发送的数据包) :本机的应用程序--> OUTPUT --> POSTROUTING

网络型防火墙:
转发数据(需要经过防火墙转发的数据包) : PREROUTING --> FORWARD --> POSTROUTING
```

规则链内的匹配顺序:

```
自上向下按顺序依次进行检查,找到相匹配的规则即停止(LOG策略例外,表示记录相关日志)

若在该链内找不到相匹配的规则,则按该链的默认策略处理(未修改的状况下,默认策略为允许)
```

### 1.3 数据包控制的匹配流程

![](图片\iptables匹配流程.png)

```
标红的代表该链的规则通常在这个表上配置 
```

#### 1.3.1 入站

```
入站数据包从A网络发到B网络，首先发到防火墙，先后顺序经过有PREROUTING链的三个表（raw、mangle、nat），如果都是放通状态的会经过路由选择，然后根据目的地址一层一层往上送，经过有INPUT的两个表（mangle、filter），一直送到应用程序
```

#### 1.3.2 转发

```
目的地不是本机，数据包先从A网络过滤，经过PREROUTING链，看是否是自己的目的地址，如果是外网到内网需要用nat转换成内网IP，找到内网用户，经过FORWARD链进行过滤，允许放通的到达POSTROUING链，再把内网地址转换成公网，这样数据包才能回去；如果是内网往外网发顺序就是反过来
```

#### 1.3.3 出站

```
从本机的应用程序发出来， 经过路由选择，让路由知道从哪里发，先后顺序经过有OUTPUT链的四个表（raw、mangle、nat、filter），都放通后到达POSTROUING链的两个表（mangle、nat），如果没有什么转换地址，就出站
```

## 二、iptables的配置及相关规则

```
#centos7中是可以敲iptables的命令的，但是无法进行管理，因为默认是用firewalld进行管理的
[root@localhost ~]# which iptables
/usr/sbin/iptables
[root@localhost ~]# 
 
#若想使用iptables防火墙，必须先关闭 firewalld防火墙，再安装iptables
[root@localhost ~]# systemctl stop firewalld
[root@localhost ~]# systemctl disable firewalld
Removed symlink /etc/systemd/system/multi-user.target.wants/firewalld.service.
Removed symlink /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service.
 
[root@localhost ~]# yum install -y iptables iptables-services
已加载插件：fastestmirror, langpacks
local                                                 | 3.6 kB     00:00     
Loading mirror speeds from cached hostfile
软件包 iptables-1.4.21-18.0.1.el7.centos.x86_64 已安装并且是最新版本
正在解决依赖关系
--> 正在检查事务
---> 软件包 iptables-services.x86_64.0.1.4.21-18.0.1.el7.centos 将被 安装
--> 解决依赖关系完成
 
依赖关系解决
 
=============================================================================
 Package              架构      版本                          源        大小
=============================================================================
正在安装:
 iptables-services    x86_64    1.4.21-18.0.1.el7.centos      local     51 k
 
事务概要
=============================================================================
安装  1 软件包
 
总下载量：51 k
安装大小：25 k
Downloading packages:
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  正在安装    : iptables-services-1.4.21-18.0.1.el7.centos.x86_64        1/1 
  验证中      : iptables-services-1.4.21-18.0.1.el7.centos.x86_64        1/1 
 
已安装:
  iptables-services.x86_64 0:1.4.21-18.0.1.el7.centos                        
 
完毕！
 
#可以看到iptables默认是已安装的
[root@localhost ~]# systemctl start iptables.service 
#安装完后启动服务
```

在centos6中可以通过图形化界面（如下图）来管理，但是在centos7中没有反应，只能通过命令行来管理 

### 2.1 命令格式

iptables [-t 表名] 管理选项 [链名] [匹配条件] [-j  控制类型]

```
注意事项：
不指定表名时,默认指filter表
不指定链名时,默认指表内的所有链
除非设置链的默认策略,否则必须指定匹配条件
控制类型使用大写字母,其余均为小写
```

### 2.2 常用控制类型

| ACCEPT     | 允许数据包通过                                               |
| ---------- | ------------------------------------------------------------ |
| DROP       | 直接丢弃数据包,不给出任何回应信息                            |
| REJECT     | 拒绝数据包通过,会给数据发送端一个响应信息                    |
| SNAT       | 修改数据包的源地址                                           |
| DNAT       | 修改数据包的目的地址                                         |
| MASQUERADE | 伪装成一个非固定公网IP地址                                   |
| LOG        | 在/var/log/messages文件中记录日志信息,然后将数据包传递给下一条规则。LOG只是一种辅助动作,并没有真正处理数据包 |

### 2.3 常用的管理选项

| -A             | 在指定链的末尾追加(--append)一条新的规则                     |
| -------------- | ------------------------------------------------------------ |
| -I             | 在指定链的开头插入(--insert)一条新的规则,未指定序号时默认作为第一条规则 |
| -R             | 修改、替换(--replace)指定链中的某一条规则,可指定规则序号或具体内容 |
| -P             | 设置指定链的默认策略(--policy)                               |
| -D             | 删除(--delete)指定链中的某一条规则,可指定规则序号或具体内容  |
| -F             | 清空(--flush)指定链中的所有规则,若未指定链名,则清空表中的所有链 |
| -L             | 列出(--list)指定链中所有的规则,若未指定链名,则列出表中的所有链 |
| -n             | 使用数字形式(--numeric)显示输出结果,如显示IP地址而不是主机名 |
| -v             | 显示详细信息,包括每条规则的匹配包数量和匹配字节数            |
| --line-numbers | 查看规则时,显示规则的序号                                    |

### 2.4 匹配条件

| 匹配条件 | 说明                               |
| -------- | ---------------------------------- |
| -p       | 指定要匹配的数据包的协议类型       |
| -s       | 指定要匹配的数据包的源IP地址       |
| -d       | 指定要匹配的数据包的目的IP地址     |
| -i       | 指定数据包进入本机的网络接口       |
| -o       | 指定数据包离开本机做使用的网络接口 |
| –sport   | 指定源端口号                       |
| –dport   | 指定目的端口号                     |

### 2.5 iptables语法总结

![](图片\iptables语法总结.png)

### 2.6 案例

- 案例1：默认查看filter表

![](图片\iptables默认查看filter表.png)

-nL可以合起来写，但是n必须放在前面，放在后面会报错，如上图所示的报错 

- 案例2 ：查看其他表

![](图片\iptables案例2 ：查看其他表.png)

- 案例3：一键清空规则

![](图片\iptables 案例3：一键清空规则.png)

- 案例4：设置ping不可达

![](图片\iptables案例4：设置ping不可达1.png)

![](图片\iptables案例4：设置ping不可达2.png)

0.0.0.0/0 代表所有主机都生效 

![](图片\iptables案例4：设置ping不可达3.png)

![](图片\iptables案例4：设置ping不可达4.png)

![](图片\iptables案例4：设置ping不可达5.png)

-  案例5：添加

![](图片\iptables 案例5：添加.png)

-  案例6：插入

![](图片\iptables 案例6：插入.png)

不指定默认是在第一行插入添加 

- 案例7：删除

![](图片\iptables案例7：删除.png)

 如果有多条一样的规则，是先删序号小的那条

- 案例8：设置默认规则

![](图片\iptables案例8：设置默认规则1.png)

![](图片\iptables案例8：设置默认规则2.png)

## 三、规则的匹配

### 3.1 通用匹配

可直接使用，不依赖其他条件或扩展包括网络协议、IP地址、网络接口等条件

| 协议匹配 | -p 协议名                                                 |
| -------- | --------------------------------------------------------- |
| 地址匹配 | -s 源地址、-d目的地址 #可以是IP、网段、域名、空(任何地址) |
| 接口匹配 | -i 入站网卡、-o 出站网卡                                  |

```
iptables -A FORWARD ! -p icmp -j ACCEPT
#没有-t指定表，就是指默认表filter表
#！代表条件取反，不是ICMP的都放通
 
iptables -A INPUT -s 192.168.109.132 -j DROP
#拒绝从哪个主机发数据包过来
 
 
iptables -I INPUT -i ens33 -s 192.168.109.0/24 -j DROP
#在行首插入  禁止该网段从ens33网卡进来
```

- 案例1 

![](图片\iptables案例1 通用.png)

-  案例2

![](图片\iptables 案例2通用1.png)

![](图片\iptables案例2通用2.png)

### 3.2 隐含匹配

要求以特定的协议匹配作为前提，包括端口、TCP标记、[ICMP](https://so.csdn.net/so/search?q=ICMP&spm=1001.2101.3001.7020)类型等条件

#### 3.2.1 端口匹配

--sport 源端口  --dport 目的端口

| **可以是个别端口、端口范围**                     |                                |
| ------------------------------------------------ | ------------------------------ |
| --sport 1000                                     | 匹配源端口是1000的数据包       |
| --sport 1000:3000                                | 匹配源端口是1000-3000的数据包  |
| --sport ：3000                                   | 匹配源端口是3000及以下的数据包 |
| --sport ：1000                                   | 匹配源端口是1000及以上的数据包 |
| 注意：--sport和--dport必须配合-p <协议类型> 使用 |                                |

![](图片\iptables 端口匹配.png)

####  3.2.2 TCP标记匹配

--tcp-flags TCP标记

```
#丢弃SYN请求包，放行其他包
# SYN,RST,ACK SYN  前面三个包逗号，然后空格跟一个，表明前面的三个里面除了这空格后面的SYN，其他都放行
[root@localhost ~]# iptables -I INPUT -i ens33 -p tcp --tcp-flags SYN,RST,ACK SYN -j ACCEPT
[root@localhost ~]# iptables -nL
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         
ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0            tcp flags:0x16/0x02
DROP       all  --  192.168.109.132      0.0.0.0/0           
ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpts:20:21
 
Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         
 
Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination   
```

![](图片\iptablesTCP标记匹配.png)

#### 3.2.3 ICMP类型匹配

--icmp-type ICMP类型   可以是字符串、数字代码

| Echo-Request（代码为8）                                      | 请求       |
| ------------------------------------------------------------ | ---------- |
| Echo-Reply （代码为0）                                       | 回显       |
| Destination-Unreachable（代码为3）                           | 目标不可达 |
| 其他可用的icmp协议类型，可以执行iptables -p icmp -h 查看帮助信息 |            |

```
Request--（ping）

Reply --（pong）

有点类似乒乓，一个请求一个回显
```

```
iptables -A INPUT -p icmp -j DROP
#增加了此条规则不仅别人ping不通自己，自己也ping不通别人，这是因为回复回不来，数据有ping和pong一来一回，ping出去了，pong不回来，被防火墙拦截了
#如果我们想要双标，别人ping不通自己，但是自己也能ping通别人，怎么操作呢
```

![](图片\iptables ICMP类型匹配1.png)

![](图片\iptables ICMP类型匹配2.png)

### 3.3 显示匹配

要求以"-m扩展模块"的形式明确指出类型,包括多端口、MAC地址、IP范围、数据包状态等条件

- 多端口匹配:

-m multiport --sport  源端口列表

-m multiport --dport  目的端口列表

```
#m扩展模块可以一次指定多个端口，不必一条条写了
[root@localhost ~]# iptables -A INPUT -p tcp -m multiport --dport 80,22,21,20,53 -j ACCEPT 
[root@localhost ~]# iptables -nL
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         
DROP       icmp --  0.0.0.0/0            0.0.0.0/0            icmptype 8
ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0            multiport dports 80,22,21,20,53
 
Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         
 
Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination 
```

![](图片\iptables多端口匹配.png)

-  IP范围匹配:

-m iprange --src-range 源IP范围

-m iprange --dst-range 目的IP范围

```
#禁止转发源地址位于192.168.109.100-192.168.109.200的udp数据包
[root@localhost ~]# iptables -A FORWARD -p udp -m iprange --src-range 192.168.109.100-192.168.109.200 -j DROP 
[root@localhost ~]# iptables -nL
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         
DROP       icmp --  0.0.0.0/0            0.0.0.0/0            icmptype 8
ACCEPT     tcp  --  0.0.0.0/0            0.0.0.0/0            multiport dports 80,22,21,20,53
 
Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         
DROP       udp  --  0.0.0.0/0            0.0.0.0/0            source IP range 192.168.109.100-192.168.109.200
 
Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination  
```

![](图片\iptables  IP范围匹配.png)

-  MAC地址匹配: （用的不多）

-m mac --mac-source  源MAC地址

```
iptables -A FORWARD -m mac --mac-source xx:xx:xx:Xx:xx:xx -j DROP
#禁止来自某MAC地址的数据包通过本机转发
```

- 状态匹配:

-m state --state连接状态

常见的连接状态:

| NEW         | 主机连接目标主机,在目标主机上看到的第一个想要连接的包        |
| ----------- | ------------------------------------------------------------ |
| ESTABLISHED | 主机已与目标主机进行通信,判断标准只要目标主机回应了第一个包,就进入该状态 |
| RELATED     | 主机已与目标主机进行通信,目标主机发起新的链接方式,一般与ESTABLISHED配合使用 |
| INVALID     | 无效的封包,例如数据破损的封包状态                            |

```
iptables -I INPUT -M state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
#第一个包我只看22端口的包
#-p tcp是隐含匹配，可以省略-m tcp
 
iptables -A INPUT -p tcp -m multiport --dport 443,80,22,21,20,53 -j ACCEPT
#允许放通tcp的这些端口号
#-m multiport加载多个端口模块
 
iptables -A INPUT -p udp -m multiport --dport 53 -j ACCEPT
iptables -A INPUT -p tcp -m state --state ESTABLISHED ,RELATED -j ACCEPT
#表示与上述连接相关的数据我都放通
 
iptables -P INPUT DROP
#默认关闭，将以上的设置设为白名单
 
```

<<<<<<< HEAD
## 四、防火墙的备份与还原

默认的 iptables 防火墙规则会立刻生效，但如果不保存，当计算机重启后所有的规则都会丢失，所以对防火墙规则进行及时保存的操作是非常必要的。

iptables 软件包提供了两个非常有用的工具，我们可以使用这两个工具处理大量的防火墙规则。这两个工具分别是 iptables-save 和 iptables-restore。

CentOS 7 系统中防火墙规则默认保存在 /etc/sysconfig/iptables 文件中，使用service iptables save 命令将规则保存至该文件中可以实现保存防火墙规则的作用，计算机重启后会自动加载该文件中的规则（需要systemctl enable iptables）。如果使用 iptables-save 将规则保存至其他位置，可以实现备份防火墙规则的作用。当防火墙规则需要做还原操作时，可以使用 iptables-restore 将备份文件直接导入当前防火墙规则。

```
###iptables服务端和客户端的iptables软件版本（centos 7.6）
[root@iZbp16mm3xbwen89azh9ffZ sysconfig]# rpm -qa|grep iptables
iptables-1.4.21-35.el7.x86_64
iptables-services-1.4.21-35.el7.x86_64  
[root@master ~]# rpm -qc iptables-1.4.21-35.el7.x86_64  #命令软件包
/etc/sysconfig/ip6tables-config
/etc/sysconfig/iptables-config
[root@master ~]# rpm -qc iptables-services-1.4.21-35.el7.x86_64   #服务软件包
/etc/sysconfig/ip6tables
/etc/sysconfig/iptables
 
######执行iptables-save 命令：显示出当前启用的所有规则，按照 
raw、mangle、nat、filter 表的顺序依次列出，如下所示： 
[root@iZbp16mm3xbwen89azh9ffZ sysconfig]# iptables-save|tee 1.txt  
##iptables-save可以显示所有表和规则设置，并可以重定向到文件后利用iptables-restore恢复####
# Generated by iptables-save v1.4.21 on Fri Jul 29 14:52:20 2022
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [125:19850]
-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
-A INPUT -p icmp -j ACCEPT
-A INPUT -i lo -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT
-A INPUT -j REJECT --reject-with icmp-host-prohibited
-A FORWARD -j REJECT --reject-with icmp-host-prohibited
COMMIT
# Completed on Fri Jul 29 14:52:20 2022
# Generated by iptables-save v1.4.21 on Fri Jul 29 14:52:20 2022
*nat
:PREROUTING ACCEPT [1:40]
:INPUT ACCEPT [0:0]
:OUTPUT ACCEPT [17:1292]
:POSTROUTING ACCEPT [17:1292]
COMMIT
# Completed on Fri Jul 29 14:52:20 2022
#########################################################################
其中：
“#”号开头的表示注释；
“*filter”表示所在的表；
“：链名默认策略”表示相应的链及默认策略，具体的规则部分省略了命令名“iptables”；
在末尾处“COMMIT”表示提交前面的规则设置。
##########################################################################
 
[root@iZbp16mm3xbwen89azh9ffZ ~]# cat /etc/sysconfig/1.txt ####iptables-save保存的文件
# Generated by iptables-save v1.4.21 on Fri Jul 29 14:53:41 2022
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [230:41650]
-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
-A INPUT -p icmp -j ACCEPT
-A INPUT -i lo -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT
-A INPUT -j REJECT --reject-with icmp-host-prohibited
-A FORWARD -j REJECT --reject-with icmp-host-prohibited
COMMIT
# Completed on Fri Jul 29 14:53:41 2022
# Generated by iptables-save v1.4.21 on Fri Jul 29 14:53:41 2022
*nat
:PREROUTING ACCEPT [1:40]
:INPUT ACCEPT [0:0]
:OUTPUT ACCEPT [25:1900]
:POSTROUTING ACCEPT [25:1900]
COMMIT
# Completed on Fri Jul 29 14:53:41 2022
[root@iZbp16mm3xbwen89azh9ffZ sysconfig]# service iptables save 
####此命令可以将规则配置保存到/etc/sysconfig/iptables文件，以便iptables服务开机自动加载######
iptables: Saving firewall rules to /etc/sysconfig/iptables:[  OK  ]
[root@iZbp16mm3xbwen89azh9ffZ sysconfig]# cat /etc/sysconfig/iptables
# Generated by iptables-save v1.4.21 on Fri Jul 29 14:57:12 2022
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [339:61642]
-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
-A INPUT -p icmp -j ACCEPT
-A INPUT -i lo -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT
-A INPUT -j REJECT --reject-with icmp-host-prohibited
-A FORWARD -j REJECT --reject-with icmp-host-prohibited
COMMIT
# Completed on Fri Jul 29 14:57:12 2022
# Generated by iptables-save v1.4.21 on Fri Jul 29 14:57:12 2022
*nat
:PREROUTING ACCEPT [2:80]
:INPUT ACCEPT [1:40]
:OUTPUT ACCEPT [54:4104]
:POSTROUTING ACCEPT [54:4104]
COMMIT
# Completed on Fri Jul 29 14:57:12 2022
[root@iZbp16mm3xbwen89azh9ffZ ~]# systemctl enable iptables 
###设置iptables服务开机自启动，加载/etc/sysconfig/iptables配置#########
 
 
[root@iZbp16mm3xbwen89azh9ffZ ~]# iptables -F   ###如果规则清空
[root@iZbp16mm3xbwen89azh9ffZ ~]# iptables-restore</etc/sysconfig/1.txt 
#######使用iptables-save重定向的规则配置文件恢复规则###############
[root@iZbp16mm3xbwen89azh9ffZ ~]# iptables -nvL      ###查看是否还原
Chain INPUT (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination         
  299  147K ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0            state RELATED,ESTABLISHED
    6   216 ACCEPT     icmp --  *      *       0.0.0.0/0            0.0.0.0/0           
    0     0 ACCEPT     all  --  lo     *       0.0.0.0/0            0.0.0.0/0           
    0     0 ACCEPT     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            state NEW tcp dpt:22
    8   440 REJECT     all  --  *      *       0.0.0.0/0            0.0.0.0/0            reject-with icmp-host-prohibited
 
Chain FORWARD (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination         
    0     0 REJECT     all  --  *      *       0.0.0.0/0            0.0.0.0/0            reject-with icmp-host-prohibited
 
Chain OUTPUT (policy ACCEPT 327 packets, 52732 bytes)
 pkts bytes target     prot opt in     out     source               destination         
```

## 五、总结
```
Linux防火墙系统

组成 内核态 netilter（保存包过滤处理的规则集）；用户态 iptables（防火墙规则管理工具）
```

```
四表

raw         对数据包进行状态跟踪

mangle   修改数据包内容，给数据包设置标记

nat          地址转换，转换源/目的IP或者端口

fileter       过滤数据包 放行 丢弃
```

```
五链

INPUT                入站

OUTPUT            出站

FORWARD         转发

PREROUTING    路由前修改目的地址

POSTROUTING  路由后修改源IP
```

```
链中的规则集：从上往下一次匹配，匹配到规则即停止，若都没有匹配到则按默认策略处理
```

```
iptables  -t  表  -A 在末尾添加  -j  控制类型

                         -I  在前面插入

                         -D 删除

                          -F 清空

                          -R 改

                          -nL  查

                           -P 设置默认规则
```

```
匹配条件

-p tcp|udp|icmp

-s 源IP

-d 目的IP

-i 入站网卡

-o 出站网卡
```

数据包通信要素 

| 四要素             | 五要素        |
| ------------------ | ------------- |
| 源IP    目的IP     | +协议 UDP/TCP |
| 源端口    目的端口 |               |
|                    |               |

