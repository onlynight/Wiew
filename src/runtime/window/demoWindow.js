// @author: wyndam
// @email: only.night@qq.com

import PopupWindow from '../../base/view/window/popupWindow.js'
import LayoutParam from '../../base/layout/layoutParam.js'
import FrameLayout from '../../base/layout/frameLayout.js'
import Text from '../../base/view/text.js'
import Button from '../../base/view/button.js'

export default class DemoWindow extends PopupWindow {

    constructor(width, height) {
        super(width, height)
        this.bgColor = '#49e596'
        this.initView()
    }

    initView() {
		let that = this

        this.contentView = new FrameLayout(LayoutParam.MATCH_PARENT, LayoutParam.MATCH_PARENT)
        this.addView(this.contentView)

        this.title = new Text('Window Title')
        this.title.textSize = 20
        this.title.textColor = 'white'
        this.title.layoutParam.gravity = Gravity.CENTER_X | Gravity.TOP
        this.title.layoutParam.marginTop = 20

		this.btnDismiss = new Button(LayoutParam.WRAP_CONTENT, LayoutParam.WRAP_CONTENT, 'dismiss')
		this.btnDismiss.layoutParam.gravity = Gravity.CENTER_X | Gravity.BOTTOM
		this.btnDismiss.layoutParam.marginBottom = 20
		this.btnDismiss.setOnClickListener(function(){
			that.visible = false
		})

        this.contentView.addView(this.title)
		this.contentView.addView(this.btnDismiss)
    }

}