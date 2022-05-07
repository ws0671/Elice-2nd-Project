import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
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
import "./snake.css";

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

  const checkPoint = async () => {
    const today = await Api.get2("point?route=SnakeGame");
    setPoint(today.data.point);
    if (today.data.point) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `이미 100 포인트를 획득하셨습니다 :)`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  useLayoutEffect(() => {
    Swal.fire({
      position: "center",
      title: "Rules Of Snake Game",
      html: `<img src='/img/키보드.png' /></br>
      <p>귀엽고 깜찍한 뱀이 사과를 먹으러 다니는 게임입니다.🍎💝🐍</br>
      뱀은 청소년기라 먹을 수록 쑥쑥 자라나요!!</br>
      벽에 머리를 부딪히거나 자기 몸을 깨물면 죽어버립니다😥</br>
      뱀이 많은 사과를 먹을 수 있게 도와주세요 :)</br>
      </br>
      ※가던 방향의 반대 키를 누르면 즉시 게임오버됩니다.※</p>`,
      height: "100px",
      showConfirmButton: true,
    }).then((res) => {
      checkPoint();
    });
  }, []);

  const endGame = async () => {
    setSpeed(null);
    setGameOver(true);
    if (!point && score >= 150) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "축하합니다!!",
        text: "100포인트를 얻으셨습니다 :)",
        showConfirmButton: false,
        timer: 2000,
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
        timer: 2000,
      });
    }
  };

  const handleArrow = (e) => {
    e.preventDefault();
    moveSnake(e);
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
    <div className="SnakeTop">
      <div
        role="button"
        tabIndex="0"
        onKeyDown={(e) => handleArrow(e)}
        className="SnakeContainer"
      >
        <div className="SnakeTitle">Snake loves Apples</div>
        <div className="SnakeBoard">
          <canvas
            ref={canvasRef}
            width={`${CanvasSize[0]}px`}
            height={`${CanvasSize[1]}px`}
            className="SnakeCanvas"
          />
          <div className="bottom">
            <p>SCORE : {score}</p>
            <button onClick={startGame}>START</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeBoard;
