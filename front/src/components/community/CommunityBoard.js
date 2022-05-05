import CommunityList from "./CommunityList";
import { get2 as Get } from "../../api";
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
  const [show, setShow] = useState(true);
  // 총 페이지 상태값
  const [total, setTotal] = useState(10);
  // 카테고리 별 조건 경로 상태값
  const [query, setQuery] = useState("");
  // 현재 페이지 상태값
  const [page, setPage] = useState(1);
  const numPages = Math.ceil(total / 10);
  const navigate = useNavigate();
  // & ${query}Get(`article?page=${page}`)
  useEffect(() => {
    Get(`article?page=${page}${query}`)
      .then((res) => {
        setInfo(res.data.articles);
        setTotal(res.data.articleCount);
        if (res.data.articles.length === 0) {
          setShow(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("로그인을 해주세요!");
        navigate("/login");
      });
  }, [page, query]);

  return (
    <div className="container" style={{ marginTop: 0 }}>
      <Div className="list">
        <Table className="table">
          <colgroup>
            <col width="10%" />
            <col width="35%" />
            <col width="19%" />
            <col width="20%" />
            <col width="8%" />
            <col width="8%" />
          </colgroup>
          <thead>
            <tr>
              <th className="dropdown">
                말머리
                <ul className="dropdown-content">
                  <li onClick={() => setQuery("")}>전체</li>
                  <li onClick={() => setQuery(`&category=default`)}>자유</li>
                  <li onClick={() => setQuery(`&category=notice`)}>공지사항</li>
                  <li onClick={() => setQuery(`&category=humor`)}>유머</li>
                  <li onClick={() => setQuery(`&category=suggestions`)}>
                    건의사항
                  </li>
                  <li onClick={() => setQuery(`&category=partyRecruitment`)}>
                    파티 모집
                  </li>
                  <li onClick={() => setQuery(`&category=honeytip`)}>꿀팁</li>
                  <li onClick={() => setQuery(`&category=postscript`)}>후기</li>
                </ul>
              </th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회 수</th>
              <th className="dropdown">좋아요</th>
            </tr>
          </thead>
          <CommunityList info={info} page={page} />
        </Table>
        {!show && (
          <div className="notFound">
            <div>
              <span class="material-symbols-outlined">error</span>
            </div>
            해당 카테고리 관련 게시물이 <br />
            존재하지 않습니다.
          </div>
        )}
        {show && (
          <Nav>
            <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
              이전
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
              다음
            </Button>
          </Nav>
        )}
      </Div>
    </div>
  );
};

export default CommunityBoard;
