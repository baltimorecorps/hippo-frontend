import {
  program_apps_two_Interested,
  program_apps_not_interested,
} from './programApps';
import {skills} from './skills';

const applicantProfile = {
  account_id: '22',
  email: 'bayBC1@baltimorecorps.org',
  first_name: 'Bay1',
  id: 78,
  last_name: 'Chairangsaris',
  phone_primary: '+1 (555) 555-9999',
  status: 'approved',
  profile: {
    address_primary: {
      city: 'Baltimore',
      country: 'United States',
      is_primary: true,
      state: 'Maryland',
      street1: '1123 Monday St.',
      street2: '',
      zip_code: '21111',
    },
    current_edu_status: 'Part-time student',
    current_job_status: 'Employed part-time',
    gender: 'Not Listed',
    gender_other: 'ss',
    hear_about_us: 'School',
    hear_about_us_other: '',
    id: 1,
    job_search_status: 'Looking for a job in the next 2-6 months',
    needs_help_programs: true,
    previous_bcorps_program: 'Yes',
    pronoun: 'She/Her/Hers',
    pronoun_other: '',
    value_question1: 'Some text 12',
    value_question2: 'Something else 2',
    years_exp: '3-5 years',
    programs_completed: {
      civic_innovators: false,
      elevation_awards: false,
      fellowship: false,
      kiva: true,
      mayoral_fellowship: true,
      public_allies: true,
    },
    race: {
      american_indian: false,
      asian: true,
      black: false,
      hawaiian: false,
      hispanic: false,
      not_listed: false,
      race_other: '',
      south_asian: false,
      white: false,
    },
    roles: {
      advocacy_public_policy: true,
      community_engagement_outreach: true,
      data_analysis: true,
      fundraising_development: false,
      marketing_public_relations: false,
      program_management: false,
    },
  },
};

const applicantFull = {
  ...applicantProfile,
  program_apps: program_apps_two_Interested,
  skills,
};
const applicantFullNoProgramsInterested = {
  ...applicantProfile,
  program_apps: program_apps_not_interested,
  skills,
};

export {applicantProfile, applicantFull, applicantFullNoProgramsInterested};
