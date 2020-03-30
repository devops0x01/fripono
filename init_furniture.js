
function make_furniture(g,n,tx,ty)
{
  let c = new Furniture(new Tile(g,tx,ty),0,0);
  return c;
}

function make_life_fountain()
{
  let c = make_furniture(edging3,"fountain",2,9);
  let e = new QuestEvent("life fountain",0,0);
  e.action = function()
  {
    if(this.triggered == false)
    {
      p.hp = p.max_hp
      this.triggered=true
    }
  }
  c.tile.onActivate = function()
  {
    e.x = c.x
    e.y = c.y
    e.action();
  };
  
  return c;
}

function make_grave()
{
  let c = make_furniture(edging3,"grave",2,8);
  let e = new QuestEvent("event activated!",c.x,c.y);
  let r = get_random(0,1);
  if(r == 0)
  {
    e.action = function()
    {
      if(this.triggered == false)
      {
        let enemy = make_enemy(undead,"grave skeleton",0,6,10*current_level/2,10*current_level,"a ");
        enemy.x = c.x;
        enemy.y = c.y;
        console.log("creature: " + enemy.name + "x: " + enemy.x + " y: " + enemy.y);
        board.creatures.push(enemy);
        this.triggered = true
      }
    }
  }
  c.tile.onActivate = function()
  {
    /*e.action = function()
    {
      let g = make_gold(7);
      g.x = c.x
      g.y = c.y
      board.items.push(g);
    };
    */
    e.x = c.x
    e.y = c.y
    e.action();
    e.triggered = true;
  };

  return c;
}

function make_chest(t)
{
  let f = make_furniture(misc,"wooden chest",t,0);
  let r = get_random(0,10)
  if(r == 0)
  {
    e = new QuestEvent("chest event",0,0);
    e.action = function()
    {
      if(this.triggered == false)
      {
        let enemy = make_enemy(undead,"grave skeleton",0,6,10*current_level/2,10*current_level,"a ");
        enemy.x = f.x;
        enemy.y = f.y;
        console.log("creature: " + enemy.name + "x: " + enemy.x + " y: " + enemy.y);
        board.creatures.push(enemy);
        this.triggered = true
      }
    }
    f.tile.onActivate = function()
    {
      e.action();
      f.tile = new Tile(misc,6,0);
    }
  }else{
    f.tile.onActivate = function()
    {
      f.tile = new Tile(misc,6,0);
      let i;
      if(t > 0)
      {
        i = generate_item(current_level+1);
      }else{
        i = generate_item(current_level);
      }
      i.x = f.x;
      i.y = f.y;
      board.items.push(i);
    };
  } 
  return f;
}

var type1_furniture = 
          [
            function(){return make_furniture(actions,"chair",7,0);},
            function(){return make_furniture(misc,"broken wall",6,7);},
            function(){return make_furniture(misc,"mammal bones",0,7);},
            function(){return make_furniture(edging3,"fountain",2,9);},
            function(){return make_chest(0);},
            function(){return make_chest(0);},
            function(){return make_chest(1);},
            function(){return make_chest(1);},
            function(){return make_furniture(misc,"skull",1,6);},
            function(){return make_furniture(misc,"broken bone",2,6);},
            function(){return make_furniture(misc,"giant skeleton",3,6);},
            function(){return make_life_fountain();},
            function(){return make_grave();}
          ];
          
function generate_furniture(level)
{
  let e;
  switch(level)
  {
    case 0:
      e = type1_furniture;
    break;
    default:
      e = type1_furniture;
    break;
  }
  let r = get_random(0,e.length-1);
    
  return e[r]();
}

function generate_furnishings(level)
{
  let n = get_random(2,5);
  let a = [];
  
  for(let i = 0; i < n; i++)
  {
    a.push(generate_furniture(level));
  }
  
  return a;
}
