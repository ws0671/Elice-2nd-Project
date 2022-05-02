import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import * as Api from "../api";
import { UserStateContext } from "../App";
import MypageBarChart from "../components/mypage/MypageBarChart";
import MypagePieChart from "../components/mypage/MypagePieChart";

const Mypage = () => {
  const [TagData, setTagData] = useState([]);
  const [total, setTotal] = useState(0);
  const userContext = useContext(UserStateContext);
  const [data, setData] = useState({});
  useEffect(() => {
    console.log(userContext.user.userId);
    Api.get("user", `${userContext.user.userId}/myPage`)
      .then((res) => {
        setData(res.data.user);
        console.log(res.data);
        setUserData(
          res.data.bookmarks.map((data) => ({
            name: data.name,
            긍정적: data.positiveRate,
            부정적: data.negativeRate,
          }))
        );
        setTagData(making(res.data.bookmarks.map((v) => v.steamspyTags)));
      })
      .catch((err) => {
        console.log(err);
        alert("해당 페이지를 불러오지 못했습니다.");
      });
  }, []);

  const [userData, setUserData] = useState([]);
  // const [tagData, setTagData] = useState([]);
  console.log(TagData);

  const making = (v) => {
    let realTagData = [];
    const result = {};
    if (v) {
      for (var i in v) {
        for (var j in v[i]) {
          realTagData.push(v[i][j]);
        }
      }
    }
    console.log(realTagData);
    realTagData.forEach((x) => {
      result[x] = (result[x] || 0) + 1;
    });
    console.log(result);

    setTotal(
      Object.values(result).reduce(function add(sum, currValue) {
        return sum + currValue;
      }, 0)
    );

    return Object.keys(result).map((name) => ({
      name,
      value: result[name],
    }));
  };

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
        <div className="chart">
          {TagData && (
            <MypagePieChart
              total={total}
              chartData={TagData.sort(function (a, b) {
                return b.value - a.value;
              })}
            />
          )}
          <MypageBarChart
            chartData={userData.sort(function (a, b) {
              return b.긍정적 - a.긍정적;
            })}
          />
        </div>
      </div>
      <div className="middle1">
        <div className="topic">내가 찜한 게임</div>
        <div>
          <button>ALL</button>
          <button>인기순</button>
          <button>플레이타임순</button>
        </div>
      </div>
      <div className="middle2">
        <div className="topic">내가 쓴 리뷰</div>
        <div></div>
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

  .middle2 {
    text-align: basis;
    width: 80%;
  }

  .topic {
    font-size: 2em;
    font-weight: bold;
  }

  .chart {
    display: flex;
    flex-direction: row;
  }
`;
export default Mypage;
