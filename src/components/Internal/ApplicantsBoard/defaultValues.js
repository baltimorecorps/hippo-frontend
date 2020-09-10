const formData = {
  left: [
    {
      header: 'Profile Status',
      key: 'status',
      options: [
        {
          name: 'status-submitted',
          payload_value: 'submitted',
          label: 'Submitted',
          checked: false,
        },
        {
          name: 'status-approved',
          payload_value: 'approved',
          label: 'Approved',
          checked: false,
        },
      ],
    },

    {
      header: 'Interested Programs',
      key: 'program_apps',
      options: [
        {
          id: 1,
          name: 'program_apps-place_for_purpose',
          label: 'Place for Purpose',
          checked: false,
        },
        {
          id: 2,
          name: 'program_apps-mayoral_fellowship',
          label: 'Mayoral Fellowship',
          checked: false,
        },
        {
          id: 3,
          name: 'program_apps-fellowship',
          label: 'Fellowship',
          checked: false,
        },
        {
          id: 4,
          name: 'program_apps-public_allies',
          label: 'Public Allies',
          checked: false,
        },
        {
          id: 5,
          name: 'program_apps-jhu_fellowship',
          label: 'JHU Carey Humanities Fellowship',
          checked: false,
        },
      ],
    },
    // {
    //   header: 'Needs Help Programs',
    //   key: 'needs_help_programs',
    //   options: [
    //     {
    //       name: 'needs_help_programs-yes',
    //       label: 'Yes',
    //       checked: false,
    //     },
    //     {
    //       name: 'needs_help_programs-no',
    //       label: 'No',
    //       checked: false,
    //     },
    //   ],
    // },

    {
      header: 'Participated Programs Before',
      key: 'previous_bcorps_program',
      options: [
        {name: 'previous_bcorps_program-yes', label: 'Yes', checked: false},
        {name: 'previous_bcorps_program-no', label: 'No', checked: false},
      ],
    },
    {
      header: 'Participated Programs or Service',
      key: 'programs_completed',
      options: [
        {
          name: 'programs_completed-fellowship',
          payload_key: 'fellowship',
          label: 'Baltimore Corps Fellowship',
          checked: false,
        },
        {
          name: 'programs_completed-civic_innovators',
          payload_key: 'civic_innovators',
          label: 'Civic Innovators Program',
          checked: false,
        },
        {
          name: 'programs_completed-elevation_awards',
          payload_key: 'elevation_awards',
          label: 'Elevation Awards',
          checked: false,
        },
        {
          name: 'programs_completed-kiva',
          payload_key: 'kiva',
          label: 'Kiva',
          checked: false,
        },
        {
          name: 'programs_completed-mayoral_fellowship',
          payload_key: 'mayoral_fellowship',
          label: 'Mayoral Fellowship',
          checked: false,
        },
        {
          name: 'programs_completed-public_allies',
          payload_key: 'public_allies',
          label: 'Public Allies',
          checked: false,
        },
      ],
    },
  ],

  right: [
    {
      header: 'Years of Experience',
      key: 'years_exp',
      options: [
        {
          name: 'years_exp-zero_to_two_years',
          label: '0-2 years',
          checked: false,
        },
        {
          name: 'years_exp-three_to_five_years',
          label: '3-5 years',
          checked: false,
        },
        {
          name: 'years_exp-five_plus_years',
          label: '5+ years',
          checked: false,
        },
      ],
    },
    {
      header: 'Job Search Status',
      key: 'job_search_status',
      options: [
        {
          name: 'job_search_status-actively_looking',
          label: 'Actively looking for a job',
          checked: false,
        },
        {
          name: 'job_search_status-two_to_six_month',
          label: 'Looking for a job in the next 2-6 months',
          checked: false,
        },
        {
          name: 'job_search_status-just_curious',
          label: 'Curious to see what opportunities are available',
          checked: false,
        },
      ],
    },
    {
      header: 'Employment Status',
      key: 'current_job_status',
      options: [
        {
          name: 'current_job_status-unemployed',
          label: 'Unemployed',
          checked: false,
        },
        {
          name: 'current_job_status-part_time',
          label: 'Employed part-time',
          checked: false,
        },
        {
          name: 'current_job_status-full_time',
          label: 'Employed full-time',
          checked: false,
        },
      ],
    },

    {
      header: 'Interested Roles',
      key: 'roles',
      options: [
        {
          name: 'roles-advocacy_public_policy',
          payload_key: 'advocacy_public_policy',
          label: 'Advocacy and Public Policy',
          checked: false,
        },
        {
          name: 'roles-community_engagement_outreach',
          payload_key: 'community_engagement_outreach',
          label: 'Community Engagement and Outreach',
          checked: false,
        },
        {
          name: 'roles-data_analysis',
          payload_key: 'data_analysis',
          label: 'Data Analysis',
          checked: false,
        },
        {
          name: 'roles-fundraising_development',
          payload_key: 'fundraising_development',
          label: 'Fundraising and Development',
          checked: false,
        },
        {
          name: 'roles-marketing_public_relations',
          payload_key: 'marketing_public_relations',
          label: 'Marketing and Public Relations',
          checked: false,
        },
        {
          name: 'roles-program_management',
          payload_key: 'program_management',
          label: 'Program Management',
          checked: false,
        },
      ],
    },

    // {
    //   header: 'Currently Student',
    //   key: 'current_edu_status',
    //   options: [
    //     {name: 'current_edu_status-yes', label: 'Yes', checked: false},
    //     {name: 'current_edu_status-no', label: 'No', checked: false},
    //   ],
    // },
    // {
    //   header: 'Race',
    //   key: 'race',
    //   options: [
    //     {
    //       name: 'race-american_indian',
    //       payload_key: 'american_indian',
    //       label: 'American Indian or Alaskan Native',
    //       checked: false,
    //     },
    //     {
    //       name: 'race-asian',
    //       payload_key: 'asian',
    //       label: 'Asian',
    //       checked: false,
    //     },
    //     {
    //       name: 'race-black',
    //       payload_key: 'black',
    //       label: 'Black or African Descent',
    //       checked: false,
    //     },
    //     {
    //       name: 'race-hispanic',
    //       payload_key: 'hispanic',
    //       label: 'Hispanic or Latinx',
    //       checked: false,
    //     },
    //     {
    //       name: 'race-hawaiian',
    //       payload_key: 'hawaiian',
    //       label: 'Native Hawaiian or Other Pacific Islander',
    //       checked: false,
    //     },
    //     {
    //       name: 'race-south_asian',
    //       payload_key: 'south_asian',
    //       label: 'South Asian',
    //       checked: false,
    //     },
    //     {
    //       name: 'race-white',
    //       payload_key: 'white',
    //       label: 'White',
    //       checked: false,
    //     },
    //     {
    //       name: 'race-not_listed',
    //       payload_key: 'not_listed',
    //       label: 'Not Listed',
    //       checked: false,
    //     },
    //   ],
    // },
    // {
    //   header: 'Gender',
    //   key: 'gender',
    //   options: [
    //     {name: 'gender-female', label: 'Female', checked: false},
    //     {name: 'gender-male', label: 'Male', checked: false},
    //     {name: 'gender-non-binary', label: 'Non-Binary', checked: false},
    //     {name: 'gender-not_listed', label: 'Not Listed', checked: false},
    //   ],
    // },
    // {
    //   header: 'Pronoun',
    //   key: 'pronoun',
    //   options: [
    //     {name: 'pronoun-she', label: 'She/Her/Hers', checked: false},
    //     {name: 'pronoun-he', label: 'He/Him/His', checked: false},
    //     {name: 'pronoun-they', label: 'They/Them/Their', checked: false},
    //     {name: 'pronoun-not_listed', label: 'Not Listed', checked: false},
    //   ],
    // },
    // {
    //   header: 'How they hear about us',
    //   key: 'hear_about_us',
    //   options: [
    //     {
    //       name: 'hear_about_us-baltimore_corps_website',
    //       label: 'Baltimore Corps Website',
    //       checked: false,
    //     },
    //     {name: 'hear_about_us-facebook', label: 'Facebook', checked: false},
    //     {name: 'hear_about_us-instagram', label: 'Instagram', checked: false},
    //     {name: 'hear_about_us-indeed', label: 'Indeed', checked: false},
    //     {name: 'hear_about_us-linkedIn', label: 'LinkedIn', checked: false},
    //     {name: 'hear_about_us-school', label: 'School', checked: false},
    //     {
    //       name: 'hear_about_us-virtual_event',
    //       label: 'Virtual Event',
    //       checked: false,
    //     },
    //     {name: 'hear_about_us-other', label: 'Other', checked: false},
    //   ],
    // },
  ],
};

export {formData};
