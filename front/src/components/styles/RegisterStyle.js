import styled from "styled-components"

export const Main = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`
export const Container = styled.div`
  max-width: 100vh;
  width: 60vh;

  max-height: 100vh;
  height: 80vh;

  padding: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:first-of-type) {
    border: 2px solid #ced4da;
    border-radius: 10px;
  }

  img {
    width: 100vh;
  }
`
