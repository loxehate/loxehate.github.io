---
title: Linux 网络配置详解
tags: [网络管理]
categories: [Linux]
date: 2025-08-13
---
### 一、网络地址配置

#### 1、网络地址查看

命令格式：ifconfig 或 ifconfig +网卡名

ifconfig [DEVICE] ##查看网络信息

 第一部分的第一行显示网卡状态信息。

```
eth0表示第一块网卡。

UP代表网卡开启状态。

RUNNING代表网卡的网线被接上。

MULTICAST表示支持组播。

第二行显示网卡的网络信息。

inet（IP地址）

broadcast（广播地址）

netmask（掩码地址）

RX表示接收数据包的情况，TX表示发送数据包的情况。

lo表示主机的回环网卡，是一种特殊的网络接口，不与任何实际设备连接，而是完全由软件实现。与回环地址（127.0.0.0/8 或 ::1/128）不同，回环网卡对系统显示为一块硬件。任何发送到该网卡上的数据都将立刻被同一网卡接收到。
```

#### 2、使用网络配置命令

在Linux主机中，手工修改网络配置有两种最基本的方法：

临时配置：使用命令调整网络参数

```
(1) 简单、快速，可直接修改运行中的网络参数
(2) 一般只适合在调试网络的过程中使用
(3) 系统重启以后，所做的修改将会失效
```

固定设置：通过配置文件修改网络参数

```
(1) 修改各项网络参数的配置文件
(2) 适合对服务器设置固定参数时使用
(3) 需要重载网络服务或者重启以后才会生效
(4) 相对而言复杂一点，但相当于“永久配置”
```

**设置网络接口参数-ifconfig**

```
ifconfig DEVICE IP netmask NETMASK    ##设置ip地址

ifconfig eth0 192.168.168.1/24
```

**禁用(临时)或者重新激活网卡**

```
ifconfig 网络接口 up
ifconfig 网络接口 down
```

**设置虚拟网络接口**

在对服务器进行调试的过程中，有时需临时在同一个网卡上使用一个新的IP地址，但又不能覆盖原有IP地址而导致服务程序不可用
相当于在一个网卡上配置多个IP地址

格式（示例)： ifconfig 网络接口:序号 IP地址

```
ifconfig ens33:1 11.11.11.11
```

#### 3、修改网络配置文件

**网络接口配置文件**

网络接口的配置文件默认位于目录“/etc/sysconfig/network-scripts/”中，文件名格式为“ifcfg-XXX”，其中“XXX”是网络接口的名称
**“ifcfg-ens33”：是第一块以太网卡的配置文件**

![](%E5%9B%BE%E7%89%87/%E7%BD%91%E7%BB%9C%E6%8E%A5%E5%8F%A3%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6.png)

- TYPE：设置网卡类型，以上表示为以太网
- ONBOOT:设置网络接口是否在Linux系统启动时自动激活
- NETMASK：设置网络接口的子网掩码
- GATEMASK：设置网络接口的默认网关地址
- DNS：设置DNS服务器的IP地址

重启network网络服务

```
systemctl restart network
```

Ubuntu系统进行网络配置
/etc/network/interfaces
操纵步骤：
打开ubuntu的/etc/network/interfaces文件默认的内容如下：

```
auto lo
iface lo inet loopback
#动态获取的配置方法：
auto eth0
iface eth0 inet dhcp
#静态分配的配置方法：
auto eth0
iface eth0 inet static
address 192.168.0.1
netmask  255.255.255.0
gateway  192.168.0.1
```

#### 4、IP命令详解

ip 是个命令， ip 命令的功能很多！基本上它整合了 ifconfig 与 route 这两个命令，不过 ip 的功能更强大。属于iproute2包的一个命令，功能很强大。

**OPTIONS选项**

```
-V：显示指令版本信息；
-s：-stats, -statistics输出更详细的信息；可以使用多个-s来显示更多的信息
-f：-family {inet, inet6, link} 强制使用指定的协议族；
-4：-family inet的简写，指定使用的网络层协议是IPv4协议；
-6：-family inet6的简写，指定使用的网络层协议是IPv6协议；
-0：shortcut for -family link.
-o：-oneline，输出信息每条记录输出一行，即使内容较多也不换行显示；
-r：-resolve，显示主机时，不使用IP地址，而使用主机的域名。
```

