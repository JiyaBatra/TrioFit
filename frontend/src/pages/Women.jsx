import React from 'react'
import ProductCard from "../components/ProductCard";
import { topProducts, bottomProducts, ethnicProducts} from "../data/products";

const Women = () => {
  return (
    <div>
      <h1 className='Title'>Women</h1>
      <br />

      <h3 className='mini-title'>TopWear</h3>
      <br />
      <div className="products">
        {topProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <br />
      <h3 className='mini-title'>BottomWear</h3>
      <br />
      <div className="products">
        {bottomProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <br />
      <h3 className='mini-title'>Ethnicwear</h3>
      <br />
      <div className="products">
        {ethnicProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

    </div>
  )
}

export default Women
