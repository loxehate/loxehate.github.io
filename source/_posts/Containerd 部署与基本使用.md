---
title: Containerd 部署与基本使用
tags: [Docker]
categories: [云原生]
date: 2025-06-13
---
## 一、前言

```
Containerd官方网站：https://containerd.io/
Containerd代码托管地址： https://github.com/containerd/containerd
```

在containerd的下载页面，有两种类型的包：

```
一种是以containerd开头的包，此包只包含containerd本身，要想真正运行起来，还需要依赖runc以及cni
一种是以cri-containerd-cni开头的包，此包除了包含containerd本身，还包含了containerd运行所依赖的相关组件，包括runc，cni以及ctr和crictl管理工具
```

## 二、containerd部署

### 2.1 安装containerd

```
# 配置docker源3步
# step 1: 安装必要的一些系统工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# Step 2: 添加软件源信息
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# Step 3 配置yum源
sudo sed -i 's+download.docker.com+mirrors.aliyun.com/docker-ce+' /etc/yum.repos.d/docker-ce.repo
# 安装containerd
yum install -y containerd
# 启动containerd
systemctl enable containerd --now
# 查看containerd状态
systemctl status containerd
```

### 2.2 修改containerd配置文件

**使用如下方式生成containerd的默认配置文件**

```
# 新建目录/etc/containerd
mkdir /etc/containerd
# 生成containerd配置文件
containerd config default > /etc/containerd/config.toml
```

**修改配置文件示例如下**

```
# 修改配置文件
vi /etc/containerd/config.toml
```

**总共需要修改3处地方，下图标红表示需要修改的地方**

```
# 修改/etc/containerd.config.toml配置文件以下内容： 
[plugins]
  [plugins."io.containerd.grpc.v1.cri"]
    #sandbox_image = "k8s.gcr.io/pause:3.2"
    sandbox_image = "registry.aliyuncs.com/google_containers/pause:3.5"
      [plugins."io.containerd.grpc.v1.cri".containerd.runtimes]
          [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
            SystemdCgroup = true #对于使用 systemd 作为 init system 的 Linux 的发行版，使用 systemd 作为容器的 cgroup driver 可以确保节点在资源紧张的情况更加稳定
    [plugins."io.containerd.grpc.v1.cri".registry]
      [plugins."io.containerd.grpc.v1.cri".registry.mirrors]
        [plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
          endpoint = ["https://pqbap4ya.mirror.aliyuncs.com"]
        [plugins."io.containerd.grpc.v1.cri".registry.mirrors."k8s.gcr.io"]
          endpoint = ["https://registry.aliyuncs.com/k8sxio"]  
```

### **2.3 修改内核参数**

```
# 编辑文件 
vim /etc/sysctl.conf
# 加入如下行内容
fs.may_detach_mounts = 1
# 查看配置
sysctl -p
```

### **2.4 重启containerd**

```
systemctl restart containerd
```

### **2.5 验证containerd**

```
ctr version 
```

## 三、containerd部署（二进制）

### 3.1 部署下载包

```
# https://github.com/containernetworking/plugins/releases/
# wget https://ghproxy.com/https://github.com/containernetworking/plugins/releases/download/v1.3.0/cni-plugins-linux-amd64-v1.3.0.tgz
 
cd cby/
 
#创建cni插件所需目录
mkdir -p /etc/cni/net.d /opt/cni/bin 
#解压cni二进制包
tar xf cni-plugins-linux-amd64-v*.tgz -C /opt/cni/bin/
 
# https://github.com/containerd/containerd/releases/
# wget https://ghproxy.com/https://github.com/containerd/containerd/releases/download/v1.7.2/cri-containerd-cni-1.7.2-linux-amd64.tar.gz
 
#解压
tar -xzf cri-containerd-cni-*-linux-amd64.tar.gz -C /
 
#创建服务启动文件
cat > /etc/systemd/system/containerd.service <<EOF
[Unit]
Description=containerd container runtime
Documentation=https://containerd.io
After=network.target local-fs.target
 
[Service]
ExecStartPre=-/sbin/modprobe overlay
ExecStart=/usr/local/bin/containerd
Type=notify
Delegate=yes
KillMode=process
Restart=always
RestartSec=5
LimitNPROC=infinity
LimitCORE=infinity
LimitNOFILE=infinity
TasksMax=infinity
OOMScoreAdjust=-999
 
[Install]
WantedBy=multi-user.target
EOF
```

