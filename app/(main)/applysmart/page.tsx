'use client';

import Image from "next/image";
import { ContactSection } from "@/components/contact/ContactSection";
import { MobileOptimizedFooter } from "@/components/contact/MobileOptimizedFooter";
import { AdmissionCalculator } from "@/app/(main)/applysmart/_components/AdmissionCalculator";

const Metadata = {
  title: "ApplySmart - University Admission Calculator",
  description: "Get personalized admission guidance and scholarship matches based on JAMB CAPS protocols.",
};

const Facebook = "Facebook";
const Instagram = "Instagram";
const Linkedin = "Linkedin";
const Twitter = "Twitter";

const federalUniversities = [];
const stateUniversities = [];
const polytechnics = [];
const firstTierCourses = [];
const secondTierCourses = [];
const thirdTierCourses = [];
const states = [];

import { Navigation } from "./_components/Navigation";

const StepCard = ({ number, name, description }: { number: string, name: string, description: string }) => (
    <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center justify-center h-12 w-12 bg-orange-500 text-white rounded-full font-bold text-xl mb-4">{number}</div>
        <h3 class="text-xl font-bold mb-2">{name}</h3>
        <p class="text-gray-600">{description}</p>
    </div>
);

export default function Page() {
    return (
        <>
            <Navigation />
            <main>
                <section class="bg-gray-100 py-20">
                    <div class="container mx-auto px-4">
                        <div class="grid lg:grid-cols-2 gap-12 items-center">
                            <div class="text-left">
                                <h1 class="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Your Path to University Admission and Scholarships Starts Here</h1>
                                <p class="text-gray-600 text-lg mb-8">Get personalized admission guidance and scholarship matches based on JAMB CAPS protocols. We analyze your top three choices and provide a detailed report.</p>
                                <div class="flex gap-4 flex-wrap">
                                    <a href="#admission-form" class="bg-orange-500 text-white py-3 px-6 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95 inline-block">Check Admission Opportunities</a>
                                    <a href="#how-it-works" class="bg-gray-200 text-gray-800 py-3 px-6 rounded-full text-lg hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95 inline-block">How it works</a>
                                </div>
                            </div>
                            <div class="hidden lg:block">
                                <Image
                                    src="/hub.png"
                                    alt="ApplySmart Illustration"
                                    width={500}
                                    height={500}
                                    class="rounded-lg shadow-lg"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section class="py-16" id="how-it-works">
                    <div class="container mx-auto px-4">
                        <div class="text-center mb-12">
                            <h2 class="text-3xl font-bold text-gray-800">How ApplySmart Works</h2>
                            <p class="text-gray-600 mt-2 max-w-3xl mx-auto">Our simple 3-step process helps you navigate the admission landscape with confidence</p>
                        </div>
                        <div class="grid md:grid-cols-3 gap-8">
                            <StepCard number="1" name="Submit Your Preferences" description="Start by sharing your top three institution choices, your preferred courses, and your JAMB score. Our system uses this information to evaluate your chances of admission, considering cut-off marks, catchment areas, and ELDS policies." />
                            <StepCard number="2" name="Receive Your Analysis" description="Get a detailed admission report within 48 hours showing your chances for each choice and alternative options. Premium users get direct expert access and application support." />
                            <StepCard number="3" name="Find Your Perfect Scholarship Match" description="ApplySmart uses AI to connect you with scholarships that fit your profile. View opportunities, track your chances, and apply with ease. Premium clients get matches even after admission." />
                        </div>
                    </div>
                </section>

                <section class="bg-gray-100 py-16" id="admission-calculator">
                    <div class="container mx-auto px-4">
                        <div class="text-center mb-12">
                            <h2 class="text-3xl font-bold text-gray-800">Admission Calculator</h2>
                            <p class="text-gray-600 mt-2 max-w-3xl mx-auto">Get an instant assessment of your admission chances based on JAMB score, institution, and course selection.</p>
                        </div>
                        <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                            <AdmissionCalculator />
                        </div>
                    </div>
                </section>

                <section class="py-16" id="scholarships">
                    <div class="container mx-auto px-4">
                        <div class="text-center mb-12">
                            <h2 class="text-3xl font-bold text-gray-800">Featured Scholarships</h2>
                            <p class="text-gray-600 mt-2 max-w-3xl mx-auto">We match you with relevant scholarships based on your profile and preferences.</p>
                        </div>
                        {/* Add scholarship cards here */}
                    </div>
                </section>

                <section class="bg-gray-100 py-16" id="testimonials">
                    <div class="container mx-auto px-4">
                        <div class="text-center mb-12">
                            <h2 class="text-3xl font-bold text-gray-800">Success Stories</h2>
                            <p class="text-gray-600 mt-2 max-w-3xl mx-auto">Hear from students who secured admission with our guidance.</p>
                        </div>
                        {/* Add testimonials here */}
                    </div>
                </section>

                <section class="py-16" id="blog">
                    <div class="container mx-auto px-4">
                        <div class="text-center mb-12">
                            <h2 class="text-3xl font-bold text-gray-800">Admission Insights</h2>
                            <p class="text-gray-600 mt-2 max-w-3xl mx-auto">Latest updates on admission processes, cut-off marks, and scholarship opportunities.</p>
                        </div>
                        {/* Add blog cards here */}
                    </div>
                </section>

                <section class="bg-blue-900 text-white py-20" id="cta">
                    <div class="container mx-auto px-4 text-center">
                        <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Admission?</h2>
                        <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Submit your preferences today and receive a personalized admission analysis within 24 hours.</p>
                        <a href="#admission-form" class="bg-orange-500 text-white py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95 inline-block">Get Your Admission Analysis</a>
                    </div>
                </section>
            </main>

            <ContactSection
                id="contact"
                title="Ready to Get Started?"
                subtitle="Contact us for more information about ApplySmart"
            />

            <MobileOptimizedFooter serviceName="ApplySmart" showQuickContact={false} />
        </>
    );
}