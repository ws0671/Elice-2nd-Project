import styled from "styled-components";

export const BodyWrapper = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const BodyContainer = styled.div`
  font-family: "Raleway", sans-serif;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-items: center;
  background-image: linear-gradient(
      to right,
      rgba(20, 20, 20, 0.1) 10%,
      rgba(20, 20, 20, 0.7) 70%,
      rgba(20, 20, 20, 1)
    ),
    ${(props) => `url(${props.imgUrl})`};
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 60vh;
  width: 22vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px #6869d0;
  backdrop-filter: blur(2.5px);
  border-radius: 10px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  position: absolute;
  left: 50%;
  right: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 1024px) {
    width: 22vw;
    height: 60vh;
  }
`;

export const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GoToRegister = styled.h5`
  cursor: pointer;
  font-size: 0.7rem;
`;

export const HorizeontalRule = styled.div`
  width: 90%;
  height: 0.2rem;
  border-radius: 0.8rem;
  border: none;
  margin: 1.5em 0 1rem 0;
  background: linear-gradient(to right, #7267cb 0%, #6e3cbc 79%);
  backdrop-filter: blur(25px);
`;
