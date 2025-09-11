---
title: Linux tmux详解
tags: [Tmux]
categories: [Linux]
date: 2025-09-11
---
### 一、什么是tmux

```
对于技术人来说，好工具的选择和使用往往可以省去很多不必要的麻烦，好的开源工具很多，对于终端复用工具无脑推荐tmux。

Terminal MultipleXer,中文翻译为“终端复用器”,简称tmux.  
tmux 是一个便捷化工具，用于在一个终端窗口中运行多个终端会话。不仅如此，还可以通过 Tmux 使终端会话运行于后台或是按需接入、断开会话，这个功能非常实用。
```

### 二、为什么使用tmux

```
使用 Tmux 最大的益处在于，远程SSH访问服务器进行工作时。即使非正常掉线，它能保存当前工作状态，并保证当前任务继续运行。这一点对于远程 SSH工作的人来说是非常重要的。远程 ssh 工作时，Tmux 的多会话、多窗口、多面板的益处才充分体现了出来。使用 Tmux  
就不必开启多个标签连接多个 ssh了，所有工作在一个ssh连接上就搞定了，也不必担心突然掉线后工作丢失。也就是说断网断电后，重新登录以后可以保持运行状态，并且可以查看运行情况等。  

无论是做算法的同事，还是做测试的同事，一般都是在自己的工作电脑上安装远程连接工具（iTerm、putty、XShell、SecureCRT等），或则ssh远程远程登录到机器人上行具体的操作,在调试期间，一旦我们的远程连接工具所在的电脑出现断网或断电,或则机器人断网等情况，那么调试操作就会因此中断，中断后，程序会挂掉，当然也可以通过命令+&后台运行，但是断电或则断网后，重新登录是找不到当前程序的状况的，这是所有算法、测试同事都很头疼的一个问题。推荐tmux就是为了解决这个痛点。
```

### 三、怎么使用tmux

在开始使用 tmux 之前我们需要先了解关于 tmux 的主要元素：

![在这里插入图片描述](%E5%9B%BE%E7%89%87/tmux.png)

```
(1) session一组窗口的集合，通常用来概括同一个任务。session 可以有 　自己的名字便于任务之间的切换。 (1)  
Window 单个可见窗口。Windows 有自己的编号。 (2) Pane 窗格，被划分成小块的窗口。

通俗解释：在 tmux  
中有一个窗口的概念，我们可以这样要去理解窗口：当前呈现在我们面前的这一个工作区域就是一个窗口（当前的终端界面），很多个窗口合起来就是一个会话。窗口可以被不断切割，切割成一个个小块，这一个个小块我们叫做窗格（pane）.

总结： 一个 session 通常指一个任务里面可以有很多窗口，一个窗口又可以有很多的窗格。
```

#### 3.1 安装

```bash
$ sudo apt-get install tmux
```

**打开tmux　运行该命令会新建一个窗口为０，此时窗格就是窗口的默认会话，会话名默认为０，也可以自定义会话名字，这个后面会说到。**

```bash
$ tmux
```

按下Ctrl+d或者显式输入exit命令，就可以退出 Tmux 窗口

#### 3.2 前缀键

Tmux 窗口有大量的快捷键。所有快捷键都要通过前缀键唤起。默认的前缀键是Ctrl+b，即先按下Ctrl+b，快捷键才会生效。
举例来说，帮助命令的快捷键是Ctrl+b ?。它的用法是，在 Tmux 窗口中，先按下Ctrl+b，再按下?，就会显示帮助信息。然后，按下 ESC 键或q键，就可以退出帮助。

### 四、tmux 入门四板斧

#### 4.1 配置

首先，如果你有一个已有的 tmux 配置文件，请对其进行备份。tmux 的配置文件是 ~/.tmux.conf 
特别是要配置鼠标操作，这部分很重要不然记不住切换的一些命令

```bash
//18.04配置
#below reset tmux prefix command key
set -g prefix C-x
unbind C-b
bind C-x send-prefix
#set swap pane key
bind-key k select-pane -U
bind-key j select-pane -D
bind-key h select-pane -L
bind-key l select-pane -R
set-option -g mouse on
```

在14.04上会出现不能用出现鼠标不能选取窗口或则回滚，故将

```bash
set-option -g mouse on
```

替换为

```bash
setw -g mode-mouse on
set -g mouse-select-pane on
set -g mouse-resize-pane on
set -g mouse-select-window on
```

为了使自身的快捷键和其他软件的快捷键互不干扰，Tmux 提供了一个快捷键前缀。当想要使用快捷键时，需要先按下快捷键前缀，然后再按下快捷键。Tmux 所使用的快捷键前缀默认是组合键 Ctrl-b（同时按下 Ctrl 键和 b 键）。例如，假如你想通过快捷键列出当前 Tmux 中的会话（对应的快捷键是 s），那么你只需要做以下几步：

