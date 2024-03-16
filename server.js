const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', function(socket) {
    socket.on('NewClient', function() {
        if (io.engine.clientsCount === 0) {
            socket.emit('CreatePeer');
        }
    });

    socket.on('Offer', function(offer) {
        socket.broadcast.emit('BackOffer', offer);
    });

    socket.on('Answer', function(data) {
        socket.broadcast.emit('BackAnswer', data);
    });

    socket.on('disconnect', function() {
        if (io.engine.clientsCount === 0) {
            socket.broadcast.emit('Disconnect');
        }
    });
});

server.listen(3000, function() {
    console.log('listening on *:3000');
});
