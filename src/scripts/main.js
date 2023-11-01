// Armazenando os elementos do DOM em variáveis para evitar a busca repetida
const scoreBox = document.getElementById("score_points");
const avatar = document.getElementById("card-image");
const name = document.getElementById("card-name");
const type = document.getElementById("card-type");
const playerFieldCard = document.getElementById("player-field-card");
const computerFieldCard = document.getElementById("computer-field-card");
const nextDuelButton = document.getElementById("next-duel");

const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox,
    },
    cardSprite: {
        avatar,
        name,
        type,
    },
    fieldCards: {
        player: playerFieldCard,
        computer: computerFieldCard,
    },
    button: nextDuelButton,
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

function getRandomCardId() {
    return Promise.resolve(Math.floor(Math.random() * cardData.length));
}

function setCardsField(cardId) {
    return RemoveAllCardImages()
      .then(() => getRandomCardId())
      .then((computerCardId) => {
          state.fieldCards.player.style.display = "block";
          state.fieldCards.computer.style.display = "block";
          state.fieldCards.player.src = cardData[cardId].img;
          state.fieldCards.computer.src = cardData[computerCardId].img;
          return checkDuelResults(cardId, computerCardId);
      })
      .then((duelResults) => {
          updateScore();
          drawButton(duelResults);
      });
}

function checkDuelResults(playerCardId, computerCardId) {
    let playerCard = cardData[playerCardId];
    let duelResults = "Empate";

    if (playerCard.WinOf.includes(computerCardId)) {
      duelResults = "Ganhou";
      playAudio("win");
      state.score.playerScore++;
    }
    
    if (playerCard.LoseOf.includes(computerCardId)) {
      duelResults = "Perdeu";
      playAudio("lose");
      state.score.computerScore++;
    }
    
    return Promise.resolve(duelResults);
}

function createCardImage(randomIdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", randomIdCard);
    cardImage.classList.add("card");

    if (fieldSide === player.player1) {
      cardImage.addEventListener("click", () => setCardsField(cardImage.getAttribute("data-id")));
      cardImage.addEventListener("mouseover", () => drawSelectCard(randomIdCard));
      cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    }

    return Promise.resolve(cardImage);
}

function RemoveAllCardImages() {
  let cards = document.querySelector(".card-box.framed#computer-cards");
  let imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
  
  cards = document.querySelector(".card-box.framed#player-cards");
  imgElements = cards.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
  
  return Promise.resolve();
}

function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
      getRandomCardId()
          .then((randomIdCard) => createCardImage(randomIdCard, fieldSide))
          .then((cardImage) => document.getElementById(fieldSide).appendChild(cardImage));
  }
}

function drawSelectCard(index) {
  state.cardSprite.avatar.src = cardData[index].img;
  state.cardSprite.name.innerText = cardData[index].name;
  state.cardSprite.type.innerText = "Attribute: " + cardData[index].type;
}

function drawButton(text) {
  state.button.innerText = text;
  state.button.style.display = "block";
}

function resetDuel() {
  state.cardSprite.avatar.src = "";
  state.button.style.display = "none";
  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";
  drawCards(5, player.player1);
  drawCards(5, player.computer);
}

function playAudio(status) {
  const audio = new Audio(`./src/assets/audios/${status}.wav`);
  audio.play();
}

function updateScore() {
  state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

function init() {
  drawCards(5, player.player1);
  drawCards(5, player.computer);
  const bgm = document.getElementById("bgm");
  bgm.play();
}

init();
