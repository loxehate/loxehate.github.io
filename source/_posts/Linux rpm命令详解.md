---
title: Linux rpm命令详解
tags: [rpm]
categories: [Linux]
date: 2025-05-09
---
### 一、rpm简介

```
rpm命令是RPM软件包的管理工具。rpm原本是Red Hat Linux发行版专门用来管理Linux各项套件的程序，由于它遵循GPL规则且功能强大方便，因而广受欢迎。逐渐受到其他发行版的采用。RPM套件管理方式的出现，让Linux易于安装，升级，间接提升了Linux的适用度。
```

### 二、rpm安装命令

rpm (选项)(参数) 包名

```
[root@localhost ~]# rpm -ivh 包全名
#注意一定是包全名。如果是跟包全名的命令，则要注意路径，因为软件包在光盘当中
选项：

-i：安装（install）;

-v：显示更详细的信息（verbose）;

-h：打印 #，显示安装进度（hash）;
```

#### 2.1、参数

|                   **命令**                    |                           **作用**                           |
| :-------------------------------------------: | :----------------------------------------------------------: |
|                      -a                       |                        查询所有套件；                        |
| -b<完成阶段><套件档>+或-t <完成阶段><套件档>+ |       设置包装套件的完成阶段，并指定套件档的文件名称；       |
|                      -c                       |        只列出组态配置文件，本参数需配合"-l"参数使用；        |
|                      -d                       |          只列出文本文件，本参数需配合"-l"参数使用；          |
|          -e<套件档>或–erase<套件档>           |                       删除指定的套件；                       |
|                   -f<文件>+                   |                   查询拥有指定文件的套件；                   |
|                   -h或–hash                   |                     套件安装时列出标记；                     |
|                      -i                       |                     显示套件的相关信息；                     |
|         -i<套件档>或–install<套件档>          |                      安装指定的套件档；                      |
|                      -l                       |                     显示套件的文件列表；                     |
|                  -p<套件档>+                  |                    查询指定的RPM套件档；                     |
|                      -q                       |    使用询问模式，当遇到任何问题时，rpm指令会先询问用户；     |
|                      -R                       |                    显示套件的关联性信息；                    |
|                      -s                       |           显示文件状态，本参数需配合"-l"参数使用；           |
|         -U<套件档>或–upgrade<套件档>          |                      升级指定的套件档；                      |
|                      -v                       |                      显示指令执行过程；                      |
|                      -vv                      |               详细显示指令执行过程，便于排错。               |
|                    –force                     |                           强制安装                           |
|                    –nodeps                    | 忽略依赖；安装此包需要依赖，如果你不需要这些依赖可以忽略依赖，强制安装 |

#### 2.2、RPM包的升级

```
[root@localhost ~]# rpm -Uvh 包全名

选项：

-U（大写）：升级安装。如果没有安装过，则系统直接安装。如果安装过的版本较低，则升级到新版本（upgrade）;

[root@localhost ~]# rpm -Fvh 包全名

选项：

-F（大写）：升级安装。如果没有安装过，则不会安装。必须安装有较低版本才能升级（freshen）;
```

#### 2.3、RPM包卸载

```
卸载是有依赖性的。比如，在安装的时候，要先安装 httpd 软件包，再安装 httpd 的功能模块 mod_ssl 包。那么，在卸载的时候，一定要先卸载 mod_ssl 软件包，再卸载 httpd 软件包，否则就会报错。软件包卸载和拆除大楼是一样的，你要拆除 2 楼和 3 楼，一定要先拆除 3 楼。
```

删除格式非常简单，如下：

```
[root@localhost ~]# rpm -e 包名
可以使用下列格式：

rpm -e proftpd-1.2.8-1
rpm -e proftpd-1.2.8
rpm -e proftpd-
rpm -e proftpd
不可以是下列格式：

rpm -e proftpd-1.2.8-1.i386.rpm
rpm -e proftpd-1.2.8-1.i386
rpm -e proftpd-1.2
rpm -e proftpd-1
有时会出现一些错误或者警告：
注意： 包名可以包含版本号等信息，但是不可以有后缀.rpm
选项：

-e 卸载(erase);

如果不按依赖性卸载，就会报依赖性错误。例如：

[root@localhost ~]# rpm -e httpd
error: Failed dependencies:
httpd-mmn = 20051115 is needed by (installed) mod_wsgi-3.2-1.el6.i686
httpd-mmn = 20051115 is needed by (installed) php-5.3.3-3.el6_2.8.i686
httpd-mmn = 20051115 is needed by (installed) mod_ssl-1:2.2.15-15.el6.
centos.1.i686
httpd-mmn = 20051115 is needed by (installed) mod_perl-2.0.4-10.el6.i686
httpd = 2.2.15-15.el6.centos.1 is needed by (installed) httpd-manual-2.2.
15-15.el6.centos.1 .noarch
httpd is needed by (installed) webalizer-2.21_02-3.3.el6.i686
httpd is needed by (installed) mod_ssl-1:2.2.15-15.el6.centos.1.i686
httpd=0:2.2.15-15.el6.centos.1 is needed by(installed)mod_ssl-1:2.2.15-15.el6.centos.1.i686
当然，卸载命令是支持"–nodeps"选项的，可以不检测依赖性直接卸载。但是，如果这样做，则很可能导致其他软件包无法正常使用，所以并不推荐这样卸载。
```

#### 2.4、默认安装路径

RPM 包默认安装路径是可以通过命令査询的，一般安装在如表

|  **安装路径**   |         **含 义**          |
| :-------------: | :------------------------: |
|      /etc/      |      配置文件安装目录      |
|    /usr/bin/    |    可执行的命令安装目录    |
|    /usr/lib/    | 程序所使用的函数库保存位置 |
| /usr/share/doc/ | 基本的软件使用手册保存位置 |
| /usr/share/man/ |      帮助文件保存位置      |

```
RPM 包难道就不能手工指定安装路径吗？当然是可以的，但是一旦手工指定安装路径，所有的安装文件就会安装到手工指定位置，而不会安装到系统默认位置。而系统的默认搜索位置并不会改变，依然会去默认位置之下搜索，当然系统就不能直接找到所需的文件，也就失去了作为系统默认安装路径的一些好处。所以我们一般不会指定 RPM 包的安装路径，而使用默认安装路径。
```

### 三、RPMBUILD使用

#### 3.1、rpmbuild命令介绍

```
官方文档：https://rpm.org/documentation.html	
	rpmbuild（RPM Package Manager Build）是一个用来构建RPM软件包的命令，它可以从源代码或二进制文件生成RPM文件，也可以从已有的RPM文件生成新的RPM文件 。rpmbuild命令可以让你自定义软件包的名称、版本、描述、依赖关系、安装脚本等信息，以适应不同的Linux发行版和用户需求 。
```

#### 3.2、rpmbuild相关操作

##### 3.2.1、安装rpmbuild命令

```
制作rpm包主要用到rpmbuild工具，rpmdevtools套件包含了rpmbuild等软件，同时又提供了很多有用的脚本
# rpm 包构建工具
yum install -y rpm-build rpmrebuild
yum install rpmdevtools
```

##### 3.2.2、spec文件检查工具

