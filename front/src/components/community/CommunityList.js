import CommunityElement from "./CommunityElement"

const CommunityList = ({ info }) => {
  return (
    <tbody>
      {info.map((item) => {
        return <CommunityElement item={item} index={info.indexOf(item) + 1} />
      })}
    </tbody>
  )
}

export default CommunityList
