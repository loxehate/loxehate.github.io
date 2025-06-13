---
title: Docker部署zabbix5.4
tags: [Docker,Zabbix]
categories: [监控观测]
date: 2025-06-13
---
### 一、环境

```
docker版本：20.10.*
docker-compose版本：2.2.2
mysql-docker版本：5.7
zabbix-docker版本：centos-5.4
```

### 二、互联网环境

#### 2.1 拉取镜像

```
# 拉取mysql5.7镜像
docker pull mysql:5.7
# 拉取zabbix/zabbix-java-gateway:centos-5.4-latest镜像
docker pull zabbix/zabbix-java-gateway:centos-5.4-latest
# 拉取zabbix/zabbix-server-mysql:centos-5.4-latest镜像
docker pull zabbix/zabbix-server-mysql:centos-5.4-latest
# 拉取zabbix/zabbix-web-nginx-mysql:centos-5.4-latest镜像
docker pull zabbix/zabbix-web-nginx-mysql:centos-5.4-latest
# 拉取zabbix/zabbix-snmptraps:centos-5.4-latest镜像
docker pull zabbix/zabbix-snmptraps:centos-5.4-latest
# 查看镜像
docker images
```

#### 2.2 安装zabbix-agent

```
# Centos7 安装 zabbix-agent2
curl -O https://mirrors.aliyun.com/zabbix/zabbix/5.4/rhel/7/x86_64/zabbix-agent2-5.4.9-1.el7.x86_64.rpm
rpm -ivh zabbix-agent2-5.4.9-1.el7.x86_64.rpm
#
# Centos8 安装 zabbix-agent2
#curl -O https://mirrors.aliyun.com/centos/8.5.2111/BaseOS/x86_64/os/Packages/logrotate-3.14.0-4.el8.x86_64.rpm
#curl -O https://mirrors.aliyun.com/zabbix/zabbix/5.4/rhel/8/x86_64/zabbix-agent2-5.4.9-1.el8.x86_64.rpm
#rpm -ivh logrotate-3.14.0-4.el8.x86_64.rpm zabbix-agent2-5.4.9-1.el8.x86_64.rpm
#
# Debian10 安装 zabbix-agent2
#wget https://mirrors.aliyun.com/zabbix/zabbix/5.4/debian/pool/main/z/zabbix/zabbix-agent2_5.4.9-1+debian10_amd64.deb
#dpkg -i zabbix-agent2_5.4.9-1+debian10_amd64.deb
#
# 编辑配置文件允许容器网段访问
# 修改 Server=172.22.0.0/24  具体网段和5.2章的容器配置一致
vi /etc/zabbix/zabbix_agent2.conf
# 重启
systemctl restart zabbix-agent2
# 开机自动启动
systemctl enable zabbix-agent2
```

### 三、无互联网环境

#### 3.1 离线包准备

离线文件包zabbix5.4-images-offline.tar.gz

agent目录：

```
zabbix-agent2-5.4.9-1.el7.x86_64.rpm
logrotate-3.14.0-4.el8.x86_64.rpm
zabbix-agent2-5.4.9-1.el8.x86_64.rpm
zabbix-agent2_5.4.9-1+debian10_amd64.deb
```

images目录：

```
mysql_5.7.tar：
在有互联网的系统下"docker pull mysql:5.7"拉取后"docker save mysql:5.7 -o mysql_5.7.tar"导出
zabbix-java-gateway_centos-5.4-latest.tar：
在有互联网的系统下"docker pull zabbix/zabbix-java-gateway:centos-5.4-latest"拉取后"docker save zabbix/zabbix-java-gateway:centos-5.4-latest -o zabbix-java-gateway_centos-5.4-latest.tar"导出
zabbix-server-mysql_centos-5.4-latest.tar：
在有互联网的系统下"docker pull zabbix/zabbix-server-mysql:centos-5.4-latest"拉取后"docker save zabbix/zabbix-server-mysql:centos-5.4-latest -o zabbix-server-mysql_centos-5.4-latest.tar"导出
zabbix-web-nginx-mysql_centos-5.4-latest.tar：
在有互联网的系统下"docker pull zabbix/zabbix-web-nginx-mysql:centos-5.4-latest"拉取后"docker save zabbix/zabbix-web-nginx-mysql:centos-5.4-latest -o zabbix-web-nginx-mysql_centos-5.4-latest.tar"导出
zabbix-snmptraps-centos-5.4-latest.tar：
在有互联网的系统下"docker pull zabbix/zabbix-snmptraps:centos-5.4-latest"拉取后"docker save zabbix/zabbix-snmptraps:centos-5.4-latest -o zabbix-snmptraps-centos-5.4-latest.tar"导出
```

