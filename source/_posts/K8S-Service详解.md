---
title: k8s-Service详解
tags: [kubernetes]
categories: [云原生]
date: 2026-09-01
---
### 1. Service介绍

 在kubernetes中，pod是应用程序的载体，我们可以通过pod的ip来访问应用程序，但是pod的ip地址不是固定的，这也就意味着不方便直接采用pod的ip对服务进行访问。

 为了解决这个问题，kubernetes提供了Service资源，Service会对提供同一个服务的多个pod进行聚合，并且提供一个统一的入口地址。通过访问Service的入口地址就能访问到后面的pod服务。
![](图片\service.png)

 Service在很多情况下只是一个概念，真正起作用的其实是kube-proxy服务进程，每个Node节点上都运行着一个kube-proxy服务进程。当创建Service的时候会通过api-server向etcd写入创建的service的信息，而kube-proxy会基于监听的机制发现这种Service的变动，然后它会将最新的Service信息转换成对应的访问规则
![](图片\service功能.png)

```
# 10.97.97.97:80 是service提供的访问入口
# 当访问这个入口的时候，可以发现后面有三个pod的服务在等待调用，
# kube-proxy会基于rr（轮询）的策略，将请求分发到其中一个pod上去
# 这个规则会同时在集群内的所有节点上都生成，所以在任何一个节点上访问都可以。
[root@node1 ~]# ipvsadm -Ln
IP Virtual Server version 1.2.1 (size=4096)
Prot LocalAddress:Port Scheduler Flags
  -> RemoteAddress:Port           Forward Weight ActiveConn InActConn
TCP  10.97.97.97:80 rr
  -> 10.244.1.39:80               Masq    1      0          0
  -> 10.244.1.40:80               Masq    1      0          0
  -> 10.244.2.33:80               Masq    1      0          0
```

kube-proxy目前支持三种工作模式:

**userspace 模式**

```
 userspace模式下，kube-proxy会为每一个Service创建一个监听端口，发向Cluster IP的请求被Iptables规则重定向到kube-proxy监听的端口上，kube-proxy根据LB算法选择一个提供服务的Pod并和其建立链接，以将请求转发到Pod上。
​ 该模式下，kube-proxy充当了一个四层负责均衡器的角色。由于kube-proxy运行在userspace中，在进行转发处理时会增加内核和用户空间之间的数据拷贝，虽然比较稳定，但是效率比较低。
```

![](图片\service-userspace.png)

**iptables 模式**

```
 iptables模式下，kube-proxy为service后端的每个Pod创建对应的iptables规则，直接将发向Cluster IP的请求重定向到一个Pod IP。
 该模式下kube-proxy不承担四层负责均衡器的角色，只负责创建iptables规则。该模式的优点是较userspace模式效率更高，但不能提供灵活的LB策略，当后端Pod不可用时也无法进行重试
```



![](图片\service-iptables.png)



**ipvs 模式**

```
 ipvs模式和iptables类似，kube-proxy监控Pod的变化并创建相应的ipvs规则。ipvs相对iptables转发效率更高。除此以外，ipvs支持更多的LB算法。
```

![](图片\service-ipvs.png)

```
# 此模式必须安装ipvs内核模块，否则会降级为iptables
# 开启ipvs
[root@master ~]# kubectl edit cm kube-proxy -n kube-system
[root@master ~]# kubectl delete pod -l k8s-app=kube-proxy -n kube-system
[root@node1 ~]# ipvsadm -Ln
IP Virtual Server version 1.2.1 (size=4096)
Prot LocalAddress:Port Scheduler Flags
  -> RemoteAddress:Port           Forward Weight ActiveConn InActConn
TCP  10.97.97.97:80 rr
  -> 10.244.1.39:80               Masq    1      0          0
  -> 10.244.1.40:80               Masq    1      0          0
  -> 10.244.2.33:80               Masq    1      0          0
```

### 2.Service类型

Service的资源清单文件：

