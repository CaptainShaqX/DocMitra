let Peer = require('simple-peer');
let socket = io();
const video = document.querySelector('video');
let client = {};

//get stream
navigator.mediaDevices.getUserMedia( {video : true, audio : true} )
    .then(stream => {
        socket.emit('NewClient')
        video.srcObject = stream;
        video.play();

// Used to initaialize a peer connection
        function InitPeer(type){
            let peer = new Peer ({initiator: (type == 'init') ? true : false, stream: stream, tricle: false});
            peer.on('stream', function(stream) {
            CreateVideo(stream)
        })
        peer.on('close', function(){
            document.getElementById('peerVideo').remove();
            peer.destroy();
        })
        return peer;
        }

// FOr peer of type init
        function MakePeer(){
            client.gotAnswer = false;
            let peer = InitPeer('init')
            peer.on('signal', function(data){
                if(!client.gotAnswer){
                    socket.emit('Offer', data);
                }
            })
            client.peer = peer;
        }

// FOr peer of Type init
        function FrontAnswer(offer){
            let peer = InitPeer('notInit');
            peer.on('signal', (data) => {
                socket.emit('Answer', data);
            })
            peer.signal(offer)
        }


        function SignalAnswer(answer){
            client.gotAnswer = true;
            let peer = client.peer
            peer.signal(answer)
        }

        function CreateVideo(stream){
            let video = document.createElement('video')
            video.id = 'peerVideo';
            video.srcObject = stream;
            video.class = 'embed-responsive-item';
            document.querySelector('#peerDiv').appendChild(video);
            video.play();
        }

        function SessionActive(){
            document.write('Session Active, Please Come Back Later')
        }

        socket.on('BackOffer', FrontAnswer)
        socket.on('backAnswer', SignalAnswer)
        socket.on('SessionActive', SessionActive)
        socket.on('CreatePeer', MakePeer)


})

.catch(err => document.write(err));











// let Peer = require('simple-peer');
// let io = require('socket.io-client');
// const video = document.querySelector('video');
// let socket = io();

// let client = {};




// // get stream
// navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//     .then(stream => {
//         socket.emit('NewClient');
//         video.srcObject = stream;
//         video.play();

//         // function to initialize a peer connection
//         function InitPeer(type) {
//             let peer = new Peer({ initiator: (type == 'init'), stream: stream, trickle: false });
//             peer.on('stream', function (stream) {
//                 CreateVideo(stream);
//             });
//             peer.on('close', function () {
//                 document.getElementById('peerVideo').remove();
//                 peer.destroy();
//             });
//             return peer;
//         }

//         // for peer of type 'init'
//         function MakePeer() {
//             client.gotAnswer = false;
//             let peer = InitPeer('init');
//             peer.on('signal', function (data) {
//                 if (!client.gotAnswer) {
//                     socket.emit('Offer', data);
//                 }
//             });
//             client.peer = peer;
//         }

//         // for peer of Type 'notInit'
//         function FrontAnswer(offer) {
//             let peer = InitPeer('notInit');
//             peer.on('signal', (data) => {
//                 socket.emit('Answer', data);
//             });
//             peer.signal(offer);
//         }

//         function SignalAnswer(answer) {
//             client.gotAnswer = true;
//             let peer = client.peer;
//             peer.signal(answer);
//         }

//         function CreateVideo(stream) {
//             let video = document.createElement('video');
//             video.id = 'peerVideo';
//             video.srcObject = stream;
//             video.classList.add('ember-responsive-item');
//             document.querySelector('#peerDiv').appendChild(video);
//             video.play();
//         }

//         function SessionActive() {
//             document.write('Session Active, Please Come Back Later');
//         }
//     })
//     .catch(err => document.write(err));
