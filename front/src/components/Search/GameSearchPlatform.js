import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as Api from "../../api";
import styled from "styled-components";
import SearchPagination from "./SearchPagination";
const GameSearchGenre = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState();
  const [lastPage, setLastPage] = useState();
  const params = useParams();

  // 전체 데이터를 api 응답으로 받아오는 함수
  const getData = async () => {
    const res = await Api.get(
      `game/platform/${page}`,
      `?platform=windows&limit=12`
    );
    setData(res.data);
    const count = Math.ceil(res.data.gameCounts / 12);
    setLastPage(count);
    console.log(res.data);
  };
  useEffect(() => {
    getData();
  }, [page]);
  return (
    <>
      <div style={{ height: "10vh" }}></div>
      <Title>{params.genre}</Title>

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
      <Footer>
        <SearchPagination
          page={page}
          lastPage={lastPage}
          setPage={setPage}
        ></SearchPagination>
      </Footer>
    </>
  );
};
const Title = styled.h1`
  text-align: center;
  background-color: #9014ce;
  font-weight: bold;
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
