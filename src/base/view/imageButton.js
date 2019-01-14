// @author: wyndam
// @email: only.night@qq.com

import Button from './button.js'
import TouchEvent from '../touch/touchEvent.js'

export default class ImageButton extends Button {

    static DEFAULT_BTN_IMG = 'images/bg_btn.png'
    static DEFAULT_BTN_PRESS_IMG = 'images/bg_btn_pressed.png'

    constructor(width, height, imgSrc = '', pressedImgSrc = '', text = '') {
        super(width, height, text, imgSrc)
        this.hasBtnBG = false
        this.pressedImgSrc = pressedImgSrc

        this.selectedImgSrc = null
    }

    touchEvent(touchEvent) {
        if (this.clickable) {
            switch (touchEvent.event) {
                case TouchEvent.EVENT_START:
                    this.img.src = this.pressedImgSrc
                    break
                case TouchEvent.EVENT_END:
                    this.img.src = this.imgSrc
                    break
                default:
                    this.img.src = this.imgSrc
                    break
            }
        }
        return super.touchEvent(touchEvent)
    }

}