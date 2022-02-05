import core from './core';
import intro from './intro';
import socketClient from './socketClient';

import 'bootstrap/dist/css/bootstrap.min.css'

const g = core()
const socket = socketClient(g)


if (!JSON.parse(localStorage.getItem('intro_showed') || 'false')) {
    intro()
    localStorage.setItem('intro_showed', 'true')
}
document.getElementById('openIntroButton').addEventListener('click', () => {
    intro()
})

const liveShare = document.getElementById('liveShare')
const myId = liveShare.querySelector('#myId')

myId
    .querySelector('button')
    .onclick = ({ target }) => {
        const input = document.createElement('input')
        input.readOnly = true
        input.value = socket.getId()
        input.className = 'form-control'

        const button = document.createElement('button')
        button.className = 'btn btn-outline-primary'
        button.innerHTML = `Sao chép <i class="fa fa-copy"></i>`
        button.onclick = () => {
            navigator.clipboard.writeText(socket.getId())
        }

        target.remove()
        myId.append(input, button)
    }

const connectButton = liveShare.querySelector('#connectButton')

connectButton.onclick = () => {
    const connectId = liveShare.querySelector('#connectId')
    if (!connectId.value)
        return alert('Vui lòng nhập id')

    socket.connect(connectId.value)
    alert('Đã kết nối')

}