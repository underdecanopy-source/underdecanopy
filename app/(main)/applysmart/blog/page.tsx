import React from 'react';
import { Navigation } from '@/components/Navigation';

export const metadata = {
    title: 'ApplySmart Blog | Admission Tips & Scholarship Updates',
    description: 'Read the full articles on admission tips, scholarship updates, and educational insights from ApplySmart.',
};

export default function ApplySmartBlogPage() {
    return (
        <div>
            <Navigation />
            <main className="pt-24 pb-16 bg-gray-50 min-h-screen">
                <div className="page-container">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">ApplySmart Blog</h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Dive deep into the latest admission tips, scholarship updates, and educational insights to help you secure your university admission and plan your academic journey.
                        </p>
                    </div>

                    <div className="space-y-16 max-w-4xl mx-auto">
                        {/* Article 1 */}
                        <article id="how-to-choose-the-right-course" className="bg-white rounded-xl shadow-lg overflow-hidden scroll-mt-32">
                            <div className="bg-blue-900 h-48 flex items-center justify-center">
                                <span className="text-white text-6xl">&#128218;</span>
                            </div>
                            <div className="p-8 md:p-10">
                                <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">Admission Guide</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">How to Choose the Right Course and University in Nigeria</h2>
                                <div className="prose prose-lg text-gray-600">
                                    <p className="mb-4">Selecting the right course and university is one of the most important decisions you will make. It sets the foundation for your future career, shapes your academic experience, and determines the opportunities available to you during and after your studies.</p>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Key Factors to Consider</h3>
                                    <ul className="list-disc pl-5 mb-4 space-y-2">
                                        <li><strong>JAMB Cut-off Marks:</strong> Ensure your target university's cut-off mark for your desired course aligns with your expected or actual JAMB score.</li>
                                        <li><strong>Accreditation Status:</strong> Always verify that the course is fully accredited by the National Universities Commission (NUC) and relevant professional bodies.</li>
                                        <li><strong>Course Availability and Reputation:</strong> Some universities are renowned for specific disciplines (e.g., technology, medicine, or arts). Choose an institution that excels in your field.</li>
                                        <li><strong>Location and Environment:</strong> Consider the cost of living, safety, and proximity to home.</li>
                                    </ul>
                                    <p className="mb-4">Research past admission statistics and speak with current students or alumni to get firsthand insights about the academic environment. A well-informed choice will save you from future frustrations and set you on a clear path to success.</p>
                                </div>
                            </div>
                        </article>

                        {/* Article 2 */}
                        <article id="top-10-scholarships" className="bg-white rounded-xl shadow-lg overflow-hidden scroll-mt-32">
                            <div className="bg-orange-500 h-48 flex items-center justify-center">
                                <span className="text-white text-6xl">&#127891;</span>
                            </div>
                            <div className="p-8 md:p-10">
                                <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">Scholarships</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Top 10 Scholarships Every Nigerian Student Should Apply For</h2>
                                <div className="prose prose-lg text-gray-600">
                                    <p className="mb-4">Funding your university education doesn't have to be a daunting task. From the BEA Federal Government Scholarship to corporate initiatives like the MTN Foundation, Agbami, and Seplat scholarships, there are numerous fully and partially funded opportunities available for Nigerian students.</p>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Understanding the Requirements</h3>
                                    <p className="mb-4">Each scholarship has specific eligibility criteria, deadlines, and application processes. Most require an excellent academic record, and some may involve written tests or interviews. Common requirements include:</p>
                                    <ul className="list-disc pl-5 mb-4 space-y-2">
                                        <li>O'Level results (WAEC/NECO) with excellent grades.</li>
                                        <li>High JAMB score.</li>
                                        <li>Admission letter from a recognized Nigerian university.</li>
                                        <li>Local Government Area (LGA) identification certificate.</li>
                                    </ul>
                                    <p className="mb-4">Start preparing your documents early and ensure your academic records are up to date before applying. Keep an eye on scholarship portals and educational blogs to stay informed about opening dates.</p>
                                </div>
                            </div>
                        </article>

                        {/* Article 3 */}
                        <article id="understanding-jamb-caps" className="bg-white rounded-xl shadow-lg overflow-hidden scroll-mt-32">
                            <div className="bg-green-600 h-48 flex items-center justify-center">
                                <span className="text-white text-6xl">&#128196;</span>
                            </div>
                            <div className="p-8 md:p-10">
                                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">JAMB Tips</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Understanding the JAMB CAPS Admission Process</h2>
                                <div className="prose prose-lg text-gray-600">
                                    <p className="mb-4">The Central Admissions Processing System (CAPS) is how the Joint Admissions and Matriculation Board (JAMB) manages the admission process to tertiary institutions in Nigeria. It was introduced to ensure transparency and fairness.</p>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How CAPS Works</h3>
                                    <p className="mb-4">Through the CAPS portal, you can monitor your admission status at every stage. You will encounter statuses such as "Not Admitted," "Admission in Progress," and finally, "Admitted." Knowing how to navigate this system gives you an advantage in securing your preferred institution and course choice.</p>
                                    <ul className="list-disc pl-5 mb-4 space-y-2">
                                        <li><strong>Accepting or Rejecting Offers:</strong> Once offered admission, you must explicitly accept or reject it on the CAPS portal. Failing to do so within the stipulated time can lead to a forfeiture of the admission.</li>
                                        <li><strong>O'Level Upload:</strong> Your admission cannot be processed if your O'Level results are not uploaded to CAPS. Always ensure this is done at an accredited CBT center.</li>
                                        <li><strong>Transfer Approval:</strong> Sometimes, an institution may offer you a different course. You will need to accept the transfer on CAPS before the new admission can be processed.</li>
                                    </ul>
                                    <p className="mb-4">Understanding the nuances of merit, catchment, and Educationally Less Developed States (ELDS) admission lists is also crucial. Stay proactive and regularly check your CAPS profile during the admission season.</p>
                                </div>
                            </div>
                        </article>

                        {/* Article 4 */}
                        <article id="post-utme-screening" className="bg-white rounded-xl shadow-lg overflow-hidden scroll-mt-32">
                            <div className="bg-purple-600 h-48 flex items-center justify-center">
                                <span className="text-white text-6xl">&#9997;&#65039;</span>
                            </div>
                            <div className="p-8 md:p-10">
                                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">Post-UTME</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">How to Prepare for Post-UTME Screening</h2>
                                <div className="prose prose-lg text-gray-600">
                                    <p className="mb-4">Post-UTME screening is the second major hurdle after JAMB. While JAMB tests your general knowledge, Post-UTME often dives deeper into the specific subjects relevant to your chosen course. Universities set their own exams, interviews, or document verification processes.</p>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Effective Preparation Strategies</h3>
                                    <p className="mb-4">Success in Post-UTME requires a focused approach. Start by reviewing past questions for your chosen institution, as many universities tend to repeat or adapt previous questions.</p>
                                    <ul className="list-disc pl-5 mb-4 space-y-2">
                                        <li><strong>Understand the Format:</strong> Find out if your university uses a Computer-Based Test (CBT), paper-based test, or an oral interview.</li>
                                        <li><strong>Time Management:</strong> Practice answering questions quickly and accurately. Post-UTME exams are often very time-constrained.</li>
                                        <li><strong>Document Readiness:</strong> Ensure all your original documents—such as your JAMB original result slip, O'Level results, birth certificate, and LGA identification—are ready for verification on the screening day.</li>
                                    </ul>
                                    <p className="mb-4">Consistent study, joining tutorial groups, and staying updated with your university's official bulletins will greatly enhance your chances of scaling this hurdle.</p>
                                </div>
                            </div>
                        </article>

                        {/* Article 5 */}
                        <article id="budgeting-for-university" className="bg-white rounded-xl shadow-lg overflow-hidden scroll-mt-32">
                            <div className="bg-red-500 h-48 flex items-center justify-center">
                                <span className="text-white text-6xl">&#128176;</span>
                            </div>
                            <div className="p-8 md:p-10">
                                <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">Financial Planning</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Budgeting for University: What to Expect</h2>
                                <div className="prose prose-lg text-gray-600">
                                    <p className="mb-4">University costs go far beyond the initial tuition fees. Many students and parents are caught off guard by the hidden or secondary expenses associated with tertiary education. A solid financial plan is essential for a stress-free academic experience.</p>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Breaking Down the Costs</h3>
                                    <p className="mb-4">When creating your budget, factor in the following major expense categories:</p>
                                    <ul className="list-disc pl-5 mb-4 space-y-2">
                                        <li><strong>Accommodation:</strong> On-campus hostels are usually cheaper but highly competitive. Off-campus housing offers more privacy but costs significantly more.</li>
                                        <li><strong>Feeding and Groceries:</strong> This is a major daily expense. Cooking your own meals is generally more cost-effective than eating out.</li>
                                        <li><strong>Academic Materials:</strong> Textbooks, handouts, practical manuals, and project fees.</li>
                                        <li><strong>Transportation and Miscellaneous:</strong> Daily commuting to classes and occasional trips home.</li>
                                    </ul>
                                    <p className="mb-4">To manage these costs, explore part-time work opportunities on campus, learn vital money-management skills, and apply for financial aid or bursaries early to avoid financial stress during the academic session.</p>
                                </div>
                            </div>
                        </article>

                        {/* Article 6 */}
                        <article id="planning-academic-journey" className="bg-white rounded-xl shadow-lg overflow-hidden scroll-mt-32">
                            <div className="bg-yellow-500 h-48 flex items-center justify-center">
                                <span className="text-white text-6xl">&#128640;</span>
                            </div>
                            <div className="p-8 md:p-10">
                                <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">Career Guidance</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">From Admission to Career: Planning Your Academic Journey</h2>
                                <div className="prose prose-lg text-gray-600">
                                    <p className="mb-4">Gaining admission is just the first step. Your ultimate goal should be to build a solid foundation for a successful career. Your course of study should align with your long-term career aspirations, but your degree alone is rarely enough in today's competitive job market.</p>
                                    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Maximizing Your University Years</h3>
                                    <p className="mb-4">To stand out upon graduation, you need a proactive approach to your academic journey:</p>
                                    <ul className="list-disc pl-5 mb-4 space-y-2">
                                        <li><strong>Develop Soft Skills:</strong> Communication, leadership, and problem-solving skills are highly sought after by employers. Join campus organizations or student government.</li>
                                        <li><strong>Seek Internships:</strong> Don't wait until graduation. Explore internship and volunteering opportunities early to gain practical experience and understand workplace dynamics.</li>
                                        <li><strong>Networking:</strong> Connect with your professors, alumni, and professionals in your field. Attend seminars and workshops.</li>
                                        <li><strong>Learn Digital Skills:</strong> Regardless of your course, digital literacy (data analysis, basic coding, digital marketing) will give you an edge.</li>
                                    </ul>
                                    <p className="mb-4">A well-planned academic journey ensures that by the time you don your graduation gown, you are not just a graduate, but an employable professional ready to make an impact.</p>
                                </div>
                            </div>
                        </article>
                    </div>

                    <div className="mt-16 text-center">
                        <a href="/applysmart" className="inline-block bg-blue-900 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors duration-300">
                            &larr; Back to ApplySmart Home
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
