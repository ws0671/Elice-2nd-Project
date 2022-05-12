import styled from "styled-components";

export const MainImage = styled.div`
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(117, 130, 183, 0.59) 0%,
    rgba(168, 202, 210, 0.59) 100%
  );
  // height: 610px;
  .title {
  }
  h1 {
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 80px;
    color: white;
    text-shadow: 0 0 10px purple;
  }
`;
export const Main = styled.main`
  margin: 0 auto 0 auto;
  width: 100%;

  .toptenContainer {
    padding: 50px 0;
    // margin-top: 80px;
  }
  h3 {
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
    font-size: 35px;
  }
`;
