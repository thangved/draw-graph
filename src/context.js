/**
 * Create context menu
 * @param {number} x - The x position when open 
 * @param {number} y - The y position when open
 */
export default function openContextMenu(x, y) {
    document.getElementById('optionsOverlay')?.remove()
    const optionsMenu = document.createElement('div')
    optionsMenu.id = 'optionsOverlay'
    optionsMenu.className = 'btn-group-vertical'
    optionsMenu.style = `width: 200px;position: fixed; left: ${x}px; top: ${y}px; background: #fff; z-index: 100;border: 1px #ddd solid;border-radius: 5px;box-shadow: 0 0 5px #00000020;`

    const button0 = document.createElement('button')
    const button1 = document.createElement('button')
    const button2 = document.createElement('button')
    const button3 = document.createElement('button')

    button0.className = 'btn btn-light'
    button0.innerHTML = 'Thêm đỉnh'
    button0.onclick = () => {
        const { x, y } = g.board.clientPosition
        g.addNode(g.nodes.length + 1, x, y)
    }

    button1.className = 'btn btn-light'
    button1.innerHTML = 'Xóa đỉnh'
    button1.onclick = () => g.removeNode(g.nodes.length)

    button2.className = 'btn btn-light'
    button2.innerHTML = 'Duyệt theo chiều rộng'
    button2.onclick = () => tabButtons[3].click()

    button3.className = 'btn btn-light'
    button3.innerHTML = 'Duyệt theo chiều sâu'
    button3.onclick = () => tabButtons[3].click()

    optionsMenu.append(button0, button1, button2, button3)
    document.body.append(optionsMenu)
}