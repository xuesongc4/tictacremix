/**
 * Created by OF on 9/14/16.
 */
var whos_turn = 'x';
var layers = 0;
var increment = true;
var gameSize = null;
var gameState = [];

var player1_name=null;
var player2_name=null;
var randomWin=null;


$(document).ready(closeButton);

function resetGame(){
    location.reload();
}

function audioClick(){
    $('#fx1').get(0).play();
}
function loadAudioFx(){
    $('#fx2').get(0).play();
}

function closeButton() {

    $(".button").click(function () {
        player1_name = "DJ " + $("#player1_name").val();
        player2_name = "DJ " + $("#player2_name").val();
        loadAudioFx();
        $("#DJ1").append(player1_name);
        $(".Player_turn").text(player1_name+"'s turn!");
        $("#DJ2").append(player2_name);
        $(".front_page").slideToggle(1500);
        $('.gamesquare').slideToggle(2000);
    });

    $(".board_size").click(function () {
        audioClick();
        $(".gameboard").html("");
        $("#toWin").html("");
        gameSize = +$(this).data('size');
        $(this).addClass('buttonClicked');
        var clicked = $(this).addClass();
        for (var i = 0; i < gameSize; i++) {
            gameState[i] = [];
            for (var j = 0; j < gameSize; j++) {
                gameState[i][j] = ' ';
            }
        }
        loadSquares();
        if(gameSize==3){
            randomWin=3;
        }
        else if(gameSize==9){
            randomWin=Math.floor(Math.random()*6)+3;
        }
        else{
            randomWin=Math.floor(Math.random()*17)+3;
        }
        $('#toWin').append(randomWin+" need to win.")
    });
}

function loadSquares() {
    var $gameboard = $('.gameboard');
    for (var i = 0; i < gameSize; i++) {
        var row = $('<div>').addClass('row' + i);
        $gameboard.append(row);
        for (var j = 0; j < gameSize; j++) {
            var square = $('<div>').addClass('gamesquare').data('column', j).data('row', i);
            $('.row' + i).append(square);
        }
    }
    //---------------- making size of squares appropriate vs number of squares
    if (gameSize == 3) {
        $(".gamesquare").addClass('gamesquare3');
    }
    else if (gameSize == 9) {
        $(".gamesquare").addClass('gamesquare9');
    }
    else {
        $(".gamesquare").addClass('gamesquare20');
    }
    loadclickhandlers();
    $(".gamesquare").hide();
}

function loadclickhandlers() {
    $('.gamesquare').on('click',position_tracker);
    $('.gamesquare').on('click',music_layering);
}

function position_tracker() {
    audioClick();
    $(this).off('click',position_tracker);
    var row = $(this).data('row');
    var column = $(this).data('column');

    console.log("row :" + row);
    console.log("column :" + column);

    if (whos_turn == 'x') {
        gameState[row][column] = 'x';
        var player1 = $('<div>').addClass('playerX');
        $(this).append(player1);
        $(this).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        whos_turn = 'o';
        $(".Player_turn").text(player2_name+"'s turn!");
        checkWin(row, column, randomWin, 'x');
    }
    else if (whos_turn == 'o') {
        gameState[row][column] = 'o';
        var player2 = $('<div>').addClass('playerO');
        $(this).append(player2);
        $(this).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        whos_turn = 'x';
        $(".Player_turn").text(player1_name+"'s turn!");
        checkWin(row, column, randomWin, 'o');
    }
}

function music_layering(){
    $(this).off('click',music_layering);
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
        $('.winner').slideToggle();
        loadAudioFx();
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
