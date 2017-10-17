
function player_here(e,x,y)
{
  if((p.x == x) && (p.y == y))
  {
    let a = e.attack-p.armor;

    if(a <= 0)
    {
      a = 1;
    }

    p.hit(e);

    return true;
  }else{
    return false;
  }
}

function colleagueHere(x,y)
{
  for(let ci = 0; ci < board.creatures.length; ci++)
  {
    if((board.creatures[ci].x == x) && (board.creatures[ci].y == y))
    {
      return true;
    }
  }
  return false;
}

function move_enemy(e,d)
{
  switch(d)
  {
    case 0:
      if(!board.isBlocking(e.x+1,e.y) && !player_here(e,e.x+1,e.y) && !colleagueHere(e.x+1,e.y))
      {
        e.x++;
      }
      break;
    case 1:
      if(!board.isBlocking(e.x-1,e.y) && !player_here(e,e.x-1,e.y) && !colleagueHere(e.x-1,e.y))
      {
        e.x--;
      }
      break;
    case 2:
      if(!board.isBlocking(e.x,e.y+1) && !player_here(e,e.x,e.y+1) && !colleagueHere(e.x,e.y+1))
      {
        e.y++;
      }
      break;
    case 3:
      if(!board.isBlocking(e.x,e.y-1) && !player_here(e,e.x,e.y-1) && !colleagueHere(e.x,e.y-1))
      {
        e.y--;
      }
      break;
      default:
      //enemy chose not to move
      break;
  }
}

function enemy_update(e)
{
  let dir;
  if((Math.abs(p.y - e.y) < 4) && (Math.abs(p.x - e.x) < 4))
  {
    if(p.y > e.y)
    {
      dir = 2;
      move_enemy(e,dir);
    }else{
      dir = 3;
      move_enemy(e,dir);
    }
    
    if(p.x > e.x)
    {
      dir = 0;
      move_enemy(e,dir);
    }else{
      dir = 1;
      move_enemy(e,dir);
    }
  }else{
    let dir = get_random(0,4);
    move_enemy(e,dir);
  }
}

function make_enemy(g,n,tx,ty,a,hp,d)
{
  let c = new Creature(new Tile(g,tx,ty),0,0);
  c.update = enemy_update;
  c.attack = a;
  c.hp = hp;
  c.max_hp = hp;
  
  return c;
}

function merchant_update(c)
{
  
}

function make_npc(g,n,tx,ty,a,hp,d)
{
  let c = new Creature(new Tile(g,tx,ty),0,0);
  //c.update = enemy_update;
  c.attack = a;
  c.hp = hp;
  c.max_hp = hp;

  return c;
}

function make_level_boss(g,n,tx,ty,a,hp,d)
{
  let c = make_enemy(g,n,tx,ty,a,hp,d);
  c.onDeath = function(){stair.tile = stair.open_tile;board.tiles[stair.x][stair.y] = stair.tile;board.init_map(context);};
  c.boss = true;
  c.drop = make_fortitude_potion(5);
  
  return c;
}

var npcs = [
  function()
  {
    let npc = make_npc(people,"merchant",1,2,0,10,"a merchant");
    npc.update = merchant_update;

    npc.trade_items = [];
    let num_items = get_random(3,8);

    for(let i = 0; i < num_items; i++)
    {
      item = generate_item(current_level);
      npc.trade_items.push([item,10]);
    }

    npc.trade_items.push([generate_item(current_level+1),20]);
    npc.trade_items.push([generate_item(current_level+2),30]);

    /*
    npc.trade_items = [
      [make_armor("leather helm",9,0,"head",2,0,"a leather helm"),5],
      [make_armor("rusted chain mail",4,4,"body",8,0,"a rusted chain mail shirt"),20],
      [make_protection_jewelry("amulet of protection 2",1,3,"neck",2,"a greater amulet of protection"),15],
      [make_armor("leather gloves",3,2,"hands",1,0,"some leather gloves"),10],
      [make_healing_potion("medium health potion",4,1,30,"a medium health potion"),5]
    ];
    */
    npc.engage = function(){
      //open_trade_menu([[make_armor("leather helm",9,0,"head",2,0,"a leather helm"),5]]);
      trade_items = npc.trade_items;
      show_trade = true;
    };

    return npc;
  },
  function()
  {
    let npc = make_npc(people,"some guy",2,1,0,10,"a person");
    
    let q = new Quest();
    q.name = "The grand test quest!";

    npc.quest = q;
    
    npc.quest_given = false;
     

    npc.engage = function(){

      if(this.quest_given == false)
      {
        this.quest.start();
        this.quest_given = true;
      }else{
        this.quest.end();
      }

    };

    return npc;
  }
];

