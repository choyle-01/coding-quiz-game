var startEl = document.querySelector("#startPage");
var gameEl = document.querySelector("#gamePage");
var endEl = document.querySelector("#endPage");
var questionsEl = document.querySelector("#questions");

var startBtn = document.querySelector("#startBtn");
var initialsInput = document.querySelector("#initials");

var questionIndex = 0;

var titleEl = document.querySelector("#title");

function renderQuestion() {
  var question = questions[questionIndex];
  var currentQuestion = question.question;
  titleEl.textContent = currentQuestion;
  questionsEl.innerHTML = '';

  for (var i = 0; i < question.possible.length; i++) {
    var item = question.possible[i];
    var answerBtn = document.createElement("button");
    // node.dataset.value = key;
    answerBtn.textContent = i + 1 + ". " + item;
    questionsEl.appendChild(answerBtn);
  }
}

var questions = [
  {
    question: "Lorem ipsum dolor",
    possible: ["curly brackets", "parentheses", "block", "example"],
    correct: 2,
  },
  {
    question: "Lorem ipsum dolor sit",
    possible: ["5", "6", "7", "8"],
    correct: 3,
  },
  {
    question: "Lorem ipsum dolor sit amet",
    possible: ["9", "10", "11", "12"],
    correct: 0,
  },
];

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
