const display = document.getElementById("display");
const historyList = document.getElementById("history-list");
const themeToggle = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
});

// Append normal characters
function append(value) {
  display.value += value;
}

// Append scientific function with auto parentheses
function appendFunction(func) {
  display.value += func + "(";
}

// Clear
function clearDisplay() {
  display.value = "";
}

// Backspace
function backspace() {
  display.value = display.value.slice(0, -1);
}

// Calculate
function calculate() {
  try {
    const result = eval(
      display.value.replace(/sin|cos|tan|sqrt/g, match => {
        return {
          sin: "Math.sin",
          cos: "Math.cos",
          tan: "Math.tan",
          sqrt: "Math.sqrt",
        }[match];
      })
    );
    historyList.innerHTML += `<li>${display.value} = ${result}</li>`;
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || "+-*/().".includes(e.key)) {
    append(e.key);
  } else if (e.key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (e.key === "Backspace") {
    backspace();
  }
});

