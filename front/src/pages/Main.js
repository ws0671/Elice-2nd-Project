import React from "react";
import styled from "styled-components";
import FindPCplace from "../components/kakaomap/findPCplace";

// 메인 bg-color:#673ab7
function Main() {
  const opts = {
    width: "250",
    height: "150",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <Body>
      <div className="video">
        <video width="100%" muted autoPlay loop>
          <source src="/videos/mainVideo.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="main">
        <div className="popularChart">
          <DivBold className="mt-5 mb-5 ms-5">
            <h3>인기차트</h3>
          </DivBold>
          <FlexDiv1 className="mb-5">
            <div>
              <div>
                <ImageWrapper>
                  <Image alt="평점 TOP 10" src="images/score.svg" />
                </ImageWrapper>
                <Div className="mt-3">평점 TOP 10</Div>
              </div>
            </div>
            <div>
              <ImageWrapper>
                <Image alt="장르별 TOP 10" src="images/trophy_icon.svg" />
              </ImageWrapper>
              <Div className="mt-3">장르별 TOP 10</Div>
            </div>
            <div>
              <div>
                <ImageWrapper>
                  <Image alt="이용등급별 TOP 10" src="images/layer.svg" />
                </ImageWrapper>
                <Div className="mt-3">이용등급별 TOP 10</Div>
              </div>
            </div>
            <div>
              <div>
                <ImageWrapper>
                  <Image alt="똥겜 TOP 10" src="images/frown.svg" />
                </ImageWrapper>
                <Div className="mt-3">똥겜 TOP 10</Div>
              </div>
            </div>
          </FlexDiv1>
        </div>
        <div className="notification">
          <DivBold className="mb-5 ms-5">
            <h3>주목할만한 소식</h3>
          </DivBold>
          <FlexDiv2>
            <div>
              <div>
                <NewsImg
                  alt="news1"
                  src="https://imgnews.pstatic.net/image/356/2022/04/22/0000053352_001_20220422171603397.jpg?type=w647"
                />
                <div className="mt-3">
                  오버워치 2, 공격적 영웅 개편으로 속도감 높인다
                </div>
              </div>
            </div>
            <div>
              <div>
                <NewsImg
                  alt="news2"
                  src="https://imgnews.pstatic.net/image/356/2022/04/22/0000053351_001_20220422170902823.jpg?type=w647"
                />
                <div className="mt-3">
                  염소 시뮬 제작진의 노인 샌드박스, 29일 에픽서 무료 배포
                </div>
              </div>
            </div>
            <div>
              <div>
                <NewsImg
                  alt="news3"
                  src="https://imgnews.pstatic.net/image/442/2022/04/22/0000148573_001_20220422165401768.jpg?type=w647"
                />
                <div className="mt-3">
                  김정균, 아시안게임 LoL 감독직 사퇴 의사 전달
                </div>
              </div>
            </div>
            <div>
              <div>
                <NewsImg
                  alt="news4"
                  src="https://imgnews.pstatic.net/image/442/2022/04/22/0000148572_001_20220422165001855.jpg?type=w647"
                />
                <div className="mt-3">
                  19주년 앞둔 '붉은보석' 초월스킬 등 개편 예고
                </div>
              </div>
            </div>
            <div>
              <div>
                <NewsImg
                  alt="news5"
                  src="https://imgnews.pstatic.net/image/442/2022/04/22/0000148571_001_20220422163601828.jpg?type=w647"
                />
                <div className="mt-3">
                  [콘솔] 더 포가튼 시티 한국어판, 5월 PC/PS로 출시
                </div>
              </div>
            </div>
          </FlexDiv2>
        </div>
        <br />
        <br />
        <div className="kakaoMap">
          <DivBold className="mb-5 ms-5">
            <h3>내 주변 PC방 찾기</h3>
          </DivBold>
          <FlexDiv2>
            <div style={{ width: "100vw" }}>
              <FindPCplace />
            </div>
          </FlexDiv2>
        </div>
      </div>
      <div style={{ width: "100%", height: "20vh" }}></div>
      <Div className="footer" style={{ backgroundColor: "#6C63FF" }}>
        <div>
          <img
            style={{ width: "500px" }}
            alt="모니터"
            src="/images/monitor.svg"
          />
        </div>
        <div>
          <button variant="primary">게임 찾으러 GO!</button>
        </div>
        <div>
          <img
            style={{ width: "150px" }}
            alt="조이스틱"
            src="/images/joystick.svg"
          />
          <img
            style={{ width: "100px" }}
            alt="게임보이"
            src="/images/gameboy.svg"
          />
        </div>
      </Div>
    </Body>
  );
}
const ImageWrapper = styled.div`
  background-color: white;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  width: 120px;
  height: 120px;
`;
const NewsImg = styled.img`
  width: 250px;
  height: 150px;
  border-radius: 10%;
`;
const Div = styled.div`
  text-align: center;
  div:nth-child(2) {
    display: flex;
    justify-content: center;
  }
  div:nth-child(3) {
    display: flex;
    justify-content: space-evenly;
  }
`;
const FlexDiv1 = styled.div`
  display: flex;
  justify-content: space-evenly;
  div {
    color: white;
  }
`;
const FlexDiv2 = styled.div`
  display: flex;
  justify-content: space-evenly;

  & > div {
    width: 250px;
  }
  div {
    color: white;
  }
`;

const Body = styled.div`
  background-color: #673ab7;
`;
const DivBold = styled.div`
  color: white;
  font-weight: bold;
`;

export default Main;
