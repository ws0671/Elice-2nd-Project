import "../index.css";
import React from "react";

export default function AboveGame() {
  return (
    <div className="above-game">
      <p className="game-intro">
        Join the numbers and get to the <strong>2048 tile!</strong>
      </p>
      <a href="/minigame/2048" className="restart-button">
        New Game
      </a>
    </div>
  );
}
