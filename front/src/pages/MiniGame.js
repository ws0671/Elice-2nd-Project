import "./index.css";
import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import * as Api from "../api";
import { UserStateContext } from "../App";
import Header from "../components/minigame/2048/component/Header";
import AboveGame from "../components/minigame/2048/component/AboveGame";
import Game from "../components/minigame/2048/component/Game";
import useLocalStorageNumber from "../components/minigame/2048/hook/useLocalStorage";
import { identity, reject } from "lodash";

const todayCheck = () => {
  return new Promise((res, rej) => {
    try {
      const today = Api.get("point?miniGame=2048");
      res(today);
    } catch {
      rej(new Error("오늘의 게임 기록을 불러오지 못했습니다."));
    }
  });
};

const MiniGame = () => {
  // 로그인 유저 전역 데이터값
  const userContext = useContext(UserStateContext);

  const [today, setToday] = useState();
  const [checked, setChecked] = useState(false);
  const [hasPrinted, setHasPrinted] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useLocalStorageNumber("bestScore", 0);

  const GameOver = (today) => {
    setToday(today);
    useEffect(() => {
      if (today) {
        // 오늘 포인트 얻은 기록이 있으면
        if (!hasPrinted) {
          setHasPrinted(true);
          alert(
            "오늘은 이미 100포인트를 얻으셨습니다. 게임은 무한으로 즐겨주세요 :)"
          );
        }
      } else {
        // 오늘 얻은 포인트가 없으면
        console.log("여길?");
        if (score >= 50) {
          const record = { miniGame: 2048, point: 100 };
          const point = { point: 100 };
          // 2048 게임 기록 추가하기
          Api.post("point", record);
          // user 계정에 포인트 올려주기
          Api.put(`user/${userContext.user.userId}/addPoint`, point);
          alert("축하합니다!! 100포인트를 얻으셨습니다.");
        }
      }
    });
  };

  useEffect(async () => {
    if (!checked) {
      setChecked(true);
      await todayCheck()
        .then((res) => res.data.point)
        .then((res) => GameOver(res));
    }

    if (score > bestScore) {
      setBestScore(score);
    }
  });

  // useEffect(() => {
  //   if (!today) {
  //     // 오늘 얻은 포인트가 없으면
  //     if (score >= 50) {
  //       alert("축하합니다!! 100포인트를 얻으셨습니다.");
  //       const record = { miniGame: 2048, point: 100 };
  //       const point = { point: 100 };
  //       // 2048 게임 기록 추가하기
  //       Api.post("point", record);
  //       // user 계정에 포인트 올려주기
  //       Api.put(`user/${userContext.user.userId}/addPoint`, point);
  //     }
  //   }
  //   if (score > bestScore) {
  //     setBestScore(score);
  //   }
  // });

  return (
    <>
      <div className="container">
        <div style={{ height: "150px" }} />
        <Header score={score} bestScore={bestScore} />
        <AboveGame />
      </div>
      <Game setScore={setScore} />
    </>
  );
};

export default MiniGame;
