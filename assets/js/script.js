
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
    },
    {
        question: 'Which of the following URLs includes a query string?',
        choices: ['https://www.google.com#hello', 'https://www.google.com/hello', 'https://www.google.com/q/hello', 'https://www.google.com?q=hello'],
        answer: 4
    },
    {
        question: 'Which JavaScript property would allow you to read the current page’s query string?',
        choices: ['document.location.pathname', 'document.location.search', 'document.location.host', 'document.location.origin'],
        answer: 2
    },
    {
        question: 'Which of the following is a valid query string for defining two parameters?',
        choices: ['?animal=dog&pet=true', 'animal=dog|pet=true', '?animal=dog,pet=true', '?animal=dog+pet=true'],
        answer: 1
    },
    {
        question: 'Which of the following CANNOT be accomplished using Bootstrap utility classes?',
        choices: ['Drag-and-drop functionality', 'Image replacement', 'Border changing', 'Display an element on screen readers only'],
        answer: 1
    },
    {
        question: 'True or false? You must use Bootstrap if you want to create a responsive grid layout.',
        choices: ['True', 'False'],
        answer: 2
    },
    {
        question: 'What is the maximum number of columns you can create using Bootstrap’s grid layout?',
        choices: ['6', '12', 'As many as you would like.'],
        answer: 3
    },
    {
        question: 'Your website can only use fonts that came preinstalled on a user’s device or fonts that they installed themselves.',
        choices: ['True', 'False'],
        answer: 2
    },
    {
        question: 'How do you create a flexbox?',
        choices: ['display: flex;', 'display: flexbox;', 'display: box;'],
        answer: 1
    },
    {
        question: 'By default, in which direction does a flexbox lay out its items?',
        choices: ['A column (vertical), with all of the child elements laid out on top of one another.', 'A row (horizontal), with all of the child elements laid out side by side.'],
        answer: 2
    },
    {
        question: 'What’s the best way to add a method to a constructor function?',
        choices: ['Car.prototype.honk = function( ) { }', 'Car.honk = function( ) { }', 'Car.prototype.honk = ( ) => { }', 'this.honk = function( ) { }'],
        answer: 1
    },
    {
        question: 'If you want to mock a module located at ./utils/hello.js, where would you create the mock file?',
        choices: ['./utils/hello.mock.js', './__mocks__/hello.js', './__tests__/__mocks__/hello.js', './utils/__mocks__/hello.js'],
        answer: 4
    },
    {
        question: 'Let’s say you have a constructor function for an Animal object. How do you create a new instance of an Animal?',
        choices: ["new function Animal('dog')", "new Animal('dog')", "function Animal('dog')", "Animal('dog')"],
        answer: 2
    },
    {
        question: 'What are the stages of TDD, in order?',
        choices: ['Pass, fail, refactor', 'Test, code, pass', 'Fail, pass, refactor', 'Code, test, pass'],
        answer: 3
    },
    {
        question: 'Why is it hard to truly test randomness, such as with random number generation?',
        choices: ['Tests may randomly pass or fail.', 'It’s harder to test for a range of numbers than one single number.', 'A test passing once does not guarantee that it will pass every time it runs.'],
        answer: 3
    },
    {
        question: 'What is the value of the this keyword in a constructor function?',
        choices: ['The instance of a new object that’s created using the constructor function', 'The global object', 'The function itself'],
        answer: 1
    },
    {
        question: 'Which of the following methods is NOT a JavaScript Array method?',
        choices: ['Array.prototype.splice()', 'Array.prototype.push()', 'Array.prototype.remove()', 'Array.prototype.includes()'],
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
    finalScoreEL.innerHTML = "Your final score is " + getFinalScore() + "! You scored " + score + "/" + arrQuestions.length;

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
    if (score > 0 && timeLeft > 0) {
        return Math.round(score / arrQuestions.length) * 100 + timeLeft; // timeLeft * score;
    }
    else if (timeLeft === 0) {
        return Math.round(score / arrQuestions.length) * 100;
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