import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Order from "../models/Order.js";

const env = globalThis.process?.env ?? {};

// CREATE ORDER
export const createRazorpayOrder = async (req, res) => {
  try {
    const parsedAmount = Number(req.body?.amount);

    if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Razorpay keys are missing in backend environment variables.",
      });
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid payment amount is required.",
      });
    }

    const options = {
      amount: Math.round(parsedAmount * 100),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      key: env.RAZORPAY_KEY_ID,
      order,
    });
  } catch (err) {
    console.error("Razorpay order creation failed:", err);
    res.status(500).json({
      success: false,
      message: err?.error?.description || err?.message || "Razorpay order failed",
    });
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Create order in DB
      const order = new Order({
        ...orderData,
        orderStatus: "Paid",
      });
      const savedOrder = await order.save();
      return res.json({ success: true, order: savedOrder });
    }

    return res.status(400).json({ success: false, message: "Payment verification failed" });
  } catch (err) {
    console.error("Razorpay verification failed:", err);
    res.status(500).json({ success: false, message: err?.message || "Verification error" });
  }
};
