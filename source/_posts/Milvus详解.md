 ---
title: Milvus详解
tags: [Milvu]
categories: [数据库]
date: 2025-10-29
---

一、向量数据库
-------

### 1.1 向量数据库的由来

在当今数字化时代，人工智能AI正迅速改变着我们的生活和工作方式。从智能助手到自动驾驶汽车，AI正在成为各行各业的创新引擎。然而，这种AI的崛起也带来了一个关键的挑战：如何有效地处理和分析越来越丰富和复杂的数据。在这个背景下，向量数据库技术应运而生，为AI提供了强大的加速引擎。

![](%E5%9B%BE%E7%89%87/milvus-apply.png)

> AI时代的数据挑战：随着AI应用范围的扩大，大量的数据涌入各个行业。图像、文本、音频等多种数据形式都成为了AI的输入。这些数据的特点是多模态、高维、复杂和关联性强。传统的关系型数据库虽然在一些场景中仍然有用，但在处理这种多模态、高维数据时显得力不从心。因此，需要一种更适合AI应用需求的数据库技术，这就是向量数据库。
> 
> AI的加速引擎：向量数据库是一种专门为存储和检索向量数据而设计的数据库。它的核心思想是将数据映射到向量空间中，从而使得数据的相似性计算、聚类、分类和检索变得更加高效和精确。

向量数据库是专门用来存储和查询向量的数据库，其存储的向量来自于对文本、语音、图像、视频等的向量化。同传统数据库相比，向量数据库不仅能够完成基本的CRUD（添加、读取查询、更新、删除）等操作，还能够对向量数据进行更快速的相似性搜索

### 1.2 向量数据库对大模型的赋能

向量数据库拓展了大模型的边界，这种拓张包含两个方面，时间边界和空间边界：

> 时间边界的扩展：向量数据库能够使得大模型LLM拥有“长期记忆”。

目前的大模型（无论是NLP领域的GPT系列还是CV领域的ResNET系列）都是预先训练Pretrain的大模型，有着非常明晰的训练截止日Cut-off Date，这导致这些模型对于训练截止日之后发生的事情一无所知。而随着向量数据库的引入，其内部存储的最新的信息向量能够极大地拓展大模型的应用边界，向量数据库可以使得大模型保持准实时性，提高大模型的适用性，并使得大模型能够动态调整。因此向量数据库使得大模型具有了长期记忆。

假设一个预训练的新闻摘要模型在2021年底完成了训练，到了2023年，许多新闻事件和趋势已经发生了变化。为了使大模型能够处理这些新信息，可以使用向量数据库来存储和查询2023年的新闻文章向量。

在推荐系统中，预训练的大模型可能无法识别新用户和新产品的特征，通过向量数据库，可以实时更新用户和产品的特征向量，从而使大模型能够根据最新的信息为用户提供更精准的推荐。

此外，向量数据库还可以支持实时监测和分析。例如，在金融领域，预训练的股票预测模型可能无法获取训练截止日期之后的股票价格信息。通过将最新的股票价格向量存储在向量数据库中，大模型可以实时分析和预测未来股票价格走势。还有就是在客服领域，向量数据库将使得大模型可以追溯到对话的开始。

> 空间边界的扩展：向量数据库能够协助解决目前企业界最担忧的大模型泄露隐私的问题。

用户给出的Prompt可能会包含一些敏感信息。根据媒体报道，员工A用ChatGPT帮自己查一段代码的bug，而这段源代码与半导体设备测量数据有关；员工B想用ChatGPT帮自己优化一段代码，就直接将与产量和良品率记录设备相关的一段代码输入了其中。

这些行为直接导致了三星关键数据的泄露，而ChatGPT本身其实也出现过隐私泄露事件，使得有一小部分的对话历史/支付数据会被其他用户查看，这些数据都极为敏感，而通过本地部署，向量数据库能够在很大程度上解决这个问题。

向量数据库本地部署后可以存储企业有关的大量隐私数据，在本地部署或者专有云部署大模型后，通过特别的Agent大模型可以在有保护的情况下访问向量数据库的隐私数据，进而可以在不向外网暴露公司的隐私的情况下，使得公司的业务得到大模型的助力。

### 1.3 向量数据库实现多模态搜索

向量数据库自带多模态功能，这意味着它能够通过机器学习方法处理和理解来自不同源的多种模态信息，如文本、图像、音频和视频等，数据向量化过程使得这些不同模态数据的内部隐藏信息得以暴露，进而为多模态应用提供支持。

![](%E5%9B%BE%E7%89%87/milvus-%E5%A4%9A%E6%A8%A1%E6%80%81%E6%90%9C%E7%B4%A2.png)

 一个典型的应用场景是多语言搜索，向量数据库支持跨语言的信息检索，用户可以使用英语、法语、中文等多种语言搜索图书库，而无需事先对书名进行多语言翻译处理。这得益于向量表示能够捕捉到语义相似性，使得来自不同语言的查询和内容能够相互匹配。

### 1.4 非结构化数据、Embeddings 和 Milvus

非结构化数据（如文本、图像和音频）格式各异，蕴含丰富的潜在语义，因此分析起来极具挑战性。为了处理这种复杂性，Embeddings 被用来将非结构化数据转换成能够捕捉其基本特征的数字向量。然后将这些向量存储在向量数据库中，从而实现快速、可扩展的搜索和分析。

