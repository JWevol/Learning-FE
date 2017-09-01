## 变量 ## 

python不需要声明。
使用前都必须赋值，赋值才会被创建

变量就是变量，没有类型（变量指内存中对象的类型）

=赋值
```
counter = 100
```

## 多个变量赋值 ## 
python允许你同时为多个变量赋值。例如：

a = b = c = 1;

或者

为多个对象指定多个变量。例如：
a, b, c = 1, 2,  "I"


## 标准数据类型 ## 
- Number
- String
- List列表
- Tuple元组
- Sets集合
- Dictionary字典

### Number数字 ### 
python3支持int、float、bool、complex（复数）
python3只有一种整数类型int，表示为长整型

内置的type()函数可以查询变量所指的对象类型
```type(a)```
或者isinxtance来判断
```isinstance(a, int)```

#### type 和 instance 的区别 #### 
- type()不会认为子类是一种父类类型
- isinstance()会认为子类是一种父类类型

#### 使用del语句删除单个或多个对象 #### 
```
del var1
del var2, var3
```

#### 数值运算 #### 
特殊的
```
>>>2 / 4 # 除法，得到一个浮点数
0.5

>>>2 // 4 # 除法，得到一个整数
0

>>>2 ** 5 # 乘方
32
```

#### 注意点 #### 
- python可为多个变量赋值
- 一个变量通过赋值可指向不同类型的对象
- 数值除法/返回一个浮点数，返回整数用//
- 混合计算，python会把整型转换成为浮点数

### String字符串 ### 
字符串用单引号' 或双引号"，特殊字符用反斜杠\转义

字符串截取的语法格式：
```变量[头下标：尾下标]```

加号+是字符串的连接符，
星号*是赋值当前字符串，紧跟的数字是为赋值的次数

```
str = 'Runoob'
 
print (str)          # 输出字符串Runoob
print (str[0:-1])    # 输出第一个到倒数第二个的所有字符Runoo
print (str[0])       # 输出字符串第一个字符R
print (str[2:5])     # 输出从第三个开始到第五个的字符noo
print (str[2:])      # 输出从第三个开始的后的所有字符noob
print (str * 2)      # 输出字符串两次RunoobRunoob
print (str + "TEST") # 连接字符串RunoobTEST

```

#### 特别注意 #### 
- 反斜杠\可有转义特殊字符
- 不想让反斜杠发生转义，可以在字符串前面添加r
- 反斜杠可以作为续行符
- 字符串用+运算符连接，用*运算符重复
- python字符串有两种索引方式，从左往右以0开始，从右往左以-1开始
- python字符串不能改变


### List列表 ### 
List列表是Pyhon使用最多的数据类型。
列表中元素的类型可以不相同，它支持数字，字符串，嵌套列表

列表格式：
写在方括号之间，用逗号隔开

列表截取：
```变量[头下标:尾下标]```

列表操作：
+是列表连接符
*是重复操作

```
list = [ 'abcd', 786 , 2.23, 'runoob', 70.2 ]
tinylist = [123, 'runoob']
 
print (list)            # 输出完整列表['abcd', 786, 2.23, 'runoob', 70.2]
print (list[0])         # 输出列表第一个元素abcd
print (list[1:3])       # 从第二个开始输出到第三个元素[786, 2.23], 特别注意
print (list[2:])        # 输出从第三个元素开始的所有元素[2.23, 'runoob', 70.2]
print (tinylist * 2)    # 输出两次列表[123, 'runoob', 123, 'runoob']
print (list + tinylist) # 连接列表['abcd', 786, 2.23, 'runoob', 70.2, 123, 'runoob']
```

#### 特别注意 ####
字符串元素不可变，
但列表中的元素是可变的
```
>>>a = [1, 2, 3, 4, 5, 6]
>>> a[0] = 9
>>> a[2:5] = [13, 14, 15]
>>> a
[9, 2, 13, 14, 15, 6]
>>> a[2:5] = []   # 删除
>>> a
[9, 2, 6]
```

#### 内置方法 #### 
- append()
- pop()


### Tuple元组 ### 
元组tuple与列表类似，但是元祖的元素不能修改

元祖格式：
写在小括号里，元素之间用逗号隔开

