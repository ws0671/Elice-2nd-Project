import React, { useState, useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Button } from "react-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import resultImg from '../../images/RecomBg_result_2.svg'
import { QnaBox, AnswerButton, Status, StatusBar } from './RecomStyle'
import { useNavigate } from "react-router-dom"
import { UserStateContext } from "../../App"
import * as Api from "../../api";


function RecomResultDetail({ recomItem }) {
    console.log('recomItem', recomItem)

    return (
        <>


        </>



    )


}

export default RecomResultDetail