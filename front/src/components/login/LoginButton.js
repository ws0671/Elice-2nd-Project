import styled from "styled-components";

const Btn = styled.button`
  background-color: ${({ content }) => content ? '#3e3f7d' : '#3e3f7d'};
  border: 1px solid ${({ content }) => (content ? '#3e3f7d' : '#3e3f7d')};
  white-space: nowrap;
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  font-size: 1rem;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.2rem;
  border-radius: 2rem;
  user-select: none;
  padding: 0.5rem;
  width: 18.9rem;
  margin: 1rem;
  text-transform: uppercase;
  transition: all 0.1s ease-in;

  ::-moz-focus-inner {
    border: 0;
  }
  
  &:hover {
    background-color: ${({ content }) => content ? 'hsla(40, 72%, 60%, 1)' : 'hsla(347, 49%, 51%, 1)'};
    ${({ content }) => content && `transform: translateY(-3px)`}
  }

  &:active {
    background-color: ${({ content }) => content ? 'hsla(40, 72%, 35%, 1)' : 'hsla(347, 49%, 26%, 1)'};
  }
`;


export const LoginButton = styled(Btn)`
  text-decoration: none;
  background-color: #6869D0;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.0125), 0 1px 1px rgba(0, 0, 0, 0.05);
  border-bottom-width: 0.5rem;

  &:hover {
    background-color: #6C63FF;
  }

  &:active {
    border-bottom-width: 0.1rem;
    border-top-width: 0.5rem;
  }
`;

/* const StyledButton = styled.button`
    background: linear-gradient(to right, #14163c 0%, #03217b 79%);
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 65%;
    height: 3rem;
    border: none;
    color: white;
    border-radius: 2rem;
    cursor: pointer;
` */