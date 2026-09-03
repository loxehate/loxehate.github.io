---
title: Docker 安装与卸载
slug: Docker 安装与卸载
published: 2025-06-13
description: 以下操作使用root用户操作
image: '../../assets/images/Dota-img/broodmother.webp'
tags:
  - Docker
category: 云原生
draft: false
lang: zh-CN
pinned: false
comment: true
---
### 一、环境

```
系统：Centos7.9
docker版本：20.10.12
docker-compose：2.2.2
```

### 二、互联网环境

#### 2.1 环境配置

```
# 备份镜像源
mkdir -p /etc/yum.repos.d/bak
mv /etc/yum.repos.d/*.repo /etc/yum.repos.d/bak/
# 下载repo
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
# 更新镜像源
yum makecache
# 修改chrony配置文件指定NTP源为阿里 腾讯NTP
sed -r -i 's?^server 0.+iburst?server ntp.aliyun.com iburst?' /etc/chrony.conf
sed -r -i 's?^server 1.+iburst?server ntp1.aliyun.com iburst?' /etc/chrony.conf
sed -r -i 's?^server 2.+iburst?server time1.cloud.tencent.com iburst?' /etc/chrony.conf
sed -r -i 's?^server 3.+iburst?server time2.cloud.tencent.com iburst?' /etc/chrony.conf
# 重启chrony服务
systemctl restart chronyd
# 开机自动启动chrony服务
systemctl enable chronyd
# 查看时间服务器状态
chronyc sources -v
# 创建docker目录
mkdir -p /etc/docker /opt/docker
# 创建docker配置文件
tee /etc/docker/daemon.json <<-'EOF'
{
	"data-root": "/opt/docker",
	"log-driver": "json-file",
	"log-opts": {
		"max-size": "800m",
		"max-file": "50"
	},
	"registry-mirrors": [
		"https://hub-mirror.c.163.com",
		"https://docker.mirrors.ustc.edu.cn",
		"https://registry.docker-cn.com"
	]
}
EOF
```

#### 2.2 安装docker

```
#查询可安装的版本
yum list docker-ce --showduplicates | sort -r
#安装docker
yum -y install docker-ce-19.03.5 docker-ce-cli-19.03.5 containerd.io
#查看版本号
docker version
#查看版本信息
docker info
#设置开机自启动
systemctl enable docker
# containerd容器开机自动启动
systemctl enable containerd
#启动docker
systemctl start docker 
# 下载docker-compose
curl -L "https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 给予docker-compose执行权
chmod +x /usr/local/bin/docker-compose
# 查看docker-compose版本信息
docker-compose --version
```

#### 2.3 卸载docker

```
yum list installed | grep docker
yum remove docker-ce* -y
rm -rf  /var/lib/containerd
rm -rf  /var/lib/docker
```

### 三、无互联网环境

#### 3.1 环境配置

```
# 创建docker目录
mkdir -p /etc/docker /opt/docker
# 创建docker配置文件
tee /etc/docker/daemon.json <<-'EOF'
{
	"graph": "/opt/docker",
	"log-driver": "json-file",
	"log-opts": {
		"max-size": "800m",
		"max-file": "50"
	}
}
EOF
```

#### 3.2 安装docker和docker-compose

```
# 进入opt目录
cd /opt
# 上传离线文件包docker-20.10.12-centos7-offline.tar.gz至/opt目录
# 解压
tar -zxvf docker-20.10.12-centos7-offline.tar.gz
# 进入目录
cd /opt/docker-20.10.12-centos7-offline
# 安装docker
rpm -ivh *.rpm
# 复制docker-compose二进制文件至bin目录
cp /opt/docker-20.10.12-centos7-offline/docker-compose-linux-x86_64 /usr/local/bin/docker-compose
# 给予执行权限
chmod +x /usr/local/bin/docker-compose
# 启动docker
systemctl start docker
# docker开机自动启动
systemctl enable docker
# containerd容器开机自动启动
systemctl enable containerd
# 查看docker版本信息
docker info
# 查看docker-compose版本信息
docker-compose --version
```

