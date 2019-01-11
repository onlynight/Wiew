// @author: wyndam
// @email: only.night@qq.com

import Scene from '../../base/view/scene.js'

import LinearLayout from '../../base/layout/linearLayout.js'
import FrameLayout from '../../base/layout/frameLayout.js'
import LayoutParam from '../../base/layout/layoutParam.js'
import Text from '../../base/view/text.js'
import ImageView from '../../base/view/imageView.js'
import Button from '../../base/view/button.js'

export default class DemoScene extends Scene {

    constructor(x, y, width, height) {
        super(x, y, width, height)

        this.rootView = new FrameLayout(LayoutParam.MATCH_PARENT, LayoutParam.MATCH_PARENT)
        this.addView(this.rootView)

        this.initView()
    }

    initView() {
        let that = this
        this.bg = new ImageView(LayoutParam.MATCH_PARENT, LayoutParam.MATCH_PARENT, 'images/bg_white.png')
        this.rootView.addView(this.bg)

        this.title = new Text('Wiew Demo Scene Title')
        this.title.textSize = 20
        this.title.layoutParam.gravity = Gravity.CENTER

        this.btnBack = new Button(LayoutParam.WRAP_CONTENT, LayoutParam.WRAP_CONTENT, '< Back')
        this.btnBack.layoutParam.marginLeft = 10
        this.btnBack.layoutParam.marginTop = 10
        this.btnBack.setOnClickListener(function() {
			that.changeScene(Scene.getScene('home'))
        })

        this.rootView.addView(this.btnBack)

        this.rootView.addView(this.title)
    }

}