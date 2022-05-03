import styled from "styled-components";

export const H1 = styled.h1`
  text-align: center;
  margin-bottom: 100px;
`;
export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  div.searchBar > button {
    margin-right: 30px;
  }
  div:nth-child(1) {
    margin-right: 150px;
  }
`;
export const Input = styled.input`
  width: 500px;
  height: 50px;
  border-radius: 20px;
  padding: 0 50px;
  border: 1px solid black;
`;
export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ImgDiv = styled.div`
  & > div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 20px;
  }
  & > div > div {
    position: relative;
  }

  img {
    margin: 10px;
    transition: all ease 1s 0s;
  }
  img:hover {
    opacity: 0.3;
    & + div {
      display: block;
      position: absolute;
      top: 40%;
      left: 40%;
      margin: -50px 0 0 -50px;
      text-align: center;
      z-index: 10;

      & > h5 {
        font-weight: bold;
      }
    }
  }
  .noneDiv {
    display: none;
    color: black;
    font-weight: bold;
  }
`;
export const Button = styled.button`
  padding: 10px 30px;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  ${({ select }) =>
    select &&
    `
    background-color:#673ab7;
    color:white;
  `}
`;

export const Footer = styled.footer`
  text-align: center;
  height: 40vh;
`;

export const Form = styled.form`
  svg {
    position: relative;
  }
`;

export const Dropdown = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 210px;
  > div {
    position: relative;
  }
  .drop-down-panel {
    border-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px grey;
  }
  .drop-down-panel2 {
    border-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px grey;
  }
`;
export const DropDownBtn = styled.button`
  background-color: white;
  border: 1px solid white;
  & + div {
    display: ${({ show }) => (show ? "block" : "none")};
    position: absolute;
    right: 10px;
    top: 30px;
    width: 150px;
    background-color: white;
    border: 1px solid black;
    z-index: 100;
    & > ul {
      margin: 0;
      padding: 10px;
    }
    & > ul button {
      width: 100%;
      text-align: start;
      border: 1px solid white;
      background-color: white;
    }
    & > ul > div {
      display: flex;
      justify-content: center;
    }
    & li {
      list-style: none;
    }
    & input {
      margin-right: 5px;
    }
  }
`;
