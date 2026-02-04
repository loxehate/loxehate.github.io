---
title: Vector详解
tags: [Vector]
categories: [中间件,监控观测]
date: 2026-02-04
---
### 一、概念

#### 1、什么是vector

描述摘自官方文档：https://vector.dev/docs/about/what-is-vector/

```
Vector 是一个高性能的可观测性数据管道，可帮助企业控制其可观测性数据。收集、转换和路由所有日志、度量指标和跟踪数据，并将其提供给今天需要的任何供应商和明天可能需要的任何其他供应商。Vector 可在您需要的地方，而不是在供应商最方便的地方，大幅降低成本、丰富新颖的数据并确保数据安全。开放源代码，速度比其他任何替代方案快 10 倍。
```

简单来说由于logstash使用java语言开发，在处理海量数据时存在性能低下，占用资源过高的问题。而vector使用Rust语言编写，除了使用极少的资源实现logstash数据处理能力外，还具备配置文件简单、处理函数强大、智能均衡kafka分区消费、自适应并发请求等特色功能。

#### 2、vector架构图

与logstash管道处理类似，vector主要包含数据输入、数据处理、数据输出三部分。

![](%E5%9B%BE%E7%89%87/vector%E6%9E%B6%E6%9E%84%E5%9B%BE.png)

#### 3、vector优势

```
超级快速可靠：Vector采用Rust构建，速度极快，内存效率高，旨在处理最苛刻的工作负载

端到端：Vector 致力于成为从 A 到 B 获取可观测性数据所需的唯一工具，并作为守护程序、边车或聚合器进行部署

统一：Vector 支持日志和指标，使您可以轻松收集和处理所有可观测性数据

供应商中立：Vector 不偏向任何特定的供应商平台，并以您的最佳利益为出发点，培育公平、开放的生态系统。免锁定且面向未来

可编程转换：Vector 的高度可配置转换为您提供可编程运行时的全部功能。无限制地处理复杂的用例
```

### 二、对比测试

#### 1、性能对比

 Vector 与其它日志收集器的性能测试结果对比，可以看到，Vector 的各项性能指标都优于 Logstash，综合性能也不错，加上其丰富的功能，完全可以满足我们的日志处理需求。

| Test             | Vector    | Filebeat | FluentBit | FluentD   | Logstash  | SplunkUF  | SplunkHF |
| ---------------- | --------- | -------- | --------- | --------- | --------- | --------- | -------- |
| TCP to Blackhole | 86mib/s   | n/a      | 64.4mib/s | 27.7mib/s | 40.6mib/s | n/a       | n/a      |
| File to TCP      | 76.7mib/s | 7.8mib/s | 35mib/s   | 26.1mib/s | 3.1mib/s  | 40.1mib/s | 39mib/s  |
| Regex Parsing    | 13.2mib/s | n/a      | 20.5mib/s | 2.6mib/s  | 4.6mib/s  | n/a       | 7.8mib/s |
| TCP to HTTP      | 26.7mib/s | n/a      | 19.6mib/s | <1mib/s   | 2.7mib/s  | n/a       | n/a      |
| TCP to TCP       | 69.9mib/s | 5mib/s   | 67.1mib/s | 3.9mib/s  | 10mib/s   | 70.4mib/s | 7.6mib/s |

#### 2、可靠性对比

| Test                       | Vector | Filebeat | FluentBit | FluentD | Logstash | Splunk UF | Splunk HF |
| -------------------------- | ------ | -------- | --------- | ------- | -------- | --------- | --------- |
| Disk Buffer Persistence    | **✓**  | ✓        |           |         | ⚠        | ✓         | ✓         |
| File Rotate (create)       | **✓**  | ✓        | ✓         | ✓       | ✓        | ✓         | ✓         |
| File Rotate (copytruncate) | **✓**  |          |           |         |          | ✓         | ✓         |
| File Truncation            | **✓**  | ✓        | ✓         | ✓       | ✓        | ✓         | ✓         |
| Process (SIGHUP)           | **✓**  |          |           |         | ⚠        | ✓         | ✓         |
| JSON (wrapped)             | **✓**  | ✓        | ✓         | ✓       | ✓        | ✓         | ✓         |

#### 3、功能性对比

|                     | Vector | Beats | Fluentbit | Fluentd | Logstash | Splunk UF | Splunk HF | Telegraf |
| ------------------- | ------ | ----- | --------- | ------- | -------- | --------- | --------- | -------- |
| End-to-end          | ✓      |       |           |         |          |           |           | ✓        |
| Agent               | ✓      | ✓     | ✓         |         |          | ✓         |           | ✓        |
| Aggregator          | ✓      |       |           | ✓       | ✓        |           | ✓         | ✓        |
| Unified             | ✓      |       |           |         |          |           |           | ✓        |
| Logs                | ✓      | ✓     | ✓         | ✓       | ✓        | ✓         | ✓         | ✓        |
| Metrics             | ✓      | ⚠     | ⚠         | ⚠       | ⚠        | ⚠         | ⚠         | ✓        |
| Open                | ✓      |       | ✓         | ✓       |          |           |           | ✓        |
| Open-source         | ✓      | ✓     | ✓         | ✓       | ✓        |           |           | ✓        |
| Vendor-neutral      | ✓      |       | ✓         | ✓       |          |           |           | ✓        |
| Reliability         | ✓      |       |           |         |          |           |           |          |
| Memory-safe         | ✓      |       |           |         |          |           |           | ✓        |
| Delivery guarantees | ✓      |       |           |         |          | ✓         | ✓         |          |
| Multi-core          | ✓      | ✓     | ✓         | ✓       | ✓        | ✓         | ✓         | ✓        |

