const app = require("express")()
const cors = require('cors')
const {Server} = require('socket.io')

const http = require('http');
const ACTIONS = require("./src/Action");

const server = http.createServer(app);

const io = new Server(server, {
    cors:'*',
});

const userSocketMap = {};

app.use(cors());

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

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });



    socket.on(ACTIONS.CODE_CHANGE, ({roomId, code})=>{
        io.to(roomId).emit(ACTIONS.CODE_CHANGE, {code});
    })


    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
      });    


    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });

})

server.listen(4000, ()=>{console.log(`listing on port 4000`)});