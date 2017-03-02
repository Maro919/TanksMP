var socketMain = new WebSocket("wss://worm-wars.herokuapp.com", "connect");
var address = "wss://worm-wars.herokuapp.com";
var online = false;
var port = 5000;

var canvas, ctx;
var loginPrompt, inputName, inputJoin;
var inputLeft, inputRight;

socketMain.onopen = function (event) {
    main();
};

socketMain.onerror = function(event) {
    if(!online) {
        port = process.env.PORT;
        
        socketMain = new WebSocket("wss://https://worm-wars.herokuapp.com:" + port, "connect");
        online = true;
    }
}

socketMain.addEventListener("message", function(event) {
    var data = JSON.parse(event.data);
    switch(data.type) {
        case 'login':
            onLoggedIn();
            break;
    }
});

function cmd(command) {
    socketMain.send(JSON.stringify({
        type: "cmd",
        command: command
    }));
}

function main() {
    loginPrompt = document.getElementById("login_prompt");
    inputName = document.getElementById("input_name");
    inputJoin = document.getElementById("input_join");
    
    inputJoin.onclick = function() {
        socketMain.send(JSON.stringify({
            type: "login",
            name: inputName.value
        }));
    }
}

function sendUserAction(action) {
    socketMain.send(JSON.stringify({
        type: "action",
        action: action
    }));
    
    console.log(action);
}

function onLoggedIn() {
    loginPrompt.style.display = "none";
    
    inputLeft = document.getElementById("arrow_left");
    inputRight = document.getElementById("arrow_right");
    
    document.ontouchstart = function(e) {
        e.preventDefault();
    }
    
    inputLeft.ontouchstart = inputLeft.onmousedown = function(e) {
		e.preventDefault();
        sendUserAction("leftstart");
	};

    inputLeft.ontouchend = inputLeft.onmouseup = function(e) {
		e.preventDefault();
        sendUserAction("leftstop");
	};
    
    inputRight.ontouchstart = inputRight.onmousedown = function(e) {
		e.preventDefault();
        sendUserAction("rightstart");
	};

    inputRight.ontouchend = inputRight.onmouseup = function(e) {
		e.preventDefault();
        sendUserAction("rightstop");
	};
}