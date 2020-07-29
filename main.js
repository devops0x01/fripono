
//pollute the global scope with some master variables

// Set up the canvas.
var canvas  = document.getElementById('canvas');
var context = canvas.getContext('2d');
        
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const SCALE = 48;
var screenX = 0;
var screenY = 0;
var current_level = -1;
//current_level = 9; //Uncomment for testing on different levels.
                     //Must be set 2 less than the desired level.

var game_won = false;

var screen_messages = ["","","","","",
                       "","","","",""];
var num_messages_to_display = 5;

var show_help  = true;
var show_trade = false;

var trade_items = [];

window.onkeypress = handleKeypress; 
//window.onclick = handleMouse;

var p = new Player(new Tile(player,0,0),0,0);

// TESTING picks
//p.items.push(make_item("pick",6,3,3,"a pick"));
p.items.push(make_pick());


//give the player a few starting items
p.items.push(make_weapon("dagger",6,0,2,"a dagger"));
p.items.push(make_armor("tattered robe",3,3,"body",1,0,"a tattered robe"));

//equip the items we gave to the player
//p.selected_item = 0;
//p.equip();
p.selected_item = 1;
p.equip();
p.selected_item = 2;
p.equip();
p.selected_item = null;

//give the player a few starting potions
p.items.push(make_healing_potion("small health potion",5,7,20,"a small health potion"));
p.items.push(make_healing_potion("small health potion",5,7,20,"a small health potion"));
p.items.push(make_healing_potion("small health potion",5,7,20,"a small health potion"));
/*
let ti = make_weapon("th",8,2,10,"a th");
ti.two_handed = true;
p.items.push(ti);

ti = make_weapon("th2",9,3,1,"a th2");
ti.two_handed = true;
p.items.push(ti);
*/
var board = null;
var stair = new Stair();
//var iface = new Interface();
      
window.onload = function()
{
  init_board();
  
  board.init_map(context);
  board.init_mini_map();
  
  draw_screen();
};
