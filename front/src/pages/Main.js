import { useEffect, useState } from "react";
import {
  Body,
  DivBold,
  FlexDiv1,
  ImageWrapper,
  Image,
  Div,
  FlexDiv2,
  NewsImg,
} from "../components/styles/MainStyle";
import YouTube from "react-youtube";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import * as Api from "../api";
import axios from "axios";
import MainNews from "../components/main/MainNews";

// 메인 bg-color:#673ab7

function Main() {
  const opts = {
    width: "250",
    height: "150",
    playerVars: {
      autoplay: 0,
    },
  };

  const [firstGameNews, setFirstGameNews] = useState([]);
  const [lastGameNews, setLastGameNews] = useState([]);
  const [query, setQuery] = useState("P");
  const [video, setVideo] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/gameNews?category=${query}`)
      .then((res) => {
        setFirstGameNews(res.data.slice(0, 4));
        setLastGameNews(res.data.slice(4));
      });
    axios
      .get(`http://localhost:5001/youtubeVideos`)
      .then((res) => setVideo(res.data));
  }, [query]);

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
          <DivBold style={{ marginLeft: 56 }}>
            <h3 style={{ marginBottom: 20 }}>주목할만한 소식</h3>
            <ButtonGroup>
              <Button onClick={() => setQuery("O")}>온라인</Button>
              <Button onClick={() => setQuery("P")}>PC</Button>
              <Button onClick={() => setQuery("V")}>비디오</Button>
              <Button onClick={() => setQuery("W")}>웹게임</Button>
              <Button onClick={() => setQuery("M")}>모바일</Button>
            </ButtonGroup>
          </DivBold>

          <MainNews firstGameNews={firstGameNews} lastGameNews={lastGameNews} />
        </div>
      </div>
      <br />
      <br />
      <Container>
        <Row className="mb-3">
          <h3>유튜브 인기 동영상</h3>
        </Row>
        <Row>
          {video.map((item) => (
            <Col>
              <Row className="justify-content-center">
                <YouTube videoId={item.videoId} opts={opts} />
                <div className="mt-3">{item.title}</div>
              </Row>
            </Col>
          ))}
        </Row>
      </Container>
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

export default Main;
