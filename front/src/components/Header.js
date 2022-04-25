import styled from "styled-components"
import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import { UserStateContext, DispatchContext } from "../App"
import { Button, Row, Col } from "react-bootstrap"
import { throttle } from "lodash"

function Header() {
  return (
    <HeaderTag className="mainHeader">
      <div className="logo">
        <Link className="logoLink" to="/">
          Game Pearl
        </Link>
      </div>
      <div className="headerRight">
        <div>
          <Link to="#">프롤로그</Link>
        </div>
        <div>
          <Link to="#">게임 추천</Link>
        </div>
        <div>
          <Link to="/gamesearch">게임 검색</Link>
        </div>
        <div>
          <Link to="#">TOP 차트</Link>
        </div>
        <div>
          <Link to="#">콘텐츠</Link>
        </div>
        <div>
          <Link to="#">마이 페이지</Link>
        </div>
        <div>
          <Link to="/login">로그인</Link>
        </div>
        <div>
          <Link to="/register">회원가입</Link>
        </div>
      </div>
      {/* {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={logout}>로그아웃</Nav.Link>
        </Nav.Item>
      )} */}
    </HeaderTag>
  )
}

export default Header

const HeaderTag = styled.div`
  text-decoration: none;
  display: flex;
  justify-content: center;
  & > .headerRight {
    width: 50vw;
    display: flex;
    justify-content: space-evenly;
  }
  a.logoLink {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    font-size: 13px;
  }
  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    font-size: 13px;
  }
`
