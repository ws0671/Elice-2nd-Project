import React, { useState, useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Button } from "react-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import resultImg from '../../images/RecomBg_result_2.svg'
import { QnaBox, AnswerButton, Status, StatusBar } from './RecomStyle'
import { post as Post } from "../../api";

function RecomResult() {
    const location = useLocation()

    //genre, answer 값 가져오기
    useEffect(() => {
        console.log(location);
    }, [location]);

    const answers = [...location.state.answer]
    answers.splice(4, 1)

    return (
        <>
            <img className="img-fluid" width="100%" src={resultImg} />
            <ResultBox>
                < h1 > <Button>결과보기(지금 결과페이지임)</Button></h1 >
            </ResultBox>
        </>
    )
}

export default RecomResult

const ResultBox = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    transform: translate(-50%, -50%);
    
`
