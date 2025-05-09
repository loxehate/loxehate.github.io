---
title: Linux gost详解
tags: [vpn]
categories: [Linux]
date: 2025-05-09
---
### 一、项目介绍

```
官方文档；https://v2.gost.run/
github：https://github.com/ginuerzh/gost?tab=readme-ov-file

GO Simple Tunnel (GOST) 是一个用 Go 语言编写的简单隧道工具。它支持多种协议和功能，包括多端口监听、多级转发链、TCP/UDP 端口转发、反向代理和隧道、TCP/UDP 透明代理、DNS 解析和代理、TUN/TAP 设备、负载均衡、路由控制、准入控制、限速限流、插件系统以及 Prometheus 监控指标等。
```

### 二、项目快速启动

#### 2.1、安装

你可以通过以下几种方式安装 GOST：

**二进制文件**

从 [GitHub Releases](https://github.com/go-gost/gost/releases) 页面下载适合你操作系统的二进制文件。

**源码编译**

```
git clone https://github.com/go-gost/gost.git
cd gost/cmd/gost
go build
```

**Docker**

```
docker run --rm gogost/gost -V
```

#### 2.2、快速上手

作为标准 HTTP/SOCKS5 代理

```
gost -L=:8080
```

设置代理认证信息

```
gost -L=admin:123456@localhost:8080
```

多端口监听

```
gost -L=http2://:443 -L=socks5://:1080 -L=ss://aes-128-cfb:123456@:8338
```

设置转发代理

```
gost -L=:8080 -F=192.168.1.1:8081
```

设置多级转发代理（代理链）

```
gost -L=:8080 -F=quic://192.168.1.1:6121 -F=socks5+wss://192.168.1.2:1080 -F=http2://192.168.1.3:443 -F=a.b.c.d:NNNN
```

### 三、应用案例和最佳实践

**内网穿透**

利用 GOST 的隧道和内网穿透功能，可以将内网服务暴露到公网访问

```
gost -L=tcp://:2222/192.168.1.1:22 -F=forward+ssh://:2222
```

**负载均衡**

GOST 支持负载均衡功能，可以将请求分发到多个后端服务。

```
gost -L=http://:8080/192.168.1.1:80 -L=http://:8080/192.168.1.2:80
```

**动态配置**

GOST 支持通过 Web API 进行动态配置，方便实时调整服务参数。

```
gost -L=http://:8080 -api=:8081
```

