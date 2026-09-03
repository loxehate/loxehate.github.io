---
title: k8s-node管理
slug: k8s-node管理
published: 2026-09-01
description: 把master上的管理文件 /etc/kubernetes/admin.conf 拷贝到node节点的 $HOME/.kube/config 就可以让node节点也可以实现kubectl命令管理
image: '/images/posts/调度计算.png'
tags:
  - kubernetes
category: 云原生
draft: false
lang: zh-CN
pinned: false
comment: true
---
### 一、查看集群信息

```
[root@k8s-master01 ~]# kubectl cluster-info
Kubernetes control plane is running at https://192.168.10.100:6443
CoreDNS is running at https://192.168.10.100:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

### 二、查看节点信息

#### 2.1 查看集群节点信息

```
[root@k8s-master01 ~]# kubectl get nodes
NAME           STATUS   ROLES    AGE   VERSION
k8s-master01   Ready    <none>   36d   v1.21.10
k8s-master02   Ready    <none>   36d   v1.21.10
k8s-master03   Ready    <none>   36d   v1.21.10
k8s-worker02   Ready    <none>   36d   v1.21.10
```

#### 2.2 查看集群节点详细信息

```
[root@k8s-master01 ~]# kubectl get nodes -owide
NAME           STATUS   ROLES    AGE   VERSION    INTERNAL-IP      EXTERNAL-IP   OS-IMAGE                KERNEL-VERSION              CONTAINER-RUNTIME
k8s-master01   Ready    <none>   36d   v1.21.10   192.168.10.101   <none>        CentOS Linux 7 (Core)   6.1.0-1.el7.elrepo.x86_64   docker://20.10.22
k8s-master02   Ready    <none>   36d   v1.21.10   192.168.10.102   <none>        CentOS Linux 7 (Core)   6.1.0-1.el7.elrepo.x86_64   docker://20.10.22
k8s-master03   Ready    <none>   36d   v1.21.10   192.168.10.103   <none>        CentOS Linux 7 (Core)   6.1.0-1.el7.elrepo.x86_64   docker://20.10.22
k8s-worker02   Ready    <none>   36d   v1.21.10   192.168.10.104   <none>        CentOS Linux 7 (Core)   6.1.1-1.el7.elrepo.x86_64   docker://20.10.22
```

#### 2.3 查看节点描述详细信息

```
[root@k8s-master01 ~]# kubectl describe nodes k8s-master01
Name:               k8s-master01
Roles:              <none>
Labels:             beta.kubernetes.io/arch=amd64
                    beta.kubernetes.io/os=linux
                    kubernetes.io/arch=amd64
                    kubernetes.io/hostname=k8s-master01
                    kubernetes.io/os=linux
Annotations:        node.alpha.kubernetes.io/ttl: 0
                    projectcalico.org/IPv4Address: 192.168.10.101/24
                    projectcalico.org/IPv4IPIPTunnelAddr: 10.244.32.128
                    volumes.kubernetes.io/controller-managed-attach-detach: true
CreationTimestamp:  Sat, 24 Dec 2022 23:45:43 +0800
Taints:             <none>
Unschedulable:      false
Lease:
  HolderIdentity:  k8s-master01
  AcquireTime:     <unset>
  RenewTime:       Mon, 30 Jan 2023 11:03:00 +0800
Conditions:
  Type                 Status  LastHeartbeatTime                 LastTransitionTime                Reason                       Message
  ----                 ------  -----------------                 ------------------                ------                       -------
  NetworkUnavailable   False   Sun, 29 Jan 2023 10:12:40 +0800   Sun, 29 Jan 2023 10:12:40 +0800   CalicoIsUp                   Calico is running on this node
  MemoryPressure       False   Mon, 30 Jan 2023 11:00:34 +0800   Sat, 24 Dec 2022 23:45:42 +0800   KubeletHasSufficientMemory   kubelet has sufficient memory available
  DiskPressure         False   Mon, 30 Jan 2023 11:00:34 +0800   Sat, 24 Dec 2022 23:45:42 +0800   KubeletHasNoDiskPressure     kubelet has no disk pressure
  PIDPressure          False   Mon, 30 Jan 2023 11:00:34 +0800   Sat, 24 Dec 2022 23:45:42 +0800   KubeletHasSufficientPID      kubelet has sufficient PID available
  Ready                True    Mon, 30 Jan 2023 11:00:34 +0800   Sun, 25 Dec 2022 00:06:35 +0800   KubeletReady                 kubelet is posting ready status
Addresses:
  InternalIP:  192.168.10.101
  Hostname:    k8s-master01
