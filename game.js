alert("Rules:- The rules of this game are very easy. You just have to follow the color pattern that means in Level-1 if it says red you have to cick red, then in Level-2 if it is blue you have to click red and then blue. Similarly in Level 3 if it says yellow, you have to click red, blue and then yellow. So just follow the color pattern. Best Of Luck.");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function() {
    if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
   }

});


$(".btn").on("click", function() {

  var userChosenColour = $(this).attr("id"); //this.id
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var lastIndex= userClickedPattern.length;
  checkAnswer(lastIndex-1);
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(150).fadeOut(100).fadeIn(150);
  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
          nextSequence();
      }, 1000);
    }

  }

  else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200 );
    $("#level-title").text("Game Over, Press Any Key to Restart!!");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern= [];
  started= false;
}
