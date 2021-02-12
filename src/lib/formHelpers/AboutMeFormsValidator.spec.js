import {cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  contactInfoValidator,
  interestsAndGoalsValidator,
  programsAndEligibilityValidator,
  valueAlignmentValidator,
} from './formValidator';

import {blankProfile} from './defaultData';

afterEach(cleanup);

describe('About Me: Contact Info Form', () => {
  const validValues = {
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
      race: {
        american_indian: false,
        asian: false,
        black: false,
        hawaiian: false,
        hispanic: false,
        not_listed: false,
        race_other: '',
        south_asian: false,
        white: false,
      },
      gender: '',
      gender_other: '',
      pronoun: '',
      pronoun_other: '',
      hear_about_us: '',
      hear_about_us_other: '',
    },
  };
  test('Contact Info Validator: empty values ', () => {
    const values = {
      first_name: '',
      last_name: '',
      phone_primary: '',
      email: '',
      profile: blankProfile,
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
    const values = validValues;

    let expectedErr = {};

    const {isError, err} = contactInfoValidator(values);
    expect(isError).toBe(false);
    expect(err).toEqual(expectedErr);
  });

  test('Contact Info Validator: string zip code ', () => {
    const values = validValues;
    values.profile.address_primary.zip_code = 'abc123';

    let expectedErr = {
      zipCode_error: 'Invalid value. Please enter numbers only',
    };

    const {isError, err} = contactInfoValidator(values);
    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Contact Info Validator: too many digits zip code ', () => {
    const values = validValues;
    values.profile.address_primary.zip_code = '123456';

    let expectedErr = {
      zipCode_error: 'Invalid value. Please enter five-digit numbers only',
    };

    const {isError, err} = contactInfoValidator(values);
    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });

  test('Contact Info Validator: too less digits zip code ', () => {
    const values = validValues;
    values.profile.address_primary.zip_code = '123';

    let expectedErr = {
      zipCode_error: 'Invalid value. Please enter five-digit numbers only',
    };
    let result = contactInfoValidator(values);

    expect(result.isError).toBe(true);
    expect(result.err).toEqual(expectedErr);

    values.profile.address_primary.zip_code = '21111';
    result = contactInfoValidator(values);
    expect(result.isError).toBe(false);
    expect(result.err).toEqual({});
  });

  test('Contact Info Validator: require hear_about_us_other ', () => {
    const values = validValues;
    values.profile.hear_about_us = 'Other';
    values.profile.hear_about_us_other = '';

    let expectedErr = {
      hearAboutUsOther_error: 'Required',
    };
    let result = contactInfoValidator(values);

    expect(result.isError).toBe(true);
    expect(result.err).toEqual(expectedErr);

    values.profile.hear_about_us_other = 'some place';
    result = contactInfoValidator(values);

    expect(result.isError).toBe(false);
    expect(result.err).toEqual({});
  });

  test('Contact Info Validator: require race_other when race.not_listed is true ', () => {
    const values = validValues;
    values.profile.race.not_listed = true;
    values.profile.race.race_other = '';

    let expectedErr = {
      raceOther_error: 'Required',
    };
    let {isError, err} = contactInfoValidator(values);

    expect(isError).toBe(true);
    expect(err).toEqual(expectedErr);
  });
});

describe('About Me: Interest and Goals Form', () => {
  const emptyValues = {
    profile: blankProfile,
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

  test('Value Alignment Validator: Too many characters ', () => {
    const char1600 =
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante i';

    const char2600 =
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vesti';

    const values = {
      profile: {
        value_question1: char1600,
        value_question2: char2600,
      },
    };
    let expectedErr = {
      valueQuestion1_error:
        'You have reached the maximum limit of 1,500 characters',
      valueQuestion2_error:
        'You have reached the maximum limit of 2,500 characters',
    };
    let {isError, err} = valueAlignmentValidator(values);

    expect(isError).toBe(true);
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

  //Need update
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
