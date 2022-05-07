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
  background: aliceblue;
  display: inline-block;
  position: absolute;
  top: 38rem;
  left: 78rem;

`;