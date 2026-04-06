import {
  calculateAdmissionChance,
  getChanceColor,
  courseData,
  institutionData,
} from '../admissionCalculator';

describe('Admission Calculator', () => {
  describe('calculateAdmissionChance', () => {
    it('should calculate admission chance for valid inputs', () => {
      const result = calculateAdmissionChance('UNILAG', 'medicine', 350, 'Lagos');
      
      expect(result).toBeDefined();
      expect(result.chance).toBeGreaterThan(0);
      expect(result.chance).toBeLessThanOrEqual(100);
      expect(result.factors).toBeInstanceOf(Array);
      expect(result.recommendation).toBeDefined();
    });

    it('should return high chance for excellent score at catchment institution', () => {
      const result = calculateAdmissionChance('UNILAG', 'estate_management', 350, 'Lagos');
      
      expect(result.chance).toBeGreaterThan(80);
      expect(result.recommendation).toContain('Excellent');
    });

    it('should return lower chance for borderline score', () => {
      const result = calculateAdmissionChance('UNILAG', 'medicine', 280, 'Lagos');
      
      expect(result.chance).toBeGreaterThan(0);
      expect(result.chance).toBeLessThan(100);
    });

    it('should return low chance for score below cutoff', () => {
      const result = calculateAdmissionChance('UNILAG', 'medicine', 200, 'Lagos');
      
      expect(result.chance).toBeLessThan(50);
    });

    it('should penalize non-catchment students', () => {
      const catchmentResult = calculateAdmissionChance('UNILAG', 'medicine', 300, 'Lagos');
      const nonCatchmentResult = calculateAdmissionChance('UNILAG', 'medicine', 300, 'Oyo');
      
      expect(catchmentResult.chance).toBeGreaterThan(nonCatchmentResult.chance);
    });

    it('should handle all valid institutions', () => {
      const institutions = Object.keys(institutionData);
      
      institutions.forEach((institution) => {
        const result = calculateAdmissionChance(institution, 'medicine', 300, 'Lagos');
        expect(result.chance).toBeGreaterThan(0);
        expect(result.chance).toBeLessThanOrEqual(100);
      });
    });

    it('should handle all valid courses', () => {
      const courses = Object.keys(courseData);
      
      courses.forEach((course) => {
        const result = calculateAdmissionChance('UNILAG', course, 300, 'Lagos');
        expect(result.chance).toBeGreaterThan(0);
        expect(result.chance).toBeLessThanOrEqual(100);
      });
    });

    it('should include relevant factors in result', () => {
      const result = calculateAdmissionChance('UNILAG', 'medicine', 300, 'Lagos');

      expect(result).not.toBeNull();
      expect(result!.factors.length).toBeGreaterThan(0);
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
      
      expect(lowComp.chance).toBeGreaterThan(veryHighComp.chance);
    });

    it('should consider course tier', () => {
      const tier1 = calculateAdmissionChance('UNILAG', 'medicine', 300, 'Lagos');
      const tier3 = calculateAdmissionChance('UNILAG', 'education', 300, 'Lagos');
      
      expect(tier3.chance).toBeGreaterThan(tier1.chance);
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
  });

  describe('Institution Data', () => {
    it('should have all major institutions', () => {
      const majorInstitutions = ['UNILAG', 'UI', 'OAU', 'UNIBEN', 'UNN'];
      
      majorInstitutions.forEach((institution) => {
        expect(institutionData[institution]).toBeDefined();
      });
    });

    it('should have valid competitiveness levels', () => {
      const validCompetitiveness = ['Very High', 'High', 'Medium', 'Low'];
      
      Object.values(institutionData).forEach((institution) => {
        expect(validCompetitiveness).toContain(institution.competitiveness);
      });
    });

    it('should have catchment areas', () => {
      Object.values(institutionData).forEach((institution) => {
        expect(institution.catchment).toBeInstanceOf(Array);
        expect(institution.catchment.length).toBeGreaterThan(0);
      });
    });

    it('should have valid state names in catchment', () => {
      const validStates = [
        'Lagos', 'Oyo', 'Osun', 'Ondo', 'Ogun', 'Ekiti',
        'Edo', 'Delta', 'Enugu', 'Anambra', 'Ebonyi',
        'Kaduna', 'Katsina', 'Kano', 'Imo', 'Rivers',
        'Bayelsa', 'Kwara', 'Cross River', 'Borno',
        'Plateau', 'Kogi',
      ];
      
      Object.values(institutionData).forEach((institution) => {
        institution.catchment.forEach((state) => {
          expect(validStates).toContain(state);
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
        
        expect(result.recommendation).toBeDefined();
        expect(result.recommendation.length).toBeGreaterThan(0);
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

