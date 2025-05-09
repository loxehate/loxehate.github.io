---
title: Linux 基础网卡配置
tags: [网卡配置]
categories: [Linux]
date: 2025-05-09
---
## 一、网卡的三种模式

网卡有三种模式（我们也称其为网络模式），我们可以在【虚拟机设置】——【网络适配器】中配置。

| 模式                    | 作用                                                         |
| ----------------------- | ------------------------------------------------------------ |
| 桥接模式（Bridged）     | 将虚拟机网卡桥接到物理网卡。只要宿主机能通讯到的网络，虚拟机也可以。 |
| 地址转换模式（NAT）     | VM虚拟机的网络服务发挥路由器的作用，虚拟机可以通过物理机访问外网。 |
| 仅主机模式（Host-only） | 构建内网，除宿主机外，只有内网内虚拟机可相互通讯             |

```
补充：网卡可以简单分为物理网卡和虚拟网卡，物理网卡又可以分为有线网卡和无线网卡。VMware开头的网卡就是普遍的虚拟网卡。这个只要简单了解一下就行了。
```

## 二、网卡配置

### 2.1 目录参数

```
etc
/etc目录时Linux系统的配置文件，有相对权限的用户能修改目录，但普通用户都可以访问。

sysconfig
/etc/sysyconfig目录包含了Linux的系统配置文件

network-scripts
network-scripts目录是网卡配置文件夹

ifcfg
ifcfg是一个脚本程序，用于配置网络接口参数的

-e***
ifcfg-e***就是你的网卡了，比如我的网卡就是ifcfg-ens33。
```

### 2.2 网卡参数

代码如下：

```

[root@localhost /]# cat /etc/sysconfig/network-scripts/ifcfg-ens32	#查看网卡信息
（
TYPE=Ethernet	#网卡类型：以太网
PROXY_METHOD=none	#代理方式：关闭
BROWSER_ONLY=no	  #只是浏览器：否
BOOTPROTO=dhcp	#网卡配置方式：dhcp（自动获取ip）
DEFROUTE=yes	#默认路由：开启
IPV4_FAILURE_FATAL=no	#IPV4致命错误检测：不开启
IPV6INIT=yes	#自动初始化IPV6：是
IPV6_AUTOCONF=yes	#自动配置IPV6：是
IPV6_DEFROUTE=yes	#IPV6默认路由：不开启
IPV6_FAILURE_FATAL=no	#IPV6致命错误检测：不开启
IPV6_ADDR_GEN_MODE=stable-privacy	#IPV6生成“stable-privacy”的模型
NAME=ens33	#网卡别名
UUID=7a2ccac9-7a0c-46cb-abd2-fe82ead125bb	#唯一标识码
DEVICE=ens33	#网卡名称
ONBOOT=no	#是否要设置为开机启动
~
~
~
~
~
~
~
~
"/etc/sysconfig/network-scripts/ifcfg-ens32" 15L, 279C	
）
```

```
[root@localhost /]# vi /etc/sysconfig/network-scripts/ifcfg-ens32	#配置网卡信息，以下为重要参数
{
……
BOOTPROTO=static	#将dhcp模式修改为static模式，手动配置网卡信息
……
ONBOOT=yes	#设置网卡为开机自启动
（
此处为添加内容
IPADDR=192.168.10.12	#设置IP地址
NETMASK=255.255.255.0	#设置对应子网掩码
GATEWAY=192.168.10.254	#设置对应网关
DNS1=127.0.0.1	#设置首选DNS
）
}
```

设置对应服务

```
[root@localhost ~]# systemctl restart network	#重启网卡服务
[root@localhost ~]# systemctl stop firewalld	#关闭防火墙
[root@localhost ~]# setenforce 0	#关闭SELinux防火墙
[root@localhost ~]# systemctl status firewalld	#查看防火墙信息
● firewalld.service - firewalld - dynamic firewall daemon
   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; enabled; vendor preset: enabled)	#enable为开机自启动
   Active: inactive (dead) ……	#已关闭

[root@localhost ~]# getenforce	#查看SELinux状态
Permissive	#宽容模式
```

