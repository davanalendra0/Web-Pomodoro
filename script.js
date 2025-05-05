let timer;
let isPaused = false;
let timeLeft = 1500; // 25 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const display = document.getElementById('timer-display');
    display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
                document.getElementById('message').textContent = "Time's up! 🎉";
            }
        }
    }, 1000);
}

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', () => isPaused = true);
document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(timer);
    timeLeft = 1500; // reset to 25 minutes
    updateDisplay();
});

updateDisplay();