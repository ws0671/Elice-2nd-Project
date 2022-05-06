import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import * as Api from "../api";
import { SliderContainer, Container, Button } from "./styles/SliderStyle";
import AgeGame from "./AgeGame";

const TOTAL_SLIDES = 1;
export default function Slider4() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState();
  const [mode, setMode] = useState(0);
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
  const ageGame = async () => {
    setMode(0);
    const res = await Api.get(`gameGraph/bestAge/${mode}`);
    setData(res.data);
  };
  const ageGame12 = async () => {
    setMode(12);
    const res = await Api.get(`gameGraph/bestAge/${mode}`);
    setData(res.data);
  };
  const ageGame15 = async () => {
    setMode(16);
    const res = await Api.get(`gameGraph/bestAge/${mode}`);
    setData(res.data);
  };
  const ageGame18 = async () => {
    setMode(18);
    const res = await Api.get(`gameGraph/bestAge/${mode}`);
    setData(res.data);
  };
  useEffect(() => {
    ageGame();
  }, []);
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);
  return (
    <Container>
      <button onClick={ageGame}>전체 이용가</button>
      <button onClick={ageGame12}>12세</button>
      <button onClick={ageGame15}>15세</button>
      <button onClick={ageGame18}>18세</button>
      <SliderContainer ref={slideRef}>
        {data && <AgeGame data={data}></AgeGame>}
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
