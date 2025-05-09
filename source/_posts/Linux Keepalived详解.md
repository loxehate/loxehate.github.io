---
title: Linux Keepalived详解
tags: [Keepalived]
categories: [Linux]
date: 2025-05-09
---
### 一、**初识Keepalived**

```
Keepalived是Linux下一个轻量级别的高可用解决方案，通过虚拟路由冗余协议来实现服务或者网络的高可用

起初是为LVS设计的，专门用来监控集群系统中各个服务节点的状态

如果某个服务器节点出现故障，Keepalived将检测到后自动将节点从集群系统中剔除

而在故障节点恢复正常后，Keepalived又可以自动将此节点重新加入集群中

这些工作自动完成，不需要人工干预，需要人工完成的只是修复出现故障的节点
```

**特点：**

```
1、部署简单，只需要配置一个配置文件即可

2、加入了虚拟路由冗余协议，可以保证业务或网络不间断稳定运行
```

**核心功能：**

1、健康检查

```
采用tcp三次握手，icmp请求，http请求，udp 、
echo请求等方式对负载均衡器后面的实际的服务器(通常是承载真实业务的服务器)进行保活
```

2、故障切换

```
主要应用在配置了主备的服务器上，使用虚拟路由冗余协议维持主备之间的心跳
当主服务器出现问题时，由备服务器承载对应的业务，从而在最大限度上减少损失，并提供服务的稳定性
```

#### 1、VRRP协议

```
在现实的网络环境中，主机之间的通信都是通过配置静态路由（默认网关）来完成的

而主机之间的路由器一旦出现故障，就会通信失败

因此在这种通信模式下，路由器就会有单点瓶颈问题，为了解决这个问题，引入了VRRP 协议（虚拟路由冗余协议）

通过VRRP可以在网络发生故障时透明的进行设备切换而不影响主机之间的数据通信
```

VRRP可以将两台或多台物理路由器设备虚拟成一个虚拟路由器，这个虚拟路由器通过虚拟IP（一个或多个）对外提供服务，而在虚拟路由器内部是多个物理路由器协同工作，VRRP角色如下：

1、角色

```
虚拟路由器：VRRP组中所有的路由器，拥有虚拟的IP+MAC(00-00-5e-00-01-VRID)地址

主路由器（master）：虚拟路由器内部通常只有一台物理路由器对外提供服务，主路由器是由选举算法产生，对外提供各种网络功能

备份路由器（backup）：VRRP组中除主路由器之外的所有路由器，不对外提供任何服务，只接受主路由的通告，当主路由器挂掉之后，重新进行选举算法接替master路由器
```

master路由器由选举算法产生，它拥有对外服务的VIP，提供各种网络服务，如ARP请求、数据转发、ICMP等等，而backup路由器不拥有VIP，也不对外提供网络服务

当master发生故障时，backup将重新进行选举，产生一个新的master继续对外提供服务

![](图片\VRRP协议.png)

2、VRRP工作模式

VRRP有三种工作状态，分别是：

```
Initialize状态
Master状态
Backup状态
```

选举机制:

```
优先级
抢占模式下，一旦有优先级高的路由器加入，立即成为Master
非抢占模式下，只要Master不挂掉，优先级高的路由器只能等待
```

### 二、**Keepalived原理**

keepalived工作在TCP/IP参考模型的第三、四和第五层，也就是网络层、传输层个和应用层

```
网络层：通过ICMP协议向集群每个节点发送一个ICMP数据包（类似于ping功能），如果某个节点没有返回响应数据包，那么认定此节点发生了故障，Keepalived将报告此节点失效，并从集群中剔除故障节点

传输层：通过TCP协议的端口连接和扫描技术来判断集群节点是否正常，keepalived一旦在传输层探测到这些端口没有响应数据返回，就认为这些端口所对应的节点发生故障，从集群中剔除故障节点

应用层：用户可以通过编写程序脚本来运行keepalived，keepalived根据脚本来检测各种程序或者服务是否正常，如果检测到有故障，则把对应的服务从服务器中删除
```

#### **1、组件架构**

![](图片\Keepalived-组件原理.png)

我们将整个体系结构分层**用户层**和**内核层**

- Scheduler I/O Multiplexer

```
I/O复用分发调用器，负责安排Keepalived所有的内部的任务请求
```