Capacity:
  cpu:                2
  ephemeral-storage:  19466Mi
  hugepages-1Gi:      0
  hugepages-2Mi:      0
  memory:             3995080Ki
  pods:               110
Allocatable:
  cpu:                2
  ephemeral-storage:  18370422344
  hugepages-1Gi:      0
  hugepages-2Mi:      0
  memory:             3892680Ki
  pods:               110
System Info:
  Machine ID:                 0e0a3ea7d11c4165b5eb28435792ad47
  System UUID:                d3794d56-6573-8633-b1d0-456a80d8ee9a
  Boot ID:                    09607e08-716a-4834-847b-534c12d3e5de
  Kernel Version:             6.1.0-1.el7.elrepo.x86_64
  OS Image:                   CentOS Linux 7 (Core)
  Operating System:           linux
  Architecture:               amd64
  Container Runtime Version:  docker://20.10.22
  Kubelet Version:            v1.21.10
  Kube-Proxy Version:         v1.21.10
PodCIDR:                      10.244.0.0/24
PodCIDRs:                     10.244.0.0/24
Non-terminated Pods:          (2 in total)
  Namespace                   Name                                         CPU Requests  CPU Limits  Memory Requests  Memory Limits  Age
  ---------                   ----                                         ------------  ----------  ---------------  -------------  ---
  kube-system                 calico-node-d5qw7                            250m (12%)    0 (0%)      0 (0%)           0 (0%)         36d
  kubernetes-dashboard        dashboard-metrics-scraper-c45b7869d-9c8jj    0 (0%)        0 (0%)      0 (0%)           0 (0%)         35d
Allocated resources:
  (Total limits may be over 100 percent, i.e., overcommitted.)
  Resource           Requests    Limits
  --------           --------    ------
  cpu                250m (12%)  0 (0%)
  memory             0 (0%)      0 (0%)
  ephemeral-storage  0 (0%)      0 (0%)
  hugepages-1Gi      0 (0%)      0 (0%)
  hugepages-2Mi      0 (0%)      0 (0%)
