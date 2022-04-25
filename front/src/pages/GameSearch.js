import React, { useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import { UserStateContext, DispatchContext } from "../App"
import styled from "styled-components"

function GameSearch() {
  return (
    <>
      <div className="video">
        <video width="100%" muted autoPlay loop>
          <source src="/videos/playStation.mp4" type="video/mp4" />
        </video>
      </div>
      <H1 className="mt-5">게임 검색</H1>
      <div className="searchBarContainer">
        <div className="searchBar">
          <button>전체 목록</button>
          <button>장르</button>
          <button>플랫폼</button>
          <button>이용등급</button>
        </div>
        <div>
          <input />
          <button>확인</button>
        </div>
      </div>
    </>
  )
}

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 100px;
`
export default GameSearch
