import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 50px;

  @media screen and (max-width: 960px) {
    padding: 0 30px;
  }
`;

export const Section = styled.section`
  padding: ${({ padding }) => (padding ? padding : "140px 0")};
  margin: ${({ margin }) => (margin ? margin : "")};
  background: ${({ inverse }) =>
    inverse ? "white" : "linear-gradient(#0c0721 5%, #615be3)"};
  position: ${({ position }) => (position ? position : "")};
  width: ${({ width }) => (width ? width : "auto")};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : "auto")};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : "auto")};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : "auto")};
  @media screen and (max-width: 768px) {
    padding: ${({ smPadding }) => (smPadding ? smPadding : "70px 0")};
  }
`;

export const ContentRow = styled.div`
  display: flex;
  margin: 0 -15px -15px -15px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const ContentColumn = styled(motion.div)`
  margin-bottom: 15px;
  padding-right: 15px;
  padding-left: 15px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    max-width: 100% !important;
    flex-basis: 100%;
    justify-content: center;
    align-items: center;
  }
`;

export const TextWrapper = styled.div`
  /* max-width: 540px; */
  padding-top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    padding-bottom: 65px;
    > h2,
    p {
      text-align: center;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  > img {
    width: 300px;
    margin-left: -3px;
  }
`;

export const Heading = styled(motion.h2)`
  margin-bottom: 90px;
  font-size: 3.5rem;
  line-height: 1.1;
  font-weight: 500;
  text-align: center;
  color: ${({ inverse }) => (inverse ? "#363280" : "white")};
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;

export const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  /* 	max-width: 600px; */
  margin-bottom: 35px;
  line-height: 24px;
  text-align: center;
  color: ${({ inverse }) => (inverse ? "#6a6a6a" : "white")};
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  flex-flow: wrap;
  gap: 0.5rem;
`;

export const LastButton = styled(motion.button)`
  height: 3rem;
  padding: 16px 32px;
  font-weight: 700;
  font-size: 0.8rem;
  line-height: 18px;
  letter-spacing: 1.54px;
  text-transform: uppercase;
  cursor: pointer;
  background: none;
  color: ${({ inverse }) => (inverse ? "#201256e6" : "white")};
  border-radius: 4px;
  white-space: nowrap;
  padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: 2px solid ${({ inverse }) => (inverse ? "#201256e6" : "white")};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:before {
    background: ${({ inverse }) => (inverse ? "#201256e6" : "white")};
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: all 0.6s ease;
    width: 100%;
    height: 0%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &:hover:before {
    height: 500%;
  }
  &:hover {
    color: ${({ inverse }) => (inverse ? "white" : "black")};
  }
`;

export const GoToRecomBox = styled.div`
  background-color: #615be3;
  padding-top: 0;
  width: 100vw;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    padding-bottom: 65px;
    > h2,
    p {
      text-align: center;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const GoToRecomSub = styled(motion.p)`
  font-size: 2.5rem;
  line-height: 24px;
  text-align: center;
  color: ${({ inverse }) => (inverse ? "#6a6a6a" : "white")};
`;
