
// Start the quiz with a score of 0
var score = 0;
var i = 0;
var correct = null;
var timerEl = document.getElementById('countdown');
var timeInterval; 
var timeLeft;

//build questions
var arrQuestions = [ 
    {
        question: 'What does HTML stand for?',
        choices: ['Hyperlinks and Text Markup Language', 'Hyper Text Markup Language', 'Home Tool Markup Language'],
        answer: 2
    },
    {
        question: 'Who is making the Web standards?',
        choices: ['The World Wide Web Consortium', 'Google', 'Microsoft', 'Mozilla'],
        answer: 1
    },
    {
        question: 'Which of these JavaScript methods is NOT asynchronous?',
        choices: ['fetch()', 'setTimeout()', 'alert()', 'addEventListener()'],
        answer: 3
    },
    {
        question: 'Which of these tools would NOT make a request to an API endpoint?',
        choices: ['The browser', 'The DevTools Network tab', 'The Fetch API', 'The curl command'],
        answer: 2
    },
    {
        question: 'Which character is used to indicate an end tag?',
        choices: ['<', '^', '/', '*'],
        answer: 3
    }
];

var loadQuestion = function(i) {
    var container = document.getElementById('container');
    container.innerHTML = '';

    var question = arrQuestions[i].question;
    var questionEL = document.createElement("h2");
    questionEL.innerHTML = question;
    container.appendChild(questionEL);
    var options = arrQuestions[i].choices;
    container.appendChild(document.createElement("br"));
        var name = "btn"+i; 
    var questionDiv = document.createElement("div");
    questionDiv.setAttribute("class", "questionsDiv");
    for ( var opt in options ) {
    
        var buttonEL = document.createElement("button");
        buttonEL.type = "button";          
        buttonEL.value = options[opt];
        buttonEL.name = 'btn'+opt;
        buttonEL.textContent = options[opt];
        buttonEL.addEventListener('click', function() {
            checkAnswer(this, i, opt);
        })

        questionDiv.appendChild(buttonEL)
    }

    if (correct != null) {
        var resultEL = document.createElement("h4");
        if (correct) {
            resultEL.innerHTML = "Correct!";
        }
        else {
            resultEL.innerHTML = "Wrong!";
        }
        questionDiv.appendChild(resultEL);
    }

    container.appendChild(questionDiv);
    container.appendChild(document.createElement("br"));

};

function checkAnswer(btn, questionSelected, btnSelected){
    // console.log('questionSelected: ' + questionSelected);
    // console.log(btn.getAttribute('value'));
    var answerSelectedText = btn.getAttribute('value');
    var correctAnswer = arrQuestions[questionSelected].answer;
    // console.log('Answer is: ' + correctAnswer);
    var correctAnswerText = arrQuestions[questionSelected].choices[correctAnswer-1];
    // console.log('correctAnswerText: ' + correctAnswerText);

    // var resultEL = document.createElement("h4");

    if (correctAnswerText === answerSelectedText) {
        score++;
        //resultEL.innerHTML = 'Correct! You have scored ' + score + ' out of ' + arrQuestions.length;
        correct = true;
    }
    else {
        //alert('Sorry, wrong answer. You have scored ' + score + ' out of ' + arrQuestions.length);
        timeLeft = timeLeft - 10;
        correct = false;
    }

    if (questionSelected < arrQuestions.length -1){
        questionSelected++;
        loadQuestion(questionSelected);
    }
    else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timeInterval);
    var container = document.getElementById('container');
    container.innerHTML = '';

    var questionDiv = document.createElement("div");
    questionDiv.setAttribute("class", "questionsDiv");

    var doneEL = document.createElement("h2");
    doneEL.innerHTML = "All Done!";

    // your final score is: 
    var finalScoreEL = document.createElement("p");
    finalScoreEL.innerHTML = "Your final score is " + getFinalScore();

    // enter your initials
    var initialsLabelEL = document.createElement("label");
    initialsLabelEL.innerHTML = "Enter your initials: ";

    var initialsEL = document.createElement("input");
    initialsEL.type = "text";
    initialsEL.id = "initialsEL";

    // Submit button
    var submitEL = document.createElement("button");
    submitEL.type = "button";
    submitEL.innerHTML = "Submit";
    submitEL.addEventListener('click', function() {
        saveHighScore();
    })

    questionDiv.appendChild(doneEL);
    questionDiv.appendChild(finalScoreEL);
    questionDiv.appendChild(initialsLabelEL);
    questionDiv.appendChild(initialsEL);
    questionDiv.appendChild(document.createElement("br"));
    questionDiv.appendChild(submitEL);

    if (correct != null) {
        var resultEL = document.createElement("h4");
        if (correct) {
            resultEL.innerHTML = "Correct!";
        }
        else {
            resultEL.innerHTML = "Wrong!";
        }
        questionDiv.appendChild(resultEL);
    }
    container.appendChild(questionDiv);
}

function getFinalScore() {
    if (score > 0) {
        return timeLeft * score;
    }
    else {
        return 0;
    }
}

function saveHighScore() {
    var userHighscore = getFinalScore();
    var initialsEL = document.querySelector("#initialsEL");
    var userInitials = initialsEL.value.trim();
    console.log('userHighscore: ' + userHighscore + '; userInitials: ' + userInitials);

    var retrievedHighScores = JSON.parse(window.localStorage.getItem("highscoresCodeQuiz")) || [];
    if (retrievedHighScores === null) {
        retrievedHighScores = [];
    }
    var newHighScore = {highscore: userHighscore, initials: userInitials};
    retrievedHighScores.push(newHighScore);
    console.log("Saving high score...");
    console.log(retrievedHighScores);
    localStorage.setItem("highscoresCodeQuiz",  JSON.stringify(retrievedHighScores));
    document.location.href = "highscores.html";
}

function countdown() {
    timeLeft = 75;
    loadQuestion(0);
     timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = 'Time: ' + timeLeft;
            // Decrement `timeLeft` by 1
            timeLeft--;
    } else if (timeLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `endQuiz()` function
        endQuiz();
      }
    }, 1000);
};

countdown();