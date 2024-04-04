import React from 'react';

function Tile({ value }) {
  const style = {
    width: '100px',
    height: '100px',
    backgroundColor: value ? 'orange' : 'lightgrey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '25px',
    fontWeight: 'bold',
  };

  return <div style={style}>{value}</div>;
}

export default Tile;
