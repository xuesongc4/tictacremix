/**
 * Created by OF on 9/14/16.
 */
var whos_turn = 'x';
var layers = 0;
var increment = true;

var gamesize = 3;

var gameState = [];
for (var i = 0; i < gamesize; i++) {
    gameState[i] = [];
    for (var j = 0; j < gamesize; j++) {
        gameState[i][j] = ' ';
    }
}

$(document).ready(loadsquares);
$(document).ready(closeButton);

function closeButton() {
    $(".button").click(function () {

        var player1_name = "DJ " + $("#player1_name").val();
        var player2_name = "DJ " + $("#player2_name").val();
        $("#DJ1").append(player1_name);
        $("#DJ2").append(player2_name);
        $(".front_page").hide();

    })
}
function loadsquares() {
    var $gameboard = $('.gameboard');
    for (var i = 0; i < gamesize; i++) {
        var row = $('<div>').addClass('row' + i);
        $gameboard.append(row);
        for (var j = 0; j < gamesize; j++) {
            var square = $('<div>').addClass('gamesquare').data('column', j).data('row', i);
            $('.row' + i).append(square);
        }
    }
    //---------------- making size of squares appropriate vs number of squares
    if (gamesize == 3) {
        $(".gamesquare").addClass('gamesquare3');
    }
    else if (gamesize == 9) {
        $(".gamesquare").addClass('gamesquare9');
    }
    else {
        $(".gamesquare").addClass('gamesquare20');
    }
    loadclickhandlers();
}

function loadclickhandlers() {
    $('.gamesquare').click(position_tracker);
    $('.gamesquare').click(music_layering);
}

function position_tracker() {
    var row = $(this).data('row');
    var column = $(this).data('column');


    console.log("row :" + row);
    console.log("column :" + column);

    if (whos_turn == 'x') {
        gameState[row][column] = 'x';
        var player1 = $('<div>').addClass('playerX');
        $(this).append(player1);
        whos_turn = 'o';
        console.log(checkWin(row, column, 3, 'x'));
    }
    else if (whos_turn == 'o') {
        gameState[row][column] = 'o';
        var player2 = $('<div>').addClass('playerO');
        $(this).append(player2);
        whos_turn = 'x';
        console.log(checkWin(row, column, 3, 'o'));
    }
}

function music_layering(){
    if(increment) {
        layers++;
        if(layers === 7){
            increment = false;
        }
    }
    else{
        layers--;
        if(layers === 1){
            increment = true;
        }
    }
    $('.music').prop('muted', true);
    switch(layers){
        case 1:
            $("#layer1").prop('muted', false);
            break;
        case 2:
            $("#layer2").prop('muted', false);
            break;
        case 3:
            $("#layer3").prop('muted', false);
            break;
        case 4:
            $("#layer4").prop('muted', false);
            break;
        case 5:
            $("#layer5").prop('muted', false);
            break;
        case 6:
            $("#layer6").prop('muted', false);
            break;
        case 7:
            $("#layer7").prop('muted', false);
            break;
    }
}


//Win Condition functions
function checkWin(i, j, numberOfSpots, XorO) {
    if (checkVertical(i, j, numberOfSpots, XorO) || checkUpperDiagonal(i, j, numberOfSpots, XorO) || checkHorizontal(i, j, numberOfSpots, XorO) || checkLowerDiagonal(i, j, numberOfSpots, XorO)) {
        return true;
    }
    return false;
}


function checkVertical(i, j, numberOfSpots, XorO) {
    var count = 1;
    var step = 1;
    while (gameState[i - step]) {
        if (gameState[i - step][j] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    step = 1;
    while (gameState[i + step]) {
        if (gameState[i + step][j] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    return count === numberOfSpots;
}

function checkUpperDiagonal(i, j, numberOfSpots, XorO) {
    var count = 1;
    var step = 1;
    while (gameState[i + step]) {
        if (gameState[i + step][j - step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    step = 1;
    while (gameState[i - step]) {
        if (gameState[i - step][j + step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    return count === numberOfSpots;
}

function checkHorizontal(i, j, numberOfSpots, XorO) {
    var count = 1;
    var step = 1;
    while (gameState[i][j - step]) {
        if (gameState[i][j - step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    step = 1;
    while (gameState[i][j + step]) {
        if (gameState[i][j + step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    return count === numberOfSpots;
}

function checkLowerDiagonal(i, j, numberOfSpots, XorO) {
    var count = 1;
    var step = 1;
    while (gameState[i - step]) {
        if (gameState[i - step][j - step] === XorO) {
            count++;
            step++;
        } else {
            step = 1;
            break;
        }
    }
    step = 1;
    while (gameState[i + step]) {
        if (gameState[i + step][j + step] === XorO) {
            count++;
            step++;
        } else {
            break;
        }
    }
    return count === numberOfSpots;
}