Events:              <none>
```

### 三、worker node节点管理集群

- **如果是kubeasz安装，所有节点(包括master与node)都已经可以对集群进行管理**
- 如果是kubeadm安装，在node节点上管理时会报如下错误

```
[root@k8s-worker1 ~]# kubectl get nodes
The connection to the server localhost:8080 was refused - did you specify the right host or port?
```

把master上的管理文件`/etc/kubernetes/admin.conf`拷贝到node节点的`$HOME/.kube/config`就可以让node节点也可以实现[kubectl](https://so.csdn.net/so/search?q=kubectl&spm=1001.2101.3001.7020)命令管理

在node节点的用户家目录创建`.kube`目录

```
[root@k8s-worker02 ~]# mkdir /root/.kube
```

在master节点做如下操作

```
[root@k8s-worker02 ~]# scp /etc/kubernetes/admin.conf node1:/root/.kube/config
```

在worker node节点验证

```
[root@k8s-worker02 ~]# kubectl get nodes
NAME          STATUS   ROLES    AGE     VERSION
k8s-master01   Ready    <none>   2d20h   v1.21.10
k8s-master02   Ready    <none>   2d20h   v1.21.10
k8s-master03   Ready    <none>   2d20h   v1.21.10
k8s-worker02   Ready    <none>   2d20h   v1.21.10
```

### 四、节点标签(label)

- k8s集群如果由大量节点组成，可将节点打上对应的标签，然后通过标签进行筛选及查看,更好的进行资源对象的相关选择与匹配

#### 4.1 查看节点标签信息

```
[root@k8s-master01 ~]# kubectl get nodes --show-labels 
NAME           STATUS   ROLES    AGE   VERSION    LABELS
k8s-master01   Ready    <none>   36d   v1.21.10   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=k8s-master01,kubernetes.io/os=linux
k8s-master02   Ready    <none>   36d   v1.21.10   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,env=test1,kubernetes.io/arch=amd64,kubernetes.io/hostname=k8s-master02,kubernetes.io/os=linux
k8s-master03   Ready    <none>   36d   v1.21.10   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,bussiness=ad,env=test2,kubernetes.io/arch=amd64,kubernetes.io/hostname=k8s-master03,kubernetes.io/os=linux,zone=A
k8s-worker02   Ready    <none>   36d   v1.21.10   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=k8s-worker02,kubernetes.io/os=linux
```

#### 4.2 设置节点标签信息

##### 4.2.1 设置节点标签

为节点`k8s-worker1`打一个`region=huanai` 的标签

```
[root@k8s-master01 ~]# kubectl label node k8s-worker01 region=huanai
node/k8s-worker01 labeled
```

##### 4.2.2 查看所有节点带region的标签

```
[root@k8s-master01 ~]# kubectl get nodes -L region
NAME          STATUS   ROLES    AGE     VERSION    REGION
k8s-master01   Ready    <none>   2d21h   v1.21.10
k8s-master02   Ready    <none>   2d21h   v1.21.10
k8s-master03   Ready    <none>   2d21h   v1.21.10
k8s-worker02   Ready    <none>   2d21h   v1.21.10   huanai
```

#### 4.3 多维度标签

##### 4.3.1 设置多维度标签

也可以加其它的多维度标签，用于不同的需要区分的场景

如把`k8s-master03`标签为华南区，A机房，测试环境，游戏业务

```
[root@k8s-master01 ~]# kubectl label node k8s-master03 zone=A env=test bussiness=game
node/k8s-master03 labeled
```

```
[root@k8s-master01 ~]# kubectl get nodes k8s-master03 --show-labels
NAME          STATUS   ROLES    AGE     VERSION    LABELS
k8s-master03   Ready    <none>   2d21h   v1.21.10   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,bussiness=game,env=test,kubernetes.io/arch=amd64,kubernetes.io/hostname=k8s-master03,kubernetes.io/os=linux,zone=A
```

##### 4.3.2 显示节点的相应标签

```
[root@k8s-master01 ~]# kubectl get nodes -L region,zone
NAME          STATUS   ROLES    AGE     VERSION    REGION   ZONE
k8s-master01   Ready    <none>   2d21h   v1.21.10
k8s-master02   Ready    <none>   2d21h   v1.21.10
k8s-master03   Ready    <none>   2d21h   v1.21.10            A
k8s-worker02   Ready    <none>   2d21h   v1.21.10   huanai
```

##### 4.3.3 查找`region=huanai`的节点

```
[root@k8s-master01 ~]# kubectl get nodes -l region=huanai
NAME          STATUS   ROLES    AGE     VERSION
k8s-worker02  Ready    <none>   2d21h   v1.21.10
```

##### 4.3.4 标签的修改

```
[root@k8s-master01 ~]# kubectl label node k8s-master03 bussiness=ad --overwrite=true
node/k8s-master03 labeled
加上--overwrite=true覆盖原标签的value进行修改操作
```

```
[root@k8s-master01 ~]# kubectl get nodes -L bussiness
NAME          STATUS   ROLES    AGE     VERSION    BUSSINESS
k8s-master01   Ready    <none>   2d21h   v1.21.10
k8s-master02   Ready    <none>   2d21h   v1.21.10
k8s-master03   Ready    <none>   2d21h   v1.21.10   ad
k8s-worker02   Ready    <none>   2d21h   v1.21.10
```

##### 4.3.5 标签的删除

使用key加一个减号的写法来取消标签

```
[root@k8s-master02 ~]# kubectl label node k8s-worker02 region-
node/k8s-worker02 labeled
```

##### 4.3.6 标签选择器

标签选择器主要有2类:

- 等值关系: =, !=
- 集合关系: KEY in {VALUE1, VALUE2…}

```
[root@k8s-master01 ~]# kubectl label node k8s-master02 env=test1
node/k8s-master02 labeled
[root@k8s-master01 ~]# kubectl label node k8s-master03 env=test2
node/k8s-master03 labeled
```

```
[root@k8s-master01 ~]# kubectl get node -l "env in(test1,test2)"
NAME          STATUS   ROLES    AGE     VERSION
k8s-master02   Ready    <none>   2d21h   v1.21.10
k8s-master03   Ready    <none>   2d21h   v1.21.10
```

##### 4.3.7 标签roles设置

```
kubectl get nodes
kubectl label node k8s-node01(节点名称) node-role.kubernetes.io/worker=worker
kubectl label node master1 node-role.kubernetes.io/master1=master1
```

#### 4.4 node标签选择器

```
如果同时指定了 nodeSelector 和 nodeAffinity，两者必须都要满足， 才能将 Pod 调度到候选节点上。
如果指定了多个与 nodeAffinity 类型关联的 nodeSelectorTerms，满足一个 nodeSelectorTerms ，pod将可以调度到节点上。
指定了多个与 nodeSelectorTerms 关联的 matchExpressions，满足所有 matchExpressions ，Pod 才会可以调度到节点上。
由于IgnoredDuringExecution,改变labels不会影响已运行的pod.
```

##### 4.4.1 nodeSelector

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  # 选择node标签为disktype=ssd的node  
  nodeSelector:
    disktype: ssd
```

