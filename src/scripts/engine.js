const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprite: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
  },
  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
  },
  button: document.getElementById("next-duel"),
};

const player = {
  player1: "player-cards",
  computer: "computer-cards",
};

const cardData = [
  {
    id: 0,
    name: "Blue Eyes White Dragon",
    type: "Paper",
    img: "./src/assets/icons/dragon.png",
    WinOf: [1],
    LoseOf: [2],
  },
  {
    id: 1,
    name: "Dark Magician",
    type: "Rock",
    img: "./src/assets/icons/magician.png",
    WinOf: [2],
    LoseOf: [0],
  },
  {
    id: 2,
    name: "Exodia",
    type: "Scissors",
    img: "./src/assets/icons/exodia.png",
    WinOf: [0],
    LoseOf: [1],
  },
];

async function getRandomCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}

async function setCardsField(cardId) {
  await RemoveAllCardImages();

  let computerCardId = await getRandomCardId();

  state.fieldCards.player.style.display = "block";
  state.fieldCards.computer.style.display = "block";
  state.fieldCards.player.src = cardData[cardId].img;
  state.fieldCards.computer.src = cardData[computerCardId].img;

  let duelResults = await checkDuelResults(cardId, computerCardId);

  await updateScore();
  await drawButton(duelResults);
}

async function checkDuelResults(playerCardId, computerCardId) {
  let playerCard = cardData[playerCardId];
  let duelResults = "Empate";

  //check if win
  if (playerCard.WinOf.includes(computerCardId)) {
    duelResults = "Ganhou";
    await playAudio("win");
    state.score.playerScore++;
  }

  //check if loses
  if (playerCard.LoseOf.includes(computerCardId)) {
    duelResults = "Perdeu";
    await playAudio("lose");
    state.score.computerScore++;
  }

  return duelResults;
}

async function createCardImage(randomIdCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", randomIdCard);
  cardImage.classList.add("card");

  if (fieldSide === player.player1) {
    cardImage.addEventListener("click", () => {
      setCardsField(cardImage.getAttribute("data-id"));
    });

    cardImage.addEventListener("mouseover", () => {
      drawSelectCard(randomIdCard);
    });

    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
  }

  return cardImage;
}

async function RemoveAllCardImages() {
  let cards = document.querySelector(".card-box.framed#computer-cards");
  let imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());

  cards = document.querySelector(".card-box.framed#player-cards");
  imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
}

async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomCardId();
    const cardImage = await createCardImage(randomIdCard, fieldSide);

    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

function drawSelectCard(index) {
  state.cardSprite.avatar.src = cardData[index].img;
  state.cardSprite.name.innerText = cardData[index].name;
  state.cardSprite.type.innerText = "Attribute: " + cardData[index].type;
}

async function drawButton(text) {
  state.button.innerText = text;
  state.button.style.display = "block";
}

async function resetDuel() {
  state.cardSprite.avatar.src = "";
  state.button.style.display = "none";

  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";

  drawCards(5, player.player1);
  drawCards(5, player.computer);
}

async function playAudio(status) {
  const audio = new Audio(`./src/assets/audios/${status}.wav`);
  audio.play();
}

async function updateScore() {
  state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

function init() {
  drawCards(5, player.player1);
  drawCards(5, player.computer);

  const bgm = document.getElementById("bgm");
  bgm.play();
}

init();
