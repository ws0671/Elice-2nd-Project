import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { RiNumber1 } from "react-icons/ri";
export default class CustomArrows extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2,
    };
    const Body = styled.div`
      width: 90vw;
      margin: 0 auto;
      img {
        width: 400px;
        height: 176px;
      }
      .imgContainer {
        display: flex !important;
        > div:nth-child(1) {
          color: #edf2f4;
        }
        > div:nth-child(2) {
          display: flex;
          align-items: center;
        }
      }
      .slick-prev:before {
        content: "←";
        color: black;
      }
      .slick-next:before {
        content: "→";
        color: black;
      }
    `;
    return (
      <Body>
        <Slider {...settings}>
          <div className="imgContainer">
            <div style={{ fontSize: "200px", width: "100px", margin: "0" }}>
              1
            </div>
            <div>
              <img alt="게임 이미지" src="images/lol.jpg"></img>
            </div>
          </div>
          <div className="imgContainer">
            <div style={{ fontSize: "200px", width: "100px", margin: "0" }}>
              2
            </div>
            <div>
              <img alt="게임 이미지" src="images/overwatch2.png"></img>
            </div>
          </div>
          <div className="imgContainer">
            <div style={{ fontSize: "200px", width: "100px", margin: "0" }}>
              3
            </div>
            <div>
              <img alt="게임 이미지" src="images/lol.png"></img>
            </div>
          </div>
          <div className="imgContainer">
            <div style={{ fontSize: "200px", width: "100px", margin: "0" }}>
              4
            </div>
            <div>
              <img alt="게임 이미지" src="images/lol.png"></img>
            </div>
          </div>
          <div className="imgContainer">
            <div style={{ fontSize: "200px", width: "100px", margin: "0" }}>
              5
            </div>
            <div>
              <img alt="게임 이미지" src="images/lol.png"></img>
            </div>
          </div>
          <div className="imgContainer">
            <div style={{ fontSize: "200px", width: "100px", margin: "0" }}>
              6
            </div>
            <div>
              <img alt="게임 이미지" src="images/lol.png"></img>
            </div>
          </div>
          <div className="imgContainer">
            <div style={{ fontSize: "200px", width: "100px", margin: "0" }}>
              7
            </div>
            <div>
              <img alt="게임 이미지" src="images/lol.png"></img>
            </div>
          </div>
          <div className="imgContainer">
            <div style={{ fontSize: "200px", width: "100px", margin: "0" }}>
              8
            </div>
            <div>
              <img alt="게임 이미지" src="images/lol.png"></img>
            </div>
          </div>
          <div className="imgContainer">
            <div style={{ fontSize: "200px", width: "100px", margin: "0" }}>
              9
            </div>
            <div>
              <img alt="게임 이미지" src="images/lol.png"></img>
            </div>
          </div>
          <div className="imgContainer">
            <div style={{ fontSize: "200px", width: "200px", margin: "0" }}>
              10
            </div>
            <div>
              <img alt="게임 이미지" src="images/lol.png"></img>
            </div>
          </div>
        </Slider>
      </Body>
    );
  }
}
