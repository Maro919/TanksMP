var socketMain;
var input_name, input_login;
var left = false;
var right = false;
var shoot = false;

var name;

var canvas;
var ctx2d;

var inputLeft;
var inputRight;
var inputShoot;

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
        test();
    }
    
    input_name.value = Math.random()*256;
    //input_login.onclick();
    
    inputLeft = document.getElementById("left_arrow");
    inputRight = document.getElementById("right_arrow");
    inputShoot = document.getElementById("shoot_button");
    
    socketMain.addEventListener("message", function(event) {
        var data = JSON.parse(event.data);
        
        switch(data.type) {
            case 'login':
                console.log('Logged in!');
                break;
            case 'playerData':
                break;
        }
    });
    
}

function sendUserAction(action) {
    console.log(action);
    socketMain.send(JSON.stringify({
        type: 'action',
        action: action
    }));
}

window.addEventListener("load", function() {
    socketMain = new WebSocket("ws://192.168.43.74:8080", "connect");

    socketMain.onopen = function (event) {
        main();
    };
});
function test(){
    document.ontouchstart = function(e) {
        e.preventDefault();
    }

    inputLeft.ontouchstart = inputLeft.onmousedown = function(e) {
        e.preventDefault();
        sendUserAction("leftDown");
    };

    inputLeft.ontouchend = inputLeft.onmouseup = function(e) {
        e.preventDefault();
        sendUserAction("leftUp");
    };

    inputRight.ontouchstart = inputRight.onmousedown = function(e) {
        e.preventDefault();
        sendUserAction("rightDown");
    };

    inputRight.ontouchend = inputRight.onmouseup = function(e) {
        e.preventDefault();
        sendUserAction("rightUp");
    };
    
    inputShoot.ontouchstart = inputShoot.onmousedown = function(e) {
    e.preventDefault();
    sendUserAction("shootDown");
    };
    inputShoot.ontouchend = inputShoot.onmouseup = function(e) {
        e.preventDefault();
        sendUserAction("shootUp");
    };
}