font目录：

```
simfang.ttf：Windows系统下C:\Windows\Fonts\simfang.ttf
```

#### 3.2 导入镜像

```
# 进入opt目录
cd /opt
# 上传离线文件包zabbix5.4-images-offline.tar.gz至/opt目录
# 解压
tar -zxvf zabbix5.4-images-offline.tar.gz
# 进入images目录
cd /opt/zabbix5.4-images-offline/images
# 导入mysql5.7镜像
docker load -i mysql_5.7.tar
# 导入zabbix/zabbix-java-gateway:centos-5.4-latest镜像
docker load -i zabbix-java-gateway_centos-5.4-latest.tar
# 导入zabbix/zabbix-server-mysql:centos-5.4-latest镜像
docker load -i zabbix-server-mysql_centos-5.4-latest.tar
# 导入zabbix/zabbix-web-nginx-mysql:centos-5.4-latest镜像
docker load -i zabbix-web-nginx-mysql_centos-5.4-latest.tar
# 导入zabbix/zabbix-snmptraps:centos-5.4-latest镜像
docker load -i zabbix-snmptraps-centos-5.4-latest.tar
# 查看镜像
docker images
```

#### 3.3 安装zabbix-agent

```
# 进入agent目录
cd /opt/zabbix5.4-images-offline/agent
# Centos7 安装 zabbix-agent
rpm -ivh zabbix-agent2-5.4.9-1.el7.x86_64.rpm
#
# Centos8 安装 zabbix-agent
#rpm -ivh logrotate-3.14.0-4.el8.x86_64.rpm zabbix-agent2-5.4.9-1.el8.x86_64.rpm
#
# Debian10 安装 zabbix-agent
#dpkg -i zabbix-agent2_5.4.9-1+debian10_amd64.deb
#
# 编辑配置文件允许容器网段访问
# 修改 Server=172.22.0.0/24  具体网段和5.2章的容器配置一致
vi /etc/zabbix/zabbix_agent2.conf
# 重启
systemctl restart zabbix-agent2
# 开机自动启动
systemctl enable zabbix-agent2
```

### 四、容器编排

#### 4.1 准备

```
# 创建程序目录
mkdir -p /opt/zabbix
# 进入目录
cd /opt/zabbix
# 创建字体目录
mkdir -p ./font
# 上传字体
# 互联网环境：
# 上传Windows下C:\Windows\Fonts\simfang.ttf字体至/opt/zabbix/font/simfang.ttf
# 无互联网环境：
# cp /opt/zabbix5.4_docker_offline/font/simfang.ttf /opt/zabbix/font/simfang.ttf
# 创建snmp trap告警目录
mkdir -p ./snmptraps
# 设置snmptraps目录权限
chown -R 1997 ./snmptraps
# 创建mib目录
mkdir -p ./mibs
# 上传mib库
# 互联网环境：
# 上传MIB库至/opt/zabbix/mibs/*
# 无互联网环境：
# cp /opt/zabbix5.4_docker_offline/mibs/* /opt/zabbix/mibs/
# 设置mibs目录权限
chown -R 1997 ./mibs
# 创建自定义告警脚本目录
mkdir -p ./alertscripts
# 创建自定义外部检查脚本目录
mkdir -p ./externalscripts
# 创建mysql配置文件目录
mkdir -p ./mysql/conf
# 创建mysql数据库文件目录
mkdir -p ./mysql/data
# 创建日志文件目录
mkdir -p ./mysql/logs
# 创建mysql配置文件
vi ./mysql/conf/my.cnf
```

