import { useNavigate } from "react-router-dom"
import styled from "styled-components"
const CommunityElement = ({ item, index }) => {
  const navigate = useNavigate()
  const clickHandler = () => {
    navigate(`/community/${item.articleId}`)
  }

  const updatedAt = item.updatedAt.split("T")

  return (
    <Tr>
      <td>{index}</td>
      <td onClick={clickHandler}>
        <span>[{item.category}]</span> {item.title}
      </td>
      <td>{item.nickname}</td>
      <td>{updatedAt[0]}</td>
      <td>{item.id}</td>
      <td>{item.userId}</td>
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
