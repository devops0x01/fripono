

function Quest()
{
  this.name = "";
  this.checkpoints = [];
  this.start = function(){console.log("starting quest: " + name);};
  this.end = function(){console.log("ending quest: " + name);};
}

