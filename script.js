// Quiz Questions

const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Markup Language",
            "None"
        ],
        answer: "Hyper Text Markup Language"
    },

    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: "CSS"
    },

    {
        question: "Which language makes websites interactive?",
        options: ["C", "Java", "JavaScript", "SQL"],
        answer: "JavaScript"
    },

    {
        question: "Which keyword is used to declare a constant?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    },

    {
        question: "Which method prints output in JavaScript?",
        options: ["print()", "console.log()", "display()", "write()"],
        answer: "console.log()"
    }
];

console.log(questions);
// Get HTML Elements

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("optionsContainer");

const questionCount = document.getElementById("questionCount");
const progressBar = document.getElementById("progressBar");

const feedback = document.getElementById("feedback");


// Quiz Variables

let currentIndex = 0;
let score = 0;
let userAnswers = [];

console.log("Quiz is ready!");

// Start Quiz Function

function startQuiz() {

    currentIndex = 0;
    score = 0;
    userAnswers = [];

    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
}

// Start Button Event

startBtn.addEventListener("click", startQuiz);
// Show Question Function

function showQuestion() {

let currentQuestion = questions[currentIndex];
questionElement.innerText = currentQuestion.question;
questionCount.innerText = "Question " + (currentIndex + 1) + " of " + questions.length;
progressBar.style.width = ((currentIndex + 1) / questions.length) * 100 + "%";
optionsContainer.innerHTML = "";
feedback.innerText = "";
nextBtn.disabled = true;
// Show Options
for (let i = 0; i < currentQuestion.options.length; i++) {
    let button = document.createElement("button");
    button.innerText = currentQuestion.options[i];
    button.classList.add("option-btn");
    button.addEventListener("click", function() {
    checkAnswer(button, currentQuestion.options[i]);
});
    optionsContainer.appendChild(button);
}

}
// Check Answer Function

function checkAnswer(button, selectedAnswer) {

let correctAnswer = questions[currentIndex].answer;
let buttons = optionsContainer.querySelectorAll("button");
buttons.forEach(function(btn) {
    btn.disabled = true;
    if (btn.innerText === correctAnswer) {
        btn.classList.add("correct");
    }
});
if (selectedAnswer === correctAnswer) {
    score++;
    feedback.innerText = "Correct Answer!";
    feedback.style.color = "green";
} else {
    feedback.innerText = "Wrong Answer!";
    feedback.style.color = "red";
    button.classList.add("wrong");
}
userAnswers.push(selectedAnswer);
nextBtn.disabled = false;

}
// Next Question Function

function nextQuestion() {

currentIndex++;
if (currentIndex < questions.length) {
    showQuestion();
} else {
    showResult();
}

}

// Next Button Event

nextBtn.addEventListener("click", nextQuestion);
quizScreen.classList.add("hidden");

resultScreen.classList.remove("hidden");

let percentage = (score / questions.length) * 100;

document.getElementById("finalScore").innerText =
    score + "/" + questions.length;

document.getElementById("percentage").innerText =
    percentage + "%";

if (percentage >= 80) {

    document.getElementById("resultMessage").innerText =
        "Excellent! Great Job!";

} else if (percentage >= 50) {

    document.getElementById("resultMessage").innerText =
        "Good Work! Keep Practicing.";

} else {

    document.getElementById("resultMessage").innerText =
        "Try Again! You Can Do Better.";

}
// Review Answers Function

function reviewAnswers() {

resultScreen.classList.add("hidden");
reviewScreen.classList.remove("hidden");
let reviewContainer = document.getElementById("reviewContainer");
reviewContainer.innerHTML = "";
questions.forEach(function(question, index) {
    let div = document.createElement("div");
    div.classList.add("review-item");
    let userAnswer = userAnswers[index];
    div.innerHTML = `
        <h3>${index + 1}. ${question.question}</h3>
        <p>Your Answer: ${userAnswer}</p>
        <p>Correct Answer: ${question.answer}</p>
    `;
    reviewContainer.appendChild(div);
});

}

// Review Button Event

reviewBtn.addEventListener("click", reviewAnswers);