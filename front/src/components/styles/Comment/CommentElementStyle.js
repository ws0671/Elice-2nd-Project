import styled from "styled-components";

export const Div = styled.div`
  .edit {
    width:100%;
    height: 15vh;
  }
  background: ${({ isDeleted }) => isDeleted && "rgba(255, 215, 215, 0.9);"};
  margin-bottom: 20px;
  font-size: 13px;
  
  padding-bottom: 10px;
  display: flex;
  flex-direction: ${({ edit }) => (edit ? "column" : "row")};
  justify-content: space-between;
  // align-items: center;
  .comment {
    font-size: ${({ isDeleted }) => (isDeleted ? "11px" : "13px")};
    color: ${({ isDeleted }) => isDeleted && "grey"};
  }

  img {
    width: 20px;
    height: 20px;
    display: ${({ isDeleted }) => isDeleted && "none"};

    &:hover {
      cursor: pointer;
      background: rgba(108, 99, 255, 0.3);
      border-radius: 3px;
    }
  }

  .dropdown {
    display: ${({ view }) => (view ? "block" : "none")};
    position: absolute;
    left: 80%;
    background-color: #f9f9f9;
    min-width: 60px;
    padding: 8px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    list-style-type: none;

    li {
      font-weight: normal;
      text-align: center;
    }
    li:hover {
      background: rgba(108, 99, 255, 0.3);
      border-radius: 2px;
      font-weight: bold;
      // color: white;
      cursor: pointer;
    }
  }
`

export const ButtonGroup = styled.div`
  left: 84%;
  position: relative;
  margin: -40px 10px 0 0;
  width: 15%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  button {
    border: none;
    padding: 4px 8px;
    color: white;
    font-weight: 700;

    border-radius: 3px;
    cursor: pointer;
    background: #6c63ff;
  }
`;
