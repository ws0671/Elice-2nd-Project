import React from "react";
import PrologueMain from "../components/prologue/MainBanner/PrologueMain";
import PrologueStyle from "../components/prologue/PrologueStyle";
import { Content } from "../components/prologue/Contents/Contents";
import {
  contentOne,
  contentTwo,
  contentThree,
} from "../components/prologue/Contents/ContentsData";
import FirstContent from "../components/prologue/Contents/FirstContent.js";
import LastContent from "../components/prologue/Contents/LastContent";

function Prologue() {
  return (
    <PrologueStyle>
      <PrologueMain />
      <FirstContent />
      <Content {...contentOne} />
      <Content {...contentTwo} />
      <Content {...contentThree} />
      <LastContent />
    </PrologueStyle>
  );
}

export default Prologue;

/* 
const SliderBox = styled.div`
    font-family: "Montserrat", sans-serif;
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
` */
