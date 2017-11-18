//set variables
var letterBank = ['a','b','c','d','e','f','g','h',
'i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var hangmanWords = ["mulder", "scully", "aliens", "conspiracy", "paranormal", "monster", "believe"];

var randomWord = "";
//Holds letters in word
var lettersInWord = [];
//Holds number of blanks in word
var numBlanks = 0;
//Holds Blanks and successful guesses
var blanksAndSuccesses =[];
//Holds Wrong guesses
var wrongLetters = [];
//Counters
var winCount = 0;
var loseCount = 0;
var guessesLeft = 8;
var rightGuessCounter = 0;

//Functions

//function to call for reset when game ends

function reset()
{
	//randomize word
	randomWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
	//split method to get letters solo
	lettersInWord=randomWord.split('');
	//blank spaces in word
	numBlanks=lettersInWord.length;

	//reset
	lettersGuessed=0
	rightGuessCounter=0
	guessesLeft=8
	wrongLetters=[]
	blanksAndSuccesses=[]
	letterBank = ['a','b','c','d','e','f','g','h',
'i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	test=false;
	startGame();
}

//function to call to start game initially
function startGame() {

	//randomize word
	randomWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
	//split method to get letters solo
	lettersInWord=randomWord.split('');
	//blank spaces in word
	numBlanks=lettersInWord.length;

	//reset
	rightGuessCounter=0
	guessesLeft=8
	wrongLetters=[]
	blanksAndSuccesses=[]
	letterBank = ['a','b','c','d','e','f','g','h',
'i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

//put blanks into spaces

for (var i=0; i< numBlanks; i++)
{
	blanksAndSuccesses.push('_');
	document.getElementById('row4').innerHTML=blanksAndSuccesses;
}
//Dom Changes to HTML
document.getElementById('row4').innerHTML=blanksAndSuccesses;
document.getElementById('row5').innerHTML = guessesLeft;	
document.getElementById('row7').innerHTML = wrongLetters;
}

//see if users keys match any of words
function compareLetters(userKey)
{
				//If user key exist in choosen word then perform this function 
				if(randomWord.indexOf(userKey) > -1)
				{
					//Loops depending on the amount of blanks 
					for(var i = 0; i < numBlanks; i++)
					{
						//Fills in right index with user key
						if(lettersInWord[i] === userKey)
						{
							rightGuessCounter++;
							blanksAndSuccesses[i] = userKey;
							document.getElementById('row4').innerHTML = blanksAndSuccesses.join(' ');
						}	
					}
				}

				//Wrong Keys
				else
				{
					wrongLetters.push(userKey);
					guessesLeft--;
					//Changes HTML
					document.getElementById('row5').innerHTML = "Guess Left: " + guessesLeft;
					document.getElementById('row7').innerHTML = "Letters Guessed Wrong: " + wrongLetters;
					//Test / Debug
					console.log('Wrong Letters = ' + wrongLetters);
					console.log('Guesses left are ' + guessesLeft);
				}
			
}

//function for winning or losing
function winLose()
{
	// When number blanks if filled with right words then you win
	if(rightGuessCounter === numBlanks)
	{
		//Counts Wins 
		winCount++;
		//Changes HTML
		document.getElementById('wins').innerHTML = "Number of wins: " + winCount;
		alert('You win: The Truth is Out There!');
		reset();
	}
	// When number of Guesses reaches 0 then You lose
	else if(guessesLeft === 0)
	{
		//Counts losses
		loseCount++;
		//Changes HTML
		document.getElementById('row9').innerHTML = "Losses: " + loseCount;
		alert("You have been abducted by aliens, you lose!");
		reset();
	}
}


//function for starting up the game
startGame();

document.onkeyup = function(event)
{
	test = true;
	var letterGuessed = event.key;
	for(var i = 0; i < letterBank.length; i++)
	{	
		if(letterGuessed === letterBank[i] && test === true)
		{
			var spliceDword = letterBank.splice(i,1);
			//Test / Debug
			console.log('Double word is = ' + letterBank[i])
			console.log('Spliced Word is = ' + spliceDword);

			compareLetters(letterGuessed);
			winLose();
		}
	}		
		
}