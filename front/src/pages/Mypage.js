import styled from "styled-components"
const Mypage = () => {
  return (
    <Main>
      <div>
        <div>OOO 님의 게임 성향은...</div>
        <div>나의 게임 성향과 관심 게임 정보를 한 눈에 담아보세요</div>
        <button>프로필 수정</button>
      </div>
      <div>
        <div>OOO 님의 게임 성향은...</div>
        <div>나의 게임 성향과 관심 게임 정보를 한 눈에 담아보세요</div>
        <button>프로필 수정</button>
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
