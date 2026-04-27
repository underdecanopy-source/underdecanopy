import {
  AdmissionInstitution,
  educationallyLessDevelopedStates,
  getInstitutionById,
} from '@/lib/data/admissionDataset';

/**
 * Admission Calculator Utility Functions
 * Handles all calculations for admission chances based on JAMB scores, institutions, and courses.
 */

export interface CourseData {
  tier: number;
  cutoff: number;
  competition: 'Very High' | 'High' | 'Medium' | 'Low';
}

export interface CalculationResult {
  chance: number;
  factors: string[];
  recommendation: string;
}

const defaultCourseData: CourseData = {
  tier: 3,
  cutoff: 160,
  competition: 'Low',
};

const courseAliasMap: Record<string, string> = {
  'MEDICINE AND SURGERY (MBBS)': 'medicine',
  'DENTISTRY (BDS)': 'dentistry',
  'PHARMACY (PHARM.D)': 'pharmacy',
  'LAW (LL.B)': 'law',
  'NURSING PROGRAMME': 'nursing',
  'MEDICAL LABORATORY SCIENCE (B.MLS)': 'medical_lab',
  'PHYSIOTHERAPY': 'physiotherapy',
  'RADIOGRAPHY AND RADIATION SCIENCE': 'radiography',
  'VETERINARY MEDICINE (DVM)': 'vet_med',
  'OPTOMETRY': 'optometry',
  'ANATOMY': 'anatomy',
  'PHYSIOLOGY': 'physiology',
  'ACCOUNTING': 'accounting',
  'BANKING AND FINANCE': 'banking_finance',
  'BUSINESS ADMINISTRATION & MANAGEMENT': 'business_admin',
  'ECONOMICS': 'economics',
  'MASS COMMUNICATION': 'mass_comm',
  'COMPUTER SCIENCE': 'computer_science',
  'ELECTRICAL/ELECTRONICS ENGINEERING TECHNOLOGY': 'electrical_eng',
  'MECHANICAL ENGINEERING TECHNOLOGY': 'mechanical_eng',
  'CIVIL ENGINEERING TECHNOLOGY': 'civil_eng',
  'ARCHITECTURAL TECHNOLOGY': 'architecture',
  'ESTATE MANAGEMENT AND VALUATION': 'estate_management',
  'URBAN AND REGIONAL PLANNING': 'urban_regional',
  'BIOCHEMISTRY': 'biochemistry',
  'MICROBIOLOGY': 'microbiology',
  'PUBLIC ADMINISTRATION': 'public_admin',
  'LOCAL GOVERNMENT STUDIES': 'local_govt',
  'SOCIOLOGY': 'sociology',
  'POLITICAL SCIENCE': 'political_science',
  'HISTORY AND INTERNATIONAL STUDIES': 'history',
  'THEATRE ARTS': 'theatre_arts',
  'LINGUISTICS': 'linguistics',
  'ENGLISH LANGUAGE AND LITERATURE': 'english',
  'MODERN LANGUAGES': 'french',
  'EDUCATION PROGRAMS WITH SUBJECT MAJORS': 'education',
  'AGRICULTURAL ECONOMICS': 'agric_econ',
  'ANIMAL SCIENCE': 'animal_science',
  'CROP SCIENCE': 'crop_science',
  'SOIL SCIENCE': 'soil_science',
};

function normalizeCourseKey(course: string): string {
  return course
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_');
}

function inferCourseDataFromName(course: string): CourseData {
  if (/\bLAW\b/.test(course)) {
    return { tier: 1, cutoff: 270, competition: 'Very High' };
  }

  if (/\b(MEDICINE|PHARMACY|DENTISTRY|VETERINARY|OPTOMETRY|RADIOGRAPHY|PHYSIOTHERAPY|NURSING|DENTAL|ANATOMY|PHYSIOLOGY|MEDICAL)\b/.test(course)) {
    return { tier: 1, cutoff: 250, competition: 'High' };
  }

  if (/\b(ENGINEERING|COMPUTER|CYBER|INFORMATION TECHNOLOGY|PETROLEUM|MARITIME|GAS|AUTOMOBILE|AERONAUTICAL|AVIATION|HYDROLOGY|RAILWAY|TRANSPORT|LOGISTICS|SURVEYING)\b/.test(course)) {
    return { tier: 2, cutoff: 220, competition: 'High' };
  }

  if (/\b(ACCOUNTING|FINANCE|BUSINESS|ECONOMICS|MARKETING|MANAGEMENT|COMMUNICATION|ARCHITECTURE|HOSPITALITY|TOURISM|HOTEL|PUBLIC ADMINISTRATION|TAXATION|ESTATE MANAGEMENT|URBAN|REGIONAL|ENVIRONMENTAL|GEOLOGY|GEOGRAPHY|FASHION|GRAPHICS|PHARMACEUTICAL|HEALTH|EDUCATION)\b/.test(course)) {
    return { tier: 2, cutoff: 200, competition: 'Medium' };
  }

  if (/\b(SOCIOLOGY|POLITICAL SCIENCE|HISTORY|THEATRE|LINGUISTICS|ENGLISH|LANGUAGE|MODERN LANGUAGES|CULTURAL|SOCIAL|SPORTS|PHYSICAL|LEATHER|LAUNDRY|COLLEGE|INSTITUTE|ENVIRONMENTAL|GEOSCIENCE|RESOURCE|SCIENCE)\b/.test(course)) {
    return { tier: 3, cutoff: 170, competition: 'Low' };
  }

  return defaultCourseData;
}