**OBJECT对象**

```
link ：网卡信息
address：IP地址信息
neighbour：邻居表
route：路由表
rule：IP策略
maddress：多播地址
mourte：组播路由缓存条目
tunnel：IP隧道
```

查看网络接口信息：

```
ip addr show ：显示所有网络接口的IP地址和相关信息。
ip link show ：显示所有网络接口的状态信息。
```

配置网络接口：

```
ip addr add [ip/mask] dev [interface] ：为指定网络接口添加IP地址
ip addr change [ip/mask] dev [interface] ：为指定网络接口修改IP地址
ip addr del [ip/mask] dev [interface] ：从指定网络接口删除IP地址
ip link set dev [interface] up/down ：启用或禁用指定的网络接口
```

#### 5、ip link

```
ip link set设备接口属性
```

ip link set dev eth0 promisc on 开启混杂模式
ip link set eth0 up 启用网卡
ip link set eth0 mtu 1500 设置MTU值，即设置最大传输单元
ip link set eth0 name vbird 设置网卡名，需要在网卡down的时候进行设置，意义不是很大
ip link set eth0 address aa:aa:aa:aa:aa:aa 设置MAC地址

### 二、获取和修改主机名hostname

#### 1、查看主机名

如果要查看主机名可以直接执行如下命令：

```
hostname
```

命令的语法如下：

```
hostname [选项] [参数]
```

该命令支持的选项有：

| 选项 | 说明                             |
| ---- | -------------------------------- |
| -a   | 显示主机别名                     |
| -d   | 显示DNS域名                      |
| -f   | 显示FQDN名称                     |
| -i   | 显示主机的ip地址                 |
| -s   | 显示短主机名称，在第一个点处截断 |
| -y   | 显示NIS域名                      |

#### 2、临时修改主机名

所谓的临时修改主机名，就是当前系统有效，重启系统后失效变回原主机名。命令格式如下：

```
# 语法
hostname 新主机名
# 示例，修改新主机名为 centos-7
hostname centos-7
```

#### 3、永久修改主机名

命令修改：

```
systemctl set-hostname 主机名
```

文件修改：

如果是 CentOS 7 及以上（包括 7）的版本，则需要修改 `/etc/hostname` 文件。直接填入新主机名即可。

### 三、Route命令

#### 1、观察路由表信息

```
route [-nee]
-n ：不要使用通讯协定或主机名称，直接使用 IP 或 port number；
-ee ：使用更详细的资讯来显示
```

#### 2、输出详解

![](%E5%9B%BE%E7%89%87/route%E8%AF%A6%E8%A7%A3.png)

route命令输出的路由表字段含义如下：

**Destination** 

```
目标网络或目标主机（本机的数据要发送的目的地：子网或主机），与Genmask组成一个网段
```

**Gateway**

```
网关(如果是默认网关，网关的地址必须和自己的主机上的其中一块网卡在同一子网)即网关地址。如果没有就显示星号。
```

**Genmask**

```
网络掩码，如果目标网络的的子网掩码为255.255.255.255,说明目标是一台主机；如果子网掩码为’0.0.0.0’ 说明该路由是默认路由。
```

**Flags**（旗标）

```
U (route is up)：该路由是启动的；
H (target is a host)：目标是一部主机 (IP) 而非网段；
G (use gateway)：需要透过外部的主机 (gateway) 来转递封包（该行有gw）；
R (reinstate route for dynamic routing)：使用动态路由时，恢复路由资讯的旗标；
D (dynamically installed by daemon or redirect)：已经由服务或转 port 功能设定为动态路由
M (modified from routing daemon or redirect)：路由已经被修改；
! (reject route)：这个路由将不会被接受(用来抵挡不安全的网域！)
A (installed by addrconf)
C (cache entry)
```

**Metric**

```
距离、跳数。暂无用。与目标的“距离”（通常以跳数计算）。它不被最近的内核使用，但可能需要路由守护进程。
```

**Ref **

