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
  address: '',
  city: '',
  state: '',
  zip_code: '',
  race: {
    american_indian: [false, 'American Indian or Alaskan Native'],
    asian: [false, 'Asian'],
    black: [false, 'Black or African Descent'],
    hispanic: [false, 'Hispanic or Latinx'],
    hawaiian: [false, 'Native Hawaiian or Other Pacific Islander'],
    southAsian: [false, 'South Asian'],
    white: [false, 'White'],
    notListed: [false, 'Not Listed'],
    other_race: '',
  },
  gender: '',
  other_gender: '',
  pronoun: '',
  other_pronoun: '',

  job_search_status: '',
  currently_student: false,
  current_job_status: '',
  years_exp: '',
  interested_roles: {
    AdvocacyPublicPolicy: {
      checked: false,
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
  participated_baltimore_corps_before: '',
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
