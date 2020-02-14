// get values of selecting levels from localStorage -->Amira Reda
var level1 = localStorage.getItem('level1');
var level2 = localStorage.getItem('level2');
var userName = localStorage.getItem('name');
var lastScore = -1;
var bumbs = "";
var score = 0;
// displaying previous score  -->Amira Reda
// array of previous users  
users = JSON.parse(localStorage.getItem("users") || "[]");
// last score
users.find(function (user) {
    if (user.userName == userName) {
        lastScore = user.score;
    }
});
if (lastScore != -1) {
    $("#prevScore").text(lastScore);
}
$("#userName>span").text(userName);

// Ahmed Hazem 
$(function () {
    // welcome msg With player name
    var popup = document.getElementsByClassName('mypopup');
    var h1 = document.getElementsByClassName('nameplayer');
    var text = document.createTextNode(userName);
    $(h1).append(text);
    // start Game after start button click 
    $('.start').on('click', function () {
        $(popup).hide(1000);
        duckSound = new Audio('sounds/kill.mp3');
        // slow speed
        if (level1 === 'true') {
            window.setTimeout(function () {
                birds = window.setInterval(() => { new createBird() }, 4000);
            }, 3000);
            // fast speed
        } else if (level2 === 'true') {
            window.setTimeout(function () {
                birds = window.setInterval(() => { new createBird() }, 2500);
            }, 3000);

        }
    //background sound -> Ahmed Hazem
    back = new Audio('sounds/background.mp3');
    back.play();
    back.loop = true;
    });


});

// birds and moving it ->Ahmed Hazem
class createBird {



    constructor() {

        //this class creating birds with its css design to could display and move over screeen with rando
        // random collection of fllooor number using math,random function 
        //also aray of differ three source images 
        //the calling function movingshapes and pass bird omage  to the function to start animate
        //in animation caal back deliver to next ..e.tc to another animate in finall aanimate after time duration
        // the bird go quickly to out then remove it ()  tto improve effeciency and savving memory  
        var src = ['source.gif', 'giphy.gif', 'bird.gif'];

        var birdImg1 = document.createElement('img');
        this.bb = birdImg1;
        birdImg1.style.width = '100px';
        birdImg1.style.height = '100px';
        birdImg1.src = 'images/' + src[Math.floor(Math.random() * 3)];
        birdImg1.className = 'bird';
        birdImg1.style.position = 'absolute';
        birdImg1.style.overflow = 'none';
        birdImg1.style.top = '600px';
        birdImg1.style.zIndex = '9999';
        $(birdImg1).on("click", killBird);
        $('body').append(birdImg1);

        duckSound.play();
        this.movingShapes(birdImg1);
    }
    // moving bird --> Ahmed Hazem
    movingShapes(bird) {
        var randomX = Math.floor(Math.random() * 1000);
        let birdImg = bird;
        birdImg.style.left = randomX + 'px';
        var newX = randomX + 250;
        $(birdImg).animate({
            left: newX + 'px',
            top: '300px'
        }, 3000, () => {
            $(birdImg).animate({
                left: newX - 250 + 'px',
                top: '-20px'
            }, 3000, () => {
                $(birdImg).animate({
                    left: newX + 'px',
                    top: '150px'
                }, 3000, () => {
                    $(birdImg).animate({
                        left: newX - 4500 + 'px',
                        top: '-=280px'
                    }, 8000, () => { $(birdImg).remove(); });
                });
            });

        });

    }

}
// timer --> Amira Reda
$(".start").on("click", function () {
    seconds = 59, minutes = 4, every3scd = 0;
    var minutesInterval = setInterval(function () {
        if (seconds == 0) {
            minutes--;
            seconds = 60;
            if (minutes == -1) {
                clearInterval(minutesInterval);
                setTimeout(endGame(), 1000);
                $(".bird").off();  //unbind all events for birds in End Game
                $(".bumbDiv").off(); //unbind all events for bumbs in End Game

            }
        }
        else {
            seconds--;
        }
        every3scd++;
        if (every3scd == 3) {
            changBar();    // every 3 seconds progress bar will decreased by 1% from its width
            every3scd = 0;
        }

    }, 1000);
    //  display what current level user selected -->Amira Reda
    var levelName;
    if (level1 == "true") {
        levelName = "Level 1";
    }
    if (level2 == "true") {
        levelName = "Level 2";
        window.setTimeout(function () {
            bumbs = window.setInterval(createBumb, 9000);
        }, 6000);
    }
    $("#level").text(levelName);

});


