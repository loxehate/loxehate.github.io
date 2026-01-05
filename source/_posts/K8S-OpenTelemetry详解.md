---
title: K8S-OpenTelemetry详解
tags: [kubernetes,OpenTelemetry]
categories: [监控观测]
date: 2026-01-05
---
一、可观测性
----

### 1、什么是可观测性

可观察性（Observability）是从外部输出知识中推断所获得，可理解为衡量一个系统内部状态的方法。可观测性是一种能力，它能帮助你回答系统内部发生了什么——无需事先定义每种可能的故障或状态。系统的可观测性越高，就可以根据已识别的性能问题更快速、更准确地定位到其根本原因，而无需进行额外的测试或编码。

举个例子，水处理厂的操作员如果无法看到水管的内部状况，就无法监测到水的正常流动，流动的方式，以及水质的干净程度。但在管道内可以添加可观察性的工具——流量计和传感器后，状况就截然不同，这些工具将通过遥测连接到仪表板，帮助操作员能够完全掌握管道中水流的情况，并及时根据状况进行调整，大大提高了工作效率。

可观测性是应用程序性能监控 (APM)和网络性能管理 (NPM)数据收集方法的自然演变，它能更好地适应云原生应用程序部署日益加快、分布式和动态的本质。可观测性并不会取代监控，但可以完善监控以及 APM 和 NPM。

### 2、为什么需要可观测性

现如今，企业正在迅速采用现代化开发实践。这包括敏捷开发、持续集成和持续部署 (CI/CD)、DevOps、多种编程语言。

企业也在采用云原生技术，如微服务、Docker 容器、Kubernetes。因此，这些企业正以前所未有的速度将更多服务推向市场。但在此过程中，他们也在部署新的应用程序组件，每种服务使用不同的语言开发、在 Kubernetes + 微服务 + 异步消息 的架构中，应用之间的调用变得极其复杂。传统方式很难排查问题。比如：

*   一个订单失败，到底是前端？中间件？后端？哪个组件异常？
*   日志查不出东西，但用户反馈就是卡顿；
*   应用指标显示正常，但系统无相应或超时。

这时候，“可观测性”能帮助你，它可以针对每个应用程序用户的请求或事务创建高精确度、上下文丰富且完全相关的记录。

快速定位问题：

Trace + Log 可以告诉你：“哪个服务、哪一段代码、哪一次请求出了问题”。

主动发现异常：

Metric + 告警可以告诉你：“服务 QPS 降低了、错误率升高了”，即使你没看到用户投诉。

### 3、可观测性如何工作

可观测性平台通过集成应用程序和基础架构组件内置的现有检测功能，并提供各种工具来为这些组件添加检测功能，以便持续发现和收集性能遥测数据。 可观测性包含三大核心数据支柱。

| 类型 | 描述 | 举例 |
| --- | --- | --- |
| Logs 日志 | 记录事件的时间线信息，常用于故障排查 | `ERROR: failed to connect to DB` |
| Metrics 指标 | 数值型数据，便于聚合、报警和绘图 | `CPU usage 85%`, `request_count=1000` |
| Traces 链路追踪 | 展现请求如何在系统中流转 | `请求从 API 网关 → 订单服务 → 库存服务` |

### 4、可观测性的优势

#### 1.1 快速定位问题（故障排查更高效）

*   能清楚看到请求从入口到各个服务的调用路径（Trace）。
*   能查看每一步的耗时、错误详情。
*   再也不用靠“猜”+ grep 日志找问题。

#### 1.2 系统运行状态全面透明（从黑盒变成玻璃盒）

*   CPU、内存只是基础指标，可观测性能告诉你：
    *   访问量波动
    *   请求成功率、错误率
    *   每个组件的性能表现
*   支持黑盒 + 白盒监控，多维度了解系统状态。

#### 1.3 异常发现更及时（主动报警）

*   使用 Metrics + Alerts，可以在问题刚发生时自动通知你，而不是等用户投诉。
*   可设定阈值规则，如：
    *   错误率 > 1%
    *   响应时间 > 1s
    *   QPS 突降

#### 1.4 更好地理解系统行为（观测而非盲猜）

*   看到应用之间真实交互的链路图。
*   发现一些你“以为不会调用”的组件其实被调用了。
*   理解系统运行模式，帮助架构优化。

#### 1.5 性能优化的依据

*   找出慢接口、慢 SQL、瓶颈节点。
*   基于数据调整服务部署、限流策略或数据库索引。

#### 1.6 提高团队协作效率

*   开发、测试、运维、SRE 团队有统一的数据源。
*   不同角色可以快速对齐问题来源与解决路径。

#### 1.7 提升系统稳定性与用户体验

*   可观测性让你提前发现潜在问题（比如内存泄漏、连接池耗尽）；
*   系统出问题能快速恢复，用户影响最小化。

二、链路追踪
----

### 1、什么是链路追踪

链路追踪是分布式系统下的一个概念，它是将一次分布式请求还原成调用链路，将一次分布式请求的调用情况集中展示，比如，各个服务节点上的耗时、请求具体到达哪台机器上、每个服务节点的请求状态等等。

想象一下，你点了一个外卖（发起了请求），但外卖迟迟没送到（请求响应慢），你想知道：

1.  餐馆什么时候开始做的？
2.  骑手什么时候接的单？
3.  途中有没有绕路？堵车？
4.  是哪一环节慢了？

链路追踪就像是在每一环节都装了摄像头，并记录时间、状态、异常等，最终汇总成一条完整的调用链路图。

### 2、链路追踪核心概念

Trace： 表示“一次完整的请求路径”，从用户发起请求到最终响应的全流程。（比如一个订单请求， 每个 Trace 有一个唯一的 Trace ID）

Span：Trace 中的每一步操作（比如调用了哪个服务、哪个方法）

Parent-Child： Span 之间通过父子关系构成树形结构。 （父子关系）

Context： 是 Trace 信息的“载体”，用于在服务间传递追踪信息（HTTP Header）

![](%E5%9B%BE%E7%89%87/trace.png)

### 3、如何实现链路追踪

1.  埋点 
    应用代码中集成 OpenTelemetry SDK / Jaeger SDK / Zipkin SDK，或者使用 Agent 自动注入。
2.  传递 + 收集 
    把 TraceID 等信息通过 HTTP Header / gRPC Metadata 等方式传递给下游服务。
3.  存储 + 展示 
    用 OpenTelemetry Collector / Tempo 等组件采集并转发 trace 数据，再用 Jaeger / Grafana 展示。

### 4、常见链路追踪方案

| 方案 | 优点 | 缺点 | 适用场景 |
| --- | --- | --- | --- |
| Jaeger | CNCF 项目，社区活跃 支持 OpenTelemetry UI 直观、部署灵活 | 存储依赖较多（Elasticsearch/Clickhouse） UI 功能相对基础 | 中大型微服务系统 希望使用标准化工具链 |
| Zipkin | 启动快，轻量 组件少，易部署 支持多语言客户端 | 功能相对简单 与 OpenTelemetry 集成不如 Jaeger 完善 | 资源受限的环境 适合入门 |
| SkyWalking | 支持 APM（性能监控）+ Trace 一体 对 Java 支持极好（Agent 模式） 支持链路拓扑图 | 复杂度较高，学习成本较大 资源占用相对高 | Java 系统为主的企业系统 需要拓扑可视化 |
| OpenTelemetry + Collector + Jaeger/Tempo/Elastic APM | 灵活的标准化协议 多语言支持好 可自定义处理流程（Pipeline） | 配置较复杂，需要搭配 Collector 使用 学习成本较高 | 新系统从零建设可观测性 统一采集链路+日志+指标 |
| Tempo (Grafana Labs) | 支持与 Loki、Prometheus 集成 存储成本低（对象存储） 支持 OpenTelemetry | UI 功能依赖 Grafana 查询需结合 Logs/Metric 联动 | 已使用 Grafana Stack 的团队 关注成本控制和联动分析 |
| Elastic APM | 与 ELK 集成方便 提供自动化探针（Java、Node.js 等） 强大的查询分析能力 | 依赖 Elastic Stack 免费功能有限制（X-Pack） | 已使用 ELK 的团队 希望用一体化可观测方案 |

三、OpenTelemetry 介绍
----------------

### 1、OpenTelemetry 是什么

OpenTelemetry (OTel) 是一个开源可观测性框架，为我们提供了一个与供应商无关的可观测性标准，该框架由 CNCF（云原生计算基金会）托管的开源可观测性框架，用于采集、处理和导出应用的 Trace（链路追踪）、Metrics（指标）、Logs（日志） 三大核心可观测性数据。

OpenTelemetry不是像Jaeger、Prometheus或商业供应商那样的观测性后端。OpenTelemetry关注于追踪数据的生成、收集、管理和导出。存储和可视化数据留给其他工具。

### 2、OpenTelemetry 优点

传统可观测性方案的问题：

*   各家标准不统一（Prometheus、Jaeger、Zipkin、ELK 各搞各的），后期更换组件成本巨大。
*   SDK 难以复用，语言多了埋点就变得混乱
*   很多工具不支持日志 + 指标 + 链路统一分析

![](%E5%9B%BE%E7%89%87/%E4%BC%A0%E7%BB%9F%E5%8F%AF%E8%A7%82%E6%B5%8B%E6%80%A7%E6%96%B9%E6%A1%88.png)

OpenTelemetry 的优势是：

*   用一个统一协议打通链路、指标、日志三者
*   支持多语言自动埋点
*   和 Prometheus/Grafana/Jaeger 无缝对接

![](%E5%9B%BE%E7%89%87/OpenTelemetry%E6%96%B9%E6%A1%88.png)

### 3、OpenTelemetry 组件架构

![](%E5%9B%BE%E7%89%87/OpenTelemetry%E7%BB%84%E4%BB%B6%E6%9E%B6%E6%9E%84.png)

| 组件 | 说明 |
| --- | --- |
| API & SDK | 提供各语言（Go、Java、Python、Node.js 等）的统一接口和实现，供开发者在应用中埋点 |
| Instrumentation | 自动或手动的代码埋点方式，用于生成 Trace、Metric 数据 |
| Collector | 一个独立服务，接收应用数据，进行处理（过滤/增强/聚合）后导出到后端系统（Jaeger、Tempo 等） |
| Exporter | Collector 的插件或 SDK 端模块，将数据导出到目标后端存储或 APM 工具 |
| Protocol（OTLP） | 标准数据格式（OTel Protocol），支持 HTTP/gRPC 传输，统一 Trace、Metrics、Logs |

### 4、OTLP协议

OpenTelemetry 协议（OTLP）规范描述了遥测数据在遥测源、收集器和遥测后端之间的编码、传输和传递机制。

每种语言的 SDK 都提供了一个 OTLP 导出器，可以配置该导出器来通过 OTLP 导出数据。然后，OpenTelemetry SDK 会将事件转换为 OTLP 数据。

OTLP 是代理（配置为导出器）和收集器（配置为接收器）之间的通信。

### 5、Collector

收集器（Collector）是 OpenTelemetry 的一个组件，它接收遥测数据（span、metrics、logs 等），处理（预处理数据）并导出数据（将其发送到想要的通信后端）。

![](%E5%9B%BE%E7%89%87/Collector.png)

**接收器（Receiver）**

收集器可以被配置为从各种来源接收各种格式的遥测数据。一旦接收到，所有这些数据都会被转换为 OTLP。OpenTelemetry 同时支持基于推和拉的接收器。

**处理器（Processor）**

一旦接收器将遥测数据转换为 OTLP，就会有各种处理器可用。处理器可以被配置为执行各种任务。

*   清洗数据以删除敏感数据，如 PII（个人身份信息）。
*   数据规范化，例如将数据源的旧版本转换为与当前后台使用的仪表盘和查询相匹配的版本。
*   根据某些属性将数据路由到特定的后端。例如，将与欧盟用户有关的数据存储在欧盟境内托管的存储系统上。
*   基于尾部的采样，以帮助确保错误和异常值更有可能被捕获，同时对嘈杂和无趣的信息进行速率限制。

**导出器（Exporter）**

一旦遥测数据被处理，它可以被输出到各种后端，OTLP 可以被转换为目前流行的系统所支持的许多格式。

除了将遥测数据转换为单一格式外，还可以安装多个导出器。遥测数据可以按类型分开，并发送到不同的后端。例如，将追踪数据发送到 Jaeger，将度量数据发送到 Prometheus。

**管道（Pipeline）**

收集器允许接收器、处理器和导出器组合成复杂的管道（pipeline），可以同时运行。

### 6、skywalking 对比

OpenTelemetry和Skywalking都是用于应用程序性能监控和分布式追踪的工具，但它们之间有一些区别：

1.  开源社区支持：OpenTelemetry是由云原生计算基金会（CNCF）支持的开源项目，而Skywalking是Apache软件基金会的顶级项目。
2.  语言支持：OpenTelemetry支持多种编程语言，包括Java、Python、Go等，而Skywalking主要支持Java和.NET。
3.  数据采集方式：OpenTelemetry通过标准的API和插件机制来收集数据，而Skywalking采用Agent的方式来收集数据。
4.  生态系统：OpenTelemetry有一个庞大的生态系统，包括多个厂商和社区的支持，可以方便地集成各种监控工具和服务。而Skywalking的生态系统相对较小，支持的插件和集成相对有限。

总的来说，OpenTelemetry是一个更加通用、灵活和开放的监控和追踪工具，适用于各种不同场景和环境。而Skywalking更专注于Java和.NET应用程序的监控和追踪，可以提供更深度的性能分析和优化。选择哪个工具取决于具体的需求和使用场景。

## 四、OpenTelemetry 部署模式

```
文档参考：https://flashcat.cloud/blog/opentelemetry-demo-step-by-step/
```

OpenTelemetry Collector 按部署方式分为 Agent 和Gateway 模式。

### 1、Agent 模式

在 Agent 模式下，OpenTelemetry 检测的应用程序将数据发送到与应用程序一起驻留的（收集器）代理。然后，该代理程序将接管并处理所有来自应用程序的追踪数据。

收集器可以通过 sidecar 方式部署为代理，sidecar 可以配置为直接将数据发送到存储后端。

![img](%E5%9B%BE%E7%89%87/OpenTelemetry-agent.png)

### 2、Gateway 模式

![img](%E5%9B%BE%E7%89%87/OpenTelemetry-gateway.png)

发送遥测数据最佳实践是将数据发送到OpenTelemetry Collector而不是直接发送到后端。Collector可以帮助简化密钥管理，将数据导出与应用程序解耦，并允许您在遥测数据中添加其他数据。

### 3、部署 OpenTelemetry

建议使用 OpenTelemetry Operator 来部署，因为它可以帮助我们轻松部署和管理 OpenTelemetry 收集器，还可以自动检测应用程序。

```
官方文档：https://opentelemetry.io/docs/platforms/kubernetes/operator/
```

#### 3.1 部署cert-manager

因为 Operator 使用了 Admission Webhook 通过 HTTP 回调机制对资源进行校验/修改。Kubernetes 要求 Webhook 服务必须使用 TLS，因此 Operator 需要为其 webhook server 签发证书，所以需要先安装cert-manager。

