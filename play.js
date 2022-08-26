buttonColor = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];

var currentscore=0;
var bestscore=0;
var level=0;
var started=false;

$(document).keypress(function(){
  if(!started){


    nextSequence();
    started = true;
  }
});


$(".btn").on("click", function() {
  userChosenColor = $(this).attr("id")
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);

  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

})


function checkAnswer(currentLevel){
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){ console.log("success");
if(userClickedPattern.length  === gamePattern.length ){

  setTimeout(function(){nextSequence()},1000);
}
}else{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");},200);
  $("#level-title").text("Game Over, Press Any Key to Restart");

  startOver();

}
}



function nextSequence() {
  userClickedPattern = [];
  currentscore=level;
  $(".currentscore").text(currentscore);
  $("#level-title").text("Level "+level);
  var randomNumaber = Math.floor(Math.random() * 4);
  var randomChoosenColor = buttonColor[randomNumaber];
  gamePattern.push(randomChoosenColor);

  $("#" + randomChoosenColor).fadeIn(50).fadeOut(50).fadeIn(50);


  playSound(randomChoosenColor);
  level++;
}

function playSound(name) {
  var x = new Audio("sounds/" + name + ".mp3");
  x.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver()
{ if(bestscore < currentscore){bestscore=currentscore; }
  $(".bestscore").text(bestscore);
  started=false;
  level=0;
  gamePattern=[];
  currentscore=0;
}
