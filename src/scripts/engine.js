const state ={
    score:{
        playerScore:0,
        computerScore:0,
        scoreBox: document.getElementById('score_points'),
    },
    cardSprites:{
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),
    },
    fieldCards:{
        player:document.getElementById('player-field-card'),
        computer:document.getElementById('computer-field-card'),
    },
    playerSides : {
        player1: "player-cards",
        player1Box:document.getElementById("player-cards"),
        computer: "computer-cards",
        computerBox:document.getElementById("computer-cards"),
    },
    actions:{
        button: document.getElementById('next-duel'),
    }
   
};


const pathImages = "src/assets/icons/";

const cardData = [
    {
        id:0,
        name:"Blue Eyes White Dragon",
        type: "Flying", 
        img: `${pathImages}dragon.png`,
        WinOf:[2],
        LoseOf:[1]
    },
    {
        id:1,
        name:"Dark MAgician",
        type: "Shadow",
        img: `${pathImages}magician.png`,
        WinOf:[0],
        LoseOf:[2]
    },
    {
        id:2,
        name:"Exodia",
        type: "Magic",
        img: `${pathImages}exodia.png`,
        WinOf:[1],
        LoseOf:[0]
    },
];

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random()*cardData.length); 
    return cardData[randomIndex].id;
};

async function createCardImage(idCard,fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height","100px");
    cardImage.setAttribute("src","./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id",idCard);
    cardImage.classList.add("card");

    if(fieldSide === state.playerSides.player1){

        cardImage.addEventListener("mouseover",()=>{
            drawSelectCard(idCard);
        })

        cardImage.addEventListener("click",()=>{
            setCardsField(cardImage.getAttribute( "data-id" ));
        })

        
    }

    
    return cardImage;
}

async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute: " + cardData[index].type;
}
async function drawCards(cardNumbers, fieldSide){
    for(let i=0; i < cardNumbers; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard,fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
}
}

async function removeAllCardsImages(){
    let {computerBox, player1Box} = state.playerSides;
    let imageElements = computerBox.querySelectorAll( "img" );
    imageElements.forEach((img)=>{
        img.remove()
    })

    
    imageElements = player1Box.querySelectorAll( "img" );
    imageElements.forEach((img)=>{
        img.remove()
    })
}

async function checkDuelResults(playerCardId,computerCardId){
    let duelResults = "Draw";
    let playerCard = cardData[playerCardId];

    if(playerCard.WinOf.includes(computerCardId)){
        duelResults = "Win";
        await playAudio(duelResults);
        state.score.playerScore++;
    }
    if(playerCard.LoseOf.includes(computerCardId)){
        duelResults = "Lose";
        await playAudio(duelResults);
        state.score.computerScore++;
    }

    return duelResults;
}

async function drawButton(text){
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

async function updateScore(){
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore}  | Lose: ${state.score.computerScore}`;
}


async function drawCardsInField(cardId,computerCardId){
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

}

async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display= "none";
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init()
}
async function hiddenCardsDetails(){
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
    state.cardSprites.avatar.src = "";
}

async function showHiddenCardFieldsImages(value){
    if(value){
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    } else {
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
}

async function playAudio(status){
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.play();
}

async function setCardsField(cardId){
    await removeAllCardsImages();
    let computerCardId = await getRandomCardId();
    await showHiddenCardFieldsImages(true)
    await hiddenCardsDetails()
    await drawCardsInField(cardId,computerCardId);
    let duelResults = await checkDuelResults(cardId,computerCardId);
    await updateScore();
    await drawButton(duelResults);
}

function init(){
    const bgm = document.getElementById( 'bgm' );
    bgm.play();

    showHiddenCardFieldsImages(false)

    drawCards(5,state.playerSides.player1);
    drawCards(5,state.playerSides.computer);

    
}

init();