import { useNavigate } from "react-router-dom"
import { useState } from "react"
import styled from "styled-components"
const CommunityElement = ({ item, index, page }) => {
  const [hit, setHit] = useState(item.hits)
  const navigate = useNavigate()
  const clickHandler = () => {
    navigate(`/community/${item.articleId}`)
    setHit(hit + 1)
    console.log("조회수", hit + 1)
  }

  const updatedAt = item.updatedAt.split("T")

  return (
    <Tr>
      <td>{index + (page - 1) * 10}</td>
      <td onClick={clickHandler}>
        <span>[{item.category}]</span> {item.title}
      </td>
      <td>{item.nickname}</td>
      <td>{updatedAt[0]}</td>
      <td>{hit}</td>
      <td>{item.like}</td>
    </Tr>
  )
}

const Tr = styled.tr`
  td:nth-child(2) {
    text-align: initial;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

export default CommunityElement