function getCourseData(course: string): CourseData {
  const normalizedCourse = course.trim().toUpperCase();
  const aliasKey = courseAliasMap[normalizedCourse];
  if (aliasKey && courseData[aliasKey]) {
    return courseData[aliasKey];
  }

  const normalizedKey = normalizeCourseKey(course);
  if (courseData[normalizedKey]) {
    return courseData[normalizedKey];
  }

  return inferCourseDataFromName(normalizedCourse);
}

export const courseData: Record<string, CourseData> = {
  medicine: { tier: 1, cutoff: 280, competition: 'Very High' },
  dentistry: { tier: 1, cutoff: 270, competition: 'Very High' },
  pharmacy: { tier: 1, cutoff: 260, competition: 'Very High' },
  law: { tier: 1, cutoff: 270, competition: 'Very High' },
  nursing: { tier: 1, cutoff: 250, competition: 'High' },
  medical_lab: { tier: 1, cutoff: 240, competition: 'High' },
  physiotherapy: { tier: 1, cutoff: 240, competition: 'High' },
  radiography: { tier: 1, cutoff: 240, competition: 'High' },
  vet_med: { tier: 1, cutoff: 240, competition: 'High' },
  optometry: { tier: 1, cutoff: 240, competition: 'High' },
  anatomy: { tier: 1, cutoff: 230, competition: 'Medium' },
  physiology: { tier: 1, cutoff: 230, competition: 'Medium' },
  accounting: { tier: 2, cutoff: 220, competition: 'High' },
  banking_finance: { tier: 2, cutoff: 200, competition: 'Medium' },
  business_admin: { tier: 2, cutoff: 210, competition: 'Medium' },
  economics: { tier: 2, cutoff: 200, competition: 'Medium' },
  mass_comm: { tier: 2, cutoff: 230, competition: 'High' },
  computer_science: { tier: 2, cutoff: 220, competition: 'High' },
  electrical_eng: { tier: 2, cutoff: 220, competition: 'High' },
  mechanical_eng: { tier: 2, cutoff: 220, competition: 'High' },
  civil_eng: { tier: 2, cutoff: 210, competition: 'Medium' },
  architecture: { tier: 2, cutoff: 200, competition: 'Medium' },
  estate_management: { tier: 2, cutoff: 180, competition: 'Low' },
  urban_regional: { tier: 2, cutoff: 180, competition: 'Low' },
  biochemistry: { tier: 2, cutoff: 200, competition: 'Medium' },
  microbiology: { tier: 2, cutoff: 200, competition: 'Medium' },
  public_admin: { tier: 3, cutoff: 180, competition: 'Low' },
  local_govt: { tier: 3, cutoff: 160, competition: 'Low' },
  sociology: { tier: 3, cutoff: 180, competition: 'Low' },
  political_science: { tier: 3, cutoff: 190, competition: 'Medium' },
  history: { tier: 3, cutoff: 170, competition: 'Low' },
  theatre_arts: { tier: 3, cutoff: 180, competition: 'Low' },
  linguistics: { tier: 3, cutoff: 170, competition: 'Low' },
  english: { tier: 3, cutoff: 180, competition: 'Low' },
  french: { tier: 3, cutoff: 170, competition: 'Low' },
  education: { tier: 3, cutoff: 160, competition: 'Low' },
  agric_econ: { tier: 3, cutoff: 160, competition: 'Low' },
  animal_science: { tier: 3, cutoff: 160, competition: 'Low' },
  crop_science: { tier: 3, cutoff: 160, competition: 'Low' },
  soil_science: { tier: 3, cutoff: 160, competition: 'Low' },
};

