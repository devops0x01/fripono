
function make_protection_jewelry(n,tx,ty,s,prot,d)
{
  let i = new Item(n,new Tile(jewels,tx,ty),0,0);
  i.slot_type = s;
  i.armor = prot;
  i.onEquip = function(){this.equipped = true;p.armor_augment += prot;p.updateStats();};
  i.onUnequip = function(){this.equipped = false;p.armor_augment -= prot; p.updateStats();};
  i.tile.description = d;
 
  return i;
}

function generate_jewelry(level)
{
  let l;
  switch(level)
  {
    case 0:
      l = [
        function(){return make_protection_jewelry("amulet of protection 1",0,3,"neck",1,"an amulet of protection 1");},
        function(){return make_protection_jewelry("ring of protection",0,0,[],1,"a ring of protection");}
      ];
    break;
    case 1:
      l = [
        function(){return make_protection_jewelry("amulet of protection 2",1,3,"neck",2,"an amulet of protection 2");},
        function(){return make_protection_jewelry("amulet of protection 1",0,3,"neck",1,"an amulet of protection 1");},
        function(){return make_protection_jewelry("greater ring of protection",2,2,[],2,"a greater ring of protection");}
      ];
    break;
    case 6:
      l = [
        function(){return make_protection_jewelry("ring of protection 4",5,1,[],4,"a ring of protection 4");}
      ];
    break;
    default:
      l = [
        function(){return make_protection_jewelry("ring of protection 3",0,1,[],3,"a greater ring of protection");},
        function(){return make_protection_jewelry("amulet of protection 3",2,3,"neck",3,"an amulet of protection 3");}
      ];
    break;
  }
  let r = get_random(0,l.length-1);
    
  return l[r]();
}

function make_weapon(n,tx,ty,a,d)
{
  let i = new Item(n,new Tile(weapons,tx,ty),0,0);
  i.slot_type = "hold1";
  i.attack = a;
  i.onEquip = function(){this.equipped = true;p.attack += a;};
  i.onUnequip = function(){this.equipped = false;p.attack -= a;};
  i.tile.description = d;
  
  return i;
}

/*
function make_food(n,tx,ty,s,d)
{
  let f = new Item(n,new Tile(ft,tx,ty),0,0);
  f.tile.description = d;
  f.uses = 1;
  f.onUse = function(){this.uses--;p.satiate(s);};
  
  return f;
}

function generate_food(level)
{
  let l;
  switch(level)
  {
    case 0:
      l = [
        function(){return make_food("black mushroom",2,1,10,"a black mushroom");},
        function(){return make_food("dark gray mushroom",3,1,20,"a dark gray mushroom");},
        function(){return make_food("gray mushroom",4,1,30,"a gray mushroom");},
        function(){return make_food("orange mushroom",0,2,40,"an orange mushroom");},
        function(){return make_food("red mushroom",1,2,50,"a red mushroom");},
        function(){return make_food("green mushroom",2,2,60,"a green mushroom");}
      ];
    break;
    default:
      l = [
        function(){return make_food("test food",0,0,300,"a test food object");},
        function(){return make_food("test food",1,0,300,"a test food object");},
        function(){return make_food("test food",2,0,300,"a test food object");},
        function(){return make_food("test food",3,0,300,"a test food object");}
      ];
    break;
  }
  let r = get_random(0,l.length-1);
    
  return l[r]();
}
*/
function make_armor(n,tx,ty,s,def,b,desc)
{
  i = new Item(n,new Tile(armor,tx,ty),0,0);
  i.tile.description = desc;
  i.slot_type = s;
  i.armor = def;
  i.onEquip = function(){this.equipped = true;p.armor_augment += def;p.block += b;p.updateStats();};
  i.onUnequip = function(){this.equipped = false;p.armor_augment -= def;p.block -= b;p.updateStats();};
  
  return i;
}