### 三、快速上手

#### 1、安装部署

官方为我们提供了安装包、docker等多种安装方式，下载地址：https://vector.dev/download/，此处以rpm包部署为例。centos7最高只能部署vector-0.34.0版本。

```
[root@tiaoban ~]# wget https://packages.timber.io/vector/0.34.0/vector-0.34.0-1.x86_64.rpm
[root@tiaoban ~]# rpm -ivh vector-0.34.0-1.x86_64.rpm
[root@tiaoban ~]# systemctl start vector --now
```

#### 2、配置测试

与logstash类似，在调试数据处理规则时，通常会从文件中读取数据，经过一系列处理后最后输出至控制台。其作用是读取 /var/log/messages日志文件，然后把 syslog 格式的日志转换成 json 格式，最后输出到标准输出：

```
[root@tiaoban ~]# cd /etc/vector/
[root@tiaoban vector]# ls
examples  vector.yaml  vector.yaml.back
[root@tiaoban vector]# cat vector.yaml
sources:
  in:
    type: "stdin"

sinks:
  print:
    type: "console"
    inputs: ["in"]
    encoding:
      codec: "json"
[root@tiaoban vector]# vector -c vector.yaml
2023-11-12T13:40:06.995872Z  INFO vector::app: Log level is enabled. level="vector=info,codec=info,vrl=info,file_source=info,tower_limit=info,rdkafka=info,buffers=info,lapin=info,kube=info"
2023-11-12T13:40:06.996328Z  INFO vector::app: Loading configs. paths=["vector.yaml"]
2023-11-12T13:40:06.998137Z  INFO vector::topology::running: Running healthchecks.
2023-11-12T13:40:06.998206Z  INFO vector: Vector has started. debug="false" version="0.34.0" arch="x86_64" revision="c909b66 2023-11-07 15:07:26.748571656"
2023-11-12T13:40:06.998219Z  INFO vector::app: API is disabled, enable by setting `api.enabled` to `true` and use commands like `vector top`.
2023-11-12T13:40:06.998590Z  INFO vector::topology::builder: Healthcheck passed.
2023-11-12T13:40:06.998766Z  INFO vector::sources::file_descriptors: Capturing stdin.
hello vector
{"host":"tiaoban","message":"hello vector","source_type":"stdin","timestamp":"2023-11-12T13:40:13.368669601Z"}
```

当控制台开始打印日志，就说明正常采集到了数据，而且转换成了 json 并打印到了控制台，实验成功。接下来详细介绍vector各个配置段具体内容。

#### 3、多配置文件

当项目、环境、规则等十分庞杂时，推荐对配置文件根据需要进行拆分，而默认的 vector.toml 文件中可以写入一些全局配置。
修改systemctl 命令管理相关配置，让 Vector 读取指定目录下所有配置文件，而非默认的 vector.toml 文件。
将 Vector systemd 配置文件第 12 行由 ExecStart=/usr/bin/vector 修改为：ExecStart=/usr/bin/vector “–config-dir” “/etc/vector”：

```
# /usr/lib/systemd/system/vector.service
[Unit]
Description=Vector
Documentation=https://vector.dev
After=network-online.target
Requires=network-online.target


[Service]
User=vector
Group=vector
ExecStartPre=/usr/bin/vector validate
ExecStart=/usr/bin/vector "--config-dir" "/etc/vector"
ExecReload=/usr/bin/vector validate
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
AmbientCapabilities=CAP_NET_BIND_SERVICE
EnvironmentFile=-/etc/default/vector
# Since systemd 229, should be in [Unit] but in order to support systemd <229,
# it is also supported to have it here.
StartLimitInterval=10
StartLimitBurst=5
[Install]
WantedBy=multi-user.target
```

修改 vector 配置目录环境变量，将 VECTOR_CONFIG_DIR="/etc/vector/"追加到 /etc/default/vector 文件最后：

```
# /etc/default/vector
# This file can theoretically contain a bunch of environment variables
# for Vector.  See https://vector.dev/docs/setup/configuration/#environment-variables
# for details.
VECTOR_CONFIG_DIR="/etc/vector/"
```

重新加载 systemd 配置并重启 Vector：

```
systemctl daemon-reload
systemctl restart vector
```

### 四、配置文件详解

#### 1、配置文件构成

