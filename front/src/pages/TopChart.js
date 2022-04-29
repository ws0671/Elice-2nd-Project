import React from "react";
import styled from "styled-components";
import Slider from "../components/Slider";
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
          <Slider></Slider>
        </div>
        <div className="toptenContainer">
          <h3>이용등급별 TOP 10</h3>
          <Slider></Slider>
        </div>
        <div className="toptenContainer">
          <h3>똥겜 TOP 10</h3>
          <Slider></Slider>
        </div>
      </Main>
    </body>
  );
}

const MainImage = styled.div`
  background-color: #673ab7;
`;
const Main = styled.main`
  margin: 100px auto 0 auto;
  width: 100%;
  .toptenContainer {
    margin-top: 80px;
  }
  h3 {
    font-weight: bold;
  }
`;

export default TopChart;
