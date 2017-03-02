var Camera = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    speed: 0.4,
    
    setPosition: function(p_x, p_y) {
        this.x = p_x;
        this.y = p_y;
        this.targetX = p_x;
        this.targetY = p_y;
    },
    
    moveTo: function(p_x, p_y) {
        this.targetX = p_x;
        this.targetY = p_y;
    },
    
    update: function() {
        this.x += (this.targetX-this.x)*this.speed;
        this.y += (this.targetY-this.y)*this.speed;
    }
};