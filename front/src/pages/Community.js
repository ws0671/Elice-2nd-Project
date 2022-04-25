import CommunityBoard from "../components/community/CommunityBoard"
import styled from "styled-components"

const Community = () => {
  return (
    <Main>
      <Container>
        <CommunityBoard />
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
