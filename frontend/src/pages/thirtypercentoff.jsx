import React from 'react'
import ProductCard from '../components/ProductCard';
import { kidEthnicProducts, kidJeansProducts, kidShirtsProducts, kidTShirtsProducts } from '../data/products';

const thirtypercentoff = () => {
  const discountedProducts = [
    ...kidEthnicProducts,
    ...kidJeansProducts,
    ...kidShirtsProducts,
    ...kidTShirtsProducts,
  ].filter((product) => product.isDiscounted);

  return (
    <section id="thirtypercentoff" className="catalog-section">
      <h3 className='mini-title'>🎉 Special Discount Offers - 30% OFF</h3>
      <div className="products">
        {discountedProducts.length > 0 ? (
          discountedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <p>No discounted products available right now.</p>
        )}
      </div>
    </section>
  )
}

export default thirtypercentoff
