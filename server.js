const app = require("express")()

const {Server} = require('socket.io')

const http = require('http');
const { Socket } = require("socket.io-client");
const ACTIONS = require("./src/Action");

const server = http.createServer(app);

const io = new Server(server, {
    cors:'*',
});

const userSocketMap = {};

function getAllConnectedClients(roomId){
    // map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return  {
            socketId,
            username: userSocketMap[socketId],
        }
    });
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on(ACTIONS.JOIN, ({roomId, username})=>{
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        
        const clients = getAllConnectedClients(roomId);
        // console.log(clients)
        clients.forEach(({socketId})=>{
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            })
        })
    })

})

server.listen(4000, ()=>{console.log(`listing on port 4000`)});