```
kind: Service  # 资源类型
apiVersion: v1  # 资源版本
metadata: # 元数据
  name: service # 资源名称
  namespace: dev # 命名空间
spec: # 描述
  selector: # 标签选择器，用于确定当前service代理哪些pod
    app: nginx
  type: # Service类型，指定service的访问方式
  clusterIP:  # 虚拟服务的ip地址
  sessionAffinity: # session亲和性，支持ClientIP、None两个选项
  ports: # 端口信息
    - protocol: TCP 
      port: 3017  # service端口
      targetPort: 5003 # pod端口
      nodePort: 31122 # 主机端口
```

```
ClusterIP：默认值，它是Kubernetes系统自动分配的虚拟IP，只能在集群内部访问
NodePort：将Service通过指定的Node上的端口暴露给外部，通过此方法，就可以在集群外部访问服务
LoadBalancer：使用外接负载均衡器完成到服务的负载分发，注意此模式需要外部云环境支持
ExternalName： 把集群外部的服务引入集群内部，直接使用
```

### 3.Service使用

#### 3.1 实验环境准备

在使用service之前，首先利用Deployment创建出3个pod，注意要为pod设置`app=nginx-pod`的标签

创建deployment.yaml，内容如下：

```
apiVersion: apps/v1
kind: Deployment      
metadata:
  name: pc-deployment
  namespace: dev
spec: 
  replicas: 3
  selector:
    matchLabels:
      app: nginx-pod
  template:
    metadata:
      labels:
        app: nginx-pod
    spec:
      containers:
      - name: nginx
        image: nginx:1.17.1
        ports:
        - containerPort: 80
```

```
[root@master ~]# kubectl create -f deployment.yaml
deployment.apps/pc-deployment created

# 查看pod详情
[root@master ~]# kubectl get pods -n dev -o wide --show-labels
NAME                             READY   STATUS     IP            NODE     LABELS
pc-deployment-66cb59b984-8p84h   1/1     Running    10.244.1.40   node1    app=nginx-pod
pc-deployment-66cb59b984-vx8vx   1/1     Running    10.244.2.33   node2    app=nginx-pod
pc-deployment-66cb59b984-wnncx   1/1     Running    10.244.1.39   node1    app=nginx-pod

# 为了方便后面的测试，修改下三台nginx的index.html页面（三台修改的IP地址不一致）
# kubectl exec -it pc-deployment-66cb59b984-8p84h -n dev /bin/sh
# echo "10.244.1.40" > /usr/share/nginx/html/index.html

#修改完毕之后，访问测试
[root@master ~]# curl 10.244.1.40
10.244.1.40
[root@master ~]# curl 10.244.2.33
10.244.2.33
[root@master ~]# curl 10.244.1.39
10.244.1.39
```

#### 3.2 ClusterIP类型的Service

创建service-clusterip.yaml文件

```
apiVersion: v1
kind: Service
metadata:
  name: service-clusterip
  namespace: dev
spec:
  selector:
    app: nginx-pod
  clusterIP: 10.97.97.97 # service的ip地址，如果不写，默认会生成一个
  type: ClusterIP
  ports:
  - port: 80  # Service端口       
    targetPort: 80 # pod端口
```

```
# 创建service
[root@master ~]# kubectl create -f service-clusterip.yaml
service/service-clusterip created

# 查看service
[root@master ~]# kubectl get svc -n dev -o wide
NAME                TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)   AGE   SELECTOR
service-clusterip   ClusterIP   10.97.97.97   <none>        80/TCP    13s   app=nginx-pod

# 查看service的详细信息
# 在这里有一个Endpoints列表，里面就是当前service可以负载到的服务入口
[root@master ~]# kubectl describe svc service-clusterip -n dev
Name:              service-clusterip
Namespace:         dev
Labels:            <none>
Annotations:       <none>
Selector:          app=nginx-pod
Type:              ClusterIP
IP:                10.97.97.97
Port:              <unset>  80/TCP
TargetPort:        80/TCP
Endpoints:         10.244.1.39:80,10.244.1.40:80,10.244.2.33:80
Session Affinity:  None
Events:            <none>

# 查看ipvs的映射规则
[root@master ~]# ipvsadm -Ln
TCP  10.97.97.97:80 rr
  -> 10.244.1.39:80               Masq    1      0          0
  -> 10.244.1.40:80               Masq    1      0          0
  -> 10.244.2.33:80               Masq    1      0          0

# 访问10.97.97.97:80观察效果
[root@master ~]# curl 10.97.97.97:80
10.244.2.33
```

