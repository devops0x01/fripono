

function Quest()
{
  this.name = "";
  this.finished = false;
  this.checkpoints = [];
  this.start = function(){console.log("starting quest: " + name);};
  this.end = function()
  {
    if(this.finished == false)
    {
      console.log("ending quest: " + name);
      this.finished = true;
    }
  };
}

