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
  const [dirs, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
};

export default SnakeBoard;
