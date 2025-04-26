
var currentQuestion = 0;
var correctAnswers = 0;
var timeTakenInSec = 0;
var answerIsSelected = false;
var buttonisClicked = false;
var questions = [];
var preferences = {
    "difficulty": "Easy",
    "category": "Math"
};

var elements = {
    question: document.querySelector(".question-text"),
    options: document.querySelectorAll(".option"),
    nextBtn: document.querySelector(".next-button"),
    timerControl: document.querySelector(".timer-control"),
    progressBar: document.querySelector("progress"),
    timerElement: document.querySelector(".time"),
    currentQuestionElement: document.querySelector(".current-question"),
    totalQuestionsElement: document.querySelector(".total-questions"),
    questionElement: document.querySelector(".question-text"),
    resultElement: document.querySelector(".result"),
    correctAnswerElement: document.querySelector(".correct-answer"),
    incorrectAnswerElement: document.querySelector(".incorrect-answer"),
    timeTakenElement: document.querySelector(".time-taken"),
}

readDataFromFile('../data/questions.json');
init();


function readDataFromFile(filepath){
    fetch(filepath)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(questions => {
            getUserPreferences();
            handleQuestions(questions);
            handleQuestionUI();
        }).catch(error => {
            alert("Error: " + error.message);
        });   
}

function getUserPreferences(){
    var userPreferences = sessionStorage.getItem("userPreferences");
    if(userPreferences){
        preferences = JSON.parse(userPreferences);
    }else{
        alert("Please select a category and a level");
        window.location.href = "index.html";
    }
}

function handleQuestions(allQuestions){
    var randomQuestions = allQuestions.sort(() => Math.random() - 0.5);
    var filteredQuestions = randomQuestions.filter(question =>
         question.difficulty == preferences.difficulty && 
         question.category == preferences.category);
    questions = filteredQuestions.slice(0, 3); 
    
}

function handleQuestionUI(){
    handleProgressBar(currentQuestion+1);
    renderDataToQuestionUI();
    handleNextBtn();
}

function handleProgressBar(value){
    elements.progressBar.value = value;
    elements.progressBar.max = questions.length;
}

function renderDataToQuestionUI(){
    elements.currentQuestionElement.innerText = currentQuestion + 1;
    elements.totalQuestionsElement.innerText = questions.length;
    elements.questionElement.innerText = questions[currentQuestion].question;
    elements.options.forEach((option,value)=>{
      option.innerText = questions[currentQuestion].choices[value];
        option.style.border = "1px solid #423D5C";
    });
}

function handleNextBtn(){
    console.log("handleNextBtn called");
    elements.nextBtn.style.backgroundColor = "#46316f";
    if(currentQuestion == questions.length-1){
        elements.nextBtn.innerText = "Show Result";
    }
  
}

function init(){
    elements.nextBtn.addEventListener("click", moveToNextQuestion);
    elements.timerControl.addEventListener("click",toggleTimer);
    elements.options.forEach((choice) => {
        choice.addEventListener("click", () => {
            updateNextButtonUI();
            showAnswer(choice);
        });
    });
    timerInterval.startTimer(59, timerCallback);
}



function moveToNextQuestion(){
    if(!answerIsSelected) return;
    answerIsSelected = false;
    currentQuestion++;
    handleProgressBar(currentQuestion);
    controlTimerIcon();
    if(currentQuestion < questions.length){
        timerInterval.restartTimer();
        handleQuestionUI();
    
    }else{
        showResult();
        currentQuestion = 0;
    }
}


function showResult(){
    saveResult();
    window.location.href = "../../pages/resultPage.html";
}

function saveResult(){
    var result = {
        "correctAnswers": correctAnswers,
        "totalQuestions": questions.length,
        "timeTakenInSec": timeTakenInSec,
    }
    localStorage.setItem("quizResult", JSON.stringify(result));
}


function updateNextButtonUI(){
    elements.nextBtn.style.backgroundColor = "#9368d9";
}

function showAnswer(choice) {
    if (answerIsSelected) return;
    answerIsSelected = true;
    pauseTimer();
    if (choice.innerText === questions[currentQuestion].answer) {
        correctAnswers++;
        choice.style.border = `1px solid #22bb58`;
        choice.innerHTML += `<i class="fa-regular fa-circle-check" style="color: #22bb58;"></i>`;
    } else {
        showCorrectAnswer();
        choice.style.border = "1px solid #de4244";
        choice.innerHTML += `<i class="fa-regular fa-circle-xmark" style="color: #de4244;"></i>`;
    }
}
function showCorrectAnswer(){
    var correctAnswerIndex = questions[currentQuestion].choices.indexOf(questions[currentQuestion].answer);
    if (correctAnswerIndex !== -1) {
        elements.options[correctAnswerIndex].style.border = `1px solid #22bb58`;
        elements.options[correctAnswerIndex].innerHTML += `<i class="fa-regular fa-circle-check" style="color: #22bb58;"></i>`;
    }
}

function toggleTimer(){
    if(answerIsSelected) return;
    controlTimerIcon();
    timerInterval.toggle();
}

function controlTimerIcon(){
    if(timerInterval.getTimerState() ==="running"){
        elements.timerControl.classList.remove("fa-circle-pause");
        elements.timerControl.classList.add("fa-circle-play");
    }
    else{
        elements.timerControl.classList.remove("fa-circle-play");
        elements.timerControl.classList.add("fa-circle-pause");
    }
}

function timerCallback(){
    if(timerInterval.getTimerValue() < 0){
        showCorrectAnswer();
        answerIsSelected = true;
        updateNextButtonUI();

    }
    else{
        timeTakenInSec++;
        elements.timerElement.innerText = timerInterval.getTimerValue();
    } 
}

function pauseTimer(){
    elements.timerControl.classList.remove("fa-circle-pause");
    elements.timerControl.classList.add("fa-circle-play");
    timerInterval.stopTimer();
}  


