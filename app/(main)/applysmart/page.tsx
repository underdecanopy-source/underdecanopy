import type { Metadata } from "next";
import "./style.css";
import StepCard from "./_components/StepCard";
import AdmissionCalculator from "./_components/AdmissionCalculator";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { ContactSection } from "@/components/contact/ContactSection";
import { MobileOptimizedFooter } from "@/components/contact/MobileOptimizedFooter";
import { federalUniversities, stateUniversities, polytechnics, firstTierCourses, secondTierCourses, thirdTierCourses, states } from "@/lib/data/applysmart";

export const metadata: Metadata = {
    title: "ApplySmart - Nigerian Admission & Scholarship Support | Underdecanopy",
    description: "ApplySmart helps Nigerian applicants find admission options and scholarships. Submit your top 3 choices for a tailored admission report and scholarship matches. Get instant admission chance calculations based on JAMB scores.",
};

export default function page() {
    return (
        <>
            <main data-page="applysmart">
                <section className="hero" aria-labelledby="hero-title">
                    <div className="container">
                        <div className="hero-inner">
                            <div className="hero-copy">
                                <h1 id="hero-title">Your Path to University Admission and Scholarships Starts Here</h1>
                                <p>Get personalized admission guidance and scholarship matches based on JAMB CAPS protocols. We analyze your top three choices and provide a detailed report.</p>

                                <div className="hero-ctas" role="region" aria-label="Primary actions">
                                    <a className="btn btn-primary" href="#admission-form">Check Admission Opportunities</a>
                                    <button className="btn btn-ghost" id="learnMoreBtn" type="button">How it works <i className="fas fa-arrow-right"></i></button>
                                </div>

                                <div className="mt-6">
                                    <div className="section-title">

                                        <p className="section-sub">Get an instant assessment of your admission chances based on JAMB score only</p>
                                    </div>
                                    <form id="mini-calculator-form" className="mini-form" aria-label="Mini instant admission chance calculator">
                                        <select id="mini_calc_institution" name="mini_calc_institution" required>
                                            <option value="">Preferred Institution *</option>

                                            <optgroup label="Federal Universities">
                                                {federalUniversities.map(uni => <option key={uni.value} value={uni.value}>{uni.label}</option>)}
                                            </optgroup>

                                            <optgroup label="State Universities">
                                                {stateUniversities.map(uni => <option key={uni.value} value={uni.value}>{uni.label}</option>)}
                                            </optgroup>


                                            <optgroup label="Polytechnics">
                                                {polytechnics.map(poly => <option key={poly.value} value={poly.value}>{poly.label}</option>)}
                                            </optgroup>
                                        </select>
                                        <select id="mini_calc_course" name="mini_calc_course" required>
                                            <option value="">Preferred Course *</option>
                                            <optgroup label="First Tier (Cutoff: 240+)">
                                                {firstTierCourses.map(course => <option key={course.value} value={course.value}>{course.label}</option>)}
                                            </optgroup>
                                            <optgroup label="Second Tier (Cutoff: 200-239)">
                                                {secondTierCourses.map(course => <option key={course.value} value={course.value}>{course.label}</option>)}
                                            </optgroup>
                                            <optgroup label="Third Tier (Cutoff: 160-199)">
                                                {thirdTierCourses.map(course => <option key={course.value} value={course.value}>{course.label}</option>)}
                                            </optgroup>
                                        </select>
                                        <input type="number" id="mini_calc_score" name="mini_calc_score" placeholder="JAMB Score" min="0" max="400" required />
                                        <button type="submit" className="mini-submit">Assess </button>
                                    </form>
                                    <div id="mini-calculator-result" className="calculator-result hidden">
                                        <div className="result-header">
                                            <h3>Your Admission Chance</h3>
                                            <div className="chance-percent" id="mini-chance-percent">0%</div>
                                        </div>
                                        <div className="chance-meter">
                                            <div className="chance-fill w-0" id="mini-chance-fill"></div>

                                        </div>
                                        <div className="chance-explanation" id="mini-chance-explanation"></div>
                                        <div className="factors-wrap">
                                            <h4>Key Factors</h4>
                                            <ul className="factors-list" id="mini-factors-list"></ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hero-image">
                                <Image loading="lazy" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480' viewBox='0 0 640 480'%3E%3Crect width='100%25' height='100%25' fill='%230056b3'/%3E%3Cpath d='M320,120 L440,200 L440,360 L200,360 L200,200 Z' fill='%23ff6b00'/%3E%3Ccircle cx='320' cy='240' r='60' fill='%2300a651'/%3E%3Cpath d='M240,360 L400,360 L400,400 L240,400 Z' fill='%2300a651'/%3E%3Cpath d='M280,120 L360,120 L360,160 L280,160 Z' fill='%2300a651'/%3E%3Ctext x='320' y='420' text-anchor='middle' fill='white' font-family='Poppins' font-size='24' font-weight='bold'%3EApplySmart%3C/text%3E%3C/svg%3E" alt="Illustration of ApplySmart service helping students with university admissions" width={640} height={480} />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" aria-labelledby="how-it-works-title">
                    <div className="container">
                        <div className="section-title">
                            <h2 id="how-it-works-title">How ApplySmart Works</h2>
                            <p className="section-sub">Our simple 3-step process helps you navigate the admission landscape with confidence</p>
                        </div>

                        <div className="steps">
                            <StepCard number="1" name="Submit Your Preferences" description="Start by sharing your top three institution choices, your preferred courses, and your JAMB score. Our system uses this information to evaluate your chances of admission. We consider: (i) The official cut-off marks for each course, (ii) Catchment area policies that favour candidates from specific regions, and (iii) Educationally Less Developed States (ELDS) considerations that improve access for applicants from those states. You are not alone in your admission journey." />
                            <StepCard number="2" name="Receive Your Analysis Within 48 Hours" description="Get a detailed admission report that shows your chances for each institution you selected, along with alternative options with stronger prospects. Upgrade to premium for additional benefits: (i) Direct access to our expert team through calls or WhatsApp, (ii) Step-by-step guidance on admission requirements and deadlines, (iii) Full support with your application processing to reduce errors and delays. You are not alone in your admission journey." />
                            <StepCard number="3" name="Find Your Perfect Scholarship Match" description="ApplySmart uses AI to connect you with scholarships that fit your profile. View opportunities, track your chances of success in real time, and apply with ease. Premium clients continue to receive scholarship matches even after securing admission. Our system shows your likelihood of winning each scholarship based on your background and competition. You also save time with a simplified process that lets you apply to multiple scholarships efficiently." />
                        </div>
                    </div>
                </section>


                <section id="admission-calculator" aria-labelledby="admission-calculator-title">
                    <div className="container">
                        <div className="section-title">
                            <h2 id="admission-calculator-title">Admission Calculator</h2>
                            <p className="section-sub">Get an instant assessment of your admission chances based on JAMB score, institution, and course selection</p>
                        </div>

                        <div className="form-wrap">
                            <div id="calculator-panel" role="tabpanel" aria-labelledby="tab-calculator">
                                <AdmissionCalculator />
                            </div>

                            <div id="full-form-panel" role="tabpanel" aria-labelledby="tab-full-form" className="hidden">
                                <form id="admission-form" action="#" method="post">
                                    <div className="grid">
                                        <div>
                                            <label>Full Name</label>
                                            <input type="text" id="fullname" name="fullname" required />
                                        </div>
                                        <div>
                                            <label>Email Address</label>
                                            <input type="email" id="email" name="email" required />
                                        </div>
                                        <div>
                                            <label>Phone Number</label>
                                            <input type="tel" id="phone" name="phone" required />
                                        </div>
                                        <div>
                                            <label >State of Origin</label>
                                            <select id="state" name="state" required>
                                                <option value="">Select State</option>
                                                {states.map(state => <option key={state.value} value={state.value}>{state.label}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label>JAMB Score</label>
                                            <input type="number" id="jamb_score" name="jamb_score" min="0" max="400" required />
                                        </div>
                                        <div>
                                            <label>JAMB Subjects</label>
                                            <input type="text" id="jamb_subjects" name="jamb_subjects" placeholder="e.g. English, Maths, Physics, Chemistry" required />
                                        </div>
                                        <div className="full">
                                            <h3 className="mb-4">Your Top 3 Institution/Course Preferences</h3>
                                        </div>
                                        <div>
                                            <label>1st Choice Institution</label>
                                            <select id="pref1_institution" name="pref1_institution" required>
                                                <option value="">Select Institution</option>
                                                {federalUniversities.map(uni => <option key={uni.value} value={uni.value}>{uni.label}</option>)}
                                                {stateUniversities.map(uni => <option key={uni.value} value={uni.value}>{uni.label}</option>)}
                                                {polytechnics.map(poly => <option key={poly.value} value={poly.value}>{poly.label}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label>1st Choice Course</label>
                                            <select id="pref1_course" name="pref1_course" required>
                                                <option value="">Select Course</option>
                                                {firstTierCourses.map(course => <option key={course.value} value={course.value}>{course.label}</option>)}
                                                {secondTierCourses.map(course => <option key={course.value} value={course.value}>{course.label}</option>)}
                                                {thirdTierCourses.map(course => <option key={course.value} value={course.value}>{course.label}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label>2nd Choice Institution</label>
                                            <select id="pref2_institution" name="pref2_institution" required>
                                                <option value="">Select Institution</option>
                                                {federalUniversities.map(uni => <option key={uni.value} value={uni.value}>{uni.label}</option>)}
                                                {stateUniversities.map(uni => <option key={uni.value} value={uni.value}>{uni.label}</option>)}
                                                {polytechnics.map(poly => <option key={poly.value} value={poly.value}>{poly.label}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label>2nd Choice Course</label>
                                            <select id="pref2_course" name="pref2_course" required>
                                                <option value="">Select Course</option>
                                                {firstTierCourses.map(course => <option key={course.value} value={course.value}>{course.label}</option>)}
                                                {secondTierCourses.map(course => <option key={course.value} value={course.value}>{course.label}</option>)}
                                                {thirdTierCourses.map(course => <option key={course.value} value={course.value}>{course.label}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label>3rd Choice Institution</label>
                                            <select id="pref3_institution" name="pref3_institution" required>
                                                <option value="">Select Institution</option>
                                                {federalUniversities.map(uni => <option key={uni.value} value={uni.value}>{uni.label}</option>)}
                                                {stateUniversities.map(uni => <option key={uni.value} value={uni.value}>{uni.label}</option>)}
                                                {polytechnics.map(poly => <option key={poly.value} value={poly.value}>{poly.label}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label>3rd Choice Course</label>
                                            <select id="pref3_course" name="pref3_course" required>
                                                <option value="">Select Course</option>
                                                {firstTierCourses.map(course => <option key={course.value} value={course.value}>{course.label}</option>)}
                                                {secondTierCourses.map(course => <option key={course.value} value={course.value}>{course.label}</option>)}
                                                {thirdTierCourses.map(course => <option key={course.value} value={course.value}>{course.label}</option>)}
                                            </select>
                                        </div>
                                        <div className="full">
                                            <label>Additional Information (Optional)</label>
                                            <textarea id="additional_info" name="additional_info" rows={4} placeholder="Tell us about any special circumstances, extracurricular achievements, or other relevant information"></textarea>
                                        </div>
                                    </div>
                                    <div className="submit-row">
                                        <button type="submit" className="btn btn-primary"><i className="fas fa-paper-plane"></i> Submit for Full Analysis</button>
                                    </div>
                                    <div id="form-message" className="message" role="alert"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="scholarships" aria-labelledby="scholarships-title">
                    <div className="container">
                        <div className="section-title">
                            <h2 id="scholarships-title">Featured Scholarships</h2>
                            <p className="section-sub">We match you with relevant scholarships based on your profile and preferences</p>
                        </div>

                        <div className="tabs" role="tablist" aria-label="Scholarship categories">
                            <button className="tab active" role="tab" aria-selected="true">All Scholarships</button>
                            <button className="tab" role="tab" aria-selected="false">Merit-Based</button>
                            <button className="tab" role="tab" aria-selected="false">Need-Based</button>
                            <button className="tab" role="tab" aria-selected="false">State-Specific</button>
                        </div>

                        <div className="scholarship-grid">
                            <div className="card" role="article" aria-label="Federal Government Scholarship">
                                <h3>Federal Government Scholarship Award</h3>
                                <p>Open to all Nigerian students in tertiary institutions. Awarded based on academic excellence and financial need.</p>
                                <div className="meta">
                                    <span>Deadline: <span className="deadline">June 30, 2023</span></span>
                                    <span>All Institutions</span>
                                </div>
                            </div>

                            <div className="card" role="article" aria-label="NNPC/Total Scholarship">
                                <h3>NNPC/Total National Merit Scholarship</h3>
                                <p>For 100 and 200 level students in Nigerian universities. Requires minimum CGPA of 3.5.</p>
                                <div className="meta">
                                    <span>Deadline: <span className="deadline">July 15, 2023</span></span>
                                    <span>All Universities</span>
                                </div>
                            </div>

                            <div className="card" role="article" aria-label="Agbami Medical and Engineering Professionals">
                                <h3>Agbami Medical and Engineering Professionals</h3>
                                <p>For students studying Medicine, Surgery, Dentistry, Pharmacy, or Engineering in Nigerian universities.</p>
                                <div className="meta">
                                    <span>Deadline: <span className="deadline">August 5, 2023</span></span>
                                    <span>Federal Universities</span>
                                </div>
                            </div>

                            <div className="card" role="article" aria-label="Shell Nigeria Scholarship">
                                <h3>Shell Nigeria University Scholarship</h3>
                                <p>Open to full-time undergraduates in Nigerian universities. Awarded based on academic excellence.</p>
                                <div className="meta">
                                    <span>Deadline: <span className="deadline">July 25, 2023</span></span>
                                    <span>All Universities</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="testimonials" aria-labelledby="testimonials-title">
                    <div className="container">
                        <div className="section-title">
                            <h2 id="testimonials-title">Success Stories</h2>
                            <p className="section-sub">Hear from students who secured admission with our guidance</p>
                        </div>

                        <div className="testimonial" role="article" aria-label="Testimonial from Chinedu">
                            <p>&quot;ApplySmart helped me realize that my JAMB score of 248 was competitive for Computer Science at UNILAG. Their analysis was spot on, and I got admitted! They also matched me with two scholarships I qualified for.&quot;</p>
                            <div className="author">
                                <i className="fas fa-user-graduate" aria-hidden="true"></i>
                                <span>Chinedu Okoro - UNILAG, Computer Science</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="blog" aria-labelledby="blog-title">
                    <div className="container">
                        <div className="section-title">
                            <h2 id="blog-title">Admission Insights</h2>
                            <p className="section-sub">Latest updates on admission processes, cut-off marks, and scholarship opportunities</p>
                        </div>

                        <div className="blog-grid">
                            <div className="blog-card" role="article" aria-label="JAMB CAPS Guide">
                                <div className="blog-card-content">
                                    <h3>Understanding JAMB CAPS: A Complete Guide</h3>
                                    <p>Learn how to navigate the JAMB Central Admission Processing System and increase your chances of admission.</p>
                                    <a href="#" className="btn-ghost">Read More <i className="fas fa-arrow-right"></i></a>
                                </div>
                            </div>

                            <div className="blog-card" role="article" aria-label="2023 Cut-off Marks">
                                <div className="blog-card-content">
                                    <h3>2023 Admission Cut-off Marks: What to Expect</h3>
                                    <p>Analysis of expected cut-off marks for popular courses across Nigerian universities based on recent trends.</p>
                                    <a href="#" className="btn-ghost">Read More <i className="fas fa-arrow-right"></i></a>
                                </div>
                            </div>

                            <div className="blog-card" role="article" aria-label="Scholarship Application Tips">
                                <div className="blog-card-content">
                                    <h3>10 Tips for Successful Scholarship Applications</h3>
                                    <p>Expert advice on how to prepare winning scholarship applications that stand out from the competition.</p>
                                    <a href="#" className="btn-ghost">Read More <i className="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="cta" aria-labelledby="cta-title">
                    <div className="container">
                        <div className="cta">
                            <h2 id="cta-title">Ready to Secure Your Admission?</h2>
                            <p>Submit your preferences today and receive a personalized admission analysis within 24 hours.</p>
                            <a href="#admission-form" className="btn">Get Your Admission Analysis</a>
                        </div>
                    </div>
                </section>
            </main >

            <ContactSection
                title="Ready to Get Started?"
                subtitle="Contact us for more information about ApplySmart"
            />

            <MobileOptimizedFooter serviceName="ApplySmart" showQuickContact={false} />
        </>
    )
}
