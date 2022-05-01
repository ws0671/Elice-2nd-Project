import CommunityList from "./CommunityList";
import { get as Get } from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Nav,
  Div,
  Table,
  Button,
} from "../styles/Community/CommunityBoardStyle";

// 커뮤니티 게시판 컴포넌트
const CommunityBoard = () => {
  // 게시판 리스트 데이터 상태값
  const [info, setInfo] = useState([]);
  // 총 페이지 상태값
  const [total, setTotal] = useState(10);
  // 카테고리 별 조건 경로 상태값
  const [query, setQuery] = useState("");
  // 현재 페이지 상태값
  const [page, setPage] = useState(1);
  const numPages = Math.ceil(total / 10);
  const navigate = useNavigate();

  useEffect(() => {
    Get("article/list", page + query)
      .then((res) => {
        setInfo(res.data.articles);
        setTotal(res.data.articleCount);
      })
      .catch((err) => {
        alert("로그인을 해주세요!");
        navigate("/login");
      });
  }, [page, query]);

  return (
    <div className="container">
      <Div className="list">
        <Table className="table">
          <colgroup>
            <col width="10%" />
            <col width="35%" />
            <col width="15%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th className="dropdown">
                말머리
                <ul className="dropdown-content">
                  <li onClick={() => setQuery("")}>전체</li>
                  <li onClick={() => setQuery(`?category=선택 안함`)}>자유</li>
                  <li onClick={() => setQuery(`?category=공지사항`)}>
                    공지사항
                  </li>
                  <li onClick={() => setQuery(`?category=유머`)}>유머</li>
                  <li onClick={() => setQuery(`?category=건의사항`)}>
                    건의사항
                  </li>
                  <li onClick={() => setQuery(`?category=파티 모집`)}>
                    파티 모집
                  </li>
                  <li onClick={() => setQuery(`?category=꿀팁`)}>꿀팁</li>
                  <li onClick={() => setQuery(`?category=후기`)}>후기</li>
                </ul>
              </th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회</th>
              <th className="dropdown">좋아요</th>
            </tr>
          </thead>
          <CommunityList info={info} page={page} />
        </Table>
        <Nav>
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            &lt;
          </Button>
          {Array(numPages)
            .fill()
            .map((_, i) => (
              <Button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? "page" : null}
              >
                {i + 1}
              </Button>
            ))}
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === numPages}
          >
            &gt;
          </Button>
        </Nav>
      </Div>
    </div>
  );
};

export default CommunityBoard;
