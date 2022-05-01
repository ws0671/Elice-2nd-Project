import React, { Component, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProlCarousels.css';


function FirstCarousel() {
    const slider = React.useRef(null);

    const settings = {
        dots: false,
        centerMode: true,
        centerPadding: "60px",
        autoplay: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    return (
        <div className="container">
            <Slider ref={slider} {...settings}>
                <div><img src={process.env.PUBLIC_URL + 'images/feature_1.jpg'} alt="first image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/feature_2.jpg'} alt="second image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/feature_3.jpg'} alt="third image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/feature_4.jpg'} alt="fourth image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/feature_5.jpg'} alt="fifth image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/feature_6.jpg'} alt="sixth image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/feature_7.jpg'} alt="seventh image" /></div>
            </Slider>
        </div>
    );
}

export default FirstCarousel;