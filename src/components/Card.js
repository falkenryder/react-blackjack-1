import React from 'react';
import "../styles/card.css"

export default function Card(props) {
  const { suit, value, hidden } = props.card;

  // Modify getCardColour so that it returns the correct card color class based on the suit
  const getCardColor = (suit) => {

  }

  // Modify renderSuit so that it returns the correct suit symbol based on the suit
  const renderSuit = (suit) => {
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
