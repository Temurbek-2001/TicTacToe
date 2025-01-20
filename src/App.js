import React, { useState, useEffect } from "react";

import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import GameStatus from "./GameStatus"; 
import "./App.css";

const App = () => {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null); // Track the winner

  const handleBoxClick = (boxIdx) => {
    if (gameOver || board[boxIdx]) return;

    // Step 1: Update the board
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    setBoard(updatedBoard);

    // Step 2: Check if either player has won the game
    const winner = checkWinner(updatedBoard);

    if (winner) {
      setWinner(winner);
      setScores((prevScores) => ({
        ...prevScores,
        [`${winner.toLowerCase()}Score`]: prevScores[`${winner.toLowerCase()}Score`] + 1,
      }));
    }

    // Step 3: Change active player
    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }

    // Check for a tie
    if (!board.includes(null)) {
      setGameOver(true);
      setWinner("Tie");
    }

    return null;
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setXPlaying(true);
    setWinner(null);
  };

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <GameStatus winner={winner} xPlaying={xPlaying} resetGame={resetBoard} />
      <Board board={board} onClick={handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
};

export default App;
