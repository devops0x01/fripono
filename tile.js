
function Tile(i,i_x,i_y)
{
  this.img = i;
  this.img_y = i_y*32;
  this.img_x = i_x*32;
  
  this.description = "Nothing can be discerned here";
  
  this.blocking = false;
  this.discovered = false;
  
  this.lit = false;
  this.light_level = 0;
}

Tile.prototype.onActivate = function()
{
  screen_messages.unshift(this.description);
};

Tile.prototype.draw = function(cxt,x,y)
{
  cxt.drawImage(this.img,this.img_x,this.img_y,32,32,x*SCALE,y*SCALE,SCALE,SCALE);
};
