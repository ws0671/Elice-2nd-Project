import styled from "styled-components";
export const ImageWrapper = styled.div`
  background-color: white;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 30px;
`;
export const NewsImg = styled.img`
  width: 250px;
  height: 150px;
  border-radius: 10%;
`;
export const Div = styled.div`
  text-align: center;
  div:nth-child(2) {
    display: flex;
    justify-content: center;
  }
  div:nth-child(3) {
    display: flex;
    justify-content: space-evenly;
  }
  button {
    padding: 10px;
    font-weight: bold;
    background-color: purple;
    border-radius: 10px;
  }
`;
export const FlexDiv1 = styled.div`
  display: flex;
  justify-content: space-evenly;
  div {
    color: white;
  }
`;
export const FlexDiv2 = styled.div`
  display: flex;
  justify-content: space-evenly;

  & > div {
    width: 250px;
  }
  div {
    color: white;
  }
`;

export const Body = styled.div`
  background: linear-gradient(
    180deg,
    #060311 10.29%,
    #080021 24.48%,
    #3737a5 39.46%,
    #722d9b 53%,
    #b31a7b 67.58%,
    rgba(198, 35, 104, 0.61) 80.6%,
    rgba(198, 35, 104, 0) 99.35%
  );
  background-blend-mode: multiply;
  a {
    text-decoration: none;
  }
  .main {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
  }
  .popularChart {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px #6869d0;
    backdrop-filter: blur(2.5px);
    border-radius: 10px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.4rem;
    padding: 10px;
    width: 90%;
    margin: 20px 0;
  }
  .youtube {
    height: 90vh;
  }
  .centeral {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;
export const DivBold = styled.div`
  color: white;
  font-weight: bold;
`;
