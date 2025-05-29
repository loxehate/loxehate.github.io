---
title: ELK集群部署
tags: [Elasticsearch]
categories: [中间件]
date: 2025-05-29
---
### 一、环境信息

```
系统：centos7.5
elasticsearch-7.17.21
kibana-7.17.21
logstash-7.17.21
filebeat-7.17.21

ES JAVA版本对照官方文档：https://www.elastic.co/cn/support/matrix#matrix_jvm
```

### 二、ELK下载路径

```
官方路径：https://www.elastic.co/downloads/past-releases#elasticsearch

#rpm包安装
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.21-x86_64.rpm
wget https://artifacts.elastic.co/downloads/kibana/kibana-7.17.21-x86_64.rpm
wget https://artifacts.elastic.co/downloads/logstash/logstash-7.17.21-x86_64.rpm
wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.17.21-x86_64.rpm
```

### 三、elasticsearch 安装配置

#### 1、elasticsearch 安装

使用yum localinstall 安装本地rpm包，执行代码如下（示例）：

```
#集群中每个节点都执行
yum localinstall elasticsearch-7.17.21-x86_64.rpm
```

#### 2、配置elasticsearch.yml文件

配置elasticsearch.yml文件：

```
vi /etc/elasticsearch/elasticsearch.yml
```

配置参考：

```
cluster.name: my-application
node.name: node-1
path.data: /var/lib/elasticsearch
path.logs: /var/log/elasticsearch
http.port: 9200
discovery.seed_hosts: ["192.168.10.122", "192.168.10.123","192.168.10.124"]
cluster.initial_master_nodes: ["node-1", "node-2", "node-3"]
#开启用户验证
xpack.security.enabled: true
xpack.license.self_generated.type: basic
xpack.security.transport.ssl.enabled: true
xpack.security.transport.ssl.verification_mode: certificate
xpack.security.transport.ssl.keystore.path: /etc/elasticsearch/config/elastic-certificates.p12
xpack.security.transport.ssl.truststore.path: /etc/elasticsearch/config/elastic-certificates.p12

#开启跨域（可选）
#elasticsearch中启用CORS
http.cors.enabled: true
# # 允许访问的IP地址段，* 为所有IP都
http.cors.allow-origin: "*"
http.cors.allow-headers: Authorization,X-Requested-With,Content-Length,Content-Type
```

#### 3、xpack证书生成

```
cd /usr/share/elasticsearch/bin/
./elasticsearch-certutil ca
./elasticsearch-certutil cert --ca elastic-stack-ca.p12

elastic-stack-ca.p12  elastic-certificates.p12
两条命令一路回车即可，不需要给秘钥再添加密码。执行完以后会生成两个证书，证书在安装目录/usr/share/elasticsearch/下；
将两个证书移动到集群每个节点/etc/elasticsearch/config目录下（非config目录会报错），并进行赋权；
cd /etc/elasticsearch/config/
chown root:elasticsearch *
chmod 664 *
```

#### 4、配置jvm.options文件

```
vi /etc/elasticsearch/jvm.options

-Xms3g
-Xmx3g
```

#### 5、elasticsearch启动运行

```
sudo /bin/systemctl daemon-reload
sudo /bin/systemctl enable elasticsearch.service
sudo systemctl start elasticsearch.service
sudo systemctl stop elasticsearch.service
```

#### 6、设置ES账号密码

在服务器1（挑一台服务器执行即可，不需要每台服务器都执行）上ES的bin目录下执行如下命令设置密码：

ES内置elastic、apm_system、logstash_system、kibana等内置用户，需要分别为这些账户设置密码，密码中不要包含@符号，有坑。需要记住自己设置的密码，后续过程需要使用。

```
#用户密码可以都是同一个密码
cd /usr/share/elasticsearch/bin/
# interactiv手动设置密码
./elasticsearch-setup-passwords interactive

elastic
```

也可使用：

```
# 自动生成密码
./elasticsearch-setup-passwords auto
```

如果在设置密码的过程中报错，重新执行此命令再设置一次即可，不可跳过报错。

设置完账号密码以后，在命令行中执行如下命令验证一下账号密码是否设置成功：

```
curl -XGET -u elastic:elastic 'http://${ip}:9200/_xpack/security/user?pretty'
```

#### 7、设置ES服务账号service_token（可选）

7.x版本可选，8.x版本必须设置

查看elasticsearch有那些服务账户

```
curl -u elastic:your_password -X GET "http://localhost:9200/_security/service/elastic/kibana"
```

查看服务账号有那些token

```
bin/elasticsearch-service-tokens list
```

创建elastic/kibana服务的token kibana-token(需要重启服务才生效)

```
bin/elasticsearch-service-tokens create elastic/kibana kibana-token
```

输出是一个持有者令牌，它是一个 Base64 编码的字符串。

```
SERVICE_TOKEN elastic/kibana/kibana-token = AAEAAWVsYXN0aWM...vZmxlZXQtc2VydmVyL3Rva2VuMTo3TFdaSDZ
```

使用此不记名令牌对您的 Elasticsearch 集群进行身份验证

```
curl -H "Authorization: Bearer AAEAAWVsYXN0aWM...vZmxlZXQtc2VydmVyL3Rva2VuMTo3TFdaSDZ" http://localhost:9200/_cluster/health
```

```
service_token 会保存在/etc/elasticsearch/service_tokens文件中,注意文件属组权限，否则不生效，service_tokens必须复制在每个节点上
chmod 660 service_tokens
chown root:elasticsearch service_tokens
```

删除服务帐户的服务帐户令牌

```
bin/elasticsearch-service-tokens delete elastic/fleet-server my-token
```

动态生成令牌

```
curl -X POST "http://localhost:9200/_security/service/elastic/kibana/credential/token/kibana-token" -u elastic -H "Content-Type: application/json"
```



### 四、Kibana 安装配置

#### 1、Kibana 安装

使用yum localinstall 安装本地rpm包，执行代码如下（示例）：

```
#单节点
yum localinstall kibana-7.17.21-x86_64.rpm
```

#### 2、配置kibana.yml文件

```
vi /etc/kibana/kibana.yml

server.port: 5601
server.host: "192.168.10.124"
#外网访问url
#server.publicBaseUrl: "https://kibana.com.cn"
elasticsearch.hosts: ["http://192.168.10.124:9200","http://192.168.10.123:9200","http://192.168.10.122:9200"]
kibana.index: ".kibana"
#明文密码或#service_token，二选一
elasticsearch.username: "elastic"
elasticsearch.password: "elastic"
elasticsearch.serviceAccountToken: "AAEAAWVsYXN0aWMva2liYW5hL215LXRva2VuOjc4cjhWdkpfU09xOHVBQkJLazM3YUE"
i18n.locale: "zh-CN"
```

**设置账户密码（密文配置）**

在bin目录下执行：

```
   ./kibana-keystore create
   ./kibana-keystore add elasticsearch.username
   # elastic
   ./kibana-keystore add elasticsearch.password
   #  elastic
```

#### 3、kibana运行

```
sudo systemctl start kibana.service
sudo systemctl stop kibana.service
```

#### 4、浏览器验证访问

输入用户名：elastic，密码：es安装时记录的密码

![](图片/kibana登录.png)

### 五、logstash 安装配置

#### 1、logstash 安装

使用yum localinstall 安装本地rpm包，执行代码如下（示例）：

```
#单节点
yum localinstall logstash-7.17.21-x86_64.rpm
```

#### 2、配置logstash.yml文件

```
#可选配置
xpack.monitoring.enabled: true
# 设置的账户logstash_system为ES的内置账户
xpack.monitoring.elasticsearch.username: logstash_system
# 设置的密码
xpack.monitoring.elasticsearch.password: yourPassword
```

创建一个conf.d/logstash.conf配置文件，我这是配置日志采集,验证logstash

```
input {
  stdin {}
}

output {
  file {
      # 将输出结果也输出在/tmp/logstash-test.log文件下一份
      path => "/tmp/logstash-test.log"
    }
  elasticsearch {
    hosts => ["192.168.10.124:9200","192.168.10.123","192.168.10.122:9200"] 
    index => "logstash-lck-testindex"
    user => "elastic"
    password => "elastic"
  }
}

######################################################################################
input {
  beats {
    port => "5044"
  }
}

output {
  # 输出到es集群中，并创建名称为nginx-%{+YYYY.MM.dd}的index索引
  elasticsearch {
    hosts => ["http://192.168.10.124:9200", "http://192.168.10.123:9200", "http://192.168.10.122:9200"]
    index => "messages-%{+YYYY.MM.dd}"
    user => "elastic"
    password => "elastic"
  }
}

```

```
#验证配置文件
sudo -u logstash /usr/share/logstash/bin/logstash --path.settings /etc/logstash/ -f /etc/logstash/conf.d/logstash.conf --config.test_and_exit
```

#### 3、logstash运行

```
sudo systemctl start logstash.service
sudo systemctl stop logstash.service
```

#### 4、在kibana查看创建成功的索引

![](图片/kibana-索引管理.png)

### 六、filebeat 安装配置

#### 1、filebeat 安装

使用yum localinstall 安装本地rpm包，执行代码如下（示例）：

```
yum localinstall filebeat-7.17.21-x86_64.rpm
```

#### 2、配置filebeat.yml文件

```
vi /etc/filebeat/filebeat.yml
```

在filebeat.yml文件中主要配置读取paths设置，和对接到logstash中，filebeat我配置的是读pm2日志，整体配置文件内容如下

```
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/messages
  #多行返回处理
   multiline:
    pattern: '^\['                  
    negate: true 
    match: after
  
output.logstash:
  # The Logstash hosts
  hosts: ["192.168.10.124:5044"]
```

验证filebeat.yml配置文件

```
/usr/share/filebeat/bin/filebeat test config -c filebeat.yml
```

#### 3、filebeat运行

```
sudo systemctl start filebeat.service
sudo systemctl stop filebeat.service
```

#### 4、查看索引

```
#查索引
curl http://140.249.249.144:9200/_cat/indices?v
#索引里搜索数据
curl http://140.249.249.144:9200/filebeat-test--2022.04.29/_search
```

### 七、Elasticsearch开启https

```
在生产环境中，除非您在 HTTP 层启用 TLS，否则某些 Elasticsearch 功能（例如令牌和 API 密钥）将被禁用。这个额外的安全层确保进出集群的所有通信都是安全的。

当您在模式下运行该elasticsearch-certutil工具时http，该工具会询问几个有关您希望如何生成证书的问题。虽然有许多选项，但以下选项会生成适用于大多数环境的证书。

该elasticsearch-certutil工具提示您的第一个问题是您是否要生成证书签名请求 (CSR)。回答 n您是要签署自己的证书，还是y要签署中央 CA 的证书。
```

**签署自己的证书**

```
如果您想使用您自已生成的CA证书 。 回答 n，当系统询问您是否要生成 CSR 时。然后指定 CA 证书的位置，即由该工具签署和生成证书.p12。
```

**使用中央 CA 签署证书**

```
如果您在中央安全团队的环境中工作，他们可能会为您生成证书。您组织内的基础设施可能已经配置为信任现有的 CA，因此如果您使用 CSR 并将该请求发送给控制您的 CA 的团队，则客户端可能更容易连接到 Elasticsearch。要使用中央 CA，请回答y第一个问题。
```

#### 1、Elasticsearch 加密 HTTP 客户端通信

在集群中的每个节点 上，停止 Elasticsearch 和 Kibana（如果它们正在运行）。

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# systemctl stop elasticsearch9201
root@ubuntu-x64_02:/usr/local/elasticsearch9201# systemctl stop elasticsearch9202
root@ubuntu-x64_02:/usr/local/elasticsearch9201# systemctl stop elasticsearch9203 
```

在任何单个节点上，从您安装 Elasticsearch 的目录运行 Elasticsearch HTTP 证书工具以生成证书签名请求 (CSR)。

此命令生成一个.zip文件，其中包含用于 Elasticsearch 和 Kibana 的证书和密钥。每个文件夹都包含一个README.txt 说明如何使用这些文件。

    cd /usr/share/elasticsearch/
    ./bin/elasticsearch-certutil http

- 当系统询问您是否要生成 CSR 时，请输入： n

```
## Do you wish to generate a Certificate Signing Request (CSR)?

A CSR is used when you want your certificate to be created by an existing
Certificate Authority (CA) that you do not control (that is, you do not have
access to the keys for that CA). 

If you are in a corporate environment with a central security team, then you
may have an existing Corporate CA that can generate your certificate for you.
Infrastructure within your organisation may already be configured to trust this
CA, so it may be easier for clients to connect to Elasticsearch if you use a
CSR and send that request to the team that controls your CA.

If you choose not to generate a CSR, this tool will generate a new certificate
for you. That certificate will be signed by a CA under your control. This is a
quick and easy way to secure your cluster with TLS, but you will need to
configure all your clients to trust that custom CA.

Generate a CSR? [y/N]N 
```

- 当系统询问您是否要使用现有 CA 时，请输入： y

```
## Do you have an existing Certificate Authority (CA) key-pair that you wish to use to sign your certificate?

If you have an existing CA certificate and key, then you can use that CA to
sign your new http certificate. This allows you to use the same CA across
multiple Elasticsearch clusters which can make it easier to configure clients,
and may be easier for you to manage.

If you do not have an existing CA, one will be generated for you.

Use an existing CA? [y/N]y 
```

- 输入您的 CA 的路径。elastic-stack-ca.p12 这是您为集群生成的文件 的绝对路径。如： /usr/local/elasticsearch9201/elastic-stack-ca.p12

- 输入您的 CA 的密码。如果没有，则为空，在这种情况下，您只需在提示符下按ENTER键

    ```
    ## What is the path to your CA?
    
    Please enter the full pathname to the Certificate Authority that you wish to
    use for signing your new http certificate. This can be in PKCS#12 (.p12), JKS
    (.jks) or PEM (.crt, .key, .pem) format.
    CA Path: /usr/local/elasticsearch9201/elastic-stack-ca.p12 
    Reading a PKCS12 keystore requires a password.
    It is possible for the keystore is password to be blank,
    in which case you can simply press <ENTER> at the prompt
    Password for elastic-stack-ca.p12: 
    ```

    

- 输入证书的到期值。您可以： 以年、月或日为单位输入有效期。例如，输入90D

```
## How long should your certificates be valid?

Every certificate has an expiry date. When the expiry date is reached clients
will stop trusting your certificate and TLS connections will fail.

