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
  emojis.forEach(function (emoji) {
    let card = new Cards(emoji, false);
    let card2 = new Cards(emoji, false);
    deckOfCards.push(card);
    deckOfCards.push(card2);
  });
  shuffleArray(deckOfCards);
  console.log(deckOfCards);
}

let playButton = document.getElementById("play-button");

playButton.addEventListener("click", generateCards);
