
/*
/// expand with color, background etc.
function drawTextBG(ctx, txt, font, x, y) {

    /// lets save current state as we make a lot of changes        
    ctx.save();

    /// set font
    ctx.font = font;

    /// draw text from top - makes life easier at the moment
    ctx.textBaseline = 'top';

    /// color for background
    ctx.fillStyle = '#f50';

    /// get width of text
    var width = ctx.measureText(txt).width;

    /// draw background rect assuming height of font
    //ctx.fillRect(x, y, width, parseInt(font, 10));
    ctx.fillRect(x, y, width, parseInt(font, 10)+6);

    /// text color
    ctx.fillStyle = '#000';

    /// draw text on top
    ctx.fillText(txt, x, y);

    /// restore original state
    ctx.restore();
}*/

function Board(s)
{
  this.items = [];
  this.creatures = [];
  this.npcs = [];
  this.furniture = [];
  this.traps = [];
  
  this.show_item_stats = false;

  this.tiles = new Array(s);
  for (let i = 0; i < s; i++) {
    this.tiles[i] = new Array(s);
  }
  
  this.size = s;

  this.mini_map_buffer = document.createElement('canvas');
  this.mini_map_buffer.width = this.size*SCALE;
  this.mini_map_buffer.height = this.size*SCALE;
  
  //this.mini_map_buffer.width = this.size;
  //this.mini_map_buffer.height = this.size;
  
  this.mini_map_buffer_ctx = this.mini_map_buffer.getContext('2d');
  this.mini_map_buffer_ctx.fillStyle = "#0000ff";
  this.mini_map_buffer_ctx.fillRect(0,0,this.mini_map_buffer.width,this.mini_map_buffer.height); 
  /*
  this.mini_map = document.createElement('canvas');
  this.mini_map.width = this.size*SCALE;
  this.mini_map.height = this.size*SCALE;
  */
  /*
  this.mini_map_ctx = this.mini_map.getContext('2d');
  this.mini_map_ctx.fillStyle = "#0000ff";
  this.mini_map_ctx.fillRect(0,0,this.mini_map.width,this.mini_map.height);
*/

  this.buffer = document.createElement('canvas');
  this.buffer.width = this.size*SCALE;
  this.buffer.height = this.size*SCALE;

  this.buffer_ctx = this.buffer.getContext('2d');
  this.buffer_ctx.fillStyle = "#00ff00";
  this.buffer_ctx.fillRect(0,0,this.buffer.width,this.buffer.height);

}

Board.prototype.isBlocking = function(x,y)
{
  return this.tiles[x][y].blocking;
};

Board.prototype.fill = function(f)
{
  for(let i = 0; i < this.size; i++)
  {
    for(let j = 0; j < this.size; j++)
    {
      this.tiles[i][j] = f;
    }
  }
};

Board.prototype.init_mini_map = function()
{
  for(let i = 0; i < this.size; i++)
  {
    for(let j = 0; j < this.size; j++)
    {
      this.mini_map_buffer_ctx.drawImage(this.tiles[i][j].img,this.tiles[i][j].img_x,
                        this.tiles[i][j].img_y,32,32,i*SCALE,j*SCALE,SCALE,SCALE);
    }
    /*
    for(let j = 0; j < this.size; j++)
    {
      this.mini_map_buffer_ctx.drawImage();
    }
    */
    
    
    
  }
};

Board.prototype.init_map = function(ctx)
{
  //draw the tiles
  for(let i = 0; i < this.size; i++)
  {
    for(let j = 0; j < this.size; j++)
    {
      this.buffer_ctx.drawImage(this.tiles[i][j].img,this.tiles[i][j].img_x,
                    this.tiles[i][j].img_y,32,32,i*SCALE,j*SCALE,SCALE,SCALE);

    }
  }
};

