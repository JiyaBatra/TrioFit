import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Order from "../models/Order.js";

// CREATE ORDER
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Razorpay order failed" });
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
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
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
    } else {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Verification error" });
  }
};