根据架构图可知，Vector由 Sources、Transforms和Sinks三个部分构成，Vector作为一款管道处理工具，日志数据可以从多个源头（source）流入管道，比如 HTTP、Syslog、File、Kafka 等等，当日志数据流入管道后，就可以被进行一系列处理，处理的过程就是转换（Transform），比如增减日志中的一些字段，对日志进行重新格式化等操作，日志被处理成想要的样子后，就可以传输给接收器（Sink）处理，也就是日志最终流向何处，可以是 Elasticsearch、ClickHouse、AWS S3 等等，配置文件基本格式如下

```
sources:	# 源
  my_source_id:   # 数据源名称
    type: "***" # 数据源类型
    
transforms: # 转换
  my_transform_id: # 转换名称
    type: remap # 转换类型
    inputs: # 转换操作的源
      - my_source_id
```

#### 2、源(source)

Vector 提供了丰富的 Sources 供使用，常用的有控制台、模拟数据、File、http、Kafka等，并且支持的种类还在不断增加，详情参考官方文档https://vector.dev/docs/reference/configuration/sources/。

- 控制台输入

```
sources:
  my_source_id:   # 数据源名称
    type: "stdin"
```

- 模拟日志数据输入

```
sources:
  my_source_id:  # 数据源名称
    type: "demo_logs"
    format: "apache_common"  # 模拟数据类型
    count:  10 # 模拟数据条数
```

- file输入示例：

```
sources:
  my_source_id:   # 数据源名称
    type: "file"
    include:			# 采集路径
      - /var/log/**/*.log
```

- http输入示例：

```
sources:
  my_source_id:  # 数据源名称
    type: "http_server"
    address: "0.0.0.0:80" # 监听地址
```

- kafka输入示例：

```
sources:
  my_source_id: # 数据源名称
    type: "kafka"
    bootstrap_servers: "10.14.22.123:9092,10.14.23.332:9092" # kafka地址
    group_id: "consumer-group-name"	# 消费组id
    topics: # 消费主题，支持多个topic使用正则匹配
      - ^(prefix1|prefix2)-.+
    decoding: # 编码格式
      codec: "json"
    auto_offset_reset: "latest" # 消费偏移
```

#### 3、转换(transforms)-VRL
```
VRL常用函数：https://vector.dev/docs/reference/vrl/functions/
VRL常用案例：https://vector.dev/docs/reference/vrl/examples/
VRL时间格式化：https://docs.rs/chrono/latest/chrono/format/strftime/index.html#specifiers
```
在Vector传输数据时，可能涉及数据解析、过滤、新增等操作，跟Logstash组件类似，Vector 提供了诸多 Transforms插件来对日志进行处理。 更多transforms插件参考文档：https://vector.dev/docs/reference/configuration/transforms/
Vector推荐使用remap插件处理数据，它使用VRL语言对日志进行处理，它提供了非常丰富的函数，可以拿来即用。在线调试地址：https://playground.vrl.dev/，VRL语言快速入门参考文档：https://vector.dev/docs/reference/vrl/
接下来列举几个常用的转换案例

- 字段增删改

```
# 配置文件
sources:
  my_source:   # 数据源名称
    type: "stdin"

transforms:
  my_transform:
    type: remap
    inputs:    # 匹配输入源
      - my_source
    source: |
      . = parse_json!(.message) # 解析json数据
      .@timestamp = now() # 新增字段
      del(.user) # 删除字段
      .age = del(.value) # 重命名字段

sinks:
  my_print:
    type: "console"
    inputs: ["my_transform"] # 匹配过滤项
    encoding:
      codec: "json"
# 执行结果
{"hello":"world","user":"张三","value":18}
{"@timestamp":"2023-11-19T03:02:07.060420199Z","age":18,"hello":"world"}
```

- 字段值操作

```
# 配置文件
sources:
  my_source:   # 数据源名称
    type: "stdin"

transforms:
  my_transform:
    type: remap
    inputs:    # 匹配输入源
      - my_source
    source: |
      . = parse_json!(.message) # 解析json数据
      .msg = downcase(string!(.msg)) # 转小写
      .user = replace(string!(.user), "三", "四") # 字符串替换
      .value = floor(float!(.value), precision: 2) # 小数保留指定长度

sinks:
  my_print:
    type: "console"
    inputs: ["my_transform"] # 匹配过滤项
    encoding:
      codec: "json"
# 执行结果
{"msg":"Hello, World!","user":"张三","value":3.1415926}
{"msg":"hello, world!","user":"张四","value":3.14}
```

- 正则解析

```
# 配置文件
sources:
  my_source:   # 数据源名称
    type: "stdin"

transforms:
  my_transform:
    type: remap
    inputs:    # 匹配输入源
      - my_source
    source: |
      . = parse_regex!(.message, r'^\[(?<logtime>[^\]]*)\] (?<name>[^ ]*) (?<title>[^ ]*) (?<id>\d*)$')

sinks:
  my_print:
    type: "console"
    inputs: ["my_transform"] # 匹配过滤项
    encoding:
      codec: "json"
# 执行结果
[2023-11-11 12:00:00 +0800] alice engineer 1
{"id":"1","logtime":"2023-11-11 12:00:00 +0800","name":"alice","title":"engineer"}
```

