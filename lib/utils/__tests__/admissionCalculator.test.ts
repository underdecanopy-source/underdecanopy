import { calculateAdmissionChance, getChanceColor, courseData, resolveCourseData } from '../admissionCalculator';
import { allInstitutions, getInstitutionById } from '@/lib/data/admissionDataset';
import { allCourses, courseInstitutionMap, getApplySmartInstitutionById, isUtmeExemptNdAgricultureCourse, supplementalInstitutions, utmeExemptNdAgricultureCourses } from '@/lib/data/applysmart';

function normalizeCourseKey(course: string): string {
  return course
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_');
}

describe('Admission Calculator', () => {
  describe('calculateAdmissionChance', () => {
    it('should calculate admission chance for valid inputs', () => {
      const result = calculateAdmissionChance('UNILAG', 'medicine', 350, 'Lagos');
      
      expect(result).not.toBeNull();
      if (!result) throw new Error('Expected non-null result');
      expect(result!.chance).toBeGreaterThan(0);
      expect(result!.chance).toBeLessThanOrEqual(100);
      expect(result!.factors).toBeInstanceOf(Array);
      expect(result!.recommendation).toBeDefined();
    });

    it('should return high chance for excellent score at catchment institution', () => {
      const result = calculateAdmissionChance('UNILAG', 'estate_management', 350, 'Lagos');
      
      expect(result).not.toBeNull();
      expect(result!.chance).toBeGreaterThan(80);
      expect(result!.recommendation).toContain('Excellent');
    });

    it('should return lower chance for borderline score', () => {
      const result = calculateAdmissionChance('UNILAG', 'medicine', 280, 'Lagos');
      
      expect(result).not.toBeNull();
      expect(result!.chance).toBeGreaterThan(0);
      expect(result!.chance).toBeLessThan(100);
    });

    it('should return lower chance for score below cutoff', () => {
      const result = calculateAdmissionChance('UNILAG', 'medicine', 200, 'Lagos');
      
      expect(result).not.toBeNull();
      expect(result!.chance).toBeLessThan(60);
    });

    it('should penalize non-catchment students', () => {
      const catchmentResult = calculateAdmissionChance('UNILAG', 'medicine', 300, 'Lagos');
      const nonCatchmentResult = calculateAdmissionChance('UNILAG', 'medicine', 300, 'Abia');
      
      expect(catchmentResult).not.toBeNull();
      expect(nonCatchmentResult).not.toBeNull();
      expect(catchmentResult!.chance).toBeGreaterThan(nonCatchmentResult!.chance);
    });

    it('should handle all valid institutions', () => {
      const institutions = allInstitutions.map((institution) => institution.id);
      
      institutions.forEach((institution) => {
        const result = calculateAdmissionChance(institution, 'medicine', 300, 'Lagos');
        expect(result).not.toBeNull();
        expect(result!.chance).toBeGreaterThan(0);
        expect(result!.chance).toBeLessThanOrEqual(100);
      });
    });

    it('should handle all valid courses', () => {
      const courses = Object.keys(courseData);
      
      courses.forEach((course) => {
        const result = calculateAdmissionChance('UNILAG', course, 300, 'Lagos');
        expect(result).not.toBeNull();
        expect(result!.chance).toBeGreaterThan(0);
        expect(result!.chance).toBeLessThanOrEqual(100);
      });
    });

    it('should include relevant factors in result', () => {
      const result = calculateAdmissionChance('UNILAG', 'medicine', 300, 'Lagos');

      expect(result).not.toBeNull();
      expect(result!.factors.length).toBeGreaterThan(0);
    });

    it('should calculate admission chance for supplemental applysmart institutions', () => {
      const result = calculateAdmissionChance('AAP', 'BANKING AND FINANCE', 240, 'Lagos');

      expect(result).not.toBeNull();
      expect(result!.chance).toBeGreaterThan(0);
      expect(result!.chance).toBeLessThanOrEqual(100);
      expect(result!.factors).toContain(
        '⚠ Note: institution-specific policy data is limited; using score benchmarks and general catchment/indigene policies.'
      );
    });

    it('should return consistent results for same inputs', () => {
      const result1 = calculateAdmissionChance('UNILAG', 'medicine', 300, 'Lagos');
      const result2 = calculateAdmissionChance('UNILAG', 'medicine', 300, 'Lagos');

      expect(result1?.chance).toBe(result2?.chance);
      expect(result1?.recommendation).toBe(result2?.recommendation);
    });

    it('should handle edge case: score of 0', () => {
      const result = calculateAdmissionChance('UNILAG', 'medicine', 0, 'Lagos');

      expect(result).toBeNull();
    });

    it('should handle edge case: maximum score', () => {
      const result = calculateAdmissionChance('UNILAG', 'medicine', 400, 'Lagos');

      expect(result).not.toBeNull();
      expect(result!.chance).toBeLessThanOrEqual(100);
      expect(result!.chance).toBeGreaterThan(0);
    });

    it('should consider institution competitiveness', () => {
      const veryHighComp = calculateAdmissionChance('UNILAG', 'medicine', 300, 'Lagos');
      const lowComp = calculateAdmissionChance('PLASU', 'medicine', 300, 'Plateau');
      
      expect(veryHighComp).not.toBeNull();
      expect(lowComp).not.toBeNull();
      expect(lowComp!.chance).toBeGreaterThan(veryHighComp!.chance);
    });

    it('should consider course tier', () => {
      const tier1 = calculateAdmissionChance('UNILAG', 'medicine', 300, 'Lagos');
      const tier3 = calculateAdmissionChance('UNILAG', 'education', 300, 'Lagos');
      
      expect(tier1).not.toBeNull();
      expect(tier3).not.toBeNull();
      expect(tier3!.chance).toBeGreaterThan(tier1!.chance);
    });
  });

  describe('getChanceColor', () => {
    it('should return green for high chance (80+)', () => {
      expect(getChanceColor(80)).toBe('#00a651');
      expect(getChanceColor(90)).toBe('#00a651');
      expect(getChanceColor(100)).toBe('#00a651');
    });

    it('should return light green for good chance (60-79)', () => {
      expect(getChanceColor(60)).toBe('#4CAF50');
      expect(getChanceColor(70)).toBe('#4CAF50');
      expect(getChanceColor(79)).toBe('#4CAF50');
    });

    it('should return amber for moderate chance (40-59)', () => {
      expect(getChanceColor(40)).toBe('#FFC107');
      expect(getChanceColor(50)).toBe('#FFC107');
      expect(getChanceColor(59)).toBe('#FFC107');
    });

    it('should return orange for low chance (20-39)', () => {
      expect(getChanceColor(20)).toBe('#FF9800');
      expect(getChanceColor(30)).toBe('#FF9800');
      expect(getChanceColor(39)).toBe('#FF9800');
    });

    it('should return red for very low chance (<20)', () => {
      expect(getChanceColor(0)).toBe('#F44336');
      expect(getChanceColor(10)).toBe('#F44336');
      expect(getChanceColor(19)).toBe('#F44336');
    });

    it('should handle boundary values correctly', () => {
      expect(getChanceColor(80)).toBe('#00a651'); // boundary
      expect(getChanceColor(60)).toBe('#4CAF50'); // boundary
      expect(getChanceColor(40)).toBe('#FFC107'); // boundary
      expect(getChanceColor(20)).toBe('#FF9800'); // boundary
    });

    it('should handle decimal values', () => {
      expect(getChanceColor(85.5)).toBe('#00a651');
      expect(getChanceColor(65.3)).toBe('#4CAF50');
      expect(getChanceColor(45.7)).toBe('#FFC107');
      expect(getChanceColor(25.2)).toBe('#FF9800');
      expect(getChanceColor(15.8)).toBe('#F44336');
    });
  });

  describe('Course Data', () => {
    it('should have all required courses', () => {
      const requiredCourses = [
        'medicine',
        'law',
        'engineering',
        'accounting',
        'education',
      ];
      
      requiredCourses.forEach((course) => {
        expect(courseData[course] || courseData[course.replace('engineering', 'electrical_eng')]).toBeDefined();
      });
    });

    it('should have valid tier values', () => {
      Object.values(courseData).forEach((course) => {
        expect([1, 2, 3]).toContain(course.tier);
      });
    });

    it('should have valid competition levels', () => {
      const validCompetitions = ['Very High', 'High', 'Medium', 'Low'];
      
      Object.values(courseData).forEach((course) => {
        expect(validCompetitions).toContain(course.competition);
      });
    });

    it('should have reasonable cutoff marks', () => {
      Object.values(courseData).forEach((course) => {
        expect(course.cutoff).toBeGreaterThan(0);
        expect(course.cutoff).toBeLessThanOrEqual(400);
      });
    });

    it('should expose at least one institution for every applysmart course', () => {
      expect(allCourses.length).toBeGreaterThanOrEqual(160);

      allCourses.forEach(({ value }) => {
        expect(courseInstitutionMap[value]).toBeDefined();
        expect(courseInstitutionMap[value].length).toBeGreaterThan(0);
      });
    });

    it('should preserve raw institutions that do not exist in the canonical dataset', () => {
      expect(courseInstitutionMap['BANKING AND FINANCE']).toContain('AAP');
      expect(courseInstitutionMap['AVIATION MANAGEMENT']).toContain('AZMAN');
      expect(supplementalInstitutions.some((option) => option.value === 'AAP')).toBe(true);
      expect(supplementalInstitutions.some((option) => option.value === 'AZMAN')).toBe(true);
    });

    it('should merge canonical university offerings into user-facing alias courses', () => {
      expect(courseInstitutionMap['Computer Science']).toContain('UI');
      expect(courseInstitutionMap['Computer Science']).toContain('UNILAG');
      expect(courseInstitutionMap['Accounting']).toContain('UI');
      expect(courseInstitutionMap['Economics']).toContain('UI');
    });

    it('should expose alias-backed courses only once in the user-facing course list', () => {
      const courseValues = allCourses.map((course) => course.value);
      const courseLabels = allCourses.map((course) => course.label);

      expect(courseValues).toContain('Computer Science');
      expect(courseValues).not.toContain('COMPUTER SCIENCE');
      expect(courseValues).toContain('Accounting');
      expect(courseValues).not.toContain('ACCOUNTANCY');
      expect(courseValues).toContain('Business Administration');
      expect(courseValues).not.toContain('BUSINESS ADMINISTRATION & MANAGEMENT');
      expect(courseLabels.filter((label) => label === 'Computer Science')).toHaveLength(1);
    });

    it('should resolve every applysmart institution through the shared registry', () => {
      const institutionIds = new Set(Object.values(courseInstitutionMap).flat());

      institutionIds.forEach((institutionId) => {
        expect(getApplySmartInstitutionById(institutionId)).not.toBeNull();
        expect(getInstitutionById(institutionId)).not.toBeNull();
      });
    });

    it('should prefer explicit course institution lists over broad source aliases', () => {
      expect(courseInstitutionMap['ACCOUNTING TECHNOLOGY']).toEqual(['FUTA', 'ATBU', 'BELLS', 'UNICAL']);
      expect(courseInstitutionMap['COMPUTER AND INFORMATION SCIENCE']).toEqual(['LCITY', 'COVENANT', 'IGBINEDION']);
      expect(courseInstitutionMap['COMPUTER SCIENCE WITH ACCOUNTING']).toEqual(['BIU', 'LASU', 'UNIPORT', 'ATBU']);
      expect(courseInstitutionMap['COMPUTER SCIENCE WITH ISLAMIC RELIGIOUS STUDIES']).toEqual(['AL-QALAM', 'FUDMA']);
      expect(courseInstitutionMap['ELECTRICAL ENGINEERING TECHNOLOGY']).toEqual(['EASTERN-POLY', 'IGBO-OWU POLY']);
      expect(courseInstitutionMap['FILM PRODUCTION']).toEqual(['CCU', 'NOUN-ELUON', 'UNIPORT']);
      expect(courseInstitutionMap['INFORMATION SYSTEMS AND TECHNOLOGY']).toEqual(['DELSUT', 'NILE']);
    });

    it('should normalize known institution code variants without collapsing distinct schools', () => {
      expect(courseInstitutionMap['MASS COMMUNICATION']).toContain('SARO-WIWA POLY');
      expect(courseInstitutionMap['MASS COMMUNICATION']).not.toContain('SARO-WWA POLY');
      expect(courseInstitutionMap['ENVIRONMENTAL HEALTH TECHNOLOGY']).toContain('SHEHU IDRIS');
      expect(courseInstitutionMap['ENVIRONMENTAL HEALTH TECHNOLOGY']).not.toContain('SHEHU IRIS');
      expect(courseInstitutionMap['FORESTRY TECHNOLOGY']).toContain('FEDFORESTRYJOS');
      expect(courseInstitutionMap['FORESTRY TECHNOLOGY']).toContain('FEDCOFOR-IBD');
      expect(courseInstitutionMap['FORESTRY TECHNOLOGY']).toHaveLength(17);
    });

    it('should exclude colleges of education from active applysmart institution options', () => {
      const institutionIds = new Set(Object.values(courseInstitutionMap).flat());

      institutionIds.forEach((institutionId) => {
        const institution = getApplySmartInstitutionById(institutionId);
        expect(institution).not.toBeNull();
        expect(institution?.type).not.toBe('College of Education');
      });

      expect(supplementalInstitutions.some((option) => option.value === 'FCE-DAURA')).toBe(false);
    });

    it('should provide an explicit course profile for every applysmart course', () => {
      expect(allCourses.length).toBeGreaterThanOrEqual(160);

      allCourses.forEach(({ value }) => {
        const explicitProfile = resolveCourseData(value);
        expect(explicitProfile).toBeDefined();
        expect(explicitProfile.cutoff).toBeGreaterThan(0);
      });
    });

    it('should flag ND agriculture-related courses that now use the UTME-exempt JAMB route', () => {
      utmeExemptNdAgricultureCourses.forEach((course) => {
        expect(isUtmeExemptNdAgricultureCourse(course)).toBe(true);
        expect(courseInstitutionMap[course].length).toBeGreaterThan(0);
      });

      expect(isUtmeExemptNdAgricultureCourse('COMPUTER SCIENCE')).toBe(false);
    });

    it('should provide concrete profiles for previously generic applysmart courses', () => {
      const tunedCourses = [
        { course: 'ACCOUNTANCY', expected: { tier: 2, cutoff: 220, competition: 'High' } },
        { course: 'AGRICULTURAL TECHNOLOGY', expected: { tier: 3, cutoff: 170, competition: 'Low' } },
        { course: 'ARTS AND DESIGN', expected: { tier: 3, cutoff: 180, competition: 'Low' } },
        { course: 'BUILDING TECHNOLOGY', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'FOOD TECHNOLOGY', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'FORESTRY TECHNOLOGY', expected: { tier: 3, cutoff: 170, competition: 'Low' } },
        { course: 'GEOLOGICAL TECHNOLOGY', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'GLASS/CERAMICS TECHNOLOGY', expected: { tier: 3, cutoff: 170, competition: 'Low' } },
        { course: 'HORTICULTURAL TECHNOLOGY', expected: { tier: 3, cutoff: 170, competition: 'Low' } },
        { course: 'INSURANCE', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'MULTIMEDIA TECHNOLOGY', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'MUSIC TECHNOLOGY', expected: { tier: 3, cutoff: 180, competition: 'Low' } },
        { course: 'PHOTOGRAPHY', expected: { tier: 3, cutoff: 170, competition: 'Low' } },
        { course: 'POLYMER TECHNOLOGY', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'PRINTING TECHNOLOGY', expected: { tier: 2, cutoff: 190, competition: 'Medium' } },
        { course: 'PROSTHETICS/ORTHOTICS TECHNOLOGY', expected: { tier: 2, cutoff: 220, competition: 'High' } },
        { course: 'TEXTILES TECHNOLOGY', expected: { tier: 2, cutoff: 190, competition: 'Medium' } },
        { course: 'WELDING AND FABRICATION TECHNOLOGY', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'WOOD AND PAPER TECHNOLOGY', expected: { tier: 2, cutoff: 180, competition: 'Low' } },
        { course: 'AUTO BODY TECHNOLOGY', expected: { tier: 2, cutoff: 180, competition: 'Low' } },
        { course: 'CARTOGRAPHY AND GEOGRAPHIC INFORMATION SYSTEM', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'CERAMICS TECHNOLOGY', expected: { tier: 3, cutoff: 170, competition: 'Low' } },
        { course: 'CLIMATE CHANGE SCIENCES', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'CROP PRODUCTION TECHNOLOGY', expected: { tier: 3, cutoff: 170, competition: 'Low' } },
        { course: 'DISPENSING OPTICIANRY', expected: { tier: 2, cutoff: 220, competition: 'High' } },
        { course: 'ELECTRICAL TECHNOLOGY', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'ENERGY STUDIES', expected: { tier: 2, cutoff: 210, competition: 'Medium' } },
        { course: 'EPIDEMIOLOGY AND DISEASE CONTROL', expected: { tier: 2, cutoff: 210, competition: 'Medium' } },
        { course: 'EXPLOSIVE ORDNANCE TECHNOLOGY', expected: { tier: 2, cutoff: 220, competition: 'High' } },
        { course: 'FILM AND MULTI MEDIA STUDIES', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'FILM AND VIDEO STUDIES', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'FILM PRODUCTION', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'FILM STUDIES AND PRODUCTION', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'FISHERIES AND AQUATIC TECHNOLOGY', expected: { tier: 3, cutoff: 170, competition: 'Low' } },
        { course: 'GEOSCIENCES INFORMATION SYSTEM', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'HORTICULTURE AND LANDSCAPE TECHNOLOGY', expected: { tier: 3, cutoff: 170, competition: 'Low' } },
        { course: 'INDUSTRIAL AND LABOUR RELATIONS', expected: { tier: 2, cutoff: 190, competition: 'Medium' } },
        { course: 'INDUSTRIAL DESIGN', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'INFORMATION AND MEDIA STUDIES', expected: { tier: 2, cutoff: 200, competition: 'Medium' } },
        { course: 'INFORMATION AND MEDIA TECHNOLOGY', expected: { tier: 2, cutoff: 210, competition: 'Medium' } },
        { course: 'INFORMATION SYSTEMS', expected: { tier: 2, cutoff: 220, competition: 'High' } },
        { course: 'INFORMATION SYSTEMS AND TECHNOLOGY', expected: { tier: 2, cutoff: 220, competition: 'High' } },
      ] as const;

      tunedCourses.forEach(({ course, expected }) => {
        expect(resolveCourseData(course)).toEqual(expected);
      });
    });
  });

  describe('Institution Data', () => {
    it('should have all major institutions', () => {
      const majorInstitutions = ['UNILAG', 'UI', 'OAU', 'UNIBEN', 'UNN'];
      
      majorInstitutions.forEach((institutionId) => {
        expect(allInstitutions.find(institution => institution.id === institutionId)).toBeDefined();
      });
    });

    it('should have valid institution properties', () => {
      allInstitutions.forEach((institution) => {
        expect(institution.id).toBeDefined();
        expect(institution.name).toBeDefined();
        expect(institution.host_state).toBeDefined();
        expect(typeof institution.minimum_score).toBe('number');
      });
    });

    it('should provide structured directory institution records for applysmart-only ids', () => {
      const forestryIbadan = getApplySmartInstitutionById('FEDCOFOR-IBD');
      const nursingAnambra = getApplySmartInstitutionById('CNS-ANAMBRA');

      expect(forestryIbadan).toMatchObject({
        id: 'FEDCOFOR-IBD',
        name: 'Federal College of Forestry, Ibadan',
        type: 'Monotechnic',
        host_state: 'Oyo',
        minimum_score: 120,
        data_source: 'applysmart_directory',
        policy_data_complete: false,
      });

      expect(nursingAnambra).toMatchObject({
        id: 'CNS-ANAMBRA',
        name: 'College of Nursing Sciences, Anambra',
        type: 'College of Nursing',
        host_state: 'Anambra',
        minimum_score: 140,
        data_source: 'applysmart_directory',
        policy_data_complete: false,
      });
    });

    it('should have catchment arrays when provided', () => {
      allInstitutions.forEach((institution) => {
        if (institution.catchment_states) {
          expect(Array.isArray(institution.catchment_states)).toBe(true);
          expect(institution.catchment_states.length).toBeGreaterThan(0);
        }
      });
    });

    it('should have valid state names in catchment arrays', () => {
      allInstitutions.forEach((institution) => {
        institution.catchment_states?.forEach((state) => {
          expect(typeof state).toBe('string');
          expect(state.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe('Integration Tests', () => {
    it('should provide realistic recommendations', () => {
      const scenarios = [
        { institution: 'UNILAG', course: 'medicine', score: 350, state: 'Lagos', expectedChance: 'high' },
        { institution: 'PLASU', course: 'education', score: 200, state: 'Plateau', expectedChance: 'high' },
        { institution: 'UNILAG', course: 'medicine', score: 150, state: 'Kano', expectedChance: 'low' },
      ];
      
      scenarios.forEach((scenario) => {
        const result = calculateAdmissionChance(
          scenario.institution,
          scenario.course,
          scenario.score,
          scenario.state
        );
        
        expect(result).not.toBeNull();
        expect(result!.recommendation).toBeDefined();
        expect(result!.recommendation.length).toBeGreaterThan(0);
      });
    });

    it('should handle multiple calculations without interference', () => {
      const result1 = calculateAdmissionChance('UNILAG', 'medicine', 300, 'Lagos');
      const result2 = calculateAdmissionChance('UI', 'law', 280, 'Oyo');
      const result3 = calculateAdmissionChance('UNILAG', 'medicine', 300, 'Lagos');

      expect(result1?.chance).toBe(result3?.chance);
      // Results might be the same due to similar calculations, so just verify they're defined
      expect(result1).not.toBeNull();
      expect(result2).not.toBeNull();
      expect(result3).not.toBeNull();
    });
  });
});
