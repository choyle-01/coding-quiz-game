var startEl = document.querySelector("#startPage");
var gameEl = document.querySelector("#gamePage");
var endEl = document.querySelector("#endPage");
var startBtn = document.querySelector("#startBtn");
var initialsInput = document.querySelector("#initials");
var questionsEl = document.querySelector("#question");
var answerBtns = document.querySelector("#answer-buttons");
var nextBtn = document.querySelector("#next-btn");
var cursor = 0;
var score = startTimer();

var shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener("click", game);

var questions = [
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
];

function start() {
  startEl.style.display = "block";
  gameEl.style.display = "none";
  endEl.style.display = "none";
}
function game() {
  startEl.style.display = "none";
  gameEl.style.display = "block";
  endEl.style.display = "none";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
//   startTimer();
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionsEl.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtns.appendChild(button);
  });
}

function resetState() {
  nextBtn.classList.add("hide");
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function selectAnswer() {}

function startTimer() {
  var sec = 75;
  var timer = setInterval(function () {
    document.getElementById("timerDisplay").innerHTML = sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
    }
  }, 1000);
  return sec;
}

function end() {
  startEl.style.display = "none";
  gameEl.style.display = "none";
  endEl.style.display = "block";
}

start();
