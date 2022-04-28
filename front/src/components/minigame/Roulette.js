import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

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

  return (
    <>
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
