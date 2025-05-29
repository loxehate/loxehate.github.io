---
title: Minio详解
tags: [Minio]
categories: [中间件]
date: 2025-05-29
---
### 一、分布式文件系统应用场景

互联网海量非结构化数据的存储需求

```
电商网站：海量商品图片
视频网站：海量视频文件
网盘：海量文件
社交网站：海量图片
```

#### 1、Minio 介绍

Minio 是一个基于 Apache License v2.0 开源协议的对象存储服务。它兼容 AWS S3 云存储服务接口，非常适合存储大容量非结构化的数据，如图片、视频、日志文件、备份数据等，而一个对象文件可以是任意大小，从几 kb 到最大 5T 不等。

Minio 是一个非常轻量的服务，可以很简单的和其他应用结合。

```
官网：https://minio.io

中文官网：https://www.minio.org.cn

github地址: https://github.com/minio
```

对象存储服务（OSS）是一种海量、安全、低成本、高可靠的云存储服务，适合存放任意类型的文件，容量和处理能力弹性扩展。

在中国：阿里巴巴、腾讯、百度、中国联通、华为、中国移动等9000多家企业都在使用 Minio

#### 2、Minio 优点

```
部署简单：一个二进制文件即是一切，还支持各种平台；

支持海量存储：支持单个对象最大 5TB；

兼容Amazon S3 接口

低冗余且磁盘损坏高容忍：标准且最高的数据冗余系数为2（即存储一个 1M 的数据对象，实际占用的磁盘空间为 2M），但在任意 n/2 块磁盘损坏的情况下依然可以读取数据（n 为一个纠删码集合中的磁盘数量）并且这种损坏恢复是基于单个对象的，而不是基于整个存储卷的

读写性能优异
```

#### 3、Minio 的基本概念

```
Oject：存储到 minio 的基本对象

Bucket：用来存储 Object 的逻辑空间，每个 bucket 之间的数据是相互隔离的

Drive：存储数据的磁盘，在 minio 启动时，以参数的方式传入

Set：一组 Drive 的集合，分布式部署根据集群规模自动划分一个或多个 Set，每个 Set 中的 Drive 分布在不同的位置，一个对象存储在一个 Set 上。
一个对象存储在一个 Set 上
一个集群划分为多个 Set
一个 Set 包含的 Drive 数量是固定的，默认由系统根据集群规模自动计算得出
一个 Set 中的 Drive 尽可能分布在不同的节点上
```

#### 4、纠删码 EC

```
Minio 使用纠删码机制来保证高可靠性，使用 highwayhash 来处理数据损坏（Bit Rot Protection）。简单来说就是通过数学计算，把丢失的数据进行还原，它可以将 n 份原始数据，增加 m 份数据，并能通过 n+m 份中的任意 n 份数据，还原为原始数据，即如果有任意小于等于 m 份的数据失效，仍然能通过剩下的数据还原出来。
```

#### 5、存储形式

```
文件对象上传到 minio，会在对应的数据存储磁盘中，以 Bucket 名称为目录名，文件名称为下一级目录，文件名下是 part.1 和 xl.meta，前者是编码数据块及校验块，后者是元数据文件
```

### 二、Minio 环境搭建

```
Minio 默认9000端口，在配置文件中加入 -address "127.0.0.1:9029" 可更改端口；
MINIO_ACCESS_KEY：用户名，长度最小为5个字符
MINIO_SECRET_KEY：密码，不能设置过于简单，长度最小为8个字符
-config-dir：指定集群配置文件目录
-address：api的端口，默认是9000
--console-address：web端口，默认随机，可以通过 --console-address ":PORT" 来指定静态端口
```

#### 1、单机部署

minio server 的 standalone 模式，即要管理的磁盘都在 host 本地，该启动模式一般用于实验环境学习使用，在 standalone 模式下，还可以分为 non-erasure code mode 和 erasure code mode。

**non-erasure code mode**

```
在此启动模式下，对于每一份对象数据，minio 直接在 data 目录下存储这份数据，不会建立副本，也不会启用纠删码机制，因此，这种模式无论是服务实例还是磁盘都是单点，无任何高可用保障，磁盘损坏就表示数据丢失。
```

**erasure code mode**

