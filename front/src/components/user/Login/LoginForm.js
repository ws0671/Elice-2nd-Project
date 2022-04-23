import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Col, Row, Form, Button, FormGroup } from "react-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsEye, BsPersonCircle } from "react-icons/bs";
import { GiOysterPearl } from "react-icons/gi";
import { createGlobalStyle } from 'styled-components'


import * as Api from "../../../api"
import { DispatchContext } from "../../../App"
import axios from "axios"


const GlobalStyle = createGlobalStyle`
  body {
  font-family: "Roboto", sans-serif;
  background-color: #f8fafb; }
`

const s_button = styled.button`
  border: 0;
  outline: 0;
  color: #6c63ff !important;
`

function LoginForm() {

  const navigate = useNavigate()
  const dispatch = useContext(DispatchContext)

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("")
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("")

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email)
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid



  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // "user/login" 엔드포인트로 post요청함.

      /*       const res = await axios({
              method: "POST",
              url: 'https://1dcea3c8-eb9e-403b-b0b1-38ee8964d324.mock.pstmn.io/user/login',
              data: {
                "email": email,
                "password": password
              }
            }).then((res) => {
              console.log(res)
            }).catch(err => {
              console.log(err)
              throw new err(err)
            })
       */
      const res = await Api.post("user/login", {
        email,
        password,
      })

      // 유저 정보는 response의 data임.
      const user = res.data
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken)
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      })

      // 기본 페이지로 이동함.
      navigate("/", { replace: true })
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err)
    }
  }

  return (


    <Container className="container-fluid">
      <GlobalStyle />
      <Row className="mt-5">
        <Col className="md-6">
          <img style={{ width: '700px' }} src={process.env.PUBLIC_URL + 'img/gamer.svg'} alt="Gamer" />
        </Col>

        <Col style={{ width: "80%", marginLeft: "10%" }} className="lg-6 text-center">

          <GiOysterPearl size={70} color="#6c63ff" alt="icon" style={{ marginBottom: "1rem" }} />
          <h3>Sign In</h3>
          <p class="mb-4">'Game Pearl'에 오신 것을 환영합니다!</p>
          <Form className="d-grid gap-2 col-10 mx-auto" onSubmit={handleSubmit}>
            <Form.Group controlId="loginEmail">
              {/* <Form.Label>이메일 주소</Form.Label> */}
              <Form.Control
                placeholder="이메일 주소"
                type="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/*  {!isEmailValid && (
                <Form.Text className="text-success text-left">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )} */}
            </Form.Group>


            <Form.Group controlId="loginPassword" className="mt-2">
              {/* <Form.Label>비밀번호</Form.Label> */}
              <Form.Control
                type="password"
                placeholder="비밀번호"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/*  {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상입니다.
                </Form.Text>
              )} */}
            </Form.Group>
            <Form.Group className="text-right mt-2">
              <div><a href="#"><small className="reset align-self-end" >비밀번호 재설정</small></a></div>
            </Form.Group>
            <Form.Group className="d-grid gap-2 col-12 mx-auto mt-3">
              <Button className="btn btn-block" type="submit" disabled={!isFormValid} style={{ backgroundColor: "#6c63ff", height: "50px" }}>
                로그인
              </Button>
              <small className="d-block text-left my-2 text-muted">&mdash; 회원이 아니신가요?&mdash; </small>
            </Form.Group>
          </Form>
          <Button className="ml-5" variant="outline-secondary btn-sm" onClick={() => navigate("/register")}>
            회원가입
          </Button>
        </Col>


      </Row>
    </Container >
  )
}

export default LoginForm
