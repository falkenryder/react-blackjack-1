import React, { useState, useEffect } from 'react';
import './styles/App.css';
import deckJson from './deck.json';
import shuffleDeck from './utils/shuffleDeck';
import drawCard from './utils/drawCard';

export default function App() {
  // Events that will be emitted by the game
  const events = {
    bet: "bet",
    userTurn: "userTurn",
    dealerTurn: "dealerTurn",
    resolve: "resolve",
    userWon: "userWon",
    dealerWon: "dealerWon",
    draw: "draw",
    userBlackjack: "userBlackjack",
    gameOver: "gameOver"
  }

  // Messages that will be displayed to the user
  const messages = {
    init: "Welcome to React Blackjack! Place your bet to begin.",
    bet: "bet",
    userTurn: "userTurn",
    dealerTurn: "dealerTurn",
    resolve: "resolve",
    userWon: "userWon",
    dealerWon: "dealerWon",
    draw: "draw",
    userBlackjack: "userBlackjack",
    gameOver: "gameOver"
  }

  // Deck state and data
  const data = JSON.parse(JSON.stringify(deckJson));
  const [deck, setDeck] = useState([]);

  // Step 1.3 Use useEffect to call the shuffleDeck function when the component is first rendered
  useEffect(() => {
    setDeck(shuffleDeck(data.cards));
  }, []);

  // Event and message states
  const [gameStatus, setGameStatus] = useState(events.bet);
  const [message, setMessage] = useState(messages.init);

  return (
    <div className="App">
      <div className='grid-container'>
        <div className='message-container'>{message && <h1>{message}</h1>}</div>
      </div>
    </div>
  );
}
