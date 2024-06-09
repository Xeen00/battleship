"use strict";

console.log("script loaded");

let field = document.getElementsByClassName("field");
let currentPlayer = 1;

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded");
    setupGame();
    gameLoop();
});

function setupGame() {
    for (let f of field){
        f.addEventListener("click", function(){
            console.log("clicked");
            f.style.backgroundColor = "red";
        });
    }
    console.log("Game setup complete.");
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    console.log("current player", currentPlayer);
}

function gameLoop() {

}

