/**
 * Created by OF on 9/14/16.
 */

$(document).ready(function () {
    initializeAudioVisualizer(document.getElementById('audio'));

    $(".gameboard").html("");
    $("#toWin").html("");
    gameSize = 3;
    totalSpots = gameSize * gameSize;
    $('.board_size').removeClass('buttonClicked');
    $('#three').addClass('buttonClicked');
    for (var i = 0; i < gameSize; i++) {
        gameState[i] = [];
        for (var j = 0; j < gameSize; j++) {
            gameState[i][j] = ' ';
        }
    }
    loadSquares();
        randomWin = 3;
    $('#toWin').append(randomWin + " in a row win.")
});

$(document).ready(closeButton);
var whos_turn = 'x';

var layers = 0;
var increment = true;
var gameSize = 3;
var gameState = [];
var spotsFilled = 0;
var totalSpots;
var player1_name = null;
var player2_name = null;
var randomWin = null;


//SCRIPT ===========================================

function initializeAudioVisualizer(audio) {
    var audCtx = new AudioContext();
    var analyser = audCtx.createAnalyser();
    var audioSrc = null;

    if (audioSrc !== null) {
        audioSrc.disconnect();
    }
    audioSrc = audCtx.createMediaElementSource(audio);
    // we have to connect the MediaElementSource with the analyser
    audioSrc.connect(analyser);
    analyser.connect(audCtx.destination);
    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
    // analyser.fftSize = 64;
    // frequencyBinCount tells you how many values you'll receive from the analyser
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // we're ready to receive some data!
    var canvas = document.getElementById('canvas'),
        cwidth = canvas.width,
        cheight = (canvas.height - 2),
        meterWidth = 10, //width of the meters in the spectrum
        gap = 2, //gap between meters
        capHeight = 2,
        capStyle = '#fff',
        meterNum = 500, //count of the meters
        capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
    ctx = canvas.getContext('2d'),
        gradient = ctx.createLinearGradient(0, 0, 0, 1);
    gradient.addColorStop(1, '#f00');
    gradient.addColorStop(0.5, '#ff0');
    gradient.addColorStop(0, '#f00');
    // loop
    function renderFrame() {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var step = Math.round(array.length / meterNum); //sample limited data from the total array
        ctx.clearRect(0, 0, cwidth, cheight);
        for (var i = 0; i < meterNum; i++) {
            var value = array[i * step];
            if (capYPositionArray.length < Math.round(meterNum)) {
                capYPositionArray.push(value);
            }
            ;
            ctx.fillStyle = capStyle;
            //draw the cap, with transition effect
            if (value < capYPositionArray[i]) {
                ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
            } else {
                ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                capYPositionArray[i] = value;
            }
            ;
            ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
            ctx.fillRect(i * 12 /*meterWidth+gap*/, cheight - value + capHeight, meterWidth, cheight); //the meter
        }
        requestAnimationFrame(renderFrame);

    }

    renderFrame();
}

function resetGame() {
    location.reload();
}

function stop_animation(){
    $('.playerO').css('animation','none');
    $('.playerX').css('animation','none');
}

function audioClick() {
    $('#fx1').get(0).play();
}
function loadAudioFx() {
    $('#fx2').get(0).play();
}

function closeButton() {
    $("#DJ1").addClass('flashingDJ');
    $(".button").click(function () {
        var player1_name_val = $("#player1_name").val();
        var player2_name_val = $("#player2_name").val();

        if (player1_name_val){
            player1_name = "DJ " + player1_name_val;
        }
        else{
            player1_name = 'DJ "X"treme';
        }
        if (player2_name_val){
            player2_name = "DJ " + player2_name_val;;
        }
        else{
            player2_name = 'DJ "O"mega';
        }
        loadAudioFx();
        $("#DJ1").append(player1_name);
        $(".Player_turn").text(player1_name + "'s turn!");
        $("#DJ2").append(player2_name);
        $('#main_page').removeClass('hidden');
        $('.front_page').animate({width: 'toggle'});
        $('.gamesquare').slideToggle(500);
    });



    $(".board_size").click(function () {
        audioClick();
        $(".gameboard").html("");
        $("#toWin").html("");
        gameSize = +$(this).data('size');
        totalSpots = gameSize * gameSize;
        $('.board_size').removeClass('buttonClicked');
        $(this).addClass('buttonClicked');
        var clicked = $(this).addClass();
        for (var i = 0; i < gameSize; i++) {
            gameState[i] = [];
            for (var j = 0; j < gameSize; j++) {
                gameState[i][j] = ' ';
            }
        }
        loadSquares();
        if (gameSize == 3) {
            randomWin = 3;
        }
        else if (gameSize == 9) {
            randomWin = 4;
        }
        else {
            randomWin = 5;
        }
        $('#toWin').append(randomWin + " in a row to win.")
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
    $('.gamesquare').on('click', function () {
        $(this).addClass('clicked');
        position_tracker.call(this);
        music_layering.call(this);
    });
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
    // $('.music').prop('muted', true);
    $("#audio").prop('muted', false);
    var currentTime = $("#audio")[0].currentTime;

    $("#audio").attr('src', 'music%20layers/layer' + layers + '.mp3');
    $("#audio")[0].oncanplay = function () {
        $("#audio").prop('muted', false);
    }
    //$("#audio")[0].currentTime = currentTime;
}

function position_tracker() {

    audioClick();
    var row = $(this).data('row');
    var column = $(this).data('column');
    spotsFilled++;

    if (whos_turn == 'x') {

        $("#DJ1").removeClass('flashingDJ');;
        gameState[row][column] = 'x';
        var player1 = $('<div>').addClass('playerX');
        $(this).append(player1);
        $(this).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        whos_turn = 'o';
        $(".Player_turn").text(player2_name + "'s turn!");
        $("#DJ2").addClass('flashingDJ');
        $('.cover_box').fadeIn(2000);
        if (!checkWin(row, column, randomWin, 'x')) {
        }
    }
    else if (whos_turn == 'o') {

        $("#DJ2").removeClass('flashingDJ');
        gameState[row][column] = 'o';
        var player2 = $('<div>').addClass('playerO');
        $(this).append(player2);
        $(this).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        whos_turn = 'x';
        $(".Player_turn").text(player1_name + "'s turn!");
        $("#DJ1").addClass('flashingDJ');
        $('.cover_box').fadeIn(2000);
        if (!checkWin(row, column, randomWin, 'o')) {
        }
    }
}


//Win Condition functions
function checkWin(i, j, numberOfSpots, XorO) {
    if (checkVertical(i, j, numberOfSpots, XorO) || checkUpperDiagonal(i, j, numberOfSpots, XorO) || checkHorizontal(i, j, numberOfSpots, XorO) || checkLowerDiagonal(i, j, numberOfSpots, XorO)) {
        $('.message').text("You're a star!");
        $('.winner').slideToggle();
        $('.board_blocker').css('display','inherit ');
        setTimeout(function () {
            $('#audio').prop('muted', true);
        }, 1000);
        stop_animation()
        return true;
    }
    if (spotsFilled === totalSpots) {
        $('.message').text("TIE game...");
        $('.winner').slideToggle();
        $('.board_blocker').css('display','inherit ');
        setTimeout(function () {
            $('#audio').prop('muted', true);
        }, 1000);
        stop_animation();
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
