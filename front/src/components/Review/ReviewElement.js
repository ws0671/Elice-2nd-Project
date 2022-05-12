import { useState, useRef, useEffect, useContext } from "react";
import { Div, ButtonGroup } from "../styles/Comment/CommentElementStyle";
import { UserStateContext } from "../../App";

const ReviewElement = ({ item, removeHandler, editHandler }) => {
  // 댓글 수정폼 show/notshow 상태값
  const [edit, setEdit] = useState(false);
  // 댓글 데이터 상태값
  const [review, setReview] = useState(item.review);
  // 현재 더보기 버튼을 누른 상태인지 확인 변수
  const [view, setView] = useState(false);
  // 더보기 ref 값
  const viewMore = useRef([]);
  // 현재 로그인 유저 데이터 값
  const userContext = useContext(UserStateContext);
  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  });

  // 드롭다운 외부 클릭 시에도 닫히도록 하는 함수
  const clickOutside = (e) => {
    if (view && !viewMore.current.includes(e.target)) {
      setView((prev) => !prev);
    }
  };
  console.log(userContext.user);

  return (
    <Div
      edit={edit}
      view={view}
      isDeleted={item.isDeleted}
      className="review-area"
    >
      {edit ? (
        <>
          <textarea
            className="edit"
            onChange={(e) => setReview(e.target.value)}
            value={review}
            placeholder="20자 이상 적어주세요."
          ></textarea>
          <ButtonGroup>
            <button
              onClick={() => {
                editHandler(item, review);
                setEdit(false);
              }}
            >
              확인
            </button>
            <button
              onClick={() => {
                setReview(item.review);
                setEdit(false);
              }}
            >
              취소
            </button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <div>
            <div className="nickname">{item.writer.nickname}</div>
            <div className="review">
              {item.isDeleted
                ? "삭제된 댓글입니다"
                : item.review.split("\n").map((line) => {
                    return (
                      <span>
                        {line}
                        <br />
                      </span>
                    );
                  })}
            </div>
          </div>

          {item.writer.nickname === userContext?.user?.nickname && (
            <img
              ref={(el) => (viewMore.current[0] = el)}
              src="/images/viewmore.png"
              alt="더보기"
              onClick={(e) => setView((prev) => !prev)}
            ></img>
          )}
          <ul className="dropdown">
            <li
              ref={(el) => (viewMore.current[1] = el)}
              onClick={() => setEdit(true)}
            >
              수정
            </li>
            <li
              ref={(el) => (viewMore.current[2] = el)}
              onClick={() => {
                removeHandler(item);
                setView(false);
              }}
            >
              삭제
            </li>
          </ul>
        </>
      )}
    </Div>
  );
};

export default ReviewElement;
