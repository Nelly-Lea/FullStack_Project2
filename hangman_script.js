const wordE1 = document.getElementById('word'); // le bon mot
const wrongLettersE1 = document.getElementById('wrong-letters'); // div avec mauvaises lettres
const playAgainBtn = document.getElementById('play-button'); //ntm pr rejouer 
const popup = document.getElementById('popup-container');// div pr final msg 
const notification = document.getElementById('notification-container'); // div notification si lettre deja rentree
const finalMessage = document.getElementById('final-message');// titre h2 final msg 

const figureParts= document.querySelectorAll(".figure-part");// partie du hangman a afficher 

const words = ['maccabees', 'dreidel', 'miracle', 'doughnuts']; //les mots au choix 

let selectedWord = words[Math.floor(Math.random() * words.length)];

var current_user=JSON.parse(localStorage.getItem('current_user'));
var record={
    game_id:2, // id=2 =>hangman game 
    date:"",
    win:"",
}

var name=current_user.firstname;

const username_div= document.getElementById('hello_user');
username_div.innerHTML="Hello "+name;

const correctLetters = [];
const wrongLetters = [];

//Show hidden word
function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord
    .split('')
    .map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''} 
        </span>
        `
    )
    .join('')} 
    `; 
     // pr chaque lettre ds le not selectionee si g trouve la lettre je la met sinon je met espace vide


    const innerWord = wordE1.innerText.replace(/\n/g, ''); //enleve les espaces

    if(innerWord === selectedWord){ // si le mot trouve= au mot a chercher perdu
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popup.style.display= 'flex';
        record.date=new Date();
        record.win="win";
        current_user.records.push(record)
        var username=current_user.email;
        current_user.all_points++;
        localStorage.removeItem(username);
        localStorage.setItem(username, JSON.stringify (current_user));
        localStorage.removeItem('current_user');
        localStorage.setItem('current_user', JSON.stringify(current_user));
    }
}

// Update the wrong letters
function updateWrongLetterE1(){ //si il ya au moins une erreur on affiche wrong+lettre
    //Display wrong letters     //affiche la lettre ds un span 
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}  
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //Display parts
    figureParts.forEach((part,index) => { //on passe sur chaque element a afficher du hangman pr mettre display ou pas  
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block'
        }
        else{
            part.style.display = 'none';
        }
    });

    //Check if lost
    if(wrongLetters.length === figureParts.length){// si le nombre de mauvaise lettre= au nombre de parties a afficher =>perdu  
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        popup.style.display = 'flex';
        record.date=new Date();
        record.win="lost";
        current_user.records.push(record)
        var username=current_user.email;
        localStorage.removeItem(username);
        localStorage.setItem(username, JSON.stringify (current_user));
        localStorage.removeItem('current_user');
        localStorage.setItem('current_user', JSON.stringify(current_user));
    
    }
}

//Show notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//Keydown letter press //1 ere fonction appelee
window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;   // la lettre tapee

        if(selectedWord.includes(letter)){  //si le mot inclu la lettre, au debut correctLetter vide
            if(!correctLetters.includes(letter)){ //si la lettre pas ds le array alors rajoute ds le array
                correctLetters.push(letter);

                displayWord(); // montre le mot
            } else{
                showNotification(); // on dit qu'on la deja mise parce que deja ds le array 
            }
        } else{
            if(!wrongLetters.includes(letter)){// si le array des mauvaise lettres n'incluent pas cette lettre alors rajoute la
                wrongLetters.push(letter);

                updateWrongLetterE1();  //affiche mauvaises lettre et hangman part
            } else{
                showNotification(); //sinon dire qu'on la deja utilise
            }
        }
    }
});

//Restart game and play again
playAgainBtn.addEventListener('click', () => {
    //Empty arrays
    correctLetters.splice(0); //on remet les arrays a 0 remove element from index 0
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];//on choisit un autre mot

    displayWord(); //on affiche mot vide

    updateWrongLetterE1(); //on affiche aucune mauvaises lettres

    popup.style.display = 'none'; // cacher msg final
    
    current_user=JSON.parse(localStorage.getItem('current_user'));
});

displayWord();
