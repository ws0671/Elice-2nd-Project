import CommunityBoard from "../components/community/CommunityBoard"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const Community = () => {
  const navigate = useNavigate()
  return (
    <Main>
      <Container>
        <CommunityBoard />
        <button className="write" onClick={() => navigate("/community/create")}>
          글쓰기
        </button>
      </Container>
    </Main>
  )
}

const Main = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Container = styled.div`
  max-width: 100vh;
  width: 100vh;
  margin-top: 90px;
  // max-height: 100vh;
  // height: 80vh;

  padding: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  .write {
    position : fixed;
    left: 90%;
    right: 90%
    flex: 1;
    border: none;
    padding: 10px;
    color: white;
    font-weight: 700;
    border-radius: 3px;
    font-size: 20px;
    cursor: pointer;
    background: rgba(108, 99, 255, 0.7);

    &:hover {
      background: rgba(108, 99, 255, 0.6);
    }
  }

  }
`

export default Community
