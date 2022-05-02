import { useState, useContext, useEffect } from "react";
import { Nav, Button } from "../styles/Community/CommunityBoardStyle";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import styled from "styled-components";
import MypageBookmarkElement from "./MypageBookmarkElement";

const MypageBookmark = ({ gameData }) => {
  const [tabClick, setTabClick] = useState("ALL");
  const [popularData, setPopularData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(4);
  const numPages = Math.ceil(total / 4);
  const userContext = useContext(UserStateContext);
  const [timeData, setTimeData] = useState([]);
  const [on, setOn] = useState(false);
  useEffect(() => {
    Api.get(
      "user",
      `${userContext.user.userId}/myPage?criteria=positiveRate&page=${page}`
    ).then((res) => {
      console.log("인기순", res.data);
      setPopularData(res.data.bookmarkGames);
      setTotal(res.data.bookmarkCount);
    });

    Api.get(
      "user",
      `${userContext.user.userId}/myPage?criteria=averagePlaytime&page=${page}`
    ).then((res) => {
      console.log("플레이타임순", res.data);
      setTimeData(res.data.bookmarkGames);
    });
  }, [page]);
  const clickHandler = (e) => {
    if (e.target.textContent === "인기순") {
      setTabClick("인기순");
      setPage(1);
    } else if (e.target.textContent === "플레이타임순") {
      setTabClick("플레이타임순");
      setPage(1);
    }
  };

  return (
    <>
      <div>
        <button onClick={() => setTabClick("ALL")}>ALL</button>
        <button onClick={clickHandler}>인기순</button>
        <button onClick={clickHandler}>플레이타임순</button>
      </div>
      <div className="gameBookmarks">
        {tabClick === "ALL" &&
          gameData.map((data, index) => (
            <MypageBookmarkElement data={data} index={index} />
          ))}
        {tabClick === "인기순" &&
          popularData.map((data, index) => (
            <MypageBookmarkElement data={data} index={index} />
          ))}
        {tabClick === "플레이타임순" &&
          timeData.map((data, index) => (
            <MypageBookmarkElement data={data} index={index} />
          ))}
      </div>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
};

export default MypageBookmark;
