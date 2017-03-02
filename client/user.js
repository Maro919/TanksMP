var User = {
    username: undefined,
    loggedin: false,
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    targetX: 0,
    targetY: 0,
    moving: false,
    
    setupLoginPrompt: function() {
        var userStatus = document.getElementById("user-status");
        userStatus.innerHTML = "<h2>Log In!</h2>";
        
        var usernamePrompt = document.createElement("div");
        userStatus.appendChild(usernamePrompt);
        
        var usernameLegend = document.createElement("legend");
        usernameLegend.setAttribute("for", "form-username")
        usernameLegend.innerHTML = "Username:";
        usernamePrompt.appendChild(usernameLegend);
        
        var usernameInput = document.createElement("input");
        usernameInput.setAttribute("type", "text");
        usernameInput.setAttribute("id", "form-username");
        usernameInput.style.width = "180px";
        usernamePrompt.appendChild(usernameInput);
        
        var passwordPrompt = document.createElement("div");
        userStatus.appendChild(passwordPrompt);
        
        var passwordLegend = document.createElement("legend");
        passwordLegend.setAttribute("for", "form-password")
        passwordLegend.innerHTML = "Password:";
        passwordPrompt.appendChild(passwordLegend);
        
        var passwordInput = document.createElement("input");
        passwordInput.setAttribute("type", "password");
        passwordInput.setAttribute("id", "form-password");
        passwordInput.style.width = "180px";
        passwordPrompt.appendChild(passwordInput);
        
        var loginInput = document.createElement("input");
        loginInput.setAttribute("type", "button");
        loginInput.setAttribute("value", "Log In");
        userStatus.appendChild(loginInput);
        
        loginInput.onclick = function() {
            socketMain.send(JSON.stringify({
                type: "login",
                username: document.getElementById("form-username").value,
                password: document.getElementById("form-password").value,
            }));
        }
    },
    
    display: function() {
        ctx2d.fillStyle="#fff";
        ctx2d.beginPath();
        ctx2d.arc(this.targetX, this.targetY, 5, 0, Math.PI*2);
        ctx2d.fill();
        
        ctx2d.fillStyle="#44ff44";
        ctx2d.fillRect(User.x-20, User.y-20, 40, 40);
    },
    
    getDistanceToTarget: function() {
        var vec = {
            x: this.targetX-this.x,
            y: this.targetY-this.y
        };
        
        return Math.sqrt(vec.x*vec.x + vec.y*vec.y);
    },
    
    getMovementSpeed: function() {
        return 3;
    },
        
    getMoveVector: function() {
        if(this.moving) {
            var vec = {
                x: this.targetX-this.x,
                y: this.targetY-this.y
            };
            var dist = Math.sqrt(vec.x*vec.x + vec.y*vec.y);
            if(dist != 0) {
                vec.x /= dist;
                vec.y /= dist;
            }
            
            vec.x *= this.getMovementSpeed();
            vec.y *= this.getMovementSpeed();
            
            return vec;
        }else{
            return {
                x: 0,
                y: 0
            }
        }
    },
    
    moveTo: function(p_x, p_y) {
        this.targetX = p_x;
        this.targetY = p_y;
        this.moving = true;
    },
    
    update: function() {
        if(this.moving){
            if(this.getDistanceToTarget() > this.getMovementSpeed()){
                var vec = this.getMoveVector();
                this.x += vec.x;
                this.y += vec.y;
            }else{
                this.moving = false;
                this.x = this.targetX;
                this.y = this.targetY;
            }
        }
    }
};

var otherUsers = new Array(0);

function doesUserExist(p_username) {
    if(p_username == User.username) {
        return true;
    }
    
    for(var i = 0; i < otherUsers.length; i++) {
        if(otherUsers[i].username == p_username) {
            return true;
        }
    }
    return false;
}

function getUser(p_username) {
    if(p_username == User.username) {
        return User;
    }
    
    for(var i = 0; i < otherUsers.length; i++) {
        if(otherUsers[i].username == p_username) {
            return otherUsers[i];
        }
    }
}

function addOtherUser(p_username) {
    console.log("Trying to add a new other user...");
    if(doesUserExist(p_username)) return;
    
    otherUsers.push(createUser(p_username));
    
    console.log("Added a new other user: "+p_username);
}

function createUser(p_username) {
    return {
        username: p_username,
        x: undefined,
        y: undefined,
        targetX: 0,
        targetY: 0,
        moving: false,
        
        display: function() {
            ctx2d.fillStyle="#44ffff";
            ctx2d.fillRect(this.x-20, this.y-20, 40, 40);
            ctx2d.font = "sans-serif";
            ctx2d.fillStyle = "#ffffff";
            ctx2d.textAlign = "center"
            ctx2d.fillText(this.username, this.x, this.y-30);
        },
        
        getDistanceToTarget: function() {
            var vec = {
                x: this.targetX-this.x,
                y: this.targetY-this.y
            };

            return Math.sqrt(vec.x*vec.x + vec.y*vec.y);
        },

        getMovementSpeed: function() {
            return 3;
        },

        getMoveVector: function() {
            if(this.moving) {
                var vec = {
                    x: this.targetX-this.x,
                    y: this.targetY-this.y
                };
                var dist = Math.sqrt(vec.x*vec.x + vec.y*vec.y);
                if(dist != 0) {
                    vec.x /= dist;
                    vec.y /= dist;
                }

                vec.x *= this.getMovementSpeed();
                vec.y *= this.getMovementSpeed();

                return vec;
            }else{
                return {
                    x: 0,
                    y: 0
                }
            }
        },
        
        update: function() {
            if(this.moving){
                if(this.getDistanceToTarget() > this.getMovementSpeed()){
                    var vec = this.getMoveVector();
                    this.x += vec.x;
                    this.y += vec.y;
                }else{
                    this.moving = false;
                    this.x = this.targetX;
                    this.y = this.targetY;
                }
            }
        }
    };
}