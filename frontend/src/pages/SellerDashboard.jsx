import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddProductForm from "../components/AddProductForm";
import TokenDebug from "../components/TokenDebug";
import "./SellerDashboard.css";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    console.log("User from localStorage:", user);
    console.log("Token from localStorage:", token);

    if (!user || user.role !== "seller" || !token) {
      console.log("User not authorized. Redirecting to login...");
      alert("Please login as a seller first");
      navigate("/login");
      return;
    }

    fetchProducts(token);
  }, [navigate]);

  const fetchProducts = async (token) => {
    try {
      setLoading(true);
      console.log("Fetching products with token:", token);
      
      const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const { data } = await axios.get(
  `${API}/api/products/my-products`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);
      console.log("Products fetched successfully:", data);
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      console.error("Response:", error.response?.data);
      
      let errorMsg = "Failed to load products";
      if (error.message.includes("timeout") || error.code === "ECONNREFUSED") {
        errorMsg = "❌ Cannot connect to backend server (localhost:5000).\n\nPlease ensure:\n- Backend is running (npm start in backend folder)\n- MongoDB Atlas cluster is RUNNING";
      } else if (error.response?.status === 500) {
        errorMsg = "❌ Database error. Check if MongoDB Atlas cluster is paused or IP is whitelisted";
      }
      
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== productId));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts([newProduct, ...products]);
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h1>Seller Dashboard</h1>
        <button
          className="btn-add-product"
          onClick={() => {
            setEditingProduct(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <AddProductForm
          onProductAdded={handleProductAdded}
          onCancel={handleCancel}
          editingProduct={editingProduct}
        />
      )}

      <TokenDebug />

      <div className="dashboard-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading">Loading your products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p>No products yet. Start by adding your first product!</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className={`status ${product.status}`}>{product.status}</span>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category">
                    {product.category} → {product.subcategory}
                  </p>
                  <div className="product-details">
                    <span className="price">₹{product.price}</span>
                    <span className="stock">Stock: {product.stock}</span>
                  </div>
                  <div className="product-actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