```
yum install rpmlint -y

如果返回错误/警告，使用 “-i” 选项查看更详细的信
rpmlint -i program.spec

也可以使用 rpmlint 测试已构建的 RPM 包，检查 SPEC/RPM/SRPM 是否存在错误。你需要在发布软件包之前，解决这些警告。此页面 提供一些常见问题的解释。如果你位于 SPEC 目录中，请执行：

$ rpmlint NAME.spec ../RPMS/*/NAME*.rpm ../SRPMS/NAME*.rpm

获取rpm包中的.spec文件：
rpmrebuild -e -p --notest-install *.rpm
这时会打开到该rpm包的spec文件为一个临时文件，用vim打开的，使用vim的另存为功能（shift键+":"，输入w 文件名）：当前目录保存一个rsyslog.spec的文件，这个就是rpm包的spec文件

获取rpm中的源文件
在当前目录创建一个目录用来装源文件：mkdir rsyslog
把rpm移至刚创建的目录： mv rsyslog-8.39.0-4.el7.x86_64.rpm rsyslog/
提取源文件： rpm2cpio rsyslog-8.39.0-4.el7.x86_64.rpm | cpio -div
```

##### 3.2.3、查看rpmbuild版本

```
[root@python2 ~]# rpmbuild --version
RPM version 4.11.3
```

##### 3.2.4、编译工具安装

```
# 编译工具
yum install -y gcc make  gcc-c++ 
```

##### 3.2.5、修改rpm制作包的默认路径

```
vim /root/.rpmmacros
%_topdir /export/rpmbuild  #/root/.rpmmacros文件是存储各种宏定义,比如_topdir宏的值来自定义打包路径
```

##### 3.2.6、创建工作目录及介绍

手动创建

```
mkdir -p /export/rpmbuild/{BUILD,BUILDROOT,RPMS,SOURCES,SPECS,SRPMS}
```

rpmdevtools 命令创建

```
cd /export/
rpmdev-setuptree

cd rpmbuild && ls
BUILD  RPMS  SOURCES  SPECS  SRPMS
```

目录作用解释

| 默认位置                   | 宏代码         | 名称              | 用途                                         |
| -------------------------- | -------------- | ----------------- | -------------------------------------------- |
| /export/rpmbuild/SPECS     | %_specdir      | 文件目录          | 保存 RPM 包配置（.spec）文件                 |
| /export/rpmbuild/SOURCES   | %_sourcedir    | 源代码目录        | 保存源码包（如 .tar 包）和所有 patch 补丁    |
| /export/rpmbuild/BUILD     | %_builddir     | 构建目录          | 源码包被解压至此，并在该目录的子目录完成编译 |
| /export/rpmbuild/BUILDROOT | %_buildrootdir | 最终安装目录      | 保存 %install 阶段安装的文件                 |
| /export/rpmbuild/RPMS      | %_rpmdir       | 标准 RPM 包目录   | 生成/保存二进制 RPM 包                       |
| /export/rpmbuild/SRPMS     | %_srcrpmdir    | 源代码 RPM 包目录 | 生成/保存源码 RPM 包(SRPM)                   |

##### 3.2.7、宏定义

直接定义类

```
/usr/lib/rpm/macros
/usr/lib/rpm/macros.d
/etc/rpm/
~/.rpmmacros
直接定义顾名思义就是直接写在文件里面的，
这四个文件的优先级为：用户自定义相关：~/.rpmmacros > 
					系统相关的配置：/etc/rpm/ > 
						全局扩展配置：/usr/lib/rpm/macros.d/* >
                        	全局的配置：/usr/lib/rpm/macros
```

通过macrofiles引用类

```
/usr/lib/rpm/rpmrc、/usr/lib/rpm/redhat/rpmrc、/etc/rpmrc、~/.rpmrc
这4个文件都是rpmrc相关的内容，rpmrc主要是用来定义一些跟平台特型相关的一些选项，比如：
optflags: i386 -O2 -g -march=i386 -mtune=i686
optflags: i686 -O2 -g -march=i686
```

宏自定义及查看

```
#比如修改了~/.rpmmacros，修改rpmbuild的_top_dir为:
%_topdir /export/rpmbuild
%_rm    /usr/bin/rm
#这时候想验证看吓topdir是否已经改变，则可以通过
[root@python2 ~]# rpm --eval “%{_topdir}”
“/export/rpmbuild”
[root@python2 SPECS]# rpm --eval “%{_rm}”
“/usr/bin/rm”
```

```
[root@python2 ~]# rpm --showrc |grep _topdir #也可以查看相应的宏变量
-14: _builddir	%{_topdir}/BUILD
-14: _buildrootdir	%{_topdir}/BUILDROOT
-14: _rpmdir	%{_topdir}/RPMS
-14: _sourcedir	%{_topdir}/SOURCES
-14: _specdir	%{_topdir}/SPECS
-14: _srcrpmdir	%{_topdir}/SRPMS
-14: _topdir	/export/rpmbuild
```

系统自带的相关宏变量

| 宏名称              | 典型扩展               | 意义                                                         |
| ------------------- | ---------------------- | ------------------------------------------------------------ |
| `%{_bindir}`        | `/usr/bin`             | 二进制目录：保存可执行文件                                   |
| `%{_builddir}`      | `~/rpmbuild/BUILD`     | 构建目录：软件在 build 的子目录被编译。参考 `%buildsubdir`   |
| `%{buildroot}`      | `~/rpmbuild/BUILDROOT` | Build root：`%install` 阶段中，将 `%{_builddir}` 子目录下的文件复制到 `%{buildroot}` 的子目录（之前，`%{buildroot}` 使用的位置为 “/var/tmp/”） |
| `%{buildsubdir}`    | `%{_builddir}/%{name}` | 构建子目录：`%build` 阶段中，文件会在 `%{_builddir}` 的子目录中编译。此宏在 `%autosetup` 之后设置 |
| `%{_datadir}`       | `/usr/share`           | 共享数据目录                                                 |
| `%{_defaultdocdir}` | `/usr/share/doc`       | 默认文档目录                                                 |
| `%{dist}`           | `.fc*NUMBER*`          | 发行版名称+版本号（例如 “`.fc40`”）                          |
| `%{fedora}`         | `*NUMBER*`             | Fedora 发行版本号（例如 “`40`”）                             |
| `%{_includedir}`    | `/usr/include`         | 程序头文件目录                                               |
| `%{_infodir}`       | `/usr/share/info`      | info 手册目录                                                |
| `%{_initrddir}`     | `/etc/rc.d/init.d`     | init 脚本目录                                                |
| `%{_libdir}`        | `/usr/lib`             | 共享库目录                                                   |
| `%{_libexecdir}`    | `/usr/libexec`         | 仅由系统调用执行该目录中的命令                               |
| `%{_localstatedir}` | `/var`                 | 保存缓存/日志/lock等信息的目录                               |
| `%{_mandir}`        | `/usr/share/man`       | man 手册目录                                                 |
| `%{name}`           |                        | 软件包名称，通过 Name: tag 设置                              |
| `%{_sbindir}`       | `/usr/sbin`            | 保存管理员可执行命令                                         |
| `{_sharedstatedir}` | `/var/lib`             | 保存程序运行所处理的文件                                     |
| `%{_sysconfdir}`    | `/etc`                 | 配置文件目录                                                 |
| `%{version}`        |                        | 软件包版本，通过 Version: tag 设置                           |
| %{_prefix}          | /usr                   |                                                              |
| %{_exec_prefix}     | %{_prefix}             |                                                              |
| %{_var}             | /var                   |                                                              |
| %{_tmppath}         | %{_var}/tmp            |                                                              |
| %{_usr}             | /usr                   |                                                              |
| %{_usrsrc}          | %{_usr}/src            |                                                              |
| %{_lib}             | lib                    |                                                              |
| %{_docdir}          | %{_datadir}/doc        |                                                              |

##### 3.2.8、rpmbuild命令

