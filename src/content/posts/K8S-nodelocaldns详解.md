---
title: k8s-nodelocaldns详解
slug: K8S-nodelocaldns详解
published: 2026-09-01
description: 获取文件将文件保存为nodelocaldns.yaml
image: '../../assets/images/Dota-img/meepo.png'
tags:
  - kubernetes
category: 云原生
draft: false
lang: zh-CN
pinned: false
comment: true
---
### 一、NodeLocal DNS是什么？

```
 NodeLocal DNSCache 通过在集群节点上运行一个 DaemonSet 来提高 clusterDNS 性能和可靠性。处于 ClusterFirst 的 DNS 模式下的 Pod 可以连接到 kube-dns 的 serviceIP 进行 DNS 查询。通过 kube-proxy 组件添加的 iptables 规则将其转换为 CoreDNS 端点。通过在每个集群节点上运行 DNS 缓存，NodeLocal DNSCache 可以缩短 DNS 查找的延迟时间、使 DNS 查找时间更加一致，以及减少发送到 kube-dns 的 DNS 查询次数。
借助这种新架构，Pod 将可以访问在同一节点上运行的 DNS 缓存代理，从而避免 iptables DNAT 规则和连接跟踪。 本地缓存代理将查询 kube-dns 服务以获取集群主机名的缓存缺失（默认为 "cluster.local" 后缀）。
```

### 二、为什么使用NodeLocal DNS？

```
使用当前的 DNS 体系结构，如果没有本地 kube-dns/CoreDNS 实例，则具有最高 DNS QPS 的 Pod 可能必须延伸到另一个节点。 在这种场景下，拥有本地缓存将有助于改善延迟。

跳过 iptables DNAT 和连接跟踪将有助于减少 conntrack 竞争并避免 UDP DNS 条目填满 conntrack 表。

从本地缓存代理到 kube-dns 服务的连接可以升级为 TCP。 TCP conntrack 条目将在连接关闭时被删除，相反 UDP 条目必须超时 （默认 nf_conntrack_udp_timeout 是 30 秒）。

将 DNS 查询从 UDP 升级到 TCP 将减少由于被丢弃的 UDP 包和 DNS 超时而带来的尾部等待时间； 这类延时通常长达 30 秒（3 次重试 + 10 秒超时）。 由于 nodelocal 缓存监听 UDP DNS 查询，应用不需要变更。

在节点级别对 DNS 请求的度量和可见性。

可以重新启用负缓存，从而减少对 kube-dns 服务的查询数量。

避免IPVS缺陷导致的DNS概率性解析超时问题

默认解析使用UDP，UDP默认返回报文长度为512字节，大于512字节后就会将包丢弃，升级为TCP协议可以解决这个问题。TCP可以进行数据包的切片可以完整的得到返回的response
```

### 三、工作原理

![](/images/posts/NodeLocal DNS.png)

```
配置了NodeLocal DNS本地缓存的Pod，默认会通过NodeLocal DNSCache监听于节点上的IP（169.254.20.10）解析域名。

NodeLocal DNSCache本地若无缓存应答解析请求，则会通过kube-dns服务请求CoreDNS进行解析

CoreDNS对于非集群内域名，会通过VPC DNS服务器进行解析

已注入DNS本地缓存的Pod，当无法连通NodeLocal DNSCache时，会继而直接通过kube-dns服务连接到CoreDNS进行解析，此链路为备用链路

未注入DNS本地缓存的Pod，会通过标准的kube-dns服务链路连接到CoreDNS进行解析
```

### 四、安装NodeLocal DNS

#### 1、获取资源清单

获取文件将文件保存为nodelocaldns.yaml

```
wget https://github.com/kubernetes/kubernetes/blob/master/cluster/addons/dns/nodelocaldns/nodelocaldns.yaml
```

#### 2、IPv6配置

```
如果使用 IPv6，在使用 'IP:Port' 格式的时候需要把 CoreDNS 配置文件里的所有 IPv6 地址用方括号包起来。 如果你使用上述的示例清单， 需要把配置行 L70 修改为： "health [__PILLAR__LOCAL__DNS__]:8080"。
```

#### 3、资源清单调整

