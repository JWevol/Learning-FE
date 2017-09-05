## 数据结构 ## 

python中**列表可变**
一句话：列表可以修改，而字符串和元组不能

### 列表中的方法 ### 

- 插入
	- list.append(x): 把一个元素添加到列表的结尾，相当于a[len(a):] = [x]
	- list.extend(L): 通过添加指定列表的所有元素来扩充列表，相当于a[len(a):] = L
	- list.insert(i, x):在指定位置插入一个元素，第一个参数是索引
- 删除
	- list.remove(x): 删除列表中值为x的第一个元素。如果没有该元素，会返回一个错误
	- list.pop([i]): 从列表的指定位置删除元素，并返回值。若没指定索引，则返回最后一个元素
	- list.clear(): 移除列表中的所有项，等于del a[:]
- 查找
	- list.index(x): 返回列表中第一个值为x的元素索引。没有就返回一个错误
	- list.count(x): 返回x在列表中出现的次数
- 排序
	- list.sort(): 对列表中的元素进行排序
	- list.reverse(): 倒排列表中的元素
- 复制
	- list.copy(): 返回列表的浅复制，等于a[:]

### 列表作为堆栈 ### 

- append()方法将元素添加到栈顶
- 不指定索引的pop()方法可以释放栈顶的元素

### 列表作为队列 ### 

### 列表推导式 ### 

### 嵌套列表解析 ### 

### del语句 ### 
- 使用del语句可以从一个列表中依索引而不是值来删除一个元素
- del也可以删除实体变量

### 元组和序列 ### 

元组由若干逗号分隔的值组成

### 集合 ### 
集合是一个无序不重复元素的集

基本功能：关系测试和消除重复元素
用大括号{}创建集合

创建一个空集合必须用set()而不是{}
后者是创建一个空的字典

集合也支持推导式

### 字典 ### 

序列以连续的整数为索引。
字典以关键字为索引，一个大括号常见一个空的字典{}

构造函数dict()直接从键值对对元组列表中构建字典。
```
>>> dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])
{'sape': 4139, 'jack': 4098, 'guido': 4127}
```
可创建任意键和值的表达式词典
```
>>> {x: x**2 for x in (2, 4, 6)}
{2: 4, 4: 16, 6: 36}
```

如果关键字只是简单的字符串，使用关键字参数指定键值对有时候更方便：
```
>>> dict(sape=4139, guido=4127, jack=4098)
{'sape': 4139, 'jack': 4098, 'guido': 4127}
```

### 遍历 ### 
注意：序列是以连续的整数以索引，字典以关键字为索引

字典中遍历，使用items方法同时解读关键字和值
```
>>> knights = {'gallahad': 'the pure', 'robin': 'the brave'}
>>> for k, v in knights.items():
...     print(k, v)
...
```

序列中遍历，使用enumerate()函数同时获取索引和对应值
```
>>> for i, v in enumerate(['tic', 'tac', 'toe']):
...     print(i, v)
...
```

同时遍历两个或更多的序列，可以使用zip()组合：
```
>>> questions = ['name', 'quest', 'favorite color']
>>> answers = ['lancelot', 'the holy grail', 'blue']
>>> for q, a in zip(questions, answers):
...     print('What is your {0}?  It is {1}.'.format(q, a))
...
```

反向遍历一个序列，首先指定这个序列，然后调用reversed()函数
```
>>> for i in reversed(range(1, 10, 2)):
...     print(i)
...
```

按顺序遍历一个序列，使用sorted()函数返回一个已排序的序列，并不修改原值:
```
>>> basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
>>> for f in sorted(set(basket)):
...     print(f)
...
```