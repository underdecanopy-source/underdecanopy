import { INITIAL_NAIJAPOLIS_STATE } from '../data';
import { INEC_STATE_OPTIONS, getLgaOptions, getPollingUnitById, getPollingUnitOptions, getWardOptions } from '../locations';

describe('naijapolis location helpers', () => {
  it('returns dependent location options for covered demo states', () => {
    expect(INEC_STATE_OPTIONS).toContain('Lagos');
    expect(getLgaOptions('Lagos')).toContain('Surulere');
    expect(getWardOptions('Lagos', 'Surulere')).toContain('Adeniran Ogunsanya');

    const pollingUnits = getPollingUnitOptions('Lagos', 'Surulere', 'Adeniran Ogunsanya');
    expect(pollingUnits.length).toBeGreaterThan(0);
    expect(pollingUnits[0]?.state).toBe('Lagos');
  });

  it('ships at least 100 seeded people with resolved locations', () => {
    expect(INITIAL_NAIJAPOLIS_STATE.people.length).toBeGreaterThanOrEqual(100);
    expect(
      INITIAL_NAIJAPOLIS_STATE.people.every((person) => {
        const pollingUnit = getPollingUnitById(person.polling_unit_id);

        return (
          Boolean(person.state) &&
          Boolean(person.lga) &&
          Boolean(person.ward) &&
          Boolean(pollingUnit) &&
          pollingUnit?.state === person.state &&
          pollingUnit?.lga === person.lga &&
          pollingUnit?.ward === person.ward
        );
      }),
    ).toBe(true);
  });
});
