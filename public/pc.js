// socket.ioのインスタンス変数を作成
var socket = io();

var dotArr = [];

// サーバからデータを受信
socket.on('serverToPc', function (data) {
    console.log(data);
    // 受信したデータを表示
    dotArr = data;
});

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
}

// ループ関数
function draw() {
    background(0,100);
    colorMode(HSB, 360, 100, 100, 100);
    noStroke();

    for (var i = 0; i < dotArr.length; i++) {
        var posX = 0;
        var posY = 0;
        if(dotArr[i].x > 1 && dotArr[i].y > 1){
            posX = map(dotArr[i].x,0,375,0,windowWidth);
            posY = map(dotArr[i].y,0,550,0,windowHeight);
            fill(dotArr[i].hue, 100, 100, 20);
            ellipse(posX, posY, 200, 200);
        } else {
            fill(dotArr[i].hue, 100, 0, 100);
            ellipse(posX, posY, 100, 100);
        }

    }
}
