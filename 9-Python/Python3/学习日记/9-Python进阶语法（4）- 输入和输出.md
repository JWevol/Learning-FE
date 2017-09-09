## 输出格式美化 ## 
### 输出值的方式 ###

表达式语句和print()函数

第三种方式是使用文件对象的wirte()方法，标准输出文件可以用sys.stdout引用

希望输出形式多样： str.format()
输出值转字符串： repr()或者str()

## 读取键盘输入 ## 

提供input()内置函数，默认的标准输入是键盘

## 读和写文件 ## 
open()将会返回一个file对象

语法格式：`open(filename, mode)`
filename是访问的文件名称
mode是打开文件的模式，默认为只读

### 文件对象的方法 ### 
#### f.read() #### 
f.read()读取一定数目的数据，返回字符串或字节对象

#### f.readline() #### 
f.readline()从文件中读取单独的一行。换行符为`\n`。
若返回一个空字符串，说明已读取到最后一行

#### f.readlines() #### 
f.readlines()将返回该文件中包含的所有行

#### f.write() ####
f.write(string)将string写入到文件中，然后返回写入字符数

#### f.close ####

