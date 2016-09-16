/**
 * Created by OF on 9/14/16.
 */
var whos_turn = 'x';
var layers = 0;
var increment = true;
var answer = null;
var gameSize = null;

var gameState = [];


$(document).ready(closeButton);

function closeButton() {
    $(".button").click(function () {

        var player1_name = "DJ " + $("#player1_name").val();
        var player2_name = "DJ " + $("#player2_name").val();
        $("#DJ1").append(player1_name);
        $("#DJ2").append(player2_name);
        $(".front_page").slideToggle(1500);
        $('.gamesquare').slideToggle(3000);
    });

    $(".board_size").click(function () {
        gameSize = +$(this).data('size');
        for (var i = 0; i < gameSize; i++) {
            gameState[i] = [];
            for (var j = 0; j < gameSize; j++) {
                gameState[i][j] = ' ';
            }
        }
        loadSquares();

    });
    ajax();
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
    if (increment) {
        layers++;
        if (layers === 7) {
            increment = false;
        }
    }
    else {
        layers--;
        if (layers === 1) {
            increment = true;
        }
    }
    $('.music').prop('muted', true);
    switch (layers) {
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
     ;
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
function ajax() {
    console.log("ajax runing");
    $.ajax({
        // url: 'http://www.opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple',
        url: 'http://brianphan88.com/questions/multiple_api.php',
        // dataType: 'jsonp',
        // method: 'get',
        // crossDomain: true,
        success: function (response) {
            console.log("response: ", JSON.parse(response.substring(0, response.length - 1)));
            // console.log(JSON.parse(response));
            response = JSON.parse(response.substring(0, response.length - 1));
            var i = Math.floor(Math.random() * 40);
            var question = response.results[i].question;
            console.log(question);
            $(".questions").html("");
            $(".questions").append(question);
            var wrong_answer = response.results[i].incorrect_answers;
            answer = response.results[i].correct_answer;
            $(".button_option").html("");
            $("#button_option1").append(response.results[i].incorrect_answers[0]);
            $("#button_option2").append(response.results[i].incorrect_answers[1]);
            $("#button_option3").append(response.results[i].incorrect_answers[2]);
            $("#button_option4").append(response.results[i].correct_answer);
            console.log(wrong_answer);
            console.log(answer);

        }
    })
    $(".button_option").click(function () {
        var answer2 = $(this).text();
        console.log(answer2);
        if (answer2 == answer) {
            $(".questions").text("");
            $(".button_options").text("");
            var correct_answer = $('.questions').text("GOOD JOB, make a move");
            $('question_board').append(correct_answer);
            console.log("answer good");
            // $("question_board").hide();
        } else {
            $(".questions").text("");
            var correct_answer = $('.questions').text("Incorrect, try again");
            console.log("incorrect answer");
        }
    })
}
