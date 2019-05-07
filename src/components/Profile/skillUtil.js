
const SKILL_SCORE = {
  [1]: 'Started Learning',
  [2]: 'Understands',
  [3]: 'Can Teach with Help',
  [4]: 'Can Teach',
};

export const scoreToString = score => (SKILL_SCORE[score] || 'Unknown');