Milvus 提供强大的数据建模功能，使您能够将非结构化或多模式数据组织成结构化的 Collections。它支持多种数据类型，适用于不同的属性模型，包括常见的数字和字符类型、各种向量类型、数组、集合和 JSON，为您节省了维护多个数据库系统的精力。

![](%E5%9B%BE%E7%89%87/milvus-about.png)

Milvus 提供三种部署模式，涵盖各种数据规模--从 Jupyter Notebooks 中的本地原型到管理数百亿向量的大规模 Kubernetes 集群：

- Milvus Lite 是一个 Python 库，可以轻松集成到您的应用程序中。作为 Milvus 的轻量级版本，它非常适合在 Jupyter Notebooks 中进行快速原型开发，或在资源有限的边缘设备上运行。[了解更多信息](https://milvus.io/docs/zh/milvus_lite.md)。
- Milvus Standalone 是单机服务器部署，所有组件都捆绑在一个 Docker 镜像中，方便部署。[了解更多](https://milvus.io/docs/zh/install_standalone-docker.md)。
- Milvus Distributed 可部署在 Kubernetes 集群上，采用云原生架构，专为十亿规模甚至更大的场景而设计。该架构可确保关键组件的冗余。[了解更多](https://milvus.io/docs/zh/install_cluster-milvusoperator.md)。

二、Milvus数据库介绍
-------------

### **2.1 Milvus概述**

Milvus 是一款云原生向量数据库，它具备高可用、高性能、易拓展的特点，用于海量向量数据的实时召回。

Milvus官网地址：[Milvus](https://milvus.io/ "Milvus")

Milvus Github地址：[milvus-operator](https://github.com/zilliztech/milvus-operator)

Milvus 基于FAISS、Annoy、HNSW 等向量搜索库构建，核心是解决稠密向量相似度检索的问题。在向量检索库的基础上，Milvus 支持数据分区分片、数据持久化、增量数据摄取、标量向量混合查询、time travel 等功能，同时大幅优化了向量检索的性能，可满足任何向量检索场景的应用需求。通常，建议用户使用 Kubernetes 部署 Milvus，以获得最佳可用性和弹性。

Milvus 采用共享存储架构，​存储计算完全分离​，计算节点支持横向扩展。从架构上来看，Milvus 遵循数据流和控制流分离，整体分为了四个层次，分别为接入层（access layer）、协调服务（coordinator service）、执行节点（worker node）和存储层（storage）。各个层次相互独立，独立扩展和容灾。

![](%E5%9B%BE%E7%89%87/milvus-share.png)

Milvus 向量数据库能够帮助用户轻松应对海量非结构化数据（图片/视频/语音/文本）检索。单节点 Milvus 可以在秒内完成十亿级的向量搜索，分布式架构亦能满足用户的水平扩展需求。

![](%E5%9B%BE%E7%89%87/milvus-share01.png)

milvus特点总结如下：

*   高性能：性能高超，可对海量数据集进行向量相似度检索。
*   高可用、高可靠：Milvus 支持在云上扩展，其容灾能力能够保证服务高可用。
*   混合查询：Milvus 支持在向量相似度检索过程中进行标量字段过滤，实现混合查询。
*   开发者友好：支持多语言、多工具的 Milvus 生态系统。

### 2.2 Milvus关键概念

**非结构化数据:** 非结构化数据指的是数据结构不规则，没有统一的预定义数据模型，不方便用数据库二维逻辑表来表现的数据。非结构化数据包括图片、视频、音频、自然语言等，占所有数据总量的 80%。非结构化数据的处理可以通过各种人工智能（AI）或机器学习（ML）模型转化为向量数据后进行处理。

**特征向量:** 向量又称为embedding vector，是指由 embedding 技术从离散变量（如图片、视频、音频、自然语言等各种非结构化数据）转变而来的连续向量。在数学表示上，向量是一个由浮点数或者二值型数据组成的 n 维数组。

通过现代的向量转化技术，比如各种人工智能（AI）或者机器学习（ML）模型，可以将非结构化数据抽象为 n 维特征向量空间的向量。这样就可以采用最近邻算法（ANN）计算非结构化数据之间的相似度。

**向量相似度检索:** 相似度检索是指将目标对象与数据库中数据进行比对，并召回最相似的结果。同理，向量相似度检索返回的是最相似的向量数据。近似最近邻搜索（ANN）算法能够计算向量之间的距离，从而提升向量相似度检索的速度。如果两条向量十分相似，这就意味着他们所代表的源数据也十分相似。

**Collection-集合:** 包含一组entity，可以等价于关系型数据库系统（RDBMS）中的表。

**Entity-实体:** 包含一组 field。field 与实际对象相对应。field 可以是代表对象属性的结构化数据，也可以是代表对象特征的向量。primary key 是用于指代一个 entity 的唯一值。**注意：**你可以自定义primary key，否则 Milvus 将会自动生成primary key。目前Milvus 不支持primary key去重，因此有可能在一个collection内出现primary key相同的entity。

**Field-字段:** Entity 的组成部分。Field可以是结构化数据，例如数字和字符串，也可以是向量。**注意：**Milvus2.0现已支持标量字段过滤。并且，Milvus 2.0在一个集合中只支持一个主键字段。

Milvus与关系型数据库的对应关系如下：

![](%E5%9B%BE%E7%89%87/milvus-%E7%BB%93%E6%9E%84%E5%85%B3%E7%B3%BB.png)

**Partition-分区:** 分区是集合（Collection）的一个分区。Milvus 支持将收集数据划分为物理存储上的多个部分。这个过程称为分区，每个分区可以包含多个段。

**Segment-段:** Milvus 在数据插入时，通过合并数据自动创建的数据文件。一个collection可以包含多个segment。一个segment可以包含多个entity。在搜索中，Milvus会搜索每个segment，并返回合并后的结果。

**Sharding-分片:** Shard是指将数据写入操作分散到不同节点上，使 Milvus 能充分利用集群的并行计算能力进行写入。默认情况下，单个Collection包含 2 个分片（Shard）。目前 Milvus 采用基于**主键哈希**的分片方式，未来将支持随机分片、自定义分片等更加灵活的分片方式。**注意：** 分区的意义在于通过划定分区减少数据读取，而分片的意义在于多台机器上并行写入操作。

**索引:** 索引基于原始数据构建，可以提高对 collection 数据搜索的速度。Milvus 支持多种索引类型。为提高查询性能，你可以为每个向量字段指定一种索引类型。目前，一个向量字段仅支持一种索引类型。切换索引类型时，Milvus 自动删除之前的索引。**相似性搜索引擎的工作原理**是将输入的对象与数据库中的对象进行比较，找出与输入最相似的对象。索引是有效组织数据的过程，极大地加速了对大型数据集的查询，在相似性搜索的实现中起着重要作用。对一个大规模向量数据集创建索引后，查询可以被路由到最有可能包含与输入查询相似的向量的集群或数据子集。在实践中，这意味着要牺牲一定程度的准确性来加快对真正的大规模向量数据集的查询。

**PChannel:** PChannel 表示物理通道。每个 PChannel 对应一个日志存储主题。默认情况下，将分配一组 256 个 PChannels 来存储记录 Milvus 集群启动时数据插入、删除和更新的日志。

**VChannel:** VChannel 表示逻辑通道（虚拟通道）。每个集合将分配一组 VChannels，用于记录数据的插入、删除和更新。VChannels 在逻辑上是分开的，但在物理上共享资源。

**Binlog:** binlog 是一个二进制日志，或者是一个更小的段单位，记录和处理 Milvus 向量数据库中数据的更新和更改。 一个段的数据保存在多个二进制日志中。 Milvus 中的 binlog 分为三种：InsertBinlog、DeleteBinlog 和 DDLBinlog。

**日志代理（Log broker）:** 日志代理是一个支持回放的发布订阅系统。它负责流数据持久化、可靠异步查询的执行、事件通知和查询结果的返回。当工作节点从系统崩溃中恢复时，它还确保增量数据的完整性。

**日志订阅者:** 日志订阅方通过订阅日志序列来更新本地数据，并以只读副本的形式提供服务。

**日志序列（Log sequence）:** 日志序列记录了在 Milvus 中更改集合状态的所有操作。

**正则化:** 正则化是指转换嵌入（向量）以使其范数等于1的过程。 如果使用内积 (IP) 来计算embeddings相似度，则必须对所有embeddings进行正则化。 正则化后，内积等于余弦相似度。

### 2.2 Milvus架构

![](%E5%9B%BE%E7%89%87/milvus-architecture.png)

 Milvus文档地址：[Milvus doc](https://milvus.io/docs "Milvus doc")

整个系统分为四个层次：

*   接入层（Access Layer）：系统的门面，由一组无状态 proxy 组成。对外提供用户连接的 endpoint，负责验证客户端请求并合并返回结果。
*   协调服务（Coordinator Service）：系统的大脑，负责分配任务给执行节点。协调服务共有四种角色，分别为 root coord、data coord、query coord 和 index coord。
*   执行节点（Worker Node）：系统的四肢，负责完成协调服务下发的指令和 proxy 发起的数据操作语言（DML）命令。执行节点分为三种角色，分别为 data node、query node 和 index node。
*   存储服务 （Storage）： 系统的骨骼，负责 Milvus 数据的持久化，分为元数据存储（meta store）、消息存储（log broker）和对象存储（object storage）三个部分。

各个层次相互独立，独立扩展和容灾。

#### **2.2.1 接入层**

接入层由一组无状态 proxy 组成，是整个系统的门面，对外提供用户连接的 endpoint。接入层负责验证客户端请求并减少返回结果。

*   Proxy 本身是无状态的，一般通过负载均衡组件（Nginx、Kubernetes Ingress、NodePort、LVS）对外提供统一的访问地址并提供服务。
*   由于 Milvus 采用大规模并行处理（MPP）架构，proxy 会先对执行节点返回的中间结果进行全局聚合和后处理后，再返回至客户端。

#### **2.2.2 协调服务**

协调服务是系统的大脑，负责向执行节点分配任务。它承担的任务包括集群拓扑节点管理、负载均衡、时间戳生成、数据声明和数据管理等。

协调服务共有四种角色：

*   **Root coordinator（root coord）**：负责处理数据定义语言（DDL）和数据控制语言（DCL）请求。比如，创建或删除 collection、partition、index 等，同时负责维护中心授时服务 TSO 和时间窗口的推进。
*   **Query coordinator (query coord）**：负责管理 query node 的拓扑结构和负载均衡以及从 growing segment 移交切换到 sealed segment。Query node 中的 segment 只存在两种状态：growing 和 sealed，分别对应增量数据和历史数据。
*   **Data coordinator (data coord）**：负责管理 data node 的拓扑结构，维护数据的元信息以及触发 flush、compact 等后台数据操作。
*   **Index coordinator (index coord）**：负责管理 index node 的拓扑结构，构建索引和维护索引元信息。

#### **2.2.3 执行节点**

执行节点是系统的四肢，负责完成协调服务下发的指令和 proxy 发起的数据操作语言（DML）命令。由于采取了存储计算分离，执行节点是无状态的，可以配合 Kubernetes 快速实现扩缩容和故障恢复。

执行节点分为三种角色：

*   **Query node：** Query node 通过订阅消息存储（log broker）获取增量日志数据并转化为 growing segment，基于对象存储加载历史数据，提供标量+向量的混合查询和搜索功能。
*   **Data node：** Data node 通过订阅消息存储获取增量日志数据，处理更改请求，并将日志数据打包存储在对象存储上实现日志快照持久化。
*   **Index node：** Index node 负责执行索引构建任务。Index node不需要常驻于内存，可以通过 serverless 的模式实现。

#### **2.3.4 存储服务**

存储服务是系统的骨骼，负责 Milvus 数据的持久化，分为元数据存储（meta store）、消息存储（log broker）和对象存储（object storage）三个部分。

**元数据存储：**负责存储元信息的快照，比如：集合 schema 信息、节点状态信息、消息消费的 checkpoint 等。元信息存储需要极高的可用性、强一致和事务支持，因此，etcd 是这个场景下的不二选择。除此之外，etcd 还承担了服务注册和健康检查的职责。

**对象存储：**负责存储日志的快照文件、标量/向量索引文件以及查询的中间处理结果。Milvus 采用 MinIO 作为对象存储，另外也支持部署于 AWS S3 和Azure Blob 这两大最广泛使用的低成本存储。但是，由于对象存储访问延迟较高，且需要按照查询计费，因此 Milvus 未来计划支持基于内存或 SSD 的缓存池，通过冷热分离的方式提升性能以降低成本。

**消息存储：**消息存储是一套支持回放的发布订阅系统，用于持久化流式写入的数据，以及可靠的异步执行查询、事件通知和结果返回。执行节点宕机恢复时，通过回放消息存储保证增量数据的完整性。

目前，分布式版Milvus依赖 Pulsar 作为消息存储，单机版Milvus依赖 RocksDB 作为消息存储。消息存储也可以替换为 Kafka、Pravega 等流式存储。

整个 Milvus 围绕日志为核心来设计，遵循**日志即数据**的准则，因此在 2.0 版本中没有维护物理上的表，而是通过日志持久化和日志快照来保证数据的可靠性。

![](%E5%9B%BE%E7%89%87/milvus-sequence.png)

日志系统作为系统的主干，承担了数据持久化和解耦的作用。通过日志的发布订阅机制，Milvus 将系统的读、写组件解耦。一个极致简化的模型如上图所示，整个系统主要由两个角色构成，分别是消息存储（log broker）（负责维护”日志序列“）与“日志订阅者”。其中的“日志序列”记录了所有改变库表状态的操作，“日志订阅者”通过订阅日志序列更新本地数据，以只读副本的方式提供服务。 发布订阅机制还为系统在变更数据捕获（CDC）和全面的分布式部署方面的可扩展性提供了空间。

### 2.3 milvus主要组件

Milvus 支持两种部署模式，单机模式（standalone）和分布式模式（cluster）。两种模式具备完全相同的能力，用户可以根据数据规模、访问量等因素选择适合自己的模式。Standalone 模式部署的 Milvus 暂时不支持在线升级为 cluster 模式。

#### **2.3.1 单机版 Milvus**

单机版 Milvus包括三个组件：

*   **Milvus** 负责提供系统的核心功能。
*   **etcd** 是元数据引擎，用于管理 Milvus 内部组件的元数据访问和存储，例如：proxy、index node 等。
*   **MinIO** 是存储引擎，负责维护 Milvus 的数据持久化。

![](%E5%9B%BE%E7%89%87/milvus-standalone.png)

#### **2.3.2 分布式版 Milvus**

分布式版 Milvus 由八个微服务组件和三个第三方依赖组成，每个微服务组件可使用 Kubernetes 独立部署。

**微服务组件**

*   Root coord
*   Proxy
*   Query coord
*   Query node
*   Index coord
*   Index node
*   Data coord
*   Data node

**第三方依赖**

*   **etcd** 负责存储集群中各组件的元数据信息。
*   **MinIO** 负责处理集群中大型文件的数据持久化，如索引文件和全二进制日志文件。
*   **Pulsar** 负责管理近期更改操作的日志，输出流式日志及提供日志订阅服务。

![](%E5%9B%BE%E7%89%87/Milvus-Distributed.png)

###  2.4 Milvus应用场景

使用Milvus向量数据库，可以快速搭建符合自己场景需求的向量相似度检索系统。Milvus 的使用场景如下所示：

*   图片检索系统：以图搜图，从海量数据库中即时返回与上传图片最相似的图片。
*   视频检索系统：将视频关键帧转化为向量并插入 Milvus，便可检索相似视频，或进行实时视频推荐。
*   音频检索系统：快速检索海量演讲、音乐、音效等音频数据，并返回相似音频。
*   分子式检索系统：超高速检索相似化学分子结构、超结构、子结构。
*   推荐系统：根据用户行为及需求推荐相关信息或商品。
*   智能问答机器人：交互式智能问答机器人可自动为用户答疑解惑。
*   DNA序列分类系统：通过对比相似 DNA 序列，仅需几毫秒便可精确对基因进行分类。
*   文本搜索引擎：帮助用户从文本数据库中通过关键词搜索所需信息。

三、Milvus部署及使用
-------------

```
官方文档：https://milvus.io/docs/zh/install-overview.md
```

### 3.1 Milvus安装

#### 3.1.1 Milvus Standalone部署

```
wget https://github.com/milvus-io/milvus/releases/download/v2.2.13/milvus-standalone-docker-compose.yml -O docker-compose.yml
 
sudo docker-compose up -d
 
sudo docker-compose ps
```

通过命令查看显示信息如下：

```
      Name                     Command                  State                            Ports
--------------------------------------------------------------------------------------------------------------------
milvus-etcd         etcd -advertise-client-url ...   Up             2379/tcp, 2380/tcp
milvus-minio        /usr/bin/docker-entrypoint ...   Up (healthy)   9000/tcp
milvus-standalone   /tini -- milvus run standalone   Up             0.0.0.0:19530->19530/tcp, 0.0.0.0:9091->9091/tcp
```

 验证连接：

```
docker port milvus-standalone 19530/tcp
```

停止Milvus

```
sudo docker-compose down
```

停止后删除数据

```
sudo rm -rf  volumes
```

#### 3.1.2 Milvus Distributed部署

```
helm chart离线包：https://github.com/zilliztech/milvus-helm
```

**前提条件**

- [安装 Helm CLI](https://helm.sh/docs/intro/install/)。

- [创建 K8s 集群](https://milvus.io/docs/zh/prerequisite-helm.md#How-can-I-start-a-K8s-cluster-locally-for-test-purposes)。

- 安装[StorageClass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/)。您可以按以下步骤检查已安装的 StorageClass。

  ```
  kubectl get sc
  
  NAME                  PROVISIONER                  RECLAIMPOLICY    VOLUMEBIINDINGMODE    ALLOWVOLUMEEXPANSION     AGE
  standard (default)    k8s.io/minikube-hostpath     Delete           Immediate             false 
  ```

**安装 Milvus Helm 图表**

在安装 Milvus Helm 图表之前，您需要添加 Milvus Helm 资源库

```
helm repo add zilliztech https://zilliztech.github.io/milvus-helm/
```

然后按如下方法从版本库中获取 Milvus 图表：

```
helm repo update
```

**在线安装**

```
若milvus集群无法自动使用默认sc,需要在values.yaml中手动配置storageClass: ALLOWVOLUMEEXPANSION
```

##### 1. 部署 Milvus 集群

**单节点部署 Milvus :**

```
helm install my-release zilliztech/milvus \
  --set image.all.tag=v2.6.4 \
  --set cluster.enabled=false \
  --set pulsarv3.enabled=false \
  --set standalone.messageQueue=woodpecker \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true
```

**注意**：独立模式使用 Woodpecker 作为默认消息队列，并启用流节点组件。有关详情，请参阅[架构概述](https://milvus.io/docs/zh/architecture_overview.md)和[使用 Woodpecker](https://milvus.io/docs/zh/use-woodpecker.md)

**部署 Milvus 集群：**

```
helm install my-release zilliztech/milvus \
  --set image.all.tag=v2.6.4 \
  --set pulsarv3.enabled=false \
  --set woodpecker.enabled=true \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
```

此命令的作用：

```
使用Woodpecker作为消息队列（建议使用，以减少维护工作）
启用新的流节点组件以提高性能
禁用传统的索引节点（其功能现在由数据节点处理）
禁用 Pulsar，改用 Woodpecker
```

**其他消息队列选项：**

使用Pulsar（传统选择）而不是 Woodpecker：

```
helm install my-release zilliztech/milvus \
  --set image.all.tag=v2.6.4 \
  --set streaming.enabled=true \
  --set indexNode.enabled=false
```

**下一步：**上述命令以推荐配置部署 Milvus。用于生产：

- 使用[Milvus 大小工具](https://milvus.io/tools/sizing)，根据数据大小优化设置
- 查看[Milvus 系统配置清单](https://milvus.io/docs/system_configuration.md)，了解高级配置选项

##### 2. 检查 Milvus 群集状态

通过检查 pod 状态验证部署是否成功：

```
kubectl get pods
```

**等待所有 pod 显示 "正在运行 "状态。**在 v2.6.4 配置下，您应该能看到类似以下的 pod：

```
NAME                                             READY  STATUS   RESTARTS  AGE
my-release-etcd-0                                1/1    Running   0        3m23s
my-release-etcd-1                                1/1    Running   0        3m23s
my-release-etcd-2                                1/1    Running   0        3m23s
my-release-milvus-datanode-68cb87dcbd-4khpm      1/1    Running   0        3m23s
my-release-milvus-mixcoord-7fb9488465-dmbbj      1/1    Running   0        3m23s
my-release-milvus-proxy-6bd7f5587-ds2xv          1/1    Running   0        3m24s
my-release-milvus-querynode-5cd8fff495-k6gtg     1/1    Running   0        3m24s
my-release-milvus-streaming-node-xxxxxxxxx       1/1    Running   0        3m24s
my-release-minio-0                               1/1    Running   0        3m23s
my-release-minio-1                               1/1    Running   0        3m23s
my-release-minio-2                               1/1    Running   0        3m23s
my-release-minio-3                               1/1    Running   0        3m23s
my-release-pulsar-autorecovery-86f5dbdf77-lchpc  1/1    Running   0        3m24s
my-release-pulsar-bookkeeper-0                   1/1    Running   0        3m23s
my-release-pulsar-bookkeeper-1                   1/1    Running   0        98s
my-release-pulsar-broker-556ff89d4c-2m29m        1/1    Running   0        3m23s
my-release-pulsar-proxy-6fbd75db75-nhg4v         1/1    Running   0        3m23s
my-release-pulsar-zookeeper-0                    1/1    Running   0        3m23s
my-release-pulsar-zookeeper-metadata-98zbr       0/1   Completed  0        3m24s
```

**需要验证的关键组件：**

- **Milvus 组件**：`mixcoord`,`datanode`,`querynode`,`proxy` 、`streaming-node`
- **依赖关系**：`etcd` （元数据）、`minio` （对象存储）、`pulsar` （消息队列）

端口转发设置完成后，还可以通过`http://127.0.0.1:9091/webui/` 访问**Milvus WebUI**（见下一步）。详情请参阅[Milvus WebUI](https://milvus.io/docs/zh/milvus-webui.md)。

##### 3.  连接到 Milvus

要从 Kubernetes 外部连接到 Milvus 集群，需要设置端口转发。

**设置端口转发：**

```
kubectl port-forward service/my-release-milvus 27017:19530

#监听所有接口：添加--address 0.0.0.0 以允许来自其他机器的连接
kubectl port-forward --address 0.0.0.0 service/my-release-milvus 27017:19530
```

此命令会将本地端口`27017` 转发到 Milvus 端口`19530` 。你应该看到

```
Forwarding from 127.0.0.1:27017 -> 19530
```

##### 4. 更新 Milvus 配置

通过编辑`values.yaml` 文件并再次应用来更新 Milvus 集群的配置。

创建一个包含所需配置的`values.yaml` 文件。

以下假设您要启用`proxy.http` 。

```
extraConfigFiles:
  user.yaml: |+
    proxy:
      http:
        enabled: true
```

启用用户权限管理

```
extraConfigFiles:
  user.yaml: |+
    common:
      security:
        authorizationEnabled: true
```

有关适用的配置项，请参阅[系统配置](https://milvus.io/docs/zh/system_configuration.md)。

应用`values.yaml` 文件

```
helm upgrade my-release zilliztech/milvus --namespace my-namespace -f values.yaml
```

检查更新的配置

```
helm get values my-release
```

##### 5. 升级运行中的 Milvus 群集

```
helm repo update
helm upgrade my-release zilliztech/milvus --reset-then-reuse-values
```

### 3.2 Milvus可视化工具Attu

Attu地址：[Attu](https://github.com/zilliztech/attu)

Milvus与Attu对应关系：

| Milvus Version | Recommended Attu Image Version |
| --- | --- |
| v2.0.x | v2.0.5 |
| v2.1.x | v2.1.5 |
| v2.2.x | v2.2.6 |

执行命令：

```
docker run -p 8000:3000  -e MILVUS_URL={your machine IP}:19530 zilliz/attu:v2.2.6
```

启动docker后，在浏览器中访问“http://{your machine IP}:8000”，点击“**Connect**”进入Attu服务。连接方式用户名和密码。 

![](%E5%9B%BE%E7%89%87/attu01.png)

 连接connect后，显示如下：![](%E5%9B%BE%E7%89%87/attu02.png)

### 3.3 通过python使用Milvus

安装pymilvus

```python
pip install pymilvus==2.2.15
```

#### 3.3.1 创建数据库

```python
from pymilvus import connections, db
 
conn = connections.connect(host="192.168.1.156", port=19530)
database = db.create_database("sample_db")
```

切换和显示db

```python
db.using_database("sample_db")db.list_database()
```

#### 3.3.2 创建collection

```python
from pymilvus import CollectionSchema, FieldSchema, DataType
from pymilvus import Collection, db, connections
 
conn = connections.connect(host="192.168.1.156", port=19530)
db.using_database("sample_db")
 
m_id = FieldSchema(name="m_id", dtype=DataType.INT64, is_primary=True,)
embeding = FieldSchema(name="embeding", dtype=DataType.FLOAT_VECTOR, dim=768,)
count = FieldSchema(name="count", dtype=DataType.INT64,)
desc = FieldSchema(name="desc", dtype=DataType.VARCHAR, max_length=256,)
schema = CollectionSchema(
  fields=[m_id, embeding, desc, count],
  description="Test embeding search",
  enable_dynamic_field=True
)
 
collection_name = "word_vector"
collection = Collection(name=collection_name, schema=schema, using='default', shards_num=2)
```

通过Attu查看创建结果：

![](%E5%9B%BE%E7%89%87/attu03.png)

![](%E5%9B%BE%E7%89%87/attu06.png)

#### 3.3.3 创建索引

```python
from pymilvus import Collection, utility, connections, db
 
conn = connections.connect(host="192.168.1.156", port=19530)
db.using_database("sample_db")
 
index_params = {
  "metric_type": "IP",
  "index_type": "IVF_FLAT",
  "params": {"nlist": 1024}
}
 
collection = Collection("word_vector")
collection.create_index(
  field_name="embeding",
  index_params=index_params
)
 
utility.index_building_progress("word_vector")
```

 通过Attu查看结果：

![](%E5%9B%BE%E7%89%87/attu04.png)

 **索引方式：**

![](%E5%9B%BE%E7%89%87/milvus-index.png)

*    FLAT：准确率高， 适合数据量小，暴力求解相似。
*    IVF-FLAT：量化操作， 准确率和速度的平衡
*    IVF: inverted file 先对空间的点进行聚类，查询时先比较聚类中心距离，再找到最近的N个点。
*    IVF-SQ8：量化操作，disk cpu GPU 友好
*    SQ8：对向量做标量量化，浮点数表示转为int型表示，4字节->1字节。
*    IVF-PQ：快速，但是准确率降低，把向量切分成m段，对每段进行聚类；查询时，查询向量分端后与聚类中心计算距离，各段相加后即为最终距离。使用对称距离(聚类中心之前的距离)不需要计算直接查表，但是误差回更大一些。
*   HNSW：基于图的索引，高效搜索场景，构建多层的NSW。
*   ANNOY：基于树的索引，高召回率

#### 3.3.4 插入数据

```python
from pymilvus import Collection, db, connections
import numpy as np
 
conn = connections.connect(host="192.168.1.156", port=19530)
db.using_database("sample_db")
coll_name = 'word_vector'
 
mids, embedings, counts, descs = [], [], [], []
data_num = 100
for idx in range(0, data_num):
    mids.append(idx)
    embedings.append(np.random.normal(0, 0.1, 768).tolist())
    descs.append(f'random num {idx}')
    counts.append(idx)
 
collection = Collection(coll_name)
mr = collection.insert([mids, embedings, descs, counts])
print(mr)
```

运行结果：

```
(insert count: 100, delete count: 0, upsert count: 0, timestamp: 443639998144839682, success count: 100, err count: 0)
```

通过Attu查看：

![](%E5%9B%BE%E7%89%87/attu05.png)

#### 3.3.5 检索数据

```python
from pymilvus import Collection, db, connections
import numpy as np
 
conn = connections.connect(host="192.168.1.156", port=19530)
db.using_database("sample_db")
coll_name = 'word_vector'
 
search_params = {
    "metric_type": 'IP',
    "offset": 0,
    "ignore_growing": False,
    "params": {"nprobe": 16}
}
 
collection = Collection(coll_name)
collection.load()
 
results = collection.search(
    data=[np.random.normal(0, 0.1, 768).tolist()],
    anns_field="embeding",
    param=search_params,
    limit=16,
    expr=None,
    # output_fields=['m_id', 'embeding', 'desc', 'count'],
    output_fields=['m_id', 'desc', 'count'],
    consistency_level="Strong"
)
collection.release()
print(results[0].ids)
print(results[0].distances)
hit = results[0][0]
print(hit.entity.get('desc'))
print(results)
```

运行结果如下：

```
[0, 93, 77, 61, 64, 79, 22, 43, 25, 35, 83, 49, 51, 84, 75, 36]
[0.7047597169876099, 0.5948767066001892, 0.54373699426651, 0.5294350981712341, 0.5216281414031982, 0.5035749673843384, 0.41662347316741943, 0.4026581346988678, 0.40143388509750366, 0.3841533362865448, 0.371593713760376, 0.35352253913879395, 0.3377170264720917, 0.33591681718826294, 0.32786160707473755, 0.3214406967163086]
random num 0
['["id: 0, distance: 0.7047597169876099, entity: {\'m_id\': 0, \'desc\': \'random num 0\', \'count\': 0}", "id: 93, distance: 0.5948767066001892, entity: {\'m_id\': 93, \'desc\': \'random num 93\', \'count\': 93}", "id: 77, distance: 0.54373699426651, entity: {\'m_id\': 77, \'desc\': \'random num 77\', \'count\': 77}", "id: 61, distance: 0.5294350981712341, entity: {\'m_id\': 61, \'desc\': \'random num 61\', \'count\': 61}", "id: 64, distance: 0.5216281414031982, entity: {\'m_id\': 64, \'desc\': \'random num 64\', \'count\': 64}", "id: 79, distance: 0.5035749673843384, entity: {\'m_id\': 79, \'desc\': \'random num 79\', \'count\': 79}", "id: 22, distance: 0.41662347316741943, entity: {\'m_id\': 22, \'desc\': \'random num 22\', \'count\': 22}", "id: 43, distance: 0.4026581346988678, entity: {\'m_id\': 43, \'desc\': \'random num 43\', \'count\': 43}", "id: 25, distance: 0.40143388509750366, entity: {\'m_id\': 25, \'desc\': \'random num 25\', \'count\': 25}", "id: 35, distance: 0.3841533362865448, entity: {\'m_id\': 35, \'desc\': \'random num 35\', \'count\': 35}"]']
```

#### 3.3.6 删除数据

```python
from pymilvus import Collection, db, connections
 
conn = connections.connect(host="192.168.1.156", port=19530)
db.using_database("sample_db")
coll_name = 'word_vector'
 
collection = Collection(coll_name)
 
ids = [str(idx) for idx in range(10)]
temp_str = ', '.join(ids)
query_expr = f'm_id in [{temp_str}]'
result = collection.delete(query_expr)
 
print(result)
```

运行结果显示：

```
(insert count: 0, delete count: 10, upsert count: 0, timestamp: 443640854673883146, success count: 0, err count: 0)
```

为了检索提供性能，Milvus 中引入 bitset，当调用删除数据时，Milvus对数据进行软删除。软删除的向量仍然存在于数据库中，但在向量相似性搜索或查询期间不会被计算。位集中的每个位对应于一个索引向量。如果一个向量在位集中被标记为 `1`，则意味着该向量被软删除，并且在向量搜索期间不会涉及该向量。 

### 3.4 Milvus 备份

**部署环境**

*   **Milvus 版本**：2.5.14
*   **部署方式**：Helm on Kubernetes
*   **存储**：外部 S3（MinIO 兼容）
*   **S3 地址**：`10.130.135.145:9000`
*   **S3 Bucket**：`milvus-data`
*   **S3 AccessKey / SecretKey**：已用 `*` 号替换

#### **3.4.1 安装 milvus-backup 工具**

下载最新版 v0.5.7：

```
wget https://github.com/zilliztech/milvus-backup/releases/download/v0.5.7/milvus-backup_Linux_x86_64.tar.gztar -xzf milvus-backup_Linux_x86_64.tar.gzchmod +x milvus-backupmv milvus-backup /usr/local/bin/
```

* * *

#### **3.4.2 确认 Milvus 服务信息**

查看 Kubernetes Service：

```
kubectl get svc -n milvus
```

输出：

```
NAME     TYPE       CLUSTER-IP      PORT(S)
milvus   ClusterIP  10.233.48.134   19530/TCP,9091/TCP
```

*   19530 → gRPC客户端连接

*   9091 → HTTP API（gcPause 功能）

如果在集群内部运行 `milvus-backup`，可直接用 `10.233.48.134`；  
如果在集群外运行，需要 `kubectl port-forward`：

```
kubectl port-forward svc/milvus 19530:19530 9091:9091 -n milvus
```

* * *

#### 3.4.3 编写 backup.yaml 配置

这是 **v0.5.7** 必须遵守的完整配置格式，注意 `milvus.address` 和 `milvus.port` 分开写，日志配置必须包含 `log.file.rootPath`。

```
log:
  level: info
  console: true
  file:
    rootPath: "logs/backup.log"
 
http:
  simpleResponse: true
 
milvus:
  address: 10.233.48.134
  port: 19530
  user: ""
  password: ""
  tlsMode: 0
  rpcChannelName: "by-dev-replicate-msg"
 
minio:
  storageType: "minio"
  address: 10.130.135.145
  port: 9000
  accessKeyID: "FGNB*****"
  secretAccessKey: "9VtCpfoO*****"
  bucketName: "milvus-data"
  rootPath: "files"
 
  backupStorageType: "minio"
  backupAddress: 10.130.135.145
  backupPort: 9000
  backupAccessKeyID: "FGNB*****"
  backupSecretAccessKey: "9VtCpfoO*****"
  backupBucketName: "milvus-data"
  backupRootPath: "backup"
  backupUseSSL: false
  crossStorage: "false"
 
backup:
  maxSegmentGroupSize: 2G
  parallelism:
    backupCollection: 4
    copydata: 128
    restoreCollection: 2
    importJobNum: 768
  gcPause:
    enable: true
    address: http://10.233.48.134:9091
```

* * *

#### **3.4.4 执行备份**

创建备份：

```
milvus-backup create --config backup.yaml --set BACKUP_NAME=backup_$(date +%Y%m%d_%H%M%S)
```

恢复备份：

```
milvus-backup restore --config backup.yaml --set BACKUP_NAME=backup_20250723_153000
```

列出备份：

```
milvus-backup list --config backup.yaml
```

删除备份：

```
milvus-backup delete --config backup.yaml --set BACKUP_NAME=backup_20250723_153000
```

* * *

#### **3.4.5 遇到的问题及解决方案**

(1) `invalid key: log.file.rootpath`

*   原因：配置文件缺少或拼写错误 `log.file.rootPath`

*   解决：必须写 `rootPath`，且区分大小写

(2) `invalid key: milvus.port` 或 `milvus.address`

*   原因：配置字段不能写成 `host:port`，必须拆分为 `address` 和 `port` 两个字段

*   解决：按官方示例写 `address: 10.233.48.134` 和 `port: 19530`

(3) 备份只有 meta 文件

*   检查 `utility.list_collections()` 和 `Collection.num_entities`，发现数据量只有 0 或 1

*   原因：Milvus 备份实际数据段（segment），数据过少时只备份 meta

*   解决：确认数据写入流程，或手动调用 `flush()` 生成 segment 后再备份

(4) `gcPause.address` 配置错误

*   需要指向暴露 9091 的 Milvus 服务
*   在集群内使用 `ClusterIP:9091`，外部使用 `port-forward 127.0.0.1:9091`

#### **3.4.6 数据验证**

在 Python 中使用 `pymilvus` 检查数据：

```python
from pymilvus import connections, utility, Collection
 
connections.connect("default", host="10.233.48.134", port="19530")
 
# 列出所有集合
collections = utility.list_collections()
for name in collections:
    c = Collection(name)
    print(f"{name}: {c.num_entities} entities")
```

#### **3.4.7 总结**

*   **配置文件格式变化**（v0.5.x 必须用 address/port 分离格式）

*   **日志配置必须显式声明**

*   **对象存储参数必须与 Milvus 配置一致**

*   **数据未 flush 只备份 meta**