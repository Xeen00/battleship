const ownFleetOfShips= [ship1 = new ship(document.createElement("div"), 1, "ship1"),
    ship2 = new ship(document.createElement("div"), 2, "ship2"),
    ship3 = new ship(document.createElement("div"), 3, "ship3"),
    ship4 = new ship(document.createElement("div"), 4, "ship4"),
    ship5 = new ship(document.createElement("div"), 5, "ship5")];
const enemyFleetOfShips = [ship1 = new ship(document.createElement("div"), 1, "ship1"),
    ship2 = new ship(document.createElement("div"), 2, "ship2"),
    ship3 = new ship(document.createElement("div"), 3, "ship3"),
    ship4 = new ship(document.createElement("div"), 4, "ship4"),
    ship5 = new ship(document.createElement("div"), 5, "ship5")];
const attackFields = [];
const defenseFields = [];
const defenseBoard = document.getElementById("defense-board");
const attackBoard = document.getElementById("attack-board");
const base = document.getElementById("shipbase");
const defenseScoreBoard = document.getElementById("defense-score");
const attackScoreBoard = document.getElementById("attack-score");
let started = false;
let defenseScore = 0;
let attackScore = 0;

class field {
    constructor(element, x, y, ship, hit) {
        this.element = element;
        this.x = x;
        this.y = y;
        this.ship = null;
        this.hit = false;
    }
}

class ship {
    constructor(element, length, name) {
        this.element = element;
        this.length = length;
        this.orientation = "horizontal";
        this.name = name;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeDefenseBoard();
    initializeAttackBoard();
    initializeShips();
    initializeEnemyShips();
    });


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
            attackField(field.x, field.y);
        })
        attackBoard.appendChild(field.element);
    }

    initializeEnemyShips();

}

function initializeEnemyShips(){
    for (let ship of enemyFleetOfShips) {
        let x = getRandomInt(10);
        let y = getRandomInt(10);
        console.log(attackField[x * 10 + y]);
        let field = attackField[x * 10 + y];
        while (checkSpaces(ship.length, x, y, ship.orientation, attackFields) == false) {
            x = getRandomInt(10);
            y = getRandomInt(10);
            field = defenseFields[x * 10 + y];
        }
        console.log(field);
        placeShip(field, ship, defenseFields);
    }
}

function initializeShips(){
    for(ship of ownFleetOfShips){
        ship.element.classList.add("ship");
        ship.element.setAttribute("draggable", "true");
        ship.element.style.width = ship.length * 50 + "px";
        ship.element.innerHTML = ship.name;
        base.appendChild(ship.element);
        console.log(ship);

        ship.element.addEventListener("dragstart", function (event){
            let selectedShip = ship;
            for (let field of defenseFields) {

                field.element.addEventListener("dragover", function (event){
                    event.preventDefault();
                })

                field.element.addEventListener("drop", function (event){
                    console.log(selectedShip.length);
                    removeShip(ship, defenseFields);
                    placeShip(field, selectedShip, defenseFields);
                    selectedShip = null;
                })
            }
        })
    }
}


function checkSpaces(size, x, y, orientation, fields){
    let i = y;
    console.log(i + size);
    if (i + size <= 10){
        for (let j = i; j < i + size; j++) {
            console.log(j)
            if (fields[j].ship != null) {
                return false;
            }
        }
        return true
    } else {
        return false;
    }

}

function removeShip(ship, fields){
    let i = 0;
    while (i < fields.length && fields[i].ship != ship) {
        i++;
    }
    if (i < fields.length){
        for (let j = i; j < i + ship.length; j++) {
            fields[j].ship = null;
            fields[j].element.style.backgroundColor = "lightgrey";
        }
    }
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
    for (let field of defenseFields) {
        field.ship = null;
        field.hit = false;
        field.element.innerHTML = "";
        field.element.style.backgroundColor = "lightgrey";
    }
    for (let field of attackFields) {
        field.ship = null;
        field.hit = false;
        field.element.innerHTML = "";
        field.element.style.backgroundColor = "lightgrey";
    }
    initializeShips();
    initializeEnemyShips();
    defenseScore = 0;
    attackScore = 0;
    updateScoreBoard();
    console.log("restart game");
    started = false;
}


function logGame(){
    for (let field of attackFields) {
        console.log("attack", field.ship, field.y, field.x);
    }
    for (let field of defenseFields) {
        console.log("defense", field.ship, field.y, field.x);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getAttacked(){
    console.log(defenseFields);
    let x = getRandomInt(10);
    let y = getRandomInt(10);
    while (defenseFields[x * 10 + y].hit == true) {
        x = getRandomInt(10);
        y = getRandomInt(10);
    }
    console.log(defenseFields[x * 10 + y]);
    if (defenseFields[x * 10 + y].ship != null) {
        defenseFields[x * 10 + y].element.style.backgroundColor = "red";
        console.log("hit", x, y);
        defenseScore++;
        getAttacked();
    }else {
        defenseFields[x * 10 + y].element.style.backgroundColor = "blue";
        console.log("miss", x, y);
    }
    defenseFields[x * 10 + y].hit = true;
    updateScoreBoard();
}

function attackField(x, y){
    field = attackFields[x * 10 + y];
    if (started){
        if (!field.hit) {
            field.hit = true;
            if (field.ship != null) {
                console.log("hit");
                field.element.style.backgroundColor = "red";
                attackScore++;
            } else {
                console.log("miss");
                field.element.style.backgroundColor = "blue";
                getAttacked();
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

function placeShip(field, selectedShip, fields){
    // console.log(selectedShip.length);
    console.log(field);
    if (field.ship === null && checkSpaces(selectedShip.length, field.x, field.y, selectedShip.orientation, fields)){
        removeShip(selectedShip, fields);
        field.element.appendChild(selectedShip.element);
        for (let i = field.y; i < field.y + selectedShip.length; i++) {
            fields[field.x * 10 + i].ship = selectedShip;
            fields[field.x * 10 + i].element.style.backgroundColor = "black";

        }
        field.ship = selectedShip;
    }
}

function placeShipRandom(){
    for (let ship of ownFleetOfShips) {
        let x = getRandomInt(10);
        let y = getRandomInt(10);
        let field = defenseFields[x * 10 + y];
        while (checkSpaces(ship.length, x, y, ship.orientation, defenseFields) == false) {
            x = getRandomInt(10);
            y = getRandomInt(10);
            field = defenseFields[x * 10 + y];
        }
        placeShip(field, ship, defenseFields);
    }
}