Board.prototype.draw = function(ctx)
{
  //this.init_map(ctx);
  ctx.drawImage(this.buffer,0,0,this.buffer.width,this.buffer.height,
                screenX,screenY,this.buffer.width,this.buffer.height);
                
  //draw the traps
  for(let t = 0;t < this.traps.length;t++)
  {
    if(this.traps[t].hidden === false)
    {
      ctx.drawImage(this.traps[t].tile.img,this.traps[t].tile.img_x,
                    this.traps[t].tile.img_y,32,32,this.traps[t].x*SCALE+screenX,
                    this.traps[t].y*SCALE+screenY,SCALE,SCALE);
    }
  }
                
  //draw the furniture
  for(let bf = 0;bf < this.furniture.length;bf++)
  {
    ctx.drawImage(this.furniture[bf].tile.img,this.furniture[bf].tile.img_x,
                  this.furniture[bf].tile.img_y,32,32,this.furniture[bf].x*SCALE+screenX,
                  this.furniture[bf].y*SCALE+screenY,SCALE,SCALE);
  }

  //draw the items
  for(let bi = 0;bi < this.items.length;bi++)
  {
    ctx.drawImage(this.items[bi].tile.img,this.items[bi].tile.img_x,
                  this.items[bi].tile.img_y,32,32,this.items[bi].x*SCALE+screenX,
                  this.items[bi].y*SCALE+screenY,SCALE,SCALE);
  }

  //draw the NPCs
  for(let n = 0;n < this.npcs.length;n++)
  {
    ctx.drawImage(this.npcs[n].tile.img,this.npcs[n].tile.img_x,
                  this.npcs[n].tile.img_y,32,32,this.npcs[n].x*SCALE+screenX,
                  this.npcs[n].y*SCALE+screenY,SCALE,SCALE);
  }

  //draw creatures
  ctx.font = ctx.font.replace(/\d+px/,"18px");
  for(let bc = 0;bc < this.creatures.length;bc++)
  {
    ctx.drawImage(this.creatures[bc].tile.img,this.creatures[bc].tile.img_x,
                  this.creatures[bc].tile.img_y,32,32,this.creatures[bc].x*SCALE+screenX,
                  this.creatures[bc].y*SCALE+screenY,SCALE,SCALE);
                  
                  
    //draw a health and information label above the creature
    ctx.fillStyle = "#2d2d2d";
    ctx.fillRect(this.creatures[bc].x*SCALE+screenX-20,
                 this.creatures[bc].y*SCALE+screenY-22,
                 85,20);
                 //70,20);
     
    if(this.creatures[bc].hp < Math.round(this.creatures[bc].max_hp/4))
    {
      context.fillStyle = "#ff0000";
    }else if(this.creatures[bc].hp < Math.round(this.creatures[bc].max_hp/2))
    {
      context.fillStyle = "gold";
    }else{
      context.fillStyle = "#00ff00";
    }
      
    let label = this.creatures[bc].hp.toString() + "/" + this.creatures[bc].max_hp.toString();
    if(this.creatures[bc].boss)
    {
      label += " B";  
    }
    ctx.fillText(label,
                 this.creatures[bc].x*SCALE+screenX-20,
                 this.creatures[bc].y*SCALE+screenY-6);
                 
  }
  
  //Mini map
  /*
  this.mini_map_ctx.drawImage(this.mini_map_buffer,0,0);

  this.mini_map_ctx.fillStyle = "#00ffff";
  this.mini_map_ctx.fillRect(p.x*SCALE,p.y*SCALE,SCALE,SCALE);
  
  
  this.mini_map_ctx.fillStyle = "#FFD700";
  this.mini_map_ctx.fillRect(stair.x*SCALE,stair.y*SCALE,SCALE,SCALE);
*/
  //ctx.drawImage(this.mini_map,0,0,this.size*SCALE,this.size*SCALE,canvas.width-256,SCALE,160,160);
  ctx.drawImage(this.mini_map_buffer,0,0,this.size*SCALE,this.size*SCALE,canvas.width-160,SCALE,160,160);
  
  ctx.fillStyle = "#00ffff";
  ctx.fillRect(p.x*2+canvas.width-160,p.y*2+SCALE,2,2);
  
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(stair.x*2+canvas.width-160,stair.y*2+SCALE,2,2);
  
  if(this.show_item_stats)
  {
    let bx = SCALE*p.selected_item;
    let by = SCALE;
    ctx.fillRect(bx,by,SCALE*8,SCALE*5);
    
    let i = p.items[p.selected_item];
    
    ctx.font = ctx.font.replace(/\d+px/,"24px");
    context.fillStyle = "#0000ff";
    ctx.fillText("item: " + i.name,bx+=8,by+=24);
    ctx.fillText("slot: " + i.slot_type,bx,by+=24);
    ctx.fillText("weight: " + i.weight,bx,by+=24);
    ctx.fillText("uses: " + i.uses,bx,by+=24);
    ctx.fillText("is equipped: " + i.equipped.toString(),bx,by+=24);
    ctx.fillText("armor: " + i.armor.toString(),bx,by+=24);
    ctx.fillText("attack: " + i.attack.toString(),bx,by+=24); 
    if(i.strength)
    {
      ctx.fillText("strength: " + i.strength.toString(),bx,by+=24); 
    }
  
    this.show_item_stats = false;
  }
};