```
不用管，恒为0, 对这条路线的引用次数(Linux内核已不再使用)。
```

**Use**

```
该路由被使用的次数，可以粗略估计通向指定网络地址的网络流量。 路线查询次数。根据-F和-C的使用，这将是路由高速缓存丢失（-F）或命中（-C）。
```

**Iface**

```
接口，即eth0,eth1等网络接口名，为此路由发送数据包的接口。
```

#### 3、添加路由

```
route add [-net|-host] [网域或主机] netmask [mask] [gw|dev]
route del [-net|-host] [网域或主机] netmask [mask] [gw|dev]
参数：
-net ：表示后面接的路由为一个网域（网段）的路由；
-host ：表示后面接的为连接到单部主机的路由；
netmask ：掩码，决定了网域的大小（配合-net使用，构成一个网段）；
gw ：gateway 的简写，后续接的是 IP （必须和本机的其中一块网卡处于同一网段），与 dev 不同；
dev ：如果只是要指定由哪一块网卡连线出去，则使用这个设定，后面接 eth0了，eth1 等
```

#### 4、删除路由

```
格式：
route del -net {NETWORK-ADDRESS} netmask {NETMASK} reject
```

#### 5、添加、删除默认网关记录

在同一个主机的路由表中只有一条默认网关记录，若同时存在多条默认网关记录，则可能导致该主机的网络连接出现故障。

添加删除默认网关记录时，与添加、删除静态路由记录的命令格式类型，但制定目标网段时，只需简单地使用“ default ”表示即可。

```
添加默认网关 route add default gw xxx.xx.x.xxx
删除默认网关 route del default gw xxx.xxx.x.xxx
```

### 四、netstat命令

#### 1、命令介绍

```
netstat命令用于显示与IP、TCP、UDP和ICMP协议相关的统计数据，一般用于检验本机各端口的网络连接情况。netstat是在内核中访问网络及相关信息的程序，它能提供TCP连接，TCP和UDP监听，进程内存管理的相关报告。
```

#### 2、命令选项

```
-a：查看所有连接
-c：持续列出网络状态
-e：显示网络其他相关信息
-g：显示多重广播功能群组组员名单。
-i：显示网络界面信息表单
-l：显示监控中的服务器的SOCKET
-n：直接打印连接的IP地址与端口信息
-p：显示正在使用SOCKET的程序识别码和程序名称
-r：显示路由信息
-s：显示网络工作信息统计表
-t：显示TCP传输协议的连线状况
-u：显示UDP传输协议的连线状况
-v：显示指令执行过程
-w：显示RAW传输协议的连线状况
-F：显示FIB
-C：显示路由器配置的快取信息
-A：列出该网络类型连线中的相关地址
-N：显示网络硬件外围设备的符号连接名称
-M：显示伪装的网络连线
```

①通常使用“-anpt”组合选项，以数字形式显示当前系统中所有的 TCP 连接信息，同时显示对应的进程信
息
②配合管道符grep过滤出特定的记录

```
netstat -t | wc -l统计系统中的TCP连接数

netstat -tln查看系统中的TCP连接监听地址与端口信息

netstat -tlnp查看系统中的TCP连接监听地址、端口以及进程等信息

netstat -tn | grep -v ESTABLISHED查看系统中的非正常连接
```

### 五、获取socket统计信息-ss

#### 1、语法

ss (选项)

#### 2、选项

```
-h, --help 帮助信息

-V, --version 程序版本信息

-n, --numeric 不解析服务名称

-r, --resolve    解析主机名

-a, --all 显示所有套接字（sockets）

-l, --listening 显示监听状态的套接字（sockets）

-o, --options    显示计时器信息

-e, --extended    显示详细的套接字（sockets）信息

-m, --memory     显示套接字（socket）的内存使用情况

-p, --processes 显示使用套接字（socket）的进程

-i, --info 显示 TCP内部信息

-s, --summary 显示套接字（socket）使用概况

-4, --ipv4      仅显示IPv4的套接字（sockets）

-6, --ipv6      仅显示IPv6的套接字（sockets）

-0, --packet     显示 PACKET 套接字（socket）

-t, --tcp 仅显示 TCP套接字（sockets）

-u, --udp 仅显示 UCP套接字（sockets）

-d, --dccp 仅显示 DCCP套接字（sockets）

-w, --raw 仅显示 RAW套接字（sockets）

-x, --unix 仅显示 Unix套接字（sockets）

-f, --family=FAMILY 显示 FAMILY类型的套接字（sockets），FAMILY可选，支持 unix, inet, inet6, link, netlink

-A, --query=QUERY, --socket=QUERY

   QUERY := {all|inet|tcp|udp|raw|unix|packet|netlink}[,QUERY]

-D, --diag=FILE   将原始TCP套接字（sockets）信息转储到文件

 -F, --filter=FILE  从文件中都去过滤器信息

    FILTER := [ state TCP-STATE ] [ EXPRESSION ]
```

