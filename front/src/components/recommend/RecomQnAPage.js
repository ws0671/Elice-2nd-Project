import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Col, Row, Form, Button, FormGroup } from "react-bootstrap"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'
import { createGlobalStyle } from 'styled-components'


function RecomQnAPage() {
    return (
        <h1>Hello</h1>
    )
}


const GlobalStyle = createGlobalStyle`
  body {
  font-family: "Roboto", sans-serif;
  background-color: #f8fafb; 
  }
  
  @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;}
  }

  @keyframes fadeOut {
      from {opacity: 1;}
      to {opacity: 0;}
  }

  @-webkit-keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;}
  }

  @-webkit-keyframes fadeOut {
      from {opacity: 1;}
      to {opacity: 0;}
  }

`

export default RecomQnAPage