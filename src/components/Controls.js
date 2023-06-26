import React from 'react';

export default function Controls (props) {
  // Destructure the props
  const {
    onHit,
    onStand,
    gameStatus,
  } = props;

  return (
    // Add the onClick handlers to the buttons and conditionally render the buttons based on the gameStatus
    <div className='controls-container'>
      { gameStatus === "playerTurn" &&
        <>
          <button onClick={onHit} className="hit-btn">HIT</button>
          <button onClick={onStand} className="stand-btn">STAND</button>
        </>
      }
    </div>
  )
}
