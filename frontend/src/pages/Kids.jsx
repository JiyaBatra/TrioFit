import React, { useState, useEffect } from 'react'
import apiClient from '../services/apiClient';
import ProductCard from '../components/ProductCard'
import { 
  kidEthnicProducts, 
  kidJeansProducts, 
  kidShirtsProducts, 
  kidTShirtsProducts,
  kidGirlsBottomProducts,
  kidGirlsDressProducts,
  kidGirlsEthnicProducts,
  kidGirlsTopProducts
} from '../data/products'
import kidsBannerBoysBottom from '../assets/images/banner/kidsbottomwearboys.png'
import kidsBannerGirlsBottom from '../assets/images/banner/kidsbottomweargirl.png'
import kidsBannerGirlsDress from '../assets/images/banner/kidsdressesgirls.png'
import kidsBannerBoysEthnic from '../assets/images/banner/kidsethenicwearboys.png'
import kidsBannerBoysShirt from '../assets/images/banner/kidsshirtboys.png'
import kidsBannerBoysTop from '../assets/images/banner/kidstopwearboys.png'
import kidsBannerGirlsTop from '../assets/images/banner/kidstopweargirls.png'

const Kids = () => {
  const [extraProducts, setExtraProducts] = useState({
    boys: [],
    girls: [],
  });

  const images = [kidsBannerBoysBottom, kidsBannerGirlsBottom, kidsBannerGirlsDress, kidsBannerBoysEthnic, kidsBannerBoysShirt, kidsBannerBoysTop, kidsBannerGirlsTop];
  const linkTargets = ["#boys-section", "#girls-section", "#girls-section", "#boys-section", "#boys-section", "#boys-section", "#girls-section"];
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
      const kidsProducts = data.products.filter((p) => p.category === "Kids");
      
      setExtraProducts({
        boys: kidsProducts.filter((p) => p.subcategory === "Boys clothing"),
        girls: kidsProducts.filter((p) => p.subcategory === "Girls clothing"),
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
            alt="kids-category"
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

    

      <section className="catalog-section" id="boys-section">
      <h3 className='mini-title'>Kids Ethnicwear</h3>
      <div className="products">
        {kidEthnicProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      </section>

      <section className="catalog-section">
      <h3 className='mini-title'>Kids Jeans</h3>
      <div className="products">
        {kidJeansProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      </section>

      <section className="catalog-section">
      <h3 className='mini-title'>Kids Shirts</h3>
      <div className="products">
        {kidShirtsProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      </section>

      <section className="catalog-section">
      <h3 className='mini-title'>Kids T-Shirts</h3>
      <div className="products">
        {kidTShirtsProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      </section>

      <section className="catalog-section" id="girls-section">
      <h3 className='mini-title'>Girls Bottoms</h3>
      <div className="products">
        {kidGirlsBottomProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {extraProducts.girls.map((p) => (
          <ProductCard key={p._id} product={{ ...p, id: p._id }} />
        ))}
      </div>
      </section>

      <section className="catalog-section">
      <h3 className='mini-title'>Girls Dresses</h3>
      <div className="products">
        {kidGirlsDressProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      </section>

      <section className="catalog-section">
      <h3 className='mini-title'>Girls Ethnicwear</h3>
      <div className="products">
        {kidGirlsEthnicProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      </section>

      <section className="catalog-section">
      <h3 className='mini-title'>Girls Tops</h3>
      <div className="products">
        {kidGirlsTopProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {extraProducts.boys.map((p) => (
          <ProductCard key={p._id} product={{ ...p, id: p._id }} />
        ))}
      </div>
      </section>
    </main>
  )
}

export default Kids