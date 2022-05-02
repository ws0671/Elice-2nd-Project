import CommunityBoard from "../components/community/CommunityBoard";
import { Main, Container } from "../components/styles/CommunityStyle";
import { useNavigate } from "react-router-dom";

// 커뮤니티 최상위 컴포넌트
const Community = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <Container>
        <CommunityBoard />
        <button className="write" onClick={() => navigate("/community/create")}>
          글쓰기
        </button>
      </Container>
    </Main>
  );
};

export default Community;
