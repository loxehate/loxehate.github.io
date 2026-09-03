---
title: K8S-Kubernetes基础概念
slug: K8S-Kubernetes基础概念
published: 2025-07-31
description: 我们急需一个大规模容器编排系统
image: '/images/posts/k8s-容器编排.png'
tags:
  - kubernetes
category: 云原生
draft: false
lang: zh-CN
pinned: false
comment: true
---
### 一、**Kubernetes**是什么

![](/images/posts/k8s-容器编排.png)

我们急需一个大规模容器编排系统

kubernetes具有以下特性：

**服务发现和负载均衡**

```
Kubernetes 可以使用 DNS 名称或自己的 IP 地址公开容器，如果进入容器的流量很大， Kubernetes 可以负载均衡并分配网络流量，从而使部署稳定
```

**存储编排**

```
Kubernetes 允许你自动挂载你选择的存储系统，例如本地存储、公共云提供商等。
```

**自动部署和回滚**

```
你可以使用 Kubernetes 描述已部署容器的所需状态，它可以以受控的速率将实际状态 更改为期望状态。例如，你可以自动化 Kubernetes 来为你的部署创建新容器， 删除现有容器并将它们的所有资源用于新容器
```

**自动完成装箱计算**

```
Kubernetes 允许你指定每个容器所需 CPU 和内存（RAM）。 当容器指定了资源请求时，Kubernetes 可以做出更好的决策来管理容器的资源。
```

**自我修复**

```
Kubernetes 重新启动失败的容器、替换容器、杀死不响应用户定义的 运行状况检查的容器，并且在准备好服务之前不将其通告给客户端。
```

**密钥与配置管理**

```
Kubernetes 允许你存储和管理敏感信息，例如密码、OAuth 令牌和 ssh 密钥。 你可以在不重建容器镜像的情况下部署和更新密钥和应用程序配置，也无需在堆栈配置中暴露密钥。
```

**Kubernetes 为你提供了一个可弹性运行分布式系统的框架。 Kubernetes 会满足你的扩展要求、故障转移、部署模式等。 例如，Kubernetes 可以轻松管理系统的 Canary 部署。**

### 二、架构

#### 1、工作方式

```
Kubernetes Cluster = N Master Node + N Worker Node：N主节点+N工作节点； N>=1
```

#### 2、组件架构

![](/images/posts/k8s-组件架构.png)

##### 2.1、控制平面组件（Control Plane Components）

控制平面的组件对集群做出全局决策(比如调度)，以及检测和响应集群事件（例如，当不满足部署的 `replicas` 字段时，启动新的 [pod](https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/)）。

控制平面组件可以在集群中的任何节点上运行。 然而，为了简单起见，设置脚本通常会在同一个计算机上启动所有控制平面组件， 并且不会在此计算机上运行用户容器。 请参阅[使用 kubeadm 构建高可用性集群](https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/high-availability/) 中关于多 VM 控制平面设置的示例。

**kube-apiserver**

```
API 服务器是 Kubernetes 控制面的组件， 该组件公开了 Kubernetes API。 API 服务器是 Kubernetes 控制面的前端。
Kubernetes API 服务器的主要实现是 kube-apiserver。 kube-apiserver 设计上考虑了水平伸缩，也就是说，它可通过部署多个实例进行伸缩。 你可以运行 kube-apiserver 的多个实例，并在这些实例之间平衡流量。
```

**etcd**

```
etcd 是兼具一致性和高可用性的键值数据库，可以作为保存 Kubernetes 所有集群数据的后台数据库。
您的 Kubernetes 集群的 etcd 数据库通常需要有个备份计划。
```

