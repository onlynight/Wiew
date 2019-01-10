// @author: wyndam
// @email: only.night@qq.com

import Button from './button.js'
import TouchEvent from '../touch/touchEvent.js'

export default class ImageButton extends Button {

    constructor(width, height, imgSrc = '', text = '') {
        super(width, height, text, imgSrc)
        this.hasBtnBG = false
    }

    touchEvent(touchEvent) {
        switch (touchEvent.event) {
            case TouchEvent.EVENT_START:
                this.img.src = 'images/bg_btn_pressed.png'
                break
            case TouchEvent.EVENT_END:
                this.img.src = 'images/bg_btn.png'
                break
            default:
                this.img.src = 'images/bg_btn.png'
                break
        }
        return super.touchEvent(touchEvent)
    }

}