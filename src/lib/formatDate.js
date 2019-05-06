import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

const formatDate = (date, ...args) => (
  date.constructor === String
  ? format(parseISO(date), ...args)
  : format(date, ...args)
);

export default formatDate;