Best practice suggests that you should either:
(a) set this to a short duration (90 - 120 days) and have automatic processes
to generate a new certificate before the old one expires, or
(b) set it to a longer duration (3 - 5 years) and then perform a manual update
a few months before it expires.

You may enter the validity period in years (e.g. 3Y), months (e.g. 18M), or days (e.g. 90D)

For how long should your certificate be valid? [5y] 3Y 
```

- 当系统询问您是否要为每个节点生成一个证书时，输入Y , 每个证书都有自己的私钥，并针对特定的主机名或 IP 地址颁发

```
## Do you wish to generate one certificate per node?

If you have multiple nodes in your cluster, then you may choose to generate a
separate certificate for each of these nodes. Each certificate will have its
own private key, and will be issued for a specific hostname or IP address.

Alternatively, you may wish to generate a single certificate that is valid
across all the hostnames or addresses in your cluster.

If all of your nodes will be accessed through a single domain
(e.g. node01.es.example.com, node02.es.example.com, etc) then you may find it
simpler to generate one certificate with a wildcard hostname (*.es.example.com)
and use that across all of your nodes.

However, if you do not have a common domain name, and you expect to add
additional nodes to your cluster in the future, then you should generate a
certificate per node so that you can more easily generate new certificates when
you provision new nodes.

Generate a certificate per node? [y/N]Y
```

- 出现提示时，输入集群中第一个节点的名称。使用生成节点证书时使用的相同节点名称。

```
## What is the name of node #1?

This name will be used as part of the certificate file name, and as a
descriptive name within the certificate.

You can use any descriptive name that you like, but we recommend using the name
of the Elasticsearch node.
 
node #1 name: node-1 
```

- 输入用于连接到您的第一个节点的所有主机名。这些主机名将作为 DNS 名称添加到证书的主题备用名称 (SAN) 字段中。

```

## Which hostnames will be used to connect to node-1?

These hostnames will be added as "DNS" names in the "Subject Alternative Name"
(SAN) field in your certificate.

You should list every hostname and variant that people will use to connect to
your cluster over http.
Do not list IP addresses here, you will be asked to enter them later.

If you wish to use a wildcard certificate (for example *.es.example.com) you
can enter that here.

Enter all the hostnames that you need, one per line.
When you are done, press <ENTER> once more to move on to the next step.

node-1.es.example.com 

You entered the following hostnames.

 - node-1.es.example.com      

Is this correct [Y/n]Y 
```

- 输入客户端可用于连接到您的节点的 IP 地址。这里使用本地回环地址

```
## Which IP addresses will be used to connect to node-1?

If your clients will ever connect to your nodes by numeric IP address, then you
can list these as valid IP "Subject Alternative Name" (SAN) fields in your
certificate.

If you do not have fixed IP addresses, or not wish to support direct IP access
to your cluster then you can just press <ENTER> to skip this step.

Enter all the IP addresses that you need, one per line.
When you are done, press <ENTER> once more to move on to the next step.

127.0.0.1 


You entered the following IP addresses.

 - 127.0.0.1

Is this correct [Y/n]Y
```

- 对集群中的每个附加节点重复这些步骤。

- 为每个节点生成证书后，在出现提示时输入私钥密码。或直接回车为空。

```
## What password do you want for your private key(s)?

Your private key(s) will be stored in a PKCS#12 keystore file named "http.p12".
This type of keystore is always password protected, but it is possible to use a
blank password.

If you wish to use a blank password, simply press <enter> at the prompt below.
Provide a password for the "http.p12" file:  [<ENTER> for none] 
```

- 默认保存到当前目录

```
## Where should we save the generated files?

A number of files will be generated including your private key(s),
public certificate(s), and sample configuration options for Elastic Stack products.

These files will be included in a single zip archive.

What filename should be used for the output zip file? [/usr/local/elasticsearch9201/elasticsearch-ssl-http.zip]   

Zip file written to /usr/local/elasticsearch9201/elasticsearch-ssl-http.zip
```

- 解压生成的 elasticsearch-ssl-http.zip 文件。这个压缩文件包含一个用于 Elasticsearch 和 Kibana 的目录。

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# unzip elasticsearch-ssl-http.zip 
Archive:  elasticsearch-ssl-http.zip
   creating: elasticsearch/
   creating: elasticsearch/node-1/
  inflating: elasticsearch/node-1/README.txt  
  inflating: elasticsearch/node-1/http.p12  
  inflating: elasticsearch/node-1/sample-elasticsearch.yml  
   creating: elasticsearch/node-2/
  inflating: elasticsearch/node-2/README.txt  
  inflating: elasticsearch/node-2/http.p12  
  inflating: elasticsearch/node-2/sample-elasticsearch.yml  
   creating: elasticsearch/node-3/
  inflating: elasticsearch/node-3/README.txt  
  inflating: elasticsearch/node-3/http.p12  
  inflating: elasticsearch/node-3/sample-elasticsearch.yml  
   creating: kibana/
  inflating: kibana/README.txt       
  inflating: kibana/elasticsearch-ca.pem  
  inflating: kibana/sample-kibana.yml 
```

- 查看证书生成目录 ： es 节点证书

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# tree elasticsearch
elasticsearch
├── node-1
│   ├── http.p12
│   ├── README.txt
│   └── sample-elasticsearch.yml
├── node-2
│   ├── http.p12
│   ├── README.txt
│   └── sample-elasticsearch.yml
└── node-3
    ├── http.p12
    ├── README.txt
    └── sample-elasticsearch.yml

3 directories, 9 files
```

- 查看证书生成目录 ： kibana 证书

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# tree kibana/
kibana/
├── elasticsearch-ca.pem
├── README.txt
└── sample-kibana.yml

0 directories, 3 files
```

- 在集群中的每个节点上，完成以下步骤：
- 将相关http.p12证书复制到$ES_PATH_CONF目录中。

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# cp  elasticsearch/node-1/http.p12   /etc/elasticsearch/config/
root@ubuntu-x64_02:/usr/local/elasticsearch9201# cp  elasticsearch/node-2/http.p12   /etc/elasticsearch/config/
root@ubuntu-x64_02:/usr/local/elasticsearch9201# cp  elasticsearch/node-3/http.p12   /etc/elasticsearch/config/
```

- 编辑该elasticsearch.yml文件以启用 HTTPS 安全并指定安全证书的位置http.p12。

```
cat >> /etc/elasticsearch/config/elasticsearch.yml  <<EOF

xpack.security.http.ssl.enabled: true
xpack.security.http.ssl.keystore.path: /etc/elasticsearch/config/http.p12

EOF


cat >> /etc/elasticsearch/config/elasticsearch.yml  <<EOF

xpack.security.http.ssl.enabled: true
xpack.security.http.ssl.keystore.path: /etc/elasticsearch/config/http.p12

EOF

cat >> /etc/elasticsearch/config/elasticsearch.yml  <<EOF

xpack.security.http.ssl.enabled: true
xpack.security.http.ssl.keystore.path: /etc/elasticsearch/config/http.p12

EOF
```

- 将您的私钥密码添加到 Elasticsearch 的安全设置中(无私钥密码可忽略)。

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# cd /usr/local/elasticsearch9201; ./bin/elasticsearch-keystore add xpack.security.http.ssl.keystore.secure_password
Enter value for xpack.security.http.ssl.keystore.secure_password: 

root@ubuntu-x64_02:/usr/local/elasticsearch9201# cd /usr/local/elasticsearch9202; ./bin/elasticsearch-keystore add xpack.security.http.ssl.keystore.secure_password
Enter value for xpack.security.http.ssl.keystore.secure_password: 

root@ubuntu-x64_02:/usr/local/elasticsearch9202# cd /usr/local/elasticsearch9203; ./bin/elasticsearch-keystore add xpack.security.http.ssl.keystore.secure_password
Enter value for xpack.security.http.ssl.keystore.secure_password: 
```

- 修改文件 权限

```
root@ubuntu-x64_02:/usr/local/elasticsearch9203# chown -R elk:elk /etc/elasticsearch/config/
root@ubuntu-x64_02:/usr/local/elasticsearch9203# chown -R elk:elk /etc/elasticsearch/config/
root@ubuntu-x64_02:/usr/local/elasticsearch9203# chown -R elk:elk /etc/elasticsearch/config/
```

- 启动 Elasticsearch.

```
root@ubuntu-x64_02:/usr/local/elasticsearch9203# systemctl start elasticsearch9201
root@ubuntu-x64_02:/usr/local/elasticsearch9203# systemctl start elasticsearch9202
root@ubuntu-x64_02:/usr/local/elasticsearch9203# systemctl start elasticsearch9203 
```

- 添加 hosts 解释

```
root@ubuntu-x64_02:/usr/local/elasticsearch9203# echo "127.0.0.1 node-1.es.example.com" >> /etc/hosts 
root@ubuntu-x64_02:/usr/local/elasticsearch9203# echo "127.0.0.1 node-2.es.example.com" >> /etc/hosts 
root@ubuntu-x64_02:/usr/local/elasticsearch9203# echo "127.0.0.1 node-3.es.example.com" >> /etc/hosts 
```

- 使用 -k 选项，不较验 CA 证书 ， 否则会 导致无法验证问题

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# curl -k -u elastic:123456 https://node-1.es.example.com:9201/_cat/nodes/?v; 
ip        heap.percent ram.percent cpu load_1m load_5m load_15m node.role   master name
127.0.0.1           56          97   6    0.28    0.14     0.21 cdfhilmrstw -      node-1
127.0.0.1           48          97   6    0.28    0.14     0.21 cdfhilmrstw -      node-3
127.0.0.1           63          97   6    0.28    0.14     0.21 cdfhilmrstw *      node-2
```

#### 2、Kibana 加密 HTTP 客户端通信

```
浏览器将流量发送到 Kibana，而 Kibana 将流量发送到 Elasticsearch。这些通信通道被单独配置为使用 TLS。您加密浏览器和 Kibana 之间的流量，然后加密 Kibana 和 Elasticsearch 之间的流量。
```

**加密 Kibana 和 Elasticsearch 之间的流量**

- 当您使用该选项运行该elasticsearch-certutil工具时http，它会创建一个/kibana包含elasticsearch-ca.pem文件的目录。您使用此文件将 Kibana 配置为信任 HTTP 层的 Elasticsearch CA。

- 将文件复制elasticsearch-ca.pem到 Kibana 配置目录，如路径所定义$KBN_PATH_CONF。

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# cp  kibana/elasticsearch-ca.pem  /usr/local/kibana/config/
```

- 打开kibana.yml并添加以下行以指定 HTTP 层的安全证书的位置。

```
cat >> /usr/local/kibana/config/kibana.yml  <<EOF

elasticsearch.ssl.certificateAuthorities: /usr/local/kibana/config/elasticsearch-ca.pem

EOF
```

- 添加以下行以指定 Elasticsearch 集群的 HTTPS URL。

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# cat  /usr/local/kibana/config/kibana.yml| grep "elasticsearch.hosts"
elasticsearch.hosts: ["https://127.0.0.1:9201" ,"https://127.0.0.1:9202" ,"https://127.0.0.1:9203"] 
```

- 修改权限

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# chown -R elk:elk /usr/local/kibana 
```

- 重启 kibana

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# systemctl  restart kibana.service 
```

**加密浏览器和 Kibana 之间的流量（可选）**

- Kibana 为您创建服务器证书和私钥。Kibana 在从 Web 浏览器接收连接时使用此服务器证书和相应的私钥。

- 以下为 Kibana 创建证书签名请求 (CSR)。CSR 包含 CA 用于生成和签署安全证书的信息。证书可以是受信任的（由公共、受信任的 CA 签名）或不受信任的（由内部 CA 签名）。自签名或内部签名证书可用于开发环境和构建概念验证，但不应在生产环境中使用。

- 在投入生产之前，使用受信任的 CA（例如Let’s Encrypt）或您组织的内部 CA 来签署证书。使用签名证书建立浏览器信任以连接到 Kibana 以进行内部访问或在公共互联网上访问。

- 为 Kibana 生成服务器证书和私钥。

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# ./bin/elasticsearch-certutil csr -name kibana-server -dns kibana.example.com
```

解压缩csr-bundle.zip文件以获得kibana-server.csr未签名的安全证书和kibana-server.key未加密的私钥

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# unzip csr-bundle.zip 
Archive:  csr-bundle.zip
   creating: kibana-server/
  inflating: kibana-server/kibana-server.csr  
  inflating: kibana-server/kibana-server.key  
```

- 将证书kibana-server.csr签名请求发送给您的内部 CA 或受信任的 CA 进行签名以获得签名证书。签名文件可以是不同的格式，.crt 例如: kibana-server.crt.
- 使用自签CA生成证书签名

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# tree kibana-server/
kibana-server/
├── kibana-server.crt
├── kibana-server.csr
└── kibana-server.key

0 directories, 3 files
```

- 打开kibana.yml并添加以下行以配置 Kibana 以访问服务器证书和未加密的私钥。

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# cp ./kibana-server/kibana-server.crt  /usr/local/kibana/config/
root@ubuntu-x64_02:/usr/local/elasticsearch9201# cp ./kibana-server/kibana-server.key  /usr/local/kibana/config/

cat >> /usr/local/kibana/config/kibana.yml  <<EOF

server.ssl.certificate: /usr/local/kibana/config/kibana-server.crt
server.ssl.key: /usr/local/kibana/config/kibana-server.key

EOF


# 目录结构 
root@ubuntu-x64_02:/usr/local/elasticsearch9201# ls -tlh /usr/local/kibana/config/
total 44K
-rw-r--r-- 1 root root  989 Mar 23 15:24 kibana-server.crt
-rw-r--r-- 1 elk  elk  5.5K Mar 23 15:20 kibana.yml
-rw-r--r-- 1 elk  elk  1.7K Mar 23 14:56 kibana-server.key
-rw-r--r-- 1 elk  elk  1.2K Mar 22 18:04 elasticsearch-ca.pem
-rw-r--r-- 1 elk  elk   190 Mar 20 19:20 kibana.keystore
-rw-r--r-- 1 elk  elk  5.2K Mar 20 17:26 kibana.yml.bak
-rwxr-xr-x 1 elk  elk  5.2K Jul  9  2022 kibana.yml_20220709073134.bak
-rwxr-xr-x 1 elk  elk   216 Jul  9  2022 node.options
```

- kibana.yml添加以下行入站连接启用 TLS

```
cat >> /usr/local/kibana/config/kibana.yml  <<EOF

server.ssl.enabled: true

EOF


