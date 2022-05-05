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
  console.log(item);

  const gradeHandler = (grade) => {
    if (grade === 0) {
      return stone;
    } else if (grade === 1) {
      return ball;
    } else if (grade === 2) {
      return tapioca;
    } else if (grade === 3) {
      return pearl;
    } else {
      return rainbow;
    }
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
      <td
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {item.author.nickname}

        <img
          src={gradeHandler(item.author.grade)}
          style={{ width: 20, height: 20, margin: "0 0 0 5px" }}
        />
      </td>
      <td>{createdAt[0]}</td>
      <td>{item.hits}</td>
      <td>{item.like}</td>
    </Tr>
  );
};

export default CommunityElement;
