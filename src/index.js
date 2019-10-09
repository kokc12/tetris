//Imports ===============================>
import $ from "jquery";
import "../dist/assets/style.css";
//End of Imports ===============================>


//Global Variables ===============================>
let index = 0;
let initialX = 5;
let initialY = 16;
let arrOfGridItems = null;
let getCurrentTetamino = null;
let tetraminoItems = [];
let arrOfTetraminos = [
    [
        [0, 1],
        [0, 2],
        [0, 3],
    ],
    [
        [1, 0],
        [0, 1],
        [1, 1],
    ],
    [
        [1, 0],
        [0, 1],
        [0, 2],
    ],
    [
        [1, 0],
        [1, 1],
        [1, 2],
    ],
    [
        [1, 0],
        [-1, 1],
        [0, 1],
    ],
    [
        [1, 0],
        [1, 1],
        [2, 1],
    ],
    [
        [1, 0],
        [2, 0],
        [1, 1],
    ],

]
//End of Global Variebles ===============================>


function createItem(tag, className) {
    return $(tag).addClass(className);
}

function fillPlayfield() {
    const GRID_ITEMS_AMOUNT = 180;

    for(let i = 0; i < GRID_ITEMS_AMOUNT; i++) {
        $('#tetris').append(createItem('<div></div>', 'grid-item'));
    }
}

function setCoordinatesForGridItems() {
    arrOfGridItems = $('.grid-item').toArray();

    for(let y = 18; y > 0; y--) {
        for(let x = 1; x < 11; x++) {
            arrOfGridItems[index].setAttribute('pos-x', x);
            arrOfGridItems[index].setAttribute('pos-y', y);
            index++;
        }
    }
}

function createTetramino() {
    getCurrentTetamino = getRandomTetramino();
    
    tetraminoItems = [
        $(`[pos-x = '${initialX}'][pos-y = '${initialY}']`),
        $(`[pos-x = '${initialX + arrOfTetraminos[getCurrentTetamino][0][0]}'][pos-y = '${initialY + arrOfTetraminos[getCurrentTetamino][0][1]}']`),
        $(`[pos-x = '${initialX + arrOfTetraminos[getCurrentTetamino][1][0]}'][pos-y = '${initialY + arrOfTetraminos[getCurrentTetamino][1][1]}']`),
        $(`[pos-x = '${initialX + arrOfTetraminos[getCurrentTetamino][2][0]}'][pos-y = '${initialY + arrOfTetraminos[getCurrentTetamino][2][1]}']`),
    ]

    for(let i = 0; i < tetraminoItems.length; i++) {
        tetraminoItems[i].addClass('tetramino-block');
    }
}

function getRandomTetramino() {
    return Math.round(Math.random() * arrOfTetraminos.length - 1);
}

$(document).ready(function() {
    fillPlayfield(); //Fill the playfield with grid items
    setCoordinatesForGridItems(); //Set pos-x and pos-y attribute for every grid item
    createTetramino();
});