function generate_armor(level)
{
  let l;
  switch(level)
  {
    case 0:
      l = [
            function(){return make_armor("leather armor",8,3,"body",6,0,"some leather armor");},
            function(){return make_armor("leather helm",9,0,"head",2,0,"a leather helm");},
            //function(){return make_armor("tattered robe",3,3,"body",1,0,"a tattered robe");},
            function(){return make_armor("plain cloak",0,0,"back",2,0,"a plain cloak");},
            function(){return make_armor("small leather shield",8,2,"hold2",6,0,"a small leather shield");},
            function(){return make_armor("soft leather boots",0,2,"feet",2,0,"some soft leather boots");},
            function(){return make_armor("rusted chain mail",4,4,"body",8,0,"a rusted chain mail shirt");}
          ];
      break;
    case 1:
      l = [
            function(){return make_armor("leather boots",1,2,"feet",3,0,"some leather boots");},
            function(){return make_armor("chain mail",5,4,"body",10,0,"a chain mail shirt");},
            function(){return make_armor("studded leather armor",9,3,"body",7,0,"some studded leather armor");},
            function(){return make_armor("leather gloves",3,2,"hands",1,0,"some leather gloves");},
            function(){return make_armor("basic robe (red)",4,3,"body",2,0,"a basic robe");},
            function(){return make_armor("buckler",0,3,"hold2",8,0,"a buckler");},
            function(){return make_armor("iron helm",1,1,"head",4,0,"an iron helm");},
            function(){return make_armor("fine leather helm",0,1,"head",3,0,"a fine leather helm");}
          ];
    break;
    case 2:
      l = [
            function(){return make_armor("breast plate",0,5,"body",12,0,"a breast plate");},
            function(){return make_armor("large leather shield",9,2,"hold2",9,0,"a large leather shield");},
            function(){return make_armor("steel toed boots",1,2,"feet",4,0,"some steel toed boots");},
            function(){return make_armor("chain mail",5,4,"body",10,0,"a chain mail shirt");},
            function(){return make_armor("large leather shield",9,2,"hold2",9,0,"a large leather shield");},
            function(){return make_armor("steel toed boots",1,2,"feet",4,0,"some steel toed boots");},
            function(){return make_armor("iron helm",1,1,"head",4,"an iron helm");},
            function(){return make_armor("kite shield",2,3,"hold2",10,0,"a kite shield");},
            function(){return make_armor("quality gray cloak",8,0,"back",3,0,"a quality gray cloak");},
            function(){return make_armor("breast plate",0,5,"body",12,0,"a breast plate");},
            function(){return make_armor("hard leather armor",0,4,"body",8,0,"some hard leather armor");},
            function(){return make_armor("studded hard leather armor",1,4,"body",9,0,"some studded hard leather armor");}
          ];
    break;
    case 3:
      l = [
            function(){return make_armor("iron crown",5,1,"head",5,0,"an iron crown");},
            function(){return make_armor("half plate",2,5,"body",14,0,"a suit of half plate");},
            function(){return make_armor("large leather shield",9,2,"hold2",9,0,"a large leather shield");},
            function(){return make_armor("steel toed boots",1,2,"feet",4,0,"some steel toed boots");},
            function(){return make_armor("kite shield",2,3,"hold2",10,0,"a kite shield");},
            function(){return make_armor("quality gray cloak",8,0,"back",3,0,"a quality gray cloak");},
            function(){return make_armor("breast plate",0,5,"body",12,0,"a breast plate");},
            function(){return make_armor("studded hard leather armor",1,4,"body",9,0,"some studded hard leather armor");}
          ];
    break;
    default:
      l = [
            function(){return make_armor("steel toed boots",1,2,"feet",4,0,"some steel toed boots");},
            function(){return make_armor("iron crown",5,1,"head",5,0,"an iron crown");},
            function(){return make_armor("kite shield",2,3,"hold2",10,0,"a kite shield");},
            function(){return make_armor("cloak of protection (blue)",1,0,"back",4,0,"a cloak of protection (blue)");},
            function(){return make_armor("fine leather gloves",4,2,"hands",2,0,"some fine leather gloves");},
            function(){return make_armor("half plate",2,5,"body",14,0,"a suit of half plate");},
            function(){return make_armor("exquisite banded mail",8,4,
                                    "body",16,"some exquisite banded mail");},
            function(){return make_armor("plate armor",7,6,"body",18,0,"a suit plate armor");}
          ];
    break;
  }
  let r = get_random(0,l.length-1);
    
  return l[r]();
}

function make_healing_potion(n,tx,ty,s,d)
{
  let i = new Item(n,new Tile(potions,tx,ty),0,0);
  i.tile.description = d;
  i.uses = 1;
  i.strength = s;
  i.onUse = function(){this.uses--;p.heal(i.strength);};

  return i;
}

function make_attribute_potion(n,tx,ty,d,f)
{
  let i = new Item(n,new Tile(potions,tx,ty),0,0);
  i.tile.description = d;
  i.uses = 1;
  i.onUse = f;

  return i;
}

