/**
 * Created by OF on 9/14/16.
 */
var whos_turn = 'x';
var clicks = 0;
var increment = true;

var gameSize = null;

var gameState = [];
for (var i = 0; i < gameSize; i++) {
    gameState[i] = [];
    for (var j = 0; j < gameSize; j++) {
        gameState[i][j] = ' ';
    }
}


$(document).ready(closeButton);

function closeButton() {
    $(".button").click(function () {

        var player1_name = "DJ " + $("#player1_name").val();
        var player2_name = "DJ " + $("#player2_name").val();
        $("#DJ1").append(player1_name);
        $("#DJ2").append(player2_name);
        $(".front_page").hide();
    });

    $(".board_size").click(function () {
        console.log("clickeeddd");
        gameSize = $(this).text();
        console.log("loaded: " + gameSize);
        loadSquares();
    })

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
function music_layering() {

    if (increment == true) {
        clicks++;
        console.log(clicks + "clicks!!!");
        if (clicks == 7) {
            increment = false;
        }
    }
    else {
        clicks--;
        console.log(clicks + "clicks!!!");
        if (clicks == 1) {
            increment = true;
        }
    }
    switch (clicks) {
        case 1:
            for (var i = 0; i < 8; i++) {
                $("#layer" + i).prop('muted', true);
            }
            $("#layer1").prop('muted', false);
            break;
        case 2:
            for (var i = 0; i < 8; i++) {
                $("#layer" + i).prop('muted', true);
            }
            $("#layer2").prop('muted', false);
            break;
        case 3:
            for (var i = 0; i < 8; i++) {
                $("#layer" + i).prop('muted', true);
            }
            $("#layer3").prop('muted', false);
            break;
            ;
        case 4:
            for (var i = 0; i < 8; i++) {
                $("#layer" + i).prop('muted', true);
            }
            $("#layer4").prop('muted', false);
            break;
        case 5:
            for (var i = 0; i < 8; i++) {
                $("#layer" + i).prop('muted', true);
            }
            $("#layer5").prop('muted', false);
            break;
        case 6:
            for (var i = 0; i < 8; i++) {
                $("#layer" + i).prop('muted', true);
            }
            $("#layer6").prop('muted', false);
            break;
        case 7:
            for (var i = 0; i < 8; i++) {
                $("#layer" + i).prop('muted', true);
            }
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
