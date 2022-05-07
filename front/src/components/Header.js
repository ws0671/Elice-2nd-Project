import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserStateContext, DispatchContext } from "../App";
import logo from "../images/headerLogo.png";
import Swal from "sweetalert2";
import { Dropdown } from "react-bootstrap";
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
            style={{ width: "180px", height: "45px" }}
          />
        </Link>
      </div>
      <div className="headerRight">
        <div>
          <Dropdown>
            <Dropdown.Toggle
              style={{ background: "none", border: "none" }}
              size="sm"
              id="dropdown-basic"
            >
              프롤로그
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{ background: "rgba(0, 0, 0, 0.8)", border: "none" }}
            >
              <Dropdown.Item id="dropdown-menu1" href="/prologue">
                서비스 소개
              </Dropdown.Item>
              <Dropdown.Item id="dropdown-menu2" href="/teaminfo">
                팀 소개
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {userContext.user && (
          <div>
            <Link to="/recommend">게임 추천</Link>
          </div>
        )}
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
              <Dropdown>
                <Dropdown.Toggle
                  style={{ background: "none", border: "none" }}
                  size="sm"
                  id="dropdown-basic"
                >
                  미니게임
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{ background: "rgba(0, 0, 0, 0.8)", border: "none" }}
                >
                  <Dropdown.Item id="dropdown-menu1" href="/minigame/roulette">
                    룰렛 돌리기
                  </Dropdown.Item>
                  <Dropdown.Item id="dropdown-menu2" href="/minigame/snake">
                    Snake Game
                  </Dropdown.Item>
                  <Dropdown.Item id="dropdown-menu3" href="/minigame/catMatch">
                    카드 맞추기
                  </Dropdown.Item>
                  <Dropdown.Item id="dropdown-menu4" href="/minigame/2048">
                    2048
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
    font-family: 'Orbitron', sans-serif;;
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

  #dropdown-menu1:hover,
  #dropdown-menu2:hover,
  #dropdown-menu3:hover,
  #dropdown-menu4:hover {
    // color: black;
    background: #1b1523;
  }
  #dropdown-basic {
    font-size: 13px;
  }
  #dropdown-basic::after {
    display: none;
  }
`;