```
此模式为 minio server 实例传入多个本地磁盘参数，一旦遇到多于一个磁盘参数，minio server 会自动启用 erasure code mode。erasure code 对磁盘的个数是有要求的，如不满足要求，实例启动将失败。erasure code启用后，要求传给 minio server 的磁盘个数至少为 4 个。
```

##### 1.1、基于Centos 7 部署

```
# 默认用户名和密码：minioadmin/minioadmin，修改默认用户名和密码：
export MINIO_ROOT_USER=admin
export MINIO_ROOT_PASSWORD=123456789

# 默认的配置目录是${HOME}/.minio，可以通过 --config-dir 命令自定义配置目录：
./minio server --config-dir /mnt/config /mnt/data

# 控制台监听端口是动态生成的，可以通过 --console-address ":PORT" 来指定静态端口
./minio server --console-address ":50000" /mnt/data
```

##### 1.2、基于 Docker 部署

```
# 启动后，浏览器无法访问控制台，因为没有对外暴露控制台端口
docker run -p 9000:9000 --name minio -v /mnt/data:/data -v /mnt/config:/root/.minio minio/minio server /data

# 对外暴露控制台端口，通过 --console-address ":50000" 指定控制台端口，默认用户名和密码：minioadmin/minioadmin
docker run -d -p 9000:9000 -p 50000:50000 --name minio -v /mnt/data:/data -v /mnt/config:/root/.minio minio/minio server --console-address ":50000" /data

# 自定义用户名密码
docker run -d -p 9000:9000 -p 50000:50000 --name minio -e "MINIO_ROOT_USER=admin" -e "MINIO_ROOT_PASSWORD=123456789" -v /mnt/data:/data -v /mnt/config:/root/.minio minio/minio server --console-address ":50000" /data
```

##### 1.3、纠删码模式

 minio 使用纠删码 erasure code 和校验和 check sum 来保护数据免受硬件故障和数据损坏，即使丢失一半数量（n/2）的硬盘，仍然可以恢复数据。

```
纠删码是一种恢复丢失和损坏数据的数学算法，Minio 采用 Reed-Solomon code 将对象拆分成 n/2 数据和 n/2 奇偶检验块，这就意味着如果是 12 块盘，一个对象会被分成6个数据块、6个奇偶校验块，可以丢失任意6块盘（不管是存放的数据块还是奇偶校验块），仍可以从剩下的盘中的数据进行恢复。
```

使用 Minio Docker 镜像，在8块盘中启动 Minio 服务：

```
docker run -d -p 9000:9000 -p 50000:50000 --name minio \
-e "MINIO_ROOT_USER=admin" \
-e "MINIO_ROOT_PASSWORD=123456789" \
-v /mnt/data1:/data1 \
-v /mnt/data2:/data2 \
-v /mnt/data3:/data3 \
-v /mnt/data4:/data4 \
-v /mnt/data5:/data5 \
-v /mnt/data6:/data6 \
-v /mnt/data7:/data7 \
-v /mnt/data8:/data8 \
minio/minio server /data{1...8} --console-address ":50000"
```

#### 2、分布式集群部署

分布式 minio 可以让你将多块磁盘（可以在不同的机器上）组成一个对象存储服务，由于硬盘分布在不同的节点上，分布式 minio 避免了单点故障

##### 2.1、分布式 Minio 优势

**数据保护**

```
分布式 Minio 采用纠删码来防范多个节点宕机和位衰减 bit rot。

分布式 Minio 至少需要4块硬盘，使用分布式 Minio 自动引入了纠删码功能。
```

**高可用**

```
单机 Minio 服务存在单点故障，如果一个有 N 块硬盘的分布式 Minio，只要有 N/2 硬盘在线，数据就是安全的，不过需要至少 N/2+1 块硬盘来创建新的对象。

如：一个16节点的 Minio 集群，每个节点16块硬盘，就算有8个节点宕机，这个集群仍然是可读的，不过需要9个节点才能写数据。
```

**一致性**

```
Minio 在分布式和单机模式下，所有读写操作都严格遵守 read-after-write 一致性模型。
```

##### 2.2、部署分布式 Minio

