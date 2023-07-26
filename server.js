const app = require("express")()

const {Server} = require('socket.io')

const http = require('http');
const { Socket } = require("socket.io-client");

const server = http.createServer(app);

const io = new Server(server, {
    cors:'*',
});


io.on('connection', (socket) => {
    console.log('socket connected', socket.id);
})

server.listen(4000, ()=>{console.log(`listing on port 4000`)});