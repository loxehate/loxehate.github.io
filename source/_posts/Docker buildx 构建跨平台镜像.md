---
title: Docker buildx 构建跨平台镜像
tags: [Docker]
categories: [云原生]
date: 2025-06-13
---
### 一、 使用 buildx 构建跨平台镜像

```
官方文档：https://docs.docker.com/build/building/multi-platform
https://docs.docker.com/engine/reference/commandline/buildx/
```

```
构建跨平台镜像是 Docker 生态系统中的一个重要话题, 因为跨平台镜像可以在多种平台上运行, 极具灵活性。为了实现这个目标, Docker 社区提供了多种方式来构建跨平台镜像, 其中之一是使用 docker manifest, 我在《使用 docker manifest 构建跨平台镜像》一文中详细介绍了这种方法。然而, 目前最流行的方式是使用 Docker 的 buildx 工具, 这种方式不仅可以轻松构建跨平台镜像, 还可以自动化整个构建过程, 大大提高了效率。
```

#### 1.1 简介

```
buildx 是 Docker 官方提供的一个构建工具, 它可以帮助用户快速、高效地构建 Docker 镜像, 并支持多种平台的构建。使用 buildx, 用户可以在单个命令中构建多种架构的镜像, 例如 x86 和 ARM 架构, 而无需手动操作多个构建命令。此外, buildx 还支持 Dockerfile 的多阶段构建和缓存, 这可以大大提高镜像构建的效率和速度。
```

#### 1.2 安装

buildx 是一个管理 Docker 构建的 CLI 插件, 底层使用 BuildKit 扩展了 Docker 构建功能。

```
笔记: BuildKit 是 Docker 官方提供的一个高性能构建引擎, 可以用来替代 Docker 原有的构建引擎。相比于原有引擎, BuildKit 具有更快的构建速度、更高的并行性、更少的资源占用和更好的安全性。

要安装并使用 buildx, 需要 Docker Engine 版本号大于等于 19.03。
```

如果你使用的是 Docker Desktop, 则默认安装了 buildx。可以使用 docker buildx version 命令查看安装版本, 得到以下类似输出, 证明已经安装过了。

```
$ docker buildx version
github.com/docker/buildx v0.9.1 ed00243a0ce2a0aee75311b06e32d33b44729689
```

如果需要手动安装, 可以从 GitHub 发布页面下载对应平台的最新二进制文件, 重命名为 docker-buildx, 然后将其放到 Docker 插件目录下(Linux/Mac 系统为 $HOME/.docker/cli-plugins, Windows 系统为 %USERPROFILE%.docker\cli-plugins)。

Linux/Mac 系统还需要给插件增加可执行权限 chmod +x ~/.docker/cli-plugins/docker-buildx, 之后就可以使用 buildx 了。

#### 1.3 构建跨平台镜像

首先, 需要澄清的是, 本文中所提到的「跨平台镜像」这一说法并不十分准确。实际上, Docker 官方术语叫 Multi-platform images 即「多平台镜像」, 意思是支持多种不同 CPU 架构的镜像。之所以使用「跨平台镜像」这一术语, 是因为从使用者的角度来看, 在使用如 docker pull、docker run 等命令来拉取和启动容器时, 并不会感知到这个镜像是一个虚拟的 manifest list 镜像还是针对当前平台的镜像。

    manifest list 是通过指定多个镜像名称创建的镜像列表, 是一个虚拟镜像, 它包含了多个不同平台的镜像信息。可以像普通镜像一样使用 docker pull 和 docker run 等命令来操作它

#### 1.4 跨平台镜像构建策略

builder 支持三种不同策略构建跨平台镜像:

##### 1.4.1 在内核中使用 QEMU 仿真支持

如果你正在使用 Docker Desktop, 则已经支持了 QEMU, QEMU 是最简单的构建跨平台镜像策略。它不需要对原有的 Dockerfile 进行任何更改, BuildKit 会通过 binfmt_misc 这一 Linux 内核功能实现跨平台程序的执行。

工作原理:

```
QEMU 是一个处理器模拟器, 可以模拟不同的 CPU 架构, 我们可以把它理解为是另一种形式的虚拟机。在 buildx 中, QEMU 用于在构建过程中执行非本地架构的二进制文件。例如, 在 x86 主机上构建一个 ARM 镜像时, QEMU 可以模拟 ARM 环境并运行 ARM 二进制文件。

binfmt_misc 是 Linux 内核的一个模块, 它允许用户注册可执行文件格式和相应的解释器。当内核遇到未知格式的可执行文件时, 会使用 binfmt_misc 查找与该文件格式关联的解释器(在这种情况下是 QEMU)并运行文件。

QEMU 和 binfmt_misc 的结合使得通过 buildx 跨平台构建成为可能。这样我们就可以在一个架构的主机上构建针对其他架构的 Docker 镜像, 而无需拥有实际的目标硬件。
```

虽然 Docker Desktop 预配置了 binfmt_misc 对其他平台的支持, 但对于其他版本 Docker, 你可能需要使用 tonistiigi/binfmt 镜像启动一个特权容器来进行支持:

```
$ docker run --privileged --rm tonistiigi/binfmt --install all
```

##### 1.4.2 使用相同的构建器实例在多个本机节点上构建

```
此方法直接在对应平台的硬件上构建镜像, 所以需要准备各个平台的主机。因为此方法门槛比较高, 所以并不常使用
```

##### 1.4.3 使用 Dockerfile 中的多阶段构建, 交叉编译到不同的平台架构中