./mysql/conf/my.cnf配置文件内容参考：

```
# 服务端基本设置
[mysqld]
# ---------------主从配置---------------
# 服务端ID 用来区分主从服务器
server-id=1


# -----------二进制日志配置-----------
# 启用二进制日志功能 并指定binlog的存储目录
log-bin=mysql-bin
# 二进制日志索引
log-bin-index=mysql-bin.index
# 从MySQL5.1.12开始 可以用以下三种模式来实现复制
# 基于SQL语句的复制(statement-based replication, SBR)
# 基于行的复制(row-based replication, RBR)
# 混合模式复制(mixed-based replication, MBR)。
# 相应地 binlog的格式也有三种 STATEMENT ROW MIXED 
# 强烈建议ROW  其他格式可能导致数据不一致
binlog_format=ROW
# 二进制日志最大长度 超过长度会写入新文件
max_binlog_size=1GB


# -----------其他配置-----------
# 错误日志
log_error = /var/log/mysql/mysql_error.log
# 时区
default-time-zone = '+08:00'
# 日志使用系统时间
log_timestamps=SYSTEM
# 跳过外部锁定;External-locking用于多进程条件下为MyISAM数据表进行锁定
skip-external-locking
# 索引块的缓冲区大小
# 对MyISAM表性能影响最大的一个参数
# 决定索引处理的速度 尤其是索引读的速度
# 默认值是16M
# 通过检查状态值Key_read_requests和Key_reads 可以知道key_buffer_size设置是否合理 
key_buffer_size = 128M
# 查询语句包的最大尺寸。
# 消息缓冲区被初始化为net_buffer_length字节 但是可在需要时增加到max_allowed_packet个字节
# 该值太小则会在处理大包时产生错误 如果使用大的BLOB列 必须增加该值
# 这个值来限制server接受的数据包大小
# 有时候大的插入和更新会受max_allowed_packet 参数限制 导致写入或者更新失败
max_allowed_packet = 128M
# 表描述符缓存大小 可减少文件打开/关闭次数
table_open_cache = 512
# MySQL执行排序使用的缓冲大小
# 如果想要增加ORDER BY的速度 首先看是否可以让MySQL使用索引而不是额外的排序阶段
# 如果不能 可以尝试增加sort_buffer_size变量的大小
sort_buffer_size = 8M
# 通信缓冲区在查询期间被重置到该大小 通常不要改变该参数值 
# 但是如果内存不足 可以将它设置为查询期望的大小。
# 客户发出的SQL语句期望的长度 如果语句超过这个长度 缓冲区自动地被扩大 直到max_allowed_packet个字节
net_buffer_length = 16K
# MySQL读入缓冲区大小 
# 对表进行顺序扫描的请求将分配一个读入缓冲区 MySQL会为它分配一段内存缓冲区
# 如果对表的顺序扫描请求非常频繁 并且你认为频繁扫描进行得太慢 可以通过增加该变量值以及内存缓冲区大小提高其性能
read_buffer_size = 8M
# join多表缓冲区大小
# 应用程序经常会出现一些多表Join的操作需求
# MySQL在完成某些Join需求的时候 为了减少参与Join的被驱动表的读取次数以提高性能 需要使用到JoinBuffer来协助完成Join操作
# 当JoinBuffer太小MySQL不会将该Buffer存入磁盘文件，
# 而是先将Join Buffer中的结果集与需要Join的表进行Join操作，
# 然后清空JoinBuffer中的数据 继续将剩余的结果集写入此Buffer中 如此往复
# 这势必会造成被驱动表需要被多次读取 成倍增加IO访问 降低效率
join_buffer_size = 16M
# MySQL的随机读缓冲区大小
# 当按任意顺序读取行时(例如 按照排序顺序) 将分配一个随机读缓存区
# 进行排序查询时 MySQL会首先扫描一遍该缓冲 以避免磁盘搜索
# 提高查询速度 如果需要排序大量数据 可适当调高该值 但MySQL会为每个客户连接发放该缓冲空间
# 所以应尽量适当设置该值 以避免内存开销过大
read_rnd_buffer_size = 16M
# 当对MyISAM表执行repair table或创建索引时 用以缓存排序索引
# 设置太小时可能会遇到myisam_sort_buffer_size is too small
myisam_sort_buffer_size = 32M
# thread_cahe_size线程池
# 线程缓存 用来缓存空闲的线程 以至于不被销毁 如果线程缓存在的空闲线程 需要重新建立新连接
# 则会优先调用线程池中的缓存 很快就能响应连接请求 每建立一个连接 都需要一个线程与之匹配
thread_cache_size = 8
# 内存临时表的最大值
# 每个线程都要分配 实际起限制作用的是tmp_table_size和max_heap_table_size的最小值
# 如果内存临时表超出了限制 MySQL就会自动地把它转化为基于磁盘的MyISAM表 存储在指定的tmpdir目录下 
tmp_table_size = 256M
# 控制监控实体的个数 内部即限制对应container的容量
performance_schema_max_table_instances = 500
# 时间戳默认null方式 
explicit_defaults_for_timestamp = true
# 连接数最大值 即该参数最大值不能超过16384 即使超过也以16384为准
# 增加max_connections参数的值 不会占用太多系统资源
# 该参数设置过小的最明显特征是出现Too many connections错误
max_connections = 500
# 负责阻止过多尝试失败的客户端以防止暴力破解密码的情况
# 当此值设置为100时 意味着如果某一客户端尝试连接此MySQL服务器 但是失败100次 则MySQL会无条件强制阻止此客户端连接
max_connect_errors = 100
# mysql打开最大文件数 
open_files_limit = 65535
# 默认使用mysql_native_password插件认证密码
default_authentication_plugin = mysql_native_password
# 在内置插件 存储引擎加载前加载第三方插件
early-plugin-load = ""


# 默认存储引擎
default_storage_engine = InnoDB
# 开启独立表空间
innodb_file_per_table = 1
# 数据库目录
innodb_data_home_dir = /var/lib/mysql
# 共享表空间文件
innodb_data_file_path = ibdata1:10M:autoextend
# 事务日志目录
innodb_log_group_home_dir = /var/lib/mysql
# 缓冲区大小
innodb_buffer_pool_size = 1024M
# 日志组中的每个日志文件的大小 单位MB
innodb_log_file_size = 128M
# 日志写入日志磁盘文件前的缓冲大小 
# 如果有大的事务处理 设置大的日志缓冲可以减少磁盘I/O
innodb_log_buffer_size = 64M
# 每次commit日志缓存中的数据刷到磁盘中 通常设置为1
innodb_flush_log_at_trx_commit = 1
# 在回滚之前 InnoDB事务将等待超时的时间 单位秒 
innodb_lock_wait_timeout = 50


[mysqldump]
# 强制mysqldump从服务器查询取得记录直接输出而不是取得所有记录后将它们缓存到内存中
quick
# 限制server接受的数据包大小
# mysql服务器端和客户端在一次传送数据包的过程当中数据包的大小 
max_allowed_packet = 256M
[mysql]
# 关闭自动补全
no-auto-rehash
#使用myisamchk实用程序来获得有关你的数据库桌表的信息 检查和修复他们或优化他们
[myisamchk]
key_buffer_size = 20M
sort_buffer_size = 20M
read_buffer_size = 2M
write_buffer_size = 2M
#mysqlhotcopy使用lock tables flush tables和cp或scp来快速备份数据库
# 它是备份数据库或单个表最快的途径 完全属于物理备份 但只能用于备份MyISAM存储引擎和运行在数据库目录所在的机器上
# 与mysqldump备份不同 mysqldump属于逻辑备份 备份时是执行的sql语句 使用mysqlhotcopy命令前需要要安装相应的软件依赖包
[mysqlhotcopy]
interactive-timeout
```

