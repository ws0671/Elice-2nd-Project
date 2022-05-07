import Swal from "sweetalert2";
import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import * as Api from "../api";
import { UserStateContext } from "../App";
import Header from "../components/minigame/2048/component/Header";
import AboveGame from "../components/minigame/2048/component/AboveGame";
import Game from "../components/minigame/2048/component/Game";
import useLocalStorageNumber from "../components/minigame/2048/hook/useLocalStorage";

const MiniGame = () => {
  // 로그인 유저 전역 데이터값
  const userContext = useContext(UserStateContext);

  const [today, setToday] = useState();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useLocalStorageNumber("bestScore", 0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  });

  const checkToday = async () => {
    const today = await Api.get2("point?route=2048");

    if (today.data.point) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Notice",
        html: "오늘은 이미 100포인트를 얻으셨습니다.<br />게임은 무한으로 즐겨주세요😁",
        showConfirmButton: true,
        timer: 5000,
      });
    }
  };

  // 처음 화면 진입 시 무조건 보여주는 메세지
  useEffect(() => {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Rules of 2048 Game",
      html: "<p style = 'text-align:left;'>🔹 키보드 방향키를 이용해 조작해주세요.<br />🔹 타일이 움직일 때마다 2와 4중에 새로운 타일이 생겨납니다.<br />🔹 같은 숫자의 타일끼리 합쳐주면 합한 숫자로 뿅!<br />🔹 모든 칸이 다 차고 더이상 움직일 타일이 없으면 게임이 <br />&nbsp&nbsp&nbsp&nbsp종료됩니다.</p>",
      showConfirmButton: true,
      timer: 5000,
    }).then((result) => {
      if (result.isConfirmed) {
        checkToday();
      }
    });
  }, []);

  useEffect(() => {
    if (!today && score >= 1000) {
      // 오늘 얻은 포인트가 없으면
      setToday(100);
      const record = { route: 2048, point: 100 };
      const point = { point: 100 };
      // 2048 게임 기록 추가하기
      Api.post("point", record);
      // user 계정에 포인트 올려주기
      Api.put(`user/${userContext.user.userId}/addPoint`, point);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Success",
        html: "축하합니다!! 100포인트를 얻으셨습니다🎉",
        showConfirmButton: true,
        timer: 5000,
      });
    }
  }, [score]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score]);

  return (
    <>
      <div className="container2048" id="container2048">
        <div id="game2048">
          <div style={{ height: "80px" }} />
          <Header score={score} bestScore={bestScore} />
          <br />
          <AboveGame />
        </div>
        <br />
        <br />
        <Game setScore={setScore} />
      </div>
    </>
  );
};

export default MiniGame;
