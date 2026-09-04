const digits = document.getElementById("digits");
if (digits) {
  for (let i = 0; i < 10; i += 1) {
    const el = document.createElement("span");
    el.textContent = String(i);
    digits.appendChild(el);
  }
}

const timerEl = document.getElementById("timer");
const periodEl = document.getElementById("period");
const feedEl = document.getElementById("feed");
let remaining = 28;
let period = 20260902001;

const withdrawals = [
  "98***3412 withdrew ₹18,500",
  "70***2291 withdrew ₹4,200",
  "81***1108 withdrew ₹9,750",
  "99***5560 withdrew ₹1,110",
  "86***7744 withdrew ₹22,000",
];

function tick() {
  if (!timerEl || !periodEl) {
    return;
  }
  remaining -= 1;
  if (remaining < 0) {
    remaining = 30;
    period += 1;
    periodEl.textContent = `#${period}`;
  }
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  timerEl.textContent = `${mm}:${ss}`;
}

setInterval(tick, 1000);

let feedIndex = 0;
function rotateFeed() {
  if (!feedEl) {
    return;
  }
  feedEl.textContent = `${withdrawals[feedIndex]} · just now`;
  feedIndex = (feedIndex + 1) % withdrawals.length;
}
rotateFeed();
setInterval(rotateFeed, 3200);

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
  });
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

