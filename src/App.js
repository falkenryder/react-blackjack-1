import React, { useState, useEffect } from 'react';
import './styles/app.css';
import Wallet from './components/Wallet';
import deckJson from './deck.json';
import shuffleDeck from './utils/shuffleDeck';

export default function App() {
  // Events that will be emitted by the game
  const events = {
    bet: "bet",
    playerTurn: "playerTurn",
    dealerTurn: "dealerTurn",
    resolve: "resolve",
    playerWon: "playerWon",
    dealerWon: "dealerWon",
    draw: "draw",
    playerBlackjack: "playerBlackjack",
    gameOver: "gameOver"
  }

  // Messages that will be displayed to the player
  const messages = {
    init: "Welcome to React Blackjack! Place your bet to begin.",
    bet: "",
    playerWon: "You Win!",
    dealerWon: "Dealer Wins!",
    draw: "Push! It's a Tie!",
    playerBlackjack: "BLACKJACK! You Win!"
  }

  // Deck state and data
  const data = JSON.parse(JSON.stringify(deckJson));
  // Initalize the deck state

  // Use useEffect to call the shuffleDeck function when the component is first rendered

  // Event and message states
  const [gameStatus, setGameStatus] = useState(events.bet);
  const [message, setMessage] = useState(messages.init);

  return (
    <div className="App">
      <div className='grid-container'>
        <div className='message-container'>{message && <h1>{message}</h1>}</div>
      </div>
      <Wallet gameStatus={gameStatus} />
    </div>
  );
}
