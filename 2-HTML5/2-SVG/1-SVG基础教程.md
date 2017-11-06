## 1 SVG是什么？ ## 
- 可缩放矢量图形（Scalable Vector Graphics）
- 使用**XML格式**定义图像

格式:
```svg
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black"
  stroke-width="2" fill="red" />
</svg>
```
1. 第一行代表：XML声明
  - standalong属性，规定SVG文件是否独立，值为no，就意味着SVG文档引用一个外部文件
2. 第二行和第三行代表：引用了这个外部的SVG DTD，位于 "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"。该 DTD 位于 W3C，含有所有允许的 SVG 元素。
3. SVG代码以<svg>作为标签，这是根元素。
  - width和height可设置SVG的宽高
  - version则是SVG的版本
  - xmlns可定义SVG命名空间
4. circle标签代表画圆
  - rx, ry: 代表圆心
  - stroke, stroke-width: 代表形状的轮廓  

**注意**：所有的标签都必须关闭

## 2 SVG如何导入? ##
- embed标签
- object标签
- 直接嵌入
- a标签链接
- iframe标签（不用）

### 2.1 embed ### 
- 优点：主流浏览器支持，并允许使用脚本
- 缺点：不推荐在HTML4和XHTML上使用，在HTML5上允许
```HTML
<embed src="circle1.svg" type="image/svg+xml" />
```

### 2.2 object ###
- 优点：主流浏览器支持，支持HTML4、XHTML，HTML5
- 缺点：不允许使用脚本
```HTML
<object data="circle1.svg" type="image/svg+xml"></object>
```

### 2.3 直接嵌入 ### 
```HTML
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>
```

### 2.4 a标签链接 ### 
```HTML
<a href="circle1.svg">View SVG file</a>
```

## 3 预定义的形状元素 ##
- rect, 矩形
- circle, 圆形
- ellipse, 椭圆
- line, 线
- polyline, 折线
- polygon, 多边形
- path, 路径

公用属性（用在style里，有些可在元素属性里写）：
- stroke, 边框颜色
- stroke-width, 边框宽度
- stroke-opacity，边框透明度
- opacity, 元素透明度
- fill, 填充

### 3.1 rect特有属性 ###
- x, y, 定义左上角的位置
- rx, ry, 定义圆角的位置
- width, height, 定义宽高

### 3.2 circle特有属性 ###
- cx, cy, 定义圆心
- r, 半径

### 3.3 ellipse特有属性 ###
- cx, cy, 定义椭圆中心的坐标
- rx, ry, 定义椭圆的水平，垂直半径

### 3.4 line特有属性 ###
- x1, y1, 定义线条的开始坐标
- x2, y2, 定义线条的结束坐标

### 3.5 polygon(希腊语)特有属性 ###
- 不少于三个边的图形
- polygon(希腊语), poly意味着many, gon意味着angle
- points, 定义多边形每个角的坐标
  - 格式，以逗号","区分xy坐标，空格" "区分点

- 新增CSS的fill-rule属性，定义图形填充规则

#### 3.5.1 polyline特有属性 ####
- 创建任何只有直线的形状

### 3.6 path特有属性 ###
- 定义一个路径
- 路径属性：
  - M, moveto
  - L, lineto
  - H, horizontal lineto
  - V, vertical lineto
  - C, curveto
  - S, smooth curveto
  - Q, quadratic bezier curve
  - T, smooth quadratic
  - A, elliptical arc
  - Z, closepath

**注意**：大写代表绝对路径，小写代表相对路径

过于复杂，不深入，只是简单入门

### 3.7 text属性 ###
- 可配合路径，制造文字效果

## 4 通用的Stroke 属性 ## 
- stroke, 可定义线、颜色、元素轮廓**颜色**
- stroke-width, 可定义线、颜色、元素轮廓**宽度**
- stroke-linecap, 可定义不同类型的开放路径的终结
- stroke-dasharray, 可创建虚线

## 5 滤镜 ## 
- 特殊效果

## 6 模糊 filter ## 
- 滤镜都定义在des标签元素里
- filter定义SVG滤镜，需用必要的id属性，来进行使用
```svg
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="f1" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f1)" />
</svg>
```

## 7 阴影 feOffset ## 
- 创建阴影效果

## 8 渐变 Gradient##
- linearGradient, 线性渐变
- radialGradient, 径向渐变
 





 