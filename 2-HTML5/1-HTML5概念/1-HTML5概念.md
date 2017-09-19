## 1. HTML5概念 ##
- 是一个新版的HTML语言，具有新的元素、属性和行为
- 有更大的技术集，允许多样化和强大的网站和应用程序

## 2. 特性 ## 
- 语义：能够让你更恰当地描述内容是什么
- 连通性：使用新的技术与服务器通信
- 离线与存储：在客户端本地存储数据以及更高效地离线运行
- 多媒体：video和audio
- 2d/3d绘图：提供了一个更加分化范围的呈现选择
- 性能与继承：提供了非常显著的性能优化和更有效的计算机硬件使用（不明所以）
- 设备访问 Device Access：能够处理各种输入和输出设备
- 样式设计：能够实现更强大的复杂主题

### 2.1 语义 ### 
#### HTML5中的节段和提纲 ####
```HTML
<section> //文档中的一个区域，一般可通过标题辨识section
<article> // 表示文档、页面、应用或网站中的独立可复用结构
<nav>     // 描绘一个含有多个超链接的区域或页内其他部分
<header>  //表示一组引导性的帮助，可能包含标题或logo
<footer> //一个章节或一个页面的页脚
<aside>  //与页面无关，可独立出来的侧边栏
<hgroup> //一个段的标题
``` 

#### HTML5中的音频和视频 ####
```
<audio>
<video>
```

#### 新的语义元素 #### 
```HTML
<figure>
<figcaption>
<data>
<time>
<progress>
<main>
```

#### iframe的改进 ####
使用sandbox, seamless, srcdoc属性，可以控制<iframe>元素的安全级别以及期望的渲染

#### HTML5兼容的解析器 ####

用于把HTML5文档的字节转换成DOM的解释器

### 2.2 通信 ### 
#### web sockets ####
允许页面和服务器之间建立持久连接并通过这种方法交换非HTML数据

#### Server-sent events #### 
允许服务器向客户端**主动**推送事件

#### webRTC #### 
RTC（即时通信）

### 2.3 离线与存储 ### 
#### 离线资源：应用程序缓存（已废弃） #### 

#### 在线和离线事件 #### 
为了构建一个支持离线的web应用

api接口:
```javascript
navigator.onLine
```

#### DOM存储 ####
```javascript
localStorage
sessionStorage
```

#### IndexedDB #### 
在浏览器中存储大量结构化数据，并能使用索引进行高性能检索

#### 多文件选择 ####
input的新属性multiple
FileReader

### 2.4 多媒体 ### 
#### 使用音视频 #### 
#### 使用webRTC ####
#### 使用Camera API ####
允许使用，操作计算机摄像头，并从中存储图像

#### Track和webVTT ####
track支持字母和章节
webvtt支持文本轨道格式

### 2.5 3D，图像和效果 ### 
#### canvas 教程 ####
#### 针对canvas的api ####

#### webGL ####
绘制web3D

#### SVG ####
一个基于XML的可直接嵌入到HTML中的矢量图像格式


### 2.6 性能和集成 ### 
#### web workers #### 
能够把javascript计算委托给后台线程，防止交互型事件变得缓慢

#### XMLHttpRequest ####
异步读取页面的某些部分，动态显示内容

#### history api ####
允许对浏览器历史记录操作

#### contentEditable属性 ####
任何一个元素可编辑

#### 拖放 ####

#### 焦点管理 #### 
activeElement
hasFocus

#### 基于web的协议处理程序 #### 
`navigator.registerProtocolHandler()`


#### requestAnimationFrame #### 
控制动画渲染

#### 全屏API #### 


### 2.7 设备访问 ### 
#### 使用camera api #### 
允许使用和操作摄像头，并存取照片

#### 触控事件 #### 
对用户按下触控屏的事件做出反应

#### 使用地理位置定位 #### 
api: navigator.geolocation

#### 检测设备方向 #### 
实验中的功能

#### 指针锁定api #### 

### 2.8 样式 ### 
#### 新背景样式 #### 
- box-shodw画阴影
- 设备多背景
 
#### 更精美的边框 #### 
- border-image
- border-radius

#### 样式设置动画 #### 
- transiton过渡，不同状态间设置动画
- animation动画，设置动画不需要触发事件

#### 排版改进 #### 
- text-overflow和hyphenation
- 文字阴影
- decorations
- @font-face

#### 新的展示性布局 #### 
- 多列布局
- flex布局