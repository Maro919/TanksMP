var WebHandler = require('./webhandler');
var Player = require('./player').Player;

WebHandler.startServer(main);

function main() {
    setInterval(sendPlayerData, 250);
    setInterval(tick, 1000/30);
        
    WebHandler.server.on('request', function(request) {
        var connection = request.accept('connect', request.origin);
        console.log('Connection from ' + request.origin + ' accepted.');

        connection.on('close', function(reasonCode, description) {
            console.log('Peer ' + this.remoteAddress + ' disconnected.');
            if(Player.remove(this.playerName)) {
                console.log(this.playerName + ' disconnected.');
            }
        });

        connection.on('message', function(message) {
            if (message.type === 'utf8') {
                var data = JSON.parse(message.utf8Data);
                
                switch(data.type) {
                    case 'login':
                        if(Player.add(data.name, this) != null) {
                            console.log(this.remoteAddress + " logged in as " + data.name);
                            this.playerName = data.name;
                            this.sendUTF(JSON.stringify({
                                type: 'login',
                                msg: 'Accepted.'
                            }));
                        }else{
                            console.log(this.remoteAddress + " unable to login as " + data.name);
                        }
                        break;
                    case 'action':
                        var player = Player.get(this.playerName);
                        if(player) {
                            player.processUserAction(data.action);
                        }
                        break
                }
            }
        });
    });
}

function tick() {
    for(var i = 0; i < Player.list.length; i++) Player.list[i].update();
    for(var i = 0; i < Bullet.list.length; i++) Bullet.list[i].update();
}

function sendPlayerData(){
    var package = {
        type: "playerData",
        playerData: {}
    };
    for(var i = 0; i < Player.list.length; i++) {
        var player = Player.list[i];
        
        package.playerData[player.name] = {
            x: player.x,
            y: player.y,
            rot: player.rot
        };
    }
    
    for(var i = 0; i < Player.list.length; i++) {
        var player = Player.list[i];
        player.connection.sendUTF(JSON.stringify(package));
    }
}

function sendBulletData(){
    var package = {
        type: "playerData",
        playerData: {}
    };
    for(var i = 0; i < Player.list.length; i++) {
        var player = Player.list[i];
        
        package.playerData[player.name] = {
            x: player.x,
            y: player.y,
            rot: player.rot
        };
    }
    
    for(var i = 0; i < Player.list.length; i++) {
        var player = Player.list[i];
        player.connection.sendUTF(JSON.stringify(package));
    }
}