# 修改权限
root@ubuntu-x64_02:/usr/local/elasticsearch9201# chown -R elk:elk /usr/local/kibana
```

- 进行这些更改后，您必须始终通过 HTTPS 访问 Kibana。例如，https://<your_kibana_host>.com。

```
server.publicBaseUrl: "https://192.168.88.12:5601"
```

- 启动 kibana

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# systemctl restart kibana.service 
```

- 检查状态

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# systemctl status  kibana.service 
● kibana.service - kibana
   Loaded: loaded (/lib/systemd/system/kibana.service; disabled; vendor preset: enabled)
   Active: active (running) since Thu 2023-03-23 15:26:50 CST; 6s ago
  Process: 4306 ExecStop=/usr/bin/kill -15 $MAINPID (code=exited, status=203/EXEC)
 Main PID: 4312 (node)
    Tasks: 18
   Memory: 200.5M
      CPU: 6.855s
   CGroup: /system.slice/kibana.service
           ├─4312 /usr/local/kibana/bin/../node/bin/node /usr/local/kibana/bin/../src/cli/dist
           └─4325 /usr/local/kibana/node/bin/node --preserve-symlinks-main --preserve-symlinks /usr/local/kibana/src/cli/dist

Mar 23 15:26:50 ubuntu-x64_02 systemd[1]: kibana.service: Unit entered failed state.
Mar 23 15:26:50 ubuntu-x64_02 systemd[1]: kibana.service: Failed with result 'exit-code'.
Mar 23 15:26:50 ubuntu-x64_02 systemd[1]: Started kibana.
```

登录 kibana ，输入 elastic:123456登录密码，由于CA是自签，浏览器会提示未验证，开发环境可以使用

#### 3、Logstash连接Elasticsearch-https

- 查看证书生成目录 ： es 节点证书

```
root@ubuntu-x64_02:/usr/local/elasticsearch9201# tree elasticsearch
elasticsearch
├── node-1
│   ├── http.p12
│   ├── README.txt
│   └── sample-elasticsearch.yml
├── node-2
│   ├── http.p12
│   ├── README.txt
│   └── sample-elasticsearch.yml
└── node-3
    ├── http.p12
    ├── README.txt
    └── sample-elasticsearch.yml

3 directories, 9 files
```

- 提取集群每个节点http.p12证书中的CA证书

```
# 提取第一个节点的 CA 证书
openssl pkcs12 -in /usr/share/elasticsearch/elasticsearch/node-1/http.p12 -cacerts -nokeys -out /usr/share/elasticsearch/elasticsearch/node-1/ca.crt

# 提取第二个节点的 CA 证书
openssl pkcs12 -in /usr/share/elasticsearch/elasticsearch/node-2/http.p12 -cacerts -nokeys -out /usr/share/elasticsearch/elasticsearch/node-2/ca.crt

# 提取第三个节点的 CA 证书
openssl pkcs12 -in /usr/share/elasticsearch/elasticsearch/node-3/http.p12 -cacerts -nokeys -out /usr/share/elasticsearch/elasticsearch/node-3/ca.crt
```

- 将所有节点的 CA 证书合并到一个文件中

```
cat /usr/share/elasticsearch/elasticsearch/node-1/ca.crt /usr/share/elasticsearch/elasticsearch/node-2/ca.crt /usr/share/elasticsearch/elasticsearch/node-3/ca.crt > /usr/share/elasticsearch/elasticsearch/cluster-ca.crt
```

- 将证书传送至logstash节点

```
scp cluster-ca.crt root@192.168.10.124:/etc/logstash
```

- 在 Logstash 的配置文件（如 `logstash.conf`）中配置 Elasticsearch 输出插件

```
output {
  elasticsearch {
    hosts => [
      "https://node1_elasticsearch_host:9200",
      "https://node2_elasticsearch_host:9200",
      "https://node3_elasticsearch_host:9200"
    ]
    user => "your_username"
    password => "your_password"
    ssl => true
    cacert => "/path/to/combined-ca.crt"
    # 如果你没有合并 CA 证书，可以单独列出每个 CA 证书
    # cacert => ["/path/to/node1/ca.crt", "/path/to/node2/ca.crt", "/path/to/node3/ca.crt"]
  }
}


#单节点可如下配置
#ssl_certificate_verification => true
#truststore => "/home/elastic/elasticsearch-8.4.3/config/certs/http.p12"
#truststore_password => "EDkicmcvTIaby_aFALRl3w"
```

- 确保 Java 信任证书（可选）

对于自签名证书或内部 CA 证书，需要将 CA 证书导入 Java 的信任库：

```
keytool -importcert -file /path/to/combined-ca.crt -keystore $JAVA_HOME/jre/lib/security/cacerts -alias "your_ca_alias"
```

运行此命令后，需要输入 `keystore` 密码，默认密码是 `changeit`。

- 启动 Logstash,验证连接至es集群

```
systemctl start logstash
```

### 八、启用Kibana告警功能

```
Kibana 的 Alert 模块主要用于 Elastic Stack 的监控告警。以一种相对较低的使用成本，将复杂的查询条件，编辑完成后监控不同的 Elastic Stack 的技术产品中产生的数据，最终把符合条件的告警信息以需要的方式反馈给用户。
```

#### 1、前提条件

```
1、Elasticsearch 集群启用了HTTPS的安全设置(非必须)
2、启用API密钥：xpack.security.authc.api_key.enabled: true（必须）
2、在 Kibana 的配置文件中，添加 xpack.encryptedSavedObjects.encryptionKey 设置，它的值为至少 32 位的字符。
```

#### 2、启用告警

Kibana 提供了一个命令行工具来生成加密字符串，该命令行工具在 bin 目录下，使用方式如下：

```
[root@es-master ~]# kibana-encryption-keys generate
## Kibana Encryption Key Generation Utility

The 'generate' command guides you through the process of setting encryption keys for:

xpack.encryptedSavedObjects.encryptionKey
    Used to encrypt stored objects such as dashboards and visualizations
    https://www.elastic.co/guide/en/kibana/current/xpack-security-secure-saved-objects.html#xpack-security-secure-saved-objects

xpack.reporting.encryptionKey
    Used to encrypt saved reports
    https://www.elastic.co/guide/en/kibana/current/reporting-settings-kb.html#general-reporting-settings

xpack.security.encryptionKey
    Used to encrypt session information
    https://www.elastic.co/guide/en/kibana/current/security-settings-kb.html#security-session-and-cookie-settings


Already defined settings are ignored and can be regenerated using the --force flag.  Check the documentation links for instructions on how to rotate encryption keys.
Definitions should be set in the kibana.yml used configure Kibana.

Settings:
xpack.encryptedSavedObjects.encryptionKey: ca6f4a9d6543db9ad86ed12debd6b105
xpack.reporting.encryptionKey: 4d583fae32f33b5bfc13dd88ffd62fac
xpack.security.encryptionKey: 16283b383a14d68c26efc90375d3d2c9
```

修改kibana配置文件，填写生成的加密字符串配置内容。

```
[root@es-master ~]# vim /etc/kibana/kibana.yml
xpack.encryptedSavedObjects.encryptionKey: ca6f4a9d6543db9ad86ed12debd6b105
xpack.reporting.encryptionKey: 4d583fae32f33b5bfc13dd88ffd62fac
xpack.security.encryptionKey: 16283b383a14d68c26efc90375d3d2c9
```

重启kibana

```
[root@es-master ~]# systemctl restart kibana
```

#### 3、访问验证

访问告警页面，已经可以创建告警规则信息了。

![](图片/kibana-创建告警规则.png)

### 九、创建告警规则

#### 1、场景模拟

```
服务器中间件日志出现报错，假如我们需要每分钟查询一次中间件日志的数据，如果前1分钟内出现5条ERROR级别日志，就发送触发一条告警信息。
```

#### 2、调试查询语句

```
GET tmp-2024.06.12/_search
{
  "query": {
    "match": {
      "log_level": "ERROR"
    }
  }
}
```

#### 3、创建规则

告警类型我们选择Elasticsearch查询，填写名称与查询index、查询语句、告警阈值，告警规则配置如下所示：

![](图片/kibana-告警类型.png)

点击测试查询，显示已匹配13个文档，说明告警规则配置无误

#### 4、创建连接器

连接器，也就是告警媒介，告警通过什么方式发送出来，由于使用的社区免费版，所以暂时只开放了服务器日志和索引两个选项。如果想要使用其他告警媒介，需要购买授权才可以。接下来以索引为例，将告警信息写入指定的索引中。

![](图片/kibana-连接器.png)

在索引文档中填写入的告警信息字段，通过右侧的变量菜单可以浏览引用相关的变量。

![](图片/kibana-索引文档.png)

点击保存后，告警规则添加完毕

#### 5、ES集群监控告警

kibana除了可以监控指定查询语句是否满足告警条件外，还支持ES集群状态监控以及节点状态监控，我们只需要按实际需求选择对于的告警规则即可。

![](图片/ES集群监控告警.png)

#### 6、查看告警记录

在索引管理中，已经可以看到自动创建了名为alert-index的索引，有1条告警记录信息。

![](图片/kibana-索引告警.png)

接下来创建数据视图，方便后续查看告警记录信息。

![](图片/kibana-数据视图.png)

在discover中可以看到告警产生的时间和告警值信息。

![](图片/kibana-discover.png)

### 十、Elasticsearch快照备份

```
官方文档参考：https://www.elastic.co/guide/en/elasticsearch/reference/7.17/snapshots-register-repository.html
```

#### 1、注册存储库

**快照存储库类型**

```
#Elasticsearch 服务存储库类型
AWS S3
Google 云端存储 (GCS)
微软 Azure
仅限源代码的存储库

#自我管理存储库类型
共享文件系统
只读 URL 存储库
仅限源代码的存储库
```

**共享文件系统存储库**

- 创建备份目录并设置权限

```
sudo mkdir -p /mnt/backups/es_backup
sudo chown -R elasticsearch:elasticsearch /mnt/backups/es_backup
sudo chmod -R 755 /mnt/backups/es_backup
```

- elasticsearch.yml新增快照目录

```
path:
  repo:
    - /mnt/backups/es_backup
```

**注意**：

```
- 确保当前配置的仓库目录存在，如果不存在，需提前创建
- 如果集群中包含多个节点，则需配置共享目录，单节点则不需要
- 如果集群只想单节点新增快照目录，必须只能在master节点操作
```

- 注册快照存储库

```
#? verify = false验证存储库
curl -X PUT "https://node2.es.example.com:9200/_snapshot/my_fs_backup -H 'Content-Type: application/json' -d'
{
  "type": "fs",
  "settings": {
    "location": "/mount/backups/es_backup"
  }
}'
```

**AWS S3存储库**

配置es以支持minio备份

```
前提条件: minio创建bucket，获取bucket用户Access Key
以下操作在每个ES节点都要执行
```

- 安装S3插件

```
[root@es-master ~]# /usr/share/elasticsearch/bin/elasticsearch-plugin install repository-s3 
-> Installing repository-s3
[repository-s3] is no longer a plugin but instead a module packaged with this distribution of Elasticsearch
-> Please restart Elasticsearch to activate any plugins installed
```

- 添加S3地址

```
[root@es-master ~]# vim /etc/elasticsearch/elasticsearch.yml
s3.client.default.endpoint: 192.168.10.132:9000 # minio服务地址+端口
s3.client.default.protocol: http # 非https时需要指定
```

- 添加Access key至密钥库

```
[root@es-master ~]# /usr/share/elasticsearch/bin/elasticsearch-keystore add s3.client.default.access_key
Enter value for s3.client.default.access_key: 
[root@es-master ~]# /usr/share/elasticsearch/bin/elasticsearch-keystore add s3.client.default.secret_key
Enter value for s3.client.default.secret_key: 
```

- 重启es服务

```
[root@es-master ~]# systemctl restart elasticsearch
```

- 注册快照存储库

```
curl -X PUT "https://node-1.es.example.com:9200/_snapshot/my_s3_repository" -H 'Content-Type: application/json' -d'
{
  "type": "s3",
  "settings": {
    "bucket": "es-backup"
  }
}'
```

**验证存储库**

当您注册快照存储库时，Elasticsearch 会自动验证该存储库在所有主节点和数据节点上是否可用且可以运行。

手动运行存储库验证检查

```
curl -X POST "https://node-1.es.example.com:9200/_snapshot/my_unverified_backup/_verify
```

**清理存储库**

```
curl -X POST "https://node-1.es.example.com:9200/_snapshot/my_repository/_cleanup
```

#### 2、创建快照

```
#前提条件
具有选定master节点的正在运行的集群中拍摄快照。

快照存储库必须已注册并可供集群使用。

集群的全局元数据必须是可读的。要将索引包含在快照中，索引及其元数据也必须是可读的。确保没有任何阻止读取访问的 集群块或索引块。

快照在逻辑上是完整的，但底层实现采用了增量方式，仅复制自上次快照以来新增或变更的 segment（Lucene 的不可变文件）
https://discuss.elastic.co/t/incremental-snapshot-restore/28282?utm_source=chatgpt.com
```

**使用 SLM 自动生成快照**

```
快照生命周期管理 (SLM) 是定期备份集群的最简单方法。SLM 策略会按照预设的时间表自动拍摄快照。该策略还可以根据您定义的保留规则删除快照。具体规则参考官方文档
```

**手动创建快照**

```
#创建快照时可以指定索引。如果不指定，默认会包含所有索引
curl -X PUT "https://node-2.es.example.com:9200/_snapshot/es_backup/snapshot_1"

#创建快照，备份部分索引
#ignore_unavailable：将其设置为true将导致快照创建期间不存在的索引被忽略
#include_global_state：通常在不备份系统索引时，不需要包括全局状态（include_global_state: false）
curl -X PUT "https://node-2.es.example.com:9200/_snapshot/es_backup/snapshot_1" -H 'Content-Type: application/json' -d'
{
  "indices": "messages-2024.06.10",
  "ignore_unavailable": true,
  "include_global_state": false
}'

#根据快照的大小，快照可能需要一段时间才能完成。默认情况下，创建快照 API 仅启动快照进程，该进程在后台运行。若要阻止客户端直至快照完成，请将查询参数设置 wait_for_completion为true

curl -X PUT "https://node-2.es.example.com:9200/_snapshot/es_backup/snapshot_1 ? wait_for_completion = true "
```

**查看快照状态**

```
#查询快照的状态来确认快照是否创建成功
curl -X GET "localhost:9200/_snapshot/es_backup/snapshot_1"


GET _snapshot/my_repository/_current

GET _snapshot/_status

