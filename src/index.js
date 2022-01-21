import Graph from './Graph'

const g = new Graph()
g.board.appendTo('#canvas')

function updateData() {
    updateEdges()
    updateNodes()
    updateTable()
}

function updateNodes() {
    const nodesComponents = document.getElementById('nodes')
    nodesComponents.innerHTML = ''
    g.nodes.forEach(e => {
        const node = document.createElement('div')
        node.className = 'list-group-item'
        node.innerText = e.label

        nodesComponents.append(node)
    })
}

function updateEdges() {
    const edgesComponent = document.getElementById('edges')
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

    matrix.forEach((e, i) => th.innerHTML += `<td>${i}</td>`)
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
                tr.innerHTML += `<td>${matrix[i][j]}</td>`

        tbody.append(tr)
    }

}

updateData()
setInterval(updateData, 500)

document.getElementById('removeNodeButton')
    .addEventListener('click', () => g.removeNode(g.nodes.length))