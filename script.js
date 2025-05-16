function generate() {
  const text = document.getElementById("textInput").value;
  const count = parseInt(document.getElementById("countInput").value);
  const format = document.getElementById("formatSelect").value;

  if (!text || !count) return alert("Enter mantra and count");

  const sep = format === "enter" ? "\n" : " ";
  const result = Array(count).fill(text).join(sep);
  document.getElementById("result").value = result;
}

function copyText() {
  const result = document.getElementById("result");
  result.select();
  document.execCommand("copy");
  alert("Copied!");
}

let audio = new Audio("jai-shri-ram.mp3");
let chantCount = 0;
let chantInterval;

function startChanting() {
  const count = parseInt(document.getElementById("countInput").value);
  if (!count) return alert("Enter count");
  
  chantCount = 0;
  updateTimer(0);
  chantInterval = setInterval(() => {
    audio.currentTime = 0;
    audio.play();
    chantCount++;
    updateTimer(chantCount);
    if (chantCount >= count) clearInterval(chantInterval);
  }, 2200);
}

function updateTimer(n) {
  document.getElementById("timer").innerText = `🕒 ${n}s`;
}

function startVoiceInput() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'hi-IN';
  recognition.start();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("textInput").value = transcript;
  };
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}