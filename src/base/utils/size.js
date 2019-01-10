// author: wyndam
// email: only.night@qq.com

const SIZES = [3.3, 4.3, 5.5, 6.7, 8]

export default class Size {

    constructor(size) {
        this.index = size

        if (this.index > SIZES.length) {
            this.index = SIZES.length
        }

        if (this.index <= 1) {
            this.index = 1
        }

        this.size = SIZES[this.index - 1]
    }

    growDown() {
        let index = this.index
        index++;
        if (index > SIZES.length) {
            index = SIZES.length
        }

        return new Size(index)
    }

    growUp() {
        let index = this.index
        index--;
        if (index <= 1) {
            index = 1
        }

        return new Size(index)
    }

}