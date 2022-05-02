import { useState } from "react";
import styled from "styled-components";
const MypageBookmarkElement = ({ data, index }) => {
  const [on, setOn] = useState(false);
  return (
    <Div on={on}>
      <img
        key={index}
        src={data.headerImage}
        alt={data.name}
        onMouseLeave={() => setOn((prev) => !prev)}
        onMouseOver={() => setOn((prev) => !prev)}
      />
      <div className="textBox">
        <div className="textSub">
          <div className="text">게임명: {data.name}</div>
          <div className="text">게임사: {data.developer[0]}</div>
          <div className="text">가격: {data.price} 원</div>
          <div className="text">이용등급: {data.requiredAge}</div>
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  width: 25%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .img {
    position: relative;
  }
  .textBox {
    position: absolute;

    .textSub {
      width: 90%;
      display: ${({ on }) => (on ? "block" : "none")};
      margin: 0;
      padding: 0;

      .text {
        font-weight: bold;
      }
    }
  }
  img:hover {
    opacity: 0.7;
  }
`;

export default MypageBookmarkElement;
