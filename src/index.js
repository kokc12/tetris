//Imports ===============================>
import $ from "jquery";
import "../dist/assets/style.css";
//End of Imports ===============================>

function createItem(tag, className) {
    return $(tag).addClass(className);
}

function fillPlayfield() {
    const GRID_ITEMS_AMOUNT = 180;

    for(let i = 0; i < GRID_ITEMS_AMOUNT; i++) {
        $('#tetris').append(createItem('<div></div>', 'grid-item'));
    }
}

$(document).ready(function() {
    fillPlayfield(); //Fill the playfield with grid items
    
    $('.grid-item').addClass('bar');
});