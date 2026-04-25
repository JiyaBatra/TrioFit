import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = express.Router();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const RESET_TOKEN_TTL_MS = 1000 * 60 * 30;

const sendResetPasswordEmail = async ({ email, fullName, resetUrl }) => {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESET_FROM_EMAIL || process.env.RESEND_FROM_EMAIL;

  if (!resendApiKey || !fromEmail) {
    console.log("Password reset email is not configured.");
    console.log("Reset link for", email, ":", resetUrl);
    return { delivered: false };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      subject: "Reset your Triofit password",
      html: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
          <h2 style="margin-bottom: 12px;">Reset your password</h2>
          <p>Hello ${fullName || "there"},</p>
          <p>We received a request to reset your Triofit account password.</p>
          <p>
            <a
              href="${resetUrl}"
              style="display: inline-block; padding: 12px 20px; background: #111827; color: #ffffff; text-decoration: none; border-radius: 8px;"
            >
              Reset Password
            </a>
          </p>
          <p>This link will expire in 30 minutes.</p>
          <p>If you did not request this, you can safely ignore this email.</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send reset email: ${errorText}`);
  }

  return { delivered: true };
};

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      role,
      accountHolderName,
      accountNumber,
      ifscCode,
      shopName,
      gstNumber,
    } = req.body;

    console.log("\n📝 === REGISTRATION ATTEMPT ===");
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Role:", role);
    console.log("Shop Name (if seller):", shopName);

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed");

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      accountHolderName,
      accountNumber,
      ifscCode,
      shopName: role === "seller" ? shopName : undefined,
      gstNumber: role === "seller" ? gstNumber : undefined,
    });

    await newUser.save();

    console.log("✅ User created successfully");
    console.log("Saved user:", {
      id: newUser._id,
      role: newUser.role,
      email: newUser.email,
      shopName: newUser.shopName
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    console.log("\n🔑 === LOGIN ATTEMPT ===");
    console.log("Email:", email);
    console.log("Role requested:", role);

    // Check user - must match both email AND role
    const user = await User.findOne({ email, role });
    if (!user) {
      console.log("❌ User not found with that email and role");
      return res.status(400).json({ message: "Invalid email or role" });
    }

    console.log("✅ User found");
    console.log("User details:", {
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName
    });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ Password matched");

    // JWT Token
    const tokenPayload = { id: user._id, role: user.role };
    console.log("JWT Payload:", tokenPayload);

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("✅ JWT token created");
    console.log("Token preview:", token.substring(0, 30) + "...");

    const response = { 
      token, 
      user: { id: user._id, fullName: user.fullName, role: user.role } 
    };
    
    console.log("📤 Sending response:", response.user);
    res.json(response);
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        message: "If an account exists with this email, a reset link has been sent.",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    const resetUrl = `${FRONTEND_URL}/reset-password?token=${rawToken}`;

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
    await user.save();

    const emailResult = await sendResetPasswordEmail({
      email: user.email,
      fullName: user.fullName,
      resetUrl,
    });

    const response = {
      message: "If an account exists with this email, a reset link has been sent.",
    };

    if (!emailResult.delivered) {
      response.resetUrl = resetUrl;
      response.note = "Email delivery is not configured yet, so the reset link is returned for development.";
    }

    res.json(response);
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Unable to process forgot password request" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: "Reset link is invalid or has expired" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password updated successfully. Please log in." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Unable to reset password" });
  }
});

export default router;
