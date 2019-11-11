import format from 'date-fns/format';
import parse from 'date-fns/parse';

const formatDate = (date, ...args) =>
  date
    ? date.constructor === String
      ? format(parse(date), ...args)
      : format(date, ...args)
    : '';

export default formatDate;
