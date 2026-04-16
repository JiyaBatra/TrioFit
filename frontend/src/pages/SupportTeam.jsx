import React from "react";

const SupportTeam = () => {
  return (
    <div className="c">
    

      <h1 className="c">Support Team</h1>
      <hr className="bold-divider" />

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Email Us</h3>
          <p>support@triofit.com</p>
          <p>Response within 24 hours</p>
        </div>

        <div className="contact-card">
          <h3>Call Us</h3>
          <p>+1 (800) TRIO-FIT</p>
          <p>Mon - Sat, 9am to 6pm</p>
        </div>

        <div className="contact-card">
          <h3>WhatsApp</h3>
          <p>+1 987 654 3210</p>
          <p>Instant tech-support</p>
        </div>
      </div>

      <div className="form-section">
        <h2>Send us a Message</h2>

        <form>
          <div className="form-group">
            <label>Reason for Contact</label>
            <select>
              <option>Order Tracking</option>
              <option>Product Inquiry</option>
              <option>Return/Exchange Request</option>
              <option>Feedback</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div
              className="form-group"
              style={{ flex: 1, minWidth: "250px" }}
            >
              <label>Your Name</label>
              <input type="text" placeholder="John Doe" />
            </div>

            <div
              className="form-group"
              style={{ flex: 1, minWidth: "250px" }}
            >
              <label>Order Number (Optional)</label>
              <input type="text" placeholder="#TF12345" />
            </div>
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea rows="5" placeholder="How can we help you today?" />
          </div>

          <button type="submit">Submit Request</button>
        </form>
      </div>

      <p className="footer-note">© 2026 TrioFit — Classic style, modern tech</p>
    </div>
  );
};

export default SupportTeam;