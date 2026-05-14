'use client';

import { useState } from 'react';
import { federalUniversities, stateUniversities, privateUniversities, polytechnics, statePolytechnics, monotechnics, nursingColleges, ieis, supplementalInstitutions, allCourses, states, courseInstitutionMap, getApplySmartInstitutionById, isUtmeExemptNdAgricultureCourse } from "@/lib/data/applysmart";
import { calculateAdmissionChance } from "@/lib/utils/admissionCalculator";

type AdmissionCalculatorResult =
    | { kind: 'chance'; data: NonNullable<ReturnType<typeof calculateAdmissionChance>> }
    | { kind: 'policy'; title: string; recommendation: string; factors: string[] };

export function AdmissionCalculator() {
    const [institution, setInstitution] = useState('');
    const [course, setCourse] = useState('');
    const [score, setScore] = useState('');
    const [state, setState] = useState('');
    const [result, setResult] = useState<AdmissionCalculatorResult | null>(null);

    const allInstitutionIds = [
        ...federalUniversities,
        ...stateUniversities,
        ...privateUniversities,
        ...polytechnics,
        ...statePolytechnics,
        ...monotechnics,
        ...nursingColleges,
        ...ieis,
        ...supplementalInstitutions,
    ].map(option => option.value);

    const allowedInstitutionIds = course
        ? new Set(courseInstitutionMap[course] ?? allInstitutionIds)
        : null;
    const isUtmeExemptCourse = isUtmeExemptNdAgricultureCourse(course);

    const filterOptions = <T extends { value: string }>(options: T[]) =>
        allowedInstitutionIds
            ? options.filter(option => allowedInstitutionIds.has(option.value))
            : options;

    const institutionGroups = [
        { label: 'Federal Universities', options: filterOptions(federalUniversities) },
        { label: 'State Universities', options: filterOptions(stateUniversities) },
        { label: 'Private Universities', options: filterOptions(privateUniversities) },
        { label: 'Federal & State Polytechnics', options: filterOptions([...polytechnics, ...statePolytechnics]) },
        { label: 'Monotechnics', options: filterOptions(monotechnics) },
        { label: 'College of Nursing', options: filterOptions(nursingColleges) },
        { label: 'Institutes of Education/IEIs', options: filterOptions(ieis) },
        { label: 'Additional Institutions', options: filterOptions(supplementalInstitutions) },
    ];

    const hasAvailableInstitutions = institutionGroups.some(group => group.options.length > 0);

    const calculateChance = (e: React.FormEvent) => {
        e.preventDefault();
        if (isUtmeExemptCourse) {
            const selectedInstitution = getApplySmartInstitutionById(institution);
            setResult({
                kind: 'policy',
                title: 'UTME Exemption Applies',
                recommendation: 'This ND agriculture-related programme can be pursued through JAMB without sitting for UTME. Focus on JAMB application steps, O\'Level readiness, and the institution\'s screening requirements.',
                factors: [
                    'UTME exemption applies to this ND non-technology agriculture or agriculture-related programme.',
                    `Selected institution: ${selectedInstitution?.name ?? institution}.`,
                    'You should still apply through JAMB and meet the institution\'s admission, screening, and document requirements.',
                    'Confirm current O\'Level subject requirements and any departmental screening updates before submitting your application.',
                ],
            });
            return;
        }

        const jambScore = parseInt(score, 10);
        if (isNaN(jambScore) || jambScore < 0 || jambScore > 400) {
            alert('Please enter a valid JAMB score between 0 and 400.');
            return;
        }

        const calculationResult = calculateAdmissionChance(institution, course, jambScore, state);
        if (calculationResult) {
            setResult({ kind: 'chance', data: calculationResult });
        }
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
                            setResult(null);
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
                        onChange={e => {
                            setInstitution(e.target.value);
                            setResult(null);
                        }}
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
                    <label htmlFor="score" className="block text-sm font-medium text-gray-700">
                        {isUtmeExemptCourse ? 'UTME Score (Not required)' : 'JAMB Score'}
                    </label>
                    <input
                        type="number"
                        id="score"
                        value={score}
                        onChange={e => {
                            setScore(e.target.value);
                            setResult(null);
                        }}
                        min="0"
                        max="400"
                        required={!isUtmeExemptCourse}
                        disabled={isUtmeExemptCourse}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60"
                    />
                    {isUtmeExemptCourse && (
                        <p className="mt-2 text-sm text-emerald-700">
                            This ND non-technology agriculture route is currently handled as a JAMB application without UTME sitting.
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State of Origin</label>
                    <select id="state" value={state} onChange={e => {
                        setState(e.target.value);
                        setResult(null);
                    }} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">Select State (Optional)</option>
                        {states.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                </div>
            </div>
            <div className="text-center">
                <button type="submit" className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-colors">
                    {isUtmeExemptCourse ? 'View Admission Guidance' : 'Calculate Admission Chance'}
                </button>
            </div>

            {result && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    {result.kind === 'chance' ? (
                        <>
                            <h3 className="text-2xl font-bold text-center mb-4">Your Admission Chance: <span className="text-blue-600">{result.data.chance}%</span></h3>
                            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                                <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${result.data.chance}%` }}></div>
                            </div>
                            <p className="text-center text-gray-600 mb-4">{result.data.recommendation}</p>
                        </>
                    ) : (
                        <>
                            <h3 className="text-2xl font-bold text-center mb-4 text-emerald-700">{result.title}</h3>
                            <p className="text-center text-gray-600 mb-4">{result.recommendation}</p>
                        </>
                    )}
                    <div className="space-y-2">
                        <h4 className="font-bold">Key Factors Considered:</h4>
                        <ul className="list-disc list-inside text-gray-600">
                            {(result.kind === 'chance' ? result.data.factors : result.factors).map((factor, i) => <li key={i}>{factor}</li>)}
                        </ul>
                    </div>
                </div>
            )}
        </form>
    );
}
