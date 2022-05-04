import { useState, useRef, useEffect, useContext } from "react";
import { Div, ButtonGroup } from "../styles/Comment/CommentElementStyle";
import { UserStateContext } from "../../App";

const CommentElement = ({ item, removeHandler, editHandler }) => {
  // 댓글 수정폼 show/notshow 상태값
  const [edit, setEdit] = useState(false);
  // 댓글 데이터 상태값
  const [comment, setComment] = useState(item.comment);
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

  return (
    <Div
      edit={edit}
      view={view}
      isDeleted={item.isDeleted}
      className="comment-area"
    >
      {edit ? (
        <>
          <textarea
            className="edit"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder="20자 이상 적어주세요."
          ></textarea>
          <ButtonGroup>
            <button
              onClick={() => {
                editHandler(item, comment);
                setEdit(false);
              }}
            >
              확인
            </button>
            <button
              onClick={() => {
                setComment(item.comment);
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
            <div className="nickname">{item.writerNickname}</div>
            <div className="comment">
              {item.isDeleted ? "삭제된 댓글입니다" : item.comment}
            </div>
          </div>

          {item.writerNickname === userContext.user.nickname && (
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

export default CommentElement;
