console.log('connected')

var suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds']
var vals = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']

var Card = function(suit, val) {
    this.suit = suit
    this.val = val
    this.stateValue = function() {
        return 'The ' + this.val + ' of ' + this.suit + '.'
    }
}
var deck = []

for (var i = 0; i < vals.length; i++) {
    for (var j = 0; j < suits.length; j++) {
        var card = new Card(suits[j], vals[i])
        deck.push(card)
    }
}

function getCard(deck) {
    var min = Math.ceil(0);
    var max = Math.floor(deck.length - 1);
    var rand = Math.floor(Math.random() * (max - min)) + min;
    var newCard = deck[rand];
    deck.splice(rand, 1);
    return newCard;
}
var userHand;
var dealerHand;

function dealCards() {
    userHand = [getCard(deck), getCard(deck)];
    dealerHand = [getCard(deck), getCard(deck)];
    $('#hitButton').click(function() {
        userHand.push(getCard(deck))
    })
    $('#stayButton').click(function() {
        for (var i = 0; i < userHand.length; i++) {
            if (userHand[i].val === 'Jack' || userHand[i].val === 'Queen' || userHand[i].val === 'King') {
                userHand[i].val = 10;
            } else if (dealerHand[i].val === 'Jack' || dealerHand[i].val === 'Queen' || dealerHand[i].val === 'King') {
                dealerHand[i].val = 10;
            } else if (userHand[i].val === 'Ace') {
                userHand[i].val = 11;
            } else if (dealerHand[i].val === 'Ace') {
                dealerHand[i].val = 11;
            }

  function dealerHit() {
      for (var i = 0; i < dealerHand.length; i++) {
      //if (dealerHand[i] <= 17){
        if (dealerHand[0] + dealerHand[1] <= 17){
          dealerHand.push(getCard(deck));
        }
  }
        }
        gameWinner();
    })

}
dealCards();

function gameWinner() {
    if (userHand === 21) {
        console.log("congrats! you scored 21")
    } else if (userHand > 21) {
        console.log("sorry, you have gone over 21")
    } else if (dealerHand > 21) {
        console.log("The dealer is busted!")
    } else if (userHand > dealerHand && userHand <= 21) {
        console.log("you have beat the dealer!")
    } else if (dealerHand > userHand && dealerHand <= 21) {
        console.log("sorry the dealer beat you!")
    } else {
        console.log("It is a tie!")
    }
}

// Questions: how to make div appear on screen. if you need "+" for hands,
