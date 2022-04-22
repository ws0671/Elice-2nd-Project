import styled from "styled-components"
import React, { useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import { UserStateContext, DispatchContext } from "../App"
import { Button } from "react-bootstrap"

function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const userState = useContext(UserStateContext)
  const dispatch = useContext(DispatchContext)

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken")
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" })
    // 기본 페이지로 돌아감.
    navigate("/")
  }

  return (
    <>
      <Nav activeKey={location.pathname}>
        <Nav.Item className="me-auto mb-5">
          <Nav.Link disabled>Game Pearl</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/")}>프롤로그</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/")}>게임 추천</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/")}>게임 검색</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/")}>TOP 차트</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/network")}>콘텐츠</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => navigate("/")}>마이 페이지</Nav.Link>
        </Nav.Item>
        <Nav variant="pills" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link>로그인</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>회원가입</Nav.Link>
          </Nav.Item>
        </Nav>
        {/* {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={logout}>로그아웃</Nav.Link>
        </Nav.Item>
      )} */}
      </Nav>
      <div className="video">
        <video width="100%" muted autoPlay loop>
          <source src="/video/mainVideo.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  )
}

export default Header
