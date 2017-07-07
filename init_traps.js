
function generate_traps(level)
{
  let traps = [];
  for(let i = 0; i < 5; i++)
  {
    let t = new Trap("spike trap",new Tile(misc,2,5),0,0);
    t.damage = 10*(current_level+1);
    t.detection_difficulty = 5;
    
    traps.push(t);
  }
  
  return traps;
}