#### 3.2 卸载docker

```
yum list installed | grep docker
yum remove docker-ce* -y
rm -rf  /var/lib/containerd
rm -rf  /var/lib/docker
```

### 四、普通用户执行docker

```
底层逻辑：普通用户添加到docker用户组
```

#### 4.1 用户组检查

以下操作使用root用户操作

检查docker.sock文件所属用户组

```
ll /run/docker.sock

srw-rw---- 1 root docker 0 Nov 25 13:51 /var/run/docker.sock
```

检查docker用户组是否存在

```
[root@demo ~]# cat /etc/group |grep docker
docker:x:1000:
```

如果不存在用户组 docker，创建命令为 `groupadd docker`

如果第1步查看 `/var/run/docker.sock` 不在 docker 用户组中，则需要将 docker.sock 添加到 docker 用户组中

```
[root@demo ~]# chgrp docker /var/run/docker.sock
```

#### 4.2 授权操作

为了演示，本例重新创建一个普通用户 `test1`

1、创建用户

```
[root@demo ~]# adduser test1
[root@demo ~]# passwd test1
```

2、将普通用户添加到 docker 用户组中

```
[root@demo ~]# gpasswd -a test1 docker
```

#### 4.3 验证

切换到普通用户操作 docker 命令验证效果

1、切换到普通用户

```
[root@demo ~]# su - test1
```

2、查看当前用户所属组

```
[test1@demo ~]$ id
uid=1000(test1) gid=1001(test1) groups=1001(test1),1000(docker)
```

