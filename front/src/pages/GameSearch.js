import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import DataExpression from "../components/Search/DataExpression";
import * as Api from "../api";
import SearchPagination from "../components/Search/SearchPagination";

import {
  H1,
  SearchBarContainer,
  Button,
  Form,
  Input,
  DropDownBtn,
  Dropdown,
  Main,
  ImgDiv,
  Footer,
} from "../components/styles/GameSearchStyle";

const types = ["전체 목록", "장르", "플랫폼", "이용등급"];
const vers = ["이름순", "내림차순"];
const GENRE_DATA = [
  "Indie",
  "Adventure",
  "Casual",
  "Strategy",
  "Simulation",
  "RPG",
  "Action",
  "Racing",
  "Sports",
  "Violent",
  "MMO",
  "Gore",
];
const AGE_DATA = [
  { headerImage: "images/전체이용가.png" },
  { headerImage: "images/12세이용가.png" },
  { headerImage: "images/15세이용가.png" },
  { headerImage: "images/청소년이용불가.png" },
];
const FLATFORM_DATA = [
  { headerImage: "images/xbox.jpg" },
  { headerImage: "images/ps4.jpg" },
  { headerImage: "images/ps5.jpg" },
  { headerImage: "images/pcGame.png" },
];
function GameSearch() {
  //없는 검색어 검색시 없는 검색이라고 나오도록 구현하기
  const [searchWord, setSearchWord] = useState("");
  const [inputData, setInputData] = useState("");
  const [select, setSelect] = useState(types[0]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [btn1, setBtn1] = useState(vers[0]);
  const [btn2, setBtn2] = useState(vers[1]);
  const [mode, setMode] = useState(types[0]);
  const [age, setAge] = useState(null);
  const [flatForm, setFlatForm] = useState(null);
  const [genre, setGenre] = useState(null);

  // 페이지네이션과 관련된 state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [lastPage, setLastPage] = useState(1);

  const showMore = useRef([]);

  // 전체 데이터를 api 응답으로 받아오는 함수
  const getData = async () => {
    const res = await Api.get(
      `game/list/${page}`,
      `?page=${limit}&limit=${limit}`
    );
    setData(res.data);
    setLastPage(res.lastPage);
    console.log(res.data);
    //res.lastPage
  };

  useEffect(() => {
    getData();
  }, [page, limit, inputData]);

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  });

  // 드롭다운 외부 클릭 시에도 닫히도록 하는 함수
  const clickOutside = (e) => {
    if (show && !showMore.current.includes(e.target)) {
      setShow((prev) => !prev);
    }
  };
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
    e.preventDefault();
    setSelect(type);
    if (e.target.textContent === "전체 목록") {
      setMode(e.target.textContent);
      setInputData("");
    }
    if (e.target.textContent === "장르") {
      setMode(e.target.textContent);
      setGenre(GENRE_DATA);
    }
    if (e.target.textContent === "플랫폼") {
      setMode(e.target.textContent);
      setFlatForm(FLATFORM_DATA);
    }
    if (e.target.textContent === "이용등급") {
      setMode(e.target.textContent);
      setAge(AGE_DATA);
    }
  };
  const handleDropBtn1 = (e) => {
    e.preventDefault();
    setShow(null);
    setBtn1(e.target.textContent);
  };
  const handleDropBtn2 = (e) => {
    e.preventDefault();
    setShow(null);
    if (btn2 !== e.target.textContent) {
      setData(data.reverse());
    }
    setBtn2(e.target.textContent);
  };
  const handleDropEntrance = (e) => {
    e.preventDefault();
    setShow(e.target.textContent);
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
      {mode === "전체 목록" && (
        <Dropdown className="mt-3">
          <div>
            <DropDownBtn
              className="me-3"
              show={show === btn1}
              onClick={(e) => setShow(e.target.textContent)}
            >
              {btn1}
              <IoMdArrowDropdown />
            </DropDownBtn>
            <div className="drop-down-panel">
              <ul>
                <li>
                  <button
                    className="list-button"
                    ref={(el) => (showMore.current[0] = el)}
                    onClick={handleDropBtn1}
                  >
                    <label>
                      <input type="radio" name="list" />
                      이름순
                    </label>
                  </button>
                </li>
                <li>
                  <button
                    className="list-button"
                    ref={(el) => (showMore.current[1] = el)}
                    onClick={handleDropBtn1}
                  >
                    <label>
                      <input type="radio" name="list" />
                      가격순
                    </label>
                  </button>
                </li>
                <li>
                  <button
                    className="list-button"
                    ref={(el) => (showMore.current[2] = el)}
                    onClick={handleDropBtn1}
                  >
                    <label>
                      <input type="radio" name="list" />
                      플레이타임순
                    </label>
                  </button>
                </li>
                <li>
                  <button
                    className="list-button"
                    ref={(el) => (showMore.current[3] = el)}
                    onClick={handleDropBtn1}
                  >
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
                  <button
                    className="list-button"
                    ref={(el) => (showMore.current[4] = el)}
                  >
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
              show={show === btn2}
              onClick={handleDropEntrance}
            >
              {btn2}
              <IoMdArrowDropdown />
            </DropDownBtn>
            <div className="drop-down-panel2">
              <ul>
                <li>
                  <button
                    className="list-button"
                    ref={(el) => (showMore.current[5] = el)}
                    onClick={handleDropBtn2}
                  >
                    <label>
                      <input type="radio" name="list" />
                      내림차순
                    </label>
                  </button>
                </li>
                <li>
                  <button
                    className="list-button"
                    ref={(el) => (showMore.current[6] = el)}
                    onClick={handleDropBtn2}
                  >
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
      )}
      <Main>
        <ImgDiv className="mt-4">
          {/* 검색 결과 없는 것 처리 구현해야함. */}
          <DataExpression
            mode={mode}
            data={data}
            inputData={inputData}
            age={age}
            flatForm={flatForm}
            genre={genre}
          ></DataExpression>
        </ImgDiv>
      </Main>
      <Footer>
        {mode === "전체 목록" && (
          <SearchPagination
            page={page}
            lastPage={lastPage}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
          ></SearchPagination>
        )}
      </Footer>
    </>
  );
}

export default GameSearch;
