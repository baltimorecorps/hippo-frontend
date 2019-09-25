const monthFullNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Creating an array of current year to 1900
let currentYear = new Date();
currentYear = currentYear.getFullYear();
let years = [];
for (let i = currentYear; i > 1900; i--) {
  years.push(i);
}

export { monthFullNames, years };
