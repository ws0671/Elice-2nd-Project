import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaChevronRight } from "react-icons/fa";
import { BodyStyle, QnaBox, AnswerButton } from "./RecomStyle";
import styled from "styled-components";
import genreImg from "../../images/RecomBg_genre_3.svg";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import Swal from "sweetalert2";

function RecomGenre() {
  const navigate = useNavigate();
  const userContext = useContext(UserStateContext);

  const gameGenres = [
    "Adventure",
    "Action",
    "RPG",
    "Strategy",
    "Simulation",
    "Racing",
    "Casual",
    "Sports",
    "Violent ",
    "Indie",
  ];

  const [genre, setGenre] = useState([]);

  const onClickHandler = (selectedItem) => {
    if (genre.includes(selectedItem)) {
      setGenre(genre.filter((item) => item !== selectedItem));
      return;
    }

    setGenre([...genre, selectedItem]);
  };

  const isNumberValid = genre.length === 3;

  const goSecondPage = () => {
    if (!isNumberValid) {
      Swal.fire({
        icon: "warning",
        title: `3가지를 골라주세요!`,
        showConfirmButton: false,
        timer: 3000,
        width: 600,
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
      });
    } else {
      navigate("/recommend/qna/2", {
        state: {
          genre: genre,
        },
      });
    }
  };

  console.log(genre);

  return (
    <>
      <BodyStyle imgUrl={genreImg}>
        <Wrapper>
          <Title>관심있는 장르를 '3가지' 골라주세요!</Title>
          <Description>※ 반드시 3가지를 골라야 넘어갑니다!</Description>
          <GenreBtnWrapper>
            {gameGenres.map((genres, idx) => (
              <>
                <GenreButton
                  key={idx}
                  className={
                    genre.find((item) => item === genres)
                      ? "genre active"
                      : "genre"
                  }
                  onClick={() => onClickHandler(genres)}
                >
                  {genres}
                </GenreButton>
                <br />
              </>
            ))}
          </GenreBtnWrapper>
          <FaChevronRight
            className="RightButton"
            style={{ top: "17rem" }}
            color="white"
            size={70}
            onClick={goSecondPage}
          />
        </Wrapper>
      </BodyStyle>
    </>
  );
}

export default RecomGenre;

const Title = styled.h2`
  margin-bottom: 15px;
  color: white;
`;

const Description = styled.p`
  margin-bottom: 30px;
  color: white;
`;

const Wrapper = styled.section`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 700px;
  text-align: center;
  transform: translate(-50%, -50%);

  .RightButton {
    position: absolute;
    right: -7rem;
    top: 13rem;
    color: white;
    cursor: pointer;
  }
`;

const GenreBtnWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GenreButton = styled.button`
  flex: 1 1 40%;
  width: 150px;
  margin: 5px;
  outline: 0;
  font-size: 16px;
  border-radius: 25px;
  border: 2px solid #6c63ff;
  display: inline-block;
  cursor: pointer;
  color: #6c63ff;
  font-family: Arial;
  font-size: 14px;
  padding: 10px 40px;
  text-decoration: none;

  opacity: 0.5;
  ${({ clicked }) => clicked && `opacity: 1; background-color: black`};

  &.active {
    opacity: 1;
    background-color: black;
  }

  &:hover {
    color: white;
    background-color: #bab1ba;

    &:active {
      position: relative;
      top: 1px;
    }
  }
`;
