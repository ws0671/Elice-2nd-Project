import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Api from "../../api"
import styles from "./Register.module.css"

const RegisterForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [nickname, setNickname] = useState("")

  const [emailError, setEmailError] = useState(true)
  const [passwordError, setPasswordError] = useState(true)
  const [nicknameError, setNicknameError] = useState(true)

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const validate = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )

    setEmailError(!validate)
  }

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi)
    const isValidPassword = password.length >= 4 && specialLetter >= 1
    if (isValidPassword) {
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  // 비밀번호 확인 검사 변수
  const validateConfirmPassword =
    password === confirmPassword && password.length >= 1

  // 닉네임 유효성 검사 함수
  const validateNickname = (nickname) => {
    if (nickname.length < 2 || nickname.length > 10) {
      setNicknameError(true)
    } else {
      setNicknameError(false)
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    validateEmail(e.target.value)
  }

  const handlePwChange = (e) => {
    setPassword(e.target.value)
    validatePassword(e.target.value)
  }

  const handleConfirmPwChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleNicknameChange = (e) => {
    setNickname(e.target.value)
    validateNickname(e.target.value)
  }

  const handleReset = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setNickname("")
    setEmailError(true)
    setPasswordError(true)
    setNicknameError(true)
  }

  const handleSubmit = () => {
    if (
      !nicknameError &&
      !emailError &&
      !passwordError &&
      validateConfirmPassword
    ) {
      alert("회원가입에 성공했습니다.")
      const newUser = { email, password, nickname }
      Api.post("user/register", newUser).then((res) => {
        console.log(res.data)
        handleReset()
      })
      navigate("/login")
    } else {
      alert("회원가입에 실패했습니다. 다시 한 번 확인해주세요.")
    }
  }

  return (
    <>
      <form className={styles.formContainer}>
        <fieldset className={styles.formFieldset}>
          <label className={styles.formLabel} htmlFor="nickname">
            사용할 닉네임
          </label>
          <input
            value={nickname}
            id="nickname"
            onChange={handleNicknameChange}
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해주세요"
          ></input>
          <div className={styles.error}>
            {nicknameError
              ? "닉네임은 2글자 이상, 10글자 이하여야 합니다."
              : null}
          </div>
        </fieldset>

        <fieldset className={styles.formFieldset}>
          <label className={styles.formLabel} htmlFor="identification">
            이메일(ID)
          </label>
          <input
            value={email}
            id="email"
            onChange={handleEmailChange}
            type="text"
            name="email"
            placeholder="이메일을 입력해 주세요."
          ></input>
          <div className={styles.error}>
            {emailError ? "이메일 형식이 올바르지 않습니다." : null}
          </div>
        </fieldset>

        <fieldset className={styles.formFieldset}>
          <label className={styles.formLabel} htmlFor="identification">
            비밀번호
          </label>
          <input
            value={password}
            id="password"
            onChange={handlePwChange}
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요."
          ></input>
          <div className={styles.error}>
            {passwordError
              ? "비밀번호는 특수문자 1개를 포함하여 4글자 이상이어야 합니다."
              : null}
          </div>
        </fieldset>

        <fieldset className={styles.formFieldset}>
          <label className={styles.formLabel} htmlFor="identification">
            비밀번호 확인
          </label>
          <input
            value={confirmPassword}
            id="confirm-password"
            onChange={handleConfirmPwChange}
            type="password"
            name="confirm-password"
            placeholder="비밀번호를 재입력해주세요."
          ></input>
          <div className={styles.error}>
            {!validateConfirmPassword ? "비밀번호가 일치하지 않습니다" : null}
          </div>
        </fieldset>

        <div className={styles.buttonContainer}>
          <button
            onClick={handleReset}
            type="button"
            className={`${styles.formButton} ${styles.resetButton}`}
          >
            초기화
          </button>

          <button
            onClick={handleSubmit}
            type="button"
            className={`${styles.formButton} ${styles.submitButton}`}
          >
            가입하기
          </button>
        </div>
      </form>
    </>
  )
}

export default RegisterForm
