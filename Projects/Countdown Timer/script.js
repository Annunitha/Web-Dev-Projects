let timer;
let totalSeconds;
let remainingSeconds;
let isPaused = false;

const display = document.getElementById("display");
const alarm = document.getElementById("alarm");
const ringProgress = document.querySelector(".ring-progress");

function startTimer() {
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;
  totalSeconds = minutes * 60 + seconds;
  remainingSeconds = totalSeconds;

  if (totalSeconds <= 0) {
    alert("Please enter a valid time!");
    return;
  }

  clearInterval(timer);
  updateDisplay();
  updateRing();

  timer = setInterval(() => {
    if (!isPaused) {
      remainingSeconds--;
      updateDisplay();
      updateRing();

      if (remainingSeconds <= 0) {
        clearInterval(timer);
        alarm.play();
      }
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = !isPaused;
}

function resetTimer() {
  clearInterval(timer);
  remainingSeconds = 0;
  updateDisplay();
  ringProgress.style.strokeDashoffset = 565.48;
}

function updateDisplay() {
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  display.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateRing() {
  const progress = (remainingSeconds / totalSeconds) * 565.48;
  ringProgress.style.strokeDashoffset = progress;
}