**Endpoint**

 Endpoint是kubernetes中的一个资源对象，存储在etcd中，用来记录一个service对应的所有pod的访问地址，它是根据service配置文件中selector描述产生的。

 一个Service由一组Pod组成，这些Pod通过Endpoints暴露出来，Endpoints是实现实际服务的端点集合。换句话说，service和pod之间的联系是通过endpoints实现的。

![](图片\endpoints.png)

**负载分发策略**

对Service的访问被分发到了后端的Pod上去，目前kubernetes提供了两种负载分发策略：

如果不定义，默认使用kube-proxy的策略，比如随机、轮询

基于客户端地址的会话保持模式，即来自同一个客户端发起的所有请求都会转发到固定的一个Pod上

此模式可以使在spec中添加sessionAffinity:ClientIP选项

```
# 查看ipvs的映射规则【rr 轮询】
[root@master ~]# ipvsadm -Ln
TCP  10.97.97.97:80 rr
  -> 10.244.1.39:80               Masq    1      0          0
  -> 10.244.1.40:80               Masq    1      0          0
  -> 10.244.2.33:80               Masq    1      0          0

# 循环访问测试
[root@master ~]# while true;do curl 10.97.97.97:80; sleep 5; done;
10.244.1.40
10.244.1.39
10.244.2.33
10.244.1.40
10.244.1.39
10.244.2.33

# 修改分发策略----sessionAffinity:ClientIP

# 查看ipvs规则【persistent 代表持久】
[root@master ~]# ipvsadm -Ln
TCP  10.97.97.97:80 rr persistent 10800
  -> 10.244.1.39:80               Masq    1      0          0
  -> 10.244.1.40:80               Masq    1      0          0
  -> 10.244.2.33:80               Masq    1      0          0

# 循环访问测试
[root@master ~]# while true;do curl 10.97.97.97; sleep 5; done;
10.244.2.33
10.244.2.33
10.244.2.33
  
# 删除service
[root@master ~]# kubectl delete -f service-clusterip.yaml
service "service-clusterip" deleted
```

#### 3.3 HeadLiness类型的Service

 在某些场景中，开发人员可能不想使用Service提供的负载均衡功能，而希望自己来控制负载均衡策略，针对这种情况，kubernetes提供了HeadLiness Service，这类Service不会分配Cluster IP，如果想要访问service，只能通过service的域名进行查询。

创建service-headliness.yaml

```
apiVersion: v1
kind: Service
metadata:
  name: service-headliness
  namespace: dev
spec:
  selector:
    app: nginx-pod
  clusterIP: None # 将clusterIP设置为None，即可创建headliness Service
  type: ClusterIP
  ports:
  - port: 80    
    targetPort: 80
```

```
# 创建service
[root@master ~]# kubectl create -f service-headliness.yaml
service/service-headliness created

# 获取service， 发现CLUSTER-IP未分配
[root@master ~]# kubectl get svc service-headliness -n dev -o wide
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE   SELECTOR
service-headliness   ClusterIP   None         <none>        80/TCP    11s   app=nginx-pod

# 查看service详情
[root@master ~]# kubectl describe svc service-headliness  -n dev
Name:              service-headliness
Namespace:         dev
Labels:            <none>
Annotations:       <none>
Selector:          app=nginx-pod
Type:              ClusterIP
IP:                None
Port:              <unset>  80/TCP
TargetPort:        80/TCP
Endpoints:         10.244.1.39:80,10.244.1.40:80,10.244.2.33:80
Session Affinity:  None
Events:            <none>

# 查看域名的解析情况
[root@master ~]# kubectl exec -it pc-deployment-66cb59b984-8p84h -n dev /bin/sh
/ # cat /etc/resolv.conf
nameserver 10.96.0.10
search dev.svc.cluster.local svc.cluster.local cluster.local

[root@master ~]# dig @10.96.0.10 service-headliness.dev.svc.cluster.local
service-headliness.dev.svc.cluster.local. 30 IN A 10.244.1.40
service-headliness.dev.svc.cluster.local. 30 IN A 10.244.1.39
service-headliness.dev.svc.cluster.local. 30 IN A 10.244.2.33
```

