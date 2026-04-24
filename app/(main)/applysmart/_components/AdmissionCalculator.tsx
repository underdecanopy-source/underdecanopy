'use client';

import { useState } from 'react';
import { federalUniversities, stateUniversities, privateUniversities, polytechnics, statePolytechnics, collegesOfEducation, monotechnics, nursingColleges, ieis, firstTierCourses, secondTierCourses, thirdTierCourses, states } from "@/lib/data/applysmart";
import { calculateAdmissionChance } from "@/lib/utils/admissionCalculator";

// Mapping from form course values to utility course keys
const courseMapping: Record<string, string> = {
    'Medicine and Surgery (MBBS)': 'medicine',
    'Dentistry (BDS)': 'dentistry',
    'Pharmacy (Pharm.D)': 'pharmacy',
    'Law (LL.B)': 'law',
    'Nursing Science (B.N.Sc.)': 'nursing',
    'Medical Laboratory Science (B.MLS)': 'medical_lab',
    'Physiotherapy': 'physiotherapy',
    'Radiography and Radiation Science': 'radiography',
    'Veterinary Medicine (DVM)': 'vet_med',
    'Optometry': 'optometry',
    'Anatomy': 'anatomy',
    'Physiology': 'physiology',
    'Accounting': 'accounting',
    'Banking and Finance': 'banking_finance',
    'Business Administration': 'business_admin',
    'Economics': 'economics',
    'Mass Communication': 'mass_comm',
    'Computer Science': 'computer_science',
    'Electrical/Electronics Engineering': 'electrical_eng',
    'Mechanical Engineering': 'mechanical_eng',
    'Civil Engineering': 'civil_eng',
    'Architecture': 'architecture',
    'Estate Management': 'estate_management',
    'Urban and Regional Planning': 'urban_regional',
    'Biochemistry': 'biochemistry',
    'Microbiology': 'microbiology',
    'Public Administration': 'public_admin',
    'Local Government Studies': 'local_govt',
    'Sociology': 'sociology',
    'Political Science': 'political_science',
    'History and International Studies': 'history',
    'Theatre Arts': 'theatre_arts',
    'Linguistics': 'linguistics',
    'English Language and Literature': 'english',
    'Modern Languages': 'french',
    'Education programs with subject majors': 'education',
    'Agricultural Economics': 'agric_econ',
    'Animal Science': 'animal_science',
    'Crop Science': 'crop_science',
    'Soil Science': 'soil_science',
};

export function AdmissionCalculator() {
    const [institution, setInstitution] = useState('');
    const [course, setCourse] = useState('');
    const [score, setScore] = useState('');
    const [state, setState] = useState('');
    const [result, setResult] = useState<ReturnType<typeof calculateAdmissionChance> | null>(null);

    const calculateChance = (e: React.FormEvent) => {
        e.preventDefault();
        const jambScore = parseInt(score, 10);
        if (isNaN(jambScore) || jambScore < 0 || jambScore > 400) {
            alert('Please enter a valid JAMB score between 0 and 400.');
            return;
        }

        const courseKey = courseMapping[course];
        if (!courseKey) {
            alert('Please select a valid course.');
            return;
        }

        const calculationResult = calculateAdmissionChance(institution, courseKey, jambScore, state);
        setResult(calculationResult);
    };

    return (
        <form onSubmit={calculateChance} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Preferred Institution</label>
                    <select id="institution" value={institution} onChange={e => setInstitution(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">Select Institution</option>
                        <optgroup label="Federal Universities">
                            {federalUniversities.map(uni => <option key={uni.value} value={uni.value}>{uni.label}</option>)}
                        </optgroup>
                        <optgroup label="State Universities">
                            {stateUniversities.map(uni => <option key={uni.value} value={uni.value}>{uni.label}</option>)}
                        </optgroup>
                        <optgroup label="Private Universities">
                            {privateUniversities.map(uni => <option key={uni.value} value={uni.value}>{uni.label}</option>)}
                        </optgroup>
                        <optgroup label="Federal & State Polytechnics">
                            {polytechnics.map(poly => <option key={poly.value} value={poly.value}>{poly.label}</option>)}
                            {statePolytechnics.map(poly => <option key={poly.value} value={poly.value}>{poly.label}</option>)}
                        </optgroup>
                        <optgroup label="Colleges of Education">
                            {collegesOfEducation.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </optgroup>
                        <optgroup label="Monotechnics">
                            {monotechnics.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </optgroup>
                        <optgroup label="College of Nursing">
                            {nursingColleges.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </optgroup>
                        <optgroup label="Institutes of Education/IEIs">
                            {ieis.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </optgroup>
                    </select>
                </div>
                <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700">Preferred Course</label>
                    <select id="course" value={course} onChange={e => setCourse(e.target.value)} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">Select Course</option>
                        <optgroup label="First Tier (Cutoff: 240+)">
                            {firstTierCourses.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </optgroup>
                        <optgroup label="Second Tier (Cutoff: 200-239)">
                            {secondTierCourses.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </optgroup>
                        <optgroup label="Third Tier (Cutoff: 160-199)">
                            {thirdTierCourses.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </optgroup>
                    </select>
                </div>
                <div>
                    <label htmlFor="score" className="block text-sm font-medium text-gray-700">JAMB Score</label>
                    <input type="number" id="score" value={score} onChange={e => setScore(e.target.value)} min="0" max="400" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State of Origin</label>
                    <select id="state" value={state} onChange={e => setState(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">Select State (Optional)</option>
                        {states.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                </div>
            </div>
            <div className="text-center">
                <button type="submit" className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-colors">Calculate Admission Chance</button>
            </div>

            {result && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-center mb-4">Your Admission Chance: <span className="text-blue-600">{result.chance}%</span></h3>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${result.chance}%` }}></div>
                    </div>
                    <p className="text-center text-gray-600 mb-4">{result.recommendation}</p>
                    <div className="space-y-2">
                        <h4 className="font-bold">Key Factors Considered:</h4>
                        <ul className="list-disc list-inside text-gray-600">
                            {result.factors.map((factor, i) => <li key={i}>{factor}</li>)}
                        </ul>
                    </div>
                </div>
            )}
        </form>
    );
}
