# 最大公约数
def gcd(x, y):
    return x if y == 0 else gcd(y, x%y)

# 获取输入的两个数字
num1 = int(input('输入第一个数字：'))
num2 = int(input('输入第二个数字：'))

# 输出结果
print(num1, "和", num2, "的最大公约数为", gcd(num1, num2))
