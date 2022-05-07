import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  .forPoint {
    width: 80%;
    padding: 10px 0;
    margin: 0;
    border-radius: 10px;

    &:first-of-type {
      margin-top: 20px;
    }
  }
  .notFound {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin: auto;

    .material-symbols-outlined {
      color: red;
      font-size: 60px;
    }
  }
`;
export const Table = styled.table`
  border-top: 5px #1d1e42 solid;
  thead {
    border-bottom: 5px #1d1e42 solid;
    background: #1d1e42;
    color: white;
  }
  tr {
    text-align: center;
  }
  .odd {
    background: white;
  }

  .even {
    background: #f7f6fe;
  }

  .dropdown {
    position: relative;
    display: flex;
    border: none;
    justify-content: center;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 100px;
    padding: 8px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }

  .dropdown:hover .dropdown-content {
    display: block;
    list-style-type: none;
    top: 40px;

    li {
      font-weight: normal;
    }
    li:hover {
      background: rgba(108, 99, 255, 0.3);
      border-radius: 2px;
      font-weight: bold;
      // color: white;
      cursor: pointer;
    }
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

export const Button = styled.button`
  border: none;
  border-radius: 12px;
  padding: 8px 12px;
  margin: 0 4px;
  background: #e0e0e0;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background: rgba(108, 99, 255, 0.4);
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: #cbc0d3;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #624de3;
    font-weight: bold;
    cursor: revert;
    transform: revert;
    color: white;
  }
`;
