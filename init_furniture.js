
function make_furniture(g,n,tx,ty)
{
  let c = new Furniture(new Tile(g,tx,ty),0,0);
  
  return c;
}

function make_chest(t)
{
  let f = make_furniture(misc,"wooden chest",t,0);
  f.tile.onActivate = function(){
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
            function(){return make_furniture(misc,"giant skeleton",3,6);}
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
