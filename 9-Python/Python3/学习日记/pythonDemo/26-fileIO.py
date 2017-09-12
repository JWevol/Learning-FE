# 文件IO

# 写文件
with open('./txt/test1.txt', 'wt') as out_file:
    out_file.write('你能看到我吗？')

# 读文件
with open('./txt/test1.txt', 'rt') as in_file:
    text = in_file.read()

print(text)