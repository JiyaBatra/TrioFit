import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import "./AddProductForm.css";

const AddProductForm = ({ onProductAdded, onCancel, editingProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    subcategory: "",
    description: "",
    image: "",
    variantUrl: "",
    variants: [],
    sizes: [],
    colors: [],
    stock: "",
    status: "active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = {
    Men: ["Topwear", "Bottomwear", "Ethnic wear"],
    Women: ["Topwear", "Bottomwear", "Ethnic", "Dresses"],
    Kids: ["Boys clothing", "Girls clothing"],
  };

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        ...editingProduct,
        variantUrl: "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddVariant = () => {
    if (formData.variantUrl.trim()) {
      setFormData({
        ...formData,
        variants: [...formData.variants, formData.variantUrl],
        variantUrl: "",
      });
    }
  };

  const handleRemoveVariant = (index) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index),
    });
  };

  const handleAddSize = (size) => {
    if (!formData.sizes.includes(size)) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, size],
      });
    }
  };

  const handleRemoveSize = (size) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter((s) => s !== size),
    });
  };

  const handleAddColor = (color) => {
    if (!formData.colors.includes(color)) {
      setFormData({
        ...formData,
        colors: [...formData.colors, color],
      });
    }
  };

  const handleRemoveColor = (color) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((c) => c !== color),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.price || !formData.category || !formData.image) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      console.log("=== ADDING PRODUCT ===");
      console.log("Token exists:", !!token);
      console.log("Token value:", token ? token.substring(0, 20) + "..." : "NO TOKEN");

      if (!token) {
        setError("Not authenticated. Please login again.");
        setLoading(false);
        return;
      }

      let response;
      if (editingProduct) {
        response = await apiClient.put(
          `/api/products/${editingProduct._id}`,
          {
            name: formData.name,
            price: parseFloat(formData.price),
            category: formData.category,
            subcategory: formData.subcategory,
            description: formData.description,
            image: formData.image,
            variants: formData.variants,
            sizes: formData.sizes,
            colors: formData.colors,
            stock: parseInt(formData.stock),
            status: formData.status,
          }
        );
      } else {
        response = await apiClient.post(
          "/api/products/add",
          {
            name: formData.name,
            price: parseFloat(formData.price),
            category: formData.category,
            subcategory: formData.subcategory,
            description: formData.description,
            image: formData.image,
            variants: formData.variants,
            sizes: formData.sizes,
            colors: formData.colors,
            stock: parseInt(formData.stock),
          }
        );
      }

      onProductAdded(response.data.product);
      setFormData({
        name: "",
        price: "",
        category: "",
        subcategory: "",
        description: "",
        image: "",
        variantUrl: "",
        variants: [],
        sizes: [],
        colors: [],
        stock: "",
        status: "active",
      });
      alert(editingProduct ? "Product updated successfully!" : "Product added successfully!");
    } catch (err) {
      console.error("=== ERROR ADDING PRODUCT ===");
      console.error("Status:", err.response?.status);
      console.error("Message:", err.response?.data?.message);
      console.error("Error:", err.response?.data);
      console.error("Full error:", err);
      
      let errorMessage = "Error adding product";
      if (err.message.includes("timeout") || err.message.includes("ECONNREFUSED")) {
        errorMessage = "❌ Server connection error. Please ensure the backend is running on localhost:5000";
      } else if (err.response?.status === 500) {
        errorMessage = "❌ Database error. Please check MongoDB Atlas is running and accessible";
      } else {
        errorMessage = err.response?.data?.message || err.message || "Error adding product";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Red", "Blue", "Black", "White", "Green", "Yellow", "Pink", "Purple"];

  return (
    <div className="add-product-form-container">
      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-row">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label>Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Sub-category *</label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              required
              disabled={!formData.category}
            >
              <option value="">Select Sub-category</option>
              {formData.category &&
                categories[formData.category].map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Product Image URL *</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter main product image URL"
            required
          />
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Product" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Variant Image URLs</label>
          <div className="variant-input">
            <input
              type="text"
              name="variantUrl"
              value={formData.variantUrl}
              onChange={handleChange}
              placeholder="Paste image URL and click Add"
            />
            <button
              type="button"
              className="btn-add-variant"
              onClick={handleAddVariant}
            >
              Add Variant
            </button>
          </div>
          <div className="variants-list">
            {formData.variants.map((url, index) => (
              <div key={index} className="variant-item">
                <img src={url} alt={`Variant ${index + 1}`} />
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => handleRemoveVariant(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Available Sizes</label>
          <div className="options-grid">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`option-btn ${formData.sizes.includes(size) ? "selected" : ""}`}
                onClick={() =>
                  formData.sizes.includes(size)
                    ? handleRemoveSize(size)
                    : handleAddSize(size)
                }
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Available Colors</label>
          <div className="options-grid">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                className={`option-btn ${formData.colors.includes(color) ? "selected" : ""}`}
                onClick={() =>
                  formData.colors.includes(color)
                    ? handleRemoveColor(color)
                    : handleAddColor(color)
                }
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? "Processing..." : editingProduct ? "Update Product" : "Add Product"}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
