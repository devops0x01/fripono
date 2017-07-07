
function Player(t,x,y)
{
  Creature.call(this,t,x,y);
  Player.prototype = Object.create(Creature.prototype);
  
  this.name = "player";
  
  this.items = [];
  this.selected_item = null;
  
  this.strength = 5;
  this.dexterity = 10;
  this.intelligence = 8;
  this.fortitude = 10;
  
  this.max_hp = 5*this.fortitude;
  this.hp = this.max_hp;
  
  this.attack = this.strength;
  
  this.armor = Math.round(this.fortitude/4);
  
  this.slots = 
  {
    head: null,
    neck: null,
    body: null,
    back: null,
    arms: null,
    hands: null,
    legs: null,
    feet: null,
    ring_left: null,
    ring_right: null,
    hold1: null,
    hold2: null
  };

  Player.prototype.constructor = Player;
}

Player.prototype.select = function(i)
{
  if(this.items[i])
  {
    this.selected_item = i;
  }else{
    console.log("No such item");
  }
};

Player.prototype.equip = function()
{
  if(this.selected_item !== null)
  {
    let item = this.items[this.selected_item];
    if(this.items[this.selected_item].equipped === false)
    {
      if(Array.isArray(item.slot_type))
      {
        //console.log("item slot type is an array, this must be a ring...");
        //if a finger is empty then place the ring there
        //else swap?? which one??
        if(this.slots["ring_left"] === null)
        {
          this.slots["ring_left"] = item;
          item.onEquip();
          screen_messages.unshift("item: " + item.name + " equipped");
        }else if(this.slots["ring_right"] === null)
        {
          this.slots["ring_right"] = item;
          item.onEquip();
          screen_messages.unshift("item: " + item.name + " equipped");
        }else{
          //all fingers slots already equipped. we don't know
          //where to put it...
          console.log("Swapping rings is not implemented!");
        }
      }else if(item.two_handed)
      {
        //this is a two handed item, swap out both hands
        //and equip it
        //TODO: There is some code duplication here
        if(this.slots["hold1"] === null)
        {
          this.slots["hold1"] = item;
          item.onEquip();
          screen_messages.unshift("item: " + item.name + " equipped");
        }else{
          let old_item = this.slots["hold1"];
          old_item.onUnequip();
          this.slots["hold1"] = item;
          item.onEquip();
          screen_messages.unshift("item: " + item.name + " equipped");
        }
        
        if(this.slots["hold2"] === null)
        {
          this.slots["hold2"] = item;
          //screen_messages.unshift("item: " + item.name + " equipped");
        }else{
          let old_item = this.slots["hold2"];
          if(!old_item.two_handed)
          {
            old_item.onUnequip();
          }
          this.slots["hold2"] = item;
          //screen_messages.unshift("item: " + item.name + " equipped");
        }
      }else{
        if(this.slots[item.slot_type] === null)
        {
          this.slots[item.slot_type] = item;
          item.onEquip();
          screen_messages.unshift("item: " + item.name + " equipped");
        }else{
          let old_item = this.slots[item.slot_type];
          old_item.onUnequip();
          
          if(old_item.two_handed)
          {
            this.slots["hold1"] = null;
            this.slots["hold2"] = null;
          }
          
          this.slots[item.slot_type] = item;
          item.onEquip();
          screen_messages.unshift("item: " + item.name + " equipped");
        }
      }
    }else{
      console.log("item: " + item.name + " is already equipped");
    }
  }else{
    console.log("No such item");
  }
};

Player.prototype.unEquip = function()
{
  if(this.items[this.selected_item] && (this.items[this.selected_item].equipped === true))
  {
    let item = this.items[this.selected_item];
    if(Array.isArray(item.slot_type))
    {
      if(this.slots["ring_left"] == item)
      {
        this.slots["ring_left"] = null;
      }
      if(this.slots["ring_right"] == item)
      {
        this.slots["ring_right"] = null;
      }
    }else{
      if(item.two_handed)
      {
        this.slots["hold1"] = null;
        this.slots["hold2"] = null;
      }else{
        this.slots[item.slot_type] = null;
      }
    }
    item.onUnequip();
    screen_messages.unshift("item: " + item.name + " unequipped");
  }else{
    console.log("No such item");
  }
};

Player.prototype.use = function()
{
  if(this.items[this.selected_item])
  {
    item = this.items[this.selected_item];
    item.onUse();
    if(item.uses === 0)
    {
      this.items.splice(this.selected_item,1);
      this.selected_item = null;
    }

    if(item.uses > -1)
    {
      screen_messages.unshift("item: " + item.name + " used");
    }
  }else{
    console.log("No such item");
  }
};
