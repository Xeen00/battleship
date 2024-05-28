const ship = document.getElementById("ship");
const dropzone = document.getElementById("dropzone");

ship.addEventListener("dragstart", function (event){
    console.log(event);
})

dropzone.addEventListener("dragover", function (event){
    event.preventDefault();
})

dropzone.addEventListener("drop", function (event){
    dropzone.appendChild(ship);
})

document.addEventListener('DOMContentLoaded', () => {
    inizializeAttackBoard();
});

const inizializeAttackBoard = () => {
const attackBoard = document.getElementById("attack-board");
    for (let i = 0; i < 10; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        attackBoard.appendChild(tile);
    }
}

const inizializeDefenseBoard = () => {
    console.log("hello world!");
}