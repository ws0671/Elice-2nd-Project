import { TextArea, Button } from "../styles/Comment/CommentAddFormStyle";
import { useState } from "react";
const ReviewAddForm = ({ clickHandler }) => {
  // 커멘트 textarea 상태값
  const [review, setReview] = useState("");

  return (
    <>
      <TextArea
        className="write-area"
        placeholder="리뷰를 남겨보세요."
        value={review}
        name="review"
        onChange={(e) => setReview(e.target.value)}
      />
      <Button
        onClick={() => {
          if (review.length !== 0) {
            clickHandler(review);
            setReview("");
          }
        }}
      >
        등록
      </Button>
    </>
  );
};

export default ReviewAddForm;
