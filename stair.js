
function Stair()
{
  this.x = 0;
  this.y = 0;
  
  this.open_tile = new Tile(dungeon,4,3);
  this.closed_tile = new Tile(dungeon,8,3);
  
  this.tile = this.closed_tile;
  
  this.open_tile.onActivate = function(){init_board();board.init_map();board.init_mini_map();};  
}
