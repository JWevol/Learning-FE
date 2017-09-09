## 语法错误 ## 
解析错误

## 异常 ## 
以错误信息的形式展现

### 异常处理 ### 
try语句
```
try:
	语句
except ValueError:
	语句
```

### 抛出异常 ### 
raise语句
```
raise NameError('信息')
```

### 定义清理行为 ### 
finally

不管try之举是否异常，finallt子句都会执行