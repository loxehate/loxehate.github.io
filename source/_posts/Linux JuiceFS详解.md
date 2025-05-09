---
title: Linux JuiceFS详解
tags: [JuiceFS]
categories: [Linux]
date: 2025-05-09
---
### 一、引言

[JuiceFS](https://www.juicefs.com/) 是一款[开源](https://github.com/juicedata/juicefs)的分布式文件系统，它为云环境设计，兼容 `POSIX`、`HDFS` 和 `S3` 协议的分布式文件系统。

```
官网地址：https://www.juicefs.com/zh-cn/
Github地址：https://github.com/juicedata/juicefs
```

### 二、JuiceFS为何物？

#### 2.1 JuiceFS的特点

##### 2.1.1 兼容性

```
JuiceFS提供完备的 POSIX 兼容性，可将几乎所有对象存储接入本地作为海量本地磁盘使用，亦可同时在跨平台、跨地区的不同主机上挂载读写。
```

##### 2.1.2 丰富的API

```
JuiceFS 提供了丰富的 API，适用于各种形式数据的管理、分析、归档、备份，可以在不修改代码的前提下无缝对接大数据、机器学习、人工智能等应用平台，为其提供海量、弹性、低价的高性能存储。
```

##### 2.1.3 特性总结

| 特性                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [POSIX 兼容](https://en.wikipedia.org/wiki/POSIX)            | 本地文件系统一样使用，无缝对接已有应用，无业务侵入性         |
| [HDFS 兼容](https://www.juicefs.com/docs/zh/community/hadoop_java_sdk) | 完整兼容 HDFS API，提供更强的元数据性能                      |
| [S3 兼容](https://www.juicefs.com/docs/zh/community/s3_gateway) | 提供 S3 网关实现 S3 协议兼容的访问接口                       |
| [云原生](https://www.juicefs.com/docs/zh/community/how_to_use_on_kubernetes) | 通过 Kubernetes CSI驱动 轻松地在 Kubernetes 中使用 JuiceFS   |
| 分布式设计                                                   | 同一文件系统可在上千台服务器同时挂载，高性能并发读写，共享数据 |
| 强一致性                                                     | 确认的文件修改会在所有服务器上立即可见，保证强一致性         |
| [强悍性能](https://www.juicefs.com/docs/zh/community/benchmark/) | 毫秒级延迟，近乎无限的吞吐量（取决于对象存储规模）           |
| [数据安全](https://www.juicefs.com/docs/zh/community/security/encrypt) | 支持传输中加密（encryption in transit）和静态加密（encryption at rest） |
| 文件锁                                                       | 支持 BSD 锁（flock）和 POSIX 锁（fcntl）                     |
| 数据压缩                                                     | 支持 [LZ4](https://lz4.github.io/lz4) 和 [Zstandard](https://facebook.github.io/zstd) 压缩算法，节省存储空间 |

#### 2.2 不同的使用场景举例

**场景一**：像本地磁盘一样使用

```
# 格式化JuiceFS文件系统
> juicefs format redis://your-redis-host:6379/1 myjfs

# 挂载JuiceFS文件系统
> juicefs mount -d redis://your-redis-host:6379/1 /mnt/juicefs

# 检查挂载点状态
> df -h /mnt/juicefs
Filesystem      Size   Used  Avail Capacity iused    ifree %iused  Mounted on
JuiceFS:myjfs  1.0Pi    0Bi  1.0Pi     0%       0 10485760    0%   /mnt/juicefs

#  从home目录挂载数据集到JuiceFS
> cp -r ~/dataset /mnt/juicefs/
```

**场景二**：应用开发简单，无需SDK

```
# Python 例子
path = '/mnt/juicefs/dataset/days.txt'
days_file = open(path, 'r')
days = days_file.read()

new_path = '/mnt/juicefs/new_days.txt'
new_days = open(new_path, 'w')

title = 'Days of the Week\n'
new_days.write(title)
print(title)

new_days.write(days)
print(days)

days_file.close()
new_days.close()
```

**场景三**：最简单，最适合K8S PV

```
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: web-pvc
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Pi
  storageClassName: juicefs-sc
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-run
spec:
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: linuxserver/nginx
          ports:
            - containerPort: 80
          volumeMounts:
            - mountPath: /config
              name: web-data
      volumes:
        - name: web-data
          persistentVolumeClaim:
            claimName: web-pvc
```

**场景四**：完全兼容 HDFS，使用方法也一样

```
# Shell
> hadoop fs -ls jfs://myjfs

# Hive
CREATE TABLE IF NOT EXISTS person
(
  name STRING,
  age INT
) LOCATION 'jfs://myjfs/tmp/person';
```

**场景五**：通过 S3 API 访问 JuiceFS

```
# 为JuiceFS文件系统开启S3网关
> juicefs gateway redis://localhost:6379/1 localhost:9000

# 通过AWS命令行连接访问JuiceFS文件系统
> aws --endpoint-url http://localhost:9000 s3 ls s3://myjfs
```

### 三、 JuiceFS技术架构

`JuiceFS`官网的[技术架构](https://so.csdn.net/so/search?q=技术架构&spm=1001.2101.3001.7020)图：

![](D:\学习\linux运维\图片/JuiceFS技术架构.png)

#### 3.1 JuiceFS 的三个技术层

从上图，我们可以看到**JuiceFS**分为了三层，从上往下依次为：

| 分类                            | 描述                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| **Client**（JuiceFS 客户端）    | 协调对象存储和元数据存储引擎，以及 `POSIX`、`Hadoop`、`Kubernetes CSI Driver`、`S3 Gateway` 等文件系统接口的实现 |
| **Metada Engine**（元数据引擎） | 存储数据对应的元数据（`metadata`）包含文件名、文件大小、权限组、创建修改时间和目录结构，支持 `Redis`、`MySQL`、`TiKV `等多种引擎； |
| **Data Storage**（数据存储）    | 存储数据本身，支持本地磁盘、公有云或私有云对象存储、`HDFS` 等介质； |

这里主要讲下**JuiceFS**在 `Client客户端层面` 的**文件系统接口**的技术实现：

```
通过 FUSE，JuiceFS 文件系统能够以 POSIX 兼容的方式挂载到服务器，将海量云端存储直接当做本地存储来使用；
通过 Hadoop Java SDK，JuiceFS 文件系统能够直接替代 HDFS，为 Hadoop 提供低成本的海量存储；
通过 Kubernetes CSI Driver，JuiceFS 文件系统能够直接为 Kubernetes 提供海量存储；
通过 S3 Gateway，使用 S3 作为存储层的应用可直接接入，同时可使用 AWS CLI、s3cmd、MinIO client 等工具访问 JuiceFS 文件系统；
通过 WebDAV Server，使用 HTTP 协议接入 JuiceFS 并直接操作其中的文件。
```

#### 3.2 JuiceFS 如何存储文件

任何存入 **JuiceFS** 的文件都会被拆分成固定大小的 “`Chunk`”（默认的容量上限是 64 MiB）

```
每个 Chunk 由一个或多个 “Slice” 组成，Slice 的长度不固定，取决于文件写入的方式；
每个 Slice 又会被进一步拆分成固定大小的 “Block”（默认为 4 MiB）；
最后，这些 Block 会被存储到对象存储；
同时，JuiceFS 会将每个文件以及它的 Chunks、Slices、Blocks 等元数据信息存储在元数据引擎中。
```

![](D:\学习\linux运维\图片/JuiceFS 存储文件-1.png)

文件最终会被拆分成 Chunks、Slices 和 Blocks 存储在对象存储，存储桶中只有一个 chunks 目录和一堆数字编号的目录和文件，如下图

![](D:\学习\linux运维\图片/JuiceFS 存储文件-2.png)

### 四、 JuiceFS实战

#### 4.1 客户端安装

去Github下载最新的客户端：https://github.com/juicedata/juicefs/releases

注意版本与操作系统的对应关系如下：

| 版本                               | 系统                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| juicefs-x.x.x-darwin-amd64.tar.gz  | 面向 Intel 芯片的 macOS 系统                                 |
| juicefs-x.x.x-darwin-arm64.tar.gz  | 面向 M1 系列芯片的 macOS 系统                                |
| juicefs-x.x.x-linux-amd64.tar.gz   | 面向 x86 架构 Linux 发行版                                   |
| juicefs-x.x.x-linux-arm64.tar.gz   | 面向 ARM 架构的 Linux 发行版                                 |
| juicefs-x.x.x-windows-amd64.tar.gz | 面向 x86 架构的 Windows 系统                                 |
| juicefs-hadoop-x.x.x-amd64.jar     | 面向 x86 架构的 Hadoop Java SDK（同时支持 Linux、macOS 及 Windows 系统） |

使用命令安装，会根据硬件架构自动下载安装最新版 `JuiceFS` 客户端：

```
curl -sSL https://d.juicefs.com/install | sh -
```

下载完成后，解压，使用命令：

```bash
juicefs version
```

#### 4.2 创建文件系统

创建名为 `miniofs` 的文件系统，使用 `Redis` 的 `1` 号数据库存储元数据：

```
juicefs format \
    --storage minio \
    --bucket http://endpoint地址:端口/rtc \
    --access-key minio的access-key \
    --secret-key minio的secret-key \
    "redis://:redis密码@redis地址:redis端口/数据库编号" \
    miniofs
```

#### 4.3 挂载文件系统

我们可以挂载文件目录到本地的桌面的data目录（如果提示没有权限，建议命令前加上`sudo`）：

```
juicefs mount  "redis://:redis密码@redis地址:redis端口/数据库编号" /桌面地址/data
```

#### 4.4 开始使用

```
详细使用参考：https://www.juicefs.com/docs/zh/community/guide/sync/
```

当**JuiceFS**挂载好之后，我们可以正式的使用**JuiceFS**了，下面举个例子，使用**同步命令**，把`MinIO`里面的内容同步到本地的桌面的`data`目录，命令如下：

```
juicefs sync [command options] 源端地址 目的端地址
```

```
MinIO的地址格式为： minio://[ACCESS_KEY:SECRET_KEY[:TOKEN]@]ENDPOINT/BUCKET[/PREFIX]
```

### 五、总结

#### 5.1 命令总结

```
详情参考：https://www.juicefs.com/docs/zh/community/command_reference
```

上面举例的是只使用了**JuiceFS**的同步（`sync`）命令，如果想要知道更多的**JuiceFS**相关的命令，可以使用`--help`来搜索，整理如下：

**用法**：`juicefs [全局可选参数] command [命令选项] [命令参数...]`

| 分类             | 命令                  | 描述                                                 |
| ---------------- | --------------------- | ---------------------------------------------------- |
| **全局可选参数** | –verbose, --debug, -v | 允许 debug 日志 (默认: false)                        |
|                  | –quiet, -q            | 仅展示告警和错误 (默认: false)                       |
|                  | –trace                | 允许 trace 日志 (默认: false)                        |
|                  | –no-agent             | 禁止 pprof (:6060) 和 gops (:6070)代理 (默认: false) |
|                  | –pyroscope value      | pyroscope地址                                        |
|                  | –no-color             | 禁止打印有颜色 (默认: false)                         |
|                  | –help, -h             | 显示帮助 (默认: false)                               |
|                  | –version, -V          | 打印版本 (默认: false)                               |
| **命令选项**     | format                | 格式化目录卷                                         |
|                  | config                | 修改目录卷配置                                       |
|                  | destroy               | 销毁已存在的目录卷                                   |
|                  | gc                    | 数据存储中对象的垃圾收集器                           |
|                  | fsck                  | 检查卷的一致性                                       |
|                  | dump                  | 将元数据转储到JSON文件中                             |
|                  | load                  | 从以前转储的JSON文件加载元数据                       |
|                  | version               | 展示版本                                             |
|                  | status                | 显示卷状态                                           |
|                  | stats                 | 显示juicefs的实时性能统计信息                        |
|                  | profile               | 显示在JuiceFS中完成的操作分析                        |
|                  | info                  | 显示路径或索引节点的内部信息                         |
|                  | mount                 | 挂载卷                                               |
|                  | umount                | 卸载卷                                               |
|                  | gateway               | 启动一个兼容s3的网关                                 |
|                  | webdav                | 启动WebDAV服务器                                     |
|                  | bench                 | 在路径上运行基准测试                                 |
|                  | objbench              | 在对象存储上运行基准测试                             |
|                  | warmup                | 为目标目录/文件构建缓存                              |
|                  | rmr                   | 递归删除目录                                         |
|                  | sync                  | 两个对象存储之间的同步                               |

#### 5.2 常见错误总结

```
常见的错误，官网已经记录下来了，可以参考：https://www.juicefs.com/docs/zh/community/faq/
```