// bumb creation --> mohammed Abdallah
function createBumb() {
    var div = document.createElement('div');
    var randomX = Math.floor(Math.random() * 80);   //-- boundaries  --
    div.style.left = randomX + '%'; // appears from different places 
    div.style.width = '400px';
    div.style.height = '400px';
    div.className = 'bumbDiv';
    div.style.background = 'transparent';
    div.style.position = 'absolute';
    div.style.zIndex = '55';
    div.style.textAlign = 'center';
    div.style.top = '-80%';
    div.style.borderRadius = '50%';
    var bumbImg = document.createElement('img'); //bomb img
    bumbImg.style.width = '130px';
    bumbImg.style.height = '130px';
    bumbImg.style.top = '30%';
    bumbImg.style.left = '30%';
    bumbImg.src = 'images/iconfinder_bomb_1608582.png';
    bumbImg.style.position = 'absolute';
    bumbImg.style.overflow = 'none';
    bumbImg.style.zIndex = '56';
    $('body').after(div);
    $(div).append(bumbImg);
    var gunShotAudio = new Audio('sounds/sound.mp3'); //bomb sound
    $(div).on('click', 'img', function (event) {     //register action to bomb when clicked on
        gunShotAudio.play();
        document.querySelectorAll(".bird").forEach((imgBumb) => {
            topDiv = $(div).position().top;
            leftDiv = $(div).position().left;
            topImg = $(imgBumb).position().top;
            leftImg = $(imgBumb).position().left;
            //selecting surrounding birds to kill it  
            if (topDiv < topImg && topImg < (topDiv + 390) && leftImg > leftDiv && leftImg < (leftDiv + 390)) {
                imgBumb.click();
            }

        });
        //removing the bomb after clicking on it.
        $(div).remove();
    });
    // moving bumb div after creating it 
    movingBumb(div);
}
// animating bumb --> Mohammed Abdallah
function movingBumb(bumb) {
    div = bumb;
    div.className = 'bumb';
    $(div).animate({
        top: '353px'
    }, 5000);
    setTimeout(() => {
        $(div).remove();
    }, 6000);

}
// changing score on screen-->amira
function changeScore(value) {
    score += value;
    $("#ScoreNum").text(score);

}
// gameOver --> Ahmed Hazem
function gameOver() {
    $("#losemodal").modal("show");
}
// winCase --> Ahmed Hazem

function youWin() {
    $("#winmodal").modal("show")
}
// ending Game after timeout -> amira reda
function endGame() {
    score = parseInt($("#ScoreNum").text());
    clearInterval(birds);
    clearInterval(bumbs);
    if (score >= 150) {
        youWin();

    }
    else {
        gameOver();
    }
    // adding user with score to localStorge for next time -->Amira Reda
    if (lastScore == -1) {  //new user 
        users.push({ "userName": userName, "score": score }); //new object
    }
    else {    //previous user
        users.find(function (user) {
            if (user.userName == userName) {

                user.score = score;   //editing score for the user

            }
        });
    }
    localStorage.setItem('users', JSON.stringify(users)); //restoring the array of objects in localStorage



}
//timer bar  --> Amira Reda 
// every minute timer bar decreased by 20%
function changBar() {
    oldValue = parseInt($(".progress-bar").attr("aria-valuenow"));
    newValue = oldValue - 1;
    if (newValue >= 0) {
        $(".progress-bar").attr("aria-valuenow", newValue + "");
        oldWidth = parseInt(document.getElementsByClassName("progress-bar")[0].style.width);
        $(".progress-bar").css("width", oldWidth - 1 + "%").text(newValue + "%");

    }


}
// bird.onclick --> Amira Reda
function killBird(eh) {
    $(this).stop(true, true);
    var gunShotAudio = new Audio('sounds/sound.mp3');
    $(this).off();
    gunShotAudio.play();
    // checkType
    checkType(eh.target.src);
    // change bird image onKilling it
    if (eh.target.src.endsWith("bird.gif")) {
        $(this).attr('src', 'images/sad-bird.png');
    }
    else if (eh.target.src.endsWith("source.gif")) {
        $(this).attr('src', 'images/redFalled.png');
    }
    else {
        $(this).attr('src', 'images/fallen.png');
    }
    // bird go to bottom on killing
    $(this).animate({
        top: window.innerHeight - 85,
    }, 4000);
    // hiding bird after killing
    $(this).animate({
        opacity: 0,
    }, 3000);
    // removing the bird object after dead
    setTimeout(() => {
        $(this).remove();
    }, 9000);

}





// Ahmed Hazem
// checktype by imgSrc and determine the value that must be added to score
function checkType(source) {
    valueAdded = 0;
    if (source.endsWith("source.gif")) {
        valueAdded = 10;  //normal bird
    }
    else if (source.endsWith("giphy.gif")) {
        valueAdded = 5;    //red bird
    }
    else if (source.endsWith("bird.gif")) {
        valueAdded = -10;   //black bird
    }
    changeScore(valueAdded); //go to changescore 
}
// Thank u
