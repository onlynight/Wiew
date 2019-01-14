// author: wyndam
// email: only.night@qq.com

import Sprite from './sprite.js'
import LayoutParam from '../../base/layout/layoutParam.js'

export default class ImageView extends Sprite {

    static DEFAULT_WIDTH = 100
    static DEFAULT_HEIGHT = 100

    constructor(width, height, imgSrc = '') {
        super(0, 0, width, height, {
            hasImg: imgSrc != '' && imgSrc != null,
            imgSrc: imgSrc
        })
    }

	measure(ctx, parentWidth, widthMode, parentHeight, heightMode) {
		super.measure(ctx, parentWidth, widthMode, parentHeight, heightMode)
		
        let maxWdith = -1
        let maxHeight = -1

        if (widthMode == MeasureMode.EXACTLY || widthMode == MeasureMode.AT_MOST) {
            maxWdith = parentWidth
        } else if (widthMode == MeasureMode.UNLIMIT) {
            maxWdith = -1
        }

        if (heightMode == MeasureMode.EXACTLY || heightMode == MeasureMode.AT_MOST) {
            maxHeight = parentHeight
        } else if (heightMode == MeasureMode.UNLIMIT) {
            maxHeight = -1
        }

        if (this.layoutParam.width == LayoutParam.WRAP_CONTENT) {
            this.width = ImageView.DEFAULT_WIDTH
        } else if (this.layoutParam.width == LayoutParam.MATCH_PARENT) {
            this.width = maxWdith
        } else {
            this.width = this.layoutParam.width
        }

        if (this.layoutParam.height == LayoutParam.WRAP_CONTENT) {
            this.height = ImageView.DEFAULT_HEIGHT
        } else if (this.layoutParam.height == LayoutParam.MATCH_PARENT) {
            this.height = maxHeight
        } else {
            this.height = this.layoutParam.height
        }

    }

}