function generate_potion(level)
{
  let l;
  switch(level)
  {
    case 0:
      l = [
            function(){return make_healing_potion("small health potion",5,7,20,"a small health potion");},
            function(){return make_healing_potion("medium health potion",4,1,30,"a medium health potion");},
            function(){return make_attribute_potion("small dexterity potion",1,1,"",function(){
              p.dexterity+=1;
              this.uses--;
            });}
          ];
    break;
    case 1:
      l = [
            function(){return make_healing_potion("small health potion",5,7,20,"a small health potion");},
            function(){return make_healing_potion("medium health potion",4,1,30,"a medium health potion");},
            function(){return make_attribute_potion("small strength potion",2,1,"",function(){
              p.strength+=1;
              p.attack+=1;
              this.uses--;
            });}
          ];
    break;
    case 2:
      l = [
            function(){return make_healing_potion("medium health potion",4,1,30,"a medium health potion");},
            function(){return make_attribute_potion("small strength potion",2,1,"",function(){
              p.strength+=1;
              p.attack+=1;
              this.uses--;
            });},
            function(){return make_attribute_potion("small dexterity potion",1,1,"",function(){
              p.dexterity+=1;
              this.uses--;
            });}
          ];
    break;
    case 7:
      l = [
            function(){return make_healing_potion("large health potion",0,7,40,"a large health potion");},
            function(){return make_healing_potion("massive health potion",5,6,50,"a massive health potion");}
          ];  
    break;
    case 8:
      l = [
            function(){return make_healing_potion("large health potion",0,7,40,"a large health potion");},
            function(){return make_healing_potion("massive health potion",5,6,50,"a massive health potion");}
          ];  
    break;
    case 9:
      l = [
            function(){return make_healing_potion("large health potion",0,7,40,"a large health potion");},
            function(){
              let i = make_healing_potion("perfect health potion",4,4,0,"a perfect health potion");
              i.onUse = function(){this.uses--;p.heal(p.max_hp);};
              return i;
            }
          ];  
    break;
    default:
      l = [
            function(){return make_healing_potion("large health potion",0,7,40,"a large health potion");},
            function(){return make_attribute_potion("small strength potion",2,1,"",function(){
              p.strength+=1;
              p.attack+=1;
              this.uses--;
            });},
            function(){return make_attribute_potion("small dexterity potion",1,1,"",function(){
              p.dexterity+=1;
              this.uses--;
            });},
            function(){return make_attribute_potion("small intelligence potion",2,5,"",function(){
              p.intelligence+=1;
              this.uses--;
            });},
            function(){return make_attribute_potion("medium strength potion",3,1,"",function(){
              p.strength+=2;
              p.attack+=2;
              this.uses--;
            });},
            function(){return make_attribute_potion("medium dexterity potion",1,7,"",function(){
              p.dexterity+=2;
              this.uses--;
            });},
            function(){return make_attribute_potion("medium intelligence potion",4,6,"",function(){
              p.intelligence+=2;
              this.uses--;
            });}
          ];
    break;
  }
  let r = get_random(0,l.length-1);
    
  return l[r]();
}
/*
TODO: replace array recreation with global level arrays for efficiency
could also use a 2 dimensional array:
  [
   level1_items[],
   level2_items[],
   level3_items[],
   ...
  ]
  generate_item(level)
  i = items_by_level[level];[rand]

*/
function generate_weapon(level)
{
  let l;
  switch(level)
  {
    case 0:
      l = [
            function(){return make_weapon("short sword",0,1,5,"a short sword");},
            function(){return make_weapon("long sword",2,1,7,"a long sword");},
            function(){
              let i = make_weapon("staff",1,2,6,"a staff");
              i.two_handed = true;
              return i;
            },
            function(){return make_weapon("hand axe",3,3,6,"a hand axe");},
            function(){return make_weapon("cutlass",9,0,6,"a cutlass");}
            //function(){return make_weapon("dagger",6,0,2,"a dagger");}
          ];
    break;
    case 1:
      l = [
            function(){
              let i = make_weapon("spear",8,2,10,"a spear");
              i.two_handed = true;
              return i;
            },
            function(){return make_weapon("fine dagger",3,0,3,"a fine dagger");},
            function(){return make_weapon("falchion",1,1,9,"a falchion");},
            function(){return make_weapon("broad sword",5,1,8,"a broad sword");}
          ];
    break;
    case 2:
      l = [
            function(){return make_weapon("spiked mace",0,2,11,"a spiked mace");},
            function(){
              let i = make_weapon("trident",9,2,12,"a trident");
              i.two_handed = true;
              return i;
            },
            function(){return make_weapon("falchion",1,1,9,"a falchion");},
            function(){return make_weapon("war hammer",2,3,14,"a war hammer");},
            function(){return make_weapon("flail",3,2,13,"a flail");}
          ];
    break;
    case 3:
      l = [
            function(){return make_weapon("war hammer",2,3,14,"a war hammer");},
            function(){
              let i = make_weapon("double bladed battle axe",0,4,16,
                                  "a two handed double bladed battle axe");
              i.two_handed = true;                            
              return i;
            },
            function(){return make_weapon("battle axe",5,3,18,"a battle axe");}
          ];
    break;
    case 4:
      l = [
            function(){
              let i = make_weapon("double bladed battle axe",0,4,16,
                                  "a two handed double bladed battle axe");
              i.two_handed = true;                            
              return i;
            },
            function(){
              let i = make_weapon("fine steel spear",0,3,20,"a fine steel spear");
              i.two_handed = true;
              return i;
            },
            function(){return make_weapon("fine broad sword",3,1,17,"a fine broad sword");},
            function(){return make_weapon("battle axe",5,3,18,"a battle axe");}
          ];
    break;
    case 5:
      l = [
            function(){
              let i = make_weapon("fine steel spear",0,3,20,"a fine steel spear");
              i.two_handed = true;
              return i;
            },
            function(){return make_weapon("battle axe",5,3,18,"a battle axe");},
            function(){return make_weapon("fine broad sword",3,1,17,"a fine broad sword");},
            function(){return make_weapon("fine steel flail",2,2,19,"a fine steel flail");}
          ];
    break;
    case 6:
      l = [
            function(){
              let i = make_weapon("fine steel spear",0,3,20,"a fine steel spear");
              i.two_handed = true;
              return i;
            },
            function(){return make_weapon("battle axe",5,3,18,"a battle axe");},
            function(){return make_weapon("fine broad sword",3,1,17,"a fine broad sword");},
            function(){return make_weapon("fine steel flail",2,2,19,"a fine steel flail");}
          ];    
    break;
    case 7:
      l = [
            function(){
              let i = make_weapon("fine steel spear",0,3,20,"a fine steel spear");
              i.two_handed = true;
              return i;
            },
            function(){return make_weapon("battle axe",5,3,18,"a battle axe");},
            function(){return make_weapon("fine broad sword",3,1,17,"a fine broad sword");},
            function(){return make_weapon("fine steel flail",2,2,19,"a fine steel flail");}
          ];    
    break;
    case 8:
      l = [
            function(){
              let i = make_weapon("fine steel spear",0,3,20,"a fine steel spear");
              i.two_handed = true;
              return i;
            },
            function(){return make_weapon("battle axe",5,3,18,"a battle axe");},
            function(){return make_weapon("fine broad sword",3,1,17,"a fine broad sword");},
            function(){return make_weapon("fine steel flail",2,2,19,"a fine steel flail");}
          ];      
    break;
    case 9:
      l = [
            function(){
              let i = make_weapon("fine steel spear",0,3,20,"a fine steel spear");
              i.two_handed = true;
              return i;
            },
            function(){return make_weapon("battle axe",5,3,18,"a battle axe");},
            function(){return make_weapon("fine broad sword",3,1,17,"a fine broad sword");},
            function(){return make_weapon("fine steel flail",2,2,19,"a fine steel flail");}
          ];      
    break;
    default:
      l = [
            function(){
              let i = make_weapon("fine steel spear",0,3,20,"a fine steel spear");
              i.two_handed = true;
              return i;
            },
            function(){return make_weapon("battle axe",5,3,18,"a battle axe");},
            function(){return make_weapon("fine broad sword",3,1,17,"a fine broad sword");},
            function(){return make_weapon("fine steel flail",2,2,19,"a fine steel flail");}
          ];
    break;
  }
  let r = get_random(0,l.length-1);
  
  return l[r]();
}


