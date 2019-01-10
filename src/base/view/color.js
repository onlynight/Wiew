export default class Color {

    constructor(strRgb = '#ffffff') {
        this.strRgb = strRgb
        this.red = 0
        this.green = 0
        this.blue = 0
    }

    convertStr2RGB(value = null) {
        if (value == null) {
            value = this.strRgb
        }
        if (!value.startsWith('#')) {
            return
        }

        let rgb = value.replace('#', '')
        let length = rgb.length

        switch (length) {
            case 3:
                this.red = Math.floor(parseInt(rgb.substr(0, 1), 16) / 15.0 * 255)
                this.green = Math.floor(parseInt(rgb.substr(1, 2), 16) / 15.0 * 255)
                this.blue = Math.floor(parseInt(rgb.substr(2, 3), 16) / 15.0 * 255)
                break
            case 6:
                this.red = Math.floor(parseInt(rgb.substr(0, 2), 16))
                this.green = Math.floor(parseInt(rgb.substr(2, 2), 16))
                this.blue = Math.floor(parseInt(rgb.substr(4, 2), 16))
                break
            default:
                this.red = 0
                this.green = 0
                this.blue = 0
                break
        }
    }

    convertRGB2Str(red, green, blue) {
        this.red = red
        this.green = green
        this.blue = blue

        let value = '#'
        value += this.int2Hex(red)
        value += this.int2Hex(green)
        value += this.int2Hex(blue)
        this.strRgb = value

        return value
    }

    int2Hex(value) {
        if (value <= 0) {
            value = 0
        }

        let temp = value.toString(16)
        if (temp.length < 2) {
            temp = '0' + temp
        }

        return temp
    }

}