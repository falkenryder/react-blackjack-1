import React, { useState, useEffect } from 'react';
import "../styles/wallet.css"

export default function Wallet(props) {
  const { gameStatus, onBetChange } = props;

  const [betAmount, setBetAmount] = useState(0); // Initial bet amount
  const [walletAmount, setWalletAmount] = useState(100); // Initial wallet amount
  const [inputValue, setInputValue] = useState(""); // Initial input value

  const placeBet = (e) => {
    e.preventDefault();
    const bet = parseInt(inputValue);
    // Modify placeBet so that the correct states are update if the bet is valid

    alert("Invalid bet amount! Please enter a valid amount");
    setInputValue("");

  };
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
