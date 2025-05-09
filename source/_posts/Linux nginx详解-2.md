---
title: Linux nginx详解-2
tags: [nginx]
categories: [Linux]
date: 2025-05-09
---
### 一、网页的状态页

Nginx提供了一个状态页（status page），用于查看服务器的运行状态信息。

状态页将显示当前活动连接数、接受的请求数、处理时间等信息，这些信息对于了解服务器的运行状况和进行故障排查非常有用。

基于Nginx 模块 ngx_http_stub_status_module 实现，在编译安装nginx的时候需要添加编译参数 --with-http_stub_status_module。

状态页显示的是整个服务器的状态,而非虚拟主机的状态。

    yum install -y httpd-tools 
    htpasswd -bc /apps/nginx/conf.d/.httpuser byyd 123456
    
    cd /apps/nginx/conf.d/
    
    vim computer.conf
    
    #添加以下内容
    
    location /nginx_status {
    #验证模块可以不加
       auth_basic           "auth login";
       auth_basic_user_file /apps/nginx/conf/.htpasswd;
       
       stub_status;
    }


```
访问
192.168.2.100/ngin_status
```

![](图片\网页的状态页.png)

```
Active connections：
#当前处于活动状态的客户端连接数，包括连接等待空闲连接数=reading+writing+waiting
accepts
#统计总值，Nginx自启动后已经接受的客户端请求的总数。
handled
#统计总值，Nginx自启动后已经处理完成的客户端请求总数，通常等于accepts，除非有因worker_connections限制等被拒绝的连接
requests
#统计总值，Nginx自启动后客户端发来的总的请求数。
Reading
#当前状态，正在读取客户端请求报文首部的连接的连接数,数值越大,说明排队现象严重,性能不足
Writing
#当前状态，正在向客户端发送响应报文过程中的连接数,数值越大,说明访问量很大
Waiting
#当前状态，正在等待客户端发出请求的空闲连接数，开启 keep-alive的情况下,这个值等于active – (reading+writing)
```

### 二、Nginx第三方模块

Nginx第三方模块就是一种可选的插件，用于扩展和增强Nginx的功能，并根据特定需求自定义其行为。

第三方模块可以添加新的指令、处理程序、变量或修改现有功能。

要使用第三方模块，您需要在编译和安装Nginx时包含相应的模块源代码，并按照模块提供的说明进行配置。

#### 2.1 echo 模块

**原理**

