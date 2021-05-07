function goBack() {
    document.location.href = "index.html";
}

function clearHighScores() {
    // clear high scores from local storage
    localStorage.removeItem("highscoresCodeQuiz");
    displayHighScores();
}

function displayHighScores() {
    var highscoresDiv = document.querySelector("#highscoresDisplay");
    highscoresDiv.innerHTML = '';
    var highscoreEL = document.createElement("p");
    // highscoreEL.setAttribute("text-align", "center");
    // highscoreEL.setAttribute("transform", "translateY(-50%)");
    // get high scores from local storage and display
    var retrievedHighScores = JSON.parse(localStorage.getItem('highscoresCodeQuiz'));
    if (retrievedHighScores === null) {
        retrievedHighScores = [];
        highscoreEL.innerHTML = "No high scores yet";
    }
    else {
        var ul = document.createElement("ul");
        for (var i = 0; i < retrievedHighScores.length; i++) {
            var currentScore = retrievedHighScores[i];
            var li = document.createElement("li");
            li.innerText = currentScore.highscore + ": " + currentScore.initials;
            ul.appendChild(li);
            // console.log(i);
            // console.log(retrievedHighScores[i]);
            // var currentScore = retrievedHighScores[i];
            // console.log(currentScore.highscore + ": " + currentScore.initials);
            // highscoreEL.innerHTML = retrievedHighScores[i];
        }
        highscoresDiv.appendChild(ul);
        // highscoreEL.innerHTML = retrievedHighScores;
    }


    highscoresDiv.appendChild(highscoreEL);
}

displayHighScores();