import Graph from './Graph'

const g = new Graph(true)
g.board.appendTo('#canvas')

const edgesComponent = document.getElementById('edges')
const guide = document.getElementById('guide')
const directedSelect = document.getElementById('directedSelect')
const matrixNodeNode = document.getElementById('matrixNodeNode')

function updateData() {
    updateEdges()
    updateTable()
}

function updateEdges() {
    edgesComponent.innerHTML = ''
    g.edges.forEach(e => {

        const Edge = document.createElement('div')
        Edge.addEventListener('click', () => {
            g.removeEdge(e)
            Edge.remove()
        })
        Edge.innerHTML = `<li class="edge list-group-item">
            ${e.from} đến ${e.to}
        </li>`
        edgesComponent.append(Edge)

    })
}

function updateTable() {
    const table = document.getElementById('matrix')
    const thead = table.querySelector('thead')
    const th = document.createElement('tr')
    const matrix = g.exportMatrix()

    matrix.forEach((e, i) => th.innerHTML += `<td>${i || 'X'}</td>`)
    thead.innerHTML = ''
    thead.append(th)

    const tbody = table.querySelector('tbody')
    tbody.innerHTML = ''
    for (let i = 1; i < matrix.length; i++) {
        const tr = document.createElement('tr')
        for (let j = 0; j < matrix.length; j++)
            if (j === 0)
                tr.innerHTML += `<td>${i}</td>`
            else
                tr.innerHTML += `<td class="${matrix[i][j] && 'table-primary'}">${matrix[i][j]}</td>`

        tbody.append(tr)
    }

}

updateData()
setInterval(updateData, 1000)

document.getElementById('removeNodeButton')
    .addEventListener('click', () => g.removeNode(g.nodes.length))

const directed = directedSelect.querySelectorAll('input')[0]
const unDirected = directedSelect.querySelectorAll('input')[1]
directed.onclick = () => {
    g.directed = true
}

unDirected.onclick = () => {
    g.directed = false
}

const optionTab = document.getElementById('optionTab')
const tabButtons = optionTab.querySelectorAll('li')

tabButtons.forEach((e, i) => {
    e.addEventListener('click', event => {
        tabButtons.forEach(e => e.querySelector('a').classList.remove('active'))
        e.querySelector('a').classList.add('active')

        edgesComponent.style.display = 'none'
        guide.style.display = 'none'
        directedSelect.style.display = 'none'
        matrixNodeNode.style.display = 'none'

        if (i === 0)
            directedSelect.style.display = 'block'
        if (i === 1)
            edgesComponent.style.display = 'block'
        if (i === 2)
            matrixNodeNode.style.display = 'block'
        if (i === 3)
            guide.style.display = 'block'
    })
})

window.addEventListener('mousedown', event => {
    const optionsOverlay = document.getElementById('optionsOverlay')
    if (!optionsOverlay)
        return

    const dx = event.clientX - optionsOverlay.offsetLeft
    const dy = event.clientY - optionsOverlay.offsetTop

    if (dx <= optionsOverlay.offsetWidth && dx >= - optionsOverlay.offsetWidth)
        if (dy <= optionsOverlay.offsetHeight && dy >= -optionsOverlay.offsetHeight)
            return

    optionsOverlay.remove()
})

window.addEventListener('mousemove', event => {
    if (!event.buttons)
        return
    const optionsOverlay = document.getElementById('optionsOverlay')
    if (!optionsOverlay)
        return

    const dx = event.clientX - optionsOverlay.offsetLeft
    const dy = event.clientY - optionsOverlay.offsetTop

    if (dx <= optionsOverlay.offsetWidth && dx >= -100)
        if (dy <= optionsOverlay.offsetHeight && dy >= -100) {
            optionsOverlay.style.left = event.clientX + 'px'
            optionsOverlay.style.top = event.clientY + 'px'
        }
})

window.addEventListener('contextmenu', event => {
    event.preventDefault()
    document.getElementById('optionsOverlay')?.remove()
    if (event.buttons === 2) {
        const optionsMenu = document.createElement('div')
        optionsMenu.id = 'optionsOverlay'
        optionsMenu.className = 'btn-group-vertical'
        optionsMenu.style = `width: 200px;position: fixed; left: ${event.clientX}px; top: ${event.clientY}px; background: #fff; z-index: 100;border: 1px #ddd solid;border-radius: 5px;box-shadow: 0 0 5px #00000020;`

        const button = document.createElement('button')
        button.className = 'btn btn-light'
        button.innerHTML = 'Thêm đỉnh'
        button.onclick = event => g.addNode(g.nodes.length + 1)

        const button1 = document.createElement('button')
        button1.className = 'btn btn-light'
        button1.innerHTML = 'Xóa đỉnh'
        button1.onclick = event => g.removeNode(g.nodes.length)

        const button2 = document.createElement('button')
        button2.disabled = true
        button2.className = 'btn btn-light'
        button2.innerHTML = 'Duyệt theo chiều rộng'

        const button3 = document.createElement('button')
        button3.disabled = true
        button3.className = 'btn btn-light'
        button3.innerHTML = 'Duyệt theo chiều sâu'

        optionsMenu.append(button, button1, button2, button3)
        document.body.append(optionsMenu)
    }
})
