import CommunityBoard from "../components/community/CommunityBoard";
import { Main, Container } from "../components/styles/Community/CommunityStyle";
import { useNavigate } from "react-router-dom";
import banner from "../images/communitybanner.png";
import PacmanLoader from "react-spinners/PacmanLoader";
import loadingbg from "../images/loadingbg.svg";
// 커뮤니티 최상위 컴포넌트
const Community = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <div className="navMargin"></div>
      <div
        style={{
          backgroundImage: `url(${banner})`,
          width: "100%",
          padding: "5%",
        }}
      >
        <div className="title">
          <p>커뮤니티</p>
          <p>
            다른 유저들과 소통하며 게임 팁, 유머 등 다양한 이야기를 확인해보세요
          </p>
          {/* <p>Tip. 미니게임과 댓글, 게임리뷰를 통해 포인트를 쌓아보세요</p> */}
        </div>
      </div>

      <Container>
        <div className="container">
          <div className="buttonWrap">
            <button
              className="write"
              onClick={() => navigate("/community/create")}
            >
              <span class="material-symbols-outlined">edit</span> 글쓰기
            </button>
          </div>
        </div>
        <CommunityBoard />
      </Container>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${loadingbg})`,
          backgroundSize: "100%",
          width: "100%",
        }}
      >
        <div style={{ marginRight: 100, marginBottom: 100 }}>
          <PacmanLoader
            size={30}
            // style={{ marginRight: 100 }}
            color={"#f4c19f"}
          />
        </div>
      </div>
    </Main>
  );
};

export default Community;
