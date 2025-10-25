'use client';

import { useState } from 'react';
import { federalUniversities, stateUniversities, polytechnics, firstTierCourses, secondTierCourses, thirdTierCourses } from "@/lib/data/applysmart";

export function AdmissionCalculator() {
    const [institution, setInstitution] = useState('');
    const [course, setCourse] = useState('');
    const [score, setScore] = useState('');
    const [result, setResult] = useState<{ chance: number; explanation: string; factors: string[] } | null>(null);

    const calculateChance = (e: React.FormEvent) => {
        e.preventDefault();
        const jambScore = parseInt(score, 10);
        if (isNaN(jambScore) || jambScore < 0 || jambScore > 400) {
            alert('Please enter a valid JAMB score between 0 and 400.');
            return;
        }

        // Simplified logic
        let chance = 50;
        let explanation = 'Based on your score, you have a moderate chance.';
        const factors = [];

        if (jambScore >= 250) {
            chance += 30;
            factors.push('High JAMB score is a significant advantage.');
        } else if (jambScore >= 200) {
            chance += 15;
            factors.push('Good JAMB score.');
        } else if (jambScore < 180) {
            chance -= 20;
            factors.push('Low JAMB score, admission might be challenging.');
        }

        if (firstTierCourses.some(c => c.value === course)) {
            if (jambScore < 240) chance -= 15;
            factors.push('Competitive course selected.');
        } else if (secondTierCourses.some(c => c.value === course)) {
            if (jambScore < 200) chance -= 10;
            factors.push('Moderately competitive course.');
        }

        chance = Math.max(10, Math.min(95, chance));

        if (chance > 75) {
            explanation = 'You have a very strong chance of admission!';
        } else if (chance > 50) {
            explanation = 'You have a good chance, but consider other options as well.';
        } else {
            explanation = 'Admission is competitive. It is recommended to have backup options.';
        }

        setResult({ chance, explanation, factors });
    };

    return (
        <form onSubmit={calculateChance} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
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
                        <optgroup label="Polytechnics">
                            {polytechnics.map(poly => <option key={poly.value} value={poly.value}>{poly.label}</option>)}
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
                    <p className="text-center text-gray-600 mb-4">{result.explanation}</p>
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
