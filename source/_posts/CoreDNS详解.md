---
title: CoreDNS详解
tags: [CoreDNS]
categories: [中间件]
date: 2025-05-29
---
### 一、概述

在企业高可用DNS架构部署方案中我们使用的是传统老牌DNS软件Bind, 但是现在不少企业内部流行容器化部署，所以也可以将Bind替换为 CoreDNS ，由于 CoreDNS 是 Kubernetes 的一个重要组件，稳定性不必担心，于此同时还可将K8S集群SVC解析加入到企业内部的私有的CoreDNS中。

### 二 、CoreDNS 介绍

#### 1、什么是CoreDNS?

CoreDNS 由 Go 语言编写是一个高度可扩展和灵活的( `插件式`) DNS 服务器，可以在多平台环境上运行，来自 `Cloud Native Computing Foundation`（云原生基金会）的开源毕业项目，它的设计目标是易于使用且具有强大的功能。

除此之外，CoreDNS与其他DNS服务器不同，例如（所有优秀的）BIND，Knot，PowerDNS 和 Unbound（技术上是一个解析器，但仍然值得一提）。因为它非常灵活，几乎所有功能都外包到插件中，插件可以是独立的，也可以协同工作以执行“DNS功能”，这使得 CoreDNS 不仅可以用作传统的 DNS 服务器，还可以用作服务发现、负载均衡和其他用途。

    coredns 官方文档：https://coredns.io/manual/toc/ 
    coredns 发布版本: https://github.com/coredns/core

#### 2、CoreDNS如何实现DNS功能？

CoreDNS 其目的是易于使用且具有强大的功能，官方将其定义为一个软件实现 CoreDNS 插件 API, 实现的功能可能会大相径庭,有本身不会创建响应（例如指标或缓存）但会添加功能的插件,然后有一些插件确实会生成一个回应。这些也可以做任何事情：有与 Kubernetes 通信以提供服务发现的插件，从中读取数据的插件 文件或数据库。

#### 3 、CoreDNS 核心特点

插件架构（Plugins）：通过插件，可以轻松扩展 CoreDNS 的功能。插件可以用于处理 DNS 请求、转发请求、缓存结果、记录日志等。插件的使用和配置都非常简单。

性能和可靠性：CoreDNS 使用 Go 语言编写，具有很高的性能。同时，它具有自动重试、健康检查和负载均衡等功能，以确保 DNS 服务的可靠性。

易于配置：CoreDNS 使用名为 Caddyfile 的配置文件格式，这种格式简单易懂，易于编写和维护。

Kubernetes 集成：CoreDNS 可以与 Kubernetes 集成，作为集群内的 DNS 服务器。自 Kubernetes 1.11 版本起，CoreDNS 成为 Kubernetes 的默认 DNS 服务器，替代了之前的 kube-dns。

    其实从功能角度来看，CoreDNS 更像是一个通用 DNS 方案（类似于 BIND），然后通过插件模式来极大地扩展自身功能，从而可以适用于不同的场景（比如 Kubernetes）。正如官方博客所说：CoreDNS is powered by plugins.

### 三、安装部署

CoreDNS安装有两种方式：

- **二进制安装**
- **源码编译**

#### 1、二进制安装