### 五、Node亲和性调度affinity

`requiredDuringSchedulingIgnoredDuringExecution`: 硬策略/硬需求–必须满足
`preferredDuringSchedulingIgnoredDuringExecution`: 软策略/软需求–尽量满足

```
支持的操作符有:
In , 包含
NotIn , 不包含,一般用来做反亲和(Anti-Affinity)
Exists , 存在
DoesNotExist ,不存在
Gt , (greater than), label 的值大于某个值,int类型
Lt , (less than),label 的值小于某个值,int类型
```

```
name in（ redis-master， redis-salve）# 匹配所有带有标签name=master或者name=salve的资源

name not in （ php）#匹配所有不具有标签name=php的资源对象
```

#### 5.1 亲和度示例yaml

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp
  labels:
    name: myapp
spec:
# 亲和性
  affinity:
    # 节点亲和度
    nodeAffinity:
      # 硬策略/硬需求
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
              # 匹配所有带有标签disktype=ssd或者disktype=shd的资源
              - key: disktype
                operator: In
                values:
                  - ssd
                  - shd
      # 软策略/软需求(尽量匹配标签的资源,不满足时会找其他的资源)
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 1  # 权重值/(加分项,1-100,100是最高分),能提高匹配概率,不用太关注
          preference:  # 固定语法,意为偏爱
            matchExpressions:
              # 尽可能匹配标签为disktye=ssd2的资源
              - key: disktype
                operator: In
                values:
                  - ssd2
  containers:
  - name: myapp
    image: <Image>
    resources:
      limits:
        memory: "128Mi"
        cpu: "500m"
    ports:
      - containerPort: <Port>
```

#### 5.2 nodeName

nodeName不会通过调度器,即使node有污点也能直接运行pod.一般用于测试.

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  nodeName: node1 # 让pod运行在指定node上,nodeName不会通过调度器
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
```

#### 5.3 调度计算

![](/images/posts/调度计算.png)

### 六、node污点与容忍

为什么Node要使用污点:

- 安全考虑
- Node职责角色分工不同
- 硬件不同

污点也类似于在node上打一个标签.例如专用节点,比如GPU,SSD等,一般pod不会运行在这种专用节点,如果pod想运行在这种专用节点上,需要配置污点容忍.

Taint: 污点,避免pod调度到特定Node上,相当于排斥Pod
Tolerations: 污点容忍,允许pod调度到带有特定Taints的Node上

#### 6.1 污点容忍yaml示例

```
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
    - name: nginx
      image: nginx
      imagePullPolicy: IfNotPresent
  # 污点容忍
  tolerations:
    # 容忍key=example-key 等effect值存在NoSchedule
    - key: "example-key"
      operator: "Exists"
      # value: "example-value"  # 可不配置
      effect: "NoSchedule"
```

#### 6.2 容忍放大

k8s的一些基础静态pod,比如`apiserver`,配置的就是容忍放大,下方是示例
容忍放大,只要`key`或`effect`存在即容忍.

```
apiVersion: v1
kind: Pod
metadata:
  name: apiserver
  labels:
    env: test
spec:
  containers:
    - name: apiserver
      image: apiserver
      imagePullPolicy: IfNotPresent
  # 污点容忍
  tolerations:
    # 容忍所有effect值为NoSchedule的污点
    - effect: NoSchedule
      operator: Exists
    # 容忍污点key值CriticaAddonsOnly存在
    - key: CriticaAddonsOnly
      operator: Exists
    # 容忍所有effect值为NoExecute的污点
    - effect: NoExecute
      operator: Exists
```

#### 6.3 基于污点的驱逐

```
污点的 effect 值 NoExecute会影响(驱逐)已经在节点上运行的 Pod,如果Pod没有配置容忍 effect 值为 NoExecute 的污点,会被立即驱逐.

Pod配置了容忍NoExecute,但在容忍度定义中没有指定 tolerationSeconds(宽限期)，则 Pod 还会一直在这个节点上运行。

Pod配置了容忍NoExecute,，而且指定了 tolerationSeconds(宽限期)， 则 Pod 还能在这个节点上继续运行这个指定的时间长度。

当节点故障时,节点控制器会自动给节点添加一个(内置)污点.如果异常状态恢复正常，kubelet 或节点控制器能够移除相关的污点。
```

#### 6.4 effect标记值

