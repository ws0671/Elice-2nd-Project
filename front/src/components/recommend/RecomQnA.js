import React, { useEffect, useRef, useState } from "react"
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Form, Button, FormGroup } from "react-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import { qnaList } from "./data_example"
import { First } from "react-bootstrap/esm/PageItem";

function RecomQuestion() {

    const [qIdx, setQIdx] = useState(0) // 질문 인덱스
    const [question, setQuestion] = useState(qnaList[qIdx].q) // 질문 내용
    const [loading, setLoading] = useState(true)

    const progressRef = useRef(null)
    const statusRef = useRef(null)
    const navigate = useNavigate()

    const [firstP, setFirstP] = useState(false)
    const [lastP, setLastP] = useState(false) // 첫페이지인지 확인
    const endPoint = Object.keys(qnaList).length; // 총 슬라이드(총 질문 개수)

    const [select, setSelect] = useState([]) // 선택사항 저장



    const PrevQnA = () => {
        setQIdx(qIdx - 1)
        setQuestion(qnaList[qIdx - 1].q)

        const cntIdx = qIdx + 2
        const count = Object.keys(qnaList).length
        console.log('cntIdx, count', cntIdx, count)
        statusRef.current.style.width = (100 / endPoint) * (qIdx - 1) + '%';

    }

    const addAnswer = (answerText) => {
        var a = document.querySelector('.aBox')
        var answer = React.createElement('button', { children: answerText })
        answer.classList.add('answerList')
        ReactDOM.render(answer, a)
        answer.addEventListener('click', () => {
            var children = document.querySelectorAll('.answerList')
            for (let i = 0; i < children.length; i++) {
                children[i].disabled = true
                children[i].style.display = 'none'
            }
        }, false)
    }



    const NextQnA = () => {
        setQIdx(qIdx + 1)
        setQuestion(qnaList[qIdx + 1].q)

        const cntIdx = qIdx + 2
        const count = Object.keys(qnaList).length

        console.log('statusRef', statusRef)
        statusRef.current.style.width = (100 / endPoint + 1) * (qIdx + 1) + '%';


    }




    /*console.log(qnaList[0].a[1].type)*/
    const ChooseOne = () => {
        qnaList[qIdx].a[qIdx].type.map((item) => console.log(item))


    }

    //이전, 다음 버튼 감추기용
    useEffect(() => {
        qIdx == 0 ? setFirstP(true) : setFirstP(false)
    }, [qIdx])

    useEffect(() => {
        qIdx == endPoint - 1 ? setLastP(true) : setLastP(false)
    }, [qIdx])


    return (
        <>


            <BodyStyle>
                <QnaBox>
                    <div className="qBox">
                        <h1>{question}</h1>
                    </div>
                    <div className="aBox">
                        <p>
                            {qnaList[qIdx].a.map((item, idx) => {
                                return (
                                    <>
                                        <Sbutton key={idx}>{item.answer}</Sbutton><br />
                                    </>
                                )
                            })}
                        </p>
                    </div>
                    {firstP || (<Button className="btn-primary" onClick={PrevQnA}>Prev</Button>)}
                    {lastP || <Button className="btn-primary" onClick={NextQnA}>Next</Button>}
                    {lastP && <Button className="btn-primary" onClick={ChooseOne}>결과보기</Button>}
                    <Status className="mx-auto mt-5">
                        <StatusBar ref={statusRef} />
                    </Status>
                </QnaBox>
            </BodyStyle>


        </>
    )

}

const BodyStyle = styled.div`
    width: 100vw;
    height: 100vh;
    font-family: "Roboto", sans-serif;
    background-color: #f8fafb;
`


const QnaBox = styled.section`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1000px;
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

const Status = styled.div`
    height: 20px;
    width: 80%;
    background-color: grey;
    border-radius: 20px;
`

const StatusBar = styled.div`
    height: 100%;
    background-color: red;
    border-radius: 20px;
`


export default RecomQuestion