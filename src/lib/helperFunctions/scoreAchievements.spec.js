import {
  scoreDescription,
  scoreAchievement,
  scoreAchievements,
} from './scoreAchievements';

describe('scoreDescription', () => {
  test('smoke', () => {
    expect(scoreDescription('string too short')).toBe(0);
    expect(scoreDescription('this is just long enough')).toBe(1);
    expect(
      scoreDescription(
        'Wrote a realistic and lengthy description for this unit test, establishing that the code works in a realistic setting'
      )
    ).toBe(1);
  });

  test('punctuation', () => {
    expect(scoreDescription("don't split on punctuation")).toBe(0);
  });
});

describe('scoreAchievement', () => {
  test('scores 1', () => {
    expect(
      scoreAchievement({
        description: 'this is a long enough achievement',
        skills: [
          {capability_id: 'cap1'},
          {capability_id: 'cap2'},
          {capability_id: 'cap3'},
          {capability_id: 'cap1'},
        ],
      })
    ).toEqual({
      cap1: 1,
      cap2: 1,
      cap3: 1,
    });
  });

  test('scores 0', () => {
    expect(
      scoreAchievement({
        description: 'this is too short',
        skills: [
          {capability_id: 'cap1'},
          {capability_id: 'cap2'},
          {capability_id: 'cap3'},
          {capability_id: 'cap1'},
        ],
      })
    ).toEqual({
      cap1: 0,
      cap2: 0,
      cap3: 0,
    });
  });
});

describe('scoreAchievements', () => {
  test('smoke', () => {
    expect(
      scoreAchievements([
        {
          description: 'this is a long enough achievement',
          skills: [
            {capability_id: 'cap1'},
            {capability_id: 'cap2'},
            {capability_id: 'cap1'},
          ],
        },
        {
          description: 'this is too short',
          skills: [{capability_id: 'cap2'}, {capability_id: 'cap3'}],
        },
        {
          description: 'this is another long enough achievement',
          skills: [{capability_id: 'cap1'}],
        },
      ])
    ).toEqual({
      cap1: 2,
      cap2: 1,
      cap3: 0,
    });
  });
});
