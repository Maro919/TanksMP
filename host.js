var socketMain;
var online = false;
var address = "wss://worm-wars.herokuapp.com";
var port = 5000;

var canvas, ctx;
var lastTime = Date.now();

function main() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    
    Player.init();
    
    socketMain.send(JSON.stringify({
        type: "host"
    }));
    
    setInterval(tick, 5);
}

function tick() {
    var now = Date.now();
    var delta = now - lastTime;
    lastTime = now;
    
    ctx.save();
    
    ctx.fillStyle = "#335588";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    Camera.update(delta);
    Camera.applyTransform();
    
    ctx.fillStyle = "#883355";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for(var i = 0; i < Player.list.length; i++) {
        Player.list[i].update(delta);
        Player.list[i].display();
    }
    
    ctx.restore();
}

window.addEventListener('load', function(e) {
    //if(process.env.PORT == undefined) {
        socketMain = new WebSocket(address, "connect");
    /*}else{
        port = process.env.PORT;

        socketMain = new WebSocket("wss://https://worm-wars.herokuapp.com:" + port, "connect");
        online = true;
    }*/
    
    socketMain.onopen = function (event) {
        main();
    };

    socketMain.addEventListener("message", function(event) {
        var data = JSON.parse(event.data);
        switch(data.type) {
            case 'playerData':

                for(var i = 0; i < Player.list.length; i++) {
                    Player.list[i].updated = false;
                }

                for(var i = 0; i < data.playerAmount; i++) {
                    var player = Player.get(data.playerData[i].name);
                    if(!player)
                        player = Player.add(data.playerData[i].name);

                    player.lastLoc.setVec(player.loc);
                    player.loc.x = data.playerData[i].x;
                    player.loc.y = data.playerData[i].y;
                    player.tileset = data.playerData[i].color;
                    player.charge = data.playerData[i].charge;
                    player.updated = true;
                }

                for(var i = 0; i < Player.list.length; i++) {
                    if(!Player.list[i].updated) {
                        Player.list.splice(i, 1);
                        i--;
                    }
                }

                break;
        }
    });
});