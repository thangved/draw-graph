class Board {
    constructor(width, height, radius, fontSize) {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.radius = radius || 20
        this.fontSize = fontSize || 25

        this.canvas.width = width || 300;
        this.canvas.height = height || 400;
    }
    appendTo(selector) {
        const parent = document.querySelector(selector)
        parent.append(this.canvas)
        this.canvas.width = parent.offsetWidth
        this.canvas.height = parent.offsetHeight
    }
    drawCircle(x, y, r) {
        this.context.beginPath()
        this.context.arc(x, y, r, 0, 2 * Math.PI)
        this.context.stroke()
        this.context.fillStyle = '#fff'
        this.context.fill()
        this.context.fillStyle = '#000'
    }
    drawNode(x, y, u) {
        this.drawCircle(x, y, this.radius)
        this.context.font = `${this.fontSize}px Arial`
        this.context.textAlign = 'center'
        this.context.fillText(u, x, y + this.fontSize / 2)
    }
    drawLine(x1, y1, x2, y2) {
        this.context.beginPath()
        this.context.moveTo(x1, y1)
        this.context.lineTo(x2, y2)
        this.context.stroke()
    }
    clear() {
        this.context.fillStyle = '#fff'
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fill()
        this.context.fillStyle = '#000'
    }
}

export default Board