export default {
  id: 1,
  address: '1234 Monday St.',
  city: 'Baltimore',
  state: 'Maryland',
  zip_code: '21212',
  demographic: {
    races: {
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
  },
  interests: {
    job_search_status: 'Actively Looking for a Job',
    currently_student: true,
    current_job_status: 'Unemployed',
    years_exp: '0-2',
    types_of_roles: {
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
  },
};
