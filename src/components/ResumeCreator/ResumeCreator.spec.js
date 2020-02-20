import {overflowReducer, fillPageSections} from './ResumeCreator';

describe('overflowReducer', () => {
  const initialState = {
    refs: [],
    totals: {left: null, right: null},
    breakpoints: [],
  };
  const midState = {
    refs: [],
    totals: {left: 11, right: 22},
    breakpoints: [{left: 4, right: 6}, {left: 0, right: 2}],
  };

  test('set refs', () => {
    const result = overflowReducer(initialState, {
      type: 'set-refs',
      payload: {left: 'r1', right: 'r2'},
      index: 3, 
    });
    expect(result.refs).toEqual({3: {left: 'r1', right: 'r2'}});
  });
  test('set totals', () => {
    const result = overflowReducer(initialState, {
      type: 'set-totals',
      payload: {left: 10, right: 20},
    });
    expect(result.totals).toEqual({left: 10, right: 20});
  });
  test('reflow', () => {
    const result = overflowReducer(midState, {
      type: 'reflow',
    });
    expect(result.breakpoints).toEqual([{left: 11, right: 22}]);
  });
  test('push-left smoke', () => {
    const result = overflowReducer(midState, {
      type: 'push-left',
      index: 0,
    });
    expect(result.breakpoints).toEqual([
      {left: 3, right: 6},
      {left: 1, right: 2}
    ]);
  });
  test('push-right smoke', () => {
    const result = overflowReducer(midState, {
      type: 'push-right',
      index: 0,
    });
    expect(result.breakpoints).toEqual([
      {left: 4, right: 5},
      {left: 0, right: 3}
    ]);
  });
  test('push on less than 0', () => {
    const result = overflowReducer(midState, {
      type: 'push-left',
      index: 1,
    });
    expect(result.breakpoints).toEqual([
      {left: 4, right: 6},
      {left: 0, right: 2},
    ]);
  });
  test('push on end', () => {
    const result = overflowReducer(midState, {
      type: 'push-right',
      index: 1,
    });
    expect(result.breakpoints).toEqual([
      {left: 4, right: 6},
      {left: 0, right: 1},
      {left: 0, right: 1},
    ]);
  });

});

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

