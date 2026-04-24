import {
  federalInstitutions,
  stateUniversities as stateUniInstitutions,
  polytechnics as polytechnicInstitutions,
  privateInstitutions,
  statePolytechnics as statePolytechnicInstitutions,
  collegesOfEducation as collegeOfEducationInstitutions,
  monotechnics as monotechnicInstitutions,
  nursingColleges as nursingCollegeInstitutions,
  ieis as ieiInstitutions,
} from '@/lib/data/admissionDataset';

const toOption = (id: string, name: string) => ({ value: id, label: `${name} (${id})` });

export const federalUniversities = federalInstitutions.map(({ id, name }) => toOption(id, name));
export const stateUniversities = stateUniInstitutions.map(({ id, name }) => toOption(id, name));
export const privateUniversities = privateInstitutions.map(({ id, name }) => toOption(id, name));
export const polytechnics = polytechnicInstitutions.map(({ id, name }) => toOption(id, name));
export const statePolytechnics = statePolytechnicInstitutions.map(({ id, name }) => toOption(id, name));
export const collegesOfEducation = collegeOfEducationInstitutions.map(({ id, name }) => toOption(id, name));
export const monotechnics = monotechnicInstitutions.map(({ id, name }) => toOption(id, name));
export const nursingColleges = nursingCollegeInstitutions.map(({ id, name }) => toOption(id, name));
export const ieis = ieiInstitutions.map(({ id, name }) => toOption(id, name));

export const firstTierCourses = [
  { value: 'Medicine and Surgery (MBBS)', label: 'Medicine and Surgery' },
  { value: 'Dentistry (BDS)', label: 'Dentistry (BDS)' },
  { value: 'Pharmacy (Pharm.D)', label: 'Pharmacy (Pharm.D)' },
  { value: 'Law (LL.B)', label: 'Law (LL.B)' },
  { value: 'Nursing Science (B.N.Sc.)', label: 'Nursing Science (B.N.Sc.)' },
  { value: 'Medical Laboratory Science (B.MLS)', label: 'Medical Laboratory Science (B.MLS)' },
  { value: 'Physiotherapy', label: 'Physiotherapy' },
  { value: 'Radiography and Radiation Science', label: 'Radiography' },
  { value: 'Veterinary Medicine (DVM)', label: 'Veterinary Medicine (DVM)' },
  { value: 'Optometry', label: 'Optometry' },
  { value: 'Anatomy', label: 'Anatomy' },
  { value: 'Physiology', label: 'Physiology' },
];

export const secondTierCourses = [
  { value: 'Accounting', label: 'Accounting' },
  { value: 'Banking and Finance', label: 'Banking and Finance' },
  { value: 'Business Administration', label: 'Business Administration' },
  { value: 'Economics', label: 'Economics' },
  { value: 'Mass Communication', label: 'Mass Communication' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Electrical/Electronics Engineering', label: 'Electrical Engineering' },
  { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
  { value: 'Civil Engineering', label: 'Civil Engineering' },
  { value: 'Architecture', label: 'Architecture' },
  { value: 'Estate Management', label: 'Estate Management' },
  { value: 'Urban and Regional Planning', label: 'Urban and Regional Planning' },
  { value: 'Biochemistry', label: 'Biochemistry' },
  { value: 'Microbiology', label: 'Microbiology' },
];

export const thirdTierCourses = [
  { value: 'Public Administration', label: 'Public Administration' },
  { value: 'Local Government Studies', label: 'Local Government Studies' },
  { value: 'Sociology', label: 'Sociology' },
  { value: 'Political Science', label: 'Political Science' },
  { value: 'History and International Studies', label: 'History and International Studies' },
  { value: 'Theatre Arts', label: 'Theatre Arts' },
  { value: 'Linguistics', label: 'Linguistics' },
  { value: 'English Language and Literature', label: 'English Language' },
  { value: 'Modern Languages', label: 'French' },
  { value: 'Education programs with subject majors', label: 'Education' },
  { value: 'Agricultural Economics', label: 'Agricultural Economics' },
  { value: 'Animal Science', label: 'Animal Science' },
  { value: 'Crop Science', label: 'Crop Science' },
  { value: 'Soil Science', label: 'Soil Science' },
];

export const states = [
    { value: "Abia", label: "Abia" },
    { value: "Adamawa", label: "Adamawa" },
    { value: "Akwa Ibom", label: "Akwa Ibom" },
    { value: "Anambra", label: "Anambra" },
    { value: "Bauchi", label: "Bauchi" },
    { value: "Bayelsa", label: "Bayelsa" },
    { value: "Benue", label: "Benue" },
    { value: "Borno", label: "Borno" },
    { value: "Cross River", label: "Cross River" },
    { value: "Delta", label: "Delta" },
    { value: "Ebonyi", label: "Ebonyi" },
    { value: "Edo", label: "Edo" },
    { value: "Ekiti", label: "Ekiti" },
    { value: "Enugu", label: "Enugu" },
    { value: "FCT", label: "Federal Capital Territory" },
    { value: "Gombe", label: "Gombe" },
    { value: "Imo", label: "Imo" },
    { value: "Jigawa", label: "Jigawa" },
    { value: "Kaduna", label: "Kaduna" },
    { value: "Kano", label: "Kano" },
    { value: "Katsina", label: "Katsina" },
    { value: "Kebbi", label: "Kebbi" },
    { value: "Kogi", label: "Kogi" },
    { value: "Kwara", label: "Kwara" },
    { value: "Lagos", label: "Lagos" },
    { value: "Nasarawa", label: "Nasarawa" },
    { value: "Niger", label: "Niger" },
    { value: "Ogun", label: "Ogun" },
    { value: "Ondo", label: "Ondo" },
    { value: "Osun", label: "Osun" },
    { value: "Oyo", label: "Oyo" },
    { value: "Plateau", label: "Plateau" },
    { value: "Rivers", label: "Rivers" },
    { value: "Sokoto", label: "Sokoto" },
    { value: "Taraba", label: "Taraba" },
    { value: "Yobe", label: "Yobe" },
    { value: "Zamfara", label: "Zamfara" },
];
