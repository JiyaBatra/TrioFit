import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bgVideo from "../assets/images/Video bg/background.mp4";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");
      setResetUrl("");

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      setMessage(data.message);
      setResetUrl(data.resetUrl || "");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <video autoPlay loop muted className="card-video">
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="auth-content">
          <h2>Forgot Password</h2>
          <p className="auth-helper-text">
            Enter your email and we&apos;ll send you a password reset link.
          </p>

          {error && <div className="auth-error">{error}</div>}
          {message && <div className="auth-success">{message}</div>}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleSubmit} disabled={loading || !email}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {resetUrl && (
            <p className="auth-helper-text">
              Dev link: <a href={resetUrl}>{resetUrl}</a>
            </p>
          )}

          <div className="auth-links">
            <Link to="/login">Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
