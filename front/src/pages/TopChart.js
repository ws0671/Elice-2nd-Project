import React, { useState, useRef } from "react";
import styled from "styled-components";
import Carousel from "../components/Carousel";

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
          <Carousel className="carousel"></Carousel>
        </div>
        <div className="toptenContainer">
          <h3>장르별 TOP 10</h3>
          <Carousel className="carousel"></Carousel>
        </div>
        <div className="toptenContainer">
          <h3>이용등급별 TOP 10</h3>
          <Carousel className="carousel"></Carousel>
        </div>
        <div className="toptenContainer">
          <h3>똥겜 TOP 10</h3>
          <Carousel className="carousel"></Carousel>
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
  width: 90vw;
  div.toptenContainer {
    margin-top: 30px;
  }
  h3 {
    margin-bottom: 50px;
    font-weight: bold;
  }
`;

export default TopChart;
