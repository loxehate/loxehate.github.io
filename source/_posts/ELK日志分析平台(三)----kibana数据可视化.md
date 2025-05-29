---
title: ELK日志分析平台(三)----kibana数据可视化
tags: [Elasticsearch]
categories: [中间件]
date: 2025-05-29
---

### 1. kibana [数据可视化](https://so.csdn.net/so/search?q=数据可视化&spm=1001.2101.3001.7020)

#### 1.1 介绍

```
Kibana 是为 Elasticsearch设计的开源分析和可视化平台。你可以使用 Kibana 来搜索，查看存储在 Elasticsearch 索引中的数据并与之交互。你可以很容易实现高级的数据分析和可视化，以图标的形式展现出来。

Kibana 核心产品搭载了一批经典功能：柱状图、线状图、饼图、旭日图，等等
```

#### 1.2 kibana的安装与部署

```
- kibana下载
	https://elasticsearch.cn/download/
	# rpm -ivh kibana-7.6.1-x86_64.rpm
```

```
- kibana配置：
	# vim /etc/kibana/kibana.yml
		server.port: 5601				#服务端口
		server.host: "172.25.70.1"		#服务监听地址
		elasticsearch.hosts: ["http://172.25.70.4:9200"]	#ES集群地址
		kibana.index: ".kibana"			#kibana在ES中创建的索引
		i18n.locale: "zh-CN"	
```

```
- 启动kibana服务
	# systemctl enable kibana
	# systemctl start kibana
	
	# netstat -antlp|grep :5601
	tcp        0      0 172.25.0.17:5601         0.0.0.0:*               LISTEN     1159/node 
```

#### 1.3 安装结果

![](图片/kibana.png)

### 2. 启用xpack安全验证

```
- 1. 集群模式需要先创建证书：
	# cd /usr/share/elasticsearch/
	# bin/elasticsearch-certutil ca
	# bin/elasticsearch-certutil cert --ca elastic-stack-ca.p12
	# cp elastic-certificates.p12  /etc/elasticsearch
	# cd /etc/elasticsearch
	# chown elasticsearch elastic-certificates.p12 
```

```
- 配置所有的elasticsearch集群节点：
	# vim /etc/elasticsearch/elasticsearch.yml
		xpack.security.enabled: true
		xpack.security.transport.ssl.enabled: true
		xpack.security.transport.ssl.verification_mode: certificate
		xpack.security.transport.ssl.keystore.path: /etc/elasticsearch/elastic-certificates.p12
		xpack.security.transport.ssl.truststore.path: /etc/elasticsearch/elastic-certificates.p12
```

```
##将证书发送到每个节点，并且设置好相应的权限。所有节点操作都一样，完了配置下面文件.文件都发给其他节点
```

没有设置密码无法登陆 

```
- ES集群重启正常后，设置用户密码
- 	[root@server1 ~]# /usr/share/elasticsearch/bin/elasticsearch-setup-passwords interactive  ##交互式设置命令
```

```
- 2.设置kibana连接ES的用户密码：
	# vim /etc/kibana/kibana.yml
		elasticsearch.username: "kibana"
		elasticsearch.password: "westos"
```

```
- 3. 设置Logstash连接ES用户密码:
		output {
		        elasticsearch {
		                hosts => "172.25.70.1:9200"
		                index => "apachelog-%{+YYYY.MM.dd}"
				 user => "elastic"
				 password => "westos"
		        }
		}
```

添加header 

```
- 4. head访问：
	http.cors.allow-headers: Authorization,X-Requested-With,Content-Length,Content-Type	//添加参数到es配置
	http://172.25.70.1:9100/?auth_user=elastic&auth_password=westos
```

