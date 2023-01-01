"use strict";

const boardContainerEl = document.getElementById("boardContainer");
const gameBoardEl = document.getElementById("gameBoard");
const scoreBoardEl = document.getElementById("scoreBoard");
const scoreWordEl = document.getElementById("scoreWord");
const totalScoreEl = document.getElementById("totalScore");
const correctScoreEl = document.getElementById("correctScore");
const wrongScoreEl = document.getElementById("wrongScore");

const GAME_STATE = {
    boardInterval: null,
    currentPos: -520,
    wordIndex: 0,
    totalScore: 1,
    correctScore: 0,
    wrongScore: 0,
    wordMatch: 0,
    isBoardUp: false,
};

function moveBoardUp() {
    if (GAME_STATE.currentPos >= 0) {
        clearInterval(GAME_STATE.boardInterval);
        setTimeout(hideBoard, 5000);
        GAME_STATE.isBoardUp = true;

        return true;
    }

    GAME_STATE.currentPos = GAME_STATE.currentPos + 3;
    boardContainerEl.style.bottom = `${GAME_STATE.currentPos}px`;

    return true;
}

function moveBoardDown() {
    if (GAME_STATE.currentPos <= -520) {
        clearInterval(GAME_STATE.boardInterval);
        pasteWord(randomString());
        setTimeout(showBoard, 2000);

        return true;
    }

    GAME_STATE.currentPos = GAME_STATE.currentPos - 3;
    boardContainerEl.style.bottom = `${GAME_STATE.currentPos}px`;

    return true;
}

function showBoard() {
    GAME_STATE.boardInterval = setInterval(moveBoardUp, 2);
}

function hideBoard() {
    GAME_STATE.boardInterval = setInterval(moveBoardDown, 2);
    GAME_STATE.isBoardUp = false;
}

showBoard();

function randomString(size = 5) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomWord = "";

    for (let i = 0; i < size; i++) {
        const position = Math.floor(Math.random() * alphabet.length);
        randomWord += alphabet.charAt(position);
    }
    return randomWord;
}

function pasteWord(word) {
    GAME_STATE.wordIndex = 0;
    gameBoardEl.innerHTML = "";
    totalScoreEl.innerHTML = GAME_STATE.totalScore++;

    for (let index = 0; index < word.length; index++) {
        const spanEl = document.createElement("span");

        spanEl.innerHTML = word.charAt(index);
        gameBoardEl.appendChild(spanEl);
    }
}

function keypressEventCb(event) {
    if (GAME_STATE.wordIndex >= 5 || GAME_STATE.isBoardUp === false) {
        return false;
    }

    const letter = String.fromCharCode(event.which);
    const spanEl = gameBoardEl.children[GAME_STATE.wordIndex];

    if (letter.toUpperCase() === spanEl.innerHTML.trim()) {
        spanEl.classList.add("green-text");
    } else {
        spanEl.classList.add("red-text");
        GAME_STATE.wordIndex = 20;
        GAME_STATE.wrongScore++;
        wrongScoreEl.innerHTML = GAME_STATE.wrongScore;
    }

    if (GAME_STATE.wordIndex === 4) {
        GAME_STATE.correctScore++;
        correctScoreEl.innerHTML = GAME_STATE.correctScore;
    }

    GAME_STATE.wordIndex++;
}

document.body.addEventListener("keydown", keypressEventCb);
