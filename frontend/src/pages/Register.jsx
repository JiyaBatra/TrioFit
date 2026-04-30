import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/images/Video bg/background.mp4";

const Register = () => {
  const [role, setRole] = useState("customer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [shopName, setShopName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    if (!fullName || !email || !password) {
      setError("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (role === "seller" && (!shopName || !gstNumber)) {
      setError("Shop name and GST number are required for sellers");
      return;
    }

   const API = import.meta.env.VITE_API_URL;

try {
  setLoading(true);
  const { data } = await axios.post(
    `${API}/api/auth/register`,
    {
      fullName,
      email,
      password,
      role,
      accountHolderName,
      accountNumber,
      ifscCode,
      shopName: role === "seller" ? shopName : undefined,
      gstNumber: role === "seller" ? gstNumber : undefined,
    },
    { withCredentials: true }
  );

      console.log("Registered successfully:", data);
      alert("Account created successfully! Redirecting to login...");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Registration failed");
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
          <h2>Create Account</h2>

          {error && <div className="auth-error">{error}</div>}

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <h4>Bank Details</h4>
          <input
            type="text"
            placeholder="Account Holder Name"
            value={accountHolderName}
            onChange={(e) => setAccountHolderName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="IFSC Code"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
          />

          {role === "seller" && (
            <>
              <h4>Seller Details</h4>
              <input
                type="text"
                placeholder="Shop / Brand Name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
              <input
                type="text"
                placeholder="GST Number"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
              />
            </>
          )}

          <button onClick={handleRegister} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;