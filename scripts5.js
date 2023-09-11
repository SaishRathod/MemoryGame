const cards = [
  {
    name: "Flipkart",
    img: "Images/flipkart.png",
  },
  {
    name: "Amazon",
    img: "Images/amazon.png",
  },
  {
    name: "Myntra",
    img: "Images/myntra.png",
  },
  {
    name: "Pinterest",
    img: "Images/pinterest.png",
  },
  {
    name: "LinkedIn",
    img: "Images/linkedin.png",
  },
  {
    name: "Wix",
    img: "Images/wix.png",
  },
];

let gameStarted = false;
const startButton = document.getElementById("start-button");

const round4 = localStorage.getItem("round4");

let timerElement;
let time = 0;
let timerInterval;
let timerRunning = false;

if (round4) {
    time = parseInt(round4, 10);
}

function startTimer() {
    timerInterval = setInterval(function () {
        time++;
        timerElement.textContent = `Time: ${time} seconds`;
    }, 1000);
    timerRunning = true;
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    return time;
}

window.onload = function () {
    timerElement = document.getElementById('timer');
    timerElement.textContent = `Round 4 Time: ${time} seconds`;
    timerElement.style.color="white";
    timerElement.style.fontSize="2rem";
}

startButton.addEventListener("click", () => {
  if (!gameStarted) {
    if(!timerRunning){
      startTimer();
    }
    const parentDiv = document.querySelector(".container");
    const roundTitle = document.getElementById("round-title");

    const gameCard = cards.concat(cards);

    let shuffled = Array.from(gameCard).sort(() => 0.5 - Math.random());

    for (let i = 0; i < shuffled.length; i++) {
      const childDiv = document.createElement("div");
      childDiv.classList.add("card");
      childDiv.dataset.name = shuffled[i].name;
      //   childDiv.style.backgroundImage = `url(${shuffled[i].img})`; remove

      const front_div = document.createElement("div");
      front_div.classList.add("front-card");

      const back_div = document.createElement("div");
      back_div.classList.add("back-card");

      back_div.style.backgroundImage = `url(${shuffled[i].img})`;

      parentDiv.appendChild(childDiv);

      childDiv.appendChild(front_div);
      childDiv.appendChild(back_div);
    }
    startButton.style.display = "none";
    roundTitle.style.display = "none";
    gameStarted = true;
  }
});

const parentDiv = document.querySelector(".container");

let clickCount = 0;
let firstcard = "";
let secondcard = "";

const card_match = () => {
  let cardSelected = document.querySelectorAll(".card-selected");

  cardSelected.forEach((currElement) => {
    currElement.classList.add("card-match");
  });

  const allCardsMatched =
    document.querySelectorAll(".card-match").length === cards.length * 2;

  if (allCardsMatched) {
    stopTimer();
    localStorage.setItem("round5", time);
    window.location.href = "explain5.html";
  }
};

const resetGame = () => {
  firstcard = "";
  secondcard = "";
  clickCount = 0;

  let cardSelected = document.querySelectorAll(".card-selected");

  cardSelected.forEach((curElem) => {
    curElem.classList.remove("card-selected");
  });
};

parentDiv.addEventListener("click", (event) => {
  let currCard = event.target;

  if (currCard.className === "container") {
    return false;
  }

  clickCount++;
  if (clickCount < 3) {
    if (clickCount === 1) {
      firstcard = currCard.parentNode.dataset.name;
      currCard.parentNode.classList.add("card-selected");
    } else if (clickCount === 2) {
      secondcard = currCard.parentNode.dataset.name;
      currCard.parentNode.classList.add("card-selected");
    }

    if (firstcard !== "" && secondcard !== "") {
      if (firstcard === secondcard) {
        setTimeout(() => {
          card_match();
          resetGame();
        }, 600);
      } else {
        setTimeout(() => {
          resetGame();
        }, 600);
      }
    }
  }
});
