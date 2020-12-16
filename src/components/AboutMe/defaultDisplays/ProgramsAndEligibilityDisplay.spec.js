import React from 'react';
import {render} from '@testing-library/react';
import 'components/Contacts/node_modules/@testing-library/jest-dom/extend-expect';
import ProgramsAndEligibilityDisplay from './ProgramsAndEligibilityDisplay';
import {applicantFull} from 'mockData/applicant';

describe('ProgramsAndEligibilityDisplay', () => {
  test('Render ProgramsAndEligibilityDisplay', () => {
    const onClickEdit = jest.fn();

    const {getAllByTestId, getByTestId} = render(
      <ProgramsAndEligibilityDisplay
        contact={applicantFull}
        onClickEdit={onClickEdit}
      />
    );

    expect(getByTestId('question')).toBeInTheDocument();
    expect(getByTestId('question')).toHaveTextContent('Interested Programs:');

    const answers = getAllByTestId('answer');
    expect(answers.length).toBe(3);
    expect(answers[0]).toHaveTextContent('- Place for Purpose');
    expect(answers[1]).toHaveTextContent('- Fellowship');
    expect(answers[2]).toHaveTextContent(
      "- I'd like some help figuring this out"
    );
  });
});
