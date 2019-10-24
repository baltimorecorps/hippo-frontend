const formatMonthYearDate = (month, year) => {
  month = month.slice(0, 3);
  return `${month} ${year}`;
};

const getWorkLength = (years, months) => {
  let lengthYear = years + ' years';
  let lengthMonth = months + ' months';
  if (years === 0) {
    lengthYear = '';
  }
  if (months === 0) {
    lengthMonth = '';
  }
  if (years === 1) {
    lengthYear = years + ' year';
  }
  if (months === 1) {
    lengthMonth = months + ' month';
  }

  let lengthWork = lengthYear + ' ' + lengthMonth;

  if (lengthYear === '') {
    lengthWork = lengthMonth;
  }
  if (lengthMonth === '') {
    lengthWork = lengthYear;
  }
  if (lengthYear === '' && lengthMonth === '') {
    lengthWork = 'Less than a month';
  }
  return lengthWork;
};

const configureForm = (expType) => {
  if (expType === 'Work') {
    return {
      labels: {
        host: 'Organization',
        title: 'Title',
      },
      showDescription: false,
      showEndDate: true,
      showAchievements: true,
      showLocation: true,
      showWorkLength: true,
    };
  } else if (expType === 'Service') {
    return {
      labels: {
        host: 'Organization',
        title: 'Role',
      },
      showEndDate: true,
      showAchievements: true,
      showLocation: true,
      showWorkLength: true,
    };
  } else if (expType === 'Accomplishment') {
    return {
      labels: {
        host: 'Institution / Publisher',
        title: 'Title',
        startDate: 'Date Issued',
      },
      showDescription: true,
      showLocation: false,
      showEndDate: false,
    };
  } else if (expType === 'Education') {
    return {
      labels: {
        host: 'Institution',
        title: 'Field of Study',
        endDate: 'End Date (or expected)',
      },
      showEndDate: true,
      showDegree: true,
      showDescription: true,
      showAchievements: true,
      showLocation: true,
    };
  }
};

const isEndDateNull = (values) => {
  if (values.type === 'Accomplishment' || values.is_current === true) {
    return true;
  } else {
    return false;
  }
};

export { formatMonthYearDate, getWorkLength, configureForm, isEndDateNull };
