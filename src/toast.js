export default function toast({ message, timeout, type }) {
    const div = document.createElement('div')
    div.innerHTML = `<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 110">
        <div id="liveToast" class="toast fade show ${type || ''}" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img width="32px" src="https://github.com/thangved.png" class="rounded me-2" alt="thangved">
                <strong class="me-auto">Minh Thắng</strong>
                <small>vài giây trước</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    </div>`

    document.body.appendChild(div)

    const removeTimeOut = setTimeout(() => {
        div.remove()
    }, timeout || 3000)

    div.querySelector('button').onclick = () => {
        clearTimeout(removeTimeOut)
        div.remove()
    }

}