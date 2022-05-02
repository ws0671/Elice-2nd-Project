import "./index.css";
import axios from "axios";
import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import * as Api from "../api";
import { UserStateContext } from "../App";
import Header from "../components/minigame/2048/component/Header";
import AboveGame from "../components/minigame/2048/component/AboveGame";
import Game from "../components/minigame/2048/component/Game";
import useLocalStorageNumber from "../components/minigame/2048/hook/useLocalStorage";
import { identity } from "lodash";

const MiniGame = () => {
  // 로그인 유저 전역 데이터값
  const userContext = useContext(UserStateContext);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useLocalStorageNumber("bestScore", 0);
  const [getPoint, setGetPoint] = useState();

  useLayoutEffect(() => {
    // 오늘 2048 게임으로 포인트 얻었는지 여부 확인
    const check = () => {
      Api.get("point/2048")
        .then((res) => res.data.point)
        .then((res) => setGetPoint(res))
        .then(console.log(getPoint));
    };
    check();
  });

  useEffect(() => {
    console.log(getPoint);
    if (getPoint) {
      // 오늘 포인트 얻은 기록이 있으면
      alert(
        "오늘은 이미 100포인트를 얻으셨습니다. 게임은 무한으로 즐겨주세요 :)"
      );
    }
  }, []);

  useEffect(() => {
    if (!getPoint) {
      // 오늘 얻은 포인트가 없으면
      if (score >= 50) {
        setGetPoint(100);
        alert("축하합니다!! 100포인트를 얻으셨습니다.");
        const record = { miniGame: 2048, point: 100 };
        const point = { point: 100 };
        // 2048 게임 기록 추가하기
        Api.post("point", record);
        // user 계정에 포인트 올려주기
        Api.put(`user/${userContext.user.userId}/addPoint`, point);
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
        <Header score={score} bestScore={bestScore} />
        <AboveGame />
      </div>
      <Game setScore={setScore} />
      {/* </div> */}
    </>
  );
};

export default MiniGame;