- Memory Management

```
内存管理机制，提供了访问内存的一下通用方法Keepalived
```

- Control Plane

```
控制面板，实现对配置文件的编译和解析，Keepalived的配置文件解析比较特殊，它并不是一次解析所有模块的配置，而是只有在用到某模块时才解析相应的配置
```

- Core components

```
Keepalived的核心组件，包含了一系列功能模块，主要有watch dog、Checkers、VRRP Stack、IPVS wrapper、Netlink Reflector
```

```
 watch dog：
一个极为简单又非常有效的检测工具，针对被监视目标设置一个计数器和阈值，
watch dog会自己增加此计数值，然后等待被监视目标周期性的重置该数值，
一旦被监控目标发生错误，就无法重置该数值，
watch dog就会检测到。Keepalived是通过它来监控Checkers和VRRP进程
 
 
Checkers：
实现对服务器运行状态检测和故障隔离
 
 
VRRP Stack：
实现HA集群中失败切换功能，通过VRRP功能再结合LVS负载均衡软件即可部署一个高性能的负载均衡集群
 
 
IPVS wrapper：
实现IPVS功能，该模块可以将设置好的IPVS规则发送到内核空间并提交给IPVS模块，最终实现负载均衡功能
 
 
Netlink Reflector
实现VIP的设置和切换
```

### 三、安装

#### 1、安装前配置环境

```
同步个节点时间
配置iptables及selinux
各节点之间可通过主机名ping通（非必须）
确保各节点用于服务的网卡支持多播通信
```

#### 2、安装

从CentOS 6.4之后，keepalived就被收录进base仓库中，可直接使用yum安装
`yum install -y keepalived`

### 四、相关文件

```
主配置文件：/etc/keepalived/keepalived.conf

/usr/bin/genhash

核心程序：/usr/sbin/keepalived

Unit file：/usr/lib/systemd/system/keepalived.service
```

### 五、指令意义

其配置文件为`/etc/keepalived/keepalived.conf`，主要分为三个配置段：全局配置段（GLOBAL CONFIGURATION）、VRRPD CONFIGURATION、LVS CONFIGURATION。

#### 1、全局配置段

```
global_defs {

    notification_email：指明出错时给谁发邮件
    
	notification_email_from：指明发送邮件时的发件人
	
	smtp_server：指明从那个邮件服务器发出
	
	smtp_connect_timeout：连接邮件服务器的超时时长
	
	router_id：当前物理设备的唯一标示
	
	trank_interface：定义跟踪的网卡，用{}配置段定义，里面写网卡名；
	nopreempt：定义为非抢占模式
	
	preempt_delay  N ：抢占模式下，节点出发新选举操作的延时时长。
	vrrp_mcast_group4：vrrp协议发送心跳的组播网段
	
	vrrp_skip_check_adv_addr：用于跳过对广告包中地址的检查
	vrrp_strict：启用严格的VRRP检查模式
	vrrp_garp_interval：GARP（Gratuitous ARP）消息发送的间隔时间 s
	vrrp_gna_interval：GNA（Gratuitous NA, 即自愿的邻居通告）消息发送的间隔时间 s
}
```

#### 2、vrrp配置段

```
vrrp_instance NAME { ：给出实例名称，要唯一

	state MASTER|BUCKUP：自己的初始状态，只有两个master和backup
	
	interface eth0：要把虚拟地址配置在哪个网卡上
	
	virtual_router_id 51：虚拟路由的标识符，0-255
	
	priority 100：定义优先级，0-255
	
	advert_int 1：心跳信息发送的频率，单位为秒钟
	
	authentication {  PASS为简单密码认证，可使用openssl rand -hex 4生成随机子串
	    auth_type PASS
	    auth_pass 1111
	}
	virtual_ipaddress {
	    标准格式：<IPADDR>/<MASK> brd <IPADDR> dev <STRING> scope <SCOPE>
	    简单示例：192.168.2.100/24 brd 192.168.2.0 dev ens32
    }
```

#### 3、lvs配置段

