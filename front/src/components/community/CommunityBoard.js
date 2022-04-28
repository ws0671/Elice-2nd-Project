import CommunityList from "./CommunityList"
import * as Api from "../../api"
import { useEffect, useState } from "react"
import styled from "styled-components"

const CommunityBoard = () => {
  const [info, setInfo] = useState([])
  const [total, setTotal] = useState(10)
  const [query, setQuery] = useState("")
  const limit = 10
  const [page, setPage] = useState(1)
  const numPages = Math.ceil(total / limit)

  useEffect(() => {
    Api.get("article/list", page + query)
      .then((res) => {
        setInfo(res.data.articles)
        setTotal(res.data.articleCount)
      })
      .catch((err) => alert("해당 페이지를 불러오지 못했습니다."))
  }, [page, query])
  return (
    <div className="container">
      <div
        className="list"
        style={{ display: "flex", flexDirection: "column" }}
      >
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
                  <li
                    onClick={() => {
                      setQuery(`?category=선택 안함`)
                      console.log(query)
                    }}
                  >
                    전체보기
                  </li>
                  <li onClick={() => setQuery(`?category=건의사항`)}>꿀팁</li>
                  <li onClick={() => setQuery(`?category=파티 모집`)}>게임</li>
                </ul>
              </th>

              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회</th>
              <th className="dropdown">
                좋아요
                <ul className="dropdown-content">
                  <li>높은순</li>
                  <li>낮은순</li>
                </ul>
              </th>
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
      </div>
    </div>
  )
}

const Table = styled.table`
  tr {
    text-align: center;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 100px;
    padding: 8px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }

  .dropdown:hover .dropdown-content {
    display: block;
    list-style-type: none;

    li {
      font-weight: normal;
    }
    li:hover {
      background: rgba(108, 99, 255, 0.3);
      border-radius: 2px;
      font-weight: bold;
      // color: white;
      cursor: pointer;
    }
  }
`

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 4px 8px;
  margin: 0;
  // background: black;
  // color: white;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background: rgba(108, 99, 255, 0.4);
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: #cbc0d3;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: rgba(108, 99, 255, 0.7);
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`

export default CommunityBoard