```
交叉编译的复杂度不在于 Docker, 而是取决于程序本身。比如 Go 程序就很容易实现交叉编译, 只需要在使用 go build 构建程序时指定 GOOS、GOARCH 两个环境变量即可实现
```

#### 1.5 创建 builder

要使用 buildx 构建跨平台镜像, 我们需要先创建一个 builder, 可以翻译为「构建器」。

使用 docker buildx ls 命令可以查看 builder 列表:

```
$ docker buildx ls
NAME/NODE       DRIVER/ENDPOINT STATUS  BUILDKIT PLATFORMS
default *       docker
  default       default         running 20.10.21 linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
desktop-linux   docker
  desktop-linux desktop-linux   running 20.10.21 linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
```

这两个是默认 builder, default * 中的 * 表示当前正在使用的 builder, 当我们运行 docker build 命令时就是在使用此 builder 构建镜像。

可以发现, 这两个默认的 builder 第二列 DRIVER/ENDPOINT 项的值都是 docker, 表示它们都使用 docker 驱动程序。

buildx 支持以下几种驱动程序:

| 驱动             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| docker           | 使用捆绑到 Docker 守护进程中的 BuildKit 库, 就是安装 Docker 后默认的 BuildKit。 |
| docker-container | 使用 Docker 新创建一个专用的 BuildKit 容器。                 |
| kubernetes       | 在 Kubernetes 集群中创建一个 BuildKit Pod。                  |
| remote           | 直接连接到手动管理的 BuildKit 守护进程。                     |

默认的 docker 驱动程序优先考虑简单性和易用性, 所以它对缓存和输出格式等高级功能的支持有限, 并且不可配置。其他驱动程序则提供了更大的灵活性, 并且更擅长处理高级场景。

因为使用 docker 驱动程序的默认 builder 不支持使用单条命令(默认 builder 的 --platform 参数只接受单个值)构建跨平台镜像, 所以我们需要使用 docker-container 驱动创建一个新的 builder。

命令语法如下:

```
$ docker buildx create --name=<builder-name> --driver=<driver> --driver-opt=<driver-options>
```

参数含义如下:

- –name: 构建器名称, 必填。
- –driver: 构建器驱动程序, 默认为 docker-container。
- –driver-opt: 驱动程序选项, 如选项 --driver-opt=image=moby/buildkit:v0.11.3 可以安装指定版本的 BuildKit, 默认值是 moby/buildkit。

我们可以使用如下命令创建一个新的 builder:

```
$ docker buildx create --name mybuilder
mybuilder
```

再次查看 builder 列表:

```
$ docker buildx ls
NAME/NODE       DRIVER/ENDPOINT             STATUS   BUILDKIT PLATFORMS
mybuilder *     docker-container
  mybuilder0    unix:///var/run/docker.sock inactive
default         docker
  default       default                     running  20.10.21 linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
desktop-linux   docker
  desktop-linux desktop-linux               running  20.10.21 linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
```

可以发现选中的构建器已经切换到了 mybuilder, 如果没有选中, 你需要手动使用 docker buildx use mybuilder 命令切换构建器。

#### 1.6 启动 builder

我们新创建的 mybuilder 当前状态为 inactive, 需要启动才能使用。

```
$ docker buildx inspect --bootstrap mybuilder
[+] Building 16.8s (1/1) FINISHED
 => [internal] booting buildkit                                                                                                                                  16.8s
 => => pulling image moby/buildkit:buildx-stable-1                                                                                                               16.1s
 => => creating container buildx_buildkit_mybuilder0                                                                                                              0.7s
Name:   mybuilder
Driver: docker-container

Nodes:
Name:      mybuilder0
Endpoint:  unix:///var/run/docker.sock
Status:    running
Buildkit:  v0.9.3
Platforms: linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/mips64le, linux/mips64, linux/arm/v7, linux/arm/v6
```

inspect 子命令用来检查构建器状态, 使用 --bootstrap 参数则可以启动 mybuilder 构建器。

再次查看 builder 列表, mybuilder 状态已经变成了 running

```
$ docker buildx ls
NAME/NODE       DRIVER/ENDPOINT             STATUS  BUILDKIT PLATFORMS
mybuilder *     docker-container
  mybuilder0    unix:///var/run/docker.sock running v0.9.3   linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/mips64le, linux/mips64, linux/arm/v7, linux/arm/v6
default         docker
  default       default                     running 20.10.21 linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
desktop-linux   docker
  desktop-linux desktop-linux               running 20.10.21 linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
```

其中 PLATFORMS 一列所展示的值 linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/mips64le, linux/mips64, linux/arm/v7, linux/arm/v6 就是当前构建器所支持的所有平台了。

现在使用 docker ps 命令可以看到 mybuilder 构建器所对应的 BuildKit 容器已经启动

    $ docker ps
    CONTAINER ID   IMAGE                           COMMAND                  CREATED         STATUS         PORTS                                NAMES
    b8887f253d41   moby/buildkit:buildx-stable-1   "buildkitd"              4 minutes ago   Up 4 minutes                                        buildx_buildkit_mybuilder0

这个容器就是辅助我们构建跨平台镜像用的, 不要手动删除它。

#### 1.7 使用 builder 构建跨平台镜像

现在一些准备工作已经就绪, 我们终于可以使用 builder 构建跨平台镜像了。

这里以一个 Go 程序为例, 来演示如何构建跨平台镜像。

hello.go 程序如下:

```
package main

import (
    "fmt"
    "runtime"
)

func main() {
    fmt.Printf("Hello, %s/%s!\n", runtime.GOOS, runtime.GOARCH)
}
```