运行一个分布式 Minio 实例，只需要把硬盘位置做为参数传给 Minio server 命令即可，然后，需要在所有其他节点运行同样的命令。

```
分布式 Minio 里所有的节点都需要有同样的 access 秘钥和 secret 秘钥，这样这些节点才能建立联接，新版本使用 MINIO_ROOT_USER 和 MINIO_ROOT_PASSWORD。
分布式 Minio 使用的磁盘必须是干净的，里面没有任何数据。
分布式 Minio 里的节点时间相差不能超过3秒。
```

**8个节点，每个节点1块硬盘**

启动分布式 Minio 实例，8个节点，每个节点1块硬盘，需要在8个节点上都运行下面的命令：

```
mkdir -p /opt/minio/logs				# 创建日志存储目录
mkdir -p /opt/minio/data/data			# 在所有节点上创建存储目录
mkdir -p /etc/minio					   # 创建配置目录


# 在所有节点上都执行该文件，即以分布式的方式启动 minio
# 编写启动脚本 （/opt/minio/run.sh）
#/bin/bash
export MINIO_ROOT_USER=admin
export MINIO_ROOT_PASSWORD=admin123456
minio server --address 0.0.0.0:9000 --console-address 0.0.0.0:9001 --config-dir /etc/minio \
	http://192.168.1.10/opt/minio/data/data \
	http://192.168.1.11/opt/minio/data/data \
	http://192.168.1.12/opt/minio/data/data \
	http://192.168.1.13/opt/minio/data/data \
	http://192.168.1.14/opt/minio/data/data \
	http://192.168.1.15/opt/minio/data/data \
	http://192.168.1.16/opt/minio/data/data \
	http://192.168.1.17/opt/minio/data/data >> /opt/minio/logs/minio_server.log
	
# 启动服务
sh /opt/minio/run.sh

# 通过systemctl启停服务
cat > /usr/lib/systemd/system/minio.service <<EOF
[Unit]
Description=Minio service
Documentation=https://docs.minio.io/

[Service]
WorkingDirectory=/opt/minio				# 二进制文件目录
ExecStart=/opt/minio/run.sh				# 指定集群启动脚本

Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

```

**4个节点，每个节点4块硬盘**

启动分布式 Minio 实例，4个节点，每个节点4块硬盘，需要在4个节点上都运行下面的命令：

```
export MINIO_ROOT_USER=admin
export MINIO_ROOT_PASSWORD=123456
minio server --address ":9000" --console-address "9001" \
	http://192.168.1.10/data1	http://192.168.1.10/data2 \
    http://192.168.1.10/data3	http://192.168.1.10/data4 \
    http://192.168.1.11/data1	http://192.168.1.11/data2 \
    http://192.168.1.11/data3	http://192.168.1.11/data4 \
    http://192.168.1.12/data1	http://192.168.1.12/data2 \ 
    http://192.168.1.12/data3	http://192.168.1.12/data4 \
    http://192.168.1.13/data1	http://192.168.1.13/data2 \
    http://192.168.1.13/data3	http://192.168.1.13/data4
```

**扩展现有的分布式集群**

例如我们是通过分区的方式启动 Minio 集群，命令如下：

```
export MINIO_ROOT_USER=admin
export MINIO_ROOT_PASSWORD=123456789
minio server http://host{1...32}/data{1...32}
```

Minio 支持通过命令，指定新的集群来扩展现有集群（纠删码模式），命令如下：

```
export MINIO_ROOT_USER=admin
export MINIO_ROOT_PASSWORD=123456789
minio server http://host{1...32}/data{1...32} http://host{33...64}/data{1...32}
```

现在整个集群就扩展了1024块磁盘，总磁盘变成了2048个，新的对象上传请求会自动分配到最少使用的集群上，通过以上扩展策略，就可以按需要扩展集群。重新配置后重启集群，会立即在集群中生效，对现有集群无影响。如上命令中，可以把原来的集群看作是一个区，新增的集群看作另一个区，新对象按每个区域中的可用空间比例放置在区域中，在每个区域内，基于确定性哈希算法确定位置。

```
说明：添加的每个区域必须具有与原始区域相同的磁盘数量大小，以便维持相同的数据冗余。例如，第一个区有8块磁盘，可以将集群扩展为16个、32个或1024个磁盘的区域，只需要确保部署的 SLA 是原始区域的倍数即可。
```

