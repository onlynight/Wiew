// @author: wyndam
// @email: only.night@qq.com

import PhoneWindow from './base/view/phoneWindow.js'

import HomeScene from './runtime/scene/homeScene.js'

export default class Main {

    static SCENES = [HomeScene]

    constructor() {
        this.onCreate()
    }

    onCreate() {
        databus.running = true
        databus.playing = true

        this.window = PhoneWindow.getInstance()
        this.window.changeScene(Main.SCENES[0])

        this.bindLoop = this.loop.bind(this)
        window.cancelAnimationFrame(this.aniId);
        window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )
    }

    loop() {
        if (databus.running) {
            databus.frame++;
        }

        this.window.loop()

        window.requestAnimationFrame(
            this.bindLoop,
            canvas
        )

    }

}