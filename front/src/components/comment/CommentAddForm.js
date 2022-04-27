import styled from "styled-components"
import { useState } from "react"
const CommentAddForm = ({ clickHandler }) => {
  const [comment, setComment] = useState("")

  return (
    <>
      <TextArea
        className="write-area"
        placeholder="댓글을 남겨보세요."
        value={comment}
        name="comment"
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={() => clickHandler(comment)}>등록</Button>
    </>
  )
}

const TextArea = styled.textarea`
  width: 100%;
  height: 20vh;
`
const Button = styled.button`
  float: right;
  position: relative;
  margin: -50px 10px 0 0;
  border: none;
  padding: 4px 8px;
  color: white;
  font-weight: 700;

  border-radius: 3px;
  cursor: pointer;
  background: #6c63ff;
`

export default CommentAddForm
