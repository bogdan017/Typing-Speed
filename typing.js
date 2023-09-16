const words = ["feather", "referral", "benefit", "push", "diplomat", 
                "distant", "root", "commission", "college", "raise", 
                "spin", "duty", "thrust", "similar", "disorder", "grow",
            ];

const currentTime = document.querySelector(".inp-time");
const currentWPM = document.querySelector(".inp-wpm");
const currentCPM = document.querySelector(".inp-cpm");
const currentAcc = document.querySelector(".inp-acc");
const currentErr = document.querySelector(".inp-error");
const currentText = document.querySelector(".input-text");
const currentWord = document.querySelector(".words");
const restart = document.querySelector(".restart");

let gameTime = 60;
let timer = null; 
let wordText = "";
let wordNum = 0;
let errors = 0;
let totalErr = 0;
let typedChars = 0;
let elapsedTime = 0;
let gameOver = false;

function getWord() {
    currentWord.textContent = null;
    wordText = words[wordNum];
    for (let i = 0; i < wordText.length; ++i) {
        let char = wordText[i];
        const charSpan = document.createElement('span');
        charSpan.innerHTML = char;
        currentWord.appendChild(charSpan);
    }
    if (wordNum < words.length - 1) {
        ++wordNum;
    } else {
        wordNum = 0;
    }
}

function processWord() {

    currTextInput = currentText.value;
    currTextInputArr = currTextInput.split('');

    ++typedChars;
    errors = 0;

    spanArray = currentWord.querySelectorAll('span');
    for (let i = 0; i < spanArray.length; ++i) {
        let char = spanArray[i];
        let currChar = currTextInputArr[i];

        if (currChar == null) {
            char.classList.remove("green");
            char.classList.remove("red");
        } else if (currChar == char.innerHTML) {
            char.classList.add("green");
            char.classList.remove("red");
        } else {
            char.classList.remove("green");
            char.classList.add("red");
            ++errors;
        }
    }

    currentErr.textContent = totalErr + errors;
    let correctChars = (typedChars - (totalErr + errors));
    let acc = (correctChars/typedChars) * 100;
    currentAcc.textContent = Math.floor(acc);
    cpm = Math.floor((typedChars/elapsedTime) * 60);
    wpm = Math.floor(((typedChars / 5) / elapsedTime) * 60);
    currentCPM.textContent = cpm;
    currentWPM.textContent = wpm;
    
    if (currTextInputArr.length == spanArray.length) {
        getWord();
        totalErr += errors;
        currentText.value = "";
    }
}

function time() {
    if (gameTime > 0) {
        --gameTime;
        ++elapsedTime;
        currentTime.textContent = gameTime + "s";
    } else {
        finishGame();
    }
}

function finishGame() {
    clearInterval(timer);
    currentText.disabled = true;
    currentWord.textContent = "Click RESTART to reset the game";
    restart.style.display = "block";
}

function game() { 
    if (!gameOver) {
        restartGame();
        getWord();
        clearInterval(timer);
        timer = setInterval(time, 1000);
        gameOver = true;
    }
}


function restartGame() {
    gameTime = 60;
    wordText = "";
    wordNum = 0;
    errors = 0;
    totalErr = 0;
    typedChars = 0;
    elapsedTime = 0;
    gameOver = false;

    currentText.disabled = false;
    currentText.value = "";
    
    currentWord.textContent = "Click below to start the game";
    currentAcc.textContent = 100;
    currentCPM.textContent = 0;
    currentWPM.textContent = 0;
    currentErr.textContent = 0;
    currentTime.textContent = gameTime + "s";
    restart.style.display = "none";
}
