/**
 * Admission Calculator Utility Functions
 * Handles all calculations for admission chances based on JAMB scores, institutions, and courses
 */

export interface CourseData {
  tier: number;
  cutoff: number;
  competition: 'Very High' | 'High' | 'Medium' | 'Low';
}

export interface InstitutionData {
  competitiveness: 'Very High' | 'High' | 'Medium' | 'Low';
  catchment: string[];
}

export interface CalculationResult {
  chance: number;
  factors: string[];
  recommendation: string;
}

// Course data with cutoff marks and competition levels
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

// Institution data with competitiveness and catchment areas
export const institutionData: Record<string, InstitutionData> = {
  UNILAG: { competitiveness: 'Very High', catchment: ['Lagos'] },
  UI: { competitiveness: 'Very High', catchment: ['Oyo'] },
  OAU: { competitiveness: 'High', catchment: ['Osun', 'Ondo', 'Ogun', 'Ekiti'] },
  UNIBEN: { competitiveness: 'High', catchment: ['Edo', 'Delta'] },
  UNN: { competitiveness: 'High', catchment: ['Enugu', 'Anambra', 'Ebonyi'] },
  ABU: { competitiveness: 'High', catchment: ['Kaduna', 'Katsina', 'Kano'] },
  BUK: { competitiveness: 'Medium', catchment: ['Kano'] },
  FUTA: { competitiveness: 'High', catchment: ['Ondo'] },
  FUTO: { competitiveness: 'High', catchment: ['Imo'] },
  UNIPORT: { competitiveness: 'High', catchment: ['Rivers', 'Bayelsa'] },
  UNILORIN: { competitiveness: 'High', catchment: ['Kwara'] },
  UNICAL: { competitiveness: 'Medium', catchment: ['Cross River'] },
  FUNAAB: { competitiveness: 'Medium', catchment: ['Ogun'] },
  UNIJOS: { competitiveness: 'Medium', catchment: ['Plateau'] },
  UNIMAID: { competitiveness: 'Medium', catchment: ['Borno'] },
  LASU: { competitiveness: 'High', catchment: ['Lagos'] },
  EKSU: { competitiveness: 'Medium', catchment: ['Ekiti'] },
  AAU: { competitiveness: 'Medium', catchment: ['Edo'] },
  OOU: { competitiveness: 'Medium', catchment: ['Ogun'] },
  RSU: { competitiveness: 'Medium', catchment: ['Rivers'] },
  PLASU: { competitiveness: 'Low', catchment: ['Plateau'] },
  KSU: { competitiveness: 'Low', catchment: ['Kogi'] },
  YABATECH: { competitiveness: 'High', catchment: ['Lagos'] },
  FEDPOLYNEKEDE: { competitiveness: 'Medium', catchment: ['Imo'] },
  FEDPOLYILARO: { competitiveness: 'Medium', catchment: ['Ogun'] },
  MAPOLY: { competitiveness: 'Medium', catchment: ['Ogun'] },
};

/**
 * Calculate admission chance based on multiple factors
 * Weights: Score (50%), Institution (25%), Course (15%), Catchment (10%)
 */
export function calculateAdmissionChance(
  institution: string,
  course: string,
  score: number,
  state: string = ''
): CalculationResult | null {
  if (!institution || !course || !score) return null;

  const courseInfo = courseData[course];
  const institutionInfo = institutionData[institution];

  if (!courseInfo || !institutionInfo) return null;

  let baseChance = 0;
  const factors: string[] = [];

  // Score factor (50% weight)
  const scoreDiff = score - courseInfo.cutoff;
  if (scoreDiff >= 30) {
    baseChance += 50;
    factors.push('✓ Your score is well above the typical cutoff for this course');
  } else if (scoreDiff >= 10) {
    baseChance += 40;
    factors.push('✓ Your score is above the typical cutoff for this course');
  } else if (scoreDiff >= 0) {
    baseChance += 30;
    factors.push('✓ Your score meets the typical cutoff for this course');
  } else if (scoreDiff >= -10) {
    baseChance += 15;
    factors.push('⚠ Your score is slightly below the typical cutoff for this course');
  } else {
    baseChance += 5;
    factors.push('✗ Your score is significantly below the typical cutoff for this course');
  }

  // Institution competitiveness (25% weight)
  if (institutionInfo.competitiveness === 'Very High') {
    baseChance += 10;
    factors.push('⚠ This institution is highly competitive');
  } else if (institutionInfo.competitiveness === 'High') {
    baseChance += 15;
    factors.push('⚠ This institution is competitive');
  } else if (institutionInfo.competitiveness === 'Medium') {
    baseChance += 20;
    factors.push('✓ This institution has medium competitiveness');
  } else {
    baseChance += 25;
    factors.push('✓ This institution has lower competitiveness');
  }

  // Course competition (15% weight)
  if (courseInfo.competition === 'Very High') {
    baseChance += 5;
    factors.push('⚠ This course is highly competitive');
  } else if (courseInfo.competition === 'High') {
    baseChance += 10;
    factors.push('⚠ This course is competitive');
  } else if (courseInfo.competition === 'Medium') {
    baseChance += 12;
    factors.push('✓ This course has medium competition');
  } else {
    baseChance += 15;
    factors.push('✓ This course has lower competition');
  }

  // Catchment area (10% weight)
  if (state && institutionInfo.catchment.includes(state)) {
    baseChance += 10;
    factors.push('✓ You are from a catchment state for this institution');
  } else if (state) {
    baseChance += 5;
    factors.push('⚠ You are not from a catchment state for this institution');
  } else {
    baseChance += 7;
  }

  // Ensure chance is between 0-100
  baseChance = Math.max(0, Math.min(100, baseChance));

  // Generate recommendation
  const recommendation = getRecommendation(Math.round(baseChance));

  return {
    chance: Math.round(baseChance),
    factors,
    recommendation,
  };
}

/**
 * Get recommendation text based on admission chance percentage
 */
function getRecommendation(chance: number): string {
  if (chance >= 80) {
    return 'Excellent chance of admission! Your score and preferences align well with this institution and course.';
  } else if (chance >= 60) {
    return 'Good chance of admission. Consider this a strong option among your preferences.';
  } else if (chance >= 40) {
    return 'Moderate chance of admission. This could be a viable option but consider alternatives as well.';
  } else if (chance >= 20) {
    return 'Low chance of admission. You may want to explore other institution/course combinations.';
  } else {
    return 'Very low chance of admission. Strongly consider alternative options.';
  }
}

/**
 * Get color for chance percentage (for UI visualization)
 */
export function getChanceColor(chance: number): string {
  if (chance >= 80) return '#00a651'; // Green
  if (chance >= 60) return '#4CAF50'; // Light Green
  if (chance >= 40) return '#FFC107'; // Amber
  if (chance >= 20) return '#FF9800'; // Orange
  return '#F44336'; // Red
}

