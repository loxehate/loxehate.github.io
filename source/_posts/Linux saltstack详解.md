---
title: Linux saltstack详解
tags: [自动化运维]
categories: [Linux]
date: 2025-05-09
---
### 一、[saltstack](https://so.csdn.net/so/search?q=saltstack&spm=1001.2101.3001.7020)简介

#### 1、介绍

```
saltstack是一个配置管理系统(客户端和服务端)，能够维护预定义状态的远程节点。
saltstack是一个分布式远程执行系统，用来在远程节点上执行命令和查询数据。
saltstack是运维人员提高工作效率、规范业务配置与操作的利器。
```

#### 2、[Salt](https://so.csdn.net/so/search?q=Salt&spm=1001.2101.3001.7020)的核心功能

```
①使命令发送到远程系统是并行的而不是串行的
②使用安全加密的协议
③使用最小最快的网络载荷
④提供简单的编程接口
Salt同样引入了更加细致化的领域控制系统来远程执行，使得系统成为目标不止可以通过主机名，还可以通过系统属性。
```

#### 3、saltstack通信机制

```
SaltStack 采用 C/S模式，minion与master之间通过ZeroMQ消息队列通信，默认监听4505端口。
Salt Master运行的第二个网络服务就是ZeroMQ REP系统，默认监听4506端口。
```

### 二、saltstack部署

#### 1、部署环境

| **主机名** | **IP地址**    | **服务**    |
| ---------- | ------------- | ----------- |
| PC1        | 192.168.10.20 | salt-master |
| PC2        | 192.168.10.21 | salt-minion |

#### 2、配置yum源

```
sudo rpm --import https://repo.saltproject.io/py3/redhat/7/x86_64/latest/SALTSTACK-GPG-KEY.pub
curl -fsSL https://repo.saltproject.io/py3/redhat/7/x86_64/latest.repo | sudo tee /etc/yum.repos.d/salt.repo
```

#### 3、安装master与minion

```bash
[root@master ~]# yum list salt			#查看salt包
[root@master ~]# yum install salt-master -y			#安装salt-master
[root@master ~]# yum install salt-minion -y			#安装salt-minion
```

#### 4、salt端口

**安装好salt之后开始配置，salt-master默认监听两个端口：**

| 4505 | publish_port 提供远程命令发送功能           |
| ---- | ------------------------------------------- |
| 4506 | ret_port 提供认证，文件服务，结果收集等功能 |

**确保客户端可以通信服务器的此2个端口，保证防火墙允许端口通过。本例环境直接关闭了防火墙。**

#### 5、修改配置文件

| salt-master的配置文件 | /etc/salt/master |
| --------------------- | ---------------- |
| salt-minion的配置文件 | /etc/salt/minion |

**配置文件中包含了大量可调整的参数，这些参数控制master和minion各个方面**

1）配置salt-master

```
[root@master ~]# vim /etc/salt/master
interface: 0.0.0.0	 	#绑定到本地的0.0.0.0地址
publish_port: 4505　　 	#管理端口，命令发送
user: root　　　　　　  	#运行salt进程的用户
worker_threads: 5		#salt运行线程数，线程越多处理速度越快，不要超过cpu个数
ret_port: 4506			#执行结果返回端口
pidfile: /var/run/salt-master.pid		#pid文件位置
log_file: /var/log/salt/master			#日志文件地址

auto_accept: False			#自动接收minion的key
```

2）配置salt-minion文件

```
[root@master ~]# vim /etc/salt/minion
master: 192.168.10.21
master_port: 4506
user: root
id: master
acceptance_wait_time: 10
log_file: /var/log/salt/minion
```

#### 6、启动salt-master和salt-minion

```
[root@master ~]# systemctl start salt-minion
[root@master ~]# systemctl start salt-master

检查salt状态
[root@master ~]# systemctl status salt-minion
[root@master ~]# systemctl status salt-master
```

#### 7、master上接收minion秘钥

**在minion启动后连接master会请求master为其签发证书，等待证书签发完成后，master可以信任minion，并且minion和master之间的通信是加密的**

1）在salt-master上查看KEY状态

```
[root@master ~]# salt-key -L		#salt-key命令用于管理mionion秘钥
Accepted Keys:
Denied Keys:
Unaccepted Keys:
master　　　　#此时已经出现master（本机的master）
minion　　　　#此时已经出现minion（minion的minion）
Rejected Keys:
```

此时slave已经出现在unaccepted keys中，说明minion已经和master联系，并且master已经获取了minion的公钥，等待下一步指令

