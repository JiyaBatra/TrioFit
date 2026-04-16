import React from "react";
import { Link } from "react-router-dom";

const OurStore = () => {
  return (
    <div className="c">
     

      <h1 style={{ color: "var(--white)" }}>Where We Operate</h1>
      <div className="bold-divider"></div>

      <p>
        TrioFit is a digital-first brand. We don't have physical walls because
        our tech belongs everywhere.
      </p>

      <div className="world-map-placeholder">
        🌍 Shipping to over 50+ countries worldwide.
      </div>

      <div className="online-grid">
        <div className="presence-card">
          <span className="icon">💻</span>
          <h3>Official Website</h3>
          <p>
            Your primary destination for the latest TrioFit drops and exclusive
            tech-wear tech.
          </p>
        </div>

        <div className="presence-card">
          <span className="icon">📱</span>
          <h3>Mobile App</h3>
          <p>
            Coming Soon to iOS and Android. Seamless shopping in the palm of
            your hand.
          </p>
        </div>

        <div className="presence-card">
          <span className="icon">📦</span>
          <h3>Global Logistics</h3>
          <p>
            Our warehouses are strategically located to ensure fast delivery to
            your doorstep, no matter where you are.
          </p>
        </div>
      </div>

      <hr
        className="bold-divider"
        style={{ marginTop: "60px", opacity: 0.3 }}
      />

      <p style={{ opacity: 0.6 }}>
        © 2026 TrioFit — Classic style, modern tech
      </p>
    </div>
  );
};

export default OurStore;