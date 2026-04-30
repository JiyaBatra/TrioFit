import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../redux/cartSlice";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";
const formatPrice = (value) => `Rs.${Number(value || 0)}`;

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), { once: true });
      existingScript.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const locationProduct = location.state?.selectedProduct || null;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    pincode: "",
    state: "",
    city: "",
    fullAddress: "",
    area: "",
    landmark: "",
  });

  const [deliveryType, setDeliveryType] = useState("Standard Delivery");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [itemDetails, setItemDetails] = useState(() => {
    if (locationProduct) {
      const effectivePrice = Number(locationProduct.discountedPrice ?? locationProduct.price) || 0;
      const originalPrice = Number(locationProduct.originalPrice ?? locationProduct.price) || effectivePrice;

      return [
        {
          productId: locationProduct.id,
          productName: locationProduct.name,
          image: locationProduct.image,
          size: locationProduct.size || "M",
          quantity: Number(locationProduct.quantity) || 1,
          price: effectivePrice,
          originalPrice,
          isDiscounted: originalPrice > effectivePrice || Boolean(locationProduct.isDiscounted),
          discount: locationProduct.discount || "",
        },
      ];
    }

    if (cartItems.length > 0) {
      return cartItems.map((item) => {
        const effectivePrice = Number(item.discountedPrice ?? item.price) || 0;
        const originalPrice = Number(item.originalPrice ?? item.price) || effectivePrice;

        return {
          productId: item.id,
          productName: item.name,
          image: item.selectedVariant || item.image,
          size: item.size || "M",
          quantity: item.quantity || 1,
          price: effectivePrice,
          originalPrice,
          isDiscounted: originalPrice > effectivePrice || Boolean(item.isDiscounted),
          discount: item.discount || "",
        };
      });
    }

    return [];
  });

  const subtotal = useMemo(
    () => itemDetails.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [itemDetails]
  );

  const deliveryCharge = deliveryType === "Express Delivery" ? 80 : 40;
  const discount = subtotal > 2500 ? 200 : 0;
  const totalPrice = subtotal + deliveryCharge - discount;

  const handleItemChange = (index, field, value) => {
    setItemDetails((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: field === "quantity" ? Number(value) : value };
      return updated;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.phone || !form.email || !form.pincode || !form.state || !form.city || !form.fullAddress || !form.area) {
      setError("Please fill all required fields in delivery address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    if (itemDetails.length === 0) {
      setError("Cart is empty. Add items before placing order.");
      return;
    }

    const normalizedItems = itemDetails.map((item) => ({
      ...item,
      quantity: Math.max(1, Number(item.quantity) || 1),
      price: Number(item.price) || 0,
    }));

    const orderPayload = {
      customerName: form.fullName,
      phone: form.phone,
      email: form.email,
      fullAddress: form.fullAddress,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      area: form.area,
      deliveryType,
      paymentMethod,
      discount,
      deliveryCharge,
      totalPrice,
      products: normalizedItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
    };

    if (paymentMethod === "Cash on Delivery") {
      try {
        setLoading(true);
        const response = await axios.post(`${API_BASE_URL}/api/orders/create`, { ...orderPayload, orderStatus: "Pending" });
        if (response.data?.success) {
          dispatch(clearCart());
          navigate("/order-success", { state: { orderId: response.data.order._id } });
        } else {
          setError("Unable to place order. Please try again.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Unable to place order. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      // Online payment
      try {
        setLoading(true);
        const sdkLoaded = await loadRazorpayScript();
        if (!sdkLoaded) {
          setError("Unable to load Razorpay checkout. Please check your internet connection.");
          setLoading(false);
          return;
        }

        const orderResponse = await axios.post(`${API_BASE_URL}/api/payment/create-order`, { amount: totalPrice });
        if (!orderResponse.data?.success || !orderResponse.data?.order || !orderResponse.data?.key) {
          setError(orderResponse.data?.message || "Unable to create payment order.");
          setLoading(false);
          return;
        }

        const { order, key } = orderResponse.data;
        const options = {
          key,
          amount: order.amount,
          currency: order.currency,
          name: "TrioFit",
          description: "Purchase",
          order_id: order.id,
          handler: async (response) => {
            try {
              const verifyResponse = await axios.post(`${API_BASE_URL}/api/payment/verify`, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: orderPayload,
              });

              if (verifyResponse.data?.success) {
                dispatch(clearCart());
                navigate("/order-success", { state: { orderId: verifyResponse.data.order._id } });
                return;
              }

              setError(verifyResponse.data?.message || "Payment verification failed.");
            } catch (err) {
              setError(err.response?.data?.message || "Payment verification failed.");
              console.error(err);
            } finally {
              setLoading(false);
            }
          },
          prefill: {
            name: form.fullName,
            email: form.email,
            contact: form.phone,
          },
          notes: {
            deliveryType,
            paymentMethod,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", () => {
          setError("Payment failed. Please try again.");
          setLoading(false);
        });
        rzp.open();
      } catch (err) {
        setError(err.response?.data?.message || "Unable to initiate payment.");
        console.error(err);
        setLoading(false);
      }
    }
  };

  if (itemDetails.length === 0) {
    return (
      <div className="checkout-page">
        <h2>Checkout</h2>
        <p>
          Your cart is empty. Go to <Link to="/">Home</Link> and add products.
        </p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      
      <div className="checkout-grid">
      <div className="left-column">
        <section className="product-details-section">
          <h3>1. Product Details</h3>
          {itemDetails.map((item, idx) => (
            <div key={item.productId} className="product-card-checkout">
              <img src={item.image} alt={item.productName} />
              <div className="product-card-content">
                <strong>{item.productName}</strong>
                <span>
                  Price:{" "}
                  {item.isDiscounted ? (
                    <>
                      <span style={{ textDecoration: "line-through", color: "#888", marginRight: "8px" }}>
                        {formatPrice(item.originalPrice)}
                      </span>
                      <span style={{ color: "#27ae60", fontWeight: "bold" }}>{formatPrice(item.price)}</span>
                      {item.discount ? <span style={{ color: "#e74c3c", marginLeft: "8px" }}>({item.discount})</span> : null}
                    </>
                  ) : (
                    formatPrice(item.price)
                  )}
                </span>
                <label>
                  Size
                  <select value={item.size} onChange={(e) => handleItemChange(idx, "size", e.target.value)}>
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Qty
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                  />
                </label>
                <p>Total: {formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </section>

        
        <section className="final-summary">
          <h3>5. Order Summary</h3>
          <div className="summary-row">
            <span>Product(s) total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery charge</span>
            <span>{formatPrice(deliveryCharge)}</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
          <div className="summary-total">
            <strong>Final amount</strong>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="button" className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </section>

        </div>
        <section className="address-section">
          <h3>2. Delivery Address</h3>
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <label>
              Full Name*
              <input name="fullName" value={form.fullName} onChange={handleInputChange} required />
            </label>
            <label>
              Phone Number*
              <input name="phone" value={form.phone} onChange={handleInputChange} required />
            </label>
            <label>
              Email*
              <input name="email" type="email" value={form.email} onChange={handleInputChange} required />
            </label>
            <label>
              Pincode*
              <input name="pincode" value={form.pincode} onChange={handleInputChange} required />
            </label>
            <label>
              State*
              <input name="state" value={form.state} onChange={handleInputChange} required />
            </label>
            <label>
              City*
              <input name="city" value={form.city} onChange={handleInputChange} required />
            </label>
            <label>
              House No / Building*
              <input name="fullAddress" value={form.fullAddress} onChange={handleInputChange} required />
            </label>
            <label>
              Area / Street / Locality*
              <input name="area" value={form.area} onChange={handleInputChange} required />
            </label>
            <label>
              Landmark (optional)
              <input name="landmark" value={form.landmark} onChange={handleInputChange} />
            </label>
          </form>

          <h3>3. Delivery Options</h3>
          <div className="delivery-options">
          <label>
            <input
              type="radio"
              name="deliveryType"
              value="Standard Delivery"
              checked={deliveryType === "Standard Delivery"}
              onChange={(e) => setDeliveryType(e.target.value)}
            />
            Standard Delivery (3-5 days)
          </label>
          <label>
            <input
              type="radio"
              name="deliveryType"
              value="Express Delivery"
              checked={deliveryType === "Express Delivery"}
              onChange={(e) => setDeliveryType(e.target.value)}
            />
            Express Delivery (1-2 days)
          </label>
</div>

          <h3>4. Payment Method</h3>
          <div className="payment-block">
            <p>Pay Now</p>
            {[
              "UPI",
              "Debit Card",
              "Credit Card",
              "Net Banking",
            ].map((method) => (
              <label key={method}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method}
              </label>
            ))}
          </div>
          <div className="payment-block">
            <p>Pay Later</p>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
