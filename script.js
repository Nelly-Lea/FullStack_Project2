const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");

const playAgainBtn = document.getElementById('play-button'); //btn to play again 
const playAgainBtn1 = document.getElementById('play-button2'); //btm to pass to the next level
const popup = document.getElementById('popup-container');// div pr final msg 
const finalMessage = document.getElementById('final-message');// titre h2 final msg 
const popup2 = document.getElementById('popup-container2');// div pr final msg 
const finalMessage2 = document.getElementById('final-message2');// titre h2 final msg 
var current_user=JSON.parse(localStorage.getItem('current_user'));
var name=current_user.firstname;

const username_div= document.getElementById('hello_user');
username_div.innerHTML="Hello "+name;

var record={
    game_id:1, // id=1 =>memorie game 
    date:"",
    win:"",
}


function Record(game_id, date,win){
    this.game_id=game_id;
    this.date=date;
    this.win=win;
}
let maxTime = 50;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0; //the number of matched cards
let disableDeck = false; //to prevent the user from clicking on the other cards until the first two cards unflip
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if(timeLeft <= 0) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        playAgainBtn.innerHTML="Play Again"
        popup.style.display = 'flex';
        var new_record=new Record(1,new Date(),"lost");

        current_user.records.push(new_record)
        var username=current_user.email;
        localStorage.removeItem(username);
        localStorage.setItem(username, JSON.stringify (current_user));
        localStorage.removeItem('current_user');
        localStorage.setItem('current_user', JSON.stringify(current_user));
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}


function flipCard({target: clickedCard}) { //clickedCard = e.target - getting user clicked card
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip"); //adding flip class to clicked card
        if(!cardOne) { //the first card clicked, assigned to cardOne
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src, //getting image src property
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) { //checks if the two images have the same src property
        matchedCard++;
        if(matchedCard == 6 && timeLeft > 0) {
            finalMessage2.innerText = 'Congratulations! You won! 😃';
            popup2.style.display= 'flex';
            playAgainBtn1.innerHTML="Pass to next level"

            var new_record1=new Record(1,new Date(),"win");
            current_user.records.push(new_record1)
            var username=current_user.email;
            current_user.all_points_memorie++;
            localStorage.removeItem(username);
            localStorage.setItem(username, JSON.stringify (current_user));
            localStorage.removeItem('current_user');
            localStorage.setItem('current_user', JSON.stringify(current_user));
            return clearInterval(timer);
            
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    //if two cards don't match
    setTimeout(() => {
        //adding shake class to both cards after 400ms
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        //removing flip and shake class after 1.2 seconds
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; //setting both cards value to blank
        disableDeck = false;
    }, 1200);
}

//shuffleCard function will call two times:
//1. when the user matched all cards
//2. when the user refresh the webpage
function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer); //cancels a timed, repeating action which was previously established by a call to setInterval()
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;
    
    //creating an array of 12 items and each item is repeated twice
    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); //sorting array items randomly

    //removing flip class from all cards and passing random image to each card
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images2/img-${arr[index]}.jpg`;
        }, 500);
        card.addEventListener("click", flipCard);
    });

    popup.style.display = 'none'; //disparaitre notification box
}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

//adding click event to all cards
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});


//Restart game and play again
playAgainBtn.addEventListener('click', shuffleCard);  // to play again same level
playAgainBtn1.addEventListener('click',() => {
    window.location="./memorie_level2.html"
}); // to pass to next level