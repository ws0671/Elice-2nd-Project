const CommunityElement = ({ item }) => {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.title}</td>
      <td>관리자</td>
      <td>2022-04-23</td>
      <td>{item.id}</td>
      <td>{item.userId}</td>
    </tr>
  )
}

export default CommunityElement
