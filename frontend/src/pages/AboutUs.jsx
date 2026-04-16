import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <>
     

      <div className="c">
        <h1>Who We Are</h1>
        <hr className="bold-divider" />

        <p>
          Founded in 2026, <strong>TrioFit</strong> started with a simple idea: Why
          should you have to choose between looking classic and feeling
          comfortable? We noticed that traditional fashion was too stiff, and
          modern tech-wear was too "sporty" for everyday life.
        </p>

        <div className="mission-grid">
          <div>
            <h3>The Classic Style</h3>
            <p>
              We use timeless silhouettes—the blazers, chinos, and essential
              tees—that never go out of fashion.
            </p>
          </div>
          <div>
            <h3>The Modern Tech</h3>
            <p>
              Our fabrics are infused with sweat-wicking, 4-way stretch, and
              temperature-regulating technology.
            </p>
          </div>
        </div>

        <h1>Our Mission</h1>
        <hr className="bold-divider" />

        <p>
          To empower the modern individual with apparel that works as hard as
          they do. Whether you're in a boardroom meeting or a long-haul flight,
          TrioFit ensures you look sharp and feel effortless.
        </p>

        <p
          style={{
            textAlign: "center",
            marginTop: "50px",
            fontStyle: "italic",
            opacity: 0.7,
          }}
        >
          "Classic style, modern tech — This is the TrioFit way."
        </p>
      </div>
    </>
  );
};

export default AboutUs;