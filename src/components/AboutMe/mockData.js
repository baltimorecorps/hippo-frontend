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
    gender: 'Female',
    gender_other: '',
    pronoun: 'She/Her/Hers',
    pronoun_other: '',
    years_exp: '3-5 years',
    job_search_status: 'Actively looking for a job',
    current_job_status: 'Employed',
    current_edu_status: 'Full-time Student',
    previous_bcorps_program: 'No',
    address: {
      street1: '123 Main St',
      street2: 'Apt 3',
      city: 'Baltimore',
      state: 'Maryland',
      zip_code: '21218',
      country: 'United States',
    },
    race: {
      american_indian: false,
      asian: true,
      black: false,
      hispanic: false,
      hawaiian: true,
      south_asian: false,
      white: true,
      not_listed: false,
      race_other: '',
    },
    interested_roles: {
      advocacy_public_policy: false,
      community_engagement_outreach: false,
      data_analysis: true,
      fundraising_development: false,
      marketing_public_relations: true,
      operations_administration: true,
      program_management: true,
    },
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
