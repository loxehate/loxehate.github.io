---
title: K8S-网络通信
tags: [kubernetes]
categories: [云原生]
date: 2025-11-18
---

## 一、k8s网络通信

1、k8s通过CNI接口接入其他插件来实现网络通讯。目前比较流行的插件有flannel，calico等。

```
CNI插件存放位置： cat /etc/cni/net.d/10-flannel.conflist

插件使用的解决方案如下：
虚拟网桥，虚拟网卡，多个容器共用一个虚拟网卡进行通信。
多路复用：MacVLAN，多个容器共用一个物理网卡进行通信。
硬件交换：SR-LOV，一个物理网卡可以虚拟出多个接口，这个性能最好。
```

2、容器间通信：同一个pod内的多个容器间的通信，通过lo即可实现；

```
pod之间的通信：
同一节点的pod之间通过cni网桥转发数据包。
不同节点的pod之间的通信需要网络插件支持。
```

3、pod和service通信: 通过iptables或ipvs实现通信，ipvs取代不了iptables，因为ipvs只能做负载均衡，而做不了nat转换。

```
pod和外网通信：iptables的MASQUERADE。

Service与集群外部客户端的通信；（ingress、nodeport、loadbalancer）
```

## 二、flannel网络

### 1.flannel简介

```
1、Flannel是CoreOS团队针对Kubernetes设计的一个网络规划服务，简单来说，它的功能是让集群中的不同节点主机创建的Docker容器都具有全集群唯一的虚拟IP地址。
2、在默认的Docker配置中，每个节点上的Docker服务会分别负责所在节点容器的IP分配。这样导致的一个问题是，不同节点上容器可能获得相同的内外IP地址。并使这些容器之间能够之间通过IP地址相互找到，也就是相互ping通。
3、Flannel的设计目的就是为集群中的所有节点重新规划IP地址的使用规则，从而使得不同节点上的容器能够获得“同属一个内网”且”不重复的”IP地址，并让属于不同节点上的容器能够直接通过内网IP通信。
```

### 2.flannel组件

```
VXLAN 即Virtual Extensible LAN（虚拟可扩展局域网），是Linux本身支持的一网种网络虚拟化技术。
VXLAN可以完全在内核态实现封装和解封装工作，从而通过“隧道”机制，构建出覆盖网络（Overlay Network）

VTEP：VXLAN Tunnel End Point（虚拟隧道端点），在Flannel中 VNI的默认值是1，这也是为什么宿主机的VTEP设备都叫flannel.1的原因。

Cni0: 网桥设备，每创建一个pod都会创建一对 veth pair。
其中一端是pod中的eth0，另一端是Cni0网桥中的端口（网卡）。

Flannel.1: TUN设备(虚拟网卡)，用来进行 vxlan 报文的处理（封包和解包）。
不同node之间的pod数据流量都从overlay设备以隧道的形式发送到对端。

Flanneld：flannel在每个主机中运行flanneld作为agent，它会为所在主机从集群的网络地址空间中，获取一个小的网段subnet，本主机内所有容器的IP地址都将从中分配。
同时Flanneld监听K8s集群数据库，为flannel.1设备提供封装数据时必要的mac、ip等网络数据信息。
```

### 3.flannel网络原理

Flannel vxlan模式跨主机通信原理

![](%E5%9B%BE%E7%89%87/Flannel%20vxlan%E6%A8%A1%E5%BC%8F%E8%B7%A8%E4%B8%BB%E6%9C%BA%E9%80%9A%E4%BF%A1%E5%8E%9F%E7%90%86.png)

```
当容器发送IP包，通过veth pair 发往cni网桥，再路由到本机的flannel.1设备进行处理。

VTEP设备之间通过二层数据帧进行通信，源VTEP设备收到原始IP包后，在上面加上一个目的MAC地址，封装成一个内部数据帧，发送给目的VTEP设备。

内部数据桢，并不能在宿主机的二层网络传输，Linux内核还需要把它进一步封装成为宿主机的一个普通的数据帧，承载着内部数据帧通过宿主机的eth0进行传输。

Linux会在内部数据帧前面，加上一个VXLAN头，VXLAN头里有一个重要的标志叫VNI，它是VTEP识别某个数据桢是不是应该归自己处理的重要标识。

flannel.1设备只知道另一端flannel.1设备的MAC地址，却不知道对应的宿主机地址是什么。在linux内核里面，网络设备进行转发的依据，来自FDB的转发数据库，这个flannel.1网桥对应的FDB信息，是由flanneld进程维护的。

linux内核在IP包前面再加上二层数据帧头，把目标节点的MAC地址填进去，MAC地址从宿主机的ARP表获取。

此时flannel.1设备就可以把这个数据帧从eth0发出去，再经过宿主机网络来到目标节点的eth0设备。目标主机内核网络栈会发现这个数据帧有VXLAN Header，并且VNI为1，Linux内核会对它进行拆包，拿到内部数据帧，根据VNI的值，交给本机flannel.1设备处理,flannel.1拆包，根据路由表发往cni网桥，最后到达目标容器。
```

### 4.flannel配置

flannel支持多种后端：

```
（1）Vxlan：
vxlan 报文封装，默认
Directrouting 直接路由，跨网段使用vxlan，同网段使用host-gw模式。
（2）host-gw：主机网关，性能好，但只能在二层网络中，不支持跨网络，如果有成千上万的Pod，容易产生广播风暴，不推荐
（3）UDP：性能差，不推荐
```

