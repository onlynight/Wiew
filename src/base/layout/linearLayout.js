// @author: wyndam
// @email: only.night@qq.com

import Group from './group.js'
import LayoutParam from './layoutParam.js'

export default class LinearLayout extends Group {

    static VERTICAL = 0
    static HORIZONTAL = 1

    constructor(width, height, direction = LinearLayout.VERTICAL) {
        super(0, 0, width, height)

        this.direction = direction
    }

    measure(ctx, parentWidth, widthMode, parentHeight, heightMode) {
        let tempWidthMode = widthMode
        let tempHeightMode = heightMode

        if (this.layoutParam.width == LayoutParam.WRAP_CONTENT) {
            tempWidthMode = MeasureMode.UNLIMIT
        } else if (this.layoutParam.width == LayoutParam.MATCH_PARENT) {
            tempWidthMode = MeasureMode.AT_MOST
        } else {
            tempWidthMode = MeasureMode.EXACTLY
            parentWidth = this.width
        }

        if (this.layoutParam.height == LayoutParam.WRAP_CONTENT) {
            tempHeightMode = MeasureMode.UNLIMIT
        } else if (this.layoutParam.height == LayoutParam.MATCH_PARENT) {
            tempHeightMode = MeasureMode.AT_MOST
        } else {
            tempHeightMode = MeasureMode.EXACTLY
            parentHeight = this.height
        }

        if (this.direction == LinearLayout.HORIZONTAL) {
            this.measureHorizontal(ctx, parentWidth, tempWidthMode, parentHeight, tempHeightMode)
        } else {
            this.measureVertical(ctx, parentWidth, tempWidthMode, parentHeight, tempHeightMode)
        }
    }

    measureHorizontal(ctx, parentWidth, widthMode, parentHeight, heightMode) {
        let maxHeight = 0
        let width = 0
        let child = null

        parentWidth = parentWidth - this.layoutParam.marginLeft - this.layoutParam.marginRight
        parentHeight = parentHeight - this.layoutParam.marginTop - this.layoutParam.marginBottom

        for (let i = 0; i < this.views.length; i++) {
            child = this.views[i]
            if (child.visible) {
                this.measureChild(ctx, child, parentWidth - width - child.layoutParam.marginLeft, widthMode, parentHeight, heightMode)
                maxHeight = Math.max(maxHeight, child.height + child.layoutParam.marginTop + child.layoutParam.marginBottom)
                width += child.width + child.layoutParam.marginLeft + child.layoutParam.marginRight
            }
        }

        if (heightMode == MeasureMode.UNLIMIT) {
            this.height = maxHeight
        } else if (heightMode == MeasureMode.AT_MOST) {
            this.height = parentHeight
        }

        this.width = width
    }

    measureVertical(ctx, parentWidth, widthMode, parentHeight, heightMode) {
        super.measure(ctx, parentWidth, widthMode, parentHeight, heightMode)

        let maxWidth = 0
        let height = 0
        let child = null

        parentWidth = parentWidth - this.layoutParam.marginLeft - this.layoutParam.marginRight
        parentHeight = parentHeight - this.layoutParam.marginTop - this.layoutParam.marginBottom

        for (let i = 0; i < this.views.length; i++) {
            child = this.views[i]
            if (child.visible) {
                this.measureChild(ctx, child, parentWidth, widthMode, parentHeight - height - child.layoutParam.marginTop, heightMode)
                maxWidth = Math.max(maxWidth, child.width + child.layoutParam.marginLeft + child.layoutParam.marginRight)
                height += child.height + child.layoutParam.marginTop + child.layoutParam.marginBottom
            }
        }

        if (widthMode == MeasureMode.UNLIMIT) {
            this.width = maxWidth
        } else if (widthMode == MeasureMode.AT_MOST) {
            this.width = parentWidth
        }

        if (heightMode == MeasureMode.UNLIMIT) {
            this.height = height
        } else if (heightMode == MeasureMode.AT_MOST) {
            this.height = parentHeight
        }

        if (this.layoutParam.width > 0) {
            this.width = this.layoutParam.width
        }

        if (this.layoutParam.height > 0) {
            this.height = this.layoutParam.height
        }
    }

    layout() {
        if (this.direction == LinearLayout.HORIZONTAL) {
            this.layoutHorizontal()
        } else {
            this.layoutVertical()
        }
        this.layoutFinish = true
    }

    layoutVertical() {
        let x = 0
        let y = 0
        let child = null

        for (let i = 0; i < this.views.length; i++) {
            child = this.views[i]
            x = 0

            if (child.visible) {
                child.layout()
                if (child.layoutParam.gravity == Gravity.CENTER) {
                    x = (this.width - child.width) / 2 + child.layoutParam.marginLeft - child.layoutParam.marginRight
                } else {
                    if (child.layoutParam.gravity & Gravity.LEFT) {
                        x = child.layoutParam.marginLeft
                    }

                    if (child.layoutParam.gravity & Gravity.RIGHT) {
                        x = this.width - child.width - child.layoutParam.marginRight
                    }

                    // do nothing
                    // if (child.layoutParam.gravity & Gravity.TOP) {}
                    // if (child.layoutParam.gravity & Gravity.BOTTOM) {}

                    if (child.layoutParam.gravity & Gravity.CENTER_X) {
                        x = (this.width - child.width) / 2 + child.layoutParam.marginLeft - child.layoutParam.marginRight
                    }

                    // do nothing
                    // if (child.layoutParam.gravity & Gravity.CENTER_Y) {}
                }

                y += child.layoutParam.marginTop
                child.x = this.x + x
                child.y = this.y + y

                y += child.height + child.layoutParam.marginBottom
            }
        }
    }

    layoutHorizontal() {
        let x = 0
        let y = 0
        let child = null

        for (let i = 0; i < this.views.length; i++) {
            child = this.views[i]

            if (child.visible) {
                child.layout()
                if (child.layoutParam.gravity == Gravity.CENTER) {
                    y = (this.height - child.height) / 2 + child.layoutParam.marginTop - child.layoutParam.marginBottom
                } else {
                    // do nothing
                    // if (child.layoutParam.gravity & Gravity.LEFT) {}
                    // if (child.layoutParam.gravity & Gravity.RIGHT) {}

                    if (child.layoutParam.gravity & Gravity.TOP) {
                        y = child.layoutParam.marginTop
                    }

                    if (child.layoutParam.gravity & Gravity.BOTTOM) {
                        y = this.height - child.height - child.layoutParam.marginBottom
                    }

                    if (child.layoutParam.gravity & Gravity.CENTER_Y) {
                        y = (this.height - child.height) / 2 + child.layoutParam.marginTop - child.layoutParam.marginBottom
                    }

                    // do nothing
                    // if (child.layoutParam.gravity & Gravity.CENTER_Y) {}
                }

                x += child.layoutParam.marginLeft
                child.x = this.x + x
                child.y = this.y + y

                x += child.width + child.layoutParam.marginRight
            }
        }
    }

	draw(ctx){
		super.draw(ctx)
		// if (this.tag == 'speedLayout') {
		// 	console.log(this)
		// }
	}

}