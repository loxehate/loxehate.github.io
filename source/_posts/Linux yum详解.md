---
title: Linux yum详解
tags: [yum]
categories: [Linux]
date: 2025-05-16
---
### 一、[yum](https://so.csdn.net/so/search?q=yum&spm=1001.2101.3001.7020)命令介绍

#### 1. yum命令简介

`yum` 是一种强大的包管理工具，用于在基于 RPM 包[管理系统](https://so.csdn.net/so/search?q=管理系统&spm=1001.2101.3001.7020)的 Linux 发行版中管理软件包。它可以自动解决软件包之间的依赖关系，简化了软件包的安装、更新和删除过程。

#### 2. yum命令的基本语法

`yum` 命令的基本语法如下：

```
yum [选项] [参数] [包名]
```

#### 3. 常用的yum命令选项

下面是一些常用的 `yum` 命令选项的说明：

```
-y：在执行操作时自动回答 “yes”，省去用户确认步骤。
-q：以静默模式执行命令，减少输出信息。
-v：以详细模式执行命令，增加输出信息。
-h 或 --help：显示帮助信息，列出可用的选项和参数。
-C：在执行命令前检查软件包的完整性，可以帮助避免损坏的软件包。
```

#### 4. 常用的yum命令参数

下面是一些常用的 `yum` 命令参数的说明：

```
软件包名称：在安装、更新、删除和搜索软件包时，需要指定软件包的名称。

group：用于安装、更新和删除软件包组。例如，yum groupinstall "Development Tools" 将安装名为 “Development Tools” 的软件包组。

exclude：在执行命令时排除指定的软件包。例如，yum update --exclude=nginx 将在更新时排除名为 “nginx” 的软件包。

enablerepo 和 disablerepo：用于启用或禁用指定的软件包仓库。例如，yum install --enablerepo=epel nginx 将在安装时启用名为 “epel” 的软件包仓库。

repoid：指定要操作的软件包仓库的 ID。例如，yum --repoid=epel install nginx 将从名为 “epel” 的软件包仓库安装 “nginx” 软件包。
```

### 二、yum命令总结

#### 1、**yum安装软件：**

```
yum install 会去yum仓库查找相应的软件并安装，仓库中的软件都是解决了依赖关系的。
yum localinstall 安装本地的rpm包命令，需要先将rpm安装包及依赖下载到本地，然后在本地目录执行yum localinstall *.rpm -y命令。yum会自动搜寻依赖关系并安装，rpm不会自行解决依赖关系，缺少依赖就会报错。
yum groupinstall group安装某个组件的全部软件包
```

#### 2、**yum更新软件包：**

```
yum -y update package升级包的同时，也升级软件和系统内核;yum uodate 可更新所有的软件包
yum -y upgrade 只升级所有包，不升级软件和系统内核
yum check-update列出所有可更新的软件包
yum list updates mysql* 更新所有mysql的软件包
yum groupupdate group更新某个组件的所有软件包
yum list列出已安装的和仓库中可用的软件包
yum list available 列出仓库中所有可用的软件包
yum list updates 列出仓库中比当前系统更新的软件包
yum list installed 列出已安装的软件包
yum list recent 列出新加入仓库的软件包
yum info 查询软件包信息
yum install -y nginx --downloadonly --downloaddir /root/ 下载rpm包不安装
yumdownloader nginx rpm包下载
```

#### 3、**删除软件包：**

```
yum remove package 删除软件包
yum groupremove group 删除某个组件的全部软件包
```

#### 4、**清除软件包：**

```
yum clean packages清除遗留在缓存里的包文件
yum clean metadata清除遗留在缓存里的元数据
yum clean headers清除遗留在缓存里的头文件
yum clean all 清除包文件，元数据，头文件
```

#### 5、**搜索软件包：**

```
yum search package 搜索软件包
yum info package 查找一个软件包的信息
yum list package 列出包含指定信息的软件包
yum list installed 列出已安装的软件包
yum list extras 列出不是通过软件仓库安装的软件包
yum list *ttp* 列出标题包含ttp的软件包
yum list updates 列出可以更新的软件包
```

#### 6、**查找特定文件是由什么软件包提供的：**

```
yum whatprovides filename
例子:
yum whatprovides httpd.conf可用选项
–disalberepo=lib 禁用某个软件仓库
–enalberepo=lib 启用某个软件仓库
-C 禁用使用本机缓存的元数据
例子:
yum –disalberepo=livna|–enalberepo=livna install mplayer
yum -C info httpd
```

