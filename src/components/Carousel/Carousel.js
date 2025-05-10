import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PropTypes from "prop-types";
import linkedin from "../../assets/images/icons/linkedin.svg";
import "./Carousel.scss";

const Carousel = (props) => {
  const { list, type, dot } = props;

  const settings = {
    dots: dot,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: Carousel,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: Carousel,
        },
      },
    ],
  };
  return (
    <div className="container-fluid text-center mb-5 mt-1">
      {list.length === 0 ? (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <Slider {...settings}>
          {list.map((item, index) => {
            return (
              <div className="out" key={index}>
                <div className="card">
                  <div className="card-body text-white">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/${type}/${item.image}`}
                      alt="item.name"
                      className="card-body-img"
                    />
                    <div className="d-flex flex-column card-text">
                      <div className="card-title">{item.name}</div>
                      <div className="">{item.info}</div>
                      <div className="mt-3 d-flex justify-content-center">
                        {item.linkedin !== "" && (
                          <a href={item.linkedin}>
                            <img src={linkedin} alt={"linkedin"} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

Carousel.propTypes = {
  list: PropTypes.array,
};
Carousel.defaultProps = {
  list: [],
};

export default Carousel;
