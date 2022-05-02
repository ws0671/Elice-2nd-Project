import React, { useEffect, useRef, useState } from "react"
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom';
import { Button, ProgressBar } from "react-bootstrap"
import styled, { keyframes } from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import { qnaList } from "./data_example"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function RecomQuestion() {

    const [qIdx, setQIdx] = useState(0) // 질문 인덱스
    const [question, setQuestion] = useState(qnaList[qIdx].q) // 질문 내용
    const [loading, setLoading] = useState(true)
    const [clicked, setClicked] = useState(null) //클릭된 버튼 표시

    const statusRef = useRef(null)
    const navigate = useNavigate()

    const [firstP, setFirstP] = useState(false)
    const [lastP, setLastP] = useState(false) // 첫페이지인지 확인
    const endPoint = Object.keys(qnaList).length; // 총 슬라이드(총 질문 개수)

    const [select, setSelect] = useState({}) // 선택사항 1번, 2번, 3번 저장, 나중에 1번, 2번, 3번의 type 개수를 저장해서 결과값 계산


    const PrevQnA = () => {
        setQIdx(qIdx - 1)
        setQuestion(qnaList[qIdx - 1].q)

        statusRef.current.style.width = (100 / endPoint) * (qIdx - 1) + '%';
    }

    const selectedButton = (answer) => {
        for (let i = 0; i < qnaList[qIdx].a.length; i++) {
            if (answer === qnaList[qIdx].a[i].answer) {
                setSelect((prev) => { return { ...prev, [qIdx]: i } })

            }
        }
    }
    /* console.log('함수 밖 select', select) */

    const Answers = () => {

        return (
            qnaList[qIdx].a.map((item) => {
                return (
                    <>
                        <AnswerButton checked={select.qIdx === item.id} clicked={clicked === item} key={item.id} onClick={
                            () => {
                                setClicked(item)
                                selectedButton(item.answer)
                            }}>{item.answer}</AnswerButton><br />

                    </>
                )
            })
        )
    }

    const NextQnA = () => {
        setQIdx(qIdx + 1)
        setQuestion(qnaList[qIdx + 1].q)

        statusRef.current.style.width = (100 / endPoint + 1) * (qIdx + 1) + '%';
    }

    /*console.log(qnaList[0].a[1].type)*/

    const goResult = () => {
        setLoading(true)
        navigate('/recommend/result')
    }

    //이전, 다음 버튼 감추기
    useEffect(() => {
        qIdx === 0 ? setFirstP(true) : setFirstP(false)
    }, [qIdx])

    useEffect(() => {
        qIdx === endPoint - 1 ? setLastP(true) : setLastP(false)
    }, [qIdx])

    //진행바 초기화
    useEffect(() => {
        statusRef.current.style.width = 0 + '%';
    }, [])


    // 클릭된 버튼 Localstorage에 저장
    useEffect(() => {
        const clicked_Data = window.localStorage.getItem('CLICKED_ANSWER')
        setClicked(JSON.parse(clicked_Data))
    }, [])

    useEffect(() => {
        window.localStorage.setItem('CLICKED_ANSWER', JSON.stringify(clicked))

    }, [clicked])

    return (
        <>


            <BodyStyle>
                <QnaBox>
                    <div className="qBox">
                        <h1>{question}</h1>
                    </div>
                    <div className="aBox">
                        <p className="mt-4"> <Answers /></p>
                    </div>
                    {firstP || <FaChevronLeft className="LeftButton" size={70} onClick={PrevQnA} />}
                    {lastP || < FaChevronRight className="RightButton" size={70} onClick={NextQnA} />}
                    {lastP && < FaChevronRight className="RightButton" size={70} onClick={goResult} />}
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
    position: relative;
    left: 50%;
    top: 50%;
    width: 1000px;
    text-align: center;
    transform: translate(-50%, -50%);


    .LeftButton {
        position: absolute;
        z-index: 1;
        left: 3rem;
        top: 7rem;
    }

    .RightButton {
        position: absolute;
        z-index: 1;
        right: 3rem;
        top: 7rem;
    }

`

const AnswerButton = styled.button`
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

    opacity: 0.5;
    ${({ clicked }) => clicked && `opacity: 1; background-color: black`};

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
    border: 2px solid #FFF;
    height: 30px;
    width: 80%;
    background-color: #FFF;
    border-radius: 20px;
`

const StatusBar = styled.div`
    height: 100%;
    background-image: linear-gradient(to right, #ef32d9, #89fffd);
    border-radius: 20px;
`


export default RecomQuestion