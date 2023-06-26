import React, { useState, useEffect } from 'react';
import './styles/app.css';
import Wallet from './components/Wallet';
import deckJson from './deck.json';
import shuffleDeck from './utils/shuffleDeck';
// Import the calculateScore function
import calculateScore from './utils/calculateScore';
import Hand from './components/Hand';
// Import the Controls component
import Controls from './components/Controls';
// Import the checkWin & printMessage functions
import { checkWin, printMessage } from './utils/checkWin';

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
  const [deck, setDeck] = useState([]);

  // Create state variables for the player and dealer scores, cards, and card counts
  const [playerScore, setPlayerScore] = useState(0);
  const [playerCards, setPlayerCards] = useState([]);
  const [playerCardCount, setPlayerCardCount] = useState(0);

  const [dealerScore, setDealerScore] = useState(0);
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerCardCount, setDealerCardCount] = useState(0);


  // Use useEffect to call the shuffleDeck function when the component is first rendered
  useEffect(() => {
    setDeck(shuffleDeck(data.cards));
  }, []);

  // Event and message states
  const [gameStatus, setGameStatus] = useState(events.bet);
  const [message, setMessage] = useState(messages.init);

  // Create the handleBetChange function so that the correct steps are implemented after the player places a bet
  const handleBetChange = () => {
    setMessage(messages.bet);
    // deal cards
    drawCard("player");
    drawCard("dealer");
    drawCard("player");
    drawCard("dealer-hidden");
    // set game status to "playerTurn"
    setGameStatus(events.playerTurn);
  };

  // Create the handleStand function so that the correct steps are implemented after the player clicks the "Stand" button
  const handleStand = () => {
    setGameStatus(events.dealerTurn);
    dealerCards.forEach((card) => {
      if (card.hidden === true) {
        card.hidden = false;
        setDealerCardCount(count => ++count);
      }
    });
    setDealerCards([...dealerCards]);
  };

  // Create the handleResetGame function so that the correct steps are implemented after the player clicks the "New Game" button
  const handleResetGame = () => {
    setPlayerScore(0);
    setPlayerCards([]);
    setDealerScore(0);
    setDealerCards([]);
    setDeck(shuffleDeck(data.cards));
    setMessage(messages.bet);
    setGameStatus(events.bet);
  };

  // Create a function drawCard that takes a target parameter and draws a card from the deck
  const drawCard = (target) => {
    if (deck.length > 0) {
      const card = deck.pop();
      setDeck([...deck]);

      switch (target) {
        case "player":
          playerCards.push({...card, hidden: false });
          setPlayerCards([...playerCards]);
          setPlayerCardCount(count => ++count);
        break;
        case "dealer":
          dealerCards.push({...card, hidden: false });
          setDealerCards([...dealerCards]);
          setDealerCardCount(count => ++count);
        break;
      case "dealer-hidden":
        dealerCards.push({...card, hidden: true });
        setDealerCards([...dealerCards]);
        break;
      default:
        break;
      }
    }
  };

    // Use useEffect to calculate the player and dealer scores when the player or dealer cards change
    useEffect(() => {
      setPlayerScore(calculateScore(playerCards));
    }, [playerCards]);

    useEffect(() => {
      setDealerScore(calculateScore(dealerCards));
    }, [dealerCards]);


  // Use useEffect to check the win condition and set the correct message when the game status changes to resolve
  useEffect(() => {
    if (gameStatus === events.resolve) {
      let event = checkWin(playerScore, playerCardCount, dealerScore, dealerCardCount, events);
      setGameStatus(event);
      setMessage(printMessage(event, messages));
    }
  }, [gameStatus]);

  // Use useEffect to prevent the player from drawing cards after when he busts
  useEffect(() => {
    if (playerScore >= 21) {
      handleStand();
    }
  }, [playerScore])

  // Use useEffect to let the dealer draw till 16, and stand on 17
  useEffect(() => {
    if (gameStatus === events.dealerTurn) {
      if (dealerScore < 17) {
        drawCard("dealer");
      } else {
        setGameStatus(events.resolve);
      }
    }
  }, [dealerScore])

  return (
    <div className="App">
      {/* Add the dealer and player Hand components to the App component */}
      <Hand cards={dealerCards} score={dealerScore} target="dealer"/>
      <div className='grid-container'>
        <div className='message-container'>{message && <h1>{message}</h1>}</div>
        {/* Add the Controls component to the App component */}
        {/* Use a arrow function to perform drawCard for the onHit prop */}
        {/* Add in the onResetGame prop, and pass it a function handleResetGame */}
        <Controls gameStatus={gameStatus} onHit={() => drawCard("player")} onStand={handleStand} onResetGame={handleResetGame} events={events}/>
      </div>
      <Hand cards={playerCards} score={playerScore} target="player"/>
      {/* Add the onBetChange event handler to the Wallet component & pass it handleBetChange */}
      {/* Add the onGameOver prop to the Wallet component and */}
      {/* Use a arrow function to setGameStatus to events.gameOver for the prop */}
      <Wallet gameStatus={gameStatus} onBetChange={handleBetChange} onGameOver={()=> setGameStatus(events.gameOver)} events={events}/>
    </div>
  );
}
