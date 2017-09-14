## 正则表达式 ## 
特殊的字符序列，常用于检查字符串匹配

python1.5版本之后提供re模块，提供Perl风格的正则表达式模式

## re模块的方法 ##
### re.match方法 ### 
re.match 从字符串的**起始位置**匹配一个模式，如果不是**起始位置匹配成功**的话，match()返回none
```python
re.match(pattern, string, flags=0) 

# pattern(正则表达式)/string(字符串)
# /flags(标识位，用于控制匹配方式，是否区分大小写，多行匹配)
```

### re.search方法 ### 
re.search 扫描整个字符串并返回第一个成功的匹配
函数语法：
```python
re.search(pattern, string, flags=0)
```

### re.match与re.search的区别 ### 

re.match只匹配字符串的开始
re.search匹配整个字符串，直到找到一个匹配


### re.sub替换 ### 
```python
re.sub(pattern, repl, string, count=0)

# repl(替换的字符串，也可为一个函数)
# string(要被查找替换的原始字符串)
# count(模式匹配后替换的最大次数，0为所有匹配)
```

## 正则表达式的常见语法 ## 