```
# 设置mysql目录权限
chown -R 999.999 ./mysql/logs
chown -R 999.999 ./mysql/data
# 创建并编辑docker-compose.yml配置文件
vi docker-compose.yml
```

#### 4.2 docker-compose.yml配置文件内容

```
version: '3'
services:
  mysql:
    image: mysql:5.7
    container_name: mysql
    volumes:
      - ./mysql/data:/var/lib/mysql
      - ./mysql/conf:/etc/mysql/conf.d
      - ./mysql/logs:/var/log/mysql
      - /etc/localtime:/etc/localtime
    restart: always
    privileged: true
    environment:
      # root密码
      - MYSQL_ROOT_PASSWORD=root@zabbix
      # 新建数据库
      - MYSQL_DATABASE=zabbix
      # 新建用户
      - MYSQL_USER=zabbix
      # 新用户密码
      - MYSQL_PASSWORD=admin@zabbix
      - TZ=Asia/Shanghai
      - LANG=en_US.UTF-8
    ports:
      - "3306:3306"
    networks:
      zabbix-net:
    command: --character-set-server=utf8 --collation-server=utf8_bin
  zabbix-gateway:
    image: zabbix/zabbix-java-gateway:centos-5.4-latest
    container_name: zabbix-gateway
    volumes:
      - /etc/localtime:/etc/localtime
    restart: always
    privileged: true
    ports:
      - "10052:10052"
    networks:
      zabbix-net:
  zabbix-snmptraps:
    image: zabbix/zabbix-snmptraps:centos-5.4-latest
    container_name: zabbix-snmptraps
    volumes:
      - /etc/localtime:/etc/localtime
      - ./snmptraps:/var/lib/zabbix/snmptraps
      - ./mibs:/var/lib/zabbix/mibs
    restart: always
    privileged: true
    ports:
      - "162:1162/udp"
    networks:
      zabbix-net:
  zabbix-server:
    image: zabbix/zabbix-server-mysql:centos-5.4-latest
    container_name: zabbix-server
    volumes:
      - /etc/localtime:/etc/localtime
      - ./snmptraps:/var/lib/zabbix/snmptraps
      - ./mibs:/var/lib/zabbix/mibs
      - ./alertscripts:/usr/lib/zabbix/alertscripts
      - ./externalscripts:/usr/lib/zabbix/externalscripts
    restart: always
    privileged: true
    environment:
      # 监听端口
      - ZBX_LISTENPORT=10051
      # 数据库地址
      - DB_SERVER_HOST=mysql
      # 数据库端口
      - DB_SERVER_PORT=3306
      # 数据库名
      - MYSQL_DATABASE=zabbix
      # 数据库用户
      - MYSQL_USER=zabbix
      # 数据库密码
      - MYSQL_PASSWORD=admin@zabbix
      # 数据库root密码
      - MYSQL_ROOT_PASSWORD=root@zabbix
      # 用于存储主机 监控项 触发器数据的共享内存大小
      - ZBX_CACHESIZE=1G
      # 历史缓存数据大小
      - ZBX_HISTORYCACHESIZE=512M
      # 历史索引缓存大小
      - ZBX_HISTORYINDEXCACHESIZE=16M
      # 用于存储趋势数据的共享内存大小
      - ZBX_TRENDCACHESIZE=256M
      # 历史数据缓存大小
      - ZBX_VALUECACHESIZE=256M
      # ICMP pingers进程数
      - ZBX_STARTPINGERS=64
      # IPMI进程数
      - ZBX_IPMIPOLLERS=1
      # 开启Traps告警
      - ZBX_ENABLE_SNMP_TRAPS=true
      # Traps进程数
      - ZBX_STARTTRAPPERS=1
      # 开启zabbix java gateway
      - ZBX_JAVAGATEWAY_ENABLE=true
      # zabbix java gateway地址
      - ZBX_JAVAGATEWAY=zabbix-gateway
      # java gateway进程数
      - ZBX_STARTJAVAPOLLERS=1
    ports:
      - "10051:10051"
    networks:
      zabbix-net:
    links:
      - mysql
      - zabbix-gateway
  zabbix-web:
    image: zabbix/zabbix-web-nginx-mysql:centos-5.4-latest
    container_name: zabbix-web
    volumes:
      - ./font/simfang.ttf:/usr/share/zabbix/assets/fonts/DejaVuSans.ttf
      - /etc/localtime:/etc/localtime
    restart: always
    privileged: true
    environment:
      # Web页面左上角程序名
      - ZBX_SERVER_NAME=Zabbix 5.4
      # zabbix server地址
      - ZBX_SERVER_HOST=zabbix-server
      # zabbix server端口
      - ZBX_SERVER_PORT=10051
      # 数据库地址
      - DB_SERVER_HOST=mysql
      # 数据库端口
      - DB_SERVER_PORT=3306
      # 数据库名
      - MYSQL_DATABASE=zabbix
      # 数据库用户
      - MYSQL_USER=zabbix
      # 数据库密码
      - MYSQL_PASSWORD=admin@zabbix
      # 数据库root密码
      - MYSQL_ROOT_PASSWORD=root@zabbix
      # 时区
      - PHP_TZ=Asia/Shanghai
    ports:
      - "80:8080"
    networks:
      zabbix-net:
    links:
      - mysql
      - zabbix-server
networks:
  zabbix-net:
    driver: bridge
    ipam:
      config:
        # 配置容器网段
        - subnet: 172.22.0.0/24
          gateway: 172.22.0.1
```

