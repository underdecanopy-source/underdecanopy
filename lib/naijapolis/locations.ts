import { POLLING_UNITS } from './data';
import type { Person, PollingUnit } from './types';

// State labels are aligned to INEC's nationwide Registration Area Centres state listing.
export const INEC_STATE_OPTIONS = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT Abuja',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
] as const;

function uniqueSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((left, right) => left.localeCompare(right));
}

const pollingUnitsById = new Map(POLLING_UNITS.map((unit) => [unit.id, unit]));

export function getPollingUnitById(pollingUnitId?: string) {
  return pollingUnitId ? pollingUnitsById.get(pollingUnitId) : undefined;
}

export function getLgaOptions(stateName: string) {
  if (!stateName) return [];
  return uniqueSorted(POLLING_UNITS.filter((unit) => unit.state === stateName).map((unit) => unit.lga));
}

export function getWardOptions(stateName: string, lgaName: string) {
  if (!stateName || !lgaName) return [];
  return uniqueSorted(
    POLLING_UNITS.filter((unit) => unit.state === stateName && unit.lga === lgaName).map((unit) => unit.ward),
  );
}

export function getPollingUnitOptions(stateName: string, lgaName: string, wardName: string) {
  if (!stateName || !lgaName || !wardName) return [];
  return POLLING_UNITS.filter(
    (unit) => unit.state === stateName && unit.lga === lgaName && unit.ward === wardName,
  ).sort((left, right) => left.name.localeCompare(right.name));
}

export function getPersonLocation(person: Pick<Person, 'state' | 'lga' | 'ward' | 'polling_unit_id'>) {
  const pollingUnit = getPollingUnitById(person.polling_unit_id);

  return {
    state: person.state || pollingUnit?.state || '',
    lga: person.lga || pollingUnit?.lga || '',
    ward: person.ward || pollingUnit?.ward || '',
    pollingUnit,
  };
}

export function getPersonLocationLabel(person: Pick<Person, 'state' | 'lga' | 'ward' | 'polling_unit_id'>) {
  const location = getPersonLocation(person);
  const lines = [location.state, location.lga, location.ward].filter(Boolean);

  return {
    ...location,
    lines,
    pollingUnitLabel: location.pollingUnit
      ? `${location.pollingUnit.pu_code} - ${location.pollingUnit.name}`
      : 'Unassigned',
  };
}

export function isPollingUnitSelectionValid(selection: {
  state: string;
  lga: string;
  ward: string;
  polling_unit_id?: string;
}) {
  const pollingUnit = getPollingUnitById(selection.polling_unit_id);
  if (!pollingUnit) return false;

  return (
    pollingUnit.state === selection.state &&
    pollingUnit.lga === selection.lga &&
    pollingUnit.ward === selection.ward
  );
}

export function populateLocationFromPollingUnit(pollingUnitId?: string) {
  const pollingUnit = getPollingUnitById(pollingUnitId);

  return {
    state: pollingUnit?.state ?? '',
    lga: pollingUnit?.lga ?? '',
    ward: pollingUnit?.ward ?? '',
    pollingUnit,
  };
}

export function getCoveredStateOptions() {
  const coveredStates = new Set(POLLING_UNITS.map((unit) => unit.state));

  return INEC_STATE_OPTIONS.map((stateName) => ({
    name: stateName,
    covered: coveredStates.has(stateName),
  }));
}

export function buildPersonLocationRecord(pollingUnit: PollingUnit) {
  return {
    state: pollingUnit.state,
    lga: pollingUnit.lga,
    ward: pollingUnit.ward,
    polling_unit_id: pollingUnit.id,
  };
}
