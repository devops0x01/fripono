

function display_messages()
{
  for(let mi = 0; mi < num_messages_to_display; mi++)
  {
    let sx = SCALE;
    let sy = mi+2;
    context.fillStyle = "#00ffff";
    context.fillText(screen_messages[mi],sx,sy*SCALE);
  }
  num_messages_to_display = 5;
}

function draw_screen()
{
  //erase the canvas with a black rectangle
  context.fillStyle = "#000000";
  context.fillRect(0,0,canvas.width,canvas.height);
  
  if(game_won === false)
  {
    if(p.hp > 0)
    {
      board.draw(context);
  
      p.draw(context);
      
      //draw hp above player's avatar
      context.fillStyle = "#2d2d2d";
      context.fillRect(p.x*SCALE+screenX-10,
                   p.y*SCALE+screenY-22,
                   70,20);
     
      context.font = context.font.replace(/\d+px/,"18px");
      if(p.hp < Math.round(p.max_hp/4))
      {
        context.fillStyle = "#ff0000";
      }else if(p.hp < Math.round(p.max_hp/2))
      {
        context.fillStyle = "gold";
      }else{
        context.fillStyle = "#00ff00";
      }
      
      context.fillText(p.hp.toString() + "/" + p.max_hp.toString(),
                   p.x*SCALE+screenX-10,
                   p.y*SCALE+screenY-6);   
  
      //draw the inventory row
      context.fillStyle = "#2d2d2d";
      context.fillRect(0,0,canvas.width,SCALE);
      
      for(let i = 0; i < 10; i++)
      {
        context.font = context.font.replace(/\d+px/,"24px");
        context.fillStyle = "#ff0000";
        context.fillText(i.toString(),(i*SCALE) + 6,25);
      }

      for(let pi = 0;pi < p.items.length;pi++)
      {
        context.drawImage(p.items[pi].tile.img,p.items[pi].tile.img_x,
                          p.items[pi].tile.img_y,32,32,pi*SCALE,0,SCALE,SCALE);
  
        //draw the equipped box around the currently equipped items
        if(p.items[pi].isEquipped())
        {
          context.drawImage(equipped,0,0,32,32,pi*SCALE,0,SCALE,SCALE);
        }
      }
  
      //draw the selection box around the selected item:
      if(p.selected_item !== null)
      {
        context.drawImage(selected,0,0,32,32,p.selected_item*SCALE,0,SCALE,SCALE);
      }

      //draw player statistics
      let ty = SCALE*5;
      let tx = canvas.width-160;
      
      context.fillStyle = "#2d2d2d";
      context.fillRect(tx,160+SCALE,256,340);
      
      tx+=15;
      
      context.fillStyle = "#ff0000";
      context.fillText("HP: " + p.hp + "/" + p.max_hp,tx,ty);
  
      context.fillStyle = "#d2d2d2";
      context.fillText("Armor: " + p.armor,tx,ty+=32);
  
      context.fillStyle = "#ff00ff";
      context.fillText("Attack: " + p.attack,tx,ty+=32);

      context.fillStyle = "#f0f6f0";
      context.fillText("Enemies: " + board.creatures.length.toString(),tx,ty+=32);
  
      context.fillStyle = "#ffffff";
      context.fillText("Level: " + (current_level + 1).toString(),tx,ty+=32);

      context.fillStyle = "#ffff00";
      context.fillText("Gold: " + p.gold.toString(),tx,ty+=32);
      
      context.fillStyle = "#22ff33";
      context.fillText("Int: " + p.intelligence,tx,ty+=32);
      context.fillText("Str: " + p.strength,tx,ty+=32);
      context.fillText("Dex: " + p.dexterity,tx,ty+=32);
      context.fillText("Ftd: " + p.fortitude,tx,ty+=32);
  
      display_messages();

      //draw the trading menu
      if(show_trade)
      {
        window.onkeypress = function(e){
          if(e.key == "x")
          {
            window.onkeypress = handleKeypress;
            show_trade = false; 
          }

          switch(e.key)
          {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              ind = parseInt(e.key);
              if(trade_items[ind])
              {
                if(p.gold >= trade_items[ind][1])
                {
                  p.items.push(trade_items[ind][0]);
                  trade_items[ind][0].onPickup();
                  p.gold -= trade_items[ind][1];
                  trade_items.splice(ind,1); 
                }else{
                  //TODO: not enough gold!
                }
              }
            break;
          }

          draw_screen();
        };

        context.fillStyle = "#2d2d2d";
        context.fillRect(100,100,canvas.width-180,canvas.height-180);

        context.font = context.font.replace(/\d+px/,"24px");
                
        let x = 130;
        let y = 130;
        
        context.fillStyle = "#ff0000";
        context.fillText("type 'x' to close",canvas.width - 260,y);
        
        context.fillStyle = "#00ff00";

        context.fillText("For sale: name | attack | armor | strength | cost",x,y);
        

        context.fillStyle = "#0000ff";

        //let items = [[make_armor("leather helm",9,0,"head",2,0,"a leather helm"),5]];
        for(let i = 0; i < trade_items.length; i++)
        {
          context.drawImage(trade_items[i][0].tile.img,
                            trade_items[i][0].tile.img_x, trade_items[i][0].tile.img_y,
                            32,32,
                            x, y,
                            SCALE,SCALE+4);

          context.fillText(trade_items[i][0].name + "  |  " +
                           trade_items[i][0].attack.toString() + "  |  " +
                           trade_items[i][0].armor.toString()  + "  |  " +
                           trade_items[i][0].armor.toString()  + "  |  " +
                           trade_items[i][1].toString(),
                           x+SCALE,y+=36);
        }

      }
      
      //draw a help dialog
      if(show_help)
      {
        context.fillStyle = "#000000";
        context.fillRect(100,100,canvas.width-180,canvas.height-180);
        
        context.font = context.font.replace(/\d+px/,"24px");
                
        let x = 130;
        let y = 130;
        
        context.fillStyle = "#ff0000";
        context.fillText("type 'x' to close",canvas.width - 260,y);
        
        context.fillStyle = "#00ff00";

        //context.fillText("HELP",x,y);
        context.fillText("Controls:",x,y);
        
        context.fillStyle = "#0000ff";
        
        context.fillText("'q' - show selected item stats",x,y+=32);
        context.fillText("'c' - clear screen messages",x,y+=32);
        context.fillText("',' '.' - cycle left or right through inventory",x,y+=32);
        context.fillText("'0-9' - select a numbered inventory item",x,y+=32);
        context.fillText("'p' - temporarily display 5 more screen messages",x,y+=32);
        context.fillText("'d' - drop the selected item",x,y+=32);
        context.fillText("'g' - get all items the player is standing on",x,y+=32);
        context.fillText("'e' - equip the selected item",x,y+=32);
        context.fillText("'z' - unequip the selected item",x,y+=32);
        context.fillText("'a' - activate tile or enter door",x,y+=32);
        context.fillText("'o' - open the chest that the player is standing on",x,y+=32);
        context.fillText("'i' - drink selected potion",x,y+=32);
        
        //movement
        //context.fillText("      ",x,y+=32);
        y=130;
        x+=550;
        
        context.fillStyle = "#00ff00";
        
        context.fillText("  Movement:",x,y);
        
        context.fillStyle = "#0000ff";
        
        context.fillText("    y   k  u",x,y+=32);
        context.fillText("      \\ | /",x,y+=32);
        context.fillText(" h  -    -  l",x,y+=32);
        context.fillText("      / | \\",x,y+=32);
        context.fillText("    b   j  n",x,y+=32);
      }
      
      if(current_level === 0)
      {
        context.fillStyle = "#ffff00";
        context.fillText("For help type: '?'",canvas.width-260,32);
      }
  
      //iface.draw();
      
    }else{
      //GAME LOST
      context.fillStyle = "#000000";
      context.fillRect(0,0,canvas.width,canvas.height);
  
      console.log("player is dead...");
      context.fillStyle = "#ff0000";
      context.font = context.font.replace(/\d+px/,"64px");
      context.fillText("Sorry, game over.",256,256);
      
      context.fillStyle = "#0000ff";
      context.font = context.font.replace(/\d+px/,"48px");
      context.fillText("You were killed by: " + p.last_hit_by.name,256,300);
    }
  }else
  {
    //GAME WON
    context.fillStyle = "#000000";
    context.fillRect(0,0,canvas.width,canvas.height);

    console.log("player has won the game!");
    context.fillStyle = "#00ff00";
    context.font = context.font.replace(/\d+px/,"64px");
    context.fillText("You Won!",300,256);
  }
}

