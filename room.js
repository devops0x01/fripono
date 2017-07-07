
function Point(x,y)
{
  this.x = x;
  this.y = y;
}

var floors_by_level = [
    new Tile(dungeon,6,8),
    new Tile(features,3,1),
    new Tile(dungeon,0,8),
    new Tile(features,0,10),
    new Tile(features,3,3),
    new Tile(features,6,3),
    new Tile(grounds,0,11),
    new Tile(grounds,3,1),
    new Tile(features,3,1),
    new Tile(grounds,3,1),
    new Tile(features,0,0)
  ];

function Door(p)
{
  this.p = p;
  this.open = false;
  this.tile = new Tile(dungeon,6,1);
}

Door.prototype.toggle = function()
{
  if(this.open)
  {
    this.open = false;
    this.tile = new Tile(dungeon,6,1);    
  }else{
    this.open = true;
    this.tile = new Tile(dungeon,7,1);
  }
};

function Room(p,w,h)
{
  this.p = p;
  this.w = w;
  this.h = h;
  
  this.doors = [];
  this.floor = null;
}


Room.prototype.check_intersection = function(o)
{
  let l1 = this.p;
  let r1 = new Point(this.p.x + this.w,this.p.y + this.h);
  let l2 = o.p;
  let r2 = new Point(o.p.x + o.w,o.p.y + o.h);
  
  //If one rectangle is on left side of other
  if (l1.x >= r2.x || l2.x >= r1.x)
  {
    return false;
  }
  
  //If one rectangle is above other
  if (l1.y >= r2.y || l2.y >= r1.y)
  {
    return false;
  }
    
  return true;
};

Room.prototype.draw_to_board = function(m)
{
  let sx = this.p.x;
  let sy = this.p.y;
  for(let j = 0; j < this.h; j++)
  {
    sy += 1;
    for(let k = 0; k < this.w; k++)
    {
      m.tiles[sx][sy] = this.floor;
      //m.tiles[sx][sy] = new Tile(dungeon,6,8);
      sx += 1;
    }
    sx = this.p.x;
  }
  for(let d = 0; d < this.doors.length; d++)
  {
    m.tiles[this.doors[d].p.x][this.doors[d].p.y] = this.doors[d].tile;
  }
};

function generate_room(m,min_width)
{
  let x = Math.abs(get_random(2,m.tiles.length - 7 - min_width));
  let y = Math.abs(get_random(2,m.tiles.length - 7 - min_width));
  let w = Math.abs(get_random(0,5))+min_width;
  let h = Math.abs(get_random(0,5))+min_width;
  
  let r = new Room(new Point(x,y),w,h);
  r.floor = floors_by_level[current_level];
  
  return r;
}

function create_rooms(m,n)
{
  rooms = [];
  for(let i = 0; i < n; i++)
  {
    let room_created = false;
    
    while(room_created === false)
    {
      let r = generate_room(m,5);
      let collision_detected = false;

      for(let j = 0; j < rooms.length; j++)
      {
        let o = rooms[j];
        let ci = r.check_intersection(o);

        if(ci === true)
        {
          // the room colided with another so,
          // try again...
          collision_detected = true;
          break;
        }
      }
        
      if(!collision_detected)
      {
        room_created = true;
        r.draw_to_board(m);
        rooms.push(r);
      }
    }
  }
  return rooms;
}

