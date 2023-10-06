const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Which one is the smallest ocean in the world?",
    choice1: "<Indian>",
    choice2: "<Pacific>",
    choice3: "<Atlantic>",
    choice4: "<Arctic>",
    answer: 4
  },
  {
    question:
      "In which Country , White elephant is found?",
    choice1: "<India>",
    choice2: "<Sri Lanka>",
    choice3: "<Thailand>",
    choice4: "<Africa>",
    answer: 3
  },
  {
    question: " Who is known as Father of Indian Constitution?",
    choice1: "Dr. B. R. Ambedkar",
    choice2: "APJ Abdul Kalam",
    choice3: "Jawaharlal Nehru ",
    choice4: "Mahatma Gandhi",
    answer: 1
  },
  {
    question: " The first Prime Minister Jawaharlal Nehru raised the Indian National Flag on 15 August, 1947 which of the following gates of the Red Fort?",
    choice1: "Lahori Gate",
    choice2: "Delhi Gate",
    choice3: "Kashmir Gate",
    choice4: "None of these",
    answer: 1
  },
  {
    question: "  Who built the city Fathepur Sikri (City of Victory) ?",
    choice1: "Shah Jahan",
    choice2: "Akbar",
    choice3: "Babar ",
    choice4: "Aurangzeb",
    answer: 2
  },
  {
    question: " Name the place known as the Roof of the World?",
    choice1: "Kashmir",
    choice2: "Nepal",
    choice3: "China ",
    choice4: "Tibet",
    answer: 4
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 6;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("last.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();