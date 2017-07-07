
function get_random(min,max)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()*(max-min+1))+min;
}

function set_random_coordinates(items,rooms)
{
  //for each item
  for(let i = 0; i < items.length; i++)
  {
    //choose a room
    let room_num = get_random(0,rooms.length-1);
    //choose an x in the room
    let x = get_random(rooms[room_num].p.x+1,(rooms[room_num].p.x + rooms[room_num].w-1));
    //choose a y in the room
    let y = get_random(rooms[room_num].p.y+1,(rooms[room_num].p.y + rooms[room_num].h-1));
    //set the xy of the item
    items[i].x = x;
    items[i].y = y;
  }
}