```
# wget https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
# kubectl apply -f cert-manager.yaml
# kubectl get pod -n cert-manager
NAME                                       READY   STATUS    RESTARTS   AGE
cert-manager-5577849d6c-kwg7f              1/1     Running   0          3m18s
cert-manager-cainjector-5755f77bbb-knlm2   1/1     Running   0          3m18s
cert-manager-webhook-b78d65b96-vpvrn       1/1     Running   0          3m18s
```

#### 3.2 部署Operator

在 Kubernetes 上使用 OpenTelemetry，主要就是部署 OpenTelemetry 收集器。

```
# wget https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
# kubectl apply -f opentelemetry-operator.yaml
# kubectl get pod -n opentelemetry-operator-system 
NAME                                                         READY   STATUS    RESTARTS   AGE
opentelemetry-operator-controller-manager-6d94c5db75-cz957   2/2     Running   0          74s
# kubectl get crd |grep opentelemetry
instrumentations.opentelemetry.io           2025-04-21T09:48:53Z
opampbridges.opentelemetry.io               2025-04-21T09:48:54Z
opentelemetrycollectors.opentelemetry.io    2025-04-21T09:48:54Z
targetallocators.opentelemetry.io           2025-04-21T09:48:54Z
```

#### 3.3 部署Collector(中心)

接下来我们部署一个精简版的 OpenTelemetry Collector，用于接收 OTLP 格式的 trace 数据，通过 gRPC 或 HTTP 协议接入，经过内存控制与批处理后，打印到日志中以供调试使用。

```
# cat center-collector.yaml              
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
# 元数据定义部分
metadata:
  name: center        # Collector 的名称为 center
  namespace: opentelemetry
# 具体的配置内容
spec:
  replicas: 1           # 设置副本数量为1
  config:               # 定义 Collector 配置
    receivers:          # 接收器，用于接收遥测数据（如 trace、metrics、logs）
      otlp:             # 配置 OTLP（OpenTelemetry Protocol）接收器
        protocols:      # 启用哪些协议来接收数据
          grpc: 
            endpoint: 0.0.0.0:4317      # 启用 gRPC 协议
          http: 
            endpoint: 0.0.0.0:4318      # 启用 HTTP 协议

    processors:         # 处理器，用于处理收集到的数据
      batch: {}         # 批处理器，用于将数据分批发送，提高效率

    exporters:          # 导出器，用于将处理后的数据发送到后端系统
      debug: {}         # 使用 debug 导出器，将数据打印到终端（通常用于测试或调试）

    service:            # 服务配置部分
      pipelines:        # 定义处理管道
        traces:         # 定义 trace 类型的管道
          receivers: [otlp]                      # 接收器为 OTLP
          processors: [batch]                    # 使用批处理器
          exporters: [debug]                     # 将数据打印到终端

# kubectl apply -f center-collector.yaml 
opentelemetrycollector.opentelemetry.io/center created

# kubectl get pod -n opentelemetry
NAME                                READY   STATUS    RESTARTS      AGE
center-collector-5c5987f4ff-zwqbk   1/1     Running   0             9s

# kubectl get svc -n opentelemetry  
NAME                          TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                       AGE
center-collector              ClusterIP   10.109.226.90    <none>        4317/TCP,4318/TCP             22s
center-collector-headless     ClusterIP   None             <none>        4317/TCP,4318/TCP             22s
center-collector-monitoring   ClusterIP   10.110.106.116   <none>        8888/TCP                      22s
```

#### 3.4 部署Collector(代理)

我们使用 Sidecar 模式部署 OpenTelemetry 代理。该代理会将应用程序的追踪发送到我们刚刚部署的中心OpenTelemetry 收集器。

```
# cat sidecar-collector.yaml 
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector          # 定义资源类型为 OpenTelemetryCollector
metadata:
  name: sidecar                       # Collector 的名称
  namespace: opentelemetry
spec:
  mode: sidecar                       # 以 sidecar 模式运行（与应用容器同 Pod）
  config:                             # Collector 配置部分（结构化 YAML）
    receivers:
      otlp:                           # 使用 OTLP 协议作为接收器
        protocols:
          grpc: 
            endpoint: 0.0.0.0:4317      # 启用 gRPC 协议
          http: 
            endpoint: 0.0.0.0:4318      # 启用 HTTP 协议
    processors:
      batch: {}                       # 使用 batch 处理器将数据批量发送，提高性能

    exporters:
      debug: {}                       # 将数据输出到 stdout 日志（用于调试）
      otlp:                           # 添加一个 OTLP 类型导出器，发送到 central collector
        endpoint: "center-collector.opentelemetry.svc:4317"  # 替换为 central collector 的地址
        tls:
          insecure: true              # 不使用 TLS

    service:
      telemetry:
        logs:
          level: "debug"              # 设置 Collector 自身日志等级为 debug（方便观察日志）

      pipelines:
        traces:                       # 定义 trace 数据处理流水线
          receivers: [otlp]           # 从 otlp 接收 trace 数据
          processors: [batch]         # 使用批处理器
          exporters: [debug, otlp]    # 同时导出到 debug（日志）和 otlp（中心 Collector）
          
# kubectl apply -f sidecar-collector.yaml                
opentelemetrycollector.opentelemetry.io/sidecar created

# kubectl get opentelemetrycollectors -n opentelemetry   
NAME      MODE         VERSION   READY   AGE   IMAGE                                                                                     MANAGEMENT
center    deployment   0.123.1   1/1     10m   ghcr.io/open-telemetry/opentelemetry-collector-releases/opentelemetry-collector:0.123.1   managed
sidecar   sidecar      0.123.1           11s                                                                                             managed

# kubectl get pod -n opentelemetry                    
NAME                                READY   STATUS    RESTARTS      AGE
center-collector-5c5987f4ff-zwqbk   1/1     Running   0             10m
```

sidecar 代理依赖于应用程序启动，因此现在创建后并不会立即启动，需要我们创建一个应用程序并使用这个 sidecar 模式的 collector。

## 五、应用埋点(Instrumentation)

```
官方文档：https://opentelemetry.opendocs.io/docs/getting-started/dev/
```

### 1、埋点

#### 1.1 什么是埋点

埋点，本质就是在你的应用程序里，在重要位置插入采集代码，比如：

- 收集请求开始和结束的时间
- 收集数据库查询时间
- 收集函数调用链路信息
- 收集异常信息

这些埋点数据（Trace、Metrics、Logs）被收集起来后，可以在监控平台看到系统运行时的真实表现，帮助你做：

- 性能分析
- 故障排查
- 调用链路追踪

简单说就是：“在合适的地方插追踪/监控代码”。

#### 1.2 自动埋点

使用自动埋点是一个很好的方式，因为它简单、容易，不需要进行很多代码更改。

如果你没有必要的知识（或时间）来创建适合你应用程序量身的追踪代码，那么这种方法就非常合适。

OpenTelemetry 支持自动化埋点的语言：

- .net
- Java
- JavaScript
- PHP
- Python

#### 1.3 手动检测

手动检测是指为应用程序编写特定的埋点代码。这是向应用程序添加可观测性代码的过程。这样做可以更有效地满足你的需求，因为可以自己添加属性和事件。这样做的缺点是需要导入库并自己完成所有工作。

#### 1.4 埋点方式对比

|              | 手动埋点（Manual Instrumentation）                       | 自动埋点（Automatic Instrumentation）                        |
| ------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| **定义**     | 程序员自己在代码里显式写下采集逻辑                       | 借助 SDK/Agent 自动拦截应用，无需修改业务代码                |
| **实现方式** | 引用 OpenTelemetry API，比如创建 `Tracer`，手动打 `span` | 安装一个 Agent（Java agent、Python instrumentation）自动检测框架和库，插入追踪 |
| **控制力度** | 非常高，想怎么打点都可以                                 | 较低，受限于 Agent 支持的范围                                |
| **开发成本** | 高，需要自己判断哪里要加埋点                             | 低，几乎开箱即用                                             |
| **支持范围** | 业务逻辑细粒度打点，比如特定函数、算法内部               | 框架级打点，比如 HTTP 请求、数据库访问、消息队列消费         |
| **性能影响** | 可控，看你打点多少                                       | 可能稍高，因为 Agent 会 Hook 很多地方                        |
| **典型场景** | 需要追踪复杂业务逻辑                                     | 快速上线链路追踪，不想改代码                                 |

#### 1.5 k8s 应用自动埋点步骤

- **部署 OpenTelemetry Operator**：它帮你管理 `Instrumentation` 和 `OpenTelemetryCollector`，实现自动注入、自动采集功能。
- **部署 OpenTelemetryCollector**：用来接收自动埋点产生的数据，比如 traces。
- **定义 Instrumentation 对象**：声明“我想要给哪些应用自动打点”（比如 Java 的 agent），并指定用哪个 `Collector`。
- **给你的 Pod 加上 Annotation**：Operator 会根据 Annotation 自动注入 Agent 和 Sidecar。

### 2、自动埋点配置详解

#### 2.1 配置示例

```
apiVersion: opentelemetry.io/v1alpha1
kind: Instrumentation
metadata:
  name: <name>
  namespace: <namespace>
spec:
  exporter:                     # 导出目标配置
    endpoint: <string>          # 指定导出的地址，通常是 OpenTelemetry Collector 的 OTLP 接收端口
    tls:											  # 是否使用非加密连接（跳过 TLS）
      insecure: <bool>          # 跳过 TLS 校验，默认 false
      insecureSkipVerify: <bool>
  propagators:								  # 上下文传播协议，如果是跨服务追踪，一定要所有服务使用同一传播协议
    - tracecontext              # W3C Trace Context 标准（推荐）
    - baggage                   #	W3C Baggage（支持传递 key-value）
    - b3                        #	B3 single-header（Zipkin 风格）
    - b3multi                   # B3 multi-header
    - jaeger                    # Jaeger 原生格式
  sampler:									  	# 采样器配置
    type: <sampler_type>
    argument: <string>        
  resource:											# 资源标签，可选配置
    attributes:
      service.name: <string>      # 用于区分不同服务
      service.namespace: <string> # 服务所属 namespace
      service.version: <string>   # 服务版本
  env:												  	# 全局环境变量
    - name: OTEL_FOO
      value: "bar"             
```

#### 2.2 采样器配置

采样器配置如下：

| 类型                       | 含义                                         | 是否支持 argument |
| -------------------------- | -------------------------------------------- | ----------------- |
| `always_on`                | 全部采样                                     | 否                |
| `always_off`               | 全部不采样                                   | 否                |
| `traceidratio`             | 指定比例采样                                 | 是（如 `"0.25"`） |
| `parentbased_traceidratio` | 如果上游有 trace，继承上游；否则按照比例采样 | 是                |
| `parentbased_always_on`    | 如果上游有 trace，继承；否则全部采样         | 否                |
| `parentbased_always_off`   | 如果上游有 trace，继承；否则不采样           | 否                |

`argument` 字段通常是小数，表示采样概率，如 `"1"` 表示 100%，`"0.5"` 表示 50%。

#### 2.3 其他配置

其他配置可通过环境变量方式注入，具体配置项可参考文档：

```
https://opentelemetry.io/docs/languages/sdk-configuration/
```

### 3、部署示例应用

#### 3.1 部署 java 应用

这里我们将使用一个名为 Petclinic 的 Java 应用程序，这是一个使用 Maven 或 Gradle 构建的 Spring Boot 应用程序。该应用程序将使用 OpenTelemetry 生成数据。

```
Petclinic 示例项目地址：https://github.com/spring-projects/spring-petclinic
```

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: java-demo
spec:
  selector:
    matchLabels:
      app: java-demo
  template:
    metadata:
      labels:
        app: java-demo
    spec:
      containers:
      - name: java-demo
        image: contrastsecuritydemo/spring-petclinic:1.5.1
        imagePullPolicy: IfNotPresent
        resources:
          limits:
            memory: "500Mi"
            cpu: "200m"
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: java-demo
spec:
  selector:
    app: java-demo
  ports:
  - port: 8080
    targetPort: 8080
---
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: java-demo
spec:
  entryPoints:
  - web
  routes:
  - match: Host(`java-demo.cuiliangblog.cn`)
    kind: Rule
    services:
      - name: java-demo
        port: 8080
```

部署完成后通过域名访问验证。

#### 3.2 部署 python 应用

这里我们将使用一个名为 [python-demoapp](https://github.com/benc-uk/python-demoapp) 的 python 应用程序，这是一个使用 flask 构建的 web 应用程序。该应用程序将使用 OpenTelemetry 生成数据。

```
项目地址：https://github.com/benc-uk/python-demoapp
```

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: python-demo
spec:
  selector:
    matchLabels:
      app: python-demo
  template:
    metadata:
      labels:
        app: python-demo
    spec:
      containers:
      - name: python-demo
        image: ghcr.io/benc-uk/python-demoapp:latest
        imagePullPolicy: IfNotPresent
        resources:
          limits:
            memory: "500Mi"
            cpu: "200m"
        ports:
        - containerPort: 5000
---
apiVersion: v1
kind: Service
metadata:
  name: python-demo
spec:
  selector:
    app: python-demo
  ports:
  - port: 5000
    targetPort: 5000
---
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: python-demo
spec:
  entryPoints:
  - web
  routes:
  - match: Host(`python-demo.local.com`)
    kind: Rule
    services:
      - name: python-demo
        port: 5000
```

接下来通过域名访问应用

### 4、应用埋点

#### 4.1 java 应用自动埋点

对于 Java 应用，我们可以通过下载 OpenTelemetry 提供的 opentelemetry-javaagent 这个 jar 包来使用 OpenTelemetry 自动检测应用程序。

```
opentelemetry-javaagent 地址：https://github.com/open-telemetry/opentelemetry-java-instrumentation
```

只需要将这个 jar 包添加到应用程序的启动命令中即可，比如：

```
java -javaagent:opentelemetry-javaagent.jar -jar target/*.jar
```

Java 自动检测使用可附加到任何 Java 8+ 应用程序的 Java 代理 JAR。它动态注入字节码以从许多流行的库和框架捕获遥测数据。它可用于捕获应用程序或服务“边缘”的遥测数据，例如入站请求、出站 HTTP 调用、数据库调用等。通过运行以上命令，我们可以对应用程序进行插桩，并生成链路数据，而对我们的应用程序没有任何修改。
尤其是在 Kubernetes 环境中，我们可以使用 OpenTelemetry Operator 来注入和配置 OpenTelemetry 自动检测库，这样连 javaagent 我们都不需要去手动注入了。
接下来为 Java 应用程序添加一个 Instrumentation 资源。

```
apiVersion: opentelemetry.io/v1alpha1    
kind: Instrumentation                     # 声明资源类型为 Instrumentation（用于语言自动注入）
metadata:
  name: java-instrumentation              # Instrumentation 资源的名称（可以被 Deployment 等引用）
  namespace: opentelemetry
spec:
  propagators:                            # 指定用于 trace 上下文传播的方式，支持多种格式
    - tracecontext                        # W3C Trace Context（最通用的跨服务追踪格式）
    - baggage                             # 传播用户定义的上下文键值对
    - b3                                  # Zipkin 的 B3 header（用于兼容 Zipkin 环境）
  sampler:                                # 定义采样策略（决定是否收集 trace）
    type: always_on                       # 始终采样所有请求（适合测试或调试环境）
  java:
    # image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-java:latest
                                          # 使用的 Java 自动注入 agent 镜像地址
    image:  harbor.cuiliangblog.cn/otel/autoinstrumentation-java:latest
    env:
      - name: OTEL_EXPORTER_OTLP_ENDPOINT
        value: http://center-collector.opentelemetry.svc:4318
```

