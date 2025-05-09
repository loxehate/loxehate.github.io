---
title: Linux python详解
tags: [python]
categories: [Linux]
date: 2025-05-09
---
## 一、Linux下载 Python 3

### 1、进入 opt 文件目录下

```
cd opt/
```

### 2、下载 python3 ,输入命令

```
wget https://www.python.org/ftp/python/3.8.2/Python-3.8.2.tgz
```

### 3、安装 Python3

安装在 /usr/local/python3

（1）创建目录

```
mkdir -p /usr/local/python3
```

（2）解压下载好的 Python-3.x.x.tgz 包(具体包名因你下载的 Python 具体版本不不同⽽而不不同，如：我下载的是 Python3.8.2.那我这里就是 Python-3.8.2.tgz)

输入命令

```
cd /opt
mv Python-3.8.2.tgz /usr/local/python3/
cd /usr/local/python3/
tar -zxvf Python-3.8.2.tgz
```

### 4、进入解压后的目录，编译安装。（编译安装前需要安装编译器 gcc）

```
cd /usr/local/python3/Python-3.8.2
```

（1）安装 gcc

```
yum -y install gcc
```

（2）安装依赖

```
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel libffi-devel
```

3.7 版本之后需要 libffi-devel、[zlib](https://so.csdn.net/so/search?q=zlib&spm=1001.2101.3001.7020)，安装即可：

```
yum install libffi-devel -y
yum -y install zlib*
```

（3）进入 python 文件夹，生成编译脚本(指定安装目录)：

```
cd Python-3.8.2
./configure --with-ssl --prefix=/usr/local/python3
```

其中#/usr/local/python3 为上面步骤创建的目录

（4）编译及安装：

```
make&&make install
```

### 5.建立 Python3 和 pip3 的软链:

```
ln -s /usr/local/python3/bin/python3 /usr/bin/python3
ln -s /usr/local/python3/bin/pip3 /usr/bin/pip3
```

## 二、 遇到的问题及解决办法

P1:更改环境变量

1.更改linux的path变量，添加python3 执行 `vim ~/.bash_profile`
2.打开配置文件，添加如下配置：

```
 #配置python 
 export PYTHON_HOME=/usr/local/python3  
 export PATH=$PYTHON_HOME/bin:$PATH
```

3.保存退出（:wq），执行`source ~/.bash_profile`命令使配置生效。
4.执行`echo $PYTHON_HOME`，查看是否配置成功

```
额外知识：修改以下两个文件哪个都行，一个对当前用户生效，一个对所有文件 
~/.bash_profile  # 这个是用户环境变量配置文件   
/etc/profile  # 系统环境变量配置文件
```

## 三、Python之离线安装第三方库

### 1、国外pypi.org网站

各种Python的安装包，主要提供Linux版本的后缀是".whl"和“.tar.gz”，可以搜索相关的包
网址：https://pypi.org/

```
pip download [packname]
```

### 2、whl包

各种Python的安装包，主要提供Windows版本的后缀是".whl"，可以直接查找相关的包
网址：https://www.lfd.uci.edu/~gohlke/pythonlibs/

### 3、国内镜像源

```
国内镜像源比较多，例如：清华、阿里等，他们解决国外下载相关包慢的问题
豆瓣镜像源： http://pypi.doubanio.com/simple/

可以在地址栏直接输入查找的包，离线下载，例如：下载tensorflow
http://pypi.doubanio.com/simple/tensorflow

使用豆瓣镜像源在线安装tensorflow
pip install tensorflow -i http://pypi.doubanio.com/simple/
```

### 4、 ".whl"文件离线安装

```
".whl"文件安装如下：
#以Numpy为例
#linux版本的安装（默认文件在当前目录下）
pip install numpy-1.15.0-cp27-cp27mu-manylinux1_x86_64.whl

#Windows版本的安装（默认文件在当前目录下）
pip install numpy‑1.14.5+mkl‑cp27‑cp27m‑win_amd64.whl
```

### 5、 ".tar.gz"文件离线安装

“.tar.gz"文件安装如下：
（1） 文件解压
#”.tar.gz"文件解压
tar -xzvf numpy-1.15.0.tar.gz
#".zip"文件解压
unzip numpy-1.15.0.zip
（2）进入目录"numpy-1.15.0"
cd numpy-1.15.0
（3）找到“setup.py”文件，然后安装
python setup.py install

### 6 、个人建议：

```
（1）建议使用".whl"文件安装，不要使用".tar.gz"安装，因为".tar.gz"在编译过程中容易出错
（2）其中"numpy-1.15.0-cp27-cp27mu-manylinux1_x86_64.whl"与"numpy-1.15.0-cp27-cp27m-manylinux1_x86_64.whl"
     这两个文件的文件字符编码方式不同，"cp27-cp27m"为每个字符占用2个字节，
     "cp27-cp27mu"每个字节占用4个字符，建议安装"cp27-cp27mu"文件，有的时候"cp27-cp27m"文件可能装不上。
```

## 四、python pip详解

### 1. 使用 pip 安装 python 第三方库

```
pip install requests
```

### 2. 使用 pip 安装指定版本的 python 第三方库

```
pip install xlrd==1.2.0
```

### 3. 使用 pip 卸载已经安装的第三方库

```
pip uninstall xlrd
```

### 4. 使用 pip 查看已经安装的第三方库

```
pip list
```

### 5. pip 安装第三方库时很慢怎么办？

#### 5.1 常用的下载源

```
清华：https://pypi.tuna.tsinghua.edu.cn/simple
阿里云：http://mirrors.aliyun.com/pypi/simple/
中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
豆瓣：http://pypi.douban.com/simple/
```

#### 5.2 临时更换下载源

案例4：下载 requests 库时临时使用清华源进行下载

```
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple requests
```

案例5：下载 requests 库时临时使用豆瓣源进行下载

```
pip install -i http://pypi.douban.com/simple/ requests
```

#### 5.3 永久更换下载源

如果你不想每次下载第三方库的时候都要指定一长串的下载源地址，使用如下方法进行修改

- linux:
  修改 ~/.pip/pip.conf (没有就创建一个)， 内容如下：

```
[global]
 
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

windows用户:
直接在user目录中创建一个pip目录，如：C:\Users\xx\pip，在pip 目录下新建文件pip.ini，添加下面的代码或者按快捷键 win+R 打开用户目录%HOMEPATH%，在此目录下创建 pip 文件夹，在 pip 目录下创建 pip.ini 文件, 内容如下

```
[global] 
timeout = 6000 
index-url = https://pypi.tuna.tsinghua.edu.cn/simple 
trusted-host = pypi.tuna.tsinghua.edu.cn
```

### 6. pip 常用命令速查

```
pip --version  # 显示版本和路径
pip --help  #获取帮助
pip install -U pip #升级pip
pip install SomePackage #最新版本
pip install SomePackage==1.0.4 #指定版本
pip install SomePackage>=1.0.4 #最小版本
pip install --upgrade SomePackage #升级包，通过使用==，>=, <=, >, < 来指定一个版本号
或 pip install -U SomePackage #升级包
pip uninstall SomePackage #卸载包
pip search SomePackage #搜索包
pip show #显示安装包的信息
pip show -f SomePackage #查看指定包的详细信息
pip list #列出已安装的包
pip list -o #查看可升级的包
pip freeze #查看已经安装的包以及版本信息
pip install SomePackage -i http://pypi.intra.xxx.com/simple/  --trusted-host pypi.intra.xxx.com #安装包时指定安装路径
pip install -r requirements.txt #安装指定文件中的包
```

**命令说明**

| 命令       | 命令说明                                     |
| ---------- | -------------------------------------------- |
| install    | 安装软件包                                   |
| download   | 下载软件包                                   |
| uninstall  | 卸载软件包                                   |
| freeze     | 按着一定格式输出已安装包列表                 |
| list       | 列出已安装的软件包                           |
| show       | 显示有关已安装程序包的信息                   |
| check      | 检查并验证已安装的软件包是否具有兼容的依赖项 |
| config     | 管理本地和全局配置                           |
| search     | 在PyPI中搜索包                               |
| cache      | 缓存检查和管理pip的wheel缓存                 |
| wheel      | 根据您的要求创建.whl文件                     |
| hash       | 散列计算包存档的散列                         |
| completion | 用于命令完成的助手命令                       |
| debug      | 调试显示对调试有用的信息                     |
| help       | 显示命令帮助                                 |

**参数说明**

| 参数                       | 参数说明                                                     |
| -------------------------- | ------------------------------------------------------------ |
| -h, --help                 | 显示帮助                                                     |
| –isolated                  | 在隔离模式下独立运行pip，忽略环境变量和用户配置              |
| -v, --verbose              | 提供更多输出                                                 |
| -V, --version              | 显示版本                                                     |
| -q, --quiet                | 提供更多输出                                                 |
| –log <path>                | 详细附加日志的路径                                           |
| –no-input                  | 禁用输入提示                                                 |
| –proxy <proxy>             | 在表单中指定代理[user:passwd@]代理                           |
| –retries <retries>         | 每个连接应尝试的最大重试次数 (默认5次).                      |
| –timeout <sec>             | 设置套接字超时（默认为15秒）                                 |
| –exists-action <action>    | 路径已存在时的默认操作：（s）witch，（i）gnore，（w）ipe，（b）ackup，（a）bort。 |
| –trusted-host <hostname>   | 标记此主机或host:port pair 作为受信任的，即使它没有有效的或任何HTTPS。 |
| –cert <path>               | 到备用CA包的路径。                                           |
| –client-cert <path>        | SSL客户端证书的路径，一个包含私钥和PEM格式证书的文件。       |
| –cache-dir <dir>           | 将缓存数据存储在中。                                         |
| –no-cache-dir              | 禁用缓存                                                     |
| –disable-pip-version-check | 禁用pip版本检查                                              |
| –no-color                  | 抑制彩色输出                                                 |
| –no-python-version-warning | 对即将到来的不受支持的python关闭警告                         |
| –use-feature <feature>     | 启用可能向后不兼容的新功能                                   |
| –use-deprecated <feature>  | 启用弃用的功能，这些功能将在将来被删除                       |

## 五、Python的setuptools详解

### 1、基本概念

#### 1.1 什么是[setuptools](https://so.csdn.net/so/search?q=setuptools&spm=1001.2101.3001.7020)

```
setuptools是Python distutils增强版的集合，它可以帮助我们更简单的创建和分发Python包，尤其是拥有依赖关系的。所谓分发，就是将自己做的包，安装到操作系统内。

强调一点，setuptools是在产生包时候用，到包创作完成后，用户在使用setuptools创建的包时，并不需要已安装setuptools，只要一个启动模块(__init__.py)即可。
```

#### 1.2 setuptools功能亮点：

```
利用EasyInstall自动查找、下载、安装、升级依赖包
创建Python Eggs
包含包目录内的数据文件
自动包含包目录内的所有的包，而不用在setup.py中列举
自动包含包内和发布有关的所有相关文件，而不用创建一个MANIFEST.in文件
自动生成经过包装的脚本或Windows执行文件
支持Pyrex，即在可以setup.py中列出.pyx文件，而最终用户无须安装Pyrex
支持上传到PyPI
可以部署开发模式，使项目在sys.path中
用新命令或setup()参数扩展distutils，为多个项目发布/重用扩展
在项目setup()中简单声明entry points，创建可以自动发现扩展的应用和框架
```

#### 1.3  什么是python Eggs

```
python蛋，是用于将自己开发的安装包部署到操作系统环境下。由于python在全系统可见，因此，在python程序下，直接import  xxx就可以应用。python蛋就是python代码，用unzip解压后，一看便知。
```

### 2、安装setuptools

如果python环境没有setuptools，需要安装，下面推荐两个安装方法如下：

1) 方法1：最简单安装，假定在ubuntu下

- sudo apt-get install python-setuptools

2) 方法2：启动脚本安装

- wget http://peak.telecommunity.com/dist/ez_setup.py
- sudo python ez_setup.py

###  3、实验：创建一个工程，内部有一个程序，并安装到系统

#### 3.1 创建一个简单的包

有了setuptools后，试图创建一个工程包demo.首先创建一个临时目录mydesk用以存放demo工程。在mydesk中，创建一个子目录（名叫demo），这就是工程的根路径。

```
cd /mydesk
mkdir demo
cd demo
```

demo是工程的根目录，进入demo，创建根目录的第一个文件：setup.py文件

```
 
from setuptools import setup, find_packages
setup(
    name = "demo",
    version = "0.1",
    packages = find_packages(),
)
```

在当前目录下，执行

```
python3 setup.py bdist_egg
```

注意这条命令，形如 “ python3 setup.py xxx” 的命令很多，其中本地生成一个python-egg的命令就是xxx=bdist_egg。本地工程的“打包”动作完成。

观察demo文件夹，发现setup.py旁边多了三个文件目录：build，demo.egg-info，dist，下面一一介绍其意义。

```cobol
huatec@LAPTOP-J5TGQHQH:~/mydesk/demo$ tree
.
├── build
│   └── bdist.linux-x86_64
├── demo.egg-info
│   ├── PKG-INFO
│   ├── SOURCES.txt
│   ├── dependency_links.txt
│   └── top_level.txt
├── dist
│   └── demo-0.1-py3.8.egg
└── setup.py
```

**【1】dist目录**

在dist中生成的是egg包，这是一个将来部署到python系统的文件包，是主要组成部分。

```
file dist/demo-0.1-py2.7.egg
./dist/demo-0.1-py3.8.egg: Zip archive data, at least v2.0 to extract
```

看一下生成的.egg文件，是个zip包，解开看看先

```
~/mydesk/demo$   unzip -l ./dist/demo-0.1-py3.8.egg
 
 
Archive:  ./dist/demo-0.1-py3.8.egg
  Length      Date    Time    Name
---------  ---------- -----   ----
      176  2021-11-10 09:36   EGG-INFO/PKG-INFO
      120  2021-11-10 09:36   EGG-INFO/SOURCES.txt
        1  2021-11-10 09:36   EGG-INFO/dependency_links.txt
        1  2021-11-10 09:36   EGG-INFO/top_level.txt
        1  2021-11-10 09:36   EGG-INFO/zip-safe
---------                     -------
      299                     5 files
huatec@LAPTOP-J5TGQHQH:~/mydesk/demo$
```

我们可以看到，里面是一系列自动生成的文件。现在可以介绍一下刚刚setup()中的参数了

```
name 包名
version 版本号
packages 所包含的其他包
```

要想发布到PyPI中，需要增加别的参数，这个可以参考官方文档中的例子了。

**【2】 demo.egg-info目录**

此文件夹下，包含所有的，对python-egg的描述文件，是次要组成部分。

**【3】build目录**

此目录是具有C++、C语言的程序，编译过后的可调用库存在的地方，在python下一般不用。此文件夹是工程的重要组成部分。

上面生成的egg中没有实质的内容，除了可以看看结构，没有实际意义，下面添加一点内容。

#### **3.2 在简单的包内追加一个程序**

在demo中执行mkdir demo，再创建一个目录，在这个demo目录中创建一个__**init__**.py的文件，表示这个目录是一个包，然后写入：

```
#!/usr/bin/env python
#-*- coding:utf-8 -*-
 
def test():
    print("hello world!")
 
if __name__ == '__main__':
    test()
    
```

现在的主目录结构为下：

```
demo
|-- demo
|   `-- __init__.py
`-- setup.py
再次执行python setup.py bdist_egg后，再看egg包
 
$ unzip -l ./dist/demo-0.1-py3.8.egg
 
Archive:  ./dist/demo-0.1-py3.8.egg
  Length      Date    Time    Name
---------  ---------- -----   ----
      176  2021-11-10 11:15   EGG-INFO/PKG-INFO
      137  2021-11-10 11:15   EGG-INFO/SOURCES.txt
        1  2021-11-10 11:15   EGG-INFO/dependency_links.txt
        5  2021-11-10 11:15   EGG-INFO/top_level.txt
        1  2021-11-10 11:15   EGG-INFO/zip-safe
      124  2021-11-10 11:12   demo/__init__.py
      379  2021-11-10 11:15   demo/__pycache__/__init__.cpython-38.pyc
---------                     -------
      823                     7 files
 
```

这回包内多了demo目录，显然已经有了我们自己的东西了.下一步将其安装到python系统。

```
python setup.py install
```

这个命令会讲我们创建的egg安装到python的dist-packages目录下，我这里的位置在

```
tree /usr/local/lib/python3.8/dist-packages/demo-0.1-py3.8.egg
```

查看一下它的结构：

```
 
$ unzip -l /usr/local/lib/python3.8/dist-packages/demo-0.1-py3.8.egg
 
Archive:  /usr/local/lib/python3.8/dist-packages/demo-0.1-py3.8.egg
  Length      Date    Time    Name
---------  ---------- -----   ----
      176  2021-11-10 11:23   EGG-INFO/PKG-INFO
      137  2021-11-10 11:23   EGG-INFO/SOURCES.txt
        1  2021-11-10 11:23   EGG-INFO/dependency_links.txt
        5  2021-11-10 11:23   EGG-INFO/top_level.txt
        1  2021-11-10 11:23   EGG-INFO/zip-safe
      124  2021-11-10 11:12   demo/__init__.py
      379  2021-11-10 11:23   demo/__pycache__/__init__.cpython-38.pyc
---------                     -------
      823                     7 files
    
```

打开python终端或者ipython都行，直接导入我们的包

```
>>> import demo
>>> demo.test()
hello world!
>>>
```

好了，执行成功！

这里强调：egg文件中已经包含所有关于源程序，以及路径的信息。与/usr/local/lib/python3.8/dist-packages/下存放路径和文件完全等价

```
sudo unzip   /usr/local/lib/python3.8/dist-packages/demo-0.1-py3.8.egg
```

将看到生成程序文件路径和说明文件路径。再次强调：egg就是执行程序。 
