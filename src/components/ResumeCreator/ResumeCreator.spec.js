import {overflowReducer} from './ResumeCreator';

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

  test('add refs', () => {
    const result = overflowReducer(initialState, {
      type: 'add-refs',
      payload: {left: 'r1', right: 'r2'},
    });
    expect(result.refs).toEqual([{left: 'r1', right: 'r2'}]);
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