2）检查master和minion的秘钥匹配

master上执行

```
[root@master ~]# salt-key -f master
Unaccepted Keys:
master:  dc:58:23:ea:81:16:73:ce:64:11:0e:d0:ef:07:48:d0
[root@master ~]# salt-key -f minion
Unaccepted Keys:
minion:  6f:87:18:3d:08:dc:e2:8d:d5:1e:fc:1a:16:9a:01:da
```

在master和minion上获取两个minion的秘钥

```
[root@master ~]# salt-call --local key.finger
local:
    dc:58:23:ea:81:16:73:ce:64:11:0e:d0:ef:07:48:d0

[root@minion ~]# salt-call --local key.finger
local:
    6f:87:18:3d:08:dc:e2:8d:d5:1e:fc:1a:16:9a:01:da
```

在master上接收秘钥

```
[root@master ~]# salt-key -a master
The following keys are going to be accepted:
Unaccepted Keys:
master
Proceed? [n/Y] y
Key for minion master accepted.

[root@master ~]# salt-key -a minion
The following keys are going to be accepted:
Unaccepted Keys:
minion
Proceed? [n/Y] y
Key for minion minion accepted.
```

确认接收秘钥后，检验minion秘钥是否被接收

```
[root@master ~]# salt-key -L
Accepted Keys:
master
minion
Denied Keys:
Unaccepted Keys:
Rejected Keys:
```

#### 8、认证命令salt-key

```
[root@linux-node1 ~]# salt-key -L #查看KEY状态
Accepted Keys： #已经接受的key
Denied Keys： #拒绝的key
Unaccepted Keys： #未加入的key
Rejected Keys： #吊销的key
```

```
常用参数：
-L #查看KEY状态
-A #允许所有
-D #删除所有
-a #认证指定的key
-d #删除指定的key
-r #注销掉指定key（该状态为未被认证）

#在master端/etc/salt/master配置
auto_accept: True #如果对所有Minion信任,可以配置master自动接受请求
```

#### 9、salt相关文件

1）master端

```
[root@master ~]# rpm -ql salt-master
/etc/salt/master      # salt master主配置文件
/usr/bin/salt           #salt master 核心操作命令
/usr/bin/salt-cp       #salt 文件传输命令
/usr/bin/salt-key    #salt证书管理
/usr/bin/salt-master    #salt master 服务命令
/usr/bin/salt-run          #salt master runner命令
```

2）slave端

```
[root@minion ~]# rpm -ql salt-minion
/etc/salt/minion     #minion配置文件
/usr/bin/salt-call    #拉取命令
/usr/bin/salt-minion   #minion服务命令
/usr/lib/systemd/system/salt-minion.service   #minion启动脚本
```

### 三、salt日常命令参数

#### 1、执行格式

```
salt [options] '<target>' <function> [arguments]
#执行格式
target：指定哪些minion，默认的规则是使用glob匹配minion id        # salt '*' test.ping
targets也可以使用正则表达式        # salt -E 'server[1-3]' test.ping
targets也可以指定列表              # salt -L 'server2,server3' test.ping
funcation：module提供的功能,Salt内置了大量有效的functions
arguments：通过空格来界定参数
# 常用target参数
    -E       正则匹配
    -L       列表匹配 
    -S       CIDR匹配网段
    -G       grains匹配
    --grain-pcre     grains加正则匹配
    -N       组匹配
    -R       范围匹配
    -C       综合匹配（指定多个匹配）
    -I       pillar值匹配
# 常用的options
    --version             查看saltstack的版本号
    --versions-report     查看saltstack以及依赖包的版本号
    -h       查看帮助信息
    -c CONFIG_DIR         指定配置文件目录(默认为/etc/salt/)
    -t TIMEOUT            指定超时时间(默认是5s)
    --async     异步执行
    -v      verbose模式，详细显示执行过程
    --username=USERNAME      指定外部认证用户名
    --password=PASSWORD      指定外部认证密码
    --log-file=LOG_FILE      指定日志记录文件
```

1）完整的五部分命令

```
[root@master ~]# salt --summary '*' cmd.run 'hostname'		#summary参数显示salt命令的概要
master:
    master
minion:
    minion
    
-------------------------------------------
Summary
-------------------------------------------
# of Minions Targeted: 2
# of Minions Returned: 2
# of Minions Did Not Return: 0
-------------------------------------------
```

2）列出所有salt的sys模块

