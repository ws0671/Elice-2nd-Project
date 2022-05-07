import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .title {
    font-size: 25px;
    font-weight: bold;
    
  }

  .detail {
    width: 60%;
    margin: 10px 0; 
    
    }

    .writer {
      font-size: 13px;
    }
  }
  .comment .head {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .etc {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      width: 30px;
      height: 30px;
    }

    * {
      margin: 20px 0;
      margin-right: 10px;
      text-align: center;
    }
  }
  
  ${({ isUser }) =>
    !isUser &&
    `
    .liking:hover {
      font-weight: bold;
      cursor: pointer;
      background: rgba(108, 99, 255, 0.3);
      border-radius: 100px;
    }
    `}

  
`;
export const Header = styled.div`
  height: 10vh;
`;

export const ButtonGroup = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button {
    border: none;
    padding: 4px 8px;
    color: white;
    font-weight: 700;

    border-radius: 3px;
    cursor: pointer;
    background: #6c63ff;

    &:not(:nth-of-type(3)) {
      margin-right: 10px;
    }
  }
`;
