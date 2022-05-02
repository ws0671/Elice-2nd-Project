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
  const [getPoint, setGetPoint] = useState(false);

  useEffect(async () => {
    if (score >= 50 && getPoint === false) {
      // 오늘 2048 게임으로 포인트 얻었는지 여부 확인
      const today = await Api.get("point/2048");
      console.log(today.data);
      if (!today.data.point) {
        setGetPoint(true);
        alert("축하합니다!! 100포인트를 얻으셨습니다.");
        const record = { miniGame: 2048, point: 100 };
        const point = { point: 100 };
        // 2048 게임 기록 추가하기
        await Api.post("point", record);
        // user 계정에 포인트 올려주기
        await Api.put(`user/${userContext.user.userId}/addPoint`, point);
      } else {
        setGetPoint(true);
        alert("오늘은 이미 100포인트를 얻으셨습니다.");
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
