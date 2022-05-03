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

const SnakeBoard = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SnakeStart);
  const [apple, setApple] = useState(AppleStart);
};

export default SnakeBoard;
