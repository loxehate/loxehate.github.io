---
title: Linux 内核参数详解
tags: [内核参数]
categories: [Linux]
date: 2025-05-09
---
### 一、sysctl.conf文件调优

```
#系统端口的限定范围，防止和应用的端口冲突(UDP和TCP连接中本地端口的取值范围)
net.ipv4.ip_local_port_range = 11000 65000
#tcp并发连接数，选项默认值是128，这个参数用于调节系统同时发起的tcp连接数，在高并发请求中，默认的值可能会导致连接超时或重传，因此，需要结合并发请求数来调节此值
net.core.somaxconn = 16384
#ARP缓存条目超时
net.ipv4.neigh.default.gc_stale_time=120
#始终使用与目的IP地址对应的最佳本地IP地址作为ARP请求的源IP地址
net.ipv4.conf.default.arp_announce = 2
始终使用与目的IP地址对应的最佳本地IP地址作为ARP请求的源IP地址
net.ipv4.conf.all.arp_announce = 2
#配置服务器 TIME_WAIT 数量
net.ipv4.tcp_max_tw_buckets = 5000
#此参数应该设置为1，防止SYN Flood
net.ipv4.tcp_syncookies = 1
#指定所能接受SYN同步包的最大客户端数量，即半连接上限
net.ipv4.tcp_max_syn_backlog = 8196
#客户端发起SYNC连接，如果超时会进行重传，重传次数
net.ipv4.tcp_synack_retries = 2
#始终使用与目的IP地址对应的最佳本地IP地址作为ARP请求的源IP地址
net.ipv4.conf.lo.arp_announce = 2

#防止TCP SACK攻击
#启用有选择的应答（1表示启用），通过有选择地应答乱序接收到的报文来提高性能，让发送者只发送丢失的报文段，（对于广域网通信来说）这个选项应该启用，但是会增加对CPU的占用
net.ipv4.tcp_sack = 0
#表示允许将处于TIME-WAIT状态的socket（TIME-WAIT的端口）用于新的TCP连接 
net.ipv4.tcp_tw_reuse = 1
#对于本端断开的socket连接，TCP保持在FIN-WAIT-2状态的时间（秒）。对方可能会断开连接或一直不结束连接或不可预料的进程死亡
net.ipv4.tcp_fin_timeout = 30
#每个用户所能创建的 inotify 实例的数量。每个实例可以监视一个或多个文件或目录。当数量超过此限制时，新的监视请求将被拒绝
fs.inotify.max_user_watches = 387143
#所有网卡，反向路由的出口必须与数据包的入口网卡是同一块，否则就会丢弃数据包。
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1
#关闭linux内存透明大页
echo never > /sys/kernel/mm/transparent_hugepage/enabled
#网络包最大跟踪连接数
net.netfilter.nf_conntrack_max = 2100000
#控制core文件的文件名是否添加pid作为扩展
kernel.core_uses_pid = 1
#linux交换空间swap分区使用权重情况
vm.swappiness = 10
#该文件表示是否启用以一种比超时重发更精确的方法来启用对 RTT 的计算，时间戳
net.ipv4.tcp_timestamps = 1
#修改最大进程数后
kernel.pid_max=1000000

#优化开启iptables后防火墙丢包率
modprobe nf_conntrack
echo "modprobe nf_conntrack">> /etc/rc.local
#保证防火墙重启后 加载/etc/sysctl中nf_conntrack的配置
sed -ri 's/IPTABLES_SYSCTL_LOAD_LIST=.*/IPTABLES_SYSCTL_LOAD_LIST="net.nf_conntrack"/g' /etc/init.d/iptables
```

### 二、limits.conf文件调优

