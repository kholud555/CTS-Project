
var startTimerValue = 59; 
var currentTimerValue = startTimerValue;
var timer = null;
var timerCallback = null;
var timerIsRunning = false;

function startTimer(timerValue,_timerCallback) {
    startTimerValue = timerValue;
    currentTimerValue = timerValue;
    timerCallback = _timerCallback;
    timerIsRunning = true;
    timerCallback();
    if(timer) clearInterval(timer);
    timer = setInterval(tickTimer, 1000);
}

function tickTimer() {
    currentTimerValue--;
    timerCallback();
    if (currentTimerValue < 0) {
        stopTimer();
        return;
    }
  

  
}

function stopTimer() {
    if(timer) clearInterval(timer);
    timer = null;
    timerIsRunning = false;

}

function playTimer(){
    timer = setInterval(tickTimer, 1000);
    timerIsRunning = true;
}

function restartTimer() {
    currentTimerValue = startTimerValue;
    if(timer) clearInterval(timer);
    timer = setInterval(tickTimer, 1000);
    timerIsRunning = true;
    if(timerCallback) {
        timerCallback();
    }
}

function getTimerValue() {
    return currentTimerValue;
}

function toggle() {
    if (timerIsRunning) {
        stopTimer();
    } else {
        playTimer();
    }
}

function getTimerState() {
    return timerIsRunning ? "running" : "paused";
}

window.timerInterval = {
    startTimer: startTimer,
    stopTimer: stopTimer,
    playTimer: playTimer,
    restartTimer: restartTimer,
    tickTimer: tickTimer,
    getTimerValue: getTimerValue,
    toggle:toggle,
    getTimerState: getTimerState,
}