#### 4.3 启动容器

```
# 进入目录
cd /opt/zabbix
# 创建并后台启动容器
docker-compose up -d
# 查看mysql日志
docker-compose logs mysql
# 查看zabbix java gateway日志
docker-compose logs zabbix-gateway
# 查看zabbix snmptraps日志
docker-compose logs zabbix-snmptraps
# 查看zabbix server日志
docker-compose logs zabbix-server
# 查看zabbix nginx日志
docker-compose logs zabbix-web
# 以root权限进入容器zabbix-server
#docker exec -u root -ti zabbix-server /bin/bash
# 复制mibs下的所有文件至容器zabbix-server的/var/lib/zabbix/mibs目录
#docker cp /opt/zabbix/mibs/. zabbix-server:/var/lib/zabbix/mibs/
# 从容器zabbix-server复制zabbix配置文件至宿主机当前目录
#docker cp zabbix-server:/etc/zabbix/zabbix_server.conf ./
```

#### 4.4 创建别名

```
# 创建别名 方便后期维护
# 创建查看日志别名
echo alias docker-log-mysql=\'docker logs -f mysql\'>>~/.bashrc
echo alias docker-log-zabbix-gateway=\'docker logs -f zabbix-gateway\'>>~/.bashrc
echo alias docker-log-zabbix-snmptraps=\'docker logs -f zabbix-snmptraps\'>>~/.bashrc
echo alias docker-log-zabbix-server=\'docker logs -f zabbix-server\'>>~/.bashrc
echo alias docker-log-zabbix-web=\'docker logs -f zabbix-web\'>>~/.bashrc
# 创建以root权限进入容器别名
echo alias docker-mysql=\'docker exec -u root -ti mysql /bin/bash\'>>~/.bashrc
echo alias docker-zabbix-gateway=\'docker exec -u root -ti zabbix-gateway /bin/bash\'>>~/.bashrc
echo alias docker-zabbix-snmptraps=\'docker exec -u zabbix-snmptraps -ti mysql /bin/bash\'>>~/.bashrc
echo alias docker-zabbix-server=\'docker exec -u root -ti zabbix-server /bin/bash\'>>~/.bashrc
echo alias docker-zabbix-web=\'docker exec -u root -ti zabbix-web /bin/bash\'>>~/.bashrc
# 使配置生效
source ~/.bashrc
```