var level1_enemies = [
            function(){return make_enemy(enemies,"worm",2,5,5,5,"a worm");},
            function(){return make_enemy(enemies,"fang worm",1,5,10,8,"a fang worm");},
            function(){return make_enemy(enemies,"brown ant",0,0,15,15,"a brown ant");},
            function(){return make_enemy(enemies,"tentacle monster",0,2,10,18,"a tentacle monster");},
            function(){return make_enemy(enemies,"green tentacle monster",1,2,15,20,"a green tentacle monster");}
          ];
          
var level2_enemies = [
              function(){return make_enemy(enemies,"black ant",1,0,20,20,"a black ant");},
              function(){return make_enemy(enemies,"horn lizard",0,1,25,30,"a horn lizard");},
              function(){return make_enemy(enemies,"blue living plant",2,3,30,35,"a blue living plant");},
              function(){return make_enemy(enemies,"tan worm",7,2,15,15,"a tan worm");}
            ];
            
var level3_enemies = [
            function(){return make_enemy(enemies4,"black bat",0,0,30,35,"a black bat");},
            function(){return make_enemy(enemies4,"brown bat",2,0,30,40,"a brown bat");},
            function(){return make_enemy(enemies4,"black snake",1,2,35,45,"a black snake");},
            function(){return make_enemy(enemies4,"green snake",2,2,40,45,"a green snake");}
          ];
          
var level4_enemies = [
            function(){return make_enemy(enemies1,"kobold",0,7,40,50,"");},
            function(){return make_enemy(enemies1,"kobold soldier",1,7,45,55,"");},
            function(){return make_enemy(enemies1,"kobold elite",2,7,50,60,"");},
            function(){return make_enemy(enemies1,"kobold priest",3,7,60,40,"");},
            function(){return make_enemy(enemies1,"kobold mage",5,7,60,40,"");},
            function(){return make_enemy(enemies1,"kobold monk",4,7,45,55,"");}
          ];

var level5_enemies = [
            function(){return make_enemy(enemies3,"green slime",0,0,50,55,"a green slime");},
            function(){return make_enemy(enemies3,"blue slime",1,0,55,55,"a blue slime");},
            function(){return make_enemy(enemies3,"black slime",2,0,60,60,"a black slime");},
            function(){return make_enemy(enemies3,"purple slime",3,0,65,50,"a purple slime");},
            function(){return make_enemy(enemies3,"brown slime",4,0,65,60,"a brown slime");}
          ];

var level6_enemies = [
            function(){return make_enemy(enemies1,"kobold demon",0,6,60,65,"a kobold demon");},
            function(){return make_enemy(enemies1,"kobold demon soldier",1,6,65,65,"a kobold demon soldier");},
            function(){return make_enemy(enemies1,"kobold demon hero",2,6,70,70,"a kobold demon hero");},
            function(){return make_enemy(enemies1,"kobold demon elite",3,6,60,80,"a kobold demon elite");},
            function(){return make_enemy(enemies1,"kobold demon monk",4,6,65,70,"a kobold demon monk");},
            function(){return make_enemy(enemies1,"kobold demon mage",5,6,70,65,"a kobold demon mage");}
          ];

