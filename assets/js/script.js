
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
		question: "Javascript is an _______ language?",
		choices: ["a. Object-Oriented", "b. Object-Based", "c. Procedural", "d. None of the above."],
		answer: "a. Object-Oriented"
	},
	{
		question: "Items in a(n) ___ list are preceded by numbers.",
		choices: ["a. unordered", "b. bulleted", "c. ordered", "d. grocery"],
		answer: "c. ordered"
	},
	{
		question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
		choices: ["a. Gives a warning", "b. Throws an error", "c. Ignores the statements", "d. None of the above."],
		answer: "c. Ignores the statements"
	},
	{
		question: "What keyword is used to check whether a given property is valid or not?",
		choices: ["a. in", "b. is in", "c. lies", "d. check"],
		answer: "a. in"
	},
	{
		question: "What is the use of the <noscript> tag in Javascript?",
		choices: ["a. The contents are displayed in non-JS-based browsers.", "b. Clears all the cookies and cache.", "c. Both A and B.", "d. None of the above."],
		answer: "a. The contents are displayed in non-JS-based browsers."
	},
	{
		question: "When an operators value is NULL, the typeof returned by the unary operator is:",
		choices: ["a. Boolean", "b. Integer", "c. Undefined", "d. Object"],
		answer: "d. Object"
	},
	{
		question: "The process in which an object or data structure is translated into a format suitable for transferral over a network, or storage is called?",
		choices: ["a. Object Serialization", "b. Object Encapsulation", "c. Object Inheritance", "d. None of the above."],
		answer: "a. Object Serialization"
	},
	{
		question: "Which function is used to serialize an object into a JSON string in Javascript?",
		choices: ["a. stringify()", "b. convert()", "c. parse()", "d. None of the above."],
		answer: "a. stringify()"
	},
	{
		question: "Which of the following are closures in Javascript?",
		choices: ["a. Variables", "b. Functions", "c. Objects", "d. All of the above."],
		answer: "d. All of the above."
	}
];

var timerDiv = document.getElementById("timer");
var finalScoreDiv = document.getElementById("finalScore");
var startBtn = document.getElementById("startBtn");
var submit = document.getElementById("submitBtn")
var quizDiv = document.getElementById("quiz");
var resultsDiv = document.getElementById("results");
var answerDiv = document.getElementById("answer");
var choicesDiv = document.getElementById("choices");
var userInitials = document.getElementById("highScore");
var titleElement = document.getElementById("title");
var backBtn = document.getElementById("backBtn");
var inputInitials = document.getElementById("inputInitials");

var choicesA = document.getElementById("btn0");
var choicesB = document.getElementById("btn1");
var choicesC = document.getElementById("btn2");
var choicesD = document.getElementById("btn3");

var correctAnswer = 0;

// function start timer.
function newQuiz() {
	window.alert("70 seconds on the clock. Wrong answers -10 seconds off the clock.");
	var startDiv = document.getElementById("startScreen");
	startDiv.setAttribute("class", "hide");
	titleElement.removeAttribute("class", "hide");
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

// function get questions.
function startQuiz() {
	quizDiv.removeAttribute("class", "hide");
	answerDiv.removeAttribute("class", "hide");
	titleElement.textContent = myQuestions[questionIndex].question;
	choicesA.textContent = myQuestions[questionIndex].choices[0];
	choicesB.textContent = myQuestions[questionIndex].choices[1];
	choicesC.textContent = myQuestions[questionIndex].choices[2];
	choicesD.textContent = myQuestions[questionIndex].choices[3];
};

// function to get next question.
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
};

function userA() { nextQuestion(0); }
function userB() { nextQuestion(1); }
function userC() { nextQuestion(2); }
function userD() { nextQuestion(3); }

// function game over
function gameOver() {
	clearInterval(intervalTimer);
	titleElement.setAttribute("class", "hide");
	resultsDiv.setAttribute("class", "hide");
	quizDiv.setAttribute("class", "hide");
	choicesDiv.setAttribute("class", "hide");
	finalScoreDiv.removeAttribute("class", "hide");
	var finalScore = document.getElementById("correctAnswerResults");
	finalScore.textContent = correctAnswer;
};

function userScore () {
	if (inputInitials.value === "") {
		alert("Please enter your initials");
		return;
	}

	finalScoreDiv.setAttribute("class", "hide");
	resultsDiv.removeAttribute("class", "hide");
	resultsDiv.textContent = "You Scored: "+  correctAnswer;
	userInitials = localStorage.setItem("user", inputInitials.value);
	newScore = localStorage.setItem("score", correctAnswer);
};

//function show high score
function getHighscore() {
	var highScore = localStorage.getItem("score");
	var newUser = localStorage.getItem("user");
	resultsDiv.textContent = "High Score:"+'  '+newUser+' - '+highScore;
	finalScoreDiv.setAttribute("class", "hide");
	startBtn.setAttribute("class", "hide");
	titleElement.setAttribute("class", "hide");
	resultsDiv.removeAttribute("class", "hide");
	backBtn.removeAttribute("class", "hide");
	console.log(newUser);
	console.log(highScore);
};

//add event listener
highScore.addEventListener("click", getHighscore);
startBtn.addEventListener("click", newQuiz);
choicesA.addEventListener("click", userA);
choicesB.addEventListener("click", userB);
choicesC.addEventListener("click", userC);
choicesD.addEventListener("click", userD);
submitBtn.addEventListener("click", userScore);
backBtn.addEventListener('click', function(){location.reload()});
