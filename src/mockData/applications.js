import {resume} from './resumes';
import {opportunity, PFPOpportunities as opportunities} from './opportunities';
import {contact} from './contact';

const consideredApplication = {
  id: '2f2dd765-1b99-431b-b833-88ea51399efb',
  interest_statement: 'My interested statement.',
  interview_completed: true,
  interview_date: '2020-03-24',
  interview_time: '13:30:54',
  is_active: true,
  status: 'considered_for_role',
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
  opportunity: opportunities[0],
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
  opportunity: opportunities[1],
  resume,
};
const fullInterviewingApp = {
  contact,
  ...consideredApplication,
  status: 'interviewed',
  opportunity: opportunities[2],
  resume,
};

const fullConsideredApp = {
  contact,
  ...consideredApplication,
  opportunity: opportunities[3],
  resume,
};
const fullNotAFitApp = {
  contact,
  ...consideredApplication,
  status: 'interviewed',
  is_active: false,
  opportunity: opportunities[4],
  resume,
};

const mixedAllApplications = [
  fullSubmittedApp,
  fullRecommendedApp,
  fullInterviewingApp,
  fullConsideredApp,
  fullNotAFitApp,
];

export {
  fullSubmittedApp,
  fullRecommendedApp,
  fullConsideredApp,
  fullInterviewingApp,
  fullNotAFitApp,
  mixedAllApplications,
};
