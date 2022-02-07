const Graph = require("graph-board");
import { io } from "socket.io-client";
import toast from "./toast";

export default function socketClient(graph = new Graph()) {
	const socket = io("https://draw-graph.herokuapp.com");
	// const socket = io();
	const id = Math.random().toString(36).slice(4).toUpperCase();

	socket.on(`subscribe ${id}`, (clientId) => {
		socket.emit("change graph", { id, graph });
		toast({
			message: `${clientId} đã kết nối`,
			type: "bg-success text-white",
			timeout: 2000,
		});
		addClient(clientId);
	});

	function addClient(id) {
		document.getElementById("clients").innerHTML += `
			<li class="list-group-item">
				&#9889; ${id} đang xem
			</li>
		`;
	}

	return {
		getId() {
			graph.onchange = () => socket.emit("change graph", { id, graph });
			return id;
		},
		connect(providerId, callback) {
			if (providerId === id)
				return toast({
					message:
						"Bạn đang tự đang ký bằng id của mình, thiệt là ảo quá đi : )",
					timeout: 2000,
				});

			socket.emit("subscribe", {
				providerId,
				id: "xxxxxx" + id.slice(6),
			});

			socket.on(providerId, (gr) => {
				graph.nodes = gr.nodes;
				graph.edges = gr.edges;
				graph.character = gr.character;
				graph.directed = gr.directed;
				graph.motion = gr.motion;
				graph.showGrid = gr.showGrid;
				graph.showDistance = gr.showDistance;
				graph.motionSteps = gr.motionSteps;
				graph.linkedParts = gr.linkedParts;
			});

			callback();
		},
	};
}
