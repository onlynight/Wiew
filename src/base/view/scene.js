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

        this.__contentView = new Group(x, y, width, height)
		super.addView(this.__contentView)

        this.__rootWindowView = new FrameLayout(width, height)
		super.addView(this.__rootWindowView)
    }

    addView(view) {
		this.__contentView.addView(view)
    }

    removeView(view) {
		this.__contentView.removeView(view)
    }

    removeView(index) {
		this.__contentView.removeView(index)
    }

    addWindow(popupWindow) {
        popupWindow.x = this.x
        popupWindow.y = this.y
		popupWindow.parent = this.__rootWindowView
		this.__rootWindowView.views.push(popupWindow)
    }

    removeWindow(popupWindow) {
        let index = -1
		for (let i = 0; i < this.__rootWindowView.views.length; i++) {
			if (this.__rootWindowView.views[i] == popupWindow) {
                index = i
                break
            }
        }

        removeWindow(index)
    }

    removeWindow(index) {
        if (index != -1) {
			this.__rootWindowView.views.splice(index, 1)
        }
    }

    changeScene(sceneClass) {
        PhoneWindow.getInstance().changeScene(sceneClass)
    }

}