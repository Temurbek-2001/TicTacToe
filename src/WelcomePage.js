// src/WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/game');
  };

  return (
    <div className="welcome-page">
      <h1>Welcome to the Tic-Tac-Toe Game!</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default WelcomePage;