```
[root@master ~]# salt 'minion' sys.list_modules			#与系统交互的sys模块
```

#### 2、test

1）test.ping

```
[root@master ~]# salt '*' test.ping
minion:
    True
master:
    True
```

```
注释：
salt 是一个命令
* 表示目标主机, 在这里代表所有目标主机
test.ping是salt远程执行的一个模块下面的方法。
```

2）test.echo

```
[root@master ~]# salt '*' test.echo 'hello'
master:
    hello
minion:
    hello
```

3）test.fib

test.fib生成斐波那契数列（菲波那切数列定义是第0项是0，第1项是1，数列从第3项开始，每一项等于前两项之和）

```
[root@master ~]# salt 'minion' test.fib 50
minion:
    |_
      - 0
      - 1
      - 1
      - 2
      - 3
      - 5
      - 8
      - 13
      - 21
      - 34
    - 6.91413879395e-06
```

### 四、远程执行命令模块

#### 1、cmd模块

```
[root@master ~]# salt 'minion' cmd.run 'ps -ef | grep python'
minion:
    root        938      1  0 Aug07 ?        00:00:02 /usr/bin/python -Es /usr/sbin/tuned -l -P
    root       2945      1  0 Aug07 ?        00:00:00 /usr/bin/python /usr/bin/salt-minion
    root       2951   2945  0 Aug07 ?        00:00:06 /usr/bin/python /usr/bin/salt-minion
    root      42862      1  0 02:46 ?        00:00:00 /usr/bin/python /usr/bin/salt-minion
    root      42863  42862  0 02:46 ?        00:00:00 /bin/sh -c ps -ef | grep python
    root      42865  42863  0 02:46 ?        00:00:00 grep python
```

#### 2、远程安装nginx

```
[root@master ~]# salt '*' pkg.install "nginx"			#在minion上安装nginx
[root@master ~]# salt 'master' pkg.remove "nginx"			#卸载minion上的nginx
[root@master ~]# salt 'minion' pkg.version "nginx"			#检查pkg包的版本
minion:
    1:1.16.1-1.el7
```

#### 3、远程管理服务模块

管理服务是系统管理员的重要任务，通过salt管理minion服务会很简单，使用service模块

```
[root@master ~]# salt 'minion' service.start "nginx"
minion:
    True
[root@master ~]# salt 'minion' service.status "nginx"
minion:
    True
[root@master ~]# salt 'minion' service.stop "nginx"
minion:
    True
```

### 五、与标准的Linux命令一样，salt的命令一样用法

out控制salt命令结果输出的格式

**json**

```
[root@master ~]# salt --out=json '*' cmd.run_all 'hostname'
{
    "master": {
        "pid": 49012, 
        "retcode": 0, 
        "stderr": "", 
        "stdout": "master"
    }
}
{
    "minion": {
        "pid": 43028, 
        "retcode": 0, 
        "stderr": "", 
        "stdout": "minion"
    }
}
```

**YAML**

```
[root@master ~]# salt --out=yaml '*' cmd.run_all 'hostname'
minion:
  pid: 43034
  retcode: 0
  stderr: ''
  stdout: minion
master:
  pid: 49063
  retcode: 0
  stderr: ''
  stdout: master
```

### 六、states编写

在学习saltstack过程中，第一要点就是States编写技巧，简称SLS文件。这个文件遵循YAML语法。
json xml yaml 数据序列化格式
yaml容易被解析，应用于配置文件

salt的配置文件是yaml配置文件，不能用tab
saltstack，k8s，ansible都用的yaml格式配置文件

    语法规则：
    大小写敏感
    使用缩进表示层级关系
    缩进时禁止tab键，只能空格
    缩进的空格数不重要，相同层级的元素左侧对其即可
    # 表示注释行

```
yaml支持的数据结构：
对象： 键值对，也称作映射 mapping 哈希hashes 字典 dict 冒号表示 key: value key冒号后必须有空格
数组： 一组按次序排列的值，又称为序列sequence 列表list 短横线 - list1
纯量： 单个不可再分的值
```

对象：键值对

```
yaml
    first_key:
      second_key:second_value

python
    {
        'first_key':{
            'second_key':'second_value',
        }
    }
```

**YAML是YAML Ain’t Markup Language的首字母缩写，YAML的语法简单，结构体通过空格展示**

```
项目使用 ‘-’ 代表
键值对通过 ‘:’ 分割
```

**YAML语法遵循固定的缩进风格，表示数据层级结构关系，saltstack需要每个缩进级别由2个空格组成，禁止用tabs！！！**