- 时间格式化

```
# 配置文件
sources:
  my_source:   # 数据源名称
    type: "stdin"

transforms:
  my_transform:
    type: remap
    inputs:    # 匹配输入源
      - my_source
    source: |
      . = parse_regex!(.message, r'^\[(?<logtime>[^\]]*)\] (?<name>[^ ]*) (?<title>[^ ]*) (?<id>\d*)$')
      .logtime = parse_timestamp!((.logtime), format:"%Y-%m-%d %H:%M:%S %:z")
sinks:
  my_print:
    type: "console"
    inputs: ["my_transform"] # 匹配过滤项
    encoding:
      codec: "json"
# 执行结果
[2023-11-11 12:00:00 +0800] alice engineer 1
{"id":"1","logtime":"2023-11-11T04:00:00Z","name":"alice","title":"engineer"}
```

- geoip解析

```
# 配置文件
sources:
  my_source:   # 数据源名称
    type: "stdin"

transforms:
  my_transform:
    type: remap
    inputs:    # 匹配输入源
      - my_source
    source: |
      . = parse_json!(.message) # 解析json数据
      .geoip = get_enrichment_table_record!("geoip_table",
        {
          "ip": .ip_address
        })

sinks:
  my_print:
    type: "console"
    inputs: ["my_transform"] # 匹配过滤项
    encoding:
      codec: "json"

enrichment_tables:
  geoip_table: # 指定geoip数据库文件
    path: "/root/GeoLite2-City.mmdb"
    type: geoip
# 执行结果
{"ip_address":"185.14.47.131"}
{"geoip":{"city_name":"Hong Kong","continent_code":"AS","country_code":"HK","country_name":"Hong Kong","latitude":22.2842,"longitude":114.1759,"metro_code":null,"postal_code":null,"region_code":"HCW","region_name":"Central and Western District","timezone":"Asia/Hong_Kong"},"ip_address":"185.14.47.131"}
```

#### 4、转换(transforms)-Lua

```
如果 VRL 不能满足用户对日志的处理需求，Vector 也支持嵌入 Lua 语言对日志进行处理，但是这种方式要比 VRL 慢将近 60 %。具体内容可参考文档：https://vector.dev/docs/reference/configuration/transforms/lua/，此处不再做过多介绍，推荐优先使用VRL语言转换。
```

#### 5、转换(transforms)-过滤

很多时候从数据源采集过来的数据我们并不是全部都需要，filter顾名思义便是用来解决这一问题的，例如删除debug等级的日志信息。

```
# 配置文件
sources:
  my_source:   # 数据源名称
    type: "stdin"

transforms:
  transform_json:
    type: remap
    inputs:    # 匹配输入源
      - my_source
    source: |
      . = parse_json!(.message) # 解析json数据
    
  transform_filter:
    type: filter
    inputs:
      - transform_json
    condition: |
      .level != "debug"
  

sinks:
  my_print:
    type: "console"
    inputs: ["transform_filter"] # 匹配过滤项
    encoding:
      codec: "json"
# 执行结果
{"level":"debug","msg":"hello"}
{"level":"waring","msg":"hello"}
{"level":"waring","msg":"hello"}
```

#### 6、接收器(sinks)

接收器是事件的目的地，Vector同样提供了很多 Sinks 类型，其中有些和 Sources 是重合的，比如 Kafka、AWS S3 等，更多支持的接收器类型可参考文档：https://vector.dev/docs/reference/configuration/sinks/

- 输出到控制台

```
sinks:
  print:
    type: "console"
    inputs: ["in"]
    encoding:
      codec: "json" # 输出为json格式，也可设置为text文件
```

- 输出到文件

```
sinks:
  my_sink_id:
    type: file
    inputs:
      - my-source-or-transform-id
    path: /tmp/vector-%Y-%m-%d.log
    encoding:
      codec: "text"
```

- 输出到kafka

```
sinks:
  my_sink_id:
    type: kafka
    inputs:
      - my-source-or-transform-id
    bootstrap_servers: 10.14.22.123:9092,10.14.23.332:9092
    topic: topic-1234
```

- 输出到elasticsearch

```
sinks:
  my_es:
    type: elasticsearch
    inputs: ["my_transform"] # 匹配转换配置
    api_version: "v8"        # ES版本，非必填
    mode: "data_stream" # 数据流方式写入
    auth: # es认证信息 
      strategy: "basic"
      user: "elastic"
      password: "WbZN3xfa5M4uy+UcxJeH"
    data_stream: # 数据流名称配置
      type: "logs"
      dataset: "vector"
      namespace: "default"
    endpoints: ["https://192.168.10.50:9200"] # es连接地址
    tls: # tls证书配置
      verify_certificate: false # 跳过证书验证
      # ca_file: "XXXXX" # ca证书路径
```

#### 7、全局配置

- 数据目录

```
#用于持久化 Vector 状态的目录，例如 作为磁盘缓冲区、文件检查点等功能。
data_dir: "/var/lib/vector"
```

- API