function check_for_traps(c)
{
  for(let ti = 0; ti < board.traps.length; ti++)
  {
    let t = board.traps[ti];
    if((t.x == c.x) && (t.y == c.y))
    {
      let escape_chance = get_random(1,c.dexterity)-t.escape_difficulty;
      let stricken_chance = get_random(2,100);
      if(stricken_chance > escape_chance)
      {
        t.show();
        let d = t.getDamage();
        c.last_hit_by = t;
        c.hurt(d);
        screen_messages.unshift("trap hurt: " + c.name + " for: " + d.toString());
      }else{
        screen_messages.unshift(c.name + " dodged the trap!");
      }
    }else{
      if((t.hidden === true) && (Math.abs(t.x - c.x) <= 
            get_random(0,Math.round(c.intelligence/4)) && Math.abs(t.y - c.y) <= 
            get_random(0,Math.round(c.intelligence/4))))
      {
        t.show();
        screen_messages.unshift("trap discovered by: " + c.name);
      }
    }
  }
}

function creatureHere(x,y)
{
  let hit_detected = false;
  for(let ci = 0; ci < board.creatures.length; ci++)
  {
    if((board.creatures[ci].x == x) && (board.creatures[ci].y == y))
    {
      //attempt to strike the creature
      board.creatures[ci].hit(p);
      
      //the creature ran out of health and is dying
      if(board.creatures[ci].hp <= 0)
      {
        //put a skeleton where the creature died
        let cx = board.creatures[ci].x;
        let cy = board.creatures[ci].y;
        let f = new Furniture(new Tile(misc,5,6),cx,cy);
        board.furniture.push(f);
        
        //if the creature is a boss then
        //create its unique drop, else
        //give a generic item drop
        let i;
        if(board.creatures[ci].boss)
        {
          i = board.creatures[ci].drop;
        }else{
          i = generate_item(current_level);
        }
        
        //put the item on the board
        i.x = cx;
        i.y = cy;
        board.items.push(i);
        
        //remove the creature from the board
        board.creatures[ci].onDeath();
        board.creatures.splice(ci,1);
      }
      hit_detected = true;
    }   
  }

  for(let n = 0; n < board.npcs.length; n++)
  {
    if((board.npcs[n].x == x) && (board.npcs[n].y == y))
    {
      board.npcs[n].engage();
      hit_detected = true;
    }
  }

  return hit_detected;
}

