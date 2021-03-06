import core from "./core";
import intro from "./intro";
import socketClient from "./socketClient";

import "bootstrap/dist/css/bootstrap.min.css";
import toast from "./toast";

const g = core();
const socket = socketClient(g.graph, g.onchange);

if (!JSON.parse(localStorage.getItem("intro_showed") || "false")) {
	intro();
	localStorage.setItem("intro_showed", "true");
}
document.getElementById("openIntroButton").addEventListener("click", () => {
	intro();
});

const liveShare = document.getElementById("liveShare");
const myId = liveShare.querySelector("#myId");

myId.querySelector("button").onclick = ({ target }) => {
	const input = document.createElement("input");
	input.readOnly = true;
	input.value = socket.getId();
	input.className = "form-control";

	const button = document.createElement("button");
	button.className = "btn btn-outline-primary";
	button.innerHTML = `Sao chép <i class="fa fa-copy"></i>`;
	button.onclick = () => {
		navigator.clipboard.writeText(socket.getId());
		toast({
			message: "Đã sao chép id vào khay nhớ tạm",
			type: "bg-primary text-white",
			timeout: 2000,
		});
	};

	target.remove();
	myId.append(input, button);
};

const connectButton = liveShare.querySelector("#connectButton");

connectButton.onclick = () => {
	const connectId = liveShare.querySelector("#connectId");
	if (!connectId.value)
		return toast({
			message: "Vui lòng nhập id!",
			timeout: 2000,
			type: "bg-danger text-white",
		});

	socket.connect(connectId.value, () => {
		toast({
			message: "Đã kết nối với " + connectId.value,
			timeout: 2000,
			type: "bg-success text-white",
		});

		document.getElementById("canvas").classList.add("full");
		g.graph.appendTo("#canvas");

		g.graph.board.canvas.ondblclick = () => {
			toast({
				message:
					"Bạn không thể chỉnh sửa, để thoát chế độ này hãy reload lại trang web",
				timeout: 2000,
				type: "bg-warning",
			});
		};
		g.graph.board.canvas.onmousemove = () => {};
		document.title += " [View Only]";
	});
};
