import React, { useState, useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Container, Col, Row, Form, Button, FormGroup } from "react-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import { qnaList, infoList } from "./data_example"
import select from './RecomQnA'


function RecomResult() {
    const location = useLocation()

    //genre, answer 값 가져오기
    useEffect(() => {
        console.log(location);
    }, [location]);


    return (
        <ResultBox>
            <h1><Button>결과보기(지금 결과페이지임)</Button></h1>
        </ResultBox>
    )
}

export default RecomResult


const ResultBox = styled.section`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
`