配置flannel

![](图片\flannel1.png)

server2查看所有pod，进入IP为10.244.1.59的pod ( node 在server3上) ，查看网关

![](图片\flannel2.png)

server3查看cni0网卡配置，IP地址为10.244.1.1

![](图片\flannel3.png)

查看server3的网关，Flannel .1的模式

![](图片\flannel4.png)

查询系统中缓存的ARP表

![](图片\flannel5.png)

查找并修改kube-flannel-cfg配置文件，将type由vxlan改为host-gw直连模式

![](图片\flannel6.png)

![](图片\flannel7.png)

在查看pod信息的时候，flannel模式还在

![](图片\flannel8.png)

更新pod（删除节点副本，重新生成的节点会读取修改后的配置文件并生效）

![](图片\flannel9.png)

此时在server3上查看网关，发现方式变为了eth0（目的地是10.244.0.0/24网段的数据由server2作为网关）

![](图片\flannel10.png)

在server4上查看网关，也变为了eth0

![](图片\flannel11.png)

## 三、calico网络插件

### 1.calico简介

```
flannel实现的是网络通信，calico的特性是在pod之间的隔离。
通过BGP路由，但大规模端点的拓扑计算和收敛往往需要一定的时间和计算资源。
纯三层的转发，中间没有任何的NAT和overlay，转发效率最好。
Calico 仅依赖三层路由可达。Calico 较少的依赖性使它能适配所有 VM、Container、白盒或者混合环境场景。
```

### 2.calico网络架构

```
Felix：监听ECTD中心的存储获取事件，用户创建pod后，Felix负责将其网卡、IP、MAC都设置好，然后在内核的路由表里面写一条，注明这个IP应该到这张网卡。同样如果用户制定了隔离策略，Felix同样会将该策略创建到ACL中，以实现隔离。

BIRD：一个标准的路由程序，它会从内核里面获取哪一些IP的路由发生了变化，然后通过标准BGP的路由协议扩散到整个其他的宿主机上，让外界都知道这个IP在这里，路由的时候到这里来。
```

![](图片\calico网络架构.png)

### 3.calico网络插件

IPIP工作模式：适用于互相访问的pod不在同一个网段中，跨网段访问的场景。

![](图片\calico网络插件-IPIP.png)

BGP工作模式：适用于互相访问的pod在同一个网段，适用于大型网络。

![](图片\calico网络插件-BGP.png)

网络策略：NetworkPolicy策略模型：控制某个namespace下的pod的网络出入站规则

![](图片\calico网络策略.png)

### 4.calico组件安装

```
Kubernetes 版本    Calico 版本    Calico 文档    
1.18、1.19、1.20    3.18    
https://projectcalico.docs.tigera.io/archive/v3.18/getting-started/kubernetes/requirements    
https://projectcalico.docs.tigera.io/archive/v3.18/manifests/calico.yaml
1.19、1.20、1.21    3.19    
https://projectcalico.docs.tigera.io/archive/v3.19/getting-started/kubernetes/requirements    
https://projectcalico.docs.tigera.io/archive/v3.19/manifests/calico.yaml
1.19、1.20、1.21    3.20   
 https://projectcalico.docs.tigera.io/archive/v3.20/getting-started/kubernetes/requirements    
https://projectcalico.docs.tigera.io/archive/v3.20/manifests/calico.yaml
1.20、1.21、1.22    3.21    
https://projectcalico.docs.tigera.io/archive/v3.21/getting-started/kubernetes/requirements    
https://projectcalico.docs.tigera.io/archive/v3.21/manifests/calico.yaml
1.21、1.22、1.23    3.22   
 https://projectcalico.docs.tigera.io/archive/v3.22/getting-started/kubernetes/requirements    
https://projectcalico.docs.tigera.io/archive/v3.22/manifests/calico.yaml
1.21、1.22、1.23    3.23    
https://projectcalico.docs.tigera.io/archive/v3.23/getting-started/kubernetes/requirements    
https://projectcalico.docs.tigera.io/archive/v3.23/manifests/calico.yaml
1.22、1.23、1.24    3.24    
https://projectcalico.docs.tigera.io/archive/v3.24/getting-started/kubernetes/requirements    
https://projectcalico.docs.tigera.io/archive/v3.24/manifests/calico.yaml
```

安装caloco替换原先的flannel网络组件；
首先server2 创建calico目录，获取calico.yaml配置文件

```
IPIP：ipip是在宿主机网络不完全支持bgp时，一种妥协的overlay机制，在宿主机创建1个”tunl0”虚拟端口；设置为false时，路由即纯bgp模式，理论上ipip模式的网络传输性能低于纯bgp模式；设置为true时，又分ipip always模式（纯ipip模式）与ipip cross-subnet模式（ipip-bgp混合模式），后者指“同子网内路由采用bgp，跨子网路由采用ipip”。
```

**calico修改网络模式为BGP**

```
#修改calico.yaml文件，添加内容如下
# Enable BGP
- name: CALICO_IPV4POOL_IPIP
  value: "Never"
# 新增两行配置
- name: IP_AUTODETECTION_METHOD
  value: "interface=ens.*"
```

相比IPIP模式，BGP模式下不需要tunl0设备参与报文传输，我们从路由表信息就能看出差别，如下所示：