这个程序非常简单, 执行后打印 Hello, 操作系统/CPU 架构。

Go 程序还需要一个 go.mod 文件:

```
module hello

go 1.20
```

编写 Dockerfile 内容如下:

```
FROM golang:1.20-alpine AS builder
WORKDIR /app
ADD . .
RUN go build -o hello .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/hello .
CMD ["./hello"]
```

这是一个普通的 Dockerfile 文件, 为了减小镜像大小, 使用了多阶段构建。它跟构建仅支持当前平台的镜像所使用的 Dockerfile 没什么两样。

```
$ ls
Dockerfile go.mod     hello.go
```

以上三个文件需要放在同一个目录下, 然后就可以在这个目录下使用 docker buildx 来构建跨平台镜像了。

```
$ docker buildx build --platform linux/arm64,linux/amd64 -t jianghushinian/hello-go .
```

docker buildx build 语法跟 docker build 一样, --platform 参数表示构建镜像的目标平台, -t 表示镜像的 Tag, . 表示上下文为当前目录。

唯一不同的是对 --platform 参数的支持, docker build 的 --platform 参数只支持传递一个平台信息, 如 --platform linux/arm64, 也就是一次只能构建单个平台的镜像。

而使用 docker buildx build 构建镜像则支持同时传递多个平台信息, 中间使用英文逗号分隔, 这样就实现了只用一条命令便可以构建跨平台镜像的功能。

执行以上命令后, 我们将会得到一条警告:

    WARNING: No output specified with docker-container driver. Build result will only remain in the build cache. To push result image into registry use --push or to load image into docker use --load

这条警告提示我们没有为 docker-container 驱动程序指定输出, 生成结果将只会保留在构建缓存中, 使用 --push 可以将镜像推送到 Docker Hub 远程仓库, 使用 --load 可以将镜像保存在本地。

这是因为我们新创建的 mybuilder 是启动了一个容器来运行 BuildKit, 它并不能直接将构建好的跨平台镜像输出到本机或推送到远程, 必须要用户来手动指定输出位置。

我们可以尝试指定 --load 将镜像保存的本地主机

    $ docker buildx build --platform linux/arm64,linux/amd64 -t jianghushinian/hello-go . --load
    [+] Building 0.0s (0/0)
    ERROR: docker exporter does not currently support exporting manifest lists

结果会得到一条错误日志。看来它并不支持直接将跨平台镜像输出到本机, 这其实是因为传递了多个 --platform 的关系, 如果 --platform 只传递了一个平台, 则可以使用 --load 将构建好的镜像输出到本机。

那么我们就只能通过 --push 参数将跨平台镜像推送到远程仓库了。不过在此之前需要确保使用 docker login 完成登录。

    $ docker buildx build --platform linux/arm64,linux/amd64 -t jianghushinian/hello-go . --push

现在登录 Docker Hub 就可以看见推送上来的跨平台镜像了。

我们也可以使用 imagetools 来检查跨平台镜像的 manifest 信息。

```
$ docker buildx imagetools inspect jianghushinian/hello-go
Name:      docker.io/jianghushinian/hello-go:latest
MediaType: application/vnd.docker.distribution.manifest.list.v2+json
Digest:    sha256:51199dadfc55b23d6ab5cfd2d67e38edd513a707273b1b8b554985ff562104db

Manifests:
  Name:      docker.io/jianghushinian/hello-go:latest@sha256:8032a6f23f3bd3050852e77b6e4a4d0a705dfd710fb63bc4c3dc9d5e01c8e9a6
  MediaType: application/vnd.docker.distribution.manifest.v2+json
  Platform:  linux/arm64

  Name:      docker.io/jianghushinian/hello-go:latest@sha256:fd46fd7e93c7deef5ad8496c2cf08c266bac42ac77f1e444e83d4f79d58441ba
  MediaType: application/vnd.docker.distribution.manifest.v2+json
  Platform:  linux/amd64
```

可以看到, 这个跨平台镜像包含了两个目标平台的镜像, 分别是 linux/arm64 和 linux/amd64。

我们分别在 Apple M2 芯片平台和 Linux x86 平台来启动这个 Docker 镜像看下输出结果。

```
$ docker run --rm jianghushinian/hello-go
Hello, linux/arm64!
$ docker run --rm jianghushinian/hello-go
Hello, linux/amd64!
```

 我们使用 builder 完成了跨平台镜像的构建

#### 1.8 使用交叉编译

以上演示的构建跨平台镜像过程就是利用 QEMU 的能力, 因为 Go 语言的交叉编译非常简单, 所以我们再来演示一下如何使用交叉编译来构建跨平台镜像。

我们只需要对 Dockerfile 文件进行修改

```
FROM --platform=$BUILDPLATFORM golang:1.20-alpine AS builder
ARG TARGETOS
ARG TARGETARCH
WORKDIR /app
ADD . .
RUN GOOS=$TARGETOS GOARCH=$TARGETARCH go build -o hello .

FROM --platform=$TARGETPLATFORM alpine:latest
WORKDIR /app
COPY --from=builder /app/hello .
CMD ["./hello"]
```

其中 BUILDPLATFORM、TARGETOS、TARGETARCH、TARGETPLATFORM 四个变量是 BuildKit 提供的全局变量, 分别表示构建镜像所在平台、操作系统、架构、构建镜像的目标平台。

在构建镜像时, BuildKit 会将当前所在平台信息传递给 Dockerfile 中的 BUILDPLATFORM 参数(如 linux/arm64)。