为了启用自动检测，我们需要更新部署文件并向其添加注解。这样我们可以告诉 OpenTelemetry Operator 将 sidecar 和 java-instrumentation 注入到我们的应用程序中。修改 Deployment 配置如下：

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: java-demo
spec:
  selector:
    matchLabels:
      app: java-demo
  template:
    metadata:
      labels:
        app: java-demo
      annotations:
        instrumentation.opentelemetry.io/inject-java: "opentelemetry/java-instrumentation" # 填写 Instrumentation 资源的名称
        sidecar.opentelemetry.io/inject: "opentelemetry/sidecar" # 注入一个 sidecar 模式的 OpenTelemetry Collector
    spec:
      containers:
      - name: java-demo
        image: contrastsecuritydemo/spring-petclinic:1.5.1
        imagePullPolicy: IfNotPresent
        resources:
          limits:
            memory: "500Mi"
            cpu: "200m"
        ports:
        - containerPort: 8080
```

接下来更新 deployment，然后查看资源信息，java-demo 容器已经变为两个。

```
# kubectl get pod
NAME                        READY   STATUS    RESTARTS      AGE
java-demo-557fff6b7c-x8tjg  2/2     Running   0               3m6s
# kubectl get opentelemetrycollectors -A                 
NAMESPACE       NAME      MODE         VERSION   READY   AGE   IMAGE                                                                                     MANAGEMENT
default         sidecar   sidecar      0.123.1           39m                                                                                             managed
opentelemetry   simple    deployment   0.123.1   1/1     39m   ghcr.io/open-telemetry/opentelemetry-collector-releases/opentelemetry-collector:0.123.1   managed
# kubectl get instrumentations -A                 
NAMESPACE       NAME                   AGE   ENDPOINT   SAMPLER     SAMPLER ARG
opentelemetry   java-instrumentation   39m              always_on 
```

查看 sidecar日志，已正常启动并发送 spans 数据

```
# kubectl logs java-demo-557fff6b7c-x8tjg -c otc-container
2025-04-23T08:56:32.664Z        info    grpc@v1.71.0/server.go:690      [core] [Server #3]Server created        {"grpc_log": true}
2025-04-23T08:56:32.669Z        info    otlpreceiver@v0.123.0/otlp.go:116       Starting GRPC server    {"endpoint": "0.0.0.0:4317"}
2025-04-23T08:56:32.670Z        info    otlpreceiver@v0.123.0/otlp.go:173       Starting HTTP server    {"endpoint": "0.0.0.0:4318"}
2025-04-23T08:56:32.670Z        info    service@v0.123.0/service.go:287 Everything is ready. Begin running and processing data.
2025-04-23T08:56:32.670Z        info    grpc@v1.71.0/server.go:886      [core] [Server #3 ListenSocket #4]ListenSocket created     {"grpc_log": true}
2025-04-23T08:56:32.686Z        info    grpc@v1.71.0/clientconn.go:1224 [core] [Channel #1 SubChannel #2]Subchannel Connectivity change to READY   {"grpc_log": true}
2025-04-23T08:56:32.686Z        info    pickfirst/pickfirst.go:184      [pick-first-lb] [pick-first-lb 0xc000ab7530] Received SubConn state update: 0xc0008b6550, {ConnectivityState:READY ConnectionError:<nil> connectedAddress:{Addr:simple-collector.opentelemetry.svc:4317 ServerName:simple-collector.opentelemetry.svc:4317 Attributes:<nil> BalancerAttributes:<nil> Metadata:<nil>}}    {"grpc_log": true}
2025-04-23T08:56:32.686Z        info    grpc@v1.71.0/clientconn.go:563  [core] [Channel #1]Channel Connectivity change to READY    {"grpc_log": true}
2025-04-23T08:57:26.022Z        info    Traces  {"resource spans": 1, "spans": 72}
2025-04-23T08:57:36.027Z        info    Traces  {"resource spans": 1, "spans": 4}
```

查看collector 日志，已经收到 traces 数据

```
# kubectl logs -n opentelemetry simple-collector-5b5699b46f-qgdw6
2025-04-23T07:28:27.220Z        info    service@v0.123.0/service.go:197 Setting up own telemetry...
2025-04-23T07:28:27.220Z        info    builders/builders.go:26 Development component. May change in the future.
2025-04-23T07:28:27.223Z        info    memorylimiter@v0.123.0/memorylimiter.go:148     Using percentage memory limiter    {"total_memory_mib": 7914, "limit_percentage": 75, "spike_limit_percentage": 15}
2025-04-23T07:28:27.223Z        info    memorylimiter@v0.123.0/memorylimiter.go:74      Memory limiter configured {"limit_mib": 5935, "spike_limit_mib": 1187, "check_interval": 1}
2025-04-23T07:28:27.270Z        info    service@v0.123.0/service.go:264 Starting otelcol...     {"Version": "0.123.1", "NumCPU": 4}
2025-04-23T07:28:27.270Z        info    extensions/extensions.go:41     Starting extensions...
2025-04-23T07:28:27.271Z        info    otlpreceiver@v0.123.0/otlp.go:116       Starting GRPC server    {"endpoint": "0.0.0.0:4317"}
2025-04-23T07:28:27.271Z        info    otlpreceiver@v0.123.0/otlp.go:173       Starting HTTP server    {"endpoint": "0.0.0.0:4318"}
2025-04-23T07:28:27.272Z        info    service@v0.123.0/service.go:287 Everything is ready. Begin running and processing data.
2025-04-23T08:57:26.022Z        info    Traces  {"resource spans": 1, "spans": 72}
2025-04-23T08:57:36.027Z        info    Traces  {"resource spans": 1, "spans": 4}
```

#### 4.2 python 应用自动埋点

与 java 应用类似，python 应用同样也支持自动埋点， OpenTelemetry 提供了 `opentelemetry-instrument` CLI 工具，在启动 Python 应用时通过 `sitecustomize` 或环境变量注入自动 instrumentation。

我们先创建一个java-instrumentation 资源

```
apiVersion: opentelemetry.io/v1alpha1    
kind: Instrumentation                     # 声明资源类型为 Instrumentation（用于语言自动注入）
metadata:
  name: python-instrumentation              # Instrumentation 资源的名称（可以被 Deployment 等引用）
  namespace: opentelemetry
spec:
  propagators:                            # 指定用于 trace 上下文传播的方式，支持多种格式
    - tracecontext                        # W3C Trace Context（最通用的跨服务追踪格式）
    - baggage                             # 传播用户定义的上下文键值对
    - b3                                  # Zipkin 的 B3 header（用于兼容 Zipkin 环境）
  sampler:                                # 定义采样策略（决定是否收集 trace）
    type: always_on                       # 始终采样所有请求（适合测试或调试环境）
  python:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-python:latest
    env:                                  
      - name: OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED # 启用日志的自动检测
        value: "true"
      - name: OTEL_PYTHON_LOG_CORRELATION # 在日志中启用跟踪上下文注入
        value: "true"
      - name: OTEL_EXPORTER_OTLP_ENDPOINT
        value: http://center-collector.opentelemetry.svc:4318
```

然后更新 deployment 资源清单，添加注解

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: python-demo
spec:
  selector:
    matchLabels:
      app: python-demo
  template:
    metadata:
      labels:
        app: python-demo
      annotations:
        instrumentation.opentelemetry.io/inject-python: "opentelemetry/python-instrumentation" # 填写 Instrumentation 资源的名称
        sidecar.opentelemetry.io/inject: "opentelemetry/sidecar" # 注入一个 sidecar 模式的 OpenTelemetry Collector
```

接下来观察日志既可

## 六、数据收集(Collector)

OpenTelemetry 的 Collector 组件是实现观测数据（Trace、Metrics、Logs）收集、处理和导出的一站式服务。它的配置主要分为以下 **四大核心模块**：

- receivers（接收数据）
- processors（数据处理）
- exporters（导出数据）
- service（工作流程）

### 1、收集器配置详解

```
参考文档：https://opentelemetry.io/docs/collector/configuration/
```

#### 1.1 配置格式

```
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector          # 定义资源类型为 OpenTelemetryCollector
metadata:
  name: sidecar                       # Collector 的名称
spec:
  mode: sidecar                       # 以 sidecar 模式运行（与应用容器同 Pod）
  config:                             # Collector 配置部分（结构化 YAML）
    receivers:    # 数据接收器（如 otlp、prometheus）
    processors:   # 数据处理器（如 batch、resource、attributes）
    exporters:    # 数据导出器（如 otlp、logging、jaeger、prometheus）
    service:      # 服务配置（定义哪些 pipeline 生效）
      pipelines:
        traces:   # trace 数据的处理流程
        metrics:  # metric 数据的处理流程
        logs:     # log 数据的处理流程
```

#### 1.2 Receivers（接收器）

用于**接收数据**。支持的类型有很多，

otlp：接收 otlp 协议的数据内容

```
receivers:
  otlp:
    protocols:
      grpc:                      # 高性能、推荐使用
        endpoint: 0.0.0.0:4317
      http:                      # 浏览器或无 gRPC 支持的环境
        endpoint: 0.0.0.0:4318
```

prometheus： 用于采集 `/metrics` 接口的数据。

```
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: my-service
          static_configs:
            - targets: ['my-app:8080']
```

filelog: 从文件读取日志

```
receivers:
  filelog:
    include: [ /var/log/myapp/*.log ]
    start_at: beginning
    operators:
      - type: json_parser
        parse_from: body
        timestamp:
          parse_from: attributes.time
```

#### 1.3 Processors（处理器）

用于在导出前对数据进行**修改、增强或过滤**。常用的包括：

batch ： 将数据批处理后导出，提高吞吐量。

```
processors:
  batch:
    timeout: 10s
    send_batch_size: 1024
```

resource ： 为 trace/metric/log 添加统一标签。

```
processors:
  resource:
    attributes:
      - key: service.namespace
        value: demo
        action: insert
```

attributes ： 添加、修改或删除属性

```
processors:
  attributes:
    actions:
      - key: http.method
        value: GET
        action: insert
```

```
处理器配置可参考文档：https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor
```

#### 1.4 Exporters（导出器）

用于**将数据导出到后端系统**

otlp: 用于将数据发送到另一个 OTEL Collector、Jaeger、Tempo、Datadog 等。

```
exporters:
  otlp:
    endpoint: tempo-collector:4317
    tls:
      insecure: true
```

Prometheus： 用于暴露一个 `/metrics` HTTP 端口给 Prometheus 拉取。

```
exporters:
  prometheus:
    endpoint: "0.0.0.0:8889"
```

logging ： 调试用，打印数据到控制台。

```
exporters:
  debug:
    loglevel: debug
```

#### 1.5 Service（工作流程）

`service.pipelines` 是一个“调度图”，告诉 OpenTelemetry Collector，对于某种类型的数据，比如 trace，请用哪个 `receiver` 来接收，用哪些 `processor` 来处理，最终送到哪些 `exporter` 去导出。

```
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch, resource]
      exporters: [otlp, logging]
    metrics:
      receivers: [prometheus]
      processors: [batch]
      exporters: [prometheus]
    logs:
      receivers: [filelog]
      processors: [batch]
      exporters: [otlp]
```

### 2、Collector 发行版本区别

`opentelemetry-collector` 和 `opentelemetry-collector-contrib` 是两个 OpenTelemetry Collector 的发行版本，它们的区别主要在于 **内置组件的丰富程度** 和 **维护主体**。

| 项目           | `opentelemetry-collector`               | `opentelemetry-collector-contrib`         |
| -------------- | --------------------------------------- | ----------------------------------------- |
| **维护者**     | OpenTelemetry 官方核心团队              | OpenTelemetry 社区（贡献者更广）          |
| **组件数量**   | 精简，包含核心组件（如 OTLP）           | 丰富，包含大量插件（如 Loki、Elastic 等） |
| **稳定性**     | 高，更加稳定                            | 相对更快发布新功能，可能略微不稳定        |
| **推荐用途**   | 做基础平台或自定义 Collector 构建的底座 | 直接使用或扩展，适合大多数场景            |
| **是否可扩展** | 支持自定义构建                          | 支持自定义构建                            |
| **编译时间**   | 快（组件少）                            | 慢（组件多）                              |

## 七、链路追踪数据收集与导出

### 1、链路追踪数据收集

#### 1.1 链路数据收集方案

在 Kubernetes 中部署应用进行链路追踪数据收集，常见有两种方案：

基于 Instrumentation Operator 的自动注入（自动埋点）

```
通过部署 OpenTelemetry Operator，并创建 Instrumentation 自定义资源（CRD），实现对应用容器的自动注入 SDK 或 Sidecar，从而无需修改应用代码即可采集追踪数据。适合需要快速接入、统一管理、降低改造成本的场景。
```

手动在应用中集成 OpenTelemetry SDK（手动埋点）

```
在应用程序代码中直接引入 OpenTelemetry SDK，手动埋点关键业务逻辑，控制 trace span 的粒度和内容，并将数据通过 OTLP（OpenTelemetry Protocol）协议导出到后端（如 OpenTelemetry Collector、Jaeger、Tempo 等）。适合需要精准控制追踪数据质量或已有自定义采集需求的场景。
```

接下来以Instrumentation Operator自动注入方式演示如何收集并处理数据。

#### 1.2 部署测试应用

接下来我们部署一个HotROD 演示程序，它内置了OpenTelemetry SDK，我们只需要配置 opentelemetry 接收地址既可，具体可参考文档：

```
https://github.com/jaegertracing/jaeger/tree/main/examples/hotrod
```

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: go-demo
spec:
  selector:
    matchLabels:
      app: go-demo
  template:
    metadata:
      labels:
        app: go-demo
    spec:
      containers:
      - name: go-demo
        image: jaegertracing/example-hotrod:latest
        imagePullPolicy: IfNotPresent
        resources:
          limits:
            memory: "500Mi"
            cpu: "200m"
        ports:
        - containerPort: 8080
        env:
          - name: OTEL_EXPORTER_OTLP_ENDPOINT # opentelemetry服务地址
            value: http://center-collector.opentelemetry.svc:4318
---
apiVersion: v1
kind: Service
metadata:
  name: go-demo
spec:
  selector:
    app: go-demo
  ports:
  - port: 8080
    targetPort: 8080
---
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: go-demo
spec:
  entryPoints:
  - web
  routes:
  - match: Host(`go-demo.cuiliangblog.cn`)
    kind: Rule
    services:
      - name: go-demo
        port: 8080
```

接下来浏览器添加 hosts 解析后访问测试

### 2、Jaeger 方案

#### 2.1 Jaeger 介绍

Jaeger 是Uber公司研发，后来贡献给CNCF的一个分布式链路追踪软件，主要用于微服务链路追踪。它优点是**性能高**（能处理大量追踪数据）、**部署灵活**（支持单节点和分布式部署）、**集成方便**（兼容 OpenTelemetry），并且**可视化能力强**，可以快速定位性能瓶颈和故障。

![img](%E5%9B%BE%E7%89%87/Jaeger%E6%9E%B6%E6%9E%84.png)

基于上述示意图，我们简要解析下 Jaeger 各个组件以及组件间的关系： 

**Client libraries（客户端库）**

**功能**：将追踪信息（trace/span）插入到应用程序中。

**说明**：

- 支持多种语言，如 Go、Java、Python、Node.js 等。
- 通常使用 OpenTelemetry SDK 或 Jaeger Tracer。
- 将生成的追踪数据发送到 Agent 或 Collector。

**Agent（代理）**

**功能**：接收客户端发来的追踪数据，批量转发给 Collector。

**说明：**

- 接收 UDP 数据包（更轻量）
- 向 Collector 使用 gRPC 发送数据

**Collector（收集器）**

**功能**：

- 接收 Agent 或直接从 SDK 发送的追踪数据。
- 处理（转码、校验等）后写入存储后端。

**可横向扩展**，提高吞吐能力。

**Ingester（摄取器）(可选)**

**功能**：在使用 Kafka 作为中间缓冲队列时，Ingester 从 Kafka 消费数据并写入存储。

**用途**：解耦收集与存储、提升稳定性。

**Storage Backend（存储后端）**

**功能**：保存追踪数据，供查询和分析使用。

**支持**：

- Elasticsearch
- Cassandra
- Kafka（用于异步摄取）
- Badger（仅用于开发）
- OpenSearch

**Query（查询服务）**

**功能**：从存储中查询追踪数据，提供给前端 UI 使用。

**提供 API 接口**：供 UI 或其他系统（如 Grafana Tempo）调用。

**UI（前端界面）**

**功能**：

- 可视化展示 Trace、Span、服务依赖图。
- 支持搜索条件（服务名、时间范围、trace ID 等）。

**常用用途**：

- 查看慢请求
- 分析请求调用链
- 排查错误或瓶颈

在本示例中，指标数据采集与收集由 OpenTelemetry 实现，仅需要使用 jaeger-collector 组件接收输入，存入 elasticsearch，使用 jaeger-query 组件查询展示数据既可。

#### 2.2 部署 Jaeger(all in one)

使用 [OpenTelemetry Operator](https://github.com/open-telemetry/opentelemetry-operator) 就可以将 Jaeger V2 部署在 Kubernetes 上

```
参考文档：https://github.com/jaegertracing/jaeger-operator?tab=readme-ov-file#using-jaeger-with-in-memory-storage
```

```yaml
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  name: jaeger
  namespace: opentelemetry
spec:
  image: jaegertracing/jaeger:latest
  ports:
  - name: jaeger
    port: 16686
  config:
    service:
      extensions: [jaeger_storage, jaeger_query]
      pipelines:
        traces:
          receivers: [otlp]    
          exporters: [jaeger_storage_exporter]
    extensions:
      jaeger_query:
        storage:
          traces: memstore
      jaeger_storage:
        backends:
          memstore:
            memory:
              max_traces: 100000
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
    exporters:
      jaeger_storage_exporter:
        trace_storage: memstore
---
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: jaeger
  namespace: opentelemetry
spec:
  entryPoints:
  - web
  routes:
  - match: Host(`jaeger.cuiliangblog.cn`)
    kind: Rule
    services:
      - name: jaeger-collector
        port: 16686
```

查看资源信息

```
# kubectl get pod -n opentelemetry
NAME                                READY   STATUS    RESTARTS   AGE
center-collector-6bf98bfdd6-wj8xk   1/1     Running   0          5m24s
jaeger-collector-56f8dd7b4c-dzzlr   1/1     Running   0          26s
# kubectl get svc -n opentelemetry                
NAME                           TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                       AGE
center-collector               ClusterIP   10.107.132.92    <none>        4317/TCP,4318/TCP,9464/TCP    5m32s
center-collector-headless      ClusterIP   None             <none>        4317/TCP,4318/TCP,9464/TCP    5m32s
center-collector-monitoring    ClusterIP   10.106.135.69    <none>        8888/TCP                      5m32s
jaeger-collector               ClusterIP   10.103.162.15    <none>        16686/TCP,4317/TCP,4318/TCP   34s
jaeger-collector-extension     ClusterIP   10.106.209.169   <none>        16686/TCP                     34s
jaeger-collector-headless      ClusterIP   None             <none>        16686/TCP,4317/TCP,4318/TCP   34s
jaeger-collector-monitoring    ClusterIP   10.103.136.27    <none>        8888/TCP                      34s
sidecar-collector              ClusterIP   10.103.229.157   <none>        4317/TCP,4318/TCP             5m13s
sidecar-collector-headless     ClusterIP   None             <none>        4317/TCP,4318/TCP             5m13s
sidecar-collector-monitoring   ClusterIP   10.101.65.81     <none>        8888/TCP                      5m13s
```

接下来配置 hosts 解析后浏览器访问既可。

#### 2.3 部署 Jaeger(分布式)

```
all in one 数据存放在内存中不具备高可用性，生产环境中建议使用Cassandra存储后端。
```

获取 chart 包，推荐使用bitnami 包进行部署。

```
# helm repo add bitnami https://charts.bitnami.com/bitnami
# helm pull bitnami/jaeger --untar
# cd jaeger
# ls
Chart.lock  charts  Chart.yaml  README.md  templates  values.yaml
```

定制 charts 参数

```
# vim values.yaml
global:
  defaultStorageClass: "nfs-client" # 配置sc存储
```

安装 jaeger

```
# helm install jaeger -n opentelemetry . -f values.yaml
NAME: jaeger
LAST DEPLOYED: Sun Sep 14 21:01:05 2025
NAMESPACE: opentelemetry
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
CHART NAME: jaeger
CHART VERSION: 6.0.5
APP VERSION: 2.9.0

⚠ WARNING: Since August 28th, 2025, only a limited subset of images/charts are available for free.
    Subscribe to Bitnami Secure Images to receive continued support and security updates.
    More info at https://bitnami.com and https://github.com/bitnami/containers/issues/83267

** Please be patient while the chart is being deployed **

1. Get the application URL by running these commands:
    echo "Browse to http://127.0.0.1:8080"
    kubectl port-forward svc/jaeger 8080: &

WARNING: There are "resources" sections in the chart not set. Using "resourcesPreset" is not recommended for production. For production installations, please set the following values according to your workload needs:
  - collector.resources
  - migration.resources
  - query.resources
+info https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
# kubectl get pod -n opentelemetry
NAME                                READY   STATUS    RESTARTS   AGE
center-collector-f6bf6c88d-9c74j    1/1     Running   0          5m95s
jaeger-cassandra-0                  1/1     Running   0          2m9s
jaeger-collector-6548dcdc5c-8jvsw   1/1     Running   0          2m9s
jaeger-query-fd7c7f7c7-4r7nm        1/1     Running   0          2m9s
# kubectl get svc -n opentelemetry | grep jaeger
jaeger-cassandra               ClusterIP   10.103.153.215   <none>        9042/TCP                                                  2m31s
jaeger-cassandra-headless      ClusterIP   None             <none>        7000/TCP,7001/TCP,7199/TCP,9042/TCP                       2m31s
jaeger-collector               ClusterIP   10.97.6.26       <none>        4317/TCP,4318/TCP,14250/TCP,14268/TCP,9411/TCP,8888/TCP   2m31s
jaeger-query                   ClusterIP   10.106.180.63    <none>        16685/TCP,16686/TCP,8888/TCP                              2m31s
```

创建 ingress 资源

```
# cat jaeger.yaml           
apiVersion: traefik.io/v1alpha1
kind: Middleware
metadata:
  name: redirect-https-middleware
  namespace: minio
spec:
  redirectScheme:
    scheme: https
---
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: jaeger
  namespace: jaeger
spec:
  entryPoints:
  - web
  - websecure 
  tls:
    secretName: ingress-tls
  routes:
  - match: Host(`jaeger.cuiliangblog.cn`)
    kind: Rule
    services:
      - name: jaeger-query
        port: 16686                                                                                               
# kubectl apply -f jaeger.yaml    
ingressroute.traefik.io/jaeger created
```

接下来配置 hosts 解析后浏览器访问既可。

#### 2.4 配置 Collector

```
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
# 元数据定义部分
metadata:
  name: center        # Collector 的名称为 center
  namespace: opentelemetry
# 具体的配置内容
spec:
  replicas: 1           # 设置副本数量为1
  config:               # 定义 Collector 配置
    receivers:          # 接收器，用于接收遥测数据（如 trace、metrics、logs）
      otlp:             # 配置 OTLP（OpenTelemetry Protocol）接收器
        protocols:      # 启用哪些协议来接收数据
          grpc: 
            endpoint: 0.0.0.0:4317      # 启用 gRPC 协议
          http: 
            endpoint: 0.0.0.0:4318      # 启用 HTTP 协议

    processors:         # 处理器，用于处理收集到的数据
      batch: {}         # 批处理器，用于将数据分批发送，提高效率

    exporters:          # 导出器，用于将处理后的数据发送到后端系统
      # debug: {}         # 使用 debug 导出器，将数据打印到终端（通常用于测试或调试）
      otlp:               # 数据发送到jaeger的grpc端口
        endpoint: "jaeger-collector:4317"
        tls: # 跳过证书验证
          insecure: true

    service:            # 服务配置部分
      pipelines:        # 定义处理管道
        traces:         # 定义 trace 类型的管道
          receivers: [otlp]                      # 接收器为 OTLP
          processors: [batch]                    # 使用批处理器
          exporters: [otlp]                      # 将数据发送到otlp
```

#### 2.5 访问验证

接下来我们随机访问 demo 应用，并在 jaeger 查看链路追踪数据。

Jaeger 系统找到了一些 trace 并显示了一些关于该 trace 的元数据，包括参与该 trace 的不同服务的名称以及每个服务发送到 Jaeger 的 span 记录数。

![img](%E5%9B%BE%E7%89%87/jaeger-ui.png)

```
jaeger 使用具体可参考文章https://medium.com/jaegertracing/take-jaeger-for-a-hotrod-ride-233cf43e46c2
```

### 3、Tempo 方案

#### 3.1 Tempo 介绍

Grafana Tempo是一个开源、易于使用的大规模分布式跟踪后端。Tempo具有成本效益，仅需要对象存储即可运行，并且与Grafana，Prometheus和Loki深度集成，Tempo可以与任何开源跟踪协议一起使用，包括Jaeger、Zipkin和OpenTelemetry。它仅支持键/值查找，并且旨在与用于发现的日志和度量标准(示例性)协同工作。

![img](%E5%9B%BE%E7%89%87/Tempo%E6%9E%B6%E6%9E%84.png)

**Distributors（分发器）**

**功能**：接收客户端发送的追踪数据并进行初步验证

**说明**：

- 对 Trace 进行分片、标签处理。
- 将数据转发给合适的 Ingesters。

**Ingesters（摄取器）**

**功能**：处理和持久化 Trace 数据

**说明**：

- 接收来自 Distributor 的数据。
- 在内存中缓存直到追踪完成（完整的 Trace）。
- 再写入后端对象存储。

**Storage（对象存储）**

**功能**：持久化存储 Trace 数据

**说明**：

- 支持多种对象存储（S3、GCS、MinIO、Azure Blob 等）。
- Tempo 存储的是压缩的完整 Trace 文件，使用 trace ID 进行索引

**Compactor（数据压缩）**

**功能：**合并 trace 数据，压缩多个小 block 成一个大 block。

**说明：**

- 可以单独运行 compactor 容器或进程。
- 通常以 **后台任务** 的方式运行，不参与实时 ingest 或 query。

**Tempo Query（查询前端）**

**功能**：处理来自用户或 Grafana 的查询请求

**说明**：

- 接收查询请求。
- 提供缓存、合并和调度功能，优化查询性能。
- 将请求转发给 Querier。

**Querier（查询器）**

**功能**：从存储中检索 Trace 数据

**说明**：

- 根据 trace ID 从对象存储中检索完整 trace。
- 解压和返回结构化的 Span 数据。
- 返回结果供 Grafana 或其他前端展示。

#### 3.2 部署 Tempo

推荐用Helm 安装，官方提供了tempo-distributed Helm chart 和 tempo Helm chart 两种部署模式，一般来说本地测试使用 tempo Helm chart，而生产环境可以使用 Tempo 的微服务部署方式 tempo-distributed。

```
具体可参考文档：https://github.com/grafana/helm-charts/tree/main/charts/tempo
```

创建 s3 的 bucket、ak、sk 资源，并配置权限。

获取 chart 包

```
# helm repo add grafana https://grafana.github.io/helm-charts
# helm pull grafana/tempo --untar
# cd tempo 
# ls
Chart.yaml  README.md  README.md.gotmpl  templates  values.yaml
```

修改配置，prometheus 默认未启用远程写入

```
# vim values.yaml
tempo:
  storage:
    trace: # 默认使用本地文件存储，改为使用s3对象存储
      backend: s3
      s3:
        bucket: tempo                      # store traces in this bucket
        endpoint: minio-service.minio.svc:9000  # api endpoint
        access_key: zbsIQQnsp871ZnZ2AuKr                                 # optional. access key when using static credentials.
        secret_key: zxL5EeXwU781M8inSBPcgY49mEbBVoR1lvFCX4JU             # optional. secret key when using static credentials.
        insecure: true                                 # 跳过证书验证
```

创建 tempo

```
# helm install tempo -n opentelemetry . -f values.yaml
NAME: tempo
LAST DEPLOYED: Tue May  6 10:26:08 2025
NAMESPACE: opentelemetry
STATUS: deployed
REVISION: 1
TEST SUITE: None
# kubectl get pod -n opentelemetry        
NAME                                READY   STATUS    RESTARTS   AGE
center-collector-7fb65bcb44-pnx6s   1/1     Running   0          6d19h
tempo-0                             1/1     Running   0          2m24s
# kubectl get svc -n opentelemetry | grep tempo 
tempo                          ClusterIP   10.111.81.228   <none>        6831/UDP,6832/UDP,3100/TCP,14268/TCP,14250/TCP,9411/TCP,55680/TCP,55681/TCP,4317/TCP,4318/TCP,55678/TCP   24s
```

#### 3.3 配置 Collector

tempo 服务的otlp 数据接收端口分别为4317(grpc)和4318(http)，修改OpenTelemetryCollector 配置，将数据发送到 tempo 的 otlp 接收端口。

```
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
# 元数据定义部分
metadata:
  name: center        # Collector 的名称为 center
  namespace: opentelemetry
# 具体的配置内容
spec:
  replicas: 1           # 设置副本数量为1
  config:               # 定义 Collector 配置
    receivers:          # 接收器，用于接收遥测数据（如 trace、metrics、logs）
      otlp:             # 配置 OTLP（OpenTelemetry Protocol）接收器
        protocols:      # 启用哪些协议来接收数据
          grpc: 
            endpoint: 0.0.0.0:4317      # 启用 gRPC 协议
          http: 
            endpoint: 0.0.0.0:4318      # 启用 HTTP 协议

    processors:         # 处理器，用于处理收集到的数据
      batch: {}         # 批处理器，用于将数据分批发送，提高效率

    exporters:          # 导出器，用于将处理后的数据发送到后端系统
      # debug: {}         # 使用 debug 导出器，将数据打印到终端（通常用于测试或调试）
      otlp:               # 数据发送到tempo的grpc端口
        endpoint: "tempo:4317"
        tls: # 跳过证书验证
          insecure: true

    service:            # 服务配置部分
      pipelines:        # 定义处理管道
        traces:         # 定义 trace 类型的管道
          receivers: [otlp]                      # 接收器为 OTLP
          processors: [batch]                    # 使用批处理器
          exporters: [otlp]                     # 将数据打印到OTLP
```

#### 3.4 访问验证

访问 grafana，添加 tempo 数据源。

![img](%E5%9B%BE%E7%89%87/grafana-tempo.png)

查看 traces 数据

![img](%E5%9B%BE%E7%89%87/tempo-traces.png)

#### 3.5 服务拓扑图配置

`Tempo Metrics Generator` 是 Grafana Tempo 提供的一个 可选组件，用于将 Trace（链路追踪数据）转换为 Metrics（指标数据），从而实现 Trace-to-Metrics（T2M） 的能力，默认情况下 tempo 并未启用该功能。

prometheus 开启`remote-write-receiver` 功能，关键配置如下：

```
# vim prometheus-prometheus.yaml
spec:
  # enableFeatures: 
  enableFeatures: # 开启远程写入
  - remote-write-receiver
  externalLabels:
    web.enable-remote-write-receiver: "true"
# kubectl apply -f prometheus-prometheus.yaml
```

tempo 开启metricsGenerator 功能，关键配置如下：

```
# vim values.yaml
global:
  per_tenant_override_config: /runtime-config/overrides.yaml
  metrics_generator_processors:
  - 'service-graphs'
  - 'span-metrics'
tempo:
  metricsGenerator:
    enabled: true # 从 Trace 中自动生成 metrics（指标），用于服务调用关系图
    remoteWriteUrl: "http://prometheus-k8s.monitoring.svc:9090/api/v1/write" # prometheus地址
  overrides: # 多租户默认配置启用metrics
    defaults: 
      metrics_generator:
        processors:
          - service-graphs
          - span-metrics
```

此时查询 prometheus 图表，可以获取traces 相关指标

![img](%E5%9B%BE%E7%89%87/tempo-prometheus.png)

grafana 数据源启用节点图与服务图，配置如下

![img](%E5%9B%BE%E7%89%87/tempo-datasource.png)

查看服务图数据

![img](%E5%9B%BE%E7%89%87/tempo-result.png)

## 八、指标数据收集与导出

### 1、指标数据收集方案

OpenTelemetry 支持将指标（Metrics）数据导出到多种后端，比如 Prometheus、OTLP、Grafana Cloud等。**导出方式取决于你使用的语言 SDK 和部署模式**（例如手动 SDK 初始化 vs. 使用 OpenTelemetry Collector）。

#### 1.1 OpenTelemetry Collector 导出指标

这适用于服务中接入 OpenTelemetry SDK 后，将数据导出到 Collector，由 Collector 转发到后端（如 Prometheus）。

指标数据导出链路为：

应用 (OTel SDK) ——>OpenTelemetry Collector——>Prometheus / Grafana / OTLP / …

#### 1.2 在 SDK 中直接导出

比如你用的是 Python、Go、Java 等语言开发的应用，可以在使用opentelemetry.sdk.metrics 这个SDK 在初始化阶段配置 exporter。

### 2、指标采集与导出

#### 2.1 配置Instrumentation

使用 OpenTelemetry 的 `Instrumentation` CRD 自动注入机制，可以实现对 Metrics 的“内置指标”的采集，Java Agent 从 1.26.0+ 支持 JVM runtime metrics（如 GC、线程数）采集。

```
apiVersion: opentelemetry.io/v1alpha1    
kind: Instrumentation                     # 声明资源类型为 Instrumentation（用于语言自动注入）
metadata:
  name: java-instrumentation              # Instrumentation 资源的名称（可以被 Deployment 等引用）
  namespace: opentelemetry
spec:
  propagators:                            # 指定用于 trace 上下文传播的方式，支持多种格式
    - tracecontext                        # W3C Trace Context（最通用的跨服务追踪格式）
    - baggage                             # 传播用户定义的上下文键值对
    - b3                                  # Zipkin 的 B3 header（用于兼容 Zipkin 环境）
  sampler:                                # 定义采样策略（决定是否收集 trace）
    type: always_on                       # 始终采样所有请求（适合测试或调试环境）
  java:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-java:latest
                                          # 使用的 Java 自动注入 agent 镜像地址
    env:
      - name: OTEL_METRICS_EXPORTER                  # 启用metrics指标导出
        value: "otlp"
      - name: OTEL_EXPORTER_OTLP_ENDPOINT
        value: http://center-collector.opentelemetry.svc:4318
```



#### 2.2 配置 Collector

配置 collector 导出 prometheus 格式的指标，以便 prometheus 可以抓取指标数据。

```
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
# 元数据定义部分
metadata:
  name: center        # Collector 的名称为 center
  namespace: opentelemetry
# 具体的配置内容
spec:
  replicas: 1           # 设置副本数量为1
  config:               # 定义 Collector 配置
    receivers:          # 接收器，用于接收遥测数据（如 trace、metrics、logs）
      otlp:             # 配置 OTLP（OpenTelemetry Protocol）接收器
        protocols:      # 启用哪些协议来接收数据
          grpc: 
            endpoint: 0.0.0.0:4317      # 启用 gRPC 协议
          http: 
            endpoint: 0.0.0.0:4318      # 启用 HTTP 协议

    processors:         # 处理器，用于处理收集到的数据
      batch: {}         # 批处理器，用于将数据分批发送，提高效率

    exporters:          # 导出器，用于将处理后的数据发送到后端系统
      # debug: {}         # 使用 debug 导出器，将数据打印到终端（通常用于测试或调试）
      otlp:               # 数据发送到tempo的grpc端口
        endpoint: "tempo:4317"
        tls: # 跳过证书验证
          insecure: true
      prometheus:
        endpoint: "0.0.0.0:9464" # prometheus指标暴露端口

    service:            # 服务配置部分
      pipelines:        # 定义处理管道
        traces:         # 定义 trace 类型的管道
          receivers: [otlp]                      # 接收器为 OTLP
          processors: [batch]                    # 使用批处理器
          exporters: [otlp]                      # 将数据导出到OTLP
        metrics:        # 定义 metrics 类型的管道
          receivers: [otlp]                      # 接收器为 OTLP
          processors: [batch]                    # 使用批处理器
          exporters: [prometheus]                # 将数据导出到prometheus
```



#### 2.3 创建监控项

创建ServiceMonitor 资源

```
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: opentelemetry # ServiceMonitor名称
  namespace: opentelemetry # ServiceMonitor所在名称空间
spec:
  jobLabel: opentelemetry # job名称
  endpoints: # prometheus所采集Metrics地址配置，endpoints为一个数组，可以创建多个，但是每个endpoints包含三个字段interval、path、port
  - port: prometheus # prometheus采集数据的端口，这里为port的name，主要是通过spec.selector中选择对应的svc，在选中的svc中匹配该端口
    interval: 30s # prometheus采集数据的周期，单位为秒
    scheme: http # 协议
    path: /metrics # prometheus采集数据的路径
  selector: # svc标签选择器，匹配service的labels
    matchLabels:
      app.kubernetes.io/name: center-collector
      operator.opentelemetry.io/collector-service-type: base
  namespaceSelector: # namespace选择
    matchNames:
    - opentelemetry
```

 查看 target 信息

![img](%E5%9B%BE%E7%89%87/opentelemetry-metrics.png)

#### 2.4 查看指标数据

以 java 为例， OpenTelemetry sdk 内置了标准的 JVM 运行时指标 ， 这些指标覆盖了 **JVM 运行时、HTTP 服务、线程、GC 等关键领域**，并以 Prometheus 格式暴露在 `/metrics` 接口上。

![img](%E5%9B%BE%E7%89%87/metrices-result.png)

我们可以通过 PromQL 查询指标信息

## 九、日志数据收集与导出

### 1、日志数据收集方案

目前日志自动埋点支持主要有：

- .NET、Java、Python SDK 开始支持正式的日志记录，控制台打印的日志均可自动采集。
- JavaScript / go 等暂时需用 `span.addEvent()` 或通过标准输出间接采集。

日志的采集方式一般是：

- ✅ 使用 OTel SDK + `Logging` API（手动埋点日志）
- ✅ 使用日志框架（如 logback）将日志转为 OTLP logs
- ✅ 使用 Fluent Bit / Filebeat 收集 stdout → 发送到 OTLP Receiver

### 2、日志导出(kafka)

#### 2.1 部署 kafka

部署 kafka 具体可参考文档：https://www.cuiliangblog.cn/detail/section/190398674

#### 2.2 配置 Collector

配置 collector 导出 日志数据到 kafka 中。

```
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
# 元数据定义部分
metadata:
  name: center        # Collector 的名称为 center
  namespace: opentelemetry
# 具体的配置内容
spec:
  replicas: 1           # 设置副本数量为1
  config:               # 定义 Collector 配置
    receivers:          # 接收器，用于接收遥测数据（如 trace、metrics、logs）
      otlp:             # 配置 OTLP（OpenTelemetry Protocol）接收器
        protocols:      # 启用哪些协议来接收数据
          grpc: 
            endpoint: 0.0.0.0:4317      # 启用 gRPC 协议
          http: 
            endpoint: 0.0.0.0:4318      # 启用 HTTP 协议

    processors:         # 处理器，用于处理收集到的数据
      batch: {}         # 批处理器，用于将数据分批发送，提高效率

    exporters:          # 导出器，用于将处理后的数据发送到后端系统
      debug: {}         # 使用 debug 导出器，将数据打印到终端（通常用于测试或调试）
      otlp:               # 数据发送到tempo的grpc端口
        endpoint: "jaeger:4317"
        tls: # 跳过证书验证
          insecure: true
      prometheus:
        endpoint: "0.0.0.0:9464" # prometheus指标暴露端口
      kafka:
        protocol_version: 2.0.0
        brokers:
          - my-cluster-kafka-brokers.kafka.svc:9092  # Kafka 的地址
        topic: otel-logs
        encoding: otlp_json  # 日志通常用 json 格式

    service:            # 服务配置部分
      telemetry:
        logs:
          level: "debug"              # 设置 Collector 自身日志等级为 debug（方便观察日志）
      pipelines:        # 定义处理管道
        traces:         # 定义 trace 类型的管道
          receivers: [otlp]                      # 接收器为 OTLP
          processors: [batch]                    # 使用批处理器
          exporters: [otlp]                      # 将数据导出到OTLP
        metrics:        # 定义 metrics 类型的管道
          receivers: [otlp]                      # 接收器为 OTLP
          processors: [batch]                    # 使用批处理器
          exporters: [prometheus]                # 将数据导出到prometheus
        logs:
          receivers: [otlp]                      # 接收器为 OTLP
          processors: [batch]                    # 使用批处理器
          exporters: [kafka,debug]               # 将数据导出到kafka
```

#### 2.3 查看日志数据

登录 kafka-ui，查看 otel-logs 主题下的日志数据，内容如下：

![img](%E5%9B%BE%E7%89%87/opentelemetry-kafka.png)

### 3、日志导出(elasticsearch)

#### 3.1 部署 elasticsearch

具体可参考文档：https://www.cuiliangblog.cn/detail/section/15189467

创建数据流模板

![img](%E5%9B%BE%E7%89%87/opentelemetry-es.png)

#### 3.2 配置 Collector

参考文档：https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/elasticsearchexporter

```
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
# 元数据定义部分
metadata:
  name: center        # Collector 的名称为 center
  namespace: opentelemetry
# 具体的配置内容
spec:
  replicas: 1           # 设置副本数量为1
  # image: otel/opentelemetry-collector-contrib:latest  # 使用支持 elasticsearch 的镜像
  image: harbor.cuiliangblog.cn/otel/opentelemetry-collector-contrib:latest
  config:               # 定义 Collector 配置
    receivers:          # 接收器，用于接收遥测数据（如 trace、metrics、logs）
      otlp:             # 配置 OTLP（OpenTelemetry Protocol）接收器
        protocols:      # 启用哪些协议来接收数据
          grpc: {}      # 启用 gRPC 协议
          http: {}      # 启用 HTTP 协议

    processors:         # 处理器，用于处理收集到的数据
      batch: {}         # 批处理器，用于将数据分批发送，提高效率

    exporters:          # 导出器，用于将处理后的数据发送到后端系统
      debug: {}         # 使用 debug 导出器，将数据打印到终端（通常用于测试或调试）
      otlp:               # 数据发送到tempo的grpc端口
        endpoint: "jaeger:4317"
        tls: # 跳过证书验证
          insecure: true
      prometheus:
        endpoint: "0.0.0.0:9464" # prometheus指标暴露端口
      elasticsearch:
        endpoints: ["https://elasticsearch-es-http.elk.svc:9200"]
        logs_index: "logs-otel"
        tls:
          insecure_skip_verify: true  # 如果使用自签名证书，临时关闭验证（建议生产环境配置CA）
        user: "admin"
        password: "123.com"

    service:            # 服务配置部分
      telemetry:
        logs:
          level: "debug"              # 设置 Collector 自身日志等级为 debug（方便观察日志）
      pipelines:        # 定义处理管道
        traces:         # 定义 trace 类型的管道
          receivers: [otlp]                      # 接收器为 OTLP
          processors: [batch]                    # 使用批处理器
          exporters: [otlp]                      # 将数据导出到OTLP
        metrics:        # 定义 metrics 类型的管道
          receivers: [otlp]                      # 接收器为 OTLP
          processors: [batch]                    # 使用批处理器
          exporters: [prometheus]          # 将数据导出到prometheus
        logs:
          receivers: [otlp]
          processors: [batch]                    # 使用批处理器
          exporters: [elasticsearch,debug]
```

#### 3.3 查看日志数据

![img](%E5%9B%BE%E7%89%87/opentelemetry-kibana.png)

### 4、日志导出(loki)

#### 4.1 部署 loki

具体可参考文档：https://www.cuiliangblog.cn/detail/section/219069254

#### 4.2 配置 Collector

在 loki3.0 之前的版本，使用[lokiexporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/lokiexporter)导出，具体可参考文档：https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/lokiexporter

但是 3.0 后的版本已弃用 lokiExporter，需要使用 otlphttp 导出，具体可参考文档：https://grafana.com/docs/loki/latest/send-data/otel/

```
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
# 元数据定义部分
metadata:
  name: center        # Collector 的名称为 center
  namespace: opentelemetry
# 具体的配置内容
spec:
  replicas: 1           # 设置副本数量为1
  image: otel/opentelemetry-collector-contrib:latest  # 使用支持 elasticsearch 的镜像
  imagePullPolicy: IfNotPresent  # 镜像拉取策略为如果不存在则拉取
  # image: harbor.cuiliangblog.cn/otel/opentelemetry-collector-contrib:latest
  config:               # 定义 Collector 配置
    receivers:          # 接收器，用于接收遥测数据（如 trace、metrics、logs）
      otlp:             # 配置 OTLP（OpenTelemetry Protocol）接收器
        protocols:      # 启用哪些协议来接收数据
          grpc: 
            endpoint: 0.0.0.0:4317      # 启用 gRPC 协议
          http: 
            endpoint: 0.0.0.0:4318      # 启用 HTTP 协议
    processors:         # 处理器，用于处理收集到的数据
      batch: {}         # 批处理器，用于将数据分批发送，提高效率

    exporters:          # 导出器，用于将处理后的数据发送到后端系统
      debug: {}         # 使用 debug 导出器，将数据打印到终端（通常用于测试或调试）
      otlp:               # 数据发送到tempo的grpc端口
        endpoint: "tempo:4317"
        tls: # 跳过证书验证
          insecure: true
      prometheus:
        endpoint: "0.0.0.0:9464" # prometheus指标暴露端口
      otlphttp:
        endpoint: http://loki.loki.svc:3100/otlp

    service:            # 服务配置部分
      telemetry:
        logs:
          level: "debug"              # 设置 Collector 自身日志等级为 debug（方便观察日志）
      pipelines:        # 定义处理管道
        traces:         # 定义 trace 类型的管道
          receivers: [otlp]                      # 接收器为 OTLP
          processors: [batch]                    # 使用批处理器
          exporters: [otlp]                      # 将数据导出到OTLP
        metrics:        # 定义 metrics 类型的管道
          receivers: [otlp]                      # 接收器为 OTLP
          processors: [batch]                    # 使用批处理器
          exporters: [prometheus]          # 将数据导出到prometheus
        logs:
          receivers: [otlp]
          processors: [batch]                    # 使用批处理器
          exporters: [otlphttp, debug]
```



#### 4.3 查看日志数据

登录 grafana 查看日志数据

![img](%E5%9B%BE%E7%89%87/opentelemetry-grafana.png)

minio 查看对象存储资源

![img](%E5%9B%BE%E7%89%87/opentelemetry-bucket.png)

## 十、Opentelemetry collector用法

Opentelemetry collector包含如下几个[组件](https://opentelemetry.io/docs/collector/configuration/)：

*   receiver
*   processor
*   exporter
*   connector
*   Service

注意这里只是定义了各个组件，若要真正生效，则需要将其添加到[service](https://opentelemetry.io/docs/collector/configuration/#service)中.

官方的[opentelemetry-collector](https://github.com/open-telemetry/opentelemetry-collector)和[opentelemetry-collector-contrib](https://github.com/open-telemetry/opentelemetry-collector-contrib)两个库给出了大量Collector组件实现。前者是opentelemetry-collector的**核心**配置，用于提供vendor无关的collector配置，后者则由**不同的vendor提供**，如aws、aure、kafka等。在使用时可以通过结合二者功能来满足业务需求。另外值得注意的是，两个仓库的各个**组件目录**中都提供了`README.md`帮助文档，如[otlpreceiver](https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/README.md)、[prometheusremotewriteexporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/prometheusremotewriteexporter/README.md)等。

### 1、Service

service字段用于组织启用receivers, processors, exporters和 extensions 组件。一个service包含如下子字段：

*   Extensions
*   Pipelines
*   Telemetry：支持配置[metric](https://opentelemetry.io/docs/collector/internal-telemetry/#configure-internal-metrics)和[log](https://opentelemetry.io/docs/collector/internal-telemetry/#configure-internal-logs)。
    *   默认情况下，opentelemetry会在`http://127.0.0.1:8888/metrics`下暴露metrics，可以通过`telemetry.metrics.address`指定暴露metrics的地址。可以使用`level`字段控制暴露的metrics数(这里给出了各个level下的[metrics](https://opentelemetry.io/docs/collector/internal-telemetry/#lists-of-internal-metrics))：

        *   `none`: 不采集遥测数据
        *   `basic`: 采集基本的遥测数据
        *   `normal`: 默认级别，在basic之上增加标准的遥测数据
        *   `detailed`: 最详细的级别，包括dimensions 和 views.
    *   log的默认级别为`INFO`，支持`DEBUG`、 `WARN`、 `ERROR`。

#### 1.1 Extensions

可以使用extensions实现Collector的认证、健康监控、服务发现或数据转发等。大部分extensions都有默认配置。

```yaml
service:
  extensions: [health_check, pprof, zpages]
  telemetry:
    metrics:
      address: 0.0.0.0:8888
      level: normal
```

#### 1.2 [healthcheckextension](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/healthcheckextension)

可以为pod的probe提供健康检查：

```yaml
    extensions:
      health_check:
        endpoint: ${env:MY_POD_IP}:13133
```

#### 1.3 Pipelines

一个pipeline包含receivers、processors和exporters集，相同的receivers、processors和exporters可以放到多个pipeline中。

配置pipeline，类型为：

*   `traces`： 采集和处理trace数据
*   `metrics`：采集和处理metric数据
*   `logs`：采集和处理log数据

注意processors的位置顺序决定了其处理顺序。

```yaml
service:
  pipelines:
    metrics:
      receivers: [opencensus, prometheus]
      processors: [batch]
      exporters: [opencensus, prometheus]
    traces:
      receivers: [opencensus, jaeger]
      processors: [batch, memory_limiter]
      exporters: [opencensus, zipkin]
```

下面主要介绍几种常见的组件配置。

### 2、receiver

用于接收遥测数据。

可以通过`<receiver type>/<name>`为一类receiver配置多个receivers，确保receiver的名称唯一性。collector中至少需要配置一个receiver。

```yaml
receivers:
  # Receiver 1.
  # <receiver type>:
  examplereceiver:
    # <setting one>: <value one>
    endpoint: 1.2.3.4:8080
    # ...
  # Receiver 2.
  # <receiver type>/<name>:
  examplereceiver/settings:
    # <setting two>: <value two>
    endpoint: 0.0.0.0:9211
```

#### 2.1 [OTLP Receiver](https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/otlpreceiver)

使用[OTLP](https://opentelemetry.io/docs/specs/otlp/)格式接收gRPC或HTTP流量，这种为**push模式**，即需要client将遥测数据push到opentelemetry：

```yaml
receivers:
  otlp:
    protocols:
      grpc:
      http:
```

k8s下可以使用如下方式定义otlp receiver：

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: ${env:MY_POD_IP}:4317 #定义接收grpc数据格式的server
      http:
        endpoint: ${env:MY_POD_IP}:4318 #定义接收http数据格式的server
```

Receiver本身支持push和pull模式，如[haproxyreceiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/haproxyreceiver)就是pull模式：

```yaml
receivers:
  haproxy:
    endpoint: http://127.0.0.1:8080/stats
    collection_interval: 1m
    metrics:
      haproxy.connection_rate:
        enabled: false
      haproxy.requests:
        enabled: true
```

#### 2.2 [prometheus receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver)

prometheusreceiver支持使用prometheus 的方式**pull** metrics数据，但需要注意的是，该方式**目前处于开发阶段**，**官方给出了[注意事项](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver#%EF%B8%8F-warning)和[不支持的特性](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver#unsupported-features)**：

```yaml
receivers:
    prometheus:
      config:
        scrape_configs:
          - job_name: 'otel-collector'
            scrape_interval: 5s
            static_configs:
              - targets: ['0.0.0.0:8888']
          - job_name: k8s
            kubernetes_sd_configs:
            - role: pod
            relabel_configs:
            - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
              regex: "true"
              action: keep
            metric_relabel_configs:
            - source_labels: [__name__]
              regex: "(request_duration_seconds.*|response_duration_seconds.*)"
              action: keep
```

#### 2.3 [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver)

[filelog-receiver](https://opentelemetry.io/docs/kubernetes/collector/components/#filelog-receiver)用于从文件中采集日志。可以使用`storage`来保存文件offsets，使得文件读取更加精确。下面用到了[filestorage](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/storage/filestorage)：

```yml
extensions:
  file_storage:
    create_directory: true     #directory不存在，则创建
    directory: /etc/opentelemetry/filelog-offsets #保存了读取的文件偏移量
processors:
  batch/logs:
    send_batch_max_size: 0
    send_batch_size: 8192
  transform/defaults:
    error_mode: propagate
    log_statements:
    - context: log
      statements:
      - set(resource.attributes["fields.platform"], "infrastructure")
      - set(resource.attributes["fields.boundary"], "infrastructure")
      - set(resource.attributes["fields.name"], "kafka")
receivers:
  filelog/kafka:
    encoding: utf-8
    include: /var/log/kafka/*.log #指定需要读取的文件
    start_at: end                 #从文件末尾读取数据
    storage: file_storage         #指定用到的storage，这里使用了filestorage
service:
  extensions:
  - file_storage
  pipelines:
    logs/kafka:
      exporters:
      - otlphttp/centralLogsCollector
      processors:
      - transform/defaults
      - batch/logs
      receivers:
      - filelog/kafka
```

### 3、Processor

根据各个processor定义的规则或配置来修改或转换receiver采集的数据，如过滤、丢弃、重命名等操作。Processors的执行顺序取决于`service.pipelines`中定义的Processors顺序。推荐的processors如下：

*   [memory\_limiter](https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/memorylimiterprocessor/README.md)
*   sampling processors 或初始的filtering processors
*   依赖[Context](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/context)发送源的processor，如`k8sattributes`
*   [batch](https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md)
*   其他processors

#### 3.1 数据归属

![](%E5%9B%BE%E7%89%87/Opentelemetry-Processor.png)

由于一个receiver可能会附加到多个pipelines上，因此可能存在多个processors同时处理来自同一个receiver的数据，这里涉及到[数据归属权](https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/README.md#data-ownership)的问题。从pipelines的角度看有两种数据归属模式：

*   独占数据：这种模式下，pipeline会复制从receiver接收到的数据，各个pipeline之间不会相互影响。
*   共享数据：这种模式下，pipeline不会复制从receiver接收到的数据，多个pipeline共享同一份数据，且数据是**只读**的，无法修改。可以通过设置`MutatesData=false`来避免独占模式下的数据拷贝。

**注意：在官方的[文档](https://opentelemetry.io/docs/collector/architecture/#receivers)中有如下警告，即当多个pipelines引用了同一个receiver时，只能保证各个pipeline的数据是独立的，但由于整个流程使用的是同步调用方式，因此如果一个pipeline阻塞，则会导致其他使用使用相同receiver的pipelines也被阻塞**：

> #### Important
>
> When the same receiver is referenced in more than one pipeline, the Collector creates only one receiver instance at runtime that sends the data to a fan-out consumer. The fan-out consumer in turn sends the data to the first processor of each pipeline. The data propagation from receiver to the fan-out consumer and then to processors is completed using a synchronous function call. This means that if one processor blocks the call, the other pipelines attached to this receiver are blocked from receiving the same data, and the receiver itself stops processing and forwarding newly received data.

#### 3.2 [memory limiter processor](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor)

用于防止collector OOM。该processor会周期性地检查内存情况，如果使用的内存大于设置的阈值，则执行一次`runtime.GC()`。`memorylimiterprocessor`有两个阈值：_soft limit_和_hard limit_。当内存用量超过_soft limit_时，processor将拒绝接收数据并返回错误(因此要求能够重试发生数据，否则会有数据丢失)，直到内存用量低于_soft limit_；如果内存用量超过_hard limit_，则会强制执行一次GC。

**推荐将`memorylimiterprocessor`设置为第一个processor**。设置参数如下：

*   `check_interval` (默认 0s): 内存检查周期，推荐值为1s。如果Collector内存有尖刺，则可以降低`check_interval`或增加`spike_limit_mib`，以避免内存超过_hard limit_。
*   `limit_mib` (默认 0): 定义_hard limit_，进程堆申请的最大内存值，单位MiB。注意，通常总内存会高于该值约50MiB。
*   `spike_limit_mib` (默认为20%的 `limit_mib`): 测量内存使用之间预期的最大峰值，必须小于 `limit_mib`.。_soft limit_ 等于 (`limit_mib` - `spike_limit_mib`)，`spike_limit_mib`的推荐值为20% `limit_mib`。
*   `limit_percentage` (默认 0): 通过百分比来定义进程堆申请的最大内存，其优先级低于`limit_mib`
*   `spike_limit_percentage` (默认 0): 通过百分比来测量内存使用之间预期的最大峰值，只能和`limit_percentage`配合使用。

使用方式如下：

```yaml
processors:
  memory_limiter:
    check_interval: 1s
    limit_mib: 4000
    spike_limit_mib: 800
```

```yaml
processors:
  memory_limiter:
    check_interval: 1s
    limit_percentage: 50
    spike_limit_percentage: 30
```

#### 3.3 [batch processor](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor)

batch processor可以接收spans, metrics,或logs，通过压缩数据来降低数据传输所需的连接。

**推荐在每个Collector上都配置batch processor，并将其放到`memory_limiter`和sampling processors之后**。有根据大小和间隔时间两种batch发送模式。

配置参数如下：

*   `send_batch_size` (默认 8192): 定义发送batch的(spans, metric data points或 log records的)数目，超过该数值后会发送一个batch。
*   `timeout` (默认 200ms): 定义发送batch的超时时间，超过该时间会发送一个batch。如果设置为0，则会忽略`send_batch_size`并只根据 `send_batch_max_size`来发送数据。
*   `send_batch_max_size` (默认 0): batch的大小上限，必须大于或等于`send_batch_size`。 `0`表示没有上限。
*   `metadata_keys` (默认为空): 如果设置了该值，则processor会为每个不同组合的`client.Metadata`值创建一个batcher实例。[注意](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor#batching-and-client-metadata)使用元数据执行batch会增加batch所需要的内存。
*   `metadata_cardinality_limit` (默认1000): 当 `metadata_keys` 非空，该值限制了需要处理的metadata key的组合数目。

下面定义了一个默认的batch processor和一个自定义的batch processor。**注意这里只是声明，若要生效还需在[service](https://opentelemetry.io/docs/collector/configuration/#service)中引用。**

```yaml
processors:
  batch:
  batch/2:
    send_batch_size: 10000
    timeout: 10s
```

#### 3.4 [attributes processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/attributesprocessor) && [Resource Processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourceprocessor)

Resource Processor可以看作是attributes processor的子集，用于修改资源( span、log、metric)属性。

attributes processor有两个主要功能：[修改资源属性](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#attributes-processor)，以及[数据过滤](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering)。通常用于修改资源属性，数据过滤可以考虑使用[filterprocessor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor)。

下面是常见的修改资源属性的方式，类似prometheus修改label。更多参见官方[例子](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/testdata/config.yaml)：

```yaml
processors:
  attributes/example:
    actions:
      - key: db.table
        action: delete
      - key: redacted_span
        value: true
        action: upsert
      - key: copy_key
        from_attribute: key_original
        action: update
      - key: account_id
        value: 2245
        action: insert
      - key: account_password
        action: delete
      - key: account_email
        action: hash
      - key: http.status_code
        action: convert
        converted_type: int
```

#### 3.5 [filter processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor)

用于丢弃Collector采集的spans、span events、metrics、datapoints和logs。filterprocessor会使用OTTL语法来创建是否需要**丢弃**遥测数据的conditions，如果匹配任意condition，则丢弃。

| `traces.span`       | [Span](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/contexts/ottlspan/README.md) |
| ------------------- | ------------------------------------------------------------ |
| `traces.spanevent`  | [SpanEvent](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/contexts/ottlspanevent/README.md) |
| `metrics.metric`    | [Metric](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/contexts/ottlmetric/README.md) |
| `metrics.datapoint` | [DataPoint](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/contexts/ottldatapoint/README.md) |
| `logs.log_record`   | [Log](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/contexts/ottllog/README.md) |

如下面**丢弃**所有HTTP spans：

```yaml
processors:
  filter:
    error_mode: ignore
    traces:
      span:
        - attributes["http.request.method"] == nil
```

此外filter processor还支持[OTTL Converter functions](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl/ottlfuncs#converters)。如

```yaml
# Drops metrics containing the 'bad.metric' attribute key
filter/keep_good_metrics:
  error_mode: ignore
  metrics:
    metric:
      - 'HasAttrKeyOnDatapoint("bad.metric")'
```

#### 3.6 [k8s attributes processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor)

该processor可以自动发现k8s资源，然后将所需的metadata信息注入span、metrics和log中，作为[resources](https://opentelemetry.io/docs/languages/go/resources/)属性。

k8sattributesprocessor在接收到数据(log, trace or metric)时，会尝试将数据和pod进行匹配，如果匹配成功，则将相关的pod metadata注入该数据。默认情况下，k8sattributesprocessor使用入站的连接IP 和Pod IP进行关联，但也可以通过`resource_attribute`自定义关联方式：

每条规则包含一对`from`(表示规则类型)和`name`(如果`from`为`resource_attribute`，则表示属性名称)。

`from`有两种类型：

*   `connection`：使用连接上下午中的IP属性匹配数据。**使用此类型时，该processor必须位于任何batching或tail sampling之前**。
*   `resource_attribute`：从接收的资源中指定用于匹配数据的属性。只能使用metadata的属性。

```yaml
pod_association:
  # below association takes a look at the datapoint's k8s.pod.ip resource attribute and tries to match it with
  # the pod having the same attribute.
  - sources:
      - from: resource_attribute
        name: k8s.pod.ip
  # below association matches for pair `k8s.pod.name` and `k8s.namespace.name`
  - sources:
      - from: resource_attribute
        name: k8s.pod.name
      - from: resource_attribute
        name: k8s.namespace.name
```

默认情况下会提取并添加如下属性，可以通过`metadata`修改默认值：

*   `k8s.namespace.name`
*   `k8s.pod.name`
*   `k8s.pod.uid`
*   `k8s.pod.start_time`
*   `k8s.deployment.name`
*   `k8s.node.name`

k8sattributesprocessor支持从pods、namespaces和nodes的`labels`和`annotations`上提取(`extract`)资源属性。

```yaml
extract:
  annotations:
    - tag_name: a1 # extracts value of annotation from pods with key `annotation-one` and inserts it as a tag with key `a1`
      key: annotation-one
      from: pod
    - tag_name: a2 # extracts value of annotation from namespaces with key `annotation-two` with regexp and inserts it as a tag with key `a2`
      key: annotation-two
      regex: field=(?P<value>.+)
      from: namespace
    - tag_name: a3 # extracts value of annotation from nodes with key `annotation-three` with regexp and inserts it as a tag with key `a3`
      key: annotation-three
      regex: field=(?P<value>.+)
      from: node
  labels:
    - tag_name: l1 # extracts value of label from namespaces with key `label1` and inserts it as a tag with key `l1`
      key: label1
      from: namespace
    - tag_name: l2 # extracts value of label from pods with key `label2` with regexp and inserts it as a tag with key `l2`
      key: label2
      regex: field=(?P<value>.+)
      from: pod
    - tag_name: l3 # extracts value of label from nodes with key `label3` and inserts it as a tag with key `l3`
      key: label3
      from: node
```

完整例子如下，由于k8sattributesprocessor本身也是一个k8s Controller，因此需要通过`filter`指定listwatch的范围：

```yaml
k8sattributes:
k8sattributes/2:
  auth_type: "serviceAccount"
  passthrough: false
  filter:
    node_from_env_var: KUBE_NODE_NAME
  extract:
    metadata:
      - k8s.pod.name
      - k8s.pod.uid
      - k8s.deployment.name
      - k8s.namespace.name
      - k8s.node.name
      - k8s.pod.start_time
   labels:
     - tag_name: app.label.component
       key: app.kubernetes.io/component
       from: pod
  pod_association:
    - sources:
        - from: resource_attribute
          name: k8s.pod.ip
    - sources:
        - from: resource_attribute
          name: k8s.pod.uid
    - sources:
        - from: connection
```

#### 3.7 [Tail Sampling Processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/tailsamplingprocessor)

基于预定义的策略来采样traces。注意，为了有效执行采样策略，**必须在相同的Collector实例中处理一个trace下的所有spans**。**必须将该processor放到依赖context的processors(如`k8sattributes`)之后，否则重组会导致丢失原始的context。**在执行采样之前，会根据`trace_id`对spans进行分组，因此无需[`groupbytraceprocessor`](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/groupbytraceprocessor)就可以直接使用tail sampling processor。

`tailsamplingprocessor`中`and`是一个比较特别的策略，它会使用**AND逻辑串联多条策略**。例如下面例子中的`and`串联了多条策略，用于：

1.  过滤出`service.name`为`[service-1, service-2, service-3]`的数据
2.  然后从上述3个服务的数据中过滤出`http.route`为`[/live, /ready]`的数据
3.  最后将来自`[service-1, service-2, service-3]`服务的`[/live, /ready]`的数据的采样率设置为0.1

```yaml
        and:
          {
            and_sub_policy: # and逻辑的策略集
              [
                {
                  # filter by service name
                  name: service-name-policy,
                  type: string_attribute,
                  string_attribute:
                    {
                      key: service.name,
                      values: [service-1, service-2, service-3],
                    },
                },
                {
                  # filter by route
                  name: route-live-ready-policy,
                  type: string_attribute,
                  string_attribute:
                    {
                      key: http.route,
                      values: [/live, /ready],
                      enabled_regex_matching: true, #启用正则表达式
                    },
                },
                {
                  # apply probabilistic sampling
                  name: probabilistic-policy,
                  type: probabilistic,
                  probabilistic: { sampling_percentage: 0.1 },
                },
              ],
          },
```

更多参见官方[例子](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/tailsamplingprocessor#a-practical-example)

#### 3.8 [transform processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor)

该processor包含一系列与[Context 类型](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor#contexts)相关的conditions和statements，并按照配置顺序，对接收的遥测数据执行conditions和statements。它使用了一种名为[OpenTelemetry Transformation Language](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl)的类SQL语法。

transform processor可以trace、metrics和logs配置多个context statements，`context`指定了statements使用的[OTTL Context](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor#contexts)：

| Telemetry               | OTTL Context                                                 |
| ----------------------- | ------------------------------------------------------------ |
| `Resource`              | [Resource](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/contexts/ottlresource/README.md) |
| `Instrumentation Scope` | [Instrumentation Scope](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/contexts/ottlscope/README.md) |
| `Span`                  | [Span](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/contexts/ottlspan/README.md) |
| `Span Event`            | [SpanEvent](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/contexts/ottlspanevent/README.md) |
| `Metric`                | [Metric](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/contexts/ottlmetric/README.md) |
| `Datapoint`             | [DataPoint](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/contexts/ottldatapoint/README.md) |
| `Log`                   | [Log](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/contexts/ottllog/README.md) |

trace、metric和log支持的Context如下：

| Signal             | Context Values                                 |
| ------------------ | ---------------------------------------------- |
| trace\_statements  | `resource`, `scope`, `span`, and `spanevent`   |
| metric\_statements | `resource`, `scope`, `metric`, and `datapoint` |
| log\_statements    | `resource`, `scope`, and `log`                 |

每个statement可以包含一个`Where`子语句来校验是否执行statement。

transform processor 还支持一个可选字段，`error_mode`，用于确定processor如何应对statement产生的错误。

| error\_mode | description                                                  |
| ----------- | ------------------------------------------------------------ |
| ignore      | processor忽略错误，记录日志，并继续执行下一个statement，推荐模式。 |
| silent      | processor忽略错误，不记录日志，并继续执行下一个statement。   |
| propagate   | processor向pipeline返回错误，导致Collector丢弃payload。默认选项。 |

此外transform processor还支持OTTL[函数](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl/ottlfuncs)可以添加、删除、修改遥测数据。

如下面例子中，如果attribute `test`不存在，则将attribute `test`设置为`pass`：

```yaml
transform:
  error_mode: ignore
  trace_statements:
    - context: span
      statements:
        # accessing a map with a key that does not exist will return nil. 
        - set(attributes["test"], "pass") where attributes["test"] == nil
```

**[debug](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor#troubleshooting)**

通过在Collector启用debug日志来进行定位：

```yaml
receivers:
  filelog:
    start_at: beginning
    include: [ test.log ]
 
processors:
  transform:
    error_mode: ignore
    log_statements:
      - context: log
        statements:
          - set(resource.attributes["test"], "pass")
          - set(instrumentation_scope.attributes["test"], ["pass"])
          - set(attributes["test"], true)
 
exporters:
  debug:
 
service:
  telemetry:
    logs:
      level: debug
  pipelines:
    logs:
      receivers:
        - filelog
      processors:
        - transform
      exporters:
        - debug
```

#### 3.9 [routing processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/routingprocessor)

将logs, metrics 或 traces路由到指定的exporter。此processor需要根据入站的HTTP请求(gRPC)首部或资源属性值来将trace信息路由到特定的exporters。

**注意：**

*   **该processor会终结pipeline的后续processors，如果在该processor之后定义了其他processors，则会发出告警。**
*   **如果在pipeline中添加了一个exporter，则需要将其也添加到该processor中，否则不会生效。**
*   **由于该processor依赖HTTP首部或资源属性，因此需要谨慎在pipeline中使用aggregation processors(`batch` 或 `groupbytrace`)**

配置的必须参数如下：

*   `from_attribute`: HTTP header名称或资源属性名称，用于获取路由值。
*   `table`: processor的路由表
*   `table.value`: `FromAttribute`字段的可能值
*   `table.exporters`: 如果`FromAttribute`字段值匹配`table.value`，则使用此处定义的exporters。

可选字段如下：

*   `attribute_source`： 定义`from_attribute`的属性来源：
    *   `context` (默认) - 查询 [context](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/context/README.md)(包含HTTP headers)。**默认的`from_attribute`的数据来源**，可以手动注入，或由第三方服务(如网关)注入。
    *   `resource` - 查询资源属性
*   `drop_resource_routing_attribute` - 是否移除路由所用的资源属性。
*   `default_exporters`：无法匹配路由表的数据的exporters。

举例如下：

```yaml
processors:
  routing:
    from_attribute: X-Tenant
    default_exporters:
    - jaeger
    table:
    - value: acme
      exporters: [jaeger/acme]
exporters:
  jaeger:
    endpoint: localhost:14250
  jaeger/acme:
    endpoint: localhost:24250
```

### 4、Exporter

注意opentelemetry的Exporter**大部分是push模式**，需要发送到后端。

#### 4.1 [debug exporter](https://github.com/open-telemetry/opentelemetry-collector/tree/main/exporter/debugexporter)

调试使用，可以将遥测数据输出到终端，配置参数如下：

*   `verbosity`：(默认`basic`)，可选值为`basic`(输出摘要信息)、`normal`(输出实际数据)、`detailed`(输出详细信息)
*   `sampling_initial`：(默认`2`)，一开始每秒内输出的消息数
*   `sampling_thereafter`：(默认`1`)，在`sampling_initial`之后的采样率，`1`表示禁用该功能。[即](https://pkg.go.dev/go.uber.org/zap/zapcore#NewSamplerWithOptions)每秒内输出前`sampling_initial`个消息，然后再输出第`sampling_thereafter`个消息，丢弃其余消息。

```yaml
exporters:
  debug:
    verbosity: detailed
    sampling_initial: 5
    sampling_thereafter: 200
```

#### 4.2 [otlp exporter](https://github.com/open-telemetry/opentelemetry-collector/tree/main/exporter/otlpexporter)

使用[OTLP](https://github.com/open-telemetry/opentelemetry-proto/blob/main/docs/specification.md) 格式，通过gRPC**发送数据**，注意这是**push**模式，默认需要TLS。可以选择设置[retry和queue](https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/exporterhelper/README.md)。

```yaml
exporters:
  otlp:
    endpoint: otelcol2:4317
    tls:
      cert_file: file.cert
      key_file: file.key
  otlp/2:
    endpoint: otelcol2:4317
    tls:
      insecure: true
```

#### 4.3 [otlp http exporter](https://github.com/open-telemetry/opentelemetry-collector/tree/main/exporter/otlphttpexporter)

通过HTTP**发送[OTLP](https://github.com/open-telemetry/opentelemetry-proto/blob/main/docs/specification.md) 格式的数据**，

```yaml
endpoint: "https://1.2.3.4:1234"
tls:
  ca_file: /var/lib/mycert.pem
  cert_file: certfile
  key_file: keyfile
  insecure: true
timeout: 10s
read_buffer_size: 123
write_buffer_size: 345
sending_queue:
  enabled: true
  num_consumers: 2
  queue_size: 10
retry_on_failure:
  enabled: true
  initial_interval: 10s
  randomization_factor: 0.7
  multiplier: 1.3
  max_interval: 60s
  max_elapsed_time: 10m
headers:
  "can you have a . here?": "F0000000-0000-0000-0000-000000000000"
  header1: "234"
  another: "somevalue"
compression: gzip
```

#### 4.4 [prometheus exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/prometheusexporter)

使用 [Prometheus 格式](https://prometheus.io/docs/concepts/data_model/)暴露metrics，**pull模式**。

*   `endpoint`：暴露metrics的地址，路径为`/metrics`
*   `const_labels`: 为每个metrics追加的key/values
*   `namespace`: 如果设置，则指标暴露为`<namespace>_<metrics>`
*   `send_timestamps`: 默认`false`，是否在响应中发送metrics的采集时间
*   `metric_expiration`：默认`5m`，定义暴露的metrics无需更新的时长
*   `resource_to_telemetry_conversion`：默认`false`，如果启用，则会将所有resource attributes转变为metric labels
*   `enable_open_metrics`：默认`false`，如果启用，则会使用OpenMetrics格式暴露metrics，可以支持Exemplars功能。
*   `add_metric_suffixes`：默认`true`，如果false，则不会启用type和unit后缀。

```yaml
exporters:
  prometheus:
    endpoint: "1.2.3.4:1234" # 暴露地址为：https://1.2.3.4:1234/metrics
    tls:
      ca_file: "/path/to/ca.pem"
      cert_file: "/path/to/cert.pem"
      key_file: "/path/to/key.pem"
    namespace: test-space
    const_labels:
      label1: value1
      "another label": spaced value
    send_timestamps: true
    metric_expiration: 180m
    enable_open_metrics: true
    add_metric_suffixes: false
    resource_to_telemetry_conversion:
      enabled: true
```

推荐使用transform processor来将最常见的resource attribute设置为metric labels。

```yaml
processor:
  transform:
    metric_statements:
      - context: datapoint
        statements:
        - set(attributes["namespace"], resource.attributes["k8s.namespace.name"])
        - set(attributes["container"], resource.attributes["k8s.container.name"])
        - set(attributes["pod"], resource.attributes["k8s.pod.name"])
```

#### 4.5 [prometheus remote write exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/prometheusremotewriteexporter)

支持[HTTP 设置](https://github.com/open-telemetry/opentelemetry-collector/blob/main/config/confighttp/README.md)和[Retry 和 timeout 设置](https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/exporterhelper/README.md)

用于将opentelemetry metrics发送到兼容prometheus remote wirte的后端，如Cortex、Mimir和thanos等。

配置参数如下：

*   `endpoint`：remote write URL
*   `tls`：默认必须配置TLS
    *   `insecure`：默认`false`。如需启动TLS，则需要配置`cert_file`和`key_file`
*   `external_labels`：为每个metric添加额外的label name和value
*   `headers`：为每个HTTP 请求添加额外的header。
*   `add_metric_suffixes`：默认`true`，如果false，则不会启用type和unit后缀。
*   `send_metadata`：默认`false`，如果`true`，则会生成并发送prometheus metadata
*   `remote_write_queue`：配置remote write的队列和发送参数
    *   `enabled`: 启动发送队列，默认`true`
    *   `queue_size`: 入队列的OTLP指标数，默认`10000`
    *   `num_consumers`: 发送请求的最小workers数，默认`5`
*   `resource_to_telemetry_conversion`：默认`false`，如果`true`，则会将所有的resource attribute转变为metric labels。
*   `target_info`：默认`false`，如果`true`，则会为每个resource指标生成一个`target_info`指标
*   `max_batch_size_bytes`：默认 `3000000` -> `~2.861 mb`。发送给远端的batch采样数。如果一个batch大于该值，则会给切分为多个batches。

```yaml
exporters:
  prometheusremotewrite:
    endpoint: "https://my-cortex:7900/api/v1/push"
    external_labels:
      label_name1: label_value1
      label_name2: label_value2
    resource_to_telemetry_conversion:
      enabled: true # Convert resource attributes to metric labels
```

推荐使用transform processor来将最常见的resource attribute设置为metric labels。

```yaml
processor:
  transform:
    metric_statements:
      - context: datapoint
        statements:
        - set(attributes["namespace"], resource.attributes["k8s.namespace.name"])
        - set(attributes["container"], resource.attributes["k8s.container.name"])
        - set(attributes["pod"], resource.attributes["k8s.pod.name"])
```

#### 4.6 [loadbalancing exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/loadbalancingexporter)

基于`routing_key`实现spans, metrics 和 logs的负载均衡。如果不配置`routing_key`，则traces的默认值为`traceID`，metrics的默认值为`service`，即**相同`traceID`(或`service.name`(当`service`作为`routing_key`))的spans会被发送到相同的后端**。特别适用于tail-based samplers或red-metrics-collectors这种需要基于**完整trace**的后端。

> **需要注意的是负载均衡仅基于Trace ID或Service名称，且不会考虑实际后端的负载，也不会执行轮询负载均衡。**

`routing_key` 的可选值为:

| routing\_key | can be used for      |
| ------------ | -------------------- |
| service      | logs, spans, metrics |
| traceID      | logs, spans          |
| resource     | metrics              |
| metric       | metrics              |
| streamID     | metrics              |

可以通过**静态**或**DNS**的方式配置后端。当更新后端时，会根据R/N(路由总数/后端总数)重新路由。如果后端经常变动，可以考虑使用`groupbytrace` processor。

需要注意的是，如果后端出现异常，此时`loadbalancingexporter`并不会尝试重新发送数据，存在数据丢失的可能，因此**要求在exporter上配置queue和retry机制**。

*   当resolver为`static`时，**如果一个后端不可用，则会所有后端的数据负载均衡失败**，直到该后端恢复正常或从`static`列表中移除。`dns` resolver也遵循相同的原则。
*   当使用`k8s`、`dns`时，拓扑变更会最终反映到`loadbalancingexporter`上。

主要配置参数如下：

*   `otlp`：用于配置[OTLP exporter](https://github.com/open-telemetry/opentelemetry-collector/tree/main/exporter/otlpexporter)。注意此处无需配置`endpoint`，该字段会被resolver的后端覆盖。
*   `resolver`：可以配置一个`static` ，一个 `dns`，以及一个 `k8s` 或 `aws_cloud_map`，但不能同时指定4个resolvers。
    *   `dns`中的`hostname`用于获取IP地址列表，`port`指用于导入traces的端口，默认为4317；`interval`指定解析间隔，如`5s`, `1d`, `30m`，默认`5s`；`timeout`指定解析超时时间，如`5s`, `1d`, `30m`，默认`1s`
    *   `k8s`中的`service`指kubernetes的service域名，如`lb-svc.lb-ns`。`port`指用于导入traces的端口，默认为4317，如果指定了多个端口，则会在loadbalancer中添加对应的backend，就像不同的pods一样；`timeout`指定解析超时时间，如`5s`, `1d`, `30m`，默认`1s`
*   `routing_key`：用于数据(spans或metrics)路由。目前仅支持`trace`和`metrics` 类型。支持如下参数：
    *   `service`：基于service 名称进行路由。非常适用于span metrics，这样每个服务的所有spans都会被发送到一致的metrics Collector中。否则相同服务的metrics可能会被发送到不同的Collectors上，造成聚合不精确。
    *   `traceID`：根据`traceID`路由spans。metrics无效。
    *   `metric`：根据metric名称路由metrics。spans无效。
    *   `streamID`：根据数据的streamID路由metrics。streamID为对attributes和resource、scope和metrics数据哈希产生的唯一值。

在下面例子中可以确保相同traceID的spans发送到相同的后端(Pod)上， ：

```yaml
    receivers:
      otlp/external:
        protocols:
          grpc:
            endpoint: ${env:MY_POD_IP}:4317
          http:
            endpoint: ${env:MY_POD_IP}:4318
      otlp/internal:
        protocols:
          grpc:
            endpoint: ${env:MY_POD_IP}:14317
          http:
            endpoint: ${env:MY_POD_IP}:14318
            
    exporters:
      loadbalancing/internal:
        protocol:
          otlp:
            sending_queue:
              queue_size: 50000
            timeout: 1s
            tls:
              insecure: true
        resolver:
          k8s:
            ports:
            - 14317
            service: infrastructure-opentelemetry-tracingcollector.infrastructure-opentelemetry
            timeout: 10s
      otlphttp/tempo:
        endpoint: http://infrastructure-tracing-tempo.net:14252/otlp
        sending_queue:
          queue_size: 50000
        tls:
          insecure: true
 
    service:
      pipelines:
        traces:
          exporters:
          - loadbalancing/internal
          processors:
          - memory_limiter
          - resource/metadata
          receivers:
          - otlp/external
        traces/loadbalancing:
          exporters:
          - otlphttp/tempo
          processors:
          - memory_limiter
          - resource/metadata
          - tail_sampling
          receivers:
          - otlp/internal
```

![](%E5%9B%BE%E7%89%87/Opentelemetry-loadbalancingexporter.png)

### 5、Connector

Connector可以将两个pipelines连接起来，使其中一个pipeline作为exporter，另一个作为receiver。connector可以看作一个exporter，从一个pipeline的尾部消费数据，从将数据发送到另一个pipeline开始处的receiver上。可以使用connector消费、复制或路由数据。

下面表示将`traces`的数据导入`metrics`中：

```yaml
receivers:
  foo/traces:
  foo/metrics:
exporters:
  bar:
connectors:
  count:
service:
  pipelines:
    traces:
      receivers: [foo/traces]
      exporters: [count]
    metrics:
      receivers: [foo/metrics, count]
      exporters: [bar]
```

#### 5.1 [roundrobin connector](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/roundrobinconnector)

用于使用轮询方式实现负载均衡，适用于可扩展性不是很好的exporter，如`prometheusremotewrite`，下面用于将接收到的数据(`metrics`)以轮询方式分发到不同的prometheusremotewrite(`metrics/1`和`metrics/2`):

```yaml
receivers:
  otlp:
processors:
  resourcedetection:
  batch:
exporters:
  prometheusremotewrite/1:
  prometheusremotewrite/2:
connectors:
  roundrobin:
service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [resourcedetection, batch]
      exporters: [roundrobin]
    metrics/1:
      receivers: [roundrobin]
      exporters: [prometheusremotewrite/1]
    metrics/2:
      receivers: [roundrobin]
      exporters: [prometheusremotewrite/2]
```

#### 5.2 [span metrics connector](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/spanmetricsconnector)

用于从span数据中聚合Request、Error和Duration(R.E.D) metrics。

* **Request**:

  ```sql
  calls{service.name="shipping",span.name="get_shipping/{shippingId}",span.kind="SERVER",status.code="Ok"}
  ```

* **Error**:

  ```sql
  calls{service.name="shipping",span.name="get_shipping/{shippingId},span.kind="SERVER",status.code="Error"}
  ```

* **Duration**:

  ```sql
  duration{service.name="shipping",span.name="get_shipping/{shippingId}",span.kind="SERVER",status.code="Ok"}
  ```

每条metric至少包含如下dimension(所有span都存在这些dimensions)：

*   `service.name`
*   `span.name`
*   `span.kind`
*   `status.code`

常见参数如下：

*   `histogram`：默认`explicit`，用于配置histogram，只能选择`explicit`或`exponential`
    *   `disable`：默认`false`，禁用所有histogram metrics
    *   `unit`：默认`ms`，可以选择`ms`或`s`
    *   `explicit`：指定histogram的time bucket Duration。默认`[2ms, 4ms, 6ms, 8ms, 10ms, 50ms, 100ms, 200ms, 400ms, 800ms, 1s, 1400ms, 2s, 5s, 10s, 15s]`
    *   `exponential`：正负数范围内的最大bucket数
*   `dimensions`：除默认的dimensions之外还需添加的dimensions。每个dimension必须定一个`name`字段来从span的attributes集合或resource attribute中进行查找，如`ip`，`host.name`或`region`。如果没有在span中找到`name`属性，则查找`default`中定义的属性，如果没有定义`default`，则忽略此dimension
*   `exclude_dimensions`：从default dimensions中排除的dimensions列表。用于从metrics排除掉不需要的数据。
*   `dimensions_cache_size`：保存Dimensions的缓存大小，默认`1000`。
*   `metrics_flush_interval`：flush 生成的metrics的间隔，默认60s。
*   `metrics_expiration`：如果在该时间内没有接收到任何新的spans，则不会再export metrics。默认`0`，表示不会超时。
*   `metric_timestamp_cache_size`：，默认`1000`。
*   `events`：配置events metrics。
    *   `enable`：默认`false`
    *   `dimensions`：如果enable，则该字段必须存在。event metric的额外的Dimension
*   `resource_metrics_key_attributes`：过滤用于生成resource metrics key哈希值的resource attributes，可以防止resource attributes变动影响到Counter metrics。

```yaml
receivers:
  nop:
 
exporters:
  nop:
 
connectors:
  spanmetrics:
    histogram:
      explicit:
        buckets: [100us, 1ms, 2ms, 6ms, 10ms, 100ms, 250ms]
    dimensions:
      - name: http.method
        default: GET
      - name: http.status_code
    exemplars:
      enabled: true
    exclude_dimensions: ['status.code']
    dimensions_cache_size: 1000
    aggregation_temporality: "AGGREGATION_TEMPORALITY_CUMULATIVE"    
    metrics_flush_interval: 15s
    metrics_expiration: 5m
    events:
      enabled: true
      dimensions:
        - name: exception.type
        - name: exception.message
    resource_metrics_key_attributes:
      - service.name
      - telemetry.sdk.language
      - telemetry.sdk.name
 
service:
  pipelines:
    traces:
      receivers: [nop]
      exporters: [spanmetrics]
    metrics:
      receivers: [spanmetrics]
      exporters: [nop]
```

### 6、[troubleshooting](https://opentelemetry.io/docs/collector/troubleshooting/)

*   使用 [debug exporter](https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/debugexporter/README.md)
*   使用 [pprof extension](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/pprofextension/README.md)，暴露端口为`1777`，采集pprof数据
*   使用 [zPages extension](https://github.com/open-telemetry/opentelemetry-collector/tree/main/extension/zpagesextension/README.md)， 暴露端口为`55679`，地址为`/debug/tracez`可以定位如下问题：
    *   延迟问题
    *   死锁和工具问题
    *   错误

### 7、扩容

#### 7.1 何时扩容

*   当使用`memory_limiter` processor时，可以通过`otelcol_processor_refused_spans`来检查内存是否充足
*   Collector会使用queue来保存需要发送的数据，如果`otelcol_exporter_queue_size` > `otelcol_exporter_queue_capacity`则会拒绝数据(`otelcol_exporter_enqueue_failed_spans`)
*   此外特定组件也会暴露相关metrics，如`otelcol_loadbalancer_backend_latency`

#### 7.2 如何扩容

对于扩容，可以将组件分为三类：stateless、scrapers 和 stateful。对于stateless来说只需要增加副本数即可。

**scrapers**

对于[hostmetricsreceiver](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor)和[prometheusreceiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver)这样的receivers，不能简单地增加实例数，否则会导致每个Collector都scrape系统的endpoints。可以通过[Target Allocator](https://opentelemetry.io/docs/kubernetes/operator/target-allocator/)来对endpoints进行分片。

**stateful**

对于某些将数据存放在内存中的组件来说，扩容可能会导致不同的结果。如tail-sampling processor，它会在内存中保存一定时间的spans数据，并在认为trace结束时评估采样决策。如果通过增加副本数来对此类Collector进行扩容，就会导致不同的Collectors接收到相同trace的spans，导致每个Collector都会评估是否应该对该trace进行采样，从而可能得到不同的结果(trace丢失spans)。

类似的还有span-to-metrics processor，当不同的Collectors接收到相同服务的数据时，基于service name聚合就会变得不精确。

**为了避免该问题，可以在执行tail-sampling 或 span-to-metrics 前面加上 load-balancing exporter**， load-balancing exporter会根据trace ID 或service name获取哈希值，保证后端的Collector接收到一致的数据。

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
 
processors:
 
exporters:
  loadbalancing:
    protocol:
      otlp:
    resolver:
      dns:
        hostname: otelcol.observability.svc.cluster.local
 
service:
  pipelines:
    traces:
      receivers:
        - otlp
      processors: []
      exporters:
        - loadbalancing
```

## 十一、常见问题

### 1、Metrics指标采集

#### 1.1 kubeletMetrics和hostMetrics无k8s信息

在exporters中prometheusremotewrite下，配置启用resource_to_telemetry_conversion

```
exporters:
        prometheusremotewrite:
          endpoint: "http://nodes.public.n9e.test:8428/api/v1/write"
          resource_to_telemetry_conversion:
            enabled: true          
          tls:
            insecure: true     
```

### 2、Log采集

```
参考文档：https://www.dash0.com/guides/opentelemetry-filelog-receiver
```

#### 2.1 日志动态采集

daemonset启用annotationDiscovery

```
参考文档：https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/v0.135.0/receiver/receivercreator?spm=a2ty_o01.29997173.0.0.607f5171cLKAQL#examples
```

gateway处理过滤日志，实现动态数据流，日志字段优化

```
参考文档：https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.135.0/processor/transformprocessor/README.md
```

