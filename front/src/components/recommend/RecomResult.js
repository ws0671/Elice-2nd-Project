import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Col, Row, Form, Button, FormGroup } from "react-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import { qnaList, infoList } from "./data_example"
import select from './RecomQnA'


function RecomResult() {
    const selectValue = Object.values(select)
    const endPoint = 12
    const calResult = () => {
        let pointArray = [
            { name: 'mouse', value: 0, key: 0 },
            { name: 'cow', value: 0, key: 1 },
            { name: 'tiger', value: 0, key: 2 },
            { name: 'rabbit', value: 0, key: 3 },
            { name: 'dragon', value: 0, key: 4 },
            { name: 'snake', value: 0, key: 5 },
            { name: 'horse', value: 0, key: 6 },
            { name: 'sheep', value: 0, key: 7 },
            { name: 'monkey', value: 0, key: 8 },
            { name: 'chick', value: 0, key: 9 },
            { name: 'dog', value: 0, key: 10 },
            { name: 'pig', value: 0, key: 11 },
        ]


        for (let i = 0; i < endPoint; i++) {
            var target = qnaList[i].a[selectValue[i]]
            for (let j = 0; j < target.length; j++) {
                for (let k = 0; k < pointArray.length; k++) {
                    if (target.type[j] === pointArray[k].name) {
                        pointArray[k].value += 1
                    }
                }

            }



            /*      var resultArray = pointArray.sort(function (a, b) {
                     if (a.value > b.value) {
                         return -1
                     }
                     if (a.value < b.value) {
                         return 1
                     }
                     return 0
                 })
     
                 let resultWord = resultArray[0].key
                 return resultWord */

        }
        console.log(pointArray)
    }




    return (
        <ResultBox>
            <h1><Button onClick={calResult}>결과보기(지금 결과페이지임)</Button></h1>
        </ResultBox>
    )
}

export default RecomResult


const ResultBox = styled.section`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
`
