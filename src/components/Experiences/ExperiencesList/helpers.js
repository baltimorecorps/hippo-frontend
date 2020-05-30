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

const configureForm = expType => {
  if (expType === 'Work') {
    return {
      labels: {
        host: 'Name of Company or Organization',
        title: 'Title',
        achievements: {
          label: 'Responsibilities and Achievements:',
          sublabel:
            'Write about skills you gained and how you used them; what you were proud of or recognized for',
        },
      },
      showHost: true,
      showSkills: true,
      showDescription: false,
      showEndDate: true,
      showAchievements: true,
      showLocation: true,
      showWorkLength: true,
      showLink: false,
    };
  } else if (expType === 'Service') {
    return {
      labels: {
        host: 'Organization',
        title: 'Your Role or Job Title',
      },
      showSkills: true,
      showEndDate: true,
      showAchievements: true,
      showLocation: true,
      showWorkLength: true,
    };
  } else if (expType === 'Accomplishment') {
    return {
      labels: {
        host: 'Organization / Institution / Publisher (optional)',
        title: 'Name/Title',
        startDate: 'Date Issued',
      },
      showHost: false,
      showSkills: true,
      showDescription: true,
      showLocation: false,
      showEndDate: false,
      showLink: true,
    };
  } else if (expType === 'Education') {
    return {
      labels: {
        host: 'School',
        title: 'Area of Study/Course Title',
        endDate: 'End Date (or expected)',
        achievements: {
          label: 'Additional Details:',
          sublabel:
            '(ex: projects where you used new skills, specific classes, clubs, activites)',
        },
      },
      showHost: true,
      showSkills: true,
      showEndDate: true,
      showDegree: true,
      showDescription: false,
      showAchievements: true,
      showLocation: true,
      showLink: false,
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

const getMonthScore = experiences => {
  experiences.map(exp => {
    exp.start_month_score = monthScore[exp.start_month];

    // exclude end_month === 'none'
    if (exp.is_current === false) {
      return (exp.end_month_score = monthScore[exp.end_month]);
    }
    return exp.start_month_score;
  });

  return experiences;
};

const sortExperiences = experiences => {
  const experiencesWithScores = getMonthScore(experiences);

  const sortedExperiences = experiencesWithScores.sort(function(exp1, exp2) {
    // sort by is_current first, then end_date, then start_date
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