### 3.2 配置Containerd所需的模块

```
cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF
```

### 3.3 加载模块

```
systemctl restart systemd-modules-load.service
```

### 3.4 配置Containerd所需的内核

```
cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF
 
# 加载内核
 
sysctl --system
```

### 3.5 启动并设置为开机启动

```
systemctl daemon-reload
systemctl enable --now containerd
systemctl restart containerd
```

### 3.6 配置crictl客户端连接的运行时位置

```
# wget https://github.com/kubernetes-sigs/cri-tools/releases/download/v1.24.2/crictl-v1.24.2-linux-amd64.tar.gz
 
#解压
tar xf crictl-v*-linux-amd64.tar.gz -C /usr/bin/
#生成配置文件
cat > /etc/crictl.yaml <<EOF
runtime-endpoint: unix:///run/containerd/containerd.sock
image-endpoint: unix:///run/containerd/containerd.sock
timeout: 10
debug: false
EOF
 
#测试
systemctl restart  containerd
crictl info
```

## 四、Containerd常用操作

### 4.1 针对镜像操作

下载nginx镜像 -n指定命名空间

```
ctr -n=default image pull --all-platforms docker.io/library/nginx:1.18.0
ctr -n=default image pull --platform  linux/amd64 docker.io/library/nginx:1.18.0
```

- -n：指定命名空间，镜像下载到什么命名空间，后续就只能才这个命名空间下找到该镜像。
- –all-platforms：提取所有平台镜像
- –platform：提取指定平台镜像

查看镜像

```
ctr -n=default image list
```

导出镜像

```
ctr image export nginxv1.tar.gz docker.io/library/nginx:1.18.0
```

导入镜像

```
ctr image import nginxv1.tar.gz
```