```
tuple = ( 'abcd', 786 , 2.23, 'runoob', 70.2  )
tinytuple = (123, 'runoob')
 
print (tuple)             # 输出完整元组('abcd', 786, 2.23, 'runoob', 70.2)
print (tuple[0])          # 输出元组的第一个元素abcd
print (tuple[1:3])        # 输出从第二个元素开始到第三个元素(786, 2.23)
print (tuple[2:])         # 输出从第三个元素开始的所有元素(2.23, 'runoob', 70.2)
print (tinytuple * 2)     # 输出两次元组(123, 'runoob', 123, 'runoob')
print (tuple + tinytuple) # 连接元组('abcd', 786, 2.23, 'runoob', 70.2, 123, 'runoob')
```

#### 特别注意 #### 
- 修改tuple元组元素是非法的。
- 但是需要tuple的元素不可变，但它能包含可变的对象，如list列表
- 构造包含0个或1个元素的元组比较特殊，有额外的语法规则：
    1. `tup1 = () # 空元组`
    2. `tup2 = (20,) #一个元素， 需要在元素后添加逗号`
- string、list和tuple都属于sequence（序列）
- 元组可使用+操作符进行拼接


### Set集合 ### 
Set集合是一个**无序 不重复**的序列

基本功能:
- 成员关系测试
- 删除重复元素

格式:
大括号或者set()函数创建集合

注意:创建一个空集合必须用`set()`而不是`{ }`,因为`{ }`是用来创建一个空字典
```
student = {'Tom', 'Jim', 'Mary', 'Tom', 'Jack', 'Rose'}
 
print(student)   # 输出集合，重复的元素被自动去掉{'Mary', 'Jim', 'Rose', 'Jack', 'Tom'}
 
# 成员测试
if('Rose' in student) :
    print('Rose 在集合中') # Rose 在集合中
else :
    print('Rose 不在集合中')
 
 
# set可以进行集合运算
a = set('abracadabra')
b = set('alacazam')
 
print(a) # {'b', 'a', 'c', 'r', 'd'}
 
print(a - b)     # a和b的差集 {'b', 'd', 'r'}
 
print(a | b)     # a和b的并集 {'l', 'r', 'a', 'c', 'z', 'm', 'b', 'd'}
 
print(a & b)     # a和b的交集 {'a', 'c'}
 
print(a ^ b)     # a和b中不同时存在的元素 {'l', 'r', 'z', 'm', 'b', 'd'}
```

### Dictionary字典 ### 

列表是有序的对象结合,
字典是无需的对象集合.

两者区别在于:字典中的元素是通过键来存取的,而不是通过偏移存取

字典用"{}"标识,是一个无需的键key:值value对集合

其中:
  键key必须使用不可变类型

```
dict = {}
dict['one'] = "1 - 一二三四"
dict[2]     = "2 - 五六七八"
 
tinydict = {'name': 'runoob','code':1, 'site': 'www.runoob.com'}
 
 
print (dict['one'])       # 输出键为 'one' 的值1 - 一二三四
print (dict[2])           # 输出键为 2 的值2 - 五六七八
print (tinydict)          # 输出完整的字典{'name': 'runoob', 'site': 'www.runoob.com', 'code': 1}
print (tinydict.keys())   # 输出所有键dict_keys(['name', 'site', 'code'])
print (tinydict.values()) # 输出所有值dict_values(['runoob', 'www.runoob.com', 1])
```

构造函数dict()可直接从键值对序列中构建字典如下:
```
>>>dict([('Runoob', 1), ('Google', 2), ('Taobao', 3)])
{'Taobao': 3, 'Runoob': 1, 'Google': 2}
 
>>> {x: x**2 for x in (2, 4, 6)}
{2: 4, 4: 16, 6: 36}
 
>>> dict(Runoob=1, Google=2, Taobao=3)
{'Taobao': 3, 'Runoob': 1, 'Google': 2}
```

#### 内置函数 #### 
- clear()
- keys()
- values()

#### 特别注意 #### 
- 字典是一种映射类型,元素是键值对
- 字典的关键字必须为不可变类型,且不能重复
- 创建空字典使用{}

