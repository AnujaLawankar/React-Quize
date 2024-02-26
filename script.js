document.addEventListener("DOMContentLoaded", function () {
  var startbutton = document.querySelector("#startbtn");
  var quizebody = document.querySelector("#quizebody");
  var question = document.querySelector("#question");
  var choices = document.querySelector("#choices");
  var timer = document.querySelector("#timer");
  const questions = [
    {
      question: "Why so JavaScript and Java have similar name?",
      choices: [
        "JavaScript is a stripped-down version of Java",
        "JavaScripts syntax is loosely based on Java",
        "They both originated on the island of Java",
        "None of the above",
      ],
      answer: "JavaScripts syntax is loosely based on Java",
    },

    {
      question:
        "When a user views a page containing a JavaScript program, which machine actually executes the script?",
      choices: [
        "The User's machine running a Web browser",
        "The Web server",
        "A central machine deep within Netscape's corporate offices",
        "None of the above",
      ],
      answer: "The User's machine running a Web browser",
    },

    {
      question: "_____ JavaScript is also called client-side JavaScript.",
      choices: ["Microsoft", "Navigator", "LiveWire", " Native"],

      answer: "Navigator",
    },
  ];

  startbutton.addEventListener("click", startQuize);

  let currentquestion = 0;
  let score = 0;
  let timerInterval;

  let startTime;

  function startQuize() {
    startbutton.style.display = "none";
    startTime = new Date().getTime();
    displayQuestion();
    timerInterval = setInterval(updateTimer, 1000);
  }

  function displayQuestion() {
    let q = questions[currentquestion];
    question.innerHTML = q.question;
    choices.innerHTML = " ";
    for (let i = 0; i < q.choices.length; i++) {
      let choice = document.createElement("button");
      choice.innerHTML = q.choices[i];
      choice.setAttribute("class", "choicestyle");
      choices.addEventListener("click", chooseAnswer);
      choices.appendChild(choice);
    }
  }

  function chooseAnswer() {
    let message = document.createElement("P");

    let correctans = "";
    if (this.innerHTML === questions[currentquestion].answer) {
      message.innerHTML = " Correct!";
      score++;
    } else {
      message.innerHTML = "Worng!";
    }

    quizebody.appendChild(message);

    setTimeout(function () {
      message.innerHTML = " ";
    }, 1000);

    currentquestion++;

    if (currentquestion === questions.length) {
      endQuiz();
    } else {
      displayQuestion();
    }
  }

  function updateTimer() {
    let timeLeft = 60 - Math.floor((new Date().getTime() - startTime) / 1000);
    timer.innerHTML = "Time Left:" + timeLeft + "seconds";
    if (timeLeft <= 0) {
      endQuiz();
    }
  }

  function endQuiz() {
    clearInterval(timerInterval);
    quizebody.innerHTML = "";
    quizebody.innerHTML =
      " <h1 id='title'>Quize ended</h1><p> Your Final Score is" +
      score +
      "out of " +
      questions.length +
      ".</p>" +
      "Enter your initials: <input id='initials' type='text'><br><br>" +
      "<button id='submitScoreButton'>Submit Score</button>";
    document
      .getElementById("submitScoreButton")
      .addEventListener("click", submitScore);
  }

  function submitScore() {
    let initials = document.getElementById("initials").value;

    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    highScores.push({ initials: initials, score: score });
    localStorage.setItem("highscores", JSON.stringify(highScores));
    showHighScores();
  }

  function showHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.sort((a, b) => b.score - a.score);
    quizebody.innerHTML = "<h1> HighScore</h1>";
    for (let i = 0; i < highScores.length; i++) {
      quizebody.innerHTML +=
        i +
        1 +
        "." +
        highScores[i].initials +
        " :" +
        highScores[i].score +
        "<br>";
    }
    quizebody.innerHTML +=
      "<br><button id='startAgainButton'>Start Again</button>";
    document
      .getElementById("startAgainButton")
      .addEventListener("click", resetQuiz);
  }

  function resetQuiz() {
    currentquestion = 0;
    score = 0;
    startbutton.style.display = "inline-block";
    quizebody.innerHTML = "";
    location.reload();
  }
});
