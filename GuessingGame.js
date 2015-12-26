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
	$("#userguess").val("");

	if(guesses.length==5){
		$("#message").text("Sorry, you're out of tries :(");
	} else {

		if (isNaN(playersGuess)==true){
			$("#message").text("Ey, whatchu doing? That's not even a number!");
		
		} else if (isNaN(playersGuess)==false && guesses.indexOf(playersGuess)==-1){
			guesses.push(playersGuess);
			numOfGuesses--;
			$("#numberofguesses").text(numOfGuesses);
			checkGuess();
		
		} else if (isNaN(playersGuess)==false && guesses.indexOf(playersGuess)!=-1){
			$("#message").text("You already guessed " + playersGuess + ", try another number!");
		}
	}

}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	var gss = "You're warm. Your guess is in a ";
	var unit = " unit range!";
	var cold = "You're so far, you're ice cold.";
	var last = "This was your last try. :( And the right answer was ";
	var difference = Math.abs(winningNumber-playersGuess);
	
	if (difference<=10){
		$("#message").text(gss+"10" +unit);
	}
	else if (difference<=20){
		$("#message").text(gss+"20" +unit);
	}
	else {
		$("#message").text(cold);
	}

	if (numOfGuesses==0){
		$("#message").text(last + winningNumber+".");
	}


}

// Check if the Player's Guess is the winning number 

function checkGuess() {

	if (playersGuess==winningNumber) {
			$("#winner").text("!!! IT'S YOU. YOU WON !!!");
			alert("WE HAVE A WINNER!!!");
			//add some sick congratulatory elements
	} else {
			lowerOrHigher();
	}
}

//Fisher-Yates Shuffle algorithm, retrieved from:
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
	$("#numberofguesses").text(numOfGuesses);
	
	//can also use onClick="windown.location.reload()" in html
	//but the page blinks and it's ugly
}

/* **** Event Listeners/Handlers **** */

$(document).keypress(function(e) {
    if(e.which == 13) {
        playersGuessSubmission();
    }
});
