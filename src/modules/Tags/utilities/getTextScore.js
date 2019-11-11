const SKILL_SCORES = {
  1: 'Started Learning',
  2: 'Understands',
  3: 'Can Teach with Help',
  4: 'Can Teach',
};

const getTextScore = score => SKILL_SCORES[score] || 'Unknown';

export default getTextScore;