### 六、测试网络连接

#### 1、ping

linux下的ping和windows下的ping稍有区别,linux下ping不会自动终止,需要按ctrl+c终止或者用参数-c指定要求完成的回应次数。

命令格式：

```
ping [参数] [主机名或IP地址]
```

命令功能：

```
ping命令用于：确定网络和各外部主机的状态；跟踪和隔离硬件和软件问题；测试、评估和管理网络。如果主机正在运行并连在网上，它就对回送信号进行响应。每个回送信号请求包含一个网际协议（IP）和 ICMP 头，后面紧跟一个 tim 结构，以及来填写这个信息包的足够的字节。缺省情况是连续发送回送信号请求直到接收到中断信号（Ctrl-C）。

ping 命令每秒发送一个数据报并且为每个接收到的响应打印一行输出。ping 命令计算信号往返时间和(信息)包丢失情况的统计信息，并且在完成之后显示一个简要总结。ping 命令在程序超时或当接收到 SIGINT 信号时结束。Host 参数或者是一个有效的主机名或者是因特网地址。
```

命令参数：

```
-d 使用Socket的SO_DEBUG功能。

-f 极限检测。大量且快速地送网络封包给一台机器，看它的回应。

-n 只输出数值。

-q 不显示任何传送封包的信息，只显示最后的结果。

-r 忽略普通的Routing Table，直接将数据包送到远端主机上。通常是查看本机的网络接口是否有问题。

-R 记录路由过程。

-v 详细显示指令的执行过程。

-c 数目：在发送指定数目的包后停止。

-i 秒数：设定间隔几秒送一个网络封包给一台机器，预设值是一秒送一次。

-I 网络界面：使用指定的网络界面送出数据包。

-l 前置载入：设置在送出要求信息之前，先行发出的数据包。

-p 范本样式：设置填满数据包的范本样式。

-s 字节数：指定发送的数据字节数，预设值是56，加上8字节的ICMP头，一共是64ICMP数据字节。

-t 存活数值：设置存活数值TTL的大小。
```

#### 2、tcpping

```
tcpping [-d] [-c] [-C] [-w sec] [-q num] [-x count] ipaddress [port]
 -d 在每个响应时间前，打印时间戳

 -c 以列表形式显示

 -C 输出类似于fping工具中-C选项的结果

 -w 等待时间（默认 3）

 -r 每N秒重试一次（默认 1）

 -x 限定测试总时长 (默认 无限)
 实例：测试服务器到大陆TCP是否畅通

 在这里，我们要用到百度官网的IP：119.75.217.109 以及他的TCP端口：80
tcpping 119.75.217.109 80
```

#### 3、traceroute命令（路由跟踪）

命令格式

```
traceroute [参数] [主机]
```

命令参数：

```
-d 使⽤Socket层级的排错功能。

-f 设置第⼀个检测数据包的存活数值TTL的大小。

-F 设置勿离断位。

-g 设置来源路由网关,最多可设置8个。

-i 使⽤指定的⽹络界面送出数据包。

-I 使用ICMP回应取代UDP资料信息。

-m 设置检测数据包的最大存活数值TTL的大小。

-n 直接使⽤IP地址而非主机名称。

-p 设置UDP传输协议的通信端⼝。

-r 忽略普通的Routing Table,直接将数据包送到远端主机上。

-s 设置本地主机送出数据包的IP地址。

-t 设置检测数据包的TOS数值。

-v 详细显表示指令的执行过程。

-w 设置等待远端主机回报的时间。

-x 开启或关实例
```

