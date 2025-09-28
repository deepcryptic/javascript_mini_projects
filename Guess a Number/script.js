// Generate random number between 1 and 100
let randomNumber = parseInt(Math.random() * 100 + 1);

// DOM Elements
const userInput = document.querySelector('#subt'); // input field
const submitButton = document.querySelector('.guessSubmit'); // submit button
const GuessSlot = document.querySelector('.guesses'); // previous guesses display
const remaining = document.querySelector('.lastResult10'); // guesses remaining
const lowOrHi = document.querySelector('.lowOrHi'); // feedback message
const startOver = document.querySelector('.resultParas'); // container to append new game button

// Create new game button element
const p = document.createElement('p');

// Game state variables
let prevGuess = [];
let numGuess = 0;
let playGame = true;

// Event listener for submit button
submitButton.addEventListener('click', function(e){
    e.preventDefault();
    if(!playGame) return;

    const guess = parseInt(userInput.value);
    validateGuess(guess);
});

// Validate user input
function validateGuess(guess){
    if(isNaN(guess) || guess < 1 || guess > 100){
        alert('Please enter a valid number between 1 and 100');
    } else {
        prevGuess.push(guess);
        numGuess++;
        displayGuess(guess);
        checkGuess(guess);

        if(numGuess === 10 && guess !== randomNumber){
            displayMessage(`Game Over. The number was ${randomNumber}`);
            endGame();
        }
    }
}

// Check user's guess
function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`🎉 You guessed it right!`);
        endGame();
    } else if(guess < randomNumber){
        displayMessage(`⬆️ Number is Too Low`);
    } else if(guess > randomNumber){
        displayMessage(`⬇️ Number is Too High`);
    }
}

// Display previous guesses and remaining attempts
function displayGuess(guess){
    userInput.value = '';
    GuessSlot.innerHTML += `${guess} `;
    remaining.innerHTML = `${10 - numGuess}`;
}

// Display feedback message
function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

// End game and show "Start New Game" button
function endGame(){
    userInput.setAttribute('disabled','');
    submitButton.setAttribute('disabled','');

    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    p.style.cursor = "pointer";
    p.style.color = "#4a47a3";
    startOver.appendChild(p);

    playGame = false;

    // Add event listener for new game
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(){
        // Reset all variables
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 0;
        GuessSlot.innerHTML = '';
        remaining.innerHTML = `10`;
        lowOrHi.innerHTML = '';
        userInput.removeAttribute('disabled');
        submitButton.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    });
}
