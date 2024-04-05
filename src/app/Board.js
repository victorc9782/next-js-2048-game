import React from 'react';
import Tile from './Tile';

function Board({ board }) {
  return (
    <div className="board">
      {board.flat().map((value, index) => (
        <Tile key={index} value={value} />
      ))}
    </div>
  );
}

export default Board;
