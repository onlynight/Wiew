// author: wyndam
// email: only.night@qq.com

import Group from '../layout/group.js'
import TouchEvent from '../touch/touchEvent.js'

let ctx = canvas.getContext('2d')

let instance

export default class PhoneWindow extends Group {

    static getInstance() {
        return new PhoneWindow()
    }

    constructor() {
        super(0, 0, window.innerWidth, window.innerHeight)

        if (instance) {
            return instance
        }
        instance = this

        this.rootView = null

        this.__fixWindowScale()
        this.create()
    }

    __fixWindowScale() {
        let sysInfo = wx.getSystemInfoSync()
        let width = sysInfo.windowWidth
        let height = sysInfo.windowHeight

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.height = height * window.devicePixelRatio;
        canvas.width = width * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    create() {
        let that = this
        wx.onTouchStart(function(e) {
            that.dispatchTouchEvent(TouchEvent.WXTouchEvent2TouchEvent(TouchEvent.EVENT_START, e.touches))
        })

        wx.onTouchMove(function(e) {
            that.dispatchTouchEvent(TouchEvent.WXTouchEvent2TouchEvent(TouchEvent.EVENT_MOVE, e.touches))
        })

        wx.onTouchEnd(function(e) {
            that.dispatchTouchEvent(TouchEvent.WXTouchEvent2TouchEvent(TouchEvent.EVENT_END, e.touches))
        })

        wx.onTouchCancel(function(e) {
            that.dispatchTouchEvent(TouchEvent.WXTouchEvent2TouchEvent(TouchEvent.EVENT_CANCEL, e.touches))
        })
    }

    changeScene(sceneClass) {
        this.rootView = new sceneClass(this.x, this.y, this.width, this.height)
    }

    loop() {
        this.update()
        this.measure(ctx, this.width, MeasureMode.EXACTLY, this.height, MeasureMode.EXACTLY)
        this.layout()
        this.draw(ctx)
    }

    update() {
        if (this.rootView != null) {
            this.rootView.update()
        }
    }

    measure(ctx, parentWidth, widthMode, parentHeight, heightMode) {
        if (this.rootView != null) {
            this.rootView.measure(ctx, parentWidth, widthMode, parentHeight, heightMode)
        }
    }

    layout() {
        if (this.rootView != null) {
            this.rootView.layout()
        }
    }

    draw(ctx) {
        if (this.rootView != null) {
            this.rootView.draw(ctx)
        }
    }

    dispatchTouchEvent(touchEvent) {
        if (this.rootView != null) {
            this.rootView.dispatchTouchEvent(touchEvent)
        }
    }

}