import React from 'react'
import ProductCard from '../components/ProductCard';
import { topProducts, bottomProducts, ethnicProducts } from '../data/products';

const twentypercentoff = () => {
  const discountedProducts = [
    ...topProducts,
    ...bottomProducts,
    ...ethnicProducts,
  ].filter((product) => product.isDiscounted);

  return (
    <section className="catalog-section">
      <h3 className='mini-title'>🎉 Special Discount Offers - 20% OFF</h3>
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

export default twentypercentoff