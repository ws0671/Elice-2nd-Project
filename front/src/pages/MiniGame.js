import "./index.css";
import React, { useState, useEffect } from "react";
import Header from "../components/minigame/2048/component/Header";
import AboveGame from "../components/minigame/2048/component/AboveGame";
import Game from "../components/minigame/2048/component/Game";
import useLocalStorageNumber from "../components/minigame/2048/hook/useLocalStorage";

const MiniGame = () => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useLocalStorageNumber("bestScore", 0);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    if (score >= 50 && point === 0) {
      setPoint(100);
      alert("축하합니다. 100 포인트를 획득하셨습니다.");
    }
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [point]);
  return (
    <div className="container">
      <Header score={score} bestScore={bestScore} />
      <AboveGame />
      <Game setScore={setScore} />
    </div>
  );
};

export default MiniGame;
