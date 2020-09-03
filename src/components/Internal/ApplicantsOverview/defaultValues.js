const formData = {
  left: [
    {
      header: 'Profile Status',
      key: 'profile_status',
      options: [
        {name: 'profile_status-submitted', label: 'Submitted', checked: false},
        {name: 'profile_status-approved', label: 'Approved', checked: false},
      ],
    },

    {
      header: 'Interested Programs',
      key: 'interested_programs',
      options: [
        {
          name: 'interested_programs-place_for_purpose',
          label: 'Place for Purpose',
          checked: false,
        },
        {
          name: 'interested_programs-fellowship',
          label: 'Fellowship',
          checked: false,
        },
        {
          name: 'interested_programs-public_allies',
          label: 'Public Allies',
          checked: false,
        },
        {
          name: 'interested_programs-mayoral_fellowship',
          label: 'Mayoral Fellowship',
          checked: false,
        },
        {
          name: 'interested_programs-jhu_fellowship',
          label: 'JHU Carey Humanities Fellowship',
          checked: false,
        },
      ],
    },
    {
      header: 'Interested Roles',
      key: 'interested_roles',
      options: [
        {
          name: 'interested_roles-advocacy_public_policy',
          label: 'Advocacy and Public Policy',
          checked: false,
        },
        {
          name: 'interested_roles-community_engagement_outreach',
          label: 'Community Engagement and Outreach',
          checked: false,
        },
        {
          name: 'interested_roles-data_analysis',
          label: 'Data Analysis',
          checked: false,
        },
        {
          name: 'interested_roles-fundraising_development',
          label: 'Fundraising and Development',
          checked: false,
        },
        {
          name: 'interested_roles-marketing_public_relations',
          label: 'Marketing and Public Relations',
          checked: false,
        },
        {
          name: 'interested_roles-program_management',
          label: 'Program Management',
          checked: false,
        },
      ],
    },
    {
      header: 'Years of Experience',
      key: 'years_of_exp',
      options: [
        {
          name: 'years_of_exp-zero_to_two_years',
          label: '0-2 years',
          checked: false,
        },
        {
          name: 'years_of_exp-three_to_five_years',
          label: '3-5 years',
          checked: false,
        },
        {
          name: 'years_of_exp-five_plus_years',
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
      header: 'Participated Programs Before',
      key: 'have_participated',
      options: [
        {name: 'have_participated-yes', label: 'Yes', checked: false},
        {name: 'have_participated-no', label: 'No', checked: false},
      ],
    },
    {
      header: 'Participated Programs or Service',
      key: 'programs_completed',
      options: [
        {
          name: 'programs_completed-fellowship',
          label: 'Baltimore Corps Fellowship',
          checked: false,
        },
        {
          name: 'programs_completed-civic_innovators',
          label: 'Civic Innovators Program',
          checked: false,
        },
        {
          name: 'programs_completed-elevation_awards',
          label: 'Elevation Awards',
          checked: false,
        },
        {name: 'programs_completed-kiva', label: 'Kiva', checked: false},
        {
          name: 'programs_completed-mayoral_fellowship',
          label: 'Mayoral Fellowship',
          checked: false,
        },
        {
          name: 'programs_completed-public_allies',
          label: 'Public Allies',
          checked: false,
        },
      ],
    },
  ],

  right: [
    {
      header: 'Employment Status',
      key: 'employment-status',
      options: [
        {
          name: 'employment-status-unemployed',
          label: 'Unemployed',
          checked: false,
        },
        {
          name: 'employment-status-part_time',
          label: 'Employed part-time',
          checked: false,
        },
        {
          name: 'employment-status-full_time',
          label: 'Employed full-time',
          checked: false,
        },
      ],
    },
    {
      header: 'Currently Student',
      key: 'currently-student',
      options: [
        {name: 'currently-student-yes', label: 'Yes', checked: false},
        {name: 'currently-student-no', label: 'No', checked: false},
      ],
    },

    {
      header: 'Race',
      key: 'race',
      options: [
        {
          name: 'race-american_indian',
          label: 'American Indian or Alaskan Native',
          checked: false,
        },
        {name: 'race-asian', label: 'Asian', checked: false},
        {name: 'race-black', label: 'Black or African Descent', checked: false},
        {name: 'race-hispanic', label: 'Hispanic or Latinx', checked: false},
        {
          name: 'race-hawaiian',
          label: 'Native Hawaiian or Other Pacific Islander',
          checked: false,
        },
        {name: 'race-south_asian', label: 'South Asian', checked: false},
        {name: 'race-white', label: 'White', checked: false},
        {name: 'race-not_listed', label: 'Not Listed', checked: false},
      ],
    },
    {
      header: 'Gender',
      key: 'gender',
      options: [
        {name: 'gender-female', label: 'Female', checked: false},
        {name: 'gender-male', label: 'Male', checked: false},
        {name: 'gender-non-binary', label: 'Non-Binary', checked: false},
        {name: 'gender-not_listed', label: 'Not Listed', checked: false},
      ],
    },
    {
      header: 'Pronoun',
      key: 'pronoun',
      options: [
        {name: 'pronoun-she', label: 'She/Her/Hers', checked: false},
        {name: 'pronoun-he', label: 'He/Him/His', checked: false},
        {name: 'pronoun-they', label: 'They/Them/Their', checked: false},
        {name: 'pronoun-not_listed', label: 'Not Listed', checked: false},
      ],
    },
    {
      header: 'How they hear about us',
      key: 'hear_about_us',
      options: [
        {
          name: 'hear_about_us-baltimore_corps_website',
          label: 'Baltimore Corps Website',
          checked: false,
        },
        {name: 'hear_about_us-facebook', label: 'Facebook', checked: false},
        {name: 'hear_about_us-instagram', label: 'Instagram', checked: false},
        {name: 'hear_about_us-indeed', label: 'Indeed', checked: false},
        {name: 'hear_about_us-linkedIn', label: 'LinkedIn', checked: false},
        {name: 'hear_about_us-school', label: 'School', checked: false},
        {
          name: 'hear_about_us-virtual_event',
          label: 'Virtual Event',
          checked: false,
        },
        {name: 'hear_about_us-other', label: 'Other', checked: false},
      ],
    },
  ],
};

export {formData};
