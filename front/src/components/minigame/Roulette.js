import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const Roulette = () => {
  const [spin, setSpin] = useState(false);
  const [pointIndex, setPointIndex] = useState();
  const [result, setResult] = useState();

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