```
rpmbuild [options] [spec文档|tarball包|源码包]

#执行命令
rpmbuild -ba redis.spec
```

| **选项** | 含义                                                         |
| -------- | ------------------------------------------------------------ |
| -bp      | 文件中安装执行前的地方                                       |
| -bc      | 执行spec的%pre和%build 段(准备并编译)                        |
| -bi      | 执行spec中%pre，%build与%install(准备，编译并安装)。分阶段测试,方便排错，如果哪个阶段有错误，可以使用**–short-circuit**跳过之前成功的阶段 rpmbuild -bi --short-circuit ngx_openresty.spec |
| -bl      | 检查spec中的%file段(查看文件是否齐全)                        |
| -ba      | 构建源码与二进制包(常用)                                     |
| -bb      | 只建立二进制包(常用)                                         |
| -bs      | 只建立源码包                                                 |

#### 3.3、rpmrebuild命令补充

```
不安装现有rpm包反解出对应的spec文件,但是反解出来的这个文件并不完全，只有70%,但也够用
[root@python2 SOURCES]# rpmrebuild --package --notest-install --spec-only=xx.spec  xxxx.x86_64.rpm
```

### 四、阶段性构建

#### 4.1、大体构建流程

```
1. 首先,需要把源代码放到%_sourcedir中,即/export/rpmbuild/SOURCES/目录下

2. %prep阶段,一般是解压源码包到%_builddir目录下

3. 然后进行编译,编译的过程是在%_builddir中完成的,即在“/export/rpmbuild/BUILD”目录下

4. 接着进行“安装”，这里有点类似于预先组装软件包，把软件包应该包含的内容（比如二进制文件、配置文件、man文档等）复制到%_buildrootdir中，并按照实际安装后的目录结构组装，比如二进制命令可能会在/usr/bin下，那么就在%_buildrootdir下也按照同样的目录结构放置；

5. 然后，需要配置一些必要的工作，比如在实际安装前的准备啦，安装后的清理啦，以及在卸载前后要做的工作啦等等，这样也都是通过配置在SPEC文件中来告诉rpmbuild命令；

6. 还有一步可选操作，那就是检查软件是否正常运行；

7. 最后，生成的RPM包放置到%_rpmdir，源码包放置到%_srpmdir下。
```

| 阶段     | 读取的目录                           | 写入的目录                                 | 具体动作                                                     |
| -------- | ------------------------------------ | ------------------------------------------ | ------------------------------------------------------------ |
| %prep    | %_sourcedir /export/rpmbuild/SOURCES | %_builddir /export/rpmbuild/BUILD/         | 读取位于 %_sourcedir 目录的源代码和 patch 。之后，解压源代码至 %_builddir 的子目录并应用所有 patch。 |
| %build   | %_builddir                           | %_builddir                                 | 编译位于 %_builddir 构建目录下的文件。通过执行类似 ./configure && make 的命令实现。 |
| %install | %_builddir                           | %_buildrootdir /export/rpmbuild/BUILDROOT/ | 读取位于 %_builddir 构建目录下的文件并将其安装至 %_buildrootdir 目录。这些文件就是用户安装 RPM 后，最终得到的文件。注意一个奇怪的地方: 最终安装目录 不是 构建目录。通过执行类似 make install 的命令实现。 |
| %check   | %_builddir                           | %_builddir                                 | 检查软件是否正常运行。通过执行类似 make test 的命令实现。很多软件包都不需要此步。 |
| bin      | %_buildrootdir                       | %_builddir                                 | 读取位于 %_buildrootdir 最终安装目录下的文件，以便最终在 %_rpmdir 目录下创建 RPM 包。在该目录下，不同架构的 RPM 包会分别保存至不同子目录， noarch 目录保存适用于所有架构的 RPM 包。这些 RPM 文件就是用户最终安装的 RPM 包。 |
| src      | %_sourcedir                          | %_srcrpmdir “/export/rpmbuild/SRPMS”       | 创建源码 RPM 包（简称 SRPM，以.src.rpm 作为后缀名），并保存至 %_srcrpmdir 目录。SRPM 包通常用于审核和升级软件包。 |

#### 4.2、spec文件剖析

| 名称          | 含义                                                         |
| ------------- | ------------------------------------------------------------ |
| Name          | 软件包的名称，在后面的变量中即可使用%{name}的方式引用        |
| Summary       | 软件包的内容                                                 |
| Version       | 软件的实际版本号，例如：1.12.1等，后面可使用%{version}引用   |
| Release       | 发布序列号，例如：%{?dist}，标明第几次打包，后面可使用%{release}引用 |
| Group         | 软件分组，建议使用：Applications/System                      |
| License       | 软件授权方式GPLv2                                            |
| Source        | 源码包，可以带多个用Source1、Source2等源，后面也可以用%{source1}、%{source2}引用 |
| BuildRoot     | 这个是安装或编译时使用的临时目录，即模拟安装完以后生成的文件目录：%_topdir/BUILDROOT， 后面可使用$RPM_BUILD_ROOT 方式引用。 |
| URL           | 软件的URI                                                    |
| Vendor        | 打包组织或者人员                                             |
| Patch         | 补丁源码，可使用Patch1、Patch2等标识多个补丁，使用%patch0或%{patch0}引用 |
| Prefix        | %{_prefix} 这个主要是为了解决今后安装rpm包时，并不一定把软件安装到rpm中打包的目录的情况。这样，必须在这里定义该标识，并在编写%install脚本的时候引用，才能实现rpm安装时重新指定位置的功能 |
| Sysconfdir    | %{_sysconfdir} 这个原因和上面的一样，但由于%{_prefix}指/usr，而对于其他的文件，例如/etc下的配置文件，则需要用%{_sysconfdir}标识 |
| Requires      | 该rpm包所依赖的软件包名称，可以用>=或<=表示大于或小于某一特定版本，例如： libxxx-devel >= 1.1. openssl-devel 。 注意：“>=”号两边需用空格隔开，而不同软件名称也用空格分开 |
| BuildRequires | 构建过程中必须依赖的文件                                     |
| Autoreq       | 此域用于指示RPM是否自动查找软件所需的共享库。仅当域值为no或0时,RPM不执行find-requires程序,否则均执行该程序 |
| Autoprov      | 此域用于指示RPM是否自动查找软件提供的共享库。仅当域值为no或0时,RPM不执行find-provides程序,否则均执行该程序 |
| Autoreqprov   | 此域用于指示RPM是否自动查找软件所需的共享库与其提供的共享库。仅当域值为no或0时,RPM不执行find-requires与find-provides两个程序。此域相当于同时设定Autoreq与Autoprov域值为指定之值 |
| %description  | 软件的详细说明                                               |
| %define       | 预定义的变量，例如定义安装路径: InstallPath /export/server/redis |
| %prep         | 预备参数，通常为 %setup -q，或者使用%autosetup 命令          |
| %build        | 编译参数 ./configure --user=nginx --group=nginx --prefix=/usr/local/nginx/，或者是make等命令 |
| %install      | 安装步骤,此时需要指定安装路径，创建编译时自动生成目录，复制配置文件至所对应的目录中,执行make install，拷贝文件等命令 |
| %pre          | 安装前需要做的任务，如：创建用户                             |
| %post         | 安装后需要做的任务 如：自动启动的任务                        |
| %preun        | 卸载前需要做的任务 如：停止任务                              |
| %postun       | 卸载后需要做的任务 如：删除用户，删除/备份业务数据           |
| %clean        | 清除上次编译生成的临时文件，就是上文提到的虚拟目录           |
| %files        | 设置文件属性，包含编译文件需要生成的目录、文件以及分配所对应的权限 |
| %changelog    | 修改历史                                                     |

