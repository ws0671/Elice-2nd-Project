import React, { Component, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './LastCarousel.css';


function LastCarousel() {
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
                <div><img src={process.env.PUBLIC_URL + 'images/prol_carousel1.jpg'} alt="first image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/prol_carousel2.jpg'} alt="second image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/prol_carousel3.jpg'} alt="third image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/prol_carousel4.jpg'} alt="fourth image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/prol_carousel5.jpg'} alt="fifth image" /></div>
                <div><img src={process.env.PUBLIC_URL + 'images/prol_carousel6.jpg'} alt="sixth image" /></div>
            </Slider>
        </div>
    );
}

export default LastCarousel;