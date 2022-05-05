import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import * as Api from "../api";
import { AiOutlineRightCircle } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
const GameDetail = () => {
  const [data, setData] = useState(null);
  const [genre, setGenre] = useState();
  const [os, setOs] = useState();
  const [bookmark, setBookmark] = useState(false);
  const params = useParams();

  const handleData = async () => {
    const res = await Api.get(`game/${params.id}/guest`);
    setData(res.data);
    setGenre(res.data.game.steamspyTags);
    setOs(res.data.game.platforms);
  };

  const handleBookmark = (e) => {
    console.log(e.target.value);
    setBookmark((prev) => !prev);
  };
  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      <Main className="main">
        <FlexBody>
          {data && genre && os && (
            <div className="information">
              <div className="bookmark">
                {bookmark ? (
                  <FaBookmark size="30" onClick={handleBookmark} />
                ) : (
                  <FaRegBookmark size="30" onClick={handleBookmark} />
                )}
              </div>
              <h1>{data.game.name}</h1>
              <div>
                <AiOutlineRightCircle />
                <span>출시연도: {data.game.releaseDate.split("T")[0]}</span>
              </div>
              <div>
                <AiOutlineRightCircle />
                <span>장르: {genre.join(", ")}</span>
              </div>
              <div>
                <AiOutlineRightCircle />
                <span>운영체제: {os.join(", ")}</span>
              </div>
              <div>
                <AiOutlineRightCircle />
                <span>인기도: {data.game.overallReview}</span>
              </div>
              <div>
                <AiOutlineRightCircle />
                <span>평점: {data.game.positiveRate}</span>
              </div>
            </div>
          )}
          {data && <img alt="게임 이미지" src={data.game.headerImage} />}
        </FlexBody>
        <h3 className="screenShot">스크린샷</h3>
        {data && (
          <ScreenShot>
            <img alt="스크린샷" src={data.game.screenshots[0]} />
            <img alt="스크린샷" src={data.game.screenshots[1]} />
            <img alt="스크린샷" src={data.game.screenshots[2]} />
          </ScreenShot>
        )}
        <Footer></Footer>
      </Main>
    </>
  );
};
const FlexBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  h1 {
    font-weight: bold;
  }
  span {
    margin-left: 5px;
    font-size: 20px;
  }
  img {
    margin-left: 40px;
    width: 400px;
    height: 300px;
  }
  .information {
    position: relative;
  }
  .bookmark {
    cursor: pointer;
    left: -5vh;
    position: absolute;
  }
`;
const ScreenShot = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 400px;
  }
`;
const Footer = styled.footer`
  height: 20vh;
`;
const Main = styled.div`
  padding: 0 200px;
  .screenShot {
    margin-left: 55px;
    font-weight: bold;
  }
`;
export default GameDetail;
