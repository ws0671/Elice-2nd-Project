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
import {
  Main,
  FlexBody,
  ScreenShot,
  Footer,
} from "../components/styles/GameDetailStyle";
import Swal from "sweetalert2";
const GameDetail = () => {
  const [data, setData] = useState(null);
  const [genre, setGenre] = useState();
  const [os, setOs] = useState();
  const [bookmark, setBookmark] = useState(false);
  const params = useParams();
  const userContext = useContext(UserStateContext);
  // 커뮤니티 댓글 리스트 상태값
  const [example, setExample] = useState([]);

  // 가져온 data 및 state를 다루는 함수입니다
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
      setExample(res.data.reviews);
    }
  };
  // 북마크를 다루는 함수입니다
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
    Api.post("review", newReview)
      .then((res) => {
        copied.push(res.data);
        Swal.fire("리뷰 등록이 완료되었습니다!").then((res) =>
          Swal.fire({
            position: "center",
            icon: "success",
            title: `축하합니다! 250포인트를 얻으셨습니다!!`,
            showConfirmButton: false,
            timer: 1500,
          })
        );
        setExample(copied);
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.response.data,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // 리뷰 수정용 함수
  const editHandler = (item, review) => {
    const edit = { ...item, review };
    Api.put(`review/${item.reviewId}`, edit).then((res) =>
      Swal.fire("리뷰가 수정되었습니다.")
    );
    const copied = example.map((v) => {
      if (
        v.writer.nickname === edit.writer.nickname &&
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
      Swal.fire("리뷰가 삭제되었습니다.")
    );
    const copied = example.map((v) => {
      if (
        v.writer.nickname === deleted.writer.nickname &&
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
        <div>
          <FlexBody>
            {data && genre && os && (
              <div className="information">
                {userContext.user && (
                  <div className="bookmark" style={{ left: "90%", top: "-4%" }}>
                    {bookmark ? (
                      <FaBookmark size="50" onClick={handleBookmark} />
                    ) : (
                      <FaRegBookmark size="50" onClick={handleBookmark} />
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
            {data && (
              <img
                style={{ borderRadius: 20 }}
                alt="게임 이미지"
                src={data.game.headerImage}
              />
            )}
          </FlexBody>
          <h3
            style={{ textAlign: "center", paddingRight: 10 }}
            className="screenShot"
          >
            스크린샷
          </h3>
          {data && (
            <ScreenShot>
              <img alt="스크린샷" src={data.game.screenshots[0]} />
              <img alt="스크린샷" src={data.game.screenshots[1]} />
              <img alt="스크린샷" src={data.game.screenshots[2]} />
            </ScreenShot>
          )}
          <Footer></Footer>

          <div className="detail review">
            <div className="head" style={{ fontSize: 40, margin: "10px 0" }}>
              리뷰
            </div>
            <div className="area">
              <ReviewList
                example={example}
                removeHandler={removeHandler}
                editHandler={editHandler}
              />
              {userContext.user && (
                <ReviewAddForm clickHandler={clickHandler} />
              )}
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default GameDetail;
