import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

export default function LtRSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 100,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1368,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="">
      <Slider {...settings}>
        <div className="Ritem">
          <img src="./assets/image/1.png" className="Ritem_img" width="190px" height="190px" />      
        </div>
        <div className="Ritem">
          <img src="./assets/image/2.png" className="Ritem_img" width="190px" height="190px" />      
        </div>
        <div className="Ritem">
          <img src="./assets/image/3.png" className="Ritem_img" width="190px" height="190px" />      
        </div>
        <div className="Ritem">
          <img src="./assets/image/7.png" className="Ritem_img" width="190px" height="190px" />      
        </div>
        <div className="Ritem">
          <img src="./assets/image/10.png" className="Ritem_img" width="190px" height="190px" />      
        </div>
        <div className="Ritem">
          <img src="./assets/image/13.png" className="Ritem_img" width="190px" height="190px" />    
        </div>
        <div className="Ritem">
          <img src="./assets/image/14.png" className="Ritem_img" width="190px" height="190px" />
        </div>
        <div className="Ritem">
          <img src="./assets/image/15.png" className="Ritem_img" width="190px" height="190px" />
        </div>
      </Slider>
    </div>
  );
}