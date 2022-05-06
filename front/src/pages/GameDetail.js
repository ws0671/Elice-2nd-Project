import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import * as Api from "../api";
import { AiOutlineRightCircle } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { UserStateContext } from "../App";

const GameDetail = () => {
  const [data, setData] = useState(null);
  const [genre, setGenre] = useState();
  const [os, setOs] = useState();
  const [bookmark, setBookmark] = useState(false);
  const params = useParams();
  const userContext = useContext(UserStateContext);
  const handleData = async () => {
    if (userContext.user) {
      const res = await Api.get(`game/${params.id}`);
      setData(res.data);
      setGenre(res.data.game.steamspyTags);
      setOs(res.data.game.platforms);
      console.log(res.data);
    } else {
      const res = await Api.get(`game/${params.id}/guest`);
      setData(res.data);
      setGenre(res.data.game.steamspyTags);
      setOs(res.data.game.platforms);
    }
  };
  const handleBookmark = () => {
    if (!bookmark) {
      setBookmark((prev) => !prev);
      const putData = { bookmark: true, gameId: params.id };
      Api.put(`user/${userContext.user.userId}/addBookmark`, putData);
    } else {
      setBookmark((prev) => !prev);
      const putData = { bookmark: false, gameId: params.id };
      Api.put(`user/${userContext.user.userId}/addBookmark`, putData);
    }
  };
  // const bookmarkTrue = async () => {
  //   await Api.put(`user/${userContext.user.userId}/addBookmark`, {
  //     bookmark: true,
  //     gameId: params.id,
  //   });
  // };
  // const bookmarkFalse = async () => {
  //   await Api.put(`user/${userContext.user.userId}/addBookmark`, {
  //     bookmark: false,
  //     gameId: params.id,
  //   });
  // };
  // const handleBookmark = (e) => {
  //   setBookmark((prev) => !prev);
  // };
  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      <Main className="main">
        <FlexBody>
          {data && genre && os && (
            <div className="information">
              {userContext.user && (
                <div className="bookmark">
                  {data.bookmarkOrNot ? (
                    <FaBookmark size="30" onClick={handleBookmark} />
                  ) : (
                    <FaRegBookmark size="30" onClick={handleBookmark} />
                  )}
                </div>
              )}
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