#### 4.3、Spec文件中判断是升级or卸载

```
	我们在写spec文件时，有pre、post、preun、postun等模块用于指示安装前后以及卸载前后要执行的动作，而软件升级实际上是先卸载后安装的过程，所以这些模块内动作的编写需要区分是卸载还是升级以便采取不同的动作。
	那么如何来进行区分呢？
	
	脚本片段传递一个参数,用于表示本软件包的个数。执行特定动作时,通过向 $1传递不同值,来表示不同动作(安装/升级/卸载),除了 %pretrans 和 %posttrans 它们的 $1 为 0 (rpm 4.4+ 支持 %pretrans 和 %posttrans)。对于安装、升级和卸载，所传递的参数值如下表所示：
```

| 动作           | 安装install                                                  | 升级upgrade                                                  | 卸载remove                                                   |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| %pre(常用)     | `$1`==1                                                      | `$1` == 2                                                    | (N/A)                                                        |
| %post(常用)    | `$1` == 1                                                    | `$1` == 2                                                    | (N/A)                                                        |
| %preun(常用)   | (N/A)                                                        | `$1` == 1                                                    | `$1` == 0                                                    |
| %postun(常用)  | (N/A)                                                        | `$1` == 1                                                    | `$1` == 0                                                    |
| %pretrans      | `$1` == 0                                                    | `$1` == 0                                                    | (N/A)                                                        |
| %triggerprein  | 安装本包: `$1` == 0, `$2` == 1 安装目标包: `$1` == 1, `$2` == 0 | `$1` == 1, `$2` == 1                                         | (N/A)                                                        |
| %triggerin     | `$1` == 1, `$2` == 1                                         | 升级本包: `$1` == 2, `$2` == 1 升级目标包: `$1` == 1, `$2` == 2 | (N/A)                                                        |
| %triggerun     | (N/A)                                                        | `$1` == 1, `$2` == 1                                         | 卸载本包: `$1` == 0, `$2` == 1 卸载目标包: `$1` == 1, `$2` == 0 |
| %triggerpostun | (N/A)                                                        | 升级目标包: `$1` == 1, `$2` == 1                             | 卸载目标包: `$1` == 1, `$2` == 0                             |
| %posttrans     | `$1` == 0                                                    | `$1` == 0                                                    | (N/A)                                                        |

```
示例:
%postun
if [ $1 -eq 0 ]; then
    # RPM 卸载操作,备份或移动目录
    mkdir -p /export/backup/
    if [ -d %{InstallPath} ]; then
        mv %{InstallPath}  /export/backup/
    fi
   echo "Redis data has been backed up to /export/backup/." 
   userdel -r redis
echo "Redis user has been deleted"   
fi
```

#### 4.4、spec文件分解

##### 4.4.1、定义变量

```
#自定义宏，相当于Linux中"Key-Value"变量形式
#--->名称
%define Name redis
#--->版本
%define Version 5.0.5
#--->本rpm包中需更换的配置文件
%define CONFIGFILE redis.conf
#--->本rpm包默认安装的路径
%define InstallPath /export/server/redis
```

##### 4.4.2、安装或编译时使用的虚拟目录

```
# install使用的虚拟目录，安装后就在该目录下打包 
BuildRoot: %_topdir/BUILDROOT
```

##### 4.4.3、%prep部分

```
%prep 部分描述了解压源码包的方法。
一般而言，其中包含 "%autosetup" 命令。另外，还可以使用 "%setup" 和 "%patch" 命令来指定操作 Source0 等标签的文件。
```

```
%autosetup 命令
"%autosetup" 命令用于解压源码包。可用选项包括:
	-n name : 如果源码包解压后的目录名称与 RPM 名称不同，此选项用于指定正确的目录名称。例如，如果 tarball 解压目录为 FOO，则使用 "%autosetup -n FOO"。
	-c name : 如果源码包解压后包含多个目录，而不是单个目录时，此选项可以创建名为 name 的目录，并在其中解压。
```

```
%setup" 命令
常用选项如下:
	-a number	在切换目录后，只解压指定序号的 Source 文件（例如 "-a 0" 表示 Source0）
	-b number	在切换目录前， 只解压指定序号的 Source 文件（例如 "-b 0" 表示 Source0）
	-D	解压前，不删除目录。
	-T	禁止自动解压归档。
	-q  抑止不必要的输出
```

##### 4.4.4、%build 部分

```
在这里可以配置，并编译用于安装的文件
一般用法如下:
 %configure
 make %{?_smp_mflags}
```

##### 4.4.5、%install部分

```
	此部分包含安装阶段需要执行的命令，即从 %{_builddir} 复制相关文件到 %{buildroot} 目录（通常表示从 /epxort/rpmbuild/BUILD 复制到 /export/rpmbuild/BUILDROOT) 目录,并根据需要在 %{buildroot} 中创建必要目录。

容易混淆的术语:
	"build 目录"，也称为 %{_builddir}，实际上与 "build root"，又称为 %{buildroot}，是不同的目录。在前者中进行编译，并将需要打包的文件从前者复制到后者。
	在 %build 阶段，当前目录为 %{buildsubdir},是 %prep 阶段中在 %{_builddir} 下创建的子目录。这些目录通常名为 /export/rpmbuild/BUILD/%{name}-%{version}。
	%install 阶段的命令不会在用户安装 RPM 包时执行，此阶段仅在打包时执行。

这里执行 "make install" 之类的命令:
	%install
	rm -rf %{buildroot} # 仅用于 RHEL 5
	%make_install
理想情况下，对于支持的程序，你应该使用 %make_install，它等同于 DESTDIR=%{buildroot}，它会将文件安装到 %{buildroot} 目录中。
```

```
如果程序不支持 DESTDIR，使用以下方法避开此问题:
	修补 makefile 以便支持 DESTDIR。请在 DESTDIR 根据需要创建必要目录，并向上游提交补丁。
	
	使用 "%makeinstall" 宏。此方法可能有效，但也可能失败。该宏会展开为 "make prefix=%{buildroot}%{_prefix} bindir=%{buildroot}%{_bindir} ... install"，可能导致某些程序无法正常工作。请在 %{buildroot} 根据需要创建必要目录。
	
	使用 auto-destdir 软件包。它需要 "BuildRequires: auto-destdir"，并将 "make install" 修改为 "make-redir DESTDIR=%{buildroot} install"。这仅适用于使用常用命令安装文件的情况，例如 cp 和 install。
	
	手动执行安装。这需要在 %{buildroot} 下创建必要目录，并从 %{_builddir} 复制文件至 %{buildroot} 目录。要特别注意更新，通常会包含新文件。示例如下：
%install
rm -rf %{buildroot}
mkdir -p %{buildroot}%{_bindir}/
cp -p mycommand %{buildroot}%{_bindir}/
```

##### 4.4.6、%file部分-定义哪些文件或目录会放入到rpm包中

```
#设置文件属性，包含编译文件需要生成的目录、文件以及分配所对应的权限
%files
%defattr(-,redis,redis,-)
%dir %{InstallPath} #目录 %{InstallPath} 下是否有文件，都应该创建该目录
%dir %{InstallPath}/bin
%dir %{InstallPath}/conf
%dir %{InstallPath}/data
%dir %{InstallPath}/logs
%dir %{InstallPath}/script
%{InstallPath}/bin/*
%{InstallPath}/conf/*
%{InstallPath}/script/*
```

设置权限

```
#方式一、针对单个文件或目录设置
%attr(0755,redis,redis) %dir %{InstallPath}

#方式二、针对某个路径下的所有文件或目录设置
%defattr(-,redis,redis,-)
```

