const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});
const path = require("path");

app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./docs/index.html"));
});

app.use("/", express.static("./docs"));

io.on("connection", (socket) => {
	socket.on("change graph", ({ id, graph }) => {
		io.emit(id, graph);
	});
	socket.on("subscribe", (ids) => {
		io.emit(`subscribe ${ids.providerId}`, ids.id);
	});
});

server.listen(process.env.PORT || 3000);
