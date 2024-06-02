class field {
    constructor(element, x, y, ship, hit) {
        this.element = element;
        this.x = x;
        this.y = y;
        this.ship = null;
        this.hit = hit;
    }
}

const ownFleetOfShips = document.getElementsByClassName("ship");
const enemyFleetOfShips = ["ship1", "ship2", "ship3"];
const attackFields = [];
const defenseFields = [];
const defenseBoard = document.getElementById("defense-board");
const attackBoard = document.getElementById("attack-board");

initializeDefenseBoard();
initializeAttackBoard();
initializeShips()


function initializeDefenseBoard(){
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            defenseFields.push(new field(document.createElement("div"), i, j, null, false));
        }
    }

    for(let field of defenseFields) {
        field.element.classList.add("field");
        defenseBoard.appendChild(field.element);
    }
}

function initializeAttackBoard(){
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            attackFields.push(new field(document.createElement("div"), i, j, null, false));
        }
    }

    for(let field of attackFields) {
        field.element.classList.add("field");
        attackBoard.appendChild(field.element);
    }

    for (let i = 0; i < enemyFleetOfShips.length; i++) {
        let x = getRandomInt(10);
        let y = getRandomInt(10);
        while (attackFields[x * 10 + y].ship != null) {
            x = getRandomInt(10);
            y = getRandomInt(10);
        }
        attackFields[x * 10 + y].ship = enemyFleetOfShips[i];
    }

}
function initializeShips(){
    for (let ship of ownFleetOfShips) {
        ship.addEventListener("dragstart", function (event){
            let selectedShip = event.target;

            for (let field of defenseFields) {
                field.element.addEventListener("dragover", function (event){
                    event.preventDefault();
                })

                field.element.addEventListener("drop", function (event){
                    if (field.ship == null) {
                        removeShip(selectedShip);
                        field.element.appendChild(selectedShip);
                        field.ship = selectedShip;
                    }
                    selectedShip = null;
                })
            }
        })
    }
}

function removeShip(ship){
    let i = 0;
    while (i < defenseFields.length && defenseFields[i].ship != ship) {
        i++;
    }
    if (i < defenseFields.length){
        defenseFields[i].ship = null;
    }
}


function startGame(){
    for (let field of attackFields) {
        console.log("attack", field.ship);
    }
    for (let field of defenseFields) {
        console.log("defense", field.ship);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
