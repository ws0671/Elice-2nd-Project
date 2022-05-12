import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import * as Api from "../api";
import GenreGame from "./GenreGame";
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

  const setGame = async (type) => {
    const res = await Api.get(`gameGraph/bestGenre/${type}`);
    setData(res.data);
  };
  useEffect(() => {
    setGame("Indie");
  }, []);
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);
  return (
    <Container>
      <button
        className="w-btn-outline w-btn-blue-outline"
        onClick={() => setGame("Indie")}
      >
        인디
      </button>
      <button
        className="w-btn-outline w-btn-blue-outline"
        onClick={() => setGame("Adventure")}
      >
        모험
      </button>
      <button
        className="w-btn-outline w-btn-blue-outline"
        onClick={() => setGame("Casual")}
      >
        캐주얼
      </button>
      <button
        className="w-btn-outline w-btn-blue-outline"
        onClick={() => setGame("Strategy")}
      >
        전략
      </button>
      <SliderContainer ref={slideRef}>
        {data && <GenreGame data={data}></GenreGame>}
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