function update_all()
{
  //update the player
  p.update();
  
  //update all creatures
  for(let ci = board.creatures.length - 1; ci >= 0; ci--)
  {
      board.creatures[ci].update(board.creatures[ci]);
  }

  for(let ni = board.npcs.length - 1; ni >= 0; ni--)
  {
      board.npcs[ni].update(board.npcs[ni]);
  }
}
/*
function handleMouse(e)
{
  if(e.button === 0)
  {
    //
  }
}
*/
function handleKeypress(e)
{
  if(e.key == "?")
  {
    //if(show_help === false)
    //{
      show_help = true;
    //}else{
    //  show_help = false;
    //}
  }
  
  if(e.key == "q")
  {
    if(p.selected_item !== null)
    {
      board.show_item_stats = true;
    }else{
      console.log("No item selected");
    }
  }
  
  if(e.key == "e")
  {
    if(p.selected_item !== null)
    {
      p.equip();
    }else{
      console.log("No item selected");
    }
  }
  
  if(e.key == "y")
  {
    if((!board.isBlocking(p.x-1,p.y-1)) && (!creatureHere(p.x-1,p.y-1)))
    {
      screenY += SCALE;
      screenX += SCALE;
      p.y -= 1;
      p.x -= 1;

      check_for_traps(p);
      }
      update_all();
    }
    if(e.key == "u")
    {
      if((!board.isBlocking(p.x+1,p.y-1)) && (!creatureHere(p.x+1,p.y-1)))
      {
        screenY += SCALE;
        screenX -= SCALE;
        p.y -= 1;
        p.x += 1;

        check_for_traps(p);
      }
      update_all();
    }
      if(e.key == "b")
    {
      if((!board.isBlocking(p.x-1,p.y+1)) && (!creatureHere(p.x-1,p.y+1)))
      {
        screenY -= SCALE;
        screenX += SCALE;
        p.y += 1;
        p.x -= 1;

        check_for_traps(p);
      }
      update_all();
    }
    if(e.key == "n")
    {
      if((!board.isBlocking(p.x+1,p.y+1)) && (!creatureHere(p.x+1,p.y+1)))
      {
        screenY -= SCALE;
        screenX -= SCALE;
        p.y += 1;
        p.x += 1;

        check_for_traps(p);
      }
      update_all();
    }
    if(e.key == "j")
    {
      if((!board.isBlocking(p.x,p.y+1)) && (!creatureHere(p.x,p.y+1)))
      {
        screenY -= SCALE;
        p.y += 1;

        check_for_traps(p);
      }
      update_all();
    }
    if(e.key == "k")
    {
      if((!board.isBlocking(p.x,p.y-1)) && (!creatureHere(p.x,p.y-1)))
      {
        screenY += SCALE;
        p.y-= 1;

        check_for_traps(p);
      }
      update_all();
    }
    if(e.key == "h")
    {
      if((!board.isBlocking(p.x-1,p.y)) && (!creatureHere(p.x-1,p.y)))
      {
        screenX += SCALE;
        p.x -= 1;
 
        check_for_traps(p);
        }
        update_all();
    }
    if(e.key == "l")
    {
    if((!board.isBlocking(p.x+1,p.y)) && (!creatureHere(p.x+1,p.y)))
    {
      screenX -= SCALE;
      p.x += 1;
 
      check_for_traps(p);
    }
      update_all();
  }
  
  if(e.key == "g")
  {
    for(let bi = board.items.length - 1;bi >= 0; bi--)
    {
      if((board.items[bi].x == p.x) && (board.items[bi].y == p.y))
      {
        //console.log("getting item: " + board.items[bi].name);
        screen_messages.unshift("pickedup item: " + board.items[bi].name);
       
        if(board.items[bi].name != "gold")
        {
          p.items.push(board.items[bi]);
        }
        board.items[bi].onPickup();
        board.items.splice(bi,1);
        
        update_all();
      }
    }
  }
  if(e.key == "d")
  {
    if(p.selected_item !== null)
    {
      let item = p.items[p.selected_item];
      
      if(item.equipped)
      {
        p.unEquip();
      }
      
      item.x = p.x;
      item.y = p.y;
      item.onDrop();
      
      screen_messages.unshift("dropped item: " + item.name);
      
      board.items.push(item);
      p.items.splice(p.selected_item,1);
      p.selected_item = null;
      
      update_all();
    }
  }
  
  switch(e.key)
  {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      p.select(parseInt(e.key));
      break;
  }
  
  if(e.key == ",")
  {
    if((p.selected_item !== null) && (p.selected_item > 0))
    {
      p.selected_item--;
    }else{
      p.selected_item = p.items.length-1;
    }
  }
  
  if(e.key == ".")
  {
    if((p.selected_item !== null) && (p.selected_item < p.items.length-1))
    {
      p.selected_item++;
    }else{
      p.selected_item = 0;
    }
  }
  
  if(e.key == "z")
  {
    if(p.selected_item !== null)
    {
      p.unEquip();
      update_all();
    }else{
      console.log("No item selected");
    }
  }

  if(e.key == "i")
  {
    if(p.selected_item !== null)
    {
      p.use();
      update_all();
    }else{
      console.log("No item selected");
    }
  }

  if(e.key == "a")
  {
    for(let bi = 0; bi < board.items.length; bi++)
    {
      if((board.items[bi].x == p.x) && (board.items[bi].y == p.y))
      {
        board.items[bi].tile.onActivate();
      }
    }
  
    /*for(let bf = 0; bf < board.furniture.length; bf++)
    {
      if((board.furniture[bf].x == p.x) && (board.furniture[bf].y == p.y))
      {
        board.furniture[bf].tile.onActivate();
        update_all();
      }
    }*/
    board.tiles[p.x][p.y].onActivate();
  }
  
  if(e.key == "o")
  {
    for(let bf = 0; bf < board.furniture.length; bf++)
    {
      if((board.furniture[bf].x == p.x) && (board.furniture[bf].y == p.y))
      {
        board.furniture[bf].tile.onActivate();
        update_all();
      }
    }
  }

  if(e.key == "W")
  {
    //turn up stats for testing...
    //recharge stats for debug purposes
    p.attack = 100;
    p.armor = 100;
    p.hp = 100;
    p.food = 3000;
    p.water = 3000;
    
    screen_messages.unshift("GOD MODE ENGAGED!");
  }

  if(e.key == "r")
  {
    //rest
    //p.heal(1);
    
    update_all();
  }
  
  if(e.key == "c")
  {
    screen_messages = ["","","","","",
                       "","","","",""];
  }
  
  if(e.key == "p")
  {
    num_messages_to_display = 10;
  }

  if(e.key == "x")
  {
    show_trade = false;
    show_help = false;
  }

  draw_screen();
}
