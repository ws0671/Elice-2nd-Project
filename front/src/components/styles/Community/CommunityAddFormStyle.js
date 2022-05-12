import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 60vh;

  #notUse {
    display: none;
  }

  form {
    border: solid 2px grey;
    border-radius: 3px;
  }

  .header {
    margin: 20px;
    padding: 10px;
    width: 100vh;
    border-bottom: 2px solid grey;
    font-weight: bold;
    font-size: 30px;
  }

  .formFieldset {
    margin: 10px;
    padding: 10px;
    width: 100vh;

    select {
      width: 50vh;
    }

    input {
      width: 50vh;
    }

    textarea {
      width: 100%;
      min-height: 20vh;
    }
  }

  .buttonContainer {
    margin: 10px;
    padding: 10px;
    width: 100vh;
    text-align: end;

    .formButton {
      border: none;
      padding: 4px;
      color: white;
      font-weight: 700;
      width: 20%;

      border-radius: 3px;
      cursor: pointer;
    }

    .submitButton {
      margin-right: 10px;
      background: #6c63ff;
    }

    .cancelButton {
      background: #ff6b6b;
    }
  }
  span {
    // margin: 5px;
    margin-right: 5px;
    padding: 0 5px;
    background: rgba(108, 99, 255, 0.5);
    border-radius: 2px;
    font-weight: bold;
    font-size: 15px;
    // color: white;
    cursor: pointer;

    &:hover {
      background: rgba(108, 99, 255, 0.3);
    }
  }
  input#tag {
    margin-bottom: 5px;
  }
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 250px;
  }
`;
