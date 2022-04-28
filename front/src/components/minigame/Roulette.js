import React, { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import data from "./rouletteData";
import axios from "axios";

const Roulette = () => {
  const [spin, setSpin] = useState(false);
  const [pointIndex, setPointIndex] = useState();
  const [result, setResult] = useState();

  const handleStart = () => {
    // 룰렛을 실행시킴
    setSpin(true);
    // 결과값의 인덱스를 랜덤으로 지정해줌
    setPointIndex(Math.floor(Math.random() * data.length));
  };

  const handleStop = () => {
    setResult(data[pointIndex].option);
  };

  useEffect(() => {
    if (result) {
      axios.put(`http://localhost:5001/user/${userId}/addPoint`, result);
    }
  }, [result]);

  return (
    <>
      {result ? (
        <h1>축하합니다!! {result}점을 획득하셨습니다!!</h1>
      ) : (
        <h1>룰렛을 돌려주세요!</h1>
      )}
      <Wheel
        mustStartSpinning={spin}
        prizeNumber={pointIndex}
        data={data}
        radiusLineWidth={0}
        outerBorderWidth={3}
        onStopSpinning={handleStop}
      />
      <button onClick={handleStart}>SPIN</button>
    </>
  );
};

export default Roulette;
