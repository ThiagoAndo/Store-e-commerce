import React from "react";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/store/products-context";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./product-detail.module.css";

const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState(null);

  const [nav1, setNav1] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slider1, setSlider1] = useState(null);
  const store = useContext(ProductContext);
  useEffect(() => {
    setNav1(slider1);
  }, [slider1]);

  useEffect(() => {
    setProduct(store.products[id-1]);
  }, []);

  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: true,
    // autoplay: true,
    onReInit: () => setCurrentSlide(slider1?.innerSlider.state.currentSlide),
    autoplaySpeed: 700,
    lazyLoad: true,
    asNavFor: ".slider-nav",
    focusOnSelect: true,
    nextArrow: (
      <div>
        <div className="next-slick-arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="black"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
          </svg>
        </div>
      </div>
    ),
    prevArrow: (
      <div>
        <div className="next-slick-arrow rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="black"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
          </svg>
        </div>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (product) {
    return (
      <>
        <div className={classes["content"]}>
          <div className={classes["container"]}>
            <Slider
              {...settings}
              asNavFor={nav1}
              ref={(slider) => setSlider1(slider)}
            >
              {product.images.map((img, idx) => (
                <div className={classes["img-body"]} key={idx}>
                  <img src={img.image} className={classes["body_img"]} />
                </div>
              ))}
            </Slider>
            <div className={classes["thumb-wrapper"]}>
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={currentSlide === idx ? classes["active"] : null}
                  onClick={() => {
                    slider1?.slickGoTo(idx);
                  }}
                >
                  <img src={img.image} className={classes["img_wrapper"]} />
                  {currentSlide}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }  else{
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }
};

export default ProductDetail;
