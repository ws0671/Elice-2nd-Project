import styled from "styled-components";

export const Tr = styled.tr`
  td:nth-child(2) {
    text-align: initial;
    transition: box-shadow 0.1s linear;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
      font-weight: bold;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2), 0 6px 4px rgba(0, 0, 0, 0.2);
    }
  }
`;