#### 3.4 NodePort类型的Service

在之前的样例中，创建的Service的ip地址只有集群内部才可以访问，如果希望将Service暴露给集群外部使用，那么就要使用到另外一种类型的Service，称为NodePort类型。NodePort的工作原理其实就是将service的端口映射到Node的一个端口上，然后就可以通过NodeIp:NodePort来访问service了。
![](图片\NodePort.png)

创建service-nodeport.yaml

```
apiVersion: v1
kind: Service
metadata:
  name: service-nodeport
  namespace: dev
spec:
  selector:
    app: nginx-pod
  type: NodePort # service类型
  ports:
  - port: 80
    nodePort: 30002 # 指定绑定的node的端口(默认的取值范围是：30000-32767), 如果不指定，会默认分配
    targetPort: 80
```

```
# 创建service
[root@master ~]# kubectl create -f service-nodeport.yaml
service/service-nodeport created

# 查看service
[root@master ~]# kubectl get svc -n dev -o wide
NAME               TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)       SELECTOR
service-nodeport   NodePort   10.105.64.191   <none>        80:30002/TCP  app=nginx-pod

# 接下来可以通过电脑主机的浏览器去访问集群中任意一个nodeip的30002端口，即可访问到pod
```

#### 3.5 LoadBalancer类型的Service

 LoadBalancer和NodePort很相似，目的都是向外部暴露一个端口，区别在于LoadBalancer会在集群的外部再来做一个负载均衡设备，而这个设备需要外部环境支持的，外部服务发送到这个设备上的请求，会被设备负载之后转发到集群中。

![](图片\LoadBalancer.png)

#### 3.6 ExternalName类型的Service

 ExternalName类型的Service用于引入集群外部的服务，它通过`externalName`属性指定外部一个服务的地址，然后在集群内部访问此service就可以访问到外部的服务了。

![](图片\ExternalName.png)

```
apiVersion: v1
kind: Service
metadata:
  name: service-externalname
  namespace: dev
spec:
  type: ExternalName # service类型
  externalName: www.baidu.com
```

```
# 创建service
[root@master ~]# kubectl  create -f service-externalname.yaml
service/service-externalname created

# 域名解析
[root@master ~]# dig @10.96.0.10 service-externalname.dev.svc.cluster.local
service-externalname.dev.svc.cluster.local. 30 IN CNAME www.baidu.com.
www.baidu.com.          30      IN      CNAME   www.a.shifen.com.
www.a.shifen.com.       30      IN      A       39.156.66.18
www.a.shifen.com.       30      IN      A       39.156.66.14
```

### 4.port、nodePort、targetPort概念的区分

#### 4.1 三种类型端口所应用的位置不同

```
port是service端口，即k8s中服务之间的访问端口

targetport是pod（也就是容器）的端口

nodeport是容器所在node节点的端口，即外部机器可访问的端口。（通过nodeport类型的service暴露给集群节点）
```

#### 4.2 三种类型端口的作用不同

- port

