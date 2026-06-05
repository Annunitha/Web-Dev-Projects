const signalBox = document.getElementById("signal-box");
const startBtn = document.getElementById("startBtn");
const result = document.getElementById("result");
const history = document.getElementById("history");

let startTime, timeoutId;
let attempts = [];

startBtn.addEventListener("click", () => {
  result.textContent = "";
  signalBox.style.background = "#1e293b"; // reset
  startBtn.disabled = true;

  // Random delay between 2–5 seconds
  const delay = Math.floor(Math.random() * 3000) + 2000;

  timeoutId = setTimeout(() => {
    signalBox.style.background = "green";
    startTime = Date.now();
  }, delay);
});

signalBox.addEventListener("click", () => {
  if (signalBox.style.background === "green") {
    const reactionTime = Date.now() - startTime;
    attempts.push(reactionTime);

    result.textContent = `✅ Reaction time: ${reactionTime} ms`;
    history.textContent = `Average: ${Math.round(attempts.reduce((a,b)=>a+b,0)/attempts.length)} ms over ${attempts.length} attempts`;

    startBtn.disabled = false;
    signalBox.style.background = "#1e293b";
    clearTimeout(timeoutId);
  } else {
    result.textContent = "❌ Too early! Wait for green.";
    startBtn.disabled = false;
    clearTimeout(timeoutId);
  }
});
