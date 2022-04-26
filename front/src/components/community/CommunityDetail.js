import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
const CommunityDetail = () => {
  const [detail, setDetail] = useState({})
  const params = useParams()
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
      .then((res) => setDetail(res.data))
  }, [])

  return (
    <Container>
      <div className="detail title">{detail.title}</div>
      <div className="detail">
        <div>작성자</div>
        <div>작성 시간 / 조회 수</div>
      </div>
      <div className="detail body">{detail.body}</div>
      <div className="detail etc">
        <img src="/images/unlike.png" alt="좋아요"></img>
        <span>좋아요</span>
        <span>0</span>
        <img src="/images/comment.png" alt="댓글"></img>
        <span>댓글</span>
        <span>0</span>
      </div>
      <div className="detail comment">
        <div>댓글</div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .detail {
    width: 60%;

    &:first-of-type {
      font-size: 25px;
      font-weight: bold;
    }

    &:not(:nth-of-type(2)) {
      margin: 10px;
      padding: 10px;
    }

    &:nth-of-type(2) {
      margin: 0 10px;
      padding: 0 10px;
      font-size: 12px;
    }
  }
  .comment div {
    font-size: 20px;
    font-weight: bold;
  }
  .etc {
    display: flex;
    flex-direction: row;
    align-items: center;
    \ img {
      width: 30px;
      height: 30px;
    }

    * {
      margin-right: 10px;
      text-align: center;
    }
  }
`

export default CommunityDetail
