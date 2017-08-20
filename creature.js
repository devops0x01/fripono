
function Creature(t,x,y)
{
  this.name = "creature";
  
  this.tile = t;
  this.tile.blocking = true;
  
  this.x = x;
  this.y = y;
  
  this.max_hp = 10;
  this.hp = this.max_hp;
  this.hp_augment = 0;
  
  this.strength = 2;
  this.dexterity = 2;
  this.intelligence = 0;
  this.fortitude = 0;
  
  this.armor = 8;
  this.armor_augment = 0;
  this.attack = this.strength;

  this.effects = [];
  
  this.boss = false;

  this.gold = 50;
  
  this.drop = null;
  
  this.last_hit_by = null;
  
  this.updateStats = function()
  {
    this.max_hp = (this.fortitude*5) + this.hp_augment;
    this.armor = Math.round(this.fortitude/4) + this.armor_augment;
  };

  this.hit = function(c)
  {
    let block =  Math.round(this.armor/4) + this.dexterity;
    
    let adjusted_chance_to_block = block - c.dexterity;
    
    hit_roll = get_random(0,98);
    
    if(adjusted_chance_to_block < 0)
    {
      adjusted_chance_to_block = 1;
    }

    if(adjusted_chance_to_block < hit_roll)
    {
      let a = c.attack - this.armor;

      if(a <= 0)
      {
        a = 1;
      }

      this.hurt(a);

      screen_messages.unshift(this.name + " hit by " + c.name + " for " + a.toString());
      this.last_hit_by = c;
    }else{
      screen_messages.unshift(c.name + " MISSED " + this.name);
    }
  };

  this.hurt = function(amt)
  {
    this.hp -= amt;
    if(p.hp < 25)
    {
      screen_messages.unshift("[[[ HEALTH LESS THAN HALF ]]]");
    }
  };
  
  this.heal = function(amt)
  {
    this.hp += amt;
    if(this.hp > this.max_hp)
    {
      this.hp = this.max_hp;
    }
  };

  this.update = function()
  {
    
  };
  
  this.draw = function(ctx)
  {
    this.tile.draw(ctx,15,9);
  };
  
  this.onDeath = function()
  {
  
  };
}
