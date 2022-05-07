import styled from "styled-components";

export const FlexBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  h1 {
    font-weight: bold;
  }
  span {
    margin-left: 5px;
    font-size: 20px;
  }
  img {
    margin-left: 40px;
    width: 400px;
    height: 300px;
  }
  .information {
    position: relative;
  }
  .bookmark {
    cursor: pointer;
    left: -5vh;
    position: absolute;
  }
`;
export const ScreenShot = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 400px;
  }
`;
export const Footer = styled.footer`
  height: 20vh;
`;
export const Main = styled.div`
  padding: 0 200px;
  .screenShot {
    margin-left: 55px;
    font-weight: bold;
  }
`;
