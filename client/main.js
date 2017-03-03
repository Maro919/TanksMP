var socketMain;
var input_name, input_login;
var left = false;
var right = false;
var shoot = false;

var tanks;

var name;

var canvas;
var ctx2d;

function main() {
    input_name = document.getElementById("input_name");
    input_login = document.getElementById("input_login");
    
    input_login.onclick = function(e) {
        socketMain.send(JSON.stringify({
            type: 'login',
            name: input_name.value
        }));
        name = input_name.value;
    
        input_name.style.display = "none";
        input_login.style.display = "none";
    }
    
    socketMain.addEventListener("message", function(event) {
        var data = JSON.parse(event.data);
        
        switch(data.type) {
            case 'login':
                console.log('Logged in!');
                break;
            case 'playerData':
                loadData(data.playerData);
                break;
        }
    });
    canvas = document.getElementById("gameScreen");
    ctx2d = canvas.getContext("2d");
    
}

function loadData(object){
    tanks = object;
}

function update(object) {
    object.x += Math.sin(object.rot*Math.PI/180)*object.speed;        
    object.y -= Math.cos(object.rot*Math.PI/180)*object.speed;        
}
function display(){
    ctx2d.clearRect(0, 0, canvas.width, canvas.height);
    ctx2d.translate(-tanks[name].x+canvas.width/2, -tanks[name].y+canvas.height/2);
    //ctx2d.clearRect(0, 0, canvas.width, canvas.height);
    
    for (var key in tanks){
        displayTank(tanks[key].x, tanks[key].y, tanks[key].rot, 0, key);
    }
    
    ctx2d.translate(tanks[name].x-canvas.width/2, tanks[name].y-canvas.height/2);
}

function sendUserAction(action) {
    console.log(action);
    socketMain.send(JSON.stringify({
        type: 'action',
        action: action
    }));
}

window.addEventListener("load", function() {
    socketMain = new WebSocket("ws://tanksmp.herokuapp.com", "connect");

    socketMain.onopen = function (event) {
        main();
    };
});

window.addEventListener("keydown", function(e) {
    var keyCode = e.keyCode | e.which;
    
    if(keyCode == 65 && !left) { //left
        left = true;
        sendUserAction("leftDown");
    }
    if(keyCode == 83 && !shoot) { //shoot
        shoot = true;
        sendUserAction("shootDown");
    }
    if(keyCode == 68 && !right) { //right
        right = true;
        sendUserAction("rightDown");
    }
});

window.addEventListener("keyup", function(e) {
    var keyCode = e.keyCode | e.which;
    if(keyCode == 65) { //left
        left = false;
        sendUserAction("leftUp");
    }
    if(keyCode == 83) { //shoot
        shoot = false;
        sendUserAction("shootUp");
    }
    if(keyCode == 68) { //right
        right = false;
        sendUserAction("rightUp");
    }
});