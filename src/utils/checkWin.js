// Step 3.6.1 Implement the checkWin function
export function checkWin (playerScore, playerCardCount, dealerScore, dealerCardCount, events) {
  // Check for Blackjack
  if ((playerCardCount === 2 && playerScore === 21) || (dealerCardCount === 2 && dealerScore === 21)) {
    if (playerCardCount === dealerCardCount && dealerScore === playerScore) {
      return events.draw;
    } else if (playerCardCount === 2 && playerScore === 21) {
      return events.playerBlackjack;
    } else {
      return events.dealerWon;
    }
    // Check for Bust
  } else if (playerScore > 21) {
    return events.dealerWon;
  } else if (dealerScore > 21 ) {
    return events.playerWon;
    // Standard win/loss conditions
  } else {
    if (dealerScore > playerScore) {
      return events.dealerWon;
    } else if (dealerScore < playerScore) {
      return events.playerWon;
    } else {
      return events.draw;
    }
  }
}
// Step 3.6.2 Implement the printMessage function
export function printMessage (result, messages) {
  switch (result) {
    case "playerBlackjack":
      return messages.playerBlackjack;
    case "playerWon":
      return messages.playerWon;
    case "dealerWon":
      return messages.dealerWon;
    case "draw":
      return messages.draw;
    default:
      return "Error";
  }
}