```
#vector为我们提供了常用的API接口，可以很方便的进行监控检查与状态信息获取。首先打开 Vector 的 api 功能，在 vector.toml 配置文件中加入以下内容即可：

api:
  enabled: true
  address: "0.0.0.0:8686"
```

重启 Vector，获取 Vector 的健康状态：

```
$ curl localhost:8686/health
{"ok":true}
```

开启api后，我们还可以通过命令行`vector top`命令获取各个任务的性能信息

![](%E5%9B%BE%E7%89%87/vector-top.png)

### 五、监控

#### 1、指标

- prometheus_remote_write

将 Vector 内部指标 Sink 到 Prometheus，据此建立更为详细的 Dashboard 和告警。
在 vector.toml 配置文件中加入以下内容即可，vector 内置的指标通过远程写入的方式写入指定的 Prometheus中。

```
sources:
  vector_metrics:
    type: internal_metrics
sinks:
  prometheus:
    type:
      - prometheus_remote_write
    endpoint:
      - https://<prometheus_ip_address>:8087/
    inputs:
      - vector_metrics
```

- prometheus_exporter

除了远程写入外，vector也支持通过exporter方式保留指标数据供Prometheus抓取，配置文件如下

```
sources:
  metrics:
    type: internal_metrics
    namespace: vector
    scrape_interval_secs: 30

sinks:
  prometheus:
    type: prometheus_exporter
    inputs:
      - metrics
    address: 0.0.0.0:9598
    default_namespace: service
```

然后在Prometheus的job中配置地址为`http://IP:9598/metrics`即可

#### 2、日志

将vector的运行日志写入本地文件或者elasticsearch中存储，以本地存储为例：

```
sources:
  logs:
    type: "internal_logs"

sinks:
  files:
    type: file
    inputs:
      - logs
    path: /tmp/vector-%Y-%m-%d.log
    encoding:
      codec: text
```

### 六、特色功能

#### 1、vector自动均衡kafka消费

```
在之前使用logstash消费kafka数据时，需要根据topic数据量大小配置kafka partition数、Logstash副本数、每个logstash线程数，而这些数量只能根据性能监控图和数据量逐个调整至合适的大小。例如有6台logstash机器，其中5台机器专门用于消费数据量大的topic，其他机器消费小数据量的topic，经常存在logstash节点负载不均衡的问题。

使用vector后，我们只需要让所有机器使用相同的配置，借助Kafka的Consumer Group技术，不同配置文件通过同一个group_id即可一起消费所有的topic，vector在消费的过程中会自动均衡kafka消费速率。
```

#### 2、自适应并发请求