要了解 etcd 更深层次的信息，请参考 [etcd 文档](https://etcd.io/docs/)。

**kube-scheduler**

```
控制平面组件，负责监视新创建的、未指定运行节点（node）的 Pods，选择节点让 Pod 在上面运行。
调度决策考虑的因素包括单个 Pod 和 Pod 集合的资源需求、硬件/软件/策略约束、亲和性和反亲和性规范、数据位置、工作负载间的干扰和最后时限。

API Server 接收到请求创建一批 Pod ，API Server 会让 Controller-manager 按照所预设的模板去创建 Pod，Controller-manager 会通过 API Server 去找 Scheduler 为新创建的 Pod 选择最适合的 Node 节点。比如运行这个 Pod 需要 2C4G 的资源，Scheduler 会通过预选策略过滤掉不满足策略的 Node 节点。Node 节点中还剩多少资源是通过汇报给 API Server 存储在 etcd 里，API Server 会调用一个方法找到 etcd 里所有 Node 节点的剩余资源，再对比 Pod 所需要的资源，如果某个 Node 节点的资源不足或者不满足 预选策略的条件则无法通过预选。预选阶段筛选出的节点，在优选阶段会根据优选策略为通过预选的 Node 节点进行打分排名， 选择得分最高的 Node。例如，资源越富裕、负载越小的 Node 可能具有越高的排名。
```

**kube-controller-manager**

```
在主节点上运行 控制器 的组件。
从逻辑上讲，每个控制器都是一个单独的进程， 但是为了降低复杂性，它们都被编译到同一个可执行文件，并在一个进程中运行。
在 K8S 集群中，一个资源对应一个控制器，而 Controller manager 就是负责管理这些控制器的。
由一系列控制器组成，通过 API Server 监控整个集群的状态，并确保集群处于预期的工作状态，比如当某个 Node 意外宕机时，Controller Manager 会及时发现并执行自动化修复流程，确保集群始终处于预期的工作状态。
这些控制器包括:
节点控制器（Node Controller）: 负责在节点出现故障时进行通知和响应
任务控制器（Job controller）: 监测代表一次性任务的 Job 对象，然后创建 Pods 来运行这些任务直至完成
端点控制器（Endpoints Controller）: 填充端点(Endpoints)对象(即加入 Service 与 Pod)
服务帐户和令牌控制器（Service Account & Token Controllers）: 为新的命名空间创建默认帐户和 API 访问令牌
ResourceQuota Controller（资源配额控制器）：确保指定的资源对象在任何时候都不会超量占用系统物理资源。
Namespace Controller（命名空间控制器）：管理 namespace 的生命周期。
Service Controller（服务控制器）：属于 K8S 集群与外部的云平台之间的一个接口控制器
```

**cloud-controller-manager**

```
云控制器管理器是指嵌入特定云的控制逻辑的 控制平面组件。 云控制器管理器允许您链接集群到云提供商的应用编程接口中， 并把和该云平台交互的组件与只和您的集群交互的组件分离开。
cloud-controller-manager 仅运行特定于云平台的控制回路。 如果你在自己的环境中运行 Kubernetes，或者在本地计算机中运行学习环境， 所部署的环境中不需要云控制器管理器。
与 kube-controller-manager 类似，cloud-controller-manager 将若干逻辑上独立的 控制回路组合到同一个可执行文件中，供你以同一进程的方式运行。 你可以对其执行水平扩容（运行不止一个副本）以提升性能或者增强容错能力。
```

下面的控制器都包含对云平台驱动的依赖：

```
● 节点控制器（Node Controller）: 用于在节点终止响应后检查云提供商以确定节点是否已被删除
● 路由控制器（Route Controller）: 用于在底层云基础架构中设置路由
● 服务控制器（Service Controller）: 用于创建、更新和删除云提供商负载均衡器
```

##### **2.2、Node 组件** 

节点组件在每个节点上运行，维护运行的 Pod 并提供 Kubernetes 运行环境。

**kubelet**

```
一个在集群中每个节点（node）上运行的代理。 它保证容器（containers）都 运行在 Pod 中。
kubelet 接收一组通过各类机制提供给它的 PodSpecs，确保这些 PodSpecs 中描述的容器处于运行状态且健康。 kubelet 不会管理不是由 Kubernetes 创建的容器。
```

**kube-proxy**

```
kube-proxy 是集群中每个节点上运行的网络代理， 实现 Kubernetes 服务（Service） 概念的一部分。
kube-proxy 维护节点上的网络规则。这些网络规则允许从集群内部或外部的网络会话与 Pod 进行网络通信。
如果操作系统提供了数据包过滤层并可用的话，kube-proxy 会通过它来实现网络规则。否则， kube-proxy 仅转发流量本身。
```

![](/images/posts/k8s-框架.png)

**docker 或 [rocket](https://so.csdn.net/so/search?q=rocket&spm=1001.2101.3001.7020)**

```
容器引擎，运行容器，负责本机的容器创建和管理工作。当 kubernetes 把 pod 调度到节点上，节点上的 kubelet会指示 docker 启动特定的容器。接着，kubelet 会通过 docker 持续地收集容器的信息， 然后提交到主节点上。docker 会如往常一样拉取容器镜像、启动或停止容器。不同点仅仅在于这是由自动化系统控制而非管理员在每个节点上手动操作的。
```

##### 2.3、核心组件

**配置存储中心→`etcd`服务**

**主控（`master`）节点**

kube-apiserver 服务

kube-controller-manager`服务

kube-scheduler`服务

**运算（`node`）节点**

kube-kubelet`服务`

`kube-proxy`服务

**`CLI`客户端**

`kubectl`

**核心附件**

- `CNI`网络插件→`flannel/calico`

- 服务发现用插件→`coredns`

- 服务暴露用插件→`traefik`

  GUI`管理插件→`Dashboard`

### 三、工作原理

![](/images/posts/k8s-工作原理.jpg)

```
1.运维人员向 apiserver 发出指令，可以通过API Server的REST API，也可用Kubectl命令行工具

2.apiserver 响应命令,通过一系列认证授权,把 创建pod请求的数据存储到 etcd，创建 deployment 资源并初始化 (期望状态）

3.controller-manager 通过 list-watch 机制，监测发现新的 deployment，将该资源加入到内部工作队列，发现该资源没有关联的 pod 和 replicaset，启用 deployment controller 创建 replicaset 资源,再启用 replicaset controller 创建 pod。根据预设的资源模板创建pod清单

4.创建完成后，将 deployment，replicaset，pod 资源更新存储到 etcd

5.scheduler 通过 list-watch 机制,监测发现新的 pod，经过主机过滤、主机打分规则，将 pod 绑定 (binding) 到合适的主机。通过调度算法的预选策略和优选策略筛选出最适合的Node节点

6.将绑定结果存储到 etcd

7.kubelet 每隔 20s (可以自定义) 向 apiserver 通过 NodeName 获取自身 Node 上所要运行的 pod 清单，通过与自己的内部缓存进行比较,新增加 pod。kubelet会直接跟容器引擎交互来管理容器的生命周期

8.kubelet 调用 Docker API 创建并启动 pod

9.kube-proxy 为新创建的 pod 注册动态 DNS 到 CoreOS。给 pod 的 service 添加 iptables/ipvs 规则，用于服务发现和负载均衡

10.controller-manager 通过 control loop（控制循环）将当前 pod 状态与用户所期望的状态做对比，如果当前状态与用户期望状态不同，则 controller 会将 pod 修改为用户期望状态，实在不行会将此 pod 删掉，然后重新创建pod
```

```
1.用户通过客户端发送创建pod的请求到master节点上的apiserver；
2.apiserver会先把相关的请求信息写入到etcd中，再找controller-manager根据预设的资源模板创建pod清单；
3.然后controller-manager会通过apiserver去找scheduler为新创建的pod选择最适合的Node节点；
4.scheduler会通过调度算法的预选策略和优选策略筛选出最适合的Node节点；
5.然后再通过apiserver找到对应的Node节点上的kubelet去创建和管理pod；
6.kubelet会直接跟容器引擎交互来管理容器的生命周期；
7.用户通过创建承载在kube-proxy上的service资源，写入相关的网络规则，实现对pod的服务发现和负载均衡。
```



### 四、请求访问过程

![](/images/posts/k8s-请求访问过程.png)

```
1.service资源通过标签选择器关联具有相同标签的Pod；
2.每个service都有一个固定的clusterip，可供在k8s集群内部被访问；
3.service可以把通过cluster ip发来的请求负载均衡 4层代理转发到它所关联的后端pod上；
4.ingress可以作为k8s对外暴露的网关接口接收k8s集群外部发来的请求流量；
5.ingress支持7层代理转发，它可以通过根据不同的域名或者URL访问路径把请求流量转发到不同的service上。
```

### **五、K8S 命令[自动补全](https://so.csdn.net/so/search?q=自动补全&spm=1001.2101.3001.7020)**

**安装bsah-completion工具**

```
 # bash-completion是对bash工具对一个补全的一个增强，可以自动补全包名和文件名等
yum install bash-completion -y 
```

**执行bash_completion**

```
source /usr/share/bash-completion/bash_completion
```

**加载kubectl completion**

```
# kubectl completion bash命令是获取k8s上的资源信息
# source是将获取到的k8s的信息存储在计算机此次访问的资源中，当重新启动命令时会重新获取k8s的资源
source <(kubectl completion bash) # 临时生效

# 将计算机此次获取的k8s资源写入到计算机中的～/.bashrc文件中，使其永久生效
echo "source <(kubectl completion bash)" >> ~/.bashrc # 永久生效 方法一

# 将k8s资源写入到bash-completion的补全脚本中文件中，从而实现永久k8s资源的永久化
kubectl completion bash >/etc/bash_completion.d/kubectl # 永久生效 方法二
```

**为kubectl命令起一个别名**

```
# 对命令行起别名，都下面是对kubectl起了一个别名k，也可以将git命令修改为g
# 命令别名的格式: alias '命令别名'='原命令'
# 注意: 在修改完～/.bashrc文件后, 记得执行 'source ~/.bashrc' 命令使其立即生效
alias k=kubectl   # 在文件～/.bashrc文件中新增一行
```

**使别名和自动补全同时生效**

```
# 使用别名和bash-completion同时生效
complete -F __start_kubectl k
```

**总结**

```
# 在～/.bashrc文件中添加以下内容，可以实现k8s命令的自动补全和别名
alias k='kubectl'
source <(kubectl completion bash)
# 这句不加的话用kubectl可以使用Tab键自动补全，但是别名k不能使用Tab键自动补全
complete -F __start_kubectl k 
# 注意: 记得'source ～/.bashrc'刷新资源及时生效
```

