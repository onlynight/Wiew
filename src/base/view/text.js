// @author: wyndam
// @email: only.night@qq.com

import Sprite from './sprite.js'
import LayoutParam from '../../base/layout/layoutParam.js'

export default class Text extends Sprite {

    constructor(text, width = LayoutParam.WRAP_CONTENT, height = LayoutParam.WRAP_CONTENT, imgSrc = '') {
        super(0, 0, width, height, {
            hasImg: imgSrc != '',
            imgSrc: imgSrc
        })

        this.text = text || ''
        this.textColor = 'black'
        this.textSize = 10
        this.roundCornerRadius = 4
        this.textGravity = Gravity.CENTER
        this.textWidth = 0
        this.textHeight = this.textSize
        this.textX = this.x
        this.textY = this.y
    }

    measure(ctx, parentWidth, widthMode, parentHeight, heightMode) {
        ctx.font = this.__number2FontSize(this.textSize)
        this.textWidth = ctx.measureText(this.text).width
        this.textHeight = this.textSize

        if (this.layoutParam.width == LayoutParam.WRAP_CONTENT) {
            this.width = this.textWidth
            this.height = this.textHeight
        }

        this.textX = this.x
        this.textY = this.y
    }

    layout() {
        if (this.width > this.textWidth) {
            if (this.textGravity == Gravity.CENTER) {
                this.textX = this.x + (this.width - this.textWidth) / 2
            }
        }

        if (this.height > this.textHeight) {
            if (this.textGravity == Gravity.CENTER) {
                this.textY = this.y + (this.height - this.textHeight) / 2
            }
        }
    }

    draw(ctx) {
		super.draw(ctx)

        ctx.fillStyle = this.textColor
        ctx.font = this.__number2FontSize(this.textSize)
        ctx.fillText(this.text, this.textX, this.textY + this.textSize)
    }

    __number2FontSize(number) {
        return number + "px ''"
    }

}