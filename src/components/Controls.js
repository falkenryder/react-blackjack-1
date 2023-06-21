import React from 'react';

export default function Controls (props) {
  // Step 3.1 Destructuring the props
  // Step 4.5.2 Add the onResetGame prop
  const {
    onHit,
    onStand,
    onResetGame,
    gameStatus,
  } = props;


  return (
    // Step 3.2 Add the onClick handlers to the buttons and conditionally render the buttons based on the gameStatus
    <div className='controls-container'>
      { gameStatus === "playerTurn" &&
        <>
          <button onClick={onHit} className="hit-btn">HIT</button>
          <button onClick={onStand} className="stand-btn">STAND</button>
        </>
      }
      {/* Step 4.5.1 Add a 'New Game' button to reset the game when the game is over */}
      {gameStatus === "gameOver" && (
        <button className="newGameBtn" onClick={onResetGame}>New Game</button>
      )}
    </div>
  )
}
