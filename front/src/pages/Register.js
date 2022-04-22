import RegisterForm from "../components/user/RegisterForm"
import styled from "styled-components"

function Register() {
  return (
    <Main>
      <div>디자인</div>
      <Container>
        <RegisterForm />
      </Container>
    </Main>
  )
}

const Main = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
const Container = styled.div`
  max-width: 50vh;
  width: 50vh;

  max-height: 100vh;
  height: 80vh;

  border: 2px solid #ced4da;
  border-radius: 10px;

  padding: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
`

export default Register
