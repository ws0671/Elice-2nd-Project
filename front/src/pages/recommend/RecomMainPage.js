import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Col, Row, Form, Button, FormGroup } from "react-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  body {
  font-family: "Roboto", sans-serif;
  background-color: #f8fafb;}
`

const BgImage = styled.img`
    position: relative;                                                               
    height: 100vh;
    background-size: cover;
`


function RecomMainPage() {




    return (
        <div className="container text-center">
            <GlobalStyle />
            <img style={{ height: '100vh' }} src={process.env.PUBLIC_URL + 'img/recom_bg.jpg'} alt="background" />
            <h1 className="display-2 mt-lg-5 mb-lg-3">Welcome!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic porro sapiente quis ea odio. Officiis eum asperiores at ipsam quam quos earum sit molestias nesciunt explicabo? Consequuntur vitae recusandae ex.</p>
            <div class="img-cover"></div>
        </div>

    )
}

export default RecomMainPage