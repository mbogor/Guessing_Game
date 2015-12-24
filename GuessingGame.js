/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess;
var winningNumber = generateWinningNumber();
var guesses = [];
var numOfGuesses = 5;



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	winningNumber = Math.ceil(Math.random()*100);
	return winningNumber;
};

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = +$("#userguess").val();
	if (guesses.indexOf(playersGuess)==-1){
		guesses.push(playersGuess);
		numOfGuesses--;
	}else{
		$("#message").text("You already guessed that, try again!");
	}
	$("#userguess").val("");
	checkGuess();
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	//give more specific hints
	if (playersGuess>winningNumber==true){
		$("#message").text("Too High! Try Again.");
	} else {
		$("#message").text("Too Low! Try Again.");
	}

	$("#numberofguesses").text(numOfGuesses);

}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	if (guesses.length<6){
		if (playersGuess==winningNumber){
			$("#message").text("YOU WON!!!");
			//add some sick congratulatory elements
		} else{
			lowerOrHigher();
		}
	}else{
		$("#message").text("Sorry, you're out of tries :(");
	}
}


//Fisher-Yates Shuffle algorithm
//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
	var hintarr = [winningNumber];
	for (var i=numOfGuesses;i>0;i--){
		hintarr.push(Math.ceil(Math.random()*100));
	}
	hintarr=shuffle(hintarr);
	$("#message").text(hintarr);

}

// Allow the "Player" to Play Again

function playAgain(){
	winningNumber = generateWinningNumber();
	guesses = [];
	numOfGuesses = 5;
	//page needs to refresh after this; add method
}


/* **** Event Listeners/Handlers **** */
