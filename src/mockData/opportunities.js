import {mixedFullApplications} from './applications';

const opportunity = {
  gdoc_link: 'https://docs.google.com/document/d/f',
  id: '6098721e-ef4d-4204-87b8-a7a5d0090989',
  is_active: true,
  org_name: 'Org',
  program_id: 1,
  program_name: 'Place for Purpose',
  short_description: 'Some job description',
  status: 'submitted',
  title: 'Role',
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

let PFPOppWithApplications = [];

for (let i = 0; i < 5; i++) {
  PFPOppWithApplications.push({
    applications: mixedFullApplications,
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

export {opportunity, PFPOpportunities, PFPOppWithApplications};
