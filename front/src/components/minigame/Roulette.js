import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const data = [
  {
    id: 1,
    option: 100,
    style: { backgroundColor: "#dbe4ff", textColor: "#dbe4ff" },
  },
  {
    id: 2,
    option: 100,
    style: { backgroundColor: "#dbe4ff", textColor: "black" },
  },
  {
    id: 3,
    option: 100,
    style: { backgroundColor: "#dbe4ff", textColor: "#dbe4ff" },
  },
  {
    id: 4,
    option: 200,
    style: { backgroundColor: "#bac8ff", textColor: "#bac8ff" },
  },
  {
    id: 5,
    option: 200,
    style: { backgroundColor: "#bac8ff", textColor: "black" },
  },
  {
    id: 6,
    option: 200,
    style: { backgroundColor: "#bac8ff", textColor: "#bac8ff" },
  },
  {
    id: 7,
    option: 1000,
    style: { backgroundColor: "#364fc7", textColor: "white" },
  },
  {
    id: 8,
    option: 100,
    style: { backgroundColor: "#dbe4ff", textColor: "#dbe4ff" },
  },
  {
    id: 9,
    option: 100,
    style: { backgroundColor: "#dbe4ff", textColor: "black" },
  },
  {
    id: 10,
    option: 100,
    style: { backgroundColor: "#dbe4ff", textColor: "#dbe4ff" },
  },
  {
    id: 11,
    option: 300,
    style: { backgroundColor: "#91a7ff", textColor: "#91a7ff" },
  },
  {
    id: 12,
    option: 300,
    style: { backgroundColor: "#91a7ff", textColor: "white" },
  },
  {
    id: 13,
    option: 300,
    style: { backgroundColor: "#91a7ff", textColor: "#91a7ff" },
  },
  {
    id: 14,
    option: 100,
    style: { backgroundColor: "#dbe4ff", textColor: "#dbe4ff" },
  },
  {
    id: 15,
    option: 100,
    style: { backgroundColor: "#dbe4ff", textColor: "black" },
  },
  {
    id: 16,
    option: 100,
    style: { backgroundColor: "#dbe4ff", textColor: "#dbe4ff" },
  },
  {
    id: 17,
    option: 200,
    style: { backgroundColor: "#bac8ff", textColor: "#bac8ff" },
  },
  {
    id: 18,
    option: 200,
    style: { backgroundColor: "#bac8ff", textColor: "black" },
  },
  {
    id: 19,
    option: 200,
    style: { backgroundColor: "#bac8ff", textColor: "#bac8ff" },
  },
  {
    id: 20,
    option: 500,
    style: { backgroundColor: "#5c7cfa", textColor: "#5c7cfa" },
  },
  {
    id: 21,
    option: 500,
    style: { backgroundColor: "#5c7cfa", textColor: "white" },
  },
  {
    id: 22,
    option: 500,
    style: { backgroundColor: "#5c7cfa", textColor: "#5c7cfa" },
  },
];

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