### 五、RPM包签名

```
	在 GPG (GNU Privacy Guard) 密钥体系中，pub 和 sub 分别代表 "public key"（公钥）和 "subkey"（子密钥）。每个 GPG 密钥可以包含一个主密钥（public key）和多个子密钥（subkey）。主密钥通常用于身份验证，而子密钥可以用于加密或签名
```

#### 5.1、安装gnupg、pinentry

```
对rpm包进行签名可以防止软件包被篡改，像epel、remi等公共软件源都会使用签名，签名要用到gnupg软件包，查询是否安装：
[root@python2 SPECS]# rpm -qf `which gpg`
gnupg2-2.0.22-5.el7_5.x86_64
[root@python2 SPECS]# yum -y install gnupg pinentry
```

#### 5.2、设置熵池

```
原因:
	生成密钥对时会使用/dev/random生成的真随机数（通过噪音产生），可能会因熵池不够而阻塞，需要安装rng-tools自动补充熵池：
```

安装、配置、启动

```
[root@python2 SPECS]# yum install rng-tools
[root@python2 SPECS]# echo 'EXTRAOPTIONS="-r /dev/urandom"' >> /etc/sysconfig/rngd
[root@python2 SPECS]# service rngd start
[root@python2 SPECS]# cat /proc/sys/kernel/random/entropy_avail #查看熵池大小
```

#### 5.3、生成密钥对

```
此过程要用root执行,使用普通用户会出现错误
执行命令:
	gpg --gen-key
四种密钥类型的选择:
	RSA and RSA: 是最常用的选择，因为它提供了一个好的平衡点，在安全性和兼容性之间。RSA 密钥通常可以被设置为较长的密钥长度（如 2048 或 4096 位），以提供较高的安全性。较长的密钥长度（如 4096 位）更难被破解，但会使加密和解密操作更耗时。既可以用于签名也可以用于加密的通用密钥
	DSA and Elgamal: 这种类型的密钥组合使用 DSA 进行数字签名，Elgamal 进行加密。这是一个较老的组合，通常不推荐使用.并且密钥长度通常被限制为较短的长度，这可能降低其相对安全性
	DSA (sign only): DSA 密钥仅用于签名，不支持加密。如果你只需要一个用于数字签名的密钥，而不需要加密功能，可以选择这个选项
	RSA (sign only): 这种类型的密钥只能用于数字签名。如果你确定你的密钥只用于签名目的，这是一个可行的选择。
```

![](图片\rpm包签名.png)

#### 5.4、查看公钥

```
 gpg --list-keys
```

![](图片\查看公钥.png)

#### 5.5、rpm包签名

##### 5.5.1、添加配置

```
在~/.rpmmacros中添加以下配置:
%_signature gpg
%_gpg_path /root/.gnupg/ #存放的位置
%_gpg_name rpmbuild   #设置的名
%_gpgbin /usr/bin/gpg
```

##### 5.5.2、 对rpm软件包签名

```
rpm --addsign rpm包名
Enter pass phrase:    输入gpg密码
Pass phrase is good.
xxxx.x86_64.rpm:
```

#### 5.6、验证签名

##### 5.6.1、导出公钥

```
验证软件包签名要将公钥导入到rpm的数据库中，然后用rpm命令验证,导出公钥：
[root@python2 .gnupg]# cd /root/.gnupg/
[root@python2 .gnupg]# gpg --export -a '设置的name' > RPM-GPG-KEY-RPMBUILD (最后一位换位设置的name)
```

##### 5.6.2、查看当前rpm数据库中已有的公钥

```
[root@python2 .gnupg]# rpm -q gpg-pubkey-*
gpg-pubkey-f4a80eb5-53a7ff4b
```

##### 5.6.3、使用root导入到rpm数据库中

```
[root@python2 .gnupg]#  rpm --import RPM-GPG-KEY-RPMBUILD
```

##### 5.6.4、再次查询

```
[root@python2 .gnupg]# rpm -q gpg-pubkey-*  #发现最后会多出一个公钥，那个就是导入的公钥
gpg-pubkey-f4a80eb5-53a7ff4b
gpg-pubkey-788b960f-6687b60f
```

##### 5.6.5、验证签名

```
[root@python2 .gnupg]# rpm -K /export/rpmbuild/RPMS/x86_64/redis-5.0.5-1.x86_64.rpm 
/export/rpmbuild/RPMS/x86_64/redis-5.0.5-1.x86_64.rpm: rsa sha1 (md5) pgp md5 OK
```

#### 5.7、删除公钥私钥

```
1,删除公钥 私钥
[root@python2 .gnupg]# gpg --delete-keys <name> #设置的name
[root@python2 .gnupg]# gpg --delete-sccret-keys <name>


2,删除导入的公钥：
[root@python2 .gnupg]# rpm -e gpg-pubkey-xxxxxxx   # 公钥也是一个rpm包
```

#### 5.8、签名过期处理

##### 5.8.1、在公钥签名过期前续签

查找密钥名

```
[root@python2 ~]# gpg --list-key
/root/.gnupg/pubring.gpg
------------------------
pub   4096R/788B960F 2024-07-05 [expires: 2025-07-05]
uid                  rpmbuild (GPG-RPM-KEY) <rootwxd@163.com>
sub   4096R/4CE2423E 2024-07-05 [expires: 2025-07-05]
```

进入编辑，并输入expire，可输入help命令查看帮助手册

```
[root@python2 ~]# gpg --edit-key rpmbuild
gpg (GnuPG) 2.0.22; Copyright (C) 2013 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Secret key is available.

pub  4096R/788B960F  created: 2024-07-05  expires: 2025-07-05  usage: SC  
                     trust: ultimate      validity: ultimate
sub  4096R/4CE2423E  created: 2024-07-05  expires: 2025-07-05  usage: E   
[ultimate] (1). rpmbuild (GPG-RPM-KEY) <rootwxd@163.com>

gpg> expire
Changing expiration time for the primary key.
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 2y  #续签
Key expires at Sun 05 Jul 2026 05:15:08 PM CST
Is this correct? (y/N) y

You need a passphrase to unlock the secret key for
user: "rpmbuild (GPG-RPM-KEY) <rootwxd@163.com>"
4096-bit RSA key, ID 788B960F, created 2024-07-05


pub  4096R/788B960F  created: 2024-07-05  expires: 2026-07-05  usage: SC  
                     trust: ultimate      validity: ultimate
sub  4096R/4CE2423E  created: 2024-07-05  expires: 2025-07-05  usage: E   
[ultimate] (1). rpmbuild (GPG-RPM-KEY) <rootwxd@163.com>

gpg> save

```

重新验证签名

