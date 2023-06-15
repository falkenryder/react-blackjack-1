// STEP 4: Wallet

import React, { useEffect, useState } from 'react';
import "../styles/wallet.css"

export default function Wallet(props) {

  const gameStatus = props.gameStatus;
  const onBetChange = props.onBetChange;
  const onGameOver = props.onGameOver;

  const [betAmount, setBetAmount] = useState(0); // Initial bet amount
  const [walletAmount, setWalletAmount] = useState(100); // Initial wallet amount


  const placeBet = (e) => {
    e.preventDefault();
    const inputBet = parseInt(e.target.querySelector('input').value);
    // check validity of the bet
    if (inputBet <= walletAmount && inputBet > 0) {
      setBetAmount(inputBet);
      setWalletAmount(w => w - inputBet);
      onBetChange();
    } else {
      alert("Invalid bet amount! Please enter a valid amount");
    }
  };

  const clearBetInput = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = ""))
  };

  const checkIfBroke = (walletAmount) => {
    if (walletAmount <= 0) {
      alert("Bust!! You're broke - Hit New Game to try again 🥲");
      setWalletAmount(100);
    }
  };

  useEffect(() => {
    if (gameStatus === 'userBlackjack') {
      setWalletAmount(w => w + (betAmount * 2.5));// Blackjack pays 3 to 2
      onGameOver();
    } else if (gameStatus === 'userWon') {
      setWalletAmount(w => w + (betAmount * 2)); // Wins pay 2 to 1
      onGameOver();
    } else if (gameStatus === 'draw') {
      setWalletAmount(w => w + betAmount); // Return bet to wallet
      onGameOver();
    } else if (gameStatus === 'dealerWon') {
      checkIfBroke(walletAmount); // Check if player is broke
      onGameOver(); // If dealer wins, no need to update wallet
    }
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus === 'bet') {
      setBetAmount(0)
      clearBetInput(); // Reset bet amount && betInput to 0 when game is over
    }
  }, [gameStatus]);

  return (
    <div className="walletContainer" id='wallet'>
      <h2>Wallet: ${walletAmount}</h2>
      <h2>Bet: ${betAmount ? betAmount : ''}</h2>
      {gameStatus === "bet" && (
        <form className="betContainer" onSubmit={placeBet}>
          <input type="number" className="betInput" id='bet-amount'/>
          <button type="submit" className="betBtn"><p>Bet</p></button>
        </form>
      )}
    </div>
  );
};