```
virtual_server <IP> <PORT> {

    delay_loop #：健康状态检测多少次判定为失败

    lb_algo rr|wrr|lc|wlc|lblc|sh|dh：调度方法

    lb_kind NAT|DR|TUN：调度类型

    persistence_timeout # ：持久链接时长

    ha_suspend：如果没有定义VIP的话，那么健康状态检测也停止

    virtualhost <string>：定义虚拟主机

    sorry_server <IPADDR> <PORT>：定义sorry server

    real_server <IPADDR> <PORT>  {   定义real server

        weight：权重

        HTTP_GET | TCP_CHECK {  定义使用http协议做健康状态检测
            url {
                path <string>：指明路径

                digest <string>：通过校验码验证
            
                status_code <int>：通过状态结果获取
             }   
            
            nb_get_retry <int>：如果链接超时重试几次

            deleay_before_retry <int>
        
            connect_ip：指明需要检查的IP地址
        
            connect_port：指明需要链接的端口
        
            bindto <IP>：指明通过本机的哪个接口发出检测
       
            connect_timeout：超时时间
         }
    }
}
```

#### 4、vrrp_script配置段

```
示例1：监控服务是否正常运行

vrrp_script NAME {  ：为脚本起一个名字
    
    script "killall -0 nginx"  ：killall -0不会真正的杀死进程，如果返回成功则表示这个进程正常运行中
    
    interval 2     ：每隔2秒检测1次
    
    weight -4      ：如果脚本检查失败了，其权重减4
    
    fall 2         ：需要检查2次才判定为失败
    
    rise 2         ：检测2次成功才判定为成功
    
    user USER      ：使用哪个用户运行这个脚本
}
```

```
示例2：手动调度主节点

vrrp_script chk_down {
    script "/bin/bash -c '[[ -e /etc/keepalived/down ]]' && exit 1 || exit 0"
    interval 2
    weight -30
    fall 2
    rise 2
    user root
}
```

### 六、配置示例

#### 1、高可用LVS

