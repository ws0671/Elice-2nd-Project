import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

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
<<<<<<< HEAD
          <Nav>
            <Nav.Item>
              <Nav.Link onClick={() => navigate("/")}>프롤로그</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => navigate("/")}>게임 추천</Nav.Link>
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
              <Nav.Link onClick={() => navigate("/mypage")}>
                마이 페이지
              </Nav.Link>
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
=======
          <Link to="#">게임 추천</Link>
>>>>>>> gamesearch
        </div>
        <div>
          <Link to="/gamesearch">게임 검색</Link>
        </div>
        <div>
          <Link to="/topchart">TOP 차트</Link>
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
  );
}

export default Header;

const HeaderTag = styled.div`
  text-decoration: none;
  display: flex;
  z-index: 99999;
  position: fixed;
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.8);
  transition-duration: 1s;
  justify-content: center;
  align-items: center;
}


  & > .headerRight {
    width: 50vw;
    display: flex;
    justify-content: space-evenly;
  }
  a.logoLink {
    text-decoration: none;
    color: #6c757d;
    font-size: 13px;
  }
  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    font-size: 13px;
  }
  a:hover {
    color: rgba(255, 255, 255);
  }
`;
