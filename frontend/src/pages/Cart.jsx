import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items || []);

  if (!cartItems.length) {
    return (
      <div className="cart-page">
        <h2 className="cart-title">Your Cart 🛒</h2>
        <p>No items in cart</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart 🛒</h2>

      <div className="cart-container">
        {cartItems.map((item, idx) => (
          <div className="cart-card" key={idx}>
            
            {/* IMAGE */}
            <img
              src={item.selectedVariant || item.image}
              alt={item.name}
              className="cart-img"
             onClick={() => navigate(`/see-more/${String(item.id)}`)}
            />

            {/* DETAILS */}
            <div className="cart-details">
              <h3>{item.name}</h3>

              <p className="price">
                ₹{item.price} {item.quantity > 1 && `x${item.quantity}`}
              </p>

              {item.selectedVariant && (
                <p className="variant">Variant selected</p>
              )}

              <button
                className="view-btn"
               onClick={() => navigate(`/see-more/${String(item.id)}`)}
              >
                View Product 👀
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;