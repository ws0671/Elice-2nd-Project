import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import * as Api from "../api";
import { UserStateContext } from "../App";
import MypageBarChart from "../components/mypage/MypageChart";
const Mypage = () => {
  const userContext = useContext(UserStateContext);
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(userContext.user.userId);
    Api.get("user", `${userContext.user.userId}/myPage`)
      .then((res) => {
        setData(res.data.user);
        console.log(res.data);
        setUserData({
          labels: res.data.bookmarks.map((data) => data.name),
          datasets: [
            {
              label: "Game Type",
              data: res.data.bookmarks.map((data) => data.positiveRate),
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
              ],
              // borderColor: "black",
              // borderWidth: 2,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
        alert("해당 페이지를 불러오지 못했습니다.");
      });
  }, []);

  const [userData, setUserData] = useState({
    labels: ["없음"],
    datasets: [
      {
        label: "Game Type",
        data: [0],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          // "#50AF95",
          // "#f3ba2f",
          // "#2a71d0",
        ],
        // borderColor: "black",
        // borderWidth: 2,
      },
    ],
  });

  return (
    <Main>
      <div className="top">
        <div>
          <div className="title">
            {data.nickname} 님의 <br />
            게임 성향은...
          </div>
          <div className="subtitle">
            나의 게임 성향과 관심 게임 정보를
            <br /> 한 눈에 담아보세요
          </div>
          <button>프로필 수정</button>
        </div>
        <div>
          <MypageBarChart chartData={userData} />
        </div>
      </div>
      <div className="middle1">
        <div>내가 찜한 게임</div>
        <div>
          <button>ALL</button>
          <button>인기순</button>
          <button>플레이타임순</button>
        </div>
      </div>
    </Main>
  );
};

const Main = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 80%;

    .title {
      font-size: 2.5em;
      font-weight: bold;
    }
    .subtitle {
      font-size: 1.2em;
    }
  }
  .middle1 {
    text-align: basis;
    width: 80%;
  }
`;
export default Mypage;
