let timer;
let isPaused = false;
let timeLeft = 25 * 60;
let sessionType = "focus";
let cycleCount = 0;

const FOCUS_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

const timerDisplay = document.getElementById('timer-display');
const sessionLabel = document.getElementById('session-label');

const breakAudio = new Audio("break.mp3");
const studyAudio = new Audio("focus.mp3");

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const display = document.getElementById('timer-display');
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startSession(type) {
    sessionType = type;
    if (type === "focus") {
        timeLeft = FOCUS_TIME;
        sessionLabel.textContent = "Focus Time";
    } else if (type === "short") {
        timeLeft = SHORT_BREAK;
        sessionLabel.textContent = "Short Break";
    } else if (type === "long") {
        timeLeft = LONG_BREAK;
        sessionLabel.textContent = "Long Break";
    }
    updateDisplay();
    startTimer();
}

function startTimer() {
    isPaused = false;
    timer = setInterval(() => {
        if (!isPaused) {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                timer = null;
                if (sessionType === "focus") {
                    breakAudio.play();
                } else {
                    studyAudio.play();
                }
                handleSessionEnd();
            }
        }
    }, 1000);
}

function handleSessionEnd() {
    if (sessionType === "focus") {
        cycleCount++;
        if (cycleCount < 4) {
            startSession("short");
        } else {
            startSession("long");
        }
    } else if (sessionType === "short") {
        startSession("focus");
    } else if (sessionType === "long") {
        cycleCount = 0;
        startSession("focus");
    }
}

document.getElementById('start-btn').addEventListener('click', () => {
    if (!timer) {
        startSession("focus");
    } else {
        isPaused = false;
    }
});
document.getElementById('pause-btn').addEventListener('click', () => {
    isPaused = true;
});
document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
    isPaused = false;
    sessionType = "focus";
    timeLeft = FOCUS_TIME;
    sessionLabel.textContent = "Focus Time";
    updateDisplay();
});

sessionType = "focus";
timeLeft = FOCUS_TIME;
sessionLabel.textContent = "Focus Time";
updateDisplay();