```
[root@python2 ~]# cd /root/.gnupg/
[root@python2 .gnupg]# ll
total 36
-rw------- 1 root root 7680 Jul  4 11:27 gpg.conf
drwx------ 2 root root    6 Jul  5 15:25 private-keys-v1.d
-rw------- 1 root root 2236 Jul  5 17:15 pubring.gpg
-rw------- 1 root root 2236 Jul  5 17:00 pubring.gpg~
-rw------- 1 root root  600 Jul  5 17:00 random_seed
-rw-r--r-- 1 root root 3133 Jul  5 17:05 RPM-GPG-KEY-RPMBUILD #旧公钥
-rw------- 1 root root 4894 Jul  5 17:15 secring.gpg
srwxr-xr-x 1 root root    0 Jul  5 17:15 S.gpg-agent
-rw------- 1 root root 1360 Jul  5 17:15 trustdb.gpg
[root@python2 .gnupg]# gpg --export -a 'rpmbuild' >RPM-GPG-KEY-RPMBUILD-two-year #导出新公钥
[root@python2 .gnupg]# rpm -q gpg-pubkey-* #查看旧公钥
gpg-pubkey-f4a80eb5-53a7ff4b
gpg-pubkey-788b960f-6687b60f
[root@python2 .gnupg]#  rpm --import  RPM-GPG-KEY-RPMBUILD-two-year #导入新公钥
[root@python2 .gnupg]# rpm -q gpg-pubkey-* #再次查看公钥
gpg-pubkey-f4a80eb5-53a7ff4b
gpg-pubkey-788b960f-6687b60f
[root@python2 .gnupg]#rpm -K /export/rpmbuild/RPMS/x86_64/redis-5.0.5-1.x86_64.rpm #验证签名
/export/rpmbuild/RPMS/x86_64/redis-5.0.5-1.x86_64.rpm: rsa sha1 (md5) pgp md5 OK
```

查看签名到期时间

```
#获取到rpm包中的签名ID eb5c386d788b960f
[root@python2 .gnupg]# rpm -qpi /export/rpmbuild/RPMS/x86_64/redis-5.0.5-1.x86_64.rpm
Name        : redis
Version     : 5.0.5
Release     : 1
Architecture: x86_64
Install Date: (not installed)
Group       : System Middleware
Size        : 6280870
License     : BSD
Signature   : RSA/SHA1, Fri 05 Jul 2024 05:02:58 PM CST, Key ID eb5c386d788b960f
Source RPM  : redis-5.0.5-1.src.rpm
Build Date  : Fri 05 Jul 2024 05:02:46 PM CST
Build Host  : python2
Relocations : (not relocatable)
URL         : https://download.redis.io/releases/redis-5.0.9.tar.gz
Summary     : The redis for centos 7 x86_64.
Description : This is redis

#根据ID查看到期时间
[root@python2 .gnupg]# gpg --list-keys  eb5c386d788b960f
pub   4096R/788B960F 2024-07-05 [expires: 2026-07-05]
uid                  rpmbuild (GPG-RPM-KEY) <rootwxd@163.com>
sub   4096R/4CE2423E 2024-07-05 [expires: 2025-07-05]
```

##### 5.8.2、在续期公钥关联的子密钥过期时间

```
#通过上述方法获得公钥ID,然后进入编辑页面
[root@python2 ~]# gpg --edit-key 公钥ID
gpg> key 1  #选择子密钥,看*号是否在sub位置处

pub  4096R/788B960F  created: 2024-07-05  expires: 2026-07-05  usage: SC  
                     trust: ultimate      validity: ultimate
sub* 4096R/4CE2423E  created: 2024-07-05  expires: 2025-07-05  usage: E   
[ultimate] (1). rpmbuild (GPG-RPM-KEY) <rootwxd@163.com>

gpg> expire #续期
Changing expiration time for a subkey.
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 2y
Key expires at Sun 05 Jul 2026 05:45:00 PM CST
Is this correct? (y/N) y

You need a passphrase to unlock the secret key for
user: "rpmbuild (GPG-RPM-KEY) <rootwxd@163.com>"
4096-bit RSA key, ID 788B960F, created 2024-07-05


pub  4096R/788B960F  created: 2024-07-05  expires: 2026-07-05  usage: SC  
                     trust: ultimate      validity: ultimate
sub* 4096R/4CE2423E  created: 2024-07-05  expires: 2026-07-05  usage: E   
[ultimate] (1). rpmbuild (GPG-RPM-KEY) <rootwxd@163.com>

gpg> save

#查看公钥和子密钥到期时间
[root@python2 .gnupg]# gpg --list-keys  eb5c386d788b960f
gpg: checking the trustdb
gpg: 3 marginal(s) needed, 1 complete(s) needed, PGP trust model
gpg: depth: 0  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 1u
gpg: next trustdb check due at 2026-07-05
pub   4096R/788B960F 2024-07-05 [expires: 2026-07-05]
uid                  rpmbuild (GPG-RPM-KEY) <rootwxd@163.com>
sub   4096R/4CE2423E 2024-07-05 [expires: 2026-07-05]
```

### 六、RpmBuild构建redis版本RPM包

#### 6.1、资源准备

##### 6.1.1、创建rpmbuild工作目录

```
手动创建
[root@python2 ~]#   mkdir -p /export/rpmbuild/{BUILD,BUILDROOT,RPMS,SOURCES,SPECS,SRPMS}
```

```
rpmdevtools 命令创建
[root@python2 ~]#   cd /export/
[root@python2 ~]#   rpmdev-setuptree

[root@python2 ~]#  cd /export/rpmbuild && ls
	BUILD  RPMS  SOURCES  SPECS  SRPMS
```

##### 6.1.2、目录作用解释

| 默认位置                   | 宏代码         | 名称              | 用途                                         |
| -------------------------- | -------------- | ----------------- | -------------------------------------------- |
| /export/rpmbuild/SPECS     | %_specdir      | 文件目录          | 保存 RPM 包配置（.spec）文件                 |
| /export/rpmbuild/SOURCES   | %_sourcedir    | 源代码目录        | 保存源码包（如 .tar 包）和所有 patch 补丁    |
| /export/rpmbuild/BUILD     | %_builddir     | 构建目录          | 源码包被解压至此，并在该目录的子目录完成编译 |
| /export/rpmbuild/BUILDROOT | %_buildrootdir | 最终安装目录      | 保存 %install 阶段安装的文件                 |
| /export/rpmbuild/RPMS      | %_rpmdir       | 标准 RPM 包目录   | 生成/保存二进制 RPM 包                       |
| /export/rpmbuild/SRPMS     | %_srcrpmdir    | 源代码 RPM 包目录 | 生成/保存源码 RPM 包(SRPM)                   |

##### 6.1.3、下载redis源码包

```
将源码包下载至SOURCES目录,专门用于存放源文件
[root@python2 ~]#  cd /export/rpmbuild/SOURCES
[root@python2 ~]#  wget  https://download.redis.io/releases/redis-5.0.9.tar.gz
```

##### 6.1.4、上传redis.conf文件

```
[root@python2 ~]#  cd /export/rpmbuild/SOURCES
[root@python2 ~]#  rz
此处替换为自己环境现有的redis.conf文件即可
```

##### 6.1.5、上传创建redis实例脚本和创建分布式集群脚本

将这两个脚本封装到rpm包中去,安装之后可快速执行脚本产生redis实例,并构建出相应的分布式集群

```
[root@python2 ~]#  cd /export/rpmbuild/SOURCES
[root@python2 ~]#  rz
```

