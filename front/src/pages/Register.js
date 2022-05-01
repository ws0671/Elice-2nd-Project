import RegisterForm from "../components/user/RegisterForm"
import { Main, Container } from "../components/styles/RegisterStyle"

// 회원가입 최상위 컴포넌트
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
