## 0 sass 文件后缀名 ##
- sass: 不使用大括号和分号
- scss：使用大括号和分号，接近原生css

## 1 引入变量  ## 
变量：使用 $ 符号来标识变量

### 1.1 变量声明 ### 
```sass
$highlight-color: #f90
```

**注意**：但变量定义在规则块内使用，仅限在里面使用

### 1.2 变量引用 ### 
- 在哪用，就放哪
- 变量值可以引用变量

### 1.3 变量名用中线还是下线 ### 
开心就好，推荐中线，好看

## 2 嵌套CSS规则 ## 
重复式的选择器写法是炸的，但是 sass 只让你写一次，就可以像俄罗斯套娃那样玩。输出css文件的时候，sass会自动处理
```sass
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}

 /* 编译后 */
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content aside { background-color: #EEE }
```

### 2.1 父选择器的标识符 & ### 
一般情况下，sass 解开嵌套规则的时候就会把父选择器通过空格连接到只选择的前边，形成后代选择器的标准格式。
但遇到伪类选择器咋办，并不想以后代选择器的方式连接。

为此设计了特殊的 sass 选择器，即父选择器。
所以：当包含父选择器标识符的嵌套规则被打开时，它不会像后代选择器那样进行拼接。而是 & 被父选择器替换掉
 
### 2.2 群组选择器的嵌套 ### 
日常：
```css
.container h1, .container h2, .container h3 { margin-bottom: .8em }
```

sass:
```sass
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
```

日常：
```css
nav, aside {
  a {color: blue}
}
```

```sass
nav a, aside a {color: blue}
```

**写的虽爽，但是可能导出的文件大**

### 2.3 子组合选择器和同层组合选择器 ### 
- >, 直接子元素
- +, 同层相邻组合选择器，选择 header 元素后紧跟的 p 元素
```css
header + p { font-size: 1.1em }
```
- ~, 同层全体组合选择器，选择所有跟在 article 后的同层 article 元素，不管它们之间隔了多少其他元素
```css
article ~ article { border-top: 1px dashed #ccc }
```

sass:
```sass
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
```

如你所愿：
```css
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```

### 2.4 嵌套属性 ### 
sass中，css选择器可以嵌套，属性也可以进行嵌套。如border-*系列。
日常：
```css
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}
```

sass:
```sass
nav {
  border: {
  style: solid;
  width: 1px;
  color: #ccc;
  }
}
```

样式表越来越大，越来越大。会爆吗？怎么办呢？
处理大量的样式，就只能拆分成小的文件，通过@import（已被sass重新改造的@import）导入

## 3 导入SASS文件 ##
- css的@import
后果是：只有执行到@import语句时，才去下载css文件
- sass的@import
区别：在@import规则生成的时候就引入了css文件。不需要后缀名

下面讲的是如何使用 sass 的 @import 来处理多个 sass 文件。

### 3.1 使用SASS部分文件 ### 
当通过 @import 把 sass 样式分散成了多个文件的时候，我们只想生成几个 css 文件。那些不需要单独生成css文件的 sass 文件，我们称为局部文件。为此，我们约定，sass 局部文件的文件名以**下划线**开头

### 3.2 默认变量值 ### 
一般情况下，反复声明一个变量，只有最后一处声明有效且会覆盖前边的值
```sass
$link-color: red;
a {
color: $link-color;
}
```

若想让别人能够定制修改某些值，可以用 sass 的 !default的某些值，类似css 的 !important

区别：!default用于变量，含义是这个变量若被声明赋值了，则用声明的值，否则就用这个默认值

### 3.3 嵌套导入 ###
sass 允许 @import 命令写在 css 规则内。这种导入方式下，生成对应的 css 文件时，局部文件会被直接插入到 css 规则内导入它的地方

### 3.4 原生的CSS导入 ###
sass 兼容原生的 css，自然也支持 CSS@import。所以在下列三种情况下会生成原生的 CSS@import
- 被导入的文件名字以 .css 结尾
- 被导入文件的名字是URL地址
- 被导入文件的名字是css的url值

由于语法完全兼容css，所以可把原始的 css 文件名改为 .scss 后缀

## 4 静默注释 ##
sass 提供了不同于 css 标准注释格式的注释语法，即静默注释，其内容不好生成在css文件中

语法：以 // 开头，注释内容直到行末


## 5 混合器 ##
sass 的混合器可实现大段样式的重用

混合器使用 @mixin 标识符定义。
实例：添加跨浏览器的圆角边框
```sass
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

通过使用 @include 来使用这个混合器，放在你希望的任何地方。

### 5.1 何时使用混合器 ###
混合器可包含属性，也可包含 css 规则，包含选择器和选择器中的属性

### 5.2 混合器中的CSS规则和给混合器传参 ###
```sass
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}

a {
  @include link-colors(blue, red, green);
}

//Sass最终生成的是：

a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```

**注意**：当@inculude混合器时，难区分每个参数，和参数之间的顺序。所以 sass 提供了某些语法 $name: value的形式指定每个参数的值。
```sass
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

### 5.3 默认参数值 ###
@include 混合器为了避免不必传入所有的参数，可指定一个默认值。
```sass
@mixin link-colors(
    $normal,
    $hover: $normal,
    $visited: $normal
  )
{
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

## 6 使用选择器继承来精简CSS ##
选择器继承，通过 @extend 语法来实现。
```sass
//通过选择器继承继承样式
.error {
  border: 1px red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

.seriousError 不仅继承 .error自身的所有样式。任何更 .error 有关的组合都继承

### 6.1 何时使用继承 ###
- 混合器主要用于展示性样式的重用
- 类名是用于语义化样式的重用
- 继承是建立在语义化的关系上

现象：正在编写一个页面，给html元素添加类名，发现一个类是另一个类的细化
解决办法：
- 为两个类分别写相同的样式，但有大量重复怎么办
- 使用一个选择组写公共样式，但如果某类的样式分在不同的地方
- 使用一个混合器提供两个类相同的样式，但同二呢。

这时候该用 @extend

### 6.2 继承的高级用法 ###
任何 css 规则都可以继承其他规划。
最常用的一种高级用法：继承一个 html元素 的样式
```sass
.disabled {
  color: gray;
  @extend a;
}
```

**注意**：假如一条样式规则继承了一个复杂的选择器，那么它只会继承这个复杂选择器命中的元素所应用的样式

例子：
如果.seriousError``@extend``.important.error ， 那么.important.error 和h1.important.error 的样式都会被.seriousError继承， 但是.important或者.error下的样式则不会被继承

### 6.3 继承的工作细节 ###
和变量、混合器不同的是，继承不是用 css 样式替换@extend处的代码那么简单。为了不让自己对生成的 css 感觉奇怪，对背后的工作原理有一定了解是非常重要的

@extend的思路：你懂的

两个要点：
- 跟混合器相比，继承生成的 css 代码更少。因为继承仅仅是重复选择器，而不会重复属性。使用继承往往比混合器生成的 css 体积更小
- 继承遵从 css 层叠的规则。

混合器本身不会引起 css 层叠的问题，因为混合器把样式直接放到了 css 规则中，而继承存在样式层叠的问题。

### 6.4 使用继承的最佳实践(重要) ###
使用继承会让 css 美观。因为继承只会在生成 css 时复制选择，而不会复制段的 css 属性。

最好的方法：不要在 css 规则中使用后代选择器去继承 css 规则，不然会导致选择器失控



