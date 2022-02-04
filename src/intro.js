import introJs from 'intro.js'
import 'intro.js/introjs.css'

export default function intro() {
    introJs()
        .setOptions({
            steps: [
                {
                    title: 'Xin chào',
                    intro: 'Đây là hướng dẫn, còn tôi là người hướng dẫn'
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
                    title: 'Xong',
                    intro: 'Vậy là xong phần hướng dẫn, bạn có thể tiếp tục phần mềm một cách vui vẻ',
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