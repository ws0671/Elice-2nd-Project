import styled from "styled-components";

export const Main = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const Container = styled.div`
  max-width: 100vh;
  width: 100vh;
  margin-top: 90px;
  // max-height: 100vh;
  // height: 80vh;

  padding: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  .write {
    position : fixed;
    left: 90%;
    top: 87%;
    flex: 1;
    border: none;
    padding: 10px;
    color: white;
    font-weight: 700;
    border-radius: 3px;
    font-size: 20px;
    cursor: pointer;
    background: rgba(108, 99, 255, 0.7);

    &:hover {
      background: rgba(108, 99, 255, 0.6);
    }
  }

  }
`;