##### 1.1 下载安装包

 安装包地址：[Releases · coredns/coredns · GitHub](https://github.com/coredns/coredns/releases/)

```
# 指定最新版本
$ COREDNS_VERSION="1.11.1"
# 官方下载
$ wget -O /tmp/coredns_${COREDNS_VERSION}_linux_amd64.tgz https://github.com/coredns/coredns/releases/download/v${COREDNS_VERSION}/coredns_${COREDNS_VERSION}_linux_amd64.tgz
# 代理下载
$ wget -O /tmp/coredns_${COREDNS_VERSION}_linux_amd64.tgz https://ghproxy.com/https://github.com/coredns/coredns/releases/download/v${COREDNS_VERSION}/coredns_${COREDNS_VERSION}_linux_amd64.tgz
```

##### 1.2 解压安装

```
# 解压
$ tar xf /tmp/coredns_${COREDNS_VERSION}_linux_amd64.tgz -C /usr/local/bin
# 软连接设置
$ ln -s /usr/local/bin/coredns /usr/bin/coredns
```

##### 1.3 配置

```
# 添加独立用户
$ useradd coredns -s /sbin/nologin
 
# 创建配置目录文件及权限
$ mkdir -vp /etc/coredns/
$ touch /etc/coredns/Corefile
$ chown -R coredns /etc/coredns/Corefile
```

##### 1.4 设置成系统服务

```
$ tee -a /usr/lib/systemd/system/coredns.service <<'EOF'
[Unit]
Description=CoreDNS DNS server
Documentation=https://coredns.io
After=network.target
 
[Service]
LimitNOFILE=1048576
LimitNPROC=512
CapabilityBoundingSet=CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_BIND_SERVICE
PermissionsStartOnly=true
NoNewPrivileges=true
WorkingDirectory=/etc/coredns
User=coredns
ExecStart=/usr/bin/coredns -conf=/etc/coredns/Corefile
ExecReload=/bin/kill -SIGUSR1 $MAINPID
Restart=on-failure
 
[Install]
WantedBy=multi-user.target
EOF
```

##### 1.5 系统加载

```
# Reload systemd manager configuration
$ systemctl daemon-reload                       
 
# Auto Start Configuration
$ systemctl enable coredns
```

##### 1.6 设置防火墙规则 

```
# 设置防火墙允许DNS服务53端口网络通行
$ firewall-cmd --permanent --add-service=dns
$ firewall-cmd --reload
```

##### 1.7 设置解析配置及host插件

```
# 使用 host 插件配置一个简单解析
$ tee -a /etc/coredns/Corefile <<'EOF'
.:53 {
  # 绑定所有接口
  bind 0.0.0.0
  # hosts 插件: https://coredns.io/plugins/hosts/
  hosts {
    # 自定义 weiyigeek.top 子域名解析
    # 因为解析的域名少我们这里直接用hosts插件即可完成需求
    # 如果有大量自定义域名解析那么建议用file插件使用 符合RFC 1035规范的DNS解析配置文件
    192.168.1.2 www.weiyigeek.top
    192.168.1.3 blog.weiyigeek.top
    192.168.1.250 gitlab.weiyigeek.top
    192.168.1.251 harbor.weiyigeek.top
    # ttl
    ttl 60
    # 重载hosts配置
    reload 1m
    # 继续执行
    fallthrough
  }
  # file enables serving zone data from an RFC 1035-style master file.
  # 最后所有的都转发到系统配置的上游dns服务器去解析
  forward . 223.6.6.6
  # 缓存时间ttl
  cache 120
  # 自动加载配置文件的间隔时间
  reload 6s
  # 输出日志
  log
  # 输出错误
  errors
}
EOF
```

##### 1.8 启动codns

```
# 启动并查看coredns服务
$ systemctl start coredns && systemctl status coredns
 
# 查看监听端口服务
$ lsof -i :53
  # COMMAND  PID    USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
  # coredns 4548 coredns    7u  IPv6  36174      0t0  TCP *:domain (LISTEN)
  # coredns 4548 coredns    8u  IPv6  36176      0t0  UDP *:domain
```

##### 1.9 验证

**在 Windows 中使用 nslookup 工具解析指定子域名**

```
# 配置在coredns中的子域解析
[weiyigeek@localhost] C:\Users\WeiyiGeek $  nslookup -qt=a gitlab.weiyigeek.top 10.20.176.120
服务器:  UnKnown
Address:  10.20.176.120
 
名称:    gitlab.weiyigeek.top
Address:  192.168.1.250
 
# coredns 不存在的子域解析将转发给上游DNS服务器解析
[weiyigeek@localhost] C:\Users\WeiyiGeek $  nslookup -qt=a api.weiyigeek.top 10.20.176.120
服务器:  UnKnown
Address:  10.20.176.120
 
非权威应答:
名称:    api.weiyigeek.top
Address:  82.156.18.253
```

**在 Linux (redhat/centos/kylinos) 中 dig 工具解析指定子域名** 

```cobol
yum install bind-utils -y
dig harbor.weiyigeek.top @10.20.176.120
dig api.weiyigeek.top @10.20.176.120
```

#### 2、源码安装

CoreDNS用Go编写，所以在编译之前确保已经安装了GO的开发环境

> GO的版本需要大于1.17

##### 2.1 golang环境准备

参考下面链接部署go环境，需要讲go环境版本更换为1.17.3版本：

##### 2.2 **编译coredns**

从Github上面Check out下来项目，然后使用 **`make`** 编译项目：

```cobol
$ git clone https://github.com/coredns/coredns
$ cd coredns
# 直接编译，需要go环境
$ make
# 使用docker镜像go环境编译
docker run --rm -i -t -v $PWD:/v -w /v golang:1.21 make
```

编译完成以后会生成一个二进制文件：coredns。

直接使用以下命令启动即可：

```crystal
$ ./coredns
```

### 四 、CoreDNS 配置

#### 1、CoreDNS配置文件格式

通常情况下，一个典型的 Corefile 格式如下所示：

```
# ZONE : 定义 server 负责的 zone，PORT 是可选项，默认为 53；
ZONE:[PORT] {
# PLUGIN : 定义 server 所要加载的 plugin, 并且每个 plugin 可以有多个参数；
 [PLUGIN] ...
}
```

例如设置根域 `.` 的解析以及自定义域名的正向与反向解析。

```
# 根域, 监听 53 端口
.:53 {
  # whoami 插件：返回解析器的本地 IP 地址、端口和传输，且请求结束时下一个插件将不会被调用。
  whoami
  # .....
}
 
# 定义 Server Zone （正向解析）
weiyigeek.top {
  whoami
  # 可使用 host 或者 file 方法指定解析记录。
  file db.weiyigeek.top
 
}
  # 同一个 server 但是负责不同 zone 的解析，有不同插件链。
weiyigeek.cn {
  whoami
  # 使用 host 或者 file 方法指定解析记录。
  host db.weiyigeek.top
}
 
# 定义 Reverse Zone （反向解析 IP 地址对应的域名）
  # 方式1
0.0.10.in-addr.arpa {
  whoami
}
  # 方式2
10.0.0.0/24 {
  whoami
}
 
# CoreDNS 除了支持 DNS 协议，也支持 TLS 和 gRPC，即 DNS-over-TLS[3] 和 DNS-over-gRPC 模式
tls://example.org:1443 {
  #...
}
```

#### 2、案例

假若CoreDNS 的 Corefile 配置文件的内容如下所示: 

```
coredns.io:5300 {
  file db.coredns.io
}
 
example.io:53 {
  log
  errors
  file db.example.io
}
 
example.net:53 {
  file db.example.net
}
 
.:53 {
  kubernetes
  proxy . 8.8.8.8
  log
  health
  errors
  cache
}
```

从配置文件来看，我们定义了两个 server（尽管有 4 个区块），分别监听在 5300 和 53 端口, 每个进入到某个 server 的请求将按照 plugin.cfg 定义顺序执行其已经加载的插件。

其逻辑图可如下所示, 从图中我们需要注意尽管在 .:53 配置了 health 插件，但是它并为在上面的逻辑图中出现，其原因是，该插件并未参与请求相关的逻辑（即并没有在插件链上），只是修改了 server 配置。 一般地，我们可以将插件分为两种：Normal 插件(参与请求相关的逻辑，且插入到插件链中) 和 Other 插件 (不参与请求相关的逻辑，也不出现在插件链中，只是用于修改 server 的配置, 例如 health，tls 等插件.)

### 五、CoreDNS 插件说明

#### 1、插件分类

coredns官方对于插件的分类基本可以分为三种：Plugins(默认)、External Plugins和其他，其中Plugins一般都会被默认编译到coredns的预编译版本中，而External Plugins则不会，官方的文档对外部插件的定义有着明确的解释，主要要求大概是有用、高效、符合标准、文档齐全、通过测试等。

官方插件帮助文档: https://coredns.io/plugins/

通过官方的二进制部署的coredns可使用--plugins参数验证可用的coredns插件

    $ coredns -plugins
    Server types:
      dns
    Caddyfile loaders:
      flag
      default
    Other plugins:
      dns.acl
      dns.any
      dns.auto
      dns.autopath
      dns.azure
      dns.bind
      dns.bufsize
      dns.cache
      dns.cancel
      dns.chaos
      dns.clouddns
      dns.debug
      dns.dns64
      dns.dnssec
      dns.dnstap
      dns.erratic
      dns.errors
      dns.etcd
      dns.file
      dns.forward
      dns.geoip
      dns.grpc
      dns.header
      dns.health
      dns.hosts
      dns.k8s_external
      dns.kubernetes
      dns.loadbalance
      dns.local
      dns.log
      dns.loop
      dns.metadata
      dns.minimal
      dns.nsid
      dns.pprof
      dns.prometheus
      dns.ready
      dns.reload
      dns.rewrite
      dns.root
      dns.route53
      dns.secondary
      dns.sign
      dns.template
      dns.timeouts
      dns.tls
      dns.trace
      dns.transfer
      dns.tsig
      dns.view
      dns.whoami
      on

若所需的插件不存在，请自行下载插件源码到cordns源码的plugin目录，然后在plugin.cfg文件中添加下载的插件名称例如etcd:etcd，又或者直接指定Github中的插件地址他会自行下载，例如 dump:github.com/miekg/dump，最后手动编译coredns源码。

    # plugin.cfg
    .....
    # 对于在plugin目录下已经存在的插件，则可以直接写成plugin中的目录名：
    sign:sign
    # 对于在plugin目录下不存在的插件
    dump:github.com/miekg/dump
     
    # 需提前准备Golang环境
    $ git clone -b v1.11.1 https://github.com/coredns/coredns
    $ cd coredns
    $ go get github.com/miekg/dump
    $ go generate
    $ go build && make

#### 2 、常用插件介绍

##### **2.1 host 插件**

此对于为文件中的区域提供服务很有用，但是仅支持 A、AAAA 和 PTR 记录，如果要在主机插件中没有匹配项的情况下将请求传递给插件链的其余部分，则必须指定该fallthrough选项,请注意每个块{}只能使用一次此插件。

插件参考: https://coredns.io/plugins/hosts/

反向查找的 PTR 记录由 CoreDNS 自动生成（基于hosts文件条目）

**语法**

```
hosts [FILE [ZONES...]] {
  # 条目的形式基于 IETF RFC 952 格式
  # IP_address canonical_hostname [aliases...]
  [INLINE]
  # 生成的记录的 DNS TTL，默认 3600s
  ttl SECONDS
  # 重载时间，若为0s表示不重载
  reload DURATION
  # 禁用生成反向解析  
  no_reverse
  # 如果区域匹配并且无法生成任何记录，请将请求传递给下一个插件。
  fallthrough [ZONES...]
}
```

**案例**

**少量不同域名解析直接写在 Corefile 配置文件中**

```cobol
.:53 {
  # 绑定interface ip
  bind 127.0.0.1
  # 先走本机的hosts
  hosts {
    # 因为解析的域名少我们这里直接用hosts插件即可完成需求
    192.168.1.2 www.weiyigeek.top weiyigeek.top
    192.168.1.3 blog.weiyigeek.top
    # ttl
    ttl 60
    # 重载hosts配置
    reload 1m
    # 继续执行
    fallthrough
  }
  # file enables serving zone data from an RFC 1035-style master file.
  # 最后所有的都转发到系统配置的上游dns服务器去解析
  forward . /etc/resolv.conf
  # 缓存时间ttl
  cache 120
  # 自动加载配置文件的间隔时间
  reload 6s
  # 输出日志
  log
  # 输出错误
  errors
}
```

**少量不同域名解析直接写在 Corefile 配置文件host中**

将解析写在独立的`/etc/coredns/hosts`文件中，也可以写在 `/etc/hosts,`看个人喜好

```
$ tee /etc/coredns/Corefile <<'EOF'
.:53 {
  bind 10.20.176.120
  hosts /etc/coredns/hosts
  # 未配置解析的将转发到上游服务器。
  forward . 8.8.8.8:53
  # 缓存时间ttl
  cache 120
  # 自动加载配置文件的间隔时间
  reload 6s
  # 输出日志
  log
  # 输出错误
  errors
}
EOF
 
$ tee /etc/coredns/hosts <<'EOF'
# weiyigeek.com
192.168.1.2 www.weiyigeek.com
192.168.1.3 blog.weiyigeek.com
# weiyigeek.top
192.168.1.250 gitlab.weiyigeek.top
192.168.1.251 harbor.weiyigeek.top
EOF
```

修改配置文件后重启coredns以便于验证解析:

```
[weiyigeek@localhost] C:\Users\WeiyiGeek $  nslookup -qt=a www.weiyigeek.com 10.20.176.120
服务器:  UnKnown
Address:  10.20.176.120
 
名称:    www.weiyigeek.com
Address:  192.168.1.2
 
 
[weiyigeek@localhost] C:\Users\WeiyiGeek $  nslookup -qt=a harbor.weiyigeek.top 10.20.176.120
服务器:  UnKnown
Address:  10.20.176.120
 
名称:    harbor.weiyigeek.top
```

##### 2.2 file 插件 （常用）

如果有大量自定义域名记录解析那么则建议使用`file`插件，配置需要符合`RFC 1035`规范的DNS解析配置文件，如果区域文件包含签名（即，使用 DNSSEC），返回正确的 DNSSEC 答案 。

**参数**

```
# DBFILE : 要读取和分析的数据库文件
# ZONES：它应该是权威的, 若为空则配置块中的区域被使用。
file DBFILE [ZONES...] {
  # 在 SOA 版本更改时执行区域重新加载的时间间隔
  reload DURATION
}
```

**案例**

 使用file插件创建内部域名的正向以及反向解析

```
$ tee /etc/coredns/Corefile <<'EOF'
.:53 {
  forward . 223.6.6.6:53 114.114.114.114:53 /etc/resolv.conf  # 上面etcd未查询到的请求转发给设置的DNS服务器解析
  # 启用缓存，保持正高速缓存大小 5000 和 负高速缓存大小 2500.
  cache {
    success 5000
    denial 2500
  }
  log
  errors
}
 
# 正向解析
weiyigeek.top {
  file /etc/coredns/weiyigeek.top.conf
  forward . 223.6.6.6:53 
  log
  errors
}
 
# 反向解析
20.10.in-addr.arpa {
  file /etc/coredns/db.20.10.conf
  log
  errors
}
EOF
 
 
# 正向解析配置文件，符合 RFC 1035 标准格式
$ tee /etc/coredns/weiyigeek.top.conf <<'EOF'
$TTL 86400
$ORIGIN weiyigeek.top.
@ 3600 IN  SOA  dns1.weiyigeek.top. master.weiyigeek.top. (
                          20210313      ; Serial
                          50400         ; Refresh
                          86400         ; Retry
                         604800         ; Expire
                          86400 )       ; Negative Cache TTL
;
 
; name servers - NS records
@ IN NS dns1
dns1 IN A 10.20.176.120
 
; root server - A records
@ IN A 192.168.10.71
 
; child server records
www IN A 192.168.10.71
blog IN A 192.168.10.70
EOF
 
$ tee /etc/coredns/db.20.10.conf <<'EOF'
$TTL 86400
@ 3600 IN  SOA  20.10.in-addr.arpa. master.weiyigeek.top. (
                          20210313      ; Serial
                          50400         ; Refresh
                          86400         ; Retry
                         604800         ; Expire
                          86400 )       ; Negative Cache TTL
;
 
; name servers - NS records
@ IN NS dns1.weiyigeek.top.
 
; PTR Records
120.176 IN PTR dns1.weiyigeek.top.
EOF
```

重启cordns服务验证服务: `systemctl restart coredns && sleep 6 &&systemctl status coredns`

```cobol
$ nslookup -qt=a weiyigeek.top 10.20.176.120
$ nslookup -qt=ns weiyigeek.top 10.20.176.120
$ nslookup -qt=ptr weiyigeek.top 10.20.176.120
```

##### 2.3 etcd 插件

使用etcd插件可以将解析存入到etcd的解析记录进行读取，它可以实现了DNS服务发现，但是它不适合作为一个通用的DNS区域数据插件, 只实现了DNS记录类型的一个子集。 

**语法**

```
etcd [ZONES...] {
  fallthrough [ZONES...]
  path PATH
  endpoint ENDPOINT...
  credentials USERNAME PASSWORD
  tls CERT KEY CACERT
  stubzones
}
 
# 参数解析
fallthrough: 如果区域匹配但没有记录可以生成，将请求传递给下一个插件
path: etcd中的路径，默认值/skydns
endpoint: etcd endpoint
credentials: etcd的用户名和密码
tls： CA
stubzones 启用存根区域功能
```

**案例**

**使用etcd做服务发现**

```
.:53 {
  forward . 223.6.6.6
}
weiyigeek.local {
  file weiyigeek.local { 
    reload 30s 
  }
}
etcd-weiyigeek.local:53 {
  etcd {
    stubzones # 启用存根区域功能,stubzone仅在位于指定的第一个区域下方的etcd树中完成
    path /root
    endpoint http://172.22.50.98:2379   # 此处根据自己部署的etcd地址进行填写。
    fallthrough # 如果区域匹配但不能生成记录，则将请求传递给下一个插件
  }
  forward . 8.8.8.8:53 8.8.4.4:53 /etc/resolv.conf  # 上面etcd未查询到的请求转发给设置的DNS服务器解析
  cache 160
  loadbalance   # 开启DNS记录轮询策略
  log           # 打印日志
}
```

使用 etcd 插件利用目录结构查询相关条目，已上面的 `etcd-weiyigeek.local` 为例，配置的etcd的path为`/root` 。

```
# etcd-weiyigeek.local 的 A 记录 为 172.22.50.28 
$./etcdctl put /root/local/etcd-weiyigeek/ '{"host":"172.22.50.28","ttl":60}' 
# demo1.etcd-weiyigeek.local 的 A 记录 为 172.22.50.128 
$./etcdctl put /root/local/etcd-weiyigeek/demo1 '{"host":"172.22.50.128","ttl":60}' 
# demo2.etcd-weiyigeek.local 的 A 记录 为 172.22.50.228 
$./etcdctl put /root/local/etcd-weiyigeek/demo2 '{"host":"172.22.50.228","ttl":60}' 
```

##### 2.4 kubernetes 插件

kubernetes 插件允许从kubernetes集群读取区域数据,

> 插件地址: [kubernetes](https://coredns.io/plugins/kubernetes/)

**语法**

```
kubernetes [ZONES...] {
  endpoint URL
  tls CERT KEY CACERT
  kubeconfig KUBECONFIG [CONTEXT]
  namespaces NAMESPACE...
  labels EXPRESSION
  pods POD-MODE
  endpoint_pod_names
  ttl TTL
  noendpoints
  fallthrough [ZONES...]
  ignore empty_service
}
```

**案例**

**在 [K8S](https://so.csdn.net/so/search?q=K8S&spm=1001.2101.3001.7020) 集群中的 Pod 内的 DNS 域名解析配置文件为`/etc/resolv.conf`**

```
#定义 DNS 服务器的 IP 地址。
nameserver xx.xx.0.10 
 
# 设置域名的查找后缀规则，查找配置越多，说明域名解析查找匹配次数越多。
# Kubernetes 集群匹配有 kube-system.svc.cluster.local、svc.cluster.local、cluster.local 3 个后缀，最多进行 8 次查询才能得到正确解析结果。
search kube-system.svc.cluster.local svc.cluster.local cluster.local 
 
#定义域名解析配置文件选项，例如该参数设置成 ndots:5，说明如果访问的域名字符串内的点字符数量超过 ndots 值，则认为是完整域名，并被直接解析；如果不足 ndots 值，则追加 search 段后缀再进行查询。
options ndots:5 
```

CoreDNS 配置:

```
$ kubectl get cm -n kube-system coredns  -o yaml
.....
Corefile: |
  .:53 {
      errors  # 输出错误信息，若需调试请设置为debug
      log     # 输出客户端请求解析信息
      health { # 健康检查配置
        lameduck 15s # 关闭延迟时间
      }
      ready # CoreDNS 插件，一般用来做可读性检查，可以通过 http://localhost:8181/ready 读取。
      # CoreDNS Kubernetes 插件，提供集群内服务解析能力。
      kubernetes {{.ClusterDomain}} in-addr.arpa ip6.arpa {
        pods verified
        fallthrough in-addr.arpa ip6.arpa
      }
      # 添加自定义 hosts。
      hosts {
        192.168.1.41  www.weiyigeek.top
        192.168.1.40  harbor.weiyigeek.top
        fallthrough in-addr.arpa ip6.arpa
      }
      prometheus :9153 # CoreDNS 自身 metrics 数据接口。
      # 当域名不在 Kubernetes 域时，将请求转发到预定义的解析器。
      forward . /etc/resolv.conf { 
        max_concurrent 1000
      }
      cache 30 # DNS 查询缓存。
      loop  #环路检测，如果检测到环路，则停止 CoreDNS。
      reload #允许自动重新加载已更改的 Corefile, 编辑 ConfigMap 配置后，请等待两分钟以使更改生效。
      loadbalance #循环 DNS 负载均衡器，可以在答案中随机 A、AAAA、MX 记录的顺序。
  }
```

##### 2.5 dnssec 插件

DNSSEC 支持对服务的数据进行动态 DNSSEC 签名，每个服务器块只能使用此插件一次。

> 插件地址: [dnssec](https://coredns.io/plugins/dnssec/)

**语法**

```
dnssec [ZONES... ] {
  # 指定读取的Key文件
  key file KEY...
  # 使用缓存来存储 RRSIGs，缺省值为 10000
  cache_capacity CAPACITY
}
```

**案例**

```
$ mkdir -vp /etc/coredns/dnssec && cd /etc/coredns/dnssec
# 使用 dnssec-keygen 工具生成密钥文件
$ dnssec-keygen -a ECDSAP256SHA256 -f KSK weiyigeek.top
  Generating key pair.
  # 生成的密钥的基本名称
  Kweiyigeek.top.+013+29388
 
# 生成的 public key 与 private key
$ ls
Kweiyigeek.top.+013+29388.key  Kweiyigeek.top.+013+29388.private 
 
# 配置文件 Corefile 示例
$ cat /etc/coredns/Corefile
.:53 {
  forward . 223.6.6.6:53
  log
  errors
}
 
# 正向解析
weiyigeek.top {
  file /etc/coredns/db.weiyigeek.top.conf
  dnssec {
    key file /etc/coredns/dnssec/Kweiyigeek.top.+013+29388.key
  }
  log
  errors
}
```

```
使用dnssec-keygen生成DNSSEC密钥对，您需要按照以下步骤操作：

1）打开命令行工具，并确保您的计算机上已经安装了BIND软件包，该软件包通常包含在DNS服务器软件包中。

2）运行以下命令来生成DNSSEC密钥对：dnssec-keygen -a <algorithm> -b <bits> -n <type> -f KSK/ZSK <domain>

3）参数说明：

<algorithm>：选择用于生成密钥对的加密算法，常见的算法有RSA、DSA、ECDSA等。
<bits>：指定密钥的位数，一般为1024、2048、4096等。
<type>：指定密钥的类型，可以是KSK（Key Signing Key）或ZSK（Zone Signing Key）。
<domain>：指定域名，生成的密钥对将与该域名相关联。
4）运行命令后，将会生成两个密钥文件，一个是私钥文件（以".private"结尾），另一个是公钥文件（以".key"结尾）。

请注意，生成的密钥对需要妥善保管，私钥文件应保密，而公钥文件需要添加到您的域名的DNS记录中。接下来，我们将讨论如何将公钥添加到DNS记录中。
```

##### 2.6 sign 插件

sign 插件用于对区域进行签名并 将 DNSSEC 记录添加到区域文件。

> 插件地址: [sign](https://coredns.io/plugins/sign/)

**语法**

```
# DBFILE 读取和分析的区域数据库文件, 即符合 RFC 1035 标准格式文件
sign DBFILE [ZONES...] {
  # 指定用于对区域进行签名的密钥（可以有多个）
  key file|directory KEY...|DIR...
  # 指定 CoreDNS 应在其中保存已签名区域的 DIR，默认为 /var/lib/coredns 目录（需要自行验证）
  directory DIR
}
```

**案例** 

```
1）使用 dnssec-keygen 生成 KSK 类型的 密钥
$ cd /etc/coredns/dnssec/
$ dnssec-keygen -a ECDSAP256SHA256 -f KSK weiyigeek.top
  # Generating key pair.
  # Kweiyigeek.top.+013+04352
$ ls
  # Kweiyigeek.top.+013+04352.key  Kweiyigeek.top.+013+04352.private
 
2）创建已签名区域的 DIR 目录 /var/lib/coredns 
mkdir -vp /var/lib/coredns 
 
3）Corefile 配置示例文件
$ cat /etc/coredns/Corefile
# 正向解析
weiyigeek.top {
  file /etc/coredns/db.weiyigeek.top.conf
  sign /etc/coredns/db.weiyigeek.top.conf {
    key file /etc/coredns/dnssec/Kweiyigeek.top.+013+29388.key
  }
}
 
4）运行后生成的signd文件
cat /var/lib/coredns/db.weiyigeek.top.signed
```

##### 2.7 **tsig 插件** 

tsig 定义 TSIG 密钥，验证传入的 TSIG 签名请求并签署响应。

> 插件地址:[tsig](https://coredns.io/plugins/tsig/)

对于 Secondary 主从区域传输暂不支持此插件，希望后续官方完善。

**语法**

```
tsig [ZONE...] {
  # 显式的设置密钥的名称 以及 TSIG 密钥
  secret NAME KEY
  # 使用文件方式的加载TSIG 密钥（推荐）
  secrets FILE
  # 指定用于的查询类型，例如 `AXFR IXFR`
  require [QTYPE...]
}
```

**案例**

```
1）使用 tsig-keygen 工具生成TSIG 密钥
tsig-keygen -a hmac-sha256 dns-tsig-keygen. >  /etc/coredns/dnssec/dns-tsig-keygen.secrets
cat /etc/coredns/dnssec/dns-tsig-keygen.secrets
# key "dns-tsig-keygen." {
#   algorithm hmac-sha256;
#   secret "ec5onpRjGTIaOBZa+zGl2VJbwdJl1qlzj+NZNHrhhk4=";
# };
 
2）Corefile 配置文件示例
# 要求 TSIG 签名的事务才能发出 AXFR IXFR
weiyigeek.top {
  file /etc/coredns/db.weiyigeek.top.conf
  tsig {
    secrets /etc/coredns/dnssec/dns-tsig-keygen.secrets
    require AXFR IXFR
  }
  transfer {
    to *
  }
}
 
# 要求 TSIG 签名的事务才能发出所有请求
auth.zone {
  tsig {
    secret auth.zone.key. NoTCJU+DMqFWywaPyxSijrDEA/eC3nK0xi3AMEZuPVk=
    require all
  }
  forward . 10.1.0.2
}
```

### 六、coredns日志处理

coredns的日志输出并不如nginx那么完善（并不能在配置文件中指定输出的文件目录，但是可以指定日志的格式），默认情况下不论是log插件还是error插件都会把所有的相关日志输出到程序的standard output中。使用systemd来管理coredns之后，默认情况下基本就是由rsyslog和systemd-journald这两个服务来管理日志。

#### 1、StandardOutput

根据网上的[参考资料](https://links.jianshu.com/go?to=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F37585758%2Fhow-to-redirect-output-of-systemd-service-to-a-file)我们可以得知较新版本的systemd是可以直接在systemd的unit文件里面配置`StandardOutput`和`StandardError`两个参数来将相关运行日志输出到指定的文件中。

因此对于centos8等较新的系统，我们的unit文件可以这样编写：

```
[Unit]
Description=CoreDNS
Documentation=https://coredns.io/manual/toc/
After=network.target
# StartLimit这两个相关参数也是centos8等systemd版本较新的系统才支持的
StartLimitBurst=1
StartLimitIntervalSec=15s
 
[Service]
# Type设置为notify时，服务会不断重启
Type=simple
User=root
# 指定运行端口和读取的配置文件
ExecStart=/home/coredns/coredns -dns.port=53 -conf /home/coredns/Corefile
# append类型可以在原有文件末尾继续追加内容，而file类型则是重新打开一个新文件
# 两者的区别类似于 echo >> 和 echo >
StandardOutput=append:/home/coredns/logs/coredns.log
StandardError=append:/home/coredns/logs/coredns_error.log
Restart=on-failure
 
[Install]
WantedBy=multi-user.target
```

修改完成之后我们再重启服务就可以看到日志已经被重定向输出到我们指定的文件中

    [root@tiny-server coredns]# systemctl daemon-reload
    [root@tiny-server coredns]# systemctl restart coredns.service

#### 2、rsyslog

对于centos7等系统而言，是不支持上面的append和file两个参数的，那么在开启了rsyslog.service服务的情况下，日志就会输出到/var/log/messages文件中，或者可以使用journalctl -u coredns命令来查看全部的日志。

如果想要将coredns的日志全部集中到一个文件进行统一管理，我们可以对负责管理systemd的日志的rsyslog服务的配置进行修改：

    # vim /etc/rsyslog.conf
    if $programname == 'coredns' then /home/coredns/logs/coredns.log
    & stop
     
    [root@tiny-server coredns]# systemctl restart rsyslog.service

### 七、 自定义域名解析

配置文件放在和 **`coredns`** 命令相同的 **`Corefile`** 文件中

语法：

```
# define a snippet
(snip) {
    prometheus
    log
    errors
}
 
. {
    whoami
    import snip
}
```

自定义配置：

```
. {
    forward . 8.8.8.8
}
mxsm.local {
	file mxsm.local { 
        reload 30s 
    }
}
```

配置一个mxsm.local文件：

```
@                       IN SOA   mxsm.local. devops.mxsm.local. (
                                     20200202 ; SERIAL
                                     7200     ; REFRESH
                                     600      ; RETRY
                                     3600000  ; EXPIRE
                                     60)      ; MINIMUM
@                       IN NS    dns1.mxsm.local.   
mxsm.local.             IN A     192.168.43.128         
 
 
redis.mxsm.local.         IN A     192.168.43.128
mysql.mxsm.local.         IN A     192.168.43.128
elasticsearch.mxsm.local. IN A     192.168.43.128
ftp                          IN A     192.168.43.128 
```

重新运行coredns服务，内外网验证。