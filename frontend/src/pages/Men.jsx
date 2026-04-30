import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import {
  menBottomProducts,
  menEthnicProducts,
  menTopProducts,
} from "../data/products";
import menBannerTopwear from "../assets/images/banner/mentopwear.png";
import menBannerBottomwear from "../assets/images/banner/mensbottomwear.png";
import menBannerEthnic from "../assets/images/banner/menethenicwear.png";

const Men = () => {
  const [extraProducts, setExtraProducts] = useState({
    topwear: [],
    bottomwear: [],
    ethnic: [],
  });

  const images = [menBannerTopwear, menBannerBottomwear, menBannerEthnic];
  const linkTargets = ["#topwear-section", "#bottomwear-section", "#ethnic-section"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  useEffect(() => {
    const slide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(slide);
  }, []);

  const fetchSellerProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products/all");
      const menProducts = data.products.filter((p) => p.category === "Men");
      
      setExtraProducts({
        topwear: menProducts.filter((p) => p.subcategory === "Topwear"),
        bottomwear: menProducts.filter((p) => p.subcategory === "Bottomwear"),
        ethnic: menProducts.filter((p) => p.subcategory === "Ethnic wear"),
      });
    } catch (error) {
      console.error("Error fetching seller products:", error);
    }
  };

  const nextSlide = () => setCurrent((current + 1) % images.length);
  const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <main className="catalog-page">
      <div className="women-banner-slider">
        <a href={linkTargets[current]}>
          <img
            src={images[current]}
            alt="men-category"
            className="slider-image"
          />
        </a>

        <button className="arrow left" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="arrow right" onClick={nextSlide}>
          &#10095;
        </button>

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

    

      <section className="catalog-section" id="bottomwear-section">
      <h3 className="mini-title">Bottoms</h3>
      <div className="products">
        {menBottomProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {extraProducts.bottomwear.map((product) => (
          <ProductCard key={product._id} product={{ ...product, id: product._id }} />
        ))}
      </div>
      </section>

      <section className="catalog-section" id="ethnic-section">
      <h3 className="mini-title">Ethnic Wear</h3>
      <div className="products">
        {menEthnicProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {extraProducts.ethnic.map((product) => (
          <ProductCard key={product._id} product={{ ...product, id: product._id }} />
        ))}
      </div>
      </section>

      <section className="catalog-section" id="topwear-section">
      <h3 className="mini-title">Topwear</h3>
      <div className="products">
        {menTopProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {extraProducts.topwear.map((product) => (
          <ProductCard key={product._id} product={{ ...product, id: product._id }} />
        ))}
      </div>
      </section>
    </main>
  );
};

export default Men;