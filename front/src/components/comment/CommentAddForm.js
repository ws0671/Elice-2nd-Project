import { TextArea, Button } from "../styles/CommentAddFormStyle";
import { useState } from "react";
const CommentAddForm = ({ clickHandler }) => {
  // 커멘트 textarea 상태값
  const [comment, setComment] = useState("");

  return (
    <>
      <TextArea
        className="write-area"
        placeholder="댓글을 남겨보세요."
        value={comment}
        name="comment"
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        onClick={() => {
          if (comment.length >= 20) {
            clickHandler(comment);
            setComment("");
          } else alert("20자 이상을 적어주세요.");
        }}
      >
        등록
      </Button>
    </>
  );
};

export default CommentAddForm;
