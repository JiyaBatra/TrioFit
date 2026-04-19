import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TryOnModal from "./TryOnModal";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [showTryOnModal, setShowTryOnModal] = useState(false);

  const openSeeMore = () => {
    navigate(`/see-more/${product.id}`, { state: { variants: product.variants || [product.image], name: product.name } });
  };

  const handleTryOnClick = (e) => {
    e.stopPropagation(); // Prevent triggering openSeeMore
    setShowTryOnModal(true);
  };

  return (
    <>
      <div
        className="product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="image-container">
          <img
            src={product.image}
            alt={product.name}
            style={{ cursor: "pointer" }}
            onClick={openSeeMore}
          />
          {isHovered && (
            <div className="try-on-overlay">
              <button className="try-on-btn" onClick={handleTryOnClick}>
                Try It On AI
              </button>
            </div>
          )}
        </div>

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

      {showTryOnModal && (
        <TryOnModal
          product={product}
          onClose={() => setShowTryOnModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