通过 --platform 参数传递的 linux/arm64,linux/amd64 镜像目标平台列表会依次传递给 TARGETPLATFORM 变量。

而 TARGETOS、TARGETARCH 两个变量在使用时则需要先通过 ARG 进行声明, BuildKit 会自动为其赋值。

在 Go 程序进行编译时, 可以通过 GOOS 环境变量指定目标操作系统, 通过 GOARCH 环境变量指定目标架构。

所以这个 Dockerfile 所表示的含义是: 首先拉取当前构建镜像所在平台的 golang 镜像, 然后使用交叉编译构建目标平台的 Go 程序, 最后将构建好的 Go 程序复制到目标平台的 alpine 镜像。

最终我们会通过交叉编译得到一个跨平台镜像。

```
通过 FROM --platform=$BUILDPLATFORM image 可以拉取指定平台的镜像, 由此我们可以知道, 其实 golang 和 alpine 镜像都是支持跨平台的
```

构建镜像命令不变:

```
$ docker buildx build --platform linux/arm64,linux/amd64 -t jianghushinian/hello-cross-go . --push
```

启动镜像后输出结果不变:

```
$ docker run --rm jianghushinian/hello-cross-go
Hello, linux/arm64!
$ docker run --rm jianghushinian/hello-cross-go
Hello, linux/amd64!
```

我们利用 Go 语言的交叉编译完成了跨平台镜像的构建。

#### 1.9 平台相关的全局变量

关于上面提到的几个全局变量, BuildKit 后端预定义了一组 ARG 全局变量(共 8 个)可供使用, 其定义和说明如下:

|      变量      |                             说明                             |
| :------------: | :----------------------------------------------------------: |
| TARGETPLATFORM | 构建镜像的目标平台, 如: linux/amd64, linux/arm/v7, windows/amd64。 |
|    TARGETOS    |       TARGETPLATFORM 的操作系统, 如: linux、windows。        |
|   TARGETARCH   |         TARGETPLATFORM 的架构类型, 如: amd64、arm。          |
| TARGETVARIANT  |               TARGETPLATFORM 的变体, 如: v7。                |
| BUILDPLATFORM  |                   执行构建所在的节点平台。                   |
|    BUILDOS     |                  BUILDPLATFORM 的操作系统。                  |
|   BUILDARCH    |                  BUILDPLATFORM 的架构类型。                  |
|  BUILDVARIANT  |                    BUILDPLATFORM 的变体。                    |

使用示例如下：

```
# 这里可以直接使用 TARGETPLATFORM 变量
FROM --platform=$TARGETPLATFORM alpine

# 稍后的 RUN 命令想要使用变量必须提前用 ARG 进行声明
ARG TARGETPLATFORM

RUN echo "I'm building for $TARGETPLATFORM"
```

#### 1.10 删除 builder

我们已经实现了使用 builder 构建跨平台镜像。如果现在你想要恢复环境, 删除新建的 builder。则可以使用 docker buildx rm mybuilder 命令来完成。

```
$ docker buildx rm mybuilder
mybuilder removed
```

跟随 mybuilder 启动的 buildx_buildkit_mybuilder0 容器也会随之被删除。

现在再使用 docker buildx ls 命令查看构建器列表, 已经恢复成原来的样子了

```
$ docker buildx ls
NAME/NODE       DRIVER/ENDPOINT STATUS  BUILDKIT PLATFORMS
default *       docker
  default       default         running 20.10.21 linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
desktop-linux   docker
  desktop-linux desktop-linux   running 20.10.21 linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
```

#### 1.11 功能清单

除了前文介绍的几个 buildx 常用命令, 更多功能可以通过 --help 参数进行查看。

```
$ docker buildx --help

Usage:  docker buildx [OPTIONS] COMMAND

Extended build capabilities with BuildKit

Options:
      --builder string   Override the configured builder instance

Management Commands:
  imagetools  Commands to work on images in registry

Commands:
  bake        Build from a file
  build       Start a build
  create      Create a new builder instance
  du          Disk usage
  inspect     Inspect current builder instance
  ls          List builder instances
  prune       Remove build cache
  rm          Remove a builder instance
  stop        Stop builder instance
  use         Set the current builder instance
  version     Show buildx version information

Run 'docker buildx COMMAND --help' for more information on a command.
```

### 二、 使用 docker manifest 构建跨平台镜像

#### 2.1 简介

docker manifest 是 Docker 的一个命令, 它提供了一种方便的方式来管理不同操作系统和硬件架构的 Docker 镜像。通过 docker manifest, 用户可以创建一个虚拟的 Docker 镜像, 其中包含了多个实际的 Docker 镜像, 每个实际的 Docker 镜像对应一个不同的操作系统和硬件架构。

```
docker manifest 命令本身并不执行任何操作。为了操作一个 manifest 或 manifest list, 必须使用其中一个子命令。

manifest 可以理解为是一个 JSON 文件, 单个 manifest 包含有关镜像的信息, 例如层 (layers)、大小 (size) 和摘要 (digest) 等。

manifest list 是通过指定一个或多个(理想情况下是多个)镜像名称创建的镜像列表(即上面所说的虚拟 Docker 镜像)。可以像普通镜像一样使用 docker pull 和 docker run 等命令来操作它。manifest list 通常被称为「多架构镜像」。
```

#### 2.2 准备工作

工欲善其事, 必先利其器, 如果想使用 docker manifest 构建多架构镜像, 需要具备以下条件

