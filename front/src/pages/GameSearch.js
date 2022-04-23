import React, { useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import { UserStateContext, DispatchContext } from "../App"
import { Container, Card, Row, Col, Button } from "react-bootstrap"
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
          <Button variant="secondary">전체 목록</Button>
          <Button variant="outline-dark">장르</Button>
          <Button variant="outline-dark">플랫폼</Button>
          <Button variant="outline-dark">이용등급</Button>
        </div>
        <div>
          <input />
          <Button variant="dark">확인</Button>
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
