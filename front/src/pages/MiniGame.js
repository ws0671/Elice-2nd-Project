import "./index.css";
import React, { useState, useEffect, useContext } from "react";
import * as Api from "../api";
import { UserStateContext } from "../App";
import Header from "../components/minigame/2048/component/Header";
import AboveGame from "../components/minigame/2048/component/AboveGame";
import Game from "../components/minigame/2048/component/Game";
import useLocalStorageNumber from "../components/minigame/2048/hook/useLocalStorage";

const MiniGame = () => {
  // 로그인 유저 전역 데이터값
  const userContext = useContext(UserStateContext);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useLocalStorageNumber("bestScore", 0);
  const [point, setPoint] = useState(0);

  useEffect(async () => {
    if (score >= 50 && point === 0) {
      const today = await Api.get("point/2048");
      console.log(today);
      if (!today.data.point) {
        setPoint(100);
        alert("축하합니다!! 100포인트를 얻으셨습니다.");
        const point = 100;
        console.log(userContext);
        await Api.put(`user/${userContext.user.userId}/addPoint`, point);
      }
    }
    if (score > bestScore) {
      setBestScore(score);
    }
  });
  return (
    <>
      <div className="container">
        <div style={{ height: "150px" }} />
        {/* <div style={{ width: "500px" }}> */}
        <Header score={score} bestScore={bestScore} />
        <AboveGame />
      </div>
      <Game setScore={setScore} />
      {/* </div> */}
    </>
  );
};

export default MiniGame;
