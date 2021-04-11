// the index of this array maps to the color of the cell with that index as rthe id
underlying_color = ['red', 'green', 'blue', 'purple', 'orange', 'yellow','red', 'green', 'blue', 'purple', 'orange', 'yellow']; 

matched_colors = []
WINNING_SCORE_THRESHOLD = 1
current_player = 1
turn_done = false
player1_score = 0 
player2_score = 0 
first_selected_cell_id = null
gameStarted = false 
 
 
// referenced https://javascript.info/task/shuffle
function startGame(){
	underlying_color = underlying_color.sort(() => Math.random() - 0.5);
  gameStarted = true;
}


function getElement(id){
    return document.getElementById(id);
}

function get_idx_from_cell_id(cell_id){
		return cell_id.substr(4) - 1;
}

function setCellColor(cell_id){
		if (turn_done || !gameStarted) return;
		color = underlying_color[get_idx_from_cell_id(cell_id)];
    //console.log(player1_score, first_selected_cell_id, cell_id, cell_number);
    getElement(cell_id).style.backgroundColor = color;

  	// this is the first selection within the current turn
  	if (first_selected_cell_id == null) {
    	first_selected_cell_id = cell_id;
    } else {
    	// turn is complete, score and switch players
    	colorMatch(cell_id);
      turn_done = true;
    }
}


function colorGrid(color){
    for (var j = 1; j <= 12; j++) {
        getElement("cell" + j).style.backgroundColor = color;
    }
}

function switchTurns() {
	if (current_player == 1) {
  	current_player = 2;
  } else {
  	//  assert(current_player == 2);
     current_player = 1;
  }
  turn_done = false;
  first_selected_cell_id = null;
  colorGrid('white');
}

function hide(id){
            getElement(id).style.display = "none";
}

function unhide(id){
getElement(id).style.display = "inline";
}

function checkScoreThreshold() {
	if (current_player == 1 && player1_score == WINNING_SCORE_THRESHOLD || current_player == 2 && player2_score == WINNING_SCORE_THRESHOLD){
    	hide("grid")
      unhide("winning_image")
   }
}

function colorMatch(second_cell_id){
	first_cell_color = underlying_color[get_idx_from_cell_id(first_selected_cell_id)];
  second_cell_color = underlying_color[get_idx_from_cell_id(second_cell_id)];
  console.log(first_cell_color, second_cell_color)
	if (first_cell_color == second_cell_color && !matched_colors.includes(first_cell_color)){
  	if (current_player == 1) {
    	player1_score += 1;
    } else {
    	// assert(current_player == 2);
      player2_score += 1;
    }
    matched_colors.push(first_cell_color);
  }
  getElement("scoreboard").innerHTML = player1_score + "VS " + player2_score;
  checkScoreThreshold();

}
