// all javaScript variables are declared 
var startEl = document.querySelector("#startPage");
var gameEl = document.querySelector("#gamePage");
var endEl = document.querySelector("#endPage");
var questionsEl = document.querySelector("#questions");
var timerTime = document.querySelector("#timerDisplay");
var startBtn = document.querySelector("#startBtn");
var initialsInput = document.querySelector("#initials");
var seconds = 75;
var questionIndex = 0;
var titleEl = document.querySelector("#title");
var rightOrWrong = document.querySelector("#correct-incorrect");
var submitBtn = document.querySelector("#submit");
var finalScore = document.querySelector("#score");
var timer;

// questions that will be displayed and used in the quiz

var questions = [
  {
    question: "Which of the following is a javaScript data type?",
    possible: ["curly brackets", "parentheses", "block", "number"],
    correct: "number",
  },
  {
    question: "What is the capitalization case in javaScript called?",
    possible: ["camelCasing", "kangarooCasing", "curlyCasing", "coolioCasing"],
    correct: "camelCasing",
  },
  {
    question: "What company created javaScript?",
    possible: ["Microsoft", "Google", "Bing", "Netscape"],
    correct: "Netscape",
  },
];

var personScore = {
  Name: initialsInput,
  Score: finalScore,
};

// function and for loop that will display questions and cycle through questions after they have been answered 

function renderQuestion() {
  var question = questions[questionIndex];
  var currentQuestion = question.question;
  titleEl.textContent = currentQuestion;
  questionsEl.innerHTML = "";

  for (var i = 0; i < question.possible.length; i++) {
    var item = question.possible[i];
    var answerBtn = document.createElement("button");
    answerBtn.textContent = item;
    questionsEl.appendChild(answerBtn);
    answerBtn.textContent = item;
    answerBtn.addEventListener("click", function () {
      checkAnswer(this.textContent);
    });
  }
}

// function to check if the question is correct or not and display that to the player

function checkAnswer(possible) {
  var correctAnswer = questions[questionIndex].correct;
  if (possible != correctAnswer) {
    rightOrWrong.textContent = "Incorrect!";
    seconds = Math.max(seconds - 12, 0);
  } else {
    rightOrWrong.textContent = "Correct!";
  }
  resultDiv.style.display = "block";
}

// these functions determine what state the game is in and what fuctions run during each state

function startScreen() {
  startEl.style.display = "block";
  gameEl.style.display = "none";
  endEl.style.display = "none";
}

function gameScreen() {
  startEl.style.display = "none";
  gameEl.style.display = "block";
  endEl.style.display = "none";

  renderQuestion();
  timerTime.textContent = seconds;
  timer = setInterval(function () {
    seconds--;
    timerTime.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}

function endScreen() {
  startEl.style.display = "none";
  gameEl.style.display = "none";
  endEl.style.display = "block";
  finalScore.textContent = seconds;
}

function init() {
  startScreen();
}

startBtn.addEventListener("click", gameScreen);
gameEl.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    console.log(event.target);
    questionIndex++;
    if (questionIndex < questions.length) {
      renderQuestion();
    } else {
      endScreen();
      clearInterval(timer);
    }
  }
});

// suposed to get the scores sent to local storage



function handleInitialSubmit(event) {
  event.preventDefault();

  var stored = JSON.parse(localStorage.getItem("highScores")) || [];
  var updatedScores = stored.concat({
    score: score,
    initials: initialsInput.value,
  });

  localStorage.setItem("highScores", JSON.stringify(updatedScores));
}

localStorage.setItem("personScore", JSON.stringify(personScore));

// submitBtn.addEventListener('click', handleInitialSubmit)

init();
