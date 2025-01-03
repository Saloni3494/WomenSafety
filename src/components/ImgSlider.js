import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Carousel {...settings}>
      <Wrap>
        <a>
            <img src='/images/slider-1.jpg' alt=' ' />
        </a>
      </Wrap>

      <Wrap>
        <a>
            <img src='/images/slider-2.jpg' alt=' ' />
        </a>
      </Wrap>

      <Wrap>
        <a>
            <img src='/images/slider-3.jpg' alt=' ' />
        </a>
      </Wrap>

      <Wrap>
        <a>
            <img src='/images/slider-4.jpg' alt=' ' />
        </a>
      </Wrap>
    </Carousel>
  );
};

const Carousel = styled(Slider)`
    margin-top: 20px;

    & > button {
        opacity: 0;
        height: 100%;
        width: 5vw,
        z-index: 1;

        &:hover {
            opacity: 1;
            transition: opacity 0.2s ease 0s;
        }
    }

    ul li button {
        &:before {
            font-size: 10px;
            color: rgb(195, 2, 147);
        }
    }

    li.slick-active button:before {
        color: purple;

    }

    .slick-list {
        overflow: initial;
    }

    .slick-prev {
        left: -75px;
    }

    .slick-next {
        right: -75px;
    }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, 
                rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;

    img {
      width: 100%;
      height: auto; /* Maintain aspect ratio */
      max-width: 100%; /* Prevent image from stretching */
      object-fit: cover; /* Ensures proper scaling without distortion */
      border-radius: 4px;
    }

    &:hover {
      padding: 0;
      border: 4px solid rgba(86, 1, 72, 0.8);
      transition: border 300ms ease-in-out;
    }
  }
`;


export default ImgSlider;
