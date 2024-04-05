'use client'
import React, { useState, useEffect } from 'react';
import usePreviousProps from "@/hooks/use-previous-props";

function Tile({ value }) {
    const [scale, setScale] = useState(1);
    const previousValue = usePreviousProps(value);
    const hasChanged = previousValue !== value && value > previousValue;

    const getBackgroundColor = (tileValue) => {
        if(!tileValue){
            return '#cdc1b4';
        } else if (tileValue == 2){
            return '#eee4da'
        } else if (tileValue == 4){
            return '#ede0c8'
        } else if (tileValue == 8){
            return '#f2b179'
        } else if (tileValue == 16){
            return '#f59563'
        } else if (tileValue == 32){
            return '#f67c5f'
        } else if (tileValue == 64){
            return '#f65e3b'
        } else if (tileValue == 128){
            return '#edcf72'
        } else if (tileValue == 256){
            return '#edcc61'
        } else if (tileValue == 512){
            return '#edc850'
        } else if (tileValue == 1024){
            return '#edc53f'
        } else {
            return '#edc22e'
        }
    }
    const tileClassName = `tile ${value ? `tile-${value}` : 'tile-0'}`;
    const tileStyle = {
        transform: `scale(${scale})`,
        /* other dynamic styles */
    };
    const style = {
        width: '100px',
        height: '100px',
        backgroundColor: getBackgroundColor(value),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '25px',
        fontWeight: 'bold',
        transform: `scale(${scale})`,
    };
    useEffect(() => {
        if (hasChanged) {
          setScale(1.1);
          setTimeout(() => setScale(1), 200);
        }
    }, [hasChanged]);

  return <div className={tileClassName} style={tileStyle}>{value}</div>;
}

export default Tile;
