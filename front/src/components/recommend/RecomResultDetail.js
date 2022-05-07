import React, { useState, useContext, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import * as Api from "../../api";
import { UserStateContext } from "../../App"
import { Wrapper, MainImg, RemainderWrapper, Remainders, ButtonWrapper, Button } from "./ResultDetailStyle"
import { BodyStyle, QnaBox, AnswerButton } from "./RecomStyle";
import RecommendChart from "./RecommendChart";
import RecomSlider from "./RecomSlider";

function RecomResultDetail() {
    const location = useLocation()
    const navigate = useNavigate()
    const userContext = useContext(UserStateContext)
    const userId = userContext.user.userId

    const [gameItem, setGameItem] = useState([])

    const refresh = () => {
        Api.delete("gameRecommend", userId)
        navigate('/recommend')
    }

    useEffect(() => {
        setGameItem(location.state.recomItem)

    }, [])

    console.log('GameItem', gameItem)




    return (
        <div>
            <BodyStyle>
                {/*   < Wrapper> */}
                <div className="gameMainImg">
                    <RecomSlider gameItem={gameItem} />
                </div>
                <RemainderWrapper>

                </RemainderWrapper>
                <ButtonWrapper>
                    <Button onClick={refresh}>처음부터 다시!</Button>
                </ButtonWrapper>
                {/*   </Wrapper> */}
            </BodyStyle>
        </div>
    )


}

export default RecomResultDetail