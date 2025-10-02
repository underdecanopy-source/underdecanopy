import type { Metadata } from "next";
import "./style.css";
import { Navigation } from "./_components/Navigation";
import StepCard from "./_components/StepCard";

export const metadata: Metadata = {
    title: "Underdecanopy Digital Hub | Business Centre & Cafe",
    description: "Underdecanopy Digital Hub is your trusted center for digital solutions, business services, and a relaxing cafe experience in Ibadan. We offer services like business registration, IT support, digital training, and more.",
};

export default function page() {
    return (
        <>
            {/* <header role="banner" aria-label="Top header">
                <div className="container">
                    <div className="navbar" role="navigation" aria-label="Primary">
                        <div className="logo">
                            <i className="fas fa-graduation-cap" aria-hidden="true"></i>
                            <div>
                                <div className="brand">ApplySmart</div>
                                <div style={{ fontSize: "13px", color: "gray" }}>Admission & Scholarship Support</div>
                            </div>
                        </div>

                        <nav className="nav" aria-label="Main navigation">
                            <a href="#main">Home</a>
                            <a href="#how-it-works">Admissions</a>
                            <a href="#scholarships">Scholarships</a>
                            <a href="#blog">Blog</a>
                            <a href="#services">Our Services</a>
                            <a href="#contact">Contact</a>
                            <a href="#admission-form" className="btn">Get Started</a>
                        </nav>

                        <button className="hamburger" id="menuToggle" aria-expanded="false" aria-controls="mobileMenu" aria-label="Open menu" type="button">
                            <i className="fas fa-bars" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </header> */}
            <Navigation />

            <main>
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
                                                <option value="UNILAG">University of Lagos (UNILAG)</option>
                                                <option value="UI">University of Ibadan (UI)</option>
                                                <option value="OAU">Obafemi Awolowo University (OAU)</option>
                                                <option value="UNIBEN">University of Benin (UNIBEN)</option>
                                                <option value="UNN">University of Nigeria, Nsukka (UNN)</option>
                                                <option value="ABU">Ahmadu Bello University (ABU)</option>
                                                <option value="BUK">Bayero University Kano (BUK)</option>
                                                <option value="FUTA">Federal University of Technology, Akure (FUTA)</option>
                                                <option value="FUTO">Federal University of Technology, Owerri (FUTO)</option>
                                                <option value="UNIPORT">University of Port Harcourt (UNIPORT)</option>
                                                <option value="UNILORIN">University of Ilorin (UNILORIN)</option>
                                                <option value="UNICAL">University of Calabar (UNICAL)</option>
                                                <option value="FUNAAB">Federal University of Agriculture, Abeokuta (FUNAAB)</option>
                                                <option value="UNIJOS">University of Jos (UNIJOS)</option>
                                                <option value="UNIMAID">University of Maiduguri (UNIMAID)</option>
                                            </optgroup>


                                            <optgroup label="State Universities">
                                                <option value="LASU">Lagos State University (LASU)</option>
                                                <option value="EKSU">Ekiti State University (EKSU)</option>
                                                <option value="AAU">Ambrose Alli University (AAU)</option>
                                                <option value="OOU">Olabisi Onabanjo University (OOU)</option>
                                                <option value="RSU">Rivers State University (RSU)</option>
                                                <option value="PLASU">Plateau State University (PLASU)</option>
                                                <option value="KSU">Prince Abubakar Audu University (KSU)</option>
                                            </optgroup>


                                            <optgroup label="Polytechnics">
                                                <option value="YABATECH">Yaba College of Technology (YABATECH)</option>
                                                <option value="FEDPOLYNEKEDE">Federal Polytechnic, Nekede</option>
                                                <option value="FEDPOLYILARO">Federal Polytechnic, Ilaro</option>
                                                <option value="MAPOLY">Moshood Abiola Polytechnic (MAPOLY)</option>
                                            </optgroup>
                                        </select>
                                        <select id="mini_calc_course" name="mini_calc_course" required>
                                            <option value="">Preferred Course *</option>
                                            <optgroup label="First Tier (Cutoff: 240+)">
                                                <option value="Medicine and Surgery (MBBS)">Medicine and Surgery</option>
                                                <option value="Dentistry (BDS)">Dentistry (BDS)</option>
                                                <option value="Pharmacy (Pharm.D)">Pharmacy (Pharm.D)</option>
                                                <option value="Law (LL.B)">Law (LL.B)</option>
                                                <option value="Nursing Science (B.N.Sc.)">Nursing Science (B.N.Sc.)</option>
                                                <option value="Medical Laboratory Science (B.MLS)">Medical Laboratory Science (B.MLS)</option>
                                                <option value="Physiotherapy">Physiotherapy</option>
                                                <option value="Radiography and Radiation Science">Radiography</option>
                                                <option value="Veterinary Medicine (DVM)">Veterinary Medicine (DVM)</option>
                                                <option value="Optometry">Optometry</option>
                                                <option value="Anatomy">Anatomy</option>
                                                <option value="Physiology">Physiology</option>
                                            </optgroup>
                                            <optgroup label="Second Tier (Cutoff: 200-239)">
                                                <option value="Accounting">Accounting</option>
                                                <option value="Banking and Finance">Banking and Finance</option>
                                                <option value="Business Administration">Business Administration</option>
                                                <option value="Economics">Economics</option>
                                                <option value="Mass Communication">Mass Communication</option>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Electrical/Electronics Engineering">Electrical Engineering</option>
                                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                <option value="Civil Engineering">Civil Engineering</option>
                                                <option value="Architecture">Architecture</option>
                                                <option value="Estate Management">Estate Management</option>
                                                <option value="Urban and Regional Planning">Urban and Regional Planning</option>
                                                <option value="Biochemistry">Biochemistry</option>
                                                <option value="Microbiology">Microbiology</option>
                                            </optgroup>
                                            <optgroup label="Third Tier (Cutoff: 160-199)">
                                                <option value="Public Administration">Public Administration</option>
                                                <option value="Local Government Studies">Local Government Studies</option>
                                                <option value="Sociology">Sociology</option>
                                                <option value="Political Science">Political Science</option>
                                                <option value="History and International Studies">History and International Studies</option>
                                                <option value="Theatre Arts">Theatre Arts</option>
                                                <option value="Linguistics">Linguistics</option>
                                                <option value="English Language and Literature">English Language</option>
                                                <option value="Modern Languages">French</option>
                                                <option value="Education programs with subject majors">Education</option>
                                                <option value="Agricultural Economics">Agricultural Economics</option>
                                                <option value="Animal Science">Animal Science</option>
                                                <option value="Crop Science">Crop Science</option>
                                                <option value="Soil Science">Soil Science</option>
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
                                <img loading="lazy" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480' viewBox='0 0 640 480'%3E%3Crect width='100%25' height='100%25' fill='%230056b3'/%3E%3Cpath d='M320,120 L440,200 L440,360 L200,360 L200,200 Z' fill='%23ff6b00'/%3E%3Ccircle cx='320' cy='240' r='60' fill='%2300a651'/%3E%3Cpath d='M240,360 L400,360 L400,400 L240,400 Z' fill='%2300a651'/%3E%3Cpath d='M280,120 L360,120 L360,160 L280,160 Z' fill='%2300a651'/%3E%3Ctext x='320' y='420' text-anchor='middle' fill='white' font-family='Poppins' font-size='24' font-weight='bold'%3EApplySmart%3C/text%3E%3C/svg%3E" alt="Illustration of ApplySmart service helping students with university admissions" />
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
                            <div className="tabs" role="tablist" aria-label="Admission calculator tabs">
                                <button className="tab active" id="tab-calculator" role="tab" aria-selected="true" aria-controls="calculator-panel">Instant Admission Chance Calculator</button>
                                <button className="tab" id="tab-full-form" role="tab" aria-selected="false" aria-controls="full-form-panel">Full Analysis Request</button>
                            </div>

                            <div id="calculator-panel" role="tabpanel" aria-labelledby="tab-calculator">
                                <form id="admission-calculator-form">
                                    <div className="grid two-col">
                                        <div>
                                            <label >Preferred Institution</label>
                                            <select id="calc_institution" name="calc_institution" required>
                                                <option value="">Select Institution</option>

                                                <optgroup label="Federal Universities">
                                                    <option value="UNILAG">University of Lagos (UNILAG)</option>
                                                    <option value="UI">University of Ibadan (UI)</option>
                                                    <option value="OAU">Obafemi Awolowo University (OAU)</option>
                                                    <option value="UNIBEN">University of Benin (UNIBEN)</option>
                                                    <option value="UNN">University of Nigeria, Nsukka (UNN)</option>
                                                    <option value="ABU">Ahmadu Bello University (ABU)</option>
                                                    <option value="BUK">Bayero University Kano (BUK)</option>
                                                    <option value="FUTA">Federal University of Technology, Akure (FUTA)</option>
                                                    <option value="FUTO">Federal University of Technology, Owerri (FUTO)</option>
                                                    <option value="UNIPORT">University of Port Harcourt (UNIPORT)</option>
                                                    <option value="UNILORIN">University of Ilorin (UNILORIN)</option>
                                                    <option value="UNICAL">University of Calabar (UNICAL)</option>
                                                    <option value="FUNAAB">Federal University of Agriculture, Abeokuta (FUNAAB)</option>
                                                    <option value="UNIJOS">University of Jos (UNIJOS)</option>
                                                    <option value="UNIMAID">University of Maiduguri (UNIMAID)</option>
                                                </optgroup>


                                                <optgroup label="State Universities">
                                                    <option value="LASU">Lagos State University (LASU)</option>
                                                    <option value="EKSU">Ekiti State University (EKSU)</option>
                                                    <option value="AAU">Ambrose Alli University (AAU)</option>
                                                    <option value="OOU">Olabisi Onabanjo University (OOU)</option>
                                                    <option value="RSU">Rivers State University (RSU)</option>
                                                    <option value="PLASU">Plateau State University (PLASU)</option>
                                                    <option value="KSU">Prince Abubakar Audu University (KSU)</option>
                                                </optgroup>


                                                <optgroup label="Polytechnics">
                                                    <option value="YABATECH">Yaba College of Technology (YABATECH)</option>
                                                    <option value="FEDPOLYNEKEDE">Federal Polytechnic, Nekede</option>
                                                    <option value="FEDPOLYILARO">Federal Polytechnic, Ilaro</option>
                                                    <option value="MAPOLY">Moshood Abiola Polytechnic (MAPOLY)</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                        <div>
                                            <label>Preferred Course</label>
                                            <select id="calc_course" name="calc_course" required>
                                                <option value="">Select Course</option>
                                                <optgroup label="First Tier (Cutoff: 240+)">
                                                    <option value="medicine">Medicine and Surgery</option>
                                                    <option value="dentistry">Dentistry (BDS)</option>
                                                    <option value="pharmacy">Pharmacy (Pharm.D)</option>
                                                    <option value="law">Law (LL.B)</option>
                                                    <option value="nursing">Nursing Science (B.N.Sc.)</option>
                                                    <option value="medical_lab">Medical Laboratory Science (B.MLS)</option>
                                                    <option value="physiotherapy">Physiotherapy</option>
                                                    <option value="radiography">Radiography</option>
                                                    <option value="vet_med">Veterinary Medicine (DVM)</option>
                                                    <option value="optometry">Optometry</option>
                                                    <option value="anatomy">Anatomy</option>
                                                    <option value="physiology">Physiology</option>
                                                </optgroup>
                                                <optgroup label="Second Tier (Cutoff: 200-239)">
                                                    <option value="accounting">Accounting</option>
                                                    <option value="banking_finance">Banking and Finance</option>
                                                    <option value="business_admin">Business Administration</option>
                                                    <option value="economics">Economics</option>
                                                    <option value="mass_comm">Mass Communication</option>
                                                    <option value="computer_science">Computer Science</option>
                                                    <option value="electrical_eng">Electrical Engineering</option>
                                                    <option value="mechanical_eng">Mechanical Engineering</option>
                                                    <option value="civil_eng">Civil Engineering</option>
                                                    <option value="architecture">Architecture</option>
                                                    <option value="estate_management">Estate Management</option>
                                                    <option value="urban_regional">Urban and Regional Planning</option>
                                                    <option value="biochemistry">Biochemistry</option>
                                                    <option value="microbiology">Microbiology</option>
                                                </optgroup>
                                                <optgroup label="Third Tier (Cutoff: 160-199)">
                                                    <option value="public_admin">Public Administration</option>
                                                    <option value="local_govt">Local Government Studies</option>
                                                    <option value="sociology">Sociology</option>
                                                    <option value="political_science">Political Science</option>
                                                    <option value="history">History and International Studies</option>
                                                    <option value="theatre_arts">Theatre Arts</option>
                                                    <option value="linguistics">Linguistics</option>
                                                    <option value="english">English Language</option>
                                                    <option value="french">French</option>
                                                    <option value="education">Education</option>
                                                    <option value="agric_econ">Agricultural Economics</option>
                                                    <option value="animal_science">Animal Science</option>
                                                    <option value="crop_science">Crop Science</option>
                                                    <option value="soil_science">Soil Science</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                        <div>
                                            <label>JAMB Score</label>
                                            <input type="number" id="calc_score" name="calc_score" min="0" max="400" placeholder="Enter your JAMB score" required />
                                        </div>
                                        <div>
                                            <label>State of Origin</label>
                                            <select id="calc_state" name="calc_state">
                                                <option value="">Select State</option>
                                                <option value="Abia">Abia</option>
                                                <option value="Adamawa">Adamawa</option>
                                                <option value="Akwa Ibom">Akwa Ibom</option>
                                                <option value="Anambra">Anambra</option>
                                                <option value="Bauchi">Bauchi</option>
                                                <option value="Bayelsa">Bayelsa</option>
                                                <option value="Benue">Benue</option>
                                                <option value="Borno">Borno</option>
                                                <option value="Cross River">Cross River</option>
                                                <option value="Delta">Delta</option>
                                                <option value="Ebonyi">Ebonyi</option>
                                                <option value="Edo">Edo</option>
                                                <option value="Ekiti">Ekiti</option>
                                                <option value="Enugu">Enugu</option>
                                                <option value="FCT">Federal Capital Territory</option>
                                                <option value="Gombe">Gombe</option>
                                                <option value="Imo">Imo</option>
                                                <option value="Jigawa">Jigawa</option>
                                                <option value="Kaduna">Kaduna</option>
                                                <option value="Kano">Kano</option>
                                                <option value="Katsina">Katsina</option>
                                                <option value="Kebbi">Kebbi</option>
                                                <option value="Kogi">Kogi</option>
                                                <option value="Kwara">Kwara</option>
                                                <option value="Lagos">Lagos</option>
                                                <option value="Nasarawa">Nasarawa</option>
                                                <option value="Niger">Niger</option>
                                                <option value="Ogun">Ogun</option>
                                                <option value="Ondo">Ondo</option>
                                                <option value="Osun">Osun</option>
                                                <option value="Oyo">Oyo</option>
                                                <option value="Plateau">Plateau</option>
                                                <option value="Rivers">Rivers</option>
                                                <option value="Sokoto">Sokoto</option>
                                                <option value="Taraba">Taraba</option>
                                                <option value="Yobe">Yobe</option>
                                                <option value="Zamfara">Zamfara</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="submit-row">
                                        <button type="submit" className="btn btn-primary"><i className="fas fa-calculator"></i> Calculate Admission Chance</button>
                                    </div>
                                </form>
                                <div id="calculator-result" className="calculator-result hidden">
                                    <div className="result-header">
                                        <h3>Your Admission Chance</h3>
                                        <div className="chance-percent" id="chance-percent">0%</div>
                                    </div>
                                    <div className="chance-meter">
                                        <div className="chance-fill w-0" id="chance-fill"></div>
                                    </div>
                                    <div className="chance-explanation" id="chance-explanation"></div>
                                    <div className="factors-wrap">
                                        <h4>Key Factors</h4>
                                        <ul className="factors-list" id="factors-list"></ul>
                                    </div>
                                </div>
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
                                                <option value="Abia">Abia</option>
                                                <option value="Adamawa">Adamawa</option>
                                                <option value="Akwa Ibom">Akwa Ibom</option>
                                                <option value="Anambra">Anambra</option>
                                                <option value="Bauchi">Bauchi</option>
                                                <option value="Bayelsa">Bayelsa</option>
                                                <option value="Benue">Benue</option>
                                                <option value="Borno">Borno</option>
                                                <option value="Cross River">Cross River</option>
                                                <option value="Delta">Delta</option>
                                                <option value="Ebonyi">Ebonyi</option>
                                                <option value="Edo">Edo</option>
                                                <option value="Ekiti">Ekiti</option>
                                                <option value="Enugu">Enugu</option>
                                                <option value="FCT">Federal Capital Territory</option>
                                                <option value="Gombe">Gombe</option>
                                                <option value="Imo">Imo</option>
                                                <option value="Jigawa">Jigawa</option>
                                                <option value="Kaduna">Kaduna</option>
                                                <option value="Kano">Kano</option>
                                                <option value="Katsina">Katsina</option>
                                                <option value="Kebbi">Kebbi</option>
                                                <option value="Kogi">Kogi</option>
                                                <option value="Kwara">Kwara</option>
                                                <option value="Lagos">Lagos</option>
                                                <option value="Nasarawa">Nasarawa</option>
                                                <option value="Niger">Niger</option>
                                                <option value="Ogun">Ogun</option>
                                                <option value="Ondo">Ondo</option>
                                                <option value="Osun">Osun</option>
                                                <option value="Oyo">Oyo</option>
                                                <option value="Plateau">Plateau</option>
                                                <option value="Rivers">Rivers</option>
                                                <option value="Sokoto">Sokoto</option>
                                                <option value="Taraba">Taraba</option>
                                                <option value="Yobe">Yobe</option>
                                                <option value="Zamfara">Zamfara</option>
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
                                                <option value="UNILAG">University of Lagos (UNILAG)</option>
                                                <option value="UI">University of Ibadan (UI)</option>
                                                <option value="OAU">Obafemi Awolowo University (OAU)</option>
                                                <option value="UNIBEN">University of Benin (UNIBEN)</option>
                                                <option value="UNN">University of Nigeria, Nsukka (UNN)</option>
                                                <option value="ABU">Ahmadu Bello University (ABU)</option>
                                                <option value="BUK">Bayero University Kano (BUK)</option>
                                                <option value="FUTA">Federal University of Technology, Akure (FUTA)</option>
                                                <option value="FUTO">Federal University of Technology, Owerri (FUTO)</option>
                                                <option value="UNIPORT">University of Port Harcourt (UNIPORT)</option>
                                                <option value="UNILORIN">University of Ilorin (UNILORIN)</option>
                                                <option value="UNICAL">University of Calabar (UNICAL)</option>
                                                <option value="FUNAAB">Federal University of Agriculture, Abeokuta (FUNAAB)</option>
                                                <option value="UNIJOS">University of Jos (UNIJOS)</option>
                                                <option value="UNIMAID">University of Maiduguri (UNIMAID)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>1st Choice Course</label>
                                            <select id="pref1_course" name="pref1_course" required>
                                                <option value="">Select Course</option>
                                                <option value="medicine">Medicine and Surgery</option>
                                                <option value="law">Law</option>
                                                <option value="accounting">Accounting</option>
                                                <option value="computer_science">Computer Science</option>
                                                <option value="engineering">Engineering</option>
                                                <option value="mass_comm">Mass Communication</option>
                                                <option value="business_admin">Business Administration</option>
                                                <option value="economics">Economics</option>
                                                <option value="pharmacy">Pharmacy</option>
                                                <option value="nursing">Nursing</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>2nd Choice Institution</label>
                                            <select id="pref2_institution" name="pref2_institution" required>
                                                <option value="">Select Institution</option>
                                                <option value="UNILAG">University of Lagos (UNILAG)</option>
                                                <option value="UI">University of Ibadan (UI)</option>
                                                <option value="OAU">Obafemi Awolowo University (OAU)</option>
                                                <option value="UNIBEN">University of Benin (UNIBEN)</option>
                                                <option value="UNN">University of Nigeria, Nsukka (UNN)</option>
                                                <option value="ABU">Ahmadu Bello University (ABU)</option>
                                                <option value="BUK">Bayero University Kano (BUK)</option>
                                                <option value="FUTA">Federal University of Technology, Akure (FUTA)</option>
                                                <option value="FUTO">Federal University of Technology, Owerri (FUTO)</option>
                                                <option value="UNIPORT">University of Port Harcourt (UNIPORT)</option>
                                                <option value="UNILORIN">University of Ilorin (UNILORIN)</option>
                                                <option value="UNICAL">University of Calabar (UNICAL)</option>
                                                <option value="FUNAAB">Federal University of Agriculture, Abeokuta (FUNAAB)</option>
                                                <option value="UNIJOS">University of Jos (UNIJOS)</option>
                                                <option value="UNIMAID">University of Maiduguri (UNIMAID)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>2nd Choice Course</label>
                                            <select id="pref2_course" name="pref2_course" required>
                                                <option value="">Select Course</option>
                                                <option value="medicine">Medicine and Surgery</option>
                                                <option value="law">Law</option>
                                                <option value="accounting">Accounting</option>
                                                <option value="computer_science">Computer Science</option>
                                                <option value="engineering">Engineering</option>
                                                <option value="mass_comm">Mass Communication</option>
                                                <option value="business_admin">Business Administration</option>
                                                <option value="economics">Economics</option>
                                                <option value="pharmacy">Pharmacy</option>
                                                <option value="nursing">Nursing</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>3rd Choice Institution</label>
                                            <select id="pref3_institution" name="pref3_institution" required>
                                                <option value="">Select Institution</option>
                                                <option value="UNILAG">University of Lagos (UNILAG)</option>
                                                <option value="UI">University of Ibadan (UI)</option>
                                                <option value="OAU">Obafemi Awolowo University (OAU)</option>
                                                <option value="UNIBEN">University of Benin (UNIBEN)</option>
                                                <option value="UNN">University of Nigeria, Nsukka (UNN)</option>
                                                <option value="ABU">Ahmadu Bello University (ABU)</option>
                                                <option value="BUK">Bayero University Kano (BUK)</option>
                                                <option value="FUTA">Federal University of Technology, Akure (FUTA)</option>
                                                <option value="FUTO">Federal University of Technology, Owerri (FUTO)</option>
                                                <option value="UNIPORT">University of Port Harcourt (UNIPORT)</option>
                                                <option value="UNILORIN">University of Ilorin (UNILORIN)</option>
                                                <option value="UNICAL">University of Calabar (UNICAL)</option>
                                                <option value="FUNAAB">Federal University of Agriculture, Abeokuta (FUNAAB)</option>
                                                <option value="UNIJOS">University of Jos (UNIJOS)</option>
                                                <option value="UNIMAID">University of Maiduguri (UNIMAID)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>3rd Choice Course</label>
                                            <select id="pref3_course" name="pref3_course" required>
                                                <option value="">Select Course</option>
                                                <option value="medicine">Medicine and Surgery</option>
                                                <option value="law">Law</option>
                                                <option value="accounting">Accounting</option>
                                                <option value="computer_science">Computer Science</option>
                                                <option value="engineering">Engineering</option>
                                                <option value="mass_comm">Mass Communication</option>
                                                <option value="business_admin">Business Administration</option>
                                                <option value="economics">Economics</option>
                                                <option value="pharmacy">Pharmacy</option>
                                                <option value="nursing">Nursing</option>
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
                            <p>"ApplySmart helped me realize that my JAMB score of 248 was competitive for Computer Science at UNILAG. Their analysis was spot on, and I got admitted! They also matched me with two scholarships I qualified for."</p>
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

            <footer role="contentinfo">
                <div className="container">
                    <div className="footer-grid">
                        <div>
                            <h4>ApplySmart</h4>
                            <p className="small">Your trusted partner for university admission guidance and scholarship matching in Nigeria.</p>
                            <div className="social-links">
                                <a href="#" aria-label="Follow us on Facebook"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" aria-label="Follow us on Twitter"><i className="fab fa-twitter"></i></a>
                                <a href="#" aria-label="Follow us on Instagram"><i className="fab fa-instagram"></i></a>
                                <a href="#" aria-label="Connect on LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>

                        <div>
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                <li><a href="#main">Home</a></li>
                                <li><a href="#how-it-works">How It Works</a></li>
                                <li><a href="#admission-calculator">Admission Calculator</a></li>
                                <li><a href="#scholarships">Scholarships</a></li>
                                <li><a href="#blog">Blog</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4>Resources</h4>
                            <ul className="footer-links">
                                <li><a href="#">JAMB Updates</a></li>
                                <li><a href="#">Cut-off Marks</a></li>
                                <li><a href="#">Admission Tips</a></li>
                                <li><a href="#">Scholarship Database</a></li>
                                <li><a href="#">FAQs</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4>Contact Us</h4>
                            <ul className="footer-links">
                                <li><i className="fas fa-envelope" aria-hidden="true"></i> info@applysmart.ng</li>
                                <li><i className="fas fa-phone" aria-hidden="true"></i> +234 812 345 6789</li>
                                <li><i className="fas fa-map-marker-alt" aria-hidden="true"></i> Lagos, Nigeria</li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>&copy; 2023 ApplySmart. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
                    </div>
                </div>
            </footer>
        </>
    )
}
