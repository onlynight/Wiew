// author: wyndam
// email: only.night@qq.com

import Group from '../layout/group.js'
import FrameLayout from '../layout/frameLayout.js'
import PhoneWindow from '../view/phoneWindow.js'

export default class Scene extends Group {

    static SCENES = []

    static registerScene(name, clazz) {
        Scene.SCENES.push({
            name: name,
            clazz: clazz
        })
    }

    static getScene(name) {
        let temp = null

        for (let i = 0; i < Scene.SCENES.length; i++) {
            temp = Scene.SCENES[i]
            if (temp.name == name) {
                return temp.clazz
            }
        }

        return null
    }

    constructor(x, y, width, height) {
        super(x, y, width, height)

        this.contentView = new Group(x, y, width, height)
        super.addView(this.contentView)

        this.rootWindowView = new FrameLayout(width, height)
        super.addView(this.rootWindowView)
    }

    addView(view) {
        this.contentView.addView(view)
    }

    removeView(view) {
        this.contentView.removeView(view)
    }

    removeView(index) {
        this.contentView.removeView(index)
    }

    addWindow(popupWindow) {
        popupWindow.x = this.x
        popupWindow.y = this.y
        popupWindow.parent = this.rootWindowView
        this.rootWindowView.views.push(popupWindow)
    }

    removeWindow(popupWindow) {
        let index = -1
        for (let i = 0; i < this.rootWindowView.views.length; i++) {
            if (this.rootWindowView.views[i] == popupWindow) {
                index = i
                break
            }
        }

        removeWindow(index)
    }

    removeWindow(index) {
        if (index != -1) {
            this.rootWindowView.views.splice(index, 1)
        }
    }

    changeScene(sceneClass) {
        PhoneWindow.getInstance().changeScene(sceneClass)
    }

}