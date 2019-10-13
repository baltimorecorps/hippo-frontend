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

export { formatMonthYearDate, getWorkLength };
