# list 常用操作

li = ['wo', '2', 'l', 'an']

print('li[1]是：', li[1])

# 负数索引
print('li[-1]是：', li[-1])

# list 增加
li.append('forever')
print('li增加后是：', li)

li.insert(1, 'forever')
print('li增加后是：', li)

li.extend(['you', 'know'])
print('li增加后是：', li)


# list 搜索
searchIndex = li.index('an')
print('索引位置为：', searchIndex)

# list 删除
li.remove('forever')
print('删除第一次出现forever之后：', li)

# li.pop会做两件事，删除最后一个元素，并返回删除的值

# list 运算符
print('+运算符之后：', li + ['?'])
print('*运算符之后：', li * 2)

# 使用 join 链接 list变成字符串


# list 分割字符串
str = '-'.join(li)
print('变成了字符串：', str)

# 字符串分割成数组
print('变成数组：', str.split('-'))

# list的映射解析


# 字典解析(json解析)
params = {"name":"wj", "behavior":"chouchou", "one":"lan"}

print('keys解析成了：', params.keys())
print('values解析成了：', params.values())
print('items解析成了：', params.items())

# list 过滤