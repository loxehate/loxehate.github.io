---
title: Pulsar详解
tags: [Pulsar]
categories: [中间件]
date: 2025-05-29
---
### 一、Pulsar简介

#### 1、诞生背景

```
Apache Pulsar 是一个企业级的分布式消息系统，最初由 Yahoo 开发，在 2016 年开源，并于2018年9月毕业成为 Apache 基金会的顶级项目。Pulsar 已经在 Yahoo 的生产环境使用了三年多，主要服务于Mail、Finance、Sports、 Flickr、 the Gemini Ads platform、 Sherpa (Yahoo 的 KV 存储)。

Pulsar是一种用于服务器到服务器消息传递的多租户，高性能解决方案。Pulsar最初由雅虎公司开发，由Apache Software Foundation负责管理。
```

#### 2、Pulsar特点

```
对Pulsar实例中的多个群集的本机支持，跨群集的消息的无缝地理复制。

极低的发布和端到端延迟。

无缝扩展到超过一百万个主题。

一个简单的客户端API，包含Java，Go，Python和C ++的绑定。

主题的多种订阅模式（独占，共享和故障转移）。

Apache BookKeeper提供的持久消息存储保证消息传递。

无服务器轻量级计算框架Pulsar Functions提供流本地数据处理功能。

基于Pulsar函数构建的无服务器连接器框架Pulsar IO可以更轻松地将数据移入和移出Apache Pulsar。

当数据老化时，分层存储将数据从热/暖存储卸载到冷/长期存储（例如S3和GCS）。
```

#### 3、消息传递

Pulsar基于publish-subscribe(pub-sub)生产订阅模式，生产者将消息发布到Topic，消费者可以订阅这些主题来处理消息，并在处理完成后发送确认消息

| 关键词       | 词解                                                         |
| ------------ | ------------------------------------------------------------ |
| value        | Pulsar中的数据存储为byte                                     |
| key          | 消息可以被Key打标签。这对诸如topic压缩之类的事情有作用       |
| properties   | 一个可以选择的map，用于用户配置参数                          |
| Sequence ID  | 每条消息都放在对应Topic的有序序列中，这个字段记录的是消息所在的序列顺序 |
| publish time | 消息的发布时间，消息发布的时间戳(producer自动附上)           |
| event time   | 应用程序可以附加到消息上的时间戳，用户业务需求的时间标注，可选的时间戳，应用可以附在消息上，代表某个事件发生的时间，例如，消息被处理时间。如果没有明确的设置，那么事件时间为0。 |

#### 4、消息生产者

**发送模式**

生产者将消息发布到Topic上，发送消息分可为同步发送和异步发送两种模式：

| Mode     | 说明：                                                       |
| -------- | ------------------------------------------------------------ |
| 同步发送 | 生产者每次发送完消息后需要等到broker的ack确认，如果没有接收到确认信息生产者就认为发送消息失败 |
| 异步发送 | 生产者将消息放入到阻塞队列中就直接返回。Pulsar的客户端通过后台线程将消息发送给broker，如果队列满了，生产者再放入消息时会被告知推送失败 |

**消息压缩**

```
生产者发布消息在传输过程中会对数据进行压缩，目前Pulsar支持的压缩方式有LZ4，ZLIB, ZSTD, SNAPPY。如果启用了批处理，生产者将在单个请求中累积一批消息进行发送，批处理大小可以由最大消息数和最大发布延迟定义
```

**批处理发送（Batching）**

```
如果批处理开启，producer将会累积一批消息，然后通过一次请求发送出去。批处理的大小取决于最大的消息数量及最大的发布延迟。
```

#### 5、消息消费者

**消费模式**

消费者从Topic上接收消息进行数据处理，同样，消息接收也分为同步接收和异步接收两种模式：