```
#修改linux 最大文件限制数
echo "ulimit -SHn 65535" >> /etc/profile
echo "ulimit -SHu 65535" >> /etc/profile
source /etc/profile

#soft是一个警告值，而hard则是一个真正意义的阀值，超过就会报错
#任何用户可以打开的最大进程数
echo '*    soft   nproc    65535' >> /etc/security/limits.conf
echo '*    hard   nproc    65535' >> /etc/security/limits.conf
#任何用户可以打开的最大的文件描述符数量，默认1024，这里的数值会限制tcp连接
echo '*    soft   nofile   65535' >> /etc/security/limits.conf
echo '*    hard   nofile   65535' >> /etc/security/limits.conf
echo '*    soft   core   0' >> /etc/security/limits.conf
echo '*    hard   core   0' >> /etc/security/limits.conf

#`uname -r` =~  el6.*x86_64 
#/etc/security/limits.d/下的配置会覆盖/etc/security/limits.conf的配置
cp /etc/security/limits.d/90-nproc.conf /etc/security/limits.d/90-nproc.conf$DATE
echo "*          soft    nproc     65535" >> /etc/security/limits.d/90-nproc.conf
echo "root       soft    nproc     unlimited" >> /etc/security/limits.d/90-nproc.conf
ulimit -a

#`uname -r` =~  el7.*x86_64
echo "*          soft    nproc     65535" >> /etc/security/limits.d/20-nproc.conf
echo "root       soft    nproc     unlimited" >> /etc/security/limits.d/20-nproc.conf
sed  -i  '/DefaultLimitCORE/d' /etc/systemd/system.conf
sed  -i  '/DefaultLimitNOFILE/d' /etc/systemd/system.conf
sed  -i  '/DefaultLimitNPROC/d' /etc/systemd/system.conf
sed  -i  '/DefaultLimitCORE/d' /etc/systemd/user.conf
sed  -i  '/DefaultLimitNOFILE/d' /etc/systemd/user.conf
sed  -i  '/DefaultLimitNPROC/d' /etc/systemd/user.conf
echo "DefaultLimitCORE=infinity" >> /etc/systemd/system.conf
echo "DefaultLimitNOFILE=100000" >> /etc/systemd/system.conf
echo "DefaultLimitNPROC=100000" >> /etc/systemd/system.conf
echo "DefaultLimitCORE=infinity" >> /etc/systemd/user.conf
echo "DefaultLimitNOFILE=100000" >> /etc/systemd/user.conf
echo "DefaultLimitNPROC=100000" >> /etc/systemd/user.conf
systemctl daemon-reexec
systemctl daemon-reload	
ulimit -a
```

### 三、Linux 调整内存大页

```
https://zhanghaoxin.blog.csdn.net/article/details/130377683?fromshare=blogdetail&sharetype=blogdetail&sharerId=130377683&sharerefer=PC&sharesource=qq_55477889&sharefrom=from_link
```

#### 1、HugePages 场景

HugePages 适用于哪些应用？

```
数据库（Oracle、MySQL、PostgreSQL）：减少 SGA/PGA 页表管理负担。
大数据应用（Hadoop、Spark）：减少 TLB 失效，提高 CPU 性能。
虚拟化（KVM/QEMU）：减少 VM 页表开销，提高内存访问速度。
高性能计算（HPC）：加速计算密集型任务。
```

什么时候不建议使用 HugePages？

```
小型应用或轻量级服务：如果内存占用低于 2GB，使用 HugePages 可能不会有太大收益。
动态分配内存的应用：HugePages 需要 预分配，如果应用需要频繁调整内存大小（如 Java 应用），可能会有问题（可以考虑 Transparent HugePages）。
不支持 HugePages 的程序：某些应用可能不兼容，需要修改代码或配置。
```

#### 2、 HugePages 的优势

| 优势               | 解释                                                  |
| ------------------ | ----------------------------------------------------- |
| 减少页面数量       | 2MB HugePages **减少 512 倍的页面数量**，降低管理开销 |
| **减少 TLB Miss**  | TLB **覆盖范围更大**，减少 Page Walk                  |
| 降低内存操作开销   | 减少 **页表更新和访问**，提高 CPU 性能                |
| 减少页表占用       | **减少 Linux 内核的页表内存消耗**，释放更多内存       |
| 防止 Swap 交换     | **HugePages 固定在物理内存**，不会被 swap out         |
| 降低 `kswapd` 负载 | 避免 `kswapd` 频繁运行，减少 CPU 负担                 |

