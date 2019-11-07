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
    if (exp1.is_current !== exp2.is_current) {
      return exp1.is_current === true ? -1 : 1;
    } else {
      return (
        exp2.end_year - exp1.end_year ||
        exp2.end_month - exp1.end_month ||
        exp2.start_year - exp1.start_year ||
        exp2.start_month - exp1.start_month
      );
    }
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
