import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import {
  githubUrl,
  googleUrl,
  kakaoUrl,
} from "../components/socialLogin/SocialLoginUrl";
import Swal from "sweetalert2";
import axios from "axios";
import { FlexDiv1 } from "../components/styles/MainStyle";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const githuburl = githubUrl();
  const googleurl = googleUrl();
  const kakaourl = kakaoUrl();

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
  // 비밀번호 찾을 때 인증코드 정답
  var answerCode = 0;

  // 비밀번호 찾기 함수(sweetalert2 라이브러리 사용)
  const findPassword = () => {
    (async () => {
      const { value: email } = await Swal.fire({
        title: "가입한 이메일을 적어주세요",
        input: "text",
        showCancelButton: true,
        inputPlaceholder: "이메일을 입력하세요",
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        allowOutsideClick: false,
      });
      // 이후 처리되는 내용.
      if (email) {
        axios
          .post(`http://${process.env.REACT_APP_MODE}:5001/user/emailVerify`, {
            email,
          })

          .then((res) => {
            // setAnswerCode(res.data.code);
            // real = res.data.code;
            (async () => {
              answerCode = res.data.code;
              await Swal.fire(
                `${email}로 인증코드를 발송했습니다. 확인해주세요`
              );
              const { value: formValues } = await Swal.fire({
                title: "",
                html:
                  '<div>인증 코드 :<input id="swal-input1" class="swal2-input" placeholder="인증코드를 입력해주세요"></div>' +
                  '<div>새 비밀번호 :<input id="swal-input2" class="swal2-input" placeholder="비밀번호를 입력해주세요"></div>',
                focusConfirm: false,
                confirmButtonText: "확인",
                cancelButtonText: "취소",
                allowOutsideClick: false,
                showCancelButton: true,
                preConfirm: () => {
                  return {
                    email: email,
                    verified:
                      Number(answerCode) ===
                      Number(document.getElementById("swal-input1").value),

                    password: document.getElementById("swal-input2").value,
                  };
                },
              });

              if (formValues) {
                (async () => {
                  await axios
                    .put(
                      `http://${process.env.REACT_APP_MODE}:5001/user/missingPassword`,
                      formValues
                    )
                    .then((res) => Swal.fire("정상적으로 변경되었습니다."))
                    .catch((err) => Swal.fire(err.response.data));
                })();
              }
            })();
          })
          .catch((err) =>
            (async () => {
              await Swal.fire(`${err.response.data} 다시 진행해주세요.`);
            })()
          );
      }
    })();
  };

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
      Swal.fire({
        icon: "success",
        title: `환영합니다, ${user.nickname}님!`,
        showConfirmButton: false,
        timer: 1500,
        width: 600,
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
      });

      const today = await Api.get2(`point?route=Login`);
      if (!today.data.point) {
        Api.put(`user/${user.userId}/addPoint`, { point: 100 });
        Api.post("point", {
          route: "Login",
          point: 100,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: `축하합니다! 100포인트를 얻으셨습니다!!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: `${err.response.data}`,
        showConfirmButton: false,
        timer: 1500,
        width: 600,
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
      });
    }
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
          <FlexDiv1 style={{ justifyContent: "space-between" }}>
            <a href={githuburl}>
              <img
                src={`/img/깃헙 동그라미.png`}
                width="50px"
                style={{ marginRight: "30px" }}
              />
            </a>
            <a href={googleurl}>
              <img
                src={`/img/구글 동그라미.png`}
                width="50px"
                style={{ marginRight: "30px" }}
              />
            </a>
            <a href={kakaourl}>
              <img src={`/img/카카오 동그라미.png`} width="50px" />
            </a>
          </FlexDiv1>
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