3、执行[docker命令](https://so.csdn.net/so/search?q=docker命令&spm=1001.2101.3001.7020)验证结果

```
[test1@demo ~]$ docker images
REPOSITORY       TAG       IMAGE ID       CREATED         SIZE
[test1@demo ~]$ docker ps
CONTAINER ID   IMAGE       COMMAND       CREATED       STATUS         PORTS         NAMES
```

### 五、Docker in docker

#### 5.1. 修改宿主机docker.sock文件权限设置

将 host 上 docker socket 的拥有者修改为运行 uid=1000 的用户, 或者直接将权限修改为其他人可读写`666`:

```
修改宿主机上 socket 的 owner 为 id=1000 的用户
sudo chown 1000 /var/run/docker.sock
# 或修改 sock 的权限为 666
sudo chmod 666 /var/run/docker.sock
```

这个方案无需重启容器, 直接在容器内运行 `docker ps` 可以看到能输出正常结果

```
方案有一个比较的缺陷, 那就是如果宿主机或者 docker 重启, 会重新创建 docker.sock 文件, 其所有者会被重置为 root 用户, 所以我们又需要再执行上面的命令修改权限.
```

#### 5.2  给予容器 docker 组权限（推荐）

容器内的 jenkins 用户增加 id=128 的组权限. 而正好 **`docker run` 很友好地提供 `groupd-add` 参数**支持该操作.

官方文档 [Additional groups🔗](https://docs.docker.com/engine/reference/run/#additional-groups)

```
--group-add: Add additional groups to run as

By default, the docker container process runs with the supplementary groups looked up for the specified user. If one wants to add more to that list of groups, then one can use this flag:

$ docker run --rm --group-add audio --group-add nogroup --group-add 777 busybox id

uid=0(root) gid=0(root) groups=10(wheel),29(audio),99(nogroup),777
```

一个通过 `group_add` 参数给容器中的用户通过 group name 或者 group id 添加多个额外的用户组权限, 但是注意: 这个用户组是指容器内的用户组, 其 id 可能跟宿主机上的 id 不一致. 而我们要让容器内的用户拥有 host 的某个 group 权限, 需要通过 id 来赋权.

因此这里我们先看 host 上 docker 组的 id.

```
$ cat /etc/group | grep docker
[sudo] password for fly:
docker:x:128:fly
```

可以看到 docker 用户组 id 为 128. 因此我们在创建容器的时候加上 `--group_add=128` 即可让容器内的 `jenkins` 用户拥有 `/var/run/docker.sock` 文件的读写权限:

```
# 先移除旧容器
sudo docker rm -f dao_jenkins_1
# 重新创建容器
sudo docker run -d -p 8081:8080 -p 50001:50000 \
    -v /data2/jenkins/jenkins_home:/var/jenkins_home \
    -v /etc/localtime:/etc/localtime:ro \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /etc/docker:/etc/docker \
    -v /usr/bin/docker:/usr/bin/docker \
    --restart=always  \
    --group_add=128 \
    --name dao_jenkins_1 \
    jenkins/jenkins:blueocean
```

#### 5.3 Jenkins启动时指定root用户或使用特权升级策略(privileged: true)

```
version: "3"
 
services:
 
  jenkins:
    image: jenkinsci/blueocean
    restart: unless-stopped
    container_name: jenkins
    ports:
      - "8080:8080"
    networks:
      - sonarnet
    privileged: true
    user: root
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - /home/data/jenkins/jenkins_home:/var/jenkins_home
      # 保持 docker 中的时区跟 host 保持一致, 否则日志等时间都使用 UTC+0 时区, 跟中国时间差 8 个小时
      - /etc/localtime:/etc/localtime:ro
      # 挂载宿主机本地的maven环境
      - /usr/local/jt/apache-maven-3.6.3:/usr/local/maven
      # 让容器使用宿主的docker
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker
      - /etc/docker:/etc/docker
 
networks:
  sonarnet:
    driver: bridge
```

### 六、Docker问题

#### 6.1 docker [删除容器](https://so.csdn.net/so/search?q=删除容器&spm=1001.2101.3001.7020)报错

```
docker rm 33ca9f5ac99b

Error response from daemon: Driver overlay failed to remove root filesystem 33ca9f5ac99b0925c63b5fd15a1f0751912d13fd22533179fc5e486258ebfe77: remove /var/lib/docker/overlay/7a3cea39df7ef4628e20d635fe6d120aed97ea9d07cfca1d300dda15e77bba97/merged: device or resource busy
```

**挂在的文件被其他进程占用了**

```
> grep docker /proc/*/mountinfo|grep 7a3cea39df7ef4628e20d635fe6d120aed97ea9d07cfca1d300dda15e77bba97

/proc/3235/mountinfo:211 194 0:76 / /var/lib/docker/overlay/7a3cea39df7ef4628e20d635fe6d120aed97ea9d07cfca1d300dda15e77bba97/merged rw,relatime shared:118 - overlay overlay rw,lowerdir=/var/lib/docker/ov                          erlay/faa6b36051d2aaed6d1b5f08b0348402581bb4360d7ee974b3ee71f9fb97ac95/root,upperdir=/var/lib/docker/overlay/7a3cea39df7ef4628e20d635fe6d120aed97ea9d07cfca1d300dda15e77bba97/upper,workdir=/var/lib/docker                          /overlay/7a3cea39df7ef4628e20d635fe6d120aed97ea9d07cfca1d300dda15e77bba97/work
/proc/3381/mountinfo:211 194 0:76 / /var/lib/docker/overlay/7a3cea39df7ef4628e20d635fe6d120aed97ea9d07cfca1d300dda15e77bba97/merged rw,relatime shared:118 - overlay overlay rw,lowerdir=/var/lib/docker/ov                          erlay/faa6b36051d2aaed6d1b5f08b0348402581bb4360d7ee974b3ee71f9fb97ac95/root,upperdir=/var/lib/docker/overlay/7a3cea39df7ef4628e20d635fe6d120aed97ea9d07cfca1d300dda15e77bba97/upper,workdir=/var/lib/docker                          /overlay/7a3cea39df7ef4628e20d635fe6d120aed97ea9d07cfca1d300dda15e77bba97/work
```

**找到进程ID**

```
> grep docker /proc/*/mountinfo|grep 7a3cea39df7ef4628e20d635fe6d120aed97ea9d07cfca1d300dda15e77bba97 | awk -F ":" '{print $1}' | awk -F "/" '{print $3}'
3235
3381

> kill -9 3235 3381
> docker rm  33ca9f5ac99b
```

