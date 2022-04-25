import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Col, Row, Form, Button, FormGroup } from "react-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import { createGlobalStyle } from 'styled-components'
import qnaList from "./data_example"

function RecomQuestion() {
    const navigate = useNavigate()

    const [qIdx, setQIdx] = useState(0)
    const [question, setQuestion] = useState(qnaList[qIdx].q)

    const NextQnA = () => {
        setQIdx(qIdx + 1)
        setQuestion(qnaList[qIdx + 1].q)

        const cntIdx = qIdx + 2
        const count = Object.keys(qnaList).length
        console.log('cntIdx, count', cntIdx, count)

        if (cntIdx > count) {
            navigate('recommend/result')
        }

    }

    const count = Object.keys(qnaList).length



    return (
        <>
            <GlobalStyle />
            <QnaBox>
                <div className="qBox">
                    <h1>{question}</h1>
                </div>
                <div className="aBox">
                    <p>
                        {qnaList[qIdx].a.map((item) => {
                            return (
                                <>
                                    <Sbutton>{item.answer}</Sbutton><br />
                                </>
                            )
                        })}
                    </p>
                </div>


                <Button className="btn-primary" onClick={NextQnA}>Next</Button>
            </QnaBox>

        </>
    )

}
const GlobalStyle = createGlobalStyle`
  body {
     font-family: "Roboto", sans-serif;
     background-color: #f8fafb; 
  }
`
const QnaBox = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 500px;
    text-align: center;
    transform: translate(-50%, -50%);

`

const Sbutton = styled.button`
    margin: 10px;
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

  &:hover {
  color: white;
	background-color:#bab1ba;

  &:active {
	position:relative;
	top:1px;
}
}
`

export default RecomQuestion