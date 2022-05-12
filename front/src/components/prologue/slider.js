import React, { Component, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.css';


function SliderApp() {
    const slider = useRef(null);

    const settings = {
        dots: false,
        centerMode: true,
        centerPadding: "60px",
        autoplay: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1
    };
    return (
        <div className="container">
            <Slider ref={slider} {...settings}>
                <div><img src={process.env.PUBLIC_URL + 'images/feature_1.jpg'} alt="first image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/feature_2.jpg'} alt="second image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/feature_3.jpg'} alt="third image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/feature_4.jpg'} alt="fourth image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/gaming.jpg'} alt="fifth image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/gaming.jpg'} alt="sixth image" /></div>
            </Slider>
        </div>
    );
}

export default SliderApp;