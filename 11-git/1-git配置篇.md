## 1 Git和GitHub是什么 ##
### 1.1 Git是开源的分布式版本控制系统，Github是一个网站而已 ###
起源：
 简单来说，就是为了团队开发，工程进行版本式控制而产生的
优点：
- 能够追踪源码文件
- 能够得到某个时间点上的工程项目状态
- 能够退回到某个版本上

### 1.2 Git安装 ### 
#### 1.2.1 如何安装 #### 
- 准备一个git软件，下载地址：
https://git-scm.com/downloads

一般默认安装即可，强迫症可以更换路径，选择你想安装的位置

#### 1.2.2 如何配置 #### 
Git 有三种传输方式，
1、先讲一下SSH方式传输:

一般安装完后，右键就会出现
 Git GUI Here
 Git Bash Here

简单理解，就是在这打开Git图像界面，在这打开Git命令界面

右键单击Git Bash Here,就会出现一个命令行的界面，跟cmd差不多
输入ssh-keygen -t rsa -C "你的Github邮箱"

回车后，会提示生成一个文件再某路径，后面默认回车即可

2、将SSH配置到Github网站中

第一步：进入刚刚生成的ssh目录，一般默认生成在
C:\Documents and Settings\用户名\.ssh

第二布：进去打开id_rsa.pub，复制里面内容

第三步：进入Github网站，点击头像右边的小三角形，找到setting，进去后左边的侧边栏SSH and GPG keys

第四步：点击新增 new SSH key，会有两个输入框，
- title 主要输入你这个key是用在哪个电脑的，
- key 就是你复制的内容了，就是id_rsa.pub里面的内容

第五步：回到命令行，输入ssh -T git@github.com，验证你这个是否和github绑定成功

#### 1.2.3 配置本地邮箱 #### 

作用就是：你把本地的代码上传到github上之后，需要显示的一些信息

命令为： 
 git config --global user.name "你的用户名"
 git config --global user.email "你的邮箱"  //不一定要求是注册邮箱，因为只是上传信息而已，展示作用

上面配置的是全局信息，就是说，你本地不止会有一个git目录。
当你上传时，没有指定配置，就会用这个信息

当你不想用这个信息呢？那咋办
可以在你的git项目路径打开命令行里，这样配置
git config user.name "你的用户名"
git config user.eamil "你的邮箱"

你在上传的话，就会展示这个信息