##### 2.3、基于 docker-compose部署

 4个节点，每个节点一块硬盘

```
version: "3.7"
services:
  minio:
    image: minio/minio:RELEASE.2021-11-09T03-21-45Z
    command: server --address ":9001" --console-address ":50001" http://minio0{1...4}/data
    restart: always
    hostname: minio01		# 每个节点修改成不同的名字
    container_name: minio01	# 每个节点修改成不同的名字
    environment:
      MINIO_ROOT_USER: admin
      MINIO_ROOT_PASSWORD: 123456789
      TZ: Asia/Shanghai
      MINIO_PROMETHEUS_AUTH_TYPE: public
      MINIO_PROMETHEUS_JOB_ID: minio-job
    extra_hosts:
      - "minio01:192.168.1.10"
      - "minio02:192.168.1.11"
      - "minio03:192.168.1.12"
      - "minio04:192.168.1.13"
    #ports:
    #  - 9001:9001
     # - 50001:50001
    volumes:
      - /data:/data
    network_mode: "host" #所有容器的端口暴露都是直接映射到主机的相同端口
```

##### 2.4、基于 Nginx 实现负载均衡

```
upstream minio_api {
    server 192.168.1.10:9001;
    server 192.168.1.11:9001;
    server 192.168.1.12:9001;
    server 192.168.1.13:9001;
}

upstream minio_console {
	server 192.168.1.10:50001;
	server 192.168.1.11:50001;
	server 192.168.1.12:50001;
	server 192.168.1.13:50001;
}

server {
    listen	19001;
    server_name localhost;
    
    ignore_invalid_headers off;
    client_max_body_size 0;
    proxy_buffering off;
    
    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-proto $scheme;
        proxy_connect_timeout 300;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        chunked_transfer_encoding off;
        proxy_ignore_client_abort on;
        proxy_pass http://minio_api;
    }
}

server {
    listen	15000;
    server_name localhost;
    
    ignore_invalid_headers off;
    client_max_body_size 0;
    proxy_buffering off;
    
    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-proto $scheme;
        proxy_connect_timeout 300;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        chunked_transfer_encoding off;
        proxy_ignore_client_abort on;
        proxy_pass http://minio_console;
    }
}
```

### 三、S3客户端使用

#### 1、Minio Client（mc）

下载mc

```
curl https://dl.min.io/client/mc/release/linux-amd64/mc \
  --create-dirs \
  -o $HOME/minio-binaries/mc

chmod +x $HOME/minio-binaries/mc
ln -s $HOME/minio-binaries/mc /usr/local/bin/

#export PATH=$PATH:$HOME/minio-binaries/

mc --help
```

命令

```
ls			# 列出文件或目录
mb			# 创建一个桶
cat			# 显示文件和对象内容
pipe		# 将一个 STDIN 重定向到一个对象或文件或 STDOUT
share		# 生成用于共享的 URL
cp			# 拷贝文件或对象
mirror		# 给桶做镜像
find		# 查找文件
diff		# 比较两个文件或桶的差异
rm			# 删除文件或对象
events		# 管理对象通知
watch		# 监视文件或对象事件
policy		# 管理访问策略
config		# 管理 mc 配置文件
update		# 检查软件更新
version		# 查看版本信息
```

配置 mc

```
mc 将所有的配置信息都存储在 ~/.mc/config.json 文件中

# 查看 mc host 配置
mc config host ls

# 添加 minio 服务
mc config host add minio-server http://192.168.1.10:9001 admin 123456789		# 配置 api 接口

# 删除 host
mc config host remove minio-server
```

上传下载文件

```
# 查询所有的桶
mc ls minio-server

# 下载文件
mc cp minio-server/test/1.jpg /tmp

# 删除文件
mc rm minio-server/test/1.jpg 

# 上传文件
mc cp 2.jpg minio-server/test/
```

Bucket 管理

```
# 创建 Bucket
mc mb minio-server/bucket01

# 删除 Bucket（如果 Bucket 不为空，使用 --force 强制删除）
mc rb --force minio-server/bucket01
```

生命周期管理

