import React from 'react';

export default function Controls (props) {
  // Destructure the props
  // Add the onResetGame and events prop
  const {
    onHit,
    onStand,
    onResetGame,
    gameStatus,
    events
  } = props;

  return (
    // Add the onClick handlers to the buttons and conditionally render the buttons based on the gameStatus
    <div className='controls-container'>
      { gameStatus === events.playerTurn &&
        <>
          <button onClick={onHit} className="hit-btn">HIT</button>
          <button onClick={onStand} className="stand-btn">STAND</button>
        </>
      }
      {/* Add a 'New Game' button to reset the game when the game is over */}
      {gameStatus === events.gameOver && (
        <button className="newGameBtn" onClick={onResetGame}>New Game</button>
      )}
    </div>
  )
}
