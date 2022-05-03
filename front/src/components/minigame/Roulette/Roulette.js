import React, { useEffect, useState, useContext } from "react";
import { Wheel } from "react-custom-roulette";
import data from "./rouletteData";
import * as Api from "../../../api";
import { UserStateContext } from "../../../App";

const Roulette = () => {
  const [spin, setSpin] = useState(false);
  const [pointIndex, setPointIndex] = useState();
  const [point, setPoint] = useState();

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
    const today = await axios.get("http://localhost:5001/point/Roulette");
    if (today.data.point) {
      setPoint(today.data.point);
    }
  }, []);

  useEffect(() => {
    if (point && pointIndex) {
      axios.put(`http://localhost:5001/user/${userId}/addPoint`, point);
      axios.post("http://localhost:5001/point", {
        miniGame: "Roulette",
        point,
      });
    }
  }, [point]);

  return (
    <>
      {point ? (
        <div style={{ marginBottom: "100px" }}>
          <h1>축하합니다!! {point}점을 획득하셨습니다!!</h1>
        </div>
      ) : (
        <div style={{ marginBottom: "100px" }}>
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
      <button onClick={handleStart} style={{ margin: "50px" }} disabled={point}>
        SPIN
      </button>
    </>
  );
};

export default Roulette;
