'use client';

import { useState } from 'react';
import { federalUniversities, stateUniversities, privateUniversities, polytechnics, statePolytechnics, collegesOfEducation, monotechnics, nursingColleges, ieis, allCourses, states, courseInstitutionMap } from "@/lib/data/applysmart";
import { calculateAdmissionChance } from "@/lib/utils/admissionCalculator";

export function AdmissionCalculator() {
    const [institution, setInstitution] = useState('');
    const [course, setCourse] = useState('');
    const [score, setScore] = useState('');
    const [state, setState] = useState('');
    const [result, setResult] = useState<ReturnType<typeof calculateAdmissionChance> | null>(null);

    const allInstitutionIds = [
        ...federalUniversities,
        ...stateUniversities,
        ...privateUniversities,
        ...polytechnics,
        ...statePolytechnics,
        ...collegesOfEducation,
        ...monotechnics,
        ...nursingColleges,
        ...ieis,
    ].map(option => option.value);

    const allowedInstitutionIds = course
        ? new Set(courseInstitutionMap[course] ?? allInstitutionIds)
        : null;

    const filterOptions = <T extends { value: string }>(options: T[]) =>
        allowedInstitutionIds
            ? options.filter(option => allowedInstitutionIds.has(option.value))
            : options;

    const institutionGroups = [
        { label: 'Federal Universities', options: filterOptions(federalUniversities) },
        { label: 'State Universities', options: filterOptions(stateUniversities) },
        { label: 'Private Universities', options: filterOptions(privateUniversities) },
        { label: 'Federal & State Polytechnics', options: filterOptions([...polytechnics, ...statePolytechnics]) },
        { label: 'Colleges of Education', options: filterOptions(collegesOfEducation) },
        { label: 'Monotechnics', options: filterOptions(monotechnics) },
        { label: 'College of Nursing', options: filterOptions(nursingColleges) },
        { label: 'Institutes of Education/IEIs', options: filterOptions(ieis) },
    ];

    const hasAvailableInstitutions = institutionGroups.some(group => group.options.length > 0);

    const calculateChance = (e: React.FormEvent) => {
        e.preventDefault();
        const jambScore = parseInt(score, 10);
        if (isNaN(jambScore) || jambScore < 0 || jambScore > 400) {
            alert('Please enter a valid JAMB score between 0 and 400.');
            return;
        }

        const calculationResult = calculateAdmissionChance(institution, course, jambScore, state);
        setResult(calculationResult);
    };

    return (
        <form onSubmit={calculateChance} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700">Preferred Course</label>
                    <select
                        id="course"
                        value={course}
                        onChange={e => {
                            setCourse(e.target.value);
                            setInstitution('');
                        }}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select Course</option>
                        <optgroup label="All Available Courses">
                            {allCourses.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </optgroup>
                    </select>
                </div>
                <div>
                    <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Preferred Institution</label>
                    <select
                        id="institution"
                        value={institution}
                        onChange={e => setInstitution(e.target.value)}
                        required
                        disabled={!course}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60"
                    >
                        <option value="">
                            {course ? (hasAvailableInstitutions ? 'Select Institution' : 'No institutions available for selected course') : 'Select course first'}
                        </option>
                        {institutionGroups.map(group => group.options.length > 0 && (
                            <optgroup key={group.label} label={group.label}>
                                {group.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                            </optgroup>
                        ))}
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
