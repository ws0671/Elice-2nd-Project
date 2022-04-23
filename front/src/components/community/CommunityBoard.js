import CommunityList from "./CommunityList"
import axios from "axios"
import { useEffect, useState } from "react"

const CommunityBoard = () => {
  const [info, setInfo] = useState([])

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log(res.data)
        setInfo(res.data.slice(0, 10))
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <div className="container">
      <div className="list">
        <table className="table">
          <thead>
            <tr>
              <th>말머리</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <CommunityList info={info} />
        </table>
      </div>
    </div>
  )
}

export default CommunityBoard
