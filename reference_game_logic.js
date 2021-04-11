var players = []; // an array of two values (player1 and player2)
var color = null;
var matches = [];
var currentPlayerIndex;
function player(nameValue, colorValue){
    // create a player with name and color, and set the score of the player to 0,
    return {name: nameValue, color: colorValue, score: 0};
}
function setPlayerInfo(){
    // get 1st player's name and color and create player 1 object and add player 1 to the list of players
    // get 2nd player's name and color and create player 2 object and add player 2 to the list of players
    if(players.length == 0){
        var name = getElement("player1NameInput").value;
        if(name.trim() == null) name = "Player 1";
        if(color == null) alert("Please select a color!");
        else {
            players.push(player(name, color));
            hide("player1InfoPage");
            show("player2InfoPage");
        }
    } else if (players.length == 1){
        var name = getElement("player2NameInput").value;
        if(name.trim() == null || name.trim() == players[0].name) name = "Player 2";
        if(color == null || color == players[0].color) {
            alert("Please select a color. You may not select " + color + "!");
        } else {
            players.push(player(name, color));
            hide("player2InfoPage");
            startMatch();
        }
    }
}
function setColor(id){
    color = getElement(id).className;
}
function hide(id){
    getElement(id).style.display = "none";
}
function show(id){
    getElement(id).style.display = "inline";
}
function getElement(id){
    return document.getElementById(id);
}
function startMatch(){
    // initialize the game layout (setup a 3x3 grid for the users to click on to make a move, 
    // display each player's name, and display score. 
    // select a random player highlight the name of the user that needs to make a move
    show("matchPage");
    var gameboard = [null, null, null, null, null, null, null, null, null];
    matches.push(gameboard);
    currentPlayerIndex = getRandomInt(0,1);
    updateGUI();
}
function getRandomInt(num1, num2){ 
    // returns a random int in [num1, num2]
    return parseInt((Math.random()*(num2-num1+1))+num1);
}
function switchPlayerIndex(){ 
    // returns 0 if currentPlayerIndex is 1, otherwise 1
    currentPlayerIndex = (currentPlayerIndex + 1) % 2;
}
function move(positionIndex){ 
    // if isValidMove at positionIndex assigns playerIndex, if isGameOver is true update score
    // if isGameOver is false switch player, and then update GUI
    if(isValidMove(positionIndex) && !isGameOver()){
        lastMatch()[positionIndex] = currentPlayerIndex;
        switchPlayerIndex();
        if(isGameOver()){
            var winnerIndex = getMatchWinnerIndex();
            if(winnerIndex > -1) players[winnerIndex].score++; 
        }
    }
    updateGUI();
}
function isValidMove(positionIndex){
    // if the position in the gameboard is not selected and positionIndex is in the range [0,8] 
    // and game is not over, return true, otherwise return false
    return ((positionIndex >= 0) && (positionIndex < lastMatch().length) 
                    && (lastMatch()[positionIndex] == null));
}
function isGameOver(){
    // if no entry in the gameboard is available game is over, and it returns true;
    // if hasARow(playerIndex) is true, then game is over, and it returns true;
    // otherwise it returns false
    return ((getMatchWinnerIndex() > -1) || !isThereEmptySquare());
}
function hasARow(playerIndex){
    // return true if there is a row (Vertical, Horizontal, or Diagonal), otherwise return false
    var m = lastMatch();
    return ((playerIndex == m[0] && playerIndex == m[1] && playerIndex == m[2]) ||
                    (playerIndex == m[3] && playerIndex == m[4] && playerIndex == m[5]) ||
                    (playerIndex == m[6] && playerIndex == m[7] && playerIndex == m[8]) ||
                    (playerIndex == m[0] && playerIndex == m[3] && playerIndex == m[6]) ||
                    (playerIndex == m[1] && playerIndex == m[4] && playerIndex == m[7]) ||
                    (playerIndex == m[2] && playerIndex == m[5] && playerIndex == m[8]) ||
                    (playerIndex == m[0] && playerIndex == m[4] && playerIndex == m[8]) ||
                    (playerIndex == m[2] && playerIndex == m[4] && playerIndex == m[6]));
}
function getMatchWinnerIndex(){
    // return 0 if the first player is the winner, return 1 if the second player is the winner
    // return -1 if there is a tie
    if(hasARow(0)) return 0;
    else if(hasARow(1)) return 1;
    else return -1;
}
function updateGUI(){
    // simply update the grid and scores, and possibly highlight the player's name whose turn it is?
    getElement("player1NameLbl").innerHTML = players[0].name;
    getElement("player2NameLbl").innerHTML = players[1].name;
    getElement("player1NameLbl").style.backgroundColor = players[0].color;
    getElement("player2NameLbl").style.backgroundColor = players[1].color;
    getElement("scoreboard").innerHTML = players[0].score + " - " + players[1].score;
    updatePlayerTurn();
    var gameboard = lastMatch();
    for(var i = 0; i < gameboard.length; i++){
        if(gameboard[i] != null){
            setSquareColor(i, players[gameboard[i]].color);
        } else {
            setSquareColor(i, "blue");
        }
    }
}
function rematch(){
    // reset the match’s initial value (just keep the player’s information and scores)
    if(isGameOver()){
        for(var i = 0; i < lastMatch().length; i++){
            setSquareColor(i, "white");
        }
        startMatch();
    }
}
function updatePlayerTurn(){
    getElement("player1NameLbl").style.opacity = "0.2";
    getElement("player2NameLbl").style.opacity = "0.2";
    getElement("player" + (currentPlayerIndex + 1) + "NameLbl").style.opacity = "1";
}
function isThereEmptySquare(){
    for(var i = 0; i < lastMatch().length; i++){
        if(lastMatch()[i] == null){ 
            return true;
        }
    }
    return false;
}
function setSquareColor(index, color){
    getElement("square" + index).style.backgroundColor = color;
}
function lastMatch(){
    return matches[matches.length - 1];
}
function newGame(){
    players = []; // an array of two values (player1 and player2)
    color = null;
    matches = [];
    currentPlayerIndex = null;
    hide("matchPage");
    show("player1InfoPage");
    updateGUI();
}