// @author: wyndam
// @email: only.night@qq.com

// const __ = {
//   name: Symbol('name')
// }

export default class Pool {

    constructor() {
        this.pool = {}
    }

    put(name, obj) {
        let list = this.pool[name]
        if (list == null) {
            this.pool[name] = []
        }

        this.pool[name].push(obj)
    }

    get(name) {
        let list = this.pool[name]
        if (list != null) {
            return list.shift()
        }
    }

    getByClass(name, clazz) {
        let temp = this.get(name)
        return temp != null ? temp : new clazz()
    }

}