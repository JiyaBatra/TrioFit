import React from 'react'
import ProductCard from '../components/ProductCard';
import { menTopProducts, menBottomProducts, menEthnicProducts } from '../data/products';

const sixtypercentoff = () => {
  const discountedProducts = [
    ...menTopProducts,
    ...menBottomProducts,
    ...menEthnicProducts,
  ].filter((product) => product.isDiscounted);

  return (
    <section id="sixtypercentoff" className="catalog-section">
      <h3 className='mini-title'>🎉 Special Discount Offers - 60% OFF</h3>
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

export default sixtypercentoff
