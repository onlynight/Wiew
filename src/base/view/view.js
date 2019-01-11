// author: wyndam
// email: only.night@qq.com

import LayoutParam from '../layout/layoutParam.js'
import TouchEvent from '../touch/touchEvent.js'

export default class View {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.visible = true

        this.layoutParam = new LayoutParam(width, height)

        this.bgColor = 'rgba(0,0,0,0)'

        this.touchListener = null
        this.parent = null
        this.disallowInterceptTouchEvent = false
        this.onClickListener = null
    }


    // view system functions
    update() {}

    measure(ctx, parentWidth, widthMode, parentHeight, heightMode) {}

    layout() {}

    draw(ctx) {
        this.drawBg(ctx)
    }

    drawBg(ctx) {
        ctx.beginPath()

        ctx.fillStyle = this.bgColor
        ctx.fillRect(this.x, this.y, this.width, this.height)

        ctx.closePath()
    }

    getTotalWidth() {
        return this.width + this.layoutParam.marginLeft + this.layoutParam.marginRight
    }

    getTotalHeight() {
        return this.height + this.layoutParam.marginTop + this.layoutParam.marginBottom
    }

    // touch event functions
    dispatchTouchEvent(touchEvent) {
        let result = false
        if (this.touchListener != null) {
            result = this.touchListener(touchEvent)
        }

        if (!result) {
            result = this.touchEvent(touchEvent)
        }

        return result
    }
    /**
     * receive touch event
     * {@param touchEvent touch event data}
     * return if return {true} it means this view consume the touch event, or not
     */
    touchEvent(touchEvent) {
        let handled = false
        if (this.onClickListener != null) {
            handled = true
            if (touchEvent.event == TouchEvent.EVENT_END) {
                this.onClickListener(this, touchEvent)
            }
        }

        return handled
    }

    /**
     * check the pos is in the view rect
     */
    isInArea(x, y) {
        return (x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height && this.visible)
    }

    setOnClickListener(callback) {
        this.onClickListener = callback
    }

    /**
     * {@paramcallback is touch listener}
     * {@sample callback(touchEvent)}
     */
    setOnTouchListener(callback) {
        this.touchListener = callback
    }

    consumeTouchEvent(touchEvent) {
        return false
    }
}