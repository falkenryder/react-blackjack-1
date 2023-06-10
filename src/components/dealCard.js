import React, { useEffect, useState } from 'react';
import '../styles/deck.css';
import CalculateScore from './calculateScore';

export function DealCard(props) { // this is a named export

  const deck = props.deck
  const [newDeck, setNewDeck] = useState(null);

  const [playersHand, setPlayersHand] = useState([]);
  const [dealersHand, setDealersHand] = useState([]);

  useEffect(() => {
    const dealCard = () => {
      const newDeck = [...deck];
      const [card4, card3, card2, card1] = newDeck.splice(-4); // Remove the last card from the deck
      setNewDeck(newDeck);
      setPlayersHand([card1, card2]);
      setDealersHand([card3, card4]);
    };

    if (deck && deck.length > 0) {
      dealCard();
    }
  }, [deck]);

  const hitPlayer = () => {
    if (newDeck.length > 0) {
      const [newCard, ...remainingDeck] = newDeck;
      setNewDeck(remainingDeck);
      setPlayersHand([...playersHand, newCard]);
    }
  };

  const hitDealer = () => {
    if (newDeck.length > 0) {
      const [newCard, ...remainingDeck] = newDeck;
      setNewDeck(remainingDeck);
      setDealersHand([...dealersHand, newCard]); // prompt the user to think about how they can refactor the hit codes into one function
    }
  }

  const playerScore = CalculateScore(playersHand);
  const dealersScore = CalculateScore(dealersHand);

  return (
    <>
      <div className="container">
        {/* Deals Hand: */}
        <div className="card-container">
          {dealersHand.length > 0 && (
            <>
              {dealersHand.map((card, index) => (
                <div key={index} className="card" data-testid="dealersHand">
                  <h1 className="value">{card.rank}</h1>
                  <h1 className="suit">{card.suit}</h1>
                </div>
              ))}
              <h1 data-testid="dealersScore">Dealers Score: {dealersScore}</h1>
            </>
          )}
        </div>
        {/* Players Hand: */}
        <div className="card-container">
            {playersHand.length > 0 && (
                <>
                  {playersHand.map((card, index) => (
                    <div key={index} className="card" data-testid="playersHand">
                      <h1 className="value">{card.rank}</h1>
                      <h1 className="suit">{card.suit}</h1>
                    </div>
                  ))}
                  <h1 data-testid="playersScore">My Score: {playerScore}</h1>
                </>
              )}
        </div>
      </div>
      <button onClick={hitPlayer}>HIT</button>
      <button onClick={hitDealer}>STAND</button>
    </>
  );

}
