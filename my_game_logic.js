// the index of this array maps to the color of the cell with that index as the id
underlying_color = ['red', 'green', 'blue', 'purple', 'orange', 'yellow','red', 'green', 'blue', 'purple', 'orange', 'yellow']; 

//global variables listed below
MATCHED_COLORS = [];
MATCHED_CELLS = [];
WINNING_SCORE_THRESHOLD = 4;
CURRENT_PLAYER = 1;
TURN_DONE = false;
PLAYER1_SCORE = 0;
PLAYER2_SCORE = 0;
PLAYER1_COLOR = "";
PLAYER2_COLOR = "";
FIRST_SELECTED_CELL_ID = null;
GAME_STARTED = false; 
 
 

//startGame shuffles the order of the elements in the array underlying_color and sets GAME_STARTED to true
//This function also hides the players' information pages, and unhides the grid of which the game
//takes place on as well as the player names
function startGame(){
  if (validatePlayerInfo() == false)
    return;

  if (PLAYER2_COLOR == "" || PLAYER1_COLOR == "")
    return;

  hide("player2infopage");
  hide("startBtn");
  unhide("heading");
  getElement("player1Name").innerHTML = getElement("player1nameinput").value;
  getElement("player2Name").innerHTML = getElement("player2nameinput").value;
  randStartingPlayer();
  if(CURRENT_PLAYER == 1){
    getElement("player1Name").className = PLAYER1_COLOR;
    getElement("player2Name").className = "white";
  }else{
    getElement("player1Name").className = "white";
    getElement("player2Name").className = PLAYER2_COLOR;
  }
  document.getElementById ("grid").style.visibility = "visible";
  GAME_STARTED = true;
  //referenced https://javascript.info/task/shuffle
	underlying_color = underlying_color.sort(() => Math.random() - 0.5);
}

function randStartingPlayer(){
  if(Math.random()>0.5){
    CURRENT_PLAYER = 1;
  }else{
    CURRENT_PLAYER = 2;
  }
}

//This function makes sure that the entered name is not solely comprised of spaces, and that the second player's
//entered name doesn't match the first player's entered name. 
//This also ensures that player 1 and player 2 have entered a color
function validatePlayerInfo(){
  p1_entered_name = getElement("player1nameinput").value;
  if(p1_entered_name ==null || p1_entered_name.trim() == ""){
    alert("Please type a non-space character");
    return false;
  }
  if(PLAYER1_COLOR == ""){
    alert("Please select a color");
    return false;
  }
  //Currently player 2 is entering name
  on_p2_page = getElement("player2infopage").style.display == "inline";
  if (on_p2_page) {
    p2_entered_name = getElement("player2nameinput").value;
    if(p2_entered_name ==null || p2_entered_name.trim() == ""){
      alert("Please type a non-space character");
      return false;
    }
    if(p1_entered_name.trim() == p2_entered_name.trim()){
      alert("Please choose a different name");
      return false;
    }
    if(PLAYER2_COLOR == ""){
      alert("Please select a color");
      return false;
    }
  }
  else {
    hide("player1infopage");
    hide("infoBtn");
    unhide("player2infopage");
    unhide("startBtn");
  }
}

//This function records the color chosen by each player.
//It also ensures that the second player's choice of color doesn't equate to the first player's
function setColor(id){
  on_p2_page = getElement("player2infopage").style.display == "inline";
  if (on_p2_page){
    PLAYER2_COLOR = getElement(id).className;
    if(PLAYER2_COLOR == PLAYER1_COLOR){
      alert("Please choose a different color");
      return false;
    }
  }else{
    PLAYER1_COLOR = getElement(id).className;
  }
}

//Function created by Arman Banimahd
function getElement(id){
  return document.getElementById(id);
}

//Function created by Arman Banimahd
function get_idx_from_cell_id(cell_id){
	return cell_id.substr(4) - 1;
}

//Function created by Arman Banimahd
function hide(id){
  getElement(id).style.display = "none";
}

//Function created by Arman Banimahd
function unhide(id){
  getElement(id).style.display = "inline";
}

