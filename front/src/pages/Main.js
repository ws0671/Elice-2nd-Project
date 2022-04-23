import React, { useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import { UserStateContext, DispatchContext } from "../App"
import { Container, Card, Row, Col, Button } from "react-bootstrap"
import styled from "styled-components"
function Main() {
  return (
    <>
      <div className="video">
        <video width="100%" muted autoPlay loop>
          <source src="/videos/mainVideo.mp4" type="video/mp4" />
        </video>
      </div>
      <Container>
        <Row className="mt-5 mb-3">
          <h3>인기차트</h3>
        </Row>
        <Row className="mb-5">
          <Col>
            <Row className="justify-content-center">
              <Image alt="평점 TOP 10" src="images/rating.jpg" />
              <Div className="mt-3">평점 TOP 10</Div>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-center">
              <Image alt="장르별 TOP 10" src="images/trophy.jpg" />
              <Div className="mt-3">장르별 TOP 10</Div>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-center">
              <Image alt="이용등급별 TOP 10" src="images/age.jpg" />
              <Div className="mt-3">이용등급별 TOP 10</Div>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-center">
              <Image alt="똥겜 TOP 10" src="images/shit.jpg" />
              <Div className="mt-3">똥겜 TOP 10</Div>
            </Row>
          </Col>
        </Row>
        <Row className="mb-3">
          <h3>주목할만한 소식</h3>
        </Row>
        <Row>
          <Col>
            <Row className="justify-content-center">
              <NewsImg
                alt="news1"
                src="https://imgnews.pstatic.net/image/356/2022/04/22/0000053352_001_20220422171603397.jpg?type=w647"
              />
              <div className="mt-3">
                오버워치 2, 공격적 영웅 개편으로 속도감 높인다
              </div>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-center">
              <NewsImg
                alt="news2"
                src="https://imgnews.pstatic.net/image/356/2022/04/22/0000053351_001_20220422170902823.jpg?type=w647"
              />
              <div className="mt-3">
                염소 시뮬 제작진의 노인 샌드박스, 29일 에픽서 무료 배포
              </div>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-center">
              <NewsImg
                alt="news3"
                src="https://imgnews.pstatic.net/image/442/2022/04/22/0000148573_001_20220422165401768.jpg?type=w647"
              />
              <div className="mt-3">
                김정균, 아시안게임 LoL 감독직 사퇴 의사 전달
              </div>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-center">
              <NewsImg
                alt="news4"
                src="https://imgnews.pstatic.net/image/442/2022/04/22/0000148572_001_20220422165001855.jpg?type=w647"
              />
              <div className="mt-3">
                19주년 앞둔 '붉은보석' 초월스킬 등 개편 예고
              </div>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-center">
              <NewsImg
                alt="news5"
                src="https://imgnews.pstatic.net/image/442/2022/04/22/0000148571_001_20220422163601828.jpg?type=w647"
              />
              <div className="mt-3">
                [콘솔] 더 포가튼 시티 한국어판, 5월 PC/PS로 출시
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
      <div style={{ width: "100%", height: "20vh" }}></div>
      <div className="footer" style={{ backgroundColor: "#6C63FF" }}>
        <Row className="justify-content-center">
          <img
            style={{ width: "500px" }}
            alt="모니터"
            src="/images/monitor.svg"
          />
          <Button className="justify-content-center" variant="primary">
            게임 찾으러 GO!
          </Button>
        </Row>

        <Row className="justify-content-evenly">
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
        </Row>
      </div>
    </>
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
`

export default Main
