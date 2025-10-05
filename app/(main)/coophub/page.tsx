import "./style.css"
import { Navigation } from './_component/Navigation'
import { Apple, Globe, MessageCircle, PhoneCall, Play } from "lucide-react"

export default function page() {
    return (
        <>
            {/* <!-- Header --> */}
            <Navigation />
            {/* 
             <!-- Hero Section --> */}
            <section className="hero" id="home">
                <div className="container">
                    <h1>Secure Your Future, One Small Saving at a Time.</h1>
                    <p>SkoolPay by Underdecanopy Digital Hub is the secure, transparent, and smarter way to manage your school fees.</p>
                    <a href="#community" className="cta-button">Join the Community</a>
                </div>
            </section>

            {/* <!-- Benefits Section --> */}
            <section className="benefits">
                <div className="container">
                    <h2 className="section-title text-2xl font-bold">Why SkoolPay?</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon"><span role="img" aria-label="Lock Icon">🔒</span></div>
                            <h3 className="font-bold !mb-2">Total Transparency & Security</h3>
                            <p>Every transaction is securely recorded on the CoopHub platform by Wema Bank. Your data is protected with full digital footprints for peace of mind.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon"><span role="img" aria-label="Money Bag Icon">💰</span></div>
                            <h3 className="font-bold !mb-2">Build Financial Discipline</h3>
                            <p>Ditch the last-minute panic. Save gradually and make school fees manageable, breaking free from the stressful "fire-brigade" approach.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon"><span role="img" aria-label="Target Icon">🎯</span></div>
                            <h3 className="font-bold !mb-2">You're in Control</h3>
                            <p>Your money, your rules. Withdraw wallet savings anytime and request contribution refunds with ease.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- How It Works Section --> */}
            <section className="steps" id="how-it-works">
                <div className="container">
                    <h2 className="section-title text-2xl font-bold !text-white">Your Journey to Stress-Free Fee Payment</h2>

                    <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3 className="font-bold text-xl">Direct Message Us</h3>
                            <p>Send your <strong>Matric Number, Email Address, and Phone Number</strong> to our official <strong>@skoolpay</strong> channel on Instagram or WhatsApp <strong>+234 806 485 2108</strong>.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3 className="font-bold text-xl">Download the CoopHub App</h3>
                            <p>Get the app from the Google Play Store, Apple App Store, or access it via the web.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3 className="font-bold text-xl">Register & Log In</h3>
                            <p>Use the secure login credentials sent to your email to access your account.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h3 className="font-bold text-xl">Complete Your KYC</h3>
                            <p>Finalize your setup on the CoopHub platform. <strong style={{ color: "#FF0000" }}>For your security, we never see or store your NIN, BVN, or PIN.</strong> These are handled directly and securely by Wema Bank.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- FAQ Section --> */}
            <section className="faq" id="faq">
                <div className="container">
                    <h2 className="section-title text-2xl font-bold">Frequently Asked Questions</h2>

                    <div className="faq-item">
                        <div className="faq-question">
                            <span><strong>Is my money and personal data safe?</strong></span>
                            <span>+</span>
                        </div>
                        <div className="faq-answer">
                            <p>Yes. SkoolPay is powered by CoopHub, a platform operated by Wema Bank, a licensed financial institution. Your most sensitive data (NIN, BVN) is collected, encrypted, and stored directly by Wema Bank under their stringent security controls. Our own privacy policy excludes this data.</p>
                        </div>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question">
                            <span><strong>Are there any hidden fees?</strong></span>
                            <span>+</span>
                        </div>
                        <div className="faq-answer">
                            <p>SkoolPay is built on transparency. All applicable platform or transaction fees will be clearly displayed to you before you confirm any transaction. There are no hidden charges.</p>
                        </div>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question">
                            <span><strong>Can I get my money back if I need it?</strong></span>
                            <span>+</span>
                        </div>
                        <div className="faq-answer">
                            <p>
                                Yes. You have two levels of access:<br />
                                1. <strong>Wallet Savings:</strong> You can withdraw these at any time, no permission needed.<br />
                                2. <strong>Fee Contributions:</strong> You can submit a refund request, which we process back to your wallet within <strong>24-48 business hours.</strong> You can then withdraw it.
                            </p>
                        </div>
                    </div>

                    {/* <!-- Add more FAQ items as needed --> */}
                </div>
            </section>

            {/* <!-- Contact Section --> */}
            <section className="contact" id="contact">
                <div className="container">
                    <h2 className="section-title section-title-light">We're Here to Help</h2>
                    <p className="text-center !m-5">Can't find what you're looking for? Reach out to our support team.</p>

                    <div className="contact-methods">
                        <div className="contact-method">
                            <div className="contact-icon"><span role="img" aria-label="Email Icon">✉️</span></div>
                            <h3 className="font-bold">Email Us</h3>
                            <p><a href="mailto:support@skoolpay.ng">support@skoolpay.ng</a></p>
                        </div>
                        <div className="contact-method">
                            <div className="contact-icon"><span role="img" aria-label="Chat Icon">💬</span></div>
                            <h3 className="font-bold">Message on WhatsApp</h3>
                            <p><a href="https://wa.me/2348064852108">+234 806 485 2108</a></p>
                        </div>
                        <div className="contact-method">
                            <div className="contact-icon"><span role="img" aria-label="Globe Icon">🌐</span></div>
                            <h3 className="font-bold">Follow & DM</h3>
                            <p>Follow <strong>@skoolpay</strong> on all social media platforms</p>
                        </div>
                    </div>

                    <div style={{ backgroundColor: "#222222", padding: "1.5rem", borderRadius: "5px" }} className="border-l-2 border-l-[#1a237e]">
                        <p className="m-0 text-gray-400"><strong>Security Note:</strong> For your protection, please never send sensitive information like your NIN, BVN, or wallet PIN via email or social media. These details are only collected securely within the CoopHub app.</p>
                    </div>
                </div>
            </section>

            {/* <!-- Community Section --> */}
            <section className="community" id="community">
                <div className="container">
                    <h2 className="!mb-3 text-xl font-bold">Ready to Take Control of Your Education Funds?</h2>
                    <p className="!mb-5">Be among the first to experience SkoolPay. Connect with us today to get started!</p>

                    <form className="community-form">
                        <div className="form-group">
                            <label >Email Address</label>
                            <input type="email" id="email-input" className="bg-white text-black" placeholder="Enter your email address" required />
                        </div>
                        <div className="form-group">
                            <label >Phone Number</label>
                            <input type="tel" id="phone-input" className="bg-white text-black" placeholder="Enter your phone number" required />
                        </div>
                        <button type="submit" className="submit-btn">Connect Me</button>
                    </form>
                </div>
            </section>
            {/* <!-- Get Started Section --> */}
            <section id="get-started">
                <div className="container">
                    <div className="section-header">
                        <h2>📞 Get Started Today</h2>
                        <p>Join thousands of people who are enjoying stress-free school fee management.</p>
                    </div>

                    <div className="cta-buttons">
                        <a href="tel:08064852108" className="cta-button phone-button">
                            <PhoneCall className="!mr-2" /> Call: 080-6485-2108
                        </a>
                        <span className="separator" role="separator">OR</span>
                        <a href="https://wa.me/2348064852108" className="cta-button whatsapp-button">
                            <MessageCircle className="!mr-2" /> WhatsApp
                        </a>
                    </div>

                    <div className="download-section">
                        <p>Download the app now and begin managing your school fees.</p>
                        <div className="download-buttons">
                            <a href="https://apps.apple.com/ng/app/coophub/id6502437864" className="download-button app-store">
                                <Apple className="!mr-2" /> App Store
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=alat.ng.coophub" className="download-button play-store">
                                <Play className="!mr-2" /> Play Store
                            </a>
                            <a href="https://coophub.alat.ng/login" className="download-button web-app">
                                <Globe className="!mr-2" /> Web App
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Footer --> */}
            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div>
                            <div className="footer-logo">SkoolPay</div>
                            <p>A product of Underdecanopy Digital Hub</p>
                            <p>(TIK Centre).</p>
                        </div>
                        <div className="footer-links">
                            <a href="#home">Home</a>
                            <a href="#how-it-works">How It Works</a>
                            <a href="#faq">FAQ</a>
                            <a href="#contact">Contact</a>
                        </div>
                        <div className="footer-social">
                            <p>Follow us: @skoolpay</p>
                            <a href="https://facebook.com/skoolpay" aria-label="Follow us on Facebook"><i className="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
                            <a href="https://twitter.com/skoolpay" aria-label="Follow us on Twitter"><i className="fa-brands fa-twitter" aria-hidden="true"></i></a>
                            <a href="https://instagram.com/skoolpay" aria-label="Follow us on Instagram"><i className="fa-brands fa-instagram" aria-hidden="true"></i></a>
                            <a href="https://youtube.com/skoolpay" aria-label="Follow us on YouTube"><i className="fa-brands fa-youtube" aria-hidden="true"></i></a>
                            <a href="https://tiktok.com/skoolpay" aria-label="Follow us on Tiktok"><i className="fa-brands fa-tiktok" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <p>&copy; 2025 SkoolPay. All rights reserved.</p>
                    </div>
                </div>
            </footer>
            <a href="https://wa.me/2348064852108?text=Hello%20SkoolPay!%20I%20have%20an%20enquiry." className="whatsapp-float" aria-label="Chat on WhatsApp" target="_blank" rel="noopener">
                <i className="fab fa-whatsapp" aria-hidden="true"></i>
            </a>
        </>
    )
}
