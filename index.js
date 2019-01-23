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

    // 接続ログ
    console.log('a user connected' + socket.id);

    // 初期設定
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

    var receiveData = {
        id: socket.id,
        hue: clientCount*20,
        x:0,
        y:0
    }
    dotArr.push(receiveData);


    //spから受け取る
    socket.on('spToServer', function(data){
        for (let i = 0; i < dotArr.length; i++) {
            if(dotArr[i].id == data.id){
                dotArr[i].x = data.x;
                dotArr[i].y = data.y;
            }
        }
        console.log(dotArr);

        //PCにデータを送信
        socket.broadcast.emit('serverToPc', dotArr);
    });


    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
