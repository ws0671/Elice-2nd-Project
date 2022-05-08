import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as Api from "../../api";
import styled from "styled-components";
import SearchPagination from "./SearchPagination";
import ReactPaginate from "react-paginate";
const GameSearchGenre = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [lastPage, setLastPage] = useState();
  const [age, setAge] = useState();
  const params = useParams();

  // 전체 데이터를 api 응답으로 받아오는 함수
  const getData = async () => {
    const res = await Api.get(
      `game/age/${page}`,
      `?age=${params.age}&limit=12`
    );
    setData(res.data);
    const count = Math.ceil(res.data.gameCounts / 12);
    setLastPage(count);
  };
  const getCurrentData = async (currentPage) => {
    const res = await Api.get(
      `game/age/${currentPage}`,
      `?age=${params.age}&limit=12`
    );
    setData(res.data);
  };
  const getAge = () => {
    if (params.age === "0") {
      setAge("전체 이용가");
    }
    if (params.age === "12") {
      setAge("12세 이용가");
    }
    if (params.age === "16") {
      setAge("15세 이용가");
    }
    if (params.age === "18") {
      setAge("18세 이용가");
    }
  };
  useEffect(() => {
    getData();
    getAge();
  }, [page]);

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    await getCurrentData(currentPage);
  };
  return (
    <>
      <div style={{ height: "50px" }}></div>
      <Title>{age && age}</Title>

      <Main>
        <Box>
          {data &&
            data.games.map((val, key) => {
              return (
                <Link
                  key={key}
                  to={`/gamedetail/${val["gameId"]}`}
                  className="imgWrap"
                >
                  <img
                    src={val.headerImage}
                    alt="게임 이미지"
                    style={{ width: "400px" }}
                  />
                  <div className="text">
                    <h5>{val.name}</h5>
                    <div>{val.developer[0]}</div>
                    <div>{val.releaseDate.split("T")[0]}</div>
                    <div>{val.price} \</div>
                    <div>{val.positiveRate}점</div>
                  </div>
                </Link>
              );
            })}
        </Box>
      </Main>
      <Footer className="mt-5">
        {/* <SearchPagination
          page={page}
          lastPage={lastPage}
          setPage={setPage}
        ></SearchPagination> */}
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={lastPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </Footer>
    </>
  );
};
const Title = styled.h1`
  text-align: center;
  background: linear-gradient(
    180deg,
    rgba(6, 3, 17, 0.5) 0%,
    rgba(22, 4, 30, 0.484519) 0.01%,
    rgba(8, 0, 33, 0.5) 21.23%,
    rgba(55, 55, 165, 0.5) 39.46%,
    rgba(114, 45, 155, 0.5) 54.04%,
    rgba(198, 35, 104, 0.305) 66.54%,
    rgba(179, 26, 123, 0.5) 79.56%,
    rgba(7, 2, 24, 0.5) 94.15%,
    rgba(7, 2, 24, 0.5) 99.99%,
    rgba(15, 3, 27, 0.492025) 100%
  );
  background-blend-mode: multiply;
  font-weight: bold;
  padding: 80px 0;
`;
const Main = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;
const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 40px;
  .imgWrap {
    position: relative;
  }
  .imgWrap:hover {
    .text {
      opacity: 1;
    }
  }

  img {
    width: 100%;
  }
  h5 {
    font-weight: bold;
  }
  .text {
    padding: 8% 0 0 0;
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
    background-color: rgba(45, 50, 150, 0.5);
    transition: opacity 0.35s ease-in-out;
    opacity: 0;
  }
`;

const Footer = styled.footer`
  text-align: center;
  height: 40vh;
`;
export default GameSearchGenre;
