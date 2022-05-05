import styled from "styled-components";
export const Main = styled.div`
  min-height: 100vh;
  display: flex;

  flex-direction: column;
  align-items: center;
  // justify-content: center;

  .navMargin {
    height: 50px;
  }
  .title {
    p:first-of-type {
      font-size: 40px;
      font-weight: bold;
    }
    p:nth-of-type(2) {
      font-size: 20px;
    }

    margin: auto;
    text-align: center;
  }
`;
export const Container = styled.div`
  // max-width: 100vw;
  width: 100vw;
  // margin-top: 90px;
  // max-height: 100vh;
  // height: 80vh;

  padding: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .container {
    margin-top: 0;
    margin-bottom: 0;
    height:100%;
  }
  .buttonWrap {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    // width: 90%;
    height: 10vh;
    
    
  }
  .write {
    border: none;
    
    color: white;
    font-weight: 700;
    border-radius: 15px;
    font-size: 20px;
    cursor: pointer;
    background: #624DE3;
    padding: 8px 20px;
    display: flex;
    align-items: center;
    

    &:hover {
      background: rgba(108, 99, 255, 0.6);
      transform: scale(1.05);
    }
    .material-symbols-outlined {
      padding-right: 10px;
    }
  }

  }
  
`;
