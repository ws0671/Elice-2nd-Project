import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import 'bootstrap/dist/css/bootstrap.min.css'


function RecomMainPage() {

  const navigate = useNavigate()

  return (
    <RecommendStyle>
      <div>
        <figure className="banner">
          <img className="img-fluid" width="100%" src={process.env.PUBLIC_URL + '/images/recom_bg.jpg'} />
          {/*{require("../images/recom_bg.jpg")} */}
          <figcaption>
            <h1 className="display-2 mt-lg-5 mb-lg-3">Welcome!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <Sbutton onClick={() => navigate("/recommend/qna/1")}>시작</Sbutton>
          </figcaption>
        </figure>
      </div>
    </RecommendStyle>

  )
}


const RecommendStyle = styled.div`
  * {
    margin: 0;
    padding: 0;
    color: #6c63ff;
  }

  body {
    font-family: "Montserrat", sans-serif;
    background-position: 'center';
    background-size: 'cover';
    background-repeat: 'no-repeat';}

  figcaption{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 500px;
    text-align: center;
    transform: translate(-50%, -50%);

    text-shadow: 2px 2px 2px #323232;
    /* -webkit-text-stroke-width: 1px;
	-webkit-text-stroke-color: white */
  }

  figcaption p{
    font-size: 18px;
  }

`

const Sbutton = styled.button`
  outline: 0;
  font-size: 16px;
  border-radius:25px;
	border:2px solid #6c63ff;
	display:inline-block;
	cursor:pointer;
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


export default RecomMainPage