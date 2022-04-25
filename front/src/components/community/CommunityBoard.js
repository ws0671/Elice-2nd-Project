import CommunityList from "./CommunityList"
import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"

const CommunityBoard = () => {
  const [info, setInfo] = useState([])

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setInfo(res.data.slice(0, 10))
      })
      .catch((err) => alert("해당 페이지를 불러오지 못했습니다."))
  }, [])
  return (
    <div className="container">
      <div className="list">
        <Table className="table">
          <colgroup>
            <col width="10%" />
            <col width="40%" />
            <col width="10%" />
            <col width="20%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th className="dropdown">
                말머리
                <ul className="dropdown-content">
                  <li>전체보기</li>
                  <li>꿀팁</li>
                  <li>게임</li>
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
          <CommunityList info={info} />
        </Table>
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

    li:hover {
      background: rgba(108, 99, 255, 0.3);
      border-radius: 2px;
      font-weight: bold;
      // color: white;
      cursor: pointer;
    }
  }
`
export default CommunityBoard
