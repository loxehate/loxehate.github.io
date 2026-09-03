---
title: K8S-networkpolicy网络策略详解
slug: K8S-networkpolicy网络策略详解
published: 2026-09-01
description: 可以在 ingress from 部分或 egress to 部分中指定四种选择器：
image: '../../assets/images/Dota-img/spirit_breaker.webp'
tags:
  - kubernetes
category: 云原生
draft: false
lang: zh-CN
pinned: false
comment: true
---
### 一、简介

```
网络策略（NetworkPolicy）是一种关于 Pod 间及与其他网络端点间所允许的通信规则的规范。

NetworkPolicy 资源使用 标签 选择 Pod，并定义选定 Pod 所允许的通信规则。
```

Pod 隔离的两种类型

```
Pod 有两种隔离: 出口的隔离和入口的隔离。它们涉及到可以建立哪些连接。 这里的“隔离”不是绝对的，而是意味着“有一些限制”。 另外的，“非隔离方向”意味着在所述方向上没有限制。这两种隔离（或不隔离）是独立声明的， 并且都与从一个 Pod 到另一个 Pod 的连接有关。

默认情况下，一个 Pod 的出口是非隔离的，即所有外向连接都是被允许的。如果有任何的 NetworkPolicy 选择该 Pod 并在其 policyTypes 中包含 “Egress”，则该 Pod 是出口隔离的， 我们称这样的策略适用于该 Pod 的出口。当一个 Pod 的出口被隔离时， 唯一允许的来自 Pod 的连接是适用于出口的 Pod 的某个 NetworkPolicy 的 egress 列表所允许的连接。 针对那些允许连接的应答流量也将被隐式允许。 这些 egress 列表的效果是相加的。

默认情况下，一个 Pod 对入口是非隔离的，即所有入站连接都是被允许的。如果有任何的 NetworkPolicy 选择该 Pod 并在其 policyTypes 中包含 “Ingress”，则该 Pod 被隔离入口， 我们称这种策略适用于该 Pod 的入口。当一个 Pod 的入口被隔离时，唯一允许进入该 Pod 的连接是来自该 Pod 节点的连接和适用于入口的 Pod 的某个 NetworkPolicy 的 ingress 列表所允许的连接。针对那些允许连接的应答流量也将被隐式允许。这些 ingress 列表的效果是相加的。

网络策略是相加的，所以不会产生冲突。如果策略适用于 Pod 某一特定方向的流量， Pod 在对应方向所允许的连接是适用的网络策略所允许的集合。 因此，评估的顺序不影响策略的结果。

要允许从源 Pod 到目的 Pod 的某个连接，源 Pod 的出口策略和目的 Pod 的入口策略都需要允许此连接。 如果任何一方不允许此连接，则连接将会失败。
```

### 二、语法

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
 - Ingress
 - Egress
  ingress:
 - from:
    - ipBlock:
        cidr: 172.17.0.0/16
        except:
        - 172.17.1.0/24
    - namespaceSelector:
        matchLabels:
          project: myproject
    - podSelector:
        matchLabels:
          role: frontend
    ports:
    - protocol: TCP
      port: 6379
  egress:
 - to:
    - ipBlock:
        cidr: 10.0.0.0/24
    ports:
    - protocol: TCP
      port: 5978
```

说明：

```
spec: NetworkPolicy 规约 中包含了在一个命名空间中定义特定网络策略所需的所有信息。

podSelector: 每个 NetworkPolicy 都包括一个 podSelector ，它对该策略所应用的一组 Pod进行选择。示例中的策略选择带有 "role=db" 标签的 Pod。空的 podSelector 选择命名空间下的所有 Pod。

policyTypes: 每个 NetworkPolicy 都包含一个 policyTypes 列表，其中包含 Ingress 或 Egress 或两者兼具。policyTypes 字段表示给定的策略是否应用于进入所选 Pod 的入口流量或者来自所选 Pod的出口流量，或两者兼有。如果 NetworkPolicy 未指定 policyTypes 则默认情况下始终设置 Ingress，如果NetworkPolicy 有任何出口规则的话则设置 Egress。

ingress: 每个 NetworkPolicy 可包含一个 ingress 规则的白名单列表。每个规则都允许同时匹配 from 和ports 部分的流量。示例策略中包含一条简单的规则： 它匹配一个单一的端口，来自三个来源中的一个， 第一个通过 ipBlock指定，第二个通过namespaceSelector 指定，第三个通过 podSelector 指定。

egress: 每个 NetworkPolicy 可包含一个 egress 规则的白名单列表。每个规则都允许匹配 to 和 port部分的流量。该示例策略包含一条规则，该规则将单个端口上的流量匹配到 10.0.0.0/24 中的任何目的地。
```

网络策略示例:

```
隔离 “default” 命名空间下 “role=db” 的 Pod (如果它们不是已经被隔离的话)。

