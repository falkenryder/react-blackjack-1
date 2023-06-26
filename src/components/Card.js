import React from 'react';
import "../styles/card.css"

export default function Card(props) {
  const { suit, value, hidden } = props.card;

  // Modify getCardColour so that it returns the correct card color class based on the suit
  const getCardColor = (suit) => {
    if (suit === 'diamonds' || suit === 'hearts') {
      return 'card red';
    } else {
      return 'card black';
    }
  }

  // Modify renderSuit so that it returns the correct suit symbol based on the suit
  const renderSuit = (suit) => {
    switch (suit) {
      case 'spades':
        return '♠';
      case 'diamonds':
        return '♦';
      case 'clubs':
        return '♣';
      case 'hearts':
        return '♥';
      default:
        break;
    }
  }

  if (hidden) {
    return (
      <div data-testid="card" className="card hiddenCard"></div>
    );
  } else {
    return (
      <div data-testid="card" className={getCardColor(suit)}>
        <h1 className="value">{value}</h1>
        <h1 className="suit-small">{renderSuit(suit)}</h1>
        <h1 className="suit">{renderSuit(suit)}</h1>
      </div>
    );
  }
}
