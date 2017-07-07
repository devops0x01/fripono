
function Item(n,t,x,y)
{
  this.name = n;
  this.tile = t;
  this.x = x;
  this.y = y;
  
  this.weight = 0;
  
  this.uses = -1;
  
  this.effects = [];
  
  this.slot_type = null;
  this.two_handed = false;
  
  this.equip_effects = [];
  this.unequip_effects = [];
  
  this.equipped = false;
  
  this.armor = 0;
  this.attack = 0;
  
  this.min_attack = 0;
  this.max_attack = 0;
  
  this.min_armor = 0;
  this.max_armor = 0;
}

Item.prototype.onEquip = function()
{
  this.equipped = true;
};

Item.prototype.isEquipped = function()
{
  return this.equipped;
};

Item.prototype.onUnequip = function()
{
  this.equipped = false; 
};

Item.prototype.onDrop = function()
{
  if(this.equipped)
  {
    this.onUnequip();
  }
};

Item.prototype.onPickup = function()
{

};

Item.prototype.onUse = function()
{
  if(this.uses > 0 )
  {
    this.uses--;
  }
};
