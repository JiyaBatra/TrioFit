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
  kidGirlsTopProducts,
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

const SeeMorePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productId = Number(id);
  const [showTryOn, setShowTryOn] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [main, setMain] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState("");
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);
  const [comments, setComments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const fetchProduct = async () => {
      let foundProduct = findStaticProduct(productId);

      if (!foundProduct && Number.isNaN(productId)) {
        try {
          const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
          foundProduct = data.product;
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }

      setProduct(foundProduct || null);
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
    localStorage.setItem(`reviews-${id}`, JSON.stringify(comments));
  }, [comments, id]);

  const galleryImages = useMemo(() => {
    if (!product) {
      return [];
    }

    return product.variants?.length ? product.variants : [product.image];
  }, [product]);

  const availableSizes = product?.sizes?.length ? product.sizes : ["XS", "S", "M", "L", "XL"];

  if (loading) {
    return <p className="page-feedback">Loading...</p>;
  }

  if (!product) {
    return <p className="page-feedback">Product not found.</p>;
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id || product._id,
        name: product.name,
        price: product.price,
        selectedVariant: main,
        image: product.image,
        size: selectedSize,
        quantity: Number(quantity),
      })
    );

    alert(`${product.name} added to cart`);
  };

  const handleOrderNow = () => {
    navigate("/checkout", {
      state: {
        selectedProduct: {
          id: product.id || product._id,
          name: product.name,
          image: main || product.image,
          price: product.price,
          size: selectedSize,
          quantity,
        },
      },
    });
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();

    if (!review.trim()) {
      alert("Please write a review before submitting.");
      return;
    }

    setComments((previousComments) => [
      ...previousComments,
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
  const price = Number(product.price) || 0;
const discount = Number(product.discount) || 0;

const hasDiscount = discount > 0;

const discountedPrice = price - (price * discount) / 100;

 return (
  <main className="see-more-page">
    <div className="see-more-heading">
      <div>
        <p className="see-more-kicker">See more</p>
        <h1>{product.name}</h1>

        {product.discount ? (
          <div className="see-more-price">
            <p
              className="original-price"
              style={{
                textDecoration: "line-through",
                color: "#999",
                marginBottom: "5px",
              }}
            >
              ₹{product.price}
            </p>

            <p
              className="discounted-price"
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#27ae60",
                marginBottom: "5px",
              }}
            >
              ₹
              {(
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(0)}
            </p>

            <p
              className="discount-label"
              style={{
                color: "#e74c3c",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {product.discount}% OFF
            </p>
          </div>
        ) : (
          <p className="price">₹{product.price}</p>
        )}
      </div>
    </div>

    {/* 👇 IMPORTANT: yaha se tumhara next code start hona chahiye */}

      <div className="see-more-layout">
        <section className="see-more-gallery">
          <div className="variants-column">
            {galleryImages.map((image, idx) => (
              <button
                key={`${product.id || product._id}-${idx}`}
                type="button"
                className={`variant-thumb ${image === main ? "active" : ""}`}
                onClick={() => setMain(image)}
              >
                <img src={image} alt={`${product.name} angle ${idx + 1}`} className="variant-img" />
              </button>
            ))}
          </div>

          <div className="main-image">
            <img src={main} alt={product.name} />
          </div>
        </section>

        <aside className="see-more-summary">
          <p className="see-more-note">Tap any image to see another side of the same product.</p>

          <div className="selection-container">
            <label>
              Size
              <select value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)}>
                {availableSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Quantity
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
              />
            </label>
          </div>

          <div className="actions-container">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="order-now-btn" onClick={handleOrderNow}>
              Order Now
            </button>
           
          </div>

          
        </aside>
      </div>

      <div className="review-container">
        <form className="review-form" onSubmit={handleSubmitReview}>
          <textarea
            value={review}
            onChange={(event) => setReview(event.target.value)}
            placeholder="Write your review..."
            rows={3}
          />
          <button type="submit" className="review-btn">
            Submit Review
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

export default SeeMorePage;
