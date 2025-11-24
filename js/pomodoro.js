export function initPomodoro() {
    const timerDisplay = document.getElementById('pomodoroTimer');
    const startBtn = document.getElementById('startTimer');
    const resetBtn = document.getElementById('resetTimer');
    const statusDisplay = document.getElementById('timerStatus');

    let timeLeft = 25 * 60; // 25 minutes in seconds
    let timerId = null;
    let isRunning = false;

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function updateDisplay() {
        timerDisplay.textContent = formatTime(timeLeft);
    }

    function startTimer() {
        if (isRunning) {
            // Pause logic
            clearInterval(timerId);
            isRunning = false;
            startBtn.textContent = 'Resume';
            statusDisplay.textContent = 'Paused';
            return;
        }

        isRunning = true;
        startBtn.textContent = 'Pause';
        statusDisplay.textContent = 'Focus Mode ON';

        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerId);
                isRunning = false;
                timeLeft = 0;
                updateDisplay();
                statusDisplay.textContent = 'Time is up! Take a break.';
                startBtn.textContent = 'Start';
                // Optional: Play sound here
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerId);
        isRunning = false;
        timeLeft = 25 * 60;
        updateDisplay();
        startBtn.textContent = 'Start';
        statusDisplay.textContent = 'Ready to focus?';
    }

    startBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);
}
