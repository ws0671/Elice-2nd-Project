import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import { Wheel } from "react-custom-roulette";
import data from "./rouletteData";
import * as Api from "../../../api";
import { UserStateContext } from "../../../App";
import Swal from "sweetalert2";
import "./Roulette.css";

const Roulette = () => {
  const [spin, setSpin] = useState(false);
  const [pointIndex, setPointIndex] = useState();
  const [point, setPoint] = useState();
  const userContext = useContext(UserStateContext);

  const checkPoint = async () => {
    const today = await Api.get2("point?route=Roulette");
    if (today.data.point) {
      setPoint(today.data.point);
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Notice",
        html: `오늘은 이미 ${today.data.point}포인트를 획득하셨습니다.<br />내일 다시 시도해주세요 😄`,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    Swal.fire({
      position: "center",
      title: "Rules Of Roulette",
      icon: "info",
      html: "<p>오늘 하루의 운을 시험해보세요(❁´◡`❁)</br>최대 1000점까지 단숨에 얻을 수 있습니다 : )</br>순간의 짜릿함을 느껴보세요!!!</br>🎉✨🎉╰(*°▽°*)╯🎉✨🎉</br></br> ※룰렛은 하루에 한 번만 돌릴 수 있습니다※</p>",
      height: "100px",
      showConfirmButton: true,
    }).then(() => {
      checkPoint();
    });
  }, []);

  const handleStart = () => {
    if (!point) {
      // 룰렛을 실행시킴
      setSpin(true);
      // 결과값의 인덱스를 랜덤으로 지정해줌
      setPointIndex(Math.floor(Math.random() * data.length));
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Notice",
        html: `오늘은 이미 ${point}포인트를 획득하셨습니다.<br />내일 다시 시도해주세요 😄`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleStop = () => {
    setPoint(data[pointIndex].option);
  };

  useEffect(() => {
    if (point && pointIndex) {
      const addPoint = async () => {
        await Api.put(`user/${userContext.user.userId}/addPoint`, {
          point: point,
        });
        await Api.post("point", {
          route: "Roulette",
          point: point,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: `축하합니다!`,
          text: `${point}포인트를 얻으셨습니다!! 🎉`,
          showConfirmButton: false,
          timer: 2000,
        });
      };
      addPoint();
    }
  }, [point]);

  return (
    <div className="RouletteContainer">
      <div className="RouletteBoard">
        {point ? (
          <div>
            <p>축하합니다!! {point} pt를 획득하셨습니다!!</p>
          </div>
        ) : (
          <div>
            <p>룰렛을 돌려주세요!</p>
          </div>
        )}
        <div className="Wheel">
          <Wheel
            mustStartSpinning={spin}
            prizeNumber={pointIndex}
            data={data}
            radiusLineWidth={0}
            outerBorderWidth={3}
            onStopSpinning={handleStop}
          />
        </div>
        <button onClick={handleStart}>SPIN</button>
      </div>
    </div>
  );
};

export default Roulette;