```
机器上安装了 Docker。
需要注册一个 Docker Hub 账号。
最少有两个不同平台的主机, 用来验证 docker manifest 锁构建出来的多架构镜像正确性(可选)。
联网, docker manifest 命令是需要联网使用的。
```

#### 2.3 为不同平台构建镜像

本文中演示程序所使用的环境是 Apple M2 芯片平台。本地的 Docker 版本如下:

```
$ docker version
Client:
 Cloud integration: v1.0.29
 Version:           20.10.21
 API version:       1.41
 Go version:        go1.18.7
 Git commit:        baeda1f
 Built:             Tue Oct 25 18:01:18 2022
 OS/Arch:           darwin/arm64
 Context:           default
 Experimental:      true

Server: Docker Desktop 4.15.0 (93002)
 Engine:
  Version:          20.10.21
  API version:      1.41 (minimum version 1.12)
  Go version:       go1.18.7
  Git commit:       3056208
  Built:            Tue Oct 25 17:59:41 2022
  OS/Arch:          linux/arm64
  Experimental:     false
 containerd:
  Version:          1.6.10
  GitCommit:        770bd0108c32f3fb5c73ae1264f7e503fe7b2661
 runc:
  Version:          1.1.4
  GitCommit:        v1.1.4-0-g5fd4c4d
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
```

#### 2.4 准备 Dockerfile

首先准备如下 Dockerfile 文件, 用来构建镜像。

```
FROM alpine

RUN uname -a > /os.txt

CMD cat /os.txt
```

这个镜像非常简单, 构建时将 uname -a 命令输出信息(即当前操作系统的相关信息)写入 `/os.txt`, 运行时将 `/os.txt` 内容输出

#### 2.5 构建 arm64 平台镜像

因为本机为 Apple M2 芯片, 所以使用 docker build 命令构建镜像默认为 arm64 平台镜像。构建命令如下:

```
$ docker build -t jianghushinian/echo-platform-arm64 .
[+] Building 15.6s (6/6) FINISHED
 => [internal] load build definition from Dockerfile                                             0.0s
 => => transferring dockerfile: 94B                                                              0.0s
 => [internal] load .dockerignore                                                                0.0s
 => => transferring context: 2B                                                                  0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                15.5s
 => [1/2] FROM docker.io/library/alpine@sha256:21a3deaa0d32a8057914f36584b5288d2e5ecc984380bc01  0.0s
 => CACHED [2/2] RUN uname -a > /os.txt                                                          0.0s
 => exporting to image                                                                           0.0s
 => => exporting layers                                                                          0.0s
 => => writing image sha256:f017783a39920aa4646f87d7e5a2d67ab51aab479147d60e5372f8749c3742bb     0.0s
 => => naming to docker.io/jianghushinian/echo-platform-arm64                                    0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
```

```
注意: jianghushinian 是我的 Docker Hub 用户名, 你在构建镜像时应该使用自己的 Docker Hub 用户名。
```

使用 docker run 运行容器进行测试:

```
$ docker run --rm jianghushinian/echo-platform-arm64
Linux buildkitsandbox 5.15.49-linuxkit #1 SMP PREEMPT Tue Sep 13 07:51:32 UTC 2022 aarch64 Linux
```

输出内容中的 aarch64 就表示 ARMv8 架构。

现在我们需要将镜像推送到 Docker Hub, 确保在命令行中已经使用 docker login 登录过 Docker Hub 的情况下, 使用 docker push 命令推送镜像:

```
$ docker push jianghushinian/echo-platform-arm64
Using default tag: latest
The push refers to repository [docker.io/jianghushinian/echo-platform-arm64]
dd0468cb6cb1: Pushed
07d3c46c9599: Mounted from jianghushinian/demo-arm64
latest: digest: sha256:8eb172234961bf54a01e83d510697f09646c43c297a24f839be846414dfaf583 size: 735
```

#### 2.6 构建 amd64 平台镜像

无需切换设备, 在 Apple M2 芯片的机器上我们可以直接构建 amd64 也就是 Linux 平台镜像, docker build 命令提供了 --platform 参数可以构建跨平台镜像。

```
$ docker build --platform=linux/amd64 -t jianghushinian/echo-platform-amd64 .
[+] Building 15.7s (6/6) FINISHED
 => [internal] load build definition from Dockerfile                                                                                                                      0.0s
 => => transferring dockerfile: 36B                                                                                                                                       0.0s
 => [internal] load .dockerignore                                                                                                                                         0.0s
 => => transferring context: 2B                                                                                                                                           0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                                                                                         15.3s
 => CACHED [1/2] FROM docker.io/library/alpine@sha256:21a3deaa0d32a8057914f36584b5288d2e5ecc984380bc0118285c70fa8c9300                                                    0.0s
 => [2/2] RUN uname -a > /os.txt                                                                                                                                          0.2s
 => exporting to image                                                                                                                                                    0.0s
 => => exporting layers                                                                                                                                                   0.0s
 => => writing image sha256:5c48af5176402727627cc18136d78f87f0793ccf61e3e3fb4df98391a69e9f70                                                                              0.0s
 => => naming to docker.io/jianghushinian/echo-platform-amd64                                                                                                             0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
```

镜像构建成功后, 同样使用 docker push 命令推送镜像到 Docker Hub:

```
$ docker push jianghushinian/echo-platform-amd64
Using default tag: latest
The push refers to repository [docker.io/jianghushinian/echo-platform-amd64]
9499dee27c9f: Pushed
8d3ac3489996: Mounted from jianghushinian/demo-amd64
latest: digest: sha256:13cbf21fc8078fb54444992faae9aafca0706a842dfb0ab4f3447a6f14fb1359 size: 735
```