```
#1、IPIP模式
[root@k8s-master-13 ~]# route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG    100    0        0 ens33
10.244.17.0     192.168.1.15    255.255.255.192 UG    0      0        0 tunl0
10.244.27.0     192.168.1.21    255.255.255.192 UG    0      0        0 tunl0
10.244.115.0    192.168.1.16    255.255.255.192 UG    0      0        0 tunl0
10.244.170.128  192.168.1.14    255.255.255.192 UG    0      0        0 tunl0
192.168.1.0     0.0.0.0         255.255.255.0   U     100    0        0 ens33

#2、BGP模式
[root@localhost install-kubernetes]# route -n 
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG    100    0        0 ens33
10.244.17.0     192.168.1.15    255.255.255.192 UG    0      0        0 ens33
10.244.27.0     192.168.1.21    255.255.255.192 UG    0      0        0 ens33
10.244.115.0    192.168.1.16    255.255.255.192 UG    0      0        0 ens33
10.244.170.128  192.168.1.14    255.255.255.192 UG    0      0        0 ens33
192.168.1.0     0.0.0.0         255.255.255.0   U     100    0        0 ens33
```

如上可见，在BGP模式下，报文直接通过ens33转发到目标机器上，不会进行二次ip报文的封装，因此从性能上来看，BGP肯定是占优势的。但是由于没有二次封包，BGP模式只能在同一个子网内使用，无法跨网段使用。

**calico修改网络模式为混合模式**

**方法一：**

```
[root@k8s-master-13 ~]# kubectl patch ippool default-ipv4-ippool -p '{"spec":{"ipipMode": "CrossSubnet"}}' --type=merge
```

**方法二：**

```
[root@k8s-master-13 ~]# kubectl edit ippool 
ipipMode: Always修改为ipipMode: CrossSubnet
```

查看pod信息，看到还有flannel的pod，删除之前的网络插件flannel

```
kubectl delete -f kube-flannel.yml
```

将/etc/cni/net.d目录下的flannel的配置文件移除

```
mv 10-flannel.conflist /mnt/
```

执行calico.yaml清单，完成初始化

```
kubectl apply -f calico.yml
```

### 5.calicoctl客户端工具安装

**下载calicoctl二进制文件**

```
wget https://github.com/projectcalico/calicoctl/releases/download/v3.20.0/calicoctl
cp calicoctl /usr/bin
chmod +x /usr/bin/calicoctl
```

**命令行测试**

```
[root@k8s-master-13 ~]# DATASTORE_TYPE=kubernetes KUBECONFIG=~/.kube/config calicoctl node status
```

**配置文件测试**

```
#1、编辑配置文件
[root@k8s-master-13 ~]# mkdir -p /etc/calico/
[root@k8s-master-13 ~]# vim /etc/calico/calicoctl.cfg
apiVersion: projectcalico.org/v3
kind: CalicoAPIConfig
metadata:
spec:
  datastoreType: "kubernetes"
  kubeconfig: "~/.kube/config"

#2、测试命令如下
[root@k8s-master-13 ~]# calicoctl node status
Calico process is running.

IPv4 BGP status
+--------------+-------------------+-------+----------+-------------+
| PEER ADDRESS |     PEER TYPE     | STATE |  SINCE   |    INFO     |
+--------------+-------------------+-------+----------+-------------+
| 192.168.1.14 | node-to-node mesh | up    | 07:20:27 | Established |
| 192.168.1.15 | node-to-node mesh | up    | 07:21:40 | Established |
| 192.168.1.16 | node-to-node mesh | up    | 07:20:27 | Established |
| 192.168.1.21 | node-to-node mesh | up    | 07:21:11 | Established |
+--------------+-------------------+-------+----------+-------------+

IPv6 BGP status
No IPv6 peers found.
```

## 四、calico网络策略

### 1.Pod

calico 支持通过 `GlobalNetworkPolicy` 和 `NetworkPolicy` 对 Pod 的 Egress/Ingress 流量进行管控。

特定 Namespace 的 Pod 只能与此 Namespace 下的 Pod 通信。若 namespace 具有 Label: `environment == "development`，则该 namespace 下的 Pod 只能与同一 namespace 下的 Pod 通信：

```
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: restrict-development-access
spec:
  namespaceSelector: 'environment == "development"'
  ingress:
    - action: Allow
      source:
        namespaceSelector: 'environment == "development"'
  egress:
    - action: Allow
      destination:
        namespaceSelector: 'environment == "development"'
```

### 2.Service

Calico 支持对 Kubernetes Service 进行管控：

```
apiVersion: projectcalico.org/v3
kind: NetworkPolicy
metadata:
  name: allow-api-access
  namespace: my-app
spec:
  selector: all()
  egress:
    - action: Allow
      destination:
        services:
          name: kubernetes
          namespace: default
```

此处 Policy 指的是允许所有 Pod 访问 Kubernetes 这个 Service。

### 3.host

Calico 支持通过 `GlobalNetworkPolicy` 对 Kubernetes 节点进行管控。

### 4.ServiceAccount

Calico 支持用 `ServiceAccount` 来灵活地控制策略在 Pod 上的应用方式：

a. 使用 `ServiceAccounts` 来限制 Pod 的入口流量：

