// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// スタティックファイルはpublicフォルダへ
app.use(express.static('public'));

// '/'でアクセスしたらviewフォルダのindex.htmlにアクセスする
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
// const listener = app.listen(process.env.PORT, function() {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

var dotArr = [];
var clientCount = 0;

io.on('connection', function(socket) {
    console.log('a user connected' + socket.id);

    clientCount++;
    if (clientCount > 18) {
        clientCount = 0;
    }

    var clientData = {
        id: socket.id,
        hue: clientCount*20
    }

    //socket idを送信
    socket.emit('sendSocketId', clientData);

    //
    // socket.on('chat message', function(msg){
    //     console.log('message: ' + msg);
    //     io.emit('chat message', msg);
    // });


    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