# 查看所有的仓库
GET /_snapshot/_all
# 查看某一个具体的仓库的快照情况
GET /_snapshot/es_s3_repository/_all?pretty
# 列出所有当前正在运行的快照以及显示他们的详细状态信息
GET /_snapshot/_status?pretty
# 列出所有当前正在运行的快照以及显示他们的详细状态信息
GET /_snapshot/es_s3_repository/_status?pretty
# 查看指定快照的详细状态信息即使不是正在运行
GET /_snapshot/es_s3_repository/snapshot_2/_status?pretty
#删除某一个快照
DELETE /_snapshot/es_s3_repository/snapshot_2
```

#### 3、恢复快照

```
#前提条件
您只能将快照还原到具有选定 主节点的正在运行的集群。快照的存储库必须已 注册并可供集群使用。

快照和集群版本必须兼容。请参阅 快照兼容性。

要恢复快照，集群的全局元数据必须是可写的。确保没有任何阻止写入的集群块。恢复操作会忽略索引块。
```

在恢复数据流之前，请确保集群包含 启用了数据流的[匹配索引模板](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/set-up-a-data-stream.html#create-index-template)

```
GET _index_template/*?filter_path=index_templates.name,index_templates.index_template.index_patterns,index_templates.index_template.data_stream
```

如果不存在这样的模板，您可以[创建一个](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/set-up-a-data-stream.html#create-index-template)或 [恢复包含该模板的集群状态](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/snapshots-restore-snapshot.html#restore-entire-cluster)。如果没有匹配的索引模板，数据流就无法滚动或创建后备索引

**注意事项**

```
如果您恢复数据流，您也会恢复其支持索引。

仅当现有索引已关闭且快照中的索引具有相同数量的主分片时， 您才可以恢复现有索引。

您无法恢复现有的打开索引。这包括数据流的支持索引。

恢复操作会自动打开已恢复的索引，包括支持索引。

您只能从数据流中恢复特定的支持索引。但是，恢复操作不会将恢复的支持索引添加到任何现有数据流中。
```

 **获取可用快照列表**

```
GET _snapshot

GET _snapshot/my_repository/*?verbose=false
```

**恢复索引或数据流**

```
#恢复先删除现有索引或数据流，然后再恢复
#不要使用删除索引 API来定位*或.*通配符模式。如果您使用 Elasticsearch 的安全功能，这将删除身份验证所需的系统索引。相反，定位 *,-.*通配符模式以排除这些系统索引和其他以点 ( .) 开头的索引名称。
# Delete an index
DELETE my-index

# Delete a data stream
DELETE _data_stream/logs-my_app-default

POST _snapshot/my_repository/my_snapshot_2099.05.06/_restore
{
  "indices": "my-index,logs-my_app-default"
}
```

**还原时重命名**

```
#rename_pattern：匹配索引名
#rename_replacement：重命名
POST _snapshot/my_repository/my_snapshot_2099.05.06/_restore
{
  "indices": "my-index,logs-my_app-default",
  "rename_pattern": "(.+)",
  "rename_replacement": "restored-$1"
}
```

**排除系统索引**

```
某些 Elasticsearch 功能（例如GeoIP 处理器）会在启动时自动创建系统索引。为避免与这些索引发生命名冲突，请使用通配符模式从恢复请求中-.*排除系统索引和其他点 ( ) 索引
#下请求使用*,-.*通配符模式来恢复除点索引之外的所有索引和数据流

POST _snapshot/my_repository/my_snapshot_2099.05.06/_restore
{
  "indices": "*,-.*"
}
```

**恢复功能状态**

```
通过恢复功能状态来从快照中恢复功能的系统索引、系统数据流和其他配置数据。恢复功能状态是恢复系统索引和系统数据流的首选方法。择仅从快照中恢复特定功能状态，而不管集群状态如何。
#从快照中恢复特定功能状态，请 feature_name在恢复快照 API 的参数中指定响应 feature_states。恢复功能状态时，Elasticsearch 会关闭并覆盖该功能的现有索引

POST _snapshot/my_repository/my_snapshot_2099.05.06/_restore
{
  "indices": "*,-.*",
  "feature_states": [ "geoip" ]
}
```

#### 4、恢复整个集群

```
在某些情况下，您需要从快照还原整个集群，包括集群状态和所有功能状态。这些情况应该很少见，例如在发生灾难性故障时。

恢复整个集群涉及删除重要的系统索引，包括用于身份验证的索引。请考虑是否可以恢复特定索引或数据流。

如果您备份了集群的配置文件，则可以将它们还原到每个节点。此步骤是可选的，需要 完全重启集群。
关闭节点后，将备份的配置文件复制到节点的$ES_PATH_CONF目录中。在重新启动节点之前，确保 elasticsearch.yml包含适当的节点角色、节点名称和其他特定于节点的设置。
如果您选择执行此步骤，则必须在集群中的每个节点上重复此过程
```

- 暂时停止索引并关闭以下功能

```
#GeoIP 数据库下载器
PUT _cluster/settings
{
  "persistent": {
    "ingest.geoip.downloader.enabled": false
  }
}

#ILM
POST _ilm/stop

#Machine Learning
POST _ml/set_upgrade_mode?enabled=true

#Monitoring
PUT _cluster/settings
{
  "persistent": {
    "xpack.monitoring.collection.enabled": false
  }
}

#Watcher
POST _watcher/_stop
```

- 创建超级用户

```
如果您使用 Elasticsearch 安全功能，请登录节点主机，在Elasticsearch 安装目录，然后`superuser`使用该工具将具有角色的用户添加到文件领域[`elasticsearch-users`](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/users-command.html)

#命令创建一个名为 的用户restore_user
./bin/elasticsearch-users useradd restore_user -p my_password -r superuser
```

- 使用[集群更新设置 API](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/cluster-update-settings.html)设置为 [`action.destructive_requires_name`](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/index-management-settings.html#action-destructive-requires-name)。 `false`这可让您使用通配符删除数据流和索引

```
PUT _cluster/settings
{
  "persistent": {
    "action.destructive_requires_name": false
  }
}
```

- 删除集群上所有现有数据流

```
DELETE _data_stream/*?expand_wildcards=all
```

- 删除集群上所有现有索引

```
DELETE *?expand_wildcards=all
```

- 恢复整个快照，包括集群状态。默认情况下，恢复集群状态也会恢复快照中的任何功能状态

```
POST _snapshot/my_repository/my_snapshot_2099.05.06/_restore
{
  "indices": "*",
  "include_global_state": true
}
```

- 恢复停止索引并关闭以下功能

```
#GeoIP 数据库下载器
PUT _cluster/settings
{
  "persistent": {
    "ingest.geoip.downloader.enabled": true
  }
}

#ILM
POST _ilm/start

#Machine Learning
POST _ml/set_upgrade_mode?enabled=false

#Monitoring
PUT _cluster/settings
{
  "persistent": {
    "xpack.monitoring.collection.enabled": true
  }
}

#Watcher
POST _watcher/_start
```

**集群恢复状态**

```
#集群健康状态
GET _cluster/health

#正在进行的分片恢复的详细信息
GET my-index/_recovery

#查看任何未分配的分片
GET _cat/shards?v=true&h=index,shard,prirep,state,node,unassigned.reason&s=state

#获取未分配分片分配状态的更深入解释
GET _cluster/allocation/explain
{
  "index": "my-index",
  "shard": 0,
  "primary": false,
  "current_node": "my-node"
}
```

**还原到不同的集群**

```
快照不与特定集群或集群名称绑定。您可以在一个集群中创建快照，然后在另一个 [兼容集群](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/snapshot-restore.html#snapshot-restore-version-compatibility)中恢复它。从快照恢复的任何数据流或索引也必须与当前集群的版本兼容。集群的拓扑不需要匹配。

要恢复快照，必须 [注册](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/snapshots-register-repository.html)其存储库并将其提供给新集群。如果原始集群仍具有对存储库的写访问权限，请将存储库注册为只读。这可防止多个集群同时写入存储库并破坏存储库的内容。它还可以防止 Elasticsearch 缓存存储库的内容，这意味着其他集群所做的更改将立即可见。
```

在开始还原操作之前，请确保新集群具有足够的容量来存储要还原的任何数据流或索引

- 添加节点或升级硬件以增加容量。
- 恢复更少的索引和数据流。
- 减少恢复索引的[副本数量。](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/index-modules.html#dynamic-index-number-of-replicas)

恢复快照 API 请求使用选项 `index_settings`设置`index.number_of_replicas`为`1`

```
POST _snapshot/my_repository/my_snapshot_2099.05.06/_restore
{
  "indices": "my-index,logs-my_app-default",
  "index_settings": {
    "index.number_of_replicas": 1
  }
}
```

```
如果使用分片分配过滤将原始集群中的索引或支持索引分配给特定节点 ，则新集群中将强制执行相同的规则。如果新集群不包含具有可分配恢复索引的适当属性的节点，则除非在恢复操作期间更改这些索引分配设置，否则将无法成功恢复索引
```

**解决恢复错误**

```
Cannot restore index [<index>] because an open index with same name already exists in the cluster
```

您无法恢复已存在的打开的索引。要解决此错误，请尝试[恢复索引或数据流](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/snapshots-restore-snapshot.html#restore-index-data-stream)中的方法之一。

```
Cannot restore index [<index>] with [x] shards from a snapshot of index [<snapshot-index>] with [y] shards
```

仅当现有索引已关闭且快照中的索引具有相同数量的主分片时，您才可以恢复现有索引。此错误表示快照中的索引具有不同的主分片数量。要解决此错误，请尝试[恢复索引或数据流](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/snapshots-restore-snapshot.html#restore-index-data-stream)中的方法之一。

### 十一、Elasticsearch索引生命周期管理（ILM）

```
ILM是Elasticsearch提供的一种机制，允许用户自动化地管理索引在其整个生命周期内的各个阶段。这些阶段通常包括Hot、Warm、Cold和Delete。每个阶段都有其特定的优化目标和操作，如存储类型、副本数、段合并等。
```

#### 1、生命周期的核心阶段

![](图片/elasticsearch-ILM.png)



```
Hot阶段：此阶段针对新创建或频繁更新的索引。优化目标是高写入速度和实时查询性能。为此，索引可能会被放置在高性能硬件上，并拥有较多的副本以保证可用性。

Warm阶段：当索引不再频繁更新但仍需要被查询时，它会进入Warm阶段。在这个阶段，可以执行如段合并等操作来减少存储占用并提高查询效率。此外，索引可能会被迁移到成本较低的硬件上。

Cold阶段：对于很少被查询的数据，ILM会将其移动到Cold阶段。在这个阶段，数据通常会被压缩并存储在更便宜的存储介质上，以进一步降低成本。

Delete阶段：当数据达到其保留期限或不再需要时，ILM会自动删除索引，从而释放存储空间。
```

![](图片/ILM阶段.png)

#### 2、如何使用ILM

使用ILM主要涉及两个步骤：定义生命周期策略和应用该策略到索引。

```
定义生命周期策略：用户需要定义一个策略，其中包括每个阶段的名称、触发条件（如时间、索引大小等）和在该阶段要执行的操作（如滚动更新、迁移、删除等）。

应用生命周期策略：一旦定义了策略，就可以将其应用到新创建或现有的索引上。当索引满足某个阶段的触发条件时，ILM会自动将其移动到下一个阶段并执行相应的操作。
```

**场景**

```
如果一个日志分析平台，每天都会产生大量的日志数据。你希望这些数据在刚产生时能够快速被索引和查询（Hot阶段），一周后，数据查询频率降低，但仍然需要被保留和偶尔查询（Warm阶段），一个月后，数据几乎不再被查询，但仍然需要长期保存以备不时之需（Cold阶段），最后，在数据保存了一年后，你希望自动删除这些数据以节省存储空间（Delete阶段）。
```

#### 3、定义生命周期策略

定义一个生命周期策略，指定每个阶段的名称、触发条件和操作

```
PUT _ilm/policy/my_logs_policy
{
  "policy": {
    "phases": {
      "hot": {
        "min_age": "0ms",
        "actions": {
          "rollover": {
            "max_age": "7d"
          },
          "set_priority": {
            "priority": 100
          }
        }
      },
      "warm": {
        "min_age": "7d",
        "actions": {
          "forcemerge": {
            "max_num_segments": 1
          },
          "shrink": {
            "number_of_shards": 1
          },
          "readonly": {},
          "allocate": {
            "include": {
              "box_type": "warm"
            }
          }
        }
      },
      "cold": {
        "min_age": "30d",
        "actions": {
          "allocate": {
            "include": {
              "box_type": "cold"
            }
          }
        }
      },
      "delete": {
        "min_age": "180d",
        "actions": {
          "delete": {}
        }
      }
    }
  }
}


#hot是必须阶段，若不配置将采取默认值
PUT _ilm/policy/my_logs_policy
{
  "policy": {
    "phases": {
      "hot" : {
          "min_age" : "0ms",
          "actions" : { }
      },
      "delete": {
        "min_age": "180d",
        "actions": {
          "delete" : {
            "delete_searchable_snapshot" : true
          }
        }
      }
    }
  }
}
```

#### **4、应用生命周期策略到索引模板**

将定义好的生命周期策略应用到索引模板上，这样新创建的索引会自动应用这个策略,不同索引对应不同模板

```
PUT _index_template/logstash_template
{
  "index_patterns": ["logstash-*"],
  "template": {
    "settings": {
      "index.lifecycle.name": "my_logs_policy",
      "index.default_pipeline": "convert_timezone",
      "number_of_shards": 1,
      "number_of_replicas": 0
    },
    "mappings": {
      "properties": {
        "@timestamp": {
          "type": "date",
          "format": "yyyy-MM-dd HH:mm:ss.SSS"
        }
      }
    }
  },
  "priority": 1 #优先级别
}


PUT _index_template/logstash_python_template
{
  "index_patterns": ["logstash-python*"],
  "template": {
    "settings": {
      "index.lifecycle.name": "my_logs_policy",
      "number_of_shards": 1,
      "number_of_replicas": 0
    }
  },
  "priority": 2
}
```

#### **5、写入数据到别名**

当你的应用程序写入日志时，它应该写入到别名`my-logs-alias`，而不是直接写入到具体的索引。Elasticsearch会根据需要自动创建新的索引，并应用生命周期策略。

```
POST my-logs-alias/_doc/1
{
  "message": "This is a log message",
  "timestamp": "2023-04-01T12:00:00Z"
}
```

#### **6、监视索引状态**

使用Elasticsearch的监视工具来观察索引如何随着时间的推移在生命周期的各个阶段之间转换。

```
GET _ilm/explain/my-logs-alias
```

这个命令将返回关于索引当前生命周期状态的信息，包括它当前处于哪个阶段，以及何时会转换到下一个阶段。

#### 7、手动应用设置索引生命周期策略

使用 `PUT` 请求修改索引的设置。例如，要修改 `my-index` 的设置，可以执行以下请求：

```
#设置前需要删除索引原生命周期策略
PUT /my-index/_settings
{
  "index": {
    "lifecycle": {
      "name": "my_logs_policy"
    }
}

```

使用 `GET` 请求获取现有索引的设置信息：

```
GET /my-index/_settings
GET _ilm/status
GET _ilm/policy/my_logs_policy
```

### 十二、Elasticserch时区调整

```
https://www.elastic.co/guide/en/elasticsearch/reference/current/date.html
官方文档强调：在 Elasticsearch 内部，日期被转换为 UTC时区并存储为一个表示自1970-01-01 00:00:00 以来经过的毫秒数的值。

Elasticsearch 默认时区不可以修改。
```

#### 1、ingest pipeline 预处理方式修改时区

**创建Ingest Pipeline模板**

```
PUT _ingest/pipeline/convert_timezone_and_format_date
{
  "description": "Convert @timestamp field timezone to Asia/Shanghai and format date",
  "processors": [
    {
      "date": {
        "field": "@timestamp",
        "formats": ["ISO8601"],
        "timezone": "Asia/Shanghai"
      }
    },
    {
      "script": {
        "lang": "painless",
        "source": """
          SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
          sdf.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
          ZonedDateTime zdt = ZonedDateTime.parse(ctx['@timestamp']);
          ctx['@timestamp'] = sdf.format(Date.from(zdt.toInstant()));
        """
      }
    }
  ]
}
```

**创建索引模板**

```
PUT _index_template/my_template
{
  "index_patterns": ["my_index-*"], // 匹配的索引模式
  "template": {
    "settings": {
      "index.default_pipeline": "convert_timezone_and_format_date" // 设置默认Pipeline
    },
    "mappings": {
      "properties": {
        "@timestamp": {
          "type": "date",
          "format": "yyyy-MM-dd HH:mm:ss.SSS"
        }
      }
    }
  }
}
```

**创建新索引并重新索引数据**

```
POST _reindex
{
  "source": {
    "index": "old_index"
  },
  "dest": {
    "index": "new_index",
    "pipeline": "convert_timezone_and_format_date"
  }
}
```

**验证新索引的数据**

```
GET new_index/_search
```

#### 2、Kibana修改默认时区

kibana 默认时区是浏览器时区。可以修改，修改方式如下：

Stack Management -> Advanced Settings ->Timezone for data formatting.

![](图片/Kibana修改默认时区.png)

### 十三、Elasticsearch版本升级

要从 Elasticsearch 7.14.0 进行滚动升级到 7.14.2，可以按照以下步骤进行。确保你已经备份了数据，并且了解整个升级过程对集群的影响,升级之前停止logstash数据写入。

```
官方最新文档：https://www.elastic.co/guide/en/elastic-stack/8.15/upgrading-elasticsearch.html
```

#### 1、前置条件

1. **备份数据**：确保你有最新的数据备份。
2. **集群健康状态**：确保集群处于绿色健康状态，可以通过 `GET _cluster/health` API 检查。
3. **升级顺序**：依次升级每个节点，避免同时升级多个节点。

#### 2、升级步骤

1.**禁用分片分配:**      

```
PUT _cluster/settings
{
  "persistent": {
    "cluster.routing.allocation.enable": "primaries"
  }
}
```

2.**下载 RPM 包**：下载 Elasticsearch 7.14.2 的 RPM 包。

```sh
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.14.2-x86_64.rpm
```

3.**准备节点**：准备升级的节点。你需要逐个节点进行操作，确保每个节点升级后集群恢复到绿色状态再升级下一个节点。

4.**停止节点**：停止当前节点上的 Elasticsearch 服务。

```sh
sudo systemctl stop elasticsearch
```

5.**安装新版本**：安装下载的 RPM 包。

```sh
sudo rpm -Uvh elasticsearch-7.17.14-x86_64.rpm
```

6.**启动节点**：启动升级后的 Elasticsearch 节点。

```sh
sudo systemctl start elasticsearch
```

7.**启动升级后的节点**:

```
GET _cat/nodes
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

1. **验证版本**：在所有节点上确认 Elasticsearch 版本已经更新到 7.14.2。

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
       "number" : "7.14.2",
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

#### 4、注意事项

- **版本兼容性**：在进行任何升级之前，务必阅读 Elasticsearch 的[官方升级指南](https://www.elastic.co/guide/en/elasticsearch/reference/7.14/setup-upgrade.html)，确保你理解版本之间的兼容性和可能的变更。
- **插件兼容性**：如果你使用了任何插件，确保这些插件也与新版本兼容，并在升级前更新这些插件。

### 十四、Elastic日志告警

#### 1、申请License证书

[Elastic官网申请证书](https://license.elastic.co/registration)，申请完成之后邮件会收到一个下载地址，下载后会得到一个json文件

#### 2、更新License证书

点击Stack-许可管理-更新许可证。上传我们修改后的JSON文件，提示更新成功.![](图片/kibana-更新License证书.png)

#### 3、配置encryptionKey

使用Kibana的告警显示我们需要在kibana.yml中设置xpack.encryptedSavedObjects.encryptionKey，可参考8.2步骤配置

![](图片/kibana-encryptionKey.png)

修改kibana.yml配置文件，在最后面添加

```
xpack.encryptedSavedObjects.encryptionKey: "11112222333344445555666677778888"
```

重启服务

```
systemctl restart kibana
```

#### 4、创建webhook连接器

点击创建连接器，选择webhook类型

![](图片/kibana-webhook.png)

填写好通道名称，机器人的api，请求头，

![](图片/kibana-钉钉.png)

![](图片/kibana-钉钉连接器.png)

然后我们发送一条测试消息，测试通道的连通性。推送的消息格式可以参考[钉钉机器人文档](https://open.dingtalk.com/document/orgapp/robot-message-types-and-data-format)，如果发送失败，则需要排查服务器是否能够访问`https://oapi.dingtalk.com`。

```
{
     "msgtype": "markdown",
     "markdown": {
         "title":"日志告警",
         "text": """### <font color="#FF0000">告警触发 - 日志告警</font>
---
- **告警名称**: {{rule.name}}
- **告警规则**: {{context.conditions}}
- **触发时值**: {{context.value}}
- **触发时间**: {{context.date}}
{{#context.hits}}
- **告警IP**: {{_source.agent_hostname}}
- **原始日志**: <font color="#FF0000">{{_source.message}}</font>
{{/context.hits}}
- **日志查询规则**: {{params.searchConfiguration}}"""
     }
 }
```

#### 5、创建告警规则

选择创建规则，填写好规则名称、通知的时机，告警规则的类型。

![](图片/kibana-创建规则.png)

这里我们选择Elasticsearch查询，语法选择KQL，然后选择数据视图，查询规则，阈值等设置。发送的文档数目是吧匹配到的原始文档存储到变量里面去，下面会用到

![](图片/kibana-创建规则-1.png)

填写完成之后我们可以点击测试查询，看看规则是否能匹配到文档。如果匹配成功了我们添加一个操作，选择Webhook，选择我们开始创建的连接器。

![](图片/kibana-配置连接器.png)

在正文里面可以参考我写的文档，变量的引用可以参考Kibana官网文档。
context.hits代表匹配到的原始文档，但是有很多信息我们没必要咋告警中体现出来，所以使用`{{#context.hits}}`和`{{/context.hits}}`语法，把需要展示的字段信息，写在中间就可以遍历出文档里面的内容了

    {
         "msgtype": "markdown",
         "markdown": {
             "title":"日志告警",
             "text": """### <font color="#FF0000">告警触发 - 日志告警</font>
    ---
    - **告警名称**: {{rule.name}}
    - **告警规则**: {{context.conditions}}
    - **触发时值**: {{context.value}}
    - **触发时间**: {{context.date}}
    {{#context.hits}}
    - **告警IP**: {{_source.agent_hostname}}
    - **原始日志**: <font color="#FF0000">{{_source.message}}</font>
    {{/context.hits}}
    - **日志查询规则**: {{params.searchConfiguration}}"""
         }
     }

**钉钉告警信息验证**

### 十五、Elasticsearch集群节点管理

#### 1、节点管理知识点

**Master节点的职责**

```
主节点的主要作用之一是确定将哪些分片分配给哪些节点，以及何时在节点之间移动分片以重新平衡集群。
```

**分片分配发生的时机**

```
分片分配是将分片分配给节点的过程。 这可能发生在集群初始恢复，副本分配，重新平衡或添加或删除节点期间。
```

**控制分配/重新平衡分片操作的常见设置**

分配分片设置

- cluster.routing.allocation.enable
  目的：启用或禁用特定种类的分片的分配。

```
all - （默认值）允许为所有类型的分片分配分片。
primaries - 仅允许分配主分片的分片。
new_primaries -仅允许为新索引的主分片分配分片。
none - 任何索引都不允许任何类型的分配分片。
```

重新启动节点时，此设置不会影响本地主分片的恢复。
假设重新启动的节点的分配ID与群集状态中的某个活动分配ID匹配，若该节点具有未分配的主分片的副本，则会立即恢复该主分片

**平衡分片设置**

- cluster.routing.rebalance.enable
  目的：为特定类型的分片启用或禁用重新平衡。
  允许控制群集范围内允许的并发分片重新平衡数。默认为2.请注意，此设置仅控制由于群集中的不平衡而导致的并发分片重定位数。此设置不会因分配过滤或强制感知而限制分片重定位。

**权重因子设置**

cluster.routing.allocation.balance.shard

```
目的：定义节点（float）上分配的分片总数的权重因子。默认为0.45f。提高这一点会增加均衡群集中所有节点的分片数量的趋势。
```

cluster.routing.allocation.balance.index

```
目的：定义在特定节点（float）上分配的每个索引的分片数量的权重因子。默认为0.55f。提高这一点会增加在集群中所有节点上均衡每个索引的分片数的趋势。
```

cluster.routing.allocation.balance.threshold

```
目的：应执行的操作的最小优化值（非负浮点数）。默认为1.0f。提高此选项将导致群集在优化分片平衡方面不那么积极
```

**基于磁盘的分片分配**

在确定是将新分片分配给该节点还是主动从该节点拷贝分片到其他节点之前，Elasticsearch会考虑节点上的可用磁盘空间。

**磁盘的三个默认警戒水位线**

cluster.routing.allocation.disk.watermark.low

```
低警戒水位线——默认为磁盘容量的85％。
Elasticsearch不会将分片分配给使用磁盘超过85％的节点。它也可以设置为绝对字节值（如500mb），以防止Elasticsearch在小于指定的可用空间量时分配分片。此设置不会影响新创建的索引的主分片，或者特别是之前任何从未分配过的分片。
```

cluster.routing.allocation.disk.watermark.high

```
高警戒水位线——默认为磁盘容量的90％。
Elasticsearch将尝试从磁盘使用率超过90％的节点重新分配分片。它也可以设置为绝对字节值，以便在节点小于指定的可用空间量时将其从节点重新分配。此设置会影响所有分片的分配，无论先前是否分配。
```

cluster.routing.allocation.disk.watermark.flood_stage

```
洪水警戒水位线——默认为磁盘容量的95％。
Elasticsearch对每个索引强制执行只读索引块（index.blocks.read_only_allow_delete）。这是防止节点耗尽磁盘空间的最后手段。一旦有足够的可用磁盘空间允许索引操作继续，就必须手动释放索引块。
```

cluster.info.update.interval

```
Elasticsearch应该多久检查一次群集中每个节点的磁盘使用情况。 默认为30秒。
```

磁盘的分片分配综合样例配置如下：

```
PUT _cluster/settings
{
  "transient": {
    "cluster.routing.allocation.disk.watermark.low": "50gb",
    "cluster.routing.allocation.disk.watermark.high": "30gb",
    "cluster.routing.allocation.disk.watermark.flood_stage": "10gb",
    "cluster.info.update.interval": "60m"
  }
}
```

**索引/节点层面的分片分配**

可用的动态集群设置如下，其中{attribute}指的是任意节点属性：

```
cluster.routing.allocation.include.{attribute}——至少包含
cluster.routing.allocation.require.{attribute}——全部包含
cluster.routing.allocation.exclude.{attribute}——非、排除操作
```

#### 2、添加节点

```
添加注意事项：
ES必须版本号一致，举例：Elasticsearch V6.4.1。
```

和新配置过Elasticsearch节点一致，以下仅介绍最快的方法。

步骤1：拷贝原有节点的ES相关文件到新机器。
步骤2：修改核心配置文件jvm.options和elasticsearch.yml。

注意1：jvm注意结合实际机器的内存进行合理化配置。取值：Min（32GB，机器内存一半）。
注意2：根据分配的角色（Master/data/client）配置。
注意3：集群名称必须和预先的机器一致。
注意4：避免脑裂，合理化如下配置

```
curl -XPUT 'localhost:9200/_cluster/settings' -d'
{
  "transient": {
    "discovery.zen.minimum_master_nodes": 3
  }
}
```

注意5：禁用集群自动分片，如下配置

```
curl -XPUT 'localhost:9200/_cluster/settings' -d'
{
  "transient": {
    "cluster.routing.allocation.enable": primaries
  }
}
```

注意6：启动报错，根据出错做相关修改。
步骤3：访问9200端口验证成功与否。

步骤4：恢复集群自动分片。

#### 3、删除节点

注意事项：
1、节点数目少的时候，一定要注意脑裂问题。
2、脑裂问题必要的时候需要更新：elasticsearch.yml 中的 minimum_master_nodes。

##### 3.1 方案一——停启集群分片自动分配

**步骤1：暂停数据写入程序**

**步骤2：关闭集群shard allocation**

```
#关闭集群分片自动分配

PUT _cluster/settings
{
  "persistent": {
    "cluster.routing.allocation.enable": primaries
  }
}
```

**步骤3：手动执行POST /_flush/synced**

```
#打开集群分片自动分配
POST /_flush/synced
```

**步骤4：重启结点**

**步骤5：重新开启集群shard allocation**

```
#打开集群分片自动分配
PUT _cluster/settings
{
  "persistent": {
    "cluster.routing.allocation.enable": "all"
  }
}
```

**步骤6：等待recovery完成，集群health status变成green**

**步骤7：重新开启数据写入程序**

##### 3.2 方案二——排除停用节点

**步骤1 排除停用节点**

您可以通过告知群集将其从分配中排除来停用节点。

```
PUT _cluster/settings
{
  "transient" : {
    "cluster.routing.allocation.exclude._ip" : "10.0.0.1"
  }
}
```

这将导致Elasticsearch将该节点上的分片分配给其余节点，而不会将群集状态更改为黄色或红色（即使您的副本数设置为0）。
重新分配所有分片后，您可以关闭节点并执行您需要执行的任何操作。 完成后，，Elasticsearch将再剩余节点上再次重新平衡分片。

**步骤2 检查集群健康状态**

```
curl -XGET ‘http://ES_SERVER:9200/_cluster/health?pretty’
如果没有节点relocating，则排除节点已经被安全剔除，可以考虑关闭节点。
```

**步骤3 判定数据是否还存在**

```
查看节点上是否还有文档存在。
curl -XGET ‘http://ES_SERVER:9200/_nodes/NODE_NAME/stats/indices?pretty’
上述三步，能保证节点稳妥删除。
```

### 十六、Elasticsearch 插件介绍与安装

```
es 插件是一种增强 Elasticsearch 核心功能的途径。它们可以为 es 添加自定义映射类型、自定义分词器、原生脚本、自伸缩等等扩展功能。

es 插件包含 JAR 文件，也可能包含脚本和配置文件，并且必须在集群中的每个节点上安装。安装之后，需要重启集群中的每个节点才能使插件生效。 es 插件包含核心插件和第三方插件两种
```

心插件是 elasticsearch 项目提供的官方插件, 都是开源项目。这些插件会跟着 elasticsearch 版本升级进行升级, 总能匹配到对应版本的 elasticsearch, 这些插件是有官方团队和社区成员共同开发的。

- 官方插件地址：

```
https://github.com/elastic/elasticsearch/tree/master/plugins
```

- 第三方插件

```
第三方插件是有开发者或者第三方组织自主开发便于扩展 elasticsearch 功能, 它们拥有自己的许可协议, 在使用它们之前需要清除插件的使用协议, 不一定随着 elasticsearch 版本升级, 所以使用者自行辨别插件和 es 的兼容性。
```

#### 1、插件安装三种方式

elasticsearch 的插件安装方式还是很方便易用的。

它包含了命令行和离线安装几种方式。

它包含了命令行, url, 离线安装三种方式。

核心插件随便选择一种方式安装均可，第三方插件建议使用离线安装方式

**第一种：命令行**

```
bin/elasticsearch-plugin install [plugin_name]
#bin/elasticsearch-plugin install analysis-smartcn  安装中文分词器
```

**第二种：url 安装**

```
bin/elasticsearch-plugin install [url]
#bin/elasticsearch-plugin install https://artifacts.elastic.co/downloads/elasticsearch-plugins/analysis-smartcn/analysis-smartcn-6.4.0.zip
```

**第三种：离线安装**

```
#https://artifacts.elastic.co/downloads/elasticsearch-plugins/analysis-smartcn/analysis-smartcn-6.4.0.zip
#点击下载analysis-smartcn离线包
#将离线包解压到ElasticSearch 安装目录下的 plugins 目录下
#重启es。新装插件必须要重启es

bin/elasticsearch-plugin install file:///root/elasticsearch-analysis-pinyin-7.17.9.zip
```

**注意：插件的版本要与 ElasticSearch 版本要一致**

### 十七、Elasticsearch-gateway极限网关

```
官方文档:https://infinilabs.cn/docs/latest/gateway/overview/
```

#### 1、介绍

```
极限网关（INFINI Gateway）是一个面向 Elasticsearch 的高性能应用网关，它包含丰富的特性，使用起来也非常简单。极限网关工作的方式和普通的反向代理一样，我们一般是将网关部署在 Elasticsearch 集群前面， 将以往直接发送给 Elasticsearch 的请求都发送给网关，再由网关转发给请求到后端的 Elasticsearch 集群。因为网关位于在用户端和后端 Elasticsearch 之间，所以网关在中间可以做非常多的事情， 比如可以实现索引级别的限速限流、常见查询的缓存加速、查询请求的审计、查询结果的动态修改等等。
```

#### 2、数据架构

![](%E5%9B%BE%E7%89%87/es%E7%BD%91%E5%85%B3-01.jpg)

#### 3、部署网关

##### 3.1 环境准备

| 服务       | 版本   |
| ---------- | ------ |
| Console    | 1.29.3 |
| Gateway    | 1.29.3 |
| Easysearch | 1.12.1 |

##### 3.2 系统调用

系统参数

```
sudo tee /etc/security/limits.d/21-infini.conf <<-'EOF'
*                soft    nofile         1048576
*                hard    nofile         1048576
*                soft    memlock        unlimited
*                hard    memlock        unlimited
root             soft    nofile         1048576
root             hard    nofile         1048576
root             soft    memlock        unlimited
root             hard    memlock        unlimited
EOF
```

内核调用

```
cat << SETTINGS | sudo tee /etc/sysctl.d/70-infini.conf
fs.file-max=10485760
fs.nr_open=10485760
vm.max_map_count=262144

net.core.somaxconn=65535
net.core.netdev_max_backlog=65535
net.core.rmem_default = 262144
net.core.wmem_default = 262144
net.core.rmem_max=4194304
net.core.wmem_max=4194304

net.ipv4.ip_forward = 1
net.ipv4.ip_nonlocal_bind=1
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.tcp_tw_reuse=1
net.ipv4.tcp_tw_recycle = 1
net.ipv4.tcp_max_tw_buckets = 300000
net.ipv4.tcp_timestamps=1
net.ipv4.tcp_syncookies=1
net.ipv4.tcp_max_syn_backlog=65535
net.ipv4.tcp_synack_retries=0
net.ipv4.tcp_keepalive_intvl = 30
net.ipv4.tcp_keepalive_time = 900
net.ipv4.tcp_keepalive_probes = 3
net.ipv4.tcp_fin_timeout = 10
net.ipv4.tcp_max_orphans = 131072
net.ipv4.tcp_rmem = 4096 4096 16777216
net.ipv4.tcp_wmem = 4096 4096 16777216
net.ipv4.tcp_mem = 786432 3145728  4194304
SETTINGS
```

```
sysctl -p
```

##### 3.3 安装网关

自动安装

```
curl -sSL http://get.infini.cloud | bash -s -- -p gateway

通过以上脚本可自动下载相应平台的 gateway 最新版本并解压到/opt/gateway

脚本的可选参数如下：

    -v [版本号]（默认采用最新版本号）

    -d [安装目录]（默认安装到/opt/gateway）
```

系统服务启动

```
./gateway -service install

systemctl status gateway && systemctl start gateway
```

##### 3.4 网关配置

**gateway.yml**

```
allow_multi_instance: true
#for more config examples, please visit: https://github.com/infinilabs/testing

#the env section used for setup default settings, it can be overwritten by system environments.
#eg: PROD_ES_ENDPOINT=http://192.168.3.185:9200 LOGGING_ES_ENDPOINT=http://192.168.3.185:9201  ./bin/gateway
env: #use $[[env.LOGGING_ES_ENDPOINT]] in config instead
  LOGGING_ES_ENDPOINT: http://192.16.20.41:9200/
  LOGGING_ES_USER: elastic
  LOGGING_ES_PASS: elastic
  PROD_ES_ENDPOINT: http://192.16.20.220:9200/
  PROD_ES_USER: elastic
  PROD_ES_PASS: elastic
  DEV_ES_ENDPOINT: http://192.168.1.173:9200/
  DEV_ES_USER: elastic
  DEV_ES_PASS: elastic
  GW_BINDING: "0.0.0.0:8000"
  API_BINDING: "0.0.0.0:2900"


path.data: data
path.logs: log
path.configs: config # directory of additional gateway configurations

configs:
  auto_reload: true
  managed: false

## modules can be disabled by setting enabled to false
#modules:
#  - name: pipeline
#    enabled: false
#  - name: elasticsearch
#    enabled: false
#plugins:
#  - name: gateway
#    enabled: false
#  - name: metrics
#    enabled: false


gateway:
  disable_reuse_port_by_default: false

# Gateway internal stats collecting
stats:
  enabled: true
  # save stats under path.data
  persist: true
  # disable stats operations cache
  no_buffer: true
  # stats operations cache size
  buffer_size: 1000
  # stats operations cache flush interval
  flush_interval_ms: 1000

# Statsd integration
statsd:
  enabled: false
  host: localhost
  port: 8125
  namespace: "gateway."
  protocol: "udp"
  # flush interval
  interval_in_seconds: 1

##json logging layout
#log.format: '{"timestamp":"%UTCDateT%UTCTime","level":"%Level","message":"%EscapedMsg","file":"%File:%Line","func":"%FuncShort"}%n'

#system api
api:
  enabled: true
  network:
    binding: $[[env.API_BINDING]]
#  tls:
#    enabled: true
#    skip_insecure_verify: true
  security: #basic auth for system api
    enabled: false
    username: admin
    password: $[[keystore.API_PASS]] #./bin/gateway keystore add API_PASS

##elasticsearch servers
elasticsearch:
  - name: prod
    enabled: true
    endpoints:
      - $[[env.PROD_ES_ENDPOINT]]
    discovery:
      enabled: true
    basic_auth:
      username: $[[env.PROD_ES_USER]]
      password: $[[env.PROD_ES_PASS]]
    traffic_control.max_bytes_per_node: 1010485760
    metadata_cache_enabled: false # Whether to cache the cluster info in memory cache

  - name: dev
    enabled: true
    endpoints:
      - $[[env.DEV_ES_ENDPOINT]]
    discovery:
      enabled: true
    basic_auth:
      username: $[[env.DEV_ES_USER]]
      password: $[[env.DEV_ES_PASS]]
    traffic_control.max_bytes_per_node: 1010485760
    metadata_cache_enabled: false # Whether to cache the cluster info in memory cache
  - name: logging-server
    enabled: false
    endpoints:
      - $[[env.LOGGING_ES_ENDPOINT]]
    basic_auth:
      username: $[[env.LOGGING_ES_USER]]
      password: $[[env.LOGGING_ES_PASS]]
    discovery:
      enabled: false

entry:
  - name: my_es_entry
    enabled: true
    router: my_router
    max_concurrency: 10000
    network:
      binding: $[[env.GW_BINDING]]
      # See `gateway.disable_reuse_port_by_default` for more information.
      reuse_port: true
#  tls:
#   enabled: true #auto generate certs, cert_file and key_file are optional
#   cert_file: /data/gateway/cert/elasticsearch.pem
#   key_file: /data/gateway/cert/elasticsearch.key
#   skip_insecure_verify: false

router:
  - name: my_router
  # 默认路由
    default_flow: write-flow
    # tracing_flow: logging_flow
    rules:
      - method:
          - "GET"
          - "HEAD"
        pattern:
          - "/{any:*}"
        flow:
          - read-flow
      - method:
          - "POST"
          - "GET"
        pattern:
          - "/_refresh"
          - "/_count"
          - "/_search"
          - "/_msearch"
          - "/_mget"
          - "/{any_index}/_count"
          - "/{any_index}/_search"
          - "/{any_index}/_msearch"
          - "/{any_index}/_mget"
        flow:
          - read-flow
      - method:
          - "*"
        pattern:
          - "/_bulk"
          - "/{any_index}/_bulk"
        flow:
          - write-bulk-flow

flow:
  #部署阶段测试flow流程
  - name: test-flow
    filter:
      - if:
      # 当主集群可用时
          cluster_available: ["prod"]
        then:
          # 先将数据写入主集群
          - elasticsearch:
              elasticsearch: "dev"
          - queue:
              queue_name: "prod-queue"
        else:
          - elasticsearch:
              elasticsearch: "prod"
          - queue:
              queue_name: "dev-queue"


  - name: write-flow
    filter:
      - if:
      # 当主集群可用时
          cluster_available: ["prod"]
        then:
          # 先将数据写入主集群
          - elasticsearch:
              elasticsearch: "prod"
            # 写入消息队列,等待 pipeline 异步消费到备集群
              refresh:
                enabled: true
                interval: 30s
          - queue:
              queue_name: "dev-queue"
        else:
          - elasticsearch:
              elasticsearch: "dev"
              refresh:
                enabled: true
                interval: 30s
          - queue:
              queue_name: "prod-queue"

  - name: write-bulk-flow
    filter:
      - if:
      # 当主集群可用时
          cluster_available: ["prod"]
        then:
          # 先将数据写入主集群
          - elasticsearch:
              elasticsearch: "prod"
              refresh:
                enabled: true
                interval: 30s
            # 写入消息队列,等待 pipeline 异步消费到备集群
          - bulk_reshuffle:
              elasticsearch: dev
              level: cluster
        else:
          - elasticsearch:
              elasticsearch: "dev"
              refresh:
                enabled: true
                interval: 30s
          - bulk_reshuffle:
              elasticsearch: prod
              level: cluster
      
  # 读请求优先发给主集群, 当主集群不可用时发给备集群
  - name: read-flow
    filter:
      - if:
          cluster_available: ["prod"]
        then:
          - elasticsearch:
              elasticsearch: "prod"
              refresh:
                enabled: true
                interval: 30s
        else:
          - elasticsearch:
              elasticsearch: "dev"
              refresh:
                enabled: true
                interval: 30s


##background jobs
pipeline:
  - name: prod-consumer
    auto_start: true
    keep_running: true
    processor:
      - queue_consumer:
          input_queue: "prod-queue" 
          elasticsearch: "prod"
          when:
            cluster_available: ["prod"] # 当集群可用时，才消费队列中的数据
  - name: dev-consumer
    auto_start: true
    keep_running: true
    processor:
      - queue_consumer:
          input_queue: "dev-queue"
          elasticsearch: "dev"
          when:
            cluster_available: ["dev"]

  - name: prod_bulk_requests
    auto_start: true
    keep_running: true
    retry_delay_in_ms: 1000
    processor:
      - bulk_indexing:
          num_of_slices: 1
          max_connection_per_node: 1000
          max_worker_size: 200
          idle_timeout_in_seconds: 5
          elasticsearch: "prod"
          bulk:
            compress: false
            batch_size_in_mb: 20
            batch_size_in_docs: 5000
            invalid_queue: "prod_bulk_invalid_requests"
            dead_letter_queue: "prod_bulk_dead_requests"
            max_retry_times: 5
            response_handle:
              bulk_result_message_queue: "prod_bulk_result_messages"
              max_request_body_size: 1024
              max_response_body_size: 1024
              save_success_results: true
              max_error_details_count: 5
          consumer:
            fetch_max_messages: 100
            eof_retry_delay_in_ms: 500
          queue_selector.labels:
              type: bulk_reshuffle
              level: cluster
              elasticsearch: prod
          when:
            cluster_available: ["prod"]


  - name: dev_bulk_requests
    auto_start: true
    keep_running: true
    processor:
      - bulk_indexing:
          num_of_slices: 1
          max_connection_per_node: 1000
          max_worker_size: 200
          idle_timeout_in_seconds: 5
          elasticsearch: "dev"
          bulk:
            compress: false
            batch_size_in_mb: 20
            batch_size_in_docs: 5000
            invalid_queue: "dev_bulk_invalid_requests"
            dead_letter_queue: "dev_bulk_dead_requests"
            max_retry_times: 5
            response_handle:
              bulk_result_message_queue: "dev_bulk_result_messages"
              max_request_body_size: 1024
              max_response_body_size: 1024
              save_success_results: true
              max_error_details_count: 5
          consumer:
            fetch_max_messages: 100
            eof_retry_delay_in_ms: 1000
          queue_selector.labels:
              type: bulk_reshuffle
              level: cluster
              elasticsearch: dev
          when:
            cluster_available: ["dev"]

##metrics
metrics:
  enabled: true
  queue: metrics
  logging_queue: logging
  instance:
    enabled: true
  network:
    enabled: true
    summary: true
    sockets: true

##diskqueue
disk_queue:
  prepare_files_to_read: true
  #max_bytes_per_file: 20971520
  eof_retry_delay_in_ms: 500
  cleanup_files_on_init: false
  retention:
    max_num_of_local_files: 20 # automatically cleanup consumed files
  compress:
    segment:
      enabled: true
    delete_after_compress: true # trigger cleanup after compression.
    idle_threshold: 20 # max number of uncompressed consumed files to preserve.
#  upload_to_s3: true
#  s3:
#    server: my_blob_store #name defined in s3 servers
#    location: your_location
#    bucket: your_bucket_name

##s3 servers
#s3:
#  my_blob_store: #name of s3 server
#    endpoint: "localhost:9021"
#    access_key: "your_access_key"
#    access_secret: "your_access_secret"
#    token: "your_token"
#    skip_insecure_verify: true
#    ssl: true

## badger kv storage configuration
badger:
  enabled: true
  single_bucket_mode: true
  path: '' # defaults to {path.data}/gateway/node/{nodeID}/badger/
  memory_mode: false # don't persist data to disk
  sync_writes: false # flush to disk on every write
  mem_table_size: 10485760
  num_mem_tables: 1
  # lsm tuning options
  value_log_max_entries: 1000000
  value_log_file_size: 536870912
  value_threshold: 1048576
  num_level0_tables: 1
  num_level0_tables_stall: 2

## floating ip configuration
floating_ip:
  enabled: true # enable floating ip, requires root privilege
  netmask: 255.255.255.0
  ip: '192.168.1.233' # if empty, will automatically bind to x.x.x.234
  interface: 'ens160' # if empty, will automatically find an interface to bind
  local_ip: '192.168.1.173' # if empty, will automatically bind to interface's ip address
  priority: 101 # if <= 0, will random set current node's priority. master will switch to standby if other nodes has higher priority
  echo: # gateway will automatically ping master's echo.port to check whether it's still alive
    port: 61111
    dial_timeout_in_ms: 1000
    timeout_in_ms: 5000
  broadcast:
    binding: 224.3.2.2:7654 # broadcast address for floating ip status broadcast

## elasticsearch module global configurations
elastic:
  # elasticsearch for gateway's system info storage
  elasticsearch: prod
  enabled: true
  remote_configs: false
  health_check:
    enabled: true
    interval: 30s
  availability_check:
    enabled: true
    interval: 30s
  metadata_refresh:
    enabled: true
    interval: 60s
  cluster_settings_check:
    enabled: false
    interval: 60s
```

gateway_easy.yml

```
allow_multi_instance: true
#for more config examples, please visit: https://github.com/infinilabs/testing

#the env section used for setup default settings, it can be overwritten by system environments.
#eg: PROD_ES_ENDPOINT=http://192.168.3.185:9200 LOGGING_ES_ENDPOINT=http://192.168.3.185:9201  ./bin/gateway
env: #use $[[env.LOGGING_ES_ENDPOINT]] in config instead
  LOGGING_ES_ENDPOINT: http://192.16.20.41:9200/
  LOGGING_ES_USER: elastic
  LOGGING_ES_PASS: elastic
  PROD_ES_ENDPOINT: http://192.16.20.220:9200/
  PROD_ES_USER: elastic
  PROD_ES_PASS: elastic
  DEV_ES_ENDPOINT: http://192.168.1.173:9200/
  DEV_ES_USER: elastic
  DEV_ES_PASS: elastic
  GW_BINDING: "0.0.0.0:8000"
  API_BINDING: "0.0.0.0:2900"

path.data: data
path.logs: log
path.configs: config # directory of additional gateway configurations

configs.auto_reload: true # set true to auto reload gateway configurations

## modules can be disabled by setting enabled to false
#modules:
#  - name: pipeline
#    enabled: false
#  - name: elasticsearch
#    enabled: false
#plugins:
#  - name: gateway
#    enabled: false
#  - name: metrics
#    enabled: false


gateway:
  # By default, gateway will always set entry.network.reuse_port as true.
  # If the host doesn't support SO_REUSEPORT, set `true` to disable this behavior
  disable_reuse_port_by_default: false

# Gateway internal stats collecting
stats:
  enabled: true
  # save stats under path.data
  persist: true
  # disable stats operations cache
  no_buffer: true
  # stats operations cache size
  buffer_size: 1000
  # stats operations cache flush interval
  flush_interval_ms: 1000

# Statsd integration
statsd:
  enabled: false
  host: localhost
  port: 8125
  namespace: "gateway."
  protocol: "udp"
  # flush interval
  interval_in_seconds: 1

##json logging layout
#log.format: '{"timestamp":"%UTCDateT%UTCTime","level":"%Level","message":"%EscapedMsg","file":"%File:%Line","func":"%FuncShort"}%n'

#system api
api:
  enabled: true
  network:
    binding: $[[env.API_BINDING]]
#  tls:
#    enabled: true
#    skip_insecure_verify: true
  security: #basic auth for system api
    enabled: false
    username: admin
    password: $[[keystore.API_PASS]] #./bin/gateway keystore add API_PASS

##elasticsearch servers
elasticsearch:
  - name: prod
    enabled: true
    endpoints:
      - $[[env.PROD_ES_ENDPOINT]]
    discovery:
      enabled: false
    basic_auth:
      username: $[[env.PROD_ES_USER]]
      password: $[[env.PROD_ES_PASS]]
    traffic_control.max_bytes_per_node: 1010485760
    metadata_cache_enabled: false # Whether to cache the cluster info in memory cache

  - name: dev
    enabled: true
    endpoints:
      - $[[env.DEV_ES_ENDPOINT]]
    discovery:
      enabled: false
    basic_auth:
      username: $[[env.DEV_ES_USER]]
      password: $[[env.DEV_ES_PASS]]
    traffic_control.max_bytes_per_node: 1010485760
    metadata_cache_enabled: false # Whether to cache the cluster info in memory cache
  - name: logging-server
    enabled: true
    endpoints:
      - $[[env.LOGGING_ES_ENDPOINT]]
    basic_auth:
      username: $[[env.LOGGING_ES_USER]]
      password: $[[env.LOGGING_ES_PASS]]
    discovery:
      enabled: false

entry:
  - name: my_es_entry
    enabled: true
    router: my_router
    max_concurrency: 10000
    network:
      binding: $[[env.GW_BINDING]]
      # See `gateway.disable_reuse_port_by_default` for more information.
      reuse_port: true
#  tls:
#   enabled: true #auto generate certs, cert_file and key_file are optional
#   cert_file: /data/gateway/cert/elasticsearch.pem
#   key_file: /data/gateway/cert/elasticsearch.key
#   skip_insecure_verify: false

router:
  - name: my_router
  # 默认路由
    default_flow: write-flow
    # tracing_flow: logging_flow
    rules:
      - method:
          - "GET"
          - "HEAD"
        pattern:
          - "/{any:*}"
        flow:
          - read-flow
      - method:
          - "POST"
          - "GET"
        pattern:
          - "/_refresh"
          - "/_count"
          - "/_search"
          - "/_msearch"
          - "/_mget"
          - "/{any_index}/_count"
          - "/{any_index}/_search"
          - "/{any_index}/_msearch"
          - "/{any_index}/_mget"
        flow:
          - read-flow

flow:
  - name: write-flow
    filter:
      - if:
      # 当主集群可用时
          cluster_available: ["prod"]
        then:
          # 先将数据写入主集群
          - elasticsearch:
              elasticsearch: "prod"
            # 写入消息队列,等待 pipeline 异步消费到备集群
          - queue:
              queue_name: "dev-queue"
        else:
          - elasticsearch:
              elasticsearch: "dev"
          - queue:
              queue_name: "prod-queue"
      
  # 读请求优先发给主集群, 当主集群不可用时发给备集群
  - name: read-flow
    filter:
      - if:
          cluster_available: ["prod"]
        then:
          - elasticsearch:
              elasticsearch: "prod"
        else:
          - elasticsearch:
              elasticsearch: "dev"

  - name: logging_flow
    filter:
      - logging:
          queue_name: request_logging
          max_request_body_size: 4096
          max_response_body_size: 4096

  - name: async_bulk_flow
    filter:
      - bulk_reshuffle:
          when:
            contains:
              _ctx.request.path: /_bulk
          elasticsearch: prod
          # Options: cluster,node,index,shard
          # NOTE: node/shard level requires elasticsearch cluster info
          level: node
          partition_size: 10 #extra partition within level
          #shards: [1,3,5,7,9,11,13] #filter shards to ingest for node or shard level
          continue_metadata_missing: true # If true, will continue to execute following processors if cluster info missing (level: node, shard)
          fix_null_id: true
      - elasticsearch:
          elasticsearch: prod
          max_connection_per_node: 1000

##background jobs
pipeline:
  - name: prod-consumer
    auto_start: true
    keep_running: true
    processor:
      - queue_consumer:
          input_queue: "prod-queue" 
          elasticsearch: "prod"
          when:
            cluster_available: ["prod"] # 当集群可用时，才消费队列中的数据
  - name: dev-consumer
    auto_start: true
    keep_running: true
    processor:
      - queue_consumer:
          input_queue: "dev-queue"
          elasticsearch: "dev"
          when:
            cluster_available: ["dev"]

  - name: pipeline_logging_merge
    auto_start: true
    keep_running: true
    processor:
      - indexing_merge:
          input_queue: "logging"
          idle_timeout_in_seconds: 1
          elasticsearch: "logging-server"
          index_name: ".infini_logs"
          output_queue:
            name: "gateway-pipeline-logs"
            label:
              tag: "pipeline_logging"
          worker_size: 1
          bulk_size_in_kb: 1
  - name: ingest_pipeline_logging
    auto_start: true
    keep_running: true
    processor:
      - bulk_indexing:
          bulk:
            compress: true
            batch_size_in_mb: 1
            batch_size_in_docs: 1
          consumer:
            fetch_max_messages: 100
          queues:
            type: indexing_merge
            tag: "pipeline_logging"
  ## system logging and metrics
  - name: async_messages_merge
    auto_start: true
    keep_running: true
    processor:
      - indexing_merge:
          input_queue: "bulk_result_messages"
          elasticsearch: "logging-server"
          index_name: ".infini_async_bulk_results"
          output_queue:
            name: "bulk_requests"
            label:
              tag: "bulk_logging"
          worker_size: 1
          bulk_size_in_mb: 10
  - name: metrics_merge
    auto_start: true
    keep_running: true
    processor:
      - indexing_merge:
          input_queue: "metrics"
          elasticsearch: "logging-server"
          index_name: ".infini_metrics"
          output_queue:
            name: "bulk_requests"
            label:
              tag: "metrics"
          worker_size: 1
          bulk_size_in_mb: 10
  - name: request_logging_merge
    auto_start: true
    keep_running: true
    processor:
      - indexing_merge:
          input_queue: "request_logging"
          elasticsearch: "logging-server"
          index_name: ".infini_requests_logging"
          output_queue:
            name: "bulk_requests"
            label:
              tag: "request_logging"
          worker_size: 1
          bulk_size_in_mb: 10
  - name: ingest_merged_requests
    auto_start: true
    keep_running: true
    processor:
      - bulk_indexing:
          num_of_slices: 1 #runtime slicing
          bulk:
            compress: false
            batch_size_in_mb: 10
            batch_size_in_docs: 500
            #remove_duplicated_newlines: true
            invalid_queue: "invalid_request"
            response_handle:
              bulk_result_message_queue: "system_failure_messages"
              max_request_body_size: 10240
              max_response_body_size: 10240
              save_success_results: false
              max_error_details_count: 5
          consumer:
            fetch_max_messages: 100
          queues:
            type: indexing_merge
          when:
            cluster_available: ["logging-server"]

  ##async way to ingest bulk requests handled by async_bulk_flow
  - name: async_ingest_bulk_requests
    auto_start: true
    keep_running: true
    retry_delay_in_ms: 1000
    processor:
      - bulk_indexing:
          max_connection_per_node: 1000
          num_of_slices: 1 #runtime slice
          max_worker_size: 200
          idle_timeout_in_seconds: 10
          bulk:
            compress: false
            batch_size_in_mb: 20
            batch_size_in_docs: 5000
            invalid_queue: "bulk_invalid_requests"
            dead_letter_queue: "bulk_dead_requests"
            response_handle:
              bulk_result_message_queue: "bulk_result_messages"
              max_request_body_size: 1024
              max_response_body_size: 1024
              save_success_results: true
              max_error_details_count: 5
              retry_rules:
                default: true
                retry_429: true
                retry_4xx: false
                denied:
                  status: []
                  keyword:
                    - illegal_state_exception
          consumer:
            fetch_max_messages: 100
            eof_retry_delay_in_ms: 500
          queue_selector:
            labels:
              type: bulk_reshuffle

##metrics
metrics:
  enabled: true
  queue: metrics
  logging_queue: logging
  instance:
    enabled: true
  network:
    enabled: true
    summary: true
    sockets: true

##diskqueue
disk_queue:
  prepare_files_to_read: true
  #max_bytes_per_file: 20971520
  eof_retry_delay_in_ms: 500
  cleanup_files_on_init: false
  retention:
    max_num_of_local_files: 20 # automatically cleanup consumed files
  compress:
    segment:
      enabled: true
    delete_after_compress: true # trigger cleanup after compression.
    idle_threshold: 20 # max number of uncompressed consumed files to preserve.
#  upload_to_s3: true
#  s3:
#    server: my_blob_store #name defined in s3 servers
#    location: your_location
#    bucket: your_bucket_name

##s3 servers
#s3:
#  my_blob_store: #name of s3 server
#    endpoint: "localhost:9021"
#    access_key: "your_access_key"
#    access_secret: "your_access_secret"
#    token: "your_token"
#    skip_insecure_verify: true
#    ssl: true

## badger kv storage configuration
badger:
  enabled: true
  single_bucket_mode: true
  path: '' # defaults to {path.data}/gateway/node/{nodeID}/badger/
  memory_mode: false # don't persist data to disk
  sync_writes: false # flush to disk on every write
  mem_table_size: 10485760
  num_mem_tables: 1
  # lsm tuning options
  value_log_max_entries: 1000000
  value_log_file_size: 536870912
  value_threshold: 1048576
  num_level0_tables: 1
  num_level0_tables_stall: 2

## floating ip configuration
floating_ip:
  enabled: false # enable floating ip, requires root privilege
  netmask: 255.255.255.0
  ip: '' # if empty, will automatically bind to x.x.x.234
  interface: '' # if empty, will automatically find an interface to bind
  local_ip: '' # if empty, will automatically bind to interface's ip address
  priority: 0 # if <= 0, will random set current node's priority. master will switch to standby if other nodes has higher priority
  echo: # gateway will automatically ping master's echo.port to check whether it's still alive
    port: 61111
    dial_timeout_in_ms: 1000
    timeout_in_ms: 5000
  broadcast:
    binding: 224.3.2.2:7654 # broadcast address for floating ip status broadcast

## elasticsearch module global configurations
elastic:
  # elasticsearch for gateway's system info storage
  elasticsearch: prod
  enabled: true
  remote_configs: false
  health_check:
    enabled: true
    interval: 30s
  availability_check:
    enabled: true
    interval: 30s
  metadata_refresh:
    enabled: true
    interval: 60s
  cluster_settings_check:
    enabled: false
    interval: 60s
```

##### 3.5 启动网关

```
systemctl start gateway && systemctl status gateway
```

##### **3.6 验证网关**

查看集群信息

```
curl -XGET http://192.168.1.73:8000/
```

查看gatewat消息队列信息

```
curl -s http://localhost:2900/queue/stats
```

查看promethus指标

```
http://localhost:2900/stats?format=prometheus
```

##### 3.7 gateway高可用

**浮动 IP**

```
极限网关内置浮动 IP 功能，可以实现双机热备、故障转移的能力，极限网关天然提供四层网络流量的高可用，无需再额外考虑增加额外的软件和设备来保障因为停机、网络故障等造成的代理服务中断。
```

注意:

- 该特性目前仅支持 Mac OS、Linux 操作系统。且需要网关以 root 身份运行。
- 此特性依赖目标系统的 `ping` 和 `ifconfig` 命令，请确保相关包默认已安装。
- 一组启用浮动 IP 的网关所在网卡地址应该在一个子网，且内网广播互通（网关实际 IP 和浮动 IP 要求只最后一位地址不一样，如：`192.168.3.x`）。

**什么是浮动 IP**

```
极限网关基于浮动 IP 来实现高可用，浮动 IP 也叫虚拟 IP 或者动态 IP，我们知道每台服务器之间都必须要有 IP 才能进行通信，一台服务器的 IP 一般是固定的并且一般要提前分配好， 如果这台服务器因为故障挂了的话，这个 IP 以及上面部署的业务也就不能访问了。 而一个浮动 IP 通常是一个公开的、可以路由到的 IP 地址，并且不会自动分配给实体设备。项目管理者临时分配这个动态 IP 到一个或者多个实体设备。 这个实体设备有自动分配的静态 IP 用于内部网间设备的通讯。这个内部网使用私有地址，这些私有地址不能被路由到。通过浮动 IP 内网实体的服务才能被外网识别和访问。
```

![](%E5%9B%BE%E7%89%87/es-gateway-7.jpg)

参考配置：

```
## floating ip configuration
floating_ip:
  enabled: true # enable floating ip, requires root privilege
  netmask: 255.255.255.0
  ip: '192.168.1.233' # if empty, will automatically bind to x.x.x.234
  interface: 'ens160' # if empty, will automatically find an interface to bind
  local_ip: '192.168.1.173' # if empty, will automatically bind to interface's ip address
  priority: 101 # if <= 0, will random set current node's priority. master will switch to standby if other 
```

##### 3.8 与prometheus集成

```
scrape_configs:
  - job_name: "prometheus"
    scrape_interval: 5s
    # metrics_path defaults to '/metrics'
    metrics_path: /stats
    params:
      format: ['prometheus']
    # scheme defaults to 'http'.
    static_configs:
      - targets: ["localhost:2900"]
        labels:
          group: 'infini'
```

查看promethus指标

```
http://localhost:2900/stats?format=prometheus
```

#### 4、部署console

```
为了方便在多个集群之间快速切换，使用 INFINI Console（http://console.infinilabs.com/） 来进行管理。
```

##### 4.1 安装console

自动安装

```
curl -sSL http://get.infini.cloud | bash -s -- -p console
```

系统服务启动

```
./console -service install

systemctl status console && systemctl start console
```

初始化

使用浏览器打开 http://localhost:9000 访问，可以看到如下界面，可以进行初始化配置。console元数据信息需要注册在elasticsearch集群中，可以独立安装Easysearch注册或直接注册在业务ES集群中。

![](%E5%9B%BE%E7%89%87/es-console.png)

打开菜单 `System`，注册当前需要管理的 Elasticsearch 集群和网关地址，用来快速管理，如下：

![](%E5%9B%BE%E7%89%87/es-console-2.png)

#### 5、测试网关

##### 5.1 验证数据同步

数据插入

```
for i in {1..3};docurl -XPUT -u elastic:test123 -H "Content-Type: Application/json" \http://11.8.36.25:8000/index-1/_doc/$i \-d "{\"name\":\"tom_$i\",\"age\":\"$i\"}";done
```

数据查询，dev和prod节点可以查询到相同数据

```
GET index-1/_search

# 返回结果
{
  "took" : 3,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 3,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "index-1",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 1.0,
        "_source" : {
          "name" : "tom_1",
          "age" : "1"
        }
      },
      {
        "_index" : "index-1",
        "_type" : "_doc",
        "_id" : "2",
        "_score" : 1.0,
        "_source" : {
          "name" : "tom_2",
          "age" : "2"
        }
      },
      {
        "_index" : "index-1",
        "_type" : "_doc",
        "_id" : "3",
        "_score" : 1.0,
        "_source" : {
          "name" : "tom_3",
          "age" : "3"
        }
      }
    ]
  }
}
```

##### 5.2 消息队列验证

切换defalut_flow为test-flow，再次进行数据同步验证

```
router:
  - name: my_router
  # 默认路由
    default_flow: test-flow
```

_bulk数据插入

```
POST _bulk
{ "index" : { "_index" : "gw-test-2", "_id" : "1" } }
{ "name" : "Alice", "age" : 25, "created_at": "2025-05-27T10:00:00Z" }
{ "index" : { "_index" : "gw-test-2", "_id" : "2" } }
{ "name" : "Bob", "age" : 33, "created_at": "2025-05-27T10:01:00Z" }
{ "index" : { "_index" : "gw-test-2", "_id" : "3" } }
```

数据查看，dev和prod节点可以查询到相同数据

```
GET gw-test-2/_search
{
  "took": 2,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 3,
      "relation": "eq"
    },
    "max_score": 1,
    "hits": [
      {
        "_index": "gw-test-2",
        "_type": "_doc",
        "_id": "1",
        "_score": 1,
        "_source": {
          "name": "Alice",
          "age": 30,
          "created_at": "2025-05-27T10:00:00Z"
        }
      },
      {
        "_index": "gw-test-2",
        "_type": "_doc",
        "_id": "2",
        "_score": 1,
        "_source": {
          "name": "Bob",
          "age": 25,
          "created_at": "2025-05-27T10:05:00Z"
        }
      },
      {
        "_index": "gw-test-2",
        "_type": "_doc",
        "_id": "3",
        "_score": 1,
        "_source": {
          "name": "Charlie",
          "age": 35,
          "created_at": "2025-05-27T10:10:00Z"
        }
      }
    ]
  }
}
```

切回defalut_flow为write-flow,恢复正常flow状态。

##### 5.3 容灾模拟验证

在console中暂停dev环境消息队列pipeline，或停止dev集群

![](%E5%9B%BE%E7%89%87/es-gateway-1.png)

数据插入

```
POST _bulk
{ "index" : { "_index" : "gw-test-2", "_id" : "1" } }
{ "name" : "Alice", "age" : 25, "created_at": "2025-05-27T10:00:00Z" }
{ "index" : { "_index" : "gw-test-2", "_id" : "2" } }
{ "name" : "Bob", "age" : 33, "created_at": "2025-05-27T10:01:00Z" }
{ "index" : { "_index" : "gw-test-2", "_id" : "3" } }
```

数据查询，prod节点可以查询到相同数据，dev节点无法查到数据

```
GET gw-test-2/_search
{
  "took": 2,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 3,
      "relation": "eq"
    },
    "max_score": 1,
    "hits": [
      {
        "_index": "gw-test-2",
        "_type": "_doc",
        "_id": "1",
        "_score": 1,
        "_source": {
          "name": "Alice",
          "age": 30,
          "created_at": "2025-05-27T10:00:00Z"
        }
      },
      {
        "_index": "gw-test-2",
        "_type": "_doc",
        "_id": "2",
        "_score": 1,
        "_source": {
          "name": "Bob",
          "age": 25,
          "created_at": "2025-05-27T10:05:00Z"
        }
      },
      {
        "_index": "gw-test-2",
        "_type": "_doc",
        "_id": "3",
        "_score": 1,
        "_source": {
          "name": "Charlie",
          "age": 35,
          "created_at": "2025-05-27T10:10:00Z"
        }
      }
    ]
  }
}
```

开启dev环境消息队列pipeline，dev环境可以查询数据，数据正常同步。

#### 6、基于gateway无缝迁移

##### 6.1 ES迁移流程

![](%E5%9B%BE%E7%89%87/es-gateway-3.png)

```
业务代码，切流量，双写。(新增的变更都会记录在网关本地，但是暂停消费到移动云)
暂停网关移动云这边的增量数据消费。
迁移 11 月的数据，快照，快照上传到 S3 。
下载 S3 的文件到移动云。
恢复快照到移动云的 11 月份的索引。
开启网关移动云这边的增量消费。
等待增量追平（接近追平）。
按照时间条件（如：时间 A，当前时间往前 30 分钟），验证文档数据量，Hash 校验等等。
停业务的写入，网关，腾讯云的写入（10 分钟）。
等待剩余的增量追完。
对时间 A 之后的，增量进行校验。
切换所有流量到移动云，业务端直接访问移动云 ES。
```



##### 6.2 流量切换

停止dev环境消息队列pipeline，dev集群无法通过网关写入数据，报错在消息队列中。将业务正常写的流量切换到网关

![](%E5%9B%BE%E7%89%87/es-gateway-2.jpg)

切换流量到网关之后，用户的请求还是以同步的方式正常访问自建集群，网关记录到的请求会按顺序记录到 MQ 里面，但是消费是暂停状态。

##### 6.3 全量数据迁移

在流量迁移到网关之后，我们开始对自建 Elasticsearch 集群的数据进行全量迁移到XX云 Elasticsearch 集群。

![](%E5%9B%BE%E7%89%87/es-gateway-4.jpg)通过快照的方式进行恢复

##### 6.4 增量数据迁移

在全量导入的过程中，可能存在数据的增量修改，不过这部分请求都已经完整记录下来了，我们只需要开启网关的消费任务即可将挤压的请求应用到dev的 Elasticsearch 集群。

![](%E5%9B%BE%E7%89%87/es-gateway-5.jpg)

##### 6.5 执行数据比对

增量数据比对

gateway-diff.yaml

```
[root@iZbp1gxkifg8uetb33pvcpZ gateway]# cat 5.4DIFF5.6.yml 
path.data: data
path.logs: log

#show progress bar
progress_bar.enabled: true


elasticsearch:
  - name: target
    enabled: true
    endpoints:
      - http://es-cn-tl32p9fkk0006m56k.elasticsearch.xxx.com:9200
    basic_auth:
      username: elastic
      password: ******
    discovery:
      enabled: false
  - name: source
    enabled: true
    endpoints:
      - http://192.168.0.19:9200
    basic_auth:
      username: test
      password: ******
    discovery:
      enabled: false


pipeline:
  - name: index_diff_service
    auto_start: true
    processor:
    - dag:
        mode: wait_all
        parallel:
          - dump_hash: #dump es1's doc
              indices: "demo_5_4_2"
              scroll_time: "10m"
              elasticsearch: "source"
#              query_string: "@timestamp.keyword:[\"2021-01-17 03:41:20\" TO \"2021-03-17 03:41:20\"]"
              output_queue: "source_docs"
              batch_size: 5000
              slice_size: 5
          - dump_hash: #dump es2's doc
              indices: "demo_5_4_2"
              scroll_time: "10m"
#              query_string: "@timestamp.keyword:[\"2021-01-17 03:41:20\" TO \"2021-03-17 03:41:20\"]"
              batch_size: 5000
              slice_size: 5
              elasticsearch: "target"
              output_queue: "target_docs"
        end:
          - index_diff:
              diff_queue: "diff_result"
              buffer_size: 10
              text_report: true #如果要存 es，这个开关关闭，开启 pipeline 的 diff_result_ingest 任务
              source_queue: 'source_docs'
              target_queue: 'target_docs'

#pipeline:
#  - name: diff_result_ingest
#    processor:
#      - json_indexing:
#          index_name: "diff_result"
#          elasticsearch: "source"
#          input_queue: "diff_result"
```

```
./gateway -config gateway-diff.yaml
```

##### 6.6 切换集群

如果验证完之后，两个集群的数据已经完全一致了，可以将程序切换到新集群，或者将网关的配置里面的主备进行互换

![](%E5%9B%BE%E7%89%87/es-gateway-6.jpg)

双集群在线运行一段时间，待业务完全验证之后，再安全下线旧集群.