```
获取coredns的IP
kubedns=`kubectl get svc coredns -n kube-system -o jsonpath={.spec.clusterIP}`
 
# 表示集群域，默认就是 cluster.local
domain=cluster.local
 
# 表示 DNSCache 本地的 IP，默认为169.254.20.10
localdns=169.254.20.10
 
<cluster-domain> 的默认值是 "cluster.local"。
<localdns> 是 NodeLocal DNSCache 选择的本地侦听 IP 地址。
```

确认下当前kube-proxy组件使用的模式是什么？

```
[root@master1 NodeLocalDnsCache]#kubectl get cm kube-proxy -nkube-system -oyaml|grep mode
    mode: ipvs
```

如果 kube-proxy 运行在 [IPTABLES](https://so.csdn.net/so/search?q=IPTABLES&spm=1001.2101.3001.7020) 模式：

```
sed -i "s/__PILLAR__LOCAL__DNS__/$localdns/g; s/__PILLAR__DNS__DOMAIN__/$domain/g; s/__PILLAR__DNS__SERVER__/$kubedns/g" nodelocaldns.yaml
```

```
node-local-dns Pod 会设置 __PILLAR__CLUSTER__DNS__ 和 __PILLAR__UPSTREAM__SERVERS__。 在此模式下, node-local-dns Pod 会同时侦听 kube-dns 服务的 IP 地址和 <node-local-address> 的地址，以便 Pod 可以使用其中任何一个 IP 地址来查询 DNS 记录。
```

如果 kube-proxy 运行在 IPVS 模式：

```
sed -i "s/__PILLAR__LOCAL__DNS__/$localdns/g; s/__PILLAR__DNS__DOMAIN__/$domain/g; s/,__PILLAR__DNS__SERVER__//g; s/__PILLAR__CLUSTER__DNS__/$kubedns/g" nodelocaldns.yaml
```

```
在此模式下，node-local-dns Pod 只会侦听 <node-local-address> 的地址。 node-local-dns 接口不能绑定 kube-dns 的集群 IP 地址，因为 IPVS 负载均衡使用的接口已经占用了该地址。 node-local-dns Pod 会设置 __PILLAR__UPSTREAM__SERVERS__
```

```
__PILLAR__DNS__SERVER__ ：表示 kube-dns 这个 Service 的 ClusterIP，可以通过命令 kubectl get svc -n kube-system | grep kube-dns | awk'{ print $3 }' 获取（我们这里就是 10.96.0.10）

__PILLAR__LOCAL__DNS__：表示 DNSCache 本地监听的 IP 地址，该地址可以是任何地址，只要该地址不和你的集群里现有的 IP 地址发生冲突。 推荐使用本地范围内的地址，例如 IPv4 链路本地区段 169.254.0.0/16 内的地址（默认一般取 169.254.20.10 即可），或者 IPv6 唯一本地地址区段 fd00::/8内的地址

__PILLAR__DNS__DOMAIN__：表示集群域，默认就是 cluster.local

另外还有两个参数 __PILLAR__CLUSTER__DNS__ 和 __PILLAR__UPSTREAM__SERVERS__，这两个参数会进行自动配置，对应的值来源于 kube-dns 的 ConfigMap 和定制的 Upstream Server 配置。
```

#### 4、将NodeLocalDNS 部署集群

```
1. 如果是线上集群，推荐不要直接apply 文件，采用灰度的方式部署。我们可以在yaml中增加配置如下
 
    spec:
      nodeSelector:
        nodelocaldns: "true"
 
2. 挑选集群的一些机器打上nodelocaldns=true的标签
for i in `cat 1.txt`; do kubectl  label node $i nodelocaldns=true;done
 
3. apply 文件
kubectl apply -f nodelocaldns.yaml 
 
4. 这个时候我们需要进入到pod内验证服务是否有异常 （这些打了标签的node 上面的pod）
验证方式：
   1） pod内是否可以解析外网域名（前提条件 node节点可以访问域名）
   2） pod内解析内网域名
   2） pod内解析集群service name
如果都没有问题，说明部署NodeLocalDNS后并没有影响我们集群现有的服务
 
5. 将yaml中NodeSelect 配置注释，重新apply 
kubectl apply -f nodelocaldns.yaml 
 
6. 查看kube-system 命名空间下的node-local-dns pod
kubectl  get pod -n kube-system | grep node-local
```

### 五、在应用中使用NodeLocal DNSCache

为了能使应用原本请求CoreDNS的流量改为由DNS缓存DaemonSet代理，需要使Pod内部的中nameservers配置成169.254.20.10和kube-dns对应的IP地址，您有以下几种方式可以选择：

```
方式一：借助DNSConfig动态注入控制器在Pod创建时配置DNSConfig自动注入。

方式二：创建Pod时手动指定DNSConfig。

方式三：修改kubelet参数，并重启节点kubelet。存在业务中断风险，不推荐使用此方式。
```

第一种方式：

```
需要集群具备adminssion webhook功能，或者可以使用第三方的一些插件完成部署

adminssion webhook：基于Admission Webhook机制拦截Pod创建的请求，自动注入使用DNS缓存的Pod DNSConfig信息。
```

第二种方式：

在新部署的 Pod 中通过 dnsConfig 配置使用新的 localdns 的地址来进行解析。

```
#test-node-local-dns-2.yaml
apiVersion: v1
kind: Pod
metadata:
  name: test-node-local-dns-2
spec:
  dnsPolicy: None #None的时候需要配置下面的dnsConfig
  dnsConfig:
    nameservers: # 如果dnsPolicy不等于None，则会将nameservers合并到原有的（dnsPolicy默认是ClusterFirst）
      - 169.254.20.10
    searches:
      - default.svc.cluster.local
      - svc.cluster.local
      - cluster.local
    options:
      - name: ndots
        value: "5"
  containers:
    - name: test
      image: cnych/jessie-dnsutils:1.3
      command:
        - sleep
        - "infinity"
      imagePullPolicy: IfNotPresent
```

第三种方式：

**不建议使用尤其是生产环境禁止使用**

```
#修改 kubelet 的 --cluster-dns 参数

#kubeadm
sed -i 's/10.96.0.10/169.254.20.10/g' /var/lib/kubelet/config.yaml
systemctl daemon-reload && systemctl restart kubelet

#二进制
sed -i 's/10.96.0.10/169.254.20.10/g' /etc/kubernetes/kubelet-conf.yml
systemctl daemon-reload && systemctl restart kubelet

注意：all节点均要配置。
注意：**iptables 模式下 Pod 还是向原来的集群 DNS 请求，节点上有这个 IP 监听，会被本机拦截，再请求集群上游 DNS，所以不需要更改 **--cluster-dns参数。
```

### 六、验证

上面说到由于我们是使用的第二种方式，需要重新发布才可以生效。下图是发布后pod内部的状况,可以看到我们的pod内有两行nameserver信息第一行为NodeLocalDNS的IP，第二行是coreDNS的IP。

```
[root@k8s-master1 ~]#kubectl exec -it test-node-local-dns-2 -- bash
root@test-node-local-dns-2:/# cat /etc/resolv.conf
nameserver 169.254.20.10
search default.svc.cluster.local svc.cluster.local cluster.local
options ndots:5



root@test-node-local-dns-2:/# nslookup youdianzhishi.com
Server:		169.254.20.10
Address:	169.254.20.10#53

Non-authoritative answer:
Name:	youdianzhishi.com
Address: 39.106.22.102

root@test-node-local-dns-2:/# nslookup kubernetes.default
Server:		169.254.20.10
Address:	169.254.20.10#53

Name:	kubernetes.default.svc.cluster.local
Address: 10.96.0.1

root@test-node-local-dns-2:/# 
```

验证方式：
  1） pod内是否可以解析外网域名（前提条件 node节点可以访问域名）
  2） pod内解析内网域名
  2） pod内解析集群service name

**样例**

nodelocaldns.yaml

```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: node-local-dns
  namespace: kube-system
  labels:
    kubernetes.io/cluster-service: "true"
    addonmanager.kubernetes.io/mode: Reconcile
---
apiVersion: v1
kind: Service
metadata:
  name: kube-dns-upstream
  namespace: kube-system
  labels:
    k8s-app: kube-dns
    kubernetes.io/cluster-service: "true"
    addonmanager.kubernetes.io/mode: Reconcile
    kubernetes.io/name: "KubeDNSUpstream"
spec:
  ports:
  - name: dns
    port: 53
    protocol: UDP
    targetPort: 53
  - name: dns-tcp
    port: 53
    protocol: TCP
    targetPort: 53
  selector:
    k8s-app: coredns
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: node-local-dns
  namespace: kube-system
  labels:
    addonmanager.kubernetes.io/mode: Reconcile
data:
  Corefile: |
    cluster.local:53 {
        errors
        cache {
                success 9984 30
                denial 9984 5
        }
        reload
        loop
        bind 169.254.20.10 __PILLAR__DNS__SERVER__
        forward . 10.11.128.10 {
                force_tcp
        }
        prometheus :9253
        health 169.254.20.10:8080
        }
    in-addr.arpa:53 {
        errors
        cache 30
        reload
        loop
        bind 169.254.20.10 __PILLAR__DNS__SERVER__
        forward . 10.11.128.10 {
                force_tcp
        }
        prometheus :9253
        }
    ip6.arpa:53 {
        errors
        cache 30
        reload
        loop
        bind 169.254.20.10 __PILLAR__DNS__SERVER__
        forward . 10.11.128.10 {
                force_tcp
        }
        prometheus :9253
        }
    .:53 {
        errors
        cache 30
        reload
        loop
        bind 169.254.20.10 __PILLAR__DNS__SERVER__
        forward . __PILLAR__UPSTREAM__SERVERS__ {
               force_tcp
        }
        prometheus :9253
        }
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: node-local-dns
  namespace: kube-system
  labels:
    k8s-app: node-local-dns
    kubernetes.io/cluster-service: "true"
    addonmanager.kubernetes.io/mode: Reconcile
spec:
  updateStrategy:
    rollingUpdate:
      maxUnavailable: 10%
  selector:
    matchLabels:
      k8s-app: node-local-dns
  template:
    metadata:
      labels:
        k8s-app: node-local-dns
      annotations:
        prometheus.io/port: "9253"
        prometheus.io/scrape: "true"
    spec:
      priorityClassName: system-node-critical
      serviceAccountName: node-local-dns
      hostNetwork: true
      dnsPolicy: Default  # Don't use cluster DNS.
      tolerations:
      - key: "CriticalAddonsOnly"
        operator: "Exists"
      - effect: "NoExecute"
        operator: "Exists"
      - effect: "NoSchedule"
        operator: "Exists"
      containers:
      - name: node-cache
        image: hub.kce.ksyun.com/ksyun/k8s-dns-node-cache:1.22.8
        resources:
          requests:
            cpu: 25m
            memory: 5Mi
        args: [ "-localip", "169.254.20.10", "-conf", "/etc/Corefile", "-upstreamsvc", "kube-dns-upstream" ]
        securityContext:
          privileged: true
        ports:
        - containerPort: 53
          name: dns
          protocol: UDP
        - containerPort: 53
          name: dns-tcp
          protocol: TCP
        - containerPort: 9253
          name: metrics
          protocol: TCP
        livenessProbe:
          httpGet:
            host: 169.254.20.10
            path: /health
            port: 8080
          initialDelaySeconds: 60
          timeoutSeconds: 5
        volumeMounts:
        - mountPath: /run/xtables.lock
          name: xtables-lock
          readOnly: false
        - name: config-volume
          mountPath: /etc/coredns
        - name: kube-dns-config
          mountPath: /etc/kube-dns
      volumes:
      - name: xtables-lock
        hostPath:
          path: /run/xtables.lock
          type: FileOrCreate
      - name: kube-dns-config
        configMap:
          name: coredns
          optional: true
      - name: config-volume
        configMap:
          name: node-local-dns
          items:
            - key: Corefile
              path: Corefile.base
---
# A headless service is a service with a service IP but instead of load-balancing it will return the IPs of our associated Pods.
# We use this to expose metrics to Prometheus.
apiVersion: v1
kind: Service
metadata:
  annotations:
    prometheus.io/port: "9253"
    prometheus.io/scrape: "true"
  labels:
    k8s-app: node-local-dns
  name: node-local-dns
  namespace: kube-system
spec:
  clusterIP: None
  ports:
    - name: metrics
      port: 9253
      targetPort: 9253
  selector:
    k8s-app: node-local-dns
```