function generate_item(level)
{
  let i;
  let chance = get_random(0,100);
  //let chance = 50;
  if((unique_items.length > 0) && (chance == 50))
  {
    let ui = get_random(0,unique_items.length-1);
    i = unique_items[ui]();
    unique_items.splice(ui,1);
  }else{
    let item_type = get_random(0,4);
    switch(item_type)
    {
      case 0:
        i = generate_jewelry(level);
      break;
      case 1:
        i = generate_potion(level);
      break;
      case 2:
        i = generate_weapon(level);
      break;
      case 3:
        i = generate_armor(level);
      break;
      case 4:
        i = generate_potion(level);
      break;
    }
  }
  
  return i;
}

function generate_items(level)
{
  let n = get_random(5,10);
  let a = [];
  
  for(let i = 0; i < n; i++)
  {
    a.push(generate_item(level));
  }
  
  return a;
}

var unique_items = [
  function vandal_helm(){
    let i = new Item("Vandal Helm",new Tile(armor,0,7),0,0);
    i.tile.description = "The vandal helm";
    i.slot_type = "head";
    i.armor = 4;
    i.history = "The vandal helm belonged to the great warrior Terzac of Ibra.";
    i.onEquip = function(){this.equipped = true;p.armor_augment += i.armor;p.attack+=2;p.updateStats();};
    i.onUnequip = function(){this.equipped = false;p.armor_augment -= i.armor;p.attack-=2;p.updateStats();};
   
    return i;
  },

  function robe_of_defense(){
   let i = new Item("Robe of Defense",new Tile(armor,7,3),0,0);
   i.tile.description = "The Robe of Defence";
   i.slot_type = "body";
   i.history = "" +
               "" +
               "";
   i.onEquip = function()
   {
     this.equipped = true;
     p.dexterity += 10;
     p.updateStats();
   };

   i.onUnequip = function()
   {
     this.equipped = false;
     p.dexterity -= 10;
     p.updateStats();
   };

   return i;
  },
 
  
  function amulet_of_life(){
    let i = new Item("Amulet of Life",new Tile(jewels,2,4),0,0);
    i.tile.description = "The Amulet of Life";
    i.slot_type = "neck";
    i.history = "Long ago when the Mana tree, the tree of life, " +
                "was cut down, a small fragement was kept, and " +
                "placed inside this amulet.";
    i.onEquip = function()
    {
      this.equipped = true;
      p.fortitude += 10;
      p.updateStats();
    };
    
    i.onUnequip = function()
    {
      this.equipped = false;
      p.fortitude -= 10;
      p.updateStats();
      if(p.hp > p.max_hp)
      {
        p.hp = p.max_hp;
      }
    };
    
    return i;
  },

  function ring_of_intelligence(){
    let i = new Item("Ring of Intelligence",new Tile(jewels,1,1),0,0);
    i.tile.description = "The Ring of Intelligence";
    i.slot_type = [];
    i.history = "dum ditty dum ditty dum dum dum" +
                ".";
    i.onEquip = function()
    {
      this.equipped = true;
      p.intelligence += 10;
      p.updateStats();
    };
    
    i.onUnequip = function()
    {
      this.equipped = false;
      p.intelligence -= 10;
      p.updateStats();
    };
    
    return i;
  },

  function bust_of_jemal(){
    let i = new Item("Bust of the noble warrior",new Tile(actions,5,8),0,0);
    i.tile.description = "The bust of the noble warrior";
    i.history = "The great warrior Jemal of house Uteia inspires great feats of strength.";
    i.onPickup = function(){p.strength += 4;p.attack += 4;};
    i.onDrop = function(){p.strength -= 4;p.attack -= 4;};
    
    return i;
  },

  function strange_dice(){
    let i = new Item("Strange Dice",new Tile(actions,6,6),0,0);
    i.tile.description = "A set of strange dice";
    i.history = "The greatest gambler of all time was Norin Ironclaw. After an" + 
                "unfortunate winning streak Norin was killed by unknown assailants." +
                "The only possession found on him was a pair of dice.";
    i.onPickup = function(){p.dexterity += 4;};
    i.onDrop = function(){p.dexterity -= 4;};
    
    return i;
  },
  
  function sanguine_shield(){
    let i = new Item("Sanguine Shield",new Tile(armor,4,8),0,0);
    i.tile.description = "The Sanguine Shield";
    i.slot_type = "hold2";
    i.armor = 14;
    i.history = "dum ditty dum ditty dum dum dum...";
    i.onEquip = function(){this.equipped = true;p.armor_augment += i.armor;p.fortitude+=4;p.updateStats();};
    i.onUnequip = function(){this.equipped = false;p.armor_augment -= i.armor;p.fortitude-=4;p.updateStats();};
    
    return i;
  }
];

  /*
  function lord_vars_boots()
  {
    let i = new Item("Lord Vars' Boots",new Tile(actions,5,8),0,0);
    //skeleton lord item...
    //history, the boots that belonged to the skeleton lord when he still
    //lived...
    return i;
  },*/

var make_fortitude_potion = function(amt)
{
  return make_attribute_potion("fortitude potion",1,2,"",function(){
                         p.fortitude+=amt;
                         this.uses--;
                         p.updateStats();
                         p.hp = p.max_hp;
                 });
};

var make_winners_emblem = function()
{
  let i = new Item("Winner's Emblem",new Tile(misc,4,7),0,0);
  //i.tile.description = d;
  i.uses = 1;
  i.onUse = function(){game_won=true;i.uses--;};

  return i;
};







