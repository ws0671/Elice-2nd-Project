import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const TOTAL_SLIDES = 1;
export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);
  return (
    <Container>
      <SliderContainer ref={slideRef}>
        <div>
          <img alt="이미지" src="/images/lol.jpg" />
          <div className="flexDiv">
            <div className="numberDiv">
              <span className="numberSpan">1</span>
            </div>
            <div className="detail">
              <div>리그오브레전드</div>
              <div>액션/RPG</div>
            </div>
          </div>
        </div>
        <div>
          <img alt="이미지" src="/images/lol.jpg" />
          <div className="flexDiv">
            <div className="numberDiv">
              <span className="numberSpan">2</span>
            </div>
            <div className="detail">
              <div>리그오브레전드</div>
              <div>액션/RPG</div>
            </div>
          </div>
        </div>
        <div>
          <img alt="이미지" src="/images/lol.jpg" />
          <div className="flexDiv">
            <div className="numberDiv">
              <span className="numberSpan">3</span>
            </div>
            <div className="detail">
              <div>리그오브레전드</div>
              <div>액션/RPG</div>
            </div>
          </div>
        </div>
        <div>
          <img alt="이미지" src="/images/lol.jpg" />
          <div className="flexDiv">
            <div className="numberDiv">
              <span className="numberSpan">4</span>
            </div>
            <div className="detail">
              <div>리그오브레전드</div>
              <div>액션/RPG</div>
            </div>
          </div>
        </div>
        <div>
          <img alt="이미지" src="/images/lol.jpg" />
          <div className="flexDiv">
            <div className="numberDiv">
              <span className="numberSpan">5</span>
            </div>
            <div className="detail">
              <div>리그오브레전드</div>
              <div>액션/RPG</div>
            </div>
          </div>
        </div>
        <div>
          <img alt="이미지" src="/images/lol.jpg" />
          <div className="flexDiv">
            <div className="numberDiv">
              <span className="numberSpan">6</span>
            </div>
            <div className="detail">
              <div>리그오브레전드</div>
              <div>액션/RPG</div>
            </div>
          </div>
        </div>
        <div>
          <img alt="이미지" src="/images/lol.jpg" />
          <div className="flexDiv">
            <div className="numberDiv">
              <span className="numberSpan">7</span>
            </div>
            <div className="detail">
              <div>리그오브레전드</div>
              <div>액션/RPG</div>
            </div>
          </div>
        </div>
        <div>
          <img alt="이미지" src="/images/lol.jpg" />
          <div className="flexDiv">
            <div className="numberDiv">
              <span className="numberSpan">8</span>
            </div>
            <div className="detail">
              <div>리그오브레전드</div>
              <div>액션/RPG</div>
            </div>
          </div>
        </div>
        <div>
          <img alt="이미지" src="/images/lol.jpg" />
          <div className="flexDiv">
            <div className="numberDiv">
              <span className="numberSpan">9</span>
            </div>
            <div className="detail">
              <div>리그오브레전드</div>
              <div>액션/RPG</div>
            </div>
          </div>
        </div>
        <div>
          <img alt="이미지" src="/images/lol.jpg" />
          <div className="flexDiv">
            <div className="numberDiv">
              <span className="numberSpan">10</span>
            </div>
            <div className="detail">
              <div>리그오브레전드</div>
              <div>액션/RPG</div>
            </div>
          </div>
        </div>
      </SliderContainer>
      <Button className="left" onClick={prevSlide}>
        <IoIosArrowBack size="40" />
      </Button>
      <Button className="right" onClick={nextSlide}>
        <IoIosArrowForward size="40" />
      </Button>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
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
`;

const Button = styled.button`
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

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
`;