#### 3、HugePages启用

**检查系统是否支持大页**

```
grep -i huge /proc/meminfo
```

输出可能包含以下内容：

```
HugePages_Total:     0
HugePages_Free:      0
HugePages_Rsvd:      0
HugePages_Surp:      0
Hugepagesize:       2048 kB
```

`Hugepagesize` 表示每个大页的大小，通常为 2MB 或 1GB。如果 HugePages_Total 为 0，意味着 Linux 没有设置或没有启用 Huge pages。

| 字段              | 解释                      | 你的值       | 说明                       |
| ----------------- | ------------------------- | ------------ | -------------------------- |
| `AnonHugePages`   | 透明大页（THP）           | `1413120 kB` | 1.4GB 内存正在使用 THP     |
| `HugePages_Total` | 手动分配的 HugePages 总数 | `0`          | 没有启用手动 HugePages     |
| `HugePages_Free`  | 可用 HugePages            | `0`          | 没有空闲的 HugePages       |
| `HugePages_Rsvd`  | 预留但未使用的 HugePages  | `0`          | 目前没有应用使用 HugePages |
| `HugePages_Surp`  | 额外分配的 HugePages      | `0`          | 没有超额分配               |
| `Hugepagesize`    | 每个大页的大小            | `2048 kB`    | 每个 HugePage 为 2MB       |

**查看是否挂载了 hugetlbfs**

```
[root@localhost conf]# mount |grep hugetlbfs
hugetlbfs on /dev/hugepages type hugetlbfs (rw,relatime)
```

**配置大页**

```
==========================配置大页=========================
1）配置内核参数
grubby --update-kernel=ALL --args="default_hugepagesz=1G hugepagesz=1G hugepages=2"


2）删除配置参数
grubby --update-kernel=ALL --remove-args="hugepages hugepagesz default_hugepagesz"

3）# 查看配置参数
grubby --info=ALL
能看到配置的default_hugepagesz=1G hugepagesz=1G hugepages=2 才会生效


4）重启后，cat /proc/meminfo | grep Huge验证

        [root@localhost YusurRiskcop]# cat /proc/meminfo |grep Huge
        AnonHugePages:    135168 kB
        HugePages_Total:       2                                  # 配置 大页 2个，每个1G
        HugePages_Free:        1
        HugePages_Rsvd:        0
        HugePages_Surp:        0
        Hugepagesize:    1048576 kB
        [root@localhost YusurRiskcop]#
```

#### 4、关闭 Transparent HugePages

检查当前的transparent_hugepage状态(以下为开启状态)

```
[root@localhost ~]# cat /sys/kernel/mm/transparent_hugepage/enabled

[always] madvise never

[root@localhost ~]# cat /sys/kernel/mm/transparent_hugepage/defrag

[always] madvise never
```

关闭方法有两种，一种为临时关闭，一种为永久关闭：

1)临时关闭

```
[root@localhost ~]# echo never > /sys/kernel/mm/transparent_hugepage/enabled

[root@localhost ~]# echo never > /sys/kernel/mm/transparent_hugepage/defrag
```

2)永久关闭

```
[root@localhost ~]# vim /etc/rc.d/rc.local

if test -f /sys/kernel/mm/transparent_hugepage/enabled; then

echo never > /sys/kernel/mm/transparent_hugepage/enabled

fi

if test -f /sys/kernel/mm/transparent_hugepage/defrag; then

echo never > /sys/kernel/mm/transparent_hugepage/defrag

fi

授予执行权限

[root@localhost ~]# chmod +x /etc/rc.d/rc.local
```

