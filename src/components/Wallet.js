import React, { useState, useEffect } from 'react';
import "../styles/wallet.css"

export default function Wallet(props) {
  // Step 4.1 Add a onGameOver prop
  const { gameStatus, onBetChange, onGameOver } = props;

  const [betAmount, setBetAmount] = useState(0); // Initial bet amount
  const [walletAmount, setWalletAmount] = useState(100); // Initial wallet amount
  const [inputValue, setInputValue] = useState(""); // Initial input value

  const placeBet = (e) => {
    e.preventDefault();
    const bet = parseInt(inputValue);
    // Step 1.4 Modify placeBet so that the correct states are update if the bet is valid
    if (bet <= walletAmount && bet >= 10) {
      setBetAmount(bet);
      setWalletAmount(w => w - bet);
      onBetChange();
    } else {
      alert("Invalid bet amount! Please enter a valid amount");
      setInputValue("");
    }
  };

  // Step 4.2 Use useEffect to handle the different game outcomes
  useEffect(() => {
    switch (gameStatus) {
      case 'playerBlackjack':
        setWalletAmount(w => w + (betAmount * 2.5)); // Blackjack pays 3 to 2
        onGameOver();
        break;
      case 'playerWon':
        setWalletAmount(w => w + (betAmount * 2)); // Wins pay 2 to 1
        onGameOver();
        break;
      case 'draw':
        setWalletAmount(w => w + betAmount); // Return bet to wallet
        onGameOver();
        break;
      case 'dealerWon':
        checkIfBroke(walletAmount); // Check if player is broke
        onGameOver();
        break;
      default:
        break;
    }
  }, [gameStatus]);


  // Step 4.3 Create a function checkIfBroke that checks if the wallet amount is less than or equal to 0
  const checkIfBroke = (walletAmount) => {
    if (walletAmount <= 0) {
      alert("You're broke!! - Here's more credits, don't give up! 💪");
      setWalletAmount(100);
    }
  };

  // Step 4.7 Add a useEffect to reset the bet amount and clear the input field when the game is over
  useEffect(() => {
    if (gameStatus === 'bet') {
      setBetAmount(0) // Reset bet amount && clear bet-input when game is over
      setInputValue("");
    }
  }, [gameStatus]);

  return (
    <div className="walletContainer" data-testid="wallet">
      <h2>Wallet: ${walletAmount}</h2>
      <h2>Bet: ${betAmount || ''}</h2>
      {gameStatus === 'bet' && (
        <form className="betContainer" onSubmit={placeBet}>
          <label htmlFor="bet-amount">Place your bet:</label>
          <input type="number" className="betInput" id="bet-amount" value={inputValue}
            onChange={e => setInputValue(e.target.value)}/>
          <button type="submit" className="betBtn">Bet</button>
        </form>
      )}
    </div>
  );

};
