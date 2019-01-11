Wiew
====

简易微信小游戏view系统以及touch系统。你可以想写Android UI一样写界面布局，处理点击事件。

## 预览

![preview](./readme_imsages/Wiew.gif)

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

### 常用布局

目前只实现了 ```FrameLayout``` 以及 ```LinearLayout``` 这两种布局，已经能够应付大多数状况。

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

自己处理点击事件：

```javascript
this.logo = new ImageView(50, 50, 'images/ic_logo.png')
this.logo.layoutParam.gravity = Gravity.CENTER
this.logo.layoutParam.marginBottom = 10
this.logo.setOnTouchListener(function(touchEvent) {
	switch (touchEvent.event) {
		case TouchEvent.EVENT_START:
			console.log('touch start')
			break
		case TouchEvent.EVENT_MOVE:
			console.log('touch move')
			break
		case TouchEvent.EVENT_END:
			console.log('touch end')
			break
		case TouchEvent.EVENT_CANCEL:
			console.log('touch cancel')
			break
		default:
			break
	}
	return true
})
```

## 框架结构

为了方便管理界面切换，这里使用了类似 android 中 Activity 的设计，这里我们将其命名为场景 Scene。Scene 即为每次呈现给用户的整个页面，我们需要切换其他页面显示时切换 Scene 即可。框架结构图如下：

![window scene frame](./readme_imsages/scenes.png)
