'use client';
import React, { useState, useEffect } from 'react';
import Board from './Board';

export default function Home() {
	const [board, setBoard] = useState(createInitialBoard());
	const [score, setScore] = useState(0);
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    function areArraysEqual(a, b) {
        
        console.log(a)
        console.log(b)
        // Check if both are arrays
        if (!Array.isArray(a) || !Array.isArray(b)) {
          return false;
        }
      
        // Check if arrays have the same length
        if (a.length !== b.length) {
          return false;
        }
      
        // Iterate through each element of the arrays
        for (let i = 0; i < a.length; i++) {
          // If element is an array, recurse
          if (Array.isArray(a[i]) && Array.isArray(b[i])) {
            if (!areArraysEqual(a[i], b[i])) {
              return false;
            }
          } else {
            // If the element is not an array, check for equality
            if (a[i] !== b[i]) { 
                console.log(`${a[i]} - ${b[i]}`)
              return false;
            }
          }
        }
      
        // If no differences were found, arrays are equal
        return true;
    }
	function moveUp() {
		let newBoard = JSON.parse(JSON.stringify(board));
		let scoreToAdd = 0;

		for (let col = 0; col < 4; col++) {
			let newCol = newBoard
				.map((row) => row[col])
				.filter((val) => val !== null); // Extract and consolidate non-null values in the column
			for (let row = 0; row < newCol.length - 1; row++) {
				if (newCol[row] === newCol[row + 1]) {
					// Merge identical tiles
					newCol[row] *= 2;
					scoreToAdd += newCol[row];
					newCol.splice(row + 1, 1);
				}
			}
			while (newCol.length < 4) {
				newCol.push(null); // Add nulls to fill the column
			}
			for (let row = 0; row < 4; row++) {
				newBoard[row][col] = newCol[row]; // Update the board with the new column values
			}
		}
        if(areArraysEqual(newBoard, board)) return
		addNewTile(newBoard);
		setBoard(newBoard);
		setScore(score + scoreToAdd);
	}
	function moveDown() {
		let newBoard = JSON.parse(JSON.stringify(board));
		let scoreToAdd = 0;

		for (let col = 0; col < 4; col++) {
			let newCol = newBoard
				.map((row) => row[col])
				.filter((val) => val !== null);
			for (let row = newCol.length - 1; row > 0; row--) {
				if (newCol[row] === newCol[row - 1]) {
					newCol[row] *= 2;
					scoreToAdd += newCol[row];
					newCol.splice(row - 1, 1);
					row--;
				}
			}
			while (newCol.length < 4) {
				newCol.unshift(null); // Add nulls at the start to push tiles down
			}
			for (let row = 0; row < 4; row++) {
				newBoard[row][col] = newCol[row];
			}
		}
        if(areArraysEqual(newBoard, board)) return

		addNewTile(newBoard);
		setBoard(newBoard);
		setScore(score + scoreToAdd);
	}

	function moveLeft() {
		let newBoard = JSON.parse(JSON.stringify(board));
		let scoreToAdd = 0;

		for (let row = 0; row < 4; row++) {
			let newRow = newBoard[row].filter((val) => val !== null); // Remove nulls to shift all tiles left
			for (let col = 0; col < newRow.length - 1; col++) {
				if (newRow[col] === newRow[col + 1]) {
					// If two tiles can be merged
					newRow[col] *= 2; // Merge them
					scoreToAdd += newRow[col];
					newRow.splice(col + 1, 1); // Remove the merged tile
				}
			}
			while (newRow.length < 4) {
				newRow.push(null); // Fill the rest of the row with nulls
			}
			newBoard[row] = newRow;
		}
        if(areArraysEqual(newBoard, board)) return

		addNewTile(newBoard);
		setBoard(newBoard);
		setScore(score + scoreToAdd);
	}
	function moveRight() {
		let newBoard = JSON.parse(JSON.stringify(board));
		let scoreToAdd = 0;

		for (let row = 0; row < 4; row++) {
			let newRow = newBoard[row].filter((val) => val !== null); // Remove nulls to consolidate tiles
			for (let col = newRow.length - 1; col > 0; col--) {
				if (newRow[col] === newRow[col - 1]) {
					// Merge identical tiles
					newRow[col] *= 2;
					scoreToAdd += newRow[col];
					newRow.splice(col - 1, 1); // Remove merged tile
					col--; // Adjust index after merge
				}
			}
			while (newRow.length < 4) {
				newRow.unshift(null); // Add nulls to the start to push tiles right
			}
			newBoard[row] = newRow;
		}
        if(areArraysEqual(newBoard, board)) return

		addNewTile(newBoard);
		setBoard(newBoard);
		setScore(score + scoreToAdd);
	}
	function checkGameOver() {
		for (let row = 0; row < 4; row++) {
			for (let col = 0; col < 4; col++) {
				if (board[row][col] === null) return false; // There's an empty space
				if (col !== 3 && board[row][col] === board[row][col + 1])
					return false; // Can merge right
				if (row !== 3 && board[row][col] === board[row + 1][col])
					return false; // Can merge down
			}
		}
		return true; // No moves left
	}

	useEffect(() => {
		if (checkGameOver()) {
			alert('Game Over!');
		}
	}, [board]); // Run this effect whenever the board changes
	useEffect(() => {
		function handleKeyDown(event) {
			if (event.key === 'ArrowUp') moveUp();
			else if (event.key === 'ArrowDown') moveDown();
			else if (event.key === 'ArrowLeft') moveLeft();
			else if (event.key === 'ArrowRight') moveRight();
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [board]); // Add board to useEffect dependencies to ensure it updates

	// Function to initialize the board
	function createInitialBoard() {
		let newBoard = Array(4)
			.fill()
			.map(() => Array(4).fill(null));
		// Add two initial tiles
		addNewTile(newBoard);
		addNewTile(newBoard);
		return newBoard;
	}

	// Function to add a new tile in an empty spot
	function addNewTile(board) {
		let added = false;
		let tries = 0;
		while (!added && tries < 50) {
			let row = Math.floor(Math.random() * 4);
			let col = Math.floor(Math.random() * 4);
			if (board[row][col] === null) {
				board[row][col] = Math.random() > 0.9 ? 4 : 2;
				added = true;
			}
			tries++;
		}
	}
	return (
		<main className='game-container'>
			{isClient && <>
                <header className="header">
                    <h1 className="title">2048</h1>
                    <div className="score-container">
                        <div className="score-label">SCORE</div>
                        <div className="score-value">{score}</div>
                    </div>
                </header>
                <Board board={board} />
            </>}
		</main>
	);
}
