import {cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  contactInfoValidator,
  interestsAndGoalsValidator,
  programsAndEligibilityValidator,
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
    console.log(err);
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
    console.log(err);
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
    console.log(err);
    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });
});

describe('About Me: Interest and Goals Form', () => {
  test('Interest and Goals Validator: empty values ', () => {
    const values = {
      profile: {
        job_search_status: '',
        years_exp: '',
      },
    };
    let expectedErr = {
      jobSearchStatus_error: 'Required',
      yearsExp_error: 'Required',
    };
    let {isError, err} = interestsAndGoalsValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Interest and Goals Validator: empty values ', () => {
    const values = {
      profile: {
        job_search_status: 'Actively looking for a job',
        years_exp: '0-2 years',
      },
    };
    let expectedErr = {};
    let {isError, err} = interestsAndGoalsValidator(values);

    console.log(err);
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
