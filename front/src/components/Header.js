import styled from "styled-components"
import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import { UserStateContext, DispatchContext } from "../App"
import { Button, Row, Col } from "react-bootstrap"
import { throttle } from "lodash"

function Header() {
  const navigate = useNavigate()
  const [scrollPositon, setScrollPostion] = useState(0)
  const updateScroll = () => {
    setScrollPostion(window.scrollY || document.documentElement.scrollTop)
  }
  useEffect(() => {
    window.addEventListener("scroll", throttle(updateScroll, 300))
    return () => {
      window.removeEventListener("scroll", throttle(updateScroll, 300))
    }
  })

  return (
    <>
      <Nav className={scrollPositon < 80 ? "mainHeader" : "mode"}>
        <div>
          <Nav.Item className="logo">
            <Nav.Link disabled>Game Pearl</Nav.Link>
          </Nav.Item>
        </div>
        <div>
          <Nav>
            <Nav.Item>
              <Nav.Link onClick={() => navigate("/")}>프롤로그</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => navigate("/recommend")}>게임 추천</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => navigate("/gamesearch")}>
                게임 검색
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => navigate("/")}>TOP 차트</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => navigate("/community")}>콘텐츠</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => navigate("/")}>마이 페이지</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link onClick={() => navigate("/login")}>로그인</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => navigate("/register")}>
                회원가입
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        {/* {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={logout}>로그아웃</Nav.Link>
        </Nav.Item>
      )} */}
      </Nav>

      {/* footer추가,반응형 작업하기, 네비게이션 수정 */}
    </>
  )
}

export default Header
