// Quiz Data
const quizData = [
    {
        question: "Who is the known as the father of the computer?",
        options: [" Alan Turing", "Charles Babbage", "John Von Neumann"],
        answer: 1
    },
    {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Central Program Unit", "Core Processing User", "Aborlan"],
        answer: 0
    },
    {
        question: "What is the binary representation of the decimal number 10?",
        options: ["1010", "1100", "1110", "1001"],
        answer: 0
    },
    {
        question: "Which of the following is NOT a programming language?",
        options: ["Python", "HTML", "JavaScript", "C#"],
        answer: 1
    },
    {
        question: "What does HTTP stand for?",
        options: ["HyperText Transmission Process", "HyperText Transfer Protocol", "Hyperlink Transport Program", "High Tech Transfer Protocol"],
        answer: 1
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 15;
  let timer;
  
  function startQuiz() {
    loadQuestion();
  }
  
  function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        document.getElementById("quiz-box").innerHTML = `<h3>Quiz Completed</h3><p>Final Score = ${score} / ${quizData.length}</p>`;
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("score").parentElement.style.display = "none";
        return;
    }
  
    let questionObj = quizData[currentQuestionIndex];
    document.getElementById("question").innerText = questionObj.question;
  
    let optionContainer = document.getElementById("options");
    optionContainer.innerHTML = "";
    questionObj.options.forEach((option, index) => {
        let button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn", "btn-outline-primary", "w-100", "my-1", "option");
        button.onclick = () => checkAnswer(button, index);
        optionContainer.appendChild(button);
    });
  
    resetTimer();
  }
  
  function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    document.getElementById("time").innerText = timeLeft;
  
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("time").innerText = timeLeft;
        } else {
            clearInterval(timer);
            autoSelectWrongAnswer();
        }
    }, 1000);
  }
  
  // Stops timer when an answer is selected
  function checkAnswer(button, selected) {
    clearInterval(timer); // Stop the timer immediately
  
    let correct = quizData[currentQuestionIndex].answer;
    let buttons = document.querySelectorAll(".option");
  
    // Disable all buttons after answering
    buttons.forEach(btn => btn.disabled = true);
  
    if (selected === correct) {
        score++;
        button.classList.add("btn-success");
    } else {
        button.classList.add("btn-danger");
    }
  
    document.getElementById("score").innerText = score;
    document.getElementById("next-btn").classList.remove("hide");
  }
  
  function autoSelectWrongAnswer() {
    let buttons = document.querySelectorAll(".option");
    buttons.forEach(button => {
        button.disabled = true;
    });
    document.getElementById("next-btn").classList.remove("hide");
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById("next-btn").classList.add("hide");
    loadQuestion();
  }
  
  // Initialize quiz
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("next-btn").addEventListener("click", nextQuestion);
    startQuiz();
  });