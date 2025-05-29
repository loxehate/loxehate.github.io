---
title: Elasticsearch集群升级详解
tags: [Elasticsearch]
categories: [中间件]
date: 2025-05-29
---
### 业务Elasticsearch升级流程

从 Elasticsearch 7.17.9 进行滚动升级到 7.17.28，可以按照以下步骤进行。确保你已经备份了数据，并且了解整个升级过程对集群的影响。

```
官方最新文档：https://www.elastic.co/guide/en/elasticsearch/reference/7.17/rolling-upgrades.html

版本兼容性：在进行任何升级之前，务必阅读 Elasticsearch 的官方升级指南，确保你理解版本之间的兼容性和可能的变更。

插件兼容性：如果你使用了任何插件，确保这些插件也与新版本兼容，并在升级前更新这些插件。
```

#### 1、前置条件

```
1. 备份数据：确保你有最新的数据备份。
2. 集群健康状态：确保集群处于绿色健康状态，可以通过 `GET _cluster/health` API 检查。
3. 升级顺序：依次升级每个节点，避免同时升级多个节点。
```

#### 2、升级准备

```
1. 准备elasticsearch升级版本包和elasticsearch-analysis-pinyin分词器版本包

https://www.elastic.co/cn/downloads/past-releases#elasticsearch
https://github.com/infinilabs/analysis-pinyin

2. 准备elasticsearch-analysis-hanlp和adjacency-filter-1.0-SNAPSHOT分词器（手动维护）版本包
需要修改plugin-descriptor.properties中elasticsearch的版本号
```



#### 3、升级步骤

**1.查看集群健康状态:**

```
GET _cluster/health
```

**2.禁用分片分配:**      

```
PUT _cluster/settings
{
  "persistent": {
    "cluster.routing.allocation.enable": "primaries"
  }
}
```

**3.准备节点**：准备升级的节点。你需要逐个节点进行操作，确保每个节点升级后集群恢复到绿色状态再升级下一个节点。

**4.停止节点：**停止当前节点上的 Elasticsearch 服务。

```sh
sudo systemctl stop elasticsearch
```

**5.安装新版本**：安装下载的 RPM 包。

```sh
sudo rpm -Uvh elasticsearch-7.17.28-x86_64.rpm
```

**6.启动节点**：安装新版本 Elasticsearch 分词器。

elasticsearch-analysis-pinyin

```
bin/elasticsearch-plugin install file:///root/elk/elasticsearch-analysis-pinyin-7.17.28.zip
```

adjacency-filter-1.0-SNAPSHOT

```
bin/elasticsearch-plugin install file:///root/elk/adjacency-filter-1.0-SNAPSHOT.zip
```

elasticsearch-analysis-hanlp

```
#调整分词器plugin-security.policy
permission java.io.FilePermission "<<ALL FILES>>", "read";

#jvm.options新增配置
-Djava.security.policy=file:///usr/share/elasticsearch/plugins/analysis-hanlp/plugin-security.policy

#安装分词器
bin/elasticsearch-plugin install file:///root/elk/elasticsearch-analysis-hanlp.zip

#旧节点同步数据文件至新节点
/usr/share/elasticsearch/plugins/analysis-hanlp/data/dictionary/stopwords.txt.bin
```

elasticsearch-analysis-hanlp（非安装）

```
#直接修改elasticsearch-analysis-hanlp.zip中的文件内容
plugin-descriptor.properties文件中升级Es版本 elasticsearch.version=7.17.28
```

7.**启动节点**：启动升级后的 Elasticsearch 节点。

```sh
sudo systemctl start elasticsearch
```

8.**启动升级后的节点**:

```
GET /_cat/nodes?h=ip,name,version&v=true
```

8.**重新启用分片分配**

```
PUT _cluster/settings
{
  "persistent": {
    "cluster.routing.allocation.enable": null
  }
}
```

9.**检查节点状态**：确保节点重新加入集群并且集群状态恢复到绿色。可以通过以下命令检查：

```sh
curl -X GET "localhost:9200/_cluster/health?pretty"
```

10.**升级其余节点**：重复步骤 1到 9，逐个升级集群中的其他节点。

注：未刷新的分片可能需要更长的时间才能刷新恢复。监控分片恢复状态

```
GET _cat/recovery
```

#### 3、升级完成后

1. **验证版本**：在所有节点上确认 Elasticsearch 版本已经更新到 7.17.28。

   ```sh
   curl -X GET "localhost:9200"
   ```

   你应该可以看到类似如下的响应：

   ```json
   {
     "name" : "your-node-name",
     "cluster_name" : "your-cluster-name",
     "cluster_uuid" : "your-cluster-uuid",
     "version" : {
       "number" : "7.17.28",
       "build_flavor" : "default",
       "build_type" : "rpm",
       "build_hash" : "your-build-hash",
       "build_date" : "your-build-date",
       "build_snapshot" : false,
       "lucene_version" : "8.9.0",
       "minimum_wire_compatibility_version" : "6.8.0",
       "minimum_index_compatibility_version" : "6.0.0-beta1"
     },
     ...
   }
   ```

2. **检查集群状态**：确保整个集群在升级后仍然处于绿色健康状态。

   ```sh
   curl -X GET "localhost:9200/_cluster/health?pretty"
   ```

