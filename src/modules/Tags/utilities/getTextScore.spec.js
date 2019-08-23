import getTextScore from './getTextScore';

describe('score to string', () => {
  test('basics', () => {
    expect(getTextScore(2)).toBe('Understands');
  });
  test('string input', () => {
    expect(getTextScore('2')).toBe('Understands');
  });
  test('out of bounds input', () => {
    expect(getTextScore(5)).toBe('Unknown');
  });
  test('random input ', () => {
    expect(getTextScore({ random: 5 })).toBe('Unknown');
  });
});
