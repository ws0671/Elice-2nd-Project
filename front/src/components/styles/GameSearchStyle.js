import styled from "styled-components";

export const MainImage = styled.div`
  position: relative;
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
    gap: 40px;
  }
  .imgWrap {
    position: relative;
  }
  .imgWrap:hover {
    .text {
      opacity: 1;
    }
  }

  img {
    width: 100%;
  }
  h5 {
    font-weight: bold;
  }
  .text {
    padding: 8% 0 0 0;
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
    background-color: rgba(45, 50, 150, 0.5);
    transition: opacity 0.35s ease-in-out;
    opacity: 0;
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
