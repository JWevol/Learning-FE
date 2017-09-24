## 1 less是什么 ##
less赋予css动态语言的特性，可以使用以下功能：
- 变量
- 继承
- 运算
- 函数

## 2 如何使用 ##
### 2.1 在客户端使用 ### 
引入.less样式文件，注意的点:
- 设置rel属性为'stylesheet/less'
```HTML
<link rel="stylesheet/less" type="text/css" href="styles.less">
```
- 同时要引入less.js，在<head>中引入
```HTML
<script src="less.js" type="text/javascript"></script>
```

注意：引入的less样式文件要在less.js前先引入

**监视模式**
监视模式是客户端的一个功能，允许改变样式的时候，客户端自动更新。
- 在URL后面加上#!watch，然后刷新页面就可以了
- 终端上运行less.watch()

### 2.2 在服务端使用 ###


## 3 语法(简单版) ## 
### 3.1 变量 ###
以@来定义变量
```less
@color: #4D926F;

#header {
  color: @color;
}
h2 {
  color: @color;
}
```
```css
#header {
  color: #4D926F;
}
h2 {
  color: #4D926F;
}
```
### 3.2 混合 ###
混合可以将一个定义好的classA轻松引入到另一个classB中，从而简单事项classB继承classA中的所有属性。还允许参数调用，类似函数
```less
.rounded-corners (@radius: 5px) {
  border-radius: @radius;
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
}

#header {
  .rounded-corners;
}
#footer {
  .rounded-corners(10px);
}
```
```css
#header {
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}
#footer {
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
}
```
**注意**：
@arguments变量，包含了所有传递进来的参数
### 3.3 嵌套 ###
选择器嵌套另一个选择器来实现继承，减少代码量
```less
#header {
  h1 {
    font-size: 26px;
    font-weight: bold;
  }
  p { font-size: 12px;
    a { text-decoration: none;
      &:hover { border-width: 1px }
    }
  }
}
```
```css
#header h1 {
  font-size: 26px;
  font-weight: bold;
}
#header p {
  font-size: 12px;
}
#header p a {
  text-decoration: none;
}
#header p a:hover {
  border-width: 1px;
}
```
### 3.4 函数和运算 ###
运算提供了加减乘除操作。可做属性值和颜色的运算
```less
@the-border: 1px;
@base-color: #111;
@red:        #842210;

#header {
  color: @base-color * 3;
  border-left: @the-border;
  border-right: @the-border * 2;
}
#footer { 
  color: @base-color + #003300;
  border-color: desaturate(@red, 10%);
}
```

```css
#header {
  color: #333;
  border-left: 1px;
  border-right: 2px;
}
#footer { 
  color: #114411;
  border-color: #7d2717;
}

```
## 4 语法(详细使用版) ## 
### 4.1 变量 ### 
深入使用：可以用变量名定义为变量
```less
@box: "I am box.";
@var: 'box';
content: @@var;
```
```css
content: "I am box.";
```

### 4.2 混合 ### 
同3.2
### 4.3 带参数的混合 ### 
深入使用：@arguments变量
@arguments变量包含了所有传递进来的参数
```less
.box-shadow (@x: 0, @y: 0, @blur: 1px, @color: #000) {
  box-shadow: @arguments;
  -moz-box-shadow: @arguments;
  -webkit-box-shadow: @arguments;
}
.box-shadow(2px, 5px);
```

```css
  box-shadow: 2px 5px 1px #000;
  -moz-box-shadow: 2px 5px 1px #000;
  -webkit-box-shadow: 2px 5px 1px #000;
```

### 4.4 模式匹配和引导表达式 ### 
根据传入的参数来改变混合的默认呈现。
```less
.mixin (@s, @color) { ... }

.class {
  .mixin(@switch, #888);
}
```

### 4.5 嵌套规则 ### 
同3.3

注意&符号的使用

### 4.6 运算 ### 
支持任何数字、颜色或变量的运算

### 4.7 color函数 ### 
提供颜色运算函数。颜色会先被转化成HSL色彩空间，然后在通道级别操作：
```less
lighten(@color, 10%);     // return a color which is 10% *lighter* than @color
darken(@color, 10%);      // return a color which is 10% *darker* than @color

saturate(@color, 10%);    // return a color 10% *more* saturated than @color
desaturate(@color, 10%);  // return a color 10% *less* saturated than @color

fadein(@color, 10%);      // return a color 10% *less* transparent than @color
fadeout(@color, 10%);     // return a color 10% *more* transparent than @color
fade(@color, 50%);        // return @color with 50% transparency

spin(@color, 10);         // return a color with a 10 degree larger in hue than @color
spin(@color, -10);        // return a color with a 10 degree smaller hue than @color

mix(@color1, @color2);    // return a mix of @color1 and @color2
```

使用起来：
```less
@base: #f04615;

.class {
  color: saturate(@base, 5%);
  background-color: lighten(spin(@base, 8), 25%);
}
```

### 4.8 Math函数 ### 
```less
round(1.67); // returns `2`
ceil(2.4);   // returns `3`
floor(2.6);  // returns `2`

percentage(0.5); // returns `50%`
```

### 4.9 命名空间 ### 
为了更好的复用，可以将一些属性集进行复用
```less
#bundle {
  .button () {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover { background-color: white }
  }
  .tab { ... }
  .citation { ... }
}
```
```less
#header a {
  color: orange;
  #bundle > .button;
}
```

### 4.10 作用域 ###
往上查找

### 4.11 Importing ###
通过@import要引入.less文件，后缀可带可不带

### 4.12 字符串插值 ###
```less
@base-url: "http://assets.fnord.com";
background-image: url("@{base-url}/images/bg.png");
```

### 4.13 避免编译 ###
有时候需要输出一些不正确的CSS语法
要输出这样的值，我们可以在字符串上加~，避免编译的值用""包起来
```less
.class {
  filter: ~"ms:alwaysHasItsOwnSyntax.For.Stuff()";
}
```

### 4.14 JavaScript表达式 ###
通过反引号来解决

















