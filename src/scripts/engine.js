const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
<<<<<<< HEAD
=======

>>>>>>> a02c055e5b90a46c1e45bcac71305ff14fe93ffe
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

<<<<<<< HEAD
    playerSides: {
        player1: "player-cards",
        player1Box: document.getElementById("computer-cards"),
        computer: "computer-cards",
        computerBox: document.getElementById("player-cards"),
    },

    actions: {
=======
    actions:{
>>>>>>> a02c055e5b90a46c1e45bcac71305ff14fe93ffe
        button: document.getElementById("next-duel"),
    }
};

<<<<<<< HEAD

const pathImages = "./src/assets/icons/";

const cardData = [
    {
        id: 0,
=======
const playerSides = {
    player1: "player-field-card",
    computer: "computer-field-card",
}

const pathImages = "./srs/assets/icons/";

const cardData = [
    {
         id: 0,
>>>>>>> a02c055e5b90a46c1e45bcac71305ff14fe93ffe
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winOf: [1],
<<<<<<< HEAD
        loseOf: [2]
=======
        LoseOf: [2]
>>>>>>> a02c055e5b90a46c1e45bcac71305ff14fe93ffe
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf: [2],
<<<<<<< HEAD
        loseOf: [0]
    },
    {
        id: 2,
=======
        LoseOf: [0]
    },
    {
         id: 2,
>>>>>>> a02c055e5b90a46c1e45bcac71305ff14fe93ffe
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOf: [0],
<<<<<<< HEAD
        loseOf: [2]
    }
];

function getRandomIdCard() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
};

function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if (fieldSide === state.playerSides.player1) {
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });

        cardImage.addEventListener("mouseover", () => {
            drawSelectCards(cardImage.getAttribute("data-id"));
        });
    }
    return cardImage;
};

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    try {
        audio.play();
    } catch (error) {
        
    }
    
}

function drawSelectCards(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = `Atribute: ${cardData[index].type}`;
};

function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = getRandomIdCard();
        const cardImage = createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }
};

async function removeAllCardsImage() {
    let { computerBox, player1Box } = state.playerSides;

    let imgElements = computerBox.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1Box.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
};

async function drawButton(text) {
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
};

async function updateScore() {
    state.score.scoreBox.innerText = `Win :${state.score.playerScore} Lose:${state.score.computerScore}`;
}

async function checkDuelResult(playerIdCard, computerIdCard) {
    let duelResult = "Tie";
    let playerCard = cardData[playerIdCard];

    if (playerCard.winOf.includes(computerIdCard)) {
        duelResult = "Win";
        state.score.playerScore++;
        await playAudio(duelResult);
    }

    if (playerCard.loseOf.includes(computerIdCard)) {
        duelResult = "Lose";
        await playAudio(duelResult);
        state.score.computerScore++;
    }

    return duelResult;
};

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

async function setCardsField(idCard) {
    await removeAllCardsImage();
    let computerIdCard = await getRandomIdCard();

    await showHiddenCards(true);
    
    await hiddenCardDetails();

    await drawCardsInField(idCard, computerIdCard);

    let duelResult = await checkDuelResult(idCard, computerIdCard);

    await updateScore();
    await drawButton(duelResult);
}

async function drawCardsInField(idCard, computerIdCard) {
    state.fieldCards.player.src = cardData[idCard].img;
    state.fieldCards.computer.src = cardData[computerIdCard].img;
}

async function showHiddenCards(value) {
    if (value === true) {
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    }
    if (value === false) {
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
}

async function hiddenCardDetails() {
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
};

function init() {
    showHiddenCards(false)

    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.play();
};

init();
=======
        LoseOf: [2]
    }
];


async function drawCards(cardNumbers, fieldSide) {
    for( let i = 0; i < cardNumbers; i++) {
        const randomIdCcard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCcard, fieldSide);

        document.getElementById(fieldside).appendChild(cardImage);
    }
}

function init() {
    drawCards(5, playerSides.player1)
    drawCards(5, playerSides.computer)
}

init();
>>>>>>> a02c055e5b90a46c1e45bcac71305ff14fe93ffe
