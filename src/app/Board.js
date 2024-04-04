import React from 'react';
import Tile from './Tile';

function Board({ board }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 100px)', gap: '10px' }}>
      {board.flat().map((value, index) => (
        <Tile key={index} value={value} />
      ))}
    </div>
  );
}

export default Board;
