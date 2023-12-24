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

    actions:{
        button: document.getElementById("next-duel"),
    }
};

const playerSides = {
    player1: "player-field-card",
    computer: "computer-field-card",
}

const pathImages = "./srs/assets/icons/";

const cardData = [
    {
         id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winOf: [1],
        LoseOf: [2]
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf: [2],
        LoseOf: [0]
    },
    {
         id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOf: [0],
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