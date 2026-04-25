import "dotenv/config";
import Razorpay from "razorpay";

const env = globalThis.process?.env ?? {};

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export default razorpay;
