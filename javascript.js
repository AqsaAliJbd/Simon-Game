// variable
let buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
// identify when keypress
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    // alert("start");
  }
});

//  function next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn()
    .fadeOut()
    .fadeIn();
  let audio = new Audio("./sounds/" + randomChosenColor + ".mp3");
  // console.log(audio);
  audio.play();
  playSound(randomChosenColor);
}
//  user click
$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userChosenColor);
  playSound(userChosenColor);
  animationPress(userChosenColor);
  // let colorsLength = buttonColors[colors.length - 1];
  // console.log(colorsLength);
  checkAnswer(userClickedPattern.length - 1);
});
// create new function called playsound that takes single input parameters
// user click sound
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// user click animation
function animationPress(currentColor) {
  var keyInUse = $("." + currentColor);
  keyInUse.addClass("pressed");
  setTimeout(function () {
    keyInUse.removeClass("pressed");
  }, 100);
}

//      At this point, it might be worth reviewing how the Simon game works.

// Firstly, the game shows the first colour in the sequence (blue). The user clicks on the blue button.

// Next, the game shows the next colour (red), the user has to remember the sequence is blue, red and so on and so forth.

// If the user messes up the sequence, then the game ends.

// You can either try to figure out how to achieve this logic by trying to write the code yourself or you can follow the challenge steps below:

// 1. Create a new function called checkAnswer(), it should take one input with the name currentLevel

// 2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.

// e.g. If the user has pressed red, green, red, yellow, the index of the last answer is 3.

// 3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".

// You can now use these log statements along with logging the values of userClickedPattern and gamePattern in the Chrome Developer Tools console to check whether if your code is performing as you would expect and debug your code as needed. Once you're done, feel free to remove these log statements.

// 4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.

// 5. Call nextSequence() after a 1000 millisecond delay.

// 6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
// checkanswer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("sucess");
    if (
      userClickedPattern.length[currentLevel] ===
      gamePattern.length[currentLevel]
    ) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over,Press Any Key to Restart");
    startOver();
  }
}

// game over
// 1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.

// 2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.

// All going well, you should end up with a flash effect.
// 3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
// 1. Create a new function called startOver().

// 2. Call startOver() if the user gets the sequence wrong.

// 3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
