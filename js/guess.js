import { toastMessage } from './toast.js';

// Select elements
let guessForm = document.querySelector('.guessForm');
let guessNumber = guessForm.querySelector('#guessNumber');
let submitBtn = guessForm.querySelector('#submitBtn');
let winLost = document.querySelector('#winLost');
let remainingAttempt = document.querySelector('#remainingAttempt');
let winCount = document.querySelector('#winCount');
let LostCount = document.querySelector('#LostCount');
let tryAgain = document.querySelector('#tryAgain');
let tryAgainWrapper = document.querySelector('.try-again-wrapper');
let errorMessageShow = document.querySelector('.errorMessage');

// Initial state
let win = 0;
let lost = 0;
let totalAttempts = 5;
let attempts = 5;


// Submit Form 
guessForm.addEventListener('submit', function (event) {
    event.preventDefault();
    winLost.classList.add("mb-3");
    attempts--;

    if(attempts === 0) {
        guessNumber.disabled = true;
        submitBtn.disabled = true;
        tryAgainWrapper.classList.remove('d-none');
    }

    if(guessNumber.value === "") {
        errorMessageShow.innerHTML = "This field is required";
        submitBtn.disabled = false;
        return;
    } else {
        submitBtn.disabled = true;
    }

    let getGuessNumber = parseInt(guessNumber.value)
    let randomNum = randomNumber(); // Generate a random number

    submitBtn.innerHTML = "Checking..."
    
    if(getGuessNumber === randomNum) {
        winLost.innerHTML = "🎉 Congratulations! You Win!";
        win++;
        winCount.innerHTML = win;
    } else {
        winLost.innerHTML = `❌ Sorry! You Lost! Random Number was: ${randomNum}`;
        lost++;
        LostCount.innerHTML = lost;
    }
    remainingAttempt.innerHTML = attempts;
    
    toastMessage('success', 'Success', `You have submitted guess num: ${guessNumber.value}`, 'ph-fill ph-check-circle');
    
    setTimeout(() => {
        submitBtn.innerHTML = "Check Result"
    }, 300);
    guessNumber.value = "";

});
// Submit Form end

function randomNumber () {
    return Math.floor(Math.random() * totalAttempts + 1)
}

// Try Again Btn
tryAgain.addEventListener('click', function () {
    win = 0;
    lost = 0;
    attempts = 5;
    guessNumber.disabled = false;
    submitBtn.disabled = true;
    winLost.innerHTML = "";
    winCount.innerHTML = "0";
    LostCount.innerHTML = '0';
    remainingAttempt.innerHTML = "0";
    winLost.classList.remove("mb-3");
    guessNumber.value = "";
});
// Try Again Btn End


// Input value validation start 
function validateInput (event) {
    let inputValue = event.target.value.trim();

    if(guessNumber.value === "") {
        errorMessageShow.innerHTML = "This should not be empty.";
        submitBtn.disabled = true;
    } else if(inputValue < 0 || inputValue > 5 ) {
        errorMessageShow.innerHTML = "Invalid Input! Number should be between 1 and 5";
        submitBtn.disabled = true;
    } else {
        errorMessageShow.innerHTML = "";
        submitBtn.disabled = false;
    }
}


guessNumber.addEventListener("input", validateInput);
// Input value validation End 
