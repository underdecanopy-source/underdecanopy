'use client';

import { useState } from 'react';
import { calculateAdmissionChance, getChanceColor } from '@/lib/utils/admissionCalculator';
import { Calculator } from 'lucide-react';

interface CalculatorResult {
  chance: number;
  factors: string[];
  recommendation: string;
}

export default function AdmissionCalculator() {
  const [institution, setInstitution] = useState('');
  const [course, setCourse] = useState('');
  const [score, setScore] = useState('');
  const [state, setState] = useState('');
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!institution || !course || !score) {
      alert('Please fill in all required fields');
      return;
    }

    const scoreNum = parseInt(score);
    if (scoreNum < 0 || scoreNum > 400) {
      alert('JAMB score must be between 0 and 400');
      return;
    }

    const calculationResult = calculateAdmissionChance(
      institution,
      course,
      scoreNum,
      state
    );

    if (calculationResult) {
      setResult(calculationResult);
      setShowResult(true);
      // Scroll to result
      setTimeout(() => {
        document.getElementById('calculator-result')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    }
  };

  const chanceColor = result ? getChanceColor(result.chance) : '#ccc';

  return (
    <div className="calculator-wrapper">
      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="calc_institution">Preferred Institution *</label>
            <select
              id="calc_institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            >
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

          <div className="form-group">
            <label htmlFor="calc_course">Preferred Course *</label>
            <select
              id="calc_course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            >
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

          <div className="form-group">
            <label htmlFor="calc_score">JAMB Score *</label>
            <input
              id="calc_score"
              type="number"
              min="0"
              max="400"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Enter your JAMB score (0-400)"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="calc_state">State of Origin</label>
            <select
              id="calc_state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select State (Optional)</option>
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

        <button type="submit" className="btn btn-primary">
          <Calculator className="inline mr-2" size={20} />
          Calculate Admission Chance
        </button>
      </form>

      {showResult && result && (
        <div id="calculator-result" className="calculator-result">
          <div className="result-header">
            <h3>Your Admission Chance</h3>
            <div className="chance-percent" style={{ color: chanceColor }}>
              {result.chance}%
            </div>
          </div>

          <div className="chance-meter">
            <div
              className="chance-fill"
              style={{
                width: `${result.chance}%`,
                backgroundColor: chanceColor,
                transition: 'width 0.5s ease',
              }}
            />
          </div>

          <div className="chance-explanation">{result.recommendation}</div>

          <div className="factors-wrap">
            <h4>Key Factors</h4>
            <ul className="factors-list">
              {result.factors.map((factor, index) => (
                <li key={index}>{factor}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <style jsx>{`
        .calculator-wrapper {
          width: 100%;
        }

        .calculator-form {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1f2933;
        }

        .form-group input,
        .form-group select {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #0056b3;
          box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.1);
        }

        .btn {
          padding: 0.75rem 1.5rem;
          background: #0056b3;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn:hover {
          background: #004494;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 86, 179, 0.3);
        }

        .calculator-result {
          margin-top: 2rem;
          padding: 2rem;
          background: #f8f9fb;
          border-radius: 12px;
          border-left: 4px solid #0056b3;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .result-header h3 {
          margin: 0;
          color: #1f2933;
        }

        .chance-percent {
          font-size: 2.5rem;
          font-weight: 700;
        }

        .chance-meter {
          width: 100%;
          height: 12px;
          background: #e0e0e0;
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .chance-fill {
          height: 100%;
          border-radius: 6px;
        }

        .chance-explanation {
          font-size: 1rem;
          color: #1f2933;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .factors-wrap h4 {
          margin-bottom: 1rem;
          color: #1f2933;
        }

        .factors-list {
          list-style: none;
          padding: 0;
        }

        .factors-list li {
          padding: 0.5rem 0;
          color: #7b8794;
          border-bottom: 1px solid #e0e0e0;
        }

        .factors-list li:last-child {
          border-bottom: none;
        }
      `}</style>
    </div>
  );
}

