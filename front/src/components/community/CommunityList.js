import CommunityElement from "./CommunityElement"

const CommunityList = ({ info }) => {
  return (
    <tbody>
      {info.map((item) => {
        return <CommunityElement key={item.id} item={item} />
      })}
    </tbody>
  )
}

export default CommunityList
