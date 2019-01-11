Wiew
====

简易微信小游戏view系统以及touch系统。你可以想写Android UI一样写界面布局，处理点击事件。

## 布局

你可以像使用android布局一样使用Wiew的布局：

```javascript
this.contentView = new FrameLayout(LayoutParam.MATCH_PARENT, LayoutParam.MATCH_PARENT)
```

设置布局参数&控件属性：

```javascript
this.title = new Text('Window Title')
this.title.textSize = 20
this.title.textColor = 'white'

this.title.layoutParam.gravity = Gravity.CENTER_X | Gravity.TOP
this.title.layoutParam.marginTop = 20
```

添加控件：

```javascript
this.contentView.addView(this.title)
```


## Touch 事件分发&处理

设置点击事件：

```javascript
this.btnDismiss = new Button(LayoutParam.WRAP_CONTENT, LayoutParam.WRAP_CONTENT, 'dismiss')
this.btnDismiss.layoutParam.gravity = Gravity.CENTER_X | Gravity.BOTTOM
this.btnDismiss.layoutParam.marginBottom = 20

this.btnDismiss.setOnClickListener(function(){
	console.log('button click')
})
```