import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaChevronRight } from "react-icons/fa";
import { BodyStyle, QnaBox, AnswerButton } from './RecomStyle'
import styled from "styled-components";
function RecomGenre() {

    const navigate = useNavigate()

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
        "Indie"
    ];

    const [genre, setGenre] = useState([]);

    const onClickHandler = (selectedItem) => {
        if (genre.includes(selectedItem)) {
            setGenre(genre.filter((item) => item !== selectedItem));
            return;
        }

        setGenre([...genre, selectedItem]);
    };

    const isNumberValid = genre.length === 3


    const goSecondPage = () => {
        if (!isNumberValid) {
            alert('3가지를 골라주세요!')
        }
        else {
            navigate('/recommend/qna/2', {
                state: {
                    genre: genre,
                },
            });
        }

    }

    console.log(genre);

    return (
        <>
            <BodyStyle>
                <QnaBox>
                    <h1>관심있는 장르를 3가지 골라주세요!</h1>
                    <ul className="menu-group">
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
                    </ul>
                    < FaChevronRight className="RightButton" size={70} onClick={goSecondPage} />
                </QnaBox>
            </BodyStyle>
        </>
    );
}

export default RecomGenre



const GenreButton = styled.button`
margin: 5px;
outline: 0;
font-size: 16px;
border-radius:25px;
border:2px solid #6c63ff;
display:inline-block;
cursor: pointer;
color:#6c63ff;
font-family:Arial;
font-size:14px;
padding:10px 40px;
text-decoration:none;

opacity: 0.5;
${({ clicked }) => clicked && `opacity: 1; background-color: black`};

&.active {
    opacity : 1;
    background-color: black;
}


&:hover {
color: white;
    background-color:#bab1ba;

    &:active {
        position:relative;
        top:1px;
    }
}
`