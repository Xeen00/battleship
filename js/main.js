class Field {
    constructor(element, x, y) {
        this.element = element;
        this.x = x;
        this.y = y;
        this.ship = null;
        this.hit = false;
    }
}

class Ship {
    constructor(element, length, name) {
        this.element = element;
        this.length = length;
        this.orientation = "horizontal";
        this.name = name;
    }
}

const ownFleetOfShips= [ship1 = new Ship(document.createElement("div"), 1, "ship1"),
    ship2 = new Ship(document.createElement("div"), 2, "ship2"),
    ship3 = new Ship(document.createElement("div"), 3, "ship3"),
    ship4 = new Ship(document.createElement("div"), 4, "ship4"),
    ship5 = new Ship(document.createElement("div"), 5, "ship5")];
const enemyFleetOfShips = [ship1 = new Ship(document.createElement("div"), 1, "ship1"),
    ship2 = new Ship(document.createElement("div"), 2, "ship2"),
    ship3 = new Ship(document.createElement("div"), 3, "ship3"),
    ship4 = new Ship(document.createElement("div"), 4, "ship4"),
    ship5 = new Ship(document.createElement("div"), 5, "ship5")];

let defenseFields = [];
let attackFields = [];

const defenseBoard = document.getElementById("defense-board");
const attackBoard = document.getElementById("attack-board");

const base = document.getElementById("shipbase");

const defenseScoreBoard = document.getElementById("defense-score");
const attackScoreBoard = document.getElementById("attack-score");

let started = false;
let defenseScore = 0;
let attackScore = 0;

document.addEventListener('DOMContentLoaded', () => {
    initializeDefenseBoard();
    initializeAttackBoard();
    initializeShips();
    initializeEnemyShips();
});

function gameLoop() {

}

function initializeDefenseBoard(){
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            console.log("start initializing field:", i, j);
            defenseFields.push(new Field(document.createElement("div"), i, j));
            console.log("finished initializing defense field:", defenseFields[i * 10 + j]);
        }
    }

    for(let field of defenseFields) {
        field.element.classList.add("field");
        defenseBoard.appendChild(field.element);
    }
}

function initializeAttackBoard(){
    console.log("start initializing attack board");
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            console.log("start initializing field:", i, j);
            attackFields.push(new Field(document.createElement("div"), i, j));
            console.log("finished initializing attack field:", attackFields[i * 10 + j]);
        }
    }

    for(let field of attackFields) {
        field.element.classList.add("field");
        field.element.addEventListener("mousedown", function (event) {
            event.preventDefault();
            if (!attack(field.x, field.y, attackFields)){
                getAttacked();
            };
        })
        attackBoard.appendChild(field.element);
    }

}

function initializeEnemyShips(){
    console.log("start initializing enemy ships");
    for (let ship of enemyFleetOfShips) {
        console.log("start initialized enemy ship: ", ship);
        let x = getRandomInt(10);
        let y = getRandomInt(10);
        let field = attackFields[x * 10 + y];
        console.log("try on field:", field);
        while (checkSpaces(ship.length, x, y, ship.orientation, attackFields) == false) {
            x = getRandomInt(10);
            y = getRandomInt(10);
            field = attackFields[x * 10 + y];
        }
        console.log(field);
        placeShip(field, ship, attackFields, false);
        console.log("finished initialized ship: ", ship);
    }
    console.log("finished initializing enemy ships");
}

function initializeShips(){
    for(let ship of ownFleetOfShips){
        console.log("start initialized ship: ", ship);
        ship.element.classList.add("ship");
        ship.element.setAttribute("draggable", "true");
        ship.element.style.width = ship.length * 50 + "px";
        ship.element.innerHTML = ship.name;
        base.appendChild(ship.element);

        ship.element.addEventListener("dragstart", function (event){
            console.log("start dragging:", ship);
            let selectedShip = ship;
            for (let field of defenseFields) {

                field.element.addEventListener("dragover", function (event){
                    event.preventDefault();
                })

                field.element.addEventListener("drop", function (event){
                    console.log("try placing:",selectedShip, "on the field:", field);
                    //removeShip(selectedShip, defenseFields);
                    placeShip(field, selectedShip, defenseFields, true);
                    console.log("successfully placed:",selectedShip, "on the field:", field);
                    selectedShip = null;
                })
            }
        })
        console.log("finished initialized ship: ", ship);
    }
}