```
补充知识：
1.=后面的参数可以用单引号或双引号，也可以不加引号。对初学者来讲，没什么区别，为了方便，可以不加。
2.NETMASK=255.255.255.0可以用PREFIX=24代替，意义相同。初学者不用在意。
3.初学者必须要知道网络配置的四大重要参数：IP+NETMASK+GATEWAY+DNS。
4.我的网卡中没有“HWADDR”的参数，它表示物理网卡地址（MAC）。
```

```

[root@localhost ~]# ip addr	#显示ip信息
1: lo: ……	#此处为环回接口，常用于测试、本机内通讯
2: ens32: ……	#网卡信息
    link/ether 00:0c:29:ec:a0:29 brd ff:ff:ff:ff:ff:ff	#MAC物理地址信息
    inet 192.168.10.12/24 brd 192.168.10.255 scope global noprefixroute ens32	#IPv4地址信息
       ……
    inet6 fe80::6ecb:e2d5:658c:9228/64 scope link noprefixroute	#IPv6地址信息
       ……
3: ……	#其他网卡


[root@localhost ~]# ip route show	#列出路由表信息
default via 192.168.10.254 dev ens32 proto static metric 100	#网关信息
192.168.10.0/24 dev ens32 proto kernel scope link src 192.168.10.12 metric 100 	#网卡信息
……


[root@localhost ~]# ifconfig	#显示网络设备信息
ens32:  flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.10.12  netmask 255.255.255.0  broadcast 192.168.10.255 	#IPv4信息
        inet6 fe80::6ecb:e2d5:658c:9228  prefixlen 64  scopeid 0x20<link> 	#IPv6信息
        ether 00:0c:29:ec:a0:29  txqueuelen 1000  (Ethernet)	#MAC信息
        ……

lo: ……	#环回口信息


[root@localhost ~]# ping 192.168.10.11		#ping命令测试ip地址
PING 192.168.10.11 (192.168.10.11) 56(84) bytes of data.
64 bytes from 192.168.10.11: icmp_seq=1 ttl=64 time=0.315 ms	#ping包成功
64 bytes from 192.168.10.11: icmp_seq=2 ttl=64 time=0.438 ms
^C
--- 192.168.10.11 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1000ms
rtt min/avg/max/mdev = 0.315/0.376/0.438/0.064 ms

……
```

```
补充知识：
1.以上共四个命令，都可以测试配置网卡，一般测试网卡只用一个就行，也能用cat命令显示网卡配置信息。
2.ip addr可以缩写为ip a；ip route show就是ip route，可以缩写为ip r s或ip r；ifconfig和ping没有缩写。
3.ping命令可以用组合键【Ctrl+c】结束。
```

### 3.3 重启单个网卡

我们用systemctl restart network命令以网卡,但此命令是重启全部网卡服务，不适用于重启单个网卡。Windows系统的重启网卡十分简单：我们在Windows上重启网卡十分简单，找到网卡后右击禁用，再右击启用就行了，其实Linux的重启单个网卡也同Windows一样


首先我们要认识两个命令：ifup与ifdown
ifup即激活网络接口，ifdown就是禁用，组合起来就能做到重启网卡效果

```
[root@localhost network-scripts]# ifdown ens32	#禁用ens32
成功断开设备 "ens32"。
[root@localhost network-scripts]# ifup ens32	#激活ens32
连接已成功激活（D-Bus 活动路径：/org/freedesktop/NetworkManager/ActiveConnection/8）
```

```
其他重启网卡命令：service方式：service restart network，systemctl的方式就是将service与chkconfig 这两个命令组合到一起的命令，我个人就喜欢systemctl命令。
```

## 三、总结

```
步骤总结：
1.虚拟机网络适配器选择模式，虚拟网络编辑器上需要有对应设置。
2.进入网卡配置文件并进行配置，网卡信息需与虚拟网络编辑器上的一致
3.重启网卡以至生效服务
```

## 四、nmcli命令