```
• 按下组合键 Ctrl-b (Tmux 快捷键前缀)
• 放开组合键 Ctrl-b
• 按下 s 键
```

到此基本配置已经结束，接下来就是进入实际操作部分，我们知道tumx包含会话，窗口，窗格，所一对应的操作也就是怎么样新建会话，新建窗口，新建窗格，切换会话，窗口，窗格，退出等等操作。

#### 4.2 会话操作

**新建 session** 
新建一个 session ,在终端输入一个 tmux 命令即可：

```bash
tmux
```

上面的命令会创建一个 session ，默认是通过数字编号来命令的，有时候我们需要明确的知道我们的 session 的名字，方便我们快速进入该 session ,我们可以使用如下的命令：

```bash
tmux new -s  <session-name> 
```

例如新建一个名称是 keenon 的session :

```bash
tmux new -s keenon
```

**离开 session** 
有时候我们需要离开终端，操作其他的任务，需要离开该任务，但是又想该任务继续在后台执行，这时候我们需要在 tmux 的任何一个窗格中输入如下命令：

```bash
tmux detach
```

也可以使用快捷键

```bash
 ctrl + b   d 
```

这里解释一下该快捷键，上面已经提到过快捷键。 tmux 离开 session 的快捷键是 d ,但是在 tmux 当中任何快捷键都需要搭配 tmux 的前缀按键 ctrl + b 来唤醒，所以改快捷键的操作是先按 ctrl +b ,紧接着按下按键 d ,这样我们便顺利的离开当前 session 了。

**查看 session 列表** 
有时候我们可能同时操作了好几个 session， 我们可以通过如下的命令来查看我们目前操作了几个session：

```bash
tmux  ls  
```

也可以通过快捷键操作

```bash
 ctrl + b s 
```

列出所有的 session。

**进入 session** 
离开 session 之后，有时候我们还需要对某个 session 进行操作，这时候可以通过如下的操作：

```bash
tmux attach -t  <session-name>
```

例如我的 session 名称是 keenon , 就可以通过 tmux attach -t keenon 顺利进入 session,  
也可以通过 tmux a -t keenon，该命令中的 a 是 attach 的简写形式

**关闭 session** 
如果需要关闭 session, 可以通过执行如下的命令即可：

```bash
tmux kill-session -t <session-name>
```

例如关闭zempty 这个session :

```bash
tmux kill-session -t zempty
```

也可以使用快捷键 ctrl + d 来关闭当前的 session。

**切换 session**  
执行命令,可以从当前的 session 快速切换到另一个 session：

```bash
tmux switch -t <session-name>
```

**重命名 session**

```bash
tmux rename-session -t <old-session-name> <new-session-name>
```

例如： `tmux rename-session -t keenon wuxi` 该命令会把 keenon这个 session 重新命名为 wuxi.  
也可以通过快捷键 ctrl +b $ 来重命名当前的session 。

**session 总结**

```
session 在 tmux 操作当中非常重要，希望你可以熟练的使用以上操作： 新建 session -> 离开 session -> 查看  
session 列表 -> 进入 session -> 关闭 session -> 不同 session 之间的切换 -> 重命名session 。
```

#### 4.3 窗口操作

**新建 切换 关闭**

输入tmux后进入到终端复用器，其会话名默认为0,依次累加。

```bash
& 关闭当前窗口
l 前后窗口间互相切换
. 修改当前窗口编号，相当于重新排序
f 在所有窗口中查找关键词
, 重命名当前窗口
w 列出所有窗口
% 水平分割窗口
" 竖直分割窗口
n 选择下一个窗口
p 选择上一个窗口
0~9 选择 0~9 对应的窗口
```

#### 4.４ 窗格操作

**分屏（新建）切换 关闭**

好了，至此，你已经掌握了最最基本的 tmux 使用方法了。当然，tmux 还有很多更高级的用法，但是为了方便调试，用到基本功能就足够了。

```bash
>tmux new　　创建默认名称的会话（在tmux命令模式使用new命令可实现同样的功能，其他命令同理，后文不再列出tmux终端命令）
>tmux new -s mysession　　             创建名为mysession的会话 
>tmux ls　　                                             显示会话列表 
>tmux a -t mysession　　                   连接指定会话 
>tmux rename -t s1   s2　　               重命名会话s1为s2
>tmux kill-session　　                         关闭上次打开的会话
>tmux kill-session -ts1　　                关闭会话s1
>tmux kill-session -a -t s1　　          关闭除s1外的所有会话 tmux
>kill-server　　                                       关闭所有会话
```
