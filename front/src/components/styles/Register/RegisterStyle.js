import styled from "styled-components";

export const Main = styled.div`
  max-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-between;

  .registerBackground {
    background-image: linear-gradient(
        to right,
        rgba(20, 20, 20, 0.1) 10%,
        rgba(20, 20, 20, 0.7) 70%,
        rgba(20, 20, 20, 1)
      ),
      ${(props) => `url(${props.imgUrl})`};
    background-size: 1400px;
    width: 100vw;
    height: 100vh;
  }
`;
export const Container = styled.div`
  max-width: 80vw;
  width: 40vw;

  max-height: 100vh;
  height: 80vh;

  padding: 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
  }
  #arrow {
    height: 20%;
    width: 60%;
    margin-left: 12%;
  }

  .prologue {
    font-size: 27px;
    font-weight: bold;
    color: white;
    padding: 10px 20px;
    border-radius: 100px;
    text-decoration: none;
    background-color: #6869d0;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.0125),
      0 1px 1px rgba(0, 0, 0, 0.05);
    border-bottom-width: 0.5rem;

    &:hover {
      background-color: #6c63ff;
    }

    &:active {
      border-bottom-width: 0.1rem;
      border-top-width: 0.5rem;
    }
  }
  // &:not(:first-of-type) {
  //   border: 2px solid #ced4da;
  //   border-radius: 10px;
  // }
`;
