import type { Metadata } from "next";
import "./style.css";
import Image from "next/image";
import { Cpu, FileUser, HandCoins, LifeBuoy, MapPinHouse, QrCode, School, ShieldHalf } from "lucide-react";

export const metadata: Metadata = {
  title: "Underdecanopy Digital Hub | Business Centre & Cafe",
  description: "Underdecanopy Digital Hub is your trusted center for digital solutions, business services, and a relaxing cafe experience in Ibadan. We offer services like business registration, IT support, digital training, and more.",
};


export default function page() {
  return (
    <>
      <header>
        <div className="header-container">
          <a href="#" className="logo home-link">
            <h1>Underdecanopy<span>Digital</span></h1>
          </a>
          <nav id="mainNav">
            <a href="#" className="home-link">Home</a>
            <a href="#services">Our Core Services</a>
            <a href="#additional">Professional Services</a>
            <a href="#cafe">Cafe Experience</a>
            <a href="#podcast">Podcast</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="mobile-menu-btn" id="menuToggle" aria-label="Toggle menu">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </header>

      <section className="hero !py-10">
        <div className="container">
          <div className="flex justify-between flex-wrap items-center">
            <div className="text-left max-w-[550px]">
              <h1 className="text-sm">Welcome to Underdecanopy Digital Hub</h1>
              <p className="text-xs">Your trusted center for digital solutions, business services, and a relaxing cafe experience in Ibadan.</p>
              <a href="#contact" className="cta-animate">Get Started Today</a>
            </div>
            <Image src="/hub.png" alt="" className="hidden md:block md:w-[50%] rounded-full" width={1000} height={1000} />
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Services</h2>
            <p className="max-w-[400px] !mx-auto">Comprehensive digital solutions tailored to meet your business and personal needs</p>
          </div>

          {/* <div className="services-container">
            <a href="#" className="service-card">
              <div className="icon"><i className="fas fa-laptop-code"></i></div>
              <h3>TrustFix</h3>
              <p>Sales, Repairs & IT Support</p>
            </a>

            <a href="#" className="service-card">
              <div className="icon"><i className="fas fa-business-time"></i></div>
              <h3>Swift Wheel</h3>
              <p>Business Registration, CAC Returns & Co.</p>
            </a>

            <a href="#" className="service-card">
              <div className="icon"><i className="fas fa-graduation-cap"></i></div>
              <h3>TechLift</h3>
              <p>Computer & Digital Training</p>
            </a>

            <a href="#" className="service-card">
              <div className="icon"><i className="fas fa-file-alt"></i></div>
              <h3>ApplySmart</h3>
              <p>Admissions & Online Registration</p>
            </a>

            <a href="#" className="service-card">
              <div className="icon"><i className="fas fa-credit-card"></i></div>
              <h3>SchoolPay</h3>
              <p>School Fee Payments</p>
            </a>

            <a href="#" className="service-card">
              <div className="icon"><i className="fas fa-hand-holding-usd"></i></div>
              <h3>Digital Cooperative</h3>
              <p>Cooperative Banking & Loans</p>
            </a>

            <a href="#" className="service-card">
              <div className="icon"><i className="fas fa-baby"></i></div>
              <h3>State of Origin</h3>
              <p>Certificate Application</p>
            </a>

            <a href="#" className="service-card">
              <div className="icon"><i className="fas fa-receipt"></i></div>
              <h3>SmartTax Receipts</h3>
              <p>Digital Receipts, Record-Keeping & Tax Reporting</p>
            </a>
          </div> */}

          <div className="services-grid">
            <div className="service-detail">
              <h3 className="!gap-3"> <div className="!p-2 rounded-full bg-gray-300"><ShieldHalf size={40} /></div> TrustFix</h3>
              <p>Discover top-notch computer and accessories sales, expert repairs, upgrades, and reliable IT support all in one place.</p>
            </div>

            <div className="service-detail">
              <h3 className="!gap-3"><div className="!p-2 rounded-full bg-gray-300"><LifeBuoy size={40} /></div> Swift Wheel</h3>
              <p>Register your business and file annual returns with ease. We handle CAC processes quickly and professionally.</p>
            </div>

            <div className="service-detail">
              <h3 className="!gap-3"><div className="!p-2 rounded-full bg-gray-300"><Cpu size={40} /></div> TechLift</h3>
              <p>Advance your career with hands-on training in computers, programming, graphics, and digital technologies from certified experts.</p>
            </div>

            <div className="service-detail">
              <h3 className="!gap-3"><div className="!p-2 rounded-full bg-gray-300"><FileUser size={40} /></div> ApplySmart</h3>
              <p>Fast, easy, and reliable Post UTME, admission applications, and online registration for schools and universities.</p>
            </div>

            <div className="service-detail">
              <h3 className="!gap-3"><div className="!p-2 rounded-full bg-gray-300"><School size={40} /></div> SchoolPay</h3>
              <p>Make school fee payments simple and secure with our trusted online solutions for students and parents.</p>
            </div>

            <div className="service-detail">
              <h3 className="!gap-3"><div className="!p-2 rounded-full bg-gray-300"><QrCode size={40} /></div> Digital Cooperative</h3>
              <p>Enjoy secure, stress-free cooperative banking, easy savings, contributions, and instant loan access with minimal paperwork.</p>
            </div>

            <div className="service-detail">
              <h3 className="!gap-3"><div className="!p-2 rounded-full bg-gray-300"><MapPinHouse size={40} /></div> State of Origin</h3>
              <p>Apply for and receive official State of Origin certificates from any of the 36 states in Nigeria.</p>
            </div>

            <div className="service-detail">
              <h3 className="!gap-3"><div className="!p-2 rounded-full bg-gray-300"><HandCoins size={40} /></div>SmartTax Receipts</h3>
              <p>Our digital receipt system not only makes receiving receipts more convenient for your customers, it takes the stress out of customers having to hold onto their receipts when tax time rolls around.</p>
            </div>
          </div>
        </div>
      </section >

      <section className="additional-services" id="additional">
        <div className="container">
          <div className="section-header">
            <h2>Professional Services</h2>
            <p className="max-w-[400px] !mx-auto">Comprehensive solutions to meet all your business and personal needs</p>
          </div>

          <div className="services-grid-alt">
            <div className="service-alt-card">
              <div className="icon"><i className="fas fa-print"></i></div>
              <h3>Printing & Photocopy</h3>
              <p>High-quality document printing, photocopying, and scanning services.</p>
            </div>

            <div className="service-alt-card">
              <div className="icon"><i className="fas fa-video"></i></div>
              <h3>Church Media</h3>
              <p>Audio-visual support, live streaming, and media production for churches.</p>
            </div>

            <div className="service-alt-card">
              <div className="icon"><i className="fas fa-headset"></i></div>
              <h3>IT User Support</h3>
              <p>Technical assistance, troubleshooting, and user training for IT systems.</p>
            </div>

            <div className="service-alt-card">
              <div className="icon"><i className="fas fa-laptop"></i></div>
              <h3>School Management</h3>
              <p>Sales and setup of school management and e-learning software.</p>
            </div>

            <div className="service-alt-card">
              <div className="icon"><i className="fas fa-paint-brush"></i></div>
              <h3>Graphics Design</h3>
              <p>Professional presentations, flyers, banners, and graphic design services.</p>
            </div>

            <div className="service-alt-card">
              <div className="icon"><i className="fas fa-code"></i></div>
              <h3>Web Development</h3>
              <p>Custom websites, web apps, and online solutions for your business.</p>
            </div>

            <div className="service-alt-card">
              <div className="icon"><i className="fas fa-book-open"></i></div>
              <h3>Student Research Companion</h3>
              <p>Comprehensive research assistance including project topics, materials, and 24/7 support from experienced academic writers.</p>
            </div>

            <div className="service-alt-card">
              <div className="icon"><i className="fas fa-map-marked-alt"></i></div>
              <h3>Space Rentals & Delivery Services</h3>
              <p>We connect students with verified rentals and provide local delivery services across Ibadan.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cafe-section" id="cafe">
        <div className="container">
          <div className="section-header">
            <h2 style={{ color: "orange" }}>Cafe Experience</h2>
            <p className="max-w-[400px] !mx-auto">Enjoy snacks, meals, and beverages while you work or learn. Relax in our cozy cafe area.</p>
          </div>

          <div className="menu-grid">
            <div className="menu-card">
              <div className="menu-icon"><i className="fas fa-coffee"></i></div>
              <h3>Coffee & Tea</h3>
              <p>Freshly brewed coffee, herbal teas, and hot chocolate.</p>
            </div>

            <div className="menu-card">
              <div className="menu-icon"><i className="fas fa-cookie-bite"></i></div>
              <h3>Pastries & Snacks</h3>
              <p>Croissants, meat pies, doughnuts, chin-chin, and more.</p>
            </div>

            <div className="menu-card">
              <div className="menu-icon"><i className="fas fa-utensils"></i></div>
              <h3>Meals</h3>
              <p>Rice dishes, noodles, and light meals for busy days.</p>
            </div>

            <div className="menu-card">
              <div className="menu-icon"><i className="fas fa-glass-whiskey"></i></div>
              <h3>Cold Drinks</h3>
              <p>Soft drinks, bottled water, and fresh juices.</p>
            </div>

            <div className="menu-card">
              <div className="menu-icon"><i className="fas fa-star"></i></div>
              <h3>Daily Specials</h3>
              <p>Ask for our chef's special and combo offers.</p>
            </div>

            <div className="menu-card">
              <div className="menu-icon"><i className="fas fa-star"></i></div>
              <h3>Café Experience</h3>
              <p>Relax, work, or connect with others in our cozy cafe while enjoying our menu.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="podcast-section" id="podcast">
        <div className="container">
          <div className="podcast-content">
            <h2><i className="fas fa-podcast"></i> Underdecanopy Podcast</h2>
            <p>Tune in to our episodes for digital tips and business insights from Ibadan and beyond.</p>
            <a href="https://example.com/podcast" className="podcast-btn">Listen to Our Podcast</a>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="container">
          <div className="section-header">
            <h2>Contact Us</h2>
            <p className="max-w-[400px] !mx-auto">Reach out for inquiries, support, or to schedule a visit</p>
          </div>


          <div className="contact-container">
            <div className="contact-info">
              <h3>Get In Touch</h3>

              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Location</h4>
                  <p>Love Garden, Opposite Zenith Bank, North Campus, The Polytechnic, Ibadan, Oyo State.</p>
                </div>
              </div>

              <div className="contact-item">
                <i className="fas fa-phone-alt"></i>
                <div>
                  <h4>Phone</h4>
                  <p>+234 806 485 2108</p>
                </div>
              </div>

              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>underdecanopy@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <div>
                  <h4>Working Hours</h4>
                  <p>Monday - Friday: 9AM - 6PM</p>
                  <p>Saturday: 10AM - 4PM</p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <h3>Send a Message</h3>
              <form id="contactForm">
                <div className="form-group">
                  <label >Full Name</label>
                  <input type="text" id="name" placeholder="Enter your name" required />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" id="email" placeholder="Enter your email" required />
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" id="subject" placeholder="Enter subject" />
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea id="message" placeholder="Enter your message" required></textarea>
                </div>

                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>


      <footer>
        <div className="container">
          <div className="footer-container">
            <div className="footer-col">
              <h4>Underdecanopy Digital Hub</h4>
              <p>Your trusted center for digital solutions, business services, and a relaxing cafe experience in Ibadan.</p>
              <div className="social-links">
                <a href="https://facebook.com/underdecanopy" target="_blank" rel="noopener"><i className="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com/underdecanopy" target="_blank" rel="noopener"><i className="fab fa-twitter"></i></a>
                <a href="https://instagram.com/underdecanopy" target="_blank" rel="noopener"><i className="fab fa-instagram"></i></a>
                <a href="https://linkedin.com/company/underdecanopy" target="_blank" rel="noopener"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#" className="home-link">Home</a></li>
                <li><a href="#additional">Professional Services</a></li>
                <li><a href="#services">Core Services</a></li>
                <li><a href="#cafe">Cafe Experience</a></li>
                <li><a href="#podcast">Podcast</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Our Services</h4>
              <ul className="footer-links">
                <li><a href="#">TrustFix</a></li>
                <li><a href="#">Swift Wheel</a></li>
                <li><a href="#">TechLift</a></li>
                <li><a href="#">ApplySmart</a></li>
                <li><a href="#">SchoolPay</a></li>
                <li><a href="#">Digital Cooperative</a></li>
                <li><a href="#">State of Origin</a></li>
                <li><a href="#">SmartTax Receipts</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Newsletter</h4>
              <p>Subscribe for updates and offers.</p>
              <form id="newsletterForm">
                <div className="form-group">
                  <input type="email" placeholder="Enter your email" required style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "none" }} />
                </div>
                <button type="submit" className="submit-btn" style={{ marginTop: "10px" }}>Subscribe</button>
              </form>
            </div>
          </div>

          <div className="copyright">
            <p>&copy; 2025 Underdecanopy Digital Hub. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <div className="chatbot-widget" id="chatbotWidget">
        <div className="chatbot-header">
          <span>Chat with us</span>
        </div>
        <div id="chat-box" className="chat-box"></div>
        <div className="chatbot-input">
          <input type="text" id="chat-input" placeholder="Type a message..." />
          <button id="chat-send"><i className="fas fa-paper-plane"></i></button>
        </div>
      </div>
      <div className="chat-toggle" id="chatToggle">
        <i className="fas fa-comment"></i>
      </div>

      <a href="https://wa.me/2348064852108?text=Hello%20Underdecanopy%20Digital%20Hub!%20I%20have%20an%20enquiry." className="whatsapp-float" aria-label="Chat on WhatsApp" target="_blank" rel="noopener">
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  )
}
