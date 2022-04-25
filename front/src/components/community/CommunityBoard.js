import CommunityList from "./CommunityList"
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import useDetectClose from "./useDetectClose"

const CommunityBoard = () => {
  const [info, setInfo] = useState([])
  const dropDownRef = useRef(null)
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false)

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setInfo(res.data.slice(0, 10))
      })
      .catch((err) => console.log(err))
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
              <th className="dropdown" onClick={() => setIsOpen(!isOpen)}>
                말머리
                {isOpen && (
                  <ul ref={dropDownRef} class="dropdown-content">
                    <li>샤인머스켓</li>
                    <li>체리</li>
                    <li>홍시</li>
                  </ul>
                )}
              </th>

              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회</th>
              <th>좋아요</th>
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
    min-width: 160px;
    padding: 8px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`
export default CommunityBoard
