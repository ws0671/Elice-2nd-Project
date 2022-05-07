import React, { useState, useContext, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import * as Api from "../../api";
import { UserStateContext } from "../../App"
import { ButtonWrapper, Button } from "./ResultDetailStyle"
import { BodyStyle, ChartWrapper, QnaBox, AnswerButton } from "./RecomStyle";
import RecomSlider from "./RecomSlider";
import RecomChart from './RecomChart'

function RecomResultDetail() {
    const location = useLocation()
    const navigate = useNavigate()
    const userContext = useContext(UserStateContext)
    const userId = userContext.user.userId


    const [currentIdx, setCurrentIdx] = useState(0)
    const [gameItem, setGameItem] = useState([])

    const getCurrentIdx = (currentIdx) => {
        setCurrentIdx(currentIdx)

    }


    const refresh = () => {
        Api.delete("gameRecommend", userId)
        navigate('/recommend')
    }

    useEffect(() => {
        setGameItem(location.state.recomItem)

    }, [])



    return (
        <div>
            <BodyStyle>
                <RecomSlider gameItem={gameItem} getCurrentIdx={getCurrentIdx} />
                <ChartWrapper>
                    <RecomChart className="recomChart" gameItem={gameItem} />
                </ChartWrapper>
                <ButtonWrapper>
                    <Button onClick={refresh}>처음부터 다시!</Button>
                </ButtonWrapper>
            </BodyStyle>
        </div>
    )


}

export default RecomResultDetail