### 七、域名解析-nslookup

DNS英文全称Domain Name System，它是域名系统，在网络中的作用就是维护着一个地址数据库，其中记录了各种主机域名与IP地址的对应关系，以便为客户程序提供正向或反向的地址查询服务，及正向解析与反向解析：

① 正向解析：将指定的域名解析为相应的IP地址

② 反向解析：将指定的IP地址解析为相对应的域名。

```
yum install -y bind-utils
```

nslookup 的查询在不指定参数的情况下，默认查询的类型为A。

```
nslookup internationalsaimoe.com
```

- 最上面的 Server 和 Address 是该词查询的 DNS 服务器。可以自己指定，也可以默认，之后会说到。

#### 1、主服务器配置文件

配置文件：/etc/resolv.conf

```
/etc/resolv.conf 文件记录了本机默认使用的DNS服务器的地址信息，对于该文件所做的修改将会立刻
生效。
Linux系统中最多可以指定3个不同的DNS服务器（超过3个的会被忽略），有限使用第一个DNS服务
器。
resolv.conf文件中的“searh localdomain”行用来设置默认的搜索域（域名后缀），例如：当访问主机
“localhost”时，就相当于访问“localhost.localdomain ”。
```

### 八、本地主机映射

保存主机名与ip地址的映射记录
映射文件路径：/etc/hosts

#### 1、配置映射关系

编辑文件`vim /etc/hosts`，在文件末尾添加映射关系，比如：`192.168.171.72 dsports-asp`

hosts文件和DNS服务器比较

```
默认情况下，系统首先从hosts文件查找解析记录
hosts文件只对当前主机有效
hosts文件可减少DNS查询过程，从加快访问速度
```

### 九、tcpdump

#### 1、作用

```
tcpdump 指令可列出经过指定网络界面的数据包文件头，可以将网络中传送的数据包的 “头” 完全截获下来提供分析。它支持针对网络层、协议、主机、网络或端口的过滤，并提供 and、or、not 等逻辑语句来帮助你摘取有用信息。
```

```
由于它需要将网络接口设置为混杂模式，普通用户不能正常执行，但具备 root 权限的用户可以直接执行它来获取网络上的信息
```

**其他抓包工具**

- wireshark具有图形化和命令行两种版本，可以对 tcpdump 抓的包进行分析，其主要功能就是分析数据包。
- ngrep它将抓到的包数据以文本形式直接显示出来，适用于包数据包含文本的[抓包]分析 (如 HTTP、MySQL)

#### 2、命令选项

```
tcpdump [选项] [协议] [数据流方向] [范围]
```

```
-a 将网络地址和广播地址转变成名字

-A 以 ASCII 格式打印出所有分组，并将链路层的头最小化

-b 数据链路层上选择协议，包括 ip/arp/rarp/ipx 都在这一层

-c 指定收取数据包的次数，即在收到指定数量的数据包后退出 tcpdump

-d 将匹配信息包的代码以人们能够理解的汇编格式输出

-dd 将匹配信息包的代码以 c 语言程序段的格式输出

-ddd 将匹配信息包的代码以十进制的形式输出

-D 打印系统中所有可以监控的网络接口

-e 在输出行打印出数据链路层的头部信息

-f 将外部的 Internet 地址以数字的形式打印出来，即不显示主机名

-F 从指定的文件中读取表达式，忽略其他的表达式

-i 指定监听网络接口

-l 使标准输出变为缓冲形式，可以数据导出到文件

-L 列出网络接口已知的数据链路

-n 不把网络地址转换为名字

-N 不输出主机名中的域名部分，例如 www.baidu.com 只输出 www

-nn 不进行端口名称的转换

-P 不将网络接口设置为混杂模式

-q 快速输出，即只输出较少的协议信息

-r 从指定的文件中读取数据，一般是 - w 保存的文件

-w 将捕获到的信息保存到文件中，且不分析和打印在屏幕

-s 从每个组中读取在开始的 snaplen 个字节，而不是默认的 68 个字节

-S 将 tcp 的序列号以绝对值形式输出，而不是相对值

-T 将监听到的包直接解析为指定的类型的报文，常见的类型有 rpc（远程过程调用）和 snmp（简单网络管理协议）

-t 在输出的每一行不打印时间戳

-tt 在每一行中输出非格式化的时间戳

-ttt 输出本行和前面以后之间的时间差

-tttt 在每一行中输出 data 处理的默认格式的时间戳

-u 输出未解码的 NFS 句柄

-v 输出稍微详细的信息，例如在 ip 包中可以包括 ttl 和服务类型的信息

-vv 输出相信的保报文信息
```

