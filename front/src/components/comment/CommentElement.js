import { useState } from "react"
import styled from "styled-components"

const CommentElement = ({ item, removeHandler }) => {
  const [view, setView] = useState(false)
  return (
    !item.isDeleted && (
      <Div view={view} className="comment-area">
        <div>
          <div className="nickname">{item.writeNickname}</div>
          <div className="comment">{item.comment}</div>
        </div>
        <img
          src="/images/viewmore.png"
          alt="더보기"
          onClick={() => {
            setView(!view)
          }}
        ></img>
        <ul className="dropdown">
          <li>수정</li>
          <li onClick={() => removeHandler(item)}>삭제</li>
        </ul>
      </Div>
    )
  )
}

const Div = styled.div`

  margin-bottom: 20px;
  font-size: 13px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // align-items: center;

  img {
    width: 20px;
    height: 20px;

    &:hover {
      cursor: pointer;
      background: rgba(108, 99, 255, 0.3);
      border-radius: 3px;
    }
  }

  .dropdown {
    display: ${({ view }) => (view ? "block" : "none")};
    position: absolute;
    left: 80%;
    background-color: #f9f9f9;
    min-width: 60px;
    padding: 8px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    list-style-type: none;

    li {
      font-weight: normal;
      text-align: center;
    }
    li:hover {
      background: rgba(108, 99, 255, 0.3);
      border-radius: 2px;
      font-weight: bold;
      // color: white;
      cursor: pointer;
    }
  `
export default CommentElement
