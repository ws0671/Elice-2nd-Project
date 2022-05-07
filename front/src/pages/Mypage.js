import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Api from "../api";
import { UserStateContext, DispatchContext } from "../App";
import MypageBarChart from "../components/mypage/MypageBarChart";
import MypagePieChart from "../components/mypage/MypagePieChart";
import MypageBookmark from "../components/mypage/MypageBookmark";
import MypageReview from "../components/mypage/MypageReview";
import Swal from "sweetalert2";
import MypageMap from "../components/mypage/MypageMap";
import { Button } from "react-bootstrap";
import stone from "../images/stone.png";
import ball from "../images/ball.png";
import pearl from "../images/pearl.png";
import rainbow from "../images/rainbow.png";
import tapioca from "../images/tapioca.png";
import "animate.css";

const Mypage = () => {
  const dispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const [editNickname, setEditNickname] = useState("");
  const [TagData, setTagData] = useState([]);
  const [total, setTotal] = useState(0);
  const userContext = useContext(UserStateContext);
  const [data, setData] = useState({});

  useEffect(() => {
    Api.get("user", `${userContext.user.userId}/myPage`)
      .then((res) => {
        setData(res.data.user);
        setEditNickname(res.data.user.nickname);
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
        alert("해당 페이지를 불러오지 못했습니다.");
      });
  }, []);

  const [userData, setUserData] = useState([]);

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
    realTagData.forEach((x) => {
      result[x] = (result[x] || 0) + 1;
    });

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
        (async () => {
          await Swal.fire("닉네임이 정상적으로 변경되었습니다");
          await Api.put(`user/${userId}/nickname`, {
            nickname: getNickname,
          }).then((res) => setEditNickname(getNickname));
        })();
      }
    })();
  };

  // 회원 탈퇴 기능 함수
  const withdrawlHandler = () => {
    Swal.fire({
      title: "회원 탈퇴를 하시겠습니까?",
      showDenyButton: true,
      denyButtonText: "취소",
      confirmButtonText: "확인",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Api.delete(`user/${userContext.user.userId}`).then((res) =>
          Swal.fire(
            "회원 탈퇴가 완료되었습니다.\n그동안 저희 서비스를 이용해주셔서 감사합니다."
          ).then((res) => navigate("/"))
        );
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      }
    });
  };

  const gradeHandler = (grade) => {
    if (grade === 0) {
      return [stone, "돌멩이"];
    } else if (grade === 1) {
      return [ball, "탱탱볼"];
    } else if (grade === 2) {
      return [tapioca, "타피오카 펄"];
    } else if (grade === 3) {
      return [pearl, "진주"];
    } else {
      return [rainbow, "무지개 진주"];
    }
  };

  const myInfo = () => {
    Swal.fire({
      title: `<div>
    나의 등급: ${gradeHandler(data.grade)[1]}
  </div>
  <div>나의 포인트: ${data.point} pt</div>
</div>`,
      imageUrl: gradeHandler(data.grade)[0],
      imageHeight: 200,
      imageAlt: gradeHandler(data.grade)[1],
      showCloseButton: true,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "닉네임 수정",
      denyButtonText: `회원 탈퇴`,
      cancelButtonText: `닫기`,
      reverseButtons: true,
      allowOutsideClick: false,

      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        MypageEditModal(editNickname, userContext.user.userId);
      } else if (result.isDenied) {
        withdrawlHandler();
      }
    });
  };

  return (
    <>
      <Header></Header>
      <Main imgUrl="images/controller.jpg">
        <div className="top">
          <div className="first">
            <div className="title">
              {editNickname} 님의 <br />
              게임 성향은...
            </div>
            <div className="subtitle">
              나의 게임 성향과 관심 게임 정보를
              <br /> 한 눈에 담아보세요
            </div>
            <Button onClick={myInfo}>나의 정보</Button>
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

        <div className="kakaoMap middle2">
          <div className="topic common">내 주변 PC방 찾기</div>
          <div className="common">
            <MypageMap />
          </div>
        </div>

        <div className="middle2">
          <div className="topic common">내가 쓴 리뷰</div>
          <div className="common">
            <MypageReview />
            <MypageReview />
            <MypageReview />
          </div>
        </div>
      </Main>
    </>
  );
};

const Header = styled.div`
  height: 50px;
`;
const Main = styled.div`
background-size: 100%;
  background-image: linear-gradient(
      to right,
      rgba(20, 20, 20, 0.1) 10%,
      rgba(20, 20, 20, 0.7) 70%,
      rgba(20, 20, 20, 1)
    ),
    ${(props) => `url(${props.imgUrl})`};
  min-height: 100vh;
  padding 10% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .top {
    .first {
      margin : 0 30px;
    }
    width: 80%;
    margin-bottom: 80px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
   
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 8px 32px #6869d0;
    backdrop-filter: blur(2.5px);
    border-radius: 10px;

    text-transform: uppercase;
    letter-spacing: 0.4rem;

    .title {
      font-size: 35px;
      font-weight: bold;
    }
    .subtitle {
      font-size: 1.2em;
    }
    .topButton {
      margin-top: 30px;

      &:first-of-type {
        margin-right: 20px;
      }
      
    }
  }
  .middle1 {
    text-align: basis;
    width: 80%;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 8px 32px #6869d0;
    backdrop-filter: blur(2.5px);
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 0.4rem;
    padding: 20px;
    margin-bottom: 80px;

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
    width: 80%;
    margin-bottom: 80px;
    text-align: basis;
    // width: 80%;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 8px 32px #6869d0;
    backdrop-filter: blur(2.5px);
    border-radius: 10px;

    text-transform: uppercase;
    letter-spacing: 0.4rem;
    padding: 20px;
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
