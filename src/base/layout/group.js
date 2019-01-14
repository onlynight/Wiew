// author: wyndam
// email: only.night@qq.com

import View from '../view/view.js'
import TouchEvent from '../touch/touchEvent.js'

// 定义对其方式，使用移位操作是为了可以用一个值表示队中对其方式，
// 例如靠右下角对其我们可以写成： Gravity.RIGHT | Gravity.BOTTOM
// 居中对齐由于和其他对其方式冲突，所以单独设置一个值不使用移位
window.Gravity = {
    CENTER: 1,
    LEFT: 1 << 1,
    RIGHT: 1 << 2,
    TOP: 1 << 3,
    BOTTOM: 1 << 4,
    CENTER_X: 1 << 5,
    CENTER_Y: 1 << 6,
}

window.MeasureMode = {
    UNLIMIT: 1,
    AT_MOST: 2,
    EXACTLY: 3
}

export default class Group extends View {

    constructor(x, y, width, height) {
        super(x, y, width, height)

        this.clickable = false
        this.bgColor = 'rgba(0,0,0,0)'
        this.views = []
        this.catchedTouchEventChild = null
    }

    update() {
        this.updateChildren(this.views)
    }

    measure(ctx, parentWidth, widthMode, parentHeight, heightMode) {
		super.measure(ctx, parentWidth, widthMode, parentHeight, heightMode)

        this.measureChildren(ctx, this.views, parentWidth, widthMode, parentHeight, heightMode)
    }

	layout() {
		super.layout()
        this.layoutChildren(this.views)
    }

    draw(ctx) {
        super.draw(ctx)
        this.drawChildren(ctx, this.views)
    }

    layoutChild(child) {
        if (child != null && child instanceof View) {
            child.layout()
        }
    }

    layoutChildren(children) {
        if (children != null && Array.isArray(children)) {
            for (let i = 0; i < children.length; i++) {
                this.layoutChild(children[i])
            }
        }
    }

    updateChild(child) {
        if (child != null && child instanceof View) {
            child.update()
        }
    }

    updateChildren(children) {
        if (children != null && Array.isArray(children)) {
            for (let i = 0; i < children.length; i++) {
                this.updateChild(children[i])
            }
        }
    }

    drawChild(ctx, child) {
        if (child != null && child instanceof View && child.visible) {
			child.draw(ctx)
        }
    }

    drawChildren(ctx, children) {
        if (children != null && Array.isArray(children)) {
            for (let i = 0; i < children.length; i++) {
                this.drawChild(ctx, children[i])
            }
        }
    }

    measureChild(ctx, child, parentWidth, widthMode, parentHeight, heightMode) {
        if (child != null && child instanceof View) {
            child.measure(ctx, parentWidth, widthMode, parentHeight, heightMode)
        }
    }

    measureChildren(ctx, children, parentWidth, widthMode, parentHeight, heightMode) {
        if (children != null && Array.isArray(children)) {
            for (let i = 0; i < children.length; i++) {
                this.measureChild(ctx, children[i], parentWidth, widthMode, parentHeight, heightMode)
            }
        }
    }

    addView(view) {
        view.x = this.x
        view.y = this.y
        view.parent = this
        this.views.push(view)
    }

    removeView(view) {
        let index = -1
        for (let i = 0; i < this.views.length; i++) {
            if (this.views[i] == view) {
                index = i
                break
            }
        }

        this.removeView(index)
    }

    removeView(index) {
        if (index != -1) {
            this.views.splice(index, 1)
        }
    }

    dispatchTouchEvent(touchEvent) {
        let handled = false
        let intercepted = this.interceptTouchEvent(touchEvent)
        if (this.disallowInterceptTouchEvent) {
            intercepted = false
        }
        if (!intercepted) {
            handled = this.dispatchPerformTouchEvent(touchEvent)
        } else {
            if (touchEvent.event == TouchEvent.EVENT_START) {
                handled = this.dispatchPerformTouchEvent(touchEvent)
            }
        }

        return handled
    }

    dispatchPerformTouchEvent(touchEvent) {
        let handled = false

        if (this.views != null && this.views.length <= 0) {
            handled = super.dispatchTouchEvent(touchEvent)
        } else {
            if (touchEvent.pointers.length > 0) {
                let child = null
                for (let i = this.views.length - 1; i >= 0; i--) {
                    child = this.views[i]
                    if (child.isInArea(touchEvent.pointers[0].x, touchEvent.pointers[0].y)) {
                        handled = child.dispatchTouchEvent(touchEvent)
                        this.catchedTouchEventChild = child

                        if (child.consumeTouchEvent(touchEvent)) {
                            handled = true
                            break
                        }

                        if (handled) {
                            break
                        }
                    }
                }
            } else {
                if (this.catchedTouchEventChild != null) {
                    handled = this.catchedTouchEventChild.dispatchTouchEvent(touchEvent)
                }
                this.catchedTouchEventChild = null
            }
        }

        return handled
    }

    requestDisallowInterceptTouchEvent(disallowIntercept) {
        this.disallowInterceptTouchEvent = disallowIntercept

        if (this.parent != null) {
            this.parent.requestDisallowInterceptTouchEvent(disallowIntercept)
        }
    }

    interceptTouchEvent(touchEvent) {
        return false
    }

    setSelect(selected) {
        super.setSelect(selected)
        for (let i = 0; i < this.views.length; i++) {
            this.views[i].setSelect(selected)
        }
    }

}