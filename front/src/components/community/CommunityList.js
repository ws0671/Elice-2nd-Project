import CommunityElement from "./CommunityElement"

const CommunityList = ({ info, page }) => {
  console.log(info)
  return (
    <tbody>
      {info.map((item) => {
        return (
          <CommunityElement
            key={item.articleId}
            page={page}
            item={item}
            index={info.indexOf(item) + 1}
          />
        )
      })}
    </tbody>
  )
}

export default CommunityList
