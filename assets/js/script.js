
// global variables
var questionIndex = 0;
var time = 70;
var intervalTimer;

var myQuestions = [
	{
		question: "Which of the following tags is used to insert a blank line?",
		choices: ["a. <br>", "b. <p>", "c. <blnk>", "d. <h1>"],
		answer: "a. <br>"
	},
	{
		question: "The ___ tag set provides information to the browser about your webpage including the author name and keywords.",
		choices: ["a. <html></html>", "b. <body></body>", "c. <style></style>", "d. <meta></meta>"],
		answer: "d. <meta></meta>"
	},
	{
		question: "Items in a(n) ___ list are preceded by numbers.",
		choices: ["a. unordered", "b. bulleted", "c. ordered", "d. grocery"],
		answer: "c. ordered"
	},
	{
		question: "Images in your webpage may have the following extensions except",
		choices: ["a. .png", "b. .gif", "c. .jpg", "d. .psd"],
		answer: "d. .psd"
	},
	{
		question: "How do you add a comment in a CSS file?",
		choices: ["a. /* this is a comment */", "b. // this is a comment //", "c. // this is a comment", "d. <! this is a comment>"],
		answer: "a. /* this is a comment */"
	},
];

var timerDiv = document.getElementById("timer");

var finalScoreDiv = document.getElementById("finalScore");

var startBtn = document.getElementById("startBtn");

var submit = document.getElementById("submitBtn")

var quizDiv = document.getElementById("quiz");

var resultsDiv = document.getElementById("results");



var choicesA = document.getElementById("btn0");
var choicesB = document.getElementById("btn1");
var choicesC = document.getElementById("btn2");
var choicesD = document.getElementById("btn3");

var inputInitials = document.getElementById("inputInitials");

var correctAnswer = 0;

// function start timer
function newQuiz() {
	var startDiv = document.getElementById("startScreen");
	startDiv.setAttribute("class", "hide");
	choicesDiv.removeAttribute("class");
	intervalTimer = setInterval(function () {
		time--;
		timerDiv.textContent = time;
		if (time <= 0) {
			clearInterval(intervalTimer);
			if (questionIndex < myQuestions.length - 1) {
				gameOver();
			}
		}

	}, 1000);
	timerDiv.textContent = time;

	startQuiz();
};

var titleElement = document.getElementById("title");
var choicesDiv = document.getElementById("choices");

// function get questions
function startQuiz() {
	quizDiv.removeAttribute("class", "hide");
	titleElement.textContent = myQuestions[questionIndex].question;
	choicesA.textContent = myQuestions[questionIndex].choices[0];
	choicesB.textContent = myQuestions[questionIndex].choices[1];
	choicesC.textContent = myQuestions[questionIndex].choices[2];
	choicesD.textContent = myQuestions[questionIndex].choices[3];
}

function nextQuestion(answer) {
	if (myQuestions[questionIndex].answer === myQuestions[questionIndex].choices[answer]) {
		correctAnswer++;
		console.log("Correct", correctAnswer);
		resultsDiv.removeAttribute("class");
		resultsDiv.textContent = "Correct!";

	} else {
		time -= 10;
		timerDiv.textContent = time;
		console.log("Correct", correctAnswer);
		resultsDiv.removeAttribute("class");
		resultsDiv.textContent = "Wrong!";
	}

	questionIndex++;

	if (questionIndex < myQuestions.length) {
		startQuiz ();

	} else {
		gameOver ();
	}
}

function userA() { nextQuestion(0); }
function userB() { nextQuestion(1); }
function userC() { nextQuestion(2); }
function userD() { nextQuestion(3); }

// function game over
function gameOver() {
	clearInterval(intervalTimer);
	resultsDiv.setAttribute("class", "hide");
	quizDiv.setAttribute("class", "hide");
	choicesDiv.setAttribute("class", "hide");
	finalScoreDiv.removeAttribute("class", "hide");
	var finalScore = document.getElementById("correctAnswerResults");
	finalScore.textContent = correctAnswer;
}

function userScore () {
	if (inputInitials.value === "") {
		alert("Please enter your initials");
		return;
	}

	finalScoreDiv.setAttribute("class", "hide");
	resultsDiv.removeAttribute("class", "hide");

	resultsDiv.textContent = correctAnswer;

	userInitials = JSON.stringify(inputInitials.value);
	userInitials = localStorage.setItem(userInitials, correctAnswer);
}

//function show high score
function highScore() {


}
//add event listener
startBtn.addEventListener("click", newQuiz);
choicesA.addEventListener("click", userA);
choicesB.addEventListener("click", userB);
choicesC.addEventListener("click", userC);
choicesD.addEventListener("click", userD);
submitBtn.addEventListener("click", userScore);