当访问 namespace: prod-engineering 下具有 Label: `app == "db"` 的 Pod 时，如果访问者 Pod 所使用的 `serviceAccounts` 的 name 是 `api-service` 或者 `user-auth-service`，则请求通过。

```
apiVersion: projectcalico.org/v3
kind: NetworkPolicy
metadata:
  name: demo-calico
  namespace: prod-engineering
spec:
  ingress:
    - action: Allow
      source:
        serviceAccounts:
          names:
            - api-service
            - user-auth-service
  selector: 'app == "db"'
```

b.使用 `ServiceAccount` 的 Label 限制工作负载的入口流量：

当访问者 Pod 所绑定的 `ServiceAccounts` 的 Label 满足 `app == "web-frontend"`, 则允许访问 `prod-engineering` namespace 下满足 Label: 'app == "db"' 的 Pod。

```
apiVersion: projectcalico.org/v3
kind: NetworkPolicy
metadata:
  name: allow-web-frontend
  namespace: prod-engineering
spec:
  ingress:
    - action: Allow
      source:
        serviceAccounts:
          selector: 'app == "web-frontend"'
  selector: 'app == "db"'

```

c.使用 `serviceAccountSelector` 筛选 Policy 的作用目标：

只有 `serviceAccountSelector` 匹配 `'role == "intern"` 的 Pod 之间才能互相访问：

```
apiVersion: projectcalico.org/v3
kind: NetworkPolicy
metadata:
  name: restrict-intern-access
  namespace: prod-engineering
spec:
  serviceAccountSelector: 'role == "intern"'
  ingress:
    - action: Allow
      source:
        serviceAccounts:
          selector: 'role == "intern"'
  egress:
    - action: Allow
      destination:
        serviceAccounts:
          selector: 'role == "intern"'
```

### **5.对流量的双向管控**

```
Egress

支持对匹配策略的 Endpoint 进行出口流量管控

Ingress

支持对匹配策略的 Endpoint 进行入口流量管控
```

### 6.支持多种管控行为

```
Allow

当数据包匹配定义的行为，允许其通过。

Deny

当数据包不匹配定义的行为，禁止其通过。

Log

不对数据包进行管控，只是日志记录，然后继续处理下一条规则。

Pass

Pass action 会跳过目前剩下的所有规则，跳转到 Calico EndPoint 分配的第一个 Profile，然后执行 Profile 定义的规则。 Calico 对于每一个 Endpoint 都会绑定两个 Profile（kns.<namespace> 和 ksa.<namespace>.default）。 Profile 中定义了一系列的 Label 和策略（由于历史原因，Profile 中包括策略规则，先已废弃）。 如果该 Endpoint 没有绑定任何的 Profile，那么策略结果相当于 Deny。
```

### 7.策略优先级

通过 order 字段指定，如果没有指定，默认最后执行。数值越小优先级越高。如果 order 的值一样，按照 Policy 的 name 字段顺序排序。

### 8.集群及租户级别的管控

Kubernetes 默认采用零信任模型，即集群内所有 Pod、主机之间都可以相互访问。我们可以定义全局的策略或者租户级别的策略来管控 Pod 的入口、出口流量。

全局策略管控

通过 `GlobalNetworkPolicy` 对象作用于所有 namespace 的 Pod。例如，以下示例禁止带有 label: `app=client` 的 Pod 去访问带有 label: `app=="server"` 的 Pod：

```
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: deny-tcp-8080
spec:
  order: 1
  selector: app == 'server'  
  types:
    - Ingress
    - Egress
  ingress:
    - action: Deny
      metadata:
      annotations:
        from: client
        to: server
      protocol: TCP
      source:
        selector: app == 'client'
      destination:
        ports:
        - 8080
  egress:
    - action: Allow
```

```
其中，

selector：通过标签筛选此 Policy 作用于哪些 Pod
types：管控流量的方向，Ingress 表示入口流量，Egress 表示出口流量
ingress：定义入口流量策略的内容
action：策略动作。可选值为 Allow、Deny、Log、Pass
metadata：额外信息。只是为了说明
protocol：协议。可选为"TCP"、"UDP"、"ICMP"、"ICMPv6"、"SCTP"、"UDPLite"
source：通过 label 筛选访问源
destination：筛选访问目标，这里筛选目的端口为 8080
egress：这里未做其他要求，允许所有通过 calicoctl apply -f，即可生效。
```

租户级别管控

Calico 通过 `NetworkPolicy` 对象管控特定 namespace 下的 Pod，与 `GlobalNetworkPolicy` 不同的是，`NetworkPolicy` 作用于特定 namespace。 例如：

```
apiVersion: projectcalico.org/v3
kind: NetworkPolicy
metadata:
  name: allow-tcp-8080
  namespace: production
spec:
  selector: app == 'server'
  types:
  - Ingress
  - Egress
  ingress:
    - action: Allow
      metadata:
        annotations:
          from: frontend
          to: database
      protocol: TCP
        source:
          selector: app == 'client'
        destination:
          ports:
           - 8080
  egress:
    - action: Allow

```

与上面的 `GlobalNetworkPolicy` 的不同之处在于：`metadata` 多了一个 namespace 字段，规定了这个策略作用的 namespace。

### 9.与 Kubernetes Policy 对比

```
支持策略优先级

支持 Deny 规则

更加灵活的匹配规则

支持管控更多的策略对象, Kubernetes 只支持管控 Pod
```

