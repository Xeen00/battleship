class field {
    constructor(element, x, y, ship, hit) {
        this.element = element;
        this.x = x;
        this.y = y;
        this.ship = null;
        this.hit = false;
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
        field.element.addEventListener("mousedown", function (event) {
            event.preventDefault();
            if (!field.hit) {
                field.hit = true;
                if (field.ship != null) {
                    console.log("hit");
                    field.element.style.backgroundColor = "red";
                } else {
                    console.log("miss");
                    field.element.style.backgroundColor = "blue";
                    getAttacked();
                }
            }
        })
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


function logGame(){
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

function getAttacked(){
    let x = getRandomInt(10);
    let y = getRandomInt(10);
    while (defenseFields[x * 10 + y].hit == true) {
        x = getRandomInt(10);
        y = getRandomInt(10);
    }
    if (defenseFields[x * 10 + y].ship != null) {
        defenseFields[x * 10 + y].ship.style.backgroundColor = "red";
        console.log("hit", x, y);
        getAttacked();
    }
    defenseFields[x * 10 + y].hit = true;
    defenseFields[x * 10 + y].element.style.backgroundColor = "blue";
    console.log("miss", x, y);
}
