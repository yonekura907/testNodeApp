
//サーバーから付与されるidと色相
var myData = {
    id:'',
    hue: 0
}

// socket.ioのインスタンス変数を作成
var socket = io();

socket.on('sendSocketId',function(data){
    myData.id = data.id;
    myData.hue = data.hue;
    console.log(myData);
});


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
}

// ループ関数
function draw() {
    background(0,20);
    colorMode(HSB, 360, 100, 100, 100);
    fill(myData.hue,100,100,50);
    noStroke();
    ellipse(mouseX, mouseY, 100, 100);
}

function mouseDragged() {
    var sendData = {
        id: myData.id,
        hue: myData.hue,
        x: mouseX,
        y: mouseY
    }
    // サーバーにデータを送信
    socket.emit('spToServer', sendDatas);
}