## 五、calico网络策略

###  1.什么是cilium

```
官网： https://cilium.io/  
官方文档：https://docs.cilium.io/en/stable/intro/  
官方github： https://github.com/cilium/cilium
```

Cilium 是一个用于容器网络领域的开源项目，**主要是面向容器而使用，用于提供并透明地保护应用程序工作负载**（如应用程序容器或进程）之间的网络连接和负载均衡。

Cilium的基础是一种新的Linux内核技术，称为EBPF，它可以动态插入Linux本身中强大的安全可见性和控制逻辑。由于EBPF在Linux内核内运行，因此可以应用和更新Cilium Security策略，而无需更改应用程序代码或容器配置。

Cilium 是一个在 eBPF 之上设计的开源项目，旨在满足容器工作负载的网络、安全和可观测性要求。它在 eBPF 之上提供了一个高级抽象。Cilium 之于 eBPF，就像 Kubernetes 和容器运行时之于 Linux 内核namespace、cgroups 和 seccomp。

![在这里插入图片描述](%E5%9B%BE%E7%89%87/Cilium%E6%A6%82%E5%BF%B5.png)

### 2.Cilium使用场景

```
官方：https://cilium.io/get-started/
```

如官方所示，Cilium使用场景有3个方向，一个是网络、一个是可观测性、一个是安全。
![在这里插入图片描述](%E5%9B%BE%E7%89%87/Cilium%E4%BD%BF%E7%94%A8%E5%9C%BA%E6%99%AF.png)  Cilium 提供了 CNI 和 kube-proxy replacement 功能，相比 iptables 性能要好很多。Cilium 作为第一个通过eBPF实现了kube-proxy所有功能的Kubernetes网络方案,

Cilum 1.6发布基于BPF的服务发现代理(完全替换基于iptables的kubeproxy)。

现有问题  

```
传统的Linux网络访问安全控制机制（如iptables）是基于静态环境的IP地址和端口配置网络转发、过滤等规则，但是IP地址在微服务架构下是不断变化的，非固定的；出于安全目的，协议端口(例如HTTP传输的TCP端口80)也不再固定用来区分应用系统。为了匹配大规模容器实例快速变化的生命周期，传统网络技术需要维护成千上万的负载均衡规则和访问控制规则，并且需要以不断增长的频率更新这些规则，而如果没有准确的可视化功能，要维护这些规则也是十分困难，这些对传统网络技术的可用性和性能都是极大的挑战。比如经常会有人对kube-proxy基于iptables的服务负载均衡功能在大规模容器场景下具有严重的性能瓶颈，同时由于容器的创建和销毁非常频繁，基于IP做身份关联的故障排除和安全审计等也很难实现。
```

解决方案 

```
Cilium作为一款Kubernetes CNI插件，从一开始就是为大规模和高度动态的容器环境而设计，并且带来了API级别感知的网络安全管理功能，通过使用基于Linux内核特性的新技术——BPF，提供了基于service/pod/container作为标识，而非传统的IP地址，来定义和加强容器和Pod之间网络层、应用层的安全策略。因此，Cilium不仅将安全控制与寻址解耦来简化在高度动态环境中应用安全性策略，而且提供传统网络第3层、4层隔离功能，以及基于http层上隔离控制，来提供更强的安全性隔离。
```

另外，由于BPF可以动态地插入控制Linux系统的程序，实现了强大的安全可视化功能，而且这些变化是不需要更新应用代码或重启应用服务本身就可以生效，因为BPF是运行在系统内核中的。

以上这些特性，使Cilium能够在大规模容器环境中也具有高度可伸缩性、可视化以及安全性。

**关于容器网络接口 ( CNI )**

```
官方：https://www.cni.dev/  
官方github： https://github.com/containernetworking/cni
```

容器网络接口 ( CNI ) 的创建是为了在容器执行和网络层之间定义一个标准化的通用接口。

CNI 项目是云原生计算基金会 (CNCF) 的一部分。CNI 规范描述了如何为 Linux 容器配置网络接口。它将其重点领域定义为仅限于容器网络连接并在容器消失时移除分配的资源。由于这个重点，CNI 规范简单并被广泛采用，支持大量插件。许多容器编排框架，包括 Kubernetes，都实现了这个规范。如果你想了解有关 CNI 规范、使用它的运行时以及实现它的第三方插件的更多信息，CNI GitHub 项目是一个很好的起点。

CNI 插件必须符合 CNI 规范定义的标准。每个实现 CNI 规范的插件都试图解决容器网络的不同方面。

这些插件是：  

```
Flannel
Calico
Weave  
Cilium
```

### 3.网络解决方案Flannel，Calico 和 Cilium 对比

*   Flannel 
    Flannel 常见采取 UDP Overlay 方案，flannel是overlay network, 主要是L2(VXLAN)。

*   Calico 
    Calico 是一个纯三层的方案，不需要 Overlay，基于 Etcd 维护网络准确性，也基于 Iptables 增加了策略配置。 
    calico主要是L3，用BGP路由。

*   Cilium 
    cilium的主要卖点就是这个BPF。BPF的性能非常强悍，要比iptables强上数倍。 
    Cilium 基于 eBPF 和 XDP 的方案，eBPF/XDP 处理数据包的速度可以和 DPDK 媲美，零拷贝直接内核态处理，缺点就是用户不太容易进行配置，而 cilium 解决了这个问题，可以支持 L3/L4/L7 的策略。

