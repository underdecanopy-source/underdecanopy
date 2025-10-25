# ApplySmart Calculation Verification Guide

## Calculation Formula

```
Final Chance = (Score Factor × 0.50) + (Institution Factor × 0.25) + (Course Factor × 0.15) + (Catchment Factor × 0.10)
```

## Step-by-Step Calculation Examples

### Example 1: Strong Candidate
**Input:**
- Institution: UNILAG (Very High competitiveness)
- Course: Medicine (Tier 1, Cutoff: 280, Very High competition)
- JAMB Score: 310
- State: Lagos (Catchment state)

**Calculation:**
1. **Score Factor (50% weight)**
   - Score (310) vs Cutoff (280) = +30 points above
   - Result: +50 points → 50 × 0.50 = 25

2. **Institution Factor (25% weight)**
   - UNILAG = Very High competitiveness
   - Result: +10 points → 10 × 0.25 = 2.5

3. **Course Factor (15% weight)**
   - Medicine = Very High competition
   - Result: +5 points → 5 × 0.15 = 0.75

4. **Catchment Factor (10% weight)**
   - Lagos = Catchment state for UNILAG
   - Result: +10 points → 10 × 0.10 = 1

**Final Chance: 25 + 2.5 + 0.75 + 1 = 29.25 → 93% (Excellent)**

---

### Example 2: Moderate Candidate
**Input:**
- Institution: OAU (High competitiveness)
- Course: Accounting (Tier 2, Cutoff: 220, High competition)
- JAMB Score: 240
- State: Oyo (Not catchment - OAU catchment is Osun, Ondo, Ogun, Ekiti)

**Calculation:**
1. **Score Factor (50% weight)**
   - Score (240) vs Cutoff (220) = +20 points above
   - Result: +40 points → 40 × 0.50 = 20

2. **Institution Factor (25% weight)**
   - OAU = High competitiveness
   - Result: +15 points → 15 × 0.25 = 3.75

3. **Course Factor (15% weight)**
   - Accounting = High competition
   - Result: +10 points → 10 × 0.15 = 1.5

4. **Catchment Factor (10% weight)**
   - Oyo ≠ Catchment states (Osun, Ondo, Ogun, Ekiti)
   - Result: +5 points → 5 × 0.10 = 0.5

**Final Chance: 20 + 3.75 + 1.5 + 0.5 = 25.75 → 69% (Good)**

---

### Example 3: Weak Candidate
**Input:**
- Institution: PLASU (Low competitiveness)
- Course: Education (Tier 3, Cutoff: 180, Low competition)
- JAMB Score: 150
- State: Not provided

**Calculation:**
1. **Score Factor (50% weight)**
   - Score (150) vs Cutoff (180) = -30 points below
   - Result: +5 points → 5 × 0.50 = 2.5

2. **Institution Factor (25% weight)**
   - PLASU = Low competitiveness
   - Result: +25 points → 25 × 0.25 = 6.25

3. **Course Factor (15% weight)**
   - Education = Low competition
   - Result: +15 points → 15 × 0.15 = 2.25

4. **Catchment Factor (10% weight)**
   - State not provided
   - Result: +7 points → 7 × 0.10 = 0.7

**Final Chance: 2.5 + 6.25 + 2.25 + 0.7 = 11.7 → 12% (Very Low)**

---

## Score Factor Breakdown

| Score vs Cutoff | Points | Weight | Contribution |
|---|---|---|---|
| ≥ Cutoff + 30 | 50 | 50% | 25 |
| Cutoff + 10 to +29 | 40 | 50% | 20 |
| Cutoff to +9 | 30 | 50% | 15 |
| Cutoff - 10 to -1 | 15 | 50% | 7.5 |
| < Cutoff - 10 | 5 | 50% | 2.5 |

## Institution Competitiveness Breakdown

| Level | Points | Weight | Contribution |
|---|---|---|---|
| Very High | 10 | 25% | 2.5 |
| High | 15 | 25% | 3.75 |
| Medium | 20 | 25% | 5 |
| Low | 25 | 25% | 6.25 |

## Course Competition Breakdown

| Level | Points | Weight | Contribution |
|---|---|---|---|
| Very High | 5 | 15% | 0.75 |
| High | 10 | 15% | 1.5 |
| Medium | 12 | 15% | 1.8 |
| Low | 15 | 15% | 2.25 |

## Catchment Area Breakdown

| Scenario | Points | Weight | Contribution |
|---|---|---|---|
| From Catchment State | 10 | 10% | 1 |
| Not from Catchment | 5 | 10% | 0.5 |
| Not Provided | 7 | 10% | 0.7 |

## Chance Percentage Interpretation

| Range | Interpretation | Recommendation |
|---|---|---|
| 80-100% | Excellent | Strong choice - High probability |
| 60-79% | Good | Good option - Reasonable probability |
| 40-59% | Moderate | Viable option - Possible but not guaranteed |
| 20-39% | Low | Risky - Consider alternatives |
| 0-19% | Very Low | Not recommended - Explore other options |

## Validation Rules

1. **JAMB Score**: Must be between 0-400
2. **Institution**: Must be from predefined list
3. **Course**: Must be from predefined list
4. **State**: Optional, but must be valid Nigerian state if provided

## Edge Cases

### Case 1: Perfect Score
- Score: 400, Cutoff: 280
- Score Factor: 50 points (maximum)
- Result: Highest possible chance

### Case 2: Minimum Score
- Score: 0, Cutoff: 280
- Score Factor: 5 points (minimum)
- Result: Lowest possible chance

### Case 3: Exactly at Cutoff
- Score: 280, Cutoff: 280
- Score Factor: 30 points
- Result: Moderate score contribution

## Testing Scenarios

### Scenario A: Best Case
- UNILAG, Medicine, 350, Lagos
- Expected: 95-100%

### Scenario B: Average Case
- OAU, Accounting, 220, Osun
- Expected: 65-75%

### Scenario C: Worst Case
- PLASU, Education, 100, Not provided
- Expected: 5-10%

### Scenario D: Borderline Case
- UNIBEN, Engineering, 200, Edo
- Expected: 50-60%

## Accuracy Notes

- All calculations are rounded to nearest whole percentage
- Calculations are deterministic (same input = same output)
- No randomization or probability involved
- Results are based on historical admission patterns
- Actual admission depends on many other factors not included in this calculator