[删除镜像](https://so.csdn.net/so/search?q=删除镜像&spm=1001.2101.3001.7020)

```
ctr image remove docker.io/library/nginx:1.18.0
```

挂载镜像

将 nginx:1.18.0镜像 挂载到 /mnt 下

```
ctr image mount docker.io/library/nginx:1.18.0 /mnt/
```

卸载镜像

```
umount /mnt
```

镜像[打标签](https://so.csdn.net/so/search?q=打标签&spm=1001.2101.3001.7020)

```
ctr image tag docker.io/library/nginx:1.18.0 16.32.15.100/nginx:1.18.0
```

镜像检查

```
ctr image check
```

### 4.2 针对容器操作

- 静态容器：只创建容器并不运行容器内程序
- 动态容器：创建容器并运行容器内程序

创建静态容器

创建容器镜像必须在本地存在，否则无法创建。

```
ctr container create docker.io/library/nginx:1.18.0 nginx-1
```

查看容器

```
ctr container ls
ctr container list
```

查看容器详细信息

```
ctr container info nginx-1
```

启动静态容器

静态容器启动后会成为动态容器

```
ctr task start -d nginx-1
```

- -d：后台运行，类似docker run -d

查看任务

task表示容器内运行的进程信息

```
ctr task ls
ctr task ps nginx-1
```

进入容器内

```
ctr task exec --exec-id 1 nginx-1 sh
curl http://127.0.0.1
```

- –exec-id：指定要执行的命令的ID，该参数唯一

运行一个动态容器

```
ctr run -d --net-host docker.io/library/nginx:1.18.0  nginx-2
ctr task ls
```

- –net-host : 指定网络，host表示和宿主机共享网络

挂起容器

```
ctr task pause nginx-1
ctr task ls
```

恢复容器

```
ctr task resume nginx-1
ctr task ls
```

停止容器

```
ctr task kill nginx-1
```

[删除容器](https://so.csdn.net/so/search?q=删除容器&spm=1001.2101.3001.7020)

```
ctr task rm nginx-1
```

### **4.3 命令总结**

```
查看命名空间
ctr namespace ls
查看 K8S 命名空间下的镜像
ctr -n k8s.io images/i ls
下载镜像
ctr -n k8s.io images pull docker.io/goharbor/nginx-photon:v1.10.10
镜像标记tag
ctr -n k8s.io i tag docker.io/goharbor/nginx-photon:v1.10.10 docker.io/goharbor/nginx-photon:v1.10.11
注意: 若新镜像reference 已存在, 需要先删除新reference, 或者如下方式强制替换
ctr -n k8s.io i tag --force docker.io/goharbor/nginx-photon:v1.10.10 docker.io/goharbor/nginx-photon:v1.10.101
删除镜像
ctr -n k8s.io i rm docker.io/goharbor/nginx-photon:v1.10.10
push 上传镜像
ctr images push docker.io/goharbor/nginx-photon:v1.10.10
导出镜像
ctr -n k8s.io i export nginx.tar  docker.io/goharbor/nginx-photon:v1.10.10
导入镜像
ctr -n k8s.io images import nginx.tar
ctr -n k8s.io images ls -q
```

```
创建 container
ctr -n k8s.io c create docker.io/goharbor/nginx-photon:v1.10.10 nginx
查看容器
ctr -n k8s.io c ls
运行容器
ctr -n k8s.io run [command options] [flags] Image|RootFS ID [COMMAND] [ARG...]
ctr -n k8s.io run nginx /bin/bash
后台启动
ctr -n k8s.io t start -d nginx
查看 container
ctr -n k8s.io t ls
查看 k8s 中正在运行的容器
ctr -n k8s.io task ls
查看该容器在宿主机的PID，并进入容器
ctr -n buildkit t exec --exec-id $RANDOM -t f4bd1e21da3190e9fbd9c0ae51c3649419e87a3b7f71067df28b5ded3313b76e sh
停止容器,需要先停止容器内的task, 再删除容器
ctr -n k8s.io tasks kill -a -s 9 {id}
ctr -n k8s.io c rm {id}
```

## 五、常用配置说明

### 5.1 配置镜像加速器

```
[plugins.cri.registry]
  [plugins.cri.registry.mirrors]
    [plugins.cri.registry.mirrors."docker.io"]
      #endpoint = ["https://registry-1.docker.io"]
      endpoint = ["https://o0o4czij.mirror.aliyuncs.com"]
```

### 5.2 配置非安全的私有仓库

```
[plugins.cri.registry.mirrors."192.168.0.1:5000"]
  endpoint = ["http://192.168.0.1:5000"]
```

### 5.3 配置带认证的非安全的私有仓库

```
[plugins.cri.registry.mirrors."192.168.0.1:5000"]
  endpoint = ["http://192.168.0.1:5000"]
[plugins.cri.registry.configs."192.168.0.1:5000".auth]
  username = "admin"
  password = "Harbor12345"
```

### 5.4 配置使用自签名的ssl证书的私有仓库

```
plugins.cri.registry.mirrors."hub.example.com"]
  endpoint = ["https://hub.example.com"]
[plugins.cri.registry.configs."hub.example.com".auth]
  username = "admin"
  password = "Harbor12345"
[plugins.cri.registry.configs."hub.example.com".tls]
  ca_file = "/opt/certs/ca.crt"
```

## 六、docker、containerd、ctr、crictl 的联系

### 6.1 [docker](https://so.csdn.net/so/search?q=docker&spm=1001.2101.3001.7020) 和 containerd

```
1、docker 由 docker-client ,dockerd,containerd,docker-shim,runc组成，所以containerd是docker的基础组件之一

2、从k8s的角度看，可以选择 containerd 或 docker 作为运行时组件：其中 containerd 调用链更短，组件更少，更稳定，占用节点资源更少。所以k8s后来的版本开始默认使用 containerd 。

3、containerd 相比于docker , 多了 namespace 概念，每个 image 和 container 都会在各自的namespace下可见。

4、docker 作为 k8s 容器运行时，调用关系为：kubelet --> dockershim （在 kubelet 进程中） --> dockerd --> containerd
containerd 作为 k8s 容器运行时，调用关系为：kubelet --> cri plugin（在 containerd 进程中） --> containerd
```

### 6.2 命令区分

ctr 是 containerd 的一个客户端工具。
crictl 是 CRI 兼容的容器运行时命令行接口，可以使用它来检查和调试 k8s 节点上的容器运行时和应用程序。
ctr -v 输出的是 containerd 的版本，crictl -v 输出的是当前 k8s 的版本，从结果显而易见你可以认为 crictl 是用于 k8s 的。

```
[root@localhost test]# ctr -v
ctr github.com/containerd/containerd v1.4.11
[root@localhost test]# crictl -v
crictl version v1.21.0-k3s1
```

```
一般来说你某个主机安装了 k8s 后，命令行才会有 crictl 命令。而 ctr 是跟 k8s 无关的，你主机安装了 containerd 服务后就可以操作 ctr 命令。
```

### 6.3 常用命令

| 命令                | docker            | ctr（containerd）            | crictl（kubernetes） |
| ------------------- | ----------------- | ---------------------------- | -------------------- |
| 查看运行的容器      | docker ps         | ctr task ls/ctr container ls | crictl ps            |
| 查看镜像            | docker images     | ctr image ls                 | crictl images        |
| 查看容器日志        | docker logs       | 无                           | crictl logs          |
| 查看容器数据信息    | docker inspect    | ctr container info           | crictl inspect       |
| 查看容器资源        | docker stats      | 无                           | crictl stats         |
| 启动/关闭已有的容器 | docker start/stop | ctr task start/kill          | crictl start/stop    |
| 运行一个新的容器    | docker run        | ctr run                      | 无（最小单元为pod）  |
| 修改镜像标签        | docker tag        | ctr image tag                | 无                   |
| 创建一个新的容器    | docker create     | ctr container create         | crictl create        |
| 导入镜像            | docker load       | ctr image import             | 无                   |
| 导出镜像            | docker save       | ctr image export             | 无                   |
| 删除容器            | docker rm         | ctr container rm             | crictl rm            |
| 删除镜像            | docker rmi        | ctr image rm                 | crictl rmi           |
| 拉取镜像            | docker pull       | ctr image pull               | crictl pull          |
| 推送镜像            | docker push       | ctr image push               | 无                   |
| 在容器内部执行命令  | docker exec       | 无                           | crictl exec          |
| NameSpace管理       | 无                | ctr namespace --help         |                      |

## 七、containerd问题

### 7.1 问题及现象

containerd进程有大量报错

```
failed to create containerd task: failed to create shim task: OCI runtime create failed: unable to retrieve OCI runtime error (open /run/containerd/io.containerd.runtime.v2.task/k8s.io/c4847070fad34a8da9b16b5c20cdc38e28a15cfcf9913d712e4fe60d8c9029f7/log.json: no such file or directory): runc did not terminate successfully: exit status 127: unknown
```

**解决方案**

查看现有libseccomp版本

```
# sudo rpm -qa | grep libseccomp
libseccomp-2.3.3-3.el8.x86_64
```

卸载低版本libseccomp

```
# sudo rpm -e libseccomp-2.3.3-3.el8.x86_64 --nodeps

# sudo rpm -qa | grep libseccomp
```

安装高版本libseccomp

```
# yum provides libseccomp
Last metadata expiration check: 0:48:39 ago on Tue 28 Mar 2023 01:49:06 PM CST.
libseccomp-2.5.2-1.el8.i686 : Enhanced seccomp library
Repo        : Base
Matched from:
Provide    : libseccomp = 2.5.2-1.el8

libseccomp-2.5.2-1.el8.x86_64 : Enhanced seccomp library
Repo        : Base
Matched from:
Provide    : libseccomp = 2.5.2-1.el8


# yum install libseccomp-2.5.2-1.el8.x86_64
Last metadata expiration check: 0:49:46 ago on Tue 28 Mar 2023 01:49:06 PM CST.
Dependencies resolved.
======================================================================================================================================================================
 Package                                   Arch                                  Version                                    Repository                           Size
======================================================================================================================================================================
Installing:
 libseccomp                                x86_64                                2.5.2-1.el8                                Base                                 71 k

Transaction Summary
======================================================================================================================================================================
Install  1 Package

Total download size: 71 k
Installed size: 166 k
Is this ok [y/N]: y
Downloading Packages:
libseccomp-2.5.2-1.el8.x86_64.rpm                                                                                                      38 MB/s |  71 kB     00:00    
----------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                 7.0 MB/s |  71 kB     00:00     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                              1/1 
  Installing       : libseccomp-2.5.2-1.el8.x86_64                                                                                                                1/1 
  Running scriptlet: libseccomp-2.5.2-1.el8.x86_64                                                                                                                1/1 
  Verifying        : libseccomp-2.5.2-1.el8.x86_64                                                                                                                1/1 

Installed:
  libseccomp-2.5.2-1.el8.x86_64                                                                                                                                       

Complete!


# sudo rpm -qa | grep libseccomp
libseccomp-2.5.2-1.el8.x86_64
```

runc中依赖的libseccomp
libseccomp已经是高版本的了

```
# runc --version
runc version 1.1.4
commit: v1.1.4-0-g5fd4c4d1
spec: 1.0.2-dev
go: go1.18.10
libseccomp: 2.5.2
```

**原理**

```
libseccomp需要高于2.4版本

containerd.io 要求安装版本为 2.4.0 的 libseccomp
```

## 八、Containerd Network管理

```
默认Containerd管理的容器仅有lo网络，无法访问容器之外的网络，可以为其添加网络插件，使用容器可以连接外网。CNI（Container Network Interface）
```

### 8.1 创建CNI网络

| [*containernetworking*/*cni*](https://github.com/containernetworking/cni) | [CNI v1.0.1](https://github.com/containernetworking/cni/releases/tag/v1.0.1) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [*containernetworking*/*plugins*](https://github.com/containernetworking/plugins) | [CNI Plugins v1.0.1](https://github.com/containernetworking/plugins/releases/tag/v1.0.1) |

#### 8.1.1 获取CNI工具源码

```
使用wget下载cni工具源码包
# wget https://github.com/containernetworking/cni/archive/refs/tags/v1.0.1.tar.gz
```

```
查看已下载cni工具源码包
# ls
v1.0.1.tar.gz

解压已下载cni工具源码包
# tar xf v1.0.1.tar.gz

查看解压后已下载cni工具源码包
# ls
cni-1.0.1

重命名已下载cni工具源码包目录
# mv cni-1.0.1 cni

查看重新命名后目录
# ls
cni

查看cni工具目录中包含的文件
# ls cni
cnitool             CONTRIBUTING.md  DCO            go.mod  GOVERNANCE.md  LICENSE   MAINTAINERS  plugins    RELEASING.md  scripts  test.sh
CODE-OF-CONDUCT.md  CONVENTIONS.md   Documentation  go.sum  libcni         logo.png  pkg          README.md  ROADMAP.md    SPEC.md
```

#### 8.1.2 获取CNI Plugins（CNI插件）

```
使用wget下载cni插件工具源码包
# wget https://github.com/containernetworking/plugins/releases/download/v1.0.1/cni-plugins-linux-amd64-v1.0.1.tgz
```

```
查看已下载cni插件工具源码包
# ls
cni-plugins-linux-amd64-v1.0.1.tgz
cni

创建cni插件工具解压目录
# mkdir /home/cni-plugins

解压cni插件工具至上述创建的目录中
# tar xf cni-plugins-linux-amd64-v1.0.1.tgz -C /home/cni-plugins

查看解压后目录
# ls cni-plugins
bandwidth  bridge  dhcp  firewall  host-device  host-local  ipvlan  loopback  macvlan  portmap  ptp  sbr  static  tuning  vlan  vrf
```

#### 8.1.3 准备CNI网络配置文件

```
准备容器网络配置文件，用于为容器提供网关、IP地址等。
```

```
创建名为mynet的网络，其中包含名为cni0的网桥
# vim /etc/cni/net.d/10-mynet.conf
# cat /etc/cni/net.d/10-mynet.conf
{
  "cniVersion": "1.0.0",
  "name": "mynet",
  "type": "bridge",
  "bridge": "cni0",
  "isGateway": true,
  "ipMasq": true,
  "ipam": {
    "type": "host-local",
    "subnet": "10.66.0.0/16",
    "routes": [
      { "dst": "0.0.0.0/0" }
   ]
  }
}
```

```
# vim /etc/cni/net.d/99-loopback.conf
# cat /etc/cni/net.d/99-loopback.conf
{
  "cniVerion": "1.0.0",
  "name": "lo",
  "type": "loopback"
}
```

#### 8.1.4 生成CNI网络

```
获取epel源
# wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo

安装jq
# yum -y install jq
```

```
进入cni工具目录
# cd cni
[root@localhost cni]# ls
cnitool             CONTRIBUTING.md  DCO            go.mod  GOVERNANCE.md  LICENSE   MAINTAINERS  plugins    RELEASING.md  scripts  test.sh
CODE-OF-CONDUCT.md  CONVENTIONS.md   Documentation  go.sum  libcni         logo.png  pkg          README.md  ROADMAP.md    SPEC.md


必须在scripts目录中执行，需要依赖exec-plugins.sh文件，再次进入scripts目录
[root@localhost cni]# cd scripts/ 

查看执行脚本文件
[root@localhost scripts]# ls
docker-run.sh  exec-plugins.sh  priv-net-run.sh  release.sh

执行脚本文件，基于/etc/cni/net.d/目录中的*.conf配置文件生成容器网络
[root@localhost scripts]# CNI_PATH=/home/cni-plugins ./priv-net-run.sh echo "Hello World"
Hello World
```

```
在宿主机上查看是否生成容器网络名为cni0的网桥
# ip a s
......
5: cni0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default qlen 1000
    link/ether 36:af:7a:4a:d6:12 brd ff:ff:ff:ff:ff:ff
    inet 10.66.0.1/16 brd 10.66.255.255 scope global cni0
       valid_lft forever preferred_lft forever
    inet6 fe80::34af:7aff:fe4a:d612/64 scope link
       valid_lft forever preferred_lft forever
```

```
在宿主机上查看其路由表情况
# ip route
default via 192.168.10.2 dev ens33 proto dhcp metric 100
10.66.0.0/16 dev cni0 proto kernel scope link src 10.66.0.1
192.168.10.0/24 dev ens33 proto kernel scope link src 192.168.10.164 metric 100
192.168.122.0/24 dev virbr0 proto kernel scope link src 192.168.122.1

```

### 8.2 为Containerd容器配置网络功能

#### 8.2.1 创建一个容器

```
# ctr images ls
REF TYPE DIGEST SIZE PLATFORMS LABELS

# ctr images pull docker.io/library/busybox:latest

# ctr run -d docker.io/library/busybox:latest busybox

# ctr container ls
CONTAINER    IMAGE                               RUNTIME
busybox      docker.io/library/busybox:latest    io.containerd.runc.v2

# ctr tasks ls
TASK       PID     STATUS
busybox    8377    RUNNING
```

#### 8.2.2 进入容器查看其网络情况

```
# ctr tasks exec --exec-id $RANDOM -t busybox sh

/ # ip a s
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
```

#### 8.2.3 获取容器进程ID及其网络命名空间

```
在宿主机中完成指定容器进程ID获取
# pid=$(ctr tasks ls | grep busybox | awk '{print $2}')
# echo $pid
8377
```

```
在宿主机中完成指定容器网络命名空间路径获取
# netnspath=/proc/$pid/ns/net
# echo $netnspath
/proc/8377/ns/net
```

#### 8.2.4 为指定容器添加网络配置

```
确认执行脚本文件时所在的目录
[root@localhost scripts]# pwd
/home/cni/scripts
```

```
执行脚本文件为容器添加网络配置
[root@localhost scripts]# CNI_PATH=/home/cni-plugins ./exec-plugins.sh add $pid $netnspath
```

```
进入容器确认是否添加网卡信息
# ctr tasks exec --exec-id $RANDOM -t busybox sh
/ # ip a s
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0@if7: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue
    link/ether a2:35:b7:e0:60:0a brd ff:ff:ff:ff:ff:ff
    inet 10.66.0.3/16 brd 10.66.255.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::a035:b7ff:fee0:600a/64 scope link
       valid_lft forever preferred_lft forever
       
在容器中ping容器宿主机IP地址
/ # ping -c 2 192.168.10.164
PING 192.168.10.164 (192.168.10.164): 56 data bytes
64 bytes from 192.168.10.164: seq=0 ttl=64 time=0.132 ms
64 bytes from 192.168.10.164: seq=1 ttl=64 time=0.044 ms

--- 192.168.10.164 ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss
round-trip min/avg/max = 0.044/0.088/0.132 ms


在容器中ping宿主机所在网络中的其它主机IP地址
/ # ping -c 2 192.168.10.165
```

```
在容器中开启httpd服务
/ # echo "containerd net web test" > /tmp/index.html
/ # httpd -h /tmp

/ # wget -O - -q 127.0.0.1
containerd net web test
/ # exit
```

```
在宿主机访问容器提供的httpd服务
[root@localhost scripts]# curl http://10.66.0.3
containerd net web test
```

## 九、Containerd容器数据持久化存储

实现把宿主机目录挂载至Containerd容器中，实现容器数据持久化存储

```
# ctr container create docker.io/library/busybox:latest busybox3 --mount type=bind,src=/tmp,dst=/hostdir,options=rbind:rw
```

```
说明：
创建一个静态容器，实现宿主机目录与容器挂载
src=/tmp 为宿主机目录
dst=/hostdir 为容器中目录
```

```
运行用户进程
# ctr tasks start -d busybox3 bash
```

```
进入容器，查看是否挂载成功
# ctr tasks exec --exec-id $RANDOM -t busybox3 sh

/ # ls /hostdir
VMwareDnD
systemd-private-cf1fe70805214c80867e7eb62dff5be7-bolt.service-MWV1Ju
systemd-private-cf1fe70805214c80867e7eb62dff5be7-chronyd.service-6B6j8p
systemd-private-cf1fe70805214c80867e7eb62dff5be7-colord.service-6fI31A
systemd-private-cf1fe70805214c80867e7eb62dff5be7-cups.service-tuK4zI
systemd-private-cf1fe70805214c80867e7eb62dff5be7-rtkit-daemon.service-vhP67o
tracker-extract-files.0
vmware-root_703-3988031936
vmware-root_704-2990744159
vmware-root_713-4290166671


向容器中挂载目录中添加文件
/ # echo "hello world" > /hostdir/test.txt

退出容器
/ # exit

在宿主机上查看被容器挂载的目录中是否添加了新的文件，已添加表明被容器挂载成功，并可以读写此目录中内容。
[root@localhost ~]# cat /tmp/test.txt
hello world
```

## 十、与其它Containerd容器共享命名空间

当需要与其它Containerd管理的容器共享命名空间时，可使用如下方法。

```
# ctr tasks ls
TASK        PID      STATUS
busybox3    13778    RUNNING
busybox     8377     RUNNING
busybox1    12469    RUNNING
```

```
# ctr container create --with-ns "pid:/proc/13778/ns/pid" docker.io/library/busybox:latest busybox4
[root@localhost ~]# ctr tasks start -d busybox4 bash
[root@localhost ~]# ctr tasks exec --exec-id $RANDOM -t busybox3 sh
/ # ps aux
PID   USER     TIME  COMMAND
    1 root      0:00 sh
   20 root      0:00 sh
   26 root      0:00 sh
   32 root      0:00 ps aux
```

## 十一、Docker集成Containerd实现[容器管理](https://so.csdn.net/so/search?q=容器管理&spm=1001.2101.3001.7020)

目前Containerd主要任务还在于解决容器运行时的问题，对于其周边生态还不完善，所以可以借助Docker结合Containerd来实现Docker完整的功能应用

```
准备Docker安装YUM源
# wget -O /etc/yum.repos.d/docker-ce.repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

```
安装Docker-ce
# yum -y install docker-ce
```

```
修改Docker服务文件，以便使用已安装的containerd。
# vim /etc/systemd/system/multi-user.target.wants/docker.service

修改前：
[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock 此处
ExecReload=/bin/kill -s HUP $MAINPID

修改后：

[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker
ExecStart=/usr/bin/dockerd --containerd  /run/containerd/containerd.sock --debug 此处
ExecReload=/bin/kill -s HUP $MAINPID
TimeoutSec=0
RestartSec=2
Restart=always
```

```
设置docker daemon启动并设置其开机自启动
# systemctl daemon-reload
# systemctl enable docker
Created symlink from /etc/systemd/system/multi-user.target.wants/docker.service to /usr/lib/systemd/system/docker.service.
# systemctl start docker
```

```
查看其启动后进程
# ps aux | grep docker
root      16270  0.0  3.1 1155116 63320 ?       Ssl  12:09   0:00 /usr/bin/dockerd --containerd /run/containerd/containerd.sock --debug
```

```
使用docker运行容器
# docker run -d nginx:latest
......
219a9c6727bcd162d0a4868746c513a277276a110f47e15368b4229988003c13
```

```
使用docker ps命令查看正在运行的容器
# docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS     NAMES
219a9c6727bc   nginx:latest   "/docker-entrypoint.…"   14 seconds ago   Up 13 seconds   80/tcp    happy_tu
```

```
使用ctr查看是否添加一个新的namespace，本案例中发现添加一个moby命名空间，即为docker使用的命名空间。
# ctr namespace ls
NAME    LABELS
default
kubemsb
moby
```

```
查看moby命名空间，发现使用docker run运行的容器包含在其中。
# ctr -n moby container ls
CONTAINER                                                           IMAGE    RUNTIME
219a9c6727bcd162d0a4868746c513a277276a110f47e15368b4229988003c13    -        io.containerd.runc.v2
```

```
使用ctr能够查看到一个正在运行的容器，既表示docker run运行的容器是被containerd管理的。
# ctr -n moby tasks ls
TASK                                                                PID      STATUS
219a9c6727bcd162d0a4868746c513a277276a110f47e15368b4229988003c13    16719    RUNNING
```

```
使用docker stop停止且使用docker rm删除容器后再观察，发现容器被删除。
# docker stop 219;docker rm 219
219
219

# ctr -n moby container ls
CONTAINER    IMAGE    RUNTIME

# ctr -n moby tasks ls
TASK    PID    STATUS
```

