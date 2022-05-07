import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  .w-btn {
    position: relative;
    border: none;
    display: inline-block;
    padding: 15px 30px;
    border-radius: 25px;
    font-family: "paybooc-Light", sans-serif;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
    font-size: 50px;
  }

  .w-btn-gra3 {
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
  }

  .w-btn:hover {
    letter-spacing: 2px;
    transform: scale(1.2);
    cursor: pointer;
  }

  .w-btn:active {
    transform: scale(1.5);
  }

  .w-btn-gra-anim {
    background-size: 400% 400%;
    animation: gradient1 5s ease infinite;
  }

  @keyframes gradient1 {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  <button
    class="w-btn w-btn-gra3 w-btn-gra-anim"
    type="button"
    > P
    </button
    > [4기]
    이은여울
    —
    오늘
    오전
    3:38
    .w-btn-outline {
    font-size: 15px;
    position: relative;
    padding: 10px 15px;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
  }

  .w-btn-blue-outline {
    border: 3px solid #8bc1d1;
    color: #6192a4;
  }

  .w-btn-outline:active {
    transform: scale(1.1);
  }

  .w-btn-blue-outline:hover {
    background-color: #cec7fd;
    color: #7e83c2;
  }
  .flexDiv {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .numberDiv {
    font-size: 45px;
    font-weight: bold;
  }
  .detail {
    width: 100%;
    font-size: 18px;
    .span {
      width: 100%;
    }
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

export const Button = styled.button`
  border: 1px solid black;
  padding: 3em 0.2em;
  color: white;
  background-color: black;
  opacity: 0;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: black;
    color: #fff;
    opacity: 0.5;
  }
  &.left {
    position: absolute;
    bottom: 35%;
  }
  &.right {
    position: absolute;
    right: 0;
    bottom: 35%;
  }
`;

export const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  .detail > div:nth-child(1) {
    font-weight: bold;
  }
  .detail > div:nth-child(2) {
    color: gray;
  }
  img {
    width: 338px;
  }
`;