`echo-nginx-module` 是一个第三方的 Nginx 模块，可以解析配置文件中的 echo 指令，并执行对应的脚本或表达式，将其结果作为[HTTP](https://so.csdn.net/so/search?q=HTTP&spm=1001.2101.3001.7020) 响应返回给客户端

使用echo模块，可以实现：

```
1） 输出纯文本：将字符串作为响应的一部分返回给客户端。

2） 输出变量值：将 Nginx 内置变量或自定义变量的值返回给客户端。这对于显示请求头信息或动态生成内容非常有用。

3）输出 HTTP 状态码：设置响应的 HTTP 状态码。

4）控制请求处理流程：通过终止请求或将请求重定向到其他 URL 来控制请求的处理流程。
```

要使用 `echo-nginx-module`，需要在编译安装 Nginx 时添加该模块，或者通过第三方软件包管理工具进行安装。

```
#举个例子
http {
    server {
        listen 80;
        server_name example.com;

        location /hello {
            echo "Hello, World!";
        }
    }
}

当访问 `http://example.com/hello` 时，Nginx 会使用 echo 模块输出 "Hello, World!" 作为 HTTP 响应。
```

**配置**

```
https://codeload.github.com/openresty/echo-nginx-module/zip/refs/heads/master 下载模块包
```

```
unzip echo-nginx-module-master.zip#解压

#重新编译安装 添加echo模块
cd   /test11/nginx-1.18.0

./configure --prefix=/apps/nginx --user=nginx --group=nginx --with-http_ssl_module --with-http_v2_module --with-http_realip_module --with-http_stub_status_module --with-http_gzip_static_module --with-pcre --with-stream --with-stream_ssl_module --with-stream_realip_module --add-module=/test11/echo-nginx-module-master

make -j2 && make install
```

```
#在配置文件中加入echo模块配置
vim /apps/nginx/conf.d/computer.conf 

location  /ip {
  default_type   text/html;
  echo "welcome, your ip addr: ";
  echo $remote_addr;
}

nginx -t
nginx -s reload 
```

```
换一台机器，检测模块是否成功加载
curl 192.168.2.100/ip
```

### 三、变量

在NGINX中，变量是一种用于存储和检索HTTP请求和响应中的数据的机制。

变量可以包含请求头、请求方法、请求参数、时间戳等信息。

```
http://nginx.org/en/docs/varindex.html
官方文档
```

#### 3.1 内置变量

##### 3.1.1 常用内置变量

当NGINX作为反向代理服务器时，它将接收到的客户端请求转发给后端服务器。为了保持请求的来源信息，NGINX可以在转发请求时设置X-Forwarded-For头部，以便后端服务器知道真实的客户端IP地址。

| 内置变量                   | 功能                                                         |
| -------------------------- | ------------------------------------------------------------ |
| `$remote_addr`             | 客户端的地址，注意是客户端的公网IP                           |
| $proxy_add_x_forwarded_for | 在反向代理服务器中设置X-Forwarded-For请求头                  |
| $args                      | 请求的查询参数                                               |
| $arg_                      | 输出名为的查询参数的值                                       |
| $document_root             | 当前请求的根目录路径                                         |
| $document_uri              | 当前请求的URI,不包括查询字符串部分                           |
| $host                      | 存放了请求的主机名                                           |
| limit_rate                 | 如果nginx服务器使用limit_rate配置了显示网络速率，则会显示，如果没有设置， 则显示0 |
| $remote_port               | 客户端请求Nginx服务器时随机打开的端口，这是每个客户端自己的端口 |
| $remote_user               | 已经经过Auth Basic Module验证的用户名                        |
| $request_body_file         | 做反向代理时发给后端服务器的本地资源的名称                   |
| $request_method            | 请求资源的方式，GET/PUT/DELETE等                             |
| $request_filename          | 当前请求的文件路径                                           |
| $request_uri               | 包含请求参数的原始URI，不包含主机名                          |
| `$scheme`                  | 请求使用的协议（http或https）                                |
| $server_protocol           | 保存了客户端请求资源使用的协议的版本                         |
| $server_addr               | 保存了服务器的IP地址                                         |
| $server_name               | 请求的服务器的主机名                                         |
| $server_port               | 请求的服务器的端口号                                         |
| $http_                     | 记录请求报文的首部字段                                       |
| $http_user_agent           | 客户端使用的用户代理                                         |
| $http_cookie               | 请求中的Cookie                                               |
| $cookie_                   | name为任意请求报文首部字部cookie的key名                      |
| $sent_http_                | name为响应报文的首部字段                                     |

##### 3.1.2 举个例子

```
vim /apps/nginx/conf.d/computer.conf
#添加以下内容
location /main {
        index index.html;
        default_type text/html;
        echo "hello world,main-->";
        echo $remote_addr;
        echo $args;
    	echo $arg_user
        echo $document_root;
        echo $document_uri;
        echo $host;
        echo $http_user_agent;
        echo $http_cookie;
        echo $request_filename;
        echo $scheme;
        echo $scheme://$host$document_uri?$args;
        }


- `index index.html;`：指定默认的索引文件为index.html，当访问/main时，如果有index.html文件，将自动显示该文件。

- `default_type text/html;`：指定默认的Content-Type为text/html，如果响应中没有特别指定Content-Type，则使用默认值。

- `echo "hello world,main-->";`：输出字符串"hello world,main-->"。

- `echo $remote_addr;`：输出客户端的IP地址。

- `echo $args;`：输出请求的查询参数。

- `echo $arg_user;`：输出名为user的查询参数的值。

- `echo $document_root;`：输出当前请求的根目录路径。

- `echo $document_uri;`：输出当前请求的URI。

- `echo $host;`：输出请求的主机名。

- `echo $http_user_agent;`：输出客户端使用的用户代理。

- `echo $http_cookie;`：输出请求中的Cookie。

- `echo $request_filename;`：输出当前请求的文件路径。

- `echo $scheme;`：输出请求使用的协议（http或https）。

- `echo $scheme://$host$document_uri?$args;`：输出完整的URL，包括协议、主机、路径和查询参数。
```

```
切换到另一台主机进行测试
curl 192.168.2.100/main

curl '192.168.2.100/main?user=byyd&title=cto'

curl -b  uid=100 '192.168.2.100/main?user=byyd&title=cto'
```

#### 3.2 自定义变量

**原理部分**

在 Nginx 中，自定义变量可以用于存储和操作一些特定的值，以便在配置文件中的不同位置进行重用。

通过 `set` 指令可以将一个值赋给一个新的变量，即新建自定义变量。

```
基本语法
set $variable value; #变量名可自定义

使用环境
server, location, if
```

举个例子

```
vim /apps/nginx/conf.d/computer.conf
#添加以下内容
location /test {
        set $name  byyd;
        echo $name;
        set $my_port $server_port;
        echo $my_port;
        }
```

```
切换到另一台主机
curl 192.168.2.100/main
```

### 四、自定义访问日志 (优化)

自定义访问日志可以提供更灵活和定制化的日志记录方式。

```
1、满足特定需求：通过自定义访问日志，你可以选择记录特定的访问信息，如客户端IP地址、访问时间、请求内容、状态码、传输字节数、引用页面、用户代理等。这些信息可以根据你的需求进行自定义，以满足特定的分析、监控或统计需求。

2、减少日志量：默认情况下，Nginx 记录的访问日志较为详细，包含了大量的信息。而自定义访问日志可以让你只记录感兴趣的信息，避免产生过多的日志数据，减少磁盘空间和读写开销。

3、提高性能：自定义访问日志可以减少磁盘的写入操作，从而减小对系统性能的影响。尤其在高访问量的情况下，减少日志量可以提高系统的处理能力和响应速度。

4、日志分析与监控：自定义访问日志可以使日志数据更易于分析和监控。你可以根据自定义的格式，使用各种日志分析工具或脚本，提取有用的信息，进行访问分析、安全审计、性能优化等工作。
```

#### 4.1 自定义访问日志的格式

要自定义 Nginx 的访问日志，你需要编辑 Nginx 的配置文件，并修改 `http` 部分的日志格式。

以下是一个简单的例子，展示了如何在 Nginx 配置文件中定义一个自定义的访问日志格式：

```
http {
    # 定义自定义访问日志格式
    log_format my_custom_log '$remote_addr - $remote_user [$time_local] "$request" '
                           '$status $body_bytes_sent "$http_referer" '
                           '"$http_user_agent"';

    # 配置使用自定义访问日志格式的访问日志文件
    access_log /path/to/custom_access.log my_custom_log;

    # 其他配置项...
}

在上述例子中，我们使用 `log_format` 指令定义了一个名为 `my_custom_log` 的自定义日志格式，该格式包含了 IP 地址、用户名、访问时间、请求内容、状态码、传输字节数、引用页面和用户代理等信息。

然后，在 `access_log` 指令中指定了一个自定义访问日志文件的路径 `/path/to/custom_access.log`，并且将之前定义的 `my_custom_log` 格式应用于该日志文件。

请注意，修改完配置文件之后，记得重新加载 Nginx 配置使改动生效，使用命令 `nginx -s reload` 可以实现配置文件的热重载。
```

#### 4.2 自定义json 格式日志

```
log_format access_json '{"@timestamp":"$time_iso8601",'
        '"host":"$server_addr",'
        '"clientip":"$remote_addr",'
        '"size":$body_bytes_sent,'
        '"responsetime":$request_time,'
        '"upstreamtime":"$upstream_response_time",'
        '"upstreamhost":"$upstream_addr",'  
        '"http_host":"$host",'
        '"uri":"$uri",'
        '"xff":"$http_x_forwarded_for",'
        '"referer":"$http_referer",'
        '"tcp_xff":"$proxy_protocol_addr",'
        '"http_user_agent":"$http_user_agent",'
        '"status":"$status"}';


location / {
  root /data/nginx/pc/;
  access_log logs/access.log access_json;
}
'"http_user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTMLe/101.0.4951.54 Safari/537.36",'    '"status":"304"}'

```

```
脚本
#!/usr/bin/env python3
#coding:utf-8
status_200= []
status_404= []
with open("access_json.log") as f:
    for line in f.readlines():
        line = eval(line)
        if line.get("status") == "200":
            status_200.append(line.get)
        elif line.get("status") == "404":
            status_404.append(line.get)
        else:
            print("状态码 ERROR")
        print((line.get("clientip")))
f.close()
print("状态码200的有--:",len(status_200))
print("状态码404的有--:",len(status_404))
```

### 五、Nginx压缩功能（重要）

**原理部分**

Nginx通过在服务器上启用gzip模块来提供压缩功能。

启用gzip后，Nginx会自动检测客户端的浏览器支持情况，然后在服务器和客户端之间压缩和解压缩文件。

太小的文件没必要压缩，压缩说不定变大了。

官方文档： https://nginx.org/en/docs/http/ngx_http_gzip_module.html

| 参数项            | 释义                                           | 参数值                  |
| ----------------- | ---------------------------------------------- | ----------------------- |
| gzip              | 开启或关闭压缩机制                             | on/off;                 |
| gzip_types        | 根据文件类型选择性开启压缩机制                 | image/png、text/css…    |
| gzip_comp_level   | 用于设置压缩级别，级别越高越耗时               | 1~9（越高压缩效果越好） |
| gzip_vary         | 设置是否携带Vary:Accept-Encoding头域的响应头部 | on/off;                 |
| gzip_buffers      | 设置处理压缩请求的缓冲区数量和大小 数量 大小， | 如16 8k;                |
| gzip_disable      | 针对不同客户端的请求来设置是否开启压缩         | 如 .*Chrome.*;          |
| gzip_http_version | 指定压缩响应所需要的最低HTTP请求版本           | 如1.1;                  |
| gzip_min_length   | 设置触发压缩的文件最低大小                     | 如512k;                 |
| gzip_proxied      | 对于后端服务器的响应结果是否开启压缩           | off、expired、no-cache… |

```
http{
    # 开启压缩机制
    gzip on;
    # 指定会被压缩的文件类型(也可自己配置其他类型)
    gzip_types text/plain application/javascript text/css application/xml text/javascript image/jpeg image/gif image/png;
    # 设置压缩级别，越高资源消耗越大，但压缩效果越好
    gzip_comp_level 5;
    # 在头部中添加Vary: Accept-Encoding（建议开启）
    gzip_vary on;
    # 处理压缩请求的缓冲区数量和大小
    gzip_buffers 16 8k;
    # 对于不支持压缩功能的客户端请求不开启压缩机制
    gzip_disable "MSIE [1-6]\."; # 低版本的IE浏览器不支持压缩
    # 设置压缩响应所支持的HTTP最低版本
    gzip_http_version 1.1;
    # 设置触发压缩的最小阈值
    gzip_min_length 2k;
    # 关闭对后端服务器的响应结果进行压缩
    gzip_proxied off;
}
```

**配置实例**

```
vim /apps/nginx/conf.d/computer.conf 
浏览器访问 192.168.2.100/test.jpg
```

### 六、HTTPS 功能

#### 6.1 Nginx的HTTPS工作原理的详解

```
1）客户端发送HTTPS请求：客户端（例如Web浏览器）通过HTTPS协议向Nginx服务器发送加密的HTTP请求。默认情况下，HTTPS使用443端口进行通信。

2）服务器证书握手：Nginx服务器接收到HTTPS请求后，会向客户端发送已经配置好的SSL证书。该证书包含了服务器的公钥以及其他相关信息，例如服务器的域名。

3）客户端验证证书：客户端接收到服务器发送的证书后，会使用预置的受信任证书颁发机构（CA）根证书列表来验证详细的服务器证书链。客户端会检查证书是否由受信任的CA签发，并验证证书的有效性和真实性。如果证书通过验证，客户端可以确认服务器的身份。

4）密钥交换：如果服务器的证书被成功验证，客户端会生成一个随机的对称密钥，称为“会话密钥”。然后，客户端使用服务器的公钥来加密该会话密钥，并将其发送给服务器。

5）数据加密：Nginx服务器接收到客户端发送的加密的会话密钥后，使用服务器的私钥解密该会话密钥。此后，Nginx服务器和客户端使用会话密钥来进行对称加密和解密，以加密和解密数据的传输。

6）安全数据传输：一旦会话密钥被交换并使用，Nginx服务器和客户端之间的通信将通过使用会话密钥进行加密和解密来保证安全性。所有通过HTTPS协议传输的数据，包括HTTP请求和响应内容，都将被加密。

```

客户端和服务器之间的加密通道建立后，数据在传输过程中将经过加密，从而提供了更高的安全性。

#### 6.2 启用功能模块的配置过程

Nginx的HTTPS功能通过ngx_http_ssl_module模块来实现的。

ngx_http_ssl_module模块为Nginx添加了对SSL/TLS协议的支持，使其能够提供HTTPS服务。

ngx_http_ssl_module模块提供了一组配置项，用于指定SSL证书、私钥、加密算法、协议版本以及其他与SSL/TLS相关的设置。

配置步骤：

1）获取SSL证书和私钥：从证书颁发机构（CA）或自签名证书颁发机构获取有效的SSL证书和对应的私钥文件。证书用于验证服务器的身份，私钥用于解密SSL连接。

2）配置Nginx：`编辑主配置文件nginx.conf`

```
ssl_certificate：指定SSL证书文件的路径。

ssl_certificate_key：指定SSL私钥文件的路径。

ssl_protocols：指定支持的TLS协议版本，例如TLSv1.2、TLSv1.3。

ssl_ciphers：指定加密算法套件，例如AES128-GCM-SHA256、ECDHE-RSA-AES256-GCM-SHA384。

其他可选的SSL配置项：ssl_prefer_server_ciphers、ssl_session_timeout等。
```

举个例子

```
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate /path/to/certificate.crt
    ssl_certificate_key /path/to/private/key.key;

    # SSL配置项
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
}
```

3）重启Nginx：保存配置文件，并重新加载或重启Nginx服务。

```
nginx -s reload
```

#### 6.3 配置实例-----自签名证书

![](图片\自签名证书.png)

```
ca.crt相当于颁发机构
byyb.com.crt相当于颁发对象
```

![](图片\生成证书.png)

```
cat byyb.com.crt ca.crt  > www.byyb.com.crt #合并

