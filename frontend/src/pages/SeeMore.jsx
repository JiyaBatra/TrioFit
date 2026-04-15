import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../redux/cartSlice";

import { 
  topProducts, 
  bottomProducts, 
  ethnicProducts, 
  menTopProducts,
  menBottomProducts,
  menEthnicProducts,
  kidEthnicProducts,
  kidJeansProducts,
  kidShirtsProducts,
  kidTShirtsProducts,
  kidGirlsBottomProducts,
  kidGirlsDressProducts,
  kidGirlsEthnicProducts,
  kidGirlsTopProducts
} from "../data/products";

const staticCollections = [
  topProducts,
  bottomProducts,
  ethnicProducts,
  menTopProducts,
  menBottomProducts,
  menEthnicProducts,
  kidEthnicProducts,
  kidJeansProducts,
  kidShirtsProducts,
  kidTShirtsProducts,
  kidGirlsBottomProducts,
  kidGirlsDressProducts,
  kidGirlsEthnicProducts,
  kidGirlsTopProducts,
];

const findStaticProduct = (productId) =>
  staticCollections.flat().find((product) => String(product.id) === String(productId));
const SeeMore = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId = Number(id);
  const [showTryOn, setShowTryOn] = useState(false);

  // All hooks MUST be called unconditionally at the top level
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [main, setMain] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);
  const [comments, setComments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`reviews-${productId}`)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const fetchProduct = async () => {
      let foundProduct = findStaticProduct(productId);

      if (!foundProduct && isNaN(productId)) {
        try {
          const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
          foundProduct = data.product;
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }

      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, productId]);

  useEffect(() => {
    if (!product) {
      return;
    }

    const gallery = product.variants?.length ? product.variants : [product.image];
    const nextSize = product.sizes?.length ? product.sizes[0] : "M";

    setMain(gallery[0]);
    setSelectedSize(nextSize);
    setQuantity(1);
    setShowTryOn(false);
  }, [product]);

  useEffect(() => {
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(comments));
  }, [comments, productId]);

  const galleryImages = useMemo(() => {
    if (!product) {
      return [];
    }

    return product.variants?.length ? product.variants : [product.image];
  }, [product]);

  const availableSizes = product?.sizes?.length ? product.sizes : ["XS", "S", "M", "L", "XL"];

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found 😢</p>;

  const hasDiscount = Boolean(product.isDiscounted || product.discountedPrice);
  const finalPrice = hasDiscount ? product.discountedPrice : product.price;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id || product._id,
        name: product.name,
        price: finalPrice,
        selectedVariant: main,
        image: product.image,
        size: selectedSize,
        quantity: Number(quantity),
      })
    );
    alert(`${product.name} added to cart 🛒`);
  };

  const handleOrderNow = () => {
    navigate("/checkout", {
      state: {
        selectedProduct: {
          id: product.id || product._id,
          name: product.name,
          image: main || product.image,
          price: finalPrice,
          size: selectedSize,
          quantity,
        },
      },
    });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!review.trim()) {
      alert("Please write a review before submitting.");
      return;
    }
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: review.trim(),
        createdAt: new Date().toLocaleString(),
      },
    ]);
    setReview("");
    setShowReviewSuccess(true);
    setTimeout(() => setShowReviewSuccess(false), 3000);
  };

  return (
    <main className="see-more-page">
      <h1>{product.name}</h1>
      {hasDiscount ? (
        <div className="see-more-price">
          <p className="original-price" style={{ textDecoration: "line-through", color: "#999", marginBottom: "5px" }}>
            ₹{product.price}
          </p>
          <p className="discounted-price" style={{ fontSize: "28px", fontWeight: "bold", color: "#27ae60", marginBottom: "5px" }}>
            ₹{product.discountedPrice}
          </p>
          <p className="discount-label" style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "16px" }}>
            {product.discount || "20% OFF"}
          </p>
        </div>
      ) : (
        <p className="price">₹{product.price}</p>
      )}

      <div className="see-more-container">
        <div className="main-image">
          <img src={main} alt={product.name} />
        </div>

        <div className="variants-column">
          {product.variants.map((v, idx) => (
            <img
              key={idx}
              src={v}
              alt={`${product.name}-${idx}`}
              className={`variant-img ${v === main ? "active" : ""}`}
              onClick={() => setMain(v)}
            />
          ))}
        </div>
      </div>

      <div className="selection-container">
        <label>
          Size:
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            {(product.sizes || ["S", "M", "L", "XL"]).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <label>
          Quantity:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          />
        </label>
      </div>
     
      <div className="actions-container">
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart 🛒
        </button>

        <button className="order-now-btn" onClick={handleOrderNow}>
          Order Now 🚚
        </button>
      </div>

      <div className="review-container">
        <form className="review-form" onSubmit={handleSubmitReview}>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
            rows={3}
          />
          <button type="submit" className="review-btn">
            Submit Review ✍️
          </button>
        </form>

        {showReviewSuccess && <p className="review-success">Review submitted. Thanks!</p>}

        <section className="comment-section">
          <h3>Comments ({comments.length})</h3>
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first to leave feedback!</p>
          ) : (
            <ul className="comment-list">
              {comments.map((item) => (
                <li key={item.id} className="comment-item">
                  <p className="comment-text">{item.text}</p>
                  <small className="comment-time">{item.createdAt}</small>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default SeeMore;