在0.11.0版本后默认启用了自适应并发，这是一个智能、强大的功能，官方介绍https://vector.dev/blog/adaptive-request-concurrency/#rate-limiting-problem
在之前的版本中，为了保障数据正常写入下游[Elasticsearch](https://vector.dev/docs/reference/configuration/sinks/elasticsearch/)或[Clickhouse](https://vector.dev/docs/reference/configuration/sinks/clickhouse/)时，需要进行速率限制。但限制速率值设定存在以下问题

- 将限制设置得太高，从而使服务不堪重负，从而损害系统可靠性。
- 设置的限制太低，浪费资源。

为了解决这个问题，vector推出了自适应并发的功能，它会重点观察两件事：请求的往返时间 (RTT) 和 HTTP 响应代码（失败与成功），从而决策出一个最佳的速率！

![](%E5%9B%BE%E7%89%87/vector-adaptive.png)

在写入[Elasticsearch](https://vector.dev/docs/reference/configuration/sinks/elasticsearch/)或[Clickhouse](https://vector.dev/docs/reference/configuration/sinks/clickhouse/)时，默认已将其设为启用， 不需要进一步的配置。

### 七、vector解析日志实践

#### 1、调试解析配置

假设线上应用原始日志格式如下，接下来我们通过vector解析日志内容。

```
2023-07-23 09:35:18.987 | INFO     | __main__:debug_log:49 - {'access_status': 200, 'request_method': 'GET', 'request_uri': '/account/', 'request_length': 67, 'remote_address': '185.14.47.131', 'server_name': 'cu-36.cn', 'time_start': '2023-07-23T09:35:18.879+08:00', 'time_finish': '2023-07-23T09:35:19.638+08:00', 'http_user_agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.2999.0 Safari/537.36'}
```

##### 1.1 修改vector配置文件

添加sources配置项，从控制台读取数据。并新增sinks配置项，输出到控制台，vector配置文件如下所示：

```
sources:
  my_source:   
    type: "stdin"
  
sinks:
  my_print:
    type: "console"
    inputs: ["my_source"]
    encoding:
      codec: "json" 
```

观察控制台输出内容，已经将控制台输出的日志数据添加到了message字段中

```
2023-07-23 09:35:18.987 | INFO     | __main__:debug_log:49 - {'access_status': 200, 'request_method': 'GET', 'request_uri': '/account/', 'request_length': 67, 'remote_address': '185.14.47.131', 'server_name': 'cu-36.cn', 'time_start': '2023-07-23T09:35:18.879+08:00', 'time_finish': '2023-07-23T09:35:19.638+08:00', 'http_user_agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.2999.0 Safari/537.36'}
{"host":"huanbao","message":"2023-07-23 09:35:18.987 | INFO     | __main__:debug_log:49 - {'access_status': 200, 'request_method': 'GET', 'request_uri': '/account/', 'request_length': 67, 'remote_address': '185.14.47.131', 'server_name': 'cu-36.cn', 'time_start': '2023-07-23T09:35:18.879+08:00', 'time_finish': '2023-07-23T09:35:19.638+08:00', 'http_user_agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.2999.0 Safari/537.36'}","source_type":"stdin","timestamp":"2023-11-19T08:07:07.270947582Z"}
```

##### 1.2 调试VRL解析配置

推荐使用在线调试工具https://playground.vrl.dev/

![](%E5%9B%BE%E7%89%87/vector-VRL.png)

调试无误后，将VRL处理语句添加到vector配置中。

```
sources:
  my_source:   
    type: "stdin"
  
transforms:
  my_transform:
    type: remap
    inputs:    # 匹配输入源
      - my_source
    source: |
      . = parse_regex!(.message, r'^(?<logtime>[^|]+) \| (?<level>[A-Z]*) *\| __main__:(?<class>\D*:\d*) - (?<content>.*)$') # 正则提取logtime、level、class、content
      .content = replace(.content, "'", "\"") # 将content单引号替换为双引号
      .content = parse_json!(.content) # json解析content内容
      .access_status = (.content.access_status) # 将content中的子字段提取到根级
      .http_user_agent = (.content.http_user_agent)
      .remote_address = (.content.remote_address)
      .request_length = (.content.request_length)
      .request_method = (.content.request_method)
      .request_uri = (.content.request_uri)
      .server_name = (.content.server_name)
      .time_finish = (.content.time_finish)
      .access_status = (.content.access_status)
      .time_start = (.content.time_start)
      del(.content) # 删除content字段
      .logtime = parse_timestamp!((.logtime), format:"%Y-%m-%d %H:%M:%S.%3f") # 格式化时间字段
      .time_start = parse_timestamp!((.time_start), format:"%Y-%m-%dT%H:%M:%S.%3f%:z") 
      .time_finish = parse_timestamp!((.time_finish), format:"%Y-%m-%dT%H:%M:%S.%3f%:z")
      .level = downcase(.level) # 将level字段值转小写

sinks:
  my_print:
    type: "console"
    inputs: ["my_transform"] # 匹配转换配置
    encoding:
      codec: "json" 
```

添加VRL解析规则后，控制台输出内容如下，已成功对原始数据完成解析处理

```
2023-07-23 09:35:18.987 | INFO     | __main__:debug_log:49 - {'access_status': 200, 'request_method': 'GET', 'request_uri': '/account/', 'request_length': 67, 'remote_address': '185.14.47.131', 'server_name': 'cu-36.cn', 'time_start': '2023-07-23T09:35:18.879+08:00', 'time_finish': '2023-07-23T09:35:19.638+08:00', 'http_user_agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.2999.0 Safari/537.36'}
{"access_status":200,"class":"debug_log:49","http_user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.2999.0 Safari/537.36","level":"info","logtime":"2023-07-23T01:35:18.987Z","remote_address":"185.14.47.131","request_length":67,"request_method":"GET","request_uri":"/account/","server_name":"cu-36.cn","time_finish":"2023-07-23T01:35:19.638Z","time_start":"2023-07-23T01:35:18.879Z"}
```

##### 1.3 查询ip的地理位置信息

```
sources:
  my_source:   
    type: "stdin"
  
transforms:
  my_transform:
    type: remap
    inputs:    # 匹配输入源
      - my_source
    source: |
      . = parse_regex!(.message, r'^(?<logtime>[^|]+) \| (?<level>[A-Z]*) *\| __main__:(?<class>\D*:\d*) - (?<content>.*)$') # 正则提取logtime、level、class、content
      .content = replace(.content, "'", "\"") # 将content单引号替换为双引号
      .content = parse_json!(.content) # json解析content内容
      .access_status = (.content.access_status) # 将content中的子字段提取到根级
      .http_user_agent = (.content.http_user_agent)
      .remote_address = (.content.remote_address)
      .request_length = (.content.request_length)
      .request_method = (.content.request_method)
      .request_uri = (.content.request_uri)
      .server_name = (.content.server_name)
      .time_finish = (.content.time_finish)
      .access_status = (.content.access_status)
      .time_start = (.content.time_start)
      del(.content) # 删除content字段
      .logtime = parse_timestamp!((.logtime), format:"%Y-%m-%d %H:%M:%S.%3f") # 格式化时间字段
      .time_start = parse_timestamp!((.time_start), format:"%Y-%m-%dT%H:%M:%S.%3f%:z") 
      .time_finish = parse_timestamp!((.time_finish), format:"%Y-%m-%dT%H:%M:%S.%3f%:z")
      .level = downcase(.level) # 将level字段值转小写
      .geoip = get_enrichment_table_record!("geoip_table", # ip地理位置信息解析
        {
          "ip": .remote_address
        })

sinks:
  my_print:
    type: "console"
    inputs: ["my_transform"] # 匹配转换配置
    encoding:
      codec: "json" 

enrichment_tables:
  geoip_table: # 指定geoip数据库文件
    path: "/root/GeoLite2-City.mmdb"
    type: geoip
```

观察控制台输出，已经成功通过remote_address字段的ip地址获取到了地理位置信息内容。

```
2023-07-23 09:35:18.987 | INFO     | __main__:debug_log:49 - {'access_status': 200, 'request_method': 'GET', 'request_uri': '/account/', 'request_length': 67, 'remote_address': '185.14.47.131', 'server_name': 'cu-36.cn', 'time_start': '2023-07-23T09:35:18.879+08:00', 'time_finish': '2023-07-23T09:35:19.638+08:00', 'http_user_agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.2999.0 Safari/537.36'}
{"access_status":200,"class":"debug_log:49","geoip":{"city_name":"Hong Kong","continent_code":"AS","country_code":"HK","country_name":"Hong Kong","latitude":22.2842,"longitude":114.1759,"metro_code":null,"postal_code":null,"region_code":"HCW","region_name":"Central and Western District","timezone":"Asia/Hong_Kong"},"http_user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.2999.0 Safari/537.36","level":"info","logtime":"2023-07-23T01:35:18.987Z","remote_address":"185.14.47.131","request_length":67,"request_method":"GET","request_uri":"/account/","server_name":"cu-36.cn","time_finish":"2023-07-23T01:35:19.638Z","time_start":"2023-07-23T01:35:18.879Z"}
```

#### 2、构建vector镜像

由于vector镜像未包含geoip数据库文件，如果需要根据IP地址解析获取地理位置信息，则需要提前构建包含geoip文件的vector镜像，并上传至harbor仓库中。

```
[root@tiaoban evk]# ls
Dockerfile  filebeat  GeoLite2-City.mmdb  kafka  log-demo.yaml  strimzi-kafka-operator  vector
[root@tiaoban evk]# cat Dockerfile 
FROM timberio/vector:0.34.1-debian
ADD GeoLite2-City.mmdb /etc/vector/GeoLite2-City.mmdb
[root@tiaoban evk]# docker build -t harbor.local.com/elk/vector:v0.34.1 .
[root@tiaoban evk]# docker push harbor.local.com/elk/vector:v0.34.1
```

#### 3、k8s资源清单

- vector-config.yaml

此配置文件为vector的全局通用配置文件，主要配置了api和监控指标。

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: vector-config
  namespace: elk
data:
  vector.yaml: |
    data_dir: "/var/lib/vector"
    api:
      enabled: true
      address: "0.0.0.0:8686"
      
    sources:
      metrics:
        type: internal_metrics
        namespace: vector
        scrape_interval_secs: 30

    sinks:
      prometheus:
        type: prometheus_exporter
        inputs:
          - metrics
        address: 0.0.0.0:9598
        default_namespace: service
```

- pod-config.yaml

此配置文件主要是从kafka中读取数据，然后移除非必要的字段信息，最后写入es中

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: pod-config
  namespace: elk
data:
  pod.yaml: |
    sources:
      pod_kafka:
        type: "kafka"
        bootstrap_servers: "my-cluster-kafka-brokers.kafka.svc:9092"
        group_id: "pod"
        topics:
          - "pod_logs"
        decoding:
          codec: "json"
        auto_offset_reset: "latest"

    transforms:
      pod_transform:
        type: remap
        inputs:    # 匹配输入源
          - pod_kafka
        source: |
          del(.agent)
          del(.event)
          del(.ecs)
          del(.host)
          del(.input)
          del(.kubernetes.labels)
          del(.log)
          del(.orchestrator)
          del(.stream)
    
    sinks:
      pod_es:
        type: elasticsearch
        inputs: ["pod_transform"] # 匹配转换配置
        api_version: "v8"        # ES版本，非必填
        mode: "data_stream" # 数据流方式写入
        auth: # es认证信息 
          strategy: "basic"
          user: "elastic"
          password: "2zg5q6AU7xW5jY649yuEpZ47"
        data_stream: # 数据流名称配置
          type: "logs"
          dataset: "pod"
          namespace: "elk"
        endpoints: ["https://elasticsearch-es-http.elk.svc:9200"] # es连接地址
        tls: # tls证书配置
          verify_certificate: false # 跳过证书验证
```

- myapp-config.yaml

此配置文件从kafka中读取pod日志数据，然后通过filter过滤出log-demo的日志数据，做进一步解析处理后写入es中

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
  namespace: elk
data:
  myapp.yaml: |
    sources:
      myapp_kafka:
        type: "kafka"
        bootstrap_servers: "my-cluster-kafka-brokers.kafka.svc:9092"
        group_id: "myapp"
        topics:
          - "pod_logs"
        decoding:
          codec: "json"
        auto_offset_reset: "latest"
      
    transforms:
      myapp_filter:
        type: filter
        inputs:    # 匹配输入源
          - myapp_kafka
        condition: |
          .kubernetes.deployment.name == "log-demo"
      myapp_transform:
        type: remap
        inputs:    # 匹配输入源
          - myapp_filter
        source: |
          . = parse_regex!(.message, r'^(?<logtime>[^|]+) \| (?<level>[A-Z]*) *\| __main__:(?<class>\D*:\d*) - (?<content>.*)$') # 正则提取logtime、level、class、content
          .content = replace(.content, "'", "\"") # 将content单引号替换为双引号
          .content = parse_json!(.content) # json解析content内容
          .access_status = (.content.access_status) # 将content中的子字段提取到根级
          .http_user_agent = (.content.http_user_agent)
          .remote_address = (.content.remote_address)
          .request_length = (.content.request_length)
          .request_method = (.content.request_method)
          .request_uri = (.content.request_uri)
          .server_name = (.content.server_name)
          .time_finish = (.content.time_finish)
          .access_status = (.content.access_status)
          .time_start = (.content.time_start)
          del(.content) # 删除content字段
          .logtime = parse_timestamp!((.logtime), format:"%Y-%m-%d %H:%M:%S.%3f") # 格式化时间字段
          .time_start = parse_timestamp!((.time_start), format:"%Y-%m-%dT%H:%M:%S.%3f%:z") 
          .time_finish = parse_timestamp!((.time_finish), format:"%Y-%m-%dT%H:%M:%S.%3f%:z")
          .level = downcase(.level) # 将level字段值转小写
          .geoip = get_enrichment_table_record!("geoip_table",
          {
            "ip": .remote_address
          }) # 地理位置信息解析
        
    sinks:
      myapp_es:
        type: elasticsearch
        inputs: ["myapp_transform"] # 匹配转换配置
        api_version: "v8"        # ES版本，非必填
        mode: "data_stream" # 数据流方式写入
        auth: # es认证信息 
          strategy: "basic"
          user: "elastic"
          password: "2zg5q6AU7xW5jY649yuEpZ47"
        data_stream: # 数据流名称配置
          type: "logs"
          dataset: "myapp"
          namespace: "elk"
        endpoints: ["https://elasticsearch-es-http.elk.svc:9200"] # es连接地址
        tls: # tls证书配置
          verify_certificate: false # 跳过证书验证 
    
    enrichment_tables:
      geoip_table: # 指定geoip数据库文件
        path: "/etc/vector/GeoLite2-City.mmdb"
        type: geoip
```

- deployment.yaml

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vector
  namespace: elk
spec:
  replicas: 2
  selector:
    matchLabels:
      app: vector
  template:
    metadata:
      labels:
        app: vector
    spec:
      securityContext:
        runAsUser: 0
      containers:
      - image: harbor.local.com/elk/vector:v0.34.1
        name: vector
        resources:
          limits:
            cpu: "1"
            memory: 1Gi
        args:
        - -c
        - /etc/vector/*.yaml
        ports:
          - name: exporter
            containerPort: 9598
          - name: api
            containerPort: 8686
        volumeMounts:
        - name: timezone
          mountPath: /etc/localtime
        - name: data
          mountPath: /var/lib/vector
        - name: vector-config
          mountPath: /etc/vector/vector.yaml
          subPath: vector.yaml
        - name: pod-config
          mountPath: /etc/vector/pod.yaml
          subPath: pod.yaml
        - name: myapp-config
          mountPath: /etc/vector/myapp.yaml
          subPath: myapp.yaml
        readinessProbe:
          httpGet:
            path: /health
            port: 8686
        livenessProbe:
          httpGet:
            path: /health
            port: 8686
      volumes:
      - name: timezone
        hostPath:
          path: /usr/share/zoneinfo/Asia/Shanghai
      - name: data
        hostPath:
          path: /data/vector
          type: DirectoryOrCreate
      - name: vector-config
        configMap:
          name: vector-config
      - name: pod-config
        configMap:
          name: pod-config
      - name: myapp-config
        configMap:
          name: myapp-config
```

- service.yaml

```
apiVersion: v1
kind: Service
metadata:
  name: vector-exporter
  namespace: elk
spec:
  selector:
    app: vector
  ports:
  - name: exporter 
    port: 9598 
    targetPort: 9598
```

### 八、注意事项

#### 1、多配置文件启动

```
我们可以通过-c /etc/vector/*.yaml方式指定多个配置文件启动，此时vector会扫描指定路径下的所有yaml配置文件并加载启动。这样配置便于管理各个管道处理规则配置，使配置文件结构更加清晰，便于日后维护工作。
```

#### 2、管道名称全局唯一

```
sources、transforms、sinks的自定义名称，全局必须唯一，尤其是多个vector配置文件时，唯一名称尤为重要
```

### 九、vector日志采集架构

![](%E5%9B%BE%E7%89%87/Vector%E6%97%A5%E5%BF%97%E9%87%87%E9%9B%86%E6%96%B9%E6%A1%88.png)