```
create_port_redisconf.sh
#!/bin/bash
# help
useage() {
	echo -e "useage: $0 [ port ] [[yes|no cluster] default no]
	eg:$0 7889 no|yes\n"
	exit 2
}

redis_cluster_conf() {
    # redis config file
    cat > ${redis_dir}/conf/${port}/redis_${port}.conf << EOF

include ${redis_dir}/conf/redis.conf

daemonize yes

cluster-enabled yes
cluster-config-file "nodes.conf"
cluster-node-timeout 15000

pidfile "${redis_dir}/logs/redis_${port}.pid"
logfile "${redis_dir}/logs/redis_${port}.log"

appendonly no

dir "${redis_dir}/conf/${port}"
port ${port}
# Generated by CONFIG REWRITE
timeout 600
tcp-keepalive 3600
save 900 1
save 300 10
save 60 10000
client-output-buffer-limit normal 0 0 0
repl-timeout 180
repl-backlog-size 50mb
client-output-buffer-limit slave 0 0 0

EOF
}

redis_standard_conf(){
    # redis config file
    cat > ${redis_dir}/conf/${port}/redis_${port}.conf << EOF

include ${redis_dir}/conf/redis.conf

daemonize yes

pidfile "${redis_dir}/logs/redis_${port}.pid"
logfile "${redis_dir}/logs/redis_${port}.log"

appendonly no

dir "${redis_dir}/conf/${port}"
port ${port}
# Generated by CONFIG REWRITE
timeout 600
tcp-keepalive 3600
save 900 1
save 300 10
save 60 10000
client-output-buffer-limit normal 0 0 0
repl-timeout 180
repl-backlog-size 50mb
client-output-buffer-limit slave 0 0 0

EOF

}

#
if [[ $# -eq 1 && $1 -gt 0 ]] || [[ $# -eq 2 ]];then
    port=$1
    is_cluster=$2

    redis_dir='/export/server/redis'
    # create port dir
    [ -d ${redis_dir}/conf/${port} ] || mkdir -p ${redis_dir}/conf/${port}
    

    [ -f ${redis_dir}/conf/${port}/redis_${port}.conf ] && echo "${redis_dir}/conf/${port}/redis_${port}.conf File is exits!" && exit 2
    # 
    if echo "${is_cluster[@]}" | grep -w "yes" &>/dev/null;then
        # create redis config file
        redis_cluster_conf
    else
        # create redis config file
        redis_standard_conf
    fi
    # create start service file
    cat > ${redis_dir}/service_${port}.sh << EOF
#!/bin/bash

# help
useage() {
	echo -e "useage: \$0 [ start | stop | restart ]
	eg:\$0 start\\n"
	exit 2
}


start() {
    ${redis_dir}/bin/redis-server ${redis_dir}/conf/${port}/redis_${port}.conf 
}
stop() {
    kill -9 \`cat ${redis_dir}/logs/redis_${port}.pid\`
}

if [[ \$# -eq 1 ]];then
    case \$1 in
        start)
            start
    	    ;;
        stop)
            stop
    	    ;;
        restart)
            stop
            start
    	    ;;
        *)
            useage
    	    ;;
    esac
else
    useage
fi

EOF
    
    # add x mode
    chmod +x ${redis_dir}/service_${port}.sh
    

else
    useage
fi
```

```
create_clusterRedis.sh
#!/bin/bash

redis_home='/export/server/redis'


# help
useage() {
	echo -e "useage: $0 [ host1:port host1:port ... ]
	eg:$0 127.0.0.1:7001 127.0.0.1:7002 ...\n"
	exit 2
}

create() {
    ${redis_home}/bin/redis-cli --cluster create --cluster-replicas 1  $*
}

if [[ $# -gt 1 ]];then
    echo $*
    
    create $*

else
    useage
fi
```

至此,准备工作已完成,下面开始编写spec文件并构建RPM包

#### 6.2、构建过程

##### 6.2.1、redis.spec文件

```
[root@python2 ~]# cd /export/rpmbuild/SPEC/
[root@python2 SPEC/]# vim redis.spec
#自定义宏，相当于Linux中"Key-Value"变量形式
#--->名称
%define Name redis
#--->版本
%define Version 5.0.9
#--->本rpm包中需更换的配置文件
%define CONFIGFILE redis.conf
#--->本rpm包默认安装的路径
%define InstallPath /export/server/redis
#-->rpm包封装进去的脚本
%define create_port  create_port_conf.sh
%define create_cluster create_cluster.sh

%define _build_id_links none
# 软件包的名称 
Name: %{Name}
# 软件包的版本 
Version: %{Version}
# 软件包发布序列号，1表示第几次打包 %{?dist} 会再包名中添加操作系统系统
Release: 1
# 软件包的概要信息，不要超过50个 
Summary: The redis for centos 7 x86_64.

# 软件授权方式 
License: BSD

# 软件分类
Group:System Middleware

# 源代码软件包的官方地址或源码包的下载地址 
URL: https://download.redis.io/releases/redis-5.0.9.tar.gz



# 源代码软件包的名字 
Source0: %{Name}-%{Version}.tar.gz
Source1: %{CONFIGFILE}
Source2: %{create_port}
Source3: %{create_cluster}

# install使用的虚拟目录，安装后就在该目录下打包 
BuildRoot: %_topdir/BUILDROOT


#制作过程中用到的软件包
BuildRequires: gcc,automake,autoconf,libtool,make
Requires: bash,jemalloc

#软件包详细描述信息 
%description
This is %{Name}


%pre
if getent passwd %{Name} > /dev/null; then
    echo "user %{Name} already exist，The installation operation will continue!!!"
else
    useradd %{Name} -s /sbin/nologin
fi


# 安装前的准备工作，一般用于解压源码包
%prep
#解压并cd到相关目录  tar xf SOURCES/redis-5.0.9.tar.gz -C BUILD && cd BUILD
%setup -q

# 源码编译 make
%build
make %{?_smp_mflags}


# 源码安装
#目前还是在/export/rpmbuild/BUILD/目录中，执行以下操作
#rm -rf /export/rpmbuild/BUILDROOT
#mkdir -p /export/rpmbuild/BUILDROOT/export/server/redis/{bin,conf,data,logs,script}
%install
%{_rm} -rf %{buildroot} # 清理之前的安装
# 使用 make install 来自动安装到指定目录，替代手动复制文件的步骤
make install PREFIX=%{buildroot}%{InstallPath}

# 创建目录结构，如果make install没有创建（通常不需要，除非有特殊需求）
mkdir -p %{buildroot}%{InstallPath}/{conf,data,logs,script}

# 如果需要，创建必要的符号链接（检查是否已经由 make install 创建）
# ln -s %{buildroot}%{InstallPath}/bin/redis-server %{buildroot}%{InstallPath}/bin/redis-sentinel

# 复制自定义的或额外的配置文件和脚本
cp -rp %{SOURCE1} %{buildroot}%{InstallPath}/conf/
cp -rp %{SOURCE2} %{buildroot}%{InstallPath}/script/
cp -rp %{SOURCE3} %{buildroot}%{InstallPath}/script/
chmod +x %{buildroot}%{InstallPath}/script/*

# 设置文件和目录的所有权
chown -R redis.redis %{buildroot}%{InstallPath}


#卸载前需要做的任务 如：停止任务
%preun
if [ $1 -eq 0 ]; then
    echo "Automatically stopping all Redis services..."
    for script in %{InstallPath}/service_*.sh; do
        if [[ $script =~ service_([0-9]+)\.sh ]]; then
            sh $script stop
        fi
    done
    # RPM 卸载操作,备份或移动目录
    mkdir -p /export/backup/
    if [ -d %{InstallPath} ]; then
        cp -rp %{InstallPath}  /export/backup/
    fi
    echo "Redis data has been backed up to /export/backup/."
    
    userdel -r redis
    echo "Redis user has been deleted"
fi

#设置文件属性，包含编译文件需要生成的目录、文件以及分配所对应的权限
%files
%defattr(-,redis,redis,-)
%dir %{InstallPath}
%dir %{InstallPath}/bin
%dir %{InstallPath}/conf
%dir %{InstallPath}/data
%dir %{InstallPath}/logs
%dir %{InstallPath}/script
%{InstallPath}/bin/*
%{InstallPath}/conf/*
%{InstallPath}/script/*


#变更日志  第一行的变更时间格式 由date '+* %a %b %d %Y %T %z' 在命令获取然后粘贴即可
%changelog
* Fri Jul 05 2024 14:57:39 +0800
- Initial redis 5.0.9 RPM release
```