port的主要作用是集群内其他pod访问本pod时，需要一个port，如[nginx](https://so.csdn.net/so/search?q=nginx&spm=1001.2101.3001.7020)的pod访问mysql的pod，那么mysql的pod的service可以如下定义：

```
apiVersion: v1
kind: Service
metadata:
  name: mysql-service
spec:
  ports:
  - port: 33306
    targetPort: 3306
  selector:
   name: mysql-pod
```

由此可以这样理解，port是service的port，nginx访问service的3306端口。

- targetport

```
容器的端口（最根本的端口入口），与制作容器时暴露的端口一致（DockerFile中EXPOSE）。

targetport是pod暴露出来的端口，当nginx的一个请求到达service的33306端口时，service就会根据selector中的name，把此请求转发到mysql-pod这个pod的3306端口上。
```

- nodeport

nodeport就很好理解了，它是集群外客户端访问集群内服务时所访问的端口，比如客户访问下面的集群中的nginx，就是这样的方式。

```
apiVersion: v1 
kind: Service 
metadata: 
  name: nginx-service 
spec: 
  type: NodePort      # 有配置NodePort，外部流量可访问k8s中的服务 
  ports: 
  - port: 30080       # 服务访问端口 
    targetPort: 80    # 容器端口 
    nodePort: 30001   # NodePort 
  selector: 
    name: nginx-pod 
```

#### 4.3 总结

```
port：service暴露在cluster ip上的端口，clusterIP:port 是提供给集群内部客户访问service的入口
nodePort：首先，nodePort是kubernetes提供给集群外部客户访问service入口的一种方式（另一种方式是LoadBalancer），所以，nodeIP:nodePort 是提供给集群外部客户访问service的入口
targetPort：targetPort是pod上的端口。从port和nodePort上来的数据，经过kube-proxy流入到后端pod上的targetPort，最终进入容器
port、nodePort：总的来说，port和nodePort都是service的端口，前者暴露给集群内客户访问服务，后者暴露给集群外客户访问服务。从这两个端口到来的数据都需要经过反向代理kube-proxy流入后端pod的targetPod，从而到达pod中的容器
```

### 5. metallb的安装部署(负载均衡器)

#### 5.1 Metallb基本原理

![](图片\metallb基本原理.png)

- 将地址池分配给指定的服务分配
- 将地址广播或者BGP 的方式进行地址的广播

```
MetalLB为不在受支持的云提供商上运行的 Kubernetes 集群提供网络负载均衡器实现，有效地允许在任何集群中使用 LoadBalancer 服务。

MetalLB 需要一个 IP 地址池才能获得ingress-nginx服务的所有权。该池可以在config与 MetalLB 控制器位于同一命名空间的 ConfigMap 中定义。这个 IP 池必须专供 MetalLB 使用，您不能重复使用 Kubernetes 节点 IP 或 DHCP 服务器分发的 IP。
```

#### 5.2 安装metallb

```
官方安装文档：https://metallb.universe.tf/installation/
```

```
安装命令：kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.14.5/config/manifests/metallb-native.yaml
```

#### 5.3 配置metallb

```
官方配置文档：https://metallb.universe.tf/configuration/_advanced_l2_configuration/
```

```
将如下配置保存为 metallb-config.yaml 文件并执行:kubectl apply -f metallb-config.yaml，
其中的name和addresses需要根据自己的实际情况进行修改。
```

```

apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: metallb-ippool
  namespace: metallb-system
spec:
  addresses:
   #使用自己集群的网络切记，IP 地址范围需要跟集群实际情况相对应。要不还会出现pending
  - 10.16.123.20-10.16.123.60 
---
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: metallb-adver
  namespace: metallb-system
spec:
  ipAddressPools:
  - metallb-ippool
```

#### 5.4 验证metallb

```
将service的的type 从ClusterIP 更改为 LoadBalancer 。然后再看看服务的EXTERNAL-IP 这里一列是否有新分配一个IP。
```

```
kubectl expose deployment hello-world --type=LoadBalancer --name=my-service

//执行命令查看
kubectl get service my-service
NAME         TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
my-service   LoadBalancer   10.104.156.116   10.16.123.20  8080:32586/TCP   131m
```

访问http://10.16.123.20:8080,可以正常访问