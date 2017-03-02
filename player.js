function Player(p_name, p_connection) {
    this.name = p_name;
    this.connection = p_connection;
    this.x = 10;
    this.y = 20;
    this.speed = 0;
    this.rot = 0;
    this.left = false;
    this.right = false;
    this.shoot = false;
    
    this.processUserAction = function(action) {
        switch(action) {
            case "leftDown":
                this.left = true;
                break;
            case "rightDown":
                this.right = true;
                break;
            case "shootDown":
                this.shoot = true;
                break;
            case "leftUp":
                this.left = false;
                break;
            case "rightUp":
                this.right = false;
                break;
            case "shootUp":
                this.shoot = false;
                break;
        }
        console.log(this.name + " : " + action);
    },
    
    this.update = function() {
        if (this.left && this.right) this.speed = 3;
        else if (this.left) this.rot-=4;
        else if (this.right) this.rot+=4;
        else this.speed = 0;
        
        this.x += Math.sin(this.rot*Math.PI/180)*this.speed;        
        this.y -= Math.cos(this.rot*Math.PI/180)*this.speed;        
    }
}

Player.list = new Array(0);
Player.add = function(p_name, p_connection) {
    for(var i = 0; i < Player.list.length; i++) {
        if(Player.list[i].name == p_name) {
            return null;
        }
    }
    
    var player = new Player(p_name, p_connection);
    Player.list.push(player);
    return player;
}
Player.remove = function(p_name) {
    for(var i = 0; i < Player.list.length; i++) {
        if(Player.list[i].name == p_name) {
            Player.list.splice(i, 1);
            return true;
        }
    }
    
    return false;
}
Player.get = function(p_name) {
    for(var i = 0; i < Player.list.length; i++) {
        if(Player.list[i].name == p_name) {
            return Player.list[i];
        }
    }
}

module.exports.Player = Player;