var walls_by_level = [
    function(){
      w = new Tile(dungeon,2,0);
      w.description = "A plain stone wall is here";
      w.blocking = true;

      return w;
    },
    function(){
      w = new Tile(extra,0,11);
      w.description = "A plain stone wall is here";
      w.blocking = true;

      return w;
    },
    function(){
      w = new Tile(dungeon,2,4);
      w.description = "A plain stone wall is here";
      w.blocking = true;

      return w;
    },
    function(){
      w = new Tile(extra,6,14);
      w.description = "A plain stone wall is here";
      w.blocking = true;

      return w;
    },
    function(){
      w = new Tile(dungeon,0,4);
      w.description = "A plain stone wall is here";
      w.blocking = true;

      return w;
    },
    function(){
      w = new Tile(features,3,6);
      w.description = "red hot lava";
      w.blocking = true;

      return w;
    },
    function(){
      w = new Tile(extra,6,11);
      w.description = "A white stone wall";
      w.blocking = true;

      return w;
    },
    function(){
      w = new Tile(grounds,0,2);
      w.description = "some unfathomable water";
      w.blocking = true;

      return w;
    },
    function(){
      w = new Tile(extra,3,12);
      w.description = "a sand stone wall";
      w.blocking = true;

      return w;
    },
    function(){
      w = new Tile(dungeon,0,4);
      w.description = "";
      w.blocking = true;

      return w;
    },
    function(){
      w = new Tile(extra,0,11);
      w.description = "a stone wall of cyclopean stones";
      w.blocking = true;

      return w;
    }
  ];