**DPDK**

DPDK让用户态程序直接处理网络流，bypass掉内核，使用独立的CPU专门干这个事。

新技术出现的历史原因 
iptables/netfilter 是上个时代Linux网络提供的优秀的防火墙技术，扩展性强，能够满足当时大部分网络应用需求。但该框架也存在很多明显问题：

iptables 基于一个非常庞大的内核框架（Netfilter），这个框架出现在内核 datapath 的多个地方，有很大冗余。

*   路径太长 
    netfilter 框架在IP层，报文需要经过链路层，IP层才能被处理，如果是需要丢弃报文，会白白浪费很多CPU资源，影响整体性能；极端情况下，报文需要依次遍历所有规则，才能匹配中，极大影响报文处理性能；
*   规则太多 
    netfilter 框架类似一套可以自由添加策略规则专家系统，并没有对添加规则进行合并优化，这些都严重依赖操作人员技术水平，随着规模的增大，规则数量n成指数级增长，而报文处理又是0（n）复杂度，最终性能会直线下降。
*   内核协议栈 
    随着互联网流量越来愈大, 网卡性能越来越强，Linux内核协议栈在10Mbps/100Mbps网卡的慢速时代是没有任何问题的，那个时候应用程序大部分时间在等网卡送上来数据。

现在到了1000Mbps/10Gbps/40Gbps网卡的时代，数据被很快地收入，协议栈复杂处理逻辑，效率捉襟见肘，把大量报文堵在内核里。

### 4.Cilium架构

Cilium由在您的环境中在所有群集节点和服务器上运行的代理组成。它为在该节点上运行的工作负载提供网络，安全性和可观测性。工作负载可以在系统上进行容器或本地运行。

![在这里插入图片描述](%E5%9B%BE%E7%89%87/Cilium%E6%9E%B6%E6%9E%84.png)  
Cilium 是一个很好的 eBPF 之上的通用抽象，覆盖了分布式系统的绝大多数场景。Cilium 封装了 eBPF，提供一个更上层的 API。

### 5.Cilium 和 eBPF - 云原生世界的理想搭配

```
eBPF - 网络与安全的未来  
参考URL: https://cilium.io/blog/2020/11/10/ebpf-future-of-networking/
```

是什么让 eBPF 和 Cilium 如此适合应对新的云原生挑战？

*   可编程性 
    eBPF 不是特定于网络或绑定到特定域的。eBPF 的通用性不仅吸引了更大的社区进行创新，而且还避免了对解决未来问题所需的构建块做出过早的假设。与任何特定于网络的可编程性解决方案（例如 iptables、Open vSwitch 或 nftables）相比，这是一个巨大的优势。 
    ![在这里插入图片描述](%E5%9B%BE%E7%89%87/Cilium-ebpf1.png)
*   嵌入在 Linux 内核中 
    之前可编程性已经以用户空间网络的形式存在。eBPF 可编程性的独特新方面被嵌入到 Linux 内核中。应用程序使用系统调用通过网络进行交互，Linux 内核负责处理这些系统调用。为了让用户空间网络框架对应用程序保持透明，它仍然必须遍历 Linux 内核的套接字层。eBPF 通过完全保留在内核中来避免这种情况。

![在这里插入图片描述](%E5%9B%BE%E7%89%87/Cilium-ebpf2.png)                           之前这点之所以不重要，是因为对于虚拟机，管理程序在物理机的网络设备和虚拟机内部的套接字之间创建了一个自然边界。而对于容器，这一切都发生在同一个内核中。

*   安全和效率 
    那么为什么不直接加载 Linux 内核模块呢？它显然以非常高的效率提供了任意可编程性。 
    主要缺点：需要深入了解跨内核版本的内核模块的成本，安全性的同时保持效率。

通过要求 eBPF 程序通过验证过程，eBPF 程序比加载内核模块安全得多。 
效率由即时 (JIT) 编译器保证，该编译器确保 eBPF 字节码的本机执行速度。 
所有这些都使得 eBPF 非常强大，但它也是一种底层技术，主要供 Linux 内核开发人员使用。

### 6.eBPF 革命开始

```
eBPF - 网络与安全的未来 
参考URL: https://cilium.io/blog/2020/11/10/ebpf-future-of-networking/
```

在 Kubernetes 启动的同一年，eBPF 首次被合并到 Linux 内核中，作为长期存在的数据包过滤器 BPF 的继承者。因此名称扩展 BPF 或简称：eBPF。一年后，eBPF 后端被合并到 LLVM 编译器套件中，允许 LLVM 编译出 eBPF 字节码。同时，集成到内核的流量控制层使 Linux 网络可以使用 eBPF 进行编程。

![在这里插入图片描述](%E5%9B%BE%E7%89%87/ebpf.png)

2016 年，XDP 被合并到 Linux 内核中，通过允许 eBPF 程序直接在网络设备的驱动程序中运行来实现高性能数据路径。这就是后来开发基于 eBPF 的高性能负载均衡器的原因，这些负载均衡器驱动着当今一些最大的数据中心。

从那时起，eBPF 就处于一个令人难以置信的陡峭轨迹中，需要进一步发展，并且每年都变得越来越强大。eBPF 的通用性允许围绕它形成一个多样化的社区，涵盖网络、跟踪、安全性、概要分析和可观察性。

