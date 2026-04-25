// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import bgVideo from "../assets/images/Video bg/background.mp4";

const Login = () => {
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("\n🔐 === LOGIN REQUEST ===");
      console.log("Email:", email);
      console.log("Role from dropdown:", role);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password, role },
        { withCredentials: true }
      );

      console.log("✅ Login response:", data);
      console.log("User from server:", data.user);
      console.log("Token received:", data.token.substring(0, 30) + "...");

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      console.log("✅ Saved to localStorage");
      console.log("User in localStorage:", JSON.parse(localStorage.getItem("user")));
      console.log("Token in localStorage:", localStorage.getItem("token").substring(0, 30) + "...");

      alert("Login successful!");

      if (data.user.role === "seller") {
        console.log("🎯 Redirecting to seller-dashboard");
        window.location.href = "/seller-dashboard";
      } else {
        console.log("🎯 Redirecting to profile");
        window.location.href = "/profile";
      }
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed");
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
          <h2>Login</h2>

          {error && <div className="auth-error">{error}</div>}

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="auth-links auth-links-right">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="auth-links">
            <span>Don&apos;t have an account?</span>
            <Link to="/register">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
