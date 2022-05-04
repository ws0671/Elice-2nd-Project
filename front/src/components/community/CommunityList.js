import CommunityElement from "./CommunityElement";
// 커뮤니티 게시판 리스트 컴포넌트
const CommunityList = ({ info, page }) => {
  return (
    <tbody>
      {info.map((item, index) => {
        return (
          <CommunityElement
            key={item.articleId}
            page={page}
            item={item}
            index={index + 1}
          />
        );
      })}
    </tbody>
  );
};

export default CommunityList;
