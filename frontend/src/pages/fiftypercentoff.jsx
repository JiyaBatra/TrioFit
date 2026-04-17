import React from 'react'
import ProductCard from '../components/ProductCard';
import { kidGirlsBottomProducts, kidGirlsDressProducts, kidGirlsEthnicProducts, kidGirlsTopProducts } from '../data/products';

const FiftyPercentOff = () => {
  const discountedProducts = [
    ...kidGirlsBottomProducts,
    ...kidGirlsDressProducts,
    ...kidGirlsEthnicProducts,
    ...kidGirlsTopProducts,
  ].filter((product) => product.isDiscounted);

  return (
    <section id="fiftypercentoff" className="catalog-section">
      <h3 className='mini-title'>💖 Kid's Girl Special Offer - 50% OFF</h3>
      <div className="products">
        {discountedProducts.length > 0 ? (
          discountedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <p>No discounted kid's girl products available right now.</p>
        )}
      </div>
    </section>
  )
}

export default FiftyPercentOff
