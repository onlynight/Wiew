// author: wyndam
// email: only.night@qq.com

import Point from '../utils/point.js'

export default class TouchEvent {

    static EVENT_START = 1
    static EVENT_MOVE = 2
    static EVENT_END = 3
    static EVENT_CANCEL = 4

    static WXTouchEvent2TouchEvent(eventType, e) {
        let pointers = []
        let temp = null
        for (let i = 0; i < e.length; i++) {
            temp = e[i]
            pointers.push(new Point(temp.clientX, temp.clientY))
        }
        return new TouchEvent(eventType, pointers)
    }

    constructor(event, pointers) {
        this.event = event
        this.pointers = pointers
    }

}