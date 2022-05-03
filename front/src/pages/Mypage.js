import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import * as Api from "../api";
import { UserStateContext } from "../App";
import MypageBarChart from "../components/mypage/MypageBarChart";
import MypagePieChart from "../components/mypage/MypagePieChart";
import MypageBookmark from "../components/mypage/MypageBookmark";
import MypageReview from "../components/mypage/MypageReview";
import Swal from "sweetalert2";

const Mypage = () => {
  const [editNickname, setEditNickname] = useState("");
  const [TagData, setTagData] = useState([]);
  const [total, setTotal] = useState(0);
  const userContext = useContext(UserStateContext);
  const [data, setData] = useState({});

  useEffect(() => {
    console.log(userContext.user.userId);
    Api.get("user", `${userContext.user.userId}/myPage`)
      .then((res) => {
        setData(res.data.user);
        setEditNickname(res.data.user.nickname);
        console.log("마이페이지", res.data);
        setUserData(
          res.data.bookmarks.bookmarkGames.map((data) => ({
            name: data.name,
            긍정적: data.positiveRate,
            부정적: data.negativeRate,
          }))
        );
        setTagData(
          making(res.data.bookmarks.bookmarkGames.map((v) => v.steamspyTags))
        );
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

  // 현재 로그인 유저 데이터 값
  const MypageEditModal = (nickname, userId) => {
    (async () => {
      const { value: getNickname } = await Swal.fire({
        title: "수정할 닉네임을 적어주세요",
        // text: "그냥 예시일 뿐입니다.",
        input: "text",
        inputValue: nickname,
        showCancelButton: true,
        inputPlaceholder: "닉네임을 입력하세요",
        confirmButtonText: "확인", // confirm 버튼 텍스트 지정
        cancelButtonText: "취소",
      });
      // 이후 처리되는 내용.
      if (getNickname) {
        Swal.fire("닉네임이 정상적으로 변경되었습니다");
        Api.put(`user/${userId}/nickname`, { nickname: getNickname }).then(
          (res) => setEditNickname(getNickname)
        );
      }
    })();
  };

  return (
    <>
      <Header></Header>
      <Main>
        <div className="top">
          <div>
            <div className="title">
              {editNickname} 님의 <br />
              게임 성향은...
            </div>
            <div className="subtitle">
              나의 게임 성향과 관심 게임 정보를
              <br /> 한 눈에 담아보세요
            </div>
            <button
              onClick={() =>
                MypageEditModal(editNickname, userContext.user.userId)
              }
            >
              닉네임 수정
            </button>
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
          <div className="topic common">내가 찜한 게임</div>
          <div className="common">
            <MypageBookmark />
          </div>
        </div>
        <div className="middle2">
          <div className="topic common">내가 쓴 리뷰</div>
          <MypageReview />
          <MypageReview />
          <MypageReview />
        </div>
      </Main>
    </>
  );
};

const Header = styled.div`
  height: 10vh;
`;
const Main = styled.div`
  min-height: 100vh;
  padding: 10% 0;
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

    button {
      background: #f6f6f6;
      font-weight: bold;
      text-align: center;
      border: 2px solid #e0e0e0;
      color: #909090;
      text-shadow: 0 1px 0 rgba(255, 255, 255, 0.75);
      padding: 6px 18px;
      margin: 0 5px -1px 0;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      text-decoration: none;
      position: relative;
      top: 1px;

      z-index: 3;

      &:hover {
        background: white;
        border-bottom: white 2px solid;
        &[disabled] {
          background: #cbc0d3;
          cursor: revert;
          transform: revert;
        }

        &[aria-current] {
          background: rgba(108, 99, 255, 0.7);
          font-weight: bold;
          cursor: revert;
          transform: revert;
        }
      }
    }

    .gameBookmarks {
      height: 30vh;

      display: flex;
      flex-direction: row;
      // justify-content: space-around;
      border: 2px solid #e0e0e0;
      padding: 10px 0;

      img {
        width: 90%;
        height: 100%;
        padding: 10px 0;
      }
    }
  }
  .chartTitle {
    text-align: center;
  }

  .middle2 {
    text-align: basis;
    width: 80%;
  }

  .topic {
    margin-top: 20px;
    font-size: 2em;
    font-weight: bold;
  }
  .common {
    padding: 20px 0;
  }
  .chart {
    display: flex;
    flex-direction: row;
  }
`;
export default Mypage;
