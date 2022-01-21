import Graph from './Graph'

const g = new Graph()
g.board.appendTo('#canvas')

function updateData() {
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

updateData()
setInterval(updateData, 500)

document.getElementById('addNodeButton')
    .addEventListener('click', () => g.addNode(g.nodes.length + 1))
document.getElementById('removeNodeButton')
    .addEventListener('click', () => g.removeNode(g.nodes.length))