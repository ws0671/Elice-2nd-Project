import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import Data from "./gamesearch_data";
import * as Api from "../api";
import SearchPagination from "../components/Search/SearchPagination";
const types = ["전체 목록", "장르", "플랫폼", "이용등급"];
const vers = ["이름순", "내림차순"];
function GameSearch() {
  //없는 검색어 검색시 없는 검색이라고 나오도록 구현하기
  const [searchWord, setSearchWord] = useState("");
  const [inputData, setInputData] = useState("");
  const [select, setSelect] = useState(types[0]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

  // 페이지네이션과 관련된 state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [lastPage, setLastPage] = useState(1);

  // 전체 데이터를 api 응답으로 받아오는 함수
  const getData = async () => {
    const res = await Api.get(
      `game/list/${page}`,
      `?page=${limit}&limit=${limit}`
    );
    console.log(res.data);
    setData(res.data);
    setLastPage(10);
    //res.lastPage
  };

  useEffect(() => {
    getData();
  }, [page, limit, inputData]);
  // input태그를 제출하는 함수입니다.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputData(searchWord);
  };
  //input태그의 onChange이벤트의 처리를 하는 함수입니다.
  const handleInput = (e) => {
    if (e.target.value === "") {
      return false;
    }
    setSearchWord(e.target.value);
  };

  // //버튼을 클릭하면 실행되는 함수입니다.
  const handleButton = (e, type) => {
    setSelect(type);
    if (e.target.textContent === "전체 목록") {
      setInputData("");
    }
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
          {types.map((type, key) => (
            <Button
              key={key}
              select={select === type}
              onClick={(e) => handleButton(e, type)}
            >
              {type}
            </Button>
          ))}
        </div>
        <div>
          <Form onSubmit={handleSubmit}>
            <FaSearch style={{ positin: "relative", left: "40px" }} />
            <Input placeholder="타이틀로 검색" onChange={handleInput} />
          </Form>
        </div>
      </SearchBarContainer>
      <Dropdown className="mt-3">
        <div>
          <DropDownBtn
            className="me-3"
            show={show === vers[0]}
            onClick={(e) => setShow(e.target.textContent)}
          >
            {vers[0]}
            <IoMdArrowDropdown />
          </DropDownBtn>
          <div className="drop-down-panel">
            <ul>
              <li>
                <button className="list-button" onClick={() => alert("hi")}>
                  <label>
                    <input type="radio" name="list" />
                    이름순
                  </label>
                </button>
              </li>
              <li>
                <button className="list-button">
                  <label>
                    <input type="radio" name="list" />
                    가격순
                  </label>
                </button>
              </li>
              <li>
                <button className="list-button">
                  <label>
                    <input type="radio" name="list" />
                    플레이타임순
                  </label>
                </button>
              </li>
              <li>
                <button className="list-button">
                  <label>
                    <input
                      type="radio"
                      name="list"
                      value="가격순"
                      id="가격순"
                    />
                    좋은 평가순
                  </label>
                </button>
              </li>
              <li>
                <button className="list-button">
                  <label>
                    <input type="radio" name="list" />
                    출시일순
                  </label>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <DropDownBtn
            className="me-3"
            show={show === vers[1]}
            onClick={(e) => setShow(e.target.textContent)}
          >
            {vers[1]}
            <IoMdArrowDropdown />
          </DropDownBtn>
          <div className="drop-down-panel2">
            <ul>
              <li>
                <button className="list-button">
                  <label>
                    <input type="radio" name="list" />
                    내림차순
                  </label>
                </button>
              </li>
              <li>
                <button className="list-button">
                  <label>
                    <input type="radio" name="list" />
                    오름차순
                  </label>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Dropdown>
      <Main>
        <ImgDiv className="mt-4">
          <div>
            {/* 검색 결과 없는 것 처리 구현해야함. */}
            {data &&
              data
                .filter((val) => {
                  if (inputData === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(inputData.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((val, key) => {
                  return (
                    <div>
                      <img
                        key={key}
                        src={val.headerImage}
                        alt="게임 이미지"
                        style={{ width: "400px" }}
                      />
                      <div className="noneDiv">
                        <h5>{val.name}</h5>
                        <div>{val.developer[0]}</div>
                        <div>{val.releaseDate.split("T")[0]}</div>
                        <div>{val.price}</div>
                        <div>별점</div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </ImgDiv>
      </Main>
      <Footer>
        <SearchPagination
          page={page}
          lastPage={lastPage}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
        ></SearchPagination>
      </Footer>
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
  div.searchBar > button {
    margin-right: 30px;
  }
  div:nth-child(1) {
    margin-right: 150px;
  }
`;
const Input = styled.input`
  width: 500px;
  height: 50px;
  border-radius: 20px;
  padding: 0 50px;
  border: 1px solid black;
`;
const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImgDiv = styled.div`
  & > div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 20px;
  }
  & > div > div {
    position: relative;
  }

  img {
    margin: 10px;
    transition: all ease 1s 0s;
  }
  img:hover {
    opacity: 0.3;
    & + div {
      display: block;
      position: absolute;
      top: 40%;
      left: 40%;
      margin: -50px 0 0 -50px;
      text-align: center;
      z-index: 10;

      & > h5 {
        font-weight: bold;
      }
    }
  }
  .noneDiv {
    display: none;
    color: black;
    font-weight: bold;
  }
`;
const Button = styled.button`
  padding: 10px 30px;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  ${({ select }) =>
    select &&
    `
    background-color:#673ab7;
    color:white;
  `}
`;

const Footer = styled.footer`
  text-align: center;
  height: 40vh;
`;

const Form = styled.form`
  svg {
    position: relative;
  }
`;

const Dropdown = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 210px;
  > div {
    position: relative;
  }
  .drop-down-panel {
    border-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px grey;
  }
  .drop-down-panel2 {
    border-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px grey;
  }
`;
const DropDownBtn = styled.button`
  background-color: white;
  border: 1px solid white;
  & + div {
    display: ${({ show }) => (show ? "block" : "none")};
    position: absolute;
    right: 10px;
    top: 30px;
    width: 150px;
    background-color: white;
    border: 1px solid black;
    z-index: 100;
    & > ul {
      margin: 0;
      padding: 10px;
    }
    & > ul button {
      width: 100%;
      text-align: start;
      border: 1px solid white;
      background-color: white;
    }
    & > ul > div {
      display: flex;
      justify-content: center;
    }
    & li {
      list-style: none;
    }
    & input {
      margin-right: 5px;
    }
  }
`;

export default GameSearch;
