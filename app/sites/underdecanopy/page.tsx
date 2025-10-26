import ContactForm from '@/components/ContactForm';

export default function UnderdecanopyPage() {
  return (
    <div className="container">
      <header>
        <h1>Underdecanopy</h1>
        <p className="tagline">Empowering Communities Through Digital Innovation</p>
      </header>

      <section className="hero">
        <h2>Welcome to Underdecanopy</h2>
        <p>
          We are a technology company dedicated to building digital solutions that empower
          communities, cooperatives, and individuals across Africa. Our suite of products
          addresses real challenges in finance, education, compliance, and skills development.
        </p>
      </section>

      <section className="products">
        <h2>Our Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <h3>CoopHub</h3>
            <p>Digital cooperative banking platform for transparent financial management</p>
            <a href="https://coophub.underdecanopy.com">Learn More →</a>
          </div>

          <div className="product-card">
            <h3>ApplySmart</h3>
            <p>Automated scholarship and admission application platform</p>
            <a href="https://applysmart.underdecanopy.com">Learn More →</a>
          </div>

          <div className="product-card">
            <h3>SmartTax</h3>
            <p>Digital tax assistant for simplified compliance</p>
            <a href="https://smarttax.underdecanopy.com">Learn More →</a>
          </div>

          <div className="product-card">
            <h3>SwiftWheel</h3>
            <p>CAC registration and corporate compliance services</p>
            <a href="https://swiftwheel.underdecanopy.com">Learn More →</a>
          </div>

          <div className="product-card">
            <h3>TechLift</h3>
            <p>Tech skills accelerator for the next generation</p>
            <a href="https://techlift.underdecanopy.com">Learn More →</a>
          </div>

          <div className="product-card">
            <h3>TrustFix</h3>
            <p>Trust-based repair and maintenance platform</p>
            <a href="https://trustfix.underdecanopy.com">Learn More →</a>
          </div>
        </div>
      </section>

      <section className="contact">
        <h2>Get In Touch</h2>
        <p>Have questions or want to learn more about our products? Contact us below.</p>
        <ContactForm purpose="General Inquiry" />
      </section>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        header {
          text-align: center;
          padding: 3rem 0;
          border-bottom: 2px solid #2c5530;
        }

        h1 {
          color: #2c5530;
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }

        .tagline {
          font-size: 1.25rem;
          color: #666;
        }

        .hero {
          padding: 3rem 0;
          text-align: center;
        }

        .hero h2 {
          color: #2c5530;
          margin-bottom: 1rem;
        }

        .hero p {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #444;
          max-width: 800px;
          margin: 0 auto;
        }

        .products {
          padding: 3rem 0;
        }

        .products h2 {
          text-align: center;
          color: #2c5530;
          margin-bottom: 2rem;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .product-card {
          background: #f9f9f9;
          padding: 2rem;
          border-radius: 8px;
          border: 1px solid #ddd;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .product-card h3 {
          color: #2c5530;
          margin-bottom: 0.5rem;
        }

        .product-card p {
          color: #666;
          margin-bottom: 1rem;
        }

        .product-card a {
          color: #2c5530;
          text-decoration: none;
          font-weight: 600;
        }

        .product-card a:hover {
          text-decoration: underline;
        }

        .contact {
          padding: 3rem 0;
          text-align: center;
        }

        .contact h2 {
          color: #2c5530;
          margin-bottom: 1rem;
        }

        .contact p {
          margin-bottom: 2rem;
          color: #666;
        }
      `}</style>
    </div>
  );
}