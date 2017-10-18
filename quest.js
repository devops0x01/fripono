

function Quest()
{
  this.name = "";
  this.started = false;
  this.finished = false;
  this.checkpoints = [];

  this.start_action = function(){};
  this.start = function(){
    if(this.started = false)
    {
      console.log("starting quest: " + this.name);
      this.start_action();
      this.started = true;
    }
  };

  this.end_action = function(){};
  this.end_condition = function(){return false;};

  this.end = function()
  {
    if(this.finished == false)
    {
      console.log("ending quest: " + this.name);
      this.end_action();
      this.finished = true;
    }
  };

  this.check = function()
  {
    if(this.end_condition())
    {
      if(this.finished != true)
      {
        this.end();
      }
      return true;
    }else{
      return false;
    }
  };

}

