import React, { useState, useRef, useEffect, useContext } from "react";
import useInterval from "./useInterval";
import {
  CanvasSize,
  SnakeStart,
  AppleStart,
  Scale,
  Speed,
  Directions,
} from "./SnakeConstants";
import * as Api from "../../../api";
import { UserStateContext } from "../../../App";
import Swal from "sweetalert2";

const SnakeBoard = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SnakeStart);
  const [apple, setApple] = useState(AppleStart);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [point, setPoint] = useState(false);
  const [score, setScore] = useState(0);
  const userContext = useContext(UserStateContext);

  useInterval(() => gameLoop(), speed);

  useEffect(() => {
    const checkPoint = async () => {
      const today = await Api.get2("point?route=SnakeGame");
      setPoint(today.data.point);
    };
    checkPoint();
  }, []);

  const endGame = async () => {
    setSpeed(null);
    setGameOver(true);
    if (!point && score >= 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "축하합니다! 100포인트를 얻으셨습니다!!",
        showConfirmButton: false,
        timer: 1500,
      });
      await Api.put(`user/${userContext.user.userId}/addPoint`, {
        point: 100,
      });
      await Api.post(`point`, {
        route: "SnakeGame",
        point: 100,
      });
      setPoint(100);
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "GAME OVER!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const moveSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDir(Directions[keyCode]);

  const createApple = () =>
    apple.map((_, i) => Math.floor(Math.random() * (CanvasSize[i] / Scale)));

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * Scale >= CanvasSize[0] ||
      piece[0] < 0 ||
      piece[1] * Scale >= CanvasSize[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      setScore((num) => num + 10);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSnake(SnakeStart);
    setApple(AppleStart);
    setDir([0, -1]);
    setSpeed(Speed);
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(Scale, 0, 0, Scale, 0, 0);
    context.clearRect(0, 0, CanvasSize[0], CanvasSize[1]);
    context.fillStyle = "pink";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "lightblue";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  return (
    <div role="button" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
      <canvas
        style={{ border: "1px solid white" }}
        ref={canvasRef}
        width={`${CanvasSize[0]}px`}
        height={`${CanvasSize[1]}px`}
      />
      <h1>SCORE : {score}</h1>
      <div>
        <button onClick={startGame}>START</button>
      </div>
    </div>
  );
};

export default SnakeBoard;
