// export default [
//   {
//     status: 'success',
//     data: {
//       contact: {
//         pronouns_other: null,
//         emails: [
//           {
//             email: 'test123456@test.com',
//             is_primary: true,
//             id: 557,
//             type: 'Personal',
//           },
//         ],
//         gender_other: null,
//         id: 191,
//         race_other: null,
//         email_primary: {
//           email: 'test123456@test.com',
//           is_primary: true,
//           id: 557,
//           type: 'Personal',
//         },
//         skills: [
//           {name: 'Media Management', id: '-8y9tkN-SGJRnrdZO_rSoQ=='},
//           {name: 'SEO', id: 'yVS1QETw9RUEEGVo3ho0_Q=='},
//         ],
//         terms_agreement: true,
//         phone_primary: '+1 (333) 333-3333',
//         programs: [
//           {
//             is_approved: false,
//             stage: 1,
//             id: 158,
//             program: {name: 'Place for Purpose', id: 1},
//             card_id: '5eed65cadec318439a7339d8',
//             contact_id: 191,
//             is_active: true,
//           },
//         ],
//         gender: null,
//         last_name: '123456',
//         race_all: null,
//         birthdate: null,
//         pronouns: null,
//         account_id: 'auth0|5eed65ad8f68570013dd7c14',
//         first_name: 'test',
//       },
//       jwt:
//         '{"iss": "https://baltimore-corps.auth0.com/", "sub": "auth0|5eed65ad8f68570013dd7c14", "aud": ["https://dev-api.baltimorecorps.org", "https://baltimore-corps.auth0.com/userinfo"], "iat": 1592616378, "exp": 1592702778, "azp": "8MxKwe0gLeBfywJImXY89s5FPntBcy4N", "scope": "openid profile email", "permissions": []}',
//     },
//   },
// ];

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
  Interests: {
    job_search_status: 'Actively Looking for a Job',
    currently_student: true,
    current_job_status: 'Unemployed',
    years_exp: '0-2',
    types_of_roles: {
      AdvocacyPublicPolicy: true,
      CommunityEngagementOutreach: true,
      DataAnalysis: true,
      FundraisingDevelopment: false,
      ProgramManagement: false,
    },
    in_programs_before: false,
    interested_programs: {
      BaltimoreCorpsFellowship: true,
      JHUCareyHumanitiesFellowship: true,
      PlaceForPurpose: true,
      PublicAllies: true,
    },
  },
};
