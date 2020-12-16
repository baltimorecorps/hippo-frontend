import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import SkillsList from './SkillsList';

describe('SkillsList', () => {
  const skills = [{name: 'Test 1'}, {name: 'Test 2'}, {name: 'Test 3'}];

  test('render skills', () => {
    const {queryByText} = render(
      <SkillsList
        skills={skills}
      />
    );

    expect(queryByText(/test 1/i)).not.toBeNull();
    expect(queryByText(/test 2/i)).not.toBeNull();
    expect(queryByText(/test 3/i)).not.toBeNull();
  });

});

