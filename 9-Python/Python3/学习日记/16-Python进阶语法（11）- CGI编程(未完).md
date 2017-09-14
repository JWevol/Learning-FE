## 什么是CGI ## 
CGI(common gateway interface)，通用网关接口，是一段程序，运行在服务器上：http服务器，提供同客户端HTML页面的接口

## 网页浏览 ## 
点击一个url的流程：
1. 浏览器访问url并连接到http web服务器
2. web服务器接收到请求信息后解析url，并查找访问文件是否在服务器上是否存在
3. 浏览器从服务器上接收信息，并显示接收的文件或者错误信息

## CGI架构图 ## 
![CGI架构图](https://i.imgur.com/R5WMGG0.png)

## web服务器支持 ## 
确保web服务器支持CGI，并且已经配置好了CGI的处理程序

apache 支持CGI配置：
设置CGI目录：
```python
ScriptAlias /cgi-bin/ /var/www/cgi-bin/
```