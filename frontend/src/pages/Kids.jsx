import React from 'react'

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

const Kids = () => {
  return (
    <div>
    <h1 className='Title'>Kids </h1>
      <br />
      <h3 className='mini-title'>Kids Ethnicwear</h3>
      <br />
      <div className="products">
        {kidEthnicProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <h3 className='mini-title'>Kids Jeans</h3>
      <br />
      <div className="products">
        {kidJeansProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <h3 className='mini-title'>Kids Shirts</h3>
      <br />
      <div className="products">
        {kidShirtsProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <h3>Kids T-Shirts</h3>
      <br />
      <div className="products">
        {kidTShirtsProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* New Girls Sections */}
      <h3>Girls Bottoms</h3>
      <br />
      <div className="products">
        {kidGirlsBottomProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <h3>Girls Dresses</h3>
      <br />
      <div className="products">
        {kidGirlsDressProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <h3>Girls Ethnicwear</h3>
      <br />
      <div className="products">
        {kidGirlsEthnicProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <h3>Girls Tops</h3>
      <br />
      <div className="products">
        {kidGirlsTopProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}

export default Kids