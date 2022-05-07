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
  width: 120px;
  height: 120px;
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
  background-color: #673ab7;
`;
export const DivBold = styled.div`
  color: white;
  font-weight: bold;
`;
