import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);


`;

export const Wrapper = styled.section`
  position: relative;
  left: 50%;
  top: 40%;
  text-align: center;
  transform: translate(-50%, -50%);
`;


export const MainImg = styled.img`
  width: 400px;
  height: 200px;
  background: red;


`;

export const RemainderWrapper = styled.div`
    display: flex;

`;

export const Remainders = styled.div`
  margin-top: 10px;
  width: 200px;
  height: 100px;
  background: pink;

`;

export const ButtonWrapper = styled.div`


`;

export const Button = styled.button`
  margin-top: 20px;
  display: inline-block;
  position: absolute;
  top: 38rem;
  right:8rem;
  border: none;
  padding: 15px 30px;
  border-radius: 15px;
  font-family: 'paybooc-Light', sans-serif;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  transition: 0.25s;
  background: linear-gradient(
    45deg,
    #ffd1ff,
    #fbd0c8,
    #d2feff,
    #f6bee5,
    #98adda,
    #c5eee2,
    #bddff6,
    #a8c0ed,
    #facfd9
  );
  color: #374a54;

  &:hover{
  letter-spacing: 2px;
  transform: scale(1.2);
  cursor: pointer;
  }

`;


export const ChartDescription = styled.h3`
  color: white;
  

`