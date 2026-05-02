import React, { useState, useEffect } from 'react'
import apiClient from "../services/apiClient";
import ProductCard from "../components/ProductCard";
import { topProducts, bottomProducts, ethnicProducts } from "../data/products";
import womenBannerTopwear from "../assets/images/banner/womentopwear.png";
import womenBannerBottomwear from "../assets/images/banner/womenbottomwear.png";
import womenBannerEthnic from "../assets/images/banner/womenethenicwear.png";

const Women = () => {
  const [extraProducts, setExtraProducts] = useState({
    topwear: [],
    bottomwear: [],
    ethnic: [],
  });

  const images = [womenBannerTopwear, womenBannerBottomwear, womenBannerEthnic];
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
      const { data } = await apiClient.get("/api/products/all");
      const womenProducts = data.products.filter((p) => p.category === "Women");
      
      setExtraProducts({
        topwear: womenProducts.filter((p) => p.subcategory === "Topwear"),
        bottomwear: womenProducts.filter((p) => p.subcategory === "Bottomwear"),
        ethnic: womenProducts.filter((p) => p.subcategory === "Ethnic"),
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
            alt="women-category"
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

     

      <section className="catalog-section" id="topwear-section">
      <h3 className='mini-title'>TopWear</h3>
      <div className="products">
        {topProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {extraProducts.topwear.map((p) => (
          <ProductCard key={p._id} product={{ ...p, id: p._id }} />
        ))}
      </div>
      </section>

      <section className="catalog-section" id="bottomwear-section">
      <h3 className='mini-title'>BottomWear</h3>
      <div className="products">
        {bottomProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {extraProducts.bottomwear.map((p) => (
          <ProductCard key={p._id} product={{ ...p, id: p._id }} />
        ))}
      </div>
      </section>

      <section className="catalog-section" id="ethnic-section">
      <h3 className='mini-title'>Ethnicwear</h3>
      <div className="products">
        {ethnicProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {extraProducts.ethnic.map((p) => (
          <ProductCard key={p._id} product={{ ...p, id: p._id }} />
        ))}
      </div>
      </section>

    </main>
  )
}

export default Women

