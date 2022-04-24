import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Col, Row, Form, Button, FormGroup } from "react-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import { createGlobalStyle } from 'styled-components'
import qnaList from "./data_example"

function RecomQnAPage() {

    const [qIdx, setQIdx] = useState(0)
    const [aIdx, setAIdx] = useState(0)
    const [question, setQuestion] = useState(qnaList[qIdx].q)
    const [answer, setAnswer] = useState(qnaList[qIdx].a[aIdx].answer)

    const testList = qnaList[qIdx].a[aIdx]

    console.log(testList)

    const onIncrease = () => {
        setQIdx(qIdx + 1)
        setQuestion(qnaList[qIdx + 1].q)
    }


    return (
        <div>
            <GlobalStyle />

            <div className="qBox">
                <h1>{question}</h1>
            </div>
            <div className="answerBox">
                <p>
                    <tbody>
                        {qnaList.a.map((item) => {
                            return <Button key={item.id} item={item}>{item.answer}</Button>
                        })}
                    </tbody>
                </p>
            </div>

            <Button className="btn-primary" onClick={onIncrease}>
                Next
            </Button>

        </div>
    )
}


const GlobalStyle = createGlobalStyle`
  body {
  font-family: "Roboto", sans-serif;
  background-color: #f8fafb; 
  }

`

export default RecomQnAPage