function init_board()
{
  current_level++;
  stair.tile = stair.closed_tile;
  board = new Board(80);
  let rooms;
  
  if(current_level < 10)
  {
    board.fill(walls_by_level[current_level]());
    rooms = create_rooms(board,get_random(8,15));
    create_paths(board,rooms);

    p.x = rooms[0].p.x + 1;
    p.y = rooms[0].p.y + 1;
    //screenX = 0-p.x*SCALE+9*SCALE;
    //screenY = 0-p.y*SCALE+9*SCALE;
    screenX = 0-p.x*SCALE+15*SCALE;
    screenY = 0-p.y*SCALE+9*SCALE;
    
    let r = null;
    let ri = get_random(0,rooms.length-1);
    
    board.traps = generate_traps(current_level);
    
    //create the furniture first so the 
    //stairs will always be above them...
    board.furniture = generate_furnishings(current_level);
    
    r = rooms[ri];
    stair.x = get_random(r.p.x,r.p.x+r.w-1);
    stair.y = get_random(r.p.y,r.p.y+r.h+1);
    board.tiles[stair.x][stair.y] = stair.tile;
  
    board.items = generate_items(current_level);
    
    board.creatures = generate_enemies(current_level);
    board.creatures.push(generate_level_boss(current_level));  

    //add some NPCs
    let npc = npcs[0]();
    board.npcs.push(npc);

    //Player is always started in room 0. So, do a slice on the rooms 
    //so that room 0 is not included. That way the player won't
    //start in a room with creatures.
    set_random_coordinates(board.creatures,rooms.slice(1));
    set_random_coordinates(board.npcs,rooms);
    set_random_coordinates(board.items,rooms);
    set_random_coordinates(board.furniture,rooms);
    set_random_coordinates(board.traps,rooms);
    
  }else{
    let fill_wall = walls_by_level[current_level]();
    fill_wall.blocking = true;
    board.fill(fill_wall);
    
    let bt = board.tiles;
    
    let floor = floors_by_level[current_level];
    
    let foyer = new Room(new Point(40,40),11,11);
    foyer.floor = floor;
    
    let west_room = new Room(new Point(14,40),11,11);
    west_room.floor = floor;
    
    let east_room = new Room(new Point(66,40),11,11);
    east_room.floor = floor;
   
    rooms = [foyer,west_room,east_room];
    
    for(let rm = 0; rm < rooms.length; rm++)
    {
      rooms[rm].draw_to_board(board);
    }
    
    p.x = rooms[0].p.x + 5;
    p.y = rooms[0].p.y + 6;
    
    //screenX = 0-p.x*SCALE+SCALE*9;
    //screenY = 0-p.y*SCALE+SCALE*9;
    
    screenX = 0-p.x*SCALE+15*SCALE;
    screenY = 0-p.y*SCALE+9*SCALE;

    let pillar = new Tile(extra,3,5);
    pillar.blocking = true;
    
    let lava = new Tile(grounds,0,4);
    
    bt[16][43] = lava;
    bt[17][43] = lava;
    bt[18][43] = lava;
    bt[19][43] = lava;
    bt[20][43] = lava;
    bt[21][43] = lava;
    bt[22][43] = lava;
    
    bt[16][49] = lava;
    bt[17][49] = lava;
    bt[18][49] = lava;
    bt[19][49] = lava;
    bt[20][49] = lava;
    bt[21][49] = lava;
    bt[22][49] = lava;
    
    bt[22][44] = lava;
    //bt[21][44] = lava;
    
    bt[22][48] = lava;
    //bt[21][48] = lava;
    
    bt[16][44] = lava;
    bt[16][45] = lava;
    bt[16][46] = lava;
    bt[16][47] = lava;
    bt[16][48] = lava;
    
    bt[17][44] = lava;
    bt[17][48] = lava;
    
    bt[42][42] = pillar;
    bt[42][44] = pillar;
    bt[42][46] = pillar;
    bt[42][48] = pillar;
    bt[42][50] = pillar;
    
    bt[48][42] = pillar;
    bt[48][44] = pillar;
    bt[48][46] = pillar;
    bt[48][48] = pillar;
    bt[48][50] = pillar;
    
    let knight_statue = new Tile(extra,0,0);
    knight_statue.blocking = true;

    //north passage
    
    bt[43][40] = knight_statue;
    
    bt[44][40] = floor;
    bt[45][40] = floor;
    bt[46][40] = floor;
    
    bt[44][39] = floor;
    bt[45][39] = floor;
    bt[46][39] = floor;
    
    bt[44][38] = floor;
    bt[45][38] = floor;
    bt[46][38] = floor;
    
    bt[44][37] = floor;
    bt[45][37] = floor;
    bt[46][37] = floor;
    
    //bt[43][37] = wall_pillar;
  
    bt[44][36] = floor;
    bt[45][36] = floor;
    bt[46][36] = floor;
    
    bt[44][35] = floor;
    bt[45][35] = floor;
    bt[46][35] = floor;
    
    bt[47][40] = knight_statue;
    
    //east passage
    
    bt[51][44] = knight_statue;
    bt[51][48] = knight_statue;
    
    let sx = 51;
    let sy = 45;
    for(let j = 0; j < 3; j++)
    {
      for(let i = 0; i < 15; i++)
      {
        bt[sx+i][sy] = floor;
      }
      sy += 1;
    }
    
    //west passage
    
    bt[39][44] = knight_statue;
    bt[39][48] = knight_statue;
    
    sx = 39;
    sy = 45;
    for(let j = 0; j < 3; j++)
    {
      for(let i = 0; i < 15; i++)
      {
        bt[sx-i][sy] = floor;
      }
      sy += 1;
    }
    
    bt[25][44] = knight_statue;
    bt[25][48] = knight_statue;
    
    board.creatures.push(generate_level_boss(current_level));
    set_random_coordinates(board.creatures,rooms.slice(1));
  }
}