```
Python中的字典是简单的键值对，go语言中称作哈希表map
字典的key通过冒号分割
```

**key在YAML中表现形式是一个冒号结果的字符串**

```
my_key: my_value
```

转化到python语法中，上述命令为

```
{'my_key':'my_value'}
```

**value还可以通过缩进和key关联，四个空格！！**

```
my_key:
    my_value 
```

转化为python语法同样的

```
{'my_key':'my_value'}
```

**YAML语法中字典是可以嵌套的**

```
one_dict_key:
    two_dict_key:value_dict
```

转化为python语法

```
{
　　'one_dict_key':{
　　　　'two_dict_key':'value_dict'
　　}
}
```

**短横杠**

YAML语法表示列表，使用一个横杠加一个空格，多个项使用同样的缩进级别作为同一个列表的部分

```
- list_value_one
- list_value_two
- list_value_three
```

### 七、通过state模块部署nginx

1）打开注释，写入以下，必须严格遵循语法，空格

```
[root@master ~]# vim /etc/salt/master 
file_roots:
  base:
    - /srv/salt/base
  dev:
    - /srv/salt/dev
  test:
    - /srv/salt/test
  prod:
    - /srv/salt/prod
```

```
[root@master ~]# systemctl restart salt-master			#重启服务
```

2）此步骤在master和minion都需要执行，都需要文件夹，和nginx.sls文件

```
[root@master ~]# mkdir -p /srv/salt/{base,dev,test,prod}

[root@minion ~]# mkdir -p /srv/salt/{base,dev,test,prod}
```

3）这个nginx.sls状态文件，在master和minion上都得有

```
[root@master ~]# vim /srv/salt/base/nginx.sls
nginx-install:
  pkg.installed:
    - name: nginx

nginx-service:
  service.running:
    - name: nginx
    - enable: True
```

```
nginx.sls文件解释：
sls配置文件都遵循YAML语言描述
第一条命令使用了pkg.install安装命令，相对于运行了yum install，而此时state模块会判断nginx是否安装了，如果没有安装就进行安装，安装了就什么都不做。
状态描述都会遵循这个原则，只有检测到真实状态和所需状态不一就会执行此功能，这种性质叫做幂等性。
```

4）启动命令，此时slave已经安装且存活了nginx，进行状态管理

```
[root@master ~]# salt 'minion' state.sls nginx
```

以去minion测试关闭nginx，删除nginx，重新执行命令，一样可以安装启动nginx

5）通过master检查slave的nginx状态

```
[root@master ~]# salt 'minion' cmd.run 'ps -ef | grep nginx'
minion:
    root      42978      1  0 02:49 ?        00:00:00 nginx: master process /usr/sbin/nginx
    nginx     42979  42978  0 02:49 ?        00:00:00 nginx: worker process
    root      43255  43254  0 03:04 ?        00:00:00 /bin/sh -c ps -ef | grep nginx
    root      43257  43255  0 03:04 ?        00:00:00 /bin/sh -c ps -ef | grep nginx
```

### 八、salt采集静态信息

Grains 是saltstack组件中非常重要之一，在配置部署时候经常使用，Grains记录minion的静态信息，比如常用属性，CPU、内存、磁盘、网络信息等。
Minions的Grains信息是Minion启动时采集汇报给Master的
Grains是以 key value形式存储的数据库，可以看做Host的元数据（metadata）
Grains保存着收集到的客户端的详细信息
如果slave机器数据变化，grains就过期了

    在生产环境中需要自定义Grains，可以通过：
    Minion配置文件
    Grains相关模块定义
    Python脚本定义

```
[root@master ~]# salt 'minion' sys.doc grains 			#查看grains的命令用法
```

**Grains人为是描述minion本身固有的静态属性数据，列出主机所有Grains数据**

```
[root@master ~]# salt 'minion' grains.items
```

```
[root@master ~]# salt 'minion' grains.ls  		#列出所有grains方法
```

#### 1、检索某些数据

```
[root@master ~]# salt 'minion' grains.item os id host
minion:
    ----------
    host:
        minion
    id:
        minion
    os:
        CentOS
```

**利用Grains静态信息定位主机**

```
[root@master ~]# salt '*' grains.item key1 key2 key3
minion:
    ----------
    key1:
    key2:
    key3:
master:
    ----------
    key1:
    key2:
    key3:
```

**salt ‘\*’ -G**

**定位Cenots的机器**

