const Graph = require('graph-board')
import { io } from 'socket.io-client'

export default function socketClient(graph = new Graph()) {
    const socket = io()
    const id = Math.random().toString(36).slice(4)

    graph.onchange = () => {
        socket.emit(id, graph)
    }

    socket.emit('create id', id)

    return {
        getId() {
            return id
        },
        connect(id) {
            socket.on(id, gr => {
                graph.nodes = gr.nodes
                graph.edges = gr.edges
                graph.character = gr.character
                graph.directed = gr.directed
                graph.motion = gr.motion
                graph.motionSteps = gr.motionSteps
            })
        },
    }
}