（Ingress 规则）允许以下 Pod 连接到 “default” 命名空间下的带有 “role=db” 标签的所有 Pod 的6379 TCP 端口：
  “default” 命名空间下任意带有 “role=frontend” 标签的 Pod
  带有 “project=myproject” 标签的任意命名空间中的 Pod
  IP 地址范围为 172.17.0.0–172.17.0.255 和 172.17.2.0–172.17.255.255（即，除了
  172.17.1.0/24 之外的所有 172.17.0.0/16）

（Egress 规则）允许从带有 “role=db” 标签的命名空间下的任何 Pod 到 CIDR 10.0.0.0/24 下 5978TCP 端口的连接。
```

### 三、选择器 to 和 from 的行为

可以在 ingress from 部分或 egress to 部分中指定四种选择器：

第一种
`podSelector`: 这将在与 NetworkPolicy 相同的命名空间中选择特定的 Pod，应将其允许作为入口源或出口目的地。

第二种
`namespaceSelector`: 这将选择特定的命名空间，应将所有 Pod 用作其输入源或输出目的地。

第三种
namespaceSelector 和 podSelector: **一个指定 namespaceSelector 和 podSelector
的 to/from 条目选择特定命名空间中的特定 Pod**。注意使用正确的 YAML 语法；这项策略：

```
 ...
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          user: alice
      podSelector:
        matchLabels:
          role: client
  ...
```

在 from 数组中仅包含一个元素，只允许来自标有 `role=client` 的 Pod **且**该 Pod 所在的命名空间中标有 `user=alice` 的连接。

```
 ...
  ingress:
 - from:
    - namespaceSelector:
        matchLabels:
          user: alice
    - podSelector:
        matchLabels:
          role: client
  ...
```

在 from 数组中包含两个元素，允许来自本地命名空间中标有 `role=client` 的 Pod 的连接，**或** 来自任何命名空间中标有 `user = alice` 的任何 Pod 的连接。
**这两种定义方式的区别，请你一定要分清楚。**

第四种

```
ipBlock: 这将选择特定的 IP CIDR 范围以用作入口源或出口目的地。 这些应该是群集外部 IP，因为 Pod IP 存在时间短暂的且随机产生。
群集的入口和出口机制通常需要重写数据包的源 IP 或目标 IP。在发生这种情况的情况下，不确定在 NetworkPolicy 处理之前还是之后发生，并且对于网络插件，云提供商，Service 实现等的不同组合，其行为可能会有所不同。

在进入的情况下，这意味着在某些情况下，您可以根据实际的原始源 IP 过滤传入的数据包，而在其他情况下，NetworkPolicy 所作用的 源IP 则可能是 LoadBalancer 或 Pod 的节点等。

对于出口，这意味着从 Pod 到被重写为集群外部 IP 的 Service IP 的连接可能会或可能不会受到基于 ipBlock 的策略的约束
```

###  四、默认策略

```
默认情况下，如果命名空间中不存在任何策略，则所有进出该命名空间中的 Pod 的流量都被允许。以下示例使您可以更改该命名空间中的默认行为。
```

#### 4.1 默认拒绝所有入口流量

您可以通过创建选择所有容器但不允许任何进入这些容器的入口流量的 NetworkPolicy 来为命名空间创建 “default” 隔离策略。

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
spec:
  podSelector: {}
  policyTypes:
  - Ingress
```

这样可以确保即使容器没有选择其他任何 `NetworkPolicy`，也仍然可以被隔离。此策略不会更改默认的出口隔离行为。

#### 4.2 默认允许所有入口流量

如果要允许所有流量进入某个命名空间中的所有 Pod（即使添加了导致某些 Pod 被视为“隔离”的策略），则可以创建一个策略来明确允许该命名空间中的所有流量。

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-all-ingress
spec:
  podSelector: {}
  ingress:
  - {}
  policyTypes:
  - Ingress
```

#### 4.3 默认拒绝所有出口流量

您可以通过创建选择所有容器但不允许来自这些容器的任何出口流量的 NetworkPolicy 来为命名空间创建 “default” egress 隔离策略。

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-egress
spec:
  podSelector: {}
  policyTypes:
  - Egress
```

#### 4.4 默认允许所有出口流量

如果要允许来自命名空间中所有 Pod 的所有流量（即使添加了导致某些 Pod 被视为“隔离”的策略），则可以创建一个策略，该策略明确允许该命名空间中的所有出口流量。

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-all-egress
spec:
  podSelector: {}
  egress:
  - {}
  policyTypes:
  - Egress
```

#### 4.5 默认拒绝所有入口和所有出口流量

您可以为命名空间创建 “default” 策略，以通过在该命名空间中创建以下 NetworkPolicy 来阻止所有入站和出站流量。

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

### 五、实战示例

#### 5.1 创建一个nginx Deployment 并且通过服务将其暴露

```
$ kubectl create deployment nginx --image=nginx
$ kubectl expose deployment nginx --port=80   #此 Deployment 以名为 nginx 的 Service 暴露出来
$ kubectl get svc,pod

