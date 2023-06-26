# Background and Objectives

In this quest, you will build a Blackjack game. Unlike similar exercises you may have encountered, this quest takes it up a notch, offering a more intricate challenge. However, don't let the complexity scare you off! It's all part of the fun! We recommend that you have a good understanding of Javascript, as well as some knowledge of function-based React, but not to worry if you don't, because you will be guided all the way!

In the real world of Blackjack, you place bets, receive cards, decide whether to hit or stand, and see if the dealer busts or beats your hand. In the code world, you will be implementing these same actions through JavaScript and React.

Here are some comparisons between the real world and the code world for this exercise:

|   Real World    |   Code World    |
|:---------------:|:---------------:|
|   Placing a bet   |  Entering a number and clicking 'Bet' button |
|   Receiving cards  |   Cards are dealt from a deck randomised by a shuffling algorithm and added to player's/dealer's hand |
|   Deciding to hit or stand  |  Clicking 'Hit' or 'Stand' button |
|   Dealer takes action   |  Automatic dealer actions based on implemented logic |
|   Getting Blackjack, Busting  |   Certain combinations of cards, along with their score, take precedence over others |
|   Winning/Losing the game  |   Conditionally rendering game result based on player's and dealer's cards |

## Specs

As a player, here's what you should be able to do:

**Start a New Game:** Click the "New Game" button to initiate a new game. The virtual deck shuffles and the game is set.

**Place Your Bet:** You can stake anything from $10 to the total amount currently in your wallet. The game ensures that you can't bet more than what you have or less than the minimum bet.

**Deal the Cards:** Once you've placed your bet, press the "Deal" button. You'll receive two cards, while the dealer also gets two - one face-up, one face-down. 

**Blackjack?:** Similar to playing in a casino, You win automatically if you get blackjack! (an Ace paired with any 10-point card). Unless...😈

**Make Your Moves:** Choose to "Hit" if you want another card, or "Stand" if you're confident with your hand. Just be careful not to exceed 21 points, or you'll go bust!

**Watch the Dealer's Turn:** After you've stood, the dealer makes their moves. As with the famous line printed on every blackjack table, **Dealer must draw to 16 and stand on 17**.

**See the Winner:** If you didn't bust, your score and the dealer's score are compared. The one closer to 21 wins! If it's a tie, it's a push, and you get your bet back.

**Check Your Payout:** Did you win? Congrats! Your bet is doubled. If the dealer wins, better luck next time. The bet amount is forfeited. In the case of a push, your original bet is returned to your wallet.

**Play Again?:** If you're up for another round, the game will continue until you're out of funds or decide to exit the game.


## Key learning points

- How does state management work in React?
- How do we handle user input and events in React?
- How can we implement game logic using JavaScript and React?
- How can we use conditional rendering to display different components based on the game state?
