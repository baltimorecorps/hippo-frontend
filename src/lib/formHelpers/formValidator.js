import {monthFullNames} from 'components/Experiences/AddOrEditExperienceForm/staticData';

// Validate add new experience form (Work/Education/Accomplishment)
const experienceValidator = values => {
  if (values.start_year) {
    values.start_year = values.start_year.toString();
  }
  if (values.end_year) {
    values.end_year = values.end_year.toString();
  }

  const {
    type,
    start_month,
    end_month,
    start_year,
    end_year,
    is_current,
    location,
    host,
    title,
    degree,
    degree_other,
    link,
    description,
    achievements,
  } = values;

  let isError = false;
  let err = {};

  if (type !== 'Accomplishment' && !host) {
    isError = true;
    err.host_error = 'Required';
  }

  if (type === 'Education' && !degree) {
    isError = true;
    err.degree_error = 'Required';
  }

  if (type === 'Education' && degree) {
    if (degree === 'Other' && !degree_other) {
      isError = true;
      err.degreeOther_error = 'Required';
    }
    if (degree_other && degree_other.length > 100) {
      isError = true;
      err.degreeOther_error =
        'Type of Education must be less than 100 characters';
    }
  }

  if (!title) {
    isError = true;
    err.title_error = 'Required';
  }

  if (link && link.length > 255) {
    isError = true;
    err.link_error = 'Link must be less than 255 characters';
  }

  // check if start_month is null, invalid month name, or 'none'

  if (
    type !== 'Accomplishment' &&
    (!start_month || !monthFullNames.includes(start_month))
  ) {
    isError = true;
    err.startMonth_error = 'Required';
  }

  // check if start_year is null or '0'
  if (type !== 'Accomplishment' && (!start_year || start_year === '0')) {
    isError = true;
    err.startYear_error = 'Required';
  }

  if (type !== 'Accomplishment' && !location) {
    isError = true;
    err.location_error = 'Required';
  }

  // require end_month and end_year if is_current is false
  if (type !== 'Accomplishment' && is_current === false) {
    if (!end_month || !monthFullNames.includes(end_month)) {
      isError = true;
      err.endMonth_error = 'Required';
    }
    if (!end_year || end_year === '0') {
      isError = true;
      err.endYear_error = 'Required';
    }
  }

  if (description && description.length > 750) {
    isError = true;
    err.description_error = 'Your content is too long. Maximum 750 characters.';
  }

  if (achievements && achievements.length > 0) {
    achievements.forEach(achievement => {
      if (achievement.description.length > 750) {
        isError = true;
        err.achievements_error =
          'Your content is too long. Maximum 750 characters.';
      }
    });
  }

  if (
    !is_current &&
    start_month &&
    start_year &&
    end_month &&
    end_year &&
    end_month !== 'none' &&
    end_year !== '0'
  ) {
    // if same year (start-end), check if months are in the correct order
    if (
      start_year === end_year &&
      monthFullNames.indexOf(end_month) < monthFullNames.indexOf(start_month)
    ) {
      isError = true;
      err.endMonth_error = 'End month must be later than start month';
    }
    // end year cannot be less than start year
    if (end_year < start_year) {
      isError = true;
      err.endYear_error = 'End year must be greater than start year';
    }
  }

  return {isError, err};
};

const newProfileValidator = values => {
  const {first_name, last_name, email, phone_primary, terms_agreement} = values;

  let isError = false;
  let err = {};

  if (!first_name) {
    isError = true;
    err.firstName_error = 'Required';
  }

  if (!last_name) {
    isError = true;
    err.lastName_error = 'Required';
  }

  if (!email) {
    isError = true;
    err.email_error = 'Required';
  } else if (!validateEmail(email)) {
    isError = true;
    err.email_error = 'Invalid email address';
  }
  if (!phone_primary || phone_primary.replace(/\D/g, '').length < 6) {
    isError = true;
    err.phonePrimary_error = 'Required';
  }

  if (!terms_agreement) {
    isError = true;
    err.termsAgreement_error = 'Required';
  }

  return {isError, err};
};

// Validate RegEx
const validateEmail = input => {
  const mailFormat = /^[A-Z0-9_%!+-][A-Z0-9._%!+-]*@[A-Z0-9][A-Z0-9-.]+[^.]\.[A-Z]{2,}$/i;

  if (input.match(mailFormat) && input.split('@')[0].length < 64) {
    return true;
  } else {
    return false;
  }
};

const opportunityValidator = values => {
  const {org_name, title, short_description, gdoc_link} = values;

  let isError = false;
  let err = {};

  if (!org_name || org_name.length === 0) {
    isError = true;
    err.orgName_error = 'Required';
  } else if (org_name && org_name.length > 200) {
    isError = true;
    err.orgName_error = 'Organization name must be less than 200 characters';
  }

  if (!title || title.length === 0) {
    isError = true;
    err.title_error = 'Required';
  } else if (title && title.length > 200) {
    isError = true;
    err.title_error = 'Job title must be less than 200 characters';
  }

  if (!short_description || short_description.length === 0) {
    isError = true;
    err.shortDescription_error = 'Required';
  } else if (short_description && short_description.length > 2000) {
    isError = true;
    err.shortDescription_error =
      'Short description must be less than 2,000 characters';
  }

  if (!gdoc_link || gdoc_link.length === 0) {
    isError = true;
    err.link_error = 'Required';
  } else if (
    gdoc_link &&
    !gdoc_link.startsWith('https://docs.google.com/document/d/')
  ) {
    isError = true;
    err.link_error =
      'Link must start with "https://docs.google.com/document/d/"';
  }

  if (gdoc_link && gdoc_link.length > 200) {
    isError = true;
    err.link_error = 'Link must be less than 200 characters';
  }

  return {isError, err};
};

const interestValidator = interestText => {
  let isError = false;
  let err = {};
  if (!interestText) {
    isError = true;
    err.interestText_error = 'Required';
  } else if (interestText && interestText.length > 2000) {
    isError = true;
    err.interestText_error =
      'Interest statement must be less than 2,000 characters';
  }

  return {isError, err};
};

export {
  newProfileValidator,
  experienceValidator,
  opportunityValidator,
  interestValidator,
};
