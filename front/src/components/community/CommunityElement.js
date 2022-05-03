import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tr } from "../styles/Community/CommunityElementStyle";
import { get as Get } from "../../api";

// 커뮤니티 게시판 해당 데이터 요소 컴포넌트
const CommunityElement = ({ item, index, page }) => {
  // 조회수 상태값
  const [hit, setHit] = useState(item.hits);
  // 작성일 변수
  const createdAt = item.createdAt.split("T");
  const navigate = useNavigate();
  const clickHandler = () => {
    Get("article", item.articleId)
      .then((res) => {
        navigate(`/community/${item.articleId}`);
        setHit(hit + 1);
      })
      .catch((err) => alert("게시글을 열람할 수 없습니다. 등급을 올려주세요"));
  };

  return (
    <Tr>
      <td>{index + (page - 1) * 10}</td>
      <td onClick={clickHandler}>
        <span>
          {item.categoryName !== "선택 안함" && `[${item.categoryName}]`}
        </span>{" "}
        {item.title}
      </td>
      <td>{item.nickname}</td>
      <td>{createdAt[0]}</td>
      <td>{hit}</td>
      <td>{item.like}</td>
    </Tr>
  );
};

export default CommunityElement;
