'use client';

import Image from 'next/image';
import styles from './techlift.module.css';

export default function TechLiftPage() {
    return (
        <div className={styles.pageWrapper}>
            <main>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.container}>
                        <div className={styles.heroContent}>
                            <div className={styles.heroText}>
                                <h1>Advance Your Career with <span>Hands-On Tech Training</span></h1>
                                <p>Master in-demand skills in computers, programming, graphics, and digital technologies with certified experts. Launch your tech career with confidence.</p>
                                <div className={styles.heroBtns}>
                                    <a href="#courses" className={styles.btn}>Explore Courses</a>
                                    <a href="#contact" className={`${styles.btn} ${styles.btnSecondary}`}>Talk to an Advisor</a>
                                </div>
                            </div>
                            <div className={styles.heroImage}>
                                <Image 
                                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&h=500&q=80" 
                                    alt="A person coding on a laptop, representing TechLift Training"
                                    width={600}
                                    height={500}
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section id="about" className={styles.features}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <h2>Why Choose TechLift?</h2>
                            <p>Our proven approach to tech education sets you up for career success</p>
                        </div>
                        <div className={styles.featuresGrid}>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>
                                    <span className="fas fa-laptop-code" aria-hidden="true"></span>
                                </div>
                                <h3>Hands-On Learning</h3>
                                <p>Learn by doing with real-world projects and practical exercises that build your portfolio.</p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>
                                    <span className="fas fa-chalkboard-teacher" aria-hidden="true"></span>
                                </div>
                                <h3>Expert Instructors</h3>
                                <p>Learn from industry professionals with years of experience in their respective fields.</p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}>
                                    <span className="fas fa-briefcase" aria-hidden="true"></span>
                                </div>
                                <h3>Career Support</h3>
                                <p>Get job placement assistance, resume reviews, and interview preparation.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Courses */}
                <section id="courses" className={styles.courses}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <h2>Popular Training Programs</h2>
                            <p>Transform your career with our industry-relevant courses</p>
                        </div>
                        <div className={styles.coursesGrid}>
                            <div className={styles.courseCard}>
                                <div className={styles.courseImage}>
                                    <span className="fas fa-code" aria-hidden="true"></span>
                                </div>
                                <div className={styles.courseContent}>
                                    <h3>Full-Stack Web Development</h3>
                                    <p>Master front-end and back-end technologies to build complete web applications.</p>
                                    <a href="#contact" className={styles.btn}>Learn More</a>
                                    <div className={styles.courseMeta}>
                                        <span><span className="far fa-clock" aria-hidden="true"></span> 12 Weeks</span>
                                        <span><span className="fas fa-user-graduate" aria-hidden="true"></span> Advanced</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.courseCard}>
                                <div className={styles.courseImage}>
                                    <span className="fas fa-paint-brush" aria-hidden="true"></span>
                                </div>
                                <div className={styles.courseContent}>
                                    <h3>Digital Design & Graphics</h3>
                                    <p>Create stunning visuals with industry-standard tools and design principles.</p>
                                    <a href="#contact" className={styles.btn}>Learn More</a>
                                    <div className={styles.courseMeta}>
                                        <span><span className="far fa-clock" aria-hidden="true"></span> 8 Weeks</span>
                                        <span><span className="fas fa-user-graduate" aria-hidden="true"></span> Beginner</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.courseCard}>
                                <div className={styles.courseImage}>
                                    <span className="fas fa-mobile-alt" aria-hidden="true"></span>
                                </div>
                                <div className={styles.courseContent}>
                                    <h3>Mobile App Development</h3>
                                    <p>Build native and cross-platform mobile applications for iOS and Android.</p>
                                    <a href="#contact" className={styles.btn}>Learn More</a>
                                    <div className={styles.courseMeta}>
                                        <span><span className="far fa-clock" aria-hidden="true"></span> 10 Weeks</span>
                                        <span><span className="fas fa-user-graduate" aria-hidden="true"></span> Intermediate</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section id="testimonials" className={styles.testimonials}>
                    <div className={styles.container}>
                        <div className={styles.sectionHeader}>
                            <h2>Success Stories</h2>
                            <p>Hear from our graduates who transformed their careers with TechLift</p>
                        </div>
                        <div className={styles.testimonialGrid}>
                            <div className={styles.testimonialCard}>
                                <div className={styles.testimonialHeader}>
                                    <div className={styles.testimonialAvatar}>
                                        <span className="fas fa-user" aria-hidden="true"></span>
                                    </div>
                                    <div className={styles.testimonialInfo}>
                                        <h4>Sarah Johnson</h4>
                                        <p>Web Developer at TechCorp</p>
                                    </div>
                                </div>
                                <div className={styles.testimonialContent}>
                                    <p>TechLift&apos;s Full-Stack program gave me the skills and confidence to transition from marketing to web development. Within 3 months of completing the course, I landed my dream job!</p>
                                </div>
                            </div>
                            <div className={styles.testimonialCard}>
                                <div className={styles.testimonialHeader}>
                                    <div className={styles.testimonialAvatar}>
                                        <span className="fas fa-user" aria-hidden="true"></span>
                                    </div>
                                    <div className={styles.testimonialInfo}>
                                        <h4>Michael Chen</h4>
                                        <p>UI/UX Designer at DesignHub</p>
                                    </div>
                                </div>
                                <div className={styles.testimonialContent}>
                                    <p>The hands-on approach and industry connections at TechLift were invaluable. My instructor&apos;s feedback on my portfolio helped me stand out in a competitive job market.</p>
                                </div>
                            </div>
                            <div className={styles.testimonialCard}>
                                <div className={styles.testimonialHeader}>
                                    <div className={styles.testimonialAvatar}>
                                        <span className="fas fa-user" aria-hidden="true"></span>
                                    </div>
                                    <div className={styles.testimonialInfo}>
                                        <h4>David Rodriguez</h4>
                                        <p>Mobile Developer at AppWorks</p>
                                    </div>
                                </div>
                                <div className={styles.testimonialContent}>
                                    <p>After struggling with online tutorials, TechLift&apos;s structured curriculum and mentor support helped me master mobile development concepts that I now use daily in my job.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.cta}>
                    <div className={styles.container}>
                        <h2>Ready to Transform Your Career?</h2>
                        <p>Join thousands of successful graduates who launched their tech careers with TechLift&apos;s industry-focused training programs.</p>
                        <a href="#contact" className={styles.btn}>Start Your Journey Today</a>
                    </div>
                </section>

                {/* Footer */}
                <footer id="contact" className={styles.footer}>
                    <div className={styles.container}>
                        <div className={styles.footerGrid}>
                            <div className={styles.footerColumn}>
                                <h3>TechLift</h3>
                                <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>Advancing careers through hands-on tech education.</p>
                                <div className={styles.socialLinks}>
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><span className="fab fa-facebook-f" aria-hidden="true"></span></a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><span className="fab fa-twitter" aria-hidden="true"></span></a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><span className="fab fa-instagram" aria-hidden="true"></span></a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><span className="fab fa-linkedin-in" aria-hidden="true"></span></a>
                                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><span className="fab fa-youtube" aria-hidden="true"></span></a>
                                </div>
                            </div>
                            <div className={styles.footerColumn}>
                                <h3>Quick Links</h3>
                                <ul className={styles.footerLinks}>
                                    <li><a href="#home">Home</a></li>
                                    <li><a href="#courses">Courses</a></li>
                                    <li><a href="#about">About Us</a></li>
                                    <li><a href="#testimonials">Testimonials</a></li>
                                </ul>
                            </div>
                            <div className={styles.footerColumn}>
                                <h3>Programs</h3>
                                <ul className={styles.footerLinks}>
                                    <li><a href="#courses">Web Development</a></li>
                                    <li><a href="#courses">Graphic Design</a></li>
                                    <li><a href="#courses">Mobile Development</a></li>
                                </ul>
                            </div>
                            <div className={styles.footerColumn}>
                                <h3>Contact Us</h3>
                                <div className={styles.footerContact}>
                                    <p><span className="fas fa-map-marker-alt" aria-hidden="true"></span> 123 Tech Street, San Francisco, CA</p>
                                    <p><span className="fas fa-phone-alt" aria-hidden="true"></span> (555) 123-4567</p>
                                    <p><span className="fas fa-envelope" aria-hidden="true"></span> info@techlift.com</p>
                                    <p><span className="fas fa-clock" aria-hidden="true"></span> Mon-Fri: 9AM - 6PM</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.copyright}>
                            <p>&copy; 2024 TechLift. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}