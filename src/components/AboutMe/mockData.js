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
  address: '1234 Monday St.',
  city: 'Baltimore',
  state: 'Maryland',
  zip_code: '21212',
  race: {
    american_indian: [false, 'American Indian or Alaskan Native'],
    asian: [true, 'Asian'],
    black: [false, 'Black or African Descent'],
    hispanic: [false, 'Hispanic or Latinx'],
    hawaiian: [false, 'Native Hawaiian or Other Pacific Islander'],
    southAsian: [true, 'South Asian'],
    white: [false, 'White'],
    notListed: [false, 'Not Listed'],
    other: '',
  },
  gender: 'Female',
  pronoun: 'She/Her',

  job_search_status: 'Actively looking for a job',
  currently_student: true,
  current_job_status: 'Unemployed',
  years_exp: '0-2',
  interested_roles: {
    AdvocacyPublicPolicy: {
      checked: true,
      label: 'Advocacy and Public Policy',
    },
    CommunityEngagementOutreach: {
      checked: false,
      label: 'Community Engagement and Outreach',
    },
    DataAnalysis: {checked: false, label: 'Data Analysis'},
    FundraisingDevelopment: {
      checked: false,
      label: 'Fundraising and Development',
    },
    MarketingPublicRelations: {
      checked: false,
      label: 'Marketing and Public Relations',
    },
    OperationsAdministration: {
      checked: false,
      label: 'Operations and Administration',
    },
    ProgramManagement: {checked: false, label: 'Program Management'},
  },
  in_programs_before: false,
  interested_programs: {
    BaltimoreCorpsFellowship: {
      checked: false,
      label: 'Baltimore Corps Fellowship',
    },
    JHUCareyHumanitiesFellowship: {
      checked: false,
      label: 'JHU Carey Humanities Fellowship',
    },
    PlaceForPurpose: {checked: false, label: 'Place for Purpose'},
    PublicAllies: {checked: false, label: 'Public Allies'},
    needHelp: {checked: false, label: "I'd like some help figuring this out"},
  },
};
