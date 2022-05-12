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
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px #6869d0;
    backdrop-filter: blur(2.5px);
    border-radius: 10px;
    // color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.4rem;
    padding: 30px 20px;
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
  padding: 20px;

  img {
    width: 400px;
  }
`;
export const Footer = styled.footer`
  height: 20vh;
`;
export const Main = styled.div`
  padding: 80px 200px 20px 200px;
  background: linear-gradient(
    180deg,
    rgba(6, 3, 17, 0.5) 10.29%,
    rgba(8, 0, 33, 0.5) 24.48%,
    rgba(55, 55, 165, 0.5) 39.46%,
    rgba(114, 45, 155, 0.5) 53%,
    rgba(179, 26, 123, 0.5) 67.58%,
    rgba(198, 35, 104, 0.305) 80.6%,
    rgba(198, 35, 104, 0) 99.35%
  );
  background-blend-mode: multiply;
  .screenShot {
    margin-left: 55px;
    font-weight: bold;
  }
`;
