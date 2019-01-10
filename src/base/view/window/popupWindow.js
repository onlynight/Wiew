// author: wyndam
// email: only.night@qq.com

import FrameLayout from '../../layout/frameLayout.js'

export default class PopupWindow extends FrameLayout {

    constructor(width, height) {
        super(width, height)
        this.visible = false
    }

	consumeTouchEvent(touchEvent) {
		return true
	}

}