import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import useInterval from "./useInterval";
import {
  CanvasSize,
  SnakeStart,
  AppleStart,
  Scale,
  Speed,
  Directions,
} from "./SnakeConstants";
import { dirs } from "nodemon/lib/config";

const SnakeBoard = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SnakeStart);
  const [apple, setApple] = useState(AppleStart);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [lastWords, setLastWords] = useState("GAME OVER!");
  const [point, setPoint] = useState(false);

  useInterval(() => gameLoop(), speed);

  const moveSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(Directions[keyCode]);

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSnake(SnakeStart);
    setApple(AppleStart);
    setDir([0, -1]);
    setSpeed(Speed);
    setGameOver(false);
    setLastWords("GAME OVER!");
  };

  useEffect(() => {}, [snake, apple, gameOver]);

  return (
    <div role="button" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
      {gameOver ? <h1>{lastWords}</h1> : <h1>SNAKE GAME</h1>}
      <canvas
        style={{ border: "1px solid white" }}
        ref={canvasRef}
        width={`${CanvasSize[0]}px`}
        height={`${CanvasSize[1]}px`}
      />
      <div>
        <button onClick={startGame}>START</button>
      </div>
    </div>
  );
};

export default SnakeBoard;
