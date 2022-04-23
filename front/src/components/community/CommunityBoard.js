import CommunityList from "./CommunityList"

const CommunityBoard = () => {
  return (
    <div className="container">
      <div className="list">
        <table className="table">
          <thead>
            <tr>
              <th>말머리</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <CommunityList />
        </table>
      </div>
    </div>
  )
}

export default CommunityBoard
