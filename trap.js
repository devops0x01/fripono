
function Trap(n,t,x,y)
{
  Furniture.call(this,t,x,y);
  Trap.prototype = Object.create(Furniture.prototype);
  
  this.hidden = true;
  this.detection_difficulty = 0;
  this.damage = 0;
  this.escape_difficulty = 0;
  this.name = n;
  
  this.show = function()
  {
    this.hidden = false;
  };
  
  this.getDamage = function()
  {
    return get_random(1,this.damage);
  };
  
  Trap.prototype.constructor = Trap;
}

