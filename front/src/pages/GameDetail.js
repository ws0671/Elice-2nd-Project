import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import * as Api from "../api";
import { AiOutlineRightCircle } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { UserStateContext } from "../App";
import ReviewAddForm from "../components/Review/ReviewAddForm";
import ReviewList from "../components/Review/ReviewList";

const GameDetail = () => {
  const [data, setData] = useState(null);
  const [genre, setGenre] = useState();
  const [os, setOs] = useState();
  const [bookmark, setBookmark] = useState(false);
  const params = useParams();
  const userContext = useContext(UserStateContext);
  // 커뮤니티 댓글 리스트 상태값
  const [example, setExample] = useState([]);

  const handleData = async () => {
    if (userContext.user) {
      const res = await Api.get(`game/${params.id}`);
      setData(res.data);
      setGenre(res.data.game.steamspyTags);
      setOs(res.data.game.platforms);
      setBookmark(res.data.bookmarkOrNot);
      setExample(res.data.reviews);
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

  // 리뷰 추가 함수
  const clickHandler = (review) => {
    let copied = [...example];

    const newReview = {
      gameId: params.id,
      review: review,
    };
    Api.post("review", newReview).then((res) => {
      copied.push(res.data);
      alert("리뷰 등록이 완료되었습니다!");
      setExample(copied);
    });
  };

  // 리뷰 수정용 함수
  const editHandler = (item, review) => {
    const edit = { ...item, review };
    Api.put(`review/${item.reviewId}`, edit).then((res) =>
      alert("리뷰가 수정되었습니다.")
    );
    const copied = example.map((v) => {
      if (
        v.writeNickname === edit.writeNickname &&
        v.reviewId === item.reviewId
      ) {
        return { ...v, review };
      } else {
        return { ...v };
      }
    });

    setExample(copied);
  };
  // 리뷰 삭제용 함수
  const removeHandler = (item) => {
    const deleted = { ...item, isDeleted: true };
    Api.delete(`review/${item.reviewId}`).then((res) =>
      alert("리뷰가 삭제되었습니다.")
    );
    const copied = example.map((v) => {
      if (
        v.writeNickname === deleted.writeNickname &&
        v.reviewId === item.reviewId
      ) {
        return { ...v, isDeleted: true };
      } else {
        return { ...v };
      }
    });

    setExample(copied);
  };
  useEffect(() => {
    handleData();
  }, [bookmark]);

  return (
    <>
      <Main className="main">
        <FlexBody>
          {data && genre && os && (
            <div className="information">
              {userContext.user && (
                <div className="bookmark">
                  {bookmark ? (
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
        <div className="detail comment">
          <div className="head">리뷰</div>
          <div className="area">
            <ReviewList
              example={example}
              removeHandler={removeHandler}
              editHandler={editHandler}
            />
            <ReviewAddForm clickHandler={clickHandler} />
          </div>
        </div>
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
