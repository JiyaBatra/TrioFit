import { useState, useRef } from "react";

const TryOnModal = ({ product, onClose }) => {
  const [userImage, setUserImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [placeholderMessage, setPlaceholderMessage] = useState("");
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

  const handleTryOn = () => {
    if (!userImage) return;

    setIsProcessing(true);
    setTimeout(() => {
      setPlaceholderMessage("Feature Disabled");
      setIsProcessing(false);
    }, 300);
  };

  const resetModal = () => {
    setUserImage(null);
    setPreviewImage(null);
    setPlaceholderMessage("");
    setIsProcessing(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>Try It On AI</h2>
        <p>Upload your photo to see how {product.name} looks on you!</p>

        {!placeholderMessage ? (
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
            <h3>Coming Soon</h3>
            <p>{placeholderMessage}</p>
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