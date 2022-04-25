import React, { useState } from "react"
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
          <Button>전체 목록</Button>
          <Button>장르</Button>
          <Button>플랫폼</Button>
          <Button>이용등급</Button>
        </div>
        <div>
          <input
            style={{ width: "500px", height: "50px" }}
            placeholder="타이틀로 검색"
          />
          <Button2> 확인</Button2>
        </div>
      </div>
      <main>
        <ImgDiv className="mt-4">
          <div className="row1">
            <img
              style={{ width: "400px" }}
              alt="게임 이미지"
              src="/images/star.jpg"
            />
            <img
              style={{ width: "400px" }}
              alt="게임 이미지"
              src="/images/star.jpg"
            />
            <img
              style={{ width: "400px" }}
              alt="게임 이미지"
              src="/images/star.jpg"
            />
          </div>
          <div className="row2">
            <img
              style={{ width: "400px" }}
              alt="게임 이미지"
              src="/images/star.jpg"
            />
            <img
              style={{ width: "400px" }}
              alt="게임 이미지"
              src="/images/star.jpg"
            />
            <img
              style={{ width: "400px" }}
              alt="게임 이미지"
              src="/images/star.jpg"
            />
          </div>
        </ImgDiv>
      </main>
      <Footer>Footer 자리입니다.</Footer>
    </>
  )
}

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 100px;
`
const ImgDiv = styled.div`
  div {
    display: flex;
    justify-content: center;
  }
  img {
    margin: 10px;
  }
`
const Button = styled.button`
  padding: 10px 30px;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
`
const Button2 = styled.button`
  padding: 10px 30px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: #673ab7;
`
const Footer = styled.footer`
  text-align: center;
  height: 40vh;
`
export default GameSearch
