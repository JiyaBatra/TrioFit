import React, { useState } from 'react'

const faqItems = [
  {
    question: 'How can I track my TrioFit order?',
    answer:
      'Once your order is shipped, you will receive an email with a tracking number and a link. You can also track it directly from the "My Orders" section in your account.',
  },
  {
    question: 'What is the return policy?',
    answer:
      "We offer a 30-day return policy for all unworn and unwashed items with original tags. Please visit our 'Return & Exchange' page for more details.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit/debit cards, UPI (Google Pay, PhonePe), Net Banking, and Cash on Delivery (COD) for domestic orders.',
  },
  {
    question: 'How do I know my size?',
    answer:
      "Every product page has a detailed 'Size Guide'. Since TrioFit uses modern tech-fabrics, our fit is 'True to Size'. If you're between sizes, we recommend sizing up.",
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes, TrioFit ships to over 50 countries! Shipping costs and delivery times vary depending on your location and will be calculated at checkout.',
  },
  {
    question: 'How should I wash my TrioFit tech-wear?',
    answer:
      'To maintain the fabric tech, we recommend machine washing in cold water on a gentle cycle and air drying. Avoid using bleach or fabric softeners.',
  },
  {
    question: 'Can I cancel my order after placing it?',
    answer:
      'Orders can be cancelled within 12 hours of placement. Once the order has been processed or shipped, it cannot be cancelled but can be returned later.',
  },
]

const Frequentlyaskedques = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleIndex = index => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="c">
    
      <h1>Frequently Asked Questions</h1>

      <hr className="bold-divider" />

      {faqItems.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
            <button type="button" className="faq-question" onClick={() => toggleIndex(index)}>
              <span>{item.question}</span>
              <span>{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen && <div className="faq-answer">{item.answer}</div>}
          </div>
        )
      })}

      <hr className="bold-divider" />
      <p className="footer-text">© 2026 TrioFit — Classic style, modern tech</p>
    </div>
  )
}

export default Frequentlyaskedques
