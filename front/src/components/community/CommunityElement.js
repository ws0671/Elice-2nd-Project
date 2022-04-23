import { useNavigate } from "react-router-dom"
import styled from "styled-components"
const CommunityElement = ({ item }) => {
  const navigate = useNavigate()
  const clickHandler = () => {
    navigate(`/community/${item.id}`)
  }
  return (
    <Tr>
      <td>{item.id}</td>
      <td onClick={clickHandler}>{item.title}</td>
      <td>관리자</td>
      <td>2022-04-23</td>
      <td>{item.id}</td>
      <td>{item.userId}</td>
    </Tr>
  )
}

const Tr = styled.tr`
  td:nth-child(2):hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export default CommunityElement
