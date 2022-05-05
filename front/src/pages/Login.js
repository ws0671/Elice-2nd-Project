import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  BodyContainer,
  BodyWrapper,
  InputContainer,
  MainContainer,
  ButtonContainer,
  WelcomeText,
  GoToRegister,
  HorizeontalRule,
} from "../components/user/login/LoginStyle";
import * as Api from "../api";
import { DispatchContext } from "../App";
import { LoginButton } from "../components/user/login/LoginButton";
import { LoginInput } from "../components/user/login/LoginInput";
import { githubUrl, googleUrl } from "../components/socialLogin/SocialLoginUrl";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const githuburl = githubUrl();
  const googleurl = googleUrl();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("user/login", {
        email,
        password,
      });

      // 유저 정보는 response의 data임.
      const user = res.data;

      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰과 닉네임을 저장함.

      sessionStorage.setItem("userToken", jwtToken);
      sessionStorage.setItem("user", JSON.stringify(user));

      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      const today = await Api.get2(`point?route=Login`);
      if (!today.data.point) {
        Api.put(`user/${user.userId}/addPoint`, { point: 100 });
        Api.post("point", {
          route: "Login",
          point: 100,
        });
      }

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err);
    }
    console.log(email);
  };

  return (
    <BodyWrapper>
      <BodyContainer imgUrl="images/controller.jpg">
        <MainContainer>
          <WelcomeText>WELCOME</WelcomeText>
          <InputContainer>
            <LoginInput
              type="email"
              placeholder="Email"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LoginInput
              type="password"
              placeholder="Password"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <ButtonContainer>
            <LoginButton type="submit" onClick={handleSubmit}>
              LOG IN
            </LoginButton>
          </ButtonContainer>
          <GoToRegister>or become a new member!</GoToRegister>
          <HorizeontalRule />
          <LoginButton content="register" onClick={() => navigate("/register")}>
            REGISTER
          </LoginButton>
          <a href={githuburl}>GITHUB</a>
          <a href={googleurl}>GOOGLE</a>
        </MainContainer>
      </BodyContainer>
    </BodyWrapper>
  );
}

export default LoginForm;

/* const Button = styled.button`
    background: linear-gradient(to right, #14163c 0%, #03217b 79%);
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 65%;
    height: 3rem;
    border: none;
    color: white;
    border-radius: 2rem;
    cursor: pointer;
` */
