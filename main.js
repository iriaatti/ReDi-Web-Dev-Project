let animalEmojis = ["🦜", "🪼", "🐢", "🐈", "🐘", "🐇"];
let fruitEmojis = ["🍌", "🍉", "🍑", "🥑", "🥥", "🍇"];
let deckOfCards = [];
let score = 0;
let scoreElement = document.getElementById("score");
let categoryElement = document.getElementById("emoji-category");

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
  score = 0;
  scoreElement.innerText = score;
  deckOfCards = [];
  if(categoryElement.value === "animals"){
  animalEmojis.forEach((emoji) => {
    let card = new Cards(emoji);
    let card2 = new Cards(emoji);
    deckOfCards.push(card);
    deckOfCards.push(card2);
  })
  }else{
    fruitEmojis.forEach((emoji) => {
    let card = new Cards(emoji);
    let card2 = new Cards(emoji);
    deckOfCards.push(card);
    deckOfCards.push(card2);
  })
  };

  shuffleArray(deckOfCards);
  showCardsOnTable();

  console.log(deckOfCards);
}

// SCORE COUNTING FUNCTION
function addScore() {
  setTimeout(() => {
    score += 1;
    scoreElement.innerText = score;
  }, 1400);
}

// Function to add the array of cards to the HTML and adds an event listener to check the pairs
function showCardsOnTable() {
  let gameTable = document.getElementsByClassName("table")[0];
  gameTable.innerHTML = "";
  let numberFlipped = 0;
  let cardOne;
  deckOfCards.forEach((card) => {
    let cardDiv = document.getElementsByClassName("card")[0]; // assigning a div to a variable to use as a base for the cards
    let cloneCard = cardDiv.cloneNode(true); // making a copy of the base card
    let cardFront = cloneCard.getElementsByClassName("cardFront")[0]; // assigning a child node from "card" to a variable to put the emoji
    let cardBase = cloneCard.getElementsByClassName("cardBase")[0]; // assigning a child node from "card" to a variable to add an event listener
    card.cardBase = cardBase; // saving the new variable in the "card" property of the same name

    //reference: https://www.w3schools.com/howto/howto_css_flip_card.asp
    cardBase.addEventListener("click", function () {
      numberFlipped += 1;
      cardBase.style.transform = "rotateY(-180deg)";
      if (numberFlipped === 1) {
        cardOne = card;
      } else if (numberFlipped === 2) {
        if (card.emoji === cardOne.emoji) {
          numberFlipped = 0;
          cardOne.cardBase.style.boxShadow = "5px 5px 15px green";
          card.cardBase.style.boxShadow = "5px 5px 15px green";
          addScore();
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