```
[root@master ~]# salt -G 'os:CentOS' test.ping
master:
    True
minion:
    True
```

**定位操作系统系统是7系列的机器**

```
[root@master ~]# salt -G 'osrelease:7*' test.ping
minion:
    True
master:
    True
```

**找出ip地址**

```
[root@master ~]# salt '*' grains.item fqdn_ip4
master:
    ----------
    fqdn_ip4:
        - 192.168.1.128
        - 192.168.122.1
minion:
    ----------
    fqdn_ip4:
        - 192.168.1.129
        - 192.168.122.1
```

**因此用grains.items列出所有的数据匹配主机，以及根据单一信息定位数据，Grains还可以自定义来满足不同的需求。**

#### 2、自定义设置Grains数据

**设置数据**

```
[root@master ~]# salt 'minion' grains.setval cpu_num 8
minion:
    ----------
    cpu_num:
        8
```

**查询数据**

```
[root@master ~]# salt 'minion' grains.item cpu_num
minion:
    ----------
    cpu_num:
        8
```

**在master端设置Grains静态数据，原理会将此数据添加到minion服务器的配置文件的/etc/salt/grains**

```
[root@minion ~]# cat /etc/salt/grains
cpu_num: 8
```

**对于复杂的数据结构，可以添加灵活的JSON语法**

```
[root@master ~]# salt 'minion' grains.setval cpu_info '["Intel","Xeon","10"]'
minion:
    ----------
    cpu_info:
        - Intel
        - Xeon
        - 10
```

```
[root@master ~]# salt 'minion' grains.item cpu_info
minion:
    ----------
    cpu_info:
        - Intel
        - Xeon
        - 10
```

**此时可以检查minion服务器上的grains文件**

```
[root@minion ~]# cat /etc/salt/grains
cpu_info:
- Intel
- Xeon
- '10'
cpu_num: 8
```

**因此Grains数据写入配置文件后，重启salt-minion服务，数据也不会丢失**

**#想要删除可以通过grains.delval命令删除，或者去minion的配置文件删除配置一样完成操作（或者删除文件）**

**方法一：清空值**

```
[root@master ~]# salt 'minion' grains.delval cpu_info
minion:
    None
[root@master ~]# salt 'minion' grains.delval cpu_num
minion:
    None
```

**方法二：删除minion的grains配置文件，重启服务**

```
[root@minion ~]# rm -rf /etc/salt/grains
[root@minion ~]# systemctl restart salt-minion
```

**检查结果删除成功**

### 九、Pillar

Pillar也是saltstack组件中非常重要的组件之一，称作数据管理中心，经常配合states在大规模的配置管理中使用。

Pillar是动态的，存储在master端，提供和给minion端

Pillar在SaltStack中主要的作用是存储和定义配置管理中需要的一些数据，比如软件版本号，用户账号密码等，保证敏感数据不被其他minion看到

存储格式与Grains类似，都是YAML格式

在master配置文件中有一段Pillar settings选项专门定义Pillar的参数

    cat /etc/salt/master
    此配置代表pillar的工作根目录，在/srv/pillar下，然后可以新建sls文件
    #pillar_roots:
    #  base:
    #    - /srv/pillar

默认pillar的工作目录在/srv/pillar目录下，执行如下代码

```
[root@master ~]# mkdir -p /srv/pillar
```

指定环境，标记，引用packages.sls和services.sls

```
[root@master ~]# vim /srv/pillar/top.sls
base:
  '*':
    - packages
    - services
```

```
[root@master ~]# vim /srv/pillar/packages.sls
nginx:
  packages-name: nginx
  version: 1.12.2
```

```
[root@master ~]# vim /srv/pillar/services.sls
nginx:
  port: 80
  user: root
```

检查我们设置的pillar值

```
[root@master ~]# salt '*' pillar.item nginx
master:
    ----------
    nginx:
        ----------
        packages-name:
            nginx
        port:
            80
        user:
            root
        version:
            1.12.2
minion:
    ----------
    nginx:
        ----------
        packages-name:
            nginx
        port:
            80
        user:
            root
        version:
            1.12.2
```

**pillar与Grains对比：**

| 类型   | 数据采集方式 | 应用场景                                    | 定义位置 |
| ------ | ------------ | ------------------------------------------- | -------- |
| Grains | 静态         | minion启动时收集 数据查询 目标选择 配置管理 | minion   |
| Pillar | 动态         | master进行自定义 目标选择 配置管理 敏感数据 | master   |

