## 1 基本概念 ## 
### 1.1 三种状态 ### 
- 已提交
- 已修改
- 已暂存

### 1.2 三个工作区 ### 
- Git仓库：Git用来保存版本数据的地方
- 工作目录：编辑项目，写代码的地方
- 暂存区域：保存需要提交的文件信息

## 2 安装 ## 
我们是用过 git命令 来操作 git 的，需要安装 git 软件
下载地址：
- git: http://git-scm.com/download/win
- github for windows: http://windows.github.com

## 3 配置命令 ## 
1. 打开 git 命令窗口，配置全局用户名和邮箱
```cmd
git config --global user.name "你的昵称"
git config --global user.email "你的邮箱"
```
2. 查看全局配置的信息
```cmd
git config --global --list
git config --global user.name
```

**注意**：这里配置有个全局配置和局部配置的概念，局部配置去除掉'--global'就可以了

## 4 基础 ## 
### 4.1 创建仓库 ### 
#### 4.1.1 git init 方法 ####
1. 选择一个目录，使用 `git init` 初始化 git 仓库
2. 当前目录添加文件 index.html
3. `git add index.html`，添加到版本控制里
4. `git status`，查看当前工作区文件状态
5. `git commit -m '提交文件的相关信息'`，提交到git仓库里去
6. `git status`，再次查看当前工作区状态

#### 4.1.2 git clone <url> ####
`git clone 项目地址 <指定项目的名字>`

### 4.2 提交更新文件 ### 
1. `git status`，查看工作区文件状态
  - modified，表示文件修改了
  - Untracked files，表示文件没有让git管理，就是新增的文件
2. `git add <filename || *>`，添加到git中
3. `git status`，再次查看文件状态
  - Changes to be commiteed，表示文件已受git管理
4. `git status -s`

### 4.3 忽略文件 ### 
开发过程中，像 node_modules 这类的文件无需受到 git 管理，可以忽略这些类似的文件，下面是操作方法:
- 在**项目根目录**中创建.gitignore文件
  - 相关知识：
```
# #是gitignore的注释
# git 使用标准的glob模式匹配，类似于正则表达式
# 使用 / 开头，防止递归搜索，也就是唯一指定
# 使用 / 结尾，表示指定目录，忽略目录所需
# 要忽略指定模式意外的文件和目录，取反即可，即!
# 什么是glob模式，就是简化的正则表达式
# * 表示匹配 0 或 多个 字符
# [abc] 中括号表示匹配 任意一个括号内部的字符，如[0-9]
# ? 表示 只匹配 任意一个字符
# ** 号表示匹配任意多个中间目录，"a/**/c"，这个" a/*/c "表示任意一个目录 
```

### 4.4 查看具体的文件做了什么修改 ### 
- 当你的文件中做了修改，但是没有add，可使用
  - `git diff`，比较文件和暂存区中的文件做了哪些变化
- 当你的文件中做了修改，但是已经add，可使用
  - `git diff --staged`，比较暂存区中的文件和git仓库中的文件做了哪些变化

- 神器？
  - `git difftool --tool-help`，查看你的系统支持哪些图形化工具
  - `git difftool`，对文件做图形化展示对比，需安装一个图形化插件，告诉你是否安装
  - 进入 vimdiff 中，可查看具体的变化，`ctrl + z`可退出界面

### 4.5 代码提交 ### 
- `git commit -m '一些描述信息'`，提交暂存区的文件
- `git commit -a -m '一些描述信息'`，这种提交不需要add

### 4.6 删除文件 ### 
删除文件可以delete操作，也可以使用如下方法：
1. 清除文件，**工作区和git仓库都删掉**
`git rm '你删除的文件名'`，将删除的文件标记后，然后再commit，就OK了

**注意**：删除之前，已经把文件add但没用commit，这时需要`git rm -f '你删除的文件名'`强制删除

2. 清除文件，**工作区保留，git仓库干掉**
`git rm --cached '你的文件名称'`

3. 清除文件夹
- `git rm -r demo/`，直接删除demo文件夹下的一切
- `git rm`，可跟glob模式命令

### 4.7 文件改名 ### 
`git mv index.html ongod.html`

### 4.8 查看提交历史 ###
- `git log`，可查看git仓库中所有的提交版本信息
- `git log -p -2`，显示最近两次提交的内容差异

### 4.9 撤销操作 ### 
1. 修改版本注释信息或添加提交文件
git仓库中的每一个版本都是一个系统的项目，如果你有的文件忘记提交了，又不想重新发布一个版本的话，可以使用 git commit --amend '注释' 这样的方式来合并已提交的版本
2. 如果你的文件你提交到暂存区了，现在想让他回到工作区中
使用 git add * 可以将工作区中所有的文件提交到暂存区中
使用 git reset HEAD '你的文件名' 这条命令，回到工作区的状态
3. 如果你修改的文件你不想要了，你想回到最开始的状态
git checkout -- '你的文件名'，相当于从git仓库的最新版本中copy出文件

### 4.10 远程仓库的使用 ###
如果你的项目是从远程第三方服务器上pull下来的那么可以直接使用 remote 命令，查看当前的连接仓库的名称，使用 git remote -v 可以查看更为详细的信息

- 工作流程：
1. `git clone`，克隆远程仓库
2. `git pull`，从远程仓库上抓取
3. `git push`，代码推送到远程服务器上

- 操作过程：
1. `git clone <url>`
2. `git remote`，默认仓库是origin
3. `git pull origin master`
4. `git push origin master`

- 删除远程仓库：
1. `git remote rm origin`
- 重命名远程仓库：
1. `git remote rename pb paul`，将pb换成paul

## 5 git 分支 ## 
- `git branch one`，创建一个名叫one的分支
- `git log --oneline --decorate`，查看当前的分支状态
- `git checkout one`，分支切换
- `git log --oneline --decorate --graph -all`，查看分支之前的编辑修改信息
- `git checkout -b one`，创建并切换到分支one上

### 5.1 git 分支合并和冲突的解决办法 ### 
1. 如果创建分支之后，主支没用做修改
  - 首先切回到主支上，`git checkout master`
  - 合并one分支，`git merge one`
  - 这时候，git的主支和分支的时间点一样了
  - one分支已经没用了，可直接删除，`git branch -d one`
2. 如果创建分支之后，分支做了修改，主支被其他人修改了
  - 首先切回到主支上，`git checkout master`
  - 合并one分支，`git merge one`
  - 这时候，git的主支和分支的时间点一样了
  - one分支已经没用了，可直接删除，`git branch -d one`

  合并有可能回产生**冲突**，
  - 产生冲突了，git合并操作回暂停，等待解决冲突，使用`git status`查看哪些文件有冲突，手动找到这些文件，然后作出修改，然后再`git add`命令暂存起来，就可以告诉git冲突解决，再重复操作一遍

### 5.2 git的分支管理工具 ### 
- `git branch`，可查看所有的分支，和当前分支是哪个分支
- `git branch -v`，可查看每个分支的最后一次提交
- `git branch --merged`，可查看已经合并但没有删除的分支
  - `git branch -d one`，可删除已合并的分支
- `git branch --no-merged`，可查看没有合并的分支
  - `git branch -D one`，可强制删除没合并的分支

## 6 公钥 ## 
`ssh-keygen -t rsa`生成私钥和公钥 















