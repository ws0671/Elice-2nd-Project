import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tr } from "../styles/Community/CommunityElementStyle";

// 커뮤니티 게시판 해당 데이터 요소 컴포넌트
const CommunityElement = ({ item, index, page }) => {
  // 조회수 상태값
  const [hit, setHit] = useState(item.hits);
  // 작성일 변수
  const createdAt = item.createdAt.split("T");
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/community/${item.articleId}`);
    setHit(hit + 1);
  };

  return (
    <Tr>
      <td>{index + (page - 1) * 10}</td>
      <td onClick={clickHandler}>
        <span>[{item.category}]</span> {item.title}
      </td>
      <td>{item.nickname}</td>
      <td>{createdAt[0]}</td>
      <td>{hit}</td>
      <td>{item.like}</td>
    </Tr>
  );
};

export default CommunityElement;