实验环境：两台RS作为后端的web，两台服务器作为调度器，并在调度器中启用keepalived实现高可用，关于IPVS的相关内容可以[点击这里](https://busyops.com/posts/3971c297/)

```
RIP1：192.168.60.100    RIP2：192.168.60.110

DIP1：192.168.60.120    DIP2：192.168.60.130

VIP：192.168.60.200
```

![](图片\keepalived-LVS.png)

- 第一步：手动创建IPVS集群，使得DR模型实现

```
1. 调度器安装ipvsadm工具，配置VIP地址，使得各节点可以ping通VIP地址
 
   ~]# yum install ipvsadm -y
   ~]# ip addr add 192.168.60.200 dev ens32

2. 在两台RS中安装httpd并启动，使用不同的测试网页供后续测试

3. 两台RS中加入ARP响应参数，并添加VIP地址，这里使用一个脚本完成

#!/bin/bash
vip=192.168.60.200

case $1 in

start)

    echo 1 > /proc/sys/net/ipv4/conf/all/arp_ignore
    echo 1 > /proc/sys/net/ipv4/conf/lo/arp_ignore
    echo 1 > /proc/sys/net/ipv4/conf/ens32/arp_ignore
    echo 2 > /proc/sys/net/ipv4/conf/all/arp_announce
    echo 2 > /proc/sys/net/ipv4/conf/lo/arp_announce
    echo 2 > /proc/sys/net/ipv4/conf/ens32/arp_announce

    ip addr add ${vip}/32 broadcast $vip dev lo label lo:0
    ip route add $vip dev lo:0
    ;;

stop)

    ip addr del $vip dev lo label lo:0
    ip route del $vip dev lo:0
    echo 0 > /proc/sys/net/ipv4/conf/ens32/arp_announce
    echo 0 > /proc/sys/net/ipv4/conf/ens32/arp_ignore
    echo 0 > /proc/sys/net/ipv4/conf/all/arp_ignore
    echo 0 > /proc/sys/net/ipv4/conf/all/arp_announce
    echo 0 > /proc/sys/net/ipv4/conf/lo/arp_announce
    echo 0 > /proc/sys/net/ipv4/conf/lo/arp_ignore
    ;;

esac

4. 在调度器中加入IPVS规则，测试IPVS集群

~]# ipvsadm -A -t 192.168.60.200:80 -s wrr
~]# ipvsadm -a -t 192.168.60.200:80 -r 192.168.60.100 -g -w 1
~]# ipvsadm -a -t 192.168.60.200:80 -r 192.168.60.110 -g -w 2

~]# ipvsadm -L -n
IP Virtual Server version 1.2.1 (size=4096)
Prot LocalAddress:Port Scheduler Flags
  -> RemoteAddress:Port           Forward Weight ActiveConn InActConn
TCP  192.168.60.200:80 wrr
  -> 192.168.60.100:80            Route   1      0          0         
  -> 192.168.60.110:80            Route   2      0          0

5. 测试成功后，将调度器的ipvs规则清空、VIP地址删除，第一步中手动实现IPVS集群创建只是为了测试后端RS可以有效的被调度    
```

- 第二步：两台调度器中安装keepalived服务、httpd服务，并编辑配置文件

```
! Configuration File for keepalived

global_defs {
   notification_email {
     busyops@outlook.com
   }
   notification_email_from Alexandre.Cassen@firewall.loc
   smtp_server 127.0.0.1
   smtp_connect_timeout 30
   router_id LVS_DEVEL
   vrrp_skip_check_adv_addr
   vrrp_garp_interval 0
   vrrp_gna_interval 0
}

vrrp_instance VI_1 {
    state MASTER
    interface ens32
    virtual_router_id 51
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.60.200
    }
}

virtual_server 192.168.60.200 80 {
    delay_loop 6
    lb_algo wrr
    lb_kind DR
    persistence_timeout 0
    protocol TCP

    sorry_server 127.0.0.1 80

    real_server 192.168.60.100 80 {
        weight 1
        HTTP_GET {
            url {
                path /
                status_code 200
            }
            connect_timeout 3
            nb_get_retry 3
            delay_before_retry 3
        }
    }

    real_server 192.168.60.110 80 {
        weight 2
        HTTP_GET {
            url {
                path /
                status_code 200
            }
            connect_timeout 3
            nb_get_retry 3
            delay_before_retry 3
        }
    }
}

---------------------------------------------------------
需要注意，此配置文件为主节点的配置文件，从节点需要将角色改为BACKUP，优先级也需要降低
```

- 第三步：停止不同的RS查看健康状态检测情况，停止不同的调度器查看VIP和服务是否可以正常访问，停止全部的RS查看sorry_server是否正常上线

#### 2、**Nginx+Keepalived案例**

![](图片\Nginx-Keepalived案例.png)

安装完 Nginx 之后配置 web 站点

```
#web1
[root@nginx1 ~]# vim /etc/nginx/conf.d/web.conf 
server{
        listen 8080;
        root         /usr/share/nginx/html;
        index test.html;
}
 
 
[root@nginx1 ~]# echo "<h1>This is web1</h1>"  > /usr/share/nginx/html/test.html
```

```
#web2
[root@nginx2 ~]# vim /etc/nginx/conf.d/web.conf 
server{
        listen 8080;
        root         /usr/share/nginx/html;
        index test.html;
}
 
 
[root@nginx2 ~]# echo "<h1>This is web2</h1>"  > /usr/share/nginx/html/test.html
```

配置Keepalived（不同角色有些选项不一样）

**web1:master**

```
! Configuration File for keepalived

global_defs {
   notification_email {
     1245795432@qq.com
   }
   notification_email_from loxehate@20
   smtp_server 192.168.10.20
   smtp_connect_timeout 30
   router_id nginx_20
}

vrrp_script check_nginx {
    script "/etc/keepalived/check_nginx.sh"
    interval 2
    weight -5
    fall 2
    rise 1
}

vrrp_instance VI_1 {
    state MASTER
    interface ens33
    virtual_router_id 51
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass ceb1b3ec013d66163d6ab
    }
    virtual_ipaddress {
        192.168.10.200
    }

    track_script {
        check_nginx
    }

    notify_master "/etc/keepalived/notify.sh master"
    notify_backup "/etc/keepalived/notify.sh backup"
    notify_fault "/etc/keepalived/notify.sh fault"
}
```

**web2:backup**

```
! Configuration File for keepalived

global_defs {
   notification_email {
     1245795432@qq.com
   }
   notification_email_from loxehate@21
   smtp_server 192.168.10.21
   smtp_connect_timeout 30
   router_id nginx_21
}

vrrp_script check_nginx {
    script "/etc/keepalived/check_nginx.sh"
    interval 2
    weight -5
    fall 2
    rise 1
}

vrrp_instance VI_1 {
    state BACKUP
    interface ens33
    virtual_router_id 51
    priority 80
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass ceb1b3ec013d66163d6ab
    }
    virtual_ipaddress {
        192.168.10.200
    }

    track_script {
        check_nginx
    }
    
    notify_master "/etc/keepalived/notify.sh master"
    notify_backup "/etc/keepalived/notify.sh backup"
    notify_fault "/etc/keepalived/notify.sh fault"
}
```

注：master节点的priority一定要高于backup节点,vrrp_script组件需要在vrrp_instance之前，否则无法调用check_nginx脚本

**编写check_nginx.sh脚本** 

```
#!/bin/bash
counter=$(ps -C nginx --no-heading|wc -l)
if [ "${counter}" = "0" ]; then
    systemctl start nginx
    sleep 2
    counter=$(ps -C nginx --no-heading|wc -l)
    if [ "${counter}" = "0" ]; then
        systemctl stop keepalived
    fi
fi
```

**编写notify邮件通知脚本**

需要配置先服务器邮箱服务，Rocy Linux9如下配置s-nail.rc

```
set v15-compat
set from=1245795432@qq.com 
set mta=smtp://1245795432%40qq.com:tlmfruyuocoshaie@smtp.qq.com smtp-use-starttls
set smtp-auth=login
```

```
#!/bin/bash

contact='1245795432@qq.com'
notify() {
mailsubject="$(hostname) to be $1, vip floating"
mailbody="$(date +'%F %T'): vrrp transition, $(hostname) changed to be $1"
echo "$mailbody" | mail -s "$mailsubject" $contact
}
case $1 in
master)
notify master
;;
backup)
notify backup
;;
fault)
notify fault
;;
*)
echo "Usage: $(basename $0) {master|backup|fault}"
exit 1
;;
esac
```

**授予脚本权限**

```
chmod +x /etc/keepalived/*.sh
```

**启动keepalived服务**

```
systemctl start keepalived
```

**验证**

现在web1（192.168.10.20）是master

访问192.168.10.200:8080

![](图片\keepalived-验证1.png)

停止web1的nginx

再次访问192.168.10.200:8080

![](图片\keepalived-验证2.png)

#### 3、双主模型高可用nginx

![](图片\keepalived-双主模型.png)

实验环境：两台RS作为后端的web，两台Nginx分别同时代理后端的两台RS，用户可以通过任意节点访问后端的web

```
RS1：192.168.60.100    RS2：192.168.60.110

Nginx1：192.168.60.120  VIP1：192.168.60.210

Nginx2：192.168.60.130  VIP2：192.168.60.220
```

- 第一步：在两台RS中安装httpd，提供不同的网页文件以便测试
- 第二步：两台Nginx服务器通过upstream将后端的web加入调度，更多Nginx相关配置可以[点击这里](https://busyops.com/posts/aab536c8/#more)

```
1. 直接使用官方yum源进行安装

[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

2. 启用upstream配置

http {
    ...
    upstream web {
        server 192.168.60.100 weight=1;
        server 192.168.60.110 weight=2;
    }
    
    server {
        location / {
            proxy_pass http://web;
        }
    }
    ...
}
```

- 第三步：两台Nginx主机安装Keepalived并配置双主模型，通过手动停止Nginx服务，测试切换情况

```
Nginx1的keepalived配置

! Configuration File for keepalived

global_defs {
   notification_email {
        busyops@outlook.com
   }
   notification_email_from Alexandre.Cassen@firewall.loc
   smtp_server 127.0.0.1
   smtp_connect_timeout 30
   router_id LVS_DEVEL1
   vrrp_skip_check_adv_addr
   vrrp_strict
   vrrp_garp_interval 0
   vrrp_gna_interval 0
}

vrrp_script chk_down {
    script "/bin/bash -c '[[ -e /etc/keepalived/down ]]' && exit 1 || exit 0"
    interval 2
    weight -20
    fall 2
    rise 2
}

vrrp_script chk_nginx {
    script "/usr/bin/killall -0 nginx"
    interval 2
    weight -20
    fall 2
    rise 2
    user root
}
    
vrrp_instance VI_1 {
    state MASTER
    interface ens32
    virtual_router_id 151
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.60.210/24 brd 192.168.60.255 dev ens32 label ens32:0
    }
    track_script {
        chk_down
        chk_nginx
    }
}

vrrp_instance VI_2 {
    state BACKUP
    interface ens32
    virtual_router_id 52
    priority 90
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 2222
    }
    virtual_ipaddress {
        192.168.60.220/24 brd 192.168.60.255 dev ens32 label ens32:1
    }
}
```

```
Nginx2的keepalived配置

! Configuration File for keepalived

global_defs {
   notification_email {
        busyops@outlook.com
   }
   notification_email_from Alexandre.Cassen@firewall.loc
   smtp_server 127.0.0.1
   smtp_connect_timeout 30
   router_id LVS_DEVEL2
   vrrp_skip_check_adv_addr
   vrrp_strict
   vrrp_garp_interval 0
   vrrp_gna_interval 0
}

vrrp_script chk_down {
    script "/bin/bash -c '[[ -e /etc/keepalived/down ]]' && exit 1 || exit 0"
    interval 2
    weight -20
    fall 2
    rise 2
}

vrrp_script chk_nginx {
    script "/usr/bin/killall -0 nginx"
    interval 2
    weight -20
    fall 2
    rise 2
    user root
}
    
vrrp_instance VI_1 {
    state BACKUP
    interface ens32
    virtual_router_id 151
    priority 90
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.60.210/24 brd 192.168.60.255 dev ens32 label ens32:0
    }
}

vrrp_instance VI_2 {
    state MASTER
    interface ens32
    virtual_router_id 52
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 2222
    }
    track_script {
        chk_down
        chk_nginx
    }
    virtual_ipaddress {
        192.168.60.220/24 brd 192.168.60.255 dev ens32 label ens32:1
    }
}
```

### 七、遇到的问题

#### 1、使用down文件切换主节点

老版本的Keepalived中，vrrp_script配置段添加切换节点配置如下

```
vrrp_script chk_down {
    script "[[ -e /etc/keepalived/down ]] && exit 1 || exit 0"
    interval 2
    weight -20
    fall 2
    rise 2
}
```

但是在新版本中（我的是1.3.5），如果继续使用此配置，会发现日志中报错`Unable to access script [[`，将其改为如下即可，日志会提示`VRRP_Script(chk_down) succeeded`

```
vrrp_script chk_down {
    script "/bin/bash -c '[[ -e /etc/keepalived/down ]]' && exit 1 || exit 0"
    interval 2
    weight -20
    fall 2
    rise 2
}
```

#### 2、keepalived_script用户

如果没有创建keepalived_script用户，日志中会出现WARNING - default user 'keepalived_script' for script execution does not exist - please create.但vrrp_script配置段的down配置并没有影响，暂时不清楚这个用户到底会导致什么问题

#### 3、killall探测无效

如果日志中出现Cannot find script killall in path，安装killall命令即可，其安装包为psmisc.x86_64

安装完psmisc.x86_64依然发现报错WARNING - script `killall` resolved by path search to `/usr/bin/killall`. Please specify full path.，于是我将配置段改为了如下

    vrrp_script chk_nginx {
        script "/usr/bin/killall -0 nginx"
        interval 2
        weight -20
        fall 2
        rise 2
    }

发现一个节点可以实现killall命令探测健康状态，一个节点不可以，于是又加了一行user配置，所以保险起见还是全加上

```
vrrp_script chk_nginx {
    script "/usr/bin/killall -0 nginx"
    interval 2
    weight -20
    fall 2
    rise 2
    user root
}
```

#### 4、无法解释的玄学问题

```
虚拟路由ID冲突问题：在做双主实验的过程中，有一个虚拟路由的主节点VIP怎么都上不来，发现日志报错ip address associated with VRID 51 not present in MASTER advert :网上的说法是虚拟路由ID冲突，但是我家里面谁能跟我冲突呢，太TM玄学了

不知道什么问题：两个节点配置完成后，通过VIP无论如何都无法访问后端的RS，用Nginx去访问RS和用物理机直接访问RS都是没问题的。于是我尝试将VIP换了一个地址，就很意外的可以访问了

双主模型配置完成后，一台Keepalived怎么都运行不起来，日志报错Can‘t open PID file /run/keepalived.pid (yet?) after start: No such file or directory，于是我一气之下恢复快照，所有配置文件（nginx+keepalived）全都复制的另一台keepalived的，然后就又能运行了。。。。
```

