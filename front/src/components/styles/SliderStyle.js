import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  button {
    font-weight: bold;
    width: 120px;
    margin: 5px;
    border-radius: 10px;
    background: linear-gradient(lightCyan, skyBlue, deepSkyBlue);
  }
  .flexDiv {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .numberDiv {
    font-size: 45px;
    font-weight: bold;
  }
  .detail {
    width: 100%;
    font-size: 18px;
    .span {
      width: 100%;
    }
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

export const Button = styled.button`
  border: 1px solid black;
  padding: 3em 0.2em;
  color: white;
  background-color: black;
  opacity: 0;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: black;
    color: #fff;
    opacity: 0.5;
  }
  &.left {
    position: absolute;
    bottom: 35%;
  }
  &.right {
    position: absolute;
    right: 0;
    bottom: 35%;
  }
`;

export const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  .detail > div:nth-child(1) {
    font-weight: bold;
  }
  .detail > div:nth-child(2) {
    color: gray;
  }
  img {
    width: 338px;
  }
`;