- `NoSchedule` 不会将 Pod 分配到该节点(不驱逐已运行pod)
- `PreferNoSchedule` 尽量不将 Pod 分配到该节点(不驱逐已运行pod)
- `NoExecute` 不会将 Pod 分配到该节点,还会将 已运行Pod `从该节点驱逐`

添加和删除污点

```
# 添加污点
kubectl taint nodes node名key=value:effect值

## effect是标记值
kubectl taint nodes node1 key1=value1:NoSchedule
kubectl taint nodes node1 key1=value1:NoExecute
kubectl taint nodes node1 key2=value2:PreferNoSchedule

# 去除污点
kubectl taint nodes node名 key:effec值-
## 或 
kubectl taint nodes node名 key=value-
## 建议
kubectl taint nodes node名 key-
```

#### 6.5 设置master尽量不调度

尽量不调度的污点`PreferNoSchedule`,禁止调度并驱逐的污点`NoExecute`

```
# master添加 尽量不调度 PreferNoSchedule 
kubectl taint nodes k8s-master02 node-role.kubernetes.io/master:PreferNoSchedule
```

#### 6.6 允许master节点调度pod

```
# 去除污点NoSchedule，最后一个"-"代表删除污点

# 允许所有master节点调度pod
kubectl taint nodes --all node-role.kubernetes.io/master-

# 允许master2节点调度pod;
kubectl taint nodes k8s-master02 node-role.kubernetes.io/master:NoSchedule-
```

#### 6.7 恢复Master Only状态

```
# 指定master1为Only状态(加污点,不允许pod调度)
kubectl taint node maser1 node-role.kubernetes.io/master="":NoSchedule
```

#### 6.8 将node标记为不可调度状态(节点警戒)

```
# 将node标记为不可调度状态(节点警戒)
kubectl cordon node名
```

#### 6.9 设置node不可用并驱逐节点上的所有pod(腾空节点)

当节点磁盘空间不足时，Pod被驱逐的顺序为: `BestEffort`先于 `Burstable`

```
# 切换到名为ek8s的集群
kubectl config use-context ek8s

# 查看node状态
kubectl get nodes

# 设置节点不可用并驱逐节点上的所有pod(腾空节点)
## 节点排水(驱逐节点上的所有pod)
## 忽略节点上不能杀死的特定系统Pod,例如:CNI插件,daemonSet
## --delete-local-data 清空本地数据
## --ignore-daemonsets 忽略daemonsets错误
## --force 强制执行
kubectl drain ek8s-node-1 --ignore-daemonsets --force # 考试执行
## 如果报错,加--delete-local-data 清空本地数据
kubectl drain ek8s-node-1 --delete-local-data --ignore-daemonsets --force # 练习执行

# 查看node状态
kubectl get nodes

# 查看污点
kubectl describe nodes node名 |grep Taints
# Taints:   node.kubernetes.io/unreachable:NoSchedule
```

#### 6.10 设置node为可用

```
# 标记my-node 节点为可以调度
kubectl uncordon node名

# 取消污点
## 如果已存在具有指定键和效果的污点，则替换其值为指定值。
kubectl taint nodes node名 dedicated=special-user:NoSchedule

# 去除污点NoSchedule，最后一个"-"代表删除
kubectl taint nodes node名 node-role.kubernetes.io/master:NoSchedule-

# 查看污点是否去除
kubectl describe nodes node名 |grep Taints
```

### 七、node调度故障诊断排查

```
# 显示给定节点的度量值                                            
kubectl top node my-node                                             

# 显示主控节点和服务的地址
kubectl cluster-info

# 将当前集群状态转储到标准输出                                                  
kubectl cluster-info dump

# 将当前集群状态输出到 /path/to/cluster-state                                            
kubectl cluster-info dump --output-directory=/path/to/cluster-state   
```

#### 7.1 常见调度失败原因

```
CPU不足
没有匹配到节点标签
所有的节点有污点,但你没有配置污点容忍
```

#### 7.2 pod一直是pending

当Pod处在Pending的时候，可能是由于如下哪个问题造成的。
资源不足，造成无法调度;
Pod尚未进入调度阶段;
Pod正在拉取镜像;
看kubelet日志.

```
# 查看pod详情
kubectl describe po pod名
## 显示pod已经调度到node2,但一直是pending
```

查看node资源是否足够

```
# 查看node资源是否足够
kubectl describe node <node-name>

# 或kubectl top node
```

在返回信息中，请注意关注以下内容：
`Allocatable`：表示此节点能够申请的资源总和。
`Allocated resources`：表示此节点已分配的资源（Allocatable 减去节点上所有 Pod 总的 Request）。
