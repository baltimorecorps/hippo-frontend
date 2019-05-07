import {scoreToString} from './skillUtil';

describe('score to string', () => {
  test('basics', () => {
    expect(scoreToString(2)).toBe('Understands');
  });
  test('string input', () => {
    expect(scoreToString("2")).toBe('Understands');
  });
  test('out of bounds input', () => {
    expect(scoreToString(5)).toBe('Unknown');
  });
  test('random input ', () => {
    expect(scoreToString({random: 5})).toBe('Unknown');
  });
});
