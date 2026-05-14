export type ApplySmartBlogPost = {
  id: string;
  category: string;
  categoryClassName: string;
  accentClassName: string;
  previewIcon: string;
  title: string;
  excerpt: string;
  sections: Array<{
    heading?: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
};

export const applySmartBlogPosts: ApplySmartBlogPost[] = [
  {
    id: 'nce-dual-mandate-policy',
    category: 'Policy Update',
    categoryClassName: 'bg-blue-100 text-blue-700',
    accentClassName: 'bg-blue-900',
    previewIcon: '\u{1F393}',
    title: 'NCE and the Dual Mandate Policy: Expanding Admission Beyond UTME',
    excerpt: 'Federal Colleges of Education are moving into a new era. The Dual Mandate Policy means eligible colleges can run both NCE and B.Ed. pathways, while NCE candidates can apply through JAMB without sitting for UTME.',
    sections: [
      {
        paragraphs: [
          'The Dual Mandate Policy is changing how Colleges of Education fit into Nigeria\'s tertiary admission structure. Under the reform direction now being implemented, eligible Federal Colleges of Education can award both the Nigeria Certificate in Education (NCE) and Bachelor of Education (B.Ed.) degrees directly under approved standards.',
          'For candidates, that means the old assumption that a College of Education must always depend on a university affiliation for degree progression is no longer the full picture. The pathway is becoming more direct, more flexible, and easier to understand.',
        ],
      },
      {
        heading: 'What UTME Exemption Means For NCE',
        paragraphs: [
          'Candidates seeking admission into NCE programmes are to apply through JAMB without sitting for UTME. In practical terms, JAMB still remains part of the admission route, but the candidate is not entering that programme through a UTME score competition in the traditional sense.',
        ],
        bullets: [
          'You still need to follow JAMB application procedures.',
          'You still need to satisfy the admission conditions of the institution.',
          'You should still monitor screening, document, and O\'Level requirements.',
        ],
      },
      {
        heading: 'How The B.Ed. Progression Now Works',
        paragraphs: [
          'As explained by the Minister of Education, Tunji Alausa, students in eligible Federal Colleges of Education can begin with the NCE programme and, after meeting the required standards and admission conditions, continue into the B.Ed. programme for an additional two years.',
          'That makes the NCE route more strategic for candidates who want teacher education, a structured professional pathway, and a clearer bridge into a degree award.',
        ],
      },
      {
        heading: 'Why This Matters For Admission Planning',
        bullets: [
          'It broadens the routes into tertiary education beyond the usual UTME-first mindset.',
          'It strengthens Colleges of Education as independent academic destinations.',
          'It gives education-focused candidates a more flexible progression model from NCE into B.Ed.',
          'It may reduce confusion for students who previously saw affiliated degree structures as the only path.',
        ],
      },
    ],
  },
  {
    id: 'nd-agriculture-utme-exemption',
    category: 'ND Admissions',
    categoryClassName: 'bg-emerald-100 text-emerald-700',
    accentClassName: 'bg-emerald-600',
    previewIcon: '\u{1F33F}',
    title: 'UTME Exemption for ND Non-Technology Agriculture and Related Programmes',
    excerpt: 'Candidates seeking admission into ND non-technology agriculture and agriculture-related programmes are to apply through JAMB without sitting for UTME. The key issue now is identifying the right programme category and following institution-specific screening requirements.',
    sections: [
      {
        paragraphs: [
          'A major admission update now affects ND non-technology agriculture and agriculture-related programmes. Candidates seeking these admissions are to apply through JAMB without sitting for UTME.',
          'This is important because many candidates wrongly assume every ND route must be driven by a UTME score. That assumption can now mislead applicants in the agriculture space.',
        ],
      },
      {
        heading: 'What Candidates Should Pay Attention To',
        bullets: [
          'Confirm that the programme is truly within the ND non-technology agriculture or agriculture-related category.',
          'Apply through JAMB as directed.',
          'Check the institution\'s current O\'Level, screening, and departmental requirements.',
          'Do not assume that UTME exemption removes all other admission conditions.',
        ],
      },
      {
        heading: 'Programmes Likely To Be Affected',
        paragraphs: [
          'The practical focus is on non-technology agriculture routes and related programmes such as agriculture, crop, forestry, fisheries, and horticulture tracks that are not being treated as engineering or other technology-heavy pathways.',
          'Where a programme title includes engineering or is clearly classified as a technology route, candidates should verify carefully before assuming that UTME exemption applies.',
        ],
      },
      {
        heading: 'How ApplySmart Now Treats These Routes',
        paragraphs: [
          'ApplySmart should no longer force a UTME-score logic onto these programmes. Instead, students should be guided toward the JAMB application route, institution screening requirements, and programme classification checks.',
        ],
      },
    ],
  },
  {
    id: 'choosing-course-after-policy-updates',
    category: 'Admission Guide',
    categoryClassName: 'bg-orange-100 text-orange-600',
    accentClassName: 'bg-orange-500',
    previewIcon: '\u{1F4DA}',
    title: 'How to Choose the Right Course and Institution After the New Admission Updates',
    excerpt: 'Course choice now requires more than comparing cut-off marks. You need to understand whether a route is UTME-based, UTME-exempt, degree-focused, NCE-focused, or part of a Dual Mandate progression path.',
    sections: [
      {
        paragraphs: [
          'Choosing the right course is no longer just about prestige or popularity. The better question is whether the admission route actually matches your academic profile, your long-term goal, and the current policy attached to that programme type.',
        ],
        bullets: [
          'Check whether the programme is UTME-driven or UTME-exempt.',
          'Check whether the institution is offering a degree route, an ND route, or an NCE-to-B.Ed. progression path.',
          'Check whether the programme is still best pursued in a university, a polytechnic, or another specialized institution.',
        ],
      },
      {
        heading: 'A Better Decision Framework',
        paragraphs: [
          'Students planning for agriculture, education, and specialized professional routes need to think in pathways, not only in course titles. The right choice is the one that fits both the present admission rule and the future qualification you want.',
        ],
      },
    ],
  },
  {
    id: 'scholarships-for-specialized-routes',
    category: 'Scholarships',
    categoryClassName: 'bg-sky-100 text-sky-700',
    accentClassName: 'bg-sky-600',
    previewIcon: '\u{1F4B0}',
    title: 'Scholarship Planning for NCE, B.Ed., ND, and Specialized Admission Routes',
    excerpt: 'Scholarship planning should follow your admission route. Candidates in NCE, B.Ed., ND agriculture, and specialized institutions need to organize documents early and watch for route-specific eligibility conditions.',
    sections: [
      {
        paragraphs: [
          'Scholarship preparation works best when it starts alongside admission planning. Students on NCE, B.Ed., ND, and specialized institutional routes often miss opportunities because they wait until after admission to organize their records.',
        ],
        bullets: [
          'Keep O\'Level results, identification documents, and proof of admission steps ready early.',
          'Track whether a scholarship accepts ND, NCE, or degree candidates.',
          'Watch for state bursaries and institutional aid, not only national headline scholarships.',
        ],
      },
      {
        heading: 'Why The New Policy Context Matters',
        paragraphs: [
          'As more candidates move through alternative admission structures, funding rules will matter more. A scholarship that looks broad on the surface may still be limited by institution type, programme type, or progression stage.',
        ],
      },
    ],
  },
  {
    id: 'understanding-jamb-caps-and-non-utme-routes',
    category: 'JAMB Guide',
    categoryClassName: 'bg-green-100 text-green-700',
    accentClassName: 'bg-green-600',
    previewIcon: '\u{1F4C4}',
    title: 'Understanding JAMB CAPS When Your Route Is Not a Standard UTME Competition',
    excerpt: 'JAMB CAPS still matters even when a candidate is not sitting for UTME. The system remains part of the admission process, so students must still pay attention to uploads, screening steps, and admission status updates.',
    sections: [
      {
        paragraphs: [
          'Many candidates hear "without sitting for UTME" and wrongly conclude that JAMB no longer matters. That is not the right reading. JAMB remains part of the admission architecture, especially for application handling, admission processing, and status tracking.',
        ],
      },
      {
        heading: 'What To Keep Watching On CAPS',
        bullets: [
          'Admission status updates.',
          'O\'Level upload status.',
          'Institution-driven screening steps.',
          'Any transfer, recommendation, or acceptance action tied to your admission record.',
        ],
      },
      {
        heading: 'The Practical Rule',
        paragraphs: [
          'If your programme still requires application through JAMB, then you should treat CAPS awareness as part of your admission discipline even where UTME sitting itself is not the gateway requirement.',
        ],
      },
    ],
  },
  {
    id: 'screening-readiness-after-utme-exemptions',
    category: 'Screening',
    categoryClassName: 'bg-violet-100 text-violet-700',
    accentClassName: 'bg-violet-600',
    previewIcon: '\u{270D}',
    title: 'Screening Readiness After UTME Exemptions: What Still Matters',
    excerpt: 'UTME exemption does not mean admission becomes automatic. Document checks, O\'Level combinations, screening exercises, and departmental rules still matter and can still determine the final outcome.',
    sections: [
      {
        paragraphs: [
          'One of the most common mistakes after a policy change is assuming the process has become easier in every respect. UTME exemption only changes one part of the route. It does not remove institutional standards.',
        ],
        bullets: [
          'Prepare all personal and academic documents early.',
          'Verify subject combinations and credit requirements.',
          'Follow institutional notices closely.',
          'Do not miss screening deadlines because you assumed the exemption replaced them.',
        ],
      },
    ],
  },
  {
    id: 'budgeting-for-nd-nce-and-bed-pathways',
    category: 'Financial Planning',
    categoryClassName: 'bg-red-100 text-red-700',
    accentClassName: 'bg-red-500',
    previewIcon: '\u{1F4B8}',
    title: 'Budgeting for ND, NCE, and B.Ed. Pathways Under the New Policy Environment',
    excerpt: 'Financial planning now has to reflect the route you are choosing. A student entering through NCE and progressing into B.Ed. may face a different timing structure from a student entering a standard UTME-driven university route.',
    sections: [
      {
        paragraphs: [
          'A realistic education budget should now reflect pathway structure, not just tuition headlines. Programme type affects duration, progression planning, accommodation timing, and how families prepare for follow-on study stages.',
        ],
        bullets: [
          'Separate first-entry costs from progression costs.',
          'Budget for screening, acceptance, and document-processing expenses.',
          'Plan for accommodation, transport, and materials based on institution type and location.',
        ],
      },
    ],
  },
  {
    id: 'planning-from-admission-to-profession',
    category: 'Career Guidance',
    categoryClassName: 'bg-amber-100 text-amber-700',
    accentClassName: 'bg-amber-500',
    previewIcon: '\u{1F680}',
    title: 'From Admission to Profession: Planning Your Academic Path in a More Flexible System',
    excerpt: 'Admission strategy should now connect directly to qualification planning. Students should think through progression from entry route to final award, employability, and any professional advantages tied to their chosen pathway.',
    sections: [
      {
        paragraphs: [
          'The strongest students now plan beyond first admission. They ask where the route leads, what qualification it ends with, and whether the structure supports their career ambition.',
          'That is especially important in education and agriculture, where route design can now differ significantly from the old one-size-fits-all UTME narrative.',
        ],
        bullets: [
          'Choose pathways that align with the final qualification you want.',
          'Use progression opportunities intentionally, not accidentally.',
          'Track practical experience, digital skills, and professional development alongside admission planning.',
        ],
      },
    ],
  },
];
