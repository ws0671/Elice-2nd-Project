import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaChevronRight } from "react-icons/fa";
import { BodyStyle, QnaBox, AnswerButton, Status, StatusBar } from './RecomStyle'
import { genre } from "./data_example"

function RecomGenre() {

    const navigate = useNavigate()
    const [genres, setGenres] = useState([])

    useEffect(() => {
        setGenres(genre);
    }, []);


    const handleChange = (e) => {
        const { name, checked } = e.target
        let tempGenre = genres.map((item) =>
            item.name === name ? { ...item, isChecked: checked } : item)
        setGenres(tempGenre)


    }

    console.log(genres)

    const Answers = () => {

        return (
            genres.map((genre, index) => (
                <div className="form-check" key={index}>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name={genre.name}
                        checked={genre?.isChecked || false}
                        onChange={handleChange}
                    />
                    <label className="form-check-label ms-2">{genre.name}</label>
                </div>
            ))
        )
    }

    const goSecondPage = () => {
        navigate('/recommend/qna/2')
    }



    return (
        <>
            <BodyStyle>
                <QnaBox>
                    <div className="qBox">
                        <h1>관심있는 장르를 3가지 골라주세요!</h1>
                    </div>
                    <div className="aBox">
                        <p className="mt-4"><Answers /></p>
                    </div>
                    < FaChevronRight className="RightButton" size={70} onClick={goSecondPage} />
                </QnaBox>
            </BodyStyle>
        </>
    )

}

export default RecomGenre