//This function hides the starting page and unhides player 1's information page
function begin(){
  hide("title");
  hide("beginBtn");
  unhide("player1infopage");
  unhide("infoBtn");
}

//This function changes the color of the square
function makeMove(cell_id){
  //During a turn, a clicked square will reveal a color
  if (TURN_DONE || !GAME_STARTED) 
    return;

  // cell is already uncovered and its color is exposed, take no action
  AlreadyUncovered = MATCHED_CELLS.includes(get_idx_from_cell_id(cell_id)) || FIRST_SELECTED_CELL_ID == cell_id;
  if (AlreadyUncovered){
    alert("Please choose a covered (white) cell")
    return;
  }
    
  // color the cell
  color = underlying_color[get_idx_from_cell_id(cell_id)];
  getElement(cell_id).style.backgroundColor = color;
  //This if-statement checks to see if this is the first square the player has selected
  //out of the two selections a user is allowed to make
  if (FIRST_SELECTED_CELL_ID == null){
    	FIRST_SELECTED_CELL_ID = cell_id;
  } else {
  //This comes in action if this is the second square the player has selected.
  //It checks to see if the colors of the underlying colors of the two selected squares
  //match as well as ends the turn. 
    TURN_DONE = true;
    checkIfColorsMatch(cell_id);
    setTimeout(switchTurns, 750);
  }
}

//This function changes the player's turn and resets unmatched cells of the grid to white
function switchTurns(){
	if (CURRENT_PLAYER == 1) {
  	CURRENT_PLAYER = 2;
    getElement("player2Name").className = PLAYER2_COLOR;
    getElement("player1Name").className = "white";
  } else {
     CURRENT_PLAYER = 1;
     getElement("player1Name").className = PLAYER1_COLOR;
     getElement("player2Name").className = "white";
  }

  TURN_DONE = false;
  FIRST_SELECTED_CELL_ID = null;
  colorGrid();
}


//This function colors the whole grid whatever color is implemented into the parameter besides the cells on the
//grid that match
function colorGrid(){
  for (var j = 1; j <= underlying_color.length; j++) {
    if (!MATCHED_CELLS.includes(j-1)){
      getElement("cell" + j).style.backgroundColor = "white";
    }
  }
}

//This function checks to see if the game is over and will display a congratulations screen for the player won
//or "It's a tie!!" if the score is 3-3.
function checkScoreThreshold() {
	if (CURRENT_PLAYER == 1 && PLAYER1_SCORE == WINNING_SCORE_THRESHOLD || CURRENT_PLAYER == 2 && PLAYER2_SCORE == WINNING_SCORE_THRESHOLD){
    hide("grid");
    hide("heading");
    getElement("congratulations").innerHTML = "Congratulations to " + getElement(`player${CURRENT_PLAYER}Name`).innerHTML + "!"
    unhide("congratulations");
    unhide("restartBtn");
  }
  if (PLAYER1_SCORE == 3 && PLAYER2_SCORE == 3){
    hide("grid");
    hide("heading");
    unhide("tie");
    unhide("restartBtn");
  }
}

//This function is responsible for checking if the colors match and scoring for the turn
function checkIfColorsMatch(cell_id){
  fcell_id = get_idx_from_cell_id(FIRST_SELECTED_CELL_ID)
  scell_id = get_idx_from_cell_id(cell_id)
	first_cell_color = underlying_color[fcell_id];
  second_cell_color = underlying_color[scell_id];
	if (first_cell_color == second_cell_color && !MATCHED_COLORS.includes(first_cell_color)){
    MATCHED_CELLS.push(fcell_id);
    MATCHED_CELLS.push(scell_id);
  	if (CURRENT_PLAYER == 1)
    	PLAYER1_SCORE += 1;
    else
      PLAYER2_SCORE += 1;
    MATCHED_COLORS.push(first_cell_color);
  }
  getElement("scoreboard").innerHTML = PLAYER1_SCORE + " VS " + PLAYER2_SCORE;
  checkScoreThreshold();
}

//This function reloads the page, and restarts the game from the beginning screen.
function restart(){
  location.reload();
}