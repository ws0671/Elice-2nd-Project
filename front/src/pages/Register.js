import RegisterForm from "../components/user/RegisterForm"
import { Main, Container } from "../components/styles/RegisterStyle"

const Register = () => {
  return (
    <Main>
      <Container>
        <img src="/images/gameday.png" alt="게임"></img>
      </Container>
      <Container>
        <RegisterForm />
      </Container>
    </Main>
  )
}

export default Register