#### 3、tcpdump 表达式

关于数据类型的关键字

包括 host、port、net：

```
host 192.168.100.1 表示一台主机，net 192.168.100.0 表示一个网络网段，port 80 指明端口号为 80，在这里如果没有指明数据类型，那么默认就是 host
```

数据传输方向的关键字

```
包括 src、dst、dst or src、dst and src，这些关键字指明了传输的方向，比如 src 192.168.100.1 说明数据包源地址是 192.168.100.1。dst net 192.168.100.0 指明目的网络地址是 192.168.100.0，默认是监控主机对主机的 src 和 dst，即默认监听本机和目标主机的所有数据
协议关键字
```

```
包括 ip、arp、rarp、udp
```

**其他关键字**

```
运算类型：or、and、not、！

辅助功能型：gateway、less、broadcast、greater
```

#### 4、tcpdump 捕获方式

```
tcpdump [协议类型] [源或目标] [主机名称或 IP] [or/and/not/! 条件组合] [源或目标] [主机名或 IP] [or/and/not/! 条件组合] [端口] [端口号] …… [or/and/not/! 条件组合] [条件]
```

```
> tcpdump  ip dst 192.168.10.1 and src 192.168.10.10 and port 80 and host  !www.baidu.com 
```

**tcpdump**

```
默认监听在第一块网卡，监听所有经过此网卡的数据包
```

![](图片\tcpdump.png)

监听指定网卡 ens33 的所有传输数据包

```
> tcpdump  -i  ens33  
```

捕获主机 192.168.100.10 经过网卡 ens33 的所有数据包（也可以是主机名，但要求可以解析出 IP 地址）

```
> tcpdump -i ens33 host 192.168.100.10  
```

![](图片\tcpdump-ens33.png)

![](图片\tcpdump-ens33-1.png)

```
第一列：报文的时间

第二列：网络协议 IP

第三列：发送方的 ip 地址、端口号、域名，上图显示的是本机的域名，可通过 / etc/hosts 查看本机域名

第四列：箭头 >， 表示数据流向

第五列：接收方的 ip 地址、端口号、域名，

第六列：冒号

第七列：数据包内容，报文头的摘要信息，有 ttl、报文类型、标识值、序列、包的大小等信息
```

捕获主机 192.168.56.209 和主机 192.168.56.210 或 192.168.56.211 的所有通信数据包

```
> tcpdump host 192.168.130.151 and  192.168.130.152 or 192.168.130.153
```

捕获主机 node9 与其他主机之间（不包括 www.baidu.com）通信的 ip 数据包

```
> tcpdump ip host node9 and not www.baidu.com  
```

捕获 node9 与其他所有主机的通信数据包（不包括 www.baidu.com）

```
> tcpdump ip host node9 and ! www.baidu.com  
```

捕获源主机 node10 发送的所有的经过 ens33 网卡的所有数据包

```
> tcpdump -i ens33 src node10  
```

捕获所有发送到主机 www.baidu.com 的数据包

```
> tcpdump -i ens33 dst host www.baidu.com  
```

监听主机 192.168.56.1 和 192.168.56.210 之间 ip 协议的 80 端口的且排除 www.baidu.com 通信的所有数据包：

```
> tcpdump ip dst 192.168.56.1 and src 192.168.56.210 and port 80 and host ! baidu.com  
```

监控指定主机的通信数据包与 1.9.1 方式相同

```
> tcpdump arp  
```

捕获主机 192.168.56.210 接收和发出的 tcp 协议的 ssh 的数据包

