import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import * as Api from "../../api";
import CommentAddForm from "../comment/CommentAddForm";
import CommentList from "../comment/CommentList";
import { UserStateContext } from "../../App";
import CommunityEditForm from "./CommunityEditForm";
import { Header, Container, ButtonGroup } from "../styles/CommunityDetailStyle";

// 커뮤니 상세페이지 컴포넌트
const CommunityDetail = () => {
  // 커뮤니티 글 데이터 상태값
  const [detail, setDetail] = useState({});
  // 좋아요 상태값
  const [isLiked, setIsLiked] = useState(false);
  // 커뮤니티 댓글 리스트 상태값
  const [example, setExample] = useState([]);
  // 수정폼 show/notshow 확인용 변수(수정폼 컴포넌트에서 사용)
  const [isEdit, setIsEdit] = useState(false);
  // 로그인 유저 전역 데이터값
  const userContext = useContext(UserStateContext);
  const navigate = useNavigate();

  // 수정 삭제 권한 유저인지 확인용 변수
  const isUser = detail.nickname === userContext.user.nickname;
  const params = useParams();
  // 수정폼 컴포넌트 전달용 함수
  const isEditing = () => setIsEdit((prev) => !prev);
  // 삭제된 댓글 제외
  const realComments = example.filter((v) => v.isDeleted === false);
  // 글 생성 날짜 변수
  const createDate = detail.createdAt;

  useEffect(() => {
    Api.get("article", params.id).then((res) => {
      setDetail(res.data.article);
      console.log(res.data);
      setIsLiked(res.data.like);
      setExample(res.data.comments);
    });
  }, [isEdit]);

  // 댓글 추가 함수
  const clickHandler = (comment) => {
    let copied = [...example];

    const newComment = { comment, articleId: detail.articleId };
    Api.post("comment", newComment).then((res) => {
      copied.push(res.data);
      alert("댓글 등록이 완료되었습니다!");
      setExample(copied);
    });
  };

  // 댓글 수정용 함수
  const editHandler = (item, comment) => {
    const edit = { ...item, comment };
    Api.put(`comment/${item.commentId}`, edit);
    const copied = example.map((v) => {
      if (
        v.writeNickname === edit.writeNickname &&
        v.commentId === item.commentId
      ) {
        return { ...v, comment };
      } else {
        return { ...v };
      }
    });

    setExample(copied);
  };

  // 댓글 삭제용 함수
  const removeHandler = (item) => {
    const deleted = { ...item, isDeleted: true };
    Api.put(`comment/${item.commentId}/delete`, deleted);
    const copied = example.map((v) => {
      if (
        v.writeNickname === deleted.writeNickname &&
        v.commentId === item.commentId
      ) {
        return { ...v, isDeleted: true };
      } else {
        return { ...v };
      }
    });

    setExample(copied);
  };

  // 좋아요 함수
  const pushLike = () => {
    if (!isUser) {
      let copied = detail;
      if (isLiked) {
        setIsLiked((prev) => !prev);
        setDetail({ ...copied, like: copied.like - 1 });
        const putData = { author: detail.author, like: !isLiked };
        Api.put(`article/${params.id}/like`, putData);
      } else {
        setIsLiked((prev) => !prev);
        setDetail({ ...copied, like: copied.like + 1 });
        const putData = { author: detail.author, like: !isLiked };
        Api.put(`article/${params.id}/like`, putData).then((res) =>
          console.log(res.data)
        );
      }
    }
  };

  return (
    <>
      <Header />
      <Container isUser={isUser}>
        {isEdit ? (
          <CommunityEditForm isEditing={isEditing} />
        ) : (
          <>
            {isUser && (
              <ButtonGroup>
                <button onClick={() => setIsEdit((prev) => !prev)}>수정</button>
                <button
                  onClick={() => {
                    alert("해당 내용을 삭제합니다.");
                    Api.delete("article", params.id).then((res) => {
                      navigate("/community");
                    });
                  }}
                >
                  삭제
                </button>
              </ButtonGroup>
            )}
            <div className="detail title">{detail.title}</div>
            <div className="detail writer">
              <div>{detail.nickname}</div>
              <div>
                {createDate && createDate.split("T")[0]} / 조회수 :{" "}
                {detail.hits}
              </div>
            </div>
            <div className="detail body">{detail.body}</div>
            <div className="detail etc">
              <img
                src={!isLiked ? "/images/unlike.png" : "/images/like.png"}
                alt="좋아요"
              ></img>
              <span className="liking" onClick={pushLike}>
                좋아요
              </span>
              <span>{detail.like}</span>
              <img src="/images/comment.png" alt="댓글"></img>
              <span>댓글</span>
              <span>{realComments.length}</span>
            </div>
            <div className="detail comment">
              <div className="head">댓글</div>
              <div className="area">
                <CommentList
                  example={example}
                  removeHandler={removeHandler}
                  editHandler={editHandler}
                />
                <CommentAddForm clickHandler={clickHandler} />
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default CommunityDetail;
