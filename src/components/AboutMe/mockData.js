export default {
  id: 1,
  first_name: 'Taylor',
  last_name: 'Swift',
  email: 'taylor@swift.com',
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

    hear_about_us: 'School',
    hear_about_us_other: 'UMBC',
    previous_bcorps_program: 'Yes',

    programs_completed: {
      fellowship: false,
      public_allies: true,
      mayoral_fellowship: true,
      kiva: false,
      elevation_awards: false,
      civic_innovators: false,
    },
    needs_help_programs: true,
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
      is_interested: true,
    },

    {
      program: {id: 4, name: 'Public Allies'},
      is_interested: false,
    },
    {
      program: {id: 5, name: 'JHU Carey Humanities Fellowship'},
      is_interested: false,
    },
  ],
};
