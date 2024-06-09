"use strict";

console.log("script loaded");

let fields = [];
let board = document.getElementById("board");
let currentPlayer = 1;

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded");
    setupGame();
    gameLoop();
});

function setupGame() {
    for (let i = 0; i < 9; i++) {
        let field = document.createElement("div");
        field.classList.add("field");
        field.dataset.index = i;
        field.onclick = () => handleCellClick(i);
        board.appendChild(field);
    }
    console.log("Game setup complete");
}

function handleCellClick(index) {
    console.log("cell clicked", index);
    if (fields[index] == 2) {

    }else {
        switchPlayer();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    console.log("current player", currentPlayer);
}

function gameLoop() {

}

