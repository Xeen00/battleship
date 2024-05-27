
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