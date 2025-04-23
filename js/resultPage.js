

const elements = {
    resultsSection: document.getElementById('resultsSection'),
    leaderboardBtn: document.getElementById('leaderboardBtn'),
    saveScoreBtn: document.getElementById('saveScoreBtn'),
    userName: document.getElementById('userName'),
    scoreFraction: document.getElementById('scoreFraction'),
    scorePercentage: document.getElementById('scorePercentage'),
    timeTaken: document.getElementById('timeTaken'),
    correctAnswers: document.getElementById('correctAnswers'),
    incorrectAnswers: document.getElementById('incorrectAnswers'),
    encouragementText: document.getElementById('encouragementText'),
    tryAgainBtn: document.getElementById('tryAgainBtn'),
    homeBtn: document.getElementById('homeBtn'),
    shareBtn: document.getElementById('shareBtn')};

const quizResult = JSON.parse(localStorage.getItem('quizResult')) || {
    correctAnswers: 0,
    totalQuestions: 1,
    timeTakenInSec: 0
};

localStorage.removeItem('quizResult');

function init() {
    displayResults();
    setupEventListeners();
}

function displayResults() {
    const { correctAnswers, totalQuestions, timeTakenInSec } = quizResult;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

   elements.scoreFraction.textContent = `${correctAnswers}/${totalQuestions}`;
    elements.scorePercentage.textContent = `${percentage}% Score`;
    elements.correctAnswers.textContent = correctAnswers;
    elements.incorrectAnswers.textContent = incorrectAnswers;

  const minutes = Math.floor(timeTakenInSec / 60);
    const seconds = timeTakenInSec % 60;
    elements.timeTaken.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (percentage >= 80) {
        elements.encouragementText.textContent = "Excellent work!";
    } else if (percentage >= 50) {
        elements.encouragementText.textContent = "Good job!";
    } else {
        elements.encouragementText.textContent = "Keep practicing!";
    }
}

function saveScore() {
    const userName = elements.userName.value.trim();
    if (!userName) {
        alert("Please enter your name");
        return;
    }
    
    alert(`Score saved for ${userName}!`);
    elements.userName.value = "";
    saveUserToLeaderBoard(userName);
}

function saveUserToLeaderBoard(name) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    var userIndex = leaderboard.findIndex(user => user.name === name);
    // is user aleady in the leaderboard update the score if the new score is higher than the old one
    if (userIndex !== -1) {
        leaderboard[userIndex].correctAnswers = Math.max(leaderboard[userIndex].correctAnswers, quizResult.correctAnswers);
    } else {
    // if user is not in the leaderboard add him to the leaderboard
    leaderboard.push({ 
            name: name,
            correctAnswers: quizResult.correctAnswers, 
            totalQuestions:quizResult.totalQuestions ,
            date: getdate(),
        });
    }
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

}

function getdate(){
    var date = new Date();
    var year = date.getFullYear();
    var month = String (date.getMonth() + 1).padStart(2, '0');
    var day = String (date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function setupEventListeners() {

elements.saveScoreBtn.addEventListener('click', saveScore);
    
    elements.tryAgainBtn.addEventListener('click', () => {
        window.location.href = 'question.html';
    });

elements.homeBtn.addEventListener('click', () => {
        sessionStorage.removeItem("userPreferences");
        window.location.href = 'index.html';
    });

elements.leaderboardBtn.addEventListener('click', () => {
        window.location.href = 'leaderboard.html';
    });
}



document.addEventListener('DOMContentLoaded', init);
