class field {
    constructor(x, y, ship, hit) {
        this.x = x;
        this.y = y;
        this.ship = ship;
        this.hit = hit;
    }
}

const ships = document.getElementsByClassName("ship");
const fields = document.getElementsByClassName("field");
const board = document.getElementById("board-container");

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        board.appendChild(document.createElement("div")).classList.add("field");
    }
}

for (let ship of ships) {
    ship.addEventListener("dragstart", function (event){
        let selectedShip = event.target;

        for (let base of bases) {
            base.addEventListener("dragover", function (event){
                event.preventDefault();
            })

            base.addEventListener("drop", function (event){
                base.appendChild(selectedShip);
                selectedShip = null;
            })
        }
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