```
> tcpdump tcp port 22 and host 192.168.56.210  
```

监听本机 udp 的 53 端口的数据包，udp 是 dns 协议的端口，这也是一个 dns 域名解析的完整过程

```
tcpdump udp port 53
```

捕获来自特定主机并保存到文件

```
tcpdump -i eth0 host 192.168.1.1 -w capture.pcap
```

从文件读取并查看特定主机的流量

```
tcpdump -r capture.pcap host 192.168.1.1
```

#### 5、常用的过滤条件

**tcpdump 可以支持逻辑运算符**

```
and: 与运算，所有的条件都需要满足，可用 “and”和 “&&” 表示
or：或运行，只要有一个条件满足就可以，可用 “or” 和“|”表示
not：取反，即取反条件，可以用 “not” 和“！”表示

#过滤 icmp 报文并且源 IP 是 192.168.100.10
> tcpdump icmp and src 192.168.100.10 -i ens33 -n
```

**多条件格式**

```
在使用多个过滤条件进行组合时，有可能需要用到括号，而括号在 shell 中是特殊符号，又需要使用引号将其包含。用括号的主要作用是逻辑运算符之间存在优先级，!>and > or, 为例条件能够精确所以需要对一些必要的组合括号括起来，而括号的意思相当于加减运算一样，括起来的内容作为一个整体进行逻辑运算


tcpdump -i ens33 '(src 192.168.100.1 and det 192.168.100.10) or arp' -n
```

过滤源 IP 地址是 192.168.10.10 的包

```
> tcpdump **src** host 192.168.10.10 -i ens33 -n -c 5  
```

过滤目的 IP 地址是 192.168.10.10 的包

```
> tcpdump **dst** host 192.168.10.10 -i ens33 -n -c 5  
```

**基于端口进行过滤**

过滤端口号为 22 即 ssh 协议的  

```
> tcpdump port 22 -i ens33 -n -c 5    
```

过滤端口号 22-433 内的数据包

```
>  tcpdump portrange 22-433 -i ens33 -n -c 8  
```

### 十、wireshark

#### 1、什么是 wireshark

```
Wireshark 是一个网络封包分析软件。网络封包分析软件的功能是捕获网络数据包，并尽可能显示出最为详细的网络封包资料。Wireshark 使用 WinPCAP 作为接口，直接与网卡进行数据报文交换
```

#### 2、安装 wireshark

Linux 中有两个版本的 wireshark，一个是 wireshark，这个版本是无图形化界面，基本命令是”tshark“。

一个是 wireshark-gnome（界面版本），这个版本只能安装在支持 GUI 功能的 Linux 的版本中。

```
> yum -y install wireshark // 安装无图形化版本    
> yum -y install wireshark-gnome // 安装图形化版本  
```

#### 3、tshark 命令

```
tshark 是 wireshark 的命令行工具    
     tshark 选项 参数    
    -i：指定捕获的网卡接口，不设置默认第一个非环回口接口    
    -D：显示所有可用的网络接口列表    
    -f：指定条件表达式，与 tcpdump 相同    
    -s：设置每个抓包的大小，默认 65535，多于这个大小的数据将不会不会被截取。    
    -c：捕获指定数量的数据包后退出    
    -w：后接文件名，将抓包的结果输出到. pcap 文件中，可以借助其他网络分析工具进行分              析，也可以使用重定向 > 把解码后的输出结果以 txt 的格式输出。    
    -p：设置网络接口以非混合模式工作，即只关心和本机有关的流量    
    -r：后接文件路径，用于分析保持好的网络包文件，比如 tcpdump 的输出文件    
    -n：禁止所有地址名字解析，即禁止域名解析, 默认是允许所有    
   -N：指定对某一层的地址名字解析，如果 - n 和 - N 同时存在，则 - n 将被忽略，如果两者都不写，则会默认打开所有地址名字解析    
         m：代表数据链路层    
         n：代表网络层    
         t：代表传输层    
    -V：设置将解码结果的细节输出，否则解码结果仅显示一个 packet 一行的 summary    
    -t：设置结果的时间格式    
         ad：表示带日期的绝对时间    
         a：表示不带日期的绝对时间    
         r：表示从第一个包到现在的相对时间    
         d：表示两个相邻包之间的增量时间  
```

