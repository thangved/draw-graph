import introJs from 'intro.js'
import 'intro.js/introjs.css'
import openContextMenu from './context'

export default function intro() {
    openContextMenu(document.body.offsetWidth / 2, document.body.offsetHeight / 2)
    introJs()
        .setOptions({
            steps: [
                {
                    title: 'Xin chào',
                    intro: 'Đây là hướng dẫn tân thủ, còn tôi là The Trainer',
                },
                {
                    title: 'Trước khi bắt đầu',
                    intro: 'Nhấn "Kế tiếp" để bắt đầu chứ còn trước sau gì : )'
                },
                {
                    title: 'Tùy chọn nhanh',
                    intro: 'Chuột phải để xem một số tùy chọn nhanh',
                    element: document.getElementById('optionsOverlay'),
                },
                {
                    title: 'Bảng vẽ',
                    element: document.getElementById('canvas'),
                    intro: 'Đây là nơi chúng ta sẽ vẽ đồ thị',
                },
                {
                    title: 'Thêm đỉnh',
                    element: document.getElementById('canvas'),
                    intro: 'Nhấp đúp để thêm một đỉnh',
                },
                {
                    title: 'Di chuyển đỉnh',
                    element: document.getElementById('canvas'),
                    intro: 'Nhấp chọn và kéo qua lại để di chuyển vị trí của đỉnh',
                },
                {
                    title: 'Thêm đỉnh',
                    element: document.getElementById('canvas'),
                    intro: 'Hãy vẽ thêm một đỉnh',
                },
                {
                    title: 'Thêm cung',
                    element: document.getElementById('canvas'),
                    intro: 'Nhấn giữ SHIFT và kéo từ đỉnh này đến đỉnh kia để thêm một cung',
                },
                {
                    title: 'Độ cong của cung',
                    element: document.getElementById('canvas'),
                    intro: 'Chọn vào cung và kéo trái phải để tăng giảm động cong của cung',
                },
                {
                    title: 'Tùy chọn',
                    intro: 'Bạn có thể tìm thấy một số tùy chọn cho đồ thị của mình ở đây',
                    element: document.getElementById('optionsComponent'),
                },
                {
                    title: 'Xóa nút',
                    intro: 'Để thuận tiện cho người dùng mà chủ yếu là bớt việc cho lập trình viên, chúng tôi cung cấp cho bạn cái nút này để xóa nút lớn nhất trong đồ thị',
                    element: document.getElementById('removeNodeButton'),
                },
                {
                    title: 'Xem một số thứ khác',
                    intro: 'Trên đây có một số thông tin của đồ thị, bạn có thể khám phá thêm',
                    element: document.getElementById('optionTab'),
                },
                {
                    title: 'Xong',
                    intro: 'Vậy là xong phần hướng dẫn, chúc bạn có một học kỳ không rớt môn',
                }
            ],
            nextLabel: 'Kế tiếp',
            prevLabel: 'Trước đó',
            doneLabel: 'Xong',
        })
        .start()
        .onexit(() => {
            return confirm('Bạn có muốn thoát hướng dẫn')
        })
}