export function calculateAdmissionChance(
  institutionId: string,
  course: string,
  score: number,
  state: string = ''
): CalculationResult | null {
  if (!institutionId || !course || !score) return null;

  const courseInfo = getCourseData(course);
  const institution = getInstitutionById(institutionId);
  if (!institution) return null;

  const factors: string[] = [];
  let chance = 0; // Base chance starts at 0
  const normalizedState = state?.trim();
  const isELDS = educationallyLessDevelopedStates.includes(normalizedState);

  // 1. Base score vs institution minimum
  if (score >= institution.minimum_score) {
    chance += 30;
    factors.push(`✓ You meet the minimum institution score (${institution.minimum_score})`);
  } else {
    chance += 5;
    factors.push(`✗ Your score is below the institution minimum of ${institution.minimum_score}`);
  }

  // 2. Course competitiveness (historical range vs JAMB score)
  const rangeString = getHistoricalRange(institution, course);
  let scoreVsCourseStatus: 'high' | 'med' | 'low' = 'low';

  if (rangeString) {
    const [minRange, maxRange] = parseRange(rangeString);
    if (score >= maxRange) {
      chance += 35;
      scoreVsCourseStatus = 'high';
      factors.push(`✓ Your score is within or above the competitive range (${minRange}-${maxRange}) for this course`);
    } else if (score >= minRange) {
      chance += 20;
      scoreVsCourseStatus = 'med';
      factors.push(`⚠ Your score is at the lower bound of the competitive range (${minRange}-${maxRange})`);
    } else {
      chance += 10;
      const eldsNote = isELDS ? '. However, as an ELDS applicant, you may still be considered via quota.' : '';
      factors.push(`✗ Your score is significantly below the typical cut-off (${minRange}-${maxRange}) for this course${eldsNote}`);
    }
  } else {
    // Fallback: Use course cutoff if historical range is missing
    if (score >= courseInfo.cutoff) {
      chance += 25;
      factors.push(`✓ Your score meets the estimated competitive cutoff for ${course}`);
    } else {
      chance += 10;
      factors.push(`⚠ Your score is below the estimated competitive cutoff for ${course}`);
    }
  }

  // 3. State of origin advantage (Catchment/ELDS/Priority)
  const catchmentStates = institution.catchment_states ?? [];
  
  if (institution.type === 'Federal University') {
    if (catchmentStates.includes(normalizedState)) {
      chance += 20;
      factors.push(`✓ Your state (${normalizedState}) is in the catchment area, giving you an advantage`);
    } else if (isELDS) {
      chance += 15;
      factors.push(`✓ ELDS concession applies – you may be considered with a slightly lower score`);
    } else {
      factors.push(`✗ You are not from a catchment state for this institution`);
    }
    
    // Special UNIABUJA FCT quota
    if (institutionId.toLowerCase().includes('uniabuja') && normalizedState === 'FCT') {
      chance += 5;
      factors.push(`✓ FCT quota (2%) gives you a small advantage at this institution`);
    }
  } else if (institution.type === 'State University') {
    if (institution.state_priority?.includes(normalizedState)) {
      chance += 25;
      factors.push(`✓ Indigene quota greatly improves your chance at this state university`);
    } else {
      factors.push(`✗ Non-indigene status; only 50% of seats are available to non-indigenes`);
    }
  }

  // 4. Institution and Course competitiveness modifiers
  const highCompUnis = ['unilag', 'ui', 'unilorin', 'abu', 'unn', 'oau'];
  if (institution.type === 'Federal University' && highCompUnis.some(id => institutionId.toLowerCase().includes(id))) {
    chance -= 10;
    factors.push('⚠ This institution is highly competitive');
  }

  if (courseInfo.competition === 'Very High' || courseInfo.competition === 'High') {
    chance -= 5;
    factors.push('⚠ This course is highly competitive');
  }

  // Extra advantage for scores that are well above both the course cutoff and institution minimum.
  const benchmark = Math.max(institution.minimum_score, courseInfo.cutoff);
  const scoreMargin = score - benchmark;

  if (scoreMargin >= 150) {
    chance += 20;
    factors.push('✓ Your score is far above the course and institution benchmarks, improving your chances significantly');
  } else if (scoreMargin >= 80) {
    chance += 15;
    factors.push('✓ Your score is comfortably above the course and institution benchmarks');
  } else if (scoreMargin >= 40) {
    chance += 10;
    factors.push('✓ Your score is above the course and institution benchmarks');
  }

  chance = Math.round(Math.max(0, Math.min(100, chance)));
  const recommendation = getRecommendation(chance);

  return { chance, factors, recommendation };
}

function getRecommendation(chance: number): string {
  if (chance >= 80) {
    return 'Excellent chance of admission! Your score and preference fit well with this institution and course.';
  }
  if (chance >= 60) {
    return 'Good chance of admission. This is a strong option to include in your list.';
  }
  if (chance >= 40) {
    return 'Moderate chance of admission. Consider it as part of a balanced strategy.';
  }
  if (chance >= 20) {
    return 'Low chance of admission. Look at more options or stronger combinations.';
  }
  return 'Very low chance of admission. You should prioritize safer alternatives.';
}

export function getChanceColor(chance: number): string {
  if (chance >= 80) return '#00a651';
  if (chance >= 60) return '#4CAF50';
  if (chance >= 40) return '#FFC107';
  if (chance >= 20) return '#FF9800';
  return '#F44336';
}

/**
 * Helper to retrieve historical score ranges for a specific course at an institution.
 */
function getHistoricalRange(institution: AdmissionInstitution, course: string): string | null {
  return institution.historical_score_ranges ? institution.historical_score_ranges[course] || null : null;
}

function parseRange(rangeString: string): [number, number] {
  const [low, high] = rangeString.split('-').map(value => Number(value.trim()));
  return [low, high];
}
