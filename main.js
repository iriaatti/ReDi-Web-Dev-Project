let emojis = ["🦜", "🪼", "🐢", "🐈", "🐘", "🐇"];
let deckOfCards = [];

class Cards {
  constructor(emoji, cardBase) {
    this.emoji = emoji;
    this.cardBase = cardBase;
  }
}

// Function to randomize index of array elements
//copied from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let currentElement = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = currentElement;
  }
}

// Function to generate pairs of cards in an array
function generateCards() {
  deckOfCards = [];
  emojis.forEach(emoji => {
    let card = new Cards(emoji);
    let card2 = new Cards(emoji);
    deckOfCards.push(card);
    deckOfCards.push(card2);
  });

  shuffleArray(deckOfCards);
  showCardsOnTable();

  console.log(deckOfCards);
}

// Function to add the array of cards to the HTML and adds an event listener to check the pairs
function showCardsOnTable() {
  let gameTable = document.getElementsByClassName("table")[0];
  gameTable.innerHTML = "";
  let numberFlipped = 0;
  let cardOne;
  deckOfCards.forEach(card => {
    let cardDiv = document.getElementsByClassName("card")[0];
    let cloneCard = cardDiv.cloneNode(true);
    let cardFront = cloneCard.getElementsByClassName("cardFront")[0];
    let cardBase = cloneCard.getElementsByClassName("cardBase")[0];
    card.cardBase = cardBase;
    //reference: https://www.w3schools.com/howto/howto_css_flip_card.asp
    cardBase.addEventListener("click", function () {
      numberFlipped += 1;
      cardBase.style.transform = "rotateY(-180deg)";
      if (numberFlipped === 1) {
        cardOne = card;
      } else if (numberFlipped === 2) {
        if (card.emoji === cardOne.emoji) {
          numberFlipped = 0;
        } else {
          // Asynchronous Programming
          setTimeout(function () {
            cardOne.cardBase.style.transform = "rotateY(0deg)";
            card.cardBase.style.transform = "rotateY(0deg)";
          }, 1200);
          numberFlipped = 0;
        }
        console.log(cardOne === card.emoji);
        console.log(numberFlipped, cardOne, card.emoji);
      }
    });

    let emojiNode = document.createTextNode(card.emoji);
    cardFront.appendChild(emojiNode);
    gameTable.appendChild(cloneCard);
  });
}

let playButton = document.getElementById("play-button");

playButton.addEventListener("click", generateCards);

// TODO - score counter
