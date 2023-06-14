import React from 'react';
import Card from './Card';
import '../styles/hand.css';

export default function Hand(props) {
  const { cards, score , target} = props;

  return (
    <div className='grid-container' id={`${target.toLowerCase()}-hand`}>
      <div className="card-container">
        {cards.length > 0 && (
          cards.map((card, index) => (
            <Card key={index} card={card} />
            ))
            )}
      </div>
      {score > 0 && <h1 className="score" id={`${target.toLowerCase()}-score`}>{target}: {score}</h1>}
    </div>
  );
}
