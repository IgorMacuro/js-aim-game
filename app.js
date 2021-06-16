const btnStart = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeL = document.querySelector("#time");
const board = document.querySelector("#board");

let timeGame = 0;
let score = 0;
let misses = 0;

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  } else if (timeGame > 0) {
    misses++;
  }
});

btnStart.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

const timeList = document.querySelector("#time-list");
timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    timeGame = parseInt(event.target.getAttribute("data-time"));
    startGame();
  }
});

const setTime = (value) => {
  timeL.innerHTML = `00:${value}`;
};

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};
const randomColor = () => {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const random = Math.random();
    const bit = (random * 16) | 0;
    color += bit.toString(16);
  }
  return color;
};
const createRandomCircle = () => {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  const size = getRandomNumber(12, 45);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.background = randomColor();
  board.append(circle);
};

const finishGame = () => {
  timeL.parentNode.classList.add("hide");
  board.innerHTML = `<div><h1>Score: <span class="primary">${score}</span></h1></div>`;
  board.innerHTML += `<div><h2>Misses: <span class="primary">${misses}</span></h2></div>`;
};

const decreaseTime = () => {
  if (timeGame === 0) {
    finishGame();
  } else {
    let currentTime = --timeGame;
    if (currentTime < 10) {
      currentTime = `0${currentTime}`;
    }
    setTime(currentTime);
  }
};

const startGame = () => {
  screens[1].classList.add("up");
  setInterval(decreaseTime, 1000);
  setTime(timeGame);
  createRandomCircle();
};
