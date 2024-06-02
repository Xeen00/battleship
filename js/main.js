class field {
    constructor(element, x, y, ship, hit) {
        this.element = element;
        this.x = x;
        this.y = y;
        this.ship = null;
        this.hit = hit;
    }
}

const ships = document.getElementsByClassName("ship");
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
}
function initializeShips(){
    for (let ship of ships) {
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
                        console.log(field)
                    }
                    selectedShip = null;
                })
            }
        })
    }
}

function removeShip(ship){
    let i = 0;
    while (defenseFields[i].ship != ship) {
        i++;
    }
    if (i < defenseFields.length){
        defenseFields[i].ship = null;
    }
}


function startGame(){
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            console.log(defenseFields[i * 10 + j]);
        }
    }
}
