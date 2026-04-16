import React from "react";
import { Link } from "react-router-dom";

const CareerOpportunities = () => {
  return (
    <>
     
      <div className="c">
        <h1>Open Positions</h1>
        <hr className="bold-divider" />

        <div className="job-grid">
          <div className="job-card">
            <div className="job-info">
              <h3>Fabric Technology Engineer</h3>
              <p>Remote • Full-Time • R&D Department</p>
            </div>
            <a href="mailto:careers@triofit.com" className="apply-btn">
              Apply Now
            </a>
          </div>

          <div className="job-card">
            <div className="job-info">
              <h3>UI/UX Product Designer</h3>
              <p>Hybrid • Full-Time • Creative Team</p>
            </div>
            <a href="mailto:careers@triofit.com" className="apply-btn">
              Apply Now
            </a>
          </div>

          <div className="job-card">
            <div className="job-info">
              <h3>Supply Chain Manager</h3>
              <p>On-site • Full-Time • Operations</p>
            </div>
            <a href="mailto:careers@triofit.com" className="apply-btn">
              Apply Now
            </a>
          </div>
        </div>
      </div>

      <div className="culture-section">
        <div className="container">
          <h2>Why Work With Us?</h2>
          <p>
            At TrioFit, we don't just follow trends—we build the future of
            apparel. Enjoy flexible working hours, health benefits, and a
            culture that values "Modern Tech" in everything we do.
          </p>

          <hr
            className="bold-divider"
            style={{ margin: "20px auto" }}
          />

          <p style={{ opacity: 0.6 }}>
            © 2026 TrioFit — Classic style, modern tech
          </p>
        </div>
      </div>
    </>
  );
};

export default CareerOpportunities;