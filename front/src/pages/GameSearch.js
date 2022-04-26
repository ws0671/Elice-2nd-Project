import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import styled from "styled-components";

import Data from "./gamesearch_data";
function GameSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputData, setInputData] = useState("");
  const formValid = searchTerm;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputData(searchTerm);
  };
  return (
    <>
      <div className="video">
        <video width="100%" muted autoPlay loop>
          <source src="/videos/playStation.mp4" type="video/mp4" />
        </video>
      </div>
      <H1 className="mt-5">게임 검색</H1>
      <SearchBarContainer>
        <div className="searchBar">
          <Button>전체 목록</Button>
          <Button>장르</Button>
          <Button>플랫폼</Button>
          <Button>이용등급</Button>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              style={{ width: "500px", height: "50px" }}
              placeholder="타이틀로 검색"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button2 type="submit" disabled={!formValid}>
              확인
            </Button2>
          </form>
        </div>
      </SearchBarContainer>
      <Main>
        <ImgDiv className="mt-4">
          <div>
            {Data.filter((val) => {
              if (inputData === "") {
                return val;
              } else if (val.title.includes(inputData)) {
                return val;
              }
            }).map((val, key) => {
              return (
                <img
                  key={key}
                  src={val.src}
                  alt="게임 이미지"
                  style={{ width: "400px" }}
                />
              );
            })}
          </div>
        </ImgDiv>
      </Main>
      <Footer></Footer>
    </>
  );
}

const H1 = styled.h1`
  text-align: center;
  margin-bottom: 100px;
`;
const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  div.searchBar > Button {
    margin-right: 30px;
  }
  div:nth-child(1) {
    margin-right: 60px;
  }
`;
const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImgDiv = styled.div`
  div {
    /* display: flex;
    justify-content: center; */
    display: grid;
    grid-template-columns: repeat(3, 410px);
    grid-template-rows: repeat(3, 270px);
    gap: 20px;
  }
  img {
    margin: 10px;
    transition: all ease 1s 0s;
  }
  img:hover {
    opacity: 0.5;
  }
`;
const Button = styled.button`
  padding: 10px 30px;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
`;
const Button2 = styled.button`
  padding: 10px 30px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: #673ab7;
`;
const Footer = styled.footer`
  text-align: center;
  height: 40vh;
`;
export default GameSearch;
