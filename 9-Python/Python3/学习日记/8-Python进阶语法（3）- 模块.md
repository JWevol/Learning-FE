## 模块 ## 

模块是一个包含所有你定义的函数和变量的文件，后缀名.py

模块可以被别的程序引入，以使用该模块中的函数等功能

### import语句 ### 

import 模块名 # 放在脚本的顶端

一个模块只会被导入一次

### form...import... 语句 ### 

把一个模块的所有内容全都导入到当前的命名空间也是可行的

### __name__属性 ### 

一个模块被另一个程序第一次引入时，其主程序将运行。如果想在模块被引入时，模块中的某一程序块不执行，可以用__name__属性来使该程序块仅在该模块自身运行时执行

注意：每个模块都有一个__name__属性，当其值是__main__时，表明该模块自身在运行，否则是被引入

### dir()函数 ### 

内置的函数dir()可以找到模块内定义的所有名称

## 标准模块 ## 

sys模块内置在每一个python解析器中

## 包 ## 

包是一种管理python模块命名空间的形式，采用"点模块名称"

- 不用担心不同模块之间的全局变量相互影响
- 不担心模块重名

包结构
```
sound/                          顶层包
      __init__.py               初始化 sound 包
      formats/                  文件格式转换子包
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  声音效果子包
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  filters 子包
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```

目录只有包含一个叫做__init__.py的文件才会认为是包。是为了避免一些滥俗的名字，不小心影响搜索路径中的有效模块

## 从一个包中导入* ## 
