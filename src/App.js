import React, { useState, useEffect } from 'react';
import './styles/App.css';
import deckJson from './deck.json';
import Wallet from './components/Wallet';
import Hand from './components/Hand';
import Controls from './components/Controls';

export default function App() {
  const data = JSON.parse(JSON.stringify(deckJson));
  const [deck, setDeck] = useState([]);

  const shuffleDeck = () => {
    // Shuffle a new deck using the Fisher-Yates algorithm
    const shuffledDeck = data.cards;
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }

    // Update the deck in state with the shuffled deck
    setDeck(shuffledDeck);
  };

  useEffect(() => {
    shuffleDeck();
  }, []);

  const [gameStatus, setGameStatus] = useState("bet");
  const [message, setMessage] = useState("Welcome to React Blackjack! Place your bet to begin.");

  const [userScore, setUserScore] = useState(0);
  const [userCards, setUserCards] = useState([]);
  const [userCardCount, setUserCardCount] = useState(0);

  const [dealerScore, setDealerScore] = useState(0);
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerCardCount, setDealerCardCount] = useState(0);


  useEffect(() => {
    if (gameStatus === "resolve") {
      checkWin(userScore, userCardCount, dealerScore, dealerCardCount);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (userScore >= 21) {
      handleDealerTurn();
    }
  }, [userScore])

  useEffect(() => {
    if (gameStatus === "dealerTurn") {
      if (dealerScore < 17) {
        drawCard("dealer");
      } else {
        setGameStatus("resolve");
      }
    }
  }, [dealerScore])


  useEffect(() => {
    setUserScore(calculateScore(userCards));
  }, [userCards]);

  useEffect(() => {
    setDealerScore(calculateScore(dealerCards));
  }, [dealerCards]);


  const drawCard = (target) => {
    if (deck.length > 0) {
      const card = deck.pop();
      setDeck([...deck]);
      switch (card.suit) {
        case 'spades':
          dealCard(target, card.value, '♠');
          break;
        case 'diamonds':
          dealCard(target, card.value, '♦');
          break;
        case 'clubs':
          dealCard(target, card.value, '♣');
          break;
        case 'hearts':
          dealCard(target, card.value, '♥');
          break;
        default:
          break;
      }
    }
  };

  const handleDealerTurn = () => {
    setGameStatus("dealerTurn");
    revealCard();
  };

  const revealCard = () => {
    dealerCards.forEach((card) => {
      if (card.hidden === true) {
        card.hidden = false;
        setDealerCardCount(count => count++);
      }
    });
    setDealerCards([...dealerCards]);
  };

  const dealCard = (target, value, suit) => {
    switch (target) {
      case "user":
        userCards.push({ value: value, suit: suit, hidden: false });
        setUserCards([...userCards]);
        setUserCardCount(count => count++);
      break;
      case "dealer":
        dealerCards.push({ value: value, suit: suit, hidden: false });
        setDealerCards([...dealerCards]);
        setDealerCardCount(count => count++);
      break;
    case "dealer-hidden":
      dealerCards.push({ value: value, suit: suit, hidden: true });
      setDealerCards([...dealerCards]);
      break;
    default:
      break;
    }
  };

  const checkWin = (userScore, userCardCount, dealerScore, dealerCardCount) => {
    // Check for Blackjack
    if ((userCardCount === 2 && userScore === 21) || (dealerCardCount === 2 && dealerScore === 21)) {
      if (userCardCount === dealerCardCount && dealerScore === userScore) {
        setMessage('Push! It\'s a Tie!');
        setGameStatus("draw");
      } else if (userCardCount === 2 && userScore === 21) {
        setMessage('BLACKJACK! You Win!');
        setGameStatus("userBlackjack");
      } else {
        setMessage('Dealer has Blackjack! You Lose!');
        setGameStatus("dealerWon");
      }
      // Check for Bust
    } else if (userScore > 21) {
      setMessage('BUST! You Lose!');
      setGameStatus("dealerWon");
    } else if (dealerScore > 21 ) {
      setMessage('Dealer Bust! You Win!');
      setGameStatus("userWon");
      // Standard win/loss conditions
    } else {
      if (dealerScore > userScore) {
        setMessage('Dealer Wins!');
        setGameStatus("dealerWon");
      } else if (dealerScore < userScore) {
        setMessage('You Win!');
        setGameStatus("userWon");
      } else {
        setMessage('Push! It\'s a Tie!');
        setGameStatus("draw");
      }
    }
  }

  const handlePlaceBet = () => {
    setMessage("");
    // deal cards
    drawCard("user");
    drawCard("dealer-hidden");
    drawCard("user");
    drawCard("dealer");
    // set game status to "userTurn"
    setGameStatus("userTurn");
  };

  const handleGameOver = () => {
    setGameStatus("gameOver");
  };

  const handleResetGame = () => {
    setUserScore(0);
    setUserCards([]);
    setDealerScore(0);
    setDealerCards([]);
    shuffleDeck();
    setMessage("");
    setGameStatus("bet");
  };

  const calculateScore = (cards) => {
    let total = 0;
    cards.forEach((card) => {
      if (card.hidden === false && card.value !== 'A') {
        if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
          total += 10;
        } else {
          total += parseInt(card.value);
        }
      }
    });

    const aces = cards.filter((card) => {
      return card.value === 'A';
    });
    aces.forEach((card) => {
      if (card.hidden === false) {
        if (total + 11 > 21) {
          total += 1;
        } else if (total + 11 === 21) {
          if (aces.length > 1) {
            total += 1;
          } else {
            total += 11;
          }
        } else {
          total += 11;
        }
      }
    });
    return total;
  };

  return (
    <div className="App">
      <Hand cards={dealerCards} score={dealerScore} target="Dealer"/>
      <div className='grid-container'>
        <div className='message-container'>{message && <h1>{message}</h1>}</div>
        <Controls gameStatus={gameStatus} onHit={() => drawCard("user")} onStand={handleDealerTurn} onResetGame={handleResetGame}/>
      </div>
      <Hand cards={userCards} score={userScore} target="Player"/>
      <Wallet gameStatus={gameStatus} onBetChange={handlePlaceBet} onGameOver={handleGameOver}/>
    </div>
  );
}
