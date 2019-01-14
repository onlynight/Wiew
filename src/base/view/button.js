// author: wyndam
// email: only.night@qq.com

import Text from './text.js'
import TouchEvent from '../touch/touchEvent.js'
import LayoutParam from '../layout/layoutParam.js'

export default class Button extends Text {

    static DEFAULT_HEIGHT = 30
    static DEFAULT_WIDTH = 100

    constructor(width, height, text = '', imgSrc = '') {
        super(text, width, height, imgSrc)

        this.bgNormalColor = '#15dc67'
        this.bgPressColor = '#0fc359'

        this.btnColor = this.bgNormalColor
        this.textColor = 'white'
        this.textSize = 15
        this.hasBtnBG = true
        this.clickable = true
    }

    touchEvent(touchEvent) {
        if (this.clickable) {
            switch (touchEvent.event) {
                case TouchEvent.EVENT_START:
                    this.btnColor = this.bgPressColor
                    break
                case TouchEvent.EVENT_END:
                    this.btnColor = this.bgNormalColor
                    break
                default:
                    this.btnColor = this.bgNormalColor
                    break
            }
        } else {
            this.btnColor = this.disableBgColor
        }

        return super.touchEvent(touchEvent)
    }

    measure(ctx, parentWidth, widthMode, parentHeight, heightMode) {
        super.measure(ctx, parentWidth, widthMode, parentHeight, heightMode)

        if (this.layoutParam.width == LayoutParam.WRAP_CONTENT) {
            if (this.width < Button.DEFAULT_WIDTH) {
                this.width = Button.DEFAULT_WIDTH
            }
        } else if (this.layoutParam.width == LayoutParam.MATCH_PARENT) {
            this.width = parentWidth
        } else {
            this.width = this.layoutParam.width
        }

        if (this.layoutParam.height == LayoutParam.WRAP_CONTENT) {
            if (this.height < Button.DEFAULT_HEIGHT) {
                this.height = Button.DEFAULT_HEIGHT
            }
        } else if (this.layoutParam.height == LayoutParam.MATCH_PARENT) {
            this.height = parentHeight
        } else {
            this.height = this.layoutParam.height
        }

        if (this.width == this.textWidth) {
            this.width += 10
        }

        if (this.height == this.heightWidth) {
            this.height += 10
        }
    }

    draw(ctx) {
        if (this.enableSelect) {
            this.btnColor = this.selected ? this.selectedColor : this.bgNormalColor
        }

        if (this.hasBtnBG) {
            ctx.beginPath()
            ctx.strokeStyle = this.btnColor
            ctx.fillStyle = this.btnColor

            ctx.arc(this.x + this.roundCornerRadius, this.y + this.roundCornerRadius,
                this.roundCornerRadius, Math.PI, Math.PI / 2 * 3)
            ctx.arc(this.x + this.width - this.roundCornerRadius, this.y + this.roundCornerRadius,
                this.roundCornerRadius, Math.PI / 2 * 3, Math.PI * 2)
            ctx.arc(this.x + this.width - this.roundCornerRadius, this.y + this.height - this.roundCornerRadius,
                this.roundCornerRadius, 0, Math.PI / 2)
            ctx.arc(this.x + this.roundCornerRadius, this.y + this.height - this.roundCornerRadius,
                this.roundCornerRadius, Math.PI / 2, Math.PI)
            ctx.lineTo(this.x, this.y + this.roundCornerRadius)

            ctx.stroke()
            ctx.fill()

            ctx.closePath()
        }
        super.draw(ctx)
    }

    setClickable(clickable) {
        super.setClickable(clickable)
        this.btnColor = this.disableBgColor
    }

}