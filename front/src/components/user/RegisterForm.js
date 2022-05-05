import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 사용하는 함수만 import 하도록
import { post as Post } from "../../api";
import { Form } from "../styles/Register/RegisterFormStyle";
import Swal from "sweetalert2";

// 회원가입 폼 컴포넌트
const RegisterForm = () => {
  const navigate = useNavigate();

  // 회원가입 정보 상태값
  const [info, setInfo] = useState({
    email: "",
    password: "",
    repassowrd: "",
    nickname: "",
  });

  // 회원가입 정보 조건에 맞는지 에러 확인용 상태값
  const [hasError, setHasError] = useState({
    email: true,
    password: true,
    nickname: true,
  });

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const validate = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    setHasError((prev) => ({ ...prev, email: !validate }));
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    const isValidPassword = password.length >= 8 && specialLetter >= 1;
    setHasError((prev) => ({ ...prev, password: !isValidPassword }));
  };

  // 비밀번호 확인 검사 변수
  const validateConfirmPassword =
    info.password === info.repassword && info.password.length >= 1;

  // 닉네임 유효성 검사 함수
  const validateNickname = (nickname) => {
    if (nickname.length < 2 || nickname.length > 10)
      setHasError((prev) => ({ ...prev, nickname: true }));
    else setHasError((prev) => ({ ...prev, nickname: false }));
  };

  // Input박스 Change될 때 적용되는 함수
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "email") validateEmail(e.target.value);
    else if (e.target.name === "password") validatePassword(e.target.value);
    else if (e.target.name === "nickname") validateNickname(e.target.value);
  };

  // 초기화 시 리셋 함수
  const handleReset = () => {
    setInfo({
      email: "",
      password: "",
      repassowrd: "",
      nickname: "",
    });
    setHasError({
      email: true,
      password: true,
      nickname: true,
    });
  };

  // 회원 가입 폼 제출 시 함수
  const handleSubmit = () => {
    if (
      !hasError.nickname &&
      !hasError.email &&
      !hasError.password &&
      validateConfirmPassword
    ) {
      const newUser = {
        email: info.email,
        password: info.password,
        nickname: info.nickname,
      };

      Post("user/register", newUser)
        .then((res) => {
          (async () => {
            await Swal.fire({
              icon: "success",
              title: `회원가입에 성공했습니다🎉\n 로그인 페이지로 이동합니다.`,
              showConfirmButton: false,
              timer: 3000,
              width: 600,
              background: "rgba(0, 0, 0, 0.8)",
              color: "white",
            });
            await handleReset();
            await navigate("/login");
          })();
        })
        .catch((err) =>
          Swal.fire({
            icon: "error",
            title: err.response.data,
            showConfirmButton: false,
            timer: 3000,
            width: 600,
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
          })
        );
    } else
      Swal.fire({
        icon: "warning",
        title: `회원가입에 실패했습니다.\n 입력한 정보가 조건에 맞는지 다시 한 번 확인해주세요.`,
        showConfirmButton: false,
        timer: 3000,
        width: 600,
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
      });
  };

  return (
    <Form className="formContainer">
      <fieldset className="formFieldset">
        <label className="formLabel" htmlFor="nickname">
          사용할 닉네임
        </label>
        <input
          value={info.nickname}
          id="nickname"
          onChange={handleChange}
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요"
        ></input>
        <div className="error">
          {hasError.nickname && "닉네임은 2글자 이상, 10글자 이하여야 합니다."}
        </div>
      </fieldset>

      <fieldset className="formFieldset">
        <label className="formLabel" htmlFor="email">
          이메일(ID)
        </label>
        <input
          value={info.email}
          id="email"
          onChange={handleChange}
          type="email"
          // pattern=".+@globex\.com"
          name="email"
          placeholder="이메일을 입력해 주세요."
        ></input>
        <div className="error">
          {hasError.email && "이메일 형식이 올바르지 않습니다."}
        </div>
      </fieldset>

      <fieldset className="formFieldset">
        <label className="formLabel" htmlFor="password">
          비밀번호
        </label>
        <input
          value={info.password}
          id="password"
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
        ></input>
        <div className="error">
          {hasError.password &&
            "비밀번호는 특수문자 1개를 포함하여 8글자 이상이어야 합니다."}
        </div>
      </fieldset>

      <fieldset className="formFieldset">
        <label className="formLabel" htmlFor="repassword">
          비밀번호 확인
        </label>
        <input
          value={info.repassword}
          id="rePassword"
          onChange={handleChange}
          type="password"
          name="repassword"
          placeholder="비밀번호를 재입력해주세요."
        ></input>
        <div className="error">
          {!validateConfirmPassword && "비밀번호가 일치하지 않습니다"}
        </div>
      </fieldset>

      <div className="buttonContainer">
        <button
          onClick={handleReset}
          type="button"
          className="formButton resetButton"
        >
          초기화
        </button>
        <button
          onClick={handleSubmit}
          type="button"
          className="formButton submitButton"
        >
          가입하기
        </button>
      </div>
    </Form>
  );
};

export default RegisterForm;
