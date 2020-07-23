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
    current_job_status: 'Unemployed',
    current_edu_status: 'Full-time student',
    previous_bcorps_program: 'No',
    address_primary: {
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
    roles: {
      advocacy_public_policy: false,
      community_engagement_outreach: false,
      data_analysis: true,
      fundraising_development: false,
      marketing_public_relations: true,
      operations_administration: true,
      program_management: true,
    },
    value_question1:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ipsa dolorem voluptas sint assumenda inventore vitae tenetur? Dolorum, vel possimus!',

    value_question2:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem quia consequuntur illo perspiciatis temporibus laborum exercitationem, in eius, error soluta nihil. Ipsa accusantium illo harum obcaecati id maiores reiciendis velit quae voluptatum, facere, accusamus fuga eveniet recusandae itaque nostrum fugiat?',

    needs_help_programs: 'Yes',
    hear_about_us: 'Facebook',
    hear_about_us_other: 'Other',
    programs_completed: {
      fellowship: false,
      public_allies: false,
      mayoral_fellowship: true,
      kiva: false,
      elevation_awards: false,
      civic_innovators: false,
    },
  },
  program_apps: [
    {
      program: {id: 1, name: 'Place for Purpose'},
      is_interested: true,
    },
    {
      program: {id: 2, name: 'Mayoral Fellowship'},
      is_interested: false,
    },
    {
      program: {id: 3, name: 'Fellowship'},
      is_interested: false,
    },

    {
      program: {id: 4, name: 'Public Allies'},
      is_interested: true,
    },
    {
      program: {id: 5, name: 'JHU Carey Humanities Fellowship'},
      is_interested: true,
    },
  ],
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

// const contact = {
//   instructions: {
//     // all default values are false
//     address: false, // check if all fields in address_primary are not null (except street2, it can be null)
//     value_alignment: false, // check if values in profile are not null
//     programs_eligibility: false, // check if values in profile are not null
//     interests_goals: false, // check if values in profile are not null
//     skills: false, // check skills array inside contact, must have length > 0
//     work_exp: false, // check work experience array length > 0
//     responsibility: false, // check achievements array inside a work experience, must have length > 0
//     tag_skills: false, // check skills array inside a work experience, must have length > 0
//     education: false, // check education array length > 0
//   },
// };
