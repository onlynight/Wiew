// author: wyndam
// email: only.night@qq.com

export default class LayoutParam {

    static WRAP_CONTENT = -1
    static MATCH_PARENT = -2

    constructor(width, height) {
        this.width = width || LayoutParam.WRAP_CONTENT
        this.height = height || LayoutParam.WRAP_CONTENT

        this.marginLeft = 0
        this.marginTop = 0
        this.marginRight = 0
        this.marginBottom = 0
        this.gravity = Gravity.LEFT | Gravity.TOP
    }

}