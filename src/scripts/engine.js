// Estado da aplicação
const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
  },
  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
  },
  playersSides: {
    player1: "player-cards",
    player1BOX: document.querySelector("#player-cards"),
    computer: "computer-cards",
    computerBOX: document.querySelector("#computer-cards"),
  },
  actions: {
    button: document.getElementById("next-duel"),
  },
};

// Sides dos jogadores
const playersSides = {
  player1: "player-cards",
  computer: "computer-cards",
};

// Caminho para as imagens
const pathImages = "./src/assets/icons/";

// Dados das cartas
const cardData = [
  {
    id: 0,
    name: "Dragão Branco Olhos Azuis",
    type: "Papel",
    img: `${pathImages}dragon.png`,
    winOf: [1],
    loseOf: [2],
  },
  {
    id: 1,
    name: "Mago Negro",
    type: "Pedra",
    img: `${pathImages}magician.png`,
    winOf: [2],
    loseOf: [0],
  },
  {
    id: 2,
    name: "Exodia",
    type: "Tesoura",
    img: `${pathImages}exodia.png`,
    winOf: [0],
    loseOf: [1],
  },
];

// Função para obter um ID aleatório
async function getRandomId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}

// Função para criar a imagem de uma carta
async function createCardImage(idCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", idCard);
  cardImage.classList.add("card");

  // Adiciona evento de clique apenas para o lado do jogador
  if (fieldSide === playersSides.player1) {
    // Adiciona evento de mouseover para destacar a carta
    cardImage.addEventListener("mouseover", () => {
      drawSelectCard(idCard);
    });

    cardImage.addEventListener("click", () => {
      setCardsField(cardImage.getAttribute("data-id"));
    });
  }

  return cardImage;
}

// Função para definir cartas no campo
async function setCardsField(cardId) {
  // Remove todas as cartas antes
  await removeAllCardsImages();

  let computerCardId = await getRandomId();

  await hiddenCardsFieldsImages(true);

  await hiddenCardsdetails();

  await drawCardsInField(cardId, computerCardId);

  let duelResults = await checkDuelResult(cardId, computerCardId);

  await updateScore();

  await drawButton(duelResults);
}

// Função para desenhar cartas no campo
async function drawCardsInField(cardId, computerCardId) {
  state.fieldCards.player.src = cardData[cardId].img;
  state.fieldCards.computer.src = cardData[computerCardId].img;
}

// Função para ocultar imagens dos campos de cartas
async function hiddenCardsFieldsImages(value) {
  if (value === true) {
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";
  }

  if (value === false) {
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
  }
}

// Função para ocultar detalhes das cartas
async function hiddenCardsdetails() {
  state.cardSprites.avatar.src = "";
  state.cardSprites.name.innerText = "";
  state.cardSprites.type.innerText = "";
}

// Função para atualizar a pontuação
async function updateScore() {
  state.score.scoreBox.innerText = `Venceu: ${state.score.playerScore} Perdeu: ${state.score.computerScore}`;
}

// Função para desenhar o botão
async function drawButton(text) {
  state.actions.button.innerText = text.toUpperCase();
  state.actions.button.style.display = "block";
}

// Função para verificar o resultado do duelo
async function checkDuelResult(playerCardId, computerCardId) {
  let duelResults = "draw";
  let playerCard = cardData[playerCardId];

  if (playerCard.winOf.includes(computerCardId)) {
    duelResults = "win";
    state.score.playerScore++;
  }

  if (playerCard.loseOf.includes(computerCardId)) {
    duelResults = "lose";
    state.score.computerScore++;
  }
  await playAudio(duelResults);

  return duelResults;
}

// Função para remover todas as imagens de cartas
async function removeAllCardsImages() {
  let { computerBOX, player1BOX } = state.playersSides;
  let imgElements = computerBOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());

  imgElements = player1BOX.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
}

/**
 * Atualiza as informações e a imagem da carta selecionada no estado da aplicação.
 * @param {number} index - O índice da carta no array de dados das cartas.
 */
async function drawSelectCard(index) {
  // Atualiza a imagem do avatar no estado com a imagem da carta selecionada
  state.cardSprites.avatar.src = cardData[index].img;

  // Atualiza o texto do nome da carta no estado
  state.cardSprites.name.innerText = cardData[index].name;

  // Atualiza o texto do tipo da carta no estado, adicionando o atributo
  state.cardSprites.type.innerText = "Atributo: " + cardData[index].type;
}

// Função para desenhar cartas no campo
async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomId();
    const cardImage = await createCardImage(randomIdCard, fieldSide);

    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

// Função para redefinir o duelo
async function resetDuel() {
  // Reinicia os elementos visuais para um novo duelo
  state.cardSprites.avatar.src = "";
  state.actions.button.style.display = "none";

  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";

  // Inicializa um novo duelo
  init();
}

// Função para reproduzir áudio com tratamento de erro
async function playAudio(status) {
  const audio = new Audio(`./src/assets/audios/${status}.wav`);

  try {
    audio.play();
  } catch (error) {
    console.error("Erro ao reproduzir áudio:", error.message);
  }
}

// Inicialização do jogo
function init() {
  // Configuração inicial para um novo duelo
  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";
  hiddenCardsFieldsImages(false);

  drawCards(5, playersSides.player1);
  drawCards(5, playersSides.computer);

  const bgm = document.getElementById("bgm");
  bgm.play();
}

// Chama a função de inicialização
init();