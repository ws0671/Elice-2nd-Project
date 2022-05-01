import styled from "styled-components"
import { useEffect, useContext, useState } from "react"
import * as Api from "../api"
import { UserStateContext } from "../App"
import BarChart from "../components/mypage/MypageChart"
const Mypage = () => {
  const userContext = useContext(UserStateContext)
  const [data, setData] = useState({})
  useEffect(() => {
    console.log(userContext.user.userId)
    Api.get("user", `${userContext.user.userId}/myPage`)
      .then((res) => {
        setData(res.data.user)
        console.log(res.data)
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
        })
      })
      .catch((err) => {
        console.log(err)
        alert("해당 페이지를 불러오지 못했습니다.")
      })
  }, [])

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
  })

  return (
    <Main>
      <div>
        <div>{data.nickname} 님의 게임 성향은...</div>
        <div>나의 게임 성향과 관심 게임 정보를 한 눈에 담아보세요</div>
        <button>프로필 수정</button>
      </div>
      <div>
        <BarChart chartData={userData} />
      </div>
    </Main>
  )
}

const Main = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
export default Mypage
