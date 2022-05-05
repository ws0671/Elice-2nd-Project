import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tr } from "../styles/Community/CommunityElementStyle";
import { get as Get } from "../../api";
import stone from "../../images/stone.png";
import ball from "../../images/ball.png";
import pearl from "../../images/pearl.png";
import rainbow from "../../images/rainbow.png";
import tapioca from "../../images/tapioca.png";

// 커뮤니티 게시판 해당 데이터 요소 컴포넌트
const CommunityElement = ({ item, index, page }) => {
  // 작성일 변수
  const createdAt = item.createdAt.split("T");
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/community/${item.articleId}`);
  };
  return (
    <Tr className={(index + 1) % 2 === 0 ? "even" : "odd"}>
      <td>{index + (page - 1) * 10}</td>
      <td onClick={clickHandler}>
        <span>
          {item.categoryName !== "선택 안함" && `[${item.categoryName}]`}
        </span>{" "}
        {item.title}
      </td>
      <td>
        {item.nickname}
        <img src={tapioca} style={{ width: 20, height: 20, margin: 0 }} />
      </td>
      <td>{createdAt[0]}</td>
      <td>{item.hits}</td>
      <td>{item.like}</td>
    </Tr>
  );
};

export default CommunityElement;
