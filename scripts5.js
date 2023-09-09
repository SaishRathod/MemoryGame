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

startButton.addEventListener("click", () => {
  if (!gameStarted) {
    const parentDiv = document.querySelector(".container");

    const gameCard = cards.concat(cards);

    let shuffled = Array.from(gameCard).sort(() => 0.5 - Math.random());

    for (let i = 0; i < shuffled.length; i++) {
      const childDiv = document.createElement("div");
      childDiv.classList.add("card");
      childDiv.dataset.name = shuffled[i].name;
      childDiv.style.backgroundImage = `url(${shuffled[i].img})`;

      parentDiv.appendChild(childDiv);
    }
    startButton.style.display = "none";
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
  clickCount++;
  if (clickCount < 3) {
    if (clickCount === 1) {
      firstcard = currCard.dataset.name;
      currCard.classList.add("card-selected");
    } else if (clickCount === 2) {
      secondcard = currCard.dataset.name;
      currCard.classList.add("card-selected");
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

  if (currCard.className === "container") {
    return false;
  }
});
