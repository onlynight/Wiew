// @author: wyndam
// @email: only.night@qq.com

import Scene from '../../base/view/scene.js'
import LayoutParam from '../../base/layout/layoutParam.js'
import FrameLayout from '../../base/layout/frameLayout.js'
import LinearLayout from '../../base/layout/linearLayout.js'
import TouchEvent from '../../base/touch/touchEvent.js'

import ImageView from '../../base/view/imageView.js'
import Text from '../../base/view/text.js'
import Button from '../../base/view/button.js'
import ImageButton from '../../base/view/imageButton.js'

import DemoWindow from '../window/demoWindow.js'

export default class HomeScene extends Scene {

    constructor(x, y, width, height) {
        super(x, y, width, height)

        this.demoWindow = new DemoWindow(LayoutParam.WRAP_CONTENT, 300)
        this.demoWindow.layoutParam.gravity = Gravity.CENTER
        this.addWindow(this.demoWindow)

        this.rootView = new FrameLayout(LayoutParam.MATCH_PARENT, LayoutParam.MATCH_PARENT)
        this.addView(this.rootView)

        this.initView()
    }

    initView() {
        let that = this

        this.bg = new ImageView(LayoutParam.MATCH_PARENT, LayoutParam.MATCH_PARENT, 'images/bg_white.png')
        this.rootView.addView(this.bg)

        this.title = new Text('Wiew Demo')
        this.title.textSize = 20
        this.title.textColor = 'white'
        this.title.layoutParam.marginLeft = 10
        this.title.layoutParam.marginRight = 10
        this.title.layoutParam.marginTop = 10
        this.title.layoutParam.marginBottom = 10

        this.subTitle = new Text('sub title')
        this.subTitle.textSize = 15
        this.subTitle.textColor = 'white'
        this.subTitle.layoutParam.gravity = Gravity.RIGHT
        this.subTitle.layoutParam.marginBottom = 10

        this.titleFrame = new LinearLayout(LayoutParam.WRAP_CONTENT, LayoutParam.WRAP_CONTENT)
        this.titleFrame.layoutParam.gravity = Gravity.CENTER
        this.titleFrame.layoutParam.marginTop = 100
        this.titleFrame.layoutParam.marginLeft = 100
        this.titleFrame.layoutParam.marginRight = 50
        this.titleFrame.layoutParam.marginBottom = 50
        this.titleFrame.bgColor = '#009900'

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

        this.contentFrame = new LinearLayout(LayoutParam.WRAP_CONTENT, LayoutParam.WRAP_CONTENT)
        this.contentFrame.direction = LinearLayout.HORIZONTAL
        this.contentFrame.layoutParam.marginTop = 10
        this.contentFrame.layoutParam.marginBottom = 10
        this.contentFrame.layoutParam.marginLeft = 10
        this.contentFrame.layoutParam.marginRight = 10

        this.content1 = new Text('This is content 1.')
        this.content1.textColor = 'white'
        this.content2 = new Text('This is content 2.')
        this.content2.textColor = 'white'
        this.content3 = new Text('This is content 3.')
        this.content3.textColor = 'white'

        this.btn = new Button(LayoutParam.WRAP_CONTENT, LayoutParam.WRAP_CONTENT, 'Goto DemoScene')
        this.btn.layoutParam.gravity = Gravity.CENTER_X
        this.btn.textSize = 15
        this.btn.layoutParam.marginBottom = 10
        this.btn.setOnClickListener(function(view, touchEvent) {
            console.log('btn click')
            console.log(touchEvent)
            that.changeScene(Scene.getScene('demo'))
        })

        this.imgBtn = new ImageButton(LayoutParam.WRAP_CONTENT, LayoutParam.WRAP_CONTENT, 'images/bg_btn.png', 'Show pop window')
        this.imgBtn.layoutParam.marginBottom = 10
        this.imgBtn.layoutParam.marginLeft = 10
        this.imgBtn.setOnClickListener(function(view, touchEvent) {
            console.log('img btn click')
            that.demoWindow.visible = true
        })

        this.contentFrame.addView(this.content1)
        this.contentFrame.addView(this.content2)
        this.contentFrame.addView(this.content3)

        this.titleFrame.addView(this.title)
        this.titleFrame.addView(this.subTitle)
        this.titleFrame.addView(this.contentFrame)
        this.titleFrame.addView(this.logo)
        this.titleFrame.addView(this.btn)
        this.titleFrame.addView(this.imgBtn)

        this.rootView.addView(this.titleFrame)

        let tempFrame = new FrameLayout(LayoutParam.WRAP_CONTENT, LayoutParam.WRAP_CONTENT)
        // tempFrame.layoutParam.marginLeft = 50
        tempFrame.bgColor = '#ff0000'
        tempFrame.layoutParam.gravity = Gravity.BOTTOM | Gravity.RIGHT
        let tempText = new Text('temp text')
        tempFrame.addView(tempText)
        this.rootView.addView(tempFrame)
    }

}