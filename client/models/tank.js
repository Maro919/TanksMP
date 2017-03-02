function drawTank(x, y, rot, name){
    ctx2d.save();
    ctx2d.translate(x,y);
    ctx2d.font = "15px Arial";
    ctx2d.textAlign = "center";
    ctx2d.fillStyle = "#000";
    ctx2d.fillText(name,0,-15);
    ctx2d.rotate(rot*Math.PI/180);
    
    //body
    ctx2d.fillStyle = "#2f2";
    ctx2d.fillRect(-5,-8,10,16);
    
    //tracks
    ctx2d.fillStyle = "#4D4";
    ctx2d.fillRect(-8,-10,3,20);
    ctx2d.fillRect(5,-10,3,20);
    
    //turret
    ctx2d.fillStyle = "#4D4";
    ctx2d.fillRect(-4,-6,8,8);
    
    //barrel
    ctx2d.fillStyle = "#4D4";
    ctx2d.fillRect(-1,-20,2,14);
    
    ctx2d.restore();
}