import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import offer1 from "../assets/images/offer/offer1.png";
import offer2 from "../assets/images/offer/offer2.png";
import offer3 from "../assets/images/offer/offer3.png";
import offer4 from "../assets/images/offer/offer4.png";

const Offer = () => {
  const navigate = useNavigate();
  const images = [offer1, offer2, offer3, offer4];
  const linkTargets = [
    "#fiftypercentoff",
    "#sixtypercentoff",
    "#twentypercentoff",
    "#thirtypercentoff",
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(slide);
  }, []);

  const nextSlide = () => setCurrent((current + 1) % images.length);
  const prevSlide = () =>
    setCurrent((current - 1 + images.length) % images.length);

  const handleImageClick = () => {
    if (current === 0) navigate('/fifty-percent-off');
    else if (current === 1) navigate('/sixty-percent-off');
    else if (current === 2) navigate('/twenty-percent-off');
    else if (current === 3) navigate('/thirty-percent-off');
  };

  return (
    <div className="offer-slider">

      <img
        src={images[current]}
        alt="offer"
        className="slider-image"
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />

      {/* Arrows */}
      <button className="arrow left" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="arrow right" onClick={nextSlide}>
        &#10095;
      </button>

      {/* Dots */}
      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={i === current ? "dot active" : "dot"}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Offer;