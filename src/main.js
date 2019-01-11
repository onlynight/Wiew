// @author: wyndam
// @email: only.night@qq.com

import PhoneWindow from './base/view/phoneWindow.js'

import Scene from './base/view/scene.js'
import HomeScene from './runtime/scene/homeScene.js'
import DemoScene from './runtime/scene/demoSecne.js'

export default class Main {

    constructor() {
        this.onCreate()
    }

    onCreate() {
        databus.running = true
        databus.playing = true

        Scene.registerScene('home', HomeScene)
        Scene.registerScene('demo', DemoScene)

        this.window = PhoneWindow.getInstance()
        this.window.changeScene(Scene.getScene('home'))

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