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

const universityInstitutionIds = Array.from(new Set<string>([
  ...federalUniversities,
  ...stateUniversities,
  ...privateUniversities,
].map(institution => institution.value)));

const allInstitutionIds = Array.from(new Set<string>([
  ...universityInstitutionIds,
  ...polytechnics.map(institution => institution.value),
  ...statePolytechnics.map(institution => institution.value),
  ...collegesOfEducation.map(institution => institution.value),
  ...monotechnics.map(institution => institution.value),
  ...nursingColleges.map(institution => institution.value),
  ...ieis.map(institution => institution.value),
]));

export const courseInstitutionMap: Record<string, string[]> = {
  "Medicine and Surgery (MBBS)": universityInstitutionIds,
  "Dentistry (BDS)": universityInstitutionIds,
  "Pharmacy (Pharm.D)": universityInstitutionIds,
  "Law (LL.B)": universityInstitutionIds,
  "Nursing Science (B.N.Sc.)": universityInstitutionIds,
  "Medical Laboratory Science (B.MLS)": universityInstitutionIds,
  Physiotherapy: universityInstitutionIds,
  "Radiography and Radiation Science": universityInstitutionIds,
  "Veterinary Medicine (DVM)": universityInstitutionIds,
  Optometry: universityInstitutionIds,
  Anatomy: universityInstitutionIds,
  Physiology: universityInstitutionIds,
  Economics: universityInstitutionIds,
  Biochemistry: universityInstitutionIds,
  Microbiology: universityInstitutionIds,
  Sociology: universityInstitutionIds,
  "Political Science": universityInstitutionIds,
  "History and International Studies": universityInstitutionIds,
  "Theatre Arts": universityInstitutionIds,
  Linguistics: universityInstitutionIds,
  "English Language and Literature": universityInstitutionIds,
  "Modern Languages": universityInstitutionIds,
  "Education programs with subject majors": universityInstitutionIds,
  "Agricultural Economics": universityInstitutionIds,
  "Animal Science": universityInstitutionIds,
  "Crop Science": universityInstitutionIds,
  "Soil Science": universityInstitutionIds,

  Accounting: [
    "ABIAPOLY","AG-POLY","AUCHIPOLY","BEN-POLY","CITI-POLY","COASTAL","COVENANT-POLY","CROWN","D.S. ADEGBENRO","DORBEN","EASTERN-POLY","ED-JOHN","EKITI-POLY","ENU-POLY","FEDPO-ADO","FEDPO-AIU","FEDPO-BAL","FEDPO-BAU","FEDPO-BID","FEDPO-DAM","FEDPO-EDE","FEDPO-EKO","FEDPO-OFFA","FEDPO-IDA","FEDPO-ILA","FEDPO-MUB","FEDPO-NAM","FEDPO-NAS","FEDPO-NEK","FEDPO-OKO","FEDPO-OLUJI","FEDPO-UKA","FIDEIPOLY","GBOKO-POLY","GLORYLAND-POLY","GRACE-POLY","GRACELAND","GRUNDTVIG","HERITAGE","IBADAN-CITYPOLY","IBD-POLY","IBOM-POLY","ICON-POLY","IGBAJO-POLY","IGBO-OWU POLY","ILE-IFE","IMA-POLY","IMO-POLY","IMT-ENU","INTERLINK","IWO-POLY","JIG-POLY","JICORAS","KAD-POLY","KALACKAN","KAN-POLY","KAT-POLY","FEDPO-KAZAURE","KINGS-POLY","KOGI-POLY","KONDUGA","KONGO","KWA-POLY","LASPOTECH","LENS-POLY","LIGHTHOUSE","LNDMK-POLY","MAPOLY","MUSTIBRAH","NACABSPOLY","NACEST","NBPZ","NEWLAND","NICT","NNFLC","NOGAK","OGITECH","OAKOGWASHIUKU","OKE-OGUN POLY","OSISATECH","OSUNPOLY","OSUNTECH","OTEFE","OYSCATECH","OZORO","PH-POLY","PLS-POLY","POLY-YOLA","QUEST","RAMAT-POLY","RECTEM","RUGIPO","SAAPADE","SAF-POLY","SARO-WIWA POLY","SHINAKA","SPEEDWAY","STARS-POLY","TAR-POLY","TEMPLE-GATE","TIMKAI","AO-POLY","TOWER-POLY","TRINITY","UAS-POLY","UNIPOLY","UNIQUE","USEN","UYO-CITYPOLY","VALLEY VIEW","VINEYARD-POLY","WOLEX","WUFPOBK","YABATECH","ZUNGERU"
  ],
  "Banking and Finance": [
    "AAP","ABIAPOLY","AG-POLY","ATAPOLY","AUCHIPOLY","BEN-POLY","FEDPO-OKO","FIDEIPOLY","GRACE-POLY","IBD-POLY","IMO-POLY","IMT-ENU","KAD-POLY","KAN-POLY","KAT-POLY","FEDPO-KAZAURE","KONGO","KWA-POLY","LASPOTECH","LIGHTHOUSE","NACEST","NBPZ","NICT","OGITECH","OAKOGWASHIUKU","OKE-OGUN POLY","OSISATECH","OSUNPOLY","OSUNTECH","OTEFE","OZORO","PH-POLY","PLS-POLY","POLY-YOLA","QUEST","RAMAT-POLY","RUGIPO","SAAPADE","SARO-WIWA POLY","TEMPLE-GATE","TIMKAI","USEN","WOLEX","WUFPOBK","YABATECH","ZUNGERU"
  ],
  "Business Administration": [
    "AAP","ABIAPOLY","ADECOM","AFIT","AG-POLY","AJAYI-POLY","AKPOLY","AL-HIKMA-P","ALLOVER-POLY","ALOOMA","ANSPOLY","APS","ATAPOLY","ATLAS-IMT","AUCHIPOLY","BELLARKS","BEN-POLY","BOLMOR-POLY","BUPOLY-HAD","BESTPOTECH","BRAINFILL","CABSP","CC-TECH","CITI-POLY","COASTAL","COVENANT-POLY","CROWN","D.S. ADEGBENRO","DORBEN","EASTERN-POLY","ED-JOHN","ECP","EFONCOM","EKO-POLY","ENVILLETECH","FEDCOOP-IBD","FEDCOOP-KD","FEDCOOP-ORJI","FEDPO-ADO","FEDPO-AIU","FEDPO-BAL","FEDPO-BAU","FEDPO-BID","FEDPO-DAM","FEDPO-EDE","FEDPO-EKO","FEDPO-OFFA","FEDPO-IDA","FEDPO-ILA","FEDPO-MUB","FEDPO-MONGUNO","FEDPO-NAM","FEDPO-NAS","FEDPO-NEK","FEDPO-OKO","FEDPO-OLUJI","FEDPO-UKA","FEDPO-PLATEAU","FIDEIPOLY","FOUNDATION","FEDPO-KALTUNGO","FLAILAS","FSS-IBADAN","FSS-MANCHOK","FTC-BOR","FTC-KAD","FTC-LAG","GBOKO-POLY","GLOBALPOLY","GLORYLAND-POLY","GRACE-POLY","GRACELAND","GRUNDTVIG","GSPB","HARVARD","HERITAGE","IBADAN-CITYPOLY","IBD-POLY","ICON-POLY","IGBAJO-POLY","ILE-IFE","IMIT","IMO-POLY","IMT-ENU","INSPOTECH","INTERLINK","ITM-UGEP","JIG-POLY","JICORAS","KAD-POLY","KALACKAN","KAT-POLY","FEDPO-KAZAURE","KOGI-POLY","KONDUGA","KONGO","KWA-POLY","LAPO","LAG-CITY","LASPOTECH","LENS-POLY","LENGTHS-POLY","NATIONBTECH","NUBIAN","MAPOLY","M-BUILDER","MUSTIBRAH","OYSCTECH","MARIST","NACABSPOLY","NACEST","NEWLAND","IMA-POLY","NBPZ","NICT","NNFLC","ODUWA-POLY","OGITECH","OGWASHIUKU","OKE-OGUN POLY","OSISATECH","OSUNPOLY","OSUNTECH","OTEFE","OYSCATECH","OZORO","PARAMOUNT","PEMGO-COL","PLS-POLY","PH-POLY","POLY-ADOKA","POLY-ARAN","POLY-IMESI","POLY-QUOKU","POLY-YOLA","QUEST","RAMAT-POLY","RECTEM","RONIK","RUGIPO","RUFAI-ND","SAAPADE","SAF-POLY","SARO-WIWA POLY","SAVANNAH","SHAKA","SPEEDWAY","STARS-POLY","TEMPLE-GATE","TIMKAI","AO-POLY","TOWER-POLY","TRINITY","UAS-POLY","UNIPOLY","UNIQUE","USEN","UYO-CITYPOLY","WESTLAND-POLY","WOLEX","WUFPOBK","YABATECH","ZUNGERU"
  ],
  "Computer Science": [
    "AAP","ABIAPOLY","ACHTECH","ADECOM","AG-POLY","AJAYI-POLY","AKCAS","AKPOLY","AL-HIKMA-P","ALLOVER-POLY","ALOOMA","ANIMTO","ANSPOLY","ASHI-POLY","ATAPOLY","ATLAS-IMT","AUCHIPOLY","AUDU-BAKO","BACAF","BELLARKS","BEN-POLY","BOLMOR-POLY","BESTPOTECH","BUPOLY-HAD","BRAINFILL","BYSPOLY","CABSP","CITI-POLY","COASTAL","COLAGRIC-LAF","COVENANT-POLY","CROWN","D.S. ADEGBENRO","DORBEN","DSS-MARINE","EASTERN-POLY","ECP","ED-JOHN","EKITI-POLY","ENU-POLY","ENVILLETECH","FCAPT-KANO","FCLT-OWER","FECOFOR-JOS","FEDCOFOR-IBD","FEDAGRIC-AKR","FEDAGRIC-IBD","FEDAGRIC-ISH","FEDANIM-IBD","FEDANIM-VOM","FEDCOOP-IBD","FEDCOOP-KD","FEDCOOP-OROGUN","FEDCOOP-ORJI","FEDFISH-LAG","FEDFISH-NBUS","FEDHORT-GOM","FEDPO-ADO","FEDPO-AIU","FEDPO-BAL","FEDPO-BAU","FEDPO-BID","FEDPO-DAM","FCE-DAURA","FEDPO-EDE","FEDPO-EKO","FEDPO-OFFA","FEDPO-IDA","FEDPO-ILA","FEDPO-MUB","FEDPO-NAM","FEDPO-NAS","FEDPO-NEK","FEDPO-OIL","FEDPO-OKO","FEDPO-OLUJI","FEDPO-UGEP","FEDPO-UKA","FEDWILD-NBUS","FIDEIPOLY","FOUNDATION","FEDPO-KAZAURE","FEDPO-KALTUNGO","FLAILAS","FP-OYO","FSS-IBADAN","FSS-MANCHOK","FSS-OYO","FTC-KAD","FTC-LAG","GBOKO-POLY","GLOBALPOLY","GLOBAL-ND","GLORYLAND-POLY","GRACE-POLY","GRACELAND","GRUNDTVIG","GSPB","HARRY-PASS","HARVARD","HARVARD-POLY","HERITAGE","HOPE-POLY","IBADAN-CITYPOLY","IBD-POLY","IBOM-POLY","ICON-POLY","IGBAJO-POLY","IGBO-OWU POLY","ILE-IFE","IMIT","IMO-POLY","IMT-ENU","INSPOTECH","INTERLINK","ISBC-IBADAN","IWO-POLY","JICORAS","JIG-POLY","JOEMARINE","JSIITK","KAD-POLY","KALACKAN","COHTECH","KAN-POLY","KAT-POLY","FEDPO-KAZAURE","KINGS-POLY","KSITM-ND","KOGI-POLY","KWA-POLY","LAG-CITY","LASPOTECH","LENS-POLY","LIGHTHOUSE","LNDMK-POLY","LOAM-POLY","MAPOLY","MARIST","MATER-DEI","MUSTIBRAH","NACABSPOLY","NACEST","NATIONBTECH","NEWLAND","IMA-POLY","NBPZ","NICT","NILEST","NOGAK","NOVELTY","NWRI-MANDO","OAKODAJI-POLY","ODUWA-POLY","OGITECH","OGWASHIUKU","OKE-OGUN POLY","OSISATECH","OSUNPOLY","OSUNTECH","OTEFE","OYSCTECH","OZORO","PARAMOUNT","PH-POLY","PLS-POLY","POLY-ADOKA","POGIL","POLY-OUKU","POLY-ARAN","POLY-IMESI","POLY-IRESI","POLY-OMUO","POLY-YOLA","PRIME-POLY","PTI","QUEST","RAMAT-POLY","RECTEM","RONIK","RUGIPO","RUFAI-ND","SA-POLY","SAAPADE","SAF-POLY","SARO-WIWA POLY","SAVANNAH","SHAKA","SPEEDWAY","ST MARY-POLY","SURE-POLY","TAR-POLY","TEMPLE-GATE","TIMKAI","AO-POLY","TOWER-POLY","TRINITY","UAS-POLY","UEC-TECH","SUNIPOLY","UNIQUE","UMA-UKPAI","USEN","UYO-CITYPOLY","VALLEY VIEW","VINEYARD-POLY","WESTLAND-POLY","WOLEX","WUFPOBK","YABATECH","ZACAS","ZUNGERU"
  ],
  "Civil Engineering": [
    "FEDPO-NAM","FEDPO-NAS","FEDPO-NEK","FEDPO-OKU","FEDPO-UKA","IBD-POLY","IMT-ENU","KAD-POLY","KAN-POLY","KAT-POLY","FEDPO-KAZAURE","KOGI-POLY","KWA-POLY","LASPOTECH","NACEST","IMA-POLY","NBPZ","NICT","NOGAK","OGITECH","MAPOLY","OGWASHIUKU","OKE-OGUN POLY","OSUNPOLY","OSUNTECH","OYSCATECH","OZORO","PLS-POLY","POLY-YOLA","RAMAT-POLY","RECTEM","RUGIPO","SARO-WIWA POLY","AO-POLY","UAS-POLY","WUFPOBK","YABATECH","ZUNGERU"
  ],
  "Architecture": [
    "ABIAPOLY","AG-POLY","AKPOLY","ALOOMA","ATAPOLY","AUCHIPOLY","CROWN","FEDPO-ADO","FEDPO-AIU","FEDPO-BAU","FEDPO-BID","FEDPO-DAURA","FEDPO-DAM","FEDPO-EDE","FEDPO-OFFA","FEDPO-IDA","FEDPO-ILA","FEDPO-MUB","FEDPO-NAM","FEDPO-NAS","FEDPO-NEK","FEDPO-OKO","FEDPO-OLUJI","IBD-POLY","IMT-ENU","JIG-POLY","KAD-POLY","KAN-POLY","KAT-POLY","FEDPO-KAZAURE","KOGI-POLY","KWA-POLY","LASPOTECH","MAPOLY","NACEST","NBPZ","NICT","OGITECH","OGWASHIUKU","OKE-OGUN POLY","OSUNPOLY","OSUNTECH","PH-POLY","POLY-YOLA","RAMAT-POLY","RECTEM","RUGIPO","SAAPADE","SARO-WIWA POLY","WOLEX","WUFPOBK","YABATECH"
  ],
  "Estate Management": [
    "FEDPO-OKO","FIDEIPOLY","GLOBALPOLY","HERITAGE","IBD-POLY","IMO-POLY","IMT-ENU","INTERLINK","KAD-POLY","KAN-POLY","FEDPO-KAZAURE","KWA-POLY","LASPOTECH","LIGHTHOUSE","MAPOLY","NACEST","IMA-POLY","NBPZ","NICT","NOGAK","OGITECH","OGWASHIUKU","OKE-OGUN POLY","OSUNPOLY","OSUNTECH","PLS-POLY","PH-POLY","RAMAT-POLY","RECTEM","RUGIPO","SAAPADE","SAF-POLY","SARO-WIWA POLY","TEMPLE-GATE","AO-POLY","TRINITY","TAR-POLY","USEN","WOLEX","WUFPOBK","YABATECH","ZUNGERU"
  ],
  "Urban and Regional Planning": [
    "AAP","ABIAPOLY","AKPOLY","ALLOVER-POLY","ATAPOLY","AUCHIPOLY","CROWN","DORBEN","DSS-MARINE","FEDPO-AIU","FEDPO-ADO","FEDPO-BID","FEDPO-DAM","FEDPO-OFFA","FEDPO-IDA","FEDPO-ILA","FEDPO-MUB","FEDPO-NAS","FEDPO-NEK","FEDPO-OKO","IBD-POLY","IMT-ENU","INTERLINK","KAD-POLY","KAN-POLY","FEDPO-KAZAURE","KOGI-POLY","KWA-POLY","LASPOTECH","MAPOLY","NACEST","IMA-POLY","NBPZ","OGITECH","OGWASHIUKU","OKE-OGUN POLY","OSUNPOLY","OSUNTECH","PH-POLY","PLS-POLY","POLY-YOLA","RAMAT-POLY","RUGIPO","SARO-WIWA POLY","TEMPLE-GATE","USEN","WUFPOBK","YABATECH","ZUNGERU"
  ],
  "Local Government Studies": [
    "CABSP","IBD-POLY","KAD-POLY","KAN-POLY","PLS-POLY"
  ],
  Insurance: [
    "FEDPO-OFFA","FEDPO-ILA","FEDPO-OKO","IBD-POLY","IMT-ENU","LASPOTECH","OKE-OGUN POLY","OSISATECH","RUGIPO","SAAPADE","SARO-WIWA POLY","WOLEX"
  ],
  "Mass Communication": [
    "AAP","ABIAPOLY","AG-POLY","AKPOLY","ATAPOLY","AUCHIPOLY","BEN-POLY","BYSPOLY","CITI-POLY","DORBEN","ED-JOHN","EKO-POLY","FEDPO-ADO","FEDPO-BAU","FEDPO-BID","FEDPO-OFFA","FEDPO-ILA","FEDPO-MUB","FEDPO-NAS","FEDPO-NEK","FEDPO-OKO","FEDPO-OROGUN","FIDEIPOLY","GLOBALPOLY","GRACELAND","HARVARD","HERITAGE","IBD-POLY","ICON-POLY","ILE-IFE","IMT-ENU","INTERLINK","ISBC-IBADAN","KAD-POLY","KAN-POLY","KAT-POLY","FEDPO-KAZAURE","KWA-POLY","LASPOTECH","LENS-POLY","MAPOLY","IMA-POLY","NACEST","NBPZ","NIJ","NOVELTY","OGITECH","OGWASHIUKU","OSISATECH","OSUNPOLY","OTEFE","OZORO","PLS-POLY","PH-POLY","POLY-YOLA","RUFAI-ND","RUGIPO","SAAPADE","SARO-WIWA POLY","SAF-POLY","TEMPLE-GATE","TIMKAI","AO-POLY","UAS-POLY","USEN","WOLEX","YABATECH"
  ],
  "Mechanical Engineering": [
    "ABIAPOLY","AFIT","AG-POLY","AKPOLY","ATAPOLY","AUCHIPOLY","ALOOMA","BEN-POLY","COLAGRIC-GUJ","COLAGRIC-LAF","DSS-MARINE","FEDFISH-LAG","FEDPO-ADO","FEDPO-AIU","FEDPO-BAU","FEDPO-BID","FEDPO-DAM","FEDPO-EDE","FEDPO-EKO","FEDPO-OFFA","FEDPO-IDA","FEDPO-ILA","FEDPO-MUB","FEDPO-MONGUNO","FEDPO-NAM","FEDPO-NAS","FEDPO-NEK","FEDPO-OKO","IBD-POLY","IMA-POLY","IMO-POLY","IMT-ENU","JIG-POLY","KAD-POLY","KAN-POLY","KAT-POLY","FEDPO-KAZAURE","KOGI-POLY","KWA-POLY","LASPOTECH","NACEST","NBPZ","OGITECH","MAPOLY","OGWASHIUKU","OKE-OGUN POLY","OSUNPOLY","OSUNTECH","OTEFE","OYSCATECH","OZORO","PLS-POLY","POLY-YOLA","PTI","RAMAT-POLY","RUGIPO","SAAPADE","SAF-POLY","SARO-WWA POLY","AO-POLY","UAS-POLY","WUPOBK","YABATECH","ZUNGERU"
  ],
  "Electrical/Electronics Engineering": [
    "AKPOLY","AL-HIKMA-P","ALLOVER-POLY","ALOOMA","ANSPOLY","ASHI-POLY","ATAPOLY","AUCHIPOLY","BELLARKS","BEN-POLY","BOLMOR-POLY","BESTPOTECH","BUPOLY-HAD","BRAINFILL","BYSPOLY","CALVARYPOLY","CITI-POLY","COASTAL","COLAGRIC-GUJ","COLAGRIC-LAF","COVENANT-POLY","CROWN","D.S. ADEGBENRO","DSS-MARINE","EASTERN-POLY","IGBO-OWU POLY","FEDPO-OHODO","FEDPO-OIL","FEDPO-OKO","FEDPO-OLUJI","FEDPO-OROGUN","FEDPO-PLATEAU","FEDPO-UKA","FIDEIPOLY","FOUNDATION","FEDPO-KALTUNGO","FEDPO-KAZAURE","GBOKO-POLY","GLOBALPOLY","GLORYLAND-POLY","GRACELAND","GRACE-POLY","GRUNDTVIG","GSPB","HARRY-PASS","HARVARD-POLY","HERITAGE","HOPE-POLY","IBADAN-CITYPOLY","IBD-POLY","IBOM-POLY","ICON-POLY","IGBAO-POLY","IGBO-OWU POLY","ILE-IFE","IMA-POLY","IMO-POLY","IMIT","IMT-ENU","INSPOTECH","INTERLINK","IWO-POLY","JIG-POLY","JSIITK","KAD-POLY","KALACKAN-POLY","KAT-POLY","KSITM-ND","FEDPO-KAZAURE","KINGS-POLY","KOGI-POLY","KWA-POLY","LAG-CITY","LASPOTECH","LENS-POLY","LIGHTHOUSE","LNDMK-POLY","LOAM-POLY","MAN-ORON","MARIST","MATER-DEI","MTINACABSPOLY","NACEST","NBPZ","NCAT-ZAR","NEWLAND","NICT","NOVELTY","ODAJI-POLY","OGITECH","OGWASHIUKU","MAPOLY","ODUWA-POLY","OGWASHIUKU","OSISATECH","OSUNPOLY","OSUNTECH","OTEFE","OYSCATECH","OZORO","PARAMOUNT","PH-POLY","PLS-POLY","POLY-ADOKA","POLY-ARAN","POLY-IMESI","POLY-IRESI","POLY-QUOKU","POLY-OMUO","POLY-YOLA","PRIME-POLY","PTI","RAMAT-POLY","RECTEM","RONIK","RUGIPO","SA-POLY","SAAPADE","SAF-POLY","SHAKA","SPEEDWAY","ST MARY-POLY","SURE-POLY","TAR-POLY","TIMKAI","TEMPLE-GATE","AO-POLY","TOWER-POLY","TRINITY","UAS-POLY","UEC-TECH","UNIPOLY","NATIONBTECH","UMA-UKPAI","USEN","UYO-CITYPOLY","VALLEY VIEW","VINEYARD-POLY","WESTLAND-POLY","WOLEX","WUFPOBK","YABATECH","ZUNGERU"
  ],
  "Taxation": [
    "ATAPOLY","AUCHIPOLY","ED-JOHN","FEDPO-ADO","FEDPO-BAU","FEDPO-ILA","FEDPO-NEK","OGITECH","OSUNTECH","RUGIPO","SAAPADE"
  ],
  "Public Administration": [
    "ABIAPOLY","ACHTECH","ADECOM","AJAYI-POLY","AL-HIKMA-P","ALOOMA","AO-POLY","FEDPO-ILA","FEDPO-NAS","FIDEIPOLY","FOUNDATION","FEDPO-KAZAURE","FEDPO-KALTUNGO","FLAILAS","FTC-BOR","FTC-KAD","FTC-LAG","GBOKO-POLY","GLOBALPOLY","GSPB","HARVARD-POLY","HERITAGE","IBD-POLY","IMO-POLY","IMT-ENU","IMIT","ITM-UGEP","JIG-POLY","JICORAS","KAD-POLY","KAN-POLY","KAT-POLY","KOGI-POLY","KONDUGA","KWA-POLY","LIGHTHOUSE","MATER-DEI","MUSTIBRAH","NACEST","NICT","IMA-POLY","NBPZ","ODAJI-POLY","OGITECH","OKE-OGUN POLY","OSISATECH","OSUNTECH","OYSCTECH","OZORO","PEMGO-COL","PH-POLY","PLS-POLY","POLY-ADOKA","POLY-OMUO","POLY-YOLA","QUEST","RAMAT-POLY","RUGIPO","RUFAI-ND","SA-POLY","SAAPADE","SAF-POLY","SARO-WIWA POLY","SURE-POLY","TAR-POLY","TEMPLE-GATE","TIMKAI","UAS-POLY","USEN","WOLEX","WUFPOBK","YABATECH","ZUNGERU"
  ]
};
