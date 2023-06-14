import React from 'react';

export default function Controls (props) {
  const {
    onHit,
    onStand,
    onResetGame,
    gameStatus,
  } = props;


  return (
    <div className='controls-container'>
      { gameStatus === "userTurn" &&
        <>
          <button onClick={onHit} className="hitBtn">HIT</button>
          <button onClick={onStand} className="standBtn">STAND</button>
        </>
      }
      {gameStatus === "gameOver" && (
        <button className="newGameBtn" onClick={onResetGame}>New Game</button>
      )}
    </div>
  )
}