### 五、访问测试

```
浏览器访问：http://IP地址
用户名：Admin
密码：zabbix
```

### 六、防火墙

#### 6.1 Centos7/8

```
# 放行nginx端口
firewall-cmd --zone=public --add-port=80/tcp --permanent
# 放行zabbix agent端口
firewall-cmd --zone=public --add-port=10050/tcp --permanent
# 放行zabbix server端口
firewall-cmd --zone=public --add-port=10051/tcp --permanent
# 放行zabbix java gateway端口
firewall-cmd --zone=public --add-port=10052/tcp --permanent
# 放行mysql端口
firewall-cmd --zone=public --add-port=3306/tcp --permanent
# 放行snmptraps端口
firewall-cmd --zone=public --add-port=162/udp --permanent
# 重载防火墙
firewall-cmd --reload
```

#### 6.2 Debian10

```
# 离线下载地址：
# https://mirrors.aliyun.com/debian/pool/main/u/ufw/ufw_0.36-1_all.deb
# 使用dpkg -i ufw_0.36-1_all.deb安装
# 联网安装防火墙
apt install ufw
# 放行ssh服务
ufw allow ssh
# 放行zabbix agent端口
ufw allow 10050/tcp
# 放行zabbix server端口
ufw allow 10051/tcp
# 放行zabbix java gateway端口
ufw allow 10052/tcp
# 放行mysql端口
ufw allow 3306/tcp
# 放行nginx端口
ufw allow 80/tcp
# 放行snmptraps端口
ufw allow 162/udp
# 启用ufw（注意如果通过SSH操作启用前请检查是否打开了ssh端口）
ufw enable
# 查看防火墙运行状态
ufw status verbose
```

