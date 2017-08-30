## 编码 ## 
默认情况下，源码文件以 **UTF-8** 编码，所有的字符串都是 **unicode** 字符串

```
# -*- coding: cp-1252 -*-
```
## 标识符 ## 

1. 第一个字符是字母或者_
2. 其他部分由字母、数字、下划线组成
3. 大小写敏感

## 保留字 ## 
自带的keyword模块，可以输出当前版本的所有关键字
```
>>> import keyword
>>> keyword.kwlist
['False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

## 注释 ## 

单行注释以 # 开头
多行注释以 多个# 开头

## 行与缩进 ## 

python特色菜是以 **缩进** 来表示 **代码块** ，不需要使用大括号{}。

缩进空格可变，但得保证同一个代码块得语句必须包含相同的缩进空格数

## 多行语句 ## 
python 如果遇到一条语句很长，可以使用 反斜杠\ 来实现多行语句，例如：

```
total = item_one + \
		item_two + \
		item_three
```

## 数据类型 ## 

python中数有四种类型：整数、长整数（比较大的整数）、浮点数和复数（数学的那种复数）

## 字符串 ##
1. 单引号和双引号使用一样
2. 三引号''' 或者 """  可以指定一个多行字符串
3. 转义符 '\'

**以下感觉不知道有啥用**

4. 自然字符串， 通过在字符串前加r或R。 如 r"this is a line with \n" 则\n会显示，并不是换行。
5. python允许处理unicode字符串，加前缀u或U， 如 u"this is an unicode string"。
6. 字符串是不可变的。
7. 按字面意义级联字符串，如"this " "is " "string"会被自动转换为this is string。

```
word = '字符串'
sentence = "这是一个句子。"
paragraph = """这是一个段落，
可以由多行组成"""
```




