import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import * as Api from "../api";
import WorstGame from "./WorstGame";
import { SliderContainer, Container, Button } from "./styles/SliderStyle";

const TOTAL_SLIDES = 1;
export default function Slider4() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState();
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
  const worstGame = async () => {
    const res = await Api.get(`gameGraph/worstGame`);
    setData(res.data);
  };
  useEffect(() => {
    worstGame();
  }, []);
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);
  return (
    <Container>
      <SliderContainer ref={slideRef}>
        {data && <WorstGame data={data}></WorstGame>}
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
