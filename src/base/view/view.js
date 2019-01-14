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
        this.tag = 'View'

        this.measureFinish = false
        this.layoutFinish = false

        // selected
        this.enableSelect = false
        this.selectedColor = '#0fc359'
        this.selected = false

        // click
        this.clickable = false
        this.disableBgColor = '#b2b2b2'

        this.layoutParam = new LayoutParam(width, height)

        this.bgColor = null

        this.touchListener = null
        this.parent = null
        this.disallowInterceptTouchEvent = false
        this.onClickListener = null
    }


    // view system functions
    update() {}

    measure(ctx, parentWidth, widthMode, parentHeight, heightMode) {
        if (this.layoutParam.width == LayoutParam.WRAP_CONTENT) {
            this.width = 0
        } else if (this.layoutParam.width == LayoutParam.MATCH_PARENT) {
            this.width = parentWidth
        } else {
            this.width = this.layoutParam.width
        }

        if (this.layoutParam.height == LayoutParam.WRAP_CONTENT) {
            this.height = 0
        } else if (this.layoutParam.height == LayoutParam.MATCH_PARENT) {
            this.height = parentHeight
        } else {
            this.height = this.layoutParam.height
        }

        if (this.visible) {
            this.measureFinish = true
        }
    }

    layout() {
        if (this.visible && this.measureFinish) {
            this.layoutFinish = true
        }
    }

    draw(ctx) {
        this.drawBg(ctx)
    }

    drawBg(ctx) {
        if (this.bgColor != null) {
            ctx.beginPath()

            ctx.fillStyle = this.bgColor
            ctx.fillRect(this.x, this.y, this.width, this.height)

            ctx.closePath()
        }
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

        if (this.clickable) {
            if (this.onClickListener != null) {
                handled = true
                if (touchEvent.event == TouchEvent.EVENT_END) {
                    this.onClickListener(this, touchEvent)
                }
            }

            if (touchEvent.event == TouchEvent.EVENT_START) {
                this.selected = !this.selected
                if (this.enableSelect) {
                    handled = true
                    if (this.onSelectedListener != null) {
                        this.onSelectedListener(this.selected)
                    }
                }
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

    /**
     * {@paramcallback is touch listener}
     * {@sample callback(touchEvent)}
     */
    setOnTouchListener(callback) {
        this.touchListener = callback
    }

    setOnClickListener(callback) {
        this.onClickListener = callback
    }

    setOnSelectedListener(callback) {
        this.onSelectedListener = callback
    }

    setClickable(clickable) {
        this.clickable = clickable
    }

    setSelect(selected) {
        this.selected = selected
    }

    setSelectEnable(enable) {
        this.enableSelect = enable
    }

    consumeTouchEvent(touchEvent) {
        return false
    }

    setVisible(visible) {
        this.visible = visible
        this.measureFinish = false
    }
}