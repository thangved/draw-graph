import Graph from 'graph-board'
import openContextMenu from './context';

export default function core() {

    const g = new Graph({
        directed: false,
        showDistance: false,
        showGrid: true,
        character: true,
    })

    let searchType = 0

    // g.addNode(1)
    // g.addNode(2)
    // g.addNode(3)
    // g.addNode(4)
    // g.addEdge(1, 4)
    // g.addEdge(1, 2)
    // g.addEdge(2, 3)
    // g.addEdge(2, 4)

    g.appendTo('#canvas')

    const edgesComponent = document.getElementById('edges')
    const guide = document.getElementById('guide')
    const optionsComponent = document.getElementById('optionsComponent')
    const firstSearch = document.getElementById('firstSearch')

    function updateData() {
        updateEdges()
        updateTable()
        updateSearchNodes()
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
                <span>
                    ${g.character ? g.alphabet[e.from] : e.from}
                </span> 
                <div>
                    <i class="fas fa-long-arrow-alt-right"></i>
                </div>
                <span>
                    ${g.character ? g.alphabet[e.to] : e.to}
                </span>
            </li>`
            edgesComponent.append(Edge)

        })
    }

    function updateTable() {
        const table = document.getElementById('matrix')
        const thead = table.querySelector('thead')
        const th = document.createElement('tr')
        const matrix = g.exportMatrix()

        matrix.forEach((e, i) => th.innerHTML += `<td>${i ? g.getNodes()[i - 1]?.label : 'X'}</td>`)
        thead.innerHTML = ''
        if (g.nodes.length === 0)
            return
        thead.append(th)

        const tbody = table.querySelector('tbody')
        tbody.innerHTML = ''
        for (let i = 1; i < matrix.length; i++) {
            const tr = document.createElement('tr')
            for (let j = 0; j < matrix.length; j++)
                if (j === 0)
                    tr.innerHTML += `<td>${g.getNodes()[i - 1].label}</td>`
                else
                    tr.innerHTML += `<td class="${matrix[i][j] && 'table-primary'}">${matrix[i][j]}</td>`

            tbody.append(tr)
        }

    }

    function updateSearchNodes() {
        const searchNodes = firstSearch.querySelector('#searchNodes')
        if (searchNodes.querySelectorAll('button').length === g.getNodes().length)
            return

        searchNodes.innerHTML = ``

        g.getNodes().forEach((node, index) => {
            const button = document.createElement('button')
            button.className = 'btn btn-outline-primary'
            button.innerText = node.label
            searchNodes.appendChild(button)

            button.onclick = () => {
                switch (searchType) {
                    case 0:
                        updateSearchResult(g.deepFirstSearch(index + 1))
                        break
                    case 1:
                        updateSearchResult(g.breadthFirstSearch(index + 1))
                        break
                }
            }
        })
    }

    function updateSearchResult(data) {
        const deleteResult = firstSearch.querySelector('#deleteResult')
        const result = firstSearch.querySelector('#edges')
        result.innerHTML = ``

        data.forEach(e => {
            result.innerHTML += `<li class="edge list-group-item">
            <span>
                ${g.getNodes()[e.from - 1].label}
            </span> 
            <div>
                <i class="fas fa-long-arrow-alt-right"></i>
            </div>
            <span>
                ${g.getNodes()[e.to - 1].label}
            </span>
        </li>`
        })

        deleteResult.onclick = () => {
            result.innerHTML = ''
            g.motionStop()
        }

    }


    document.getElementById('removeNodeButton')
        .onclick = () => g.removeNode(g.nodes.length)

    const matrixNodeNode = document.getElementById('matrixNodeNode')
    const optionTab = document.getElementById('optionTab')
    const tabButtons = optionTab.querySelectorAll('.nav-item')
    const firstSearchButtons = firstSearch.querySelectorAll('.nav-item')

    firstSearchButtons.forEach((ele, index) => [
        ele.onclick = () => {
            firstSearchButtons.forEach(e => e.querySelector('a').classList.remove('active'))
            firstSearchButtons[index].querySelector('a').classList.add('active')
            searchType = index
        }
    ])

    tabButtons.forEach((e, i) => {
        e.onclick = () => {
            tabButtons.forEach(e => e.querySelector('a').classList.remove('active'))
            e.querySelector('a').classList.add('active')

            edgesComponent.style.display = 'none'
            guide.style.display = 'none'
            optionsComponent.style.display = 'none'
            matrixNodeNode.style.display = 'none'
            firstSearch.style.display = 'none'

            switch (i) {
                case 0:
                    optionsComponent.style.display = 'block'
                    break
                case 1:
                    edgesComponent.style.display = 'block'
                    break
                case 2:
                    matrixNodeNode.style.display = 'block'
                    break
                case 3:
                    firstSearch.style.display = 'block'
                    break

                default:
                    guide.style.display = 'block'

            }
        }
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

        if (event.buttons === 2)
            addContextMenu(event)
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

    function addContextMenu(event) {
        event.preventDefault()
        openContextMenu(event.clientX, event.clientY)
    }

    window.addEventListener('contextmenu', addContextMenu)

    document.getElementById('directedToggle').addEventListener('click', () => {
        g.directed = !g.directed
    })

    document.getElementById('showDistanceToggle').addEventListener('click', () => {
        g.showDistance = !g.showDistance
    })

    document.getElementById('showGridToggle').addEventListener('click', () => {
        g.showGrid = !g.showGrid
    })

    document.getElementById('characterToggle').addEventListener('click', () => {
        g.character = !g.character
    })

    updateData()
    setInterval(updateData, 1000)
}