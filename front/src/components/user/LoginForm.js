import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Col, Row, Form, Button } from "react-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'

import * as Api from "../../api"
import { DispatchContext } from "../../App"
import axios from "axios"


const img_gamer = styled.div`
    width: 600px;
    padding: 10px;
`

/* const 제목 = styled.h4`
    font-size: 25px;
    color: blue;
` */

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
      <Row>


        <Col className="md-6">
          <img style={{ width: '700px' }} src={process.env.PUBLIC_URL + 'img/gamer.svg'} alt="Gamer" />
        </Col>


        <Col style={{ width: "80%", marginLeft: "10%", marginTop: "10%" }} className="lg-6 justify-content-center">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loginEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                placeholder="이메일 주소를 입력해주세요"
                type="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>
          </Form>

          <Form.Group controlId="loginPassword" className="mt-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력해주세요"
              autoComplete="on"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isPasswordValid && (
              <Form.Text className="text-success">
                비밀번호는 4글자 이상입니다.
              </Form.Text>
            )}
          </Form.Group>


          <Button variant="primary" type="submit" disabled={!isFormValid}>
            로그인
          </Button>


          <Button variant="light" onClick={() => navigate("/register")}>
            회원가입하기
          </Button>

        </Col>


      </Row>
    </Container>
  )
}

export default LoginForm
