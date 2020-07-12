export default {
  id: 1,
  first_name: 'Taylor',
  last_name: 'Swift',
  email: [
    {
      email: 'taylor@swift.com',
      id: 560,
      is_primary: true,
      type: 'Personal',
    },
  ],
  email_primary: {
    email: 'taylor@swift.com',
    id: 560,
    is_primary: true,
    type: 'Personal',
  },
  phone_primary: '+1 (555) 555-9999',
  profile: {
    gender: '',
    gender_other: '',
    pronoun: '',
    pronoun_other: '',
    years_exp: '',
    job_search_status: '',
    current_job_status: '',
    current_edu_status: '',
    previous_bcorps_program: '',
    address_primary: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
    },
    race: {
      american_indian: false,
      asian: false,
      black: false,
      hispanic: false,
      hawaiian: false,
      south_asian: false,
      white: false,
      not_listed: false,
      race_other: '',
    },
    roles: {
      advocacy_public_policy: false,
      community_engagement_outreach: false,
      data_analysis: false,
      fundraising_development: false,
      marketing_public_relations: false,
      operations_administration: false,
      program_management: false,
    },
    value_question1: '',
    value_question2: '',
  },
};

// const idealProgramsAPI = {
//   programs: [
//     {
//       name: 'JHU Carey Humanities Fellowship',
//       is_interested: false,
//       is_approved: false,
//       date_approved: '',
//       status: 'No response', // default value
//       // is_active: true, // is_expired
//       card_id: 'abc123',
//     },
//     {
//       name: 'Baltimore Corps Fellowship', // key can be name or label
//       is_interested: true,
//       is_approved: false,
//       date_approved: '',
//       status: 'Considering for approval', // after interested waiting for approval
//       // is_active: true,
//       card_id: 'abc123',
//     },
//     {
//       name: 'Place for Purpose',
//       is_interested: true,
//       is_approved: true,
//       date_approved: 'Return Date',
//       status: 'Decision made', // after staff made a decision (approve/not approve)
//       // is_active: true,
//       card_id: 'abc123',
//     },

//     {
//       name: 'Public Allies',
//       is_interested: false,
//       is_approved: false,
//       date_approved: '',
//       status: 'Not interested', // submit the form without checking this program checkbox
//       // is_active: true,
//       card_id: 'abc123',
//     },
//     {
//       name: "I'd like some help figuring this out", // label
//       is_interested: true, // checked
//       is_approved: false, // always false
//       date_approved: '', // always false
//       status: 'Need help', // when checked true on this checkbox
//       // is_active: true,
//       card_id: 'abc123',
//     },
//   ],
// };
