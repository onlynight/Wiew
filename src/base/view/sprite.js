// author: wyndam
// email: only.night@qq.com
import View from './view.js'

export default class Sprite extends View {

    constructor(x, y, width, height, otherSettings) {
        super(x, y, width, height)

        var defaultSettings = {
            hasImg: false,
            imgSrc: '',
        }

        this.settings = Object.assign(defaultSettings, otherSettings)
        this.img = null
        this.imgSrc = null

        if (this.settings.hasImg) {
            this.img = new Image()
            this.img.src = this.settings.imgSrc
            this.imgSrc = this.settings.imgSrc
        }

    }

    draw(ctx) {
        if (this.settings.hasImg) {
            ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }

        if (this.bgColor != null) {
            super.draw(ctx)
        }
    }

    /**
     * 中心点检测
     * {@param target 目标物体}
     */
    isCollideWith(target) {
        if (!this.visible || !target.visible) {
            return false
        }

        // let targetX = target.x + target.width / 2
        // let targetY = target.y + target.height / 2

        // return (targetX >= this.x &&
        //     targetX <= this.x + this.width &&
        //     targetY >= this.y &&
        //     targetY <= this.y + this.height)

        let centerX = this.x + this.width / 2
        let centerY = this.y + this.height / 2

        return (centerX >= target.x &&
            centerX <= target.x + target.width &&
            centerY >= target.y &&
            centerY <= target.y + target.height)
    }

    /**
     * 严格边缘检测，会误判
     * {@param target 目标物体}
     */
    isCollideEdgeWith(target) {
        if (!this.visible || !target.visible) {
            return false
        }

        return ((target.x >= this.x &&
                target.x <= this.x + this.width &&
                target.y >= this.y &&
                target.y <= this.y + this.height) || // top left

            (target.x + target.width >= this.x &&
                target.x + target.width <= this.x + this.width &&
                target.y >= this.y &&
                target.y <= this.y + this.height) || // top right

            (target.x >= this.x &&
                target.x <= this.x + this.width &&
                target.y + target.height >= this.y &&
                target.y + target.height <= this.y + this.height) || // bottom left

            (target.x + target.width >= this.x &&
                target.x + target.width <= this.x + this.width &&
                target.y + target.height >= this.y &&
                target.y + target.height <= this.y + this.height)) // bottom right
    }

}