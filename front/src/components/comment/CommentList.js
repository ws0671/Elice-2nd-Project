import CommentElement from "./CommentElement"
import styled from "styled-components"
const CommentList = ({ example, removeHandler }) => {
  return (
    <Div className="area">
      {example.map((item) => (
        <CommentElement item={item} removeHandler={removeHandler} />
      ))}
    </Div>
  )
}

const Div = styled.div`
  &:not(:nth-last-of-type(1)) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }
`

export default CommentList