var level7_enemies = [
            function(){return make_enemy(enemies3,"blue floater",0,1,65,70,"a blue floater");},
            function(){return make_enemy(enemies3,"orange floater",1,1,70,70,"an orange floater");},
            function(){return make_enemy(enemies3,"brown floater",2,1,75,75,"a brown floater");},
            function(){return make_enemy(enemies3,"blood floater",3,1,65,85,"a blood floater");},
            function(){return make_enemy(enemies3,"floater",4,1,70,75,"a floater");},
            function(){return make_enemy(enemies3,"purple floater",5,1,75,70,"a purple floater");}
          ];
          
var level8_enemies = [
            function(){return make_enemy(enemies1,"",0,8,75,80,"a ");},
            function(){return make_enemy(enemies1,"",1,8,80,80,"a ");},
            function(){return make_enemy(enemies1,"",2,8,85,85,"a ");},
            function(){return make_enemy(enemies1,"",3,8,75,95,"a ");},
            function(){return make_enemy(enemies1,"",4,8,80,85,"a ");},
            function(){return make_enemy(enemies1,"",5,8,85,80,"a ");}
          ];
          
var level9_enemies = [
            function(){return make_enemy(enemies1,"",0,15,85,90,"a ");},
            function(){return make_enemy(enemies1,"",1,15,90,90,"a ");},
            function(){return make_enemy(enemies1,"",2,15,95,95,"a ");},
            function(){return make_enemy(enemies1,"",3,15,85,95,"a ");},
            function(){return make_enemy(enemies1,"",4,15,90,95,"a ");},
            function(){return make_enemy(enemies1,"",5,15,95,90,"a ");}
          ];
          
var level10_enemies = [
            function(){return make_enemy(undead,"",0,6,95,100,"a ");},
            function(){return make_enemy(undead,"",1,6,100,100,"a ");},
            function(){return make_enemy(undead,"",2,6,105,105,"a ");},
            function(){return make_enemy(undead,"",3,6,95,105,"a ");},
            function(){return make_enemy(undead,"",4,6,100,105,"a ");},
            function(){return make_enemy(undead,"",5,6,105,100,"a ");}
          ];

function generate_enemy(level)
{
  let e;
  switch(level)
  {
    case 0:
      e = level1_enemies;
    break;
    case 1:
      e = level2_enemies;
    break;
    case 2:
      e = level3_enemies;
    break;
    case 3:
      e = level4_enemies;
    break;
    case 4:
      e = level5_enemies;
    break;
    case 5:
      e = level6_enemies;
    break;
    case 6:
      e = level7_enemies;
    break;
    case 7:
      e = level8_enemies;
    break;
    case 8:
      e = level9_enemies;
      break;
    case 9:
      e = level10_enemies;
    break;
  }
  let r = get_random(0,e.length-1);
    
  return e[r]();
}

