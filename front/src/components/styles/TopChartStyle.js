import styled from "styled-components";

export const MainImage = styled.div`
  position: relative;
  .title {
  }
  h1 {
    width: 100%;
    height: 100%;
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
  margin: 100px auto 0 auto;
  width: 100%;
  .toptenContainer {
    margin-top: 80px;
  }
  h3 {
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
    font-size: 35px;
  }
`;
