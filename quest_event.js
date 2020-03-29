
function QuestEvent(n,x,y)
{
  this.name = n;
  this.x = x;
  this.y = y;
  this.triggered = false;
  console.log("event: " + this.name + "x: " + x + " y: " + y);
}

QuestEvent.prototype.setTriggered = function(t){
  this.triggered = t;
};

QuestEvent.prototype.action = function(){
  if(this.triggered == false)
  {
    console.log("quest event action initiated x: " + this.x + " y: " + this.y);
    let g = generate_gold(current_level);
    g.x = this.x;
    g.y = this.y;
    board.items.push(g);
  }
  this.triggered = true;
};

//Event.prototype.onActivate = function()
//{
  //screen_messages.unshift(this.description);
//};