function generate_level_boss(level)
{
  let e;
  switch(level)
  {
    case 0:
      e = [
            function()
            {
              let b = make_level_boss(enemies,"boss",1,3,25,30,"a level boss");
    
              return b;
            }
          ];
    break;
    case 1:
      e = [
            function()
            {
              let b = make_level_boss(enemies3,"boss",5,8,40,40,"a level boss");
              
              return b;
            }
          ];
    break;
    case 2:
      e = [
            function()
            {
              let b = make_level_boss(enemies4,"pink bat(boss)",1,0,45,60,"a level boss");
        
              return b;
            }
          ];
      break;
    case 3:
      e = [
            function()
            {
              let b = make_level_boss(enemies1,"boss",1,0,60,70,"a level boss");
        
              return b;
            }
          ];
      break;
    case 4:
      e = [
            function()
            {
              let b = make_level_boss(enemies3,"gelatinous cube(boss)",5,0,70,80,"a gelatinous cube");
              
              return b;
            }
          ];   
      break;
    case 5:
      e = [
            function()
            {
              let b = make_level_boss(enemies3,"cloud of fire(boss)",0,4,80,90,"a cloud of fire");
              
              return b;
            }
          ];      
      break;
      case 6:
        e = [
              function()
              {
                let b = make_level_boss(uniques,"floating eye beast(boss)",1,7,90,110,"a floating eye beast");
                
                return b;
              }
            ];  
      break;
    case 7:
      e = [
            function()
            {
              let b = make_level_boss(undead,"apparition(boss)",2,0,95,115,"an apparition");
                       
              return b;
            }
          ];      
    break;
    case 8:
      e = [
            function()
            {
              let b = make_level_boss(enemies1,"orc(boss)",1,2,100,120,"an orc");
              
              return b;
            }
          ];      
    break;
    case 9:
      e = [
            function()
            {
              let b = make_level_boss(undead,"skeleton lord(boss)",3,8,105,125,"a skeleton lord");
                       
              return b;
            }
          ];      
    break;
    case 10:
      e = [
        function()
        {
          let b = make_level_boss(dragon,"red dragon(boss)",0,4,115,250,"a red dragon");
          b.birth_counter = 10;
          
          b.update = function(e)
          {
            let dir;
            if((Math.abs(p.y - e.y) < 10) && (Math.abs(p.x - e.x) < 10))
            this.birth_counter--;
            if(this.birth_counter === 0)
            {
              let bd = make_enemy(dragon,"baby dragon",5,0,110,50,"a baby dragon");
              bd.boss = true;
              bd.dexterity = 30;
              bd.drop = make_healing_potion("massive health potion",5,6,50,"a massive health potion");
              bd.update = function(e)
              {
                let dir;
                if((Math.abs(p.y - e.y) < 10) && (Math.abs(p.x - e.x) < 10))
                {
                  if(p.y > e.y)
                  {
                    dir = 2;
                    move_enemy(e,dir);
                  }else{
                    dir = 3;
                    move_enemy(e,dir);
                  }
                  
                  if(p.x > e.x)
                  {
                    dir = 0;
                    move_enemy(e,dir);
                  }else{
                    dir = 1;
                    move_enemy(e,dir);
                  }
                }else{
                  let dir = get_random(0,4);
                  
                  move_enemy(e,dir);
                  
                }
              };
              
              bd.x = this.x;
              bd.y = this.y;
              
              board.creatures.push(bd);
              this.birth_counter = 10;
            }
            
            if((Math.abs(p.y - e.y) < 2) && (Math.abs(p.x - e.x) < 2))
            {
              if(p.y > e.y)
              {
                dir = 2;
                move_enemy(e,dir);
              }else{
                dir = 3;
                move_enemy(e,dir);
              }
              
              if(p.x > e.x)
              {
                dir = 0;
                move_enemy(e,dir);
              }else{
                dir = 1;
                move_enemy(e,dir);
              }
            }else{
              let dir = get_random(0,4);
              move_enemy(e,dir);
            }
          };
      
          b.dexterity = 20;
          b.drop = make_winners_emblem();
                   
          return b;
        }
      ];  
    break;
    default:
      e = [
            function()
            {
              let b = make_level_boss(enemies3,"gelatinous cube(boss)",5,0,70,80,"a gelatinous cube");
              
              return b;
            }
          ];
      break;
  }
  let r = get_random(0,e.length-1);
    
  return e[r]();
}

//could replace all of the generate_somethings with a generate_random_objects() and pass in
//the object generation function: generate_random_object(generate_enemy,current_level);
function generate_enemies(level)
{
  let n = get_random(5,9);
  let a = [];
  
  for(let i = 0; i < n; i++)
  {
    a.push(generate_enemy(level));
  }
  
  return a;
}
