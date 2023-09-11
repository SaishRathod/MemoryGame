const cards = [
  {
    name: "Express",
    img: "Images/express.png",
  },
  {
    name: "Flask",
    img: "Images/flask.png",
  },
  {
    name: "Nodejs",
    img: "Images/node.png",
  },
  {
    name: "Django",
    img: "Images/django.png",
  },
  {
    name: "MongoDB",
    img: "Images/mongoDB.png",
  },
];

let gameStarted = false;
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => {
  if (!gameStarted) {
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
    window.location.href = "explain2.html";
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