### 7.  Cilium部署

#### 7.1 环境准备

确保 Kubernetes 集群已经运行，并安装了 `kubectl` 和 `helm`：

```sql
# [root@k8s-master01 ~]# curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
# [root@k8s-master01 ~]# chmod 700 get_helm.sh
# [root@k8s-master01 ~]# ./get_helm.sh

# wget https://mirrors.huaweicloud.com/helm/v3.16.3/helm-v3.16.3-linux-amd64.tar.gz
tar xvf helm-*-linux-amd64.tar.gz
cp linux-amd64/helm /usr/local/bin/
```

#### 7.2 安装 Cilium

使用 Helm 安装 Cilium：

```cobol
# 添加源
helm repo add cilium https://helm.cilium.io

# 修改为国内源
helm pull cilium/cilium
tar xvf cilium-*.tgz
cd cilium/

# sed -i "s#quay.io/#quay.m.daocloud.io/#g" values.yaml

# 默认参数安装
helm install  cilium ./cilium/ -n kube-system

# 启用ipv6
# helm install cilium ./cilium/ --namespace kube-system --set ipv6.enabled=true

# 启用路由信息和监控插件
# helm install cilium ./cilium/ --namespace kube-system --set ipv6.enabled=true --set hubble.relay.enabled=true --set hubble.ui.enabled=true --set prometheus.enabled=true --set operator.prometheus.enabled=true --set hubble.enabled=true --set hubble.metrics.enabled="{dns,drop,tcp,flow,port-distribution,icmp,http}" 
      
# cilium替代kube-proxy
# helm install cilium ./cilium/ --namespace kube-system --set kubeProxyReplacement=true --set kubeProxyReplacementHealthzBindAddr='0.0.0.0:10256' --set k8sServiceHost=192.168.1.121 --set k8sServicePort=6443
      
#启用本地重定向策略
# helm install cilium ./cilium/ --namespace kube-system --set localRedirectPolicies.enabled=true
```

验证 Cilium 运行状态：

```cobol
kubectl get pods -n kube-system -l k8s-app=cilium
```

#### 7.3 查看

```shell
[root@k8s-master01 ~]# kubectl  get pod -A | grep cil
NAMESPACE     NAME                               READY   STATUS    RESTARTS   AGE
kube-system   cilium-2tnfb                       1/1     Running   0          60s
kube-system   cilium-5tgcb                       1/1     Running   0          60s
kube-system   cilium-6shf5                       1/1     Running   0          60s
kube-system   cilium-ccbcx                       1/1     Running   0          60s
kube-system   cilium-cppft                       1/1     Running   0          60s
kube-system   cilium-operator-675f685d59-7q27q   1/1     Running   0          60s
kube-system   cilium-operator-675f685d59-kwmqz   1/1     Running   0          60s
[root@k8s-master01 ~]#
```

#### 7.4 下载专属监控面板

安装时候没有创建 监控可以忽略

```shell
[root@k8s-master01 yaml]# wget https://mirrors.chenby.cn/https://raw.githubusercontent.com/cilium/cilium/1.12.1/examples/kubernetes/addons/prometheus/monitoring-example.yaml

[root@k8s-master01 yaml]# sed -i "s#docker.io/#jockerhub.com/#g" monitoring-example.yaml

[root@k8s-master01 yaml]# kubectl  apply -f monitoring-example.yaml
namespace/cilium-monitoring created
serviceaccount/prometheus-k8s created
configmap/grafana-config created
configmap/grafana-cilium-dashboard created
configmap/grafana-cilium-operator-dashboard created
configmap/grafana-hubble-dashboard created
configmap/prometheus created
clusterrole.rbac.authorization.k8s.io/prometheus created
clusterrolebinding.rbac.authorization.k8s.io/prometheus created
service/grafana created
service/prometheus created
deployment.apps/grafana created
deployment.apps/prometheus created
[root@k8s-master01 yaml]#
```

#### 7.5 修改为NodePort

安装时候没有创建 监控可以忽略

```shell
[root@k8s-master01 yaml]# kubectl  edit svc  -n kube-system hubble-ui
service/hubble-ui edited
[root@k8s-master01 yaml]#
[root@k8s-master01 yaml]# kubectl  edit svc  -n cilium-monitoring grafana
service/grafana edited
[root@k8s-master01 yaml]#
[root@k8s-master01 yaml]# kubectl  edit svc  -n cilium-monitoring prometheus
service/prometheus edited
```

#### 7.6 查看端口

```shell
[root@k8s-master01 yaml]# kubectl get svc -A | grep NodePort
cilium-monitoring   grafana          NodePort    10.111.74.3      <none>        3000:32648/TCP   74s
cilium-monitoring   prometheus       NodePort    10.107.240.124   <none>        9090:30495/TCP   74s
kube-system         hubble-ui        NodePort    10.96.185.26     <none>        80:31568/TCP     99s
```

### 8\. 使用 Cilium 实现本地重定向

验证 Cilium 本地重定向策略 CRD 是否已注册

```vbnet
$ kubectl get crds
NAME                              CREATED AT
[...]
ciliumlocalredirectpolicies.cilium.io              2020-08-24T05:31:47Z
```

#### 8.1 节点本地 DNS 缓存

部署 DNS 节点缓存

