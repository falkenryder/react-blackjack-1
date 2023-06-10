import React, { useState } from 'react';
import '../styles/deck.css';
import { DealCard } from './dealCard'; // this is a named import

export default function GenerateDeck() {
  const suits = ['♥', '♦', '♣', '♠'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const [deck, setDeck] = useState([]);

  const initializeDeck = () => {
    const newDeck = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        newDeck.push({ suit, rank });
      }
    }

    const shuffledDeck = [...newDeck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }

    setDeck(shuffledDeck);

  };



  return (
    <>
      <button onClick={initializeDeck}>Initialize Deck</button>
      <DealCard deck={deck} />
    </>
  );
}
