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
      showDescription: false,
      showAchievements: true,
      showLocation: true,
    };
  }
};

const monthScore = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const getMonthScore = (experiences) => {
  experiences.map((exp) => {
    exp.start_month_score = monthScore[exp.start_month];

    // exclude end_month === 'none'
    if (exp.is_current === false) {
      exp.end_month_score = monthScore[exp.end_month];
    }
  });

  return experiences;
};

const sortExperiences = (experiences) => {
  const experiencesWithScores = getMonthScore(experiences);

  const sortedExperiences = experiencesWithScores.sort(function(exp1, exp2) {
    // if is_current is True or have the same end month/year
    // sort from start month/year (newest experience)
    if (exp1.end_month === exp2.end_month && exp1.end_year === exp2.end_year) {
      if (exp1.start_year > exp2.start_year) return -1;
      if (exp1.start_year < exp2.start_year) return 1;
      if (exp1.start_month_score > exp2.start_month_score) return -1;
      if (exp1.start_month_score < exp2.start_month_score) return 1;
    } else if (exp1.is_current === false && exp2.is_current === false) {
      if (exp1.end_year > exp2.end_year) return -1;
      if (exp1.end_year < exp2.end_year) return 1;
      if (exp1.end_month_score > exp2.end_month_score) return -1;
      if (exp1.end_month_score < exp2.end_month_score) return 1;
    }
    if (exp1.is_current === true) return -1;
  });

  return sortedExperiences;
};

export {
  formatMonthYearDate,
  getWorkLength,
  configureForm,
  getMonthScore,
  sortExperiences,
};
