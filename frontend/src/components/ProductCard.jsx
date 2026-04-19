import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const openSeeMore = () => {
    navigate(`/see-more/${product.id}`, { state: { variants: product.variants || [product.image], name: product.name } });
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        style={{ cursor: "pointer" }}
        onClick={openSeeMore}
      />

      <h3>{product.name}</h3>
      {product.isDiscounted ? (
        <div className="price-section">
          <p className="original-price" style={{ textDecoration: "line-through", color: "#999", marginBottom: "5px" }}>
            ₹{product.price}
          </p>
          <p className="discounted-price" style={{ fontSize: "18px", fontWeight: "bold", color: "#27ae60", marginBottom: "5px" }}>
            ₹{product.discountedPrice}
          </p>
          <p className="discount-label" style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "14px" }}>
            {product.discount}
          </p>
        </div>
      ) : (
        <p>₹{product.price}</p>
      )}

      <div className="product-card-actions">
        <button onClick={openSeeMore}>See More</button>
      </div>
    </div>
  );
};

export default ProductCard;