```
#创建lifecycle.json
{
  "Rules": [
    {
      "ID": "ExpireBakDirectory",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "bak/"
      },
      "Expiration": {
        "Days": 15
      }
    }
  ]
}

#导入生命周期策略
mc ilm import myminio/mybucket < lifecycle.json

#查看当前桶的生命周期策略：
mc ilm export myminio/mybucket
```



**mc admin 使用**

```
mc 提供了 admin 子命令来对 minio 部署执行管理任务

service			# 管理 minio 服务
update			# 更新 minio 服务
info			# 显示 minio 服务器信息
user			# 管理用户
group			# 管理组
policy			# 管理策略
config			# 管理 minio 服务器配置
heal			# 修复 minio 服务器上的磁盘、桶或对象
profile
top				# 查看 minio 的统计信息
trace			# 显示 minio 的http 跟踪信息
console			# 显示 minio 控制台日志
prometheus		# 管理 prometheus 配置
kms
```

用户管理

```
# 创建用户
mc admin user add minio-server test01
mc admin user add minio-server test02 123456789

# 查看用户
mc admin user list minio-server

# 禁用用户
mc admin user disable minio-server test01

# 启用用户
mc admin user enable minio-server test01

# 查看用户信息
mc admin user info minio-server test01

# 删除用户
mc admin user remove minio-server test01
```

策略管理

```
policy 命令用于添加、删除、列出策略

# 列出 minio 上的所有固定策略
mc admin policy list minio-server

# 查看 policy 信息
mc admin policy info minio-server readwrite
```

配置管理

```
#查看名为 myminio 的 MinIO 服务器的所有配置
mc admin config get myminio

#查看特定部分的配置，例如 api 部分：
mc admin config get myminio api

#设置配置
设置或更新 MinIO 服务器的配置：
mc admin config set <alias> <key>=<value>...
mc admin config set myminio api requests_max=100 requests_deadline=10s

#重启minio
mc admin service restart myminio
```

MinIO 常见的配置项及其详细解释：

```
api
api 部分包含与 API 请求相关的配置项：

requests_max: 最大并发请求数。设置为 0 表示不限制并发请求数。
requests_deadline: 请求的最大处理时间。例如，10s 表示 10 秒。
cluster_deadline: 集群请求的最大处理时间。
cors_allow_origin: 允许的跨域请求来源。例如，* 表示允许所有来源。
remote_transport_deadline: 远程传输的最大时间限制。
list_quorum: 列表操作的法定人数要求。strict 表示严格一致性。
replication_workers: 复制操作的工作线程数。
replication_failed_workers: 处理失败复制操作的工作线程数。
transition_workers: 对象过渡操作的工作线程数（如从一个存储类转移到另一个存储类）。
stale_uploads_cleanup_interval: 未完成上传的清理间隔时间。
stale_uploads_expiry: 未完成上传的过期时间。
delete_cleanup_interval: 删除操作的清理间隔时间。
disable_odirect: 是否禁用 O_DIRECT 模式。off 表示不禁用。
gzip_objects: 是否启用对象的 GZIP 压缩。off 表示不启用。

region
region 部分包含与区域设置相关的配置项：
name: 设置服务器的区域名称。例如，us-east-1。

logger
logger 部分包含与日志记录相关的配置项：
console: 配置控制台日志记录。例如，enable 表示启用。
http: 配置 HTTP 日志记录。例如，target 表示日志目标 URL。
audit: 配置审计日志记录。

storage
storage 部分包含与存储相关的配置项：
class: 配置存储类。例如，standard。

identity
identity 部分包含与身份认证相关的配置项：
ldap: 配置 LDAP 身份验证。
openid: 配置 OpenID Connect 身份验证。

policy
policy 部分包含与存储桶策略相关的配置项：

openbucket: 配置开放存储桶策略。
```

#### 2、s3cmd 的使用

下载

```
wget https://github.com/s3tools/s3cmd/releases/download/v2.2.0/s3cmd-2.2.0.tar.gz
解压，把 s3cmd 执行文件放到/usr/local/bin/目录下
```

配置

```
# 生成配置文件
s3cmd --configure

# 最后修改以下几项
vim /root/.s3cfg
access_key = xxx
secret_key = xxx
host_base = ip:port			# s3 服务所使用的 ip 地址和端口
host_bucket = 
use_https = False
```

