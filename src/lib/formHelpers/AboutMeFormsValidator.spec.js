import {cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  contactInfoValidator,
  interestsAndGoalsValidator,
  programsAndEligibilityValidator,
  valueAlignmentValidator,
} from './formValidator';

afterEach(cleanup);

describe('About Me: Contact Info Form', () => {
  test('Contact Info Validator: empty values ', () => {
    const values = {
      first_name: '',
      last_name: '',
      phone_primary: '',
      email: '',
      profile: {
        address_primary: {
          street1: '',
          street2: '',
          city: '',
          state: '',
          zip_code: '',
          country: '',
        },
      },
    };
    const expectedErr = {
      firstName_error: 'Required',
      lastName_error: 'Required',
      email_error: 'Required',
      phonePrimary_error: 'Required',
      street1_error: 'Required',
      city_error: 'Required',
      state_error: 'Required',
      zipCode_error: 'Required',
      country_error: 'Required',
    };

    const {isError, err} = contactInfoValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Contact Info Validator: valid values ', () => {
    const values = {
      first_name: 'Katniss Everdeen',
      last_name: 'Grape-Baby',
      phone_primary: '9990001111',
      email: 'bay@gmail.com',
      profile: {
        address_primary: {
          street1: '123 Monday St.',
          street2: 'Apt 3',
          city: 'Baltimore',
          state: 'Maryland',
          zip_code: '12345',
          country: 'United States',
        },
      },
    };
    let expectedErr = {};

    const {isError, err} = contactInfoValidator(values);
    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });

  test('Contact Info Validator: string zip code ', () => {
    const values = {
      first_name: 'Katniss Everdeen',
      last_name: 'Grape-Baby',
      phone_primary: '9990001111',
      email: 'bay@gmail.com',
      profile: {
        address_primary: {
          street1: '123 Monday St.',
          street2: 'Apt 3',
          city: 'Baltimore',
          state: 'Maryland',
          zip_code: 'abc123',
          country: 'United States',
        },
      },
    };
    let expectedErr = {
      zipCode_error: 'Invalid value. Please enter numbers only',
    };

    const {isError, err} = contactInfoValidator(values);
    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Contact Info Validator: too many digits zip code ', () => {
    const values = {
      first_name: 'Katniss Everdeen',
      last_name: 'Grape-Baby',
      phone_primary: '9990001111',
      email: 'bay@gmail.com',
      profile: {
        address_primary: {
          street1: '123 Monday St.',
          street2: 'Apt 3',
          city: 'Baltimore',
          state: 'Maryland',
          zip_code: '123456',
          country: 'United States',
        },
      },
    };
    let expectedErr = {
      zipCode_error: 'Invalid value. Please enter five-digit numbers only',
    };

    const {isError, err} = contactInfoValidator(values);
    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Contact Info Validator: too less digits zip code ', () => {
    const values = {
      first_name: 'Katniss Everdeen',
      last_name: 'Grape-Baby',
      phone_primary: '9990001111',
      email: 'bay@gmail.com',
      profile: {
        address_primary: {
          street1: '123 Monday St.',
          street2: 'Apt 3',
          city: 'Baltimore',
          state: 'Maryland',
          zip_code: '123',
          country: 'United States',
        },
      },
    };
    let expectedErr = {
      zipCode_error: 'Invalid value. Please enter five-digit numbers only',
    };

    const {isError, err} = contactInfoValidator(values);
    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });
});

describe('About Me: Interest and Goals Form', () => {
  const emptyValues = {
    profile: {
      job_search_status: '',
      current_job_status: '',
      current_edu_status: '',
      years_exp: '',
      previous_bcorps_program: '',
      hear_about_us: '',
      hear_about_us_other: '',
      programs_completed: {
        fellowship: false,
        public_allies: false,
        mayoral_fellowship: false,
        kiva: false,
        elevation_awards: false,
        civic_innovators: false,
      },
    },
  };

  const validValues = {
    profile: {
      job_search_status: 'Actively looking for a job',
      current_job_status: 'Unemployed',
      current_edu_status: 'Full-time student',
      years_exp: '0-2 years',
      hear_about_us: 'School',
      hear_about_us_other: 'UMBC',
      previous_bcorps_program: 'Yes',
      programs_completed: {
        fellowship: false,
        public_allies: false,
        mayoral_fellowship: true,
        kiva: false,
        elevation_awards: false,
        civic_innovators: false,
      },
    },
  };
  test('Interest and Goals Validator: Valid values ', () => {
    const values = validValues;
    values.profile.programs_completed.mayoral_fellowship = true;

    let expectedErr = {};
    let {isError, err} = interestsAndGoalsValidator(values);

    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });
  test('Interest and Goals Validator: empty values ', () => {
    const values = emptyValues;

    let expectedErr = {
      jobSearchStatus_error: 'Required',
      currentJobStatus_error: 'Required',
      currentEduStatus_error: 'Required',
      yearsExp_error: 'Required',
    };
    let {isError, err} = interestsAndGoalsValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Interest and Goals Validator: require programs completed ', () => {
    const values = validValues;
    values.profile.programs_completed.mayoral_fellowship = false;

    let expectedErr = {
      programsCompleted_error: 'Required',
    };
    let {isError, err} = interestsAndGoalsValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Interest and Goals Validator: require hear_about_us_other ', () => {
    const values = validValues;
    values.profile.programs_completed.mayoral_fellowship = true;
    values.profile.hear_about_us = 'Other';
    values.profile.hear_about_us_other = '';

    let expectedErr = {
      hearAboutUsOther_error: 'Required',
    };
    let {isError, err} = interestsAndGoalsValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });
});

describe('About Me: Value Alignment Form', () => {
  test('Value Alignment Validator: empty values ', () => {
    const values = {
      profile: {
        value_question1: '',
        value_question2: '',
      },
    };
    let expectedErr = {
      valueQuestion1_error: 'Required',
      valueQuestion2_error: 'Required',
    };
    let {isError, err} = valueAlignmentValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Value Alignment Validator: Valid values ', () => {
    const values = {
      profile: {
        value_question1: 'Answer1',
        value_question2: 'Answer2',
      },
    };
    let expectedErr = {};
    let {isError, err} = valueAlignmentValidator(values);

    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });
});

describe('About Me: Programs and Eligibility Form', () => {
  test.skip('Programs and Eligibility Validator: empty values ', () => {
    const values = {
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
        needHelp: {
          checked: false,
          label: "I'd like some help figuring this out",
        },
      },
    };
    let expectedErr = {
      interestedPrograms_error: 'Required',
    };
    let {isError, err} = programsAndEligibilityValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test.skip('Programs and Eligibility Validator: empty values ', () => {
    const values = {
      interested_programs: {
        BaltimoreCorpsFellowship: {
          checked: false,
          label: 'Baltimore Corps Fellowship',
        },
        JHUCareyHumanitiesFellowship: {
          checked: false,
          label: 'JHU Carey Humanities Fellowship',
        },
        PlaceForPurpose: {checked: true, label: 'Place for Purpose'},
        PublicAllies: {checked: true, label: 'Public Allies'},
        needHelp: {
          checked: false,
          label: "I'd like some help figuring this out",
        },
      },
    };
    let expectedErr = {};
    let {isError, err} = programsAndEligibilityValidator(values);

    console.log(err);
    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });
});
