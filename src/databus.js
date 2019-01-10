// author: wyndam
// email: only.night@qq.com

// @author: wyndam
// @email: only.night@qq.com

let instance

export default class DataBus {

    constructor() {
        if (instance) {
            return instance
        }

        instance = this

        this.frame = 0
        this.running = false
        this.playing = false
    }

}

window.databus = new DataBus()