使用

```
# 列出所有 bucket
s3cmd ls

# 创建 bucket
s3cmd mb s3://BUCKET_NAME

# 删除空 bucket
s3cmd rb s3://BUCKET_NAME

# 列出 bucket 中的内容
s3cmd ls s3://BUCKET_NAME

# 上传 file.txt 文件到某个 bucket
s3cmd put file.txt s3://BUCKET_NAME/file.txt

# 上传文件并将权限设置为所有人可读
s3cmd put --acl-public file.txt s3://BUCKET_NAME/file.txt

# 批量上传文件
s3cmd put ./* s3://BUCKET_NAME

# 下载文件
s3cmd get s3://BUCKET_NAME/file.txt file.txt

# 批量下载文件
s3cmd get s3://BUCKET_NAME/* ./

# 删除文件
s3cmd del s3://BUCKET_NAME/file.txt

# 获得对应 bucket 所占用的空间大小
s3cmd du -H s3://BUCKET_NAME
```

同步操作

```
# 同步当前目录下所有文件
s3cmd sync ./ s3://BUCKET_NAME/

# 只列出需要同步的项目，不实际进行同步
s3cmd sync --dry-run ./ s3://BUCKET_NAME/

# 删除本地不存在的文件
s3cmd sync --delete-removed ./ s3://BUCKET_NAME/

# 不进行 MD5 校验，直接跳过本地已存在的文件
s3cmd sync --skip-existing ./ s3://BUCKET_NAME/
```

#### 3、juicefs

```
*官方文档：https://juicefs.com/docs/zh/community/command_reference/*

*用于在两个对象存储之间同步数据*
```

语法格式

```
# 语法格式
juicefs sync [command options] SRC DST

SRC：源路径
DST：目标路径
源路径和目标路径格式为：[NAME://][ACCESS_KEY:SECRET_KEY[:TOKEN]@]BUCKET[.ENDPOINT][/PREFIX]
NAME：JuiceFS 支持的数据存储类型（如 s3、oss）
ACCESS_KEY 和 SECRET_KEY：访问数据存储所需的密钥信息
TOKEN 用来访问对象存储的 token，部分对象存储支持使用临时的 token 以获得有限时间的权限
BUCKET[.ENDPOINT]：数据存储服务的访问地址，不同存储类型格式可能不同
[/PREFIX]：可选，源路径和目标路径的前缀，可用于限定只同步某些路径中的数据

选项：
# 并发线程数 (默认：10)
--threads value, -p value

# 当源文件更新时修改已存在的文件 (默认：false)
--update, -u

# 强制修改已存在的文件 (默认：false)
--force-update, -f

# 保留权限设置 (默认：false)
--perms

# 同步目录 (默认：false)
--dirs

# 同步后删除源存储的对象 (默认：false)
--delete-src, --deleteSrc

# 删除目标存储下的不相关对象 (默认：false)
--delete-dst, --deleteDst

# 不要使用 HTTPS (默认：false)
--no-https

# 限制最大带宽；单位为 Mbps (0 表示不限制) (默认：0)
--bwlimit value
```

### 四、常见问题

#### 1、mc pipe上传报错，分片过期

```
#mariabackup,mc pipe上传超过24小时报错
Unable to write to one or more targets. The specified multipart upload does not exist. The upload ID may be invalid, or the upload may have been aborted or completed
```

```
mc admin config get myminio api

api requests_max=100 requests_deadline=10s cluster_deadline=10s cors_allow_origin=* remote_transport_deadline=2h list_quorum=strict replication_workers=250 replication_failed_workers=8 transition_workers=100 stale_uploads_cleanup_interval=6h stale_uploads_expiry=24h delete_cleanup_interval=5m disable_odirect=off gzip_objects=off

设置 stale_uploads_expiry=24h 表示未完成的多部分上传在 24 小时后将被认为过期并清理。如果文件上传时间超过 24 小时，则上传 ID 将失效，导致上传无法完成
```

```
修改stale_uploads_expiry=24h参数,调整为48h

mc admin config set myminio api stale_uploads_expiry=48h
mc admin service restart myminio
```

