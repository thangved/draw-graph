import Board from './Board'

class Graph {
    constructor() {
        this.board = new Board();
        this.nodes = []
        this.edges = []
        this.target = null
        this.drawTo = null
        this.shift = false
        this.functions = []

        this.update()
        this.board.canvas.addEventListener('dblclick', event => {
            if (!this.target)
                this.addNode(this.nodes.length + 1, event.clientX, event.clientY)
        })
    }

    update() {
        this.draw()
        this.checkAddEdge()
        setTimeout(() => {
            this.update()
        }, 1000 / 60)
    }

    addNode(label, x, y) {
        const node = {
            x: x || Math.floor(Math.random() * this.board.canvas.width),
            y: y || Math.floor(Math.random() * this.board.canvas.height),
            label,
        }
        this.nodes.push(node)
        this.setEvent()
    }

    addEdge(from, to) {
        const edge = { from, to }
        this.edges.push(edge)
        this.setEvent()
        this.target = null
    }

    removeNode(label) {
        this.nodes = this.nodes.filter(e => e.label !== label)
    }

    removeEdge(edge) {
        const { from, to } = edge
        this.edges = this.edges.filter(e => e.from !== from || e.to !== to)
    }

    draw() {
        this.board.clear()
        this.drawEdges()
        this.drawLine()
        this.drawNodes()
    }
    drawNodes() {
        this.nodes.forEach(node => {
            this.board.drawNode(node.x, node.y, node.label)
        })
    }
    drawEdges() {
        this.edges.forEach(edge => this.drawEdge(edge))
    }
    drawLine() {
        if (!this.drawTo || !this.target)
            return
        if (this.shift)
            this.board.drawLine(this.target.x, this.target.y, this.drawTo.x, this.drawTo.y)
        else {
            this.nodes = this.nodes.map(e => {
                if (e.label === this.target.label)
                    return {
                        ...e,
                        ...this.drawTo,
                    }
                return e
            })
        }
        this.setEvent()
    }
    checkAddEdge() {
        if (!this.shift)
            return
        this.nodes.forEach(e => {
            if (!this.target || !this.drawTo)
                return
            if (e.label === this.target.label)
                return
            if (Math.abs(e.x - this.drawTo.x) <= this.board.radius && Math.abs(e.y - this.drawTo.y) <= this.board.radius) {
                this.addEdge(this.target.label, e.label)
            }
        })
    }
    drawEdge(edge) {
        let posFrom = null
        let posTo = null

        this.nodes.forEach(e => {
            if (e.label == edge.from)
                posFrom = e

            if (e.label == edge.to)
                posTo = e
        })
        if (!posFrom || !posTo)
            return this.removeEdge(edge)

        this.board.drawLine(posFrom.x, posFrom.y, posTo.x, posTo.y)

    }

    setEvent() {
        this.nodes.map((e, index) => {
            this.board.canvas.removeEventListener('click', this.functions[index])

            this.functions[index] = handle

            this.board.canvas.addEventListener('click', event => this.functions[index](event, this))

            function handle(event, graph) {
                if (Math.abs(event.clientX - e.x) <= graph.board.radius)
                    if (Math.abs(event.clientY - e.y) <= graph.board.radius)
                        graph.target = e
            }
        })

        window.addEventListener('mousemove', event => {
            if (!this.target)
                return

            this.shift = event.shiftKey

            if (event.buttons === 1) {
                {
                    this.drawTo = {
                        x: event.clientX,
                        y: event.clientY,
                    }
                }
            }
            else {
                this.target = null
                this.drawTo = null
            }


        })
    }

    exportMatrix() {
        const matrix = []
        const row = []
        for (let j = 0; j <= this.nodes.length; j++)
            row.push(0)
        for (let i = 0; i <= this.nodes.length; i++) {
            matrix.push([...row])
        }

        this.edges.forEach(e => {
            matrix[e.from][e.to]++
            matrix[e.to][e.from]++
        })

        return matrix
    }
}

export default Graph