过滤 icmp 报文，并展开详细信息

```
tshark -f "icmp" -i ens33 -V -c 1
```

过滤 arp 报文

```
tshark -f "arp" -i ens33  
```

### 十一、 ngrep

#### 1、命令概述

```
ngrep（Network Grep）是一个强大的命令行工具，它允许用户监视网络上的数据包，并且可以像使用普通的grep一样搜索特定模式。

ngrep基于grep的灵活性和强大的正则表达式支持，结合了tcpdump的网络数据包捕获功能，使得它在网络调试和流量分析方面非常有用。
```

#### 2、命令特点

ngrep的主要特点包括如下几项。

```
1. 基于正则表达式的搜索和过滤
ngrep允许用户使用正则表达式来过滤捕获的数据包，这使得它非常适合于搜索特定的信息或协议消息。

2. 人性化的信息输出
ngrep将匹配到的数据包内容以一种易于阅读的格式显示出来，而不是仅仅展示二进制数据。

3. 多协议解析
ngrep可以解析多种协议，如HTTP、FTP、SSH等，并显示协议特定的信息。

4. 网络接口可选择
用户可以指定要监听的网络接口，或者使用any来监听所有接口。

5. 端口过滤
可以通过指定端口号来过滤特定的网络流量。

6. 保存和重新播放数据包
ngrep支持将捕获的数据包保存到文件中，并在需要时重新播放。
```

#### 3、安装ngrep的命令

```
#在centos上安装
yum -y install ngrep

#基于Debian的系统上
apt-get install ngrep -y
```

#### 4、语法

**基本语法**

ngrep的基本命令结构如下：

```
 ngrep [options] expression interface
```

 其中options是一系列可选的参数，expression是要匹配的正则表达式，interface是要监听的网络接口。

**常用选项**

```
 -i：忽略大小写。

-v：反转匹配，即只显示不匹配的行。

-l：使输出为行缓冲，而不是默认的块缓冲。这有助于实时查看结果。

-L：显示匹配的数据包长度。

-n：不显示主机名，只显示IP地址和端口号。

-q：静默模式，不显示任何信息，只显示匹配的数据包。

-c：只显示匹配的数据包数量，不显示具体的数据包内容。

-o：只显示匹配的部分内容。

-x：以十六进制和ASCII格式显示数据包内容。

-X：以十六进制格式显示数据包内容。

-p：指定协议，如 TCP、UDP 等。

-d：指定要使用的网络接口。但通常与 tcpdump 结合使用时，这个选项由 tcpdump 控制。

-f：指定要使用的过滤表达式文件，类似于 tcpdump 的过滤规则。
```

#### 5、示例

**监听80端口的HTTP请求**

```
ngrep -q '^GET' 'tcp port 808'
```

**监听并显示SSH协议的数据包**

```
ngrep -q '^[A-Z]+' 'tcp port 22'
```

**监听并显示所有经过 eth0 接口的IP数据包**

```
ngrep -q 'ip' 'eth0'
```

**监听并显示匹配特定正则表达式的数据包，同时保存到文件中**

```
ngrep -q '^GET' 'tcp port 80' -w file.txt
```

**重放之前保存的数据包**

```
ngrep -r file.txt
```

#### 6、与 tcpdump 结合使用

 ngrep 主要不是直接处理文件，而是与网络流量交互。因此，常见的用法是与 tcpdump 结合，命令模板如下：

```
tcpdump -i eth0 -l -n | ngrep "some pattern"
```

这个命令将捕获 eth0 接口上的所有网络数据包，并通过 ngrep 搜索包含 "some pattern" 的数据包。

**搜索包含 "GET " 的 HTTP 请求**

```
tcpdump -i eth0 -l -n port 6088 | ngrep "GET"
```

**显示匹配的数据包数量**

```
tcpdump -i eth0 -l -n port 80 | ngrep -c "GET /index.html"
```

**显示匹配数据包的十六进制内容**

```
tcpdump -i eth0 -l -n port 80 | ngrep -x "GET /index.html"
```

