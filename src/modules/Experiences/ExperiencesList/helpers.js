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
  console.log(experiences);

  experiences.map((exp) => {
    const endMonthName = exp['end_month'];
    const startMonthName = exp['start_month'];
    const endMonthScore = monthScore[endMonthName];
    const startMonthScore = monthScore[startMonthName];
    exp.end_month_score = endMonthScore;
    exp.start_month_score = startMonthScore;
  });

  return experiences;
};

const sortExperiences = (experiences) => {
  const experiencesWithScores = getMonthScore(experiences);

  experiencesWithScores.sort(function(exp1, exp2) {
    // if is_current is True sort from start month/year
    if (exp1.is_current === true && exp2.is_current === true) {
      if (exp1.start_month_score > exp2.start_month_score) return -1;
      if (exp1.start_month_score < exp2.start_month_score) return 1;
      if (exp1.start_year > exp2.start_year) return -1;
      if (exp1.start_year < exp2.start_year) return 1;
    }
    if (exp1.is_current === false) {
    }
  });

  return experiences;
};

export { formatMonthYearDate, getWorkLength, configureForm, sortExperiences };