浏览器中登录 Docker Hub 查看推送成功的镜像:

你也许会好奇, 在 Apple M2 芯片的主机设备上运行 amd64 平台镜像会怎样。目前咱们构建的这个简单镜像其实是能够运行的, 只不过会得到一条警告信息:

```
$ docker run --rm jianghushinian/echo-platform-amd64
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
Linux buildkitsandbox 5.15.49-linuxkit #1 SMP PREEMPT Tue Sep 13 07:51:32 UTC 2022 x86_64 Linux
```

输出内容中的 x86_64 就表示 AMD64 架构。

注意: 虽然这个简单的镜像能够运行成功, 但如果容器内部程序不支持跨平台, amd64 平台镜像无法在 arm64 平台运行成功。

同样的, 如果我们登录到一台 amd64 架构的设备上运行 arm64 平台镜像, 也会得到一条警告信息:

```
# docker run --rm jianghushinian/echo-platform-arm64
WARNING: The requested image's platform (linux/arm64/v8) does not match the detected host platform (linux/amd64) and no specific platform was requested
Linux buildkitsandbox 5.15.49-linuxkit #1 SMP PREEMPT Tue Sep 13 07:51:32 UTC 2022 aarch64 Linux
```

在 amd64 架构的设备上运行 amd64 平台镜像则不会遇到警告问题:

```
# docker run --rm jianghushinian/echo-platform-amd64
Linux buildkitsandbox 5.15.49-linuxkit #1 SMP PREEMPT Tue Sep 13 07:51:32 UTC 2022 x86_64 Linux
```

#### 2.7 使用 manifest 合并多平台镜像

我们可以使用 docker manifest 的子命令 create 创建一个 manifest list, 即将多个平台的镜像合并为一个镜像。

create 命令用法很简单, 后面跟的第一个参数 jianghushinian/echo-platform 即为合并后的镜像, 从第二个参数开始可以指定一个或多个不同平台的镜像。

    $ docker manifest create jianghushinian/echo-platform jianghushinian/echo-platform-arm64 jianghushinian/echo-platform-amd64
    Created manifest list docker.io/jianghushinian/echo-platform:latest

如上输出, 表明多架构镜像构建成功。

```
注意: 在使用 docker manifest create 命令时, 确保待合并镜像都已经被推送到 Docker Hub 镜像仓库, 不然报错 no such manifest。这也是为什么前文在构建镜像时, 都会将镜像推送到 Docker Hub。
```

此时在 Apple M2 芯片设备上使用 docker run 启动构建好的跨平台镜像 jianghushinian/echo-platform:

```
$ docker run --rm jianghushinian/echo-platform
Linux buildkitsandbox 5.4.0-80-generic #90-Ubuntu SMP Fri Jul 9 22:49:44 UTC 2021 aarch64 Linux
```

没有任何问题, 就像在启动 jianghushinian/echo-platform-arm64 镜像一样。

现在我们可以将这个跨平台镜像推送到 Docker Hub, 不过, 这回我们需要使用的命令不再是 docker push 而是 manifest 的子命令 docker manifest push:

    $ docker manifest push jianghushinian/echo-platform
    Pushed ref docker.io/jianghushinian/echo-platform@sha256:13cbf21fc8078fb54444992faae9aafca0706a842dfb0ab4f3447a6f14fb1359 with digest: sha256:13cbf21fc8078fb54444992faae9aafca0706a842dfb0ab4f3447a6f14fb1359
    Pushed ref docker.io/jianghushinian/echo-platform@sha256:8eb172234961bf54a01e83d510697f09646c43c297a24f839be846414dfaf583 with digest: sha256:8eb172234961bf54a01e83d510697f09646c43c297a24f839be846414dfaf583
    sha256:87b51c1835f13bb722bbb4279fcf50a6da0ecb852433a8f1c04e2f5fe93ac055

浏览器中登录 Docker Hub 查看推送成功的镜像:

进入镜像信息详情页面的 Tags 标签, 能够看到镜像支持 amd64、arm64/v8 这两个平台。

现在, 我们可以在 amd64 架构的设备上同样使用 docker run 命令启动构建好的跨平台镜像 jianghushinian/echo-platform:

    # docker run --rm jianghushinian/echo-platform
    Linux buildkitsandbox 5.4.0-80-generic #90-Ubuntu SMP Fri Jul 9 22:49:44 UTC 2021 x86_64 Linuxxxxxxxxxxx # docker run --rm jianghushinian/echo-platformLinux buildkitsandbox 5.4.0-80-generic #90-Ubuntu SMP Fri Jul 9 22:49:44 UTC 2021 x86_64 Linux       

输出结果没有任何问题。可以发现, 无论是 arm64 设备还是 amd64 设备, 虽然同样使用 docker run --rm jianghushinian/echo-platform 命令启动镜像, 但它们的输出结果都表明启动的是当前平台的镜像, 没有再次出现警告。

#### 2.8 manifest 功能清单

docker manifest 不止有 create 一个子命令, 可以通过 --help/-h 参数查看使用帮助:

```
$ docker manifest --help

Usage:  docker manifest COMMAND

The **docker manifest** command has subcommands for managing image manifests and
manifest lists. A manifest list allows you to use one name to refer to the same image
built for multiple architectures.

To see help for a subcommand, use:

    docker manifest CMD --help

For full details on using docker manifest lists, see the registry v2 specification.

EXPERIMENTAL:
  docker manifest is an experimental feature.
  Experimental features provide early access to product functionality. These
  features may change between releases without warning, or can be removed from a
  future release. Learn more about experimental features in our documentation:
  https://docs.docker.com/go/experimental/

Commands:
  annotate    Add additional information to a local image manifest
  create      Create a local manifest list for annotating and pushing to a registry
  inspect     Display an image manifest, or manifest list
  push        Push a manifest list to a repository
  rm          Delete one or more manifest lists from local storage

Run 'docker manifest COMMAND --help' for more information on a command.
```

#### 2.9 create

先从最熟悉的 create 子命令看起, 来看下它都支持哪些功能

```
$ docker manifest create -h
Flag shorthand -h has been deprecated, please use --help

Usage:  docker manifest create MANIFEST_LIST MANIFEST [MANIFEST...]

Create a local manifest list for annotating and pushing to a registry

EXPERIMENTAL:
  docker manifest create is an experimental feature.
  Experimental features provide early access to product functionality. These
  features may change between releases without warning, or can be removed from a
  future release. Learn more about experimental features in our documentation:
  https://docs.docker.com/go/experimental/

Options:
  -a, --amend      Amend an existing manifest list
      --insecure   Allow communication with an insecure registry
```

```
笔记: 可以看到输出结果第一行的提示, 短标志 -h 已经被弃用, 推荐使用 --help 查看子命令帮助信息。
可以发现, create 子命令支持两个可选参数 -a/–amend 用来修订已存在的多架构镜像。

指定 --insecure 参数则允许使用不安全的(非 https) 镜像仓库。
```

#### 2.10 push

push 子命令我们也见过了, 使用 push 可以将多架构镜像推送到镜像仓库。

来看下 push 还支持设置哪些可选参数。

```
$ docker manifest push -h
Flag shorthand -h has been deprecated, please use --help

Usage:  docker manifest push [OPTIONS] MANIFEST_LIST

Push a manifest list to a repository

EXPERIMENTAL:
  docker manifest push is an experimental feature.
  Experimental features provide early access to product functionality. These
  features may change between releases without warning, or can be removed from a
  future release. Learn more about experimental features in our documentation:
  https://docs.docker.com/go/experimental/

Options:
      --insecure   Allow push to an insecure registry
  -p, --purge      Remove the local manifest list after push
```

同样的, push 也有一个 --insecure 参数允许使用不安全的(非 https) 镜像仓库。

`-p/--purge` 选项的作用是推送本地镜像到远程仓库后, 删除本地 manifest list。

#### 2.11 inspect

inspect 用来查看 manifest/manifest list 所包含的镜像信息。

其使用帮助如下:

```
$ docker manifest inspect -h
Flag shorthand -h has been deprecated, please use --help

Usage:  docker manifest inspect [OPTIONS] [MANIFEST_LIST] MANIFEST

Display an image manifest, or manifest list

EXPERIMENTAL:
  docker manifest inspect is an experimental feature.
  Experimental features provide early access to product functionality. These
  features may change between releases without warning, or can be removed from a
  future release. Learn more about experimental features in our documentation:
  https://docs.docker.com/go/experimental/

Options:
      --insecure   Allow communication with an insecure registry
  -v, --verbose    Output additional info including layers and platform
```

--insecure 参数允许使用不安全的(非 https) 镜像仓库。这已经是我们第三次看见这个参数了, 这也验证了 docker manifest 命令需要联网才能使用的说法, 因为这些子命令基本都涉及到和远程镜像仓库的交互。

指定 -v/--verbose 参数可以输出更多信息, 包括镜像的 layers 和 platform 信息。

使用示例如下:

    $ docker manifest inspect jianghushinian/echo-platform
    {
       "schemaVersion": 2,
       "mediaType": "application/vnd.docker.distribution.manifest.list.v2+json",
       "manifests": [
          {
             "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
             "size": 735,
             "digest": "sha256:13cbf21fc8078fb54444992faae9aafca0706a842dfb0ab4f3447a6f14fb1359",
             "platform": {
                "architecture": "amd64",
                "os": "linux"
             }
          },
          {
             "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
             "size": 735,
             "digest": "sha256:8eb172234961bf54a01e83d510697f09646c43c297a24f839be846414dfaf583",
             "platform": {
                "architecture": "arm64",
                "os": "linux",
                "variant": "v8"
             }
          }
       ]
    }

从输出信息中可以发现, 我们构建的多架构镜像 jianghushinian/echo-platform 包含两个 manifest, 可以支持 amd64/arm64 架构, 并且都为 linux 系统下的镜像。

指定 -v 参数输出更详细信息:

