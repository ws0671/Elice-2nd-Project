import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Container, Row, Col } from "react-bootstrap";
import * as Api from "../api";
import axios from "axios";
import MainNews from "../components/main/MainNews";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBorderNone } from "react-icons/fa";

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
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_MODE}:5001/gameNews?category=${query}`
      )
      .then((res) => {
        setFirstGameNews(res.data.slice(0, 4));
        setLastGameNews(res.data.slice(4));
      });
    axios
      .get(`http://${process.env.REACT_APP_MODE}:5001/youtubeVideos`)
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
              <Link to="/topchart">
                <div class="LinkWrapper">
                  <ImageWrapper>
                    <Image alt="평점 TOP 10" src="images/score.svg" />
                  </ImageWrapper>
                  <Div className="mt-3">평점 TOP 10</Div>
                </div>
              </Link>
            </div>
            <Link to="/topchart">
              <div class="LinkWrapper">
                <ImageWrapper>
                  <Image alt="장르별 TOP 10" src="images/trophy_icon.svg" />
                </ImageWrapper>
                <Div className="mt-3">장르별 TOP 10</Div>
              </div>
            </Link>
            <div>
              <Link to="/topchart">
                <div class="LinkWrapper">
                  <ImageWrapper>
                    <Image alt="이용등급별 TOP 10" src="images/layer.svg" />
                  </ImageWrapper>
                  <Div className="mt-3">이용등급별 TOP 10</Div>
                </div>
              </Link>
            </div>
            <div>
              <Link to="/topchart">
                <div class="LinkWrapper">
                  <ImageWrapper>
                    <Image alt="똥겜 TOP 10" src="images/frown.svg" />
                  </ImageWrapper>
                  <Div className="mt-3">똥겜 TOP 10</Div>
                </div>
              </Link>
            </div>
          </FlexDiv1>
        </div>
        <div className="popularChart">
          <DivBold style={{ marginLeft: 56, paddingTop: 40 }}>
            <h3 style={{ marginBottom: 20 }}>주목할만한 소식</h3>

            <Button onClick={() => setQuery("O")}>온라인</Button>
            <Button onClick={() => setQuery("P")}>PC</Button>
            <Button onClick={() => setQuery("V")}>비디오</Button>
            <Button onClick={() => setQuery("W")}>웹게임</Button>
            <Button onClick={() => setQuery("M")}>모바일</Button>
          </DivBold>

          <MainNews firstGameNews={firstGameNews} lastGameNews={lastGameNews} />
        </div>
        <div className="popularChart youtube">
          <Row className="mb-3" style={{ marginTop: 40, marginLeft: 40 }}>
            <h3>유튜브 인기 동영상</h3>
          </Row>
          <div className="centeral">
            <div
              style={{
                margin: 20,
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "80%",
              }}
            >
              {video.map((item) => (
                <Col>
                  <Row
                    // className="justify-content-center"
                    style={{ padding: "10px 0" }}
                  >
                    <YouTube videoId={item.videoId} opts={opts} />
                    <div className="mt-3">{item.title}</div>
                  </Row>
                </Col>
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </Body>
  );
}

const Button = styled.button`
  color: #009394;
  border: 3px solid #009394;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 15px;
  font-family: tahoma;
  letter-spacing: 5px;
  cursor: pointer;
  font-weight: bold;
  filter: drop-shadow(0 0 15px #006270) drop-shadow(0 0 50px #00e0c7)
    contrast(2) brightness(2);
  transition: 0.5s;
  background: transparent;

  &:hover {
    color: #313b64;
    background-color: #00e0c7;
    filter: drop-shadow(0 0 20px #00e0c7) contrast(2) brightness(2);
  }
`;

export default Main;