| Mode     | 说明：                                                       |
| -------- | ------------------------------------------------------------ |
| 同步接收 | 同步接收一直处于阻塞状态，直到有消息传入                     |
| 异步接收 | 异步接收立即返回一个未来future值，一旦有新消息，它就直接完成，例如java中的 [`CompletableFuture`](http://www.baeldung.com/java-completablefuture) |

**消费确认（ack）**

消费者成功接收到消息时：

```
当消费者成功处理完一条消息后，会发送一个确认请求给broker，告诉broker可以删除这条消息了,否则broker会一直存储这条消息。消息可以逐个确认也可以累积确认，消费者只需要确认收到的最后一条消息，这个流中所涉及到的所有消息都不会再重新传递给这个消费者。
```

消费者不成功消费时

```
当消费者处理消息失败时，会给broker发送一个失败确认，这个时候broker就会给消费者重新发送这条消息，失败确认可以逐条发送，也可以累积发送，这取决于消费订阅模式。在exclusive和failover订阅模式中，消费者只会对收到的最后一条消息进行失败确认。在Pulsar客户端可以通过设置timeout的方式触发broker自动重新传递消息，如果在timeout范围内消费者都没有发送确认请求，那么broker就会自动重新发送这条消息给消费者。
```

确认超时

```
如果某条消息一直处理失败就会触发broker一直重发这条消息给消费者，使消费者无法处理其他消息，Dead letter topic机制可以让消费者在无法成功消费某些消息时接收新的消息进行消费，在这种机制下，无法消费的消息存储在一个单独的topic中（Dead letter topic），用户可以决定如何处理这个topic中的消息。
```

#### 6、消息的持久化

消息的持久化是通过BookKeeper实现的，一旦创建了订阅关系，Pulsar将保留所有的消息（即使消费者断开了链接），只有当消费者确认已经成功处理保留的消息时，才会将这些消息丢弃消息。

消息的保留分为两种：

```
1.在保留策略内的消息即使消费者已发送了确认也可以持久地存储在Pulsar中，保留策略未涵盖的已确认消息将被删除，如果没有保留策略所有已确认的消息都将被删除；
2.设置消息到期时间，会根据应用于namespace的TTL过期时间，如果到期了，即使消息没有被确认也会被删除
```

当有某条消息被重复发送时，可以选择两种持久化策略：

```
1.是将重复的消息也持久化到BookKeeper中
2.是判断如果是重复消息，则不再进行持久化操作
```

#### 7、租户（tenant）

Pulsar 从一开始就支持多租户，topic 的名称是层级化的，最上层是租户（tenant）

#### 8、命名空间（namespace）

命名空间是租户内部逻辑上的命名术语。一个租户可以通过admin API创建多个命名空间。例如，一个对接多个应用的租户，可以为每个应用创建不同的namespace。

![](图片/plusar-namespace.png)

#### 9、Topic

与其他pub-sub系统一样，Pulsar中的topic被命名为从生产者向消费者传输消息的通道：

```
{persistent|non-persistent}://tenant/namespace/topic
```

| 关键词                     | 词解                                                         |
| -------------------------- | ------------------------------------------------------------ |
| persistent\|non-persistent | 标识topic类型： 持久：所有消息都持久保存在磁盘上(BookKeeper节点） 非持久：数据只存在内存中，当broker重启后会造成消息丢失 |
| tenant                     | 租户；实例中的topic的租户。租户是pulsar对多租户支持的重要组成，可以分散在集群中 |
| namespace                  | 用作topic的分组机制，大多数topic配置是在命名空间级别执行的，每个tenant租户可以有多个namespace |
| topic                      | 可以用户自定义，topic的名字是自由格式的，在Pulsar实例中没有特殊含义 |

producer写入不存在的主题时 了会在提供的命名空间下自动创建该主题

```
用户不需要在Pulsar中明确地创建主题，如果客户端尝试往不存在的主题中写入/接收信息，Pulsar将在topic提供的namespace下自动创建该主题
消费者可以订阅多个topic：
通过名称配置：persistent://public/default/finance-.*
```

配置topic订阅列表

```
常规topic只能由单个broker提供，这限制了topic的最大吞吐量，分区topic是由多个broker处理的一种特殊类型的topic，它允许更高的吞吐量。分区topic和普通topic在订阅模式的工作方式上没有区别，在创建主题时可以指定分区数。
```

#### 10、Cursor

cursor 是用来存储一个 subscription 中消费的状态信息（类似 Kafka 中的 offset，偏移量）。Pulsar 将 subscription 的 cursor 存储至 BookKeeper 的 ledger 中。

![](图片/pulsar-cursor.png)

#### 11、消息路由模式

发布到分布分区topic主题时，必须指定路由模式。默认三个路由模式，默认轮询-和Kafka类似。

| 模式                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| RoundRobinPartition | 如果未提供key，则以轮询方式往各分区上面发布消息，以实现最大吞吐量 --默认模式 |
| SinglePartition     | 如果未提供key，则生产者随机选择一个分区并将所有消息发布到此分区。如果指定了key，将对key进行散列（默认javaStringHash=多客户端推荐Murmur3_32Hash）并将消息分配给特定的分区 |
| CustomPartition     | 使用将调用的自定义消息路由器实现来特定消息的分区。用户在在java clent端实现MessageRouter接口来实现自定义路由模式。 |

#### 12、消息订阅模式（subscription）

Pulsar具有exclusive，shared，failover三种订阅模式

**独占（exclusive）**

exclusive模式：一个topic只允许一个消费者订阅，否者会报错

在 exclusive 模式下，一个 subscription 只允许被一个 consumer 用于订阅 topic ，如果多个 consumer 使用相同的 subscription 去订阅同一个 topic，则会发生错误。exclusive 是默认的订阅模式。如下图所示，Consumer A-0 和 Consumer A-1 都使用了相同的 subscription（相同的消费组），只有 Consumer A-0 被允许消费消息。
![](图片/pulsar-exclusive.png)

**故障转移|灾备（failover）**

failover模式：多个消费者订阅同一个topic，按照消费者名称进行排序，第一个消费者时唯一接收到消息的消费者（主消费者），当主消费者断开连接时，所有的后续消息都将发给下一个消费者

在 failover 模式下，多个 consumer 允许使用同一个 subscription 去订阅 topic。但是对于给定的 topic，broker 将选择⼀个 consumer 作为该 topic 的主 consumer ，其他 consumer 将被指定为故障转移 consumer 。当主 consumer 失去连接时，topic 将被重新分配给其中⼀个故障转移 consumer ，⽽新分配的 consumer 将成为新的主 consumer 。发⽣这种情况时，所有未确认的消息都将传递给新的主 consumer ，这个过程类似于 Kafka 中的 consumer 组重平衡（rebalance）。
如下图所示，Consumer B-0 是 topic 的主 consumer ，当 Consumer B-0 失去连接时，Consumer B-1 才能成为新的主 consumer 去消费 topic。
![](图片/pulsar-failover.png)

**共享（shared）**

shared模式：多个消费者订阅同一个topic，消息在消费者之间以循环的方式发送，并且给定的某条消息只能发送给一个消费者，当消费者断开连接时，所有发送给它但没有确认的消息将重新安排发送给其他消费者

在 shared 模式下，多个 consumer 可以使用同一个 subscription 去订阅 topic。消息以轮询的方式分发给 consumer ，并且每条消费仅发送给一个 consumer 。当有 consumer 失去连接时，所有发送给该 consumer 但未被确认的消息将被重新安排，以便发送给该 subscription 上剩余的 consumer 。
但是消息不能保证有序以及不支持批量ack

如下图所示，Consumer C-1，Consumer C-2，Consumer C-3 以轮询的方式接受消息。

![](图片/pulsar-shared.png)

**共享键（key_shared）**

key_shared模式：多个消费者订阅同一个topic，消息以分布方式在消费者之间传递（<key, value>），具有相同key的消息传递给同一个消费者，当这个消费者断开连接时，将导致key对应的消费者更改

在 shared 模式下，多个 consumer 可以使用同一个 subscription 去订阅 topic。消息按照 key 分发给 consumer ，含有相同 key 的消息只被发送给同一个 consumer 。

如下图所示，不同的 consumer 只接受到对应 key 的消息。

![](图片/pulsar-key_shared.png)

### 二、Pulsar原理架构

#### 1、体系结构

 在最高级别中，一个Pulsar实例有一个或多个Pulsar集群组成，实例中的集群可以彼此复制数据。在Pulsar集群中，一个或多个broker处理和加载来自生产者传入的消息，将消息发送给消费者，与Pulsar配置存储通信以处理各种协调任务，Pulsar集群架构如下所示，包括一个或多个broker，用于集群级配置和协调的Zookeeper，用于持久存储消息的BookKeeper，集群可以使用地理复制在集群间进行复制
![](图片/pulsar-体系结构.png)

#### 2、Pulsar组件

**Broker**

Pulsar 的 broker 是一个无状态组件，本身不存储数据。主要负责处理 producer 和 consumer 的请求，消息的复制与分发，数据的计算。可以理解成Broker 是 Pulsar 的自身实例

主要有2部分组成：

```
HTTP服务器，向生产者和消费者公开，用于管理任务和topic查找端的REST API；

调度程序，异步TCP服务器，通过用于所有数据传输的自定义二进制协议；
```

每个集群都有自己的本地Zookeeper用于存储集群特定的配置和协调，如所有权元数据、代理加载报告、簿记员分类帐元数据等等。
Pulsar使用BookKeeper进行持久消息存储，BookKeeper是一个分布式预写日志（WAL）系统，它的优势为：

```
• 使Pulsar利用多个独立日志，成为ledgers，随着时间推移，可以为topic创建多个ledger
• 为处复制的顺序数据提供了非常有效的存储
• 保证在出现各种系统故障时ledger的读取一致性
• 提供多个Bookies的I/O分布
• 在容量和吞吐量方面都是水平扩展的，可以通过向集群中添加更多的bookies来增加容量
• Bookies用于处理数千个同事读写的ledger，通过使用多个磁盘设备（一个用于日志，一个用于存储），Bookies能够将读写操作的延迟隔离开
• 除了消息数据外，消费者的订阅位置cursor也可以持久地存储在BookKeeper中
```

每个 topic 的 partition 都会分配到某一个 borker 上，producer 和 consumer 则会连接到这个 broker，从而向该 topic 的 partition 发送和消费消息。broker 主要负责消息的复制与分发，数据的计算。

![](图片/pulsar-broker.png)

**zookeeper**

主要用于存储元数据、集群配置，任务的协调（例如哪个 broker 负责哪个 topic），服务的发现（例如 broker 发现 bookie 的地址）

**bookkeeper**

主要用于数据的持久化存储。除了消息数据，cursors（游标） 也会被持久化到 Bookeeper，cursors 是消费端订阅消费的位移。Bookeeper 中每一个存储节点叫做 bookie。

BookKeeper 是一种优化实时工作负载的存储服务，具有可扩展、高容错、低延迟的特点。企业级的实时存储平台应符合以下几项要求：

```
以极低的延迟（小于 5 毫秒）读写 entry 流
能够持久、一致、容错地存储数据
在写数据时，能够进行流式传输或追尾传输
有效地存储、访问历史数据与实时数据
```

![](图片/pulsar-bookkeeper.png)

#### 3、数据存储

**数据分区**

写入主题的数据可能只有几个MB，也有可能是几个TB。所以，在某些情况下主题的吞吐量很低，有时候又很高，完全取决于消费者的数量。那么碰到有些主题吞吐量很高而有些又很低的情况该怎么处理？为了解决这个问题，Pulsar将一个主题的数据分布到多台机器上，也就是所谓的分区。

在处理海量数据时，为了保证高吞吐量，分区是一种很常见的手段。默认情况下，Pulsar的主题是不进行分区的，但通过命令行工具或API可以很容易地创建分区主题，并指定分区的数量。

在创建好分区主题之后，Pulsar可以自动对数据进行分区，不会影响到生产者和消费者。也就是说，一个应用程序向一个主题写入数据，对主题分区之后，不需要修改应用程序的代码。分区只是一个运维操作，应用程序不需要关心分区是如何进行的。

主题的分区操作由一个叫作broker的进程来处理，Pulsar集群里的每个节点都会运行自己的broker。
![](图片/pulsar-数据分区.png)

**数据持久性**

Pulsar broker在收到消息并进行确认之后，就必须确保消息在任何情况下都不会丢失。与其他消息系统不同的是，Pulsar使用Apache BookKeeper来保证持久性。BookKeeper提供了低延迟的持久化存储。Pulsar在收到消息之后，将消息发送给多个BookKeeper节点（具体由复制系数来定），节点将数据写入预写式日志（write ahead log），同时在内存里也保存一份。节点在对消息进行确认之前，强制将日志写入到持久化的存储上，因此即使出现电力故障，数据也不会丢失。因为Pulsar broker将数据发给了多个节点，所以只会在大多数节点（quorum）确认写入成功之后它才会将确认消息发给生产者。Pulsar就是通过这种方式来保证即使在出现了硬件故障、网络故障或其他故障的情况下仍然能够保证数据不丢失。在后续的文章中，我们将深入探讨这方面的细节。

### 三、Pulsar vs Kafka

#### 1、数据存储

```
Kafka 的服务层和存储层位于同一节点上，broker 负责数据的计算与存储。

Pulsar 的架构将服务层与存储层解耦：无状态 broker 节点负责数据服务；bookie 节点负责数据存储。

另外 Pulsar 还支持分层存储，如主存储（基于 SSD）、历史存储（S3）等。可以将访问频率较低的数据卸载到低成本的持久化存储（如 AWS S3、Azure 云）中。
```

#### 2、存储单元

```
Kafka 和 Pulsar 都有类似的消息概念，客户端通过主题与消息系统进行交互，每个主题都可以分为多个分区。Pulsar 和 Kafka 之间的根本区别在于 Kafka 是以分区（partition）作为数据的存储单元，而 Pulsar 是以分片（segment）作为为数据的存储单元。

在 Kafka 中，分区只能存储在单个节点上并复制到其他节点，其容量受最小节点容量的限制。当对集群进行扩容时或者发送副本故障时，会触发数据的拷贝，这将耗费很长的时间。

在 Pulsar 中，同样是以分区作为为逻辑单元，但是是以 segment 为物理存储单元。分区随着时间的推移会进行分段，并在整个集群中均衡分布，能够有效迅速地扩展。
```

![](图片/存储单元.png)

#### 3、名词对应表

根据个人对 Pulsar 和 Kafka 的理解，整理如下 Pulsar 和 Kafka 的名词对应表：

| Pulsar                 | Kafka                 |
| ---------------------- | --------------------- |
| Topic                  | Topic                 |
| Partition              | Partition             |
| Segment（Ledger）      | Segment               |
| Bookie                 | Broker                |
| Broker                 | Client SDK            |
| Ensemble Size          | metadata.broker.list  |
| Write Quorum Size (Qw) | Replica Number        |
| Ack Quorum Size (Qa)   | request.required.acks |

```
Pulsar 和 Kafka 都是以 topic 描述一个基本的数据集合，topic 数据又逻辑分为若干个 partition。

但 Kafka 以 partition 作为物理存储单位，每个 partition 必须作为一个整体（一个目录）存储在某一个 broker 上，虽然 Kafka 也会将一个 partition 分成多个 segment，但是这些 segment 是存在 Kafka broker 的同一个目录下。而 Pulsar 的每个 partition 是以 segment（对应到 Bookkeeper 的 ledger） 作为物理存储的单位，所以 Pulsar 中的一个逻辑上有序的 partition 数据集合在物理上会均匀分散到多个 bookie 节点中。

Pulsar 的数据存储节点 Bookkeeper 被称为 bookie，相当于一个 Kafka broker。

ensemble size 表示 topic 要用到的物理存储节点 bookie 个数，其副本数目 Qw 不能超过 bookie 个数，因为一个 bookie 上不能存储超过一个以上的数据副本。

Qa 是每次写请求发送完毕后需要回复确认的 bookie 的个数。
```

### 四、Pulsar单集群安装部署

#### 1、安装准备

官方的安装文档：https://pulsar.apache.org/docs/2.11.x/deploy-bare-metal/（详细阅读）

#### 2、服务器准备

**建议方案**

服务器配置

```
pular在bkenv.sh和pulsar_env.sh中指定了jvm的内存参数
PULSAR_MEM=${PULSAR_MEM:-"-Xms2g -Xmx2g -XX:MaxDirectMemorySize=4g"}
BOOKIE_MEM=${BOOKIE_MEM:-${PULSAR_MEM:-"-Xms2g -Xmx2g -XX:MaxDirectMemorySize=2g"}}
建议安装bookie和broker的节点，服务器建议配置至少为Bookie:4v8GB Broker:8v8GB。
```

服务器数量

```
建议准备7台服务器：3台运行zk，3台运行bookie和broker，1台dns服务。
pulsar相对与kafka架构上的优势是存算分离，如果服务器足够，且对存算分离有需求，建议将bookie和broker分开部署。
```

**实验环境**

因为内存有限，我只在笔记本上安装了4个**2v4GB**的虚拟机，并适当调低了jvm内存参数，否则可能导致服务无法启动

| 节点名称 | 节点IP         | 操作系统 | 资源配置 | 安装组件           |
| -------- | -------------- | -------- | -------- | ------------------ |
| v1       | 172.16.206.251 | CentOS7  | 2v 4GB   | zk、bookie、broker |
| v2       | 172.16.206.252 | CentOS7  | 2v 4GB   | zk、bookie、broker |
| v3       | 172.16.206.253 | CentOS7  | 2v 4GB   | zk、bookie、broker |
| v4       | 172.16.206.234 | CentOS7  | 2v 4GB   | pulsar-manager     |

#### 3、组件下载

zookpeer

```
本文是在学习环境下安装pulsar，因此直接使用pulsar自带的zk。
如果是在生产环境中安装pulsar，单独部署ZK集群时，需要注意ZK的版本，尽量与pulsar使用的zk版本保持一致，避免版本兼容问题导致的未知错误。
```

jdk

下载地址：https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz
pulsar3.0使用了jdk17进行编译，运行环境**必须使用jdk17**，否则会发生jdk版本不一致的错误：

```
java.lang.UnsupportedClassVersionError: 
org/apache/pulsar/PulsarStandaloneStarter has been compiled by a more recent version of the Java Runtime (class file version 61.0), 
this version of the Java Runtime only recognizes class file versions up to 55.0
```

部署pulsar-mananger时，只能使用[jdk11](https://so.csdn.net/so/search?q=jdk11&spm=1001.2101.3001.7020)，因此我单独部署到一台服务器，造成了些许麻烦。
如果想pulsar-manager和pulsar部署到同一台服务器，那么需要修改bkenv.sh和pulsar_env.sh，设置里面的JAVA_HOME。
题外话

```
pular在启动脚本中指定GC使用了ZGC。
bkenv.sh:
BOOKIE_GC=${BOOKIE_GC:-${PULSAR_GC:-"-XX:+UseZGC -XX:+PerfDisableSharedMem -XX:+AlwaysPreTouch"}}
pulsar_env.sh
PULSAR_GC=${PULSAR_GC:-"-XX:+UseZGC -XX:+PerfDisableSharedMem -XX:+AlwaysPreTouch"}
因此，如果使用jdk11，需要增加-XX:+UnlockExperimentalVMOptions参数，开启ZGC实验室特征。
```

zookpeer

下载地址:https://archive.apache.org/dist/zookeeper/apache-zookeeper-3.7.1-bin.tar.gz

pulsar
下载地址：https://dist.apache.org/repos/dist/release/pulsar/pulsar-3.0.1/apache-pulsar-3.0.1-bin.tar.gz
pulsar-manager
下载地址：https://dist.apache.org/repos/dist/release/pulsar/pulsar-manager/pulsar-manager-0.4.0/apache-pulsar-manager-0.4.0-bin.tar.gz

#### 4、单机启动

单机启动无需修改任何配置

```
# 前端单机启动
bin/pulsar standalone
# 后台单机启动
bin/pulsar-daemon start standalone
```

#### 5、集群部署

安装jdk

```
# 解压jdk
tar -zxvf jdk-17_linux-x64_bin.tar.gz -C /usr/local/
# 增加JAVA_HOME配置
vi /etc/profile
# 在profile文件末尾增加
export JAVA_HOME=/usr/local/jdk-17.0.6
export CLASSPATH=$:CLASSPATH:$JAVA_HOME/lib/
export PATH=$PATH:$JAVA_HOME/bin
# 使profile文件生效
source /etc/profile
```

关闭防火墙

在所有节点上，关闭防火墙。

```
# 停止防火墙
systemctl stop firewalld
# 关闭防火墙
systemctl disable firewalld
```

##### **部署Zookeeper**

```
# 解压pulsar组件
tar -zxvf apache-zookeeper-3.7.1-bin.tar.gz
# 进入zookeeper下的/bin目录
chmod +x *
#修改配置文件
cd conf/
mv zoo_sample.cfg zoo.cfg
#设置运行产生的文件夹
mkdir /home/zkdata
#配置myid
#必须向/home/zkdata 路径下创建myid文件，同时写入内容1 ，命令如下
echo 1 > /home/zkdata/myid
#配置zoo
vi zoo.cfg
#dataDir=/tmp/zookeeper 注释原来的默认配置
dataDir =/home/zkdata
# 最末尾添加集群配置
# 格式 server.myid=host:2888:3888
server.1=zk01:2888:3888
server.2=zk02:2888:3888
server.3=zk03:2888:3888
# admin.serverPort 默认占8080端口(会与pulsar冲突)
admin.serverPort=6088
```

启动服务

```
 cd /usr/local/zookeeper/zookeeper-3.4.13/bin
# 启动
./zkServer.sh start
# 查看状态
./zkServer.sh status
# 停止
./zkServer.sh stop
# 重启
./zkServer.sh restart
```

##### **部署pulsar**

上传pulsar组件到v1、v2、v3节点

```
# 解压pulsar组件
tar -zxvf apache-pulsar-3.0.1-bin.tar.gz
# 进入pulsar下的/bin目录
chmod +x *
```

在所有节点的zk都启动后，在其中一个节点上初始化集群元数据

```
bin/pulsar initialize-cluster-metadata \
--cluster pulsar-cluster \
--metadata-store 192.168.10.123:2181,192.168.10.124:2181,192.168.10.109:2181 \
--configuration-metadata-store 192.168.10.123:2181,192.168.10.124:2181,192.168.10.109:2181 \
--web-service-url http://192.168.10.123:8080,http://192.168.10.124:8080,http://192.168.10.109:8080/ \
--web-service-url-tls https://192.168.10.123:8443,https://192.168.10.124:8443,https://192.168.10.109:8443/ \
--broker-service-url pulsar://192.168.10.123:6650,pulsar://192.168.10.124:6650,pulsar://192.168.10.109:6650/ \
--broker-service-url-tls pulsar+ssl://192.168.10.123:6651,192.168.10.124:6651,192.168.10.109:6651/
```

集群元数据参数说明

| 参数                   | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| cluster                | pulsar集群名称                                               |
| zookeeper              | zk集群连接参数，仅需要包含zk集群中的一个节点即可             |
| configuration-store    | pulsar多集群部署时，实例配置可以存储到另外部署的zk集群，单集群部署时和-zookeeper参数设置一样 |
| web-service-url        | 集群Web服务的URL+端口，URL是一个标准的DNS名称，默认端口8080，不建议修改 |
| web-service-url-tls    | 集群Web提供TLS服务的URL+端口，端口默认8443，不建议修改       |
| broker-service-url     | 集群brokers服务URL，URL中DNS的名称和Web服务保持一致，URL使用pulsar替代http，端口默认6650，不建议修改 |
| broker-service-url-tls | 集群brokers提供TLS服务的URL，默认端口6551，不建议修改        |

##### **配置bookie**

创建bookie所需的目录

```
mkdir -pv /data/bookkeeper/journal
mkdir -pv /data/bookkeeper/ledgers
```

修改conf/bookkeeper.conf配置文件参数

```
# 分别在v1、v2、v3上设置对外发布地址，本机IP或者hostname
advertisedAddress=172.16.206.251
# zk服务器地址
zkServers=172.16.206.251:2181,172.16.206.252:2181,172.16.206.253:2181
# bookie目录地址，建议不要放在bookie的安装目录下，因为可以根据服务器磁盘数量（磁盘单独挂载）配置多个目录，提升读写效率
journalDirectory=/data/bookkeeper/journal
ledgerDirectories=/data/bookkeeper/ledgers
```

在v1、v2、v3节点上，以后台服务的方式，启动bookie服务

```
# 建议先前端启动bookie，能正常启动后，再后台启动，避免繁琐的去查看日志
bin/pulsar bookie
# 后台启动bookie服务
bin/pulsar-daemon start bookie
# ----------------------------------------------------------------------------------
# 验证bookie是否启动成功，出现Bookie sanity test succeeded则代表启动成功。
bin/bookkeeper shell bookiesanity
# 使用simpletest，测试bookie是否正常工作，3 bookie，100 entries
bin/bookkeeper shell simpletest --ensemble 3 --writeQuorum 3 --ackQuorum 3 --numEntries 100
# 关闭bookie服务
bin/pulsar-daemon stop bookie
```

##### **配置broker**

修改conf/broker.conf配置文件参数

```
# 集群名称，与zk初始化的cluster一致
clusterName=pulsar-cluster
# zk服务器地址，zookeeperServers参数不在使
metadataStoreUrl=172.16.206.251:2181,172.16.206.252:2181,172.16.206.253:2181
# 存放集群元数据的zk地址，在多集群部署时，可以单独指定zk集群存放元数据，configurationStoreServers参数不在使用
configurationMetadataStoreUrl=172.16.206.251:2181,172.16.206.252:2181,172.16.206.253:2181
# 分别在v1、v2、v3上设置对外发布地址，本机IP或者hostname
advertisedAddress=172.16.206.251
```

在v1、v2、v3节点上，以后台服务的方式，启动broker服务

```
# 建议先前端启动broker，能正常启动后，再后台启动，避免繁琐的去查看日志
bin/pulsar broker
# 后台启动broker服务
bin/pulsar-daemon start broker
# ----------------------------------------------------------------------------------
# 关闭broker服务
bin/pulsar-daemon stop broker
```

消息验证

```
bin/pulsar-client produce persistent://public/default/test --messages "hello-pulsar"
bin/pulsar-client consume persistent://public/default/test -s "consumer-test"
```

##### **部署pulsar-manager**

上传pulsar-manager组件到v4节点，解压pulsar-manager组件（JDK11）

```
tar -zxvf apache-pulsar-manager-0.4.0-bin.tar.gz
```

将dist包拷贝到pulsar-manager目录下并更名为ui
启动pulsar-manager，**注意：启动命令一定要在pulsar-manager的安装目录下执行，否则访问时，会发生ui目录找不到的问题**

```
wget https://dist.apache.org/repos/dist/release/pulsar/pulsar-manager/pulsar-manager-0.4.0/apache-pulsar-manager-0.4.0-bin.tar.gz
tar -zxvf apache-pulsar-manager-0.4.0-bin.tar.gz
cd pulsar-manager
tar -xvf pulsar-manager.tar
cd pulsar-manager
cp -r ../dist ui

# 前端启动pulsar-manager
bin/pulsar-manager
# 后台启动pulsar-manager
nohup bin/pulsar-manager > pulsar-manager.log 2>&1 &
# 增加管理员账号
CSRF_TOKEN=$(curl http://172.16.206.234:7750/pulsar-manager/csrf-token) 
curl \
  -H "X-XSRF-TOKEN:$CSRF_TOKEN" \
  -H "Cookie: XSRF-TOKEN=$CSRF_TOKEN;" \
  -H 'Content-Type: application/json' \
  -X PUT http://172.16.206.234:7750/pulsar-manager/users/superuser \
-d '{"name":"pulsar","password":"pulsar","description":"dev","email":"lgdeng@yeah.net"}' 
```

启动后，页面访问地址：http://192.168.10.122:7750/ui/index.html

```
新建Environment的配置说明
环境名称，不用和集群名称相同
Environment Name: pulsar-cluster
Broker的webServicePort地址，默认为8080，只填写一个节点
Service URL: http://172.16.206.251:8080
bookie的httpServerPort地址，默认为8000，只填写一个节点
Bookie URL: http://172.16.206.251:8000
```

##### **部署pulsar-proxy**

配置`conf/proxy.conf`。

```
brokerServiceURL=pulsar://brokers.example.com:6650
brokerWebServiceURL=http://brokers.example.com:8080
functionWorkerWebServiceURL=http://function-workers.example.com:8080
```

使用 TLS，请按以下方式配置代理 URL：

```
brokerServiceURLTLS=pulsar+ssl://brokers.example.com:6651
brokerWebServiceURLTLS=https://brokers.example.com:8443
functionWorkerWebServiceURL=https://function-workers.example.com:8443
```

提供的 URL 中的主机名应该是指向多个代理的 DNS 条目或由多个代理 IP 地址支持的虚拟 IP 地址，以便如果单个代理不可用，代理不会失去与 Pulsar 集群的连接。

连接到代理的端口（6650 和 8080，或者在 TLS 的情况下，6651 和 8443）应该在网络 ACL 中打开。

注意，如果您不使用功能，则无需配置`functionWorkerWebServiceURL`。

**使用服务**

Pulsar 使用[ZooKeeper](https://zookeeper.apache.org/)进行服务发现。要将代理连接到 ZooKeeper，请在 中指定以下内容`conf/proxy.conf`。

```
metadataStoreUrl=my-zk-0:2181,my-zk-1:2181,my-zk-2:2181
configurationMetadataStoreUrl=my-zk-0:2184,my-zk-remote:2184
```

```
要使用服务发现，您需要打开网络 ACL，以便代理可以通过 ZooKeeper 客户端端口（端口2181）和配置存储客户端端口（端口2184）连接到 ZooKeeper 节点。

但是，使用服务发现并不安全。因为如果网络 ACL 是开放的，当有人破坏代理时，他们就可以完全访问 ZooKeeper。
```

**启动代理**

```
cd /path/to/pulsar/directory
bin/pulsar proxy \
    --metadata-store zk:my-zk-1:2181,my-zk-2:2181,my-zk-3:2181 \
    --configuration-metadata-store zk:my-zk-1:2181,my-zk-2:2181,my-zk-3:2181
```

### 五、pulsar的常用命令

```
1 Pulsar的常用命令
1.1 client客户端
Pulsar 的 Local模式的基本使用：
（1）生产数据
bin/pulsar-client produce my-topic --messages “hello-pulsar”

说明：向my-topic这个topic生产数据，内容为“hello-pulsar”，如果topic不存在，pulsar会自动创建；

（2）消费数据
bin/pulsar-client consume my-topic -s “first-subscription”

说明：消费my-topic的数据，订阅名称为“first-subscription", 如果topic不存在，pulsar会自动创建；

Pulsar 的分布式集群模式的基本使用：
（1）生产数据
bin/pulsar-client produce persistent://public/default/test --messages “hello-pulsar”

说明：向my-topic这个topic生产数据，内容为“hello-pulsar”，如果topic不存在，pulsar会自动创建；

（2）消费数据
bin/pulsar-client consume persistent://public/default/test -s “first-subscription”

说明：消费my-topic的数据，订阅名称为“first-subscription", 如果topic不存在，pulsar会自动创建；

#查看最早未消费的消息
bin/pulsar-admin persistent peek-messages \
    --count 1 \
    --subscription public/default/test \
    persistent://public/default/test
    
1.2 Pulsar多租户的相关操作
（1）获取租户列表
./pulsar-admin tenants list

（2）创建租户
./pulsar-admin tenants create my-tenant

./pulsar-admin tenants create my-tenant -r role1,role2,role3
在创建租户时，可以使用-r或者–admin-roles标志分配管理角色。可以用逗号分隔的列表指定多个角色；

（3）获取配置信息
./pulsar-admin tenants get my-tenant

（4）更新配置信息
./pulsar-admin tenants update my-tenant -r ‘pro’

添加一个pro角色；
（5）删除租户
./pulsar-admin tenants delete my-tenant

1.3 Pulsar名称空间的相关操作
（1）在指定的租户下创建名称空间
./pulsar-admin namespaces create test-tenant/test-namespace

（2）获取所有的名称空间列表
./pulsar-admin namespaces list test-tenant

（3）删除名称空间
./pulsar-admin namespaces delete test-tenant/ns1

（4）获取名称空间相关的配置策略
./pulsar-admin namespaces policies test-tenant/test-namespace

（5）配置复制集群
1- 设置复制集群:
./pulsar-admin namespaces set-clusters test-tenant/ns1 --clusters cl2

2- 获取给定命名空间复制集群的列表
./pulsar-admin namespaces get-clusters test-tenant/ns1

（6）配置backlog quota策略
1- 设置backlog quota 策略
./pulsar-admin namespaces set-backlog-quota --limit 10G --limitTime 36000 --policy producer_request_hold test-tenant/ns1

–policy 的值选择:
producer_request_hold：broker 暂停运行，并不再持久化生产请求负载
producer_exception：broker 抛出异常，并与客户端断开连接。
consumer_backlog_eviction：broker 丢弃积压消息

2- 获取 backlog quota 策略
./pulsar-admin namespaces get-backlog-quotas test-tenant/ns1

3 - 移除backlog quota策略
./pulsar-admin namespaces remove-backlog-quota test-tenant/ns1

（7）配置持久化策略
1- 设置持久化策略
./pulsar-admin namespaces set-persistence --bookkeeper-ack-quorum 2 --bookkeeper-ensemble 3 --bookkeeper-write-quorum 2 --ml-mark-delete-max-rate 0 test-tenant/ns1

参数说明:
bookkeeper-ack-quorum：每个 entry 在等待的 acks（有保证的副本）数量，默认值：0；
bookkeeper-ensemble：单个 topic 使用的 bookie 数量，默认值：0；
bookkeeper-write-quorum：每个 entry 要写入的次数，默认值：0；
ml-mark-delete-max-rate：标记-删除操作的限制速率（0表示无限制），默认值：0.0；

2- 获取持久化策略
./pulsar-admin namespaces get-persistence test-tenant/ns1

（8）配置消息存活时间(TTL)
1- 设置消息存活时间
./pulsar-admin namespaces set-message-ttl -ttl 100 test-tenant/ns1

2- 获取消息的存活时间
./pulsar-admin namespaces get-message-ttl test-tenant/ns1

3- 删除消息的存活时间
./pulsar-admin namespaces remove-message-ttl test-tenant/ns1

（9）配置整个名称空间中Topic的消息发送速率
1- 设置Topic的消息发送的速率
./pulsar-admin namespaces set-dispatch-rate test-tenant/ns1
–msg-dispatch-rate 1000
–byte-dispatch-rate 1048576
–dispatch-rate-period 1

参数说明:
–msg-dispatch-rate : 每dispatch-rate-period秒钟发送的消息数量
–byte-dispatch-rate : 每dispatch-rate-period秒钟发送的总字节数
–dispatch-rate-period : 设置发送的速率, 比如1表示每秒钟

2 获取topic的消息发送速率
./pulsar-admin namespaces get-dispatch-rate test-tenant/ns1

（10）配置整个名称空间中Topic的消息接收速率
1- 设置Topic的消息接收的速率
./pulsar-admin namespaces set-subscription-dispatch-rate test-tenant/ns1
–msg-dispatch-rate 1000
–byte-dispatch-rate 1048576
–dispatch-rate-period

参数说明:
–msg-dispatch-rate : 每dispatch-rate-period秒钟接收的消息数量
–byte-dispatch-rate : 每dispatch-rate-period秒钟接收的总字节数
–dispatch-rate-period : 设置接收的速率, 比如1表示每秒钟

2 获取topic的消息接收速率
./pulsar-admin namespaces get-subscription-dispatch-rate test-tenant/ns1

（11）配置整个名称空间中Topic的复制集群的速率
1- 设置Topic的消息复制集群的速率
./pulsar-admin namespaces set-replicator-dispatch-rate test-tenant/ns1
–msg-dispatch-rate 1000
–byte-dispatch-rate 1048576
–dispatch-rate-period 1

参数说明:
–msg-dispatch-rate : 每dispatch-rate-period秒钟复制集群的消息数量
–byte-dispatch-rate : 每dispatch-rate-period秒钟复制集群的总字节数
–dispatch-rate-period : 设置复制集群的速率, 比如1表示每秒钟

2 获取topic的消息复制集群的速率
./pulsar-admin namespaces get-replicator-dispatch-rate test-tenant/ns1

1.4 Pulsar Topic(主题)的相关操作
（1）创建Topic
方式一: 创建一个没有分区的topic
bin/pulsar-admin topics create persistent://my-tenant/my-namespace/my-topic

方式二: 创建一个有分区的topic
bin/pulsar-admin topics create-partitioned-topic persistent://my-tenant/my-namespace/my-topic --partitions 4

注意: 不管是有分区还是没有分区, 创建topic后,如果没有任何操作, 60s后pulsar会认为此topic是不活动的, 会自动进行删除, 以避免生成垃圾数据；

相关配置:
brokerdeleteinactivetopicsenabenabled : 默认值为true 表示是否启动自动删除；
brokerDeleteInactiveTopicsFrequencySeconds: 默认为60s 表示检测未活动的时间；

（2）列出当前某个名称空间下的所有Topic
./pulsar-admin topics list my-tenant/my-namespace

（3）更新Topic操作
我们可针对有分区的topic去更新其分区的数量；
./pulsar-admin topics update-partitioned-topic persistent://my-tenant/my-namespace/my-topic --partitions 8

（4）删除Topic操作
1- 删除没有分区的topic:
bin/pulsar-admin topics delete persistent://my-tenant/my-namespace/my-topic

2-删除有分区的topic
bin/pulsar-admin topics delete-partitioned-topic persistent://my-tenant/my-namespace/my-topic

（5）授权
./pulsar-admin topics grant-permission --actions produce,consume --role application1 persistent://test-tenant/ns1/tp1

（6）获取授权
./pulsar-admin topics grant-permission --actions produce,consume --role application1 persistent://test-tenant/ns1/tp1

（7）取消授权
./pulsar-admin topics revoke-permission --role application1 persistent://test-tenant/ns1/tp1

（8）查看消息状态
./pulsar-admin topics stats persistent://my-tenant/my-namespace/my-topic

（9）清空topic堆积消息
#./pulsar-admin topics clear-backlog 【topic名称】 -s 【订阅名】
./pulsar-admin topics clear-backlog persistent://my-tenant/my-namespace/my-topic

（10）尝试卸载topic
./pulsar-admin topics unload 【topic名称】

1.5 Pulsar Function轻量级计算框架
（1）构建function
bin/pulsar-admin functions create
–jar examples/api-examples.jar
–classname org.apache.pulsar.functions.api.examples.ExclamationFunction
–inputs persistent://public/default/exclamation-input
–output persistent://public/default/exclamation-output
–tenant public
–namespace default
–name exclamation

bin/pulsar-admin functions属性说明:
functions:
可选值:
localrun: 创建本地function进行运行
create: 在集群模式下创建
delete: 删除在集群中运行的function
get: 获取function的相关信息
restart: 重启
stop : 停止运行
start: 启动
status: 检查状态
stats: 查看状态
list: 查看特定租户和名称空间下的所有的function
–classname: 设置function执行类；
–jar: 设置function对应的jar包；
–inputs : 输入的topic；
–output : 输出的topic；
–tenant : 设置function运行在那个租户中；
–namespace: 设置function运行在那个名称空间中；
–name : 定义function的名称；

（2）启动function
检查是否按照预期触发函数运行；
bin/pulsar-admin functions trigger --name exclamation --trigger-value “hello world”

1.6 Pulsar跨机房复制配置
假如有三个pulsar数据中心的方案(cluster1, cluster2, cluster3)；

第一步: 首先创建一个租户, 并给予三个数据中心的权限；
bin/pulsar-admin tenants create my-tenant
–allowed-clusters cluster1, cluster2, cluster3

第二步: 创建namespace；
bin/pulsar-admin namespaces create my-tenant/my-namespace

第三步: 设置namespace中topic在那些数据中心之间进行互备；
bin/pulsar-admin namespaces set-clusters my-tenant/my-namespace
–clusters cluster1, cluster2, cluster3
```

##### 查看集群信息

```
pulsar-admin clusters list
```

##### 查看租户信息

```
pulsar-admin tenants list
```

##### 查看命名空间信息

```
pulsar-admin namespaces list my-tenant
```

##### 查看主题信息

```
pulsar-admin topics list my-tenant/my-namespace
```

##### 查看消费者组信息

```
pulsar-admin persistent-stats my-tenant/my-namespace/my-topic
```

这个命令用于查看指定主题的[持久化](https://so.csdn.net/so/search?q=持久化&spm=1001.2101.3001.7020)订阅的统计信息，包括消费者组的消费情况。

##### 查看集群状态

```
pulsar-admin broker-stats
```

这个命令用于查看整个 Pulsar 集群的状态信息，包括各个 broker 的状态、[吞吐量](https://so.csdn.net/so/search?q=吞吐量&spm=1001.2101.3001.7020)等。

### 六、pulsar常见问题

#### 1、日志级别调整失败

调整log4j2.yaml中日志级别为debug级别，但服务启动日志级别依旧为info级别

```
文档：github:https://github.com/apache/pulsar/pull/22017

bin/pulsar命令启动服务，在bin/pulsar中loglevel级别设定优先级大于log4j2.yaml

调整bin/pulsar中PULSAR_LOG_LEVEL和PULSAR_LOG_ROOT_LEVEL环境变量为debug级别即可
```

#### 2、pulsar消息堆积问题

```
#查看消息状态
./pulsar-admin topics stats [topic名称]

#清空topic堆积消息
./pulsar-admin topics clear-backlog [topic名称] -s [订阅名]

#消息卡住不消费,卸载topic
./pulsar-admin topics unload [topic名称]
```



### 七、Pulsar 中使用 JWT 进行身份认证

Pulsar 使用标准的 `io.jsonwebtoken` 库支持使用 [JWT](https://so.csdn.net/so/search?q=JWT&spm=1001.2101.3001.7020) 做身份认证，同时也提供了 JWT 客户端，可以方便的制作密钥和生成 token。

#### 1、JWT 简介

JSON Web Token（RFC-7519）是在 Web 应用中常用的一种认证方案。形式上这个 token 只是一个 JSON 字符串，并做了 base64url 编码和签名。

一个 JWT 的 token 字符串包含三个部分，例如：xxxxx.yyyyy.zzzzz（通过点来分隔）：

    Header（下图中红色部分）：内容是一个 JSON 串，主要指定签名算法（Pulsar 中默认使用 HS256），使用 base64url 编码。
    
    Payload（下图中紫色部分）：内容也是一个 JSON 串，主要指定用户名（sub）和过期时间，也是用 base64url 编码。
    
    Signature（下图蓝色部分）：内容由使用特定算法，计算编码后的 Header 和 Payload 加一个 secret 值而来。签名保证了 token 不被中途篡改。

```
# 一个使用 HMAC SHA256 算法的签名示例
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

**token 内容的查看和验证**

![](图片/token 内容的查看和验证.png)

我们可以去 https://jwt.io/ 查看 Token 的组成内容，或者使用任意 base64 解密工具查看 header 和 [payload](https://so.csdn.net/so/search?q=payload&spm=1001.2101.3001.7020) 部分。

Pulsar 客户端也提供了验证功能：

bin/pulsar tokens show: 查看 token 的 header 和 payload：

```
bin/pulsar tokens show -i eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LXVzZXIiLCJleHAiOjE2NTY3NzYwOTh9.awbp6DreQwUyV8UCkYyOGXCFbfo4ZoV-dofXYTnFXO8


{"alg":"HS256"}
---
{"sub":"test-user","exp":1656776098}
```

bin/pulsar tokens validate：使用 secret key 或者 public key 验证 token：

```
bin/pulsar tokens validate -pk  /Users/futeng/workspace/github/futeng/pulsar-pseudo-cluster/pulsar-1/my-public.key -i "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.ijp-Qw4JDn1aOQbYy4g4YGBbXYIgLA9lCVrnP-heEtPCdDq11_c-9pQdQwc6RdphvlSfoj50qwL5OtmFPysDuF2caSYzSV1kWRWN-tFzrt-04_LRN-vlgb6D06aWubVFJQBC4DyS-INrYqbXETuxpO4PI9lB6lLXo6px-SD5YJzQmcYwi2hmQedEWszlGPDYi_hDG9SeDYmnMpXTtPU3BcjaDcg9fO6PlHdbnLwq2MfByeIj-VS6EVhKUdaG4kU2EJf5uq2591JJAL5HHiuTZRSFD6YbRXuYqQriw4RtnYWSvSeVMMbcL-JzcSJblNbMmIOdiez43MPYFPTB7TMr8g"

{sub=admin}
```

**Pulsar 中使用 JWT 的几个注意点**

基于 JWT 的特性，在 Pulsar 中使用需要注意的几个点：

```
使用 JWT 可以做认证和授权，但数据仍然处于暴露状态，在安全要求较高的环境，建议开启 TLS 对数据传输加密（会牺牲一小部分性能），以进一步巩固安全。

JWT 最重要的特性是不需要借助第三方服务（例如 Kerberos 之于 KDC），凭借 JWT 内容本身，就能验证 token 是否有效。这也带来一个问题，即 token 一旦签发，在有效期间将会一直有效，无法撤回。因此对于执行某些重要操作的 token，有效期要尽量设置的短。

Pulsar 支持 2 种 JWT 加密方式，即使用对称秘钥（secret key）和使用非对称密钥（private/public key），选择其中一个即可。

Token 的配置容易出错用户（例如需要操作 pulsar-admin 但仅给了test-user 的 token），建议配置后可使用 validate 命令做验证。

Pulsar Broker 会缓存客户端的认证信息，并会在一个固定时间（默认 60 秒）来检查每个连接的认证是否过期，这个刷新时间可以配置 broker.conf 中的 authenticationRefreshCheckSeconds 参数来自定义。
```

#### 2、配置 JWT

注意 Pulsar 提供了使用对称密钥（secret key）和使用非对称密钥（private/public key）两种方式，可根据安全强度要求选择其中一个即可。

提示：

1.Pulsar 中既可以对 broker 的访问做 JWT 认证，也可以对 bookie 的访问做 JWT 认证。两者配置方式类似，本文重点在于区分两种密钥配置的不同，因此将仅针对 broker 对配置做说明。

2.token 参数的配置，既可使用字符串形式，也可以使用文件形式，可择优选择。

```
# 字符串形式
brokerClientAuthenticationParameters={"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LXVzZXIifQ.9OHgE9ZUDeBTZs7nSMEFIuGNEX18FLR3qvy8mqxSxXw"}

# 从文件读取
brokerClientAuthenticationParameters={"file":"///path/to/proxy-token.txt"}
```

3.standalone 的配置内容相同。

##### 2.1 使用对称密钥（secret key）

Pulsar 基于 [JSON Web Tokens](https://jwt.io/introduction/) ([RFC-7519](https://tools.ietf.org/html/rfc7519)) 提供了一个标准的 JWT 客户端，可以生成密钥、制作 token 和检测密钥有效性等功能。

**Step 1. 生成 secret key**

```
bin/pulsar tokens create-secret-key --output my-secret.key
```

- `bin/pulsar tokens create-secret-key` ：生成一个对称密钥，保存到文件 `my-secret.key` 中。后续将使用这个密钥文件来创建 token。

**Step 2. 生成用于超级管理员的 token**

我们将超级管理员命名为 admin（对应 pulsar 认证概念里对 role）。这里不指定超时时间（ `--expiry-time`），则默认将不过期。

```
bin/pulsar tokens create --secret-key my-secret.key --subject admin
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.Ra9pwWHTWjB67v5GkVuuDMqXWwfeTJuwflyvmhxYk_c
```

**Step 3. 生成给测试用户的 token**

```
bin/pulsar tokens create --secret-key my-secret.key --subject test-user --expiry-time 7d
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LXVzZXIiLCJleHAiOjE2NTY3NzYwOTh9.awbp6DreQwUyV8UCkYyOGXCFbfo4ZoV-dofXYTnFXO8
```

**Step 4. 配置 broker(所有节点)**

```
#broker.conf
# 开启认证
authenticationEnabled=true

# 认证提供者
authenticationProviders=org.apache.pulsar.broker.authentication.AuthenticationProviderToken

# 开启授权
authorizationEnabled=true


authenticateOriginalAuthData=true

# 超级管理员
superUserRoles=admin

# broker Client 使用等认证插件
brokerClientAuthenticationPlugin=org.apache.pulsar.client.impl.auth.AuthenticationToken

# broker Client 通讯使用的 token（需要 admin role）
brokerClientAuthenticationParameters={"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.Ra9pwWHTWjB67v5GkVuuDMqXWwfeTJuwflyvmhxYk_c"}

# 使用 secretKey 的密钥文件位置（file://开头）
tokenSecretKey=file:///Users/futeng/workspace/github/futeng/pulsar-pseudo-cluster/pulsar-1/my-secret.key
```

**Step 5. 配置 client(所有节点)**

```
uthPlugin=org.apache.pulsar.client.impl.auth.AuthenticationToken
authParams={"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.Ra9pwWHTWjB67v5GkVuuDMqXWwfeTJuwflyvmhxYk_c"}
```

**Step 6. 命名空间添加认证权限(一个节点)**

```
bin/pulsar-admin namespaces grant-permission public/functions --role pulsar-user（用户名） --actions produce,consume
bin/pulsar-admin namespaces grant-permission xxx/test1 --role pulsar-user(用户名) --actions produce,consume
bin/pulsar-admin namespaces grant-permission xxx/test2 --role pulsar-user(用户名) --actions produce,consume
```

**Step 7. 重启 broker**

```
bin/pulsar-daemon stop broker
bin/pulsar-daemon start broker
```

**Step 8. 测试**

**Step 8.1. 验证 broker token**

```
bin/pulsar tokens validate -sk  /Users/futeng/workspace/github/futeng/pulsar-pseudo-cluster/pulsar-1/my-secret.key -i "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.Ra9pwWHTWjB67v5GkVuuDMqXWwfeTJuwflyvmhxYk_c"

# 打印：{sub=admin}
```

- 注意 broker 的 token 需要使用超级管理员。

**Step 8.2. 测试超级管理员用户访问**

```
# produce as admin role
bin/pulsar-client \
--url "pulsar://127.0.0.1:6650" \
--auth-plugin "org.apache.pulsar.client.impl.auth.AuthenticationToken" \
--auth-params {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.Ra9pwWHTWjB67v5GkVuuDMqXWwfeTJuwflyvmhxYk_c"} \
produce public/default/test -m "hello pulsar" -n 10
```

**Step 8.3. 测试普通用户访问**

```
# produce as test-user role
bin/pulsar-client \
--url "pulsar://127.0.0.1:6650" \
--auth-plugin "org.apache.pulsar.client.impl.auth.AuthenticationToken" \
--auth-params {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LXVzZXIiLCJleHAiOjE2NTY3NzYwOTh9.awbp6DreQwUyV8UCkYyOGXCFbfo4ZoV-dofXYTnFXO8"} \
produce public/default/test -m "hello pulsar" -n 10
```

- 尚未给普通用户赋权，因此命令执行需要报缺少权限的错误。

**Step 8.4. 测试给普通用户赋权**

```
bin/pulsar-admin \
--admin-url "http://127.0.0.1:8080/" \
--auth-params {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.Ra9pwWHTWjB67v5GkVuuDMqXWwfeTJuwflyvmhxYk_c"} \
--auth-plugin "org.apache.pulsar.client.impl.auth.AuthenticationToken" \
namespaces grant-permission public/default --role test-user --actions produce,consume
```

- 赋权后，可再次测试普通用户访问，需要可以正常发送数据。
- 注意 `bin/pulsar-admin` 命令默认使用的是管理流 8080 端口。
- 注意 `auth-params` 需要使用超级管理员 token 来执行赋权。

**Step 8.5. 测试给普通用户回收权限**

```
bin/pulsar-admin \
--admin-url "http://127.0.0.1:8080/" \
--auth-params {"token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.Ra9pwWHTWjB67v5GkVuuDMqXWwfeTJuwflyvmhxYk_c"} \
--auth-plugin "org.apache.pulsar.client.impl.auth.AuthenticationToken" \ 
namespaces revoke-permission public/default --role test-user
```

##### 2.2 使用非对称密钥（private/public key）

**Step 1. 生成秘钥对**

```
bin/pulsar tokens create-key-pair --output-private-key my-private.key --output-public-key my-public.key
```

**Step 2. 生成用于超级管理员的 token**

我们将超级管理员命名为 admin（对应 pulsar 认证概念里对 role）。这里不指定超时时间（ `--expiry-time`），则默认将不过期。

```
bin/pulsar tokens create --private-key my-private.key --subject admin

eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.ijp-Qw4JDn1aOQbYy4g4YGBbXYIgLA9lCVrnP-heEtPCdDq11_c-9pQdQwc6RdphvlSfoj50qwL5OtmFPysDuF2caSYzSV1kWRWN-tFzrt-04_LRN-vlgb6D06aWubVFJQBC4DyS-INrYqbXETuxpO4PI9lB6lLXo6px-SD5YJzQmcYwi2hmQedEWszlGPDYi_hDG9SeDYmnMpXTtPU3BcjaDcg9fO6PlHdbnLwq2MfByeIj-VS6EVhKUdaG4kU2EJf5uq2591JJAL5HHiuTZRSFD6YbRXuYqQriw4RtnYWSvSeVMMbcL-JzcSJblNbMmIOdiez43MPYFPTB7TMr8g
```

**Step 3. 生成给测试用户的 token**

```
bin/pulsar tokens create --private-key my-private.key --subject test-user --expiry-time 7d

eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0ZXN0LXVzZXIiLCJleHAiOjE2NTY4MDMzODh9.0dAXdyl1dVsLZbhnvJDKPXFmyNlqwDYMMwzOoJ1L2Rl9gfcgVB4DzEfBFesU1F07P5oiM_X5hmxdI5YDSDxU4VGb_Sy3MakOAlROq3a4qzT45eY15-N3IxyfaI66BellDsZWyXVwsWnPYmwMBOlqZXgZAEhPL8HqC3c1IMBeMo78lDNobP7k0SVWsy9jhhmVOcas2ZQ4B-vOC8f0pHAWD29Rf_AV34A5w6Wu5XbQoHpMp5n0KRv2K_oFed_Zmg79uvtLv3Ujd8DaXN9a2vjXRatFYY2iZN8OhB1SV4WjpXB5hyG5Sv9uAHC559W39g8-AznG8NA5J79d-tIftIr8Dg
```

**Step 4. 配置 broker**

```
# 开启认证
authenticationEnabled=true

# 认证提供者
authenticationProviders=org.apache.pulsar.broker.authentication.AuthenticationProviderToken

# 开启授权
authorizationEnabled=true

# 超级管理员
superUserRoles=admin

# broker Client 使用等认证插件
brokerClientAuthenticationPlugin=org.apache.pulsar.client.impl.auth.AuthenticationToken

# broker Client 通讯使用的 token（需要 admin role）
brokerClientAuthenticationParameters={"token":"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.ijp-Qw4JDn1aOQbYy4g4YGBbXYIgLA9lCVrnP-heEtPCdDq11_c-9pQdQwc6RdphvlSfoj50qwL5OtmFPysDuF2caSYzSV1kWRWN-tFzrt-04_LRN-vlgb6D06aWubVFJQBC4DyS-INrYqbXETuxpO4PI9lB6lLXo6px-SD5YJzQmcYwi2hmQedEWszlGPDYi_hDG9SeDYmnMpXTtPU3BcjaDcg9fO6PlHdbnLwq2MfByeIj-VS6EVhKUdaG4kU2EJf5uq2591JJAL5HHiuTZRSFD6YbRXuYqQriw4RtnYWSvSeVMMbcL-JzcSJblNbMmIOdiez43MPYFPTB7TMr8g"}

# 使用 tokenPublicKey 的公钥文件位置（file://开头）
tokenPublicKey=file:///Users/futeng/workspace/github/futeng/pulsar-pseudo-cluster/pulsar-1/my-public.key
```

**Step 5. 重启 broker**

```
bin/pulsar-daemon stop broker
bin/pulsar-daemon start broker
```

**Step 6. 测试**

**Step 6.1. 验证 broker token**

```
bin/pulsar tokens validate -pk  /Users/futeng/workspace/github/futeng/pulsar-pseudo-cluster/pulsar-1/my-public.key -i "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.ijp-Qw4JDn1aOQbYy4g4YGBbXYIgLA9lCVrnP-heEtPCdDq11_c-9pQdQwc6RdphvlSfoj50qwL5OtmFPysDuF2caSYzSV1kWRWN-tFzrt-04_LRN-vlgb6D06aWubVFJQBC4DyS-INrYqbXETuxpO4PI9lB6lLXo6px-SD5YJzQmcYwi2hmQedEWszlGPDYi_hDG9SeDYmnMpXTtPU3BcjaDcg9fO6PlHdbnLwq2MfByeIj-VS6EVhKUdaG4kU2EJf5uq2591JJAL5HHiuTZRSFD6YbRXuYqQriw4RtnYWSvSeVMMbcL-JzcSJblNbMmIOdiez43MPYFPTB7TMr8g"

# 打印：{sub=admin}
```

- 注意 broker 的 token 需要使用超级管理员。
- 注意是使用公钥来验证 token（public.key）。

**Step 6.2. 测试超级管理员用户访问**

```
# produce as admin role
bin/pulsar-client \
--url "pulsar://127.0.0.1:6650" \
--auth-plugin "org.apache.pulsar.client.impl.auth.AuthenticationToken" \
--auth-params {"token":"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.ijp-Qw4JDn1aOQbYy4g4YGBbXYIgLA9lCVrnP-heEtPCdDq11_c-9pQdQwc6RdphvlSfoj50qwL5OtmFPysDuF2caSYzSV1kWRWN-tFzrt-04_LRN-vlgb6D06aWubVFJQBC4DyS-INrYqbXETuxpO4PI9lB6lLXo6px-SD5YJzQmcYwi2hmQedEWszlGPDYi_hDG9SeDYmnMpXTtPU3BcjaDcg9fO6PlHdbnLwq2MfByeIj-VS6EVhKUdaG4kU2EJf5uq2591JJAL5HHiuTZRSFD6YbRXuYqQriw4RtnYWSvSeVMMbcL-JzcSJblNbMmIOdiez43MPYFPTB7TMr8g"} \
produce public/default/test -m "hello pulsar" -n 10
```

**Step 6.3. 测试普通用户访问**

```
# produce as test-user role
bin/pulsar-client \
--url "pulsar://127.0.0.1:6650" \
--auth-plugin "org.apache.pulsar.client.impl.auth.AuthenticationToken" \
--auth-params {"token":"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0ZXN0LXVzZXIiLCJleHAiOjE2NTY4MDMzODh9.0dAXdyl1dVsLZbhnvJDKPXFmyNlqwDYMMwzOoJ1L2Rl9gfcgVB4DzEfBFesU1F07P5oiM_X5hmxdI5YDSDxU4VGb_Sy3MakOAlROq3a4qzT45eY15-N3IxyfaI66BellDsZWyXVwsWnPYmwMBOlqZXgZAEhPL8HqC3c1IMBeMo78lDNobP7k0SVWsy9jhhmVOcas2ZQ4B-vOC8f0pHAWD29Rf_AV34A5w6Wu5XbQoHpMp5n0KRv2K_oFed_Zmg79uvtLv3Ujd8DaXN9a2vjXRatFYY2iZN8OhB1SV4WjpXB5hyG5Sv9uAHC559W39g8-AznG8NA5J79d-tIftIr8Dg"} \
produce public/default/test -m "hello pulsar" -n 10
```

- 尚未给普通用户赋权，因此命令执行需要报缺少权限的错误。

**Step 6.4. 测试给普通用户赋权**

```
bin/pulsar-admin \
--admin-url "http://127.0.0.1:8080/" \
--auth-params {"token":"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.ijp-Qw4JDn1aOQbYy4g4YGBbXYIgLA9lCVrnP-heEtPCdDq11_c-9pQdQwc6RdphvlSfoj50qwL5OtmFPysDuF2caSYzSV1kWRWN-tFzrt-04_LRN-vlgb6D06aWubVFJQBC4DyS-INrYqbXETuxpO4PI9lB6lLXo6px-SD5YJzQmcYwi2hmQedEWszlGPDYi_hDG9SeDYmnMpXTtPU3BcjaDcg9fO6PlHdbnLwq2MfByeIj-VS6EVhKUdaG4kU2EJf5uq2591JJAL5HHiuTZRSFD6YbRXuYqQriw4RtnYWSvSeVMMbcL-JzcSJblNbMmIOdiez43MPYFPTB7TMr8g"} \
--auth-plugin "org.apache.pulsar.client.impl.auth.AuthenticationToken" \
namespaces grant-permission public/default --role test-user --actions produce,consume
```

- 赋权后，可再次测试普通用户访问，需要可以正常发送数据。
- 注意 `bin/pulsar-admin` 命令默认使用的是管理流 8080 端口。
- 注意 `auth-params` 需要使用超级管理员 token 来执行赋权。

**Step 6.5. 测试给普通用户回收权限**

```
bin/pulsar-admin \
--admin-url "http://127.0.0.1:8080/" \
--auth-params {"token":"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.ijp-Qw4JDn1aOQbYy4g4YGBbXYIgLA9lCVrnP-heEtPCdDq11_c-9pQdQwc6RdphvlSfoj50qwL5OtmFPysDuF2caSYzSV1kWRWN-tFzrt-04_LRN-vlgb6D06aWubVFJQBC4DyS-INrYqbXETuxpO4PI9lB6lLXo6px-SD5YJzQmcYwi2hmQedEWszlGPDYi_hDG9SeDYmnMpXTtPU3BcjaDcg9fO6PlHdbnLwq2MfByeIj-VS6EVhKUdaG4kU2EJf5uq2591JJAL5HHiuTZRSFD6YbRXuYqQriw4RtnYWSvSeVMMbcL-JzcSJblNbMmIOdiez43MPYFPTB7TMr8g"} \
--auth-plugin "org.apache.pulsar.client.impl.auth.AuthenticationToken" \
namespaces revoke-permission public/default --role test-user 
```

#### 3、配合使用 TLS 传输加密

```
可参考：https://pulsar.apache.org/docs/security-tls-transport
```

#### 4、Pulsar Manager添加认证信息

在给Pulsar添加了认证相关的配置后，发现pulsar-manger的管理页面是无法使用的，需要我们也进行token相关的配置。 修改pulsar-manager目录下的application.properties文件中[jwt](https://so.csdn.net/so/search?q=jwt&spm=1001.2101.3001.7020)相关的配置。

```
backend.jwt.token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.NMwO2z_xzpH7EydXbMs59Ct394Nr8-X3zc41hDY6dss
jwt.broker.token.mode=SECRET #我这里使用的是对称密钥，根据自己生成密钥的实际情况选择
jwt.broker.secret.key=file:///data/my-secret.key
jwt.broker.public.key=file:///path/pulsar/broker-public.key
jwt.broker.private.key=file:///path/broker-private.key
```

修改完配置后，重启pulsar-manger即可。

### 八、pulsar集群升级

#### 1、zookeeper升级（可选）

**注：查看zookeeper状态，先从follower开始升级，最后升级leader。**

```
zkServer.sh status
```

1）停止老版本服务并查看zk状态

```
cd  /opt/zookeeper-3.4.6/bin
./zkServer.sh stop
./zkServer.sh status
```

2）拷贝zoo.cfg配置文件至新版本服务

3）启动ZK测试新版本服务

手动启动ZooKeeper，确认是否存在任何错误信息。可以在命令行中输入’./zkServer.sh start-foreground’，这将以前台模式启动ZooKeeper，并将所有日志输出到终端上，以便更好地调试。

```
zkServer.sh start-foreground
```

4）正常启动ZK新版本服务

如果前者测试启动无误，可以正常启动

```
zkServer.sh start
```

5）查看ZK状态

```
zkServer.sh status
```

6）查看ZK升级后数据是否还在

```
pulsar zookeeper-shell

用 pulsar zookeeper-shell 连接新的 ZooKeeper 服务，并运行命令测试其运行状态。
#输出
WatchedEvent state:SyncConnected type:None path:null
[zk: xxxx:6181(CONNECTED) 0] ls /
[admin, bookies, counters, ledgers, loadbalance, managed-ledgers, namespace, schemas, stream, zookeeper]
```

#### 2、升级bookeeper

```
https://pulsar.apache.org/docs/3.0.x/administration-upgrade/

升级前，需要确定是否一次性升级整个集群，包括停机升级和滚动升级。
在滚动升级中，一次升级一个 bookie。 在停机升级中，需先关闭全部集群，升级所有 bookie 后再启动集群。
```

1）同步bookkeeper.conf配置文件内容至新版本

2）禁用 autorecovery（任意节点执行即可）

```
cd /opt/pulsar
./bin/bookkeeper shell autorecovery -disable
```

3）停止旧的bookeeper

```
cd /opt/pulsar
./bin/pulsar-daemon stop bookie
```

4）新版本只读模式启动 bookie，以验证此新版本 bookie 的读性能

```
cd /opt/apache-pulsar-2.9.3
/bin/pulsar bookie --readOnly
```

5）测试通过后，后台启动新版本

```
bin/pulsar bookie

#bookie服务验证
bin/bookkeeper shell bookiesanity
#启动成功输出
- Bookie sanity test succeeded
```

6）升级所有节点的 bookie 后，重新启用 `autorecovery`

```
cd /opt/apache-pulsar-2.9.3
./bin/bookkeeper shell autorecovery -enable
```

#### 3、升级broker

1）同步broker.conf配置文件内容至新版本

2）终止 broker

```
cd /opt/pulsar
bin/pulsar-daemon stop broker
```

3）启动新版本broker

```
cd /opt/apache-pulsar-2.9.3
bin/pulsar-daemon start broker

查看broker是否健康
bin/pulsar-admin brokers healthcheck
查看集群 brokers 节点是否启动成功
bin/pulsar-admin brokers list pulsar-cluster-prod
```

### 九、跨集群复制

要在两个 Apache Pulsar 集群之间开启跨集群复制（Cross-Cluster Replication），需要按照以下步骤进行配置：

#### 1、前提条件
1. 两个集群已经正确安装和运行。
2. 两个集群的 Pulsar 管理工具（pulsar-admin）可用。
3. 两个集群的网络互通。

#### 2、配置集群信息
在每个集群的配置文件中添加对方集群的信息。假设集群 A 名为 `pulsar-cluster-dev`，集群 B 名为 `pulsar-cluster`。

**集群 A 的 `broker.conf` 配置文件**

在 `broker.conf` 文件中，添加集群 B 的信息：

```plaintext
clusters=pulsar-cluster-dev,pulsar-cluster

pulsar-cluster=zookeeperServers=zk-b1:2181
pulsar-cluster=brokerServiceURL=http://broker-b1:8080
pulsar-cluster=brokerServiceURLTls=https://broker-b1:8443
pulsar-cluster=brokerWebServiceURL=http://broker-b1:8081
pulsar-cluster=brokerWebServiceURLTls=https://broker-b1:8444
```

**集群 B 的 `broker.conf` 配置文件**

在 `broker.conf` 文件中，添加集群 A 的信息：

```plaintext
clusters=pulsar-cluster,pulsar-cluster-dev

pulsar-cluster-dev=zookeeperServers=zk-a1:2181
pulsar-cluster-dev=brokerServiceURL=http://broker-a1:8080
pulsar-cluster-dev=brokerServiceURLTls=https://broker-a1:8443
pulsar-cluster-dev=brokerWebServiceURL=http://broker-a1:8081
pulsar-cluster-dev=brokerWebServiceURLTls=https://broker-a1:8444
```

#### 3、创建集群

查看url连接配置信息

```
bin/pulsar-admin clusters get pulsar-cluster-sz
```

使用 `pulsar-admin` 命令创建集群。首先在集群 A 上创建集群 B 的配置：

```sh
bin/pulsar-admin clusters create pulsar-cluster \
  --url http://broker-b1:8080 \
  --url-secure https://broker-b1:8443 \
  --broker-url http://broker-b1:8081 \
  --broker-url-secure https://broker-b1:8444
```

然后在集群 B 上创建集群 A 的配置：

```sh
bin/pulsar-admin clusters create pulsar-cluster-dev \
  --url http://broker-a1:8080 \
  --url-secure https://broker-a1:8443 \
  --broker-url http://broker-a1:8081 \
  --broker-url-secure https://broker-a1:8444
```

#### 4、配置租户和命名空间
在两个集群中为租户配置跨集群复制，并为需要跨集群复制的命名空间设置跨集群策略。

```
bin/pulsar-admin tenants create tenant-copy --allowed-clusters pulsar-cluster-test1
bin/pulsar-admin tenants update tenant-copy --allowed-clusters pulsar-cluster-test1,pulsar-cluster-test2

bin/pulsar-admin namespaces create tenant-copy/copy-test -c pulsar-cluster-test1,pulsar-cluster-test2
bin/pulsar-admin namespaces policies  tenant-copy/copy-test
```

**在集群 A 上配置租户**

```sh
bin/pulsar-admin tenants update tenant-name \
  --allowed-clusters pulsar-cluster-dev,pulsar-cluster
```

**在集群 B 上配置租户**

```sh
bin/pulsar-admin tenants update tenant-name \
  --allowed-clusters pulsar-cluster-dev,pulsar-cluster
```

**为命名空间配置跨集群复制**

假设需要跨集群复制的命名空间是 `tenant-name/namespace-name`，在集群 A 和 B 上都需要进行配置：

```sh
bin/pulsar-admin namespaces set-clusters tenant-name/namespace-name \
  --clusters pulsar-cluster-dev,pulsar-cluster
```

**5、验证配置**

检查两个集群的配置是否正确，可以使用 `pulsar-admin` 命令来列出集群、租户和命名空间的配置。

例如，在集群 A 上：

```sh
bin/pulsar-admin clusters list
bin/pulsar-admin clusters get pulsar-cluster-sz
bin/pulsar-admin tenants get tenant-name
bin/pulsar-admin namespaces get-clusters tenant-name/namespace-name
```

在集群 B 上也执行相同的命令来验证配置。

消息验证（集群A和B互换）

```
#集群A
bin/pulsar-client produce persistent://public/default/test --messages "hello-pulsar"
#集群B
bin/pulsar-client consume persistent://public/default/test -s "consumer-test"
```

完成上述步骤后，两个集群之间的跨集群复制应该已经开启并可以使用。确保在所有步骤中使用正确的集群名称和地址信息。

### 十、pulsar+zookeeper集群迁移

#### 1、准备工作

迁移思路如下：

![](图片/pulsar迁移.png)

```
官方文档：https://bookkeeper.apache.org/docs/4.13.0/admin/decomission/
官方文档：https://github.com/apache/bookkeeper/issues/2162

1、初始化基础环境，部署安装新节点安装包，并同步配置文件配置。
2、动态无感迁移，保障跨集群复制正常，业务正常运行。
3、pulsar中bookeeper和broker连接zookeeper、pulsar中proxy连接pulsar，数据源配置IP全部替换为内网域名连接，确保迁移时无需调整配置文件信息。
```

**内网域名更新**

```
#pulsar配置文件
sed -i '/advertisedAddress/! s/192.168.0.80/node01.public.zk.prod/g' bookkeeper.conf broker.conf
sed -i '/advertisedAddress/! s/192.168.0.105/node02.public.zk.prod/g' bookkeeper.conf broker.conf
sed -i '/advertisedAddress/! s/192.168.0.173/node03.public.zk.prod/g' bookkeeper.conf broker.conf
grep -H -r "node01.public.pulsar.prod"
#修改完成后轮启broker bookkeeper服务，验证pulsar服务正常运行

#pulsar proxy配置文件
sed -i s/192.168.0.80/node01.public.pulsar.prod/g proxy.conf
sed -i s/192.168.0.105/node02.public.pulsar.prod/g proxy.conf
sed -i s/192.168.0.173/node03.public.pulsar.prod/g proxy.conf
#修改完成后重新制作镜像
```

**检查zookeeper集群是否启用动态配置**

```
vim /data/program/zookeeper/conf/zoo.cfg

kipACL=yes
4lw.commands.whitelist=*
reconfigEnabled=true			# 启用动态配置
```

#### 2、zookeeper集群迁移

**zookeeper新集群修改配置**

新集群三个节点直接部署成动态配置，在配置文件中加入新、旧集群所有的节点地址

```
vim /data/program/zookeeper/conf/zoo.cfg
    autopurge.purgeInterval=1
    initLimit=10
    syncLimit=5
    skipACL=yes
    maxClientCnxns=2000
    4lw.commands.whitelist=*
    tickTime=2000
    dataDir=/data/program/zookeeper/data
    reconfigEnabled=true
    dataLogDir=/data/program/zookeeper/logs
    dynamicConfigFile=/data/program/zookeeper/conf/zoo.cfg.dynamic.100000000


cat > conf/zoo.cfg.dynamic.100000000 << EOF
    server.1=172.16.20.45:2888:3888;0.0.0.0:2181
    server.2=172.16.20.94:2888:3888;0.0.0.0:2181
    server.3=172.16.20.120:2888:3888;0.0.0.0:2181
    server.4=172.16.20.177:2888:3888;0.0.0.0:2181
    server.5=172.16.20.183:2888:3888;0.0.0.0:2181
    server.6=172.16.20.250:2888:3888;0.0.0.0:2181
EOF
```

启动新集群三个zookeeper服务

**动态添加新集群三个节点**

登录leader节点

```
bin/zkCli.sh -server 127.0.0.1:22181

reconfig -add 4=10.0.0.5:2888:3888;0.0.0.0:22181
reconfig -add 5=10.0.0.6:2888:3888;0.0.0.0:22181
reconfig -add 6=10.0.0.7:2888:3888;0.0.0.0:22181
```

现在是由6个节点组成的集群（1个leader，5个follower），等待检查zookeeper集群之间数据同步完成

```
bin/zkCli.sh -server 127.0.0.1:22181 config

echo conf | nc localhost 22181
echo mntr | nc localhost 22181 | grep follower
```

**调整dns域名解析**

更新dns域名，将旧集群的2个follower节点，指向新集群的2个follower节点，并验证pulsar服务是否正常

```
#bookie服务验证
bin/bookkeeper shell bookiesanity

查看broker是否健康
bin/pulsar-admin brokers healthcheck
查看集群 brokers 节点是否启动成功
bin/pulsar-admin brokers list pulsar-cluster-prod
```

动态旧集群的2个follower节点

```
bin/zkCli.sh -server 127.0.0.1:22181

reconfig -remove 1
reconfig -remove 2
```

停止 2个 follower 节点的服务

```
supervisorctl stop zookeeper
```

**重新选取ledger**

重启旧ledger，zookeeper 会重新选举 leader，新集群会被选举为 leader 节点。

```
supervisorctl restart zookeeper
```

调整更新dns，将旧集群最后一节点，指向新集群

然后登录新集群的 leader 节点，动态移除旧集群的最后一个节点

```
bin/zkCli.sh -server 127.0.0.1:22181
reconfig -remove 3
```

停止旧集群最后一个节点服务

```
supervisorctl stop zookeeper
```

**验证zookeeper集群**

```
[zk: localhost:2181(CONNECTING) 0] config
server.4=10.0.0.5:2888:3888:participant;0.0.0.0:22181
server.5=10.0.0.6:2888:3888:participant;0.0.0.0:22181
server.6=10.0.0.7:2888:3888:participant;0.0.0.0:22181
version=300000003
```

**验证pulsar集群状态**

```
#bookie服务验证
bin/bookkeeper shell bookiesanity

查看broker是否健康
bin/pulsar-admin brokers healthcheck
查看集群 brokers 节点是否启动成功
bin/pulsar-admin brokers list pulsar-cluster-prod
```

#### 3、pulsar集群迁移

```
文档:https://blog.csdn.net/zhaijia03/article/details/117095566
新增节点后，确认节点broker和bookie正常后，更新dns域名解析指向新节点，准备缩容旧节点，并验证pulsar服务是否正常
```

##### 3.1、pulsar proxy迁移

docker 容器启动新镜像

```
docker run --restart=always --name pulsar-proxy -itd -p 6650:6650 -p 8080:8080 pulsar-proxy:2.9.2
```

验证proxy服务请求是否正常

```
bin/pulsar-admin --admin-url http://127.0.0.1:8080 --auth-plugin org.apache.pulsar.client.impl.auth.AuthenticationToken --auth-params token:your-token clusters list
```

nginx修改pulsar proxy地址

```
sed -i 's/192.168.0.250/10.0.0.125/g' stream/pulsar.conf
sed -i '/8080/ s/192.168.0.250/10.0.0.125/g' vhost/others/upstream.conf
cat stream/pulsar.conf
cat vhost/others/upstream.conf | grep pulsar_app -A3
```

检查pulsar集群复制是否正常

##### 3.2、pulsar集群节点迁移

1）上线节点

检查配置文件正确，启动pulsar bookie和broker节点,检查监控指标是否正常

**上线bookie节点**

```
#启动bookie节点,验证bookie服务正常
supervisorctl start pulsar-bookie
#bookie服务验证
bin/bookkeeper shell bookiesanity
#启动成功输出 
- Bookie sanity test succeeded
```

**上线broker节点**

```
#启动broker节点,验证broker服务正常
supervisorctl start pulsar-broker
查看broker是否健康
bin/pulsar-admin brokers healthcheck
查看集群 brokers 节点是否启动成功
bin/pulsar-admin brokers list pulsar-cluster-huawei-bj1
```

2）内网域名切换

```
#更新内网域名将 下线节点ip 指向 上线节点ip
/usr/local/dlops/coredns/conf/prod.conf
#更新完成后，检查pulsar服务是否正常消费请求，观察至少10分钟
```

3）下线节点

**下线broker**

```
#检查broker服务正常
bin/pulsar-admin brokers healthcheck
bin/pulsar-admin brokers list
#停止broker
supervisorctl stop pulsar-broker
#查看是否下线（上线节点执行）
bin/pulsar-admin brokers list
```

**下线bookie**

```
#检查bookie服务正常
bin/bookkeeper shell bookiesanity
bin/bookkeeper shell listbookies -rw -h
#查看下线节点迁移ledger
bin/bookkeeper shell listledgers -bookieid 172.16.20.158:3181
#查看下线节点是否存在副本不足的ledger
bin/bookkeeper shell listunderreplicated -bookieid 172.16.20.158:3181
#停止bookie
supervisorctl stop pulsar-bookie
#bookie优雅下线操作（时间较长，问题4.1）
nohup bin/bookkeeper shell decommissionbookie -bookieid 172.16.20.158:3181 &
返回结果 Cookie of the decommissioned bookie: 172.16.20.158:3181 is deleted successfully。下线成功
#下线完成，查看下线节点ledger是否还存在
in/bookkeeper shell listledgers -bookieid 172.16.20.158:3181
#检查存活 bookieid
bin/bookkeeper shell listbookies -rw -h
```

下线成功如图:

![](图片/pulsar下线.png)

##### **3.3、Broker节点扩缩容**

**增加 broker 节点**

本示例在 cluster1/broker1 创建 2 个 partitioned topic，再增加 2 个 broker 节点。之后卸载 partitioned topic 数据，并查看数据在 3 个 broker 之间的分配情况。

1.查看 cluster1 的 broker 信息。

```
cd/cluster1/broker1
bin/pulsar-admin brokers list cluster1
```

**输出**

结果说明当前 cluster1 只有 broker1。

```
"192.168.0.105:8080"
```

2.在 cluster1/broker1 上创建 2 个 partitioned topic。
为 partitioned-topic1 创建 6 个分区，为 partitioned-topic2 创建 7 个分区。

```
bin/pulsar-admin topics create-partitioned-topic -p 6 public/namespace1/partitioned-topic1
bin/pulsar-admin topics create-partitioned-topic -p 7 public/namespace1/partitioned-topic2
```

查看结果

```
bin/pulsar-admin topics partitioned-lookup public/namespace1/partitioned-topic1
```

**输出**

结果显示，partitioned-topic1 所有数据属于 broker1

```
"persistent://public/namespace1/partitioned-topic1-partition-0    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic1-partition-1    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic1-partition-2    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic1-partition-3    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic1-partition-4    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic1-partition-5    pulsar://192.168.0.105:6650"
```

**输入**

```
bin/pulsar-admin topics partitioned-lookup public/namespace1/partitioned-topic2
```

**输出**

结果显示，partitioned-topic2 所有数据属于 broker1。

```
"persistent://public/namespace1/partitioned-topic2-partition-0    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic2-partition-1    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic2-partition-2    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic2-partition-3    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic2-partition-4    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic2-partition-5    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic2-partition-6    pulsar://192.168.0.105:6650"
```

3.新增 2 个 broker 节点：broker2 和 broker3。

1)部署准备。
在 cluster1 文件夹中创建 broker2 和 broker3 文件夹，复制解压后 Pulsar 文件夹中的内容至 broker2 和 broker3 文件夹和my-secrect.key。

```
|-separate-clusters
    |-configuration-store
        |-zk1
    |-cluster1
        |-zk1
        |-bk1
        |-broker1
        |-broker2
        |-broker3
    |-cluster2
        |-zk1
        |-bk1
        |-broker1
```

2)部署 broker

a). 配置 broker

![](图片/pulsar-broker扩容.jpeg)

b). 启动 broker

![](图片/启动broker.jpeg)

查看 cluster1 中已启动的 broker

```
bin/pulsar-admin brokers list cluster1
```

**输出**

```
"192.168.0.105:8080" // broker1
"192.168.0.105:8082" // broker2
"192.168.0.105:8083" // broker3
```

5.卸载 namespace 1 中 partitioned-topic1 的数据。

```
bin/pulsar-admin namespaces unload public/namespace1
```

验证结果。

1). 查看 partitioned-topic1 的数据分配情况

```
bin/pulsar-admin topics partitioned-lookup public/namespace1/partitioned-topic1
```

**输出**

结果显示，partitioned-topic1的数据平均分配在 broker1、broker2 和 broker3 上

```
"persistent://public/namespace1/partitioned-topic1-partition-0    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic1-partition-1    pulsar://192.168.0.105:6653"
"persistent://public/namespace1/partitioned-topic1-partition-2    pulsar://192.168.0.105:6652"
"persistent://public/namespace1/partitioned-topic1-partition-3    pulsar://192.168.0.105:6653"
"persistent://public/namespace1/partitioned-topic1-partition-4    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic1-partition-5    pulsar://192.168.0.105:6653"
```

2). 查看 partitioned-topic2 的数据分配情况

```
bin/pulsar-admin topics partitioned-lookup public/namespace1/partitioned-topic2
```

结果显示，partitioned-topic2 的数据平均分配在 broker1、broker2 和 broker3 上。

**输出**

```
"persistent://public/namespace1/partitioned-topic2-partition-0    pulsar://192.168.0.105:6653"
"persistent://public/namespace1/partitioned-topic2-partition-1    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic2-partition-2    pulsar://192.168.0.105:6653"
"persistent://public/namespace1/partitioned-topic2-partition-3    pulsar://192.168.0.105:6652"
"persistent://public/namespace1/partitioned-topic2-partition-4    pulsar://192.168.0.105:6653"
"persistent://public/namespace1/partitioned-topic2-partition-5    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic2-partition-6    pulsar://192.168.0.105:6653"
```

**减少 broker 节点**

本示例在 cluster1 中减少 1 个 broker 节点，并查看 partitioned topic 数据在其余 2 个 broker 之间的分配情况。

1.减少 1 个 broker 节点，即停止 broker3。

```
cd/cluster1/broker3
bin/pulsar-daemon stop broker
```

验证结果

```
bin/pulsar-admin brokers list cluster1
```

**输出**

结果显示，当前 cluster1 仅启动了 broker1 和 broker2

```
"192.168.0.105:8080" // broker1
"192.168.0.105:8082" // broker2
```

2.查看 partitioned-topic1 数据的分配情况

```
bin/pulsar-admin topics partitioned-lookup public/namespace1/partitioned-topic1
```

**输出**

结果显示，partitioned-topic1 数据平均分配至 broker1 和 broker2，即原属于 broker3 的数据已被重新平均分配至 broker1 和 broker2

```
"persistent://public/namespace1/partitioned-topic1-partition-0    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic1-partition-1    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic1-partition-2    pulsar://192.168.0.105:6652"
"persistent://public/namespace1/partitioned-topic1-partition-3    pulsar://192.168.0.105:6652"
"persistent://public/namespace1/partitioned-topic1-partition-4    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic1-partition-5    pulsar://192.168.0.105:6650"
```

同理，partitioned-topic2 的数据也被平均分配至 broker1 和 broker2

```
bin/pulsar-admin topics partitioned-lookup public/namespace1/partitioned-topic2
```

**输出**

```
"persistent://public/namespace1/partitioned-topic2-partition-0    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic2-partition-1    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic2-partition-2    pulsar://192.168.0.105:6652"
"persistent://public/namespace1/partitioned-topic2-partition-3    pulsar://192.168.0.105:6652"
"persistent://public/namespace1/partitioned-topic2-partition-4    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic2-partition-5    pulsar://192.168.0.105:6650"
"persistent://public/namespace1/partitioned-topic2-partition-6    pulsar://192.168.0.105:6652"
```

##### 3.4、Bookie节点扩缩容

**增加 bookie 节点**

本示例在 cluster1/bookkeeper 1 已有 bookie1，增加 2 个 bookie 节点后，向 topic1 写入数据，并查看数据是否保存了多个副本。

1.查看 cluster1 的 bookie 信息。

```
cd cluster1/bk1
bin/bookkeeper shell listbookies -rw -h
```

**输出**

结果说明当前 cluster1 只有 bookie1

```
12:31:34.933 [main] INFO  org.apache.bookkeeper.tools.cli.commands.bookies.ListBookiesCommand - ReadWrite Bookies :
12:31:34.946 [main] INFO  org.apache.bookkeeper.tools.cli.commands.bookies.ListBookiesCommand - BookieID:192.168.0.105:3181, IP:192.168.0.105, Port:3181, Hostname:192.168.0.105
```

2.允许 3 个 bookie 节点服务。

更改 `cluster1/broker1/conf/broker.conf` 文件中以下配置项的值

```
managedLedgerDefaultEnsembleSize=3 // 指定 bookie 节点服务的数量
managedLedgerDefaultWriteQuorum=3 // 指定数据副本写入的数量
managedLedgerDefaultAckQuorum=2  // 指定数据成功写入几个副本后，数据才算写入成功
```

3.重启 broker1，使配置生效。

```
cd cluster1/broker1
bin/pulsar-daemon stop broker
bin/pulsar-daemon start broker
```

4.设置 public/default 的消息保留策略。

注意：如果不设置消息保留策略且 topic 未被订阅，一段时间后，topic 的数据会被自动清理

```
cd cluster1/broker1
bin/pulsar-admin namespaces set-retention -s 100M -t 3d public/default
```

5.在 public/default 创建 topic1，并写入 100 条数据

```
bin/pulsar-client produce -m 'hello' -n 100 topic1
```

**输出**

结果显示 bookie 节点数量不足导致数据写入失败

```
···
12:40:38.886 [pulsar-client-io-1-1] WARN  org.apache.pulsar.client.impl.ClientCnx - [id: 0x56f92aff, L:/192.168.0.105:53069 - R:/192.168.0.105:6650] Received error from server: org.apache.bookkeeper.mledger.ManagedLedgerException: Not enough non-faulty bookies available
...
12:40:38.886 [main] ERROR org.apache.pulsar.client.cli.PulsarClientTool - Error while producing messages
…
12:40:38.890 [main] INFO  org.apache.pulsar.client.cli.PulsarClientTool - 0 messages successfully produced
```

6.新增 2 个 bookie 节点：bookie2 和 bookie3。

1).部署准备。

在 cluster1 中新增 bk2 和 bk3 文件夹，复制解压后 Pulsar 文件夹中的内容至 bk2 和 bk3 文件夹

```
|-separate-clusters
    |-configuration-store
        |-zk1
    |-cluster1
        |-zk1
        |-bk1
        |-bk2
        |-bk3
        |-broker1
    |-cluster2
        |-zk1
        |-bk1
        |-broker1
```

2).部署 bookie。

a). 配置 bookie。

![](图片/pulsar-bookie扩容.jpeg)

b). 启动 bookie

![](图片/启动bookie.jpeg)

c). 检查 cluster1 中已启动的 bookie

```
bin/bookkeeper shell listbookies -rw -h
```

**输出**

结果显示 cluster 1 中已启动 3 个 bookie：

•bookie1：192.168.0.105:3181•bookie2：192.168.0.105:3183•bookie3：192.168.0.105:3184

```
12:12:47.574 [main] INFO  org.apache.bookkeeper.tools.cli.commands.bookies.ListBookiesCommand - BookieID:192.168.0.105:3183, IP:192.168.0.105, Port:3183, Hostname:192.168.0.105 
12:12:47.575 [main] INFO  org.apache.bookkeeper.tools.cli.commands.bookies.ListBookiesCommand - BookieID:192.168.0.105:3184, IP:192.168.0.105, Port:3184, Hostname:192.168.0.105
12:12:47.576 [main] INFO  org.apache.bookkeeper.tools.cli.commands.bookies.ListBookiesCommand - BookieID:192.168.0.105:3181, IP:192.168.0.105, Port:3181, Hostname:192.168.0.105 
```

7.设置 public/default 的消息保留策略。

注意：如果不设置消息保留策略且 topic 未被订阅，一段时间后，topic 的数据会被自动清理。

```
cd cluster1/broker1
bin/pulsar-admin namespaces set-retention -s 100M -t 3d public/default
```

8.在 public/default 创建 topic1，并写入 100 条数据。

```
bin/pulsar-client produce -m 'hello' -n 100 topic1
```

**输出**

结果显示数据写入成功。

```
...
12:17:40.222 [main] INFO  org.apache.pulsar.client.cli.PulsarClientTool - 100 messages successfully produced
```

9.查看 topic1 的信息。

```
bin/pulsar-admin topics stats-internal topic1
```

**输出**

结果显示 ledgerId 5 保存了 topic1 的数据

```
{
  "entriesAddedCounter" : 100,
  "numberOfEntries" : 100,
  "totalSize" : 5500,
  "currentLedgerEntries" : 100,
  "currentLedgerSize" : 5500,
  "lastLedgerCreatedTimestamp" : "2021-05-11T12:17:38.881+08:00",
  "waitingCursorsCount" : 0,
  "pendingAddEntriesCount" : 0,
  "lastConfirmedEntry" : "5:99",
  "state" : "LedgerOpened",
  "ledgers" : [ {
    "ledgerId" : 5,
    "entries" : 0,
    "size" : 0,
    "offloaded" : false
  } ],
  "cursors" : { },
  "compactedLedger" : {
    "ledgerId" : -1,
    "entries" : -1,
    "size" : -1,
    "offloaded" : false
  }
}
```

10.查看 ledgerid 5 存储在哪些 bookie 节点上

```
bin/bookkeeper shell ledgermetadata -ledgerid 5
```

**输出**

结果显示正如前文所配置， ledgerid 5 存储在 bookie1（3181）、bookie2（3183） 和 bookie3（3184）上

```
...
12:23:17.705 [main] INFO  org.apache.bookkeeper.tools.cli.commands.client.LedgerMetaDataCommand - ledgerID: 5
12:23:17.714 [main] INFO  org.apache.bookkeeper.tools.cli.commands.client.LedgerMetaDataCommand - LedgerMetadata{formatVersion=3, ensembleSize=3, writeQuorumSize=3, ackQuorumSize=2, state=OPEN, digestType=CRC32C, password=base64:, ensembles={0=[192.168.0.105:3184, 192.168.0.105:3181, 192.168.0.105:3183]}, customMetadata={component=base64:bWFuYWdlZC1sZWRnZXI=, pulsar/managed-ledger=base64:cHVibGljL2RlZmF1bHQvcGVyc2lzdGVudC90b3BpYzE=, application=base64:cHVsc2Fy}}
...
```

**减少 bookie 节点**

本示例在 cluster1 中减少 2 个 bookie 节点，再向 topic2 写入数据，并查看数据保存在哪些节点。

1.允许 1 个 bookie 节点服务。

更改 `cluster1/broker1/conf/broker.conf` 文件中以下配置项的值。

```
managedLedgerDefaultEnsembleSize=1 // 指定 bookie 节点服务的数量
managedLedgerDefaultWriteQuorum=1 // 指定数据副本写入的数量
managedLedgerDefaultAckQuorum=1  // 指定数据成功写入几个副本后，数据才算写入成功
```

2.重启 broker1，使配置生效。

```
cd cluster1/broker1
bin/pulsar-daemon stop broker
bin/pulsar-daemon start broker
```

3.查看 cluster1 的 bookie 信息。

```
cd cluster1/bk1
bin/bookkeeper shell listbookies -rw -h
```

**输出**

结果说明当前 cluster1 已启动了 bookie1（3181）、bookie2（3183） 和 bookie3（3184）

```
...
15:47:41.370 [main] INFO  org.apache.bookkeeper.tools.cli.commands.bookies.ListBookiesCommand - ReadWrite Bookies :
15:47:41.382 [main] INFO  org.apache.bookkeeper.tools.cli.commands.bookies.ListBookiesCommand - BookieID:192.168.0.105:3183, IP:192.168.0.105, Port:3183, Hostname:192.168.0.105
15:47:41.383 [main] INFO  org.apache.bookkeeper.tools.cli.commands.bookies.ListBookiesCommand - BookieID:192.168.0.105:3184, IP:192.168.0.105, Port:3184, Hostname:192.168.0.105
15:47:41.384 [main] INFO  org.apache.bookkeeper.tools.cli.commands.bookies.ListBookiesCommand - BookieID:192.168.0.105:3181, IP:192.168.0.105, Port:3181, Hostname:192.168.0.105
…
```

4.减少 2 个 bookie 节点，即停止 bookie2 和 bookie3。

提示：更多关于如何减少 bookie 的信息，参阅这里[9]。

```
cd cluster1/bk2
bin/bookkeeper shell listunderreplicated
bin/pulsar-daemon stop bookie
nohup bin/bookkeeper shell decommissionbookie -bookieid ip:3181 &
```

```
cd cluster1/bk3
bin/bookkeeper shell listunderreplicated
bin/pulsar-daemon stop bookie  
nohup bin/bookkeeper shell decommissionbookie -bookieid ip:3181 &
```

5.查看 cluster1 的 bookie 信息。

```
cd cluster1/bk1
bin/bookkeeper shell listbookies -rw -h
```

**输出**

结果说明当前 cluster1 仅启动了 bookie1（3181）。

```
…
16:05:28.690 [main] INFO  org.apache.bookkeeper.tools.cli.commands.bookies.ListBookiesCommand - ReadWrite Bookies :
16:05:28.700 [main] INFO  org.apache.bookkeeper.tools.cli.commands.bookies.ListBookiesCommand - BookieID:192.168.0.105:3181, IP:192.168.0.105, Port:3181, Hostname:192.168.0.105
...
```

6.设置 public/default 的消息保留策略。

注意：如果不设置消息保留策略且没有订阅，一段时间后，数据会被自动清理。

```
cd cluster1/broker1
bin/pulsar-admin namespaces set-retention -s 100M -t 3d public/default
```

7.在 public/default 创建 topic2，并写入 100 条数据。

```
bin/pulsar-client produce -m 'hello' -n 100 topic2
```

**输出**

结果显示数据写入成功。

```
…
16:06:59.448 [main] INFO  org.apache.pulsar.client.cli.PulsarClientTool - 100 messages successfully produced
```

8.查看 topic2 的信息。

```
bin/pulsar-admin topics stats-internal topic2
```

**输出**

结果显示 ledgerId 7 保存了 topic 2 的数据

```
{
  "entriesAddedCounter" : 100,
  "numberOfEntries" : 100,
  "totalSize" : 5400,
  "currentLedgerEntries" : 100,
  "currentLedgerSize" : 5400,
  "lastLedgerCreatedTimestamp" : "2021-05-11T16:06:59.058+08:00",
  "waitingCursorsCount" : 0,
  "pendingAddEntriesCount" : 0,
  "lastConfirmedEntry" : "7:99",
  "state" : "LedgerOpened",
  "ledgers" : [ {
    "ledgerId" : 7,
    "entries" : 0,
    "size" : 0,
    "offloaded" : false
  } ],
  "cursors" : { },
  "compactedLedger" : {
    "ledgerId" : -1,
    "entries" : -1,
    "size" : -1,
    "offloaded" : false
  }
}
```

9.查看 ledgerid 7 存储在哪些 bookie 节点上

```
bin/bookkeeper shell ledgermetadata -ledgerid 7
```

**输出**

结果显示 ledgerid 7 存储在 bookie1（3181）上。

```
...
16:11:28.843 [main] INFO  org.apache.bookkeeper.tools.cli.commands.client.LedgerMetaDataCommand - ledgerID: 7
16:11:28.846 [main] INFO  org.apache.bookkeeper.tools.cli.commands.client.LedgerMetaDataCommand - LedgerMetadata{formatVersion=3, ensembleSize=1, writeQuorumSize=1, ackQuorumSize=1, state=OPEN, digestType=CRC32C, password=base64:, ensembles={0=[192.168.0.105:3181]}, customMetadata={component=base64:bWFuYWdlZC1sZWRnZXI=, pulsar/managed-ledger=base64:cHVibGljL2RlZmF1bHQvcGVyc2lzdGVudC90b3BpYzM=, application=base64:cHVsc2Fy}}
…
```

#### 4、集群迁移问题

##### 4.1、pulsar节点decommissionbookie下线时，ledgers一直无法复制

```
github文档：https://github.com/apache/pulsar/issues/15776
官方文档: https://bookkeeper.apache.org/docs/4.13.0/reference/cli#bookkeeper-shell-updateledgers
```

日志一直刷新如下内容

```
2024-12-25T18:13:35,901+0800 [main] INFO  org.apache.bookkeeper.client.BookKeeperAdmin - Count of Ledgers which need to be rereplicated: 2
```

检查listunderreplicated返回结果一直为2个ledger,ledger无法复制，节点无法正常下线

```
bin/bookkeeper shell listunderreplicated
```

**处理方案：**

停止节点 decommissionbookie操作，手动迁移该节点ledger至新增节点

```
#sb为源节点,db为目标节点（执行很慢，后台执行）
nohup bin/bookkeeper shell updateBookieInLedger -sb 172.16.20.194:3181 -db 172.16.20.70:3181 &
```

迁移完成后，检查异常ledger的bookid是否为新节点

```
#bin/bookkeeper shell ledgermetadata -l [ledger_id]
bin/bookkeeper shell ledgermetadata -l 140
```

确认ledger的bookid更新后，再次执行decommissionbookie下线操作，并确认下线是否成功

```
nohup bin/bookkeeper shell decommissionbookie &
```

下线完成后检查集群ledger是否正常，下线节点是否已下线

```
bin/bookkeeper shell listunderreplicated

bin/bookkeeper shell listbookies -rw -h
```

##### 4.2、pulsar节点decommissionbookie下线完成，但旧节点日志报错请求下线失败

日志刷新内容如下：

```
 Cannot connect to 192.168.0.105:3181 as endpoint resolution failed (probably bookie is down) err 
 
org.apache.bookkeeper.proto.BookieAddressResolver$BookieIdNotResolvedException: Cannot resolve bookieId 192.168.0.105:3181, bookie does not exist or it is not running
```

验证域名解析正常,旧节点解析有缓存，轮启pulsar所有节点

##### 4.3、pulsar节点下线ledger节点，ledger节点复制至新节点完成后报错

日志报错内容如下：

![](图片/bookkeeper报错1.png)

![](图片/bookkeeper报错2.png)

官方文档：

```
https://www.mail-archive.com/commits@bookkeeper.apache.org/msg08331.html
https://github.com/apache/bookkeeper/pull/3917
```

查看异常ledger

```
bin/bookkeeper shell listunderreplicated -bookieid 10.0.0.1:3181
```

查看ledger元数据信息

```
bin/bookkeeper shell ledgermetadata -l 1322837
```

确认ledger recover报错，但不影响集群运行及topic正常消息

##### 4.4、pulsar节点上线完成后，新节点无法正常进行跨集群复制

其他节点跨集群复制正常

日志报错内容如下：

```
WARN  org.apache.pulsar.client.impl.ConnectionPool - [[id: 0x776a5d32, L:/192.0.0.38:57219 ! R:pulsar-zt.easy-board.com.cn/192.0.0.82:16650]] Connection handshake failed: org.apache.pulsar.client.api.PulsarClientException: Connection already closed
```

检查跨集群配置proxy域名是否正常解析

```
ping pulsar-zt.easy-board.com.cn
```

检查跨集群proxy域名日志是否存在错误

```
tail -1000f /var/log/nginx.log
```

发现proxy域名日志存在pulsar集群公网ip访问403错误，在proxy域名中添加pulsar集群公网ip的nginx白名单，新增节点跨集群复制恢复正常。

##### 4.5、pulsar节点迁移完成后，集群信息未更新

查看集群信息，serviceUrl和brokerServiceUrl依旧是旧节点IP，但集群复制和使用依旧正常

```
bin/pulsar-admin clusters get pulsar-cluster-test

{
  "serviceUrl" : "http://172.16.0.180:8080,172.168.0.115:8080,172.168.0.113:8080",
  "brokerServiceUrl" : "pulsar://172.161.0.80:6650,172.161.0.105:6650,172.161.0.173:6650",
  "brokerClientTlsEnabled" : false,
  "tlsAllowInsecureConnection" : false,
  "brokerClientTlsEnabledWithKeyStore" : false,
  "migrated" : false
}
```

需要**手动更新 `clusters` 信息**，否则 Pulsar admin client 会继续使用旧的 URL（待验证）

```
bin/pulsar-admin clusters update cluster-1 \
    --url http://my-cluster.org.com:4081 \
    --broker-url pulsar://my-cluster.org.com:3350
```

