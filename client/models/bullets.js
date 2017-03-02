function displayBullet(_x, _y, _angle){
    ctx2d.save();
    ctx2d.translate(this.x,this.y);
    ctx2d.rotate(this.angle*Math.PI/180);
    ctx2d.fillStyle = "gray";
    ctx2d.fillRect(-this.width/2,-this.height/2,this.width,this.height);
    ctx2d.restore();
}