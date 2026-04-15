import React, { useState, useEffect } from 'react'
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { topProducts, bottomProducts, ethnicProducts } from "../data/products";

const Women = () => {
  const [extraProducts, setExtraProducts] = useState({
    topwear: [],
    bottomwear: [],
    ethnic: [],
  });

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const fetchSellerProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products/all");
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

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <div className="catalog-hero-card">
          <h1 className='Title'>Women</h1>
          <p>Fresh fits, cleaner cards, and a more responsive layout for every screen size.</p>
        </div>
        <div className="catalog-hero-panel">
          <div className="catalog-stat">
            <strong>Topwear</strong>
            <p>Polished shirts, tees, and statement silhouettes.</p>
          </div>
          <div className="catalog-stat">
            <strong>Bottomwear</strong>
            <p>Everyday denim, tailored fits, and easy movement.</p>
          </div>
          <div className="catalog-stat">
            <strong>Ethnic wear</strong>
            <p>Festive looks with faster browsing into See More.</p>
          </div>
        </div>
      </section>

      <section className="catalog-section">
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

      <section className="catalog-section">
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

      <section className="catalog-section">
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
