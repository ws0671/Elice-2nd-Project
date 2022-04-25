import React, { useState, useContext } from "react"
import { Container, Col, Row, Form, Button, FormGroup } from "react-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import { createGlobalStyle } from 'styled-components'
import qnaList from "./data_example"

function RecomQuestion() {

    const [qIdx, setQIdx] = useState(0)
    const [question, setQuestion] = useState(qnaList[qIdx].q)

    const NextQ = () => {
        setQIdx(qIdx + 1)
        setQuestion(qnaList[qIdx + 1].q)
    }


    return (
        <div>
            <GlobalStyle />
            <div className="qBox">
                <h1>{question}</h1>
            </div>
            <div className="aBox">
                <p>
                    {qnaList[qIdx].a.map((item) => {
                        return (
                            <Button>{item.answer}</Button>
                        )
                    })}
                </p>
            </div>

            <Button className="btn-primary" onClick={NextQ}>
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

export default RecomQuestion