function checkSpaces(size, x, y, orientation, fields){
    console.log("start checking spaces", size, x, y);
    let i = y;
    if (i + size <= 10){
        for (let j = i; j < i + size; j++) {
            if (fields[j].ship != null) {
                console.log("space is occupied");
                return false;
            }
        }
        console.log("space is free");
        return true
    } else {
        console.log("out of bounds")
        return false;
    }

}

function removeShip(ship, fields){
    console.log("start removing ship", ship);
    let i = 0;
    while (i < fields.length && fields[i].ship != ship) {
        i++;
    }
    if (i < fields.length){
        for (let j = i; j < i + ship.length; j++) {
            fields[j].ship = null;
            fields[j].element.classList.remove("ship-body");
            fields[j].element.classList.remove("ship-end");
            fields[j].element.classList.add("field");
            console.log("succesfully removed ship", ship, "from fields:", fields[j]);
        }
    }
    console.log("ship not found in fields");
}

function startGame(){
    if (!started && base.children.length == 0){
        started = true;
        fixShips();
        console.log("start game");
    }else if (started) {
        console.log("already started");
    }else {
        console.log("place all ships");
    }
}

function restartGame(){
    location.replace(location.href);
}


function logGame(){
    for (let field of attackFields) {
        console.log("attack board:", field);
    }
    for (let field of defenseFields) {
        console.log("defense board", field);
    }
    for (let ship of ownFleetOfShips) {
        console.log("base fleet board", ship);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getAttacked(){
    do {
        let x = getRandomInt(10);
        let y = getRandomInt(10);
    }while (!defenseFields[x * 10 + y].hit);

    if (attack(x, y, defenseFields)){
        if (attack(x, y -1, defenseFields)){

        }
    }

    updateScoreBoard();
}

function attackField(x, y){
    attack(x, y, attackFields);
}

function attack(x, y, fields){
    field = fields[x * 10 + y];
    if (started){
        if (!field.hit) {
            field.hit = true;
            if (field.ship != null) {
                console.log("hit");
                field.element.style.backgroundColor = "red";
                attackScore++;
                return true;
            } else {
                console.log("miss");
                field.element.style.backgroundColor = "blue";
                return false;
            }
        }
    }
    updateScoreBoard();
}

function fixShips(){
    for(ship of ownFleetOfShips){
        ship.element.setAttribute("draggable", "false");
    }
}

function updateScoreBoard(){
    defenseScoreBoard.innerHTML = attackScore;
    attackScoreBoard.innerHTML = defenseScore;
}

function placeShip( field, selectedShip, fields, visible){
    console.log("!INFUNCTION trying to place:", selectedShip, "on the field:", field);

    if (field.ship === null && checkSpaces(selectedShip.length, field.x, field.y, selectedShip.orientation, fields)){
        console.log("field is ready for placement")
        removeShip(selectedShip, fields);
        field.element.appendChild(selectedShip.element);
        let counter = 1;
        for (let i = field.y; i < field.y + selectedShip.length; i++) {
            currentField = fields[field.x * 10 + i];
            currentField.ship = selectedShip;
            if (visible & selectedShip.length > 1){
                if (counter == selectedShip.length){
                    currentField.element.classList.add("ship-end");
                }else {
                    currentField.element.classList.add("ship-body");
                };
            }
            counter++;
        }
        field.ship = selectedShip;
    }
}

function placeShipRandom(){
    if (!started){
        for (let ship of ownFleetOfShips) {
            let x = getRandomInt(9);
            let y = getRandomInt(9);
            let field = defenseFields[x * 10 + y];
            console.log("start random placing ship:", ship, "on the field:", field);
            while (checkSpaces(ship.length, x, y, ship.orientation, defenseFields) === false) {
                x = getRandomInt(10);
                y = getRandomInt(10);
                field = defenseFields[x * 10 + y];
            }
            placeShip(field, ship, defenseFields, true);
        }
    }else {
        console.log("game already started");
    }
}