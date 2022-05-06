import styled from "styled-components";

export const Form = styled.form`
  padding: 5%;
  max-width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px #6869d0;
  backdrop-filter: blur(2.5px);
  border-radius: 10px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  input {
    border: none;
    padding: 10px;
    border-radius: 5px;
  }
  .formFieldset {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

  .formFieldset:not(:first-of-type) {
    border-bottom: none;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }

  .formFieldset {
    display: flex;
    flex-direction: column;
    border: none;
    padding: 12px 0;
  }

  .formLabel {
    display: block;
    padding-bottom: 8px;
    font-size: 0.8rem;
    color: white;
  }

  .buttonContainer {
    display: flex;
  }

  .formButton {
    flex: 1;
    // border: none;
    padding: 4px;
    color: white;
    font-weight: 700;

    border-radius: 20px;
    cursor: pointer;
  }

  .resetButton {
    background: #adb5bd;
    text-decoration: none;
    // background-color: #6869d0;
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

  .submitButton {
    // background: #6c63ff;
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

  .formButton:not(:first-of-type) {
    margin-left: 8px;
  }

  .error {
    // color: #3f39a3;
    color: #ff6b6b;
    font-size: 0.8rem;
    min-height: 20px;
    margin-top: 4px;
    font-weight: bold;
  }
`;
