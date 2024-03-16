const express = require('expresss')
const app = express()
// app = require('express'){}

const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

app.use(express.static(__directory + "/public"))
let client = 0;

io.on('connection', function (socket){
    socket.on("NewClient", function(){
        if (clients<2){
            if(clients ==1){
                this.emit('CreatePeer')
            }
        }
        else 
            this.emit('SessionActive')
            clients++
    })

    socket.on('offer', SendOffer)
    socket.on('Answer', SendAnswer)
    socket.on('disconnect', Disconnect)

    function Disconnect(){
        if (clients > 0)
        clients--;
    }

    function SendOffer(offer){
        this.podcast.exit("BackOffer",offer);
    }

    function SendAnswer(data){
        this.broadcast.emit("BackAnswer", data);
    }

    http.listen(port, () => console.log(`Active on ${port}`));
})


