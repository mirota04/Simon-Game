var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

main();

function main(){
    playerSequence();
    $("body").keydown(function(){
        if(!started){
            nextSequence();
            started = true;
        }
    });
}

function playerSequence(){
    $(".btn").click(function() {
        var userChoice = $(this).attr("id");
        userPattern.push(userChoice);
        playSound(userChoice);
        animatePress(userChoice);
        checkAnswer(userPattern.length - 1);
    }); 
}

function nextSequence(){
    userPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var chosenColor = buttonColors[randomNumber];
    gamePattern.push(chosenColor);
    level += 1;
    
    $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(chosenColor);

    $("#level-title").html("level " + level);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    var activeKey = $("." + currentColor);
    activeKey.addClass("pressed");
    setTimeout(function(){
        activeKey.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        console.log("success");
        if(userPattern.length === gamePattern.length){
            setTimeout(nextSequence, 1000);
        }
    }else{
        var gameOver = $("body");
        var gameOverHeadline = $("#level-title");
        var wrongAudio = new Audio("sounds/wrong.mp3");

        wrongAudio.play();
        gameOverHeadline.html("Game Over, Press Any Key to Restart");
        gameOver.addClass("game-over");
        setTimeout(() => { // First use of arrow function
            gameOver.removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}