import React from 'react'

const ReturnAndExchange = () => {
  return (
    <>
    
    <div className="c">
     
      <h1>Return & Exchange Policy </h1>

      <hr className="bold-divider" />

      <p>
        At <strong>TrioFit</strong>, we take pride in our "Classic style, modern tech" philosophy.
        If the fit isn't perfect or the tech doesn't meet your expectations, we’ve made our
        return process as seamless as our fabrics.
      </p>

      <div className="info-grid">
        <div className="info-card">
          <strong>30-Day Window</strong>
          <p>You have 30 calendar days from the delivery date to initiate a return or exchange.</p>
        </div>
        <div className="info-card">
          <strong>Free Exchanges</strong>
          <p>Size not right? We offer one free exchange per order to ensure you get the perfect fit.</p>
        </div>
      </div>

      <h3>1. Eligibility Criteria</h3>
      <ul>
        <li>Items must be in original condition (unworn, unwashed, and unused).</li>
        <li>All original TrioFit tags and packaging must be intact.</li>
        <li>Proof of purchase (Order ID) is mandatory for processing.</li>
      </ul>

      <h3>2. Non-Returnable Items</h3>
      <p>
        For hygiene reasons, certain items like innerwear, socks, and personalized/customized tech-wear
        cannot be returned or exchanged unless there is a manufacturing defect.
      </p>

      <h3>3. Refund Process</h3>
      <p>
        Once we receive and inspect your returned item, your refund will be processed within
        <strong>5-7 business days</strong>. The amount will be credited back to your original payment
        method (Credit Card, UPI, or Bank Account).
      </p>

      <h3>4. Damaged or Defective Goods</h3>
      <p>
        If you receive a damaged product, please contact our{' '}
        <a href="/support" style={{ color: 'var(--lavender)' }}>
          Support Team
        </a>{' '}
        within 48 hours of delivery with photos of the defect.
      </p>

      <hr className="bold-divider" />
      <p className="footer-text">© 2026 TrioFit — Classic style, modern tech</p>
    </div>
    </>
  )
}

export default ReturnAndExchange;