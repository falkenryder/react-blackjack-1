import React from 'react';
import "../styles/card.css"

export default function Card(props) {
  const { suit, value, hidden } = props.card;


  const getCardColor = (suit) => {
    if (suit === '♦' || suit === '♥') {
      return 'card red';
    } else {
      return 'card black';
    }
  }

  if (hidden) {
    return (
      <div className="card hiddenCard"></div>
    );
  } else {
    return (
      <div className={getCardColor(suit)}>
        <h1 className="value">{value}</h1>
        <h1 className="suit-small">{suit}</h1>
        <h1 className="suit">{suit}</h1>
      </div>
    );
  }
}
