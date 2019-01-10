// @author: wyndam
// @email: only.night@qq.com

import Group from './group.js'
import LayoutParam from './layoutParam.js'

export default class FrameLayout extends Group {

    constructor(width, height) {
        super(0, 0, width, height)

        this.matchParentChildren = []
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

        let measureMatchParentChildren = tempWidthMode != MeasureMode.EXACTLY ||
            tempHeightMode != MeasureMode.EXACTLY
        this.matchParentChildren = []

        let maxWidth = 0
        let maxHeight = 0
        let child = null

        for (let i = 0; i < this.views.length; i++) {
            child = this.views[i]
            if (child.visible) {
                this.measureChild(ctx, child, parentWidth, widthMode, parentHeight, heightMode)

                maxWidth = Math.max(maxWidth, child.width + child.layoutParam.marginLeft + child.layoutParam.marginRight)
                maxHeight = Math.max(maxHeight, child.height + child.layoutParam.marginTop + child.layoutParam.marginBottom)

                if (child.layoutParam.width == LayoutParam.MATCH_PARENT ||
                    child.layoutParam.height == LayoutParam.MATCH_PARENT) {
                    this.matchParentChildren.push(child)
                }
            }
        }

        if (this.layoutParam.width == LayoutParam.WRAP_CONTENT) {
            this.width = maxWidth
        } else {
            this.width = parentWidth
        }

        if (this.layoutParam.height == LayoutParam.WRAP_CONTENT) {
            this.height = maxHeight
        } else {
            this.height = parentHeight
        }

        if (this.matchParentChildren.length > 0) {
            let child = null
            for (let i = 0; i < this.matchParentChildren.length; i++) {
                child = this.matchParentChildren[i]
                child.measure(ctx, this.width, tempWidthMode, this.height, tempHeightMode)
            }
        }
    }

    layoutChild(child) {
        if (!child.visible) {
            return
        }
        super.layoutChild(child)

        let x = 0
        let y = 0

        if (child.layoutParam.gravity & Gravity.CENTER) {
            if (this.width == child.getTotalWidth()) {
                x = child.layoutParam.marginLeft
            } else {
                if (child.layoutParam.width == LayoutParam.MATCH_PARENT) {
                    x = child.layoutParam.marginLeft
                } else {
                    x = (this.width - child.width + child.layoutParam.marginLeft - child.layoutParam.marginRight) / 2
                }
            }

            if (this.height == child.getTotalHeight()) {
                y = child.marginTop
            } else {
                if (child.layoutParam.height == LayoutParam.MATCH_PARENT) {
                    y = child.layoutParam.marginTop
                } else {
                    y = (this.height - child.height + child.layoutParam.marginTop - child.layoutParam.marginBottom) / 2
                }
            }
        }

        if (child.layoutParam.gravity & Gravity.LEFT) {
            x = child.layoutParam.marginLeft
        } else if (child.layoutParam.gravity & Gravity.RIGHT) {
            x = this.width - child.width - child.layoutParam.marginRight
        } else if (child.layoutParam.gravity & Gravity.CENTER_X) {
            x = (this.width - child.width + child.layoutParam.marginLeft - child.layoutParam.marginRight) / 2
        }

        if (child.layoutParam.gravity & Gravity.TOP) {
            y = child.layoutParam.marginTop
        } else if (child.layoutParam.gravity & Gravity.BOTTOM) {
            y = this.height - child.height - child.layoutParam.marginBottom
        } else if (child.layoutParam.gravity & Gravity.CENTER_Y) {
            y = (this.height - child.height + child.layoutParam.marginTop - child.layoutParam.marginBottom) / 2
        }

        child.x = this.x + x
        child.y = this.y + y
    }

    draw(ctx) {
        if (!this.visible) {
            return
        }
        super.draw(ctx)

        if (this.views != null && this.views.length > 0) {
            for (let i = 0; i < this.views.length; i++) {
                this.views[i].draw(ctx)
            }
        }
    }

}