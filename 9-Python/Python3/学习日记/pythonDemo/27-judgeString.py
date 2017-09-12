# 字符串判断

str = 'lanlanlan.lan'

print(str.isalnum()) # 判断所有字符都是数字或者字母
print(str.isalpha()) # 判断所有字符都是字母
print(str.isdigit()) # 判断所有字符都是数字
print(str.islower()) # 判断所有字符都是小写
print(str.isupper()) # 判断所有字符都是大写
print(str.istitle()) # 判断所有单词都是首字母大写
print(str.isspace()) # 判断所有字符都是空白字符、\t、\n、\r

# 字符串大小写转换
print(str.upper()) # 所有小写字母变大写字母
print(str.lower()) # 所有大写字母变小写字母
print(str.capitalize()) # 首字母大写
print(str.title()) # 每个单词的第一个字母大写
