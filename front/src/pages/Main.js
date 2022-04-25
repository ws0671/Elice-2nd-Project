import React from "react"
import styled from "styled-components"

// 메인 bg-color:#673ab7
function Main() {
  return (
    <Body>
      <div className="video">
        <video width="100%" muted autoPlay loop>
          <source src="/videos/mainVideo.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="main">
        <div className="popularChart">
          <div className="mt-5 mb-5 ms-4">
            <h3>인기차트</h3>
          </div>
          <FlexDiv1 className="mb-5">
            <div>
              <div>
                <Image alt="평점 TOP 10" src="images/rating.jpg" />
                <Div className="mt-3">평점 TOP 10</Div>
              </div>
            </div>
            <div>
              <div>
                <Image alt="장르별 TOP 10" src="images/trophy.jpg" />
                <Div className="mt-3">장르별 TOP 10</Div>
              </div>
            </div>
            <div>
              <div>
                <Image alt="이용등급별 TOP 10" src="images/age.jpg" />
                <Div className="mt-3">이용등급별 TOP 10</Div>
              </div>
            </div>
            <div>
              <div>
                <Image alt="똥겜 TOP 10" src="images/shit.jpg" />
                <Div className="mt-3">똥겜 TOP 10</Div>
              </div>
            </div>
          </FlexDiv1>
        </div>
        <div className="notification">
          <div className="mb-5 ms-4">
            <h3>주목할만한 소식</h3>
          </div>
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
  )
}

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`
const NewsImg = styled.img`
  width: 250px;
  height: 150px;
  border-radius: 15%;
`
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
`
const FlexDiv1 = styled.div`
  display: flex;
  justify-content: space-evenly;
`
const FlexDiv2 = styled.div`
  display: flex;
  justify-content: space-evenly;

  & > div {
    width: 250px;
  }
`

const Body = styled.div`
  background-color: #673ab7;
`

export default Main