### 4.1 基础知识

```
在CentOS7 / Redhat7中默认使用 NetworkManager 守护进程来监控和管理网络设置。nmcli是命令行的NetworkManager工具，自动把配置写到/etc/sysconfig/network-scripts/目录下面。

CentOS7 / Redhat7之前的网络管理是通过 ifcfg 文件配置管理接口(device)，而现在是通过NetworkManager服务管理连接(connection)。一个接口(device)可以有多个连接(connection)，但是同时只允许一个连接(connection)处于激活（active）状态。

简单理解就是，一个连接就是(connection)就是/etc/sysconfig/network-scripts/目录下的一个配置文件，接口(device)是物理设备，一个物理设置可以拥有多个配置文件，但只能有一个配置文件属于使用(active)状态；配置文件的生成与使用状态均由NetworkManager控制。
```

### 4.2 nmcli命令详解

**查看接口设备（device）信息**

```
nmcli device status                   # 简单信息
nmcli device show                     # 详细的接口信息
nmcli device show interface-name      #接口的详细信息
```

**查看连接（connection）的信息**

```
nmcli connection show                   # 详细的连接信息
nmcli connection show connection-name   # 某个连接的详细信息
```

**启动和停止接口**

```
nmcli connection down connection-name 
nmcli connection up connection-name 
nmcli device disconnect interface-name 
nmcli device connect interface-name
```

注意：建议使用 nmcli dev disconnect interface-name 命令，而不是 nmcli con down connection-name 命令，因为连接断开可将该接口放到“手动”模式，这样做用户让 NetworkManager 启动某个连接前，或发生外部事件（比如载波变化、休眠或睡眠）前，不会启动任何自动连接。
**创建连接**

```
nmcli connection add type ethernet con-name connection-name ifname interface-name 
nmcli connection add type ethernet con-name connection-name ifname interface-name ip4 address gw4 address
```

注意：创建连接后，NetworkManager 自动将 connection.autoconnect 设定为 yes。还会将设置保存到 /etc/sysconfig/network-scripts/ connection-name 文件中，且自动将 ONBOOT 参数设定为 yes。
**激活连接**

```
nmcli connection up connection-name
```

**修改连接的IP地址**

```
nmcli connection modify "connection-name" ipv4.addresses newip/24
```

**配置连接的DNS**

```
nmcli connection modify static-eth1 ipv4.dns DNS1          # 设定单个DNS
nmcli connection modify static-eth1 ipv4.dns "DNS1 DNS2"   # 设定多个DNS
nmcli connection modify static-eth1 +ipv4.dns DNS3         # 添加某个连接的DNS，需要使用前缀“+”
```

**设置主机名**

```
nmcli general hostname               # 查询当前主机名
nmcli general hostname my-hostname   # 更改主机名
systemctl restart systemd-hostnamed  # 重启hostnamed服务
```

注意：CentOS7 / Redhat7 下的主机名管理是基于系统服务systemd-hostnamed，服务自身提供了hostnamectl命令用于修改主机名，推荐这种方式进行修改；
使用nmcli命令更改主机名时，systemd-hostnamed服务并不知晓 /etc/hostname 文件被修改，因此需要重启服务去读取配置；
**接口绑定**

CentOS7 / Redhat7 下新增了一种特性team，用于取代bond

接口绑定步骤是：创建一个组接口(Team interface), 创建一个接口连接，指定网卡接口(device)到组接口里

```
nmcli connection add type team con-name connection-name ifname interface-name [config JSON]
nmcli connection add type team-slave con-name connection-name ifname interface-name master team-name
```

## 五、uuidgen

```
uuidgen是一个在Unix/Linux环境中使用的小工具，可以生成一个UUID（通用唯一识别码）。使用uuidgen命令可以直接在标准输出中生成一个UUID，也可以通过读取文件/proc/sys/kernel/random/uuid来获取UUID。另外，通过使用dbus-uuidgen命令生成的UUID不包含减号字符，并且每次运行都会生成一个不同的随机字符串
```

```
 uuidgen 网卡名
```

