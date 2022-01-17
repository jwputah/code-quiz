

// global variables
var questionIndex = 0;
var choicesIndex = 0;
var time = 70;
var intervalTimer;

var myQuestions = [
	{question: "Which of the following tags is used to insert a blank line?",
	choices: ["a. <br>", "b. <p>", "c. <blnk>", "d. <h1>"],
	answer: " a. <br>"
},
	{question: "The ___ tag set provides information to the browser about your webpage including the author name and keywords.",
	choices: ["a. <html></html>","b. <body></body>","c. <style></style>","d. <meta></meta>"],
	answer: "d. <meta></meta>"
},
	{question: "Items in a(n) ___ list are preceded by numbers.",
	choices: ["a. unordered","b. bulleted","c. ordered","d. grocery"],
	answer: "c. ordered"
},
	{question: "Images in your webpage may have the following extensions except",
	choices: ["a. .png","b. .gif","c. .jpg","d. .psd"],
	answer: "d. .psd"
},
	{question: "How do you add a comment in a CSS file?",
	choices: ["a. /* this is a comment */","b. // this is a comment //","c. // this is a comment","d. <! this is a comment>"],
	answer: "a. /* this is a comment */"
},
];

var timerDiv = document.getElementById("timer");

var highScore = document.getElementById("finalScore");
var finalScore = document.getElementById("results");

var startBtn = document.getElementById("startBtn");
var submit = document.getElementById("submitBtn")

var quizDiv = document.getElementById("quiz");
var resultsDiv = document.getElementById("results");

var choicesA = document.getElementById("btn0");
var choicesB = document.getElementById("btn1");
var choicesC = document.getElementById("btn2");
var choicesD = document.getElementById("btn3");

var initialInput = document.getElementById("initialInput");

var correctAnswer = 0;
var finalScore = [];

// function start timer
function newQuiz() {
	var startDiv = document.getElementById("startScreen");
	startDiv.setAttribute("class", "hide");
	quizDiv.removeAttribute("class");
	choicesDiv.removeAttribute("class");
    intervalTimer = setInterval(function() {
        time--;
        timerDiv.textContent = time;
        if(time <= 0) {
            clearInterval(intervalTimer);
            if (time < myQuestions.length - 1) {
            gameOver ();
           	}
        }
    },1000);
	timerDiv.textContent = time;

    getQuiz();
};

var titleElement = document.getElementById("title");
var choicesDiv = document.getElementById("choices");

// function get questions
function getQuiz () {

	 for (i=0; i<myQuestions.length; i++) {
		titleElement.textContent = myQuestions[i].question;
		choicesA.textContent = myQuestions[i].choices[0];
		choicesB.textContent = myQuestions[i].choices[1];
		choicesC.textContent = myQuestions[i].choices[2];
		choicesD.textContent = myQuestions[i].choices[3];
	}
}

function nextQuestion () {
	if  (myQuestions.choices === myQuestions.question) {
		console.log(myQuestions.choices);
		correctAnswer++;
		console.log("Correct", correctAnswer);
		resultsDiv.removeAttribute("class");
 		resultsDiv.textContent = "Correct!";
	
	} else {
		time -= 10;
		timerDiv.textContent = time;
		resultsDiv.removeAttribute("class");
		resultsDiv.textContent = "Wrong!";

	} if (questionIndex < myQuestions.length) {
		getQuiz ();

	} else {
		gameOver ();
	}
}

// function game over
function gameOver () {
	quizDiv.style.display = "none";
	choicesDiv.setAttribute("class", "hide");
	finalScore.textContent = ("Final Score!" + correctAnswer);
}
//add event listener
startBtn.addEventListener("click", newQuiz);
choicesA.addEventListener("click", nextQuestion);
choicesB.addEventListener("click", nextQuestion);
choicesC.addEventListener("click", nextQuestion);
choicesD.addEventListener("click", nextQuestion);
