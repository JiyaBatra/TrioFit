import React from "react";

import ProductCard from "../components/ProductCard";
import {
  menBottomProducts,
  menEthnicProducts,
  menTopProducts,
} from "../data/products";

const Men = () => {
  return (
    <div>
    <h1 className="Title">Men </h1>
      <br />
      <h3 className="mini-title">Bottoms</h3>
      <br />
      <div className="products">
        { menBottomProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <h3 className="mini-title">Ethnic Wear</h3>
      <br />
      <div className="products">
        {menEthnicProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <h3 className="mini-title">Topwear</h3>
      <br />
      <div className="products">
        {menTopProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Men;