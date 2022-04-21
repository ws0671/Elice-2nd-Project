import RegisterForm from "./components/user/RegisterForm"
import styled from "styled-components"

function App() {
  return (
    <Main>
      <Container>
        <RegisterForm />
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
  max-width: 300px;
  width: 300px;

  max-height: 100vh;
  height: 80vh;

  border: 2px solid #ced4da;
  border-radius: 10px;

  padding: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
`

export default App
