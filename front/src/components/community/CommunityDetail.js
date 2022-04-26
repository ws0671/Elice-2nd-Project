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
`

export default CommunityDetail
