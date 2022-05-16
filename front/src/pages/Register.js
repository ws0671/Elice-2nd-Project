import RegisterForm from "../components/user/RegisterForm";
import { Main, Container } from "../components/styles/Register/RegisterStyle";
import { useNavigate } from "react-router-dom";
import logo from "../images/footerLogo.png";
import arrow from "../images/arrow.png";

// 회원가입 최상위 컴포넌트
const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ height: 50 }}></div>
      <Main imgUrl="images/controller.jpg">
        <Container
          style={{
            background: "#3F39A3",
            width: "40vw",
            height: "100vh",
            margin: 0,
          }}
        >
          <img src={logo} alt="logo" style={{ width: 400 }} />
          {/* <<h2>Join Us</h2>> */}
          <br />
          <button className="prologue" onClick={() => navigate("/prologue")}>
            About Us
          </button>
          <img id="arrow" src={arrow} alt="arrow" />
        </Container>
        <Container className="registerBackground">
          <RegisterForm />
        </Container>
      </Main>
    </>
  );
};

export default Register;