function create_paths(m,rooms)
{
  for(let i = 0; i < (rooms.length - 1); i++)
  {
    let r1 = rooms[i];
    let r2 = rooms[i+1];
    //check the relation of this room to the next to determine
    //which direction the tunnel needs to start from
    if((r1.p.x + r1.w) <= (r2.p.x))
    {
      //we are to the left of the next room
      //start on right side
      //let sx = r1.p.x + r1.w - 1; //a one off error that was causing
                                    //rooms to be blocked...
      let sx = r1.p.x + r1.w;
      let sy = Math.trunc(r1.p.y + (r1.h/2));
      //m.tiles[sx][sy] = r1.floor;
      let door = new Door(new Point(sx,sy));
      //m.tiles[sx][sy] = door.tile;
      r2.doors.push(door);
      let tx = sx;
      for(tx = sx; tx < (r2.p.x-1); tx++)
      {
        m.tiles[tx][sy] = r1.floor;
      }
      if(sy <= r2.p.y)
      {
        let ty = sy;
        for(ty = sy; ty < (r2.p.y+2); ty++)
        {
          m.tiles[tx][ty] = r1.floor;
        }
        let door = new Door(new Point(tx,ty));
        //m.tiles[tx][ty] = door.tile;
        r2.doors.push(door);
      }else{
        let ty = sy;
        for(ty = sy; ty > (r2.p.y+1); ty--)
        {
          m.tiles[tx][ty] = r1.floor;
        }
        let door = new Door(new Point(tx,ty));
        //m.tiles[tx][ty] = door.tile;
        r2.doors.push(door);
      }
    }else if((r2.p.x + r2.w) <= (r1.p.x))
    {
      //we are to the right of the next room
      //start path on the left side
      let sx = r1.p.x;
      let sy = Math.trunc(r1.p.y + (r1.h/2));
      //m.tiles[sx][sy] = r1.floor;
      r1.doors.push(new Door(new Point(sx,sy)));
     // m.tiles[sx][sy] = r1.doors[r1.doors.length-1].tile;
      let tx = sx;
      for(tx = sx; tx > (r2.p.x-1); tx--)
      {
        m.tiles[tx][sy] = r1.floor;
      }
      
      if(sy <= r2.p.y)
      {
        let ty = sy;
        for(ty = sy; ty < (r2.p.y+2); ty++)
        {
          m.tiles[tx][ty] = r1.floor;
        }
        r2.doors.push(new Door(new Point(tx,ty)));
        //m.tiles[tx][ty] = r2.doors[r2.doors.length-1].tile;
      }else{
        let ty = sy;
        for(ty = sy; ty > (r2.p.y+1); ty--)
        {
          m.tiles[tx][ty] = r1.floor;
        }
        r2.doors.push(new Door(new Point(tx,ty)));
      //  m.tiles[tx][ty] = r2.doors[r2.doors.length-1].tile;
      }
    }else{
      //do the y sides here
      if((r1.p.y + r1.h) <= (r2.p.y))
      {
        //we are above and overlapping
        //start on the bottom edge
        let sx = Math.trunc(r1.p.x + (r1.w/2));
        let sy = r1.p.y + r1.h;
        m.tiles[sx][sy] = r1.floor;
        
        let ty = sy;
        for(ty = sy; ty < (r2.p.y+2); ty++)
        {
          m.tiles[sx][ty] = r1.floor;
        }
        
        if(sx < r2.p.x)
        {
          //go right
          let tx = sx;
          for(tx = sx; tx < (r2.p.x); tx++)
          {
            m.tiles[tx][ty] = r1.floor;
          }
        }else{
          //go left
          let tx = sx;
          for(tx = sx; tx > (r2.p.x); tx--)
          {
            m.tiles[tx][ty] = r1.floor;
          }
        }
      }else{
        //we are below and overlapping
        //start on the top edge
        let sx = Math.trunc(r1.p.x + (r1.w/2));
        let sy = r1.p.y + 1;
        m.tiles[sx][sy] = r1.floor;
        
        let ty = sy;
        for(ty = sy; ty > (r2.p.y+1); ty--)
        {
          m.tiles[sx][ty] = r1.floor;
        }
        
        if(sx < r2.p.x)
        {
          //go right
          let tx = sx;
          for(tx = sx; tx < (r2.p.x); tx++)
          {
            m.tiles[tx][ty] = r1.floor;
          }
        }else{
          //go left
          let tx = sx;
          for(tx = sx; tx > (r2.p.x); tx--)
          {
            m.tiles[tx][ty] = r1.floor;
          }
        }
      }
    }
  }
}