```
$ docker manifest inspect -v jianghushinian/echo-platform
[
	{
		"Ref": "docker.io/jianghushinian/echo-platform:latest@sha256:13cbf21fc8078fb54444992faae9aafca0706a842dfb0ab4f3447a6f14fb1359",
		"Descriptor": {
			"mediaType": "application/vnd.docker.distribution.manifest.v2+json",
			"digest": "sha256:13cbf21fc8078fb54444992faae9aafca0706a842dfb0ab4f3447a6f14fb1359",
			"size": 735,
			"platform": {
				"architecture": "amd64",
				"os": "linux"
			}
		},
		"SchemaV2Manifest": {
			"schemaVersion": 2,
			"mediaType": "application/vnd.docker.distribution.manifest.v2+json",
			"config": {
				"mediaType": "application/vnd.docker.container.image.v1+json",
				"size": 1012,
				"digest": "sha256:5c48af5176402727627cc18136d78f87f0793ccf61e3e3fb4df98391a69e9f70"
			},
			"layers": [
				{
					"mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
					"size": 2818413,
					"digest": "sha256:59bf1c3509f33515622619af21ed55bbe26d24913cedbca106468a5fb37a50c3"
				},
				{
					"mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
					"size": 211,
					"digest": "sha256:1e5897976ad1d3969268a18f4f0356a05875baf0225e39768a9066f43e950ebd"
				}
			]
		}
	},
	{
		"Ref": "docker.io/jianghushinian/echo-platform:latest@sha256:8eb172234961bf54a01e83d510697f09646c43c297a24f839be846414dfaf583",
		"Descriptor": {
			"mediaType": "application/vnd.docker.distribution.manifest.v2+json",
			"digest": "sha256:8eb172234961bf54a01e83d510697f09646c43c297a24f839be846414dfaf583",
			"size": 735,
			"platform": {
				"architecture": "arm64",
				"os": "linux",
				"variant": "v8"
			}
		},
		"SchemaV2Manifest": {
			"schemaVersion": 2,
			"mediaType": "application/vnd.docker.distribution.manifest.v2+json",
			"config": {
				"mediaType": "application/vnd.docker.container.image.v1+json",
				"size": 1027,
				"digest": "sha256:f017783a39920aa4646f87d7e5a2d67ab51aab479147d60e5372f8749c3742bb"
			},
			"layers": [
				{
					"mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
					"size": 2715434,
					"digest": "sha256:9b3977197b4f2147bdd31e1271f811319dcd5c2fc595f14e81f5351ab6275b99"
				},
				{
					"mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
					"size": 212,
					"digest": "sha256:edf2b8e1db64e4f46a2190a3dfcb74ae131ae13ad43fcfedde4c3f304c451f7d"
				}
			]
		}
	}
]
```

#### 2.12 annotate

annotate 子命令可以给一个本地镜像 manifest 添加附加的信息。这有点像 K8s Annotations 的意思。

其使用帮助如下:

```
$ docker manifest annotate -h
Flag shorthand -h has been deprecated, please use --help

Usage:  docker manifest annotate [OPTIONS] MANIFEST_LIST MANIFEST

Add additional information to a local image manifest

EXPERIMENTAL:
  docker manifest annotate is an experimental feature.
  Experimental features provide early access to product functionality. These
  features may change between releases without warning, or can be removed from a
  future release. Learn more about experimental features in our documentation:
  https://docs.docker.com/go/experimental/

Options:
      --arch string           Set architecture
      --os string             Set operating system
      --os-features strings   Set operating system feature
      --os-version string     Set operating system version
      --variant string        Set architecture variant
```

可选参数列表如下:

| 选项         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| –arch        | 设置 CPU 架构信息。                                          |
| –os          | 设置操作系统信息。                                           |
| –os-features | 设置操作系统功能信息。                                       |
| –os-version  | 设置操作系统版本信息。                                       |
| –variant     | 设置 CPU 架构的 variant 信息(翻译过来是"变种"的意思), 如 ARM 架构的 v7、v8 等。 |

例如设置操作系统版本信息, 可以使用如下命令:

```
$ docker manifest annotate --os-version macOS jianghushinian/echo-platform jianghushinian/echo-platform-arm64
```

现在使用 `inspect` 查看镜像信息已经发生变化:

```
{
   "schemaVersion": 2,
   "mediaType": "application/vnd.docker.distribution.manifest.list.v2+json",
   "manifests": [
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 735,
         "digest": "sha256:13cbf21fc8078fb54444992faae9aafca0706a842dfb0ab4f3447a6f14fb1359",
         "platform": {
            "architecture": "amd64",
            "os": "linux"
         }
      },
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 735,
         "digest": "sha256:8eb172234961bf54a01e83d510697f09646c43c297a24f839be846414dfaf583",
         "platform": {
            "architecture": "arm64",
            "os": "linux",
            "os.version": "macOS",
            "variant": "v8"
         }
      }
   ]
}
```

#### 2.13 rm

最后要介绍的子命令是 rm, 使用 rm 可以删除本地一个或多个多架构镜像 (manifest lists)。

```
$ docker manifest rm -h
Flag shorthand -h has been deprecated, please use --help

Usage:  docker manifest rm MANIFEST_LIST [MANIFEST_LIST...]

Delete one or more manifest lists from local storage

EXPERIMENTAL:
  docker manifest rm is an experimental feature.
  Experimental features provide early access to product functionality. These
  features may change between releases without warning, or can be removed from a
  future release. Learn more about experimental features in our documentation:
  https://docs.docker.com/go/experimental/
```

使用示例如下:

```
$ docker manifest rm jianghushinian/echo-platform
```

现在使用 inspect 查看镜像信息已经不在有 os.version 信息了, 因为本地镜像 manifest lists 信息已经被删除, 重新从远程镜像仓库拉下来的多架构镜像信息并不包含 os.version。

```
$ docker manifest inspect jianghushinian/echo-platform
{
   "schemaVersion": 2,
   "mediaType": "application/vnd.docker.distribution.manifest.list.v2+json",
   "manifests": [
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 735,
         "digest": "sha256:13cbf21fc8078fb54444992faae9aafca0706a842dfb0ab4f3447a6f14fb1359",
         "platform": {
            "architecture": "amd64",
            "os": "linux"
         }
      },
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 735,
         "digest": "sha256:8eb172234961bf54a01e83d510697f09646c43c297a24f839be846414dfaf583",
         "platform": {
            "architecture": "arm64",
            "os": "linux",
            "variant": "v8"
         }
      }
   ]
}
```

