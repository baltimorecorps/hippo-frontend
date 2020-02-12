import React from 'react';
import {
  render,
  fireEvent,
  prettyDOM,
  waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SkillSelect from './SkillSelect';

import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from 'styles/theme';

// https://github.com/mui-org/material-ui/issues/15726
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

const makeItem = (item) => ({
  value: item,
  label: item,
})

const AUTOCOMPLETE = {
  matches: [
  makeItem('AAA'), 
  makeItem('BBB'), 
  makeItem('CCC')
  ],
  gotExact: true,
}

describe('SkillSelect', () => {
  test('can load value', async () => {
    const load = jest.fn(_ => AUTOCOMPLETE);
    const onChange = jest.fn();
    const {getByPlaceholderText, findByText} = render(
      <MuiThemeProvider theme={theme}>
        <SkillSelect load={load} value={[]} onChange={onChange} />
      </MuiThemeProvider>
    );

    fireEvent.change(getByPlaceholderText(/add new skill/i), {
      target: {value: 'test'},
    });

    const elem = await findByText('AAA')

    expect(load.mock.calls.length).toBe(1);
    expect(load.mock.calls[0][0]).toEqual('test');
    expect(elem).toBeInTheDocument();
  });

  test.skip('can select value', async () => {
    const load = jest.fn(_ => AUTOCOMPLETE);
    const onChange = jest.fn();
    const {getByLabelText, findByText} = render(
      <MuiThemeProvider theme={theme}>
        <SkillSelect load={load} value={[]} onChange={onChange} />
      </MuiThemeProvider>
    );

    fireEvent.change(getByLabelText(/add skill/i), {
      target: {value: 'test'},
    });
    const elem = await findByText('AAA')
    console.log(prettyDOM(elem))
    fireEvent.click(elem)

    expect(onChange.mock.calls[0][0]).toEqual([{name: 'AAA'}])
    expect(elem).not.toBeInTheDocument();
  });

});
