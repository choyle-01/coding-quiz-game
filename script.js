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
var rightOrWrong = document.querySelector("#correct-incorrect")
var questions = [
  {
    question: "Lorem ipsum dolor",
    possible: ["curly brackets", "parentheses", "block", "example"],
    correct: "parentheses",
  },
  {
    question: "Lorem ipsum dolor sit",
    possible: ["5", "6", "7", "8"],
    correct: "6",
  },
  {
    question: "Lorem ipsum dolor sit amet",
    possible: ["9", "10", "11", "12"],
    correct: "11",
  },
];

function renderQuestion() {
  var question = questions[questionIndex];
  var currentQuestion = question.question;
  titleEl.textContent = currentQuestion;
  questionsEl.innerHTML = "";

  for (var i = 0; i < question.possible.length; i++) {
    var item = question.possible[i];
    var answerBtn = document.createElement("button");
    // node.dataset.value = key;
    answerBtn.textContent = item;
    questionsEl.appendChild(answerBtn);
    answerBtn.textContent = item;
    answerBtn.addEventListener("click", function() {
        checkAnswer(this.textContent);
    })
  }
}

function checkAnswer(possible) {
    var correctAnswer = questions[questionIndex].correct
    if (possible != correctAnswer) {
        rightOrWrong.textContent = 'Incorrect!';
        seconds = Math.max(seconds - 15, 0);
    }
    else {
        rightOrWrong.textContent = 'Correct!';
    }
    resultDiv.style.display = "block";
}

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
  var timer = setInterval(function () {
    seconds--;
    timerTime.textContent = seconds;
    if (seconds < 0) {
      clearInterval(timer);
    }
  }, 1000);
}

function endScreen() {
  startEl.style.display = "none";
  gameEl.style.display = "none";
  endEl.style.display = "block";
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
    }
  }
});

init();