### 七、接入Grafana面板

#### 7.1 从互联网拉取镜像

```
# 拉取grafana/grafana:8.4.7镜像
docker pull grafana/grafana:8.4.7
# 查看镜像
docker images
```

#### 7.2 (可选)使用Dockerfile构造含插件的离线镜像并导出

Dockerfile内容：

```
ARG GRAFANA_VERSION="latest"

FROM grafana/grafana:${GRAFANA_VERSION}

USER root

ARG GF_INSTALL_IMAGE_RENDERER_PLUGIN="false"

ARG GF_GID="0"
ENV GF_PATHS_PLUGINS="/var/lib/grafana-plugins"

RUN mkdir -p "$GF_PATHS_PLUGINS" && \
    chown -R grafana:${GF_GID} "$GF_PATHS_PLUGINS"

RUN if [ $GF_INSTALL_IMAGE_RENDERER_PLUGIN = "true" ]; then \
    echo "https://mirrors.aliyun.com/alpine/v3.15/main" > /etc/apk/repositories && \
    echo "https://mirrors.aliyun.com/alpine/v3.15/community" >> /etc/apk/repositories && \
    echo "https://mirrors.aliyun.com/alpine/edge/community" >> /etc/apk/repositories && \
    echo "https://mirrors.aliyun.com/alpine/edge/main" >> /etc/apk/repositories && \
    echo "https://mirrors.aliyun.com/alpine/edge/testing" >> /etc/apk/repositories && \
    apk --no-cache  upgrade && \
    apk add --no-cache udev ttf-opensans chromium && \
    rm -rf /tmp/* && \
    rm -rf /usr/share/grafana/tools/phantomjs; \
fi

USER grafana

ENV GF_PLUGIN_RENDERING_CHROME_BIN="/usr/bin/chromium-browser"

RUN if [ $GF_INSTALL_IMAGE_RENDERER_PLUGIN = "true" ]; then \
    grafana-cli \
        --pluginsDir "$GF_PATHS_PLUGINS" \
        --pluginUrl https://github.com/grafana/grafana-image-renderer/releases/latest/download/plugin-linux-x64-glibc-no-chromium.zip \
        plugins install grafana-image-renderer; \
fi

ARG GF_INSTALL_PLUGINS=""

RUN if [ ! -z "${GF_INSTALL_PLUGINS}" ]; then \
    OLDIFS=$IFS; \
    IFS=','; \
    for plugin in ${GF_INSTALL_PLUGINS}; do \
        IFS=$OLDIFS; \
        if expr match "$plugin" '.*\;.*'; then \
            pluginUrl=$(echo "$plugin" | cut -d';' -f 1); \
            pluginInstallFolder=$(echo "$plugin" | cut -d';' -f 2); \
            grafana-cli --pluginUrl ${pluginUrl} --pluginsDir "${GF_PATHS_PLUGINS}" plugins install "${pluginInstallFolder}"; \
        else \
            grafana-cli --pluginsDir "${GF_PATHS_PLUGINS}" plugins install ${plugin}; \
        fi \
    done \
fi
```

