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

  const courseInfo = courseData[course];
  const institution = getInstitutionById(institutionId);
  if (!courseInfo || !institution) return null;

  const factors: string[] = [];
  let chance = 0;
  let effectiveCutoff = institution.minimum_score;

  const courseRange = getHistoricalRange(institution, course);
  if (courseRange) {
    const [low, high] = parseRange(courseRange);
    if (score >= high) {
      chance += 50;
      factors.push('✓ Your score is at or above the strong historical range for this course');
    } else if (score >= low) {
      chance += 40;
      factors.push('✓ Your score falls within the historical admission range for this course');
    } else if (score >= effectiveCutoff) {
      chance += 30;
      factors.push('✓ Your score meets the institution minimum score');
    } else if (score >= effectiveCutoff - 15) {
      chance += 20;
      factors.push('⚠ Your score is a little below the institution minimum score');
    } else {
      chance += 5;
      factors.push('✗ Your score is below the institution minimum score');
    }
  } else {
    const scoreDiff = score - effectiveCutoff;
    if (scoreDiff >= 30) {
      chance += 50;
      factors.push('✓ Your score is well above the institution minimum score');
    } else if (scoreDiff >= 10) {
      chance += 40;
      factors.push('✓ Your score is above the institution minimum score');
    } else if (scoreDiff >= 0) {
      chance += 30;
      factors.push('✓ Your score meets the institution minimum score');
    } else if (scoreDiff >= -10) {
      chance += 20;
      factors.push('⚠ Your score is slightly below the institution minimum score');
    } else {
      chance += 5;
      factors.push('✗ Your score is significantly below the institution minimum score');
    }
  }

  chance += getInstitutionFactor(institution, score);
  chance += getCourseCompetitionFactor(courseInfo);
  chance += getCatchmentAndQuotaFactor(institution, state);

  chance = Math.round(Math.max(0, Math.min(100, chance)));
  const recommendation = getRecommendation(chance);

  return { chance, factors, recommendation };
}

function getHistoricalRange(institution: AdmissionInstitution, course: string) {
  if (!institution.historical_score_ranges) return null;
  return institution.historical_score_ranges[course] ?? null;
}

function parseRange(rangeString: string): [number, number] {
  const [low, high] = rangeString.split('-').map(value => Number(value.trim()));
  return [low, high];
}

function getInstitutionFactor(institution: AdmissionInstitution, score: number): number {
  const institutionType = institution.type;
  if (institutionType === 'Private University') {
    return 25;
  }

  if (institutionType === 'Federal University') {
    if (educationallyLessDevelopedStates.includes(institution.host_state)) {
      return 15;
    }
    return 10;
  }

  if (institutionType === 'State University') {
    return 12;
  }

  if (institutionType === 'Polytechnic' || institutionType === 'State Polytechnic') {
    return 10;
  }

  if (institutionType === 'College of Education') {
    return 8;
  }

  if (institutionType === 'Monotechnic' || institutionType === 'College of Nursing' || institutionType === 'IEI') {
    return 12;
  }

  return 10;
}

function getCourseCompetitionFactor(courseInfo: CourseData): number {
  switch (courseInfo.competition) {
    case 'Very High':
      return 5;
    case 'High':
      return 10;
    case 'Medium':
      return 15;
    case 'Low':
      return 18;
    default:
      return 10;
  }
}

function getCatchmentAndQuotaFactor(institution: AdmissionInstitution, state: string): number {
  let factor = 0;
  const normalizedState = state?.trim();
  const catchmentStates = institution.catchment_states ?? [];

  if (!normalizedState) {
    factor += 5;
    return factor;
  }

  if (catchmentStates.includes(normalizedState)) {
    factor += 10;
  } else {
    factor += 5;
  }

  if (institution.type === 'Federal University' && institution.fct_quota_enabled && normalizedState === 'FCT') {
    factor += 5;
  }

  if (institution.type === 'Federal University' && educationallyLessDevelopedStates.includes(normalizedState)) {
    factor += 10;
  }

  if (institution.type === 'State University' && institution.state_priority?.includes(normalizedState)) {
    factor += 10;
  }

  if (institution.type === 'Private University') {
    factor += 5;
  }

  return factor;
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