##### 6.2.2、修改用户自定义宏相关文件rpmmacros

```
[root@python2 ~]# cat /root/.rpmmacros 
%_topdir /export/rpmbuild
%_rm    /usr/bin/rm
%_signature gpg
%_gpg_path /root/.gnupg/
%_gpg_name rpmbuild
%_gpgbin /usr/bin/gpg
```

##### 6.2.3、创建RPM包签名

```
查看RPM包签名流程部分即可
```

##### 6.2.4、构建带签名的RPM包

![](D:\学习\linux运维\图片\签名的RPM包.png)

```
#进入到SPEC文件目录下
[root@python2 rpmbuild]# cd SPECS/
[root@python2 SPECS]# ll
total 8
-rw-r--r-- 1 root root 4423 Jul  5 15:03 redis.spec
```

```
#执行构建命令
[root@python2 SPECS]# useradd redis -s /sbin/nologin  #先创建出redis用户,否则构建会报错
Creating mailbox file: File exists

#构建过程
[root@python2 SPECS]# rpmbuild --bb redis.spec 
+ umask 022
+ cd /export/rpmbuild/BUILD
+ cd /export/rpmbuild/BUILD
+ rm -rf redis-5.0.9
+ /usr/bin/gzip -dc /export/rpmbuild/SOURCES/redis-5.0.9.tar.gz
+ /usr/bin/tar -xf -
+ STATUS=0
+ '[' 0 -ne 0 ']'
+ cd redis-5.0.9
+ /usr/bin/chmod -Rf a+rX,u+w,g-w,o-w .
+ exit 0
+ umask 022
+ cd /export/rpmbuild/BUILD
+ cd redis-5.0.9
+ make
    CC Makefile.dep
    ......  #全部过程就不在此展示了
9100 blocks
+ /usr/lib/rpm/check-buildroot
+ /usr/lib/rpm/redhat/brp-compress
+ /usr/lib/rpm/redhat/brp-strip-static-archive /usr/bin/strip
+ /usr/lib/rpm/brp-python-bytecompile /usr/bin/python 1
+ /usr/lib/rpm/redhat/brp-python-hardlink
+ /usr/lib/rpm/redhat/brp-java-repack-jars
+ umask 022
+ cd /export/rpmbuild/BUILD
+ cd redis-5.0.9
+ /usr/bin/rm -rf /export/rpmbuild/BUILDROOT/redis-5.0.9-1.x86_64
+ exit 0
/export/rpmbuild/RPMS/x86_64/redis-5.0.9-1.x86_64.rpm:
/export/rpmbuild/RPMS/x86_64/redis-debuginfo-5.0.9-1.x86_64.rpm：

#rpm包签名
rpmbuild --sign redis-5.0.9-1.x86_64.rpm
Enter pass phrase:    输入gpg密码
Pass phrase is good.
```

##### 6.2.5、查看结果

```
[root@python2 SPECS]# cd ../RPMS/x86_64/
[root@python2 x86_64]# ll
total 7300
-rw-r--r-- 1 root root 1364252 Jul  5 21:48 redis-5.0.9-1.x86_64.rpm  #这个才是构建出来的RPM包
-rw-r--r-- 1 root root 6107072 Jul  5 21:48 redis-debuginfo-5.0.9-1.x86_64.rpm
```

#### 6.3、结果演示

##### 6.3.1、安装构建完成的RPM包

```
[root@python2 x86_64]# ll
total 7300
-rw-r--r-- 1 root root 1364252 Jul  5 21:48 redis-5.0.9-1.x86_64.rpm
-rw-r--r-- 1 root root 6107072 Jul  5 21:48 redis-debuginfo-5.0.9-1.x86_64.rpm
[root@python2 x86_64]# rpm -ivh redis-5.0.9-1.x86_64.rpm 
Preparing...                          ################################# [100%]
user redis already exist，The installation operation will continue!!!
Updating / installing...
   1:redis-5.0.9-1                    ################################# [100%]
```

##### 6.3.2、创建redis实例

```
#查看安装后的目录结构
[root@python2 redis]# tree
.
├── bin
│   ├── redis-benchmark
│   ├── redis-check-aof
│   ├── redis-check-rdb
│   ├── redis-cli
│   ├── redis-sentinel -> redis-server
│   └── redis-server
├── conf
│   └── redis.conf
├── data
├── logs
└── script
    ├── create_clusterRedis.sh
    └── create_port_Redisconf.sh

5 directories, 9 files

#创建一个端口为7889的redis实例并启动
[root@python2 redis]# sh script/create_port_confRedis.sh 7889 yes
[root@python2 redis]# sh service_7889.sh start
[root@python2 redis]# ps -ef |grep redis
root      11929      1  0 21:54 ?        00:00:00 /export/server/redis/bin/redis-server *:7889 [cluster]
root      11934   1173  0 21:54 pts/0    00:00:00 grep --color=auto redis

#再次查看Redis目录结构
[root@python2 redis]# tree .
.
├── bin
│   ├── redis-benchmark
│   ├── redis-check-aof
│   ├── redis-check-rdb
│   ├── redis-cli
│   ├── redis-sentinel -> redis-server
│   └── redis-server
├── conf
│   ├── 7889
│   │   ├── nodes.conf
│   │   └── redis_7889.conf
│   └── redis.conf
├── data
├── logs
│   ├── redis_7889.log
│   └── redis_7889.pid
├── script
│   ├── create_clusterRedis.sh
│   └── create_port_confRedis.sh
└── service_7889.sh

6 directories, 14 files
```

由此可见,创建redis实例前后,目录结构也发生了变化,而且redis实例也启动成功,但这个只是单节点的,要想创建一个redis分布式集群,还需要执行 create_clusterRedis.sh ip:port,xx,xx,xx,xx,xx yes才可以

##### 6.3.3、查看RPM包签名到期时间

```
#查看签名到期时间
#获取到rpm包中的签名ID eb5c386d788b960f
[root@python2 .gnupg]# rpm -qpi /export/rpmbuild/RPMS/x86_64/redis-5.0.9-1.x86_64.rpm
Name        : redis
Version     : 5.0.9
Release     : 1
Architecture: x86_64
Install Date: (not installed)
Group       : System Middleware
Size        : 6280870
License     : BSD
Signature   : RSA/SHA1, Fri 05 Jul 2024 05:02:58 PM CST, Key ID eb5c386d788b960f
Source RPM  : redis-5.0.9-1.src.rpm
Build Date  : Fri 05 Jul 2024 05:02:46 PM CST
Build Host  : python2
Relocations : (not relocatable)
URL         : https://download.redis.io/releases/redis-5.0.9.tar.gz
Summary     : The redis for centos 7 x86_64.
Description : This is redis

#根据ID查看到期时间
[root@python2 .gnupg]# gpg --list-keys  eb5c386d788b960f
pub   4096R/788B960F 2024-07-05 [expires: 2026-07-05]
uid                  rpmbuild (GPG-RPM-KEY) <rootwxd@163.com>
sub   4096R/4CE2423E 2024-07-05 [expires: 2025-07-05]
```

##### 6.4.4、卸载redis-rpm包

```
[root@python2 redis]# rpm -qa |grep redis
redis-5.0.9-1.x86_64
[root@python2 redis]# rpm -e redis-5.0.9-1.x86_64
Automatically stopping all Redis services...
Redis data has been backed up to /export/backup/.
userdel: /var/spool/mail/redis not owned by redis, not removing
Redis user has been deleted
```