```undefined
$ wget https://raw.githubusercontent.com/cilium/cilium/1.18.2/examples/kubernetes-local-redirect/node-local-dns.yaml

$ kubedns=$(kubectl get svc kube-dns -n kube-system -o jsonpath={.spec.clusterIP}) && sed -i "s/__PILLAR__DNS__SERVER__/$kubedns/g;" node-local-dns.yaml

$ kubectl apply -f node-local-dns.yaml
```

部署本地重定向策略 (LRP) 以将 DNS 流量引导至节点本地 DNS 缓存

```
kubectl apply -f https://raw.githubusercontent.com/cilium/cilium/1.18.2/examples/kubernetes-local-redirect/node-local-dns-lrp.yaml
```

所有 Pod 都处于就绪状态后`node-local-dns`，DNS 流量将首先转到本地节点缓存。您可以通过`coredns_dns_request_count_total`。curl `<node-local-dns pod IP>:9253/metrics`检查 DNS 缓存的指标来验证这一点。随着应用程序 Pod 发出的新 DNS 请求被重定向到Pod，指标应该会增加

**故障排除**

如果 DNS 请求无法解析，请检查以下内容：

确保节点本地 DNS 缓存 pod 正在运行并准备就绪

```
$ kubectl --namespace kube-system get pods --selector=k8s-app=node-local-dns
NAME                   READY   STATUS    RESTARTS   AGE
node-local-dns-72r7m   1/1     Running   0          2d2h
node-local-dns-gc5bx   1/1     Running   0          2d2h
```

检查本地重定向策略是否已正确应用于所有 cilium 代理 pod

```
$ kubectl exec -it cilium-mhnhz -n kube-system -- cilium-dbg lrp list
LRP namespace   LRP name       FrontendType                Matching Service
kube-system     nodelocaldns   clusterIP + all svc ports   kube-system/kube-dns
                |              10.96.0.10:53/UDP -> 10.244.1.49:53(kube-system/node-local-dns-72r7m),
                |              10.96.0.10:53/TCP -> 10.244.1.49:53(kube-system/node-local-dns-72r7m),
```

检查相应的本地重定向服务条目是否已创建。如果缺少服务条目，则在应用策略和节点本地 DNS DaemonSet pod 资源时可能存在竞争条件。

```
$ kubectl exec -it cilium-mhnhz -n kube-system -- cilium-dbg service list | grep LocalRedirect
11   10.96.0.10:53      LocalRedirect   1 => 10.244.1.49:53 (active)
```

启用`node-local-dns`服务的日志记录

```
kubectl -n kube-system edit configmap node-local-dns

#log在以下部分添加配置参数Corefile
    .:53 {
      log
      errors

#获取运行 DNS 服务的 pod 的日志
kubectl logs --namespace=kube-system -l k8s-app=node-local-dns -f
```

### 9\. Cilium 负载均衡替代 kube-proxy

默认情况下，Kubernetes 使用 `kube-proxy` 进行服务负载均衡，但 Cilium 通过 eBPF 直接在内核级别处理流量，提高性能。

检查 kube-proxy 是否被替换：

```sql
$ kubectl -n kube-system delete ds kube-proxy
$ # Delete the configmap as well to avoid kube-proxy being reinstalled during a Kubeadm upgrade
$ kubectl -n kube-system delete cm kube-proxy
$ # Run on each node with root permissions:
$ iptables-save | grep -v KUBE | iptables-restore
```

如果 Cilium 已完全替代 kube-proxy，应该不会看到 `kube-proxy` 运行的 DaemonSet。

**验证设置**

Cilium 代理是否在所需模式下运行

```
$ kubectl -n kube-system exec ds/cilium -- cilium-dbg status | grep KubeProxyReplacement
KubeProxyReplacement:   True        [eth0 (Direct Routing), eth1]

$ kubectl -n kube-system exec ds/cilium -- cilium-dbg status --verbose
[...]
KubeProxyReplacement Details:
  Status:                True
  Socket LB:             Enabled
  Protocols:             TCP, UDP
  Devices:               eth0 (Direct Routing), eth1
  Mode:                  SNAT
  Backend Selection:     Random
  Session Affinity:      Enabled
  Graceful Termination:  Enabled
  NAT46/64 Support:      Enabled
  XDP Acceleration:      Disabled
  Services:
  - ClusterIP:      Enabled
  - NodePort:       Enabled (Range: 30000-32767)
  - LoadBalancer:   Enabled
  - externalIPs:    Enabled
  - HostPort:       Enabled
[...]
```

验证 Cilium 的 eBPF kube-proxy 替代品是否创建了新的 NodePort 服务

```
$ kubectl -n kube-system exec ds/cilium -- cilium-dbg service list
ID   Frontend               Service Type   Backend
[...]
4    10.104.239.135:80/TCP      ClusterIP      1 => 10.217.0.107:80/TCP
                                               2 => 10.217.0.149:80/TCP
5    0.0.0.0:31940/TCP          NodePort       1 => 10.217.0.107:80/TCP
                                               2 => 10.217.0.149:80/TCP
6    192.168.178.29:31940/TCP   NodePort       1 => 10.217.0.107:80/TCP
                                               2 => 10.217.0.149:80/TCP
7    172.16.0.29:31940/TCP      NodePort       1 => 10.217.0.107:80/TCP
                                               2 => 10.217.0.149:80/TCP
```