```
# 创建Dockerfile文件
vi Dockerfile
# 构建一个含插件的镜像
# GRAFANA_VERSION ： 版本
# GF_INSTALL_PLUGINS ： 插件列表
# -t 目标镜像名称
docker build \
--build-arg "GRAFANA_VERSION=8.4.7" \
--build-arg "GF_INSTALL_PLUGINS=alexanderzobnin-zabbix-app,grafana-clock-panel,grafana-simple-json-datasource" \
-t grafana-zabbix:8.4.7 -f Dockerfile .
# 导出构建的镜像
docker save grafana-zabbix:8.4.7 -o grafana-zabbix-8.4.7.tar
```

#### 7.3 配置目录

```
# 创建程序目录
mkdir -p /opt/grafana
# 进入目录
cd /opt/grafana
# 创建数据目录
mkdir data
# 创建日志目录
mkdir log
# 修改目录权限
chown -R 472 data
chown -R 472 log
# 创建并编辑docker-compose.yml配置文件
vi docker-compose.yml
```

#### 7.4 docker-compose.yml配置文件内容

```
version: '3'
services:
  grafana:
    image: grafana/grafana:8.4.7
    #image: grafana-zabbix:8.4.7
    container_name: grafana
    volumes:
      - /etc/localtime:/etc/localtime
      # 挂载数据目录
      - ./data:/var/lib/grafana
      # 挂载日志目录
      - ./log:/var/log/grafana
    restart: always
    privileged: true
    environment:
      # 默认用户名密码
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin
      # 远程渲染地址
      - GF_RENDERING_SERVER_URL=http://renderer:8081/render
      # 远程渲染回调地址
      - GF_RENDERING_CALLBACK_URL=http://grafana:3000/
      # 安装zabbix clock json插件 <如使用本地构建注释此变量>
      - GF_INSTALL_PLUGINS=alexanderzobnin-zabbix-app,grafana-clock-panel,grafana-simple-json-datasource
    ports:
      - "3000:3000"
    networks:
      grafana-net:
  # 图形渲染插件
  renderer:
    image: grafana/grafana-image-renderer:3.4.0
    container_name: renderer
    volumes:
      - /etc/localtime:/etc/localtime
    restart: always
    privileged: true
    environment:
      # 默认时区
      - BROWSER_TZ=Asia/Shanghai
      # 忽略https错误
      - IGNORE_HTTPS_ERRORS=true
    expose:
      - "8081"
    networks:
      grafana-net:
networks:
  grafana-net:
    driver: bridge
    ipam:
      config:
        # 配置容器网段
        - subnet: 172.23.0.0/24
          gateway: 172.23.0.1
```

#### 7.5 启动容器

```bash
# 放行端口
firewall-cmd --zone=public --add-port=3000/tcp --permanent
# 重载防火墙
firewall-cmd --reload
# 进入目录
cd /opt/grafana
# 启动
docker-compose up -d
# 查看日志
docker logs grafana
docker logs renderer
```

#### 7.6 配置Grafana

浏览器访问http://IP地址:3000
默认用户名密码：admin/admin