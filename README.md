# React-Dialog
使用ReactJS构架封装了一个可以自由移动的React弹框，可以放大缩小，添加自己的Component

## 示例Demo
本程序不依赖于任何第三方库。
![image](https://github.com/hongtaodai/React-Dialog/blob/master/src/images/demo.gif)

在本地运行本程序:

```
安装：
npm install
运行Demo：
npm start

```
React-Dialog
=====

## Api
```
visible：是否可见 true|false

showFull: 是否显示最大化最小化 true|false

hideCancel：是否隐藏“取消”按钮 true|false

area：对话框大小 [500,300]

title：标题文字 默认为“信息”

okText：确定文字 默认为“确定”

cancelText：取消文字 默认为“取消”

OK: funtion() 点击ok执行的方法

Close: funtion() 点击取消或者关闭按钮执行的方法
```