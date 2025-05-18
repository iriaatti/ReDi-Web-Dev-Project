let emojis = ["🦜", "🪼", "🐢", "🐈", "🐘"];
let deckOfCards = [];

class Cards {
  constructor(emoji, flipStatus) {
    this.emoji = emoji;
    this.flipStatus = flipStatus; //boolean
  }
  flip() {
    this.flipStatus = !this.flipStatus;
  }
}

//copied from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function generateCards() {
  deckOfCards = [];
  let gameTable = document.getElementsByClassName("table")[0];
  gameTable.innerHTML = "";
  emojis.forEach(function (emoji) {
    let card = new Cards(emoji, false);
    let card2 = new Cards(emoji, false);
    deckOfCards.push(card);
    deckOfCards.push(card2);
  });

  shuffleArray(deckOfCards);
  deckOfCards.forEach(function (card) {
    let cardDiv = document.getElementsByClassName("card")[0];
    let cloneCard = cardDiv.cloneNode(true);
    let cardFront = cloneCard.getElementsByClassName("cardFront")[0];

    let cardBase = cloneCard.getElementsByClassName("cardBase")[0];
    cardBase.addEventListener("click", function () {
      cardBase.style.transform = "rotateY(-180deg)";
    });

    let emojiNode = document.createTextNode(card.emoji);
    cardFront.appendChild(emojiNode);
    gameTable.appendChild(cloneCard);
  });
  console.log(deckOfCards);
}

let playButton = document.getElementById("play-button");

playButton.addEventListener("click", generateCards);