$ kubectl run busybox --rm -ti --image=busybox /bin/sh  # 创建测试工具的pod
$ wget --spider --timeout=1 nginx
Connecting to nginx (10.100.0.16:80)
remote file exists
```

#### 5.2 限制 nginx 服务的访问

如果想限制对 nginx 服务的访问，只让那些拥有标签 `access: true` 的 Pod 访问它， 那么可以创建一个如下所示的 NetworkPolicy 对象：

```
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: access-nginx
spec:
  podSelector:
    matchLabels:
      app: nginx
  ingress:
  - from:
    - podSelector:
        matchLabels:
          access: "true"
```

**注意**： NetworkPolicy 中包含选择策略所适用的 Pods 集合的 podSelector。 你可以看到上面的策略选择的是带有标签 app=nginx 的 Pods。 此标签是被自动添加到 nginx Deployment 中的 Pod 上的。 如果 podSelector 为空，则意味着选择的是名字空间中的所有 Pods。

```
$ kubectl apply -f https://k8s.io/examples/service/networking/nginx-policy.yaml

$ kubectl run busybox --rm -ti --image=busybox -- /bin/sh  #创建测试工具的pod

$ wget --spider --timeout=1 nginx
Connecting to nginx (10.100.0.16:80)
wget: download timed out

定义访问标签后再次测试
创建一个拥有正确标签的 Pod，你将看到请求是被允许的：

$ kubectl run busybox --rm -ti --labels="access=true" --image=busybox -- /bin/sh
在 Shell 中运行命令：

$ wget --spider --timeout=1 nginx
Connecting to nginx (10.100.0.16:80)
remote file exists
```

### 六、networkpolicy原理

在具体实现上，凡是支持 NetworkPolicy 的 CNI 网络插件，都维护着一个 NetworkPolicy Controller，通过控制循环的方式对 NetworkPolicy 对象的增删改查做出响应，然后在宿主机上完成 iptables 规则的配置工作。

在 Kubernetes 生态里，目前已经实现了 NetworkPolicy 的网络插件包括 Calico、Weave 和 kube-router 等多个项目，但是并不包括 Flannel 项目。所以说，如果想要在使用 Flannel 的同时还使用 NetworkPolicy 的话，你就需要再额外安装一个网络插件，比如 Calico 项目，来负责执行 NetworkPolicy。


**那么，这些网络插件，又是如何根据 NetworkPolicy 对 Pod 进行隔离的呢？**

接下来，我就以三层网络插件为例（比如 Calico 和 kube-router），来为你分析一下这部分的原理。为了方便讲解，这一次我编写了一个比较简单的 NetworkPolicy 对象，如下所示：

```
apiVersion: extensions/v1beta1
kind: NetworkPolicy
metadata:
  name: test-network-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: db
  ingress:
   - from:
     - namespaceSelector:
         matchLabels:
           project: myproject
     - podSelector:
         matchLabels:
           role: frontend
     ports:
       - protocol: tcp
         port: 6379
```

可以看到，我们指定的 ingress“白名单”，是任何 Namespace 里，携带 project=myproject 标签的 Namespace 里的 Pod；以及 default Namespace 里，携带了 role=frontend 标签的 Pod。允许被访问的端口是：6379。而被隔离的对象，是所有携带了 role=db 标签的 Pod。
**Kubernetes 网络插件对 Pod 进行隔离，其实是靠在宿主机上生成 NetworkPolicy 对应的 iptable 规则来实现的**。

### 七、总结

- Kubernetes 对 Pod 进行“隔离”的手段，即：NetworkPolicy。

而基于上述讲述，你就会发现这样一个事实：

```
Kubernetes 的网络模型以及大多数容器网络实现，其实既不会保证容器之间二层网络的互通，也不会实现容器之间的二层网络隔离。这跟 IaaS 项目管理虚拟机的方式，是完全不同的。所以说，Kubernetes 从底层的设计和实现上，更倾向于假设你已经有了一套完整的物理基础设施。然后，Kubernetes 负责在此基础上提供一种“弱多租户”（soft multi-tenancy）的能力。


并且，基于上述思路，Kubernetes 将来也不大可能把 Namespace 变成一个具有实质意义的隔离机制，或者把它映射成为“子网”或者“租户”。毕竟你可以看到，NetworkPolicy 对象的描述能力，要比基于 Namespace 的划分丰富得多。这也是为什么，到目前为止，Kubernetes 项目在云计算生态里的定位，其实是基础设施与 PaaS 之间的中间层。这是非常符合“容器”这个本质上就是进程的抽象粒度的。当然，随着 Kubernetes 社区以及 CNCF 生态的不断发展，Kubernetes 项目也已经开始逐步下探，“吃”掉了基础设施领域的很多“蛋糕”。这也正是容器生态继续发展的一个必然方向。
```

