import { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as bodySegmentation from "@tensorflow-models/body-segmentation";

const TryOnModal = ({ product, onClose }) => {
  const [userImage, setUserImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [error, setError] = useState("");
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
    setError("");

    try {
      // Load TensorFlow.js
      await tf.ready();

      // Load the body segmentation model
      const segmenter = await bodySegmentation.createSegmenter(bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation, {
        runtime: 'tfjs'
      });

      // Create canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const userImg = new Image();
      userImg.src = previewImage;
      await new Promise(resolve => userImg.onload = resolve);
      canvas.width = userImg.width;
      canvas.height = userImg.height;
      ctx.drawImage(userImg, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Segment the image
      const segmentation = await segmenter.segmentPeople(imageData);

      // For simplicity, assume one person
      if (segmentation.length > 0) {
        const mask = segmentation[0].mask;

        // Find the bounding box of the person
        let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            if (mask.get(y, x) > 0.5) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        // Draw the product image centered on the bounding box
        const productImg = new Image();
        productImg.src = product.image;
        await new Promise(resolve => productImg.onload = resolve);
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        const scale = 0.8; // adjust scale
        const width = (maxX - minX) * scale;
        const height = productImg.height * (width / productImg.width);
        ctx.drawImage(productImg, centerX - width / 2, centerY - height / 2, width, height);

        // Set the result
        setResultImage(canvas.toDataURL());
      } else {
        setError("No person detected in the image.");
      }
    } catch (err) {
      console.error("Try-on processing failed:", err);
      setError("Unable to generate try-on result.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setUserImage(null);
    setPreviewImage(null);
    setResultImage(null);
    setError("");
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

            {error && <p className="error-message">{error}</p>}

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
            <h3>Try-On Result</h3>
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