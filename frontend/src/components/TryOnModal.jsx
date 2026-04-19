import { useState, useRef } from "react";
import axios from "axios";

const TryOnModal = ({ product, onClose }) => {
  const [userImage, setUserImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImage(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!userImage) return;

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("userImage", userImage);
      formData.append("productImage", product.image);
      formData.append("productName", product.name);

      const response = await axios.post("http://localhost:5000/api/tryon", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResultImage(response.data.resultImage);
    } catch (error) {
      console.error("Error processing try-on:", error);
      alert("Failed to process try-on. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setUserImage(null);
    setPreviewImage(null);
    setResultImage(null);
    setIsProcessing(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>Try It On AI</h2>
        <p>Upload your photo to see how {product.name} looks on you!</p>

        {!resultImage ? (
          <>
            <div className="upload-section">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <button
                className="upload-btn"
                onClick={() => fileInputRef.current.click()}
              >
                {previewImage ? "Change Photo" : "Upload Your Photo"}
              </button>
            </div>

            {previewImage && (
              <div className="preview-section">
                <h3>Your Photo:</h3>
                <img src={previewImage} alt="Your photo" className="preview-img" />
              </div>
            )}

            <div className="product-preview">
              <h3>Product:</h3>
              <img src={product.image} alt={product.name} className="product-img" />
            </div>

            <button
              className="try-on-submit-btn"
              onClick={handleTryOn}
              disabled={!userImage || isProcessing}
            >
              {isProcessing ? "Processing..." : "Try It On!"}
            </button>
          </>
        ) : (
          <div className="result-section">
            <h3>Result:</h3>
            <img src={resultImage} alt="Try-on result" className="result-img" />
            <div className="result-actions">
              <button onClick={resetModal}>Try Another Photo</button>
              <button onClick={onClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TryOnModal;