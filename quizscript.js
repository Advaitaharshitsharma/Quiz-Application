// script.js
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "Who wrote 'Hamlet'?",
        choices: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
        correctAnswer: "Shakespeare"
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 60; // 60 seconds for the whole quiz

// Load the first question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-text").textContent = question.question;

    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = ''; // Clear previous choices

    question.choices.forEach(choice => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.onclick = () => checkAnswer(choice);
        choicesContainer.appendChild(choiceButton);
    });

    document.getElementById("next-button").disabled = true; // Disable next button
}

// Check if the selected answer is correct
function checkAnswer(selectedChoice) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    
    if (selectedChoice === correctAnswer) {
        score++;
    }

    // Disable all choice buttons after selection
    const choices = document.getElementById("choices-container").getElementsByTagName("button");
    for (let choice of choices) {
        choice.disabled = true;
    }

    // Enable the next question button
    document.getElementById("next-button").disabled = false;
}

// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

// Timer function
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

// End the quiz
function endQuiz() {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("score").textContent = score;
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60; // Reset timer
    document.getElementById("quiz-container").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    loadQuestion();
    startTimer();
}

// Start the quiz
window.onload = function() {
    loadQuestion();
    startTimer();
};
