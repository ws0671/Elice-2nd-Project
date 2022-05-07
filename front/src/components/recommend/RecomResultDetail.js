import React, { useState, useContext, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import * as Api from "../../api";
import { UserStateContext } from "../../App"
import { Container, MainImg, RemainderWrapper, Remainders, ButtonWrapper, Button } from "./ResultDetailStyle"


function RecomResultDetail() {
    const location = useLocation()
    const navigate = useNavigate()
    const userContext = useContext(UserStateContext)
    const userId = userContext.user.userId


    const refresh = () => {
        Api.delete("gameRecommend", userId)
        navigate('/recommend')
    }

    console.log(location.state.recomitem)

    return (
        <div>
            <Container>
                <h3>당신에게 추천드리는 게임은...</h3>
                <h2></h2>
                <div className="gameMainImg">
                    <MainImg className="firstImg"></MainImg>
                </div>
                <RemainderWrapper>
                    <Remainders>1</Remainders>
                    <Remainders>2</Remainders>
                    <br />
                    <Remainders>3</Remainders>
                    <Remainders>4</Remainders>
                </RemainderWrapper>
                <ButtonWrapper>
                    <Button onClick={refresh}>처음부터 다시!</Button>
                </ButtonWrapper>
            </Container>
        </div>
    )


}

export default RecomResultDetail