import {resume} from './resumes';
// import {opportunity, PFPOpportunities} from './opportunities';
import {contact} from './contact';

// console.log('PFPOpportunities', PFPOpportunities);
const draftApplication = {
  id: '2f2dd765-1b99-431b-b833-88ea51399efb',
  interest_statement: '',
  interview_completed: false,
  interview_date: null,
  interview_time: null,
  is_active: true,
  status: 'draft',
};

const submittedApplication = {
  id: '2f2dd765-1b99-431b-b833-88ea51399efb',
  interest_statement: 'My interested statement.',
  interview_completed: false,
  interview_date: null,
  interview_time: null,
  is_active: true,
  status: 'submitted',
};
const recommendedApplication = {
  id: '2f2dd765-1b99-431b-b833-88ea51399efb',
  interest_statement: 'My interested statement.',
  interview_completed: false,
  interview_date: null,
  interview_time: null,
  is_active: true,
  status: 'recommended',
};
const interviewingApplication = {
  id: '2f2dd765-1b99-431b-b833-88ea51399efb',
  interest_statement: 'My interested statement.',
  interview_completed: true,
  interview_date: '2020-03-24',
  interview_time: '13:30:54',
  is_active: true,
  status: 'considered_for_role',
};
const consideredApplication = {
  id: '2f2dd765-1b99-431b-b833-88ea51399efb',
  interest_statement: 'My interested statement.',
  interview_completed: true,
  interview_date: '2020-03-24',
  interview_time: '13:30:54',
  is_active: true,
  status: 'considered_for_role',
};
const notAFitApplication = {
  id: '2f2dd765-1b99-431b-b833-88ea51399efb',
  interest_statement: 'My interested statement.',
  interview_completed: true,
  interview_date: '2020-03-24',
  interview_time: '13:30:54',
  is_active: false,
  status: 'considered_for_role',
};

let PFPOpportunities = [];

for (let i = 0; i < 5; i++) {
  PFPOpportunities.push({
    gdoc_link: 'https://docs.google.com/document/d/f',
    id: '6098721e-ef4d-4204-87b8-a7a5d0090989',
    is_active: true,
    org_name: `Org ${i + 1}`,
    program_id: 1,
    program_name: 'Place for Purpose',
    short_description: `Some job description ${i + 1}`,
    status: 'submitted',
    title: `Role ${i + 1}`,
  });
}

const fullDraftApp = {
  id: '2f2dd765-1b99-431b-b833-88ea51399efb',
  interest_statement: '',
  interview_completed: false,
  interview_date: '',
  interview_time: '',
  is_active: true,
  status: 'draft',
  contact,
  opportunity: PFPOpportunities[0],
  resume: null,
};
const fullSubmittedApp = {
  id: '2f2dd765-1b99-431b-b833-88ea51399efb',
  interest_statement: 'My interested statement.',
  interview_completed: false,
  interview_date: '',
  interview_time: '',
  is_active: true,
  status: 'submitted',
  contact,
  opportunity: PFPOpportunities[0],
  resume,
};
const fullRecommendedApp = {
  id: '2f2dd765-1b99-431b-b833-88ea51399efb',
  interest_statement: 'My interested statement.',
  interview_completed: false,
  interview_date: '',
  interview_time: '',
  is_active: true,
  status: 'recommended',
  contact,
  opportunity: PFPOpportunities[1],
  resume,
};
const fullInterviewingApp = {
  contact,
  ...consideredApplication,
  status: 'interviewed',
  opportunity: PFPOpportunities[2],
  resume,
};

const fullConsideredApp = {
  contact,
  ...consideredApplication,
  opportunity: PFPOpportunities[3],
  resume,
};

const fullNotAFitFromRecommendedApp = {
  contact,
  ...consideredApplication,
  status: 'recommended',
  is_active: false,
  opportunity: PFPOpportunities[4],
  resume,
};
const fullNotAFitFromInterviewApp = {
  contact,
  ...consideredApplication,
  status: 'interviewed',
  is_active: false,
  opportunity: PFPOpportunities[4],
  resume,
};
const fullNotAFitFromFinalistsApp = {
  contact,
  ...consideredApplication,
  status: 'considered_for_role',
  is_active: false,
  opportunity: PFPOpportunities[4],
  resume,
};

const mixedApplications = [
  submittedApplication,
  recommendedApplication,
  interviewingApplication,
  consideredApplication,
  notAFitApplication,
];

const mixedFullApplications = [
  fullSubmittedApp,
  fullRecommendedApp,
  fullInterviewingApp,
  fullConsideredApp,
  fullNotAFitFromInterviewApp,
];

export {
  draftApplication,
  submittedApplication,
  recommendedApplication,
  interviewingApplication,
  consideredApplication,
  notAFitApplication,
  mixedApplications,
  fullDraftApp,
  fullSubmittedApp,
  fullRecommendedApp,
  fullConsideredApp,
  fullInterviewingApp,
  fullNotAFitFromInterviewApp,
  mixedFullApplications,
  fullNotAFitFromFinalistsApp,
  fullNotAFitFromRecommendedApp,
};
