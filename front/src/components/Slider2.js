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
  const [mode, setMode] = useState("Indie");
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
  const genreGameIndie = async () => {
    setMode("Indie");
    const res = await Api.get(`gameGraph/bestGenre/${mode}`);
    setData(res.data);
  };
  const genreGameAdventure = async () => {
    setMode("Adventure");
    const res = await Api.get(`gameGraph/bestGenre/${mode}`);
    setData(res.data);
  };
  const genreGameCasual = async () => {
    setMode("Casual");
    const res = await Api.get(`gameGraph/bestGenre/${mode}`);
    setData(res.data);
  };
  const genreGameStrategy = async () => {
    setMode("Strategy");
    const res = await Api.get(`gameGraph/bestGenre/${mode}`);
    setData(res.data);
  };
  useEffect(() => {
    genreGameIndie();
  }, []);
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);
  return (
    <Container>
      <button onClick={genreGameIndie}>인디</button>
      <button onClick={genreGameAdventure}>모험</button>
      <button onClick={genreGameCasual}>캐주얼</button>
      <button onClick={genreGameStrategy}>전략</button>
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