mv byyb.com.key www.byyb.com.key #公钥
```

```
#编辑配置文件 
vim /apps/nginx/conf.d/computer.conf

server {
 listen 80;
 listen 443 ssl;
 ssl_certificate /ct/www.byyb.com.crt;
 ssl_certificate_key /ct/ssl/www.byyb.com.key;
 ssl_session_cache shared:sslcache:20m;
 ssl_session_timeout 10m;
location  / {
        root  /apps/nginx/html;
        if ( $scheme = http) {
        rewrite ^/(.*)$ https://www.byyb.com/$1 redirect;
      }
}
```

```
编辑Windows的本地hosts文件，添加地址映射
路径 C:\Windows\System32\drivers\etc\hosts

打开浏览器，访问
https:www.byyb.com
```

![](图片\https.png)

### 七、自定义图标

`favicon.ico` 文件是浏览器收藏网址时显示的图标。

当客户端使用浏览器问页面时，浏览器会自己主动发起请求获取页面的favicon.ico文件。
当浏览器请求的`favicon.ico`文件不存在时，服务器会记录`404日志`，而浏览器会显示`404`报错。

```
#方法一：服务器不记录访问日志：
location = /favicon.ico {
   log_not_found off;
   access_log off;
}
#方法二：将图标保存到指定目录访问：
#location ~ ^/favicon\.ico$ {
location = /favicon.ico {
     root   /data/nginx/html/pc/images;
     expires 365d;  #设置文件过期时间
}
```

### 八、nginx重写

[Nginx服务器](https://so.csdn.net/so/search?q=Nginx服务器&spm=1001.2101.3001.7020)利用 `ngx_http_rewrite_module` 模块解析和处理rewrite请求。

Nginx 的重写功能是指通过修改请求 URL 的方式来实现URL重定向或者路由转发的功能。

通过使用重写规则，可以对访问的URL进行匹配和替换，以达到用户期望的效果。

```
#举个例子
location /old-url {
  rewrite ^/old-url/(.*)$ /new-url/$1 permanent;
}

匹配以 "/old-url/" 开头的请求，并将其重定向到 "/new-url/"。
```

### 九、if指令（单分支）

#### 9.1 基本原理

```
官方文档
https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#if
```

if指令用于条件匹配判断，并根据条件判断结果选择不同的[Nginx配置](https://so.csdn.net/so/search?q=Nginx配置&spm=1001.2101.3001.7020)，可以配置在server或location块中。

Nginx的if语法仅能使用if做单次判断，不支持使用if else或者if elif这样的多重判断。

#### 9.2 基本语法

```
if （条件匹配） { 
 action
}
```

使用正则表达式对变量进行匹配，匹配成功时if指令认为条件为true，否则认为false。

变量与表达式之间使用以下符号链接

```
=   #比较变量和字符串是否相等，相等时if指令认为该条件为true，反之为false
!=  #比较变量和字符串是否不相等，不相等时if指令认为条件为true，反之为false
~   #区分大小写字符，可以通过正则表达式匹配，满足匹配条件为真，不满足匹配条件为假
!~  #区分大小写字符,判断是否匹配，不满足匹配条件为真，满足匹配条件为假

~*  #不区分大小写字符，可以通过正则表达式匹配，满足匹配条件为真，不满足匹配条件为假
!~* #不区分大小字符,判断是否匹配，满足匹配条件为假，不满足匹配条件为真
```

```
-f 和 !-f #判断请求的文件是否存在和是否不存在
-d 和 !-d #判断请求的目录是否存在和是否不存在
-x 和 !-x #判断文件是否可执行和是否不可执行
-e 和 !-e #判断请求的文件或目录是否存在和是否不存在(包括文件，目录，软链接)
```

如果$ 变量的值为空字符串或0，则if指令认为该条件为false，其他条件为true。

$变量的值如果以0开头的任意字符串会返回false

#### 9.3 举个例子

```
vim /apps/nginx/conf.d/computer.conf
```

```
#添加以下内容
location /main {
     index index.html;
     default_type text/html;
     if ( $scheme = http ){
       echo "if-----> $scheme";
     }
     if ( $scheme = https ){
      echo "if ----> $scheme";
   }
    
     #if (-f $request_filename) {
     #   echo "$request_filename is exist";
     #}
     if (!-e $request_filename) {
        echo "$request_filename is not exist";
        #return ;
   }
 }

#语法检查+重载
nginx -t 
nginx -s relaod 
```

```
浏览器输入
192.168.2.100/main/12312 #输入不存在的文件
浏览器中输入
192.168.2.100/main #测试存在的文件
```

### 十、return指令

#### 10.1 定义和作用

return用于完成对请求的处理，并直接向客户端返回响应状态码。

#### 10.2 基本语法

```
return code; #返回给客户端指定的HTTP状态码


return code [text]; #返回给客户端的状态码及响应报文的实体内容，可以调用变量,其中text如果有空格,需要用单或双引号


return code url; #返回给客户端的URL地址 
如果要跳转到url code只能是302或者301，对应临时/永久重定向

301 客户机访问服务器时，服务器会将跳转缓存到客户机中，下次跳转就不需要服务器，从客户机本地缓存调取。
302 临时
```

#### 10.3 举个例子

1）状态码及响应报文返回

```
vim /apps/nginx/conf.d/computer.conf

server { 
    listen 80;
    server_name www.byyb.com;
    root /data/nginx/pc/;
    location / {
        default_type text/html;
        if ( !-e $request_filename )
            { return 302/index.html;
        }
    }
```

```
测试
curl 192.168.2.100/test #存在的
curl 192.168.2.100/sss #不存在的
```

2）URL返回

路径重定向

```
#配置文件中添加
location /test {
        default_type text/html;
        return 302 http://www.baidu.com;    
}
```

### 十一、set指令

`set` 指令用于创建或更改一个变量的值，即自定义变量。

**基本语法**

```
set $variable value;
#$variable 是要创建或更改的变量的名称，value是要给变量赋予的值


创建一个变量并赋予一个静态值：
set $my_var 'Hello, World!';

将已有的变量的值赋给新的变量
set $new_var $existing_var;


使用表达式给变量赋值
set $num 10;
set $result $num * 2;
```

**举个例子**

```
#配置文件中修改
location /main {
   root /data/nginx/html/pc;
   index index.html;
   default_type text/html;
    set $name byyd;
    echo $name;
    set $my_port $server_port;
    echo $myport;
}
```

```
curl 192.168.2.100/main #看看是否返回自定义变量的值
```

### 十二、break指令

#### 12.1 基本原理

break 指令用于中断当前请求的处理，并立即终止对该请求的后续处理过程。

break 指令的使用场景通常是在 if 语句块中，用于提前结束对请求的处理。当满足某个条件时，可以使用 break 指令来跳出当前的 if 块，终止请求的处理。

以下是一个使用 break 指令的例子：

    location /example {
        if ($arg_param = "value") {
            # 条件满足，中断请求处理
            break;
        }
    
        # 继续处理请求...
    }


break指令只会不执行 `ngx_http_rewrite_module` 模块的指令

#### 12.2 举个例子

```
#配置文件中添加
location /main {
    default_type text/html;
    set $name "byyb";
    echo $name;
    break;
    set $n_name "byyd";
    echo $n_name;
}
```

```
curl 192.168.2.100/main 
```

### 十三、rewrite指令

#### 13.1 基本原理

```
官方文档
https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite
```

rewrite可以配置在 server、location、if部分。

nginx的rewrite指令用于在请求处理过程中重写或重定向URL。它通常用于URL重写、重定向、域名转发等场景

#### 13.2 基本语法

```
rewrite  regex               replace ment        [flag];
指令     正则匹配原始访问url    替代你想让客户访问的     标志  ;
```

rewrite将用户请求的URI基于regex所描述的模式进行检查，匹配到时将其替换为表达式指定的新的URI。

**regex 部分 (正则表达式)**

```
. #匹配除换行符以外的任意字符
\w #匹配字母或数字或下划线或汉字
\s #匹配任意的空白符
\d #匹配数字    [0-9]   
\b #匹配单词的开始或结束
^ #匹配字付串的开始
$ #匹配字符串的结束
* #匹配重复零次或更多次
+ #匹配重复一次或更多次
? #匹配重复零次或一次
(n) #匹配重复n次
{n,} #匹配重复n次或更多次
{n,m} #匹配重复n到m次
*? #匹配重复任意次，但尽可能少重复
+? #匹配重复1次或更多次，但尽可能少重复
?? #匹配重复0次或1次，但尽可能少重复
{n,m}? #匹配重复n到m次，但尽可能少重复
{n,}? #匹配重复n次以上，但尽可能少重复
\W  #匹配任意不是字母，数字，下划线，汉字的字符
\S #匹配任意不是空白符的字符
\D #匹配任意非数字的字符
\B #匹配不是单词开头或结束的位置
[^x] #匹配除了x以外的任意字符
[^kgc] #匹配除了kgc 这几个字母以外的任意字符
```

**flag部分（标志）**

rewrtie有四种不同的flag，分别是redirect(临时重定向302)、permanent(永久重定向301)、break和last。其中前两种是跳转型的flag，后两种是代理型

- 跳转型指由客户端浏览器重新对新地址进行请求
- 代理型是在WEB服务器内部实现跳转

```
redirect;302
#临时重定向，重写完成后以临时重定向方式直接返回重写后生成的新URL给客户端，由客户端重新发起请求;使用相对路径,或者http://或https://开头，状态码：302

permanent;301       www.bj.com     www.beijing.com
#重写完成后以永久重定向方式直接返回重写后生成的新URL给客户端，由客户端重新发起请求，状态码：301



break;       www.bj.com
#重写完成后,停止对当前URL在当前location中后续的其它重写操作，而后直接跳转至重写规则配置块之后的其它配置;结束循环，建议在location中使用
#适用于一个URL一次重写 
 



last;
#重写完成后,停止对当前URI在当前location中后续的其它重写操作，而后对新的URL启动新一轮重写检查，不建议在location中使用
#适用于一个URL多次重写，要注意避免出现超过十次以及URL重写后返回错误的给用户301
```

#### 13.3 举个例子

##### 13.3.1 重写URL路径:目录重定向

```
vim /apps/nginx/conf.d/computer.conf #编辑配置文件
```

![](图片\目录重定向.png)

```
#建立测试文件夹和主页
cd /apps/nginx/html
mkdir bj ;echo This is bj > bj/index.html
mkdir beijing;echo This is Beijing > beijing/index.html
```

```
#访问测试
curl 192.168.2.100/bj 
```

##### 13.3.2 域名重定向：所有域名都跳转到accp

```
vim /apps/nginx/conf.d/computer.conf #编辑配置文件

server {
listen 80;
server_name www.byyb.com;
root /apps/nginx/html;
location / {
rewrite / http://www.accp.com  permanent;
 }
}
~
~
```

##### 13.3.3 http 转https

需要先启用HTTPS模块，这里不再演示。[（详见自签名证书部分）](https://blog.csdn.net/q2524607033/article/details/132524825?spm=1001.2014.3001.5501)

```
vim /apps/nginx/conf.d/computer.conf #编辑配置文件

server {
 listen 443 ssl;   
 listen 80;
 ssl_certificate /zs/www.byyb.com.crt;
 ssl_certificate_key /zs/www.byyb.com.key;
 ssl_session_cache shared:sslcache:20m;
 ssl_session_timeout 10m;
 server_name www.byyb.com;
 location / {    #针对全站跳转
   root /data/nginx/html/pc;
   index index.html;
    if ($scheme = http ){   #如果没有加条件判断，会导致死循环
   rewrite / https://$host redirect;
   } 
 }
 location /login {   
 if ($scheme = http ){ #如果没有加条件判断，会导致死循环
   rewrite / https://$host/login redirect;
   }
    }
}
```

![](图片\http 转https.png)

```
打开浏览器，访问
http://www.byyb.com
```

### 十四、防盗链

#### 14.1 什么是盗链？

盗链（Hotlinking）是指在一个网站上使用或显示其他网站的资源（如图片、视频、音频等）的行为，而不是通过将资源保存到本地服务器来引用这些资源。

盗链者直接链接到原始资源的URL，使得资源消耗原始网站的带宽和服务器资源，会给原始网站带来额外的负担，并且可能导致资源被滥用或不当使用。

#### 14.2 防盗链简介

`Nginx`的防盗链机制实现，跟一个头部字段：`Referer`有关，该字段主要描述了当前请求是从哪儿发出的，那么在`Nginx`中就可获取该值，然后判断是否为本站的资源引用请求，如果不是则不允许访问。

**基本语法**

```
valid_referers none | blocked | server_names | string ...;
```

`none`：表示接受没有`Referer`字段的`HTTP`请求访问。

`blocked`：表示允许`http://`或`https//`以外的请求访问。

`server_names`：资源的白名单，这里可以指定允许访问的域名。

`string`：可自定义字符串，支配通配符、正则表达式写法。

#### 14.3 实现防盗链

**第一台主机**

```
vim /apps/nginx/conf.d/computer.conf
#添加内容
location ~* \.(jpg|gif|swf)$ {            
         root  /data/nginx/html/pc;
         valid_referers none blocked *.byyb.com byyb.com;   
         if ( $invalid_referer ) {
           rewrite ^/ http://www.byyb.com/error.png;
           #return  403
           }
        }
```

![](图片\防盗链-1.png)

```
cd  /data/nginx/html/pc/
在此目录在放入 a.jpg 和 error.png 
#用于测试的图片
```

**第二台主机**

```
#yum安装nginx
yum install epel-release.noarch -y
yum install nginx
```

```
cd /usr/share/nginx/html

vim  index.html

<html>
<body>
<h1>this is byyb  </h1>
<img src="http://www.byyb.com/a.jpg"/>
</body>
</html>

#保存后启动服务
systemctl start nginx 
```

```
#修改主配置文件
vim  /etc/nginx/nginx.conf 

#41行修改
server_name  www.accp.com;
```

```
修改windows的本地hosts文件，添加映射关系
```

开始测试 防盗链是否配置成功

没有配置防盗链时

```
浏览器访问
www.accp.com
可以查看图片
```

配置防盗链后

```
浏览器访问
www.accp.com
无法查看图片
```

![](图片\防盗链-2.png)

补充说明

如果子配置文件中用的 return 403

![](图片\防盗链-3.png)