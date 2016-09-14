/**
 * Created by OF on 9/14/16.
 */
var whos_turn = 'x';
var clicks = 0;
var increment = true;

$(document).ready(loadsquares);

function loadsquares() {
    var gamesize = 3;
    var $gameboard = $('.gameboard');
    for (var i = 0; i < gamesize; i++) {
        var row = $('<div>').addClass('row'+i);
        $gameboard.append(row);
        for (var j = 0; j < gamesize; j++) {
            var square = $('<div>').addClass('gamesquare').data('column', j).data('row', i);
            $('.row'+i).append(square);
        }
    }
    //---------------- making size of squares appropriate vs number of squares
    if(gamesize == 3){
        $(".gamesquare").addClass('gamesquare3');
    }
    else if(gamesize == 9){
        $(".gamesquare").addClass('gamesquare9');
    }
    else{
        $(".gamesquare").addClass('gamesquare20');
    }
    loadclickhandlers();
}

function loadclickhandlers(){
    $('.gamesquare').click(position_tracker);
    $('.gamesquare').click(music_layering);
}

function position_tracker() {
    var row = $(this).data('row');
    var column = $(this).data('column');

    console.log("row :" + row);
    console.log("column :" + column);

    if (whos_turn == 'x') {
        var player1 = $('<div>').addClass('playerX');
        $(this).append(player1);
        whos_turn = 'o';
    }
    else if (whos_turn == 'o') {
        var player2 = $('<div>').addClass('playerO');
        $(this).append(player2);
        whos_turn = 'x';
    }
}
function music_layering(){

    if(increment == true) {
        clicks++;
        console.log(clicks+"clicks!!!");
        if(clicks ==7){
            increment = false;
        }
    }
    else{
        clicks--;
        console.log(clicks+"clicks!!!");
        if(clicks ==1 ){
            increment = true;
        }
    }
    switch(clicks){
        case 1:
            for(var i=0; i<8; i++){
                $("#layer"+i).prop('muted', true);
            }
            $("#layer1").prop('muted', false);
            break;
        case 2:
            for(var i=0; i<8; i++){
                $("#layer"+i).prop('muted', true);
            }
            $("#layer2").prop('muted', false);
            break;
        case 3:
            for(var i=0; i<8; i++){
                $("#layer"+i).prop('muted', true);
            }
            $("#layer3").prop('muted', false);
            break;;
        case 4:
            for(var i=0; i<8; i++){
                $("#layer"+i).prop('muted', true);
            }
            $("#layer4").prop('muted', false);
            break;
        case 5:
            for(var i=0; i<8; i++){
                $("#layer"+i).prop('muted', true);
            }
            $("#layer5").prop('muted', false);
            break;
        case 6:
            for(var i=0; i<8; i++){
                $("#layer"+i).prop('muted', true);
            }
            $("#layer6").prop('muted', false);
            break;
        case 7:
            for(var i=0; i<8; i++){
                $("#layer"+i).prop('muted', true);
            }
            $("#layer7").prop('muted', false);
            break;
    }
}
