import React, { useEffect } from "react";
import './GameStatus.css';

const GameStatus = ({ winner, xPlaying, resetGame }) => {
  useEffect(() => {
    if (winner) {
      // Native feature: Vibration feedback
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]); // Vibrate when a player wins
      }

      // Native feature: Notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(`Game Over! ${winner} wins!`);
      }
    }
  }, [winner]);

  // Request Notification permission
  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log(`Notification permission: ${permission}`);
      });
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="game-status">
      {winner ? (
        <>
          <h2>{winner} Wins!</h2>
          <button onClick={resetGame}>Play Again</button>
        </>
      ) : (
        <h2>{xPlaying ? "Player X's Turn" : "Player O's Turn"}</h2>
      )}
    </div>
  );
};

export default GameStatus;
