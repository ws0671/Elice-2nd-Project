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
  const [checked, setChecked] = useState(false);
  const [hasPrinted, setHasPrinted] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useLocalStorageNumber("bestScore", 0);

  const [ScrollY, setScrollY] = useState(0); // window 의 pageYOffset값을 저장
  const [ScrollActive, setScrollActive] = useState(false);
  function handleScroll() {
    console.log(window.pageYOffset);
    if (ScrollY > 299) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  }

  useEffect(() => {
    function scrollListener() {
      window.addEventListener("scroll", handleScroll);
    } //  window 에서 스크롤을 감시 시작
    scrollListener(); // window 에서 스크롤을 감시
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }; //  window 에서 스크롤을 감시를 종료
  });

  useLayoutEffect(() => {
    const checkToday = async () => {
      const today = await Api.get("point?route=2048");
      setToday(today.data.point);
      setChecked(true);
    };
    checkToday();
  }, []);

  useEffect(() => {
    if (checked && today) {
      // 오늘 포인트 얻은 기록이 있으면
      if (!hasPrinted) {
        setHasPrinted(true);
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Notice",
          html: "오늘은 이미 100포인트를 얻으셨습니다.<br />게임은 무한으로 즐겨주세요😁",
          showConfirmButton: true,
          timer: 5000,
        });
      }
    } else if (!today && score >= 1000) {
      // 오늘 얻은 포인트가 없으면
      setToday(100);
      setHasPrinted(true);
      const record = { miniGame: 2048, point: 100 };
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
  });

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
