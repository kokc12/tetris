//Imports ===============================>
import $ from "jquery";
import "../dist/assets/style.css";
//End of Imports ===============================>


//Global Variables ===============================>
let index = 0;
let initialX = 5;
let initialY = 16;
let arrOfGridItems = null;
let getCurrentTetramino = null;
let tetraminoItems = [];
let animationSpeed = 500;
let isStop = true;
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
    getCurrentTetramino = getRandomTetramino();
    
    tetraminoItems = [
        $(`[pos-x = '${initialX}'][pos-y = '${initialY}']`),
        $(`[pos-x = '${initialX + arrOfTetraminos[getCurrentTetramino][0][0]}'][pos-y = '${initialY + arrOfTetraminos[getCurrentTetramino][0][1]}']`),
        $(`[pos-x = '${initialX + arrOfTetraminos[getCurrentTetramino][1][0]}'][pos-y = '${initialY + arrOfTetraminos[getCurrentTetramino][1][1]}']`),
        $(`[pos-x = '${initialX + arrOfTetraminos[getCurrentTetramino][2][0]}'][pos-y = '${initialY + arrOfTetraminos[getCurrentTetramino][2][1]}']`),
    ]

    for(let i = 0; i < tetraminoItems.length; i++) {
        tetraminoItems[i].addClass('tetramino-block');
    }
}

function getRandomTetramino() {
    return Math.round(Math.random() * arrOfTetraminos.length - 1);
}

function animate() {
    let isMove = true;
    let newCoordinates = [
        [tetraminoItems[0].attr('pos-x'), tetraminoItems[0].attr('pos-y')],
        [tetraminoItems[1].attr('pos-x'), tetraminoItems[1].attr('pos-y')],
        [tetraminoItems[2].attr('pos-x'), tetraminoItems[2].attr('pos-y')],
        [tetraminoItems[3].attr('pos-x'), tetraminoItems[3].attr('pos-y')],
    ];
    
    for(let i = 0; i < newCoordinates.length; i++) {
        if(newCoordinates[i][1] == 1 || $(`[pos-x = '${newCoordinates[i][0]}'][pos-y = '${newCoordinates[i][1] - 1}']`).hasClass('set')) {
            isMove = false;

            break;
        }
    }

    if(isMove) {
        for(let i = 0; i < tetraminoItems.length; i++) {
            tetraminoItems[i].removeClass('tetramino-block');
        }

        tetraminoItems = [
            $(`[pos-x = '${newCoordinates[0][0]}'][pos-y = '${newCoordinates[0][1] - 1}']`),
            $(`[pos-x = '${newCoordinates[1][0]}'][pos-y = '${newCoordinates[1][1] - 1}']`),
            $(`[pos-x = '${newCoordinates[2][0]}'][pos-y = '${newCoordinates[2][1] - 1}']`),
            $(`[pos-x = '${newCoordinates[3][0]}'][pos-y = '${newCoordinates[3][1] - 1}']`),
        ];

        for(let i = 0; i < tetraminoItems.length; i++) {
            tetraminoItems[i].addClass('tetramino-block');
        }

    } else {
        for(let i = 0; i < tetraminoItems.length; i++) {
            tetraminoItems[i].removeClass('tetramino-block');
            tetraminoItems[i].addClass('set');
        }

        createTetramino();
    }
}

$(window).on('keydown', function(e) {

    let coordinates1 = [tetraminoItems[0].attr('pos-x'), tetraminoItems[0].attr('pos-y')];
    let coordinates2 = [tetraminoItems[1].attr('pos-x'), tetraminoItems[1].attr('pos-y')];
    let coordinates3 = [tetraminoItems[2].attr('pos-x'), tetraminoItems[2].attr('pos-y')];
    let coordinates4 = [tetraminoItems[3].attr('pos-x'), tetraminoItems[3].attr('pos-y')];

    function drawNewXPosition(np) {
        isStop = true;
    
        let newCoordinates = [
            $(`[pos-x = '${parseInt(coordinates1[0]) + np}'][pos-y = '${coordinates1[1]}']`),
            $(`[pos-x = '${parseInt(coordinates2[0]) + np}'][pos-y = '${coordinates2[1]}']`),
            $(`[pos-x = '${parseInt(coordinates3[0]) + np}'][pos-y = '${coordinates3[1]}']`),
            $(`[pos-x = '${parseInt(coordinates4[0]) + np}'][pos-y = '${coordinates4[1]}']`),
        ];
    
        for(let i = 0; i < newCoordinates.length; i++) {
            if(!newCoordinates[0].attr('pos-x') == 1 ||
            !newCoordinates[1].attr('pos-x') == 1 ||
            !newCoordinates[2].attr('pos-x') == 1 || newCoordinates[i].hasClass('set')) {
                isStop = false;
            }
        }
    
        if(isStop === true) {
            for(let i = 0; i < tetraminoItems.length; i++) {
                tetraminoItems[i].removeClass('tetramino-block');
            }
    
            tetraminoItems = newCoordinates;
    
            for(let i = 0; i < tetraminoItems.length; i++) {
                tetraminoItems[i].addClass('tetramino-block');
            }
        }
    }

    if(e.keyCode == 37) {
        drawNewXPosition(-1)
    } else if(e.keyCode == 39) {
        drawNewXPosition(1);
    } else if(e.keyCode == 40) {
        animate();
    }

});

$(document).ready(function() {
    fillPlayfield(); //Fill the playfield with grid items.
    setCoordinatesForGridItems(); //Set pos-x and pos-y attribute for every grid item.
    createTetramino(); //Draw and set coordinates for tetramino.
    setInterval(animate, animationSpeed); //Make it to move down.
});