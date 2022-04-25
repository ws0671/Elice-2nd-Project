import CommunityBoard from "../components/community/CommunityBoard"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const Community = () => {
  const navigate = useNavigate()
  return (
    <Main>
      <Container>
        <CommunityBoard />
        <button onClick={() => navigate("/community/create")}>글쓰기</button>
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
  }
`

export default Community
