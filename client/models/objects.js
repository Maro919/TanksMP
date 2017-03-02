function displayTank(h_x, h_y, h_rot, t_rot, p_name){
    ctx2d.save();
    ctx2d.translate(h_x, h_y);
    ctx2d.textAlign = "center";
    ctx2d.font = "20px Consolas";
    ctx2d.fillText(p_name, 0, -40);
    ctx2d.rotate(h_rot*Math.PI/180);
    ctx2d.fillStyle = "Gray";
    ctx2d.fillRect(-17.5,-25,35,50);
    ctx2d.fillStyle = "#096c74";
    ctx2d.fillRect(-15,-30,30,60);
    ctx2d.fillStyle = "#005c5c";
    ctx2d.fillRect(-10,15,20,10);
    ctx2d.fillRect(-15,-30,30,15);
    ctx2d.restore();
    displayTankTurret(h_x, h_y, h_rot, t_rot);
}
function displayTankTurret(h_x, h_y, h_rot, t_rot){
    t_x = h_x + 10 * Math.sin(h_rot*Math.PI/180);
    t_y = h_y - 10 * Math.cos(h_rot*Math.PI/180);
    ctx2d.save();
    ctx2d.translate(t_x, t_y);
    ctx2d.rotate(t_rot*Math.PI/180);
    ctx2d.fillStyle = "#008080";
    ctx2d.fillRect(-10,-15,20,30);
    ctx2d.fillRect(-2,-45,4,30);
    ctx2d.fillStyle = "#005c5c";
    ctx2d.fillRect(-8,-10,8,8);
    ctx2d.restore();
}