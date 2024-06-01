const ships = document.getElementsByClassName("ship");
const shipdest = document.getElementById("shipdest");
const shipbase = document.getElementById("shipbase");

for (let ship of ships) {
    ship.addEventListener("dragstart", function (event){
        let selectedShip = event.target;

        shipdest.addEventListener("dragover", function (event){
            event.preventDefault();
        })

        shipdest.addEventListener("drop", function (event){
            shipdest.appendChild(selectedShip);
            selectedShip = null;
        })

        shipbase.addEventListener("dragover", function (event){
            event.preventDefault();
        })

        shipbase.addEventListener("drop", function (event){
            shipbase.appendChild(selectedShip);
            selectedShip = null;
        })
    })
}



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