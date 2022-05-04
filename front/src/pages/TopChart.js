import React from "react";
import Slider from "../components/Slider";
import Slider2 from "../components/Slider2";
import Slider3 from "../components/Slider3";
import Slider4 from "../components/Slider4";
import { MainImage, Main } from "../components/styles/TopChartStyle";
// 메인 bg-color:#673ab7
function TopChart() {
  return (
    <body>
      <MainImage className="image">
        <img
          style={{ width: "100%" }}
          alt="메인 이미지"
          src="/images/medals.png"
        />
      </MainImage>
      <Main>
        <div className="toptenContainer">
          <h3>평점 TOP 10</h3>
          <Slider></Slider>
        </div>
        <div className="toptenContainer">
          <h3>장르별 TOP 10</h3>
          <Slider2></Slider2>
        </div>
        <div className="toptenContainer">
          <h3>이용등급별 TOP 10</h3>

          <Slider3></Slider3>
        </div>
        <div className="toptenContainer">
          <h3>똥겜 TOP 10</h3>
          <Slider4></Slider4>
        </div>
      </Main>
    </body>
  );
}

export default TopChart;
