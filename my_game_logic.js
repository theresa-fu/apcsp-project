// the index of this array maps to the color of the cell with that index as rthe id
underlying_color = ['red', 'green', 'blue', 'purple', 'orange', 'yellow','red', 'green', 'blue', 'purple', 'orange', 'yellow']; 

matched_colors = []
matched_cells = []
WINNING_SCORE_THRESHOLD = 2
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
    console.log(matched_cells)
    for (var j = 1; j <= 12; j++) {
      if (!matched_cells.includes(j-1))
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
  fcell_id = get_idx_from_cell_id(first_selected_cell_id)
  scell_id = get_idx_from_cell_id(second_cell_id)
	first_cell_color = underlying_color[fcell_id];
  second_cell_color = underlying_color[scell_id];
  console.log(first_cell_color, second_cell_color)
	if (first_cell_color == second_cell_color && !matched_colors.includes(first_cell_color)){
    matched_cells.push(fcell_id);
    matched_cells.push(scell_id);
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


// // the index of this array maps to the color of the cell with that index as the id
// underlying_color = ['red', 'green', 'blue', 'purple', 'orange', 'yellow','red', 'green', 'blue', 'purple', 'orange', 'yellow']; 

// //global variables listed below
// MATCHED_COLOR = [];
// WINNING_SCORE_THRESHOLD = 2;
// MATCHED_CELLS = new Set();
// CURRENT_PLAYER= 1;
// TURN_DONE = false;
// PLAYER1_SCORE = 0;
// PLAYER2_SCORE = 0;
// FIRST_SELECTED_CELL_ID= null;
// //Second selected ID will be stored as a parameter within function colorMatch
// GAME_STARTED= false;
 
// // referenced https://javascript.info/task/shuffle
// // startGame shuffles the order of the elements in the array underlying_color
// function startGame(){
// 	underlying_color = underlying_color.sort(() => Math.random() - 0.5);
//   GAME_STARTED = true;
// }

// function get_idx_from_cell_id(cell_id){
//   return cell_id.substr(4) - 1;
// }

// function getElement(id){
//     return document.getElementById(id);
// }

// function hide(id){
//   getElement(id).style.display = "none";
// }

// function unhide(id){
//  getElement(id).style.display = "inline";
// }

// //This function changes the color of the square
// function setCellColor(cell_id){
//   //During a turn, a clicked square will reveal a color
// 	if (TURN_DONE||!GAME_STARTED) return;
// 		var color = underlying_color[get_idx_from_cell_id(cell_id)];
    
//   getElement(cell_id).style.backgroundColor = color;

//   //This if-statement checks to see if this is the first square the player has selected
//   //out of the two selections a user is allowed to make
//   if (FIRST_SELECTED_CELL_ID == null) {
//     FIRST_SELECTED_CELL_ID = cell_id;
//   } else {
//   //This comes in action if this is the second square the player has selected.
//   //It checks to see if the colors of the underlying colors of the two selected squares
//   //match as well as ends the turn.
//     colorMatch(cell_id);
//     TURN_DONE = true;
//   }
// }

// //This function colors the whole grid whatever color is implemented in the parameter
// function colorGrid(color){
//   for(var j = 1; j <= 12; j++) {
//     if (!MATCHED_CELLS.has(j))
//       getElement("cell" + j).style.backgroundColor = color;
//   }
// }

// //This function switches the current player's turn and resets the grid to white 
// function switchTurns(){
// 	if (CURRENT_PLAYER == 1) {
//   	CURRENT_PLAYER = 2;
//   } else {
//      CURRENT_PLAYER = 1;
//   }
//   TURN_DONE = false;
//   FIRST_SELECTED_CELL_ID= null;
//   colorGrid('white');
// }

// //
// function checkScoreThreshold() {
// 	if (CURRENT_PLAYER == 1 && PLAYER1_SCORE == WINNING_SCORE_THRESHOLD || CURRENT_PLAYER == 2 && PLAYER2_SCORE== WINNING_SCORE_THRESHOLD){
//     	hide("grid");
//       unhide("winning_image");
//       unhide("congrats");
//    }
// }

// function colorMatch(second_cell_id){
//   first_cell_id = get_idx_from_cell_id(FIRST_SELECTED_CELL_ID);
//   second_cell_id = get_idx_from_cell_id(second_cell_id);
// 	first_cell_color = underlying_color[first_cell_id];
//   second_cell_color = underlying_color[second_cell_id];
//   // console.log(first_cell_color, second_cell_color);
// 	if (first_cell_color == second_cell_color && !MATCHED_COLOR.includes(first_cell_color)){
//     MATCHED_CELLS.add(first_cell_id);
//     MATCHED_CELLS.add(second_cell_id);
//     console.log(MATCHED_CELLS)
//   	if (CURRENT_PLAYER== 1) {
//     	PLAYER1_SCORE += 1;
//     } else {
//     	// assert(current_player == 2);
//       PLAYER2_SCORE += 1;
//     }
//     MATCHED_COLOR.push(first_cell_color);
//   }
//   getElement("scoreboard").innerHTML = PLAYER1_SCORE + "VS " + PLAYER2_SCORE;
//   checkScoreThreshold();
// }
