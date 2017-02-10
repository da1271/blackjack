console.log('connected')

var suits = ['spades', 'hearts', 'clubs', 'diamonds']
var vals = ['ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king']


var Card = function(suit, val) {
    this.suit = suit
    this.val = val
    this.stateValue = function() {
        return 'The ' + this.val + ' of ' + this.suit + '.'
    }
}
var deck = []

function makeNewDeck() {
    deck = []
    for (var i = 0; i < vals.length; i++) {
        for (var j = 0; j < suits.length; j++) {
            var card = new Card(suits[j], vals[i])
            deck.push(card)
        }
    }
}

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
var userHand = [];
var dealerHand = [];

var userScore = 0;
var dealerScore = 0;
// var userCredit = 1000;
// $('#playerCreditHtml').text("Player credit: " + userCredit)
// $('#betSubmit2').click(function(){
//   if (userScore === 21){
//     userCredit + 100;
//   }
// })
// //
// //
// // //   <input type="submit" value="Bet 100" id='betSubmit2'>
// //   // <input type="submit" value="Bet 200" id='betSubmit3'>
// //   // <input type="submit" value="Bet 500" id='betSubmit4'>
// //
// // function betSystem() {
// //     userCredit = 1000;
// //     $('#betSubmit2').click
// //
// //     if (userScore === 21) {
// //    ('')
// //         userCredit = userCredit + userBet;
// //     } else if (userScore > 21) {
// //         userCredit = userCredit - userBet;
// //     } else if (dealerScore > 21) {
// //         userCredit = userCredit + userBet;
// //     } else if (userScore > dealerScore && userScore <= 21) {
// //         userCredit = userCredit + userBet;
// //     } else if (dealerScore > userScore && dealerScore <= 21) {
// //         userCredit = userCredit - userBet;
// //     } else {
// //         userCredit = userCredit;
// //     }

function acesLast(a,b){   // make function for sortcomparison method
    var first = a.val;
    var second = b.val;

    if(first === 'jack' || first === 'queen' || first === 'king') {
        first = 10
    } else if(first === 'ace') {
        first = 11
    }

    if(second === 'jack' || second === 'queen' || second === 'king') {
        second = 10
    } else if(second === 'ace') {
        second = 11
    }

    return first - second
}
function getSumOfCards() {
  userHand.sort(acesLast)
  dealerHand.sort(acesLast)
    userScore = 0;
    dealerScore = 0;
    for (var i = 0; i < userHand.length; i++) {
        if (userHand[i].val === 'jack' || userHand[i].val === 'queen' || userHand[i].val === 'king') {
            userScore += 10;

        } else if (userHand[i].val === 'ace' && userScore + 11 <= 21) {
            userScore += 11;
        } else if (userHand[i].val === 'ace' && userScore + 11 > 21) {
            userScore += 1;
        } else {
          userScore += userHand[i].val
        }
    }
    for (var j = 0; j < dealerHand.length; j++) {
        if (dealerHand[j].val === 'jack' || dealerHand[j].val === 'queen' || dealerHand[j].val === 'king') {
            dealerScore += 10;

        } else if (dealerHand[j].val === 'ace' && dealerScore + 11 <= 21) {
            dealerScore += 11;
        } else if (dealerHand[j].val === 'ace' && dealerScore + 11 > 21) {
            dealerScore += 1;
        }else {
          dealerScore += dealerHand[j].val
        }
    }
    //
    // for (var i = 0; i < userHand.length; i++) {
    //     userScore = userScore + userHand[i].val
    // }
    // for (var j = 0; j < dealerHand.length; j++) {
    //     dealerScore = dealerScore + dealerHand[j].val
    // }
}
$('#playButton').on('click', dealCards);

function dealCards() {
    userHand = [getCard(deck), getCard(deck)];
    dealerHand = [getCard(deck), getCard(deck)];
    $('#dealerCard1').html('<img src="playing_cards/PNG-cards-1.3/' + dealerHand[0].val + '_of_' + dealerHand[0].suit.toLowerCase() + '.png"  />')
    $('#dealerCard2').html('<img src="playing_cards/PNG-cards-1.3/' + dealerHand[1].val + '_of_' + dealerHand[1].suit.toLowerCase() + '.png"  />')
    $('#userCard1').html('<img src="playing_cards/PNG-cards-1.3/' + userHand[0].val + '_of_' + userHand[0].suit.toLowerCase() + '.png" />')
    $('#userCard2').html('<img src="playing_cards/PNG-cards-1.3/' + userHand[1].val + '_of_' + userHand[1].suit.toLowerCase() + '.png" />')
    $('#dealerCard3').html('')
    $('#dealerCard4').html('')
    $('#dealerCard5').html('')
    $('#userCard3').html('')
    $('#userCard4').html('')
    $('#userCard5').html('')


}
var newcardcount = 3
$('#hitButton').click(function() {
    userHand.push(getCard(deck))
    $('#userCard' + newcardcount).html('<img src="playing_cards/PNG-cards-1.3/' + userHand[userHand.length - 1].val + '_of_' + userHand[userHand.length - 1].suit.toLowerCase() + '.png" />');
    newcardcount++;
    getSumOfCards();


})
$('#stayButton').click(function() {
    var newcardcount2 = 3;
    newcardcount = 3;
    while (dealerScore <= 17) {
        dealerHand.push(getCard(deck));
        $('#dealerCard' + newcardcount2).html('<img src="playing_cards/PNG-cards-1.3/' + dealerHand[dealerHand.length - 1].val + '_of_' + dealerHand[dealerHand.length - 1].suit.toLowerCase() + '.png" />')
        newcardcount2++;
        getSumOfCards();

    }
    getSumOfCards();
    makeNewDeck();
    dealCards();
    gameWinner();

})


$('#reset-game').click(function() {
    location.reload();
})
// maybe dealCards before determining winner? / div/ betting system.



function gameWinner() {
    if (userScore === 21) {
        $('#winNer').text("congrats! you scored 21");
    } else if (userScore > 21) {
        $('#winNer').text("sorry, you have gone over 21")
    } else if (dealerScore > 21) {
        $('#winNer').text("The dealer is busted!")
    } else if (userScore > dealerScore && userScore <= 21) {
        $('#winNer').text("you have beat the dealer!")
    } else if (dealerScore > userScore && dealerScore <= 21) {
        $('#winNer').text("sorry the dealer beat you!")
    } else if (userScore === dealerScore) {
        $('#winNer').text("It is a tie!")
    }
}

// Get the modal
var modal = $('#myModal');

// Get the button that opens the modal
var btn = $("#stayButton");

// Get the <span> element that closes the modal
var span = $(".close").eq(0);

// When the user clicks on the button, open the modal
btn.click (function() {
    modal.css("display", "block");
})

// When the user clicks on <span> (x), close the modal
span.click (function() {
    modal.css("display", "none");
})

// When the user clicks anywhere outside of the modal, close it
