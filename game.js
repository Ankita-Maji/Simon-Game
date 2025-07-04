var buttoncol = ["red", "blue", "yellow", "green"]; // step 2
var gamePattern = [];
var userClickedPattern = [];

var randomNum, randomChosenColor;
var level = 0; 
var started = false; // to keep track of game has started or not

$(document).keypress(function (event) {
if (!started) {
    
        nextSeq();
        started = true;

    }
})

$('div[type ="button"').on("click", function () {
    userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    var rec_col = userClickedPattern.length - 1;
    
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(rec_col);
    
})

function nextSeq() {    //step 1
    userClickedPattern = [];
    randomNum = Math.floor(Math.random() * 4);
    randomChosenColor = buttoncol[randomNum]; // step 3

    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    // console.log(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    level++;
    document.querySelector("h1").innerText = "Level " + level;
    



}

function playSound(name) {

    var a = new Audio("sounds\\" + name + ".mp3");
    a.play();
}


function animatePress(currentColor) {
   

        $('#' + currentColor).addClass("pressed");
        setTimeout(function () {
            $('#' + currentColor).removeClass('pressed');
        }, 100);
    
}

function checkAnswer(currentLevel){

    
        if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            console.log("Success");
            if(currentLevel === gamePattern.length-1){
                console.log(userClickedPattern);
                setTimeout(function(){nextSeq() }, 1000);
                
            }
        }
        else{
            console.log("Wrong");
            
            playSound("wrong")

            $('body').addClass("game-over");
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);


        $('h1').text("Game Over, Press Any Key to Restart")

        // RESTART THE GAME
        startOver();

        }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


