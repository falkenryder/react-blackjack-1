import React from 'react';
import Card from './Card';
import '../styles/hand.css';

export default function Hand(props) {
  // Step 2.1 Destructure the props
  const { cards, score , target} = props;

  return (
    <div className='grid-container' data-testid={`${target.toLowerCase()}-hand`}>
      <div className="card-container">
        {/* Step 2.2 Map over the cards array and render a Card component for each card */}
        {cards.length > 0 && (
          cards.map((card, index) => (
            <Card key={index} card={card} />
            ))
            )}
      </div>
      {score > 0 && <h1 className="score" data-testid={`${target.toLowerCase()}-score`}>{target}: {score}</h1>}
    </div>
  );
}
