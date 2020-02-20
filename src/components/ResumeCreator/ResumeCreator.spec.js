import {fillPageSections} from './ResumeCreator';

describe('fillPageSections', () => {
  const sections = {
    experience: [1, 2, 3, 4, 5, 6, 7],
    capabilities: [1, 2, 3, 4, 5, 6, 7],
    education: [10, 20, 30,],
    portfolio: [100, 200, 300, 400],
  };
  test('smoke', () => {
    const breakpoints = [ 
      {left: 3, right: 5},
      {left: 2, right: 4},
      {left: 2, right: 5},
    ]
    const result = fillPageSections(sections, breakpoints);
    expect(result).toEqual([
      {
        experience: [1, 2, 3],
        capabilities: [1, 2, 3, 4, 5],
        education: [],
        portfolio: [],
      },
      {
        experience: [4, 5],
        capabilities: [6, 7],
        education: [10, 20],
        portfolio: [],
      },
      {
        experience: [6, 7],
        capabilities: [],
        education: [30,],
        portfolio: [100, 200, 300, 400],
      },
    ]);
  });
  test('right is 0', () => {
    const breakpoints = [ 
      {left: 3, right: 14},
      {left: 4, right: 0},
    ]
    const result = fillPageSections(sections, breakpoints);
    expect(result).toEqual([
      {
        experience: [1, 2, 3],
        capabilities: [1, 2, 3, 4, 5, 6, 7],
        education: [10, 20, 30],
        portfolio: [100, 200, 300, 400],
      },
      {
        experience: [4, 5, 6, 7],
        capabilities: [],
        education: [],
        portfolio: [],
      },
    ]);
  });

});

