const express = require('express');
const app = express();

const http = require('http').Server(app);

const io = require('socket.io')(http);
const port = process.env.PORT || 3000


app.use(express.static(__dirname + "/public"))
let clients = 0;

io.on('connection', function(socket){
    socket.on("NewClient", function(){
        if (clients < 2 ){
            if(clients == 1){
                this.emit('CreatePeer')
            }
        }
        else 
            this.emit('SessionActive')
        clients++
    })
    socket.on('Offer', SendOffer)
    socket.on('Answer', SendAnswer)
    socket.on('disconnect', Disconnect)
})

    function Disconnect (){
    if (clients > 0)
    clients--
    }

    function SendOffer (offer) {
        this.broadcast.emit("BackOffer", offer)
    }
    function SendAnswer (data) {
        this.broadcast.emit("BackAnswer", data)
    }

    http.listen(port, () => console.log(`Active on ${port}`))









// const server = http.createServer(app);
// const io = socketIo(server);

// io.on('connection', function(socket) {
//     socket.on('NewClient', function() {
//         if (io.engine.clientsCount === 0) {
//             socket.emit('CreatePeer');
//         }
//     });

//     socket.on('Offer', function(offer) {
//         socket.broadcast.emit('BackOffer', offer);
//     });

//     socket.on('Answer', function(data) {
//         socket.broadcast.emit('BackAnswer', data);
//     });

//     socket.on('disconnect', function() {
//         if (io.engine.clientsCount === 0) {
//             socket.broadcast.emit('Disconnect');
//         }
//     });
// });

// server.listen(3000, function() {
//     console.log('listening on *:3000');
// });


