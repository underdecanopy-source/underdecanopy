'use client';

import Image from "next/image";
import { FullContactSection } from "@/components/contact/FullContactSection";
import { MobileOptimizedFooter } from "@/components/contact/MobileOptimizedFooter";
import { AdmissionCalculator } from "@/app/(main)/applysmart/_components/AdmissionCalculator";

const Metadata = {
  title: "ApplySmart - University Admission Calculator",
  description: "Get personalized admission guidance and scholarship matches based on JAMB CAPS protocols.",
};

import { Navigation } from "@/components/Navigation";

const StepCard = ({ number, name, description }: { number: string, name: string, description: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center h-12 w-12 bg-orange-500 text-white rounded-full font-bold text-xl mb-4">{number}</div>
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default function Page() {
    return (
        <div>
            <Navigation />
            <main>
                <section className="bg-gray-100 section-lg">
                    <div className="page-container">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div className="text-left">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4">Your Path to University Admission and Scholarships Starts Here</h1>
                                <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8">Get personalized admission guidance and scholarship matches based on JAMB CAPS protocols. We analyze your top three choices and provide a detailed report.</p>
                                <div className="flex gap-4 flex-wrap">
                                    <a href="#admission-form" className="bg-orange-500 text-white py-3 px-6 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95 inline-block">Check Admission Opportunities</a>
                                    <a href="#how-it-works" className="bg-gray-200 text-gray-800 py-3 px-6 rounded-full text-lg hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95 inline-block">How it works</a>
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <Image
                                    src="/hub.png"
                                    alt="ApplySmart Illustration"
                                    width={500}
                                    height={500}
                                    className="rounded-lg shadow-lg"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section" id="how-it-works">
                    <div className="page-container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800">How ApplySmart Works</h2>
                            <p className="text-gray-600 mt-2 max-w-3xl mx-auto">Our simple 3-step process helps you navigate the admission landscape with confidence</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <StepCard number="1" name="Submit Your Preferences" description="Start by sharing your top three institution choices, your preferred courses, and your JAMB score. Our system uses this information to evaluate your chances of admission, considering cut-off marks, catchment areas, and ELDS policies." />
                            <StepCard number="2" name="Receive Your Analysis" description="Get a detailed admission report within 48 hours showing your chances for each choice and alternative options. Premium users get direct expert access and application support." />
                            <StepCard number="3" name="Find Your Perfect Scholarship Match" description="ApplySmart uses AI to connect you with scholarships that fit your profile. View opportunities, track your chances, and apply with ease. Premium clients get matches even after admission." />
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 section" id="admission-calculator">
                    <div className="page-container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800">Admission Calculator</h2>
                            <p className="text-gray-600 mt-2 max-w-3xl mx-auto">Get an instant assessment of your admission chances based on JAMB score, institution, and course selection.</p>
                        </div>
                        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                            <AdmissionCalculator />
                        </div>
                    </div>
                </section>

                {/* Scholarships Section */}
                <section className="section bg-white" id="scholarships">
                    <div className="page-container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800">Scholarship Opportunities</h2>
                            <p className="text-gray-600 mt-2 max-w-3xl mx-auto">Discover scholarships tailored to your academic profile and goals. ApplySmart helps you find and apply for the right funding opportunities.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-orange-500">
                                <h3 className="text-xl font-bold text-blue-900 mb-2">Federal Government Scholarships</h3>
                                <p className="text-gray-600 mb-4">The Bilateral Education Agreement (BEA) scholarship programme offers full funding for undergraduate and postgraduate studies abroad. Covers tuition, accommodation, and living expenses for Nigerian students.</p>
                                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                                    <li>&#8226; Full tuition coverage</li>
                                    <li>&#8226; Monthly stipend included</li>
                                    <li>&#8226; Available for all disciplines</li>
                                </ul>
                                <a href="#contact" className="text-orange-500 font-semibold hover:underline">Apply with ApplySmart &rarr;</a>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                                <h3 className="text-xl font-bold text-blue-900 mb-2">State Government Bursaries</h3>
                                <p className="text-gray-600 mb-4">Many state governments offer bursaries and scholarships to indigenes studying in approved institutions. These awards help offset tuition fees and living costs for students from the state of origin.</p>
                                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                                    <li>&#8226; State-specific eligibility</li>
                                    <li>&#8226; Partial tuition support</li>
                                    <li>&#8226; Renewable annually</li>
                                </ul>
                                <a href="#contact" className="text-orange-500 font-semibold hover:underline">Apply with ApplySmart &rarr;</a>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-green-500">
                                <h3 className="text-xl font-bold text-blue-900 mb-2">Private & Corporate Scholarships</h3>
                                <p className="text-gray-600 mb-4">Organizations like MTN Foundation, Shell, Agbami, and NNPC offer merit-based and need-based scholarships. These cover tuition and provide additional allowances for books and equipment.</p>
                                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                                    <li>&#8226; Merit and need-based</li>
                                    <li>&#8226; Annual application cycles</li>
                                    <li>&#8226; Additional book allowances</li>
                                </ul>
                                <a href="#contact" className="text-orange-500 font-semibold hover:underline">Apply with ApplySmart &rarr;</a>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-purple-500">
                                <h3 className="text-xl font-bold text-blue-900 mb-2">University-Based Scholarships</h3>
                                <p className="text-gray-600 mb-4">Many Nigerian universities offer internal scholarships for exceptional academic performance, including fee waivers and cash awards for top-performing students in each faculty.</p>
                                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                                    <li>&#8226; Academic excellence required</li>
                                    <li>&#8226; Faculty-specific awards</li>
                                    <li>&#8226; Partial or full fee waivers</li>
                                </ul>
                                <a href="#contact" className="text-orange-500 font-semibold hover:underline">Apply with ApplySmart &rarr;</a>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
                                <h3 className="text-xl font-bold text-blue-900 mb-2">International Scholarships</h3>
                                <p className="text-gray-600 mb-4">Fully funded international scholarships from the Commonwealth, Chevening, DAAD, and Fulbright programmes. These opportunities cover tuition, travel, and living expenses for study abroad.</p>
                                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                                    <li>&#8226; Fully funded packages</li>
                                    <li>&#8226; Travel costs covered</li>
                                    <li>&#8226; Postgraduate focus</li>
                                </ul>
                                <a href="#contact" className="text-orange-500 font-semibold hover:underline">Apply with ApplySmart &rarr;</a>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-red-500">
                                <h3 className="text-xl font-bold text-blue-900 mb-2">Need-Based Financial Aid</h3>
                                <p className="text-gray-600 mb-4">Financial aid programmes for students from low-income families, including TETFund interventions and institution-specific hardship funds designed to keep students in school.</p>
                                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                                    <li>&#8226; Income-based eligibility</li>
                                    <li>&#8226; Emergency funding available</li>
                                    <li>&#8226; Supports retention</li>
                                </ul>
                                <a href="#contact" className="text-orange-500 font-semibold hover:underline">Apply with ApplySmart &rarr;</a>
                            </div>
                        </div>
                        <div className="text-center mt-12">
                            <p className="text-gray-600 mb-4">Not sure which scholarship is right for you? Let ApplySmart match you with opportunities that fit your profile.</p>
                            <a href="#contact" className="bg-orange-500 text-white py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 inline-block">Get Scholarship Matching</a>
                        </div>
                    </div>
                </section>

                {/* Blog Section */}
                <section className="section bg-gray-100" id="blog">
                    <div className="page-container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800">ApplySmart Blog</h2>
                            <p className="text-gray-600 mt-2 max-w-3xl mx-auto">Stay informed with the latest admission tips, scholarship updates, and educational insights.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <article className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-blue-900 h-40 flex items-center justify-center">
                                    <span className="text-white text-5xl">&#128218;</span>
                                </div>
                                <div className="p-6">
                                    <span className="text-xs text-orange-500 font-semibold uppercase">Admission Guide</span>
                                    <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2">How to Choose the Right Course and University in Nigeria</h3>
                                    <p className="text-gray-600 text-sm mb-4">Selecting the right course and university is one of the most important decisions you will make. Consider factors like JAMB cut-off marks, course availability, school location, accreditation status, and your long-term career goals. Research past admission statistics and speak with current students to get firsthand insights about the academic environment.</p>
                                    <a href="#contact" className="text-orange-500 font-semibold text-sm hover:underline">Read More &rarr;</a>
                                </div>
                            </article>
                            <article className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-orange-500 h-40 flex items-center justify-center">
                                    <span className="text-white text-5xl">&#127891;</span>
                                </div>
                                <div className="p-6">
                                    <span className="text-xs text-blue-600 font-semibold uppercase">Scholarships</span>
                                    <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2">Top 10 Scholarships Every Nigerian Student Should Apply For</h3>
                                    <p className="text-gray-600 text-sm mb-4">From the BEA Federal Government Scholarship to the MTN Foundation and Agbami scholarships, there are numerous fully and partially funded opportunities available. Each has specific eligibility criteria, deadlines, and application processes. Start preparing your documents early and ensure your academic records are up to date before applying.</p>
                                    <a href="#scholarships" className="text-orange-500 font-semibold text-sm hover:underline">Read More &rarr;</a>
                                </div>
                            </article>
                            <article className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-green-600 h-40 flex items-center justify-center">
                                    <span className="text-white text-5xl">&#128196;</span>
                                </div>
                                <div className="p-6">
                                    <span className="text-xs text-green-600 font-semibold uppercase">JAMB Tips</span>
                                    <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2">Understanding the JAMB CAPS Admission Process</h3>
                                    <p className="text-gray-600 text-sm mb-4">The Central Admissions Processing System (CAPS) is how JAMB manages the admission process. Learn how to check your admission status, accept or reject offers, and understand merit, catchment, and ELDS admission lists. Knowing how CAPS works gives you an advantage in securing your preferred institution and course choice.</p>
                                    <a href="#contact" className="text-orange-500 font-semibold text-sm hover:underline">Read More &rarr;</a>
                                </div>
                            </article>
                            <article className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-purple-600 h-40 flex items-center justify-center">
                                    <span className="text-white text-5xl">&#9997;&#65039;</span>
                                </div>
                                <div className="p-6">
                                    <span className="text-xs text-purple-600 font-semibold uppercase">Post-UTME</span>
                                    <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2">How to Prepare for Post-UTME Screening</h3>
                                    <p className="text-gray-600 text-sm mb-4">Post-UTME screening is the second hurdle after JAMB. Universities set their own exams, interviews, or document verification processes. Start by reviewing past questions for your chosen institution, practice time management, and ensure all your original documents are ready for verification on the screening day.</p>
                                    <a href="#contact" className="text-orange-500 font-semibold text-sm hover:underline">Read More &rarr;</a>
                                </div>
                            </article>
                            <article className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-red-500 h-40 flex items-center justify-center">
                                    <span className="text-white text-5xl">&#128176;</span>
                                </div>
                                <div className="p-6">
                                    <span className="text-xs text-red-500 font-semibold uppercase">Financial Planning</span>
                                    <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2">Budgeting for University: What to Expect</h3>
                                    <p className="text-gray-600 text-sm mb-4">University costs go beyond tuition fees. Factor in accommodation, feeding, textbooks, transportation, and course materials. Create a realistic budget, explore part-time work opportunities on campus, and apply for financial aid or bursaries early to avoid financial stress during the academic session.</p>
                                    <a href="#contact" className="text-orange-500 font-semibold text-sm hover:underline">Read More &rarr;</a>
                                </div>
                            </article>
                            <article className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-yellow-500 h-40 flex items-center justify-center">
                                    <span className="text-white text-5xl">&#128640;</span>
                                </div>
                                <div className="p-6">
                                    <span className="text-xs text-yellow-600 font-semibold uppercase">Career Guidance</span>
                                    <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2">From Admission to Career: Planning Your Academic Journey</h3>
                                    <p className="text-gray-600 text-sm mb-4">Your course of study should align with your career aspirations. Explore internship opportunities early, build practical skills alongside your academics, and network with professionals in your field. A well-planned academic journey sets the foundation for a successful career after graduation.</p>
                                    <a href="#contact" className="text-orange-500 font-semibold text-sm hover:underline">Read More &rarr;</a>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>


                <section className="bg-blue-900 text-white section-lg" id="cta">
                    <div className="page-container text-center">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Ready to Secure Your Admission?</h2>
                        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Submit your preferences today and receive a personalized admission analysis within 24 hours.</p>
                        <a href="#admission-form" className="bg-orange-500 text-white py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95 inline-block">Get Your Admission Analysis</a>
                    </div>
                </section>
            </main>

            <FullContactSection
                title="Contact Us"
                subtitle="Contact us for more information about ApplySmart"
                serviceOptions={[
                    { value: "Admission Analysis", label: "Admission Analysis" },
                    { value: "Scholarship Matching", label: "Scholarship Matching" },
                    { value: "Application Support", label: "Application Support" },
                    { value: "Other", label: "Other" },
                ]}
            />

            <MobileOptimizedFooter serviceName="ApplySmart" showQuickContact={false} />
        </div>
    );
}