lucide.createIcons();

let darkMode = false;

function toggleTheme() {

  darkMode = !darkMode;

  const body = document.getElementById("body");
  const themeBtn = document.getElementById("themeBtn");

  if (darkMode) {

    body.classList.remove("light");
    body.classList.add("dark");

    themeBtn.innerHTML =
      `<i data-lucide="sun"></i>`;

  } else {

    body.classList.remove("dark");
    body.classList.add("light");

    themeBtn.innerHTML =
      `<i data-lucide="moon"></i>`;
  }

  lucide.createIcons();
}

function updateTarget() {

  const value = document.getElementById("target").value;

  document.getElementById("targetLabel").innerText =
    value + "%";
}

function resetAll() {

  document.getElementById("total").value = "";
  document.getElementById("attended").value = "";

  calculate();
}

function setIcon(name) {

  const icon = document.getElementById("statusIcon");

  icon.setAttribute("data-lucide", name);

  lucide.createIcons();
}

function calculate() {

  const total =
    parseInt(document.getElementById("total").value);

  const attended =
    parseInt(document.getElementById("attended").value);

  const targetPercent =
    parseInt(document.getElementById("target").value);

  const target = targetPercent / 100;

  const percentageEl =
    document.getElementById("percentage");

  const absentEl =
    document.getElementById("absent");

  const title =
    document.getElementById("statusTitle");

  const message =
    document.getElementById("message");

  const resultBox =
    document.getElementById("resultBox");

  const iconBox =
    document.getElementById("iconBox");

  // Empty State

  if (isNaN(total) || isNaN(attended) || total <= 0) {

    percentageEl.innerText = "0.0";
    absentEl.innerText = "0";

    title.innerText = "Waiting for input";

    message.innerText =
      "Enter your class details to calculate attendance.";

    resultBox.style.background = "";
    resultBox.style.borderColor = "";

    setIcon("info");

    return;
  }

  // Invalid Input

  if (attended > total) {

    percentageEl.innerText = "Error";
    absentEl.innerText = "!";

    title.innerText = "Invalid Input";

    message.innerText =
      "Classes attended cannot exceed total classes conducted.";

    resultBox.style.background = "#fef2f2";
    resultBox.style.borderColor = "#fecaca";

    iconBox.style.background = "#fee2e2";

    setIcon("alert-circle");

    return;
  }

  // Main Calculation

  const percentage =
    (attended / total) * 100;

  const absent =
    total - attended;

  percentageEl.innerText =
    percentage.toFixed(1);

  absentEl.innerText =
    absent;

  // Safe

  if (percentage >= targetPercent) {

    let canBunk = Math.floor(
      (attended - target * total) / target
    );

    if (canBunk < 0) {
      canBunk = 0;
    }

    title.innerText = "You're Safe";

    if (canBunk > 0) {

      message.innerHTML =
        `You can miss <strong>${canBunk}</strong> more classes and still stay above ${targetPercent}%.`;

    } else {

      message.innerHTML =
        `You're at the safe limit. Avoid missing upcoming classes.`;
    }

    resultBox.style.background = "#f0fdf4";
    resultBox.style.borderColor = "#bbf7d0";

    iconBox.style.background = "#dcfce7";

    setIcon("check-circle");

  }

  // Low Attendance

  else {

    const need = Math.ceil(
      ((target * total) - attended) / (1 - target)
    );

    title.innerText = "Attendance Low";

    message.innerHTML =
      `Attend <strong>${need}</strong> consecutive classes to reach ${targetPercent}%.`;

    resultBox.style.background = "#fefce8";
    resultBox.style.borderColor = "#fde68a";

    iconBox.style.background = "#fef3c7";

    setIcon("alert-triangle");
  }
}
