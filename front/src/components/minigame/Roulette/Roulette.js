import React, { useEffect, useState, useContext } from "react";
import { Wheel } from "react-custom-roulette";
import data from "./rouletteData";
import * as Api from "../../../api";
import { UserStateContext } from "../../../App";
import Swal from "sweetalert2";

const Roulette = () => {
  const [spin, setSpin] = useState(false);
  const [pointIndex, setPointIndex] = useState();
  const [point, setPoint] = useState();
  const userContext = useContext(UserStateContext);

  const handleStart = () => {
    // 룰렛을 실행시킴
    setSpin(true);
    // 결과값의 인덱스를 랜덤으로 지정해줌
    setPointIndex(Math.floor(Math.random() * data.length));
  };

  const handleStop = () => {
    setPoint(data[pointIndex].option);
  };

  useEffect(async () => {
    const today = await Api.get2("point?miniGame=Roulette");
    if (today.data.point) {
      setPoint(today.data.point);
    }
  }, []);

  useEffect(() => {
    if (point && pointIndex) {
      Api.put(`user/${userContext.user.userId}/addPoint`, { point: point });
      Api.post("point", {
        miniGame: "Roulette",
        point: point,
      });
    }
  }, [point]);

  return (
    <>
      {point ? (
        <div>
          <h1>축하합니다!! {point}점을 획득하셨습니다!!</h1>
        </div>
      ) : (
        <div>
          <h1>룰렛을 돌려주세요!</h1>
        </div>
      )}
      <Wheel
        mustStartSpinning={spin}
        prizeNumber={pointIndex}
        data={data}
        radiusLineWidth={0}
        outerBorderWidth={3}
        onStopSpinning={handleStop}
      />
      <button onClick={handleStart} disabled={point}>
        SPIN
      </button>
    </>
  );
};

export default Roulette;
