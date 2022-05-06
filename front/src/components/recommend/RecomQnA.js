import React, { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { qnaList } from "./RecomData"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BodyStyle, QnaBox, AnswerButton, Status, StatusBar } from './RecomStyle'
import qnaImg from '../../images/RecomBg_quiz_3.svg'

function RecomQuestion() {


    const [qIdx, setQIdx] = useState(0) // 질문 인덱스
    const [question, setQuestion] = useState(qnaList[qIdx].q) // 질문 내용
    const [loading, setLoading] = useState(true)
    const [clicked, setClicked] = useState(null) //클릭된 버튼 표시

    const statusRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()
    const genre = location.state.genre

    const [firstP, setFirstP] = useState(false)
    const [lastP, setLastP] = useState(false) // 첫페이지인지 확인
    const endPoint = Object.keys(qnaList).length; // 총 슬라이드(총 질문 개수)

    const [select, setSelect] = useState({}) // 선택사항 1번, 2번, 3번 저장, 나중에 1번, 2번, 3번의 type 개수를 저장해서 결과값 계산
    const answer = Object.values(select)// 보내기 용 select value값만 저장

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


    useEffect(() => {
        console.log(location);
        console.log(genre);
    }, [location]);

    const Answers = () => {

        return (
            qnaList[qIdx].a.map((item) => {
                return (
                    <>
                        <AnswerButton clicked={clicked === item || select[qIdx] === item.id} key={item.id} onClick={
                            () => {
                                setClicked(item)
                                selectedButton(item.answer)
                            }}>{item.answer}</AnswerButton><br />


                    </>
                )
            })
        )
    }

    console.log('select', select)
    /*     console.log('select', select) */
    const NextQnA = () => {
        setQIdx(qIdx + 1)
        setQuestion(qnaList[qIdx + 1].q)

        statusRef.current.style.width = (100 / endPoint) * (qIdx + 1) + '%';
    }

    /*console.log(qnaList[0].a[1].type)*/

    const goResult = () => {
        setLoading(true)
        navigate('/recommend/result', {
            state: {
                genre: genre,
                answer: answer
            },
        });
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

    /*     useEffect(() => {
            window.localStorage.setItem('userAnswers', JSON.stringify(select))
        })
    
        useEffect(() => {
            const answersData = window.localStorage.getItem('userAnswers')
            console.log(answersData)
            setSelect(JSON.parse(answersData))
        }, [])
     */

    return (
        <>
            <BodyStyle imgUrl={qnaImg}>
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

export default RecomQuestion