import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserStateContext, DispatchContext } from "../App";
import logo from "../images/logo.png";
import Swal from "sweetalert2";
const Header = () => {
  const userContext = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const logout = () => {
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    Swal.fire({
      icon: "success",
      title: "정상적으로 로그아웃 되었습니다.",
      showConfirmButton: false,
      timer: 1500,
      width: 600,
      background: "rgba(0, 0, 0, 0.8)",
      color: "white",
    });
  };

  return (
    <HeaderTag className="mainHeader">
      <div className="logo">
        <Link className="logoLink" to="/">
          <img
            src={logo}
            alt="Game Pearl"
            style={{ width: "170px", height: "60px" }}
          />
        </Link>
      </div>
      <div className="headerRight">
        <div>
          <Link to="/prologue">프롤로그</Link>
        </div>
        <div>
          <Link to="/recommend">게임 추천</Link>
        </div>
        <div>
          <Link to="/gamesearch">게임 검색</Link>
        </div>
        <div>
          <Link to="/topchart">TOP 차트</Link>
        </div>
        {userContext.user && (
          <>
            <div>
              <Link to="/community">커뮤니티</Link>
            </div>
            <div>
              <Link to="/mypage">마이 페이지</Link>
            </div>
          </>
        )}
        <div>
          {userContext.user ? (
            <Link to="/" onClick={logout}>
              로그아웃
            </Link>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
        {!userContext.user && (
          <div>
            <Link to="/register">회원가입</Link>
          </div>
        )}
      </div>
      {/* {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={logout}>로그아웃</Nav.Link>
        </Nav.Item>
      )} */}
    